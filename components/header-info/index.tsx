import React from "react";

import data from "@/data/personal.json";

function Info() {
  return (
    <>
      <h1 className="text-4xl font-bold tracking-tight text-slate-200 tablet:text-5xl">
        {data.name}
      </h1>
      <h2 className="mt-3 text-lg font-medium tracking-tight text-slate-200 tablet:text-xl">
        {data.currentRole}
      </h2>
      <p className="mt-4 max-w-xs leading-normal">{data.description}</p>
    </>
  );
}

export default Info;
