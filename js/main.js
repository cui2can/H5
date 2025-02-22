document.addEventListener('DOMContentLoaded', function() {
    const slides = document.querySelectorAll('.slide');
    const prevBtn = document.querySelector('.prev');
    const nextBtn = document.querySelector('.next');
    let currentSlide = 0;

    // 添加图片加载错误处理
    slides.forEach(slide => {
        const img = slide.querySelector('img');
        if (img) {
            img.onerror = function() {
                this.src = 'assets/placeholder.png';
                console.error('PNG图片加载失败:', this.src);
            };
            
            // 确保图片已经加载
            if (img.complete) {
                imageLoaded(img);
            } else {
                img.addEventListener('load', () => imageLoaded(img));
            }
        }
    });

    function imageLoaded(img) {
        console.log('PNG图片加载成功:', img.src);
    }

    // 初始化第一张幻灯片
    slides[0].classList.add('active');

    // 切换到指定幻灯片
    function showSlide(index) {
        slides.forEach(slide => slide.classList.remove('active'));
        slides[index].classList.add('active');
    }

    // 下一张
    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    }

    // 上一张
    function prevSlide() {
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        showSlide(currentSlide);
    }

    // 绑定按钮事件
    nextBtn.addEventListener('click', nextSlide);
    prevBtn.addEventListener('click', prevSlide);

    // 添加触摸滑动支持
    let touchStartX = 0;
    let touchEndX = 0;

    document.addEventListener('touchstart', e => {
        touchStartX = e.changedTouches[0].screenX;
    });

    document.addEventListener('touchend', e => {
        touchEndX = e.changedTouches[0].screenX;
        if (touchStartX - touchEndX > 50) {
            nextSlide();
        } else if (touchEndX - touchStartX > 50) {
            prevSlide();
        }
    });
});