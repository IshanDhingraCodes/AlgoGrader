import {
  House,
  Vote,
  MessageSquareDot,
  ListVideo,
  Code,
  ArrowDownWideNarrow,
} from "lucide-react";

const sidebarLinks = [
  {
    icon: House,
    route: "/home",
    label: "Home",
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
    route: "/problems",
    label: "All Problems",
  },
];

export { sidebarLinks, adminLinks };
