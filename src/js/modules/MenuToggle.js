/**
 * Menu Toggle
 *
 * Adiciona e Remove classe "is-active" em um elemento a partir do clique em outro.
 *
 * @version 0.4.0
 * @author Pedro Britto <pedroivobritto@gmail.com>
 */
export default class MenuToggle {
    /**
     * @constructor
     * @param {*} config Objeto de configuração que aceita as seguintes propriedades:
     * @param {string[]} config.menuToggle Elemento que quando clicado ativa o menu (menuElement).
     * @param {string} config.menuElement Elemento ativado quando menuToggle é clicado.
     * @param {string[]} config.menuClose Elemento que desativa o menu (menuElement) quando clicado.
     * @param {string} [config.activeClass] Nome da classe adicionada ao menuElement.
     *  Padrão: is-active.
     * @param {string} [config.activeBodyClass] Classe adicionada ao body quando menuToggle é clicado.
     *  Padrão: undefined.
     * @param {number} [config.breakpointToHide] Largura (px) para remover activeClass de menuElement.
     */
    constructor(config) {
        if (!config || typeof config != "object") {
            throw new Error("Menu Toggle config must be an object.");
        }

        if (config.menuToggle) {
            this.menuToggle = this.flattenSelectors(config.menuToggle);
        }

        if (config.menuClose) {
            this.menuClose = this.flattenSelectors(config.menuClose);
        }

        this.menuElement = document.querySelector(config.menuElement);
        this.activeClass = config.activeClass ? config.activeClass : "is-active";
        this.activeBodyClass = config.activeBodyClass ? config.activeBodyClass : null;
        this.breakpointToHide = config.breakpointToHide ? config.breakpointToHide : null;

        this.run();
    }

    run() {
        this.menuToggle.map(item => {
            if (!item) {
                return;
            }

            item.addEventListener("click", e => {
                e.preventDefault();

                if (this.activeBodyClass) {
                    this.toggleBodyClass();
                }

                this.toggleMenuActiveClass();
            });

            if (this.breakpointToHide) {
                this.hideOnBreakpoint(this.breakpointToHide);
            }
        });

        this.menuClose.map(item => {
            if (!item) {
                return;
            }

            item.addEventListener("click", () => {
                if (this.activeBodyClass) {
                    this.toggleBodyClass();
                }

                this.toggleMenuActiveClass();
            });
        });
    }

    flattenSelectors(selectorArray) {
        const flattenedSelectors = [];
        const allElements = selectorArray.map(item => document.querySelectorAll(item));

        allElements.map(item => {
            if (item.length > 0) {
                let itemLength = item.length;

                for (let i = 0; i < itemLength; i++) {
                    flattenedSelectors.push(item[i]);
                }
            }
        });

        return flattenedSelectors;
    }

    toggleBodyClass() {
        return document.body.classList.toggle(this.activeBodyClass);
    }

    removeBodyClass() {
        return document.body.classList.remove(this.activeBodyClass);
    }

    toggleMenuActiveClass() {
        return this.menuElement.classList.toggle(this.activeClass);
    }

    removeMenuActiveClass() {
        return this.menuElement.classList.remove(this.activeClass);
    }

    hideOnBreakpoint(breakpointToHide) {
        if (window.innerWidth >= breakpointToHide) {
            this.removeMenuActiveClass();
            this.removeBodyClass();
        }

        window.addEventListener("resize", () => {
            if (window.innerWidth >= breakpointToHide) {
                this.removeMenuActiveClass();
                this.removeBodyClass();
            }
        });
    }
}
