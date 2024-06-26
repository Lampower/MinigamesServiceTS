import { Injectable } from "@nestjs/common";
import { DataSource, Repository } from "typeorm";
import { UserCreateDto } from "./dto/userCreateDto";
import { User } from "src/database/models/user";

@Injectable()
export class UserService
{
    private readonly dataSource: DataSource;
    private readonly users: Repository<User>;


    constructor(dataSource: DataSource)
    {
        this.dataSource = dataSource;
        this.users = dataSource.getRepository(User);
    }

    async create(user: UserCreateDto)
    {
        const createdUser = await this.users.save(user);
        return createdUser
    }
    async checkPassword(username: string, password: string)
    {
        const user = await this.users.findOne({where: {username}});
        return user && user.password === password; 
    }
    async checkIfExists(username: string)
    {
        return await this.users.exists({
            where: {
                username: username
            }
        })
    }

    async getById(id: number = null)
    {
        return await this.users.findOne({where: {id: id}});
    }
    async getByUsername(username: string = null)
    {
        return await this.users.findOne({where: {username: username}});
    }
    async getAll()
    {
        return  await this.users.find();
    }
    async update(id: number, user: User)
    {
        await this.users.update(id, user);
        return user;
    }
}