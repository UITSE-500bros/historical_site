import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { PrismaService } from '../../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { UnauthorizedException, ConflictException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';

jest.mock('bcrypt');
jest.mock('uuid');

describe('AuthService', () => {
  let service: AuthService;
  let prisma: PrismaService;
  let jwtService: JwtService;

  const mockPrismaService = {
    admin: {
      findFirst: jest.fn(),
      findUnique: jest.fn(),
      create: jest.fn(),
    },
  };

  const mockJwtService = {
    sign: jest.fn(),
  };

  beforeEach(async () => {
    jest.clearAllMocks();
    
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: PrismaService,
          useValue: mockPrismaService,
        },
        {
          provide: JwtService,
          useValue: mockJwtService,
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    prisma = module.get<PrismaService>(PrismaService);
    jwtService = module.get<JwtService>(JwtService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('adminLogin', () => {
    it('should return an access token and admin data when login is successful', async () => {
      // Arrange
      const adminLoginDto = {
        email: 'admin@example.com',
        password: 'password123',
      };

      const mockAdmin = {
        adminId: 'admin-uuid',
        adminEmail: 'admin@example.com',
        adminPassword: 'hashed-password',
        adminFisrtName: 'John',
        adminLastName: 'Doe',
        adminAvatar: 'avatar.jpg',
        phoneNumber: '1234567890',
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      const mockToken = 'jwt-token';

      mockPrismaService.admin.findFirst.mockResolvedValue(mockAdmin);
      (bcrypt.compare as jest.Mock).mockResolvedValue(true);
      mockJwtService.sign.mockReturnValue(mockToken);

      // Act
      const result = await service.adminLogin(adminLoginDto);

      // Assert
      expect(result).toEqual({
        accessToken: mockToken,
        admin: {
          adminId: mockAdmin.adminId,
          adminEmail: mockAdmin.adminEmail,
          adminFisrtName: mockAdmin.adminFisrtName,
          adminLastName: mockAdmin.adminLastName,
          adminAvatar: mockAdmin.adminAvatar,
          phoneNumber: mockAdmin.phoneNumber,
          createdAt: mockAdmin.createdAt,
          updatedAt: mockAdmin.updatedAt,
        },
      });

      expect(mockPrismaService.admin.findFirst).toHaveBeenCalledWith({
        where: { adminEmail: adminLoginDto.email },
      });

      expect(bcrypt.compare).toHaveBeenCalledWith(
        adminLoginDto.password,
        mockAdmin.adminPassword,
      );

      expect(mockJwtService.sign).toHaveBeenCalledWith({
        sub: mockAdmin.adminId,
        email: mockAdmin.adminEmail,
      });
    });

    it('should throw UnauthorizedException when admin is not found', async () => {
      // Arrange
      const adminLoginDto = {
        email: 'nonexistent@example.com',
        password: 'password123',
      };

      mockPrismaService.admin.findFirst.mockResolvedValue(null);

      // Act & Assert
      await expect(service.adminLogin(adminLoginDto)).rejects.toThrow(
        UnauthorizedException,
      );
      expect(mockPrismaService.admin.findFirst).toHaveBeenCalledWith({
        where: { adminEmail: adminLoginDto.email },
      });
    });

    it('should throw UnauthorizedException when password is invalid', async () => {
      // Arrange
      const adminLoginDto = {
        email: 'admin@example.com',
        password: 'wrong-password',
      };

      const mockAdmin = {
        adminId: 'admin-uuid',
        adminEmail: 'admin@example.com',
        adminPassword: 'hashed-password',
      };

      mockPrismaService.admin.findFirst.mockResolvedValue(mockAdmin);
      (bcrypt.compare as jest.Mock).mockResolvedValue(false);

      // Act & Assert
      await expect(service.adminLogin(adminLoginDto)).rejects.toThrow(
        UnauthorizedException,
      );
      expect(mockPrismaService.admin.findFirst).toHaveBeenCalledWith({
        where: { adminEmail: adminLoginDto.email },
      });
      expect(bcrypt.compare).toHaveBeenCalledWith(
        adminLoginDto.password,
        mockAdmin.adminPassword,
      );
    });
  });

  describe('validateAdmin', () => {
    it('should return admin data when token is valid', async () => {
      // Arrange
      const payload = {
        sub: 'admin-uuid',
        email: 'admin@example.com',
      };

      const mockAdmin = {
        adminId: 'admin-uuid',
        adminEmail: 'admin@example.com',
        adminPassword: 'hashed-password',
        adminFisrtName: 'John',
        adminLastName: 'Doe',
        adminAvatar: 'avatar.jpg',
        phoneNumber: '1234567890',
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      mockPrismaService.admin.findUnique.mockResolvedValue(mockAdmin);

      // Act
      const result = await service.validateAdmin(payload);

      // Assert
      expect(result).toEqual({
        adminId: mockAdmin.adminId,
        adminEmail: mockAdmin.adminEmail,
        adminFisrtName: mockAdmin.adminFisrtName,
        adminLastName: mockAdmin.adminLastName,
        adminAvatar: mockAdmin.adminAvatar,
        phoneNumber: mockAdmin.phoneNumber,
        createdAt: mockAdmin.createdAt,
        updatedAt: mockAdmin.updatedAt,
      });

      expect(mockPrismaService.admin.findUnique).toHaveBeenCalledWith({
        where: { adminId: payload.sub },
      });
    });

    it('should throw UnauthorizedException when admin is not found', async () => {
      // Arrange
      const payload = {
        sub: 'nonexistent-uuid',
        email: 'nonexistent@example.com',
      };

      mockPrismaService.admin.findUnique.mockResolvedValue(null);

      // Act & Assert
      await expect(service.validateAdmin(payload)).rejects.toThrow(
        UnauthorizedException,
      );
      expect(mockPrismaService.admin.findUnique).toHaveBeenCalledWith({
        where: { adminId: payload.sub },
      });
    });
  });

  describe('createAdmin', () => {
    it('should create and return a new admin account', async () => {
      // Arrange
      const createAdminDto = {
        email: 'newadmin@example.com',
        password: 'password123',
        firstName: 'Jane',
        lastName: 'Smith',
        phoneNumber: '0987654321',
        avatar: 'new-avatar.jpg',
      };

      const mockUuid = 'new-admin-uuid';
      const mockHashedPassword = 'new-hashed-password';
      const mockDate = new Date();

      mockPrismaService.admin.findFirst.mockResolvedValue(null);
      (uuidv4 as jest.Mock).mockReturnValue(mockUuid);
      (bcrypt.hash as jest.Mock).mockResolvedValue(mockHashedPassword);

      const mockCreatedAdmin = {
        adminId: mockUuid,
        adminEmail: createAdminDto.email,
        adminPassword: mockHashedPassword,
        adminFisrtName: createAdminDto.firstName,
        adminLastName: createAdminDto.lastName,
        adminAvatar: createAdminDto.avatar,
        phoneNumber: createAdminDto.phoneNumber,
        createdAt: mockDate,
        updatedAt: mockDate,
      };

      mockPrismaService.admin.create.mockResolvedValue(mockCreatedAdmin);

      // Act
      const result = await service.createAdmin(createAdminDto);

      // Assert
      expect(result).toEqual({
        adminId: mockUuid,
        adminEmail: createAdminDto.email,
        adminFisrtName: createAdminDto.firstName,
        adminLastName: createAdminDto.lastName,
        adminAvatar: createAdminDto.avatar,
        phoneNumber: createAdminDto.phoneNumber,
        createdAt: mockDate,
        updatedAt: mockDate,
      });

      expect(mockPrismaService.admin.findFirst).toHaveBeenCalledWith({
        where: { adminEmail: createAdminDto.email },
      });

      expect(bcrypt.hash).toHaveBeenCalledWith(createAdminDto.password, 10);

      expect(mockPrismaService.admin.create).toHaveBeenCalledWith({
        data: {
          adminId: mockUuid,
          adminEmail: createAdminDto.email,
          adminPassword: mockHashedPassword,
          adminFisrtName: createAdminDto.firstName,
          adminLastName: createAdminDto.lastName,
          adminAvatar: createAdminDto.avatar,
          phoneNumber: createAdminDto.phoneNumber,
          createdAt: expect.any(Date),
          updatedAt: expect.any(Date),
        },
      });
    });

    it('should use default avatar when avatar is not provided', async () => {
      // Arrange
      const createAdminDto = {
        email: 'newadmin@example.com',
        password: 'password123',
        firstName: 'Jane',
        lastName: 'Smith',
        phoneNumber: '0987654321',
      };

      const mockUuid = 'new-admin-uuid';
      const mockHashedPassword = 'new-hashed-password';

      mockPrismaService.admin.findFirst.mockResolvedValue(null);
      (uuidv4 as jest.Mock).mockReturnValue(mockUuid);
      (bcrypt.hash as jest.Mock).mockResolvedValue(mockHashedPassword);

      const mockCreatedAdmin = {
        adminId: mockUuid,
        adminEmail: createAdminDto.email,
        adminPassword: mockHashedPassword,
        adminFisrtName: createAdminDto.firstName,
        adminLastName: createAdminDto.lastName,
        adminAvatar: 'https://example.com/default-avatar.jpg',
        phoneNumber: createAdminDto.phoneNumber,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      mockPrismaService.admin.create.mockResolvedValue(mockCreatedAdmin);

      // Act
      await service.createAdmin(createAdminDto);

      // Assert
      expect(mockPrismaService.admin.create).toHaveBeenCalledWith({
        data: expect.objectContaining({
          adminAvatar: 'https://example.com/default-avatar.jpg',
        }),
      });
    });

    it('should throw ConflictException when admin with email already exists', async () => {
      // Arrange
      const createAdminDto = {
        email: 'existing@example.com',
        password: 'password123',
        firstName: 'Jane',
        lastName: 'Smith',
        phoneNumber: '0987654321',
      };

      const existingAdmin = {
        adminId: 'existing-uuid',
        adminEmail: 'existing@example.com',
      };

      mockPrismaService.admin.findFirst.mockResolvedValue(existingAdmin);

      // Act & Assert
      await expect(service.createAdmin(createAdminDto)).rejects.toThrow(
        ConflictException,
      );
      expect(mockPrismaService.admin.findFirst).toHaveBeenCalledWith({
        where: { adminEmail: createAdminDto.email },
      });
    });
  });
});
