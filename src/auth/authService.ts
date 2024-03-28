import { JwtService } from "@nestjs/jwt"
import { UserPayload } from "src/user/dto/userPayload";

export class AuthService 
{
    private SECRET_KEY = "MY-SECRET-KEY";

    private readonly jwtService: JwtService = new JwtService({secret: this.SECRET_KEY})

    async generateToken(user: UserPayload): Promise<string>
    {

        const token = await this.jwtService.signAsync({user}, {
            secret: this.SECRET_KEY
        });
        return token;
    }

    async verifyAsync(token: string): Promise<UserPayload>
    {
        const payload = await this.jwtService.verifyAsync(token, {
            secret: this.SECRET_KEY
        });
        return payload["user"] as UserPayload;
    }
}