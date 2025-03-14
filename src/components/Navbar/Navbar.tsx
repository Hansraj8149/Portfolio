import React from "react";

import GetSectionData from "../GetSectionData";
import { NavbarProps } from "@/lib/models";
import NavbarContent from "./NavbarContent";

const Navbar = async () => {
  const data = await GetSectionData("navbars");
  const navbars: NavbarProps = data?.data?.[0];

  if (!navbars) {
    return <div>Loading...</div>;
  }

  return <NavbarContent navbars={navbars} />;
};

export default Navbar;
