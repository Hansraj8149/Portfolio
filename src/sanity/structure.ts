import type { StructureResolver } from "sanity/structure";

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = (S) =>
  S.list()
    .title("Portfolio")
    .items([
      S.documentTypeListItem("about").title("About"),
      S.divider(),
      ...S.documentTypeListItems().filter(
        (item) => item.getId() && !["about"].includes(item.getId()!)
      ),
    ]);
