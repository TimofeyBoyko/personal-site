export const groupStyles = {
  // Main Group Component Styles
  // Device independent styles
  general: "group relative grid pb-1 transition-all",

  // Device specific container styles
  sm: "sm:grid-cols-8 sm:gap-8",
  lg: "lg:gap-4 lg:hover:!opacity-100 lg:group-hover/list:opacity-50",

  // Combined container classes
  get container() {
    return [this.general, this.sm, this.lg].filter(Boolean).join(" ");
  },

  // Hover effect styles - general
  hoverEffectGeneral:
    "absolute -inset-x-4 -inset-y-4 z-0 hidden rounded-md transition motion-reduce:transition-none",

  // Hover effect styles - device specific
  hoverEffectLg:
    "lg:-inset-x-6 lg:block lg:group-hover:bg-slate-800/50 lg:group-hover:shadow-[inset_0_1px_0_0_rgba(148,163,184,0.1)] lg:group-hover:drop-shadow-lg",

  // Combined hover effect classes
  get hoverEffect() {
    return [this.hoverEffectGeneral, this.hoverEffectLg]
      .filter(Boolean)
      .join(" ");
  },

  // Content container styles - general
  contentContainerGeneral: "z-10",

  // Content container styles - device specific
  contentContainerSm: "sm:col-span-6",

  // Combined content container classes
  get contentContainer() {
    return [this.contentContainerGeneral, this.contentContainerSm]
      .filter(Boolean)
      .join(" ");
  },

  // Text styles
  contentText: "mt-2 text-sm leading-normal",

  // Sub-component Styles

  // Header Styles
  headerBaseStyles:
    "z-10 mb-2 mt-1 text-xs font-semibold uppercase tracking-wide text-slate-500",
  headerHidden: "hidden",
  headerSm: "sm:col-span-2 sm:inline",

  // Function to generate header classes based on isImage
  getHeaderClasses(isImage: boolean) {
    return [
      this.headerBaseStyles,
      isImage ? this.headerHidden : "",
      this.headerSm,
    ]
      .filter(Boolean)
      .join(" ");
  },

  // Content Header Styles - general
  contentHeaderMainGeneral: "font-medium leading-snug text-slate-200",
  contentHeaderLinkGeneral:
    "group/link inline-flex items-baseline text-base font-medium leading-tight text-slate-200 hover:text-teal-300 focus-visible:text-teal-300",
  contentHeaderLinkSpanGeneral:
    "absolute -inset-x-4 -inset-y-2.5 hidden rounded",
  contentSubHeaderGeneral: "text-slate-500",

  // Content Header Styles - device specific
  contentHeaderLinkSpanLg: "lg:-inset-x-6 lg:-inset-y-4 lg:block",

  // Combined content header styles
  get contentHeaderMain() {
    return this.contentHeaderMainGeneral;
  },

  get contentHeaderLink() {
    return this.contentHeaderLinkGeneral;
  },

  get contentHeaderLinkSpan() {
    return [this.contentHeaderLinkSpanGeneral, this.contentHeaderLinkSpanLg]
      .filter(Boolean)
      .join(" ");
  },

  get contentSubHeader() {
    return this.contentSubHeaderGeneral;
  },

  // Tag styles
  tagGeneral:
    "flex items-center rounded-full bg-teal-400/10 px-3 py-1 text-xs leading-5 font-medium text-teal-300",
  get tag() {
    return this.tagGeneral;
  },

  // TagsList styles
  tagsListContainer: "mt-2 flex flex-wrap",
  tagsListItem: "mt-2 mr-1.5",
};
