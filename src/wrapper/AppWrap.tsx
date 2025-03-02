import { NavigationDots, SocialMedia } from "@/components/Navbar";
import React, { ComponentType } from "react";
import clsx from "clsx";
const AppWrap = <P extends object>(
  Component: ComponentType<P>,
  idName: string,
  classNames?: string
) => {
  return function HOC(props: P) {
    return (
      <div
        id={idName}
        className={clsx(
          "flex min-h-[100vh] w-full border border-black",
          classNames
        )}
      >
        <SocialMedia />
        <div className="flex w-full h-auto flex-col items-center  py-4 px-2 sm:px-1 border border-red-500">
          <Component {...props} />
          <div className="text-end text-gray-600 text-sm">
            <p>©2022 HANSRAJ</p>
            <p>All rights reserved</p>
          </div>
        </div>
        <NavigationDots active={idName} />
      </div>
    );
  };
};

export default AppWrap;
