import { environment } from '../../../environments/environment';

export const config = {
  apiUrl: environment.apiUrl,
  authPort: environment.authPort,
  questionPort: environment.questionPort,
  apiVersion: environment.apiVersion,
  adminEmail: environment.adminEmail,
  infoEmail: environment.infoEmail,
  questionUrl: `${environment.apiUrl}:${environment.questionPort}`,
  authUrl: `${environment.apiUrl}:${environment.authPort}`
};
