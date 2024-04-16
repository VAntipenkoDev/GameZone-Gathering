import { JwtPayload } from 'jsonwebtoken';

import { IUserDTO } from '../dtos/user-dto';
import TokenService from '../services/token-service';

class TokenController {
  generateToken(payload: IUserDTO) {
    try {
      const { acessToken, refreshToken } =
        TokenService.generateToken(payload);

      return {
        acessToken,
        refreshToken,
      };
    } catch (error) {
      console.log(error);
    }
  }

  async saveRefreshToken(
    userId: string,
    refreshToken: string,
  ) {
    await TokenService.saveRefreshToken(
      userId,
      refreshToken,
    );
  }

    validateToken(
    token: string,
    secretKey: string,
  ): JwtPayload | null {
    try {
      return TokenService.validateToken(token, secretKey);
    } catch (error) {
      return null;
    }
  }

  async findToken(token: string) {
    try {
      const tokenData = await TokenService.findToken(token);

      return tokenData;
    } catch (error) {
      return null;
    }
  }
}

export default new TokenController();
