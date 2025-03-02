import type { StructureResolver } from "sanity/structure";

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = (S) =>
  S.list()
    .title("Blog")
    .items([
      S.documentTypeListItem("category").title("Categories"),
      S.documentTypeListItem("about").title("About"),
      S.divider(),
      ...S.documentTypeListItems().filter(
        (item) => item.getId() && !["category", "about"].includes(item.getId()!)
      ),
    ]);
