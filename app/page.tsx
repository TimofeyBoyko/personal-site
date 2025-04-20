import Main from "@/components/main";

import SectionAbout from "./components/about";
import SectionExperience from "./components/experience";
import SectionProjects from "./components/projects";

export default function Home() {
  return (
    <Main>
      <SectionAbout />
      <SectionExperience />
      <SectionProjects />
    </Main>
  );
}
