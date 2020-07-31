import dotenv, { DotenvConfigOptions } from 'dotenv';

const config = (options: DotenvConfigOptions = {}) => dotenv.config(options);

const envToString = (envVariable: string) => process.env[envVariable] ?? '';

export const DotEnv = { config, envToString };
