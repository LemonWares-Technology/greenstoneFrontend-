import type { ValidationResult } from '../types';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_REGEX = /^[+]?[\d\s()-]{7,20}$/;

// ─── Helpers ─────────────────────────────────────────────
const required = (value: string | undefined | null, label: string): string | null =>
  !value || value.trim().length === 0 ? `${label} is required` : null;

const minLength = (value: string, min: number, label: string): string | null =>
  value.trim().length < min ? `${label} must be at least ${min} characters` : null;

const isEmail = (value: string): string | null =>
  !EMAIL_REGEX.test(value.trim()) ? 'Please enter a valid email address' : null;

const isPhone = (value: string): string | null =>
  value && !PHONE_REGEX.test(value.trim()) ? 'Please enter a valid phone number' : null;

// ─── Validators ──────────────────────────────────────────

export const validateLogin = (email: string, password: string): ValidationResult => {
  const errors: Record<string, string> = {};
  const emailErr = required(email, 'Email') || isEmail(email);
  const passErr = required(password, 'Password');
  if (emailErr) errors.email = emailErr;
  if (passErr) errors.password = passErr;
  return { isValid: Object.keys(errors).length === 0, errors };
};

export const validateRegister = (name: string, email: string, password: string): ValidationResult => {
  const errors: Record<string, string> = {};
  const nameErr = required(name, 'Name') || minLength(name, 2, 'Name');
  const emailErr = required(email, 'Email') || isEmail(email);
  const passErr = required(password, 'Password') || minLength(password, 6, 'Password');
  if (nameErr) errors.name = nameErr;
  if (emailErr) errors.email = emailErr;
  if (passErr) errors.password = passErr;
  return { isValid: Object.keys(errors).length === 0, errors };
};

export const validateProject = (data: {
  name?: string;
  location?: string;
  description?: string;
  status?: string;
  image?: string;
}): ValidationResult => {
  const errors: Record<string, string> = {};
  if (required(data.name, 'Project name')) errors.name = required(data.name, 'Project name')!;
  if (required(data.location, 'Location')) errors.location = required(data.location, 'Location')!;
  if (required(data.description, 'Description')) errors.description = required(data.description, 'Description')!;
  if (required(data.status, 'Status')) errors.status = required(data.status, 'Status')!;
  if (required(data.image, 'Image')) errors.image = required(data.image, 'Image')!;
  return { isValid: Object.keys(errors).length === 0, errors };
};

export const validateBlog = (data: {
  title?: string;
  author?: string;
  role?: string;
  image?: string;
  excerpt?: string;
  content?: string;
}): ValidationResult => {
  const errors: Record<string, string> = {};
  if (required(data.title, 'Title')) errors.title = required(data.title, 'Title')!;
  if (required(data.author, 'Author')) errors.author = required(data.author, 'Author')!;
  if (required(data.role, 'Role')) errors.role = required(data.role, 'Role')!;
  if (required(data.image, 'Image')) errors.image = required(data.image, 'Image')!;
  if (required(data.excerpt, 'Excerpt')) errors.excerpt = required(data.excerpt, 'Excerpt')!;
  if (required(data.content, 'Content')) errors.content = required(data.content, 'Content')!;
  return { isValid: Object.keys(errors).length === 0, errors };
};

export const validateTeam = (data: {
  name?: string;
  role?: string;
  bio?: string;
}): ValidationResult => {
  const errors: Record<string, string> = {};
  if (required(data.name, 'Name')) errors.name = required(data.name, 'Name')!;
  if (required(data.role, 'Role')) errors.role = required(data.role, 'Role')!;
  if (required(data.bio, 'Bio')) errors.bio = required(data.bio, 'Bio')!;
  return { isValid: Object.keys(errors).length === 0, errors };
};

export const validateLead = (data: {
  name?: string;
  email?: string;
  phone?: string;
  message?: string;
}): ValidationResult => {
  const errors: Record<string, string> = {};
  if (required(data.name, 'Name')) errors.name = required(data.name, 'Name')!;
  const emailErr = required(data.email, 'Email') || isEmail(data.email || '');
  if (emailErr) errors.email = emailErr;
  if (data.phone) {
    const phoneErr = isPhone(data.phone);
    if (phoneErr) errors.phone = phoneErr;
  }
  if (required(data.message, 'Message')) errors.message = required(data.message, 'Message')!;
  return { isValid: Object.keys(errors).length === 0, errors };
};

export const validateNewsletter = (email: string): ValidationResult => {
  const errors: Record<string, string> = {};
  const emailErr = required(email, 'Email') || isEmail(email);
  if (emailErr) errors.email = emailErr;
  return { isValid: Object.keys(errors).length === 0, errors };
};
