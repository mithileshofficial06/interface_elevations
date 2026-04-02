import IntroAnimation from '@/components/IntroAnimation';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Services from '@/components/Services';
import ProjectsHorizontal from '@/components/ProjectsHorizontal';

export default function Home() {
  return (
    <IntroAnimation>
      <main>
        <Hero />
        <About />
        <Services />
        <ProjectsHorizontal />
      </main>
    </IntroAnimation>
  );
}
