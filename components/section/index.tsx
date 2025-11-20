import { sectionStyles } from "./Section.styles";
import type { SectionProps } from "./Section.types";

function Section({ id, headerName, isLast, children }: SectionProps) {
  return (
    <section id={id} className={sectionStyles.getContainerStyles(isLast)}>
      <div className={sectionStyles.headerContainer}>
        <h2 className={sectionStyles.headerText}>{headerName}</h2>
      </div>
      {children}
    </section>
  );
}

export default Section;
