# Kiểm Thử Hộp Đen Controller Giai Đoạn

## Tổng Quan
Tài liệu này trình bày phương pháp kiểm thử hộp đen cho PeriodsController trong API Trang Web Lịch Sử. Mỗi trường hợp kiểm thử được thiết kế để xác thực chức năng của các endpoint API mà không cần biết chi tiết về cách thực hiện bên trong.

## Thiết Lập Môi Trường Kiểm Thử
- URL Cơ sở: `http://localhost:3000/api`
- Xác thực: JWT token được yêu cầu cho các endpoint được bảo vệ
- Content-Type: `application/json`

## Các Trường Hợp Kiểm Thử

| ID | Mô Tả Trường Hợp Kiểm Thử | Quy Trình Kiểm Thử | Kết Quả Mong Đợi | Phụ Thuộc Giữa Các Trường Hợp | Kết Quả | Ngày Kiểm Thử | Ghi Chú |
|----|----------------------|---------------------|-----------------|---------------------------|--------|-----------|------|
| PC-01 | Controller phải được định nghĩa | 1. Import PeriodsController<br>2. Kiểm tra xem controller có được định nghĩa không | Controller phải được định nghĩa và khởi tạo đúng | Không | | | Xác thực cơ bản sự tồn tại của controller |
| PC-02 | Phải tạo được giai đoạn | 1. Gửi yêu cầu POST đến `/periods` với dữ liệu giai đoạn hợp lệ<br>2. Bao gồm periodName, periodImage, startYear, endYear<br>3. Bao gồm JWT token hợp lệ trong tiêu đề Authorization | Phản hồi với trạng thái 201<br>Đối tượng giai đoạn với ID được tạo và các thông tin đã cung cấp | Không | | | Endpoint được bảo vệ yêu cầu xác thực |
| PC-03 | Phải tìm tất cả các giai đoạn | 1. Gửi yêu cầu GET đến `/periods` | Phản hồi với trạng thái 200<br>Mảng các đối tượng giai đoạn | PC-02 | | | Endpoint công khai, không yêu cầu xác thực |
| PC-04 | Phải tìm một giai đoạn | 1. Gửi yêu cầu GET đến `/periods/:id` với ID giai đoạn hợp lệ | Phản hồi với trạng thái 200<br>Đối tượng giai đoạn với ID được chỉ định | PC-02 | | | Endpoint công khai, không yêu cầu xác thực |
| PC-05 | Phải cập nhật được giai đoạn | 1. Gửi yêu cầu PATCH đến `/periods/:id` với ID giai đoạn hợp lệ<br>2. Bao gồm dữ liệu giai đoạn đã cập nhật<br>3. Bao gồm JWT token hợp lệ trong tiêu đề Authorization | Phản hồi với trạng thái 200<br>Đối tượng giai đoạn đã cập nhật | PC-02 | | | Endpoint được bảo vệ yêu cầu xác thực |
| PC-06 | Phải xóa được giai đoạn | 1. Gửi yêu cầu DELETE đến `/periods/:id` với ID giai đoạn hợp lệ<br>2. Bao gồm JWT token hợp lệ trong tiêu đề Authorization | Phản hồi với trạng thái 200<br>Đối tượng giai đoạn đã xóa | PC-02 | | | Endpoint được bảo vệ yêu cầu xác thực |
| PC-07 | Phải ném NotFoundException khi không tìm thấy giai đoạn | 1. Gửi yêu cầu GET đến `/periods/:id` với ID giai đoạn không tồn tại | Phản hồi với trạng thái 404<br>Thông báo lỗi cho biết không tìm thấy giai đoạn | Không | | | |
| PC-08 | Phải ném NotFoundException khi cập nhật giai đoạn không tồn tại | 1. Gửi yêu cầu PATCH đến `/periods/:id` với ID giai đoạn không tồn tại<br>2. Bao gồm JWT token hợp lệ trong tiêu đề Authorization | Phản hồi với trạng thái 404<br>Thông báo lỗi cho biết không tìm thấy giai đoạn | Không | | | Endpoint được bảo vệ yêu cầu xác thực |
| PC-09 | Phải ném NotFoundException khi xóa giai đoạn không tồn tại | 1. Gửi yêu cầu DELETE đến `/periods/:id` với ID giai đoạn không tồn tại<br>2. Bao gồm JWT token hợp lệ trong tiêu đề Authorization | Phản hồi với trạng thái 404<br>Thông báo lỗi cho biết không tìm thấy giai đoạn | Không | | | Endpoint được bảo vệ yêu cầu xác thực |
| PC-10 | Phải ném UnauthorizedException cho các endpoint được bảo vệ | 1. Gửi yêu cầu POST/PATCH/DELETE mà không có JWT token hợp lệ | Phản hồi với trạng thái 401<br>Thông báo lỗi cho biết truy cập không được phép | Không | | | Kiểm tra yêu cầu xác thực |
