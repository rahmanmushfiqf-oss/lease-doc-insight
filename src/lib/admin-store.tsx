import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useRef,
  useState,
  type ReactNode,
} from "react";

import {
  blogPosts as seedBlog,
  guides as seedGuides,
  customerStories as seedStories,
  helpArticles as seedHelp,
  type BlogPost,
  type CustomerStory,
  type Guide,
  type HelpArticle,
  type Status,
} from "@/lib/content";

import { toast } from "sonner";
import { useAdminSession } from "@/lib/admin-session";
import {
  fetchAdminContent,
  removeContentItem,
  saveContentItem,
  type ContentCollection,
} from "@/lib/content-db";

export type Role = "admin" | "editor" | "viewer";

export type TeamMember = {
  id: string;
  name: string;
  email: string;
  role: Role;
  status: "Active" | "Invited" | "Suspended";
  added: string;
};

export type FormSubmission = {
  id: string;
  name: string;
  email: string;
  company: string;
  role: string;
  portfolioSize: string;
  useCase: string;
  date: string;
};

export type Settings = {
  siteName: string;
  metaSuffix: string;
  metaDescription: string;
  footerText: string;
  formsEnabled: boolean;
  formsEmail: string;
  formsConfirmation: string;
  robots: string;
  googleAnalytics: string;
  searchConsole: string;
  hubspot: string;
  chatWidget: boolean;
  zapierWebhook: string;
  headScripts: string;
  bodyScripts: string;
};

export type CurrentUser = { id: string; name: string; email: string; role: Role };

type State = {
  blogPosts: BlogPost[];
  resources: Guide[];
  customerStories: CustomerStory[];
  helpArticles: HelpArticle[];
  formSubmissions: FormSubmission[];
  teamMembers: TeamMember[];
  settings: Settings;
};

type Collection = "blogPosts" | "resources" | "customerStories" | "helpArticles";

type Action =
  | { type: "hydrate"; state: State }
  | { type: "upsert"; collection: Collection; item: unknown }
  | { type: "remove"; collection: Collection; id: string }
  | { type: "removeSubmission"; id: string }
  | { type: "upsertMember"; member: TeamMember }
  | { type: "removeMember"; id: string }
  | { type: "settings"; settings: Partial<Settings> };

const seedTeam: TeamMember[] = [
  {
    id: "t1",
    name: "Mushfiqur Rahman",
    email: "admin@leasedrop.ai",
    role: "admin",
    status: "Active",
    added: "2026-01-12",
  },
  {
    id: "t2",
    name: "Hannah Prior",
    email: "hannah@leasedrop.ai",
    role: "editor",
    status: "Active",
    added: "2026-03-04",
  },
  {
    id: "t3",
    name: "Tom Ellery",
    email: "tom@leasedrop.ai",
    role: "viewer",
    status: "Invited",
    added: "2026-06-21",
  },
];

const seedSubmissions: FormSubmission[] = [
  {
    id: "f1",
    name: "Claire Denholm",
    email: "claire.denholm@northgateam.co.uk",
    company: "Northgate Asset Management",
    role: "Asset Manager",
    portfolioSize: "50 to 100 assets",
    useCase: "Lease Intelligence",
    date: "2026-08-27",
  },
  {
    id: "f2",
    name: "Paul Ashworth",
    email: "p.ashworth@brightsurveying.com",
    company: "Bright Surveying",
    role: "Building Surveyor",
    portfolioSize: "Under 25 assets",
    useCase: "Dilapidations",
    date: "2026-08-25",
  },
  {
    id: "f3",
    name: "Sana Iqbal",
    email: "sana@meridiancapital.eu",
    company: "Meridian Capital",
    role: "Investment Director",
    portfolioSize: "100 plus assets",
    useCase: "Due Diligence",
    date: "2026-08-22",
  },
  {
    id: "f4",
    name: "David Okoye",
    email: "d.okoye@kestrelpm.co.uk",
    company: "Kestrel Property Management",
    role: "Property Manager",
    portfolioSize: "25 to 50 assets",
    useCase: "Critical Dates",
    date: "2026-08-19",
  },
  {
    id: "f5",
    name: "Ruth Maclean",
    email: "ruth.maclean@caledonre.com",
    company: "Caledon Real Estate",
    role: "Head of Legal",
    portfolioSize: "50 to 100 assets",
    useCase: "Rights and Obligations",
    date: "2026-08-14",
  },
];

