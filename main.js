function tocaSom(seletorAudio) {
    const elemento = document.querySelector(seletorAudio);

    if (elemento && elemento.localName === 'audio') {
        // Volta ao início para que toques rápidos seguidos sejam todos ouvidos
        elemento.currentTime = 0;
        elemento.play();
    } else {
        console.log('Elemento não encontrado ou seletor inválido');
    }
}

function acendeTecla(tecla) {
    tecla.classList.add('ativa');
    setTimeout(() => tecla.classList.remove('ativa'), 120);
}

const listaDeTeclas = document.querySelectorAll('.tecla');
const teclasPorLetra = {};

for (const tecla of listaDeTeclas) {
    const instrumento = tecla.classList[1];
    const idAudio = `#som_${instrumento}`; // template string

    tecla.addEventListener('click', () => tocaSom(idAudio));

    // Mantém o efeito de "tecla pressionada" ao usar Espaço ou Enter
    tecla.addEventListener('keydown', (evento) => {
        if (evento.code === 'Space' || evento.code === 'Enter') {
            tecla.classList.add('ativa');
        }
    });

    tecla.addEventListener('keyup', () => tecla.classList.remove('ativa'));

    teclasPorLetra[tecla.dataset.tecla] = { tecla, idAudio };
}

// Toca pelo teclado físico: Q W E / A S D / Z X C
document.addEventListener('keydown', (evento) => {
    if (evento.repeat || evento.ctrlKey || evento.metaKey || evento.altKey) return;

    const alvo = teclasPorLetra[evento.key.toUpperCase()];
    if (!alvo) return;

    tocaSom(alvo.idAudio);
    acendeTecla(alvo.tecla);
});
