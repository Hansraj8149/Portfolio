import React from "react";

import {getSectionData} from "@/utils/utils";
import {NavbarProps} from "@/lib/models";
import NavbarContent from "./NavbarContent";
import Loader from "../Loader";

const Navbar = async () => {
  const data = await getSectionData("navbars");

  const navbars: NavbarProps = data?.data?.length ? data.data[0] : null;
  if (!navbars) {
    return <Loader />;
  }
  return (

    <NavbarContent navbars={navbars} />
  )


};

export default Navbar;
