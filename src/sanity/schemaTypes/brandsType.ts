import { UserIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export const brandsType = defineType({
  name: "brands",
  title: "Brands",
  type: "document",
  icon: UserIcon,
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
    }),
    defineField({
      name: "imgUrl",
      title: "ImgUrl",
      type: "image",
      options: {
        hotspot: true,
      },
    }),
  ],
  // preview: {
  //   select: {
  //     title: "name",
  //     media: "image",
  //   },
  // },
});
