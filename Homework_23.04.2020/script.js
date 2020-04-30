class Element {
    constructor(tagName) {
        this.tagName = tagName;
        this.element = document.createElement(this.tagName);
    }
    setId(id) {
        if (id) {
            this.element.id = id;
        }
    }
    addClass(cssClass) {
        if (cssClass) {
            this.element.className = cssClass;
        }
    }
    setContent(text) {
        if (text) {
            if ((this.tagName === 'input') || (this.tagName === 'textarea')) {
                this.element.value = text;
            }
            else {
                this.element.textContent = text;
            }
        }
    }
    addChild(child) {
        if (child) {
            this.element.appendChild(child);
        }
    }
    print() {
        return this.element;
    }
}
class DomBuilder {
    create(tagName) {
        this.element = new Element(tagName);
        return this;
    }
    withClass(className) {
        this.element.addClass(className);
        return this;
    }
    withId(idName) {
        this.element.setId(idName);
        return this;
    }
    withChild(childElem) {
        this.element.addChild(childElem);
        return this;
    }
    withContent(text) {
        this.element.setContent(text);
        return this;
    }
    get result() {
        return this.element.print();
    }
}

let p1 = new DomBuilder().create('p').withId('p1').withClass('text').withContent('Hello,').result;
let p2 = new DomBuilder().create('p').withId('p2').withClass('text').withContent('world!').result;
let div = new DomBuilder().create('div').withId('main').withClass('container').withChild(p1).withChild(p2).result;