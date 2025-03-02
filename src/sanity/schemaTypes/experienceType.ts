import { UserIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export const experienceType = defineType({
  name: "experiences",
  title: "Experiences",
  type: "document",
  icon: UserIcon,
  fields: [
    defineField({
      name: "year",
      title: "Year",
      type: "string",
    }),
    defineField({
      name: "works",
      title: "Works",
      type: "array",
      of: [{ type: "workExperience" }],
    }),
  ],
});
