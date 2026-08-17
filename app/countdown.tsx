"use client";

import { useEffect, useState } from "react";

const wedding = new Date("2027-07-25T14:00:00+02:00").getTime();

function remaining() {
  const diff = Math.max(0, wedding - Date.now());
  return {
    days: Math.floor(diff / 86_400_000),
    hours: Math.floor((diff / 3_600_000) % 24),
    minutes: Math.floor((diff / 60_000) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

export default function Countdown() {
  const [time, setTime] = useState(remaining());

  useEffect(() => {
    const timer = window.setInterval(() => setTime(remaining()), 1000);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <div className="countdownGrid" aria-label={`${time.days} days, ${time.hours} hours, ${time.minutes} minutes and ${time.seconds} seconds until the wedding`}>
      {Object.entries(time).map(([label, value]) => (
        <div className="countTile" key={label}>
          <span>{String(value).padStart(2, "0")}</span>
          <small>{label}</small>
        </div>
      ))}
    </div>
  );
}
