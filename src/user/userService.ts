import { Injectable } from "@nestjs/common";
import { User } from "src/models/user";
import { DataSource, Repository } from "typeorm";
import { UserCreateDto } from "./dto/userCreateDto";

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
    async check(username: string, password: string)
    {
        const user = await this.users.findOne({where: {username}});
        if (!user || user.password !== password)
        {
            return false;
        }
        else
        {
            return true;
        }
        
    }

    async getById(id: number = null)
    {
        return await this.users.findOne({where: {id: id}});
    }
    async getByUsername(username: string = null)
    {
        return await this.users.findOne({where: {username: username}});
    }
    async getFirstUsernames(amount: number = null)
    {
        return await this.users.find({
            select: ["username"],
            take: amount
        });
    }
    async getAll()
    {
        return  await this.users.find();
    }
}