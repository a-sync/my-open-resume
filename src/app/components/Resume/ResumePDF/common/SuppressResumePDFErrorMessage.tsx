"use client";

/**
 * Suppress ResumePDF development errors.
 * See ResumePDF doc string for context.
 */
if (typeof window !== "undefined" && window.location.hostname === "localhost") {
  const consoleError = console.error;
  const SUPPRESSED_WARNINGS = ["DOCUMENT", "PAGE", "TEXT", "VIEW"];
  console.error = function filterWarnings(msg, ...args) {
    const wrapFalse = Boolean(args[0] === "false" && args[1] === "wrap");
    if (!SUPPRESSED_WARNINGS.some((entry) => args[0]?.includes(entry)) && !wrapFalse) {
      consoleError(msg, ...args);
    }
  };
}

export const SuppressResumePDFErrorMessage = () => {
  return <></>;
};
