// Independent Equipment Expertise Page Scripts
document.addEventListener('DOMContentLoaded', () => {
    initPhoneMasks();
    initCallbackForm();
    initConsultationForm();
});

// Phone input mask function
function initPhoneMasks() {
    const phoneInput = document.getElementById('phoneInput');
    if (phoneInput) {
        phoneInput.addEventListener('input', function(e) {
            let value = e.target.value;
            let digits = value.replace(/\D/g, '');
            
            // Always start with +7
            if (digits.length === 0) {
                e.target.value = '';
                return;
            }
            
            // If user tries to delete +7, prevent it
            if (digits.length === 1 && !value.startsWith('+7')) {
                e.target.value = '+7';
                return;
            }
            
            // Extract digits after 7 (skip the first 7)
            let digitsAfter7 = digits.length > 1 ? digits.substring(1) : '';
            
            // Format the phone number
            if (digitsAfter7.length === 0) {
                value = '+7';
            } else if (digitsAfter7.length <= 3) {
                value = '+7 (' + digitsAfter7;
            } else if (digitsAfter7.length <= 6) {
                value = '+7 (' + digitsAfter7.substring(0, 3) + ') ' + digitsAfter7.substring(3);
            } else if (digitsAfter7.length <= 8) {
                value = '+7 (' + digitsAfter7.substring(0, 3) + ') ' + digitsAfter7.substring(3, 6) + '-' + digitsAfter7.substring(6);
            } else {
                value = '+7 (' + digitsAfter7.substring(0, 3) + ') ' + digitsAfter7.substring(3, 6) + '-' + digitsAfter7.substring(6, 8) + '-' + digitsAfter7.substring(8, 10);
            }
            
            e.target.value = value;
        });
        
        phoneInput.addEventListener('keydown', function(e) {
            // Prevent deleting +7
            if ((e.key === 'Backspace' || e.key === 'Delete') && e.target.value === '+7') {
                e.preventDefault();
                return false;
            }
        });
    }
}

// Callback button handler
function initCallbackForm() {
    const callbackButton = document.querySelector('.autotechnical-callback-button');
    const phoneInput = document.getElementById('phoneInput');
    const privacyCheckbox = document.getElementById('privacyCheckbox');
    
    if (callbackButton) {
        callbackButton.addEventListener('click', function() {
            const phone = phoneInput?.value || '';
            const checked = privacyCheckbox?.checked || false;
            
            if (!phone || phone.length < 18) {
                alert('Пожалуйста, введите корректный номер телефона');
                return;
            }
            
            if (!checked) {
                alert('Необходимо согласие на обработку персональных данных');
                return;
            }
            
            // Here you can add API call or redirect
            window.location.href = 'tel:+78123318180';
        });
    }
}

