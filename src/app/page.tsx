import Nav from "@/components/Nav";
import Tape from "@/components/Tape";
import Hero from "@/components/Hero";
import Section from "@/components/Section";
import CareerChart from "@/components/CareerChart";
import Work from "@/components/Work";
import Capabilities from "@/components/Capabilities";
import Note from "@/components/Note";
import OrderTicket from "@/components/OrderTicket";
import ContactCard from "@/components/ContactCard";
import Reveal from "@/components/Reveal";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Nav />
      <Tape />
      <main className="pb-16 lg:pb-0">
        <Hero />

        <Section
          id="career"
          index={1}
          kicker="Career"
          title="Intern to project lead in under two years."
          lede="Hover or tap a milestone on the chart to see what I was building at the time."
        >
          <CareerChart />
        </Section>

        <Section
          id="work"
          index={2}
          kicker="Work"
          title="Products people use, and the systems underneath."
          lede="Three products live on the web and Google Play — from a brokerage app to a running-club network."
        >
          <Work />
        </Section>

        <Section
          id="capabilities"
          index={3}
          kicker="Capabilities"
          title="What I can build for your team."
          lede="End to end — mobile, web, backend, AI and infrastructure. With a specialty in financial markets."
        >
          <Capabilities />
        </Section>

        <Section id="note" index={4} kicker="Analyst note" title="Why teams keep this position.">
          <Note />
        </Section>

        <Section
          id="contact"
          index={5}
          kicker="Contact"
          title="Open an order."
          lede="Hiring a product or mobile engineer at a seed–Series B team? Tell me what you're building."
        >
          <div className="grid gap-6 lg:grid-cols-[1fr_340px]">
            <OrderTicket />
            <ContactCard />
          </div>
        </Section>
      </main>
      <Footer />
      <Reveal />
    </>
  );
}
