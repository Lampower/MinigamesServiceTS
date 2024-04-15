import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { AuthController } from 'src/auth/authController';
import { UserController } from 'src/user/userConroller';
import { AuthMiddleware } from 'src/middlewares/authorizationMiddleware';
import { AuthService } from 'src/auth/authService';
import { UserModule } from 'src/user/userModule';
import { CookieClickerController } from 'src/cookieclicker/cookieclicker.controller';
import { JwtModule } from '@nestjs/jwt';
import { JwtKeywords } from 'src/jwtConfig';
import { CommentModule } from 'src/comment/comment.module';
import { CookieClickerModule } from 'src/cookieclicker/cookieclicker.module';
import { CommentController } from 'src/comment/comment.controller';
import { METHODS } from 'http';

@Module({
    imports: [
        UserModule, 
        CookieClickerModule,
        CommentModule,
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
            .exclude({"path": "comments/:id", "method": RequestMethod.GET})
            .forRoutes(
                UserController, CookieClickerController, CommentController
            );
    }
}
