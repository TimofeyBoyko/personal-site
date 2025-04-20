export const layoutStyles = {
  // Device independent styles
  general: "mx-auto flex min-h-screen w-full flex-col px-6",

  // Device specific styles
  lg: "lg:min-w-[900px] lg:max-w-[1000px] lg:flex-row lg:gap-4 lg:px-12",

  // Combined container classes
  get container() {
    return [this.general, this.lg].filter(Boolean).join(" ");
  },
};
