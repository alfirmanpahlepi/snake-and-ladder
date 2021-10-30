export const limitString = (
  str: string | any,
  limit: number = 15
): string =>
  str && str.length > limit ? str.substring(0, limit) + " ..." : str;
