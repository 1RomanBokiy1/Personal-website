document.addEventListener('DOMContentLoaded', function () {

    const form = document.getElementById('feedbackForm');
    const resumeInput = document.getElementById('resume');
    const fileUploadBox = document.getElementById('fileUploadBox');
    const fileUploadText = document.getElementById('fileUploadText');
    const modal = document.getElementById('customModal');
    const closeModal = document.getElementById('closeModal');

    function showModal() {
        modal.classList.add('active');
    }

    closeModal.addEventListener('click', function () {
        modal.classList.remove('active');
    });

    if (!form) return;
    
    resumeInput.addEventListener('change', function () {

        clearFileError();

        const file = this.files[0];
        if (!file) return;

        const maxSize = 5 * 1024 * 1024; // 5MB

        if (file.size > maxSize) {
            showFileError('Файл слишком большой (макс. 5MB)');
            this.value = '';
            return;
        }

        const allowedTypes = [
            'application/pdf',
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
        ];

        if (!allowedTypes.includes(file.type)) {
            showFileError('Разрешены только PDF или DOCX файлы');
            this.value = '';
            return;
        }

        fileUploadBox.classList.remove('error');
        fileUploadBox.classList.add('success');
        fileUploadText.textContent = `Файл: ${file.name}`;
    });

    form.addEventListener('submit', function (event) {
        event.preventDefault();

        clearErrors();
        clearFileError();

        let isValid = true;

        const fullname = document.getElementById('fullname');
        const email = document.getElementById('email');
        const agreement = document.getElementById('agreement');

        const fullnameValue = fullname.value.trim();
        const emailValue = email.value.trim(); 
        const words = fullnameValue.split(' ').filter(word => word.length > 0);
        
        if (fullnameValue === '' || words.length < 2) {
            showError(fullname, 'Введите корректное ФИО');
            isValid = false;
        }

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (emailValue === '' || !emailPattern.test(emailValue)) {
            showError(email, 'Введите корректный Email');
            isValid = false;
        }

        const file = resumeInput.files[0];

        if (!file) {
            showFileError('Загрузите резюме (PDF или DOCX)');
            isValid = false;
        }

        if (!agreement.checked) {
            alert('Необходимо согласие на обработку данных');
            isValid = false;
        }

        if (isValid) {

            const formData = {
                fullname: fullnameValue,
                email: emailValue,
                resume: file.name
            };

            const customEvent = new CustomEvent('formValid', { detail: formData });
            document.dispatchEvent(customEvent);

            showModal();
            form.reset();
            fileUploadText.textContent = '↓ Загрузите резюме (PDF или DOCX, до 5MB)';
            fileUploadBox.classList.remove('success');
            fileUploadBox.classList.remove('error');

        }
    });

    function showError(input, message) {
        input.classList.add('input-error');

        const error = document.createElement('div');
        error.classList.add('error-message');
        error.textContent = message;

        input.parentNode.appendChild(error);
    }

    function clearErrors() {
        document.querySelectorAll('.error-message').forEach(el => el.remove());
        document.querySelectorAll('.form-input').forEach(el => {
            el.classList.remove('input-error');
        });
    }

    function showFileError(message) {
        fileUploadBox.classList.add('error');

        const error = document.createElement('div');
        error.classList.add('error-message');
        error.textContent = message;

        fileUploadBox.appendChild(error);
    }

    function clearFileError() {
        fileUploadBox.classList.remove('error');
        document.querySelectorAll('#fileUploadBox .error-message').forEach(el => el.remove());
    }

});
