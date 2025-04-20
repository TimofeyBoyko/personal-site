// Header styles
export const headerStyles = {
  // Header container styles - General
  containerGeneral: "py-12",

  // Header container styles - Breakpoints
  containerLg:
    "lg:sticky lg:top-0 lg:flex lg:max-h-screen lg:w-1/2 lg:flex-col lg:justify-between lg:py-24",

  // Combined container styles
  get container() {
    return [this.containerGeneral, this.containerLg].filter(Boolean).join(" ");
  },

  // Info component styles - General
  infoTitleGeneral: "text-4xl font-bold tracking-tight text-slate-200 select-none",
  infoSubtitleGeneral: "mt-3 text-lg font-medium tracking-tight text-slate-200 select-none",
  infoDescriptionGeneral: "mt-4 max-w-xs leading-normal select-none",

  // Info component styles - Breakpoints
  infoTitleLg: "lg:text-5xl",
  infoSubtitleLg: "lg:text-xl",

  // Combined info styles
  get infoTitle() {
    return [this.infoTitleGeneral, this.infoTitleLg].filter(Boolean).join(" ");
  },

  get infoSubtitle() {
    return [this.infoSubtitleGeneral, this.infoSubtitleLg]
      .filter(Boolean)
      .join(" ");
  },

  get infoDescription() {
    return this.infoDescriptionGeneral;
  },

  // Navigation styles - General
  navigationContainerGeneral: "hidden",
  navigationListGeneral: "mt-16 w-max",
  navigationItemGeneral: "group flex items-center py-3",
  navigationIndicatorGeneral:
    "mr-4 h-px w-8 bg-slate-600 transition-all group-hover:w-16 group-hover:bg-slate-200 group-focus-visible:w-16 group-focus-visible:bg-slate-200 motion-reduce:transition-none",
  navigationIndicatorActiveState:
    "mr-4 h-px w-16 bg-slate-200 transition-all motion-reduce:transition-none",
  navigationTextGeneral:
    "text-xs font-bold uppercase tracking-widest text-slate-500 group-hover:text-slate-200 group-focus-visible:text-slate-200 select-none",
  navigationTextActiveState:
    "text-xs font-bold uppercase tracking-widest text-slate-200 select-none",

  // Navigation styles - Breakpoints
  navigationContainerLg: "lg:block",

  // Combined navigation styles
  get navigationContainer() {
    return [this.navigationContainerGeneral, this.navigationContainerLg]
      .filter(Boolean)
      .join(" ");
  },

  get navigationList() {
    return this.navigationListGeneral;
  },

  get navigationItem() {
    return this.navigationItemGeneral;
  },

  get navigationItemActive() {
    return this.navigationItemGeneral;
  },

  get navigationIndicator() {
    return this.navigationIndicatorGeneral;
  },
  
  get navigationIndicatorActive() {
    return this.navigationIndicatorActiveState;
  },

  get navigationText() {
    return this.navigationTextGeneral;
  },
  
  get navigationTextActive() {
    return this.navigationTextActiveState;
  },

  // Social styles - General
  socialListGeneral: "ml-1 mt-8 flex items-center",
  socialItemGeneral: "mr-5 shrink-0 text-xs select-none",
  socialLinkGeneral: "block hover:text-slate-200 select-none",

  // Combined social styles
  get socialList() {
    return this.socialListGeneral;
  },

  get socialItem() {
    return this.socialItemGeneral;
  },

  get socialLink() {
    return this.socialLinkGeneral;
  },
};
