// SectionAbout component styles
export const sectionAboutStyles = {
  // Paragraph styles
  paragraphWithMargin: "mb-4 select-none",
  paragraphNoMargin: "select-none",

  // Style getter function
  getParagraphClass(isLast: boolean) {
    return isLast ? this.paragraphNoMargin : this.paragraphWithMargin;
  },
};
