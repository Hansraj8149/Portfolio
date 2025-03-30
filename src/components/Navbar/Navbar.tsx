import React from "react";

import GetSectionData from "../GetSectionData";
import {NavbarProps} from "@/lib/models";
import NavbarContent from "./NavbarContent";
import Loader from "../Loader";

const Navbar = async () => {
  const data = await GetSectionData("navbars");

  const navbars: NavbarProps = data?.data?.length ? data.data[0] : null;
  if (!navbars) {
    return <Loader />;
  }
  return (

    <NavbarContent navbars={navbars} />
  )


};

export default Navbar;
