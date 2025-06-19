import { NhanVien, QuanLyNV } from "/js/NhanVien.js";

let danhsachNV = new QuanLyNV();

document.querySelector('#btnThemNV').onclick = function (e) {
    e.preventDefault();

    let nhanVien = new NhanVien();
    console.log(nhanVien);
    let arrInput = document.querySelectorAll('.fill-input');
    for (let tag of arrInput) {
        let id = tag.id;
        let value = tag.value;
        nhanVien[id] = value;
    }

    danhsachNV.themNhanVien(nhanVien);
    danhsachNV.hienThiNhanVien();
}
