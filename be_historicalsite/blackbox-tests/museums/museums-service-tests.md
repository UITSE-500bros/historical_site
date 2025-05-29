# Kiểm Thử Hộp Đen Service Bảo Tàng

## Tổng Quan
Tài liệu này trình bày phương pháp kiểm thử hộp đen cho MuseumsService trong API Trang Web Lịch Sử. Mỗi trường hợp kiểm thử được thiết kế để xác thực chức năng của service mà không cần biết chi tiết về cách thực hiện bên trong.

## Thiết Lập Môi Trường Kiểm Thử
- URL Cơ sở: `http://localhost:3000/api`
- Xác thực: JWT token được yêu cầu cho các endpoint được bảo vệ
- Content-Type: `application/json` cho hầu hết các yêu cầu, `multipart/form-data` cho tải lên tập tin
- Tích hợp lưu trữ Supabase cho việc tải lên hình ảnh

## Các Trường Hợp Kiểm Thử

| ID | Mô Tả Trường Hợp Kiểm Thử | Quy Trình Kiểm Thử | Kết Quả Mong Đợi | Phụ Thuộc Giữa Các Trường Hợp | Kết Quả | Ngày Kiểm Thử | Ghi Chú |
|----|----------------------|---------------------|-----------------|---------------------------|--------|-----------|------|
| MS-01 | Service phải được định nghĩa | 1. Import MuseumsService<br>2. Kiểm tra xem service có được định nghĩa không | Service phải được định nghĩa và khởi tạo đúng | Không | | | Xác thực cơ bản sự tồn tại của service |
| MS-02 | Phải tạo được bảo tàng với hình ảnh | 1. Gửi yêu cầu POST đến `/museums` với dữ liệu bảo tàng hợp lệ<br>2. Bao gồm museumName, museumAddress, museumPhone, museumEmail<br>3. Tải lên museumImage dưới dạng tập tin sử dụng multipart/form-data | Phản hồi với trạng thái 201<br>Đối tượng bảo tàng với ID được tạo và các thông tin đã cung cấp<br>museumImage phải là URL Supabase | Không | | | Yêu cầu tích hợp lưu trữ Supabase |
| MS-03 | Phải tìm tất cả các bảo tàng | 1. Gửi yêu cầu GET đến `/museums` | Phản hồi với trạng thái 200<br>Mảng các đối tượng bảo tàng được sắp xếp theo ngày tạo (mới nhất trước) | MS-02 | | | |
| MS-04 | Phải tìm một bảo tàng | 1. Gửi yêu cầu GET đến `/museums/:id` với ID bảo tàng hợp lệ | Phản hồi với trạng thái 200<br>Đối tượng bảo tàng với ID được chỉ định | MS-02 | | | |
| MS-05 | Phải cập nhật được bảo tàng | 1. Gửi yêu cầu PATCH đến `/museums/:id` với ID bảo tàng hợp lệ<br>2. Bao gồm dữ liệu bảo tàng đã cập nhật | Phản hồi với trạng thái 200<br>Đối tượng bảo tàng đã cập nhật | MS-02 | | | |
| MS-06 | Phải cập nhật được bảo tàng với hình ảnh mới | 1. Gửi yêu cầu PATCH đến `/museums/:id` với ID bảo tàng hợp lệ<br>2. Bao gồm dữ liệu bảo tàng đã cập nhật<br>3. Tải lên museumImage mới dưới dạng tập tin sử dụng multipart/form-data | Phản hồi với trạng thái 200<br>Đối tượng bảo tàng đã cập nhật với URL hình ảnh mới | MS-02 | | | Yêu cầu tích hợp lưu trữ Supabase |
| MS-07 | Phải xóa được bảo tàng | 1. Gửi yêu cầu DELETE đến `/museums/:id` với ID bảo tàng hợp lệ | Phản hồi với trạng thái 200<br>Đối tượng bảo tàng đã xóa | MS-02 | | | |
| MS-08 | Phải ném NotFoundException khi không tìm thấy bảo tàng | 1. Gửi yêu cầu GET đến `/museums/:id` với ID bảo tàng không tồn tại | Phản hồi với trạng thái 404<br>Thông báo lỗi cho biết không tìm thấy bảo tàng | Không | | | |
| MS-09 | Phải ném NotFoundException khi cập nhật bảo tàng không tồn tại | 1. Gửi yêu cầu PATCH đến `/museums/:id` với ID bảo tàng không tồn tại | Phản hồi với trạng thái 404<br>Thông báo lỗi cho biết không tìm thấy bảo tàng | Không | | | |
| MS-10 | Phải ném NotFoundException khi xóa bảo tàng không tồn tại | 1. Gửi yêu cầu DELETE đến `/museums/:id` với ID bảo tàng không tồn tại | Phản hồi với trạng thái 404<br>Thông báo lỗi cho biết không tìm thấy bảo tàng | Không | | | |
