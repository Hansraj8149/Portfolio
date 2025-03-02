import { UserIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export const aboutType = defineType({
  name: "about",
  title: "About",
  type: "document",
  icon: UserIcon,
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
    }),
    defineField({
      name: "description",
      title: "Description",
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
