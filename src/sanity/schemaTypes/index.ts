import { type SchemaTypeDefinition } from "sanity";

import { categoryType } from "./categoryType";
import { aboutType } from "./aboutType";
import { brandsType } from "./brandsType";
import { contactType } from "./contactType";
import { experienceType } from "./experienceType";
import { moreType } from "./moreType";
import { skillType } from "./skillType";
import { testimonialType } from "./testimonialType";
import { workExperienceType } from "./workExperienceType";
import { workType } from "./workType";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    categoryType,
    aboutType,
    brandsType,
    contactType,
    experienceType,
    moreType,
    skillType,
    testimonialType,
    workExperienceType,
    workType,
  ],
};
