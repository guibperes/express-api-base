import cors, { CorsOptions } from 'cors';

const config = (options: CorsOptions = {}) => cors(options);

export const Cors = { config };