const defaultSettings: Settings = {
  siteName: "Leasedrop",
  metaSuffix: " | Leasedrop",
  metaDescription:
    "Leasedrop turns the documents behind every property into structured, searchable and verifiable asset intelligence.",
  footerText: "Copyright Leasedrop. All rights reserved.",
  formsEnabled: true,
  formsEmail: "demo@leasedrop.ai",
  formsConfirmation: "Thank you. A member of the team will be in touch within one working day.",
  robots: "User-agent: *\nAllow: /",
  googleAnalytics: "",
  searchConsole: "",
  hubspot: "",
  chatWidget: false,
  zapierWebhook: "",
  headScripts: "",
  bodyScripts: "",
};

const initialState: State = {
  blogPosts: seedBlog,
  resources: seedGuides,
  customerStories: seedStories,
  helpArticles: seedHelp,
  formSubmissions: seedSubmissions,
  teamMembers: seedTeam,
  settings: defaultSettings,
};

function upsertIn<T extends { id: string }>(list: T[], item: T): T[] {
  const idx = list.findIndex((x) => x.id === item.id);
  if (idx === -1) return [item, ...list];
  const next = list.slice();
  next[idx] = item;
  return next;
}

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "hydrate":
      return action.state;
    case "upsert": {
      const list = state[action.collection] as Array<{ id: string }>;
      return {
        ...state,
        [action.collection]: upsertIn(list, action.item as { id: string }),
      } as State;
    }
    case "remove": {
      const list = state[action.collection] as Array<{ id: string }>;
      return {
        ...state,
        [action.collection]: list.filter((x) => x.id !== action.id),
      } as State;
    }
    case "removeSubmission":
      return {
        ...state,
        formSubmissions: state.formSubmissions.filter((s) => s.id !== action.id),
      };
    case "upsertMember":
      return { ...state, teamMembers: upsertIn(state.teamMembers, action.member) };
    case "removeMember":
      return { ...state, teamMembers: state.teamMembers.filter((m) => m.id !== action.id) };
    case "settings":
      return { ...state, settings: { ...state.settings, ...action.settings } };
    default:
      return state;
  }
}

const STORE_KEY = "leasedrop-admin-store";

type Ctx = {
  state: State;
  dispatch: React.Dispatch<Action>;
  currentUser: CurrentUser | null;
  signOut: () => void;
  ready: boolean;
};

const AdminContext = createContext<Ctx | null>(null);

function mergeCollection<T extends { id: string }>(
  seed: T[],
  dbItems: T[] | undefined,
  removed: Set<string>,
  collection: ContentCollection,
): T[] {
  const byId = new Map<string, T>();
  for (const item of seed) {
    if (removed.has(`${collection}:${item.id}`)) continue;
    byId.set(item.id, item);
  }
  const extras: T[] = [];
  for (const item of dbItems ?? []) {
    if (byId.has(item.id)) byId.set(item.id, item);
    else extras.push(item);
  }
  return [...extras, ...byId.values()];
}

