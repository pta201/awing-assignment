export const generateId = (prefix: string) => {
  return `${prefix}-${Date.now()}`;
};
