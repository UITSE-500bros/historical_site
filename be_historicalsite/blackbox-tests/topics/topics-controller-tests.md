# Kiểm Thử Hộp Đen Controller Chủ Đề

## Tổng Quan
Tài liệu này trình bày phương pháp kiểm thử hộp đen cho TopicsController trong API Trang Web Lịch Sử. Mỗi trường hợp kiểm thử được thiết kế để xác thực chức năng của các endpoint API mà không cần biết chi tiết về cách thực hiện bên trong.

## Thiết Lập Môi Trường Kiểm Thử
- URL Cơ sở: `http://localhost:3000/api`
- Xác thực: JWT token được yêu cầu cho các endpoint được bảo vệ
- Content-Type: `application/json`

## Các Trường Hợp Kiểm Thử

| ID | Mô Tả Trường Hợp Kiểm Thử | Quy Trình Kiểm Thử | Kết Quả Mong Đợi | Phụ Thuộc Giữa Các Trường Hợp | Kết Quả | Ngày Kiểm Thử | Ghi Chú |
|----|----------------------|---------------------|-----------------|---------------------------|--------|-----------|------|
| TC-01 | Controller phải được định nghĩa | 1. Import TopicsController<br>2. Kiểm tra xem controller có được định nghĩa không | Controller phải được định nghĩa và khởi tạo đúng | Không | | | Xác thực cơ bản sự tồn tại của controller |
| TC-02 | Phải tạo được chủ đề | 1. Gửi yêu cầu POST đến `/topics` với dữ liệu chủ đề hợp lệ<br>2. Bao gồm topicName, topicImage<br>3. Bao gồm JWT token hợp lệ trong tiêu đề Authorization | Phản hồi với trạng thái 201<br>Đối tượng chủ đề với ID được tạo và các thông tin đã cung cấp | Không | | | Endpoint được bảo vệ yêu cầu xác thực |
| TC-03 | Phải tìm tất cả các chủ đề | 1. Gửi yêu cầu GET đến `/topics` | Phản hồi với trạng thái 200<br>Mảng các đối tượng chủ đề | TC-02 | | | Endpoint công khai, không yêu cầu xác thực |
| TC-04 | Phải tìm một chủ đề | 1. Gửi yêu cầu GET đến `/topics/:id` với ID chủ đề hợp lệ | Phản hồi với trạng thái 200<br>Đối tượng chủ đề với ID được chỉ định | TC-02 | | | Endpoint công khai, không yêu cầu xác thực |
| TC-05 | Phải cập nhật được chủ đề | 1. Gửi yêu cầu PATCH đến `/topics/:id` với ID chủ đề hợp lệ<br>2. Bao gồm dữ liệu chủ đề đã cập nhật<br>3. Bao gồm JWT token hợp lệ trong tiêu đề Authorization | Phản hồi với trạng thái 200<br>Đối tượng chủ đề đã cập nhật | TC-02 | | | Endpoint được bảo vệ yêu cầu xác thực |
| TC-06 | Phải xóa được chủ đề | 1. Gửi yêu cầu DELETE đến `/topics/:id` với ID chủ đề hợp lệ<br>2. Bao gồm JWT token hợp lệ trong tiêu đề Authorization | Phản hồi với trạng thái 200<br>Đối tượng chủ đề đã xóa | TC-02 | | | Endpoint được bảo vệ yêu cầu xác thực |
| TC-07 | Phải ném NotFoundException khi không tìm thấy chủ đề | 1. Gửi yêu cầu GET đến `/topics/:id` với ID chủ đề không tồn tại | Phản hồi với trạng thái 404<br>Thông báo lỗi cho biết không tìm thấy chủ đề | Không | | | |
| TC-08 | Phải ném NotFoundException khi cập nhật chủ đề không tồn tại | 1. Gửi yêu cầu PATCH đến `/topics/:id` với ID chủ đề không tồn tại<br>2. Bao gồm JWT token hợp lệ trong tiêu đề Authorization | Phản hồi với trạng thái 404<br>Thông báo lỗi cho biết không tìm thấy chủ đề | Không | | | Endpoint được bảo vệ yêu cầu xác thực |
| TC-09 | Phải ném NotFoundException khi xóa chủ đề không tồn tại | 1. Gửi yêu cầu DELETE đến `/topics/:id` với ID chủ đề không tồn tại<br>2. Bao gồm JWT token hợp lệ trong tiêu đề Authorization | Phản hồi với trạng thái 404<br>Thông báo lỗi cho biết không tìm thấy chủ đề | Không | | | Endpoint được bảo vệ yêu cầu xác thực |
| TC-10 | Phải ném UnauthorizedException cho các endpoint được bảo vệ | 1. Gửi yêu cầu POST/PATCH/DELETE mà không có JWT token hợp lệ | Phản hồi với trạng thái 401<br>Thông báo lỗi cho biết truy cập không được phép | Không | | | Kiểm tra yêu cầu xác thực |
