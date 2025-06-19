import { NhanVien, QuanLyNV } from "/js/NhanVien.js";

let danhSachNV = new QuanLyNV();

window.onload = function() {
    danhSachNV.getLocal();
    danhSachNV.hienThiNhanVien();
}

window.editNhanVien = function(index) {
    let nvEdit = danhSachNV.arrNhanVien[index];
    let arrTagInput = document.querySelectorAll('.fill-input');
    for (let tag of arrTagInput) {
        tag.value = nvEdit[tag.id];
    }
    let btnCapNhat = document.querySelector('#btnCapNhat');
    btnCapNhat.setAttribute('data-index-edit', index);
}

document.querySelector('#btnThemNV').onclick = function (e) {
    e.preventDefault();

    let nhanVien = new NhanVien();
    let arrInput = document.querySelectorAll('.fill-input');
    for (let tag of arrInput) {
        let id = tag.id;    
        let value = tag.value;
        nhanVien[id] = value;
    }
    nhanVien.totalSalary = nhanVien.calSalary();
    nhanVien.rate = nhanVien.calRate();

    danhSachNV.themNhanVien(nhanVien);
    danhSachNV.hienThiNhanVien();

    //Lưu lại Local
    danhSachNV.saveLocal();

}

