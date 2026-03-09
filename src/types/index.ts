// ─── API Response Wrapper ────────────────────────────────
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  count?: number;
}

// ─── Auth ────────────────────────────────────────────────
export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  createdAt?: string;
}

export interface AuthResponse {
  success: boolean;
  token: string;
  user: User;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface RegisterPayload {
  name: string;
  email: string;
  password: string;
}

// ─── Project ─────────────────────────────────────────────
export interface Project {
  id: string;
  name: string;
  location: string;
  description: string;
  status: string;
  value?: string;
  image: string;
  gallery?: string[];
  createdAt?: string;
  updatedAt?: string;
}

export interface ProjectPayload {
  name: string;
  location: string;
  description: string;
  status: string;
  value?: string;
  image: string;
  gallery?: string[];
}

// ─── Blog ────────────────────────────────────────────────
export interface Blog {
  id: string;
  title: string;
  author: string;
  role: string;
  image: string;
  tags: string[];
  excerpt: string;
  content: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface BlogPayload {
  title: string;
  author: string;
  role: string;
  image: string;
  tags?: string[];
  excerpt: string;
  content: string;
}

// ─── Team ────────────────────────────────────────────────
export interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  order?: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface TeamMemberPayload {
  name: string;
  role: string;
  bio: string;
  order?: number;
}

// ─── Lead ────────────────────────────────────────────────
export interface Lead {
  id: string;
  name: string;
  email: string;
  phone?: string;
  subject?: string;
  message: string;
  createdAt?: string;
}

export interface LeadPayload {
  name: string;
  email: string;
  phone?: string;
  subject?: string;
  message: string;
}

// ─── Newsletter ──────────────────────────────────────────
export interface Newsletter {
  id: string;
  email: string;
  createdAt?: string;
}

// ─── Executive Summary ──────────────────────────────────
export interface ExecutiveSummary {
  id: string;
  project: string;
  loc: string;
  status: string;
  val?: string;
  order?: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface ExecutiveSummaryPayload {
  project: string;
  loc: string;
  status: string;
  val?: string;
  order?: number;
}

// ─── Dashboard Stats ────────────────────────────────────
export interface DashboardStats {
  counts: {
    projects: number;
    blogs: number;
    teamMembers: number;
    leads: number;
    subscribers: number;
    executiveSummary: number;
  };
  recent: {
    leads: Lead[];
    subscribers: Newsletter[];
  };
}

// ─── Validation ──────────────────────────────────────────
export interface ValidationErrors {
  [field: string]: string;
}

export interface ValidationResult {
  isValid: boolean;
  errors: ValidationErrors;
}
