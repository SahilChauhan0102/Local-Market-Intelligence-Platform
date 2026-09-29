import React from 'react';
import type { Place } from '@/types/place';

interface PlaceJsonLdProps {
  place: Place;
}

const PlaceJsonLd: React.FC<PlaceJsonLdProps> = ({ place }) => {
  const openingHours = Object.entries(place.timings)
    .filter(([, time]) => time !== 'Closed' && !time.toLowerCase().includes('closed'))
    .map(([day, time]) => {
      const [opens, closes] = time.split('–').map((s) => s.trim());
      return {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: `https://schema.org/${day}`,
        opens: opens || '00:00',
        closes: closes || '23:59',
      };
    });

  const data = {
    '@context': 'https://schema.org',
    '@type': 'LandmarkOrHistoricalBuilding',
    name: place.name,
    description: place.description,
    image: place.images[0],
    url: `https://localgali-alpha.vercel.app/places/${place.slug}`,
    address: {
      '@type': 'PostalAddress',
      streetAddress: place.address,
      addressLocality: place.city,
      addressCountry: 'IN',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: place.coordinates.lat,
      longitude: place.coordinates.lng,
    },
    openingHoursSpecification: openingHours,
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: place.rating,
      reviewCount: place.totalRatings,
    },
    isAccessibleForFree: place.entryFee.indian === 'Free',
    publicAccess: true,
    touristType: 'Religious Tourism',
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
};

export default PlaceJsonLd;
