export const EXTERNAL_AUTHENTICATION_HANDLER_ROUTE = 'external';

export const buildPathToExternalAuthHandler = (appUrl: string) =>
  `${appUrl}/auth/${EXTERNAL_AUTHENTICATION_HANDLER_ROUTE}`;
