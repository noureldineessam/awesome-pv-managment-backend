import { Report } from '../models/index.js';

export class ReportRepository {
    async findById(_id) {
        return await Report.findById(_id);
    }

    async save(report) {
        const newReport = new Report(report);
        return await newReport.save();
    }

    async delete(_id) {
        await Report.findByIdAndDelete(_id);
        return true;
    }

    async findAllByFacility(facilityId) {
        return await Report.find({ facilityId });
    }
}
