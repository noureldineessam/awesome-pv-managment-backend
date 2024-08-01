import express from 'express';

import startGraphQl from './utils/startGraphQl.js';
import connectDB from './utils/dbConnection.js';
import authVerify from './middlewares/authVerify.js';

import { UserRepository } from './repositories/UserRepository.js';
import { UserService } from './services/UserService.js';

import { ReportRepository } from './repositories/ReportRepository.js';
import { ReportService } from './services/ReportService.js';

import { FacilityRepository } from './repositories/FacilityRepository.js';
import { FacilityService } from './services/FacilityService.js';


const app = express();

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

app.use(authVerify);
startGraphQl(app);
connectDB();


export default app;
