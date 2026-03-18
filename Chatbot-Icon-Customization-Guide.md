# Glass Nexus Chatbot Icon - Customization Guide

This guide explains how to customize the "Glass Nexus" animated chatbot icon found in `app/globals.css`. The icon uses advanced CSS techniques like spatial glassmorphism, morphing fluid border-radii, and synchronized keyframe animations.

## CSS Variables (Tokens)

At the top of the CSS file (`app/globals.css`), there is a `:root` block controlling the primary themes and scale of the chatbot.

```css
:root {
  /* Change these HSL values to match your brand's color palette */
  --nx-primary: 160 84% 39%;   /* Main color used for gradients and shadows */
  --nx-accent: 142 71% 45%;    /* Secondary color used for aura mixing */
  --nx-highlight: 175 70% 41%; /* Accent color for sharp flares */
  
  /* Size of the outer frosted glass box. Change this to scale the bot. */
  --nx-size: 72px;             
}
```

---

## 1. The Liquid Glass Body (`.nexus-body`)

The main container is a frosted glass cube that organically morphs into a sphere and back.

**How to change the "squishiness" (Shape Morphing):**
Find the `@keyframes morph_fluid` block. The `border-radius` property uses 8 percentages (4 for the horizontal axis, 4 for the vertical axis, separated by a `/`).
*   **To make it more circular:** Keep the numbers close to `50%`.
*   **To make it more squishy/wobbly:** Increase the variance (e.g., use `30%` and `70%`).

```css
@keyframes morph_fluid {
  0%   { border-radius: 50%; } /* Starts as a perfect circle */
  33%  { border-radius: 42% 58% 70% 30% / 45% 45% 55% 55%; } /* Morphs into a blob */
  66%  { border-radius: 58% 42% 35% 65% / 55% 55% 45% 45%; } /* Morphs into a different blob */
  100% { border-radius: 50%; } /* Returns to a circle */
}
```

**How to change the Speed of the Morph:**
Find the `.nexus-body` class and locate its `animation` property.
*   Change `8s` to a lower number (like `4s`) to make it wiggle faster.

```css
.nexus-body {
  /* ...other styles... */
  /* Change "8s" to adjust the morph speed */
  animation: morph_fluid 8s ease-in-out infinite alternate; 
}
```

**How to adjust the Glass Transparency:**
Inside `.nexus-body`:
*   Change `background: rgba(4, 15, 10, 0.4);` to adjust the tint color and darkness.
*   Change `backdrop-filter: blur(24px);` to increase or decrease how "frosted" the glass is.

---

## 2. The Emoji Orb (`.nx-orb`)

This is the central face. It floats up and down independently of the glass box.

**How to change the Base Color of the Face:**
Inside `.nx-orb`:
*   Look for the `background` property. It uses two `radial-gradient`s.
*   The first gradient is the **white glare** at the top left.
*   The second gradient controls the **base color**. You can safely swap out `hsl(var(--nx-accent))` and `hsl(var(--nx-primary))` for hex codes like `#ff0000` to make it red.

```css
.nx-orb {
  background:
    /* Gradient 1: Top-left light glare */
    radial-gradient(circle at 35% 25%, rgba(255, 255, 255, 0.64), rgba(255,255,255,.05) 25%, transparent 35%),
    
    /* Gradient 2: Main body color (Accent -> Primary -> Dark Green shadow) */
    radial-gradient(circle at 50% 50%, hsl(var(--nx-accent)), hsl(var(--nx-primary)) 45%, #064e3b 90%);
}
```

---

## 3. The Sonar Rings (`.nx-sonar`)

These rings expand outward from behind the emoji to simulate listening/AI processing.

**How to change the Speed and Timing of the Rings:**
Find the `@keyframes sonarPulse` block.
*   The animation dictates that the rings start at `scale(.75)` (small) and grow to `scale(1.4)` (large) while fading out (`opacity: 0`).

To adjust the timing, find the `.nx-sonar`, `.nx-sonar::before`, and `.nx-sonar::after` classes.
*   Change the `4s` duration to make the pulses faster or slower.
*   Change the delays (`1.3s`, `2.6s`) to adjust the gap between the rings.

```css
.nx-sonar { animation: sonarPulse 4s ease-out infinite; }
.nx-sonar::before { animation: sonarPulse 4s ease-out infinite 1.3s; }
.nx-sonar::after { animation: sonarPulse 4s ease-out infinite 2.6s; }
```

---

## 4. The Eyes and Blink (`.nx-eye`, `.nx-eye2`)

The eyes blink by squishing their vertical scale to `0.10` very quickly.

**How to adjust the Eye Size:**
Find the `.nx-eye, .nx-eye2` block.
*   Change `width` and `height` (currently `11px`).

**How to adjust the Blink Rate:**
Find the `@keyframes blink` block.
*   This animation compresses the `scaleY()` strictly between `46%` and `52%` of the timeline, making for a swift, natural blink.
*   To blink more often, modify the animation time on the `.nx-eye` class (currently `animation: blink 6s infinite;`).

```css
@keyframes blink {
  0%, 46%, 52%, 100% { transform: scaleY(1); } /* Eyes open */
  49% { transform: scaleY(.10); }              /* Eyes squeezed shut */
}
```
