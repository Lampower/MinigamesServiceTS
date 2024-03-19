import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm"
import { CookieData } from "./cookieData"

@Entity()
export class User
{
    @PrimaryGeneratedColumn()
    public id: number

    @Column()
    public username: string
    
    @Column()
    public password: string

    @OneToOne(() => CookieData)
    @JoinColumn()
    public cookieData: CookieData
}