// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  API_URL: 'http://localhost:5000',
  APP_URL: 'http://localhost:4200',
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

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
