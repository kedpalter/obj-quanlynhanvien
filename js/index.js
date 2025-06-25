import { NhanVien, QuanLyNV } from "/js/NhanVien.js";

let danhSachNV = new QuanLyNV();

window.onload = function () {
    danhSachNV.getLocal();
    console.log(danhSachNV.arrNhanVien);
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

    document.querySelector('#frmThemNV').reset();
    document.querySelector('#frmThemNV').classList.remove('was-validated');
    $('#myModal').modal('hide');
}
// ---------------------------- VALIDATION ----------------------------------
function checkValidation(form) {
    if (!form.checkValidity()) {
        form.classList.add('was-validated'); // Nếu chưa hợp lệ khi bấm submit thì mới kích hoạt hiệu ứng xanh/đỏ theo Bootstrap
        return false;
    }
    // Kiểm tra user
    let newUser = document.querySelector('#user');
    let arrNhanVien = danhSachNV.arrNhanVien;
    for (let oldUsers of arrNhanVien) {
        if (oldUsers.user == newUser.value) {
            // newUser.setCustomValidity('Tài khoản đã tồn tại');
            console.log(newUser.parentElement.querySelector('.invalid-feedback').textContent);
            newUser.parentElement.querySelector('.invalid-feedback').innerHTML = 'Tài khoản đã tồn tại';
            form.classList.add('was-validated');
            console.log('Trùng');
            return false;
        }
    }

    // Nếu hợp lệ các pattern → return true
    return true;
}
// --------------------------------------------------------------------------
document.querySelector('#btnThemNV').onclick = function (e) {
    e.preventDefault();
    if (!checkValidation(document.querySelector('#frmThemNV'))) return;

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

    //Reset lại form sau khi nhập, xóa class validated
    document.querySelector('#frmThemNV').reset();
    document.querySelector('#frmThemNV').classList.remove('was-validated');
    $('#myModal').modal('hide');
}

