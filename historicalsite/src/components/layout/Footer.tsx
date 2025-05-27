import Link from "next/link";
import Image from "next/image";
import React from "react";

export default function Footer() {
  return (
    <footer className="w-full bg-stone-900 text-stone-50 px-6 md:px-16 py-12 md:py-20 border-t border-stone-800">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-10 md:gap-20 items-start justify-between">
        {" "}
        {/* Logo & Description */}
        <div className="flex flex-col gap-4 md:w-1/4 w-full items-start">
          <Image
            className="w-40 h-28 object-contain mb-2"
            src="/home/MainImageAbout.jpg"
            alt="Logo"
            width={160}
            height={112}
          />
          <p className="text-zinc-400 text-base leading-snug">
            Historical Site - Preserving history, connecting generations.
          </p>
        </div>
        {/* Navigation */}
        <nav className="flex-1 grid grid-cols-2 md:grid-cols-3 gap-8 w-full">
          <div>
            <h4 className="font-semibold mb-3 text-lg">Navigation</h4>
            <ul className="space-y-2 text-zinc-300">
              <li>
                <Link href="/" className="hover:text-blue-400 transition">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-blue-400 transition">
                  About
                </Link>
              </li>
              <li>
                <Link
                  href="/explore"
                  className="hover:text-blue-400 transition"
                >
                  Explore
                </Link>
              </li>
              <li>
                <Link href="/events" className="hover:text-blue-400 transition">
                  Events
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="hover:text-blue-400 transition"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-3 text-lg">Contact</h4>
            <ul className="space-y-2 text-zinc-300">
              <li>1 Historical Site St, Thu Duc, HCMC</li>
              <li>bqldtnthl_sovhtt@hanoi.gov.vn</li>
              <li>0822446116 | 0825112668</li>
              <li>024.39342253 | 024.39342317</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-3 text-lg">Opening Hours</h4>
            <ul className="space-y-2 text-zinc-300">
              <li>Mon - Sun: 8:00 - 17:00</li>
              <li>Holidays: 8:00 - 17:00</li>
            </ul>
          </div>
        </nav>
      </div>
      <div className="max-w-6xl mx-auto mt-10 pt-6 border-t border-stone-800 flex flex-col md:flex-row items-center justify-between gap-4">
        <span className="text-zinc-400 text-sm">
          &copy; 2024 Historical Site. All rights reserved.
        </span>
        <div className="flex gap-3">
          <Link
            href="#"
            aria-label="Facebook"
            className="w-9 h-9 flex items-center justify-center rounded-full bg-stone-800 hover:bg-blue-600 transition"
          >
            <svg fill="currentColor" viewBox="0 0 24 24" className="w-5 h-5">
              <path d="M22.675 0h-21.35C.595 0 0 .592 0 1.326v21.348C0 23.408.595 24 1.325 24h11.495v-9.294H9.692v-3.622h3.128V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.797.143v3.24l-1.918.001c-1.504 0-1.797.715-1.797 1.763v2.313h3.587l-.467 3.622h-3.12V24h6.116C23.406 24 24 23.408 24 22.674V1.326C24 .592 23.406 0 22.675 0" />
            </svg>
          </Link>
          <Link
            href="#"
            aria-label="Instagram"
            className="w-9 h-9 flex items-center justify-center rounded-full bg-stone-800 hover:bg-pink-500 transition"
          >
            <svg fill="currentColor" viewBox="0 0 24 24" className="w-5 h-5">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.334 3.608 1.308.974.974 1.246 2.241 1.308 3.608.058 1.266.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.062 1.366-.334 2.633-1.308 3.608-.974.974-2.241 1.246-3.608 1.308-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-1.366-.062-2.633-.334-3.608-1.308-.974-.974-1.246-2.241-1.308-3.608C2.175 15.647 2.163 15.267 2.163 12s.012-3.584.07-4.85c.062-1.366.334-2.633 1.308-3.608.974-.974 2.241-1.246 3.608-1.308C8.416 2.175 8.796 2.163 12 2.163zm0-2.163C8.741 0 8.332.013 7.052.072 5.771.131 4.659.414 3.678 1.395 2.697 2.376 2.414 3.488 2.355 4.769.013 8.332 0 8.741 0 12c0 3.259.013 3.668.072 4.948.059 1.281.342 2.393 1.323 3.374.981.981 2.093 1.264 3.374 1.323C8.332 23.987 8.741 24 12 24c3.259 0 3.668-.013 4.948-.072 1.281-.059 2.393-.342 3.374-1.323.981-.981 1.264-2.093 1.323-3.374.059-1.28.072-1.689.072-4.948 0-3.259-.013-3.668-.072-4.948-.059-1.281-.342-2.393-1.323-3.374-.981-.981-2.093-1.264-3.374-1.323C15.668.013 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zm0 10.162a3.999 3.999 0 1 1 0-7.998 3.999 3.999 0 0 1 0 7.998zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
            </svg>
          </Link>
          <Link
            href="#"
            aria-label="YouTube"
            className="w-9 h-9 flex items-center justify-center rounded-full bg-stone-800 hover:bg-red-600 transition"
          >
            <svg fill="currentColor" viewBox="0 0 24 24" className="w-5 h-5">
              <path d="M23.498 6.186a2.994 2.994 0 0 0-2.112-2.112C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.386.574A2.994 2.994 0 0 0 .502 6.186C0 8.072 0 12 0 12s0 3.928.502 5.814a2.994 2.994 0 0 0 2.112 2.112C4.5 20.5 12 20.5 12 20.5s7.5 0 9.386-.574a2.994 2.994 0 0 0 2.112-2.112C24 15.928 24 12 24 12s0-3.928-.502-5.814zM9.75 15.5v-7l6.5 3.5-6.5 3.5z" />
            </svg>
          </Link>
        </div>
      </div>
    </footer>
  );
}
