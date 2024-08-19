import { registerAs } from "@nestjs/config";
import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { Siswa } from "src/siswa/entities/siswa.entity";


export default registerAs(
    'orm.config',
    (): TypeOrmModuleOptions => ({
        type: 'postgres',
        host: 'ep-solitary-hill-a2k9pym8.eu-central-1.pg.koyeb.app',
        port: 5432,
        username: 'koyeb-adm',
        password: '*******',
        database: 'koyebdb',
        entities: [Siswa],
        synchronize: false, //false jika data produksi
    }),
);