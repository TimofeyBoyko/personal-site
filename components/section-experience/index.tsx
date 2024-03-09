import React from "react";

import data from "@/data/experience.json";

import Section from "../section";
import Group from "../group";

function SectionExperience() {
  return (
    <Section id="experience" headerName="Experience" isLast={false}>
      <div>
        <ol className="group/list">
          {data.items.map((item, index) => {
            const isLast = index === data.items.length - 1;

            const classNameLi = isLast ? "" : "mb-12";

            return (
              <li key={item.description} className={classNameLi}>
                <Group
                  headerText={item.date}
                  mainLink={item.link}
                  contentHeader={item.role}
                  contentSecondHeader={item.company}
                  contentSubHeader={item["sub-roles"]}
                  content={item.description}
                  tags={item.tags}
                />
              </li>
            );
          })}
        </ol>
      </div>
    </Section>
  );
}

export default SectionExperience;
