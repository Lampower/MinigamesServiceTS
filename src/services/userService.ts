import { Injectable } from "@nestjs/common";
import { User } from "src/models/user";

@Injectable()
export class UserService
{
    private readonly users: User[] = [];

    create(user: User)
    {
        this.users.push(user);
    }
    getAll()
    {
        return this.users;
    }
    get(id: number)
    {
        const user = this.users.find((u) => u.id == id);
        
        return user;
    }
}