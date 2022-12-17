import { Controller, Post, UseGuards, Request } from '@nestjs/common';
import { LoginGuard } from '@infra/common/guard';

import { UserViewModel } from './presenters';

@Controller('auth')
export class AuthController {
  @UseGuards(LoginGuard)
  @Post('login')
  async login(@Request() req) {
    const user = req.user;

    return UserViewModel.toHttpResponse(user);
  }
}
