import { Body, Controller, HttpCode, HttpStatus, Post,Get } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { AdminLoginDto } from './dto/admin-login.dto';
import { AuthResponseDto } from './dto/auth-response.dto';
import { CreateAdminDto } from './dto/create-admin.dto';
import { Admin } from './entities/admin.entity';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('admin/login')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Admin login' })
  @ApiResponse({ 
    status: 200, 
    description: 'Login successful', 
    type: AuthResponseDto 
  })
  @ApiResponse({ status: 401, description: 'Unauthorized - Invalid credentials' })
  adminLogin(@Body() adminLoginDto: AdminLoginDto): Promise<AuthResponseDto> {
    return this.authService.adminLogin(adminLoginDto);
  }

  @Post('admin/logout')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Admin logout' })
  @ApiResponse({ status: 200, description: 'Logout successful' })
  adminLogout() {
    // Since we're using JWT, logout is handled client-side by removing the token
    return { message: 'Logout successful' };
  }

  @Post('admin/register')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create a new admin account' })
  @ApiResponse({ 
    status: 201, 
    description: 'Admin account created successfully', 
    type: Admin 
  })
  @ApiResponse({ status: 409, description: 'Conflict - Admin with this email already exists' })
  createAdmin(@Body() createAdminDto: CreateAdminDto) {
    return this.authService.createAdmin(createAdminDto);
  }

  @Get('admin/analyze')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Analyze admin accounts' })
  @ApiResponse({ status: 200, description: 'Return the analysis of admin accounts.' })
  analyze() {
    return this.authService.analyze();
  }
}
