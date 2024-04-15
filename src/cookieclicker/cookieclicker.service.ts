import { BadRequestException, Injectable } from '@nestjs/common';
import { CookieData } from 'src/database/models/cookieData';
import { UserService } from 'src/user/userService';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class CookieClickerService {
    
    private cookies: Repository<CookieData>;
    private userService: UserService;

    constructor(dataSource: DataSource, userService: UserService)
    {
        this.cookies = dataSource.getRepository(CookieData);
        this.userService = userService;
    }

    async create(userId: number)
    {
        const user = await this.userService.getById(userId);
        const cookieDataCreate = new CookieData();
        cookieDataCreate.user = user;
        const cookieData = await this.cookies.save(cookieDataCreate);
        return cookieData
    }

    async getById(id: number)
    {
        const cookieData = await this.cookies.findOne({
            where: {id},
            relations: {user: true}
        });
        return cookieData;
    }
    async getByUserId(id: number)
    {
        const cookieData = await this.cookies.findOne({
            where: {
                user: {
                    id: id
                }
            },
            relations: {user: true}
            // relationLoadStrategy: "query"
        })
        return cookieData;

    }
    async setAmount(cookieId: number, amount: number)
    {
        await this.cookies.update({id: cookieId}, {amount});
    }
    async addAmount(cookieId: number, amount: number)
    {
        const cookieData = (await this.cookies.findOne({
            where: {id: cookieId},
            relations: {user: true}
        }));
        cookieData.amount += amount;
        await this.cookies.save(cookieData);
        return cookieData;
    }
    async getAll()
    {
        return await this.cookies.find({relations: {user: true}});
    }
}
