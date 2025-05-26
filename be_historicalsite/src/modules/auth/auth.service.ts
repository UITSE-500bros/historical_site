import { Injectable, UnauthorizedException, ConflictException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../../prisma/prisma.service';
import { AdminLoginDto } from './dto/admin-login.dto';
import { AuthResponseDto } from './dto/auth-response.dto';
import { CreateAdminDto } from './dto/create-admin.dto';
import * as bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  /**
   * Admin login with email and password
   */
  async adminLogin(adminLoginDto: AdminLoginDto): Promise<AuthResponseDto> {
    const { email, password } = adminLoginDto;

    // Find admin by email
    const admin = await this.prisma.admin.findFirst({
      where: { adminEmail: email },
    });

    if (!admin) {
      throw new UnauthorizedException('Invalid email or password');
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, admin.adminPassword);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid email or password');
    }

    // Generate JWT token
    const payload = { sub: admin.adminId, email: admin.adminEmail };
    const accessToken = this.jwtService.sign(payload);

    // Remove password from response
    const { adminPassword, ...adminData } = admin;

    return {
      accessToken,
      admin: adminData,
    };
  }

  /**
   * Validate admin by JWT token payload
   */
  async validateAdmin(payload: any) {
    const admin = await this.prisma.admin.findUnique({
      where: { adminId: payload.sub },
    });

    if (!admin) {
      throw new UnauthorizedException('Invalid token');
    }

    const { adminPassword, ...result } = admin;
    return result;
  }

  /**
   * Create a new admin account
   */
  async createAdmin(createAdminDto: CreateAdminDto) {
    const { email, password, firstName, lastName, phoneNumber, avatar } = createAdminDto;
    
    // Check if admin with this email already exists
    const existingAdmin = await this.prisma.admin.findFirst({
      where: { adminEmail: email },
    });
    
    if (existingAdmin) {
      throw new ConflictException('Admin with this email already exists');
    }
    
    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    
    // Create admin
    const admin = await this.prisma.admin.create({
      data: {
        adminId: uuidv4(),
        adminEmail: email,
        adminPassword: hashedPassword,
        adminFisrtName: firstName,
        adminLastName: lastName,
        adminAvatar: avatar || 'https://example.com/default-avatar.jpg',
        phoneNumber,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    });
    
    // Remove password from response
    const { adminPassword, ...adminData } = admin;
    
    return adminData;
  }

  async analyze() {
    const numberOfArticles = await this.prisma.article.count();
    const numberOfTickets = await this.prisma.payment.count();
    const revenue = await this.prisma.payment.aggregate({
      _sum: {
        totalPrice: true,
      },
    });
    return {
      numberOfArticles,
      numberOfTickets,
      revenue: revenue._sum?.totalPrice || 0,
    };
  }
}
