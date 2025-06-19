
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
            xepLoai = 'NV xuất sắc';
        } else if (soGioLam >= 176) {
            xepLoai = 'NV giỏi';
        } else if (soGioLam >= 160) {
            xepLoai = 'NV khá';
        } else {
            xepLoai = 'NV trung bình';
        }
        return xepLoai;
    }
}

export class QuanLyNV {
    arrNhanVien = [];

    themNhanVien(nhanVienMoi) {
        this.arrNhanVien.push(nhanVienMoi);
    }

    hienThiNhanVien() {
        let bodyTable = document.querySelector(`#tableDanhSach`);

        for (let indexNV in this.arrNhanVien) {
            bodyTable.innerHTML += `
                <tr>
                    <td>${this.arrNhanVien[indexNV].user}</td>
                    <td>${this.arrNhanVien[indexNV].fullName}</td>
                    <td>${this.arrNhanVien[indexNV].email}</td>
                    <td>${this.arrNhanVien[indexNV].date}</td>
                    <td>${this.arrNhanVien[indexNV].position}</td>
                    <td>${this.arrNhanVien[indexNV].tongLuong}</td>
                    <td>${this.arrNhanVien[indexNV].xepLoai}</td>
                    <td><em class="fa fa-cog"></td>
            `
        }
    }
}