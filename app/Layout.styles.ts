// Root layout styles
export const layoutStyles = {
  // Body styles
  bodyGeneral:
    "relative max-h-dvh overflow-x-hidden overflow-y-auto bg-slate-900 font-sans leading-relaxed text-slate-400 antialiased",
  bodySelection: "selection:bg-teal-300 selection:text-teal-900",

  // Combined style getters
  get body() {
    return [this.bodyGeneral, this.bodySelection].filter(Boolean).join(" ");
  },
};
