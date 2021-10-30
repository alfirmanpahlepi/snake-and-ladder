export const limitString = (str: string, limit: number = 15): string =>
  str.length > limit ? str.substring(0, limit) + " ..." : str;
