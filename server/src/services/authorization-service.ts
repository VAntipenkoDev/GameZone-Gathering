import bcrypt from 'bcrypt';

import TokensController from '../controllers/tokens-controller';
import ApiError from '../exeptions/api-error';
import { UserModel } from '../models/user-model';
import { UserDto } from '../dtos/user-dto';

interface IAuthorizationSignIn {
  email: string;
  password: string;
}

interface IAuthorizationSignUp
  extends IAuthorizationSignIn {
  login: string;
  confirmPassword: string;
}

class AuthorizationService {
  async signIn({ email, password }: IAuthorizationSignIn) {
    const candidate = await UserModel.findOne({ email });

    if (!candidate) {
      throw ApiError.NotFound('User not found');
    }

    const isPasswordEquals = await bcrypt.compare(
      password,
      candidate.password,
    );

    if (!isPasswordEquals) {
      throw ApiError.BadRequest('Error passowrd');
    }

    const userDto = new UserDto(candidate);

    const tokens = TokensController.generateToken({
      ...userDto,
    });

    if (tokens?.refreshToken) {
      await TokensController.saveRefreshToken(
        userDto.id,
        tokens?.refreshToken,
      );
    }

    return {
      ...tokens,
      user: {
        ...userDto,
      },
    };
  }

  async signUp({
    login,
    email,
    password,
    confirmPassword,
  }: IAuthorizationSignUp) {
    const candidate = await UserModel.findOne({ email });

    if (candidate) {
      throw ApiError.BadRequest(
        'The user with such an email has already been deregistered',
      );
    }

    const salt = process.env.BCRYPT_SALT || 7;

    const hashPassword = bcrypt.hashSync(
      password,
      Number(salt),
    );

    const user = await UserModel.create({
      email,
      password: hashPassword,
    });

    const userDto = new UserDto(user);

    const tokens = TokensController.generateToken({
      ...userDto,
    });

    if (tokens?.refreshToken) {
      await TokensController.saveRefreshToken(
        userDto.id,
        tokens?.refreshToken,
      );
    }

    return {
      ...tokens,
      user: {
        ...userDto,
      },
    };
  }

  async refreshToken(token: string) {
    if (!token) {
      throw ApiError.UnautorizedError();
    }

    const jwtRefreshSecretKey =
      process.env.JWT_REFRESH_SECRET ||
      'jwt_refresh_secret_';

    const userData = TokensController.validateToken(
      token,
      jwtRefreshSecretKey,
    );

    const tokenFromDb =
      await TokensController.findToken(token);

    if (!tokenFromDb || !userData) {
      throw ApiError.UnautorizedError();
    }

    const user = await UserModel.findById(userData.id);
    const userDto = new UserDto(user!);
    const tokens = TokensController.generateToken({
      ...userDto,
    });

    if (tokens?.refreshToken) {
      await TokensController.saveRefreshToken(
        userDto.id,
        tokens?.refreshToken,
      );
    }

    return {
      ...tokens,
      user: {
        ...userDto,
      },
    };
  }
}

export default new AuthorizationService();
