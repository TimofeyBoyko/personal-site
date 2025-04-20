// Scrollbar component styles
export const scrollbarStyles = {
  // Container styles - General
  containerGeneral: "relative max-h-dvh overflow-hidden bg-transparent",

  // Content styles - General
  contentGeneral: "max-h-dvh overflow-auto scrollbar-none",

  // Scrollbar styles - General
  scrollbarGeneral: "fixed top-0 right-1 h-full",

  // Track and thumb container styles - General
  trackAndThumbGeneral: "relative w-1 py-2 opacity-30 hover:w-2 hover:opacity-100 h-[calc(100%-16px)]",

  // Track styles - General
  trackGeneral: "absolute h-full w-full",

  // Thumb styles - General
  thumbGeneral: "absolute w-full rounded-xl bg-slate-500",

  // Combined styles getters
  get container() {
    return this.containerGeneral;
  },
  
  get content() {
    return this.contentGeneral;
  },

  get scrollbar() {
    return this.scrollbarGeneral;
  },

  get trackAndThumb() {
    return this.trackAndThumbGeneral;
  },

  get track() {
    return this.trackGeneral;
  },

  get thumb() {
    return this.thumbGeneral;
  }
};
