import { JwtService } from "@nestjs/jwt"
import { UserService } from "./userService"

export class AuthService 
{
    private readonly jwtService: JwtService = new JwtService()

    async generateToken(payload: any): Promise<string>
    {

        const token = await this.jwtService.signAsync({payload}, {
            secret: "some secret bullshit"
        });
        return token;
    }

    async verify(token: string): Promise<any>
    {
        const payload = await this.jwtService.verifyAsync(token, {
            secret: "some secret bullshit"
        });
        return payload;
    }
}