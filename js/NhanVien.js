
export class NhanVien {
    user = '';
    fullName = '';
    email = '';
    password = '';
    date = '';
    salary = 1;
    position = '';
    workingTime = 1;
    totalSalary = 1;
    rate = '';
    calSalary() {
        let luongCB = this.salary;
        let chucVu = this.position;
        let heSo;
        switch (chucVu) {
            case 'Giám đốc': heSo = 3;
                break;
            case 'Trưởng phòng': heSo = 2;
                break;
            default: heSo = 1;
        }
        console.log(heSo)
        let tongLuong = heSo * luongCB;
        return tongLuong;
    }
    calRate() {
        let soGioLam = this.workingTime;
        let xepLoai;
        if (soGioLam >= 192) {
            xepLoai = 'Xuất sắc';
        } else if (soGioLam >= 176) {
            xepLoai = 'Giỏi';
        } else if (soGioLam >= 160) {
            xepLoai = 'Khá';
        } else {
            xepLoai = 'Trung bình';
        }
        return xepLoai;
    }
}

export class QuanLyNV {
    arrNhanVien = [];

    themNhanVien(nhanVienMoi) {
        this.arrNhanVien.push(nhanVienMoi);
    }
    xoaNhanVien(indexDel) {
        this.arrNhanVien.splice(indexDel, 1);
    }
    capNhatNhanVien(indexUpdate, nhanVienUpdate) {
        let nvInaArrNhanVien = this.arrNhanVien[indexUpdate]; // lấy Obj thứ indexUpdate trong arrNhanVien
        for (let key in nvInaArrNhanVien) {
            nvInaArrNhanVien[key] = nhanVienUpdate[key];
        }
        
    }
    saveLocal() {
        let saveStr = JSON.stringify(this.arrNhanVien);
        localStorage.setItem('arrNhanVien', saveStr);
    }

    getLocal() {
        if (localStorage.getItem('arrNhanVien')) {
            this.arrNhanVien = JSON.parse(localStorage.getItem('arrNhanVien'));
        }
    }

    hienThiNhanVien() {
        let bodyTable = document.querySelector(`#tableDanhSach`);
        bodyTable.innerHTML = '';

        for (let indexNV in this.arrNhanVien) {
            bodyTable.innerHTML += `
                <tr>
                    <td>${this.arrNhanVien[indexNV].user}</td>
                    <td>${this.arrNhanVien[indexNV].fullName}</td>
                    <td>${this.arrNhanVien[indexNV].email}</td>
                    <td>${this.arrNhanVien[indexNV].date}</td>
                    <td>${this.arrNhanVien[indexNV].position}</td>
                    <td>${this.arrNhanVien[indexNV].totalSalary.toLocaleString('vi-VN')}</td>
                    <td>${this.arrNhanVien[indexNV].rate}</td>
                    <td><em class="fa fa-cog btn btn-edit" data-toggle="modal" data-target="#myModal" onclick="editNhanVien('${indexNV}')"></td>
            `
        }
    }
}