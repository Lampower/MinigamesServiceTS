import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt"
import { UserPayload } from "src/user/dto/userPayload";

@Injectable()
export class AuthService 
{

    constructor(private jwtService: JwtService) {}

    async generateToken(user: UserPayload): Promise<string>
    {
        const token = await this.jwtService.signAsync({user});
        return token;
    }

    async verifyAsync(token: string): Promise<UserPayload>
    {
        const payload = await this.jwtService.verifyAsync(token);
        return payload["user"] as UserPayload;
    }
}