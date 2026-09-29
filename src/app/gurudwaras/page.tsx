import { redirect } from 'next/navigation';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Gurudwaras in Delhi NCR — Timings, Langar & How to Reach | LocalGali',
  description: 'Find gurudwaras in Delhi NCR — Bangla Sahib, Sis Ganj Sahib, Rakab Ganj Sahib & more. Langar timings, Kirtan schedule, and metro directions.',
};

export default function GurudwarasPage() {
  redirect('/places?type=Gurudwara');
}
