import React from "react";

import GetSectionData from "../GetSectionData";
import {NavbarProps} from "@/lib/models";
import NavbarContent from "./NavbarContent";
import Loader from "../Loader";

const Navbar = async () => {
  const data = await GetSectionData("navbars");
  if (!data || !data.length) {
    return <Loader />;
  }
  const navbars: NavbarProps = data?.data?.[0];

  return <NavbarContent navbars={navbars} />;
};

export default Navbar;
