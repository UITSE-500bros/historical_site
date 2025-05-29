# Kiểm Thử Hộp Đen Service Xác Thực

## Tổng Quan
Tài liệu này trình bày phương pháp kiểm thử hộp đen cho AuthService trong API Trang Web Lịch Sử. Mỗi trường hợp kiểm thử được thiết kế để xác thực chức năng của dịch vụ xác thực mà không cần biết chi tiết về cách thực hiện bên trong.

## Thiết Lập Môi Trường Kiểm Thử
- URL Cơ sở: `http://localhost:3000/api`
- Xác thực: JWT token được yêu cầu cho các endpoint được bảo vệ
- Content-Type: `application/json`

## Các Trường Hợp Kiểm Thử

| ID | Mô Tả Trường Hợp Kiểm Thử | Quy Trình Kiểm Thử | Kết Quả Mong Đợi | Phụ Thuộc Giữa Các Trường Hợp | Kết Quả | Ngày Kiểm Thử | Ghi Chú |
|----|----------------------|---------------------|-----------------|---------------------------|--------|-----------|------|
| AUS-01 | Service phải được định nghĩa | 1. Import AuthService<br>2. Kiểm tra xem service có được định nghĩa không | Service phải được định nghĩa và khởi tạo đúng | Không | | | Xác thực cơ bản sự tồn tại của service |
| AUS-02 | Phải đăng ký được người dùng mới | 1. Gửi yêu cầu POST đến `/auth/register` với dữ liệu admin hợp lệ<br>2. Bao gồm email, password, firstName, lastName, phoneNumber, avatar (tùy chọn) | Phản hồi với trạng thái 201<br>Đối tượng Admin với ID được tạo và các thông tin đã cung cấp<br>Mật khẩu không được bao gồm trong phản hồi | Không | | | Nếu avatar không được cung cấp, một URL avatar mặc định sẽ được sử dụng |
| AUS-03 | Phải đăng nhập được người dùng | 1. Gửi yêu cầu POST đến `/auth/login` với thông tin đăng nhập hợp lệ<br>2. Bao gồm email và password | Phản hồi với trạng thái 200<br>Đối tượng chứa accessToken và chi tiết admin<br>Mật khẩu không được bao gồm trong phản hồi | AUS-02 | | | |
| AUS-04 | Phải xác minh được JWT token | 1. Gửi yêu cầu GET đến `/auth/profile` với JWT token hợp lệ trong tiêu đề Authorization | Phản hồi với trạng thái 200<br>Chi tiết Admin của người dùng đã xác thực<br>Mật khẩu không được bao gồm trong phản hồi | AUS-03 | | | |
| AUS-05 | Phải ném UnauthorizedException cho thông tin đăng nhập không hợp lệ | 1. Gửi yêu cầu POST đến `/auth/login` với thông tin đăng nhập không hợp lệ<br>2. Bao gồm email không tồn tại hoặc mật khẩu không chính xác | Phản hồi với trạng thái 401<br>Thông báo lỗi cho biết thông tin đăng nhập không hợp lệ | Không | | | |
| AUS-06 | Phải ném UnauthorizedException cho token không hợp lệ | 1. Gửi yêu cầu GET đến `/auth/profile` với JWT token không hợp lệ trong tiêu đề Authorization | Phản hồi với trạng thái 401<br>Thông báo lỗi cho biết token không hợp lệ | Không | | | |
| AUS-07 | Phải ném ConflictException khi đăng ký với email đã tồn tại | 1. Gửi yêu cầu POST đến `/auth/register` với email đã tồn tại trong hệ thống | Phản hồi với trạng thái 409<br>Thông báo lỗi cho biết email đã tồn tại | AUS-02 | | | |
