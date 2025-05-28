import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function AdminDashboard() {
  return (
    <div className="h-full w-full bg-gray-50 p-8 overflow-auto">
      <div className="w-full max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Dashboard Quản Trị
          </h1>
          <p className="text-gray-600 mt-2">
            Chào mừng bạn đến với hệ thống quản trị Historical Site
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Bài Viết</CardTitle>
              <CardDescription>Quản lý các bài viết lịch sử</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold text-blue-600">124</p>
              <p className="text-sm text-gray-500">Tổng số bài viết</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Giai Đoạn</CardTitle>
              <CardDescription>Các giai đoạn lịch sử</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold text-green-600">12</p>
              <p className="text-sm text-gray-500">Giai đoạn được quản lý</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Người Dùng</CardTitle>
              <CardDescription>Thống kê người dùng</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold text-purple-600">1,234</p>
              <p className="text-sm text-gray-500">Tổng số người dùng</p>
            </CardContent>
          </Card>
        </div>

        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Đăng Nhập Thành Công!</CardTitle>
            <CardDescription>
              Bạn đã đăng nhập thành công vào hệ thống quản trị Historical Site
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">
              Đây là trang dashboard demo. Trong thực tế, đây sẽ chứa các chức
              năng quản trị như:
            </p>
            <ul className="list-disc list-inside mt-4 space-y-2 text-gray-600">
              <li>Quản lý bài viết và nội dung</li>
              <li>Quản lý người dùng và phân quyền</li>
              <li>Thống kê và báo cáo</li>
              <li>Cài đặt hệ thống</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
