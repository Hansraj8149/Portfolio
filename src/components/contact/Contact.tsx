import React from "react";

import {AppWrap} from "@/wrapper";
import {ContactProps} from "@/lib/models";
import GetSectionData from "../GetSectionData";
import SectionHeader from "../SectionHeader";
import ContactInfo from "./ContactInfo";
import ContactSubmitted from "./ContactSubmitted";
import Loader from "../Loader";

const Contact = async () => {
  const data = await GetSectionData("contacts");
  if (!data || !data.length) {
    return <Loader />;
  }
  const contacts: ContactProps = data?.data?.[0];


  return (
    <div className="w-full py-24 bg-background-light">
      <div className="max-w-6xl mx-auto">
        <SectionHeader
          heading={contacts.heading}
          subheading={contacts.subheading}
          description={contacts.description}
        />

        <ContactInfo contactDetails={contacts.contactDetails} />
        <ContactSubmitted form={contacts.form} />
      </div>
    </div>
  );
};

export default AppWrap(Contact, "contact", "bg-background-light");
