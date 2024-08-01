import { User } from '../models/index.js';

export class UserRepository {

    async findById(_id) {
        const user = await User.findById(_id);
        return user;
    }

    async findByEmail(email) {
        const user = await User.findOne({ email });
        return user;
    }

    async findAll() {
        const users = await User.find();
        return users
    }

    async save(user) {
        const newUser = new User(user);
        return newUser.save();
    }

    async delete(_id) {
        await User.findByIdAndDelete(_id);
        return true;
    }

    async update(_id, user) {
        const updatedUser = await User.findByIdAndUpdate(
            _id,
            { $set: { ...user } },
            { new: true }
        );
        return updatedUser;
    }
}
