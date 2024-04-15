import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user";


@Entity({name: "comment"})
export class Comments
{
    @PrimaryGeneratedColumn()
    public id: number

    @Column()
    public message: string

    @OneToOne(() => User, {nullable: true})
    @JoinColumn()
    userRecieved: User

    @ManyToOne(() => User, {nullable: true})
    @JoinColumn()
    userSender: User
}