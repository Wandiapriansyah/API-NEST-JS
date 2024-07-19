import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { RegisterDto } from 'src/siswa/dtos/create-siswa.dtos';
import { UsersService } from 'src/users/users.service';
import { compare, hash } from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(
        private userService: UsersService,
        private jwtService: JwtService,
    ) {}

    async register(data: RegisterDto) {
        const checkUserExists = await this.userService.findOne(data.email);
        if (checkUserExists) {
            throw new HttpException('User already registered', HttpStatus.FOUND);
        }
        data.password = await hash(data.password, 12);
    }

    async signIn(
        email: string,
        pass: string,
    ): Promise< {access_token: string }> {
        const user = await this.userService.findOne(email);
        if (user?.password !== pass) {
            throw new UnauthorizedException();
        }
        const payload = { sub: user.userId, email: user.email };
        return {
            access_token: await this.jwtService.signAsync(payload),
        };
    }

    async logIn(user: any) {
        const payload = { email: user.email, sub: user.id };
        return {
            access_token: this.jwtService.sign(payload),
        };
    }
}
