import { Injectable } from "@nestjs/common";
import { User } from "src/models/user";
import { DataSource, Repository } from "typeorm";

@Injectable()
export class UserService
{
    private readonly users: Repository<User>;


    constructor(dataSource: DataSource)
    {
        this.users = dataSource.getRepository(User);
    }

    create(user: User)
    {
        
        this.users.save(user);
    }
    getAll()
    {
        return this.users;
    }
    get(id: number)
    {
        let user: User = null;
        this.users.findOne({
            "where": { id: id }
        })
        
        return user;
    }
}