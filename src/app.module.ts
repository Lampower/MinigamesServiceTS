import { Module } from '@nestjs/common';
import { UserModule } from './user/userModule';
import { AuthModule } from './auth/authModule';
import { CookieClickerModule } from './cookieclicker/cookieclicker.module';
import { CommentService } from './comment/comment.service';


@Module({
  imports: [UserModule, AuthModule, CookieClickerModule],
  controllers: [],
  providers: [CommentService],
  exports: []
})
export class AppModule {
}
