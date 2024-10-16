"use client";

import React from "react";
import { useTheme } from "next-themes";

function Themeswitcher() {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <button className="" onClick={toggleTheme}>
      {theme === "light" ? (
        <div className="flex items-center gap-1">
          <span className="md:block hidden">Dark</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="30"
            height="30"
            viewBox="0 0 32 32"
          >
            <g fill="none">
              <path
                fill="#FCD53F"
                d="M23.41 5.632c.5 2.04.56 4.26.02 6.56c-1.26 5.33-5.64 9.51-11.02 10.48c-2.91.53-5.68.13-8.09-.92c-.56-.25-1.09.39-.8.93c2.65 4.88 8.11 8 14.22 7.19c6.23-.83 11.22-5.91 11.97-12.15c.6-5.18-1.6-9.86-5.28-12.75c-.47-.36-1.16.08-1.02.66"
              />
              <path
                fill="#F9C23C"
                d="M27.87 12.562a1.57 1.57 0 1 1-3.14 0a1.57 1.57 0 0 1 3.14 0m-12.92 12.88a1.57 1.57 0 1 1-3.14 0a1.57 1.57 0 0 1 3.14 0m11.85-6.47a.99.99 0 1 0 0-1.98a.99.99 0 0 0 0 1.98m-2 3.01a3 3 0 1 1-6 0a3 3 0 0 1 6 0"
              />
            </g>
          </svg>
        </div>
      ) : (
        <div className="flex items-center gap-1">
          <span className="md:block hidden">Light</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="30"
            height="30"
            viewBox="0 0 512 512"
          >
            <defs>
              <linearGradient
                id="meteoconsClearDayFill0"
                x1="150"
                x2="234"
                y1="119.2"
                y2="264.8"
                gradientUnits="userSpaceOnUse"
              >
                <stop offset="0" stop-color="#fbbf24" />
                <stop offset=".5" stop-color="#fbbf24" />
                <stop offset="1" stop-color="#f59e0b" />
              </linearGradient>
              <symbol id="meteoconsClearDayFill1" viewBox="0 0 384 384">
                <circle
                  cx="192"
                  cy="192"
                  r="84"
                  fill="url(#meteoconsClearDayFill0)"
                  stroke="#f8af18"
                  stroke-miterlimit="10"
                  stroke-width="6"
                />
                <path
                  fill="none"
                  stroke="#fbbf24"
                  stroke-linecap="round"
                  stroke-miterlimit="10"
                  stroke-width="24"
                  d="M192 61.7V12m0 360v-49.7m92.2-222.5l35-35M64.8 319.2l35.1-35.1m0-184.4l-35-35m254.5 254.5l-35.1-35.1M61.7 192H12m360 0h-49.7"
                >
                  <animateTransform
                    additive="sum"
                    attributeName="transform"
                    dur="6s"
                    repeatCount="indefinite"
                    type="rotate"
                    values="0 192 192; 45 192 192"
                  />
                </path>
              </symbol>
            </defs>
            <use
              width="384"
              height="384"
              href="#meteoconsClearDayFill1"
              transform="translate(64 64)"
            />
          </svg>
        </div>
      )}
    </button>
  );
}

export default Themeswitcher;
