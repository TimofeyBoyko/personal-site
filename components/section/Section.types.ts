import React from "react";

export type SectionProps = {
  id: string;
  headerName: string;
  isLast: boolean;
  children: React.ReactNode;
};
