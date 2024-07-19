import { Controller, Get, Render, Req, Res, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth/auth.service';
import { Public } from './auth/decorators/public.decorator';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly authService: AuthService,
  ) {}

  @Public()
  @Get()
  @Render('index')
  root() {}

  @Get('protected=route')
  @UseGuards(AuthGuard('jwt'))
  protectedRoute() {
    return 'Welcome, authorized use!';
  }

  

  // http://localhost:3000/api/user/google
  @Public()
  @Get('google')
  @UseGuards(AuthGuard('google'))
  async googlelogin() {}

  @Public()
  @Get('auth/google/callback')
  @UseGuards(AuthGuard('google'))
  async callback(@Req() req, @Res() res) {
    const jwt = await this.authService.logIn(req.user);
    res.set('authorization', jwt.access_token);
    res.json(req.user);
  }

  // GET localhost:3000/api/user/test112
  @Public()
  @Get('test112')
  @UseGuards(AuthGuard('jwt'))
  async test112(@Res() res) {
    res.json('success');
  }
}
