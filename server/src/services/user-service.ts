import { UserModel } from '../models/user-model';

class UserService {
  async getUsers() {
    const users = await UserModel.find({});

    return users;
  }
}

export default new UserService();
