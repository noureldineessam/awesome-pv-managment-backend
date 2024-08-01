import { createLogger, format, transports } from 'winston';
import { env } from '../config/environment.js';

const logLevel = env === 'production' ? 'info' : 'debug';

export const logger = createLogger({
    level: logLevel,
    format: format.combine(
        format.timestamp(),
        format.json()
    ),
    transports: [
        new transports.Console()
    ],
});

