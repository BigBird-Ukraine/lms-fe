import { config } from '../config';

export const commonApiPath = `${config.apiUrl}/${config.apiVersion}`;
export const adminApiPath = `${commonApiPath}/admin`;
