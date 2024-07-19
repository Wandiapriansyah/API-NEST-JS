import { Body, Controller, Delete, Get, HttpCode, NotFoundException, Param, Patch, Post } from '@nestjs/common';
import { CreateSiswaDto, UpdateSiswaDto } from './dtos/index';
import { Siswa } from './entities/siswa.entity';
import { Jurusan, Kelas } from './kelas-jurusan';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Public } from 'src/auth/decorators/public.decorator';

@Controller('siswa')
export class SiswaController {
    // Dependency Inject
    constructor(
        @InjectRepository(Siswa) private readonly repository: Repository<Siswa>,
    ) {}

    // GET http://127.0.0.1:3000/api/user/siswa
    @Public()
    @Get()
    async ambilData() {
        const murid = await this.repository.find();

        return { success: true, count: murid.length, data: murid };
    }

    // HTML
    // GET http://localhost:3000/api/user/siswa/:id
    @Public()
    @Get(':id')
    async cariData(@Param('id') id) {
        const murid = await this.repository.findOneBy({ id });

        if (!murid) {
            throw new NotFoundException();
        }
        return { success: true, data: murid };
    }

    // JSON
    // @Get(':id')
    // cariSatuData(@Param() id) {
    //     return id;
    // }

    // POST http://localhost:3000/api/user/siswa
    @Public()
    @Post()
    async buatData(@Body() input: CreateSiswaDto) {
        const murid = await this.repository.save({
            ...input,
            createdAt: input.createdAt,
            updatedAt: input.updatedAt,
        });

        return { success: true, data: murid };
    }

    // PATCH http://localhost:3000/api/user/siswa/:id
    @Public()
    @Patch(':id')
    async updateData(@Param('id') id, @Body() input: UpdateSiswaDto) {
        const murid = await this.repository.findOneBy({ id });

        if (!murid) {
            throw new NotFoundException();
        }

        const data = await this.repository.save({
            ...murid,
            ...input,
            createdAt: input.createdAt ?? murid.createdAt,
            updatedAt: input.updatedAt ?? murid.updatedAt,
        });
        return { success: true, data };
    }

    // DELETE http://localhost:3000/api/user/siswa/:id
    @Public()
    @Delete(':id')
    @HttpCode(204)
    async hapusData(@Param('id') id) {
    const murid = await this.repository.findOneBy({ id });

    if(!murid) {
        throw new NotFoundException();
    }

    await this.repository.remove(murid);
    }

}
