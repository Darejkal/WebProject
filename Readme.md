# HustServe
Hệ thống quản lý sinh viên kèm tiện ích.
## Các tính năng
- Videocall
- Điểm danh QR (+ Web Extension)
- Quản lý sinh viên và mối quan hệ của sinh viên với các lớp.
- Giao và nộp test
## Hệ thống
### Các công nghệ sử dụng
Development:
- ICE Server: Golang (WebRTC + Gorilla)
- Backend tập trung + Frontend:  Typescript (Nextjs + Zustack)
- Notification Service: Fastapi + Apprise
- Message Queue: Redpanda
- Database: MongoDB

Deployment:
- Docker + K8s
- Ansible

## Phân công 
|Tên|MSSV|Công việc|
|--|--|--|
|Nguyễn Đại An (Trưởng nhóm)|20215296| Thực hiện Backend, Frontend nền và đảm nhiệm các tính năng phụ như videocall và extension. |
|Nguyễn Văn An|20215520| Đảm nhiệm Frontend chính|
|Phạm Công An|20215521| Đảm nhiệm Frontend chính |
