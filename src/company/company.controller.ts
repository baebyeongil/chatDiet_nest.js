import { Param, Body, Controller, Get, Post } from '@nestjs/common';
import { CompanyService } from './company.service';
import { CreateCompanyDto } from './dto/create-company.dto';

@Controller('company')
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}

  @Get('/companys')
  async getCompanys() {
    return await this.companyService.getCompanys();
  }

  @Get('/companys/:id')
  async getDetailCompanys(@Param('id') id: number) {
    return await this.companyService.getDetailCompanys(id);
  }

  @Post('/company')
  async createCompany(@Body() data: CreateCompanyDto) {
    const userId = 1;
    await this.companyService.createCompany(userId, data.title, data.content);
  }

  //   @Put("/companys/:id")
  //   async updateCompany(@Param("id") companyId: number, @Body()) {

  //   }
}
