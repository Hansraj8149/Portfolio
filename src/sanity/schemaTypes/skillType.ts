import { UserIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export const skillType = defineType({
  name: "skills",
  title: "Skills",
  type: "document",
  icon: UserIcon,
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
    }),
    defineField({
      name: "bgColor",
      title: "BgColor",
      type: "string",
    }),
    defineField({
      name: "icon",
      title: "Icon",
      type: "image",
      options: {
        hotspot: true,
      },
    }),
  ],
});
