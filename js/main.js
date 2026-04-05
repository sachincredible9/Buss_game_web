document.addEventListener('DOMContentLoaded', () => {
    const externalLinks = document.querySelectorAll('.external-link');
    const modal = document.getElementById('parental-gate');
    const input = document.getElementById('gate-answer');
    const submitBtn = document.getElementById('gate-submit');
    const cancelBtn = document.getElementById('gate-cancel');
    const num1Span = document.getElementById('num1');
    const num2Span = document.getElementById('num2');

    let currentTarget = null;
    let expectedAnswer = 0;

    // Show parental gate for all external links
    externalLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            currentTarget = link.href;
            showGate();
        });
    });

    function showGate() {
        // Generate simple math problem
        const n1 = Math.floor(Math.random() * 10) + 1;
        const n2 = Math.floor(Math.random() * 10) + 1;
        num1Span.textContent = n1;
        num2Span.textContent = n2;
        expectedAnswer = n1 + n2;
        input.value = '';
        modal.classList.remove('hidden');
    }

    function closeGate() {
        modal.classList.add('hidden');
    }

    function checkGate() {
        if (parseInt(input.value) === expectedAnswer) {
            window.open(currentTarget, '_blank');
            closeGate();
        } else {
            alert('Incorrect answer. Please try again.');
            showGate();
        }
    }

    submitBtn.addEventListener('click', checkGate);
    cancelBtn.addEventListener('click', closeGate);

    // Fade-in animations on scroll
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.glass-card').forEach(card => {
        // Simple entry animation
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });

    // Custom visible class for observer
    const style = document.createElement('style');
    style.innerHTML = `
        .visible {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
    document.head.appendChild(style);
});
