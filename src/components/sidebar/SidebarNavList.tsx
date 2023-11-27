import React from "react";

import reduceChildRoutes from "./reduceChildRoutes";

import { SidebarItemsType } from "../../types/sidebar";
import { useRouter } from "next/router";
import { useSelector } from "../../store";

interface SidebarNavListProps {
  depth: number;
  pages: SidebarItemsType[];
}

const SidebarNavList = (props: SidebarNavListProps) => {
  const { pages, depth } = props;
  const { pathname } = useRouter();
  const userInfo = useSelector((state) => state.users.userInfo);

  const childRoutes = pages.reduce(
    (items, page) =>
      reduceChildRoutes({
        items,
        page,
        currentRoute: pathname,
        depth,
        userInfo,
      }),
    [] as JSX.Element[]
  );

  return <React.Fragment>{childRoutes}</React.Fragment>;
};

export default SidebarNavList;
