import { Facility } from '../models/index.js';

export class FacilityRepository {
    async findById(_id) {
        return await Facility.findById(_id);
    }

    async save(facility) {
        const newFacility = new Facility(facility);
        return await newFacility.save();
    }

    async update(_id, facility) {
        return await Facility.findByIdAndUpdate(_id, { $set: facility }, { new: true });
    }

    async delete(_id) {
        await Facility.findByIdAndDelete(_id);
        return true;
    }

    async findAllByUserId(userId) {
        return Facility.find({ userId });
    }
}
