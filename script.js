document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('.navbar a');
    const sections = document.querySelectorAll('section');
    const rightPanel = document.querySelector('.right-panel');

    // 点击导航平滑滚动
    navLinks.forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            // 将目标模块滚动到可视区域
            targetSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });

            // 立即更新高亮状态
            navLinks.forEach(link => link.classList.remove('active'));
            this.classList.add('active');
        });
    });

    // 判断是否为桌面端（基于 CSS 媒体查询断点）
    const isDesktop = window.innerWidth > 1024;
    
    // 滚动监听器：精准匹配当前阅读的模块
    const observerOptions = {
        // 如果是电脑端，监听右侧滚动条；如果是手机端，监听整个窗口
        root: isDesktop ? rightPanel : null, 
        rootMargin: '0px 0px -40% 0px', // 当内容划过屏幕 40% 时触发高亮
        threshold: 0.1 
    };

    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const currentSectionId = entry.target.id;
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${currentSectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, observerOptions);

    // 开始监听所有 Section
    sections.forEach(section => {
        sectionObserver.observe(section);
    });
});