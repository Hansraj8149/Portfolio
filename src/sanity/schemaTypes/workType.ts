import { UserIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export const workType = defineType({
  name: "works",
  title: "Works",
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
      name: "projectLink",
      title: "Project Link",
      type: "string",
    }),
    defineField({
      name: "codeLink",
      title: "Code Link",
      type: "string",
    }),
    defineField({
      name: "imgUrl",
      title: "ImageUrl",
      type: "image",
      options: {
        hotspot: true,
      },
    }),

    defineField({
      name: "tags",
      title: "Tags",
      type: "array",
      of: [
        {
          name: "tag",
          title: "Tag",
          type: "string",
        },
      ],
    }),
  ],
});
