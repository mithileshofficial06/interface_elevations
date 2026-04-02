import IntroAnimation from '@/components/IntroAnimation';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Services from '@/components/Services';

export default function Home() {
  return (
    <IntroAnimation>
      <main>
        <Hero />
        <About />
        <Services />
      </main>
    </IntroAnimation>
  );
}
