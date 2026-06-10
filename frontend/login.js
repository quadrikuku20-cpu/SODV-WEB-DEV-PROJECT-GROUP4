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
        event.preventDefault(); // prevent the form send automatic

        let isValid = true;

        // Reset error
        nameError.textContent = '';
        phoneError.textContent = '';
        emailError.textContent = '';
        usernameError.textContent = '';
        passwordError.textContent = '';
        roleError.textContent = '';

        // Validate Name
        if (nameInput.value.trim() === '') {
            nameError.textContent = 'Name must have no space';
            isValid = false;
        }

        // Validate Phone (10 numbers)
        const phoneRegex = /^[0-9]{10}$/;
        if (!phoneRegex.test(phoneInput.value.trim())) {
            phoneError.textContent = 'Phone must be 10 numbers';
            isValid = false;
        }

        // Validate Email
        const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
        if (!emailRegex.test(emailInput.value.trim())) {
            emailError.textContent = 'Email not valid';
            isValid = false;
        }

        // Validate Username
        if (usernameInput.value.trim() === '') {
            usernameError.textContent = 'Username must have no space';
            isValid = false;
        }

        // Validate Password (ít nhất 6 ký tự)
        if (passwordInput.value.length < 6) {
            passwordError.textContent = 'Password need minimum 6 digits.';
            isValid = false;
        }

        // Validate Role
        if (roleSelect.value === '') {
            roleError.textContent = 'Choose your role';
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
