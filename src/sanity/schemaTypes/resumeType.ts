import { UserIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export const resumeType = defineType({
  name: "resume",
  title: "Resume",
  type: "document",
  icon: UserIcon,
  fields: [
    defineField({
      name: "pdf",
      title: "PDF",
      type: "url",
      validation: (Rule) =>
        Rule.uri({
          scheme: ["http", "https", "mailto", "tel"],
        }),
    }),
  ],
  // preview: {
  //   select: {
  //     title: "name",
  //     media: "image",
  //   },
  // },
});
