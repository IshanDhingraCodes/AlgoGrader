import { House, Vote, MessageSquareDot, ListVideo } from "lucide-react";

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

export { sidebarLinks };
