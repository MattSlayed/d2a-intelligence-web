import type { AbcdClass } from "./types";

/* Business-readable pursuit-class labels (V1.1 UX Transition Note, Change 3).
   DISPLAY ONLY — the underlying AbcdClass "A" | "B" | "C" | "D" and every piece
   of scoring / filtering logic stay exactly as they were. Import these wherever
   a class is shown to the user. */

export const ABCD_LABEL: Record<AbcdClass, string> = {
  A: "Hot Pursuit",
  B: "Active Nurture",
  C: "Watchlist",
  D: "Exclude / Defer",
};

/** Short action verb per class (compact tiles / counters). */
export const ABCD_ACTION: Record<AbcdClass, string> = {
  A: "Pursue now",
  B: "Nurture",
  C: "Watch",
  D: "Defer",
};
