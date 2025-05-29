# Kiểm Thử Hộp Đen Controller Bài Viết

## Tổng Quan
Tài liệu này trình bày phương pháp kiểm thử hộp đen cho ArticlesController trong API Trang Web Lịch Sử. Mỗi trường hợp kiểm thử được thiết kế để xác thực chức năng của các endpoint API mà không cần biết chi tiết về cách thực hiện bên trong.

## Thiết Lập Môi Trường Kiểm Thử
- URL Cơ sở: `http://localhost:3000/api`
- Xác thực: JWT token được yêu cầu cho các endpoint được bảo vệ
- Content-Type: `application/json` cho hầu hết các yêu cầu, `multipart/form-data` cho tải lên tập tin

## Các Trường Hợp Kiểm Thử

| ID | Mô Tả Trường Hợp Kiểm Thử | Quy Trình Kiểm Thử | Kết Quả Mong Đợi | Phụ Thuộc Giữa Các Trường Hợp | Kết Quả | Ngày Kiểm Thử | Ghi Chú |
|----|----------------------|---------------------|-----------------|---------------------------|--------|-----------|------|
| AC-01 | Controller phải được định nghĩa | 1. Import ArticlesController<br>2. Kiểm tra xem controller có được định nghĩa không | Controller phải được định nghĩa và khởi tạo đúng | Không | | | Xác thực cơ bản sự tồn tại của controller |
| AC-02 | Phải tạo được bài viết | 1. Gửi yêu cầu POST đến `/articles` với dữ liệu bài viết hợp lệ<br>2. Bao gồm articleType (EVENT hoặc PERSON) và articleName | Phản hồi với trạng thái 201<br>Đối tượng bài viết với ID được tạo, articleType, articleName và thời gian | Không | | | |
| AC-03 | Phải tìm tất cả các bài viết | 1. Gửi yêu cầu GET đến `/articles`<br>2. Bao gồm tham số phân trang (page=1, limit=10) | Phản hồi với trạng thái 200<br>Mảng các đối tượng bài viết với metadata phân trang<br>Metadata phân trang phải bao gồm total, page, limit và totalPages | AC-02 | | | Phản hồi được tối ưu loại bỏ dữ liệu nội dung |
| AC-04 | Phải lấy tất cả tên bài viết | 1. Gửi yêu cầu GET đến `/articles/names` | Phản hồi với trạng thái 200<br>Mảng các đối tượng với articleId và articleName | AC-02 | | | Hữu ích cho các menu thả xuống hoặc danh sách |
| AC-05 | Phải tìm một bài viết | 1. Gửi yêu cầu GET đến `/articles/:id` với ID bài viết hợp lệ | Phản hồi với trạng thái 200<br>Đối tượng bài viết với ID được chỉ định | AC-02 | | | |
| AC-06 | Phải cập nhật được bài viết | 1. Gửi yêu cầu PATCH đến `/articles/:id` với ID bài viết hợp lệ<br>2. Bao gồm dữ liệu bài viết đã cập nhật | Phản hồi với trạng thái 200<br>Đối tượng bài viết đã cập nhật | AC-02 | | | |
| AC-07 | Phải xóa được bài viết | 1. Gửi yêu cầu DELETE đến `/articles/:id` với ID bài viết hợp lệ | Phản hồi với trạng thái 200<br>Thông báo thành công xác nhận việc xóa | AC-02 | | | |
| AC-08 | Phải tạo được nội dung | 1. Gửi yêu cầu POST đến `/articles/content` với dữ liệu nội dung hợp lệ<br>2. Bao gồm contentName, articleId, văn bản nội dung | Phản hồi với trạng thái 201<br>Đối tượng nội dung với ID được tạo | AC-02 | | | |
| AC-09 | Phải cập nhật được nội dung | 1. Gửi yêu cầu PATCH đến `/articles/content/:id` với ID nội dung hợp lệ<br>2. Bao gồm dữ liệu nội dung đã cập nhật | Phản hồi với trạng thái 200<br>Đối tượng nội dung đã cập nhật | AC-08 | | | |
| AC-10 | Phải xóa được nội dung | 1. Gửi yêu cầu DELETE đến `/articles/content/:id` với ID nội dung hợp lệ | Phản hồi với trạng thái 200<br>Thông báo thành công xác nhận việc xóa | AC-08 | | | |
| AC-11 | Phải tải lên được hình ảnh | 1. Gửi yêu cầu POST đến `/articles/image` với multipart/form-data<br>2. Bao gồm file, contentId, alt, caption | Phản hồi với trạng thái 201<br>Đối tượng hình ảnh với ID được tạo và URL Supabase | AC-08 | | | Phải sử dụng multipart/form-data cho việc tải lên tập tin |
| AC-12 | Phải tạo được bài viết nhân vật | 1. Gửi yêu cầu POST đến `/articles/person` với dữ liệu bài viết nhân vật hợp lệ<br>2. Bao gồm personName, personAvatar, birthYear, deathYear, nationality và dữ liệu bài viết | Phản hồi với trạng thái 201<br>Đối tượng bài viết nhân vật với ID được tạo | Không | | | |
| AC-13 | Phải cập nhật được bài viết nhân vật | 1. Gửi yêu cầu PATCH đến `/articles/person/:id` với ID bài viết hợp lệ<br>2. Bao gồm dữ liệu bài viết nhân vật đã cập nhật | Phản hồi với trạng thái 200<br>Đối tượng bài viết nhân vật đã cập nhật | AC-12 | | | |
| AC-14 | Phải tạo được bài viết sự kiện | 1. Gửi yêu cầu POST đến `/articles/event` với dữ liệu bài viết sự kiện hợp lệ<br>2. Bao gồm periodId, topicId và dữ liệu bài viết | Phản hồi với trạng thái 201<br>Đối tượng bài viết sự kiện với ID được tạo | Không | | | Yêu cầu các ID giai đoạn và chủ đề hợp lệ |
| AC-15 | Phải cập nhật được bài viết sự kiện | 1. Gửi yêu cầu PATCH đến `/articles/event/:id` với ID bài viết hợp lệ<br>2. Bao gồm dữ liệu bài viết sự kiện đã cập nhật | Phản hồi với trạng thái 200<br>Đối tượng bài viết sự kiện đã cập nhật | AC-14 | | | |
| AC-16 | Phải xóa được bài viết nhân vật | 1. Gửi yêu cầu DELETE đến `/articles/person/:id` với ID bài viết hợp lệ | Phản hồi với trạng thái 200<br>Thông báo thành công xác nhận việc xóa | AC-12 | | | |
| AC-17 | Phải xóa được bài viết sự kiện | 1. Gửi yêu cầu DELETE đến `/articles/event/:id` với ID bài viết hợp lệ | Phản hồi với trạng thái 200<br>Thông báo thành công xác nhận việc xóa | AC-14 | | | |
