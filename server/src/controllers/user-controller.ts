import { Request, Response, NextFunction } from 'express';
import userService from '../services/user-service';

class UserController {
  async getUsers(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const users = await userService.getUsers();

      res.json(users);
    } catch (error) {
      next(error);
    }
  }
}

export default new UserController();
