import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity("photo")
export class Photos {
    @PrimaryGeneratedColumn()
    public id: number;

    @Column()
    public name: string;
}