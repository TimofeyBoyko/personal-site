import React from "react";
import SectionAbout from "../section-about";
import SectionExperience from "../section-experience";
import SectionProjects from "../section-projects";

function Main() {
  return (
    <main className="pt-0 tablet:w-1/2 tablet:py-24">
      <SectionAbout />
      <SectionExperience />
      <SectionProjects />
    </main>
  );
}

export default Main;
