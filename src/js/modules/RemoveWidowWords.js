/**
 * Remove Widow Words
 *
 * @version 1.0.0
 * @author Pedro Britto (pedrobritto)
 */
class RemoveWidowWords {
    constructor(selector) {
        this.elements = document.querySelectorAll(selector);

        // Runs function
        Array.from(this.elements).map(item => {
            item.innerHTML = this.makeWidowless(item.textContent);
        });
    }

    makeWidowless(string) {
        const stringArray = string.split(" ");
        const filterSpaces = stringArray.filter(item => item !== "");

        const lastWord = filterSpaces[filterSpaces.length - 1];
        const beforeLastWord = filterSpaces[filterSpaces.length - 2];
        const newLastWord = beforeLastWord + "&nbsp;" + lastWord;

        // Remove last two items and add new widowless final word
        let stringArrayLastTwo = filterSpaces.slice(0, [filterSpaces.length - 2]);
        stringArrayLastTwo.push(newLastWord);

        return stringArrayLastTwo.join(" ");
    }
}

new RemoveWidowWords(".remove-widow");
