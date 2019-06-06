import burger from "./modules/burger";
import FixedElementClearance from "./modules/FixedElementClearance";
import LazyLoad from "vanilla-lazyload";
import MenuToggle from "./modules/MenuToggle";
import SmoothScroll from "smooth-scroll/dist/smooth-scroll";

export default () => {
    burger();

    new LazyLoad({ elements_selector: ".lazy" });

    new SmoothScroll('a[href*="#"]', {
        header: ".main-header-bundle",
        speed: 1500,
        speedAsDuration: true,
        easing: "easeOutQuint",
    });

    new FixedElementClearance({
        element: ".js-get-main-header-height",
        CSSVariableName: "main-header-height",
    });

    new MenuToggle({
        menuToggle: [".js-main-menu-mobile-toggle"],
        menuElement: ".main-menu-mobile",
        menuClose: [".js-close-menu-mobile"],
        activeBodyClass: "mobile-menu-is-open",
        breakpointToHide: 1200,
    });
};
