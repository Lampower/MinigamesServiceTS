import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class CookieData
{
    @PrimaryGeneratedColumn()
    public id: number

    @Column()
    public amount: number
}