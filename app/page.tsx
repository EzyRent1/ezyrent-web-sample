'use client';

import React, { useEffect, useState } from 'react';
import AboutUs from '@/components/AboutUs';
import Testimonial from '@/components/testimonial/Testimonial';
import OfferSection from '@/components/OfferSection';
import FAQs from '@/components/FAQs/FAQs';
import HeroPage from '@/components/hero-page/HeroPage';
import Header from '@/components/nav/Header';
import Footer from '@/components/footer/Footer';
import GetStarted from '@/components/GetStarted';
import AboutUsCarousel from '@/components/carousel/about-us-carousel';
import AboutUsVideo from '@/components/AboutUsVideo';
import StartYourJourney from '@/components/StartYourJourney';
import PropertiesCarousel from '@/components/PropertiesCarousel';

interface Location {
  latitude: number;
  longitude: number;
}

export default function Home() {
  const [location, setLocation] = useState<Location | null>(null);

  useEffect(() => {
    const fetchLocation = async () => {
      try {
        const response = await fetch('https://ipapi.co/json/');
        if (!response.ok) {
          throw new Error('Failed to fetch location data');
        }
        const data = await response.json();
        setLocation({
          latitude: data.latitude,
          longitude: data.longitude
        });
      } catch (error) {
        console.error('Error fetching location:', error);
      }
    };

    fetchLocation();
    console.log('Location:', location);
  }, [location]);
  return (
    <div>
      <Header />
      <div>
        <HeroPage />
      </div>
      <main>
        <AboutUs />
        <PropertiesCarousel title="Based on location" />
        <PropertiesCarousel
          title="Best deal"
          headingId="best-deals"
          staticMode
        />
        <AboutUsVideo />
        <OfferSection />
        <AboutUsCarousel />
        <GetStarted />
        <StartYourJourney />
        <Testimonial />
        <FAQs />

        {/* <StartYourJourney /> */}
      </main>
      <Footer />
    </div>
  );
}
