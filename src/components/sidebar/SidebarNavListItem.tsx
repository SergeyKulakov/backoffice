import React from "react";
import styled from "@emotion/styled";
import { rgba, darken } from "polished";
import Link from "next/link";
import { useRouter } from "next/router";

import {
  Chip,
  Collapse,
  ListItemProps,
  ListItemButton,
  ListItemText,
  Box,
} from "@mui/material";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import { UserInfo } from "../../types/user";

interface ItemProps {
  activeclassname?: string;
  onClick?: () => void;
  to?: string;
  component?: typeof Link;
  depth: number;
}

const Item = styled(ListItemButton)<ItemProps>`
  padding-top: ${(props) =>
    props.theme.spacing(props.depth && props.depth > 0 ? 2 : 3)};
  padding-bottom: ${(props) =>
    props.theme.spacing(props.depth && props.depth > 0 ? 2 : 3)};
  padding-left: ${(props) =>
    props.theme.spacing(props.depth && props.depth > 0 ? 14 : 8)};
  padding-right: ${(props) =>
    props.theme.spacing(props.depth && props.depth > 0 ? 4 : 7)};
  font-weight: ${(props) => props.theme.typography.fontWeightRegular};
  svg {
    color: ${(props) => props.theme.sidebar.color};
    font-size: 20px;
    width: 20px;
    height: 20px;
    opacity: 0.5;
  }
  &:hover {
    background: rgba(0, 0, 0, 0.08);
    color: ${(props) => props.theme.sidebar.color};
  }
  &.${(props) => props.activeclassname} {
    background-color: ${(props) =>
      darken(0.03, props.theme.sidebar.background)};
    span {
      color: ${(props) => props.theme.sidebar.color};
    }
  }
`;

interface TitleInterface {
  depth: number;
}

const Title = styled(ListItemText)<TitleInterface>`
  margin: 0;
  span {
    color: ${(props) =>
      rgba(
        props.theme.sidebar.color,
        props.depth && props.depth > 0 ? 0.7 : 1
      )};
    font-size: ${(props) => props.theme.typography.body1.fontSize}px;
    padding: 0 ${(props) => props.theme.spacing(4)};
  }
`;

const Badge = styled(Chip)`
  font-weight: ${(props) => props.theme.typography.fontWeightBold};
  height: 20px;
  position: absolute;
  right: 26px;
  top: 12px;
  background: ${(props) => props.theme.sidebar.badge.background};
  z-index: 1;
  span.MuiChip-label,
  span.MuiChip-label:hover {
    font-size: 11px;
    cursor: pointer;
    color: ${(props) => props.theme.sidebar.badge.color};
    padding-left: ${(props) => props.theme.spacing(2)};
    padding-right: ${(props) => props.theme.spacing(2)};
  }
`;

const ExpandLessIcon = styled(ExpandLess)`
  color: ${(props) => rgba(props.theme.sidebar.color, 0.5)};
`;

const ExpandMoreIcon = styled(ExpandMore)`
  color: ${(props) => rgba(props.theme.sidebar.color, 0.5)};
`;

interface SidebarNavListItemProps extends ListItemProps {
  className?: string;
  depth: number;
  href: string;
  icon: React.FC<any>;
  badge?: string;
  open?: boolean;
  title: string;
  customComponent?: React.ReactNode;
  access?: number[];
  userInfo?: UserInfo | null;
}
const SidebarNavListItem = (props: SidebarNavListItemProps) => {
  const {
    title,
    href,
    depth = 0,
    children,
    icon: Icon,
    badge,
    open: openProp = false,
    customComponent,
    access,
    userInfo,
  } = props;

  const { pathname } = useRouter();
  const hasCustomComponent = !!customComponent;
  const [open, setOpen] = React.useState(openProp);
  //@ts-ignore
  const depthMenu = children?.props?.depth;

  if (access && access.length > 0) {
    if (!access.includes(userInfo?.role as number)) {
      return null;
    }
  }

  const handleToggle = () => {
    setOpen((state) => !state);
  };
  if (children) {
    return (
      <React.Fragment>
        <Box pr={depthMenu > 1 ? 3 : 0}>
          <Item depth={depth} onClick={handleToggle}>
            {Icon && <Icon />}
            <Title depth={depth}>
              {title}
              {badge && <Badge label={badge} />}
            </Title>
            {open ? <ExpandLessIcon /> : <ExpandMoreIcon />}
          </Item>
          <Collapse in={open}>{children}</Collapse>
        </Box>
      </React.Fragment>
    );
  }
  if (hasCustomComponent) {
    return <Box pr={depthMenu > 1 ? 3 : 0}>{customComponent}</Box>;
  }

  return (
    <Link href={href} passHref>
      <Item
        depth={depth}
        className={pathname == href ? "active" : ""}
        activeclassname="active"
      >
        {Icon && <Icon />}
        <Title depth={depth}>
          {title}
          {badge && <Badge label={badge} />}
        </Title>
      </Item>
    </Link>
  );
};
export default SidebarNavListItem;
