import IntroAnimation from '@/components/IntroAnimation';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Services from '@/components/Services';
import WhyChooseUs from '@/components/WhyChooseUs';
import ProjectsHorizontal from '@/components/ProjectsHorizontal';
import Clients from '@/components/Clients';

export default function Home() {
  return (
    <IntroAnimation>
      <main>
        <Hero />
        <About />
        <Services />
        <WhyChooseUs />
        <ProjectsHorizontal />
        <Clients />
      </main>
    </IntroAnimation>
  );
}
