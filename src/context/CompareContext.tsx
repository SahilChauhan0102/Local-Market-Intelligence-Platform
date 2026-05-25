'use client';

import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import type { Market } from '@/types/market';

const MAX_COMPARE = 3;

interface CompareContextType {
  compareList: Market[];
  addToCompare: (market: Market) => void;
  removeFromCompare: (slug: string) => void;
  isInCompare: (slug: string) => boolean;
  clearCompare: () => void;
  canAdd: boolean;
}

const CompareContext = createContext<CompareContextType | null>(null);

export function CompareProvider({ children }: { children: React.ReactNode }) {
  const [compareList, setCompareList] = useState<Market[]>([]);

  // Load from local storage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem('localMarketCompare');
      if (stored) {
        setCompareList(JSON.parse(stored));
      }
    } catch (e) {
      console.error('Failed to parse compare list from local storage', e);
    }
  }, []);

  // Save to local storage on changes
  useEffect(() => {
    localStorage.setItem('localMarketCompare', JSON.stringify(compareList));
  }, [compareList]);

  const addToCompare = useCallback((market: Market) => {
    setCompareList((prev) => {
      if (prev.length >= MAX_COMPARE) return prev;
      if (prev.find((m) => m.slug === market.slug)) return prev;
      return [...prev, market];
    });
  }, []);

  const removeFromCompare = useCallback((slug: string) => {
    setCompareList((prev) => prev.filter((m) => m.slug !== slug));
  }, []);

  const isInCompare = useCallback(
    (slug: string) => compareList.some((m) => m.slug === slug),
    [compareList]
  );

  const clearCompare = useCallback(() => setCompareList([]), []);

  const canAdd = compareList.length < MAX_COMPARE;

  return (
    <CompareContext.Provider
      value={{ compareList, addToCompare, removeFromCompare, isInCompare, clearCompare, canAdd }}
    >
      {children}
    </CompareContext.Provider>
  );
}

export function useCompare() {
  const ctx = useContext(CompareContext);
  if (!ctx) throw new Error('useCompare must be used within CompareProvider');
  return ctx;
}
