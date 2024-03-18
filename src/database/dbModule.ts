import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { entities } from "src/models/models";


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
          entities: entities,
          migrations: [],
          subscribers: [],
        })
      ]
})
export class DbModule {}