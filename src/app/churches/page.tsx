import { redirect } from 'next/navigation';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Churches in Delhi NCR — Mass Timings & How to Reach | LocalGali',
  description: 'Find churches in Delhi NCR — Sacred Heart Cathedral, St. James\' Church, Cathedral Church of the Redemption & more. Sunday Mass timings and metro directions.',
};

export default function ChurchesPage() {
  redirect('/places?type=Church');
}
