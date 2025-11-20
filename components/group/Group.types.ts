import type React from "react";

// Header component types
export type GroupHeaderProps = {
  headerText: string | React.ReactNode;
};

// Content header component types
export type GroupContentHeaderProps = {
  mainLink: string;
  contentHeader: string;
  contentSecondHeader: string;
  contentSubHeader: string[];
};

// Main Group component types
export type TagProps = {
  label: string;
};

export type TagsListProps = {
  tags: string[];
};

export type GroupProps = {
  content: string;
} & GroupContentHeaderProps &
  GroupHeaderProps &
  TagsListProps;
