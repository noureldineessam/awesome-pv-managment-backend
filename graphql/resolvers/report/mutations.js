import { reportService } from '../../../app.js';

const reportMutations = {
    createReport: async (_, { report, facilityId }) => {
        const newReport = await reportService.saveUserReport(report, facilityId);
        return newReport;
    },
    deleteReport: async (_, { _id, facilityId }) => {
        const deletedReport = await reportService.deleteUserReport(_id, facilityId);
        return deletedReport;
    },
};

export default reportMutations;
