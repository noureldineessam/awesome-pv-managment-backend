
import { reportService } from '../../../app.js';

const reportQueries = {
    report: async (_, { _id }, { user }) => {
        try {
            const report = await reportService.getFacilityReportById(_id, user._id);
            return report || null;
        } catch (error) {
            console.error('Error fetching user:', error);
            throw new Error('Error fetching user');
        }
    },
    facilityReports: async (_, { facilityId }, { user }) => {
        try {
            const reports = await reportService.getAllFacilityReports(facilityId, user._id);
            return reports || null;
        } catch (error) {
            console.error('Error fetching user:', error);
            throw new Error('Error fetching user');
        }
    },
};


export default reportQueries;