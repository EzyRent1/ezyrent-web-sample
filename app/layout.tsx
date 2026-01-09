import { dmSans } from '@/lib/font';
import { cn } from '@/lib/utils';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { Toaster } from 'sonner';
import { generateMetadata } from '@/lib/metadata';
import './globals.css';
import Script from 'next/script';

export const metadata = generateMetadata({
  title: 'Secure, Verified & Hassle-Free Home Rentals in Nigeria',
  description: `Find verified rental properties in Nigeria with EzyRent. No agents, no hidden fees—just easy home search, scheduling, and secure transactions.
`,
  path: ''
});

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <Script
          id="EzyRent description"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'RealEstateAgent',
              name: 'EzyRent',
              description:
                'Secure, Verified & Hassle-Free Home Rentals in Nigeria',
              url: 'https://www.ezyrent.org',
              logo: 'https://www.ezyrent.org/images/logo.png',
              sameAs: [
                'https://www.facebook.com/share/1HGaec4Hkb/?mibextid=LQQJ4d',
                'https://x.com/ezy_rent',
                'https://www.instagram.com/ezy_rent_hq?igsh=MWN3cXBtNHY1dzFvZA=='
              ],
              // address: {
              //   '@type': 'PostalAddress',
              //   streetAddress: '4234 Adetounbo Ademola',
              //   addressLocality: 'Victoria Island',
              //   addressRegion: 'Lagos',
              //   postalCode: '100001',
              //   addressCountry: 'NG'
              // },
              // geo: {
              //   '@type': 'GeoCoordinates',
              //   latitude: '6.5244',
              //   longitude: '3.3792'
              // },
              contactPoint: {
                '@type': 'ContactPoint',
                telephone: '+234-8127-518-838',
                contactType: 'customer service'
              }
              // potentialAction: {
              //   '@type': 'SearchAction',
              //   target: 'https://ezyrent.ng/search?q={search_term_string}',
              //   'query-input': 'required name=search_term_string'
              // }
            })
          }}
          strategy="beforeInteractive" // loads in head before React hydration
        />
        <link
          rel="preload"
          as="image"
          href="/hero/desktopHeroImage_1102x617.webp"
        />
      </head>
      <body
        className={cn(dmSans.className, 'flex flex-col min-h-screen bg-white')}
      >
        <GoogleOAuthProvider clientId="214122998362-8gc20qq486bsnigkugj7fh09du0dm9hm.apps.googleusercontent.com">
          <main>{children}</main>

          <Toaster richColors />
        </GoogleOAuthProvider>
      </body>
    </html>
  );
}
