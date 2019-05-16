/**
 * Checa se elemento está na viewport.
 *
 * @param {HTMLElement} _element - Elemento HTML a ser detectado.
 * @param {Number} [_offset] - Inteiro positivo. Offset para detectar scroll.
 * @returns {Boolean} true se estiver na viewport, senão false.
 */
const isOnViewport = (_element, _offset) => {
    if (!_element) return false;

    const element = _element;
    const offset = _offset || 0;
    const viewCoords = {
        top: window.scrollY,
        height: window.innerHeight,
    };
    const elCoords = {
        top: element.getBoundingClientRect().top + window.scrollY,
        height: element.getBoundingClientRect().height,
    };

    return (
        viewCoords.top + viewCoords.height >= elCoords.top + offset &&
        viewCoords.top <= elCoords.top + elCoords.height - offset
    );
};

(function() {
    const elementToDetect = document.querySelector("body");

    window.addEventListener("scroll", () => {
        if (isOnViewport(elementToDetect)) {
            // Seu código aqui
        }
    });
})();
