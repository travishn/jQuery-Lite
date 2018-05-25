let DOMNodeCollection = require("./dom_node_collection.js");

function windowFunction() {
  return window.$l;
}

class Dom{
  constructor() {
    this.loaded = false; 
    this.callbacks = []; 
  }
  
  
  
  // $l(selector, callback) {
  //   this.callbacks.push(callback);
  //     const nodeList = document.querySelectorAll(selector);
  // 
  //     if (nodeList[0] instanceof HTMLElement) {
  //       let nodes = [];
  // 
  //       nodeList.forEach( (node) => nodes.push(node));
  //       return new DOMNodeCollection(nodes);
  //     }
  // 
  //     // document.addEventListener("DOMContentLoaded", () => {
  //     //   alert('inside event listener');
  //     //   this.callbacks.forEach( (callback) => {
  //     //     callback();
  //     //   });
  //     // });
  // 
  //     // if (this.loaded) {
  //     //   this.callbacks.forEach( (callback) => {
  //     //     callback();
  //     //   });
  //   }
  // }
  $l(selector) {
    const nodeList = document.querySelectorAll(selector);
  
    if (nodeList[0] instanceof HTMLElement) {
      let nodes = [];
  
      nodeList.forEach( (node) => nodes.push(node));
      return new DOMNodeCollection(nodes);
    }
  }
}

const newEl = new Dom(); 
window.$l = newEl.$l;
console.log(newEl.$l("li"));
newEl.$l("ul").append("<li>working</li>");
// newEl.$l("ul").append($("li").eq(0));
console.log(newEl.$l('li').attr('class', 'it_works!'));

newEl.$l('li').addClass('it)=WWORKS');
console.log(newEl.$l('li').children());
console.log(newEl.$l('li').parent());
// newEl.$l('ul').remove();
newEl.$l('li').on("click", (e) => {console.log(e.target);});
newEl.$l("li").off("click");
