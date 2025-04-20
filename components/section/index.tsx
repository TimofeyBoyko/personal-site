import React from "react";
import { SectionProps } from "./Section.types";
import { sectionStyles } from "./Section.styles";

function Section({ id, headerName, isLast, children }: SectionProps) {
  return (
    <section
      id={id}
      className={sectionStyles.getContainerStyles(isLast)}
    >
      <div className={sectionStyles.headerContainer}>
        <h2 className={sectionStyles.headerText}>
          {headerName}
        </h2>
      </div>
      {children}
    </section>
  );
}

export default Section;
