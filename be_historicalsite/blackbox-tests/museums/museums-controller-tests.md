# Kiểm Thử Hộp Đen Controller Bảo Tàng

## Tổng Quan
Tài liệu này trình bày phương pháp kiểm thử hộp đen cho MuseumsController trong API Trang Web Lịch Sử. Mỗi trường hợp kiểm thử được thiết kế để xác thực chức năng của các endpoint API mà không cần biết chi tiết về cách thực hiện bên trong.

## Thiết Lập Môi Trường Kiểm Thử
- URL Cơ sở: `http://localhost:3000/api`
- Xác thực: JWT token được yêu cầu cho các endpoint được bảo vệ
- Content-Type: `application/json` cho hầu hết các yêu cầu, `multipart/form-data` cho tải lên tập tin
- Tích hợp lưu trữ Supabase cho việc tải lên hình ảnh

## Các Trường Hợp Kiểm Thử

| ID | Mô Tả Trường Hợp Kiểm Thử | Quy Trình Kiểm Thử | Kết Quả Mong Đợi | Phụ Thuộc Giữa Các Trường Hợp | Kết Quả | Ngày Kiểm Thử | Ghi Chú |
|----|----------------------|---------------------|-----------------|---------------------------|--------|-----------|------|
| MC-01 | Controller phải được định nghĩa | 1. Import MuseumsController<br>2. Kiểm tra xem controller có được định nghĩa không | Controller phải được định nghĩa và khởi tạo đúng | Không | | | Xác thực cơ bản sự tồn tại của controller |
| MC-02 | Phải tạo được bảo tàng mới | 1. Gửi yêu cầu POST đến `/museums` với dữ liệu bảo tàng hợp lệ<br>2. Bao gồm museumName, museumAddress, museumPhone, museumEmail dưới dạng các trường form<br>3. Tải lên museumImage dưới dạng tập tin sử dụng multipart/form-data<br>4. Bao gồm JWT token hợp lệ trong tiêu đề Authorization | Phản hồi với trạng thái 201<br>Đối tượng bảo tàng với ID được tạo và các thông tin đã cung cấp<br>museumImage phải là URL Supabase | Không | | | Endpoint được bảo vệ yêu cầu xác thực |
| MC-03 | Phải tìm tất cả các bảo tàng | 1. Gửi yêu cầu GET đến `/museums` | Phản hồi với trạng thái 200<br>Mảng các đối tượng bảo tàng được sắp xếp theo ngày tạo (mới nhất trước) | MC-02 | | | Endpoint công khai, không yêu cầu xác thực |
| MC-04 | Phải tìm một bảo tàng theo id | 1. Gửi yêu cầu GET đến `/museums/:id` với ID bảo tàng hợp lệ | Phản hồi với trạng thái 200<br>Đối tượng bảo tàng với ID được chỉ định | MC-02 | | | Endpoint công khai, không yêu cầu xác thực |
| MC-05 | Phải cập nhật được bảo tàng | 1. Gửi yêu cầu PATCH đến `/museums/:id` với ID bảo tàng hợp lệ<br>2. Bao gồm dữ liệu bảo tàng đã cập nhật dưới dạng các trường form<br>3. Bao gồm JWT token hợp lệ trong tiêu đề Authorization | Phản hồi với trạng thái 200<br>Đối tượng bảo tàng đã cập nhật | MC-02 | | | Endpoint được bảo vệ yêu cầu xác thực |
| MC-06 | Phải cập nhật được bảo tàng với hình ảnh mới | 1. Gửi yêu cầu PATCH đến `/museums/:id` với ID bảo tàng hợp lệ<br>2. Bao gồm dữ liệu bảo tàng đã cập nhật dưới dạng các trường form<br>3. Tải lên museumImage mới dưới dạng tập tin sử dụng multipart/form-data<br>4. Bao gồm JWT token hợp lệ trong tiêu đề Authorization | Phản hồi với trạng thái 200<br>Đối tượng bảo tàng đã cập nhật với URL hình ảnh mới | MC-02 | | | Endpoint được bảo vệ yêu cầu xác thực |
| MC-07 | Phải xóa được bảo tàng | 1. Gửi yêu cầu DELETE đến `/museums/:id` với ID bảo tàng hợp lệ<br>2. Bao gồm JWT token hợp lệ trong tiêu đề Authorization | Phản hồi với trạng thái 200<br>Đối tượng bảo tàng đã xóa | MC-02 | | | Endpoint được bảo vệ yêu cầu xác thực |
| MC-08 | Phải ném NotFoundException khi không tìm thấy bảo tàng | 1. Gửi yêu cầu GET đến `/museums/:id` với ID bảo tàng không tồn tại | Phản hồi với trạng thái 404<br>Thông báo lỗi cho biết không tìm thấy bảo tàng | Không | | | |
| MC-09 | Phải ném NotFoundException khi cập nhật bảo tàng không tồn tại | 1. Gửi yêu cầu PATCH đến `/museums/:id` với ID bảo tàng không tồn tại<br>2. Bao gồm JWT token hợp lệ trong tiêu đề Authorization | Phản hồi với trạng thái 404<br>Thông báo lỗi cho biết không tìm thấy bảo tàng | Không | | | Endpoint được bảo vệ yêu cầu xác thực |
| MC-10 | Phải ném NotFoundException khi xóa bảo tàng không tồn tại | 1. Gửi yêu cầu DELETE đến `/museums/:id` với ID bảo tàng không tồn tại<br>2. Bao gồm JWT token hợp lệ trong tiêu đề Authorization | Phản hồi với trạng thái 404<br>Thông báo lỗi cho biết không tìm thấy bảo tàng | Không | | | Endpoint được bảo vệ yêu cầu xác thực |
| MC-11 | Phải ném UnauthorizedException cho các endpoint được bảo vệ | 1. Gửi yêu cầu POST/PATCH/DELETE mà không có JWT token hợp lệ | Phản hồi với trạng thái 401<br>Thông báo lỗi cho biết truy cập không được phép | Không | | | Kiểm tra yêu cầu xác thực |
