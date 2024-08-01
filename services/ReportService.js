import { logger } from '../utils/logger.js';

export class ReportService {
    constructor({ reportRepository, userRepository, facilityRepository }) {
        this.reportRepository = reportRepository;
        this.userRepository = userRepository;
        this.facilityRepository = facilityRepository;
    }

    async getAllFacilityReports(facilityId, userId) {
        try {
            logger.info('Fetching all reports');
            const user = await this.userRepository.findById(userId);
            if (!user) throw new Error('Unauthorized');

            const reports = await this.reportRepository.findAllByFacility(facilityId);
            if (reports.length > 0 && !user.facilities.includes(reports[0].facilityId)) throw new Error('Unauthorized');

            return reports
        } catch (error) {
            logger.error('Error fetching reports', { message: error.message, stack: error.stack });
            throw new Error('Failed to fetch reports');
        }
    }

    async getFacilityReportById(_id, userId) {
        try {
            logger.info('Fetching report by ID', { _id: _id });
            const user = await this.userRepository.findById(userId);
            if (!user) throw new Error('Unauthorized');

            const report = await this.reportRepository.findById(_id);
            if (!report || !user.facilities.includes(report.facilityId)) throw new Error('Unauthorized');


            return report ? report : null;
        } catch (error) {
            logger.error('Error retrieving report by ID', { message: error.message, stack: error.stack });
            throw new Error(`Failed to retrieve report: ${error.message}`);
        }
    }

    async saveUserReport(reportData, facilityId) {
        try {
            const facility = await this.facilityRepository.findById(facilityId);
            if (!facility) throw new Error('Facility not found');

            // Validate data points
            if (!Array.isArray(reportData.dataPoints) || reportData.dataPoints.length === 0) {
                throw new Error('No data points provided');
            }

            // Set userId and save the report
            const report = {
                ...reportData,
                facilityId,
            };

            const savedReport = await this.reportRepository.save(report);


            //TODO: simpilify
            if (!facility.reports) {
                facility.reports = [];
            }
            facility.reports.push(savedReport._id);
            await facility.save();

            return savedReport;
        } catch (error) {
            logger.error('Error creating report', error);
            throw new Error('Failed to create report');
        }
    }

    async deleteUserReport(_id, facilityId) {
        try {
            const report = await this.reportRepository.findById(_id);
            if (!report) throw new Error('Report not found');
            if (report.facilityId.toString() !== facilityId.toString()) throw new Error('Unauthorized');

            await this.reportRepository.delete(_id);
            return true;
        } catch (error) {
            logger.error('Error deleting report', error);
            throw new Error('Failed to delete report');
        }
    }
}
