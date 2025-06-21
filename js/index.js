import { NhanVien, QuanLyNV } from "/js/NhanVien.js";

let danhSachNV = new QuanLyNV();

window.onload = function () {
    danhSachNV.getLocal();
    danhSachNV.hienThiNhanVien();
}

window.editNhanVien = function (index) {
    let nvEdit = danhSachNV.arrNhanVien[index];
    let arrTagInput = document.querySelectorAll('.fill-input');
    for (let tag of arrTagInput) {
        tag.value = nvEdit[tag.id];
    }
    // set index cho btnCapNhat/btnXoa khi nhấn vào nút chỉnh sửa
    let btnCapNhat = document.querySelector('#btnCapNhat');
    btnCapNhat.setAttribute('data-index-edit', index);
    document.querySelector('#btnXoa').setAttribute('data-index-edit', index);
}
window.xoaNhanVienUI = function (indexDel) {
    // console.log(indexDel);
    danhSachNV.xoaNhanVien(indexDel);
    danhSachNV.hienThiNhanVien();
    // Save local
    danhSachNV.saveLocal();

}
    // ----------------------------- VALIDATION -----------------------------------
    // Example starter JavaScript for disabling form submissions if there are invalid fields
    (() => {
        'use strict'

        // Fetch all the forms we want to apply custom Bootstrap validation styles to
        var frmValid = document.querySelectorAll('.needs-validation');

        // Loop over them and prevent submission
        frmValid.forEach(form => {
            form.addEventListener('submit', event => {
                if (!form.checkValidity()) {
                    event.preventDefault()
                    event.stopPropagation()
                }

                form.classList.add('was-validated')
            }, false)
        })
    });

document.querySelector('#btnCapNhat').onclick = function (e) {
    let indexEdit = e.target.getAttribute('data-index-edit');
    // console.log(indexEdit);
    // Bản chất cập nhật món ăn giống như thêm 1 món mới trên index cũ hiện tại
    let updateNV = new NhanVien()
    let updateArrInput = document.querySelectorAll('.fill-input');
    for (let updateTag of updateArrInput) {
        let updateId = updateTag.id;
        let updateValue = updateTag.value;
        updateNV[updateId] = updateValue;
    }
    updateNV.totalSalary = updateNV.calSalary();
    updateNV.rate = updateNV.calRate();
    // Gọi hàm update
    danhSachNV.capNhatNhanVien(indexEdit, updateNV);
    // Hiển thị lại bảng
    danhSachNV.hienThiNhanVien();
    // Lưu lại Local
    danhSachNV.saveLocal();
}

document.querySelector('#btnXoa').onclick = function (e) {
    let indexEdit = e.target.getAttribute('data-index-edit');
    // console.log(indexEdit);
    danhSachNV.xoaNhanVien(indexEdit);
    danhSachNV.hienThiNhanVien();
    danhSachNV.saveLocal();
}

document.querySelector('#btnThemNV').onsubmit = function (e) {
    console.log('Nhấn nút Thêm người dùng');
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



