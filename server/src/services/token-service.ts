import * as jwt from 'jsonwebtoken';

import { TokenModel } from '../models/token-model';
import { IUserDTO } from '../dtos/user-dto';

class TokenService {
  generateToken(payload: IUserDTO): {
    acessToken: string;
    refreshToken: string;
  } {
    const jwtAccessSecretKey =
      process.env.JWT_ACCESS_SECRET || 'jwt_access_secret_';
    const jwtRefreshSecretKey =
      process.env.JWT_REFRESH_SECRET ||
      'jwt_refresh_secret_';

    const jwtAccessTokenExpiration =
      process.env.JWT_ACCESS_TOKEN_EXPIRATION || '10m';
    const jwtRefreshTokenExpiration =
      process.env.JWT_REFRESH_TOKEN_EXPIRATION || '30d';

    const acessToken = jwt.sign(
      { payload },
      jwtAccessSecretKey,
      {
        expiresIn: jwtAccessTokenExpiration,
      },
    );

    const refreshToken = jwt.sign(
      { payload },
      jwtRefreshSecretKey,
      {
        expiresIn: jwtRefreshTokenExpiration,
      },
    );

    return {
      acessToken,
      refreshToken,
    };
  }

  async saveRefreshToken(
    userId: string,
    refreshToken: string,
  ) {
    const tokenData = await TokenModel.findOne({
      user: userId,
    });

    if (tokenData) {
      tokenData.refreshToken = refreshToken;

      return tokenData.save();
    }

    return await TokenModel.create({
      user: userId,
      refreshToken,
    });
  }

  validateToken(
    token: string,
    secretKey: string,
  ): jwt.JwtPayload {
    return jwt.verify(token, secretKey) as jwt.JwtPayload;
  }

  async findToken(token: string) {
    return await TokenModel.findOne({
      refreshToken: token,
    });
  }
}

export default new TokenService();
