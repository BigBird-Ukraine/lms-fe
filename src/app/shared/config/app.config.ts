import {environment} from '../../../environments/environment';

export const config = {
  apiUrl: environment.apiUrl,
  authPort: environment.authPort,
  adminPort: environment.adminPort,
  apiVersion: environment.apiVersion,
  adminEmail: environment.adminEmail,
  infoEmail: environment.infoEmail,
  adminUrl: `${environment.apiUrl}:${environment.adminPort}`,
  authUrl: `${environment.apiUrl}:${environment.authPort}`,
  apiAdminUrl: `${environment.apiUrl}:${environment.adminPort}/${environment.apiAdminVersion}`,
};
