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

const logos = [Google, Figma, Github, Microsoft, Netflix, Notion, Slack];

const feedbacks = [
  {
    content:
      "Day 2 on the platform and I’m already hooked! 🔥 The personalized playlists and progress charts are game-changers. Makes coding practice so much more structured.",
    name: "Aarav Mehta",
    title: "Student",
  },
  {
    content:
      "Big thanks to the team for creating such an awesome coding platform. Love how easy it is to track my improvement over time! 📈",
    name: "Neha Sharma",
    title: "Student",
  },
  {
    content:
      "Just received my ‘Code Warrior’ badge 👕 — such a cool way to stay motivated! This platform really makes learning to code fun. 💻🚀",
    name: "Rohan Verma",
    title: "Student",
  },
  {
    content:
      "Explored custom playlists and different problem types today. The platform lets me experiment with my own learning path. Brilliant! 🤓💡",
    name: "Divya Kapoor",
    title: "Student",
  },
  {
    content:
      "This team is full of innovation! The visual stats, the curated challenges — everything is designed to push you forward. Highly recommend! 👏",
    name: "Siddharth Rao",
    title: "Founder",
  },
  {
    content:
      "Just won ₹10K in a coding contest on the platform! 🎉 Incredible feeling — thank you for keeping things exciting and rewarding!",
    name: "Ishita Desai",
    title: "Student",
  },
  {
    content:
      "Day 2 on the platform and I’m already hooked! 🔥 The personalized playlists and progress charts are game-changers. Makes coding practice so much more structured.",
    name: "Aarav Mehta",
    title: "Student",
  },
  {
    content:
      "Big thanks to the team for creating such an awesome coding platform. Love how easy it is to track my improvement over time! 📈",
    name: "Neha Sharma",
    title: "Student",
  },
  {
    content:
      "Just received my ‘Code Warrior’ badge 👕 — such a cool way to stay motivated! This platform really makes learning to code fun. 💻🚀",
    name: "Rohan Verma",
    title: "Student",
  },
  {
    content:
      "Explored custom playlists and different problem types today. The platform lets me experiment with my own learning path. Brilliant! 🤓💡",
    name: "Divya Kapoor",
    title: "Student",
  },
  {
    content:
      "This team is full of innovation! The visual stats, the curated challenges — everything is designed to push you forward. Highly recommend! 👏",
    name: "Siddharth Rao",
    title: "Founder",
  },
  {
    content:
      "Just won ₹10K in a coding contest on the platform! 🎉 Incredible feeling — thank you for keeping things exciting and rewarding!",
    name: "Ishita Desai",
    title: "Student",
  },
];

export { sidebarLinks, adminLinks, NavLinks, logos, feedbacks };
