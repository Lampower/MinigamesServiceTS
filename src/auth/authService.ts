import { JwtService } from "@nestjs/jwt"

export class AuthService 
{
    private readonly jwtService: JwtService = new JwtService({})

    async generateToken(payload: any): Promise<string>
    {

        const token = await this.jwtService.signAsync({payload}, {
            secret: "some secret bullshit"
        });
        return token;
    }

    async verifyAsync(token: string): Promise<any>
    {
        const payload = await this.jwtService.verifyAsync(token, {
            secret: "some secret bullshit"
        });
        console.log(payload);
        return payload;
    }
}