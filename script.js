'use strict';

let DomElement = function(selector, height, width, bg, fontSize){
    this.selector = selector,
    this.height = height,
    this.width = width,
    this.bg = bg,
    this.fontSize = fontSize;
};
DomElement.prototype.createElement = function(text){
    let newElement;

    if (this.selector[0] === '.') {
        newElement = document.createElement('div');
        let newText = document.createTextNode(text);
        newElement.append(newText);
        newElement.className = this.selector.slice(1);
    } else if (this.selector[0] === '#') {
        newElement = document.createElement('p');
        let newText = document.createTextNode(text);
        newElement.append(newText);
        newElement.setAttribute('id', this.selector.slice(1) );
    }

    newElement.style.cssText = 'height: ' + this.height + 'px ;' + 
        'width: ' + this.width + 'px ;' +
        'background-color: ' + this.bg + ';' +
        'font-size: ' + this.fontSize + 'px ;'
        ;

    document.body.append(newElement);
};

let element1 = new DomElement('.lols', 100, 90, 'wheat', 20);
element1.createElement('new element!');

