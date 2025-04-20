import React from "react";

import data from "@/data/about.json";
import { parseTextToJSX } from "@/utils";
import Section from "@/components/section";

import { sectionAboutStyles } from "./SectionAbout.styles";

function SectionAbout() {
  return (
    <Section id="about" headerName="About" isLast={false}>
      {data.items.map((item, index) => {
        const isLast = index === data.items.length - 1;
        const className = sectionAboutStyles.getParagraphClass(isLast);
        const parsedText = parseTextToJSX(item.text, item.links);
        return (
          <p key={item.text} className={className}>
            {parsedText}
          </p>
        );
      })}
    </Section>
  );
}

export default SectionAbout;
