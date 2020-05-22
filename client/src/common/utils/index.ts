const urlValidator = /^https?:\/\/[a-z]{3}/i;

export const validateURL = (toValidate: string): boolean => {
  return urlValidator.test(toValidate);
};