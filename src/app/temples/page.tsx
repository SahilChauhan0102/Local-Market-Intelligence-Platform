import { redirect } from 'next/navigation';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Temples in Delhi NCR — Timings, Metro & Visitor Guide | LocalGali',
  description: 'Explore the most famous temples in Delhi NCR — Akshardham, Lotus Temple, Birla Mandir, Chhatarpur Mandir & more. Get timings, metro directions, entry fees.',
};

export default function TemplesPage() {
  redirect('/places?type=Temple');
}
