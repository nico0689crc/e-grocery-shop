import type { Mode } from "@/types";

// Settings type
export type Settings = {
  mode?: Mode;
  primaryColor?: string;
  navbarOpen: boolean;
};

// UpdateSettingsOptions type
export type UpdateSettingsOptions = {
  updateCookie?: boolean;
};

// SettingsContextProps type
export type SettingsContextProps = {
  settings: Settings;
  updateSettings: (settings: Partial<Settings>, options?: UpdateSettingsOptions) => void;
  isSettingsChanged: boolean;
  toggleNavbar: () => void;
};