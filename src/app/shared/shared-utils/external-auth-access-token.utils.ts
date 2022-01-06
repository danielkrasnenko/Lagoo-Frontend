export const extractAccessTokenFromUrlWithQueryString = (urlWithQueryString: string) => urlWithQueryString.match(/access_token=([^&]+)/)?.[1];
