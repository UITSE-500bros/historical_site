# Kiểm Thử Hộp Đen Service Bài Viết

## Tổng Quan
Tài liệu này trình bày phương pháp kiểm thử hộp đen cho ArticlesService trong API Trang Web Lịch Sử. Mỗi trường hợp kiểm thử được thiết kế để xác thực chức năng của service mà không cần biết chi tiết về cách thực hiện bên trong.

## Thiết Lập Môi Trường Kiểm Thử
- URL Cơ sở: `http://localhost:3000/api`
- Xác thực: JWT token được yêu cầu cho các endpoint được bảo vệ
- Content-Type: `application/json` cho hầu hết các yêu cầu, `multipart/form-data` cho tải lên tập tin

## Các Trường Hợp Kiểm Thử

| ID | Mô Tả Trường Hợp Kiểm Thử | Quy Trình Kiểm Thử | Kết Quả Mong Đợi | Phụ Thuộc Giữa Các Trường Hợp | Kết Quả | Ngày Kiểm Thử | Ghi Chú |
|----|----------------------|---------------------|-----------------|---------------------------|--------|-----------|------|
| AS-01 | Service phải được định nghĩa | 1. Import ArticlesService<br>2. Kiểm tra xem service có được định nghĩa không | Service phải được định nghĩa và khởi tạo đúng | Không | | | Xác thực cơ bản sự tồn tại của service |
| AS-02 | Phải tạo được bài viết | 1. Gửi yêu cầu POST đến `/articles` với dữ liệu bài viết hợp lệ<br>2. Bao gồm articleType (EVENT hoặc PERSON) và articleName | Phản hồi với trạng thái 201<br>Đối tượng bài viết với ID được tạo, articleType, articleName và thời gian | Không | | | |
| AS-03 | Phải tìm tất cả các bài viết | 1. Gửi yêu cầu GET đến `/articles`<br>2. Tùy chọn bao gồm tham số phân trang (page, limit) | Phản hồi với trạng thái 200<br>Mảng các đối tượng bài viết với cấu trúc đã được tối ưu hóa<br>Không bao gồm dữ liệu nội dung<br>Bài viết EVENT bao gồm periodName và topicName<br>Bài viết PERSON bao gồm chi tiết nhân vật | AS-02 | | | Phản hồi được tối ưu để loại bỏ dữ liệu nội dung |
| AS-04 | Phải tìm một bài viết theo ID | 1. Gửi yêu cầu GET đến `/articles/:id` với ID bài viết hợp lệ | Phản hồi với trạng thái 200<br>Đối tượng bài viết với ID được chỉ định<br>Dữ liệu cơ bản của bài viết không có chi tiết nội dung | AS-02 | | | |
| AS-05 | Phải tìm một bài viết kèm nội dung | 1. Gửi yêu cầu GET đến `/articles/:id/contents` với ID bài viết hợp lệ | Phản hồi với trạng thái 200<br>Đối tượng bài viết với ID được chỉ định bao gồm dữ liệu nội dung | AS-02 | | | |
| AS-06 | Phải cập nhật được bài viết | 1. Gửi yêu cầu PATCH đến `/articles/:id` với ID bài viết hợp lệ<br>2. Bao gồm dữ liệu bài viết đã cập nhật | Phản hồi với trạng thái 200<br>Đối tượng bài viết đã cập nhật | AS-02 | | | |
| AS-07 | Phải xóa được bài viết và tất cả dữ liệu liên quan | 1. Gửi yêu cầu DELETE đến `/articles/:id` với ID bài viết hợp lệ | Phản hồi với trạng thái 200<br>Thông báo thành công xác nhận việc xóa | AS-02 | | | Tất cả nội dung và hình ảnh liên quan phải được xóa |
| AS-08 | Phải tạo được nội dung | 1. Gửi yêu cầu POST đến `/articles/content` với dữ liệu nội dung hợp lệ<br>2. Bao gồm contentName, articleId, văn bản nội dung | Phản hồi với trạng thái 201<br>Đối tượng nội dung với ID được tạo | AS-02 | | | |
| AS-09 | Phải cập nhật được nội dung | 1. Gửi yêu cầu PATCH đến `/articles/content/:id` với ID nội dung hợp lệ<br>2. Bao gồm dữ liệu nội dung đã cập nhật | Phản hồi với trạng thái 200<br>Đối tượng nội dung đã cập nhật | AS-08 | | | |
| AS-10 | Phải xóa được nội dung | 1. Gửi yêu cầu DELETE đến `/articles/content/:id` với ID nội dung hợp lệ | Phản hồi với trạng thái 200<br>Đối tượng nội dung đã xóa | AS-08 | | | |
| AS-11 | Phải tải lên được hình ảnh | 1. Gửi yêu cầu POST đến `/articles/image` với multipart/form-data<br>2. Bao gồm file, contentId, alt, caption, width, height | Phản hồi với trạng thái 201<br>Đối tượng hình ảnh với ID được tạo và URL Supabase | AS-08 | | | |
| AS-12 | Phải tạo được bài viết nhân vật | 1. Gửi yêu cầu POST đến `/articles/person` với dữ liệu bài viết nhân vật hợp lệ<br>2. Bao gồm personName, personAvatar, birthYear, deathYear, nationality và dữ liệu bài viết | Phản hồi với trạng thái 201<br>Đối tượng bài viết nhân vật với ID được tạo | Không | | | |
| AS-13 | Phải cập nhật được bài viết nhân vật | 1. Gửi yêu cầu PATCH đến `/articles/person/:id` với ID bài viết hợp lệ<br>2. Bao gồm dữ liệu bài viết nhân vật đã cập nhật | Phản hồi với trạng thái 200<br>Đối tượng bài viết nhân vật đã cập nhật | AS-12 | | | |
| AS-14 | Phải tạo được bài viết sự kiện | 1. Gửi yêu cầu POST đến `/articles/event` với dữ liệu bài viết sự kiện hợp lệ<br>2. Bao gồm periodId, topicId và dữ liệu bài viết | Phản hồi với trạng thái 201<br>Đối tượng bài viết sự kiện với ID được tạo | Không | | | Yêu cầu các ID giai đoạn và chủ đề hợp lệ |
| AS-15 | Phải cập nhật được bài viết sự kiện | 1. Gửi yêu cầu PATCH đến `/articles/event/:id` với ID bài viết hợp lệ<br>2. Bao gồm dữ liệu bài viết sự kiện đã cập nhật | Phản hồi với trạng thái 200<br>Đối tượng bài viết sự kiện đã cập nhật | AS-14 | | | |
| AS-16 | Phải xóa được bài viết nhân vật | 1. Gửi yêu cầu DELETE đến `/articles/person/:id` với ID bài viết hợp lệ | Phản hồi với trạng thái 200<br>Thông báo thành công xác nhận việc xóa | AS-12 | | | Tất cả nội dung và hình ảnh liên quan phải được xóa |
| AS-17 | Phải xóa được bài viết sự kiện | 1. Gửi yêu cầu DELETE đến `/articles/event/:id` với ID bài viết hợp lệ | Phản hồi với trạng thái 200<br>Thông báo thành công xác nhận việc xóa | AS-14 | | | Tất cả nội dung và hình ảnh liên quan phải được xóa |
| AS-18 | Phải ném NotFoundException khi không tìm thấy bài viết | 1. Gửi yêu cầu GET đến `/articles/:id` với ID bài viết không tồn tại | Phản hồi với trạng thái 404<br>Thông báo lỗi cho biết không tìm thấy bài viết | Không | | | |
| AS-19 | Phải ném BadRequestException khi loại bài viết không khớp | 1. Gửi yêu cầu PATCH đến `/articles/person/:id` với ID bài viết sự kiện<br>2. Hoặc gửi yêu cầu PATCH đến `/articles/event/:id` với ID bài viết nhân vật | Phản hồi với trạng thái 400<br>Thông báo lỗi cho biết loại bài viết không khớp | AS-12, AS-14 | | | |
