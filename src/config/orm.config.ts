import { registerAs } from "@nestjs/config";
import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { Siswa } from "src/siswa/entities/siswa.entity";


export default registerAs(
    'orm.config',
    (): TypeOrmModuleOptions => ({
        type: 'postgres',
        host: 'localhost',
        port: 5432,
        username: 'root',
        password: '',
        database: 'apinest',
        entities: [Siswa],
        synchronize: true,
    }),
);