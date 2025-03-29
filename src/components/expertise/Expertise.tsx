import {AppWrap} from "@/wrapper";
import {ExpertiseProps} from "@/lib/models";
import SectionHeader from "../SectionHeader";
import GetSectionData from "../GetSectionData";
import Loader from "../Loader";

import {BentoGrid, BentoGridItem} from "./bento-grid";

const Expertise = async () => {
  const data = await GetSectionData("expertises");
  if (!data || !data.length) {
    return <Loader />;
  }
  const expertises: ExpertiseProps = data?.data?.[0] ?? null;


  return (
    <section id="expertise" className="w-full py-24 bg-background-light">
      <div className="content-frame flex-col items-center justify-center gap-12">
        <SectionHeader
          heading={expertises.heading}
          subheading={expertises.subheading}
          description={expertises.description[0].children[0].text}
        />

        <BentoGrid className="max-w-4xl mx-auto">
          {expertises.expertises.map((item, i) => (
            <BentoGridItem
              key={i}
              title={item?.title}
              description={item?.description[0].children[0].text}
              imageUrl={`${process.env.NEXT_PUBLIC_STRAPI_API_BASE_URL}${item?.image[0]?.url}`}

              level={item?.level}
              rating={item?.rating}
              className={i === 3 || i === 6 ? "md:col-span-2" : ""}
            />
          ))}
        </BentoGrid>



      </div>
    </section>
  );
};

export default AppWrap(Expertise, "expertise", "bg-background-light");
