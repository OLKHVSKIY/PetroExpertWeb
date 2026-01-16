// DTP Circumstances Page Scripts
document.addEventListener('DOMContentLoaded', () => {
    initPaymentMethodsModal();
    initPDFViewer();
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
    const pdfPrintButton = document.getElementById('pdfPrintButton');

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
