import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user";

@Entity()
export class CookieData
{
    @PrimaryGeneratedColumn()
    public id: number

    @Column()
    public amount: number

    @OneToOne(() => User)
    @JoinColumn()
    public user: User
}