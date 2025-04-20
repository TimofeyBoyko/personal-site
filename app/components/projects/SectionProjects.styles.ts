// SectionProjects component styles
export const sectionProjectsStyles = {
  // Image styles - General and Breakpoints
  imageGeneral:
    "rounded border-2 border-slate-200/10 transition group-hover:border-slate-200/30",
  imageSm: "sm:order-1 sm:col-span-2 sm:translate-y-1",

  // List styles
  listContainer: "group/list",

  // List item styles
  listItemWithMargin: "mb-12",
  listItemNoMargin: "",

  // Combined style getters
  get image() {
    return [this.imageGeneral, this.imageSm].filter(Boolean).join(" ");
  },

  getListItemClass(isLast: boolean) {
    return isLast ? this.listItemNoMargin : this.listItemWithMargin;
  },
};
