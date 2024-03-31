import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm"
import { CookieData } from "./cookieData"

@Entity({name: "users"})
export class User
{
    @PrimaryGeneratedColumn()
    public id: number

    @Column()
    public username: string
    
    @Column()
    public password: string

}