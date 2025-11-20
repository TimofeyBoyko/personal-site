import Group from "@/components/group";
import Section from "@/components/section";
import data from "@/data/experience.json";

import { sectionExperienceStyles } from "./SectionExperience.styles";

function SectionExperience() {
  return (
    <Section id="experience" headerName="Experience" isLast={false}>
      <div>
        <ol className={sectionExperienceStyles.listContainer}>
          {data.items.map((item, index) => {
            const isLast = index === data.items.length - 1;

            const classNameLi = sectionExperienceStyles.getListItemClass(isLast);

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
