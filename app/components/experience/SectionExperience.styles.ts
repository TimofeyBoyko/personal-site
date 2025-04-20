// SectionExperience component styles
export const sectionExperienceStyles = {
  // List styles
  listContainer: "group/list",

  // List item styles
  listItemWithMargin: "mb-12",
  listItemNoMargin: "",

  // Style getter function
  getListItemClass(isLast: boolean) {
    return isLast ? this.listItemNoMargin : this.listItemWithMargin;
  },
};
