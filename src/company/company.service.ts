import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Company } from '../entities/company.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CompanyService {
  constructor(
    @InjectRepository(Company) private companyRepository: Repository<Company>,
  ) {}

  async getCompanys() {
    return await this.companyRepository.find({});
  }

  async getDetailCompanys(id: number) {
    return await this.checkCompanyId(id);
  }

  async createCompany(userId: number, title: string, content: string) {
    await this.checkData(title, content);
    return await this.companyRepository.insert({
      userId,
      title,
      content,
    });
  }

  async updateCompany(
    id: number,
    userId: number,
    title: string,
    content: string,
  ) {
    await this.isAuth(id, userId);

    await this.checkData(title, content);

    return await this.companyRepository.update(id, { title, content });
  }

  async deleteCompany(id: number, userId: number) {
    await this.isAuth(id, userId);

    return await this.companyRepository.delete(id);
  }

  private async checkCompanyId(id: number) {
    if (!id) {
      throw new NotFoundException(`Cannot found company.`);
    }

    const company = await this.companyRepository.findOne({
      where: { id },
    });

    if (!company) {
      throw new NotFoundException(`Cannot found company.`);
    }

    return company;
  }

  private async checkData(title: string, content: string) {
    if (!title || !content) {
      throw new NotFoundException(`Cannot found title or content.`);
    }
  }

  private async isAuth(id: number, userId: number) {
    const company = await this.checkCompanyId(id);

    if (company.userId !== userId) {
      throw new UnauthorizedException('Cannot access');
    }
  }
}
