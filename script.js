// --- DADOS DA PÁGINA ---
const periodos = [
    { nome: "Triássico", desc: "O início dos dinossauros e a fragmentação da Pangeia.", icon: "🌋" },
    { nome: "Jurássico", desc: "A era de ouro dos gigantes e das florestas exuberantes.", icon: "🌿" },
    { nome: "Cretáceo", desc: "O auge da diversidade e o evento da extinção em massa.", icon: "☄️" }
];

const especies = [
    { nome: "Tiranossauro Rex", fato: "Tinha a mordida mais forte de qualquer animal terrestre." },
    { nome: "Triceratops", fato: "Seu crânio podia chegar a 2,5 metros de comprimento." },
    { nome: "Braquiossauro", fato: "Pesava o equivalente a 12 elefantes africanos." }
];

// --- RENDERIZAÇÃO DINÂMICA ---
function init() {
    const container = document.getElementById('periods-container');
    periodos.forEach(p => {
        container.innerHTML += `
            <article class="card">
                <h3>${p.icon} ${p.nome}</h3>
                <p>${p.desc}</p>
            </article>
        `;
    });

    const track = document.getElementById('carousel-track');
    especies.forEach(e => {
        track.innerHTML += `
            <div class="slide">
                <h3>${e.nome}</h3>
                <p>${e.fato}</p>
            </div>
        `;
    });
}

// --- GESTÃO DE ACESSIBILIDADE (FONTE) ---
let fontSize = 100;
document.getElementById('font-increase').addEventListener('click', () => {
    fontSize += 10;
    document.documentElement.style.fontSize = `${fontSize}%`;
});

document.getElementById('font-decrease').addEventListener('click', () => {
    fontSize -= 10;
    document.documentElement.style.fontSize = `${fontSize}%`;
});

// --- ALTO CONTRASTE ---
document.getElementById('contrast-toggle').addEventListener('click', () => {
    document.body.classList.toggle('high-contrast');
});

// --- CARROSSEL ---
let currentSlide = 0;
document.getElementById('next-btn').addEventListener('click', () => {
    currentSlide = (currentSlide + 1) % especies.length;
    updateCarousel();
});

document.getElementById('prev-btn').addEventListener('click', () => {
    currentSlide = (currentSlide - 1 + especies.length) % especies.length;
    updateCarousel();
});

function updateCarousel() {
    const track = document.getElementById('carousel-track');
    track.style.transform = `translateX(-${currentSlide * 100}%)`;
}

// --- SCROLL REVEAL ---
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

window.onload = init;
