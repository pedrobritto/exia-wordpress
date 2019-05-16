/**
 * Burger
 *
 * @author Pedro Britto (pedrobritto)
 */

export default function animateBurgerIcon() {
    const burgerIcons = document.querySelectorAll(".burger-icon-container.is-animated");

    Array.from(burgerIcons).map(item => {
        item.addEventListener("click", () => item.classList.toggle("is-active"));
    });
}
