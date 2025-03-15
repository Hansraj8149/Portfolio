import About from "@/components/about/About";
import Contact from "@/components/contact/Contact";
import Experience from "@/components/Experience";
import Expertise from "@/components/Expertise";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Skills from "@/components/Skills";
import Work from "@/components/work/Work";

export default function Home() {
  return (
    <div className="">
      <Hero />
      <Work />
      <About />
      <Expertise />
      <Experience />
      <Skills />
      <Contact />
      <Footer />
    </div>
  );
}
