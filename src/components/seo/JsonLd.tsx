import React from 'react';

interface JsonLdProps {
  market: {
    name: string;
    description?: string;
    priceRange: string;
    rating: number;
    reviewCount: number;
    address?: {
      streetAddress?: string;
      addressLocality?: string;
      addressRegion?: string;
      postalCode?: string;
    };
    geo?: {
      latitude: number;
      longitude: number;
    };
    openingHoursSpecification?: {
      dayOfWeek: string[]; // e.g., ['Monday', 'Tuesday']
      opens: string; // '08:00'
      closes: string; // '20:00'
    }[];
    image?: string[];
    url: string;
  };
}

const JsonLd: React.FC<JsonLdProps> = ({ market }) => {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: market.name,
    description: market.description ?? market.name,
    image: market.image?.length ? market.image : undefined,
    url: market.url,
    priceRange: market.priceRange,
    address: market.address,
    geo: market.geo,
    openingHoursSpecification: market.openingHoursSpecification,
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: market.rating,
      reviewCount: market.reviewCount,
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
};

export default JsonLd;
