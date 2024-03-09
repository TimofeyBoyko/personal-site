import React from "react";

type SectionProps = {
  id: string;
  headerName: string;
  isLast: boolean;
  children: React.ReactNode;
};

function Section({ id, headerName, isLast, children }: SectionProps) {
  return (
    <section
      id={id}
      className={`mb-16 scroll-mt-16 ${isLast ? "tablet:mb-0 " : "tablet:mb-36 "}tablet:scroll-mt-24`}
    >
      <div className="section-header sticky top-0 z-20 -mx-6 mb-4 w-full bg-slate-900/75 px-6 py-5 backdrop-blur tablet:sr-only tablet:relative tablet:top-auto tablet:mx-auto tablet:w-full tablet:px-0 tablet:py-0 tablet:opacity-0">
        <h2 className="text-sm font-bold uppercase tracking-widest text-slate-200 tablet:sr-only">
          {headerName}
        </h2>
      </div>
      {children}
    </section>
  );
}

export default Section;
