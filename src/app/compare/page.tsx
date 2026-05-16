import type { Metadata } from 'next';
import ComparePage from './ComparePage';

export const metadata: Metadata = {
  title: 'Compare Markets in Delhi NCR — Local Market Explorer',
  description: 'Compare local markets in Delhi NCR side-by-side. Check prices, crowd levels, experience ratings, and more.',
};

export default function CompareRoute() {
  return <ComparePage />;
}
