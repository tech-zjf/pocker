import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    desc: string;

    @Column({ enum: { 1: '未完成', 2: '进行中' } })
    status: number;

    @Column()
    poster: string;
}
