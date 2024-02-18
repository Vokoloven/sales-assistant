export const StringLength = {
  EmailMinLength: 8,
  EmailMaxLength: 20,
  PasswordMinLength: 8,
  PasswordMaxLength: 30,
} as const;

export const EmailRegex =
  /^[A-Za-z0-9-!#$%&'*+/=?^_`{|}~]+(?:\.[A-Za-z0-9!#$%&'*+/=?^_`{|}~]+)*@(?:[A-Za-z0-9](?:[A-Za-z0-9-]*[A-Za-z0-9])?\.)+[A-Za-z]{2,}$/;
