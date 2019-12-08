import {environment} from '../../../environments/environment';

export const config = {
  apiUrl: environment.apiUrl,
  authPort: environment.authPort,
  questionPort: environment.questionPort,
  adminPort: environment.adminPort,
  apiVersion: environment.apiVersion,
  adminEmail: environment.adminEmail,
  infoEmail: environment.infoEmail,
  questionUrl: `${environment.apiUrl}:${environment.questionPort}`,
  adminUrl: `${environment.apiUrl}:${environment.adminPort}`,
  authUrl: `${environment.apiUrl}:${environment.authPort}`
};
