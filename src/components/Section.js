export default class Section {
    constructor(renderer, containerSelector) {
        this._renderer = renderer;
        this._container = document.querySelector(containerSelector);
    }

    renderItems = (items) => {
        this._renderedItems = items;
        items.forEach(item => this._renderer(item));
    }

    addItem = (element) => {
        this._container.append(element);
    }
    addAnotherItem = (element) => {
        this._container.prepend(element);
    }
}