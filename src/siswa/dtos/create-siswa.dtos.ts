import { IsEmail, IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";
import { Kelas, Jurusan } from "../kelas-jurusan";

export class CreateSiswaDto {
    nama: string;
    kelas: Kelas;
    jurusan: Jurusan;
    email: string;
    password: string;
    createdAt: string;
    updatedAt: string;
}

export class RegisterDto {
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @IsString()
    @MinLength(8)
    @MaxLength(12)
    password: string;
}