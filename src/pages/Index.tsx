import { useEffect } from 'react';
import Hero from '@/components/home/Hero';
import BrandStory from '@/components/home/BrandStory';

import Testimonials from '@/components/home/Testimonials';
import CallToAction from '@/components/home/CallToAction';
import { initializeSampleData } from '@/lib/storage';
import CollectionsSection from '@/components/home/CollectionsSection';

const Index = () => {
  useEffect(() => {
    initializeSampleData();
  }, []);

  return (
    <main>
      <Hero />
      <BrandStory />
      <CollectionsSection />

      <Testimonials />
      <CallToAction />
    </main>
  );
};

export default Index;
