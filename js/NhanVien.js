
export class NhanVien {
    user = '';
    fullName = '';
    email = '';
    password = '';
    date = '';
    salary = 1;
    position = '';
    workingTime = 1;
    tinhTongLuong(heSo) {
        let luongCB = this.salary;
        let tongLuong = heSo * luongCB;
        return tongLuong;
    }
    xepLoaiNhanVien() {
        let soGioLam = this.workingTime;
        let xepLoai;
        if (soGioLam >= 192) {
            xepLoai = 'Nhân viên xuất sắc';
        } else if (soGioLam >= 176) {
            xepLoai = 'Nhân viên giỏi';
        } else if (soGioLam >= 160) {
            xepLoai = 'Nhân viên khá';
        } else {
            xepLoai = 'Nhân viên trung bình'
        }
    }
}

export class QuanLyNV {
    arrNhanVien = [];
}