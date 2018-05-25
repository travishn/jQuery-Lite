/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./lib/main.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./lib/dom_node_collection.js":
/*!************************************!*\
  !*** ./lib/dom_node_collection.js ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("class DOMNodeCollection {\n  constructor(htmlCollection) {\n    this.htmlCollection = htmlCollection; \n  }\n  \n  html(str) {\n    if (!str) {\n      return this.htmlCollection[0].innerHTML;\n    } else {\n      this.htmlCollection.forEach( (el) => {\n        el.innerHTML = str;\n      });\n    }\n  }\n  \n  empty() {\n    this.html(\"\");\n  }\n  \n  append(object) {\n    if (object instanceof $) {\n      let elements = []; \n      for (var i = 0; i < object.length; i++) {\n        elements.push(object[i].outerHTML);\n      }\n      elements.forEach(element => {\n        this.htmlCollection.forEach(el => el.innerHTML += element.outerHTML); \n      });\n    } else if (object instanceof HTMLElement) {\n      this.htmlCollection.forEach(el => el.innerHTML += object.outerHTML); \n    } else {\n      this.htmlCollection.forEach(el => el.innerHTML += object); \n    }\n  }\n  \n  attr(name, setter) {\n    if (!setter) {\n      return this.htmlCollection[0].getAttribute(name);\n    } else {\n      this.htmlCollection.forEach(el => el.setAttribute(name, setter));\n    }\n  }\n  \n  addClass(name) {\n    this.attr(\"class\", name);\n  }\n  \n  removeClass(name) {\n    this.htmlCollection.forEach(el => el.removeAttribute(name));\n  }\n  \n  children() {\n    let collection = []; \n    this.htmlCollection.forEach( (node) => {\n      collection.push(new DOMNodeCollection(node.children));\n    });\n    return collection; \n  }\n  \n  parent() {\n    let collection = [];\n    this.htmlCollection.forEach( (node) => {\n      collection.push(new DOMNodeCollection(node.parentNode));\n    });\n    \n    return collection;\n  }\n  \n  find(selector) {\n    let collection = []; \n    this.htmlCollection.forEach( el => {\n      collection = collection.concat(el.querySelectorAll(selector));\n    });\n    return new DOMNodeCollection(collection); \n  }\n  \n  remove() {\n    this.htmlCollection.forEach( (node) => {\n      node.outerHTML = '';\n    });\n    \n    this.htmlCollection = [];\n  }\n  \n  on(eventType, callback) {\n    this.htmlCollection.forEach((node) => {\n      node.addEventListener(eventType, callback);\n      node.event = callback; \n    });\n  }\n  \n  off(eventType) {\n    this.htmlCollection.forEach(node => {    \n      node.removeEventListener(eventType, node.event);\n    });\n  }\n  \n}\n\n\n\n\n\n\n\n\nmodule.exports = DOMNodeCollection; \n\n//# sourceURL=webpack:///./lib/dom_node_collection.js?");

/***/ }),

/***/ "./lib/main.js":
/*!*********************!*\
  !*** ./lib/main.js ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("let DOMNodeCollection = __webpack_require__(/*! ./dom_node_collection.js */ \"./lib/dom_node_collection.js\");\n\nfunction windowFunction() {\n  return window.$l;\n}\n\nclass Dom{\n  constructor() {\n    this.loaded = false; \n    this.callbacks = []; \n  }\n  \n  \n  \n  // $l(selector, callback) {\n  //   this.callbacks.push(callback);\n  //     const nodeList = document.querySelectorAll(selector);\n  // \n  //     if (nodeList[0] instanceof HTMLElement) {\n  //       let nodes = [];\n  // \n  //       nodeList.forEach( (node) => nodes.push(node));\n  //       return new DOMNodeCollection(nodes);\n  //     }\n  // \n  //     // document.addEventListener(\"DOMContentLoaded\", () => {\n  //     //   alert('inside event listener');\n  //     //   this.callbacks.forEach( (callback) => {\n  //     //     callback();\n  //     //   });\n  //     // });\n  // \n  //     // if (this.loaded) {\n  //     //   this.callbacks.forEach( (callback) => {\n  //     //     callback();\n  //     //   });\n  //   }\n  // }\n  $l(selector) {\n    const nodeList = document.querySelectorAll(selector);\n  \n    if (nodeList[0] instanceof HTMLElement) {\n      let nodes = [];\n  \n      nodeList.forEach( (node) => nodes.push(node));\n      return new DOMNodeCollection(nodes);\n    }\n  }\n}\n\nconst newEl = new Dom(); \nwindow.$l = newEl.$l;\nconsole.log(newEl.$l(\"li\"));\nnewEl.$l(\"ul\").append(\"<li>working</li>\");\n// newEl.$l(\"ul\").append($(\"li\").eq(0));\nconsole.log(newEl.$l('li').attr('class', 'it_works!'));\n\nnewEl.$l('li').addClass('it)=WWORKS');\nconsole.log(newEl.$l('li').children());\nconsole.log(newEl.$l('li').parent());\n// newEl.$l('ul').remove();\nnewEl.$l('li').on(\"click\", (e) => {console.log(e.target);});\nnewEl.$l(\"li\").off(\"click\");\n\n\n//# sourceURL=webpack:///./lib/main.js?");

/***/ })

/******/ });