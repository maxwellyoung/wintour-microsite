"use client";
import React, { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";

const releaseDate = new Date("2025-04-25T00:00:00");

function getTimeLeft() {
  const now = new Date();
  const diff = releaseDate.getTime() - now.getTime();
  if (diff <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  }
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);
  return { days, hours, minutes, seconds };
}

export default function Countdown() {
  const [timeLeft, setTimeLeft] = useState(getTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(getTimeLeft());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="font-mono text-xl flex items-baseline space-x-1">
      <span>
        {timeLeft.days > 0
          ? `${timeLeft.days}D ${timeLeft.hours}H ${timeLeft.minutes}M`
          : `${timeLeft.hours}H ${timeLeft.minutes}M`}
      </span>
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={timeLeft.seconds}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
        >
          {timeLeft.seconds}
        </motion.span>
      </AnimatePresence>
      <span>S</span>
    </div>
  );
}
