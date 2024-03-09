import React from "react";
import Image from "next/image";

import ReactPizzaPng from "@/public/react-pizza.png";
import DocspaceJpg from "@/public/docspace.jpg";
import PersonalSiteJpg from "@/public/personal-site.jpg";

import data from "@/data/projects.json";

import Section from "../section";
import Group from "../group";

function SectionProjects() {
  const getImage = (image: string) => {
    const className =
      "rounded border-2 border-slate-200/10 transition group-hover:border-slate-200/30 sm:order-1 sm:col-span-2 sm:translate-y-1";
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
      case "docspace.jpg":
        return (
          <Image
            src={DocspaceJpg.src}
            width={DocspaceJpg.width}
            height={DocspaceJpg.height}
            className={className}
            alt="docspace"
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
        <ol className="group/list">
          {data.items.map((item, index) => {
            const isLast = index === data.items.length - 1;

            const classNameLi = isLast ? "" : "mb-12";

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
