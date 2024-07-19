import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Kelas, Jurusan } from "../kelas-jurusan";

@Entity()
export class Siswa {
    @PrimaryGeneratedColumn('uuid')
    id: number;

    @Column()
    nama: string;

    @Column({
        type: 'enum',
        enum: Kelas,
        default: Kelas.X,
    })
    kelas: Kelas;

    @Column({
        type: 'enum',
        enum: Jurusan,
        default: Jurusan.GEO,
    })
    jurusan: Jurusan;

    @Column()
    email: string;

    @Column()
    password: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}