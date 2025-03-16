import { AppWrap } from "@/wrapper";
import { ExpertiseProps } from "@/lib/models";
import SectionHeader from "./SectionHeader";
import GetSectionData from "./GetSectionData";
import Loader from "./Loader";
import ExpertiseCards from "./ExpertiseCard";

const Expertise = async () => {
  const data = await GetSectionData("expertises");
  const expertises: ExpertiseProps = data?.data?.[0] ?? null;

  if (!expertises) {
    return <Loader />;
  }

  return (
    <section id="expertise" className="w-full py-36 bg-background-light">
      <div className="content-frame flex-col items-center justify-center">
        <div className="flex-col items-center justify-center ">
          <SectionHeader
            heading={expertises.heading}
            subheading={expertises.subheading}
            description={expertises.description[0].children[0].text}
          />
        </div>

        <ExpertiseCards expertises={expertises.expertises} />
      </div>
    </section>
  );
};

export default AppWrap(Expertise, "expertise", "bg-background-light");
