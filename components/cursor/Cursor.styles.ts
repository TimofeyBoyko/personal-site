export const cursorStyles = {
  // Device independent styles
  general: "pointer-events-none fixed inset-0 z-30 transition duration-300",

  // Device specific styles
  lg: "lg:absolute",

  // Combined container classes
  get container() {
    return [this.general, this.lg].filter(Boolean).join(" ");
  },

  // Background style generator
  getBackgroundStyle: (x: number, y: number) => {
    return `radial-gradient(600px at ${x}px ${y}px, rgba(29, 78, 216, 0.15) 0%, transparent 80%)`;
  },
};
