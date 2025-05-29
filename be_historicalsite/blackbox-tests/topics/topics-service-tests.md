# Kiểm Thử Hộp Đen Service Chủ Đề

## Tổng Quan
Tài liệu này trình bày phương pháp kiểm thử hộp đen cho TopicsService trong API Trang Web Lịch Sử. Mỗi trường hợp kiểm thử được thiết kế để xác thực chức năng của service mà không cần biết chi tiết về cách thực hiện bên trong.

## Thiết Lập Môi Trường Kiểm Thử
- URL Cơ sở: `http://localhost:3000/api`
- Xác thực: JWT token được yêu cầu cho các endpoint được bảo vệ
- Content-Type: `application/json`

## Các Trường Hợp Kiểm Thử

| ID | Mô Tả Trường Hợp Kiểm Thử | Quy Trình Kiểm Thử | Kết Quả Mong Đợi | Phụ Thuộc Giữa Các Trường Hợp | Kết Quả | Ngày Kiểm Thử | Ghi Chú |
|----|----------------------|---------------------|-----------------|---------------------------|--------|-----------|------|
| TS-01 | Service phải được định nghĩa | 1. Import TopicsService<br>2. Kiểm tra xem service có được định nghĩa không | Service phải được định nghĩa và khởi tạo đúng | Không | | | Xác thực cơ bản sự tồn tại của service |
| TS-02 | Phải tạo được chủ đề | 1. Gửi yêu cầu POST đến `/topics` với dữ liệu chủ đề hợp lệ<br>2. Bao gồm topicName, topicImage | Phản hồi với trạng thái 201<br>Đối tượng chủ đề với ID được tạo và các thông tin đã cung cấp | Không | | | |
| TS-03 | Phải tìm tất cả các chủ đề | 1. Gửi yêu cầu GET đến `/topics` | Phản hồi với trạng thái 200<br>Mảng các đối tượng chủ đề | TS-02 | | | |
| TS-04 | Phải tìm một chủ đề | 1. Gửi yêu cầu GET đến `/topics/:id` với ID chủ đề hợp lệ | Phản hồi với trạng thái 200<br>Đối tượng chủ đề với ID được chỉ định | TS-02 | | | |
| TS-05 | Phải cập nhật được chủ đề | 1. Gửi yêu cầu PATCH đến `/topics/:id` với ID chủ đề hợp lệ<br>2. Bao gồm dữ liệu chủ đề đã cập nhật | Phản hồi với trạng thái 200<br>Đối tượng chủ đề đã cập nhật | TS-02 | | | |
| TS-06 | Phải xóa được chủ đề | 1. Gửi yêu cầu DELETE đến `/topics/:id` với ID chủ đề hợp lệ | Phản hồi với trạng thái 200<br>Đối tượng chủ đề đã xóa | TS-02 | | | |
| TS-07 | Phải ném NotFoundException khi không tìm thấy chủ đề | 1. Gửi yêu cầu GET đến `/topics/:id` với ID chủ đề không tồn tại | Phản hồi với trạng thái 404<br>Thông báo lỗi cho biết không tìm thấy chủ đề | Không | | | |
| TS-08 | Phải ném NotFoundException khi cập nhật chủ đề không tồn tại | 1. Gửi yêu cầu PATCH đến `/topics/:id` với ID chủ đề không tồn tại | Phản hồi với trạng thái 404<br>Thông báo lỗi cho biết không tìm thấy chủ đề | Không | | | |
| TS-09 | Phải ném NotFoundException khi xóa chủ đề không tồn tại | 1. Gửi yêu cầu DELETE đến `/topics/:id` với ID chủ đề không tồn tại | Phản hồi với trạng thái 404<br>Thông báo lỗi cho biết không tìm thấy chủ đề | Không | | | |
