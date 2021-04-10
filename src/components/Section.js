export default class Section { // renders elements onto the page
    constructor({ data, renderer }, containerSelector) {
        this._data = data; // items is an array of objects; the initial cards for example
        this._renderer = renderer;
        this._container = containerSelector; // is the container that the new elements will be rendered into
    }

    renderElements() {
        this._data.forEach(item => { // for each card object,
            this._renderer(item); // use this._renderer on it
        })
    }

    addItem(element) {
        this._container.prepend(element); // adds whatever element to whatever container
    }
}
