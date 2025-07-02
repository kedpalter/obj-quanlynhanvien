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

// function validUsername() {
//     const userRegex = /^[0-9]{4,6}$/;
//     let userInput = document.querySelector('#user').value;
//     if (userInput == '') {
//         document.querySelector('#tbTKNV').innerHTML = 'Vui lòng nhập tài khoản';
//         return false;
//     } else if (!userRegex.test(userInput)) {
//         document.querySelector('#tbTKNV').innerHTML = 'Tài khoản là dãy số 4-6 ký tự';
//         return false;
//     } else {
//         document.querySelector('#tbTKNV').innerHTML = '';
//         return true;
//     }
// }

// function validName() {
//     const nameRegex = /^[A-Za-zÀ-ỹĐđ\s]+$/;
//     let nameInput = document.querySelector('#fullName').value;
//     let nameFeedback = document.querySelector('#tbTen');
//     if (nameInput == '') {
//         nameFeedback.innerHTML = 'Vui lòng nhập Họ tên';
//         return false;
//     } else if (!nameRegex.test(nameInput)) {
//         nameFeedback.innerHTML = 'Họ tên không hợp lệ';
//         return false;
//     } else {
//         nameFeedback.innerHTML = '';
//         return true;
//     }
// }
// function validEmail() {
//     const emailRegex = /^[a-zA-Z0-9._\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$/;
//     let emailInput = document.querySelector('#email').value;
//     let emailFeedback = document.querySelector('#tbEmail');
//     if (emailInput == '') {
//         emailFeedback.innerHTML = 'Vui lòng nhập Email';
//         return false;
//     } else if (!emailRegex.test(emailInput)) {
//         emailFeedback.innerHTML = 'Email không hợp lệ';
//         return false;
//     } else {
//         emailFeedback.innerHTML = '';
//         return true;
//     }

// }
// --------------------- VALIDATION ALL INPUT --------------------
function checkValidation(direct) {
    switch (direct) {
        case "user": {
            const userRegex = /^[0-9]{4,6}$/;
            let userInput = document.querySelector('#user').value;
            if (userInput == '') {
                document.querySelector('#tbTKNV').innerHTML = 'Vui lòng nhập tài khoản';
                return false;
            } else if (!userRegex.test(userInput)) {
                document.querySelector('#tbTKNV').innerHTML = 'Tài khoản là dãy số 4-6 ký tự';
                return false;
            } else {
                document.querySelector('#tbTKNV').innerHTML = '';
                return true;
            }
        }

        case "fullName": {
            const nameRegex = /^[A-Za-zÀ-ỹĐđ\s]+$/;
            let nameInput = document.querySelector('#fullName').value;
            let nameFeedback = document.querySelector('#tbTen');
            if (nameInput == '') {
                nameFeedback.innerHTML = 'Vui lòng nhập Họ tên';
                return false;
            } else if (!nameRegex.test(nameInput)) {
                nameFeedback.innerHTML = 'Họ tên không hợp lệ';
                return false;
            } else {
                nameFeedback.innerHTML = '';
                return true;
            }
        }

        case "email": {
            const emailRegex = /^[a-zA-Z0-9._\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$/;
            let emailInput = document.querySelector('#email').value;
            let emailFeedback = document.querySelector('#tbEmail');
            if (emailInput == '') {
                emailFeedback.innerHTML = 'Vui lòng nhập Email';
                return false;
            } else if (!emailRegex.test(emailInput)) {
                emailFeedback.innerHTML = 'Email không hợp lệ';
                return false;
            } else {
                emailFeedback.innerHTML = '';
                return true;
            }
        }
        case "password":
            let passwordInput = document.querySelector('#password').value;
            const isLongRegex = (passwordInput.length >= 6) && (passwordInput.length <= 10);
            const uppercaseRegex = /[A-Z]/.test(passwordInput);
            const numberRegex = /[0-9]/.test(passwordInput);
            const symbolRegex = /[^A-Za-z0-9\s]/.test(passwordInput);

            updateRule('rule-length', isLongRegex);
            updateRule('rule-uppercase', uppercaseRegex);
            updateRule('rule-number', numberRegex);
            updateRule('rule-symbol', symbolRegex);

            function updateRule(id, isValid) {
                let ruleFeedback = document.getElementById(id);
                ruleFeedback.classList.remove('text-success', 'text-danger', 'text-muted');

                if (isValid) {
                    ruleFeedback.classList.add('text-success');
                    ruleFeedback.innerHTML = '✔ ' + ruleFeedback.innerHTML.replace(/^[-✔❌]\s*/, '');
                } else {
                    ruleFeedback.classList.add('text-danger');
                    ruleFeedback.innerHTML = '❌ ' + ruleFeedback.innerHTML.replace(/^[-✔❌]\s*/, '');
                }
            }
            if (isLongRegex && uppercaseRegex && numberRegex && symbolRegex) {
                return true;
            } else return false;

        case "date":
            return true;
        case "salary": {
            let salaryInput = document.querySelector('#salary').value;
            let salaryFeedback = document.querySelector('#tbLuongCB');
            if (salaryInput == '') {
                salaryFeedback.innerHTML = 'Lương không được để trống';
                return false;
            } else if ((salaryInput < 1000000) || (salaryInput) > 20000000) {
                salaryFeedback.innerHTML = 'Lương nằm trong khoảng 1.000.000đ - 20.000.000đ';
                return false;
            } else {
                salaryFeedback.innerHTML = '';
                return true;
            }
        }
        case "position":
            // if (document.querySelector('#position').value == '') {
            //     document.querySelector('#tbChucVu').innerHTML = 'Vui lòng chọn chức vụ';
            //     return false;
            // } else return true;
            return true;
        case "workingTime":
            let workTimeInput = document.querySelector('#workingTime').value;
            let workTimeFeedback = document.querySelector('#tbGioLam');

            if (workTimeInput == '') {
                workTimeFeedback.innerHTML = 'Ko lẽ ko đi làm?';
                return false;
            } else if ((workTimeInput < 80) || (workTimeInput > 200)) {
                workTimeFeedback.innerHTML = 'Số giờ làm trong tháng: 80 - 200 giờ';
                return false;
            } else {
                workTimeFeedback.innerHTML = '';
                return true;
            }

    }
}
// ------------------------------------------------------------------

let idInput = [];
for (let tagInput of document.querySelectorAll('.fill-input')) {
    idInput.push(tagInput.id);
}

idInput.forEach((Id) => {
    document.querySelector(`#${Id}`).addEventListener('input', () => {
        checkValidation(Id);
    })
})

function formValidation() {
    let isValid = true;
    let arrInput = document.querySelectorAll('.fill-input');

    arrInput.forEach((input) => {
        let check = checkValidation(input.id);
        if (!check) {
            isValid = false;
        }
    });
    return isValid;
}

// --------------------------------------------------------------------------
document.querySelector('#btnThemNV').onclick = function (e) {
    e.preventDefault();


    if (formValidation()) {
        console.log(formValidation());
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
    } else {
        console.log(formValidation());
    }
}
