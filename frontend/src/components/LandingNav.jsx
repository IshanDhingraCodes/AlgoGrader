import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Link } from "react-router-dom";
import { logo } from "../assets";
import { NavLinks } from "../constants";
import ThemeToggle from "./ui/ThemeToggle";
import { Menu, X } from "lucide-react";

const LandingNav = () => {
  const [isActive, setIsActive] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setIsActive(false);
      }
    };

    if (isActive) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isActive]);

  const fadeVariant = {
    initial: { opacity: 0, y: 10 },
    enter: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: 0.1 + i * 0.08 },
    }),
    exit: { opacity: 0, y: 10, transition: { duration: 0.2 } },
  };

  const menuVariants = {
    open: {
      height: "auto",
      width: 280,
      transition: { duration: 0.3 },
    },
    close: {
      height: 0,
      width: 0,
      transition: { duration: 0.3 },
    },
  };

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "top-[1rem] bg-base-300 bg-opacity-70 dark:bg-neutral-900 backdrop-blur-md shadow-md rounded-xl"
          : "bg-transparent"
      }`}
    >
      <nav
        className="navbar py-4"
        role="navigation"
        aria-label="Main Navigation"
      >
        {/* Logo */}
        <div className="navbar-start">
          <button
            onClick={() => {
              window.scrollTo({ top: 0, behavior: "smooth" });
              setIsActive(false);
            }}
            className="flex items-center gap-2 text-2xl font-bold rounded-xl px-2 py-1 focus:outline-none cursor-pointer"
          >
            <img
              src={logo}
              alt="AlgoGrader logo"
              className="w-10 h-10 rounded-full"
              loading="eager"
            />
            AlgoGrader
          </button>
        </div>

        {/* Desktop Links */}
        <ul className="navbar-center hidden md:flex gap-4">
          {NavLinks.map((nav, i) => (
            <li key={i} className="group">
              <Link
                to={nav.link}
                className="relative text-base font-medium text-base-content/70 px-3 py-2 transition-all duration-200 ease-in-out hover:text-primary hover:scale-[1.05]"
              >
                {nav.title}
              </Link>
            </li>
          ))}
        </ul>

        <div className="navbar-end hidden md:flex items-center gap-4">
          <ThemeToggle />
          <Link
            to="/sign-in"
            className="rounded-full bg-gradient-to-r from-primary to-accent text-white px-6 py-2 font-semibold shadow-lg transform transition duration-300 hover:shadow-xl hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-400"
          >
            Get Started
          </Link>
        </div>

        {/* Mobile Menu */}
        <div className="md:hidden relative navbar-end" ref={menuRef}>
          <motion.div
            variants={menuVariants}
            animate={isActive ? "open" : "close"}
            initial="close"
            className="absolute top-12 right-0 z-40 rounded-2xl overflow-hidden bg-base-300 dark:bg-base-200 shadow-xl backdrop-blur-md"
          >
            <AnimatePresence>
              {isActive && (
                <div className="h-full px-6 py-6 flex flex-col gap-6">
                  {NavLinks.map((nav, i) => (
                    <motion.div
                      key={i}
                      custom={i}
                      variants={fadeVariant}
                      initial="initial"
                      animate="enter"
                      exit="exit"
                    >
                      <Link
                        to={nav.link}
                        className="block text-lg font-medium text-base-content px-3 py-2 rounded-xl hover:bg-base-200 hover:text-primary transition-all"
                        onClick={() => setIsActive(false)}
                      >
                        {nav.title}
                      </Link>
                    </motion.div>
                  ))}
                  <motion.div
                    custom={NavLinks.length}
                    variants={fadeVariant}
                    initial="initial"
                    animate="enter"
                    exit="exit"
                  >
                    <div className="mt-4 flex justify-between items-center">
                      <ThemeToggle />
                      <Link
                        to="/sign-in"
                        className="rounded-full bg-gradient-to-r from-primary to-accent text-white px-6 py-2 font-semibold shadow-lg transform transition duration-300 hover:shadow-xl hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-400"
                        onClick={() => setIsActive(false)}
                      >
                        Get Started
                      </Link>
                    </div>
                  </motion.div>
                </div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Toggle Button */}
          <button
            aria-label={isActive ? "Close menu" : "Open menu"}
            onClick={() => setIsActive((prev) => !prev)}
            className="btn btn-ghost btn-circle text-base-content"
          >
            {isActive ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>
    </header>
  );
};

export default LandingNav;
