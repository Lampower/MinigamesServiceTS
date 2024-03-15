import { Injectable } from "@nestjs/common";
import { User } from "src/models/user";
import { DataSource, Repository } from "typeorm";

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

    async create(user: User)
    {
        const createdUser = await this.users.save(user);
        return createdUser
    }
    async getAll()
    {
        return await this.users.find();
    }
    async get(id: number)
    {
        const user = await this.users.findOne({
            "where": { id }
        })
        
        return user;
    }
}