import { HttpCode, HttpStatus, Injectable, NestMiddleware } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Request, Response } from "express";
import { AuthService } from "src/services/authService";


@Injectable()
export class AuthMiddleware implements NestMiddleware
{
    private readonly authService: AuthService;
    constructor(authService: AuthService)
    {
        this.authService = authService
    }
    async use(req: Request, res: Response, next: (error?: any) => void) {
        const token_data = req.headers["authorization"];
        if (!token_data)
        {
            res.status(HttpStatus.UNAUTHORIZED)
            return res.json("You are not authorized")
        }
        const [token_type, token] = token_data.split(" ");
        if (token_type != "Bearer")
        {
            res.status(HttpStatus.UNAUTHORIZED)
            return res.json("You are not authorized")
        }
        const payload = await this.authService.verify(token);
        if (!payload)
        {
            res.status(HttpStatus.UNAUTHORIZED)
            return res.json("You are not authorized")
        }

        req.body = payload;
        next();
    }

}