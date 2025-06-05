import {
  House,
  Vote,
  MessageSquareDot,
  ListVideo,
  Code,
  ArrowDownWideNarrow,
} from "lucide-react";

import {
  Google,
  Figma,
  Github,
  Microsoft,
  Netflix,
  Notion,
  Slack,
} from "../assets/marqeeLogos";

const sidebarLinks = [
  {
    icon: House,
    route: "/home",
    label: "Home",
  },
  {
    icon: ArrowDownWideNarrow,
    route: "/problems",
    label: "All Problems",
  },
  {
    icon: Vote,
    route: "/solved-problems",
    label: "Solved Problems",
  },
  {
    icon: MessageSquareDot,
    route: "/submissions",
    label: "My Submissions",
  },
  {
    icon: ListVideo,
    route: "/playlists",
    label: "Playlists",
  },
];
const adminLinks = [
  {
    icon: Code,
    route: "/add-problem",
    label: "Add Problem",
  },
  {
    icon: ArrowDownWideNarrow,
    route: "/admin/problems",
    label: "All Problems",
  },
];

const NavLinks = [
  {
    title: "Home",
    link: "/",
  },
  {
    title: "Home",
    link: "/",
  },
  {
    title: "Home",
    link: "/",
  },
  {
    title: "Home",
    link: "/",
  },
];

export { sidebarLinks, adminLinks, NavLinks };

export const logos = [Google, Figma, Github, Microsoft, Netflix, Notion, Slack];
