import { HttpCode, HttpStatus, Injectable, NestMiddleware, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { time } from "console";
import { Request, Response } from "express";
import { AuthService } from "src/auth/authService";


@Injectable()
export class AuthMiddleware implements NestMiddleware
{
    private readonly authService: AuthService;
    constructor(authService: AuthService)
    {
        this.authService = authService
    }
    async use(req: Request, res: Response, next: (error?: any) => void) {
        try {
            const token_data = req.headers["authorization"];
            const [token_type, token] = token_data.split(" ");
            const payload = await this.authService.verifyAsync(token);
            req["user"] = payload;
            next();
        } 
        catch (error) {
            throw new UnauthorizedException();
        }
    }

}