import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private jwtService: JwtService) {}

  async use(req: any, res: any, next: Function) {
    req.locals = {};

    const authCookie = req.cookies.Authorization;

    if (!authCookie) {
      throw new UnauthorizedException('JWT not found');
    }

    let token: string;
    try {
      token = authCookie.split(' ')[1];
      const payload = await this.jwtService.verify(token);
      req.locals = payload;
      next();
    } catch (err) {
      throw new UnauthorizedException(`Invalid JWT: ${token}`);
    }
  }
}
