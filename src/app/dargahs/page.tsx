import { redirect } from 'next/navigation';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Dargahs & Sufi Shrines in Delhi NCR — Timings & How to Reach | LocalGali',
  description: 'Find dargahs in Delhi NCR — Hazrat Nizamuddin Auliya, Qutub Sahib Dargah, Shah Turkman & more. Thursday qawwali schedules, timings, and metro directions.',
};

export default function DargahsPage() {
  redirect('/places?type=Dargah');
}
