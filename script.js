document.addEventListener('DOMContentLoaded', function () {
    const sliderContainer = document.querySelector('#diploma-slider');
    
    if (sliderContainer && typeof Swiper !== 'undefined') {
        const swiper = new Swiper('#diploma-slider', {
            loop: true,
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
            scrollbar: {
                el: '.swiper-scrollbar',
                draggable: true,
            },
        });
    }

    const dialogWindow = document.getElementById('dialog');
    const dialogImg = document.getElementById('modal-img');
    const dialogBody = document.querySelector('.dialog-body');
    const closeButtons = document.querySelectorAll('.dialog-close, .modal-close-dot');
    const certImages = document.querySelectorAll('.swiper-slide img');

    let isZoomed = false;

    if (dialogWindow && dialogImg && dialogBody) {
        certImages.forEach(img => {
            img.style.cursor = 'zoom-in';
            
            img.addEventListener('click', function() {
                dialogWindow.style.display = 'flex';
                dialogImg.src = this.src;
                document.body.style.overflow = 'hidden';
            });
        });

        dialogImg.addEventListener('click', function(e) {
            e.stopPropagation(); 
            
            if (!isZoomed) {
                dialogBody.style.display = 'block';
                this.style.width = '150%'; 
                this.style.maxWidth = 'none';
                this.style.maxHeight = 'none';
                this.style.cursor = 'zoom-out';
                
                isZoomed = true;
            } else {
                resetZoom();
            }
        });


        closeButtons.forEach(btn => {
            if (btn) {
                btn.addEventListener('click', closeDialog);
            }
        });

        dialogWindow.addEventListener('click', function(e) {
            if (e.target === dialogWindow) {
                closeDialog();
            }
        });
    }

    function resetZoom() {
        if (dialogImg && dialogBody) {
            dialogBody.style.display = 'flex';
            dialogImg.style.width = 'auto';
            dialogImg.style.maxWidth = '100%';
            dialogImg.style.maxHeight = '70vh';
            dialogImg.style.cursor = 'zoom-in';
            isZoomed = false;
        }
    }

    function closeDialog() {
        if (dialogWindow) {
            dialogWindow.style.display = 'none';
            resetZoom();
            document.body.style.overflow = '';
        }
    }

    const mailBtn = document.querySelector('.mail-btn');
    const mailToast = document.querySelector('.mail-toast');

    if (mailBtn && mailToast) {
        mailBtn.addEventListener('click', function() {
            const emailText = this.getAttribute('data-email');
            
            navigator.clipboard.writeText(emailText).then(() => {
                mailToast.classList.add('show');
                setTimeout(() => {
                    mailToast.classList.remove('show');
                }, 1500);
            });
        });
    }
});
