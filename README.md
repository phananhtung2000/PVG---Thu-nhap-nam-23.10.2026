# Thu nhập PVG — PWA

Gồm 6 file đặt ngang hàng ở thư mục gốc repo: `index.html`, `manifest.json`, `sw.js`, `icon-192.png`, `icon-512.png`, `icon-512-maskable.png`.

## Deploy lên GitHub Pages
1. Tạo repo mới riêng cho app này, ví dụ `thu-nhap-pvg` (mỗi app cài được một repo riêng; không đặt ở repo `<user>.github.io`).
2. Đẩy cả 6 file lên thư mục gốc của repo (không đặt trong thư mục con).
3. Settings → Pages → Source: branch `main`, thư mục `/ (root)` → Save.
4. Link app: `https://<user>.github.io/thu-nhap-pvg/`. Không cần sửa gì thêm vì `start_url` và `scope` dùng đường dẫn tương đối.

## Cài thử
- **Android (Chrome):** mở link → menu 3 chấm → "Cài đặt ứng dụng" / "Thêm vào Màn hình chính".
- **Windows 11 (Edge/Chrome):** mở link → bấm icon "Cài đặt" trên thanh địa chỉ (hoặc menu → Ứng dụng → Cài đặt trang này như một ứng dụng).
- **Lighthouse:** DevTools → tab Lighthouse → chọn "Progressive Web App" → Analyze.
- Vẫn mở được như file thường bằng double-click (`file://`), chạy offline.

## Cập nhật phiên bản
Chỉ đổi `v1` → `v2` trong `CACHE_NAME` của `sw.js` và thay `index.html`. Giữ nguyên `id`, `name`, `start_url`, `scope` và tên file icon.

## Lỗi "Ứng dụng này đã được cài đặt rồi" nhưng không mở được (Chrome Android)
1. Xuất/sao lưu dữ liệu trong app trước; không bấm các nút đặt lại (Reset).
2. Cài đặt → Ứng dụng: gỡ mục "Thu nhập PVG" (và portal nếu có).
3. Đóng hẳn Chrome rồi mở lại link.
4. Nếu vẫn không hiện "Cài đặt ứng dụng": kiểm tra scope/`id` theo quy tắc scope anh em, không lồng nhau.
5. Chỉ khi vẫn kẹt mới xoá dữ liệu Chrome hoặc gỡ Chrome cài lại. Cách này xoá luôn dữ liệu IndexedDB của mọi app trên domain nên bắt buộc sao lưu trước.
