import { Swiper, Navigation, Pagination } from "swiper/dist/js/swiper.esm.js";

Swiper.use([Navigation, Pagination]);

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
 * @param {Any} swiperConfig
 *    Objeto de configuração do Swiper.
 *
 * @returns {Void}
 */
const swiperGallery = (swiperSelector, slideTriggerSelector, swiperConfig) => {
    if (typeof swiperSelector === "string") {
        if (!document.querySelector(swiperSelector)) return false;
    }

    const slider = new Swiper(swiperSelector, swiperConfig);

    // Define z-index a partir de variável global definida em _z.scss
    if (typeof swiperSelector === "string") {
        document.querySelector(swiperSelector).style.zIndex = "var(--z-index-modal-box)";
    } else {
        swiperSelector.style.zIndex = "var(--z-index-modal-box)";
    }

    /**
     * Navega slide swiperSelector até o índice do elemento clicado.
     *
     * @param {String} el
     *    Coleção de elementos que receberão eventListener de clique
     *    e farão o swiperSelector navgear até o índice do elemento
     *    clicado aqui.
     */
    const openSlideFrom = el => {
        let galleryItems;

        if (typeof el === "string") {
            galleryItems = document.querySelectorAll(el);
        } else {
            galleryItems = el;
        }

        Array.from(galleryItems).map((item, index) => {
            item.addEventListener("click", e => {
                e.preventDefault();
                slider.slideTo(index);
            });
        });
    };

    openSlideFrom(slideTriggerSelector);
};

export default swiperGallery;
