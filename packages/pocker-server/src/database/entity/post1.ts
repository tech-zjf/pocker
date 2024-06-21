import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Post1 {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    text: string;
}
