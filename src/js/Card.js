/**
 * Represents a card in the memory game.
 */
export default class Card {
    /** 
     * Create a card.
     * @param {HTMLElement} parent Holder of the memory game.
     * @param {string} icon Icon to be shown on card.
     */
    constructor(parent, icon) {
        this.parent = parent;
        this.icon = icon;

        this.render();

        // store reference to HtmlElement
        this.ref = this.parent.firstChild;

        // icon not shown when rendered
        this.show = false;

        // true if matching card found
        this.matchFound = false;

        // add 'click' event listener to the card
        this.ref.addEventListener('click', () => this.emit())
    }
    /** Renders the card inside the parent element. */
    render() {
        this.parent.insertAdjacentHTML("afterbegin", `<div class="card"><img src=./svg/${this.icon}></div>`)
    }
    emit() {
        if (this.show) {
            this.show = false;
        } else {
            this.show = true;
        }
        this.ref.classList.toggle("show")
        let event = new CustomEvent("cardclicked", {detail: this})
        document.dispatchEvent(event);
    }
    hideIcon() {
        this.ref.classList.remove("show")
        this.show = false
    }
    showIcon() {
        this.ref.classList.add("show")
        this.show = true
    }
}