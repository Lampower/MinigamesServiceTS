import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { AuthController } from 'src/auth/authController';
import { UserController } from 'src/user/userConroller';
import { AuthMiddleware } from 'src/middlewares/authorizationMiddleware';
import { AuthService } from 'src/auth/authService';
import { UserModule } from 'src/user/userModule';
import { CookieClickerController } from 'src/cookieclicker/cookieclicker.controller';
import { JwtModule } from '@nestjs/jwt';
import { JwtKeywords } from 'src/jwtConfig';

@Module({
    imports: [
        UserModule, 
        JwtModule.register({
            "global": true,
            "secret": JwtKeywords.secret,
            "signOptions": {
                "expiresIn": JwtKeywords.expire_time
            }
        })
    ],
    controllers: [AuthController],
    providers: [AuthService],
    exports: [AuthService]
})
export class AuthModule implements NestModule 
{
    configure(consumer: MiddlewareConsumer) {
        consumer
            .apply(AuthMiddleware)
            .forRoutes(
                UserController, CookieClickerController
            );
    }
}
