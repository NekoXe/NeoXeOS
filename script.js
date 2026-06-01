// 主题切换
const themeBtn = document.getElementById('themeToggleBtn');
const bodyEl = document.body;
const themeLabel = document.getElementById('themeLabel');
const themeIcon = document.getElementById('themeIcon');
function setTheme(theme) {
    if (theme === 'dark') {
        bodyEl.classList.add('dark');
        localStorage.setItem('neoxe_theme', 'dark');
        themeLabel.innerText = '深色';
        themeIcon.className = 'fas fa-moon';
    } else {
        bodyEl.classList.remove('dark');
        localStorage.setItem('neoxe_theme', 'light');
        themeLabel.innerText = '浅色';
        themeIcon.className = 'fas fa-sun';
    }
}
const saved = localStorage.getItem('neoxe_theme');
if (saved === 'dark') setTheme('dark');
else setTheme('light');
themeBtn.addEventListener('click', () => {
    const isDark = bodyEl.classList.contains('dark');
    setTheme(isDark ? 'light' : 'dark');
});

// 页面切换
const navBtns = document.querySelectorAll('.nav-btn');
const pages = document.querySelectorAll('.page-content');
navBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const target = btn.getAttribute('data-page');
        navBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        pages.forEach(p => p.classList.remove('active-page'));
        document.getElementById(target).classList.add('active-page');
    });
});

// 动态加载图片（无图则隐藏整个区域）
function loadImages(seriesName, container) {
    if (!container) return;
    container.innerHTML = '';
    const base = `/img/${seriesName}/`;
    const exts = ['1.webp', '2.webp', '1.png', '2.png', '1.jpg', '2.jpg'];
    let hasAny = false;
    exts.forEach(file => {
        const img = new Image();
        img.style.maxWidth = '200px';
        img.style.height = 'auto';
        img.style.borderRadius = '12px';
        img.alt = `${seriesName} preview`;
        img.onload = () => {
            container.appendChild(img);
            hasAny = true;
            if (container.style.display === 'none') container.style.display = '';
        };
        img.onerror = () => {};
        img.src = base + file;
    });
    setTimeout(() => {
        if (container.children.length === 0) {
            container.style.display = 'none';
        } else {
            container.style.display = '';
        }
    }, 150);
}
const groups = { Ultra:'Ultra', Elite:'Elite', Max:'Max', Slim:'Slim', SuperLite:'SuperLite', Arm:'Arm', RE:'RE' };
for (const [id, name] of Object.entries(groups)) {
    const el = document.getElementById(`imgGroup-${id}`);
    if (el) loadImages(name, el);
}

// 版本展开/折叠
document.querySelectorAll('.version-item').forEach(item => {
    const sum = item.querySelector('.version-summary');
    const wrap = item.querySelector('.version-detail-wrapper');
    const icon = sum?.querySelector('.expand-icon');
    if (sum && wrap) {
        sum.addEventListener('click', (e) => {
            e.stopPropagation();
            const isShow = wrap.classList.contains('show');
            if (isShow) {
                wrap.classList.remove('show');
                icon?.classList.remove('fa-chevron-up');
                icon?.classList.add('fa-chevron-down');
            } else {
                wrap.classList.add('show');
                icon?.classList.remove('fa-chevron-down');
                icon?.classList.add('fa-chevron-up');
            }
        });
    }
});

// 问答展开
document.querySelectorAll('.qa-item').forEach(item => {
    const q = item.querySelector('.qa-question');
    const wrap = item.querySelector('.qa-answer-wrapper');
    const icon = q?.querySelector('.expand-icon');
    if (q && wrap) {
        q.addEventListener('click', () => {
            const isShow = wrap.classList.contains('show');
            if (isShow) {
                wrap.classList.remove('show');
                icon?.classList.remove('fa-chevron-up');
                icon?.classList.add('fa-chevron-down');
            } else {
                wrap.classList.add('show');
                icon?.classList.remove('fa-chevron-down');
                icon?.classList.add('fa-chevron-up');
            }
        });
    }
});
