import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

describe('AuthController', () => {
  let controller: AuthController;
  let authService: AuthService;

  const mockAuthService = {
    adminLogin: jest.fn(),
    createAdmin: jest.fn(),
  };

  beforeEach(async () => {
    jest.clearAllMocks();
    
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: mockAuthService,
        },
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    authService = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('adminLogin', () => {
    it('should call authService.adminLogin with the provided credentials', async () => {
      // Arrange
      const adminLoginDto = {
        email: 'admin@example.com',
        password: 'password123',
      };

      const expectedResponse = {
        accessToken: 'jwt-token',
        admin: {
          adminId: 'admin-uuid',
          adminEmail: 'admin@example.com',
          // other admin properties
        },
      };

      mockAuthService.adminLogin.mockResolvedValue(expectedResponse);

      // Act
      const result = await controller.adminLogin(adminLoginDto);

      // Assert
      expect(result).toEqual(expectedResponse);
      expect(mockAuthService.adminLogin).toHaveBeenCalledWith(adminLoginDto);
    });
  });

  describe('adminLogout', () => {
    it('should return a success message', () => {
      // Act
      const result = controller.adminLogout();

      // Assert
      expect(result).toEqual({ message: 'Logout successful' });
    });
  });

  describe('createAdmin', () => {
    it('should call authService.createAdmin with the provided data', async () => {
      // Arrange
      const createAdminDto = {
        email: 'newadmin@example.com',
        password: 'password123',
        firstName: 'Jane',
        lastName: 'Smith',
        phoneNumber: '0987654321',
        avatar: 'avatar.jpg',
      };

      const expectedResponse = {
        adminId: 'new-admin-uuid',
        adminEmail: 'newadmin@example.com',
        adminFisrtName: 'Jane',
        adminLastName: 'Smith',
        adminAvatar: 'avatar.jpg',
        phoneNumber: '0987654321',
        createdAt: expect.any(Date),
        updatedAt: expect.any(Date),
      };

      mockAuthService.createAdmin.mockResolvedValue(expectedResponse);

      // Act
      const result = await controller.createAdmin(createAdminDto);

      // Assert
      expect(result).toEqual(expectedResponse);
      expect(mockAuthService.createAdmin).toHaveBeenCalledWith(createAdminDto);
    });
  });
});
