import { NhanVien, QuanLyNV } from "/js/NhanVien.js";

let danhSachNV = new QuanLyNV();

window.onload = function () {
    danhSachNV.getLocal();
    danhSachNV.hienThiNhanVien();
}
window.editNhanVien = function (index) {
    document.querySelector('#myModal .update').classList.remove('d-none');
    document.querySelector('#btnThemNV').classList.add('d-none');

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
// ----------------- MODAL -----------------
document.querySelector('#btnThem').addEventListener('click', () => {
    document.querySelector('#myModal .update').classList.add('d-none');
    document.querySelector('#btnThemNV').classList.remove('d-none');
    
    document.querySelector('#frmThemNV').classList.remove('was-validated');
});

// ---------------------------- VALIDATION ----------------------------------
function checkValidation(form) {
    // Check not-input
    if (!form.checkValidity()) {
        let arrNotInput = document.querySelectorAll('form .not-input');
        console.log(arrNotInput);
        for (let input of arrNotInput) {
            input.classList.remove('d-none');
            input.classList.add('invalid-feedback');
        }
        form.classList.add('was-validated');
        return false;
    }
    // Check user
    
    // Nếu hợp lệ mọi điều kiện, return true;
    return true;
}



// function checkValidation(form) {
//     let newUser = document.querySelector('#user');
//     newUser.setCustomValidity('');

//     if (!form.checkValidity()) {
//         form.classList.add('was-validated'); // Nếu chưa hợp lệ khi bấm submit thì mới kích hoạt hiệu ứng xanh/đỏ theo Bootstrap
//         return false;
//     }
//     // Check User
//     let arrNhanVien = danhSachNV.arrNhanVien;
//     let userFeedback = newUser.parentElement.querySelector('.invalid-feedback');

//     userFeedback.innerHTML = 'Vui lòng nhập tài khoản';

//     // let existUser = false;
//     for (let oldUsers of arrNhanVien) {
//         if (oldUsers.user == newUser.value) {
//             newUser.setCustomValidity('Tài khoản đã tồn tại');
//             userFeedback.innerHTML = 'Tài khoản đã tồn tại';
//             form.classList.add('was-validated');
//             console.log('Trùng');
//             return false;
//         }
//     }
//     // Nếu hợp lệ các pattern → return true
//     return true;
// }
// --------------------------------------------------------------------------
document.querySelector('#btnThemNV').onclick = function (e) {
    e.preventDefault();

    if (!checkValidation(document.querySelector('#frmThemNV'))) return;
    console.log(!checkValidation(document.querySelector('#frmThemNV')));


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
//------------------
const pwInput = document.querySelector('#testPassword');

pwInput.addEventListener('input', function () {
    const value = pwInput.value;

    // Kiểm tra điều kiện
    const isLongEnough = value.length >= 6;
    const hasUppercase = /[A-Z]/.test(value);
    const hasNumber = /[0-9]/.test(value);

    // Cập nhật màu sắc và biểu tượng
    updateRule('rule-length', isLongEnough);
    updateRule('rule-uppercase', hasUppercase);
    updateRule('rule-number', hasNumber);
});

function updateRule(id, isValid) {
    const el = document.getElementById(id);
    el.classList.remove('text-success', 'text-danger', 'text-muted');

    if (isValid) {
        el.classList.add('text-success');
        el.innerHTML = '✔ ' + el.innerHTML.replace(/^[–✔❌]\s*/, '');
    } else {
        el.classList.add('text-danger');
        el.innerHTML = '❌ ' + el.innerHTML.replace(/^[–✔❌]\s*/, '');
    }
}