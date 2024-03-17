import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { AppModule } from 'src/app.module';
import { AuthController } from 'src/controllers/authController';
import { UserController } from 'src/controllers/userConroller';
import { AuthMiddleware } from 'src/middlewares/authorizationMiddleware';
import { AuthService } from 'src/services/authService';
import { UserService } from 'src/services/userService';

@Module({
    imports: [],
    controllers: [AuthController],
    providers: [UserService, AuthService]
})
export class AuthModule implements NestModule 
{
    configure(consumer: MiddlewareConsumer) {
        consumer
            .apply(AuthMiddleware)
            .forRoutes(
                UserController
            );
    }
}
