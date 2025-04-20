"use client";

import { useEffect, useState, useRef, Fragment } from "react";
import Image from "next/image";
import { Play, Pause, X, Plus, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import dynamic from "next/dynamic";
import Link from "next/link";

const Countdown = dynamic(() => import("@/components/Countdown"), {
  ssr: false,
});

export default function Home() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeSection, setActiveSection] = useState<"main" | "about">("main");
  const [showLyrics, setShowLyrics] = useState(false);
  const [cursor, setCursor] = useState({ x: 0, y: 0 });
  const [cursorText, setCursorText] = useState("");
  const [cursorVariant, setCursorVariant] = useState("default");

  const audioRef = useRef<HTMLAudioElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  // Lyrics data structured for visual presentation
  const lyrics = [
    "yea im on anna wintour diet",
    "plus that shit straight from her privates",
    "i told u before no crying",
    "i'll take care of you girl",
    "i walk towards the college",
    "not rich, so im back at college",
    "still unbutton the collar",
    "the label says its top dollar",
    "and i",
    "girl i just hopped out the way",
    "and u know why i say that",
    "girl i just hopped up to you you you",
    "girl i just hopped out the way way",
    "i feel like britney spears caus i'm always misunderstood",
    "take me lucky, take me toxic",
    "let me jump inside ur pool",
    "i'm on demon, there's no reason why i'm acting such a fool",
    "gets outrageous on occasion",
    "i make anybody cool",
    "fuck a slut shame, fuck the gossip",
    "clean ur shit, shut up and mop it",
    "there's one thing i'm never stopping",
    "find myself a worthy option",
    "run these streets",
    "i run ur mind",
    "i tell why, i never lie",
    "i don't know why u make it feel like that",
  ];

  const streamingLinks = [
    { href: "#", label: "Spotify" },
    { href: "#", label: "Apple" },
    { href: "#", label: "SoundCloud" },
    { href: "#", label: "YouTube" },
  ];

  useEffect(() => {
    const updateProgress = () => {
      if (audioRef.current && progressRef.current) {
        const progress =
          (audioRef.current.currentTime / audioRef.current.duration) * 100;
        progressRef.current.style.width = `${progress}%`;
      }
    };

    const audioElement = audioRef.current;
    if (audioElement) {
      audioElement.addEventListener("timeupdate", updateProgress);
    }

    return () => {
      if (audioElement) {
        audioElement.removeEventListener("timeupdate", updateProgress);
      }
    };
  }, []);

  const togglePlayback = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  // Custom cursor logic
  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      setCursor({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", moveCursor);
    return () => {
      window.removeEventListener("mousemove", moveCursor);
    };
  }, []);

  const cursorEnter = (text: string, variant = "text") => {
    setCursorText(text);
    setCursorVariant(variant);
  };

  const cursorLeave = () => {
    setCursorText("");
    setCursorVariant("default");
  };

  const variants = {
    default: {
      height: 32,
      width: 32,
      x: cursor.x - 16,
      y: cursor.y - 16,
      backgroundColor: "rgba(209, 59, 36, 0)",
      mixBlendMode: "difference" as const,
    },
    text: {
      height: 80,
      width: 80,
      x: cursor.x - 40,
      y: cursor.y - 40,
      backgroundColor: "rgba(209, 59, 36, 0.2)",
      mixBlendMode: "normal" as const,
    },
    button: {
      height: 64,
      width: 64,
      x: cursor.x - 32,
      y: cursor.y - 32,
      backgroundColor: "rgba(209, 59, 36, 0.5)",
      mixBlendMode: "difference" as const,
    },
  };

  // Close lyrics overlay on ESC key
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && showLyrics) {
        setShowLyrics(false);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [showLyrics]);

  return (
    <Fragment>
      {/* Custom cursor */}
      <motion.div
        className="fixed top-0 left-0 rounded-full pointer-events-none z-50 flex items-center justify-center text-xs font-mono uppercase tracking-widest hidden md:flex"
        variants={variants}
        animate={cursorVariant}
        transition={{ type: "spring", stiffness: 500, damping: 28 }}
      >
        {cursorText}
      </motion.div>

      <main className="min-h-screen bg-[#f5f4f0] text-[#111] overflow-hidden relative">
        {/* Lyrics overlay */}
        <AnimatePresence>
          {showLyrics && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 flex items-center justify-center p-4"
              onClick={() => setShowLyrics(false)}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="bg-[#111] text-[#f5f4f0] max-w-screen-md w-full max-h-[80vh] overflow-y-auto overflow-x-hidden rounded-lg border-2 border-rust shadow-lg scrollbar-thin scrollbar-thumb-rust scrollbar-track-black"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="px-6 py-6 md:py-10 relative">
                  <button
                    onClick={() => setShowLyrics(false)}
                    className="absolute top-4 right-4 text-[#f5f4f0] hover:text-rust transition-colors z-50"
                    onMouseEnter={() => cursorEnter("CLOSE", "button")}
                    onMouseLeave={cursorLeave}
                  >
                    <X size={24} />
                  </button>

                  <h2 className="font-mono text-4xl md:text-5xl uppercase text-rust mb-6 text-center animate-fadeInUp">
                    LYRICS
                  </h2>

                  <div className="space-y-6 px-2">
                    {lyrics.map((line, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.03, duration: 0.3 }}
                        className="font-mono uppercase text-lg md:text-xl leading-relaxed text-center hover:text-rust transition-colors"
                      >
                        {line}
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main content */}
        <div className="grid grid-cols-1 md:grid-cols-12 min-h-screen">
          {/* Image section */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="md:col-span-7 h-[50vh] md:h-screen relative"
          >
            <Image
              src="/images/wintour-cover.png"
              alt="Cover art for Maxwell Young's 'Wintour' featuring a jumper silhouette"
              fill
              className="object-cover "
              loading="lazy"
            />
            <div className="absolute inset-0 bg-black/10 mix-blend-multiply" />
          </motion.div>

          {/* Content section */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="md:col-span-5 flex flex-col p-8 md:p-12 relative"
          >
            <header className="flex justify-between items-start mb-16">
              <div>
                <h1 className="font-mono text-xs tracking-widest uppercase text-black/50">
                  NEW SINGLE
                </h1>
                <h1 className="text-xl font-medium tracking-tight">
                  Maxwell Young
                </h1>
              </div>
              <nav className="flex items-center space-x-6">
                <button
                  onClick={() => setActiveSection("main")}
                  className={cn(
                    "text-xs uppercase border-b-2 pb-1 transition-all",
                    activeSection === "main"
                      ? "border-rust text-rust"
                      : "border-transparent hover:border-black/20"
                  )}
                  onMouseEnter={() => cursorEnter("VIEW", "text")}
                  onMouseLeave={cursorLeave}
                >
                  Main
                </button>
                <button
                  onClick={() => setActiveSection("about")}
                  className={cn(
                    "text-xs uppercase border-b-2 pb-1 transition-all",
                    activeSection === "about"
                      ? "border-rust text-rust"
                      : "border-transparent hover:border-black/20"
                  )}
                  onMouseEnter={() => cursorEnter("VIEW", "text")}
                  onMouseLeave={cursorLeave}
                >
                  About
                </button>
              </nav>
            </header>

            {activeSection === "main" && (
              <div className="flex-1 flex flex-col justify-between">
                <div className="mb-auto">
                  <h2 className="text-rust text-6xl md:text-8xl font-bold tracking-tighter uppercase mb-2">
                    Wintour
                  </h2>
                  <div className="mt-8 flex items-center">
                    <div className="font-mono text-xs tracking-widest uppercase text-black/50 mr-4">
                      Release
                    </div>
                    <div className="text-lg font-semibold text-black tracking-tight">
                      25 April 2025
                    </div>
                  </div>
                </div>

                <div className="space-y-8 pt-8 mt-auto">
                  <button
                    onClick={() => setShowLyrics(true)}
                    className="bg-rust text-white py-3 px-5 rounded-md uppercase text-sm font-medium hover:bg-rust/90 transition-colors inline-flex items-center space-x-2"
                    onMouseEnter={() => cursorEnter("LYRICS", "button")}
                    onMouseLeave={cursorLeave}
                  >
                    <span>Lyrics</span>
                    <ArrowRight
                      size={18}
                      className="transform group-hover:translate-x-1 transition-transform"
                    />
                  </button>

                  <div className="flex items-center space-x-4">
                    <button
                      onClick={togglePlayback}
                      className="w-16 h-16 rounded-full bg-rust flex items-center justify-center hover:bg-rust/90 transition-colors text-white"
                      onMouseEnter={() =>
                        cursorEnter(isPlaying ? "PAUSE" : "PLAY", "button")
                      }
                      onMouseLeave={cursorLeave}
                    >
                      {isPlaying ? (
                        <Pause size={22} />
                      ) : (
                        <Play size={22} className="ml-1" />
                      )}
                    </button>
                    <div className="flex-1">
                      <div className="h-1 bg-black/20 relative rounded-full overflow-hidden">
                        <div
                          ref={progressRef}
                          className="absolute top-0 left-0 h-full bg-rust"
                          style={{ width: "0%" }}
                        />
                      </div>
                      <div className="flex justify-between mt-2">
                        <span className="text-xs font-mono text-black/50">
                          {isPlaying ? "PLAYING PREVIEW" : "PREVIEW"}
                        </span>
                        <span className="text-xs font-mono text-black/50">
                          01:19
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="border-t border-black/10 pt-6">
                    <div className="flex space-x-2 mb-2">
                      <span className="font-mono text-xs tracking-widest uppercase text-black/50">
                        Countdown
                      </span>
                      <div className="w-2 h-2 bg-rust rounded-full animate-pulse mt-1"></div>
                    </div>
                    <Countdown />
                  </div>

                  <div className="mt-8 grid grid-cols-2 gap-4 mb-8 md:flex md:flex-wrap md:gap-4">
                    {streamingLinks.map(({ href, label }) => (
                      <Link
                        key={label}
                        href={href}
                        onMouseEnter={() =>
                          cursorEnter(label.toUpperCase(), "text")
                        }
                        onMouseLeave={cursorLeave}
                        className="inline-flex items-center justify-center space-x-1 bg-rust text-white h-12 px-4 rounded-full uppercase text-xs tracking-widest hover:bg-rust/90 transition"
                      >
                        <span>{label}</span>
                        <ArrowRight size={14} />
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeSection === "about" && (
              <div className="flex-1 flex flex-col">
                <div>
                  <h2 className="text-rust text-4xl font-bold tracking-tighter uppercase mb-6">
                    About the Single
                  </h2>
                  <p className="text-black/80 mb-4 leading-relaxed">
                    Pop song.
                  </p>
                  <p className="text-black/80 mb-4 leading-relaxed">
                    Recorded in Auckland, New Zealand.
                  </p>
                  <div className="mt-12 border-l-2 border-rust pl-4">
                    <p className="text-black/80 font-medium">
                      Written & produced by Maxwell Young
                      <br />
                      Mixed and co-produced by Eddie Johnston
                      <br />
                      Artwork by Elijah Broughton
                    </p>
                  </div>

                  <div className="mt-12">
                    <button
                      onClick={() => setShowLyrics(true)}
                      className="bg-rust text-white py-3 px-5 rounded-md uppercase text-sm font-medium hover:bg-rust/90 transition-colors inline-flex items-center space-x-2"
                      onMouseEnter={() => cursorEnter("LYRICS", "button")}
                      onMouseLeave={cursorLeave}
                    >
                      <span className="font-medium">View Lyrics</span>
                      <ArrowRight
                        size={18}
                        className="transform group-hover:translate-x-1 transition-transform"
                      />
                    </button>
                  </div>
                </div>
              </div>
            )}

            <footer className="mt-12 pt-6 border-t border-black/10">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="font-mono text-xs tracking-widest uppercase text-black/50 mb-2">
                    Connect
                  </div>
                  <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                    <a
                      href="#"
                      className="text-sm hover:text-rust transition-colors"
                      onMouseEnter={() => cursorEnter("SPOTIFY", "text")}
                      onMouseLeave={cursorLeave}
                    >
                      Spotify
                    </a>
                    <a
                      href="#"
                      className="text-sm hover:text-rust transition-colors"
                      onMouseEnter={() => cursorEnter("APPLE", "text")}
                      onMouseLeave={cursorLeave}
                    >
                      Apple
                    </a>
                    <a
                      href="#"
                      className="text-sm hover:text-rust transition-colors"
                      onMouseEnter={() => cursorEnter("IG", "text")}
                      onMouseLeave={cursorLeave}
                    >
                      Instagram
                    </a>
                    <a
                      href="#"
                      className="text-sm hover:text-rust transition-colors"
                      onMouseEnter={() => cursorEnter("TW", "text")}
                      onMouseLeave={cursorLeave}
                    >
                      Twitter
                    </a>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-mono text-xs tracking-widest uppercase text-black/50 mb-2 flex justify-end items-baseline space-x-1">
                    <span>©</span>
                    <span>2025</span>
                  </div>
                  <div className="text-sm">All Rights Reserved</div>
                </div>
              </div>
            </footer>
          </motion.div>
        </div>

        <audio
          ref={audioRef}
          src="https://ildii12az7.ufs.sh/f/wzsKGXUR0TSZ41xUVtolzU5k3FcGZ8dJQj92ALRwW0BhoKHe"
          preload="none"
        />

        {/* Mobile streaming links sticky footer hidden on desktop */}
        {/* Removed mobile-only pre-save links in favor of unified streaming CTA above */}
      </main>
    </Fragment>
  );
}
