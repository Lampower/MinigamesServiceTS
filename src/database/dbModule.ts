import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "./models/user";
import { CookieData } from "./models/cookieData";


@Module({
    imports: [
        TypeOrmModule.forRoot({
          type: "postgres",
          host: process.env.PG_HOST,
          port: Number(process.env.PG_PORT),
          username: process.env.PG_USERNAME,
          password: process.env.PG_PASSWORD,
          database: process.env.PG_DATABASE,
          synchronize: true,
          logging: false,
          entities: [User, CookieData],
          migrations: [],
          subscribers: [],
        })
      ]
})
export class DbModule {}