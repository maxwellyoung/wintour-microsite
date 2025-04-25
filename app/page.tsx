"use client";

import { useEffect, useState, useRef, Fragment } from "react";
import Image from "next/image";
import { Play, Pause, X, Plus, ArrowRight, Loader } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

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
    {
      href: "https://open.spotify.com/track/0HVhxu3jp6TkLbqN8fi8Fl?si=96c74e819fc74d44s",
      label: "Spotify",
    },
    {
      href: "https://music.apple.com/nz/album/wintour/1802842596?i=1802842597",
      label: "Apple",
    },
    {
      href: "https://on.soundcloud.com/cn77Y5iKFpUehY157",
      label: "SoundCloud",
    },
    { href: "https://www.youtube.com/watch?v=gHFMkPDehuI", label: "YouTube" },
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
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current
        .play()
        .then(() => {
          setIsPlaying(true);
        })
        .catch((error) => {
          console.error("Playback error:", error);
        });
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
        className="fixed top-0 left-0 rounded-full pointer-events-none z-50 hidden md:flex items-center justify-center text-xs font-mono uppercase tracking-widest"
        variants={variants}
        animate={cursorVariant}
        transition={{ type: "spring", stiffness: 500, damping: 28 }}
      >
        {cursorText}
      </motion.div>

      <main className="min-h-screen bg-background text-foreground overflow-hidden relative">
        {/* Lyrics overlay */}
        {/* Main content */}
        <div className="grid grid-cols-1 md:grid-cols-12 min-h-screen">
          {/* Image section */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="md:col-span-7 w-full aspect-square md:h-screen relative"
          >
            <Image
              src="/images/wintour-cover.png"
              alt="Cover art for Maxwell Young's 'Wintour' featuring a jumper silhouette"
              fill
              className="object-cover "
              loading="lazy"
            />
            {/* removed hero overlay for minimal design */}
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
                <h1 className="font-mono text-xs tracking-widest uppercase text-foreground/50">
                  NEW SINGLE
                </h1>
                <h1 className="text-xl font-medium tracking-tight">
                  Maxwell Young
                </h1>
              </div>
            </header>

            {/* Main section always visible */}
            <div className="flex-1 flex flex-col justify-between">
              <div className="mb-auto">
                <h2 className="text-rust text-6xl md:text-8xl font-bold mb-2">
                  Wintour
                </h2>
                <div className="mt-8 flex items-center">
                  <div className="font-mono text-xs uppercase text-foreground/50 mr-4">
                    Release
                  </div>
                  <div className="text-lg font-semibold text-foreground tracking-tight">
                    25 April 2025
                  </div>
                </div>
              </div>

              <div className="space-y-8 pt-8 mt-auto">
                <div className="flex items-center space-x-4">
                  <button
                    onClick={togglePlayback}
                    className="w-16 h-16 rounded-full bg-rust flex items-center justify-center hover:bg-rust/90 transition-colors text-white disabled:opacity-50"
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
                    <div className="h-1 bg-rust/20 relative rounded-full overflow-hidden">
                      <div
                        ref={progressRef}
                        className="absolute top-0 left-0 h-full bg-rust"
                        style={{ width: "0%" }}
                      />
                    </div>
                    <div className="flex justify-between mt-2">
                      <span className="text-xs font-mono text-foreground/50">
                        {isPlaying ? "PLAYING PREVIEW" : "PREVIEW"}
                      </span>
                      <span className="text-xs font-mono text-foreground/50">
                        01:19
                      </span>
                    </div>
                  </div>
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
                      className="inline-flex items-center justify-center space-x-1 bg-rust text-white h-12 px-4 rounded-full uppercase text-xs tracking-tight hover:bg-rust/90 transition"
                    >
                      <span>{label}</span>
                      <ArrowRight size={14} />
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {/* About section appended below */}
            <div className="flex-1 flex flex-col mt-12">
              <div>
                <p className="text-foreground mb-4 leading-relaxed">
                  Pop song.
                </p>
                <p className="text-foreground mb-4 leading-relaxed">
                  Recorded in Auckland, New Zealand.
                </p>
                <div className="mt-12 border-l-2 border-rust pl-4">
                  <p className="text-foreground font-medium">
                    Written & produced by Maxwell Young
                    <br />
                    Mixed and co-produced by Eddie Johnston
                    <br />
                    Artwork by Elijah Broughton
                  </p>
                </div>
              </div>
            </div>

            <footer className="mt-12 pt-6 border-t border-foreground/10">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="font-mono text-xs tracking-widest uppercase text-foreground/50 mb-2">
                    Connect
                  </div>
                  <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                    <a
                      href="https://open.spotify.com/artist/5HONdRTLNvBjlD2LirKp0q?si=158b2846b4f942f3"
                      className="text-sm text-foreground hover:underline transition"
                      onMouseEnter={() => cursorEnter("SPOTIFY", "text")}
                      onMouseLeave={cursorLeave}
                    >
                      Spotify
                    </a>
                    <a
                      href="https://music.apple.com/nz/artist/maxwell-young/1113632139"
                      className="text-sm text-foreground hover:underline transition"
                      onMouseEnter={() => cursorEnter("APPLE", "text")}
                      onMouseLeave={cursorLeave}
                    >
                      Apple
                    </a>
                    <a
                      href="https://instagram.com/maxwell_young"
                      className="text-sm text-foreground hover:underline transition"
                      onMouseEnter={() => cursorEnter("IG", "text")}
                      onMouseLeave={cursorLeave}
                    >
                      Instagram
                    </a>
                    <a
                      href="https://twitter.com/internetmaxwell"
                      className="text-sm text-foreground hover:underline transition"
                      onMouseEnter={() => cursorEnter("TW", "text")}
                      onMouseLeave={cursorLeave}
                    >
                      Twitter
                    </a>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-mono text-xs tracking-widest uppercase text-foreground/50 mb-2 flex justify-end items-baseline space-x-1">
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
