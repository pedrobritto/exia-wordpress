/**
 * Fixed Element Clearance
 * Armazena a altura de elementos do DOM em uma variável CSS
 *
 * @version 0.2.0
 * @author Pedro Britto <pedroivobritto@gmail.com>
 */

export default class FixedElementClearance {
    constructor(config) {
        if (!config) {
            throw Error("No config object privided.");
        }

        if (typeof config.element != "string") {
            throw Error("config.element should be a string.");
        }

        if (typeof config.CSSVariableName != "string") {
            throw Error("config.CSSVariableName should be a string.");
        }

        this.element = document.querySelectorAll(config.element);
        this.CSSVariableName = config.CSSVariableName
            ? config.CSSVariableName
            : "fixed-element-clearance";

        if (this.element.length === 0) {
            document.documentElement.style.setProperty(`--${this.CSSVariableName}`, `0px`);

            return;
        }

        this.elementHeights = [];
        this.calculatedHeight;

        this.calculateElementHeightArray();
        this.updateHeaderHeightCSSVariable(this.calculatedHeight);
        this.recalculateOnResize();
    }

    /**
     * Atualiza alturas no array
     */
    calculateElementHeightArray() {
        this.elementHeights = [];

        Array.from(this.element).map(item => this.elementHeights.push(item.offsetHeight));

        this.calculatedHeight = Math.max(...this.elementHeights);
        return this.calculatedHeight;
    }

    /**
     * Atualiza variável CSS com altura máxima
     */
    updateHeaderHeightCSSVariable(height) {
        return document.documentElement.style.setProperty(
            `--${this.CSSVariableName}`,
            `${height}px`
        );
    }

    /**
     * Recalcula alturas no resize
     */
    recalculateOnResize() {
        window.addEventListener("resize", () => {
            this.calculatedHeight = this.element.offsetHeight;
            this.calculateElementHeightArray();
            this.updateHeaderHeightCSSVariable(this.calculatedHeight);
        });
    }
}
