import IntroAnimation from '@/components/IntroAnimation';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Services from '@/components/Services';
import WhyChooseUs from '@/components/WhyChooseUs';
import ProjectsHorizontal from '@/components/ProjectsHorizontal';
import Clients from '@/components/Clients';
import Contact from '@/components/ContactForm';
import Footer from '@/components/Footer';

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
        <Contact />
      </main>
      <Footer />
    </IntroAnimation>
  );
}
