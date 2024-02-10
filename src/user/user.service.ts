import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  // user 전체 조회
  async getUsers() {
    return await this.userRepository.find();
  }

  // user 상세 조회
  async getDetailUser(id: number) {
    return await this.userRepository.findOne({
      where: {
        id,
      },
      select: ['id', 'name'],
    });
  }

  // 회원 가입
  async createUser(loginId: string, name: string, password: string) {
    const checkId = await this.getUserInfo(loginId);
    if (checkId) {
      throw new ConflictException(`User already exists. loginId: ${loginId}`);
    }

    const insertResult = await this.userRepository.insert({
      loginId,
      name,
      password,
    });

    const payload = { id: insertResult.identifiers[0].id };
    const accessToken = await this.jwtService.signAsync(payload);
    return accessToken;
  }

  // 로그인
  async login(loginId: string, password: string) {
    if (!loginId || !password) {
      throw new NotFoundException(`Cannot found data.`);
    }

    const user = await this.userRepository.findOne({
      where: { loginId },
    });
    if (!user) {
      throw new NotFoundException(`Cannot found user.`);
    }

    if (user.password !== password) {
      throw new UnauthorizedException(`User password is not correct.`);
    }

    const payload = { id: user.id, name: user.name };
    const accessToken = await this.jwtService.signAsync(payload);
    return { accessToken, user };
  }

  // 유저 정보 수정
  async updateUser(id: number, name: string, password: string) {
    await this.isEmpty(name, password);

    return await this.userRepository.update(
      { id },
      {
        name,
        password,
      },
    );
  }

  // 중복 ID 확인
  private async getUserInfo(loginId: string) {
    const userInfo = await this.userRepository.findOne({
      where: { loginId },
    });

    return userInfo;
  }

  // 미입력 여부 확인
  private async isEmpty(name: string, password: string) {
    if (!name || !password) {
      throw new NotFoundException(`Cannot found data.`);
    }
  }
}
