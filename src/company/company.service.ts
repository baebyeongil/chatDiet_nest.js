import { Injectable } from '@nestjs/common';
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
    return await this.companyRepository.findOne({
      where: { id },
    });
  }

  async createCompany(userId: number, title: string, content: string) {
    return await this.companyRepository.insert({
      userId,
      title,
      content,
    });
  }
}
