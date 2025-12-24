export const isString = (value: unknown): value is string => {
  if (typeof value !== "string") return false;
  const trimmed = value.trim();
  return trimmed.length > 0;
};

export const isNumber = (value: unknown): value is number => {
  return typeof value === "number" && Number.isFinite(value);
};

export const isEmail = (value: unknown): value is string => {
  if (typeof value !== "string") return false;

  const email = value.trim().toLowerCase();
  if (!email) return false;

  const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  return EMAIL_REGEX.test(email);
};