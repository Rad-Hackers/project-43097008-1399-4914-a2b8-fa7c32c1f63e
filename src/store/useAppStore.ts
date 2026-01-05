import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Keyword {
  id: string;
  text: string;
  enabled: boolean;
  matchCount: number;
  createdAt: Date;
}

export interface BlacklistWord {
  id: string;
  text: string;
  createdAt: Date;
}

export interface NotificationGroup {
  id: string;
  name: string;
  chatId: string;
  enabled: boolean;
  createdAt: Date;
}

export interface Settings {
  notificationsEnabled: boolean;
  notificationType: 'group' | 'private';
  matchType: 'exact' | 'fuzzy';
  blacklistMatchType: 'exact' | 'fuzzy';
  smartAdFilter: boolean;
  searchHistory: boolean;
  pushInterval: 'instant' | '1min' | '5min' | '1hour';
  messageLimit: number;
}

interface AppState {
  keywords: Keyword[];
  blacklist: BlacklistWord[];
  groups: NotificationGroup[];
  settings: Settings;
  
  // Keywords actions
  addKeyword: (text: string) => void;
  removeKeyword: (id: string) => void;
  toggleKeyword: (id: string) => void;
  incrementMatchCount: (id: string) => void;
  
  // Blacklist actions
  addToBlacklist: (text: string) => void;
  removeFromBlacklist: (id: string) => void;
  
  // Groups actions
  addGroup: (name: string, chatId: string) => void;
  removeGroup: (id: string) => void;
  toggleGroup: (id: string) => void;
  
  // Settings actions
  updateSettings: (settings: Partial<Settings>) => void;
}

const generateId = () => Math.random().toString(36).substring(2, 9);

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      keywords: [],
      blacklist: [],
      groups: [],
      settings: {
        notificationsEnabled: true,
        notificationType: 'private',
        matchType: 'fuzzy',
        blacklistMatchType: 'exact',
        smartAdFilter: true,
        searchHistory: true,
        pushInterval: 'instant',
        messageLimit: 200,
      },
      
      addKeyword: (text) =>
        set((state) => ({
          keywords: [
            ...state.keywords,
            {
              id: generateId(),
              text,
              enabled: true,
              matchCount: 0,
              createdAt: new Date(),
            },
          ],
        })),
      
      removeKeyword: (id) =>
        set((state) => ({
          keywords: state.keywords.filter((k) => k.id !== id),
        })),
      
      toggleKeyword: (id) =>
        set((state) => ({
          keywords: state.keywords.map((k) =>
            k.id === id ? { ...k, enabled: !k.enabled } : k
          ),
        })),
      
      incrementMatchCount: (id) =>
        set((state) => ({
          keywords: state.keywords.map((k) =>
            k.id === id ? { ...k, matchCount: k.matchCount + 1 } : k
          ),
        })),
      
      addToBlacklist: (text) =>
        set((state) => ({
          blacklist: [
            ...state.blacklist,
            {
              id: generateId(),
              text,
              createdAt: new Date(),
            },
          ],
        })),
      
      removeFromBlacklist: (id) =>
        set((state) => ({
          blacklist: state.blacklist.filter((b) => b.id !== id),
        })),
      
      addGroup: (name, chatId) =>
        set((state) => ({
          groups: [
            ...state.groups,
            {
              id: generateId(),
              name,
              chatId,
              enabled: true,
              createdAt: new Date(),
            },
          ],
        })),
      
      removeGroup: (id) =>
        set((state) => ({
          groups: state.groups.filter((g) => g.id !== id),
        })),
      
      toggleGroup: (id) =>
        set((state) => ({
          groups: state.groups.map((g) =>
            g.id === id ? { ...g, enabled: !g.enabled } : g
          ),
        })),
      
      updateSettings: (newSettings) =>
        set((state) => ({
          settings: { ...state.settings, ...newSettings },
        })),
    }),
    {
      name: 'keyword-monitor-storage',
    }
  )
);
