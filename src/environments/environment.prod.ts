export const environment = {
  production: true,
  API_URL: 'https://api.lagoo.com',
  APP_URL: 'https://www.lagoo.com',
  externalAuthServices: {
    facebook:{
      getAuthenticationUrl: (redirectUrl: string) =>
        `https://www.facebook.com/v11.0/dialog/oauth?client_id=YOUR_CLIENT_ID&redirect_uri=${redirectUrl}response_type=token`,
    },
    google: {
      getAuthenticationUrl: (redirectUrl: string) =>
        `https://accounts.google.com/o/oauth2/v2/auth/identifier?client_id=YOUR_CLIENT_ID&redirect_uri=${redirectUrl}&scope=profile%20email%20openid&response_type=token`,
    }
  }
};
