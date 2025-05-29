# Kiểm Thử Hộp Đen Controller Phản Hồi

## Tổng Quan
Tài liệu này trình bày phương pháp kiểm thử hộp đen cho FeedbacksController trong API Trang Web Lịch Sử. Mỗi trường hợp kiểm thử được thiết kế để xác thực chức năng của các endpoint API mà không cần biết chi tiết về cách thực hiện bên trong.

## Thiết Lập Môi Trường Kiểm Thử
- URL Cơ sở: `http://localhost:3000/api`
- Xác thực: JWT token được yêu cầu cho các endpoint được bảo vệ
- Content-Type: `application/json`

## Các Trường Hợp Kiểm Thử

| ID | Mô Tả Trường Hợp Kiểm Thử | Quy Trình Kiểm Thử | Kết Quả Mong Đợi | Phụ Thuộc Giữa Các Trường Hợp | Kết Quả | Ngày Kiểm Thử | Ghi Chú |
|----|----------------------|---------------------|-----------------|---------------------------|--------|-----------|------|
| FC-01 | Controller phải được định nghĩa | 1. Import FeedbacksController<br>2. Kiểm tra xem controller có được định nghĩa không | Controller phải được định nghĩa và khởi tạo đúng | Không | | | Xác thực cơ bản sự tồn tại của controller |
| FC-02 | Phải tạo được phản hồi mới | 1. Gửi yêu cầu POST đến `/feedbacks` với dữ liệu phản hồi hợp lệ<br>2. Bao gồm chủ đề (BUG, FEATURE, hoặc GENERAL), nội dung, và trạng thái (tùy chọn) | Phản hồi với trạng thái 201<br>Đối tượng phản hồi với ID được tạo và các thông tin đã cung cấp | Không | | | |
| FC-03 | Phải tìm tất cả các phản hồi | 1. Gửi yêu cầu GET đến `/feedbacks` | Phản hồi với trạng thái 200<br>Mảng các đối tượng phản hồi được sắp xếp theo ngày tạo (mới nhất trước) | FC-02 | | | |
| FC-04 | Phải tìm một phản hồi | 1. Gửi yêu cầu GET đến `/feedbacks/:id` với ID phản hồi hợp lệ | Phản hồi với trạng thái 200<br>Đối tượng phản hồi với ID được chỉ định | FC-02 | | | |
| FC-05 | Phải cập nhật được phản hồi | 1. Gửi yêu cầu PATCH đến `/feedbacks/:id` với ID phản hồi hợp lệ<br>2. Bao gồm dữ liệu phản hồi đã cập nhật (trạng thái, nội dung) | Phản hồi với trạng thái 200<br>Đối tượng phản hồi đã cập nhật | FC-02 | | | |
| FC-06 | Phải xóa được phản hồi | 1. Gửi yêu cầu DELETE đến `/feedbacks/:id` với ID phản hồi hợp lệ | Phản hồi với trạng thái 200<br>Đối tượng phản hồi đã xóa | FC-02 | | | |
| FC-07 | Phải ném NotFoundException khi không tìm thấy phản hồi | 1. Gửi yêu cầu GET đến `/feedbacks/:id` với ID phản hồi không tồn tại | Phản hồi với trạng thái 404<br>Thông báo lỗi cho biết không tìm thấy phản hồi | Không | | | |
| FC-08 | Phải ném NotFoundException khi cập nhật phản hồi không tồn tại | 1. Gửi yêu cầu PATCH đến `/feedbacks/:id` với ID phản hồi không tồn tại | Phản hồi với trạng thái 404<br>Thông báo lỗi cho biết không tìm thấy phản hồi | Không | | | |
| FC-09 | Phải ném NotFoundException khi xóa phản hồi không tồn tại | 1. Gửi yêu cầu DELETE đến `/feedbacks/:id` với ID phản hồi không tồn tại | Phản hồi với trạng thái 404<br>Thông báo lỗi cho biết không tìm thấy phản hồi | Không | | | |
