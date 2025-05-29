# Kiểm Thử Hộp Đen Controller Xác Thực

## Tổng Quan
Tài liệu này trình bày phương pháp kiểm thử hộp đen cho AuthController trong API Trang Web Lịch Sử. Mỗi trường hợp kiểm thử được thiết kế để xác thực chức năng của các endpoint API mà không cần biết chi tiết về cách thực hiện bên trong.

## Thiết Lập Môi Trường Kiểm Thử
- URL Cơ sở: `http://localhost:3000/api`
- Xác thực: JWT token được yêu cầu cho các endpoint được bảo vệ
- Content-Type: `application/json`

## Các Trường Hợp Kiểm Thử

| ID | Mô Tả Trường Hợp Kiểm Thử | Quy Trình Kiểm Thử | Kết Quả Mong Đợi | Phụ Thuộc Giữa Các Trường Hợp | Kết Quả | Ngày Kiểm Thử | Ghi Chú |
|----|----------------------|---------------------|-----------------|---------------------------|--------|-----------|------|
| AUC-01 | Controller phải được định nghĩa | 1. Import AuthController<br>2. Kiểm tra xem controller có được định nghĩa không | Controller phải được định nghĩa và khởi tạo đúng | Không | | | Xác thực cơ bản sự tồn tại của controller |
| AUC-02 | Phải đăng ký được người dùng mới | 1. Gửi yêu cầu POST đến `/auth/register` với dữ liệu admin hợp lệ<br>2. Bao gồm email, password, firstName, lastName, phoneNumber, avatar (tùy chọn) | Phản hồi với trạng thái 201<br>Đối tượng Admin với ID được tạo và các thông tin đã cung cấp<br>Mật khẩu không được bao gồm trong phản hồi | Không | | | Nếu avatar không được cung cấp, một URL avatar mặc định sẽ được sử dụng |
| AUC-03 | Phải đăng nhập được người dùng | 1. Gửi yêu cầu POST đến `/auth/login` với thông tin đăng nhập hợp lệ<br>2. Bao gồm email và password | Phản hồi với trạng thái 200<br>Đối tượng chứa accessToken và chi tiết admin<br>Mật khẩu không được bao gồm trong phản hồi | AUC-02 | | | |
| AUC-04 | Phải đăng xuất được người dùng | 1. Gửi yêu cầu POST đến `/auth/logout` | Phản hồi với trạng thái 200<br>Thông báo cho biết đăng xuất thành công | AUC-03 | | | Endpoint này có thể xóa cookies hoặc tokens ở phía client |
| AUC-05 | Phải lấy được hồ sơ người dùng hiện tại | 1. Gửi yêu cầu GET đến `/auth/profile` với JWT token hợp lệ trong tiêu đề Authorization | Phản hồi với trạng thái 200<br>Chi tiết Admin của người dùng đã xác thực<br>Mật khẩu không được bao gồm trong phản hồi | AUC-03 | | | |
| AUC-06 | Phải trả về 401 cho truy cập hồ sơ không được phép | 1. Gửi yêu cầu GET đến `/auth/profile` không có JWT token hoặc với token không hợp lệ | Phản hồi với trạng thái 401<br>Thông báo lỗi cho biết truy cập không được phép | Không | | | |
| AUC-07 | Phải trả về 409 khi đăng ký với email đã tồn tại | 1. Gửi yêu cầu POST đến `/auth/register` với email đã tồn tại trong hệ thống | Phản hồi với trạng thái 409<br>Thông báo lỗi cho biết email đã tồn tại | AUC-02 | | | |
