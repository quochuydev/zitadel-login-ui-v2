import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';
import * as z from 'zod';

type Configuration = {
  appUrl: string;
  zitadel: {
    url: string;
    userId: string;
    clientId: string;
    clientSecret: string;
  };
};

const DOT_ENV_PATH = process.env.DOT_ENV_PATH;

if (DOT_ENV_PATH) {
  const buffer = fs.readFileSync(path.join(process.cwd(), DOT_ENV_PATH));
  const defaultConfig = dotenv.parse(buffer);
  Object.entries(defaultConfig).forEach(([key, value]) => {
    if (!process.env[key]) {
      process.env[key] = value;
    }
  });
}

const configurationSchema = z.object({
  appUrl: z.string(),
  zitadel: z.object({
    url: z.string(),
    userId: z.string(),
    clientId: z.string(),
    clientSecret: z.string(),
  }),
});

const configuration: Configuration = {
  appUrl: process.env.APP_URL,
  zitadel: {
    url: process.env.ZITADEL_URL,
    userId: process.env.ZITADEL_USER_ID,
    clientId: process.env.ZITADEL_CLIENT_ID,
    clientSecret: process.env.ZITADEL_CLIENT_SECRET,
  },
};

try {
  configurationSchema.parse(configuration);
} catch (error) {
  console.error('Bad configuration.', error);
  throw error;
}

export type { Configuration };
export default configuration;
