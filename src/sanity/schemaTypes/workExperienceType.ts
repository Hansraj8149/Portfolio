import { UserIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export const workExperienceType = defineType({
  name: "workExperience",
  title: "Work Experience",
  type: "document",
  icon: UserIcon,
  fields: [
    defineField({ name: "name", title: "name", type: "string" }),
    defineField({
      name: "company",
      title: "Company",
      type: "string",
    }),
    defineField({
      name: "desc",
      title: "Desc",
      type: "string",
    }),
  ],
});
