// src/utils/validation.ts

export function validateEmail(email: string): boolean {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

export function validatePassword(password: string): boolean {
  return password.length >= 8;
}

export function validateVerificationCode(code: string): boolean {
  return /^[a-zA-Z0-9]{6}$/.test(code);
}
