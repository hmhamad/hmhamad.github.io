// Mobile Navigation Toggle
document.addEventListener('DOMContentLoaded', function() {
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');

    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Close menu when clicking a link
        navMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', function() {
                navToggle.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
                navToggle.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });
    }

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]:not(.toc-link)').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const navHeight = document.querySelector('.navbar').offsetHeight;
                const targetRect = target.getBoundingClientRect();
                const targetPosition = window.scrollY + targetRect.top - navHeight - 20;
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Navbar background on scroll
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
        } else {
            navbar.style.boxShadow = 'none';
        }
    });
});

// Quiz reveal functionality
function revealAnswer(quizId) {
    const quizCard = document.getElementById(quizId);
    if (!quizCard) return;
    
    const answer = quizCard.querySelector('.quiz-answer');
    const btn = quizCard.querySelector('.quiz-reveal-btn');
    
    if (answer.classList.contains('revealed')) {
        // Hide answer
        answer.classList.remove('revealed');
        quizCard.classList.remove('answered');
        btn.innerHTML = '<i class="fas fa-lightbulb"></i> Reveal Answer';
    } else {
        // Show answer
        answer.classList.add('revealed');
        quizCard.classList.add('answered');
        btn.innerHTML = '<i class="fas fa-eye-slash"></i> Hide Answer';
    }
}

// Table of Contents scroll spy
document.addEventListener('DOMContentLoaded', function() {
    const tocLinks = document.querySelectorAll('.toc-link');
    if (tocLinks.length === 0) return;

    const sections = [];
    tocLinks.forEach(link => {
        const id = link.getAttribute('href').slice(1);
        const section = document.getElementById(id);
        if (section) sections.push({ id, el: section, link });
    });

    function updateActiveLink() {
        const scrollPos = window.scrollY + 150;
        
        let current = sections[0];
        for (const section of sections) {
            if (section.el.offsetTop <= scrollPos) {
                current = section;
            }
        }

        tocLinks.forEach(link => link.classList.remove('active'));
        if (current) current.link.classList.add('active');
    }

    window.addEventListener('scroll', updateActiveLink);
    updateActiveLink();

    // Smooth scroll for TOC links
    tocLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            const id = this.getAttribute('href').slice(1);
            const target = document.getElementById(id);
            if (target) {
                const navHeight = document.querySelector('.navbar').offsetHeight;
                const targetRect = target.getBoundingClientRect();
                const targetPosition = window.scrollY + targetRect.top - navHeight - 20;
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
});

// Copy citation to clipboard
function copyCitation(btn) {
    const code = btn.parentElement.querySelector('code');
    const text = code.textContent;
    
    navigator.clipboard.writeText(text).then(() => {
        // Show feedback
        const icon = btn.querySelector('i');
        icon.classList.remove('fa-copy');
        icon.classList.add('fa-check');
        
        setTimeout(() => {
            icon.classList.remove('fa-check');
            icon.classList.add('fa-copy');
        }, 2000);
    });
}

// Add copy buttons to all code blocks
document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.blog-post-content pre:not(.citation-box)').forEach(pre => {
        const btn = document.createElement('button');
        btn.className = 'code-copy-btn';
        btn.innerHTML = '<i class="fas fa-copy"></i>';
        btn.onclick = function() {
            const code = pre.querySelector('code');
            const text = code ? code.textContent : pre.textContent;
            
            navigator.clipboard.writeText(text).then(() => {
                const icon = btn.querySelector('i');
                icon.classList.remove('fa-copy');
                icon.classList.add('fa-check');
                
                setTimeout(() => {
                    icon.classList.remove('fa-check');
                    icon.classList.add('fa-copy');
                }, 2000);
            });
        };
        pre.appendChild(btn);
    });
});

// Auto-number sidenotes
document.addEventListener('DOMContentLoaded', function() {
    const refs = document.querySelectorAll('.sidenote-ref');
    const numbers = document.querySelectorAll('.sidenote-number');
    
    refs.forEach((ref, i) => {
        ref.textContent = i + 1;
    });
    
    numbers.forEach((num, i) => {
        num.textContent = (i + 1) + '.';
    });
});
