// Header types

// Navigation item type
export type NavigationItemType = {
  label: string;
  href: string;
  isActive: boolean;
};

// Social item type
export type SocialItemType = {
  name: string;
  link: string;
};

// Empty props type for Header component
export type HeaderProps = Record<string, never>;
