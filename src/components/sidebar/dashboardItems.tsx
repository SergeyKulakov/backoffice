import { SidebarItemsType } from "../../types/sidebar";

import { BookOpen, Users, Info, Trello, UserCheck } from "react-feather";
import RevalidateProfileButton from "../navbar/RevalidateProfileButton";
import { ROLE } from "../../constants";

const pagesSection = [
  {
    href: "/users",
    icon: Users,
    title: "Users",
    access: [ROLE.ADMIN],
  },
  {
    href: "/csv",
    icon: BookOpen,
    title: "CSV",
    access: [ROLE.ADMIN, ROLE.SUPERVISOR],
    children: [
      {
        href: "/csv/upload",
        title: "Upload CSV",
      },
      {
        href: "/csv/index-update",
        title: "Index update",
      },
    ],
  },
  {
    href: "/researcher",
    icon: Info,
    title: "Researcher Validation queue",
    access: [ROLE.ADMIN, ROLE.SUPERVISOR, ROLE.RESEARCHER],
    children: [
      {
        href: "/researcher/profile-sellside",
        title: "Profiles Sellside",
        children: [
          {
            href: "/profiles-sellside/new",
            title: "New profiles",
          },
        ],
      },
      {
        href: "/researcher/profile-buyside",
        title: "Profiles Buyside",
        children: [
          {
            href: "/profiles-buyside/new",
            title: "New profiles",
          },
        ],
      },
    ],
  },
  {
    href: "/supervisor",
    icon: Info,
    title: "Supervisor Validation queue",
    access: [ROLE.ADMIN, ROLE.SUPERVISOR],
    children: [
      {
        href: "/supervisor/profile-sellside",
        title: "Profiles Sellside",
      },
      {
        href: "/supervisor/profile-buyside",
        title: "Profiles Buyside",
      },
    ],
  },
  {
    href: "/active-profiles",
    icon: UserCheck,
    title: "Active profiles",
    access: [ROLE.ADMIN, ROLE.SUPERVISOR],
  },
  {
    href: "",
    icon: Info,
    title: "Pending queue",
    customComponent: <RevalidateProfileButton />,
    access: [ROLE.ADMIN, ROLE.SUPERVISOR],
  },
  {
    href: "/dictionary",
    icon: Trello,
    title: "Dictionary",
    access: [ROLE.ADMIN, ROLE.SUPERVISOR],
    children: [
      {
        href: "/dictionary/education/education-main",
        title: "Universities",
      },
      {
        href: "/dictionary/gender",
        title: "Gender",
      },
      {
        href: "/dictionary/languages/language-main",
        title: "Languages",
      },
      {
        href: "/dictionary/degree-types-main",
        title: "Degree types",
      },
      {
        href: "/dictionary/company-type",
        title: "Company types",
      },
      {
        href: "/dictionary/companies-main",
        title: "Companies",
      },
      {
        href: "/dictionary/diversity",
        title: "Diversity",
      },
      {
        href: "/dictionary/suggested-team",
        title: "Suggested Teams (Sellside)",
      },
      {
        href: "/dictionary/suggested-geography",
        title: "Suggested Geography (Buyside)",
      },
      {
        href: "/dictionary/suggested-coverage",
        title: "Suggested Coverage (Buyside)",
      },
      {
        href: "/dictionary/suggested-strategy",
        title: "Suggested Strategy (Buyside)",
      },
      {
        href: "/dictionary/countries/countries-main",
        title: "Countries",
      },
    ],
  },
] as SidebarItemsType[];

const navItems = [
  {
    title: "Dashboard",
    pages: pagesSection,
  },
];

export default navItems;
