// Main component styles
export const mainStyles = {
  // Main container styles - General
  mainGeneral: "pt-0",

  // Main container styles - Breakpoints
  mainLg: "lg:w-1/2 lg:py-24",

  // Combined container styles
  get container() {
    return [this.mainGeneral, this.mainLg].filter(Boolean).join(" ");
  },
};
