export type UserRole = "student" | "teacher" | "institution";

export type AuthUser = {
  id: string;
  name: string;
  email: string;
  password: string;
  role: UserRole;
  createdAt: string;
};

const USERS_KEY = "lumio_users_v1";
const SESSION_KEY = "lumio_session_v1";
export const AUTH_CHANGE_EVENT = "lumio-auth-changed";

const normalizeEmail = (email: string) => email.trim().toLowerCase();

const isBrowser = () => typeof window !== "undefined";

export const getUsers = (): AuthUser[] => {
  if (!isBrowser()) return [];
  const raw = window.localStorage.getItem(USERS_KEY);
  if (!raw) return [];

  try {
    const parsed = JSON.parse(raw) as AuthUser[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
};

const saveUsers = (users: AuthUser[]) => {
  if (!isBrowser()) return;
  window.localStorage.setItem(USERS_KEY, JSON.stringify(users));
};

export const registerUser = (input: {
  name: string;
  email: string;
  password: string;
  role: UserRole;
}) => {
  const users = getUsers();
  const email = normalizeEmail(input.email);
  const existing = users.find((user) => user.email === email);

  if (existing) {
    const roleLabel = existing.role === "teacher"
      ? "teacher"
      : existing.role === "student"
      ? "student"
      : "institution";

    return {
      ok: false as const,
      message: `This email is already registered as a ${roleLabel} account.`,
    };
  }

  const user: AuthUser = {
    id: crypto.randomUUID(),
    name: input.name.trim(),
    email,
    password: input.password,
    role: input.role,
    createdAt: new Date().toISOString(),
  };

  saveUsers([...users, user]);

  return {
    ok: true as const,
    user,
  };
};

export const authenticateUser = (email: string, password: string): AuthUser | null => {
  const users = getUsers();
  const normalized = normalizeEmail(email);
  const user = users.find(
    (entry) => entry.email === normalized && entry.password === password
  );
  return user ?? null;
};

export const setSessionUser = (user: AuthUser) => {
  if (!isBrowser()) return;
  window.localStorage.setItem(SESSION_KEY, JSON.stringify(user));
  window.dispatchEvent(new Event(AUTH_CHANGE_EVENT));
};

export const getSessionUser = (): AuthUser | null => {
  if (!isBrowser()) return null;
  const raw = window.localStorage.getItem(SESSION_KEY);
  if (!raw) return null;

  try {
    return JSON.parse(raw) as AuthUser;
  } catch {
    return null;
  }
};

export const clearSessionUser = () => {
  if (!isBrowser()) return;
  window.localStorage.removeItem(SESSION_KEY);
  window.dispatchEvent(new Event(AUTH_CHANGE_EVENT));
};

export const updateUserProfile = (input: {
  userId: string;
  name: string;
  email: string;
}) => {
  const users = getUsers();
  const email = normalizeEmail(input.email);
  const duplicate = users.find(
    (user) => user.email === email && user.id !== input.userId
  );

  if (duplicate) {
    return {
      ok: false as const,
      message: "Another account already uses this email.",
    };
  }

  let updatedUser: AuthUser | null = null;
  const updatedUsers = users.map((user) => {
    if (user.id !== input.userId) return user;
    updatedUser = {
      ...user,
      name: input.name.trim(),
      email,
    };
    return updatedUser;
  });

  if (!updatedUser) {
    return {
      ok: false as const,
      message: "User not found.",
    };
  }

  saveUsers(updatedUsers);
  const currentSession = getSessionUser();
  if (currentSession?.id === updatedUser.id) {
    setSessionUser(updatedUser);
  }

  return {
    ok: true as const,
    user: updatedUser,
  };
};

export const updateUserPassword = (input: {
  userId: string;
  currentPassword: string;
  newPassword: string;
}) => {
  const users = getUsers();
  const currentUser = users.find((user) => user.id === input.userId);
  if (!currentUser) {
    return {
      ok: false as const,
      message: "User not found.",
    };
  }

  if (currentUser.password !== input.currentPassword) {
    return {
      ok: false as const,
      message: "Current password is incorrect.",
    };
  }

  const updatedUser: AuthUser = {
    ...currentUser,
    password: input.newPassword,
  };

  const updatedUsers = users.map((user) =>
    user.id === input.userId ? updatedUser : user
  );
  saveUsers(updatedUsers);

  const currentSession = getSessionUser();
  if (currentSession?.id === updatedUser.id) {
    setSessionUser(updatedUser);
  }

  return {
    ok: true as const,
  };
};
