class DOMNodeCollection {
  constructor(htmlCollection) {
    this.htmlCollection = htmlCollection; 
  }
  
  html(str) {
    if (!str) {
      return this.htmlCollection[0].innerHTML;
    } else {
      this.htmlCollection.forEach( (el) => {
        el.innerHTML = str;
      });
    }
  }
  
  empty() {
    this.html("");
  }
  
  append(object) {
    if (object instanceof $) {
      let elements = []; 
      for (var i = 0; i < object.length; i++) {
        elements.push(object[i].outerHTML);
      }
      elements.forEach(element => {
        this.htmlCollection.forEach(el => el.innerHTML += element.outerHTML); 
      });
    } else if (object instanceof HTMLElement) {
      this.htmlCollection.forEach(el => el.innerHTML += object.outerHTML); 
    } else {
      this.htmlCollection.forEach(el => el.innerHTML += object); 
    }
  }
  
  attr(name, setter) {
    if (!setter) {
      return this.htmlCollection[0].getAttribute(name);
    } else {
      this.htmlCollection.forEach(el => el.setAttribute(name, setter));
    }
  }
  
  addClass(name) {
    this.attr("class", name);
  }
  
  removeClass(name) {
    this.htmlCollection.forEach(el => el.removeAttribute(name));
  }
  
  children() {
    let collection = []; 
    this.htmlCollection.forEach( (node) => {
      collection.push(new DOMNodeCollection(node.children));
    });
    return collection; 
  }
  
  parent() {
    let collection = [];
    this.htmlCollection.forEach( (node) => {
      collection.push(new DOMNodeCollection(node.parentNode));
    });
    
    return collection;
  }
  
  find(selector) {
    let collection = []; 
    this.htmlCollection.forEach( el => {
      collection = collection.concat(el.querySelectorAll(selector));
    });
    return new DOMNodeCollection(collection); 
  }
  
  remove() {
    this.htmlCollection.forEach( (node) => {
      node.outerHTML = '';
    });
    
    this.htmlCollection = [];
  }
  
  on(eventType, callback) {
    this.htmlCollection.forEach((node) => {
      node.addEventListener(eventType, callback);
      node.event = callback; 
    });
  }
  
  off(eventType) {
    this.htmlCollection.forEach(node => {    
      node.removeEventListener(eventType, node.event);
    });
  }
  
}








module.exports = DOMNodeCollection; 