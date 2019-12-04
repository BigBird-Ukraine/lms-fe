import { config } from '../config';

export const commonApiPath = `${config.authUrl}/${config.apiVersion}`;
export const adminApiPath = `${commonApiPath}/admin`;
