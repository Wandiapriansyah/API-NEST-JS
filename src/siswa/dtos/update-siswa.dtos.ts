import { PartialType } from "@nestjs/mapped-types";
import { CreateSiswaDto } from "./create-siswa.dtos";


export class UpdateSiswaDto extends PartialType(CreateSiswaDto) {}