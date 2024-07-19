import { Get, Injectable } from '@nestjs/common';
import { Public } from 'src/auth/decorators/public.decorator';
import { RegisterDto } from 'src/siswa/dtos/create-siswa.dtos';

export type User = any;

@Injectable()
export class UsersService {
    private readonly users = [
        {
            userId: 1,
            username: 'wandi',
            email: 'wandi@gmail.com',
            password: 'tes',
        },
        {
            userId: 2,
            username: 'dava',
            email: 'dava@gmail.com',
            password: 'tes',
        },
    ];

    async findOne(email: string) : Promise<User | undefined> {
        return this.users.find(user => user.email === email);
    }
    
}
