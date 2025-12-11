"use client";

import { useEffect, useState } from "react";

export default function AnimatedFavicon() {
  useEffect(() => {
    // Pixel art definition (1 = pixel, 0 = empty)
    // Frame 1: Arms Down
    const frame1 = [
        "00100000100",
        "00010001000",
        "00111111100",
        "01101110110",
        "11111111111",
        "10111111101",
        "10100000101",
        "00011011000"
    ];

    // Frame 2: Arms Up
    const frame2 = [
        "00100000100",
        "10010001001",
        "10111111101",
        "11101110111",
        "11111111111",
        "00111111100",
        "00100000100",
        "01000000010"
    ];

    const generateSvg = (map: string[]) => {
      const rows = map.length;
      const cols = map[0].length;
      const pixelSize = 2; // size in svg units
      
      let rects = "";
      for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
          if (map[y][x] === '1') {
             // Emerald-400 equivalent #34d399 or #4ade80
             rects += `<rect x="${x}" y="${y}" width="1" height="1" fill="#4ade80"/>`;
          }
        }
      }

      // We wrap it in a dark background circle/rounded-square to match the theme
      return `
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${cols} ${rows}" width="32" height="32" style="shape-rendering:crispEdges; background: #020617; border-radius: 20%;">
           <style>rect { shape-rendering: crispEdges; }</style>
           <!-- Background fill just in case (optional, we used style above) -->
           <rect width="${cols}" height="${rows}" fill="#020617" />
           ${rects}
        </svg>
      `.trim();
    };

    const icon1 = `data:image/svg+xml,${encodeURIComponent(generateSvg(frame1))}`;
    const icon2 = `data:image/svg+xml,${encodeURIComponent(generateSvg(frame2))}`;

    let isFrame1 = true;
    
    // Find or create the favicon link element
    let link: HTMLLinkElement | null = document.querySelector("link[rel~='icon']");
    if (!link) {
      link = document.createElement('link');
      link.rel = 'icon';
      document.head.appendChild(link);
    }

    const intervalId = setInterval(() => {
      if (link) {
        link.href = isFrame1 ? icon2 : icon1;
        isFrame1 = !isFrame1;
      }
    }, 500); // Toggle every 500ms

    return () => clearInterval(intervalId);
  }, []);

  return null; // This component renders nothing visually on the page
}
