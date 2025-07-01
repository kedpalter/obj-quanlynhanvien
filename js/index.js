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
            break;
        case "salary":
            break;
        case "position":
            break;
        case "workingTime":
            break;
    }
}
// ------------------------------------------------------------------

let idInput = [];
for (let tagInput of document.querySelectorAll('.fill-input')) {
    idInput.push(tagInput.id);
}
console.log(idInput);
idInput.forEach((value) => {
    document.querySelector(`#${value}`).addEventListener('input', () => {
        checkValidation(value);
    })
})

// document.querySelector('#user').addEventListener('input', () => {
//     validUsername();
// });
// document.querySelector('#fullName').addEventListener('input', () => {
//     validName();
// })
// document.querySelector('#email').addEventListener('input', () => {
//     validEmail();
// })


// function checkValidation(form) {
//     // Check not-input
//     if (!form.checkValidity()) {
//         let arrNotInput = document.querySelectorAll('form .not-input');
//         console.log(arrNotInput);
//         for (let input of arrNotInput) {
//             input.classList.remove('d-none');
//             input.classList.add('invalid-feedback');
//         }
//         form.classList.add('was-validated');
//         return false;
//     }
//     // Check user

//     // Nếu hợp lệ mọi điều kiện, return true;
//     return true;
// }



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
