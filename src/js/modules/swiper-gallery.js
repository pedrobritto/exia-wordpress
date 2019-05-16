/**
 * Navega até o índice de um swiper-slide correspondente
 * ao índice de um elemento clicado a partir de uma galeria fora do swiper.
 *
 * Normalmente utilizado com KamiModal.js para emular um "lightbox".
 *
 * @param {String} swiperSelector
 *    Inicializa o swiper do modal nesse elemento.
 * @param {String} slideTriggerSelector
 *    Elemento que, quando clicado, navegará até o elemento
 *    correspondente no slider.
 * @param {Any} swiperConfig Objeto de configuração do Swiper.
 * @returns {Void}
 */
const swiperGallery = (swiperSelector, slideTriggerSelector, swiperConfig) => {
    if (!document.querySelector(swiperSelector)) return false;

    const slider = new Swiper(swiperSelector, swiperConfig);

    // Define z-index a partir de variável global definida em _z.scss
    document.querySelector(swiperSelector).style.zIndex = "var(--z-index-modal-box)";

    /**
     * Navega slide swiperSelector até o índice do elemento clicado.
     *
     * @param {String} el
     *    Coleção de elementos que receberão eventListener de clique
     *    e farão o swiperSelector navgear até o índice do elemento
     *    clicado aqui.
     */
    const openSlideFrom = el => {
        const galleryItems = document.querySelectorAll(el);

        Array.from(galleryItems).map((item, index) => {
            item.addEventListener("click", e => {
                e.preventDefault();
                slider.slideTo(index);
            });
        });
    };

    openSlideFrom(slideTriggerSelector);
};

swiperGallery(".swiper-container.swiper-alugue", ".has-modal .gallery__item", {
    slidesPerView: 1,
    centeredSlides: true,
    spaceBetween: 50,
    keyboard: {
        enabled: true,
    },
    navigation: {
        nextEl: ".swiper-container.project-slider .button-next",
        prevEl: ".swiper-container.project-slider .button-prev",
    },
});
