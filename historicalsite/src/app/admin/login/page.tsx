import { LoginForm } from "./components/LoginForm";

export default function LoginPage() {
  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Historical Site
          </h1>
          <p className="text-gray-600">Hệ thống quản trị di tích lịch sử</p>
        </div>

        {/* Login Form */}
        <LoginForm />

        {/* Footer */}
        <div className="text-center mt-8 text-sm text-gray-500">
          <p>&copy; 2025 Historical Site. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
}
