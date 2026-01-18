// Handwriting Text Expertise Page Scripts
document.addEventListener('DOMContentLoaded', () => {
    initPaymentMethodsModal();
    initPDFViewer();
    initConsultationForm();
});

// Payment Methods Modal
function initPaymentMethodsModal() {
    const paymentMethodsButton = document.getElementById('paymentMethodsButton');
    const paymentMethodsModal = document.getElementById('paymentMethodsModal');
    const paymentMethodsModalClose = document.getElementById('paymentMethodsModalClose');
    const paymentMethodsModalOverlay = paymentMethodsModal?.querySelector('.payment-methods-modal-overlay');

    if (!paymentMethodsButton || !paymentMethodsModal) return;

    // Open modal
    paymentMethodsButton.addEventListener('click', function(e) {
        e.preventDefault();
        paymentMethodsModal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
        
        // Animate in
        requestAnimationFrame(() => {
            paymentMethodsModal.classList.add('active');
        });
    });

    // Close modal functions
    function closeModal() {
        paymentMethodsModal.classList.remove('active');
        setTimeout(() => {
            paymentMethodsModal.style.display = 'none';
            document.body.style.overflow = '';
        }, 300);
    }

    // Close button
    if (paymentMethodsModalClose) {
        paymentMethodsModalClose.addEventListener('click', closeModal);
    }

    // Close on overlay click
    if (paymentMethodsModalOverlay) {
        paymentMethodsModalOverlay.addEventListener('click', closeModal);
    }

    // Close on ESC key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && paymentMethodsModal.classList.contains('active')) {
            closeModal();
        }
    });
}

// PDF Viewer
function initPDFViewer() {
    const downloadBlankButton = document.getElementById('downloadBlankButton');
    const pdfViewerModal = document.getElementById('pdfViewerModal');
    const pdfViewerModalClose = document.getElementById('pdfViewerModalClose');
    const pdfViewerModalOverlay = pdfViewerModal?.querySelector('.pdf-viewer-modal-overlay');

    if (!downloadBlankButton || !pdfViewerModal) return;

    // Open PDF viewer
    downloadBlankButton.addEventListener('click', function(e) {
        e.preventDefault();
        pdfViewerModal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
        
        // Animate in
        requestAnimationFrame(() => {
            pdfViewerModal.classList.add('active');
        });
    });

    // Close modal functions
    function closeModal() {
        pdfViewerModal.classList.remove('active');
        setTimeout(() => {
            pdfViewerModal.style.display = 'none';
            document.body.style.overflow = '';
        }, 300);
    }

    // Close button
    if (pdfViewerModalClose) {
        pdfViewerModalClose.addEventListener('click', closeModal);
    }

    // Close on overlay click
    if (pdfViewerModalOverlay) {
        pdfViewerModalOverlay.addEventListener('click', closeModal);
    }

    // Close on ESC key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && pdfViewerModal.classList.contains('active')) {
            closeModal();
        }
    });
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