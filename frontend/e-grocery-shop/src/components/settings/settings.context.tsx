'use client';

// React imports
import { createContext } from "react";

// Types
import type { SettingsContextProps } from "./types";

// Initial Settings Context
export const SettingsContext = createContext<SettingsContextProps | null>(null);
