import React from "react";

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto flex min-h-screen w-full flex-col px-6 tablet:min-w-[900px] tablet:max-w-[1000px] tablet:flex-row tablet:gap-4 tablet:px-12">
      {children}
    </div>
  );
}

export default Layout;
