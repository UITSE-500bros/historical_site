# Kiểm Thử Hộp Đen Controller Thanh Toán

## Tổng Quan
Tài liệu này trình bày phương pháp kiểm thử hộp đen cho PaymentsController trong API Trang Web Lịch Sử. Mỗi trường hợp kiểm thử được thiết kế để xác thực chức năng của các endpoint API mà không cần biết chi tiết về cách thực hiện bên trong.

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
| PC-01 | Controller phải được định nghĩa | 1. Import PaymentsController<br>2. Kiểm tra xem controller có được định nghĩa không | Controller phải được định nghĩa và khởi tạo đúng | Không | | | Xác thực cơ bản sự tồn tại của controller |
| PC-02 | Phải tạo được thanh toán | 1. Gửi yêu cầu POST đến `/payments` với dữ liệu thanh toán hợp lệ<br>2. Bao gồm userEmail, quantity, totalPrice, paymentType, status, bookingDate, museumId | Phản hồi với trạng thái 201<br>Đối tượng chứa URL thanh toán Stripe | Không | | | Yêu cầu tích hợp Stripe hợp lệ |
| PC-03 | Phải tìm tất cả các thanh toán | 1. Gửi yêu cầu GET đến `/payments` | Phản hồi với trạng thái 200<br>Mảng các đối tượng thanh toán | PC-02 | | | Endpoint được bảo vệ yêu cầu xác thực |
| PC-04 | Phải tìm một thanh toán theo ID | 1. Gửi yêu cầu GET đến `/payments/:id` với ID thanh toán hợp lệ | Phản hồi với trạng thái 200<br>Đối tượng thanh toán với ID được chỉ định | PC-02 | | | Endpoint được bảo vệ yêu cầu xác thực |
| PC-05 | Phải cập nhật được thanh toán | 1. Gửi yêu cầu PATCH đến `/payments/:id` với ID thanh toán hợp lệ<br>2. Bao gồm trạng thái (PENDING, IN_PROGRESS, COMPLETED, CANCELLED) | Phản hồi với trạng thái 200<br>Đối tượng thanh toán đã cập nhật | PC-02 | | | Endpoint được bảo vệ yêu cầu xác thực |
| PC-06 | Phải xóa được thanh toán | 1. Gửi yêu cầu DELETE đến `/payments/:id` với ID thanh toán hợp lệ | Phản hồi với trạng thái 200<br>Thông báo xác nhận đã xóa thành công | PC-02 | | | Endpoint được bảo vệ yêu cầu xác thực |
| PC-07 | Phải xử lý được các sự kiện webhook của Stripe | 1. Gửi yêu cầu POST đến `/payments/webhook` với dữ liệu sự kiện Stripe<br>2. Bao gồm loại sự kiện 'checkout.session.completed' | Phản hồi với trạng thái 200<br>Trạng thái thanh toán được cập nhật thành COMPLETED | PC-02 | | | Endpoint webhook cho tích hợp Stripe |
| PC-08 | Phải ném NotFoundException khi không tìm thấy thanh toán | 1. Gửi yêu cầu GET đến `/payments/:id` với ID thanh toán không tồn tại | Phản hồi với trạng thái 404<br>Thông báo lỗi cho biết không tìm thấy thanh toán | Không | | | |
| PC-09 | Phải ném NotFoundException khi cập nhật thanh toán không tồn tại | 1. Gửi yêu cầu PATCH đến `/payments/:id` với ID thanh toán không tồn tại | Phản hồi với trạng thái 404<br>Thông báo lỗi cho biết không tìm thấy thanh toán | Không | | | |
| PC-10 | Phải ném NotFoundException khi xóa thanh toán không tồn tại | 1. Gửi yêu cầu DELETE đến `/payments/:id` với ID thanh toán không tồn tại | Phản hồi với trạng thái 404<br>Thông báo lỗi cho biết không tìm thấy thanh toán | Không | | | |
| PC-11 | Phải gửi được email xác nhận qua Mailjet | 1. Tạo thanh toán với dữ liệu hợp lệ<br>2. Kiểm tra xem email xác nhận có được gửi đến email của người dùng không | Email được gửi qua Mailjet đến email của người dùng<br>Email chứa chi tiết đặt chỗ | PC-02 | | | Sử dụng gói miễn phí của Mailjet (6.000 email/tháng, 200/ngày) |
