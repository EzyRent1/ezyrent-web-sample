import { Metadata } from 'next';

type PageMetadataProps = {
  title?: string;
  description?: string;
  path?: string;
};

export function generateMetadata({
  title = 'EzyRent',
  description = 'Find and rent your dream home easily with EzyRent. No stress, no hidden fees!',
  path = ''
}: PageMetadataProps = {}): Metadata {
  // Normalize the path by removing leading and trailing slashes
  const normalizedPath = path.replace(/^\/|\/$/g, '');

  // Base URL with consistent trailing slash
  const baseUrl = 'https://www.ezyrent.org/';

  // full URL
  const fullUrl = new URL(normalizedPath, baseUrl)
    .toString()
    .replace(/\/+$/, '/');

  const baseTitle = 'EzyRent';
  const fullTitle =
    title === baseTitle ? baseTitle : `${baseTitle} - ${title} `;

  return {
    title: fullTitle,
    description,
    keywords: [
      'Nigeria home rentals',
      'Rent apartments in Lagos',
      'Verified rental properties',
      'Secure house search Nigeria',
      'No agent fees rental platform',
      'EzyRent property listings',
      'Find houses for rent in Nigeria',
      'Affordable rentals in Lagos'
    ],
    authors: [{ name: 'EzyRent Team' }],
    openGraph: {
      title: fullTitle,
      description,
      url: fullUrl,
      siteName: baseTitle,
      images: [
        {
          url: new URL('/EzyRent-meta.jpg', baseUrl).toString(),
          secureUrl: new URL('/EzyRent-meta.jpg', baseUrl).toString(),
          width: 1200,
          height: 630,
          alt: "EzyRent - Nigeria's trusted rental platform"
        }
      ],
      locale: 'en_US',
      type: 'website'
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      images: [new URL('/EzyRent-meta.jpg', baseUrl).toString()]
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1
      }
    },
    icons: {
      icon: '/favicon.ico'
    },
    alternates: {
      canonical: fullUrl
    }
  };
}

// Example usage in a page
// export const metadata = generateMetadata({
//   title: "About Us",
//   description: "Learn about our mission and journey",
//   path: "about"
// });
