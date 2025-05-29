# Kiểm Thử Hộp Đen Service Thanh Toán

## Tổng Quan
Tài liệu này trình bày phương pháp kiểm thử hộp đen cho PaymentsService trong API Trang Web Lịch Sử. Mỗi trường hợp kiểm thử được thiết kế để xác thực chức năng của service mà không cần biết chi tiết về cách thực hiện bên trong.

## Thiết Lập Môi Trường Kiểm Thử
- URL Cơ sở: `http://localhost:3000/api`
- Xác thực: JWT token được yêu cầu cho các endpoint được bảo vệ
- Content-Type: `application/json`
- Các Biến Môi Trường Yêu Cầu:
  - STRIPE_SECRET_KEY: Dùng cho tích hợp thanh toán Stripe
  - FRONTEND_URL: Dùng cho các URL chuyển hướng
  - MAILJET_API_KEY: Dùng cho dịch vụ email
  - MAILJET_SECRET_KEY: Dùng cho dịch vụ email

## Các Trường Hợp Kiểm Thử

| ID | Mô Tả Trường Hợp Kiểm Thử | Quy Trình Kiểm Thử | Kết Quả Mong Đợi | Phụ Thuộc Giữa Các Trường Hợp | Kết Quả | Ngày Kiểm Thử | Ghi Chú |
|----|----------------------|---------------------|-----------------|---------------------------|--------|-----------|------|
| PS-01 | Service phải được định nghĩa | 1. Import PaymentsService<br>2. Kiểm tra xem service có được định nghĩa không | Service phải được định nghĩa và khởi tạo đúng | Không | | | Xác thực cơ bản sự tồn tại của service |
| PS-02 | Phải tạo được thanh toán | 1. Gửi yêu cầu POST đến `/payments` với dữ liệu thanh toán hợp lệ<br>2. Bao gồm userEmail, quantity, totalPrice, paymentType, status, bookingDate, museumId | Phản hồi với trạng thái 201<br>Đối tượng chứa URL thanh toán Stripe | Không | | | Yêu cầu tích hợp Stripe hợp lệ |
| PS-03 | Phải tìm tất cả các thanh toán | 1. Gửi yêu cầu GET đến `/payments` | Phản hồi với trạng thái 200<br>Mảng các đối tượng thanh toán | PS-02 | | | |
| PS-04 | Phải tìm một thanh toán | 1. Gửi yêu cầu GET đến `/payments/:id` với ID thanh toán hợp lệ | Phản hồi với trạng thái 200<br>Đối tượng thanh toán với ID được chỉ định | PS-02 | | | |
| PS-05 | Phải cập nhật được thanh toán | 1. Gửi yêu cầu PATCH đến `/payments/:id` với ID thanh toán hợp lệ<br>2. Bao gồm dữ liệu thanh toán đã cập nhật | Phản hồi với trạng thái 200<br>Đối tượng thanh toán đã cập nhật | PS-02 | | | |
| PS-06 | Phải xóa được thanh toán | 1. Gửi yêu cầu DELETE đến `/payments/:id` với ID thanh toán hợp lệ | Phản hồi với trạng thái 200<br>Đối tượng thanh toán đã xóa | PS-02 | | | |
| PS-07 | Phải gửi được email xác nhận | 1. Tạo thanh toán với dữ liệu hợp lệ<br>2. Kiểm tra xem email xác nhận có được gửi đến email của người dùng không | Email được gửi qua Mailjet đến email của người dùng<br>Email chứa chi tiết đặt chỗ | PS-02 | | | Sử dụng Mailjet thay vì AWS SES |
| PS-08 | Phải xử lý được các sự kiện webhook của Stripe | 1. Gửi yêu cầu POST đến `/payments/webhook` với dữ liệu sự kiện Stripe<br>2. Bao gồm loại sự kiện 'checkout.session.completed' | Phản hồi với trạng thái 200<br>Trạng thái thanh toán được cập nhật thành COMPLETED | PS-02 | | | |
| PS-09 | Phải ném NotFoundException khi không tìm thấy thanh toán | 1. Gửi yêu cầu GET đến `/payments/:id` với ID thanh toán không tồn tại | Phản hồi với trạng thái 404<br>Thông báo lỗi cho biết không tìm thấy thanh toán | Không | | | |
| PS-10 | Phải ném BadRequestException cho dữ liệu thanh toán không hợp lệ | 1. Gửi yêu cầu POST đến `/payments` với dữ liệu thanh toán không hợp lệ<br>2. Bỏ qua các trường bắt buộc hoặc cung cấp giá trị không hợp lệ | Phản hồi với trạng thái 400<br>Thông báo lỗi cho biết các lỗi xác thực | Không | | | |
