import { Response } from 'express';

export const setAccessHeaders = (
  res: Response,
  accessToken: string,
  refreshToken: string | null,
): void => {
  res.setHeader('Access-Token', accessToken);
  res.setHeader('Refresh-Token', refreshToken);
};
