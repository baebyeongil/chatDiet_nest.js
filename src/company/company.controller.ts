import {
  Param,
  Body,
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Req,
} from '@nestjs/common';
import { CompanyService } from './company.service';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto copy';

interface RequestWithLocals extends Request {
  locals: {
    id: number;
  };
}

@Controller('api')
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
  async createCompany(
    @Req() req: RequestWithLocals,
    @Body() data: CreateCompanyDto,
  ) {
    const userId = req.locals.id;

    await this.companyService.createCompany(userId, data.title, data.content);

    return {
      message: 'create success',
    };
  }

  @Put('/companys/:id')
  async updateCompany(
    @Req() req: RequestWithLocals,
    @Param('id') companyId: number,
    @Body() data: UpdateCompanyDto,
  ) {
    const userId = req.locals.id;

    await this.companyService.updateCompany(
      companyId,
      userId,
      data.title,
      data.content,
    );

    return {
      message: 'update success',
    };
  }

  @Delete('/companys/:id')
  async deleteCompany(@Req() req: RequestWithLocals, @Param('id') id: number) {
    const userId = req.locals.id;

    await this.companyService.deleteCompany(id, userId);

    return {
      message: 'delete success',
    };
  }
}