// Consultation form handler
function initConsultationForm() {
    const individualButton = document.getElementById('individualButton');
    const legalButton = document.getElementById('legalButton');
    const consultationContent = document.getElementById('consultationContent');
    const consultationFormWrapper = document.getElementById('consultationFormWrapper');
    const consultationFormText = document.getElementById('consultationFormText');
    const consultationPhoneInput = document.getElementById('consultationPhoneInput');
    const consultationBanner = document.getElementById('consultationBanner');
    const orderButton = document.getElementById('orderButton');
    
    let isFormVisible = false;
    
    function showForm(text) {
        if (isFormVisible) return;
        isFormVisible = true;
        
        // Set text based on button type
        if (consultationFormText) {
            consultationFormText.textContent = text;
        }
        
        // Hide original content with smooth animation
        if (consultationContent) {
            consultationContent.style.transition = 'opacity 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94), transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
            
            // Use requestAnimationFrame for smooth animation
            requestAnimationFrame(() => {
                consultationContent.style.opacity = '0';
                consultationContent.style.transform = 'translateY(-15px)';
            });
            
            // Hide and position after animation completes
            setTimeout(() => {
                consultationContent.style.visibility = 'hidden';
                consultationContent.style.position = 'absolute';
                consultationContent.style.pointerEvents = 'none';
                
                // Show form wrapper on the same place (right side) after content is hidden
                consultationFormWrapper.style.display = 'flex';
                consultationFormWrapper.style.opacity = '0';
                consultationFormWrapper.style.transform = 'translateX(20px)';
                
                requestAnimationFrame(() => {
                    requestAnimationFrame(() => {
                        consultationFormWrapper.style.transition = 'opacity 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94), transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
                        consultationFormWrapper.style.opacity = '1';
                        consultationFormWrapper.style.transform = 'translateX(0)';
                        consultationPhoneInput?.focus();
                    });
                });
            }, 500);
        }
    }
    
    function hideForm() {
        if (!isFormVisible) return;
        isFormVisible = false;
        
        // Hide form wrapper with smooth animation
        consultationFormWrapper.style.transition = 'opacity 0.4s cubic-bezier(0.4, 0, 0.2, 1), transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)';
        consultationFormWrapper.style.opacity = '0';
        consultationFormWrapper.style.transform = 'translateX(20px)';
        
        setTimeout(() => {
            consultationFormWrapper.style.display = 'none';
            if (consultationPhoneInput) {
                consultationPhoneInput.value = '';
            }
            
            // Show original content with smooth animation
            if (consultationContent) {
                consultationContent.style.position = 'relative';
                consultationContent.style.opacity = '0';
                consultationContent.style.transform = 'translateY(-10px)';
                consultationContent.style.visibility = 'visible';
                consultationContent.style.pointerEvents = 'auto';
                
                requestAnimationFrame(() => {
                    consultationContent.style.transition = 'opacity 0.4s cubic-bezier(0.4, 0, 0.2, 1), transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)';
                    consultationContent.style.opacity = '1';
                    consultationContent.style.transform = 'translateY(0)';
                });
            }
        }, 400);
    }
    
    if (individualButton && consultationFormWrapper) {
        individualButton.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            showForm('Введите номер и менеджер по работе с ФИЗИЧЕСКИМИ ЛИЦАМИ проконсультирует вас.');
        });
    }
    
    if (legalButton && consultationFormWrapper) {
        legalButton.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            showForm('Введите номер и менеджер по работе с ЮРИДИЧЕСКИМИ ЛИЦАМИ проконсультирует вас.');
        });
    }
    
    // Click outside handler
    document.addEventListener('click', function(e) {
        if (isFormVisible && consultationBanner && !consultationBanner.contains(e.target)) {
            hideForm();
        }
    });

    // Phone input mask for consultation form
    if (consultationPhoneInput) {
        consultationPhoneInput.addEventListener('input', function(e) {
            let value = e.target.value;
            let digits = value.replace(/\D/g, '');
            
            // Always start with +7
            if (digits.length === 0) {
                e.target.value = '';
                return;
            }
            
            // If user tries to delete +7, prevent it
            if (digits.length === 1 && !value.startsWith('+7')) {
                e.target.value = '+7';
                return;
            }
            
            // Extract digits after 7 (skip the first 7)
            let digitsAfter7 = digits.length > 1 ? digits.substring(1) : '';
            
            // Format the phone number
            if (digitsAfter7.length === 0) {
                value = '+7';
            } else if (digitsAfter7.length <= 3) {
                value = '+7 (' + digitsAfter7;
            } else if (digitsAfter7.length <= 6) {
                value = '+7 (' + digitsAfter7.substring(0, 3) + ') ' + digitsAfter7.substring(3);
            } else if (digitsAfter7.length <= 8) {
                value = '+7 (' + digitsAfter7.substring(0, 3) + ') ' + digitsAfter7.substring(3, 6) + '-' + digitsAfter7.substring(6);
            } else {
                value = '+7 (' + digitsAfter7.substring(0, 3) + ') ' + digitsAfter7.substring(3, 6) + '-' + digitsAfter7.substring(6, 8) + '-' + digitsAfter7.substring(8, 10);
            }
            
            e.target.value = value;
        });
        
        consultationPhoneInput.addEventListener('keydown', function(e) {
            // Prevent deleting +7
            if ((e.key === 'Backspace' || e.key === 'Delete') && e.target.value === '+7') {
                e.preventDefault();
                return false;
            }
        });
    }

    // Order button handler
    if (orderButton && consultationPhoneInput) {
        orderButton.addEventListener('click', function() {
            const phone = consultationPhoneInput.value || '';
            
            if (!phone || phone.length < 18) {
                alert('Пожалуйста, введите корректный номер телефона');
                return;
            }
            
            // Here you can add API call or redirect
            window.location.href = 'tel:+78123318180';
        });
    }
}