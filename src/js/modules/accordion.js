export default function accordion() {
    const accordionItem = document.querySelectorAll(".js-accordion");

    [...accordionItem].map(item => {
        const accordionHeader = item.querySelector(".js-accordion-header");
        const accordionContent = item.querySelector(".js-accordion-content");

        accordionHeader.addEventListener("click", () => {
            item.classList.toggle("is-active");
            accordionHeader.classList.toggle("is-active");
            accordionContent.classList.toggle("is-active");
        });
    });
}
