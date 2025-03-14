import About from "@/components/about/About";
import Experience from "@/components/Experience";
import Expertise from "@/components/Expertise";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import { Navbar } from "@/components/Navbar/index";
import Skills from "@/components/Skills";
import Work from "@/components/work/Work";

export default function Home() {
  return (
    <div className="">
      <Navbar />
      <Hero />
      <Work />
      <About />
      <Expertise />
      <Experience />
      <Skills />
      <Footer />
    </div>
  );
}
