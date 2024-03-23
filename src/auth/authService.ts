import { JwtService } from "@nestjs/jwt"

export class AuthService 
{
    private readonly jwtService: JwtService = new JwtService({})

    async generateToken(payload: any): Promise<string>
    {

        const token = await this.jwtService.signAsync({payload}, {
            secret: process.env.SECRET_KEY
        });
        return token;
    }

    async verifyAsync(token: string): Promise<any>
    {
        const payload = await this.jwtService.verifyAsync(token, {
            secret: process.env.SECRET_KEY
        });
        return payload;
    }
}