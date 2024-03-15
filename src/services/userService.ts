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
        let user: User = null;
        this.users.forEach(u => {
            if (u.id == id)
            {
                user = u
                return;
            }
        });
        
        return user;
    }
}