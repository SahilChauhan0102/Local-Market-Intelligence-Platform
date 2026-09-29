import { redirect } from 'next/navigation';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Mosques in Delhi NCR — Timings, Namaz, How to Reach | LocalGali',
  description: 'Find mosques in Delhi NCR — Jama Masjid, Fatehpuri Masjid, Moth ki Masjid & more. Check prayer timings, entry, and metro directions.',
};

export default function MosquesPage() {
  redirect('/places?type=Mosque');
}
