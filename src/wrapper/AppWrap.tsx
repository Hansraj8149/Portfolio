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
        className={clsx("flex min-h-[100vh] w-full", classNames)}
      >
        <SocialMedia />
        <div className="flex w-full h-auto flex-col gap-4  py-8 px-4 sm:px-2">
          <Component {...props} />
        </div>
        <NavigationDots active={idName} />
      </div>
    );
  };
};

export default AppWrap;
