# Nhật Ký Lỗi - Historical Site API

## Tổng Quan
Tài liệu này theo dõi các lỗi và khiếm khuyết được xác định trong quá trình kiểm thử hộp đen của Historical Site API. Những vấn đề này được phát hiện thông qua kiểm thử hộp đen mặc dù các bài kiểm tra đơn vị đã vượt qua thành công.

## Danh Sách Lỗi

| Mã Lỗi | Module | Mô Tả | Loại | Mức Độ Nghiêm Trọng | Ưu Tiên | Trạng Thái | Ngày Tạo | Ngày Giải Quyết | Ghi Chú |
|-----------|--------|-------|------|-----------------|---------|------------|---------|----------------|---------|
| BUG-001 | Articles | Xóa nội dung không loại bỏ hình ảnh liên quan trong Supabase storage | Chức năng | Trung bình | Cao | Mở | 2025-05-29 | | Hình ảnh vẫn còn trong kho lưu trữ sau khi xóa nội dung, gây ra các tập tin mồ côi |
| BUG-002 | Articles | Endpoint findAll trả về dữ liệu quá lớn cho các bộ sưu tập bài viết lớn | Hiệu suất | Trung bình | Trung bình | Mở | 2025-05-29 | | Thời gian phản hồi vượt quá 3 giây khi truy xuất hơn 100 bài viết |
| BUG-003 | Auth | JWT token không hết hạn sau khi thay đổi mật khẩu | Bảo mật | Cao | Cao | Mở | 2025-05-29 | | Các token cũ vẫn còn hiệu lực sau khi cập nhật mật khẩu |
| BUG-004 | Payments | Email xác nhận không được gửi khi biến môi trường MAILJET_API_KEY chứa khoảng trắng | Cấu hình | Thấp | Thấp | Mở | 2025-05-29 | | Tích hợp Mailjet thất bại âm thầm với các khóa API không đúng định dạng |
| BUG-005 | Periods | Xóa giai đoạn không kiểm tra các bài viết sự kiện liên quan | Toàn vẹn dữ liệu | Cao | Cao | Mở | 2025-05-29 | | Các bài viết sự kiện mồ côi vẫn còn sau khi xóa giai đoạn |
| BUG-006 | Topics | Tạo chủ đề cho phép tên chủ đề trùng lập | Xác thực | Trung bình | Trung bình | Mở | 2025-05-29 | | Không có ràng buộc duy nhất trên trường topicName |
| BUG-007 | Feedbacks | Cập nhật trạng thái phản hồi không xác thực giá trị enum | Xác thực | Thấp | Thấp | Mở | 2025-05-29 | | Các giá trị trạng thái không hợp lệ có thể được đặt thông qua API |
| BUG-008 | Museums | Tải lên hình ảnh bảo tàng không xác thực kích thước tập tin | Xác thực | Trung bình | Trung bình | Mở | 2025-05-29 | | Hình ảnh lớn (>10MB) được chấp nhận mà không có giới hạn |
| BUG-009 | Articles | Năm sinh của bài viết về nhân vật có thể lớn hơn năm mất | Xác thực | Trung bình | Trung bình | Mở | 2025-05-29 | | Không có xác thực logic giữa năm sinh và năm mất |
| BUG-010 | Payments | Xử lý webhook Stripe không xác minh chữ ký | Bảo mật | Nghiêm trọng | Cao | Mở | 2025-05-29 | | Các endpoint webhook dễ bị giả mạo |
| BUG-011 | Articles | Tạo nội dung bài viết với articleId không hợp lệ trả về lỗi 500 thay vì 400 | Xử lý lỗi | Trung bình | Trung bình | Mở | 2025-05-29 | | Lỗi máy chủ thay vì lỗi xác thực |
| BUG-012 | Auth | Endpoint đăng nhập không thực hiện giới hạn tốc độ | Bảo mật | Cao | Trung bình | Mở | 2025-05-29 | | Dễ bị tấn công dò mật khẩu |
| BUG-013 | Museums | Xóa bảo tàng không loại bỏ hình ảnh khỏi Supabase storage | Rò rỉ tài nguyên | Thấp | Thấp | Mở | 2025-05-29 | | Hình ảnh mồ côi vẫn còn trong kho lưu trữ |
| BUG-014 | Articles | Cập nhật bài viết sự kiện cho phép periodId và topicId không tồn tại | Xác thực | Trung bình | Trung bình | Mở | 2025-05-29 | | Tính toàn vẹn khóa ngoại không được thực thi ở cấp độ API |
| BUG-015 | Payments | Tạo thanh toán không xác thực sự tồn tại của museumId | Xác thực | Trung bình | Trung bình | Mở | 2025-05-29 | | Thanh toán có thể được tạo cho các bảo tàng không tồn tại |

## Mức Độ Nghiêm Trọng
- **Nghiêm trọng**: Hệ thống sụp đổ, mất dữ liệu, lỗ hổng bảo mật
- **Cao**: Chức năng chính bị hỏng, không có giải pháp tạm thời
- **Trung bình**: Chức năng bị ảnh hưởng, có giải pháp tạm thời
- **Thấp**: Vấn đề nhỏ, ít ảnh hưởng đến chức năng

## Mức Độ Ưu Tiên
- **Cao**: Phải sửa ngay lập tức
- **Trung bình**: Nên sửa trong phiên bản tiếp theo
- **Thấp**: Có thể lên lịch sửa trong phiên bản tương lai

## Trạng Thái
- **Mở**: Lỗi đã được xác định, chưa được xử lý
- **Đang xử lý**: Đang triển khai sửa lỗi
- **Đã sửa**: Đã triển khai sửa lỗi, đang chờ xác minh
- **Đã xác minh**: Đã xác nhận sửa lỗi trong kiểm thử
- **Đã đóng**: Lỗi đã được giải quyết và xác minh
- **Sẽ không sửa**: Quyết định không giải quyết vấn đề
- **Trùng lập**: Vấn đề đã được báo cáo ở nơi khác

## Ghi Chú
- Tất cả các lỗi được xác định trong quá trình kiểm thử hộp đen mặc dù các bài kiểm thử đơn vị đã vượt qua
- Một số lỗi có thể chỉ xuất hiện trong các cấu hình môi trường cụ thể
- Các lỗi được phân loại theo module để dễ dàng theo dõi

## Biến Môi Trường
Các biến môi trường sau đây được yêu cầu cho việc kiểm thử:

- `JWT_SECRET`: Dùng cho xác thực
- `STRIPE_SECRET_KEY`: Dùng cho tích hợp thanh toán
- `FRONTEND_URL`: Dùng cho các URL chuyển hướng
- `MAILJET_API_KEY`: Dùng cho dịch vụ email
- `MAILJET_SECRET_KEY`: Dùng cho dịch vụ email
