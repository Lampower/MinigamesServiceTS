import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user";


@Entity({name: "comment"})
export class Comments
{
    @PrimaryGeneratedColumn()
    public id: number

    @Column()
    public message: string

    @Column()
    @OneToOne(() => User)
    userRecieved: User

    @ManyToOne(() => User)
    @JoinColumn()
    userSender: User
}