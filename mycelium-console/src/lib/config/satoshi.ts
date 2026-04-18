import localFont from "next/font/local";

/**
 * Loads the Satoshi font family locally with multiple weights and styles using Next.js localFont utility.
 *
 * The font files are organized into two folders:
 * - `normal`: Upright font styles with weights 300 (light), 400 (regular), and 500 (medium).
 * - `italic`: Italic font styles with matching weights.
 *
 * This configuration enables usage of the CSS variable `--font-satoshi` for consistent font styling
 * across the application. The font-display strategy is set to `'swap'` to enhance font loading performance.
 *
 * @constant
 */
export const satoshi = localFont({
  src: [
    // Normal styles
    {
      path: "../../../public/fonts/normal/satoshi-light.otf",
      weight: "300",
      style: "normal",
    },
    {
      path: "../../../public/fonts/normal/satoshi-regular.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../../public/fonts/normal/satoshi-medium.otf",
      weight: "500",
      style: "normal",
    },

    // Italic styles
    {
      path: "../../../public/fonts/italic/satoshi-light.otf",
      weight: "300",
      style: "italic",
    },
    {
      path: "../../../public/fonts/italic/satoshi-regular.otf",
      weight: "400",
      style: "italic",
    },
    {
      path: "../../../public/fonts/italic/satoshi-medium.otf",
      weight: "500",
      style: "italic",
    },
  ],
  variable: "--font-satoshi",
  display: "swap",
});
