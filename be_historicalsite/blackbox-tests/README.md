# API Trang Web Lịch Sử - Tài Liệu Kiểm Thử Hộp Đen

## Tổng Quan
Thư mục này chứa tài liệu kiểm thử hộp đen cho API Trang Web Lịch Sử. Mỗi module có bộ các trường hợp kiểm thử riêng cho cả thành phần service và controller, được thiết kế để xác thực chức năng của các endpoint API mà không cần biết chi tiết về cách thực hiện bên trong.

## Thiết Lập Môi Trường Kiểm Thử
- URL Cơ sở: `http://localhost:3000/api`
- Xác thực: JWT token được yêu cầu cho các endpoint được bảo vệ
- Content-Type: `application/json` cho hầu hết các yêu cầu, `multipart/form-data` cho tải lên tập tin
- Biến Môi Trường Yêu Cầu:
  - JWT_SECRET: Dùng cho xác thực
  - STRIPE_SECRET_KEY: Dùng cho tích hợp thanh toán
  - FRONTEND_URL: Dùng cho các URL chuyển hướng
  - MAILJET_API_KEY: Dùng cho dịch vụ email
  - MAILJET_SECRET_KEY: Dùng cho dịch vụ email

## Cấu Trúc Trường Hợp Kiểm Thử
Mỗi trường hợp kiểm thử tuân theo cấu trúc này:

| ID | Mô Tả Trường Hợp Kiểm Thử | Quy Trình Kiểm Thử | Kết Quả Mong Đợi | Phụ Thuộc Giữa Các Trường Hợp | Kết Quả | Ngày Kiểm Thử | Ghi Chú |
|----|----------------------|---------------------|-----------------|---------------------------|--------|-----------|------|
| XX-00 | Mô tả ngắn gọn | Quy trình từng bước | Phản hồi mong đợi | Các phụ thuộc | Đạt/Không đạt | Ngày | Ghi chú bổ sung |

## Các Module

### Module Bài Viết (Articles)
- [Kiểm Thử Service Bài Viết](./articles/articles-service-tests.md)
- [Kiểm Thử Controller Bài Viết](./articles/articles-controller-tests.md)

### Module Xác Thực (Auth)
- [Kiểm Thử Service Xác Thực](./auth/auth-service-tests.md)
- [Kiểm Thử Controller Xác Thực](./auth/auth-controller-tests.md)

### Module Giai Đoạn (Periods)
- [Kiểm Thử Service Giai Đoạn](./periods/periods-service-tests.md)
- [Kiểm Thử Controller Giai Đoạn](./periods/periods-controller-tests.md)

### Module Chủ Đề (Topics)
- [Kiểm Thử Service Chủ Đề](./topics/topics-service-tests.md)
- [Kiểm Thử Controller Chủ Đề](./topics/topics-controller-tests.md)

### Module Phản Hồi (Feedbacks)
- [Kiểm Thử Service Phản Hồi](./feedbacks/feedbacks-service-tests.md)
- [Kiểm Thử Controller Phản Hồi](./feedbacks/feedbacks-controller-tests.md)

### Module Thanh Toán (Payments)
- [Kiểm Thử Service Thanh Toán](./payments/payments-service-tests.md)
- [Kiểm Thử Controller Thanh Toán](./payments/payments-controller-tests.md)

### Module Bảo Tàng (Museums)
- [Kiểm Thử Service Bảo Tàng](./museums/museums-service-tests.md)
- [Kiểm Thử Controller Bảo Tàng](./museums/museums-controller-tests.md)

## Ghi Chú Quan Trọng

### Quản Lý Bài Viết
- API tuân theo quy trình cụ thể cho việc tạo và quản lý bài viết
- Bài viết có thể là loại SỰ KIỆN (EVENT) hoặc NHÂN VẬT (PERSON), mỗi loại có các trường cụ thể
- Tạo nội dung yêu cầu một articleId hợp lệ
- Tải lên hình ảnh yêu cầu một contentId hợp lệ và phải được gửi dưới dạng multipart/form-data

### Xác Thực
- Tất cả các thao tác quản trị đều yêu cầu một JWT token hợp lệ
- Token phải được bao gồm trong tiêu đề Authorization dưới dạng "Bearer {token}"
- Các yêu cầu không được phép sẽ nhận được phản hồi 401

### Xử Lý Thanh Toán
- Thanh toán được xử lý thông qua tích hợp Stripe
- Email xác nhận được gửi qua Mailjet (gói miễn phí: 6.000 email/tháng, 200/ngày)
- Trạng thái thanh toán có thể là ĐANG CHỜ (PENDING), ĐANG XỬ LÝ (IN_PROGRESS), HOÀN THÀNH (COMPLETED), hoặc ĐÃ HỦY (CANCELLED)

### Tối Ưu Hóa API
- Phương thức ArticlesService.findAll đã được tối ưu hóa để:
  - Cung cấp cấu trúc phản hồi rõ ràng hơn với xử lý kiểu dữ liệu phù hợp
  - Bao gồm periodName và topicName cho các bài viết SỰ KIỆN
  - Bao gồm các trường nhân vật liên quan cho các bài viết NHÂN VẬT
  - Chỉ trả về dữ liệu bài viết cần thiết để giảm kích thước phản hồi
  - Loại bỏ dữ liệu nội dung khỏi phản hồi để giảm kích thước của nó
