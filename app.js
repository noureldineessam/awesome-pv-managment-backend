import express from 'express';
import connectDB from './utils/dbConnection.js';
import authVerify from './middlewares/authVerify.js';

import { UserRepository } from './repositories/UserRepository.js';
import { UserService } from './services/UserService.js';

import { ReportRepository } from './repositories/ReportRepository.js';
import { ReportService } from './services/ReportService.js';

import { FacilityRepository } from './repositories/FacilityRepository.js';
import { FacilityService } from './services/FacilityService.js';
import apolloServer from './graphql/index.js';

// Create Express application
const app = express();
let isApolloServerStarted = false;
app.use(authVerify);


// Instantiate repositories and services
export const userRepository = new UserRepository();
export const facilityRepository = new FacilityRepository();
export const reportRepository = new ReportRepository();

export const userService = new UserService(userRepository);

export const reportService = new ReportService({
    reportRepository,
    userRepository,
    facilityRepository
});

export const facilityService = new FacilityService({
    facilityRepository,
    userRepository,
    reportRepository
});

// Define async function to run setup tasks
async function run(app) {
    try {
        await connectDB(); // Connect to the database
        if (!isApolloServerStarted) {
            await apolloServer.start();
            isApolloServerStarted = true;
        }
        apolloServer.applyMiddleware({ app });
    } catch (err) {
        console.error('Error starting the application:', err);
    }
}

// Execute setup
run(app);

export { app, run };
