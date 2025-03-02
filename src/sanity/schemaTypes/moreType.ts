import { UserIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export const moreType = defineType({
    name: 'more',
    title: 'More',
    type: 'document',
    icon:UserIcon,
    fields: [
       defineField ({
            name: 'title',
            title: 'Title',
            type: 'string'
        }),
        defineField ({
            name: 'description',
            title: 'Description',
            type: 'string'
        }),
       defineField ({
            name: 'imgUrl',
            title: 'ImgUrl',
            type: 'image',
            options: {
                hotspot: true,
            }
        })

    ]
})