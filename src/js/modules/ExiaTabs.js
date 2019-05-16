/**
 * ExiaTabs - Tab management system
 *
 * @version 0.4.0
 * @author Pedro Britto <pedroivobritto@gmail.com>
 *
 * @param obj.initialTab Id da tab selecionada automaticamente.
 */
export default class ExiaTabs {
    constructor(config) {
        this.tabHeaderItems = this.getElementWithAttribute("data-tab-open-id");
        this.tabContentItems = this.getElementWithAttribute("data-tab-id");
        this.allElements = [...this.tabContentItems, ...this.tabHeaderItems];
        this.tabGroups = this.getTabGroups();

        this.activeClassName = "is-active";
        this.preSelectTabs = config && config.preSelectTabs === false ? false : true;
        this.initialTab = config && config.initialTab ? config.initialTab : "1";

        this.main();
    }

    /**
     * Executa funções do ExiaTabs
     */
    main() {
        if (this.preSelectTabs) {
            this.selectInitialTabs();
        }

        this.tabHeaderItems.map(item => {
            if (item.dataset.tabAction === "hover") {
                item.addEventListener("mouseenter", () => {
                    const itemDataset = item.dataset.tabOpenId;
                    this.selectTab(itemDataset, item);
                });
            } else {
                item.addEventListener("click", () => {
                    const itemDataset = item.dataset.tabOpenId;
                    this.selectTab(itemDataset, item);
                });
            }
        });
    }

    /**
     * Retorna todos os groupos de tabs existentes na página
     *
     * @returns {string[]}
     */
    getTabGroups() {
        const tabGroups = [];

        this.allElements.map(item => {
            const tabGroupId = item.dataset.tabGroupId;

            if (!tabGroups.includes(tabGroupId)) {
                tabGroups.push(tabGroupId);
            }
        });

        return tabGroups;
    }

    /**
     * Seleciona uma tab
     *
     * @param {string|number} idToOpen Id da tab a ser selecionada
     * @param {HTMLElement} [clickedItem] Elemento clicado a ter seu data-tab-group-id Lido
     */
    selectTab(idToOpen, clickedItem) {
        const tabId = idToOpen + "";
        const selectedElements = [];
        const tabGroupId = clickedItem ? clickedItem.dataset.tabGroupId : undefined;

        this.deselectAllTabs(tabGroupId);

        this.allElements.filter(item => {
            if (
                item.getAttribute("data-tab-id") === tabId &&
                item.getAttribute("data-tab-group-id") === tabGroupId
            ) {
                selectedElements.push(item);
            }

            if (
                item.getAttribute("data-tab-open-id") === tabId &&
                item.getAttribute("data-tab-group-id") === tabGroupId
            ) {
                selectedElements.push(item);
            }
        });

        selectedElements.map(item => item.classList.add("is-active"));
    }

    /**
     * Pre-seleciona as primeiras tabs de cada data-tab-group-id
     */
    selectInitialTabs() {
        const selectedElements = [];

        this.allElements.filter(item => {
            if (
                item.getAttribute("data-tab-id") === this.initialTab &&
                this.tabGroups.includes(item.getAttribute("data-tab-group-id"))
            ) {
                selectedElements.push(item);
            }

            if (
                item.getAttribute("data-tab-open-id") === this.initialTab &&
                this.tabGroups.includes(item.getAttribute("data-tab-group-id"))
            ) {
                selectedElements.push(item);
            }
        });

        selectedElements.map(item => item.classList.add("is-active"));
    }

    /**
     * Deseleciona todas as tabs
     *
     * @param {string|number} tabGroupId
     */
    deselectAllTabs(tabGroupId) {
        this.allElements.filter(item => {
            if (item.getAttribute("data-tab-group-id") === tabGroupId) {
                item.classList.remove("is-active");
            }
        });
    }

    /**
     * Retorna elementos com atributo passado
     *
     * @param {string} attributeName
     * @returns {array} Array com todos os elemento que possuem atributo
     */
    getElementWithAttribute(attributeName) {
        const matchingElements = [];
        const allElements = document.getElementsByTagName("*");

        Array.from(allElements).map(item => {
            if (item.getAttribute(attributeName) !== null) {
                matchingElements.push(item);
            }
        });

        return matchingElements;
    }
}
