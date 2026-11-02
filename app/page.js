import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Reveal from '@/components/Reveal';
import OccasionsIntro from '@/components/OccasionsIntro';
import Occasions from '@/components/Occasions';
import BoxBuilder from '@/components/BoxBuilder';
import Corporate from '@/components/Corporate';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import ScrollEffects from '@/components/ScrollEffects';

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Reveal />
        <OccasionsIntro />
        <Occasions />
        <BoxBuilder />
        <Corporate />
        <Contact />
      </main>
      <Footer />
      <ScrollEffects />
    </>
  );
}
