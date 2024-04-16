import { IUser } from '../models/user-model';

export interface IUserDTO {
  email: string;
  id: string;
}

class UserDto {
  email: string;
  id: string;

  constructor(model: IUser) {
    this.email = model.email; 
    this.id = model._id;
  }
}

export { UserDto };
