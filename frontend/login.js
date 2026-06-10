document.addEventListener('DOMContentLoaded', () => {
    const registrationForm = document.getElementById('registrationForm');
    const nameInput = document.getElementById('name');
    const phoneInput = document.getElementById('phone');
    const emailInput = document.getElementById('email');
    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');
    const roleSelect = document.getElementById('role');

    const nameError = document.getElementById('nameError');
    const phoneError = document.getElementById('phoneError');
    const emailError = document.getElementById('emailError');
    const usernameError = document.getElementById('usernameError');
    const passwordError = document.getElementById('passwordError');
    const roleError = document.getElementById('roleError');

    registrationForm.addEventListener('submit', (event) => {
        event.preventDefault(); // Ngăn chặn form gửi đi mặc định
        let isValid = true;

        // Reset lỗi
        nameError.textContent = '';
        phoneError.textContent = '';
        emailError.textContent = '';
        usernameError.textContent = '';
        passwordError.textContent = '';
        roleError.textContent = '';

        // Validate Name
        if (nameInput.value.trim() === '') {
            nameError.textContent = 'Họ và tên không được để trống.';
            isValid = false;
        }

        // Validate Phone (10 số)
        const phoneRegex = /^[0-9]{10}$/;
        if (!phoneRegex.test(phoneInput.value.trim())) {
            phoneError.textContent = 'Số điện thoại phải có 10 chữ số.';
            isValid = false;
        }

        // Validate Email
        const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
        if (!emailRegex.test(emailInput.value.trim())) {
            emailError.textContent = 'Email không hợp lệ.';
            isValid = false;
        }

        // Validate Username
        if (usernameInput.value.trim() === '') {
            usernameError.textContent = 'Tên đăng nhập không được để trống.';
            isValid = false;
        }

        // Validate Password (ít nhất 6 ký tự)
        if (passwordInput.value.length < 6) {
            passwordError.textContent = 'Mật khẩu phải có ít nhất 6 ký tự.';
            isValid = false;
        }

        // Validate Role
        if (roleSelect.value === '') {
            roleError.textContent = 'Vui lòng chọn vai trò.';
            isValid = false;
        }

        if (isValid) {
            // Nếu tất cả đều hợp lệ, gửi dữ liệu form lên server
            // Đây là nơi bạn sẽ sử dụng fetch() để gửi dữ liệu đến backend/server.js
            console.log('Form hợp lệ, gửi dữ liệu...');
            // Ví dụ: 
            // fetch('/register', {
            //     method: 'POST',
            //     headers: {
            //         'Content-Type': 'application/json',
            //     },
            //     body: JSON.stringify({
            //         name: nameInput.value,
            //         phone: phoneInput.value,
            //         email: emailInput.value,
            //         username: usernameInput.value,
            //         password: passwordInput.value,
            //         role: roleSelect.value
            //     }),
            // })
            // .then(response => response.json())
            // .then(data => {
            //     console.log('Success:', data);
            //     // Xử lý phản hồi từ server (ví dụ: chuyển hướng người dùng)
            // })
            // .catch((error) => {
            //     console.error('Error:', error);
            //     // Xử lý lỗi
            // });
        }
    });
});