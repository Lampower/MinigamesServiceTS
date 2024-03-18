import { Module } from "@nestjs/common";
import { UserService } from "./userService";
import { UserController } from "./userConroller";
import { DbModule } from "src/database/dbModule";

@Module({
    imports: [DbModule],
    controllers: [UserController],
    providers: [UserService],
    exports: [UserService]
})
export class UserModule {}