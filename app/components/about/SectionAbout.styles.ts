// SectionAbout component styles
export const sectionAboutStyles = {
  // Paragraph styles
  paragraphWithMargin: "mb-4",
  paragraphNoMargin: "",

  // Style getter function
  getParagraphClass(isLast: boolean) {
    return isLast ? this.paragraphNoMargin : this.paragraphWithMargin;
  }
};
