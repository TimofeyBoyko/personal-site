import Image from "next/image";

import Group from "@/components/group";
import Section from "@/components/section";
import data from "@/data/projects.json";
import PersonalSiteJpg from "@/public/personal-site.jpg";
import ReactPizzaPng from "@/public/react-pizza.png";

import { sectionProjectsStyles } from "./SectionProjects.styles";

function SectionProjects() {
  const getImage = (image: string) => {
    const className = sectionProjectsStyles.image;
    switch (image) {
      case "react-pizza.png":
        return (
          <Image
            src={ReactPizzaPng.src}
            width={ReactPizzaPng.width}
            height={ReactPizzaPng.height}
            className={className}
            alt="react-pizza"
          />
        );
      case "personal-site.jpg":
        return (
          <Image
            src={PersonalSiteJpg.src}
            width={PersonalSiteJpg.width}
            height={PersonalSiteJpg.height}
            className={className}
            alt="personal-site"
          />
        );
      default:
        return "";
    }
  };

  return (
    <Section id="projects" headerName="Projects" isLast>
      <div>
        <ol className={sectionProjectsStyles.listContainer}>
          {data.items.map((item, index) => {
            const isLast = index === data.items.length - 1;

            const classNameLi = sectionProjectsStyles.getListItemClass(isLast);

            return (
              <li key={item.title} className={classNameLi}>
                <Group
                  headerText={getImage(item.image)}
                  mainLink={item.link}
                  contentHeader={item.title}
                  contentSecondHeader=""
                  contentSubHeader={[]}
                  content={item.content}
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

export default SectionProjects;
