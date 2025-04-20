// Section component styles
export const sectionStyles = {
  // Section container styles - General and Breakpoints
  sectionGeneral: "mb-16 scroll-mt-16",
  sectionLastLg: "lg:mb-0",
  sectionNotLastLg: "lg:mb-36",
  sectionScrollLg: "lg:scroll-mt-24",

  // Header container styles - General and Breakpoints
  headerContainerGeneral:
    "sticky top-0 z-20 -mx-6 mb-4 w-[calc(100vw-16px)] bg-slate-900/75 px-6 py-5 backdrop-blur",
  headerContainerLg:
    "lg:sr-only lg:relative lg:top-auto lg:mx-auto lg:w-[calc(100vw-16px)] lg:px-0 lg:py-0 lg:opacity-0",

  // Header text styles - General and Breakpoints
  headerTextGeneral:
    "text-sm font-bold uppercase tracking-widest text-slate-200",
  headerTextLg: "lg:sr-only",

  // Combined style getters
  getContainerStyles(isLast: boolean) {
    return [
      this.sectionGeneral,
      isLast ? this.sectionLastLg : this.sectionNotLastLg,
      this.sectionScrollLg,
    ]
      .filter(Boolean)
      .join(" ");
  },

  get headerContainer() {
    return [this.headerContainerGeneral, this.headerContainerLg]
      .filter(Boolean)
      .join(" ");
  },

  get headerText() {
    return [this.headerTextGeneral, this.headerTextLg]
      .filter(Boolean)
      .join(" ");
  },
};
