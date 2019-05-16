/**
 * Exia Modal
 *
 * @version 0.3.0
 * @author Pedro Britto <pedroivobritto@gmail.com>
 */
export default class ExiaModal {
    /**
     * @constructor
     * @param {Object} configObject
     */
    constructor(configObject) {
        this.exiaModals = document.querySelectorAll("[data-modal]");
        this.exiaModalOpen = document.querySelectorAll("[data-modal-open]");

        if (configObject) {
            this.bodyClass = configObject.bodyClass ? configObject.bodyClass : "is-scroll-locked";
        }

        this.main();
    }

    main() {
        this.openOnClick(this.exiaModalOpen, this.exiaModals);
        this.dismissOnEscPress(this.exiaModals);
        this.dismissModalOnClick(".js-modal-close", this.exiaModals);
    }

    /**
     * Abre modal diretamente a partir do Id
     *
     * @param {string} modalName Id do modal a ser aberto
     * @param {boolean} addBodyClass Add ou não a bodyClass em document.body
     */
    openModal(modalName, addBodyClass = true) {
        this.exiaModals.map(modalItem => {
            if (modalItem.getAttribute("data-modal") == modalName)
                modalItem.classList.add("is-visible");
        });

        if (addBodyClass) {
            this.addBodyClass(this.bodyClass);
        }
    }

    /**
     * Adiciona classe no <body> quando modal é ativado.
     *
     * @param {string} className Nome da classe
     * @returns void
     */
    addBodyClass(className) {
        if (className !== "undefined") document.body.classList.add(className);
    }

    /**
     * Remove classe no <body> quando modal é dispensado.
     *
     * @param {string} className Nome da classe
     * @returns void
     */
    removesbodyClass(className) {
        document.body.classList.remove(className);
    }

    /**
     * Abre modal quando o elemento especificado é clicado.
     *
     * @param {NodeList} triggerElement Elementos que ativam o modal
     * @param {NodeList} modalCollection Coleção de modais
     * @returns void
     */
    openOnClick(triggerElement, modalCollection) {
        Array.from(triggerElement).map(modalOpenItem => {
            modalOpenItem.addEventListener("click", function() {
                const modalIdToOpen = this.dataset.modalOpen;

                Array.from(modalCollection).map(modalItem => {
                    if (modalItem.getAttribute("data-modal") == modalIdToOpen)
                        modalItem.classList.add("is-visible");
                });
            });

            modalOpenItem.addEventListener("click", () => {
                this.addBodyClass(this.bodyClass);
            });
        });
    }

    /**
     * Dispensa modal quando ESC é pressionado.
     *
     * @param {NodeList} modalCollection Coleção de modais
     * @returns void
     */
    dismissOnEscPress(modalCollection) {
        document.addEventListener("keydown", e => {
            if (e.keyCode === 27) {
                Array.from(modalCollection).map(item => item.classList.remove("is-visible"));
                this.removesbodyClass(this.bodyClass);
            }
        });
    }

    /**
     * Dispensa modal quando o elemento especificado é clicado.
     *
     * @param {string} triggerElement Seletor de um elemento html
     * @param {NodeList} modalCollection Coleção de modais
     * @returns void
     */
    dismissModalOnClick(triggerElement, modalCollection) {
        [...modalCollection].map(item => {
            const triggerElements = item.querySelectorAll(triggerElement);

            Array.from(triggerElements).map(triggerElementItem => {
                triggerElementItem.addEventListener("click", () => {
                    item.classList.remove("is-visible");
                    this.removesbodyClass(this.bodyClass);
                });
            });
        });
    }

    /**
     * Atualiza coleção de modais e triggers de modal e
     * adiciona eventListener logo após.
     *
     * @returns void;
     */
    updateModalElements() {
        this.exiaModals = this.getElementWithAttribute("data-modal");
        this.exiaModalOpen = this.getElementWithAttribute("data-modal-open");

        this.openOnClick(this.exiaModalOpen, this.exiaModals);
    }
}
