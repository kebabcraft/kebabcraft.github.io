function toggleTheme() {
    const body = document.body;
    const isLight = body.classList.toggle('light');
    localStorage.setItem('theme', isLight ? 'light' : 'dark');
}

window.addEventListener('DOMContentLoaded', () => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
        document.body.classList.add('light');
    }
});

function addSkinHoverTilt() {
    const hitboxes = document.querySelectorAll('.dev-card');

    hitboxes.forEach(hitbox => {
        const card = hitbox.querySelector('.skin');

        hitbox.addEventListener('mousemove', (e) => {
            const rect = hitbox.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = ((y - centerY) / centerY) * 35;
            const rotateY = ((x - centerX) / centerX) * 35;

            card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        });

        hitbox.addEventListener('mouseleave', () => {
            card.style.transform = 'rotateX(0deg) rotateY(0deg)';
        });
    });
}


window.addEventListener('DOMContentLoaded', () => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
        document.body.classList.add('light');
    }

    addSkinHoverTilt(); // Enable tilt effect
});
