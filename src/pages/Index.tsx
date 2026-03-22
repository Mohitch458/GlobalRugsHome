import { useEffect } from 'react';
import Hero from '@/components/home/Hero';
import BrandStory from '@/components/home/BrandStory';
import FeaturedCollection from '@/components/home/FeaturedCollection';
import Testimonials from '@/components/home/Testimonials';
import CallToAction from '@/components/home/CallToAction';
import { initializeSampleData } from '@/lib/storage';

const Index = () => {
  useEffect(() => {
    initializeSampleData();
  }, []);

  return (
    <main>
      <Hero />
      <BrandStory />
      <FeaturedCollection />
      <Testimonials />
      <CallToAction />
    </main>
  );
};

export default Index;
