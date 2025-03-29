import About from "@/components/about/About";
import Contact from "@/components/contact/Contact";
import Experience from "@/components/experience/Experience";
import Footer from "@/components/Footer";
import Hero from "@/components/hero/Hero";
import Skills from "@/components/skills/Skills";
import Work from "@/components/work/Work";

export default function Home() {
  return (
    <div className="">
      <Hero />
      <Experience />
      <Work />
      <About />
      {/* <Expertise /> */}
      <Skills />
      <Contact />
      <Footer />
    </div>
  );
}
