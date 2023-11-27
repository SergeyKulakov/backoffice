import React from "react";
import { SidebarItemsType } from "../../types/sidebar";
import SidebarNavListItem from "./SidebarNavListItem";
import SidebarNavList from "./SidebarNavList";
import RevalidateProfileButton from "../navbar/RevalidateProfileButton";
import { UserInfo } from "../../types/user";

interface ReduceChildRoutesProps {
  depth: number;
  page: SidebarItemsType;
  items: JSX.Element[];
  currentRoute: string;
  userInfo: UserInfo | null;
}

const reduceChildRoutes = (props: ReduceChildRoutesProps) => {
  const { items, page, depth, currentRoute, userInfo } = props;

  const shouldRenderButton =
    page.title === "Pending queue" &&
    !items.some(
      (item) =>
        item.props.title === "Pending queue" &&
        item.props.children &&
        item.props.children.type === RevalidateProfileButton
    );

  if (page.children) {
    const open = currentRoute.includes(page.href);

    const listItem = (
      <SidebarNavListItem
        depth={depth}
        icon={page.icon}
        key={page.title}
        badge={page.badge}
        open={!!open}
        title={page.title}
        href={page.href}
        access={page.access}
        userInfo={userInfo}
      >
        {shouldRenderButton && <RevalidateProfileButton />}
        <SidebarNavList depth={depth + 1} pages={page.children} />
      </SidebarNavListItem>
    );

    items.push(listItem);
  } else {
    items.push(
      <SidebarNavListItem
        depth={depth}
        href={page.href}
        icon={page.icon}
        key={page.title}
        badge={page.badge}
        title={page.title}
        access={page.access}
        userInfo={userInfo}
      >
        {shouldRenderButton && <RevalidateProfileButton />}
      </SidebarNavListItem>
    );
  }

  return items;
};

export default reduceChildRoutes;
