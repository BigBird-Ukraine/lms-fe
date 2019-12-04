import { config } from '../config';

export const commonAuthPath = `${config.authUrl}/${config.apiVersion}`;
export const commonQuestionPath = `${config.questionUrl}/${config.apiVersion}`;
export const adminAdminPath = `${commonAuthPath}/admin`; // TODO