export function AdminProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [ready, setReady] = useState(false);
  const session = useAdminSession();

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORE_KEY);
      if (raw) dispatch({ type: "hydrate", state: { ...initialState, ...JSON.parse(raw) } });
    } catch {
      /* ignore corrupted local state */
    }
    setReady(true);
  }, []);

  // Load the real content library from the backend once signed in.
  useEffect(() => {
    if (!session.account) return;
    let cancelled = false;
    void (async () => {
      try {
        const { items, removed } = await fetchAdminContent();
        if (cancelled) return;
        // Push anything created locally before the backend was reachable.
        const seeds: Record<string, Array<{ id: string }>> = {
          blogPosts: seedBlog,
          resources: seedGuides,
          customerStories: seedStories,
          helpArticles: seedHelp,
        };
        for (const collection of Object.keys(seeds) as ContentCollection[]) {
          const seedIds = new Set(seeds[collection]!.map((s) => s.id));
          const dbIds = new Set((items[collection] ?? []).map((d) => d.id));
          const localOnly = (stateRef.current[collection] as Array<{ id: string; status?: string }>).filter(
            (item) => !seedIds.has(item.id) && !dbIds.has(item.id),
          );
          for (const item of localOnly) {
            await saveContentItem(collection, item).catch(() => {});
            (items[collection] ??= []).push(item as never);
          }
        }
        dispatch({
          type: "hydrate",
          state: {
            ...initialState,
            blogPosts: mergeCollection(seedBlog, items.blogPosts as BlogPost[] | undefined, removed, "blogPosts"),
            resources: mergeCollection(seedGuides, items.resources as Guide[] | undefined, removed, "resources"),
            customerStories: mergeCollection(
              seedStories,
              items.customerStories as CustomerStory[] | undefined,
              removed,
              "customerStories",
            ),
            helpArticles: mergeCollection(
              seedHelp,
              items.helpArticles as HelpArticle[] | undefined,
              removed,
              "helpArticles",
            ),
          },
        });
      } catch {
        /* keep whatever is already loaded */
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [session.account]);

  useEffect(() => {
    if (!ready) return;
    try {
      localStorage.setItem(STORE_KEY, JSON.stringify(state));
    } catch {
      /* storage unavailable */
    }
  }, [state, ready]);

  const stateRef = useRef(state);
  stateRef.current = state;

  const currentUser: CurrentUser | null = useMemo(() => {
    if (!session.account) return null;
    return {
      id: session.account.userId,
      name: session.account.name || session.account.email,
      email: session.account.email,
      role: session.account.role === "editor" ? "editor" : "admin",
    };
  }, [session.account]);

  const signOut = useCallback(() => {
    void session.signOut();
  }, [session]);

  // Every content change is written straight to the backend so the public site
  // sees it too.
  const persistingDispatch = useCallback<React.Dispatch<Action>>(
    (action) => {
      dispatch(action);
      if (action.type === "upsert") {
        void saveContentItem(action.collection, action.item as { id: string; status?: string }).catch(
          (error: { message?: string }) =>
            toast.error(`Could not save to the live site: ${error?.message ?? "unknown error"}`),
        );
      }
      if (action.type === "remove") {
        const list = stateRef.current[action.collection] as Array<{ id: string }>;
        const item = list.find((x) => x.id === action.id);
        if (item)
          void removeContentItem(action.collection, item).catch((error: { message?: string }) =>
            toast.error(`Could not remove from the live site: ${error?.message ?? "unknown error"}`),
          );
      }
    },
    [],
  );

  const value = useMemo(
    () => ({ state, dispatch: persistingDispatch, currentUser, signOut, ready: ready && session.ready }),
    [state, persistingDispatch, currentUser, signOut, ready, session.ready],
  );

  return <AdminContext.Provider value={value}>{children}</AdminContext.Provider>;
}

export function useAdmin() {
  const ctx = useContext(AdminContext);
  if (!ctx) throw new Error("useAdmin must be used inside AdminProvider");
  return ctx;
}

export const can = (role: Role | undefined, action: "write" | "settings" | "delete") => {
  if (role === "admin") return true;
  if (role === "editor") return action === "write";
  return false;
};

export const newId = () => Math.random().toString(36).slice(2, 10);

export const slugify = (s: string) =>
  s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

// Lenient version for live typing: keeps a trailing hyphen so the user can
// type multi-word slugs without the dash being stripped mid-keystroke.
export const slugifyInput = (s: string) =>
  s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+/, "");

export const today = () => new Date().toISOString().slice(0, 10);

export const readTimeFor = (text: string) =>
  `${Math.max(1, Math.round(text.trim().split(/\s+/).length / 200))} min read`;

export type { Block } from "./markdown";
export { blocksToText, textToBlocks, normalizeBlocks } from "./markdown";

export const statusLabel: Record<Status, string> = {
  draft: "Draft",
  scheduled: "Scheduled",
  published: "Published",
};
