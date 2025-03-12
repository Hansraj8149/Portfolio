import About from "@/components/About";
import Experience from "@/components/Experience";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import More from "@/components/More";
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
      <More />
      <Experience />
      <Skills />
      <Footer />
    </div>
  );
}
