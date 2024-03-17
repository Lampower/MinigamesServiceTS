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
    use(req: Request, res: Response, next: (error?: any) => void) {
        const token_data = req.headers["authorization"];
        if (token_data == null)
        {
            res.status(HttpStatus.UNAUTHORIZED)
            return res.json("You are not authorized")
        }
        console.log(token_data) 
        const [token_type, token] = token_data.split(" ");
        if (token_type != "Bearer")
        {
            res.status(HttpStatus.UNAUTHORIZED)
            return res.json("You are not authorized")
        }
        if (!this.authService.verify(token))
        {
            res.status(HttpStatus.UNAUTHORIZED)
            return res.json("You are not authorized")
        }
        

        next();
    }

}