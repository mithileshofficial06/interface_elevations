import IntroAnimation from '@/components/IntroAnimation';
import Hero from '@/components/Hero';

export default function Home() {
  return (
    <IntroAnimation>
      <main>
        <Hero />
      </main>
    </IntroAnimation>
  );
}
