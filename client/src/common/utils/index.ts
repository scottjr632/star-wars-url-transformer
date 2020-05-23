const urlValidator = /^https?:\/\/[a-z]{3}/i;

export const validateURL = (toValidate: string): boolean => {
  return urlValidator.test(toValidate);
};

export function removeDups<T>(arr: Array<T>): Array<T> {
  return Array.from(new Set(arr));
}