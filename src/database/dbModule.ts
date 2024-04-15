import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "./models/user";
import { CookieData } from "./models/cookieData";
import { Comments } from "./models/comments";


@Module({
    imports: [
        TypeOrmModule.forRoot({
          type: "postgres",
          host: "localhost",
          port: 5432,
          username: "postgres",
          password: "superuser",
          database: "minigames",
          synchronize: true,
          logging: false,
          entities: [User, CookieData, Comments],
          migrations: [],
          subscribers: [],
        })
      ]
})
export class DbModule {}