import React from "react";

import data from "@/data/about.json";
import { parseTextToJSX } from "@/utils";

import Section from "../section";

function SectionAbout() {
  return (
    <Section id="about" headerName="About" isLast={false}>
      {data.items.map((item, index) => {
        const className = index === data.items.length - 1 ? "" : "mb-4";
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
