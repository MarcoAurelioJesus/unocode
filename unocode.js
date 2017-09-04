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
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
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
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 13);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Util = (function () {
    function Util() {
    }
    Util.getElementByXpath = function (path) {
        return document.evaluate(path, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
    };
    return Util;
}());
exports.Util = Util;


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(6)(undefined);
// imports


// module
exports.push([module.i, "  /*Formata topo da página SSG Precificação*/\r\n  \r\n  body {\r\n      width: auto !important;\r\n      margin-top: 5px !important;\r\n      margin-right: 5px !important;\r\n      margin-bottom: 5px !important;\r\n      margin-left: 5px !important;\r\n      height: 200% !important;\r\n      text-align: center !important;\r\n      visibility: visible !important;\r\n  }\r\n  \r\n  #dm0m0 {\r\n      visibility: hidden !important;\r\n      display: none !important;\r\n  }\r\n  \r\n  body>table:nth-child(32) {\r\n      display: none !important;\r\n  }\r\n  \r\n  #Img1 {\r\n      display: none !important;\r\n  }\r\n  \r\n  body>div:nth-child(33) {\r\n      display: none !important;\r\n  }\r\n  \r\n  body>div:nth-child(5) {\r\n      height: auto !important;\r\n  }\r\n  \r\n  body>div:nth-child(6) {\r\n      height: auto !important;\r\n  }", ""]);

// exports


/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = "<meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0, user-scalable=no\"></meta>";

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var util_1 = __webpack_require__(0);
var ElementHidderCommand = (function () {
    function ElementHidderCommand(type, path) {
        this.type = type;
        this.path = path;
    }
    ElementHidderCommand.prototype.run = function () {
        console.log('Running ElementHidderCommand with params: '
            + 'path: ' + this.path);
        var node = util_1.Util.getElementByXpath(this.path);
        if (node.nodeType == Node.ELEMENT_NODE) {
            node.setAttribute("hidden", "true");
        }
    };
    return ElementHidderCommand;
}());
exports.ElementHidderCommand = ElementHidderCommand;
var ElementHidderCommandWithIncrement = (function () {
    function ElementHidderCommandWithIncrement(type, path, incrementElement, minIncrementValue, maxIncrementValue) {
        this.type = type;
        this.path = path;
        this.incrementElement = incrementElement;
        this.minIncrementValue = minIncrementValue;
        this.maxIncrementValue = maxIncrementValue;
    }
    ElementHidderCommandWithIncrement.prototype.run = function () {
        console.log('Running ElementHidderCommandWithIncrement with params: '
            + 'path: ' + this.path
            + ' incrementElement: ' + this.incrementElement
            + ' minIncrementValue: ' + this.minIncrementValue
            + ' maxIncrementValue: ' + this.maxIncrementValue);
        for (var i = this.minIncrementValue; i <= this.maxIncrementValue; i++) {
            var finalPath = this.path + this.incrementElement + '[' + i + ']';
            console.log(" pathFinal " + finalPath);
            var node = util_1.Util.getElementByXpath(finalPath);
            if (node != null && node.nodeType == Node.ELEMENT_NODE) {
                node.setAttribute("hidden", "true");
            }
        }
    };
    return ElementHidderCommandWithIncrement;
}());
exports.ElementHidderCommandWithIncrement = ElementHidderCommandWithIncrement;


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var types_1 = __webpack_require__(12);
var js_command_1 = __webpack_require__(11);
var elem_removal_command_1 = __webpack_require__(9);
var elem_hidder_command_1 = __webpack_require__(3);
var elem_hidder_command_2 = __webpack_require__(3);
var html_importer_command_1 = __webpack_require__(10);
var css_importer_command_1 = __webpack_require__(8);
var configuration = __webpack_require__(7);
var Engine = (function () {
    function Engine() {
    }
    Engine.runActions = function (actions) {
        if (actions) {
            for (var _i = 0, actions_1 = actions; _i < actions_1.length; _i++) {
                var action = actions_1[_i];
                this.maybeRunAction(action);
            }
        }
    };
    Engine.maybeRunAction = function (action) {
        var _this = this;
        if (action.enabled) {
            var isEnabled = action.enabled();
            if (isEnabled instanceof Promise) {
                isEnabled.then(function (enabled) {
                    if (enabled) {
                        _this.runAction(action);
                    }
                }).catch(function () {
                    // do nothing
                });
            }
            else {
                if (isEnabled) {
                    this.runAction(action);
                }
            }
        }
        else {
            this.runAction(action);
        }
    };
    Engine.runAction = function (action) {
        var _this = this;
        if (!action.guard) {
            this.runCommands(action.commands, action.nextActions);
        }
        else {
            var numberSatisfiedConditions_1 = 0;
            var pollingId_1 = setInterval(function () {
                for (var _i = 0, _a = action.guard.conditions; _i < _a.length; _i++) {
                    var condition = _a[_i];
                    if (condition.code && !condition.isChecked) {
                        var conditionCode = condition.code();
                        if (conditionCode instanceof Promise) {
                            // We should not check the condition again in async mode
                            condition.isChecked = true;
                            conditionCode.then(function () {
                                _this.maybeRunCommands(action, ++numberSatisfiedConditions_1, pollingId_1);
                            }).catch(function () {
                                // do nothing
                            });
                        }
                        else {
                            if (conditionCode) {
                                // If processed, we should not check the condition again in sync mode
                                condition.isChecked = true;
                                _this.maybeRunCommands(action, ++numberSatisfiedConditions_1, pollingId_1);
                            }
                        }
                    }
                }
            }, configuration.delayPolling);
        }
    };
    Engine.maybeRunCommands = function (action, numberSatisfiedConditions, pollingId) {
        if (action.guard.conditions.length === numberSatisfiedConditions) {
            clearInterval(pollingId);
            this.runCommands(action.commands, action.nextActions);
        }
    };
    Engine.runCommands = function (commands, nextActions) {
        if (commands) {
            for (var _i = 0, commands_1 = commands; _i < commands_1.length; _i++) {
                var command = commands_1[_i];
                this.runCommand(command);
            }
        }
        if (nextActions) {
            this.runActions(nextActions);
        }
    };
    Engine.runCommand = function (command) {
        switch (command.type.toString()) {
            case types_1.CommandType[types_1.CommandType.JSImporter]:
                new js_command_1.JSCommand(types_1.CommandType.JSImporter, command.code).run();
                break;
            case types_1.CommandType[types_1.CommandType.ElementRemoval]:
                new elem_removal_command_1.ElementRemovalCommand(types_1.CommandType.ElementRemoval, command.path).run();
                break;
            case types_1.CommandType[types_1.CommandType.ElementHidder]:
                new elem_hidder_command_1.ElementHidderCommand(types_1.CommandType.ElementHidder, command.path).run();
                break;
            case types_1.CommandType[types_1.CommandType.ElementHidderWithIncrement]:
                new elem_hidder_command_2.ElementHidderCommandWithIncrement(types_1.CommandType.ElementHidderWithIncrement, command.path, command.incrementElement, command.minIncrementValue, command.maxIncrementValue).run();
                break;
            case types_1.CommandType[types_1.CommandType.HTMLImporter]:
                new html_importer_command_1.HTMLImporterCommand(types_1.CommandType.HTMLImporter, command.path, command.html).run();
                break;
            case types_1.CommandType[types_1.CommandType.CSSImporter]:
                new css_importer_command_1.CSSImporterCommand(types_1.CommandType.HTMLImporter, command.css).run();
                break;
            default:
                break;
        }
    };
    return Engine;
}());
exports.Engine = Engine;


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = [
  /*______________________________________ Proposta Livre_____________________________________*/
  {
    enabled: __webpack_require__(14),

    nextActions: [
      {
        guard: {
          conditions: [
            {
              code: () => {
                var topo = document.getElementById("Img1");
                return topo != null;
              }
            }
          ]
        },
        commands: [
          {
            type: "HTMLImporter",
            path: "//head",
            html: __webpack_require__(2)
          },
          {
            type: "CSSImporter",
            css: __webpack_require__(1)
          }
        ]
      },
      /*_______Inserir Logo Topo______*/
      {
        guard: {
          conditions: [
            {
              code: () => {
                var topo = document.querySelector("body > table:nth-child(26)");

                console.log("Inserir topo");
                return topo != null;
              }
            }
          ]
        },
        commands: [
          {
            type: "HTMLImporter",
            path: "//head",
            html: __webpack_require__(2)
          },
          {
            type: "CSSImporter",
            css: __webpack_require__(1)
          },
          {
            type: "JSImporter",
            code: () => {
              var logoTopo = document.createElement("div");
              logoTopo.innerHTML = `<div class="container" style="width: 100%; padding: 0px; overflow: hidden">
                            <div class="row">
                                <div class="col-sm-12 col-xs-12 visible-xs visible-sm text-center">
                                    <a style="text-decoration: none" href="/index.html">
                                        <img src="/layout/images/cabecalho_mobile_size_ssg.jpg" name="cabecalho_ssg" id="cabecalho_ssg" longdesc="http://www.sysmap.com.br">
                                    </a>
                                    <a style="text-decoration: none" href="/processos/pas/index.htm" target="_blank">
                                        <img src="/layout/images/pas.png" name="cabecalho_psds" id="cabecalho_psds" width="130" height="74" longdesc="http://www.sysmap.com.br">
                                    </a>
                                    <br>
                                    <br>
                                </div>
                            </div>
                        </div>`;
              document.querySelector("body").prepend(logoTopo);
            }
          }
        ]
      },
    ]
  },
];

/***/ }),
/* 6 */
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function(useSourceMap) {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		return this.map(function (item) {
			var content = cssWithMappingToString(item, useSourceMap);
			if(item[2]) {
				return "@media " + item[2] + "{" + content + "}";
			} else {
				return content;
			}
		}).join("");
	};

	// import a list of modules into the list
	list.i = function(modules, mediaQuery) {
		if(typeof modules === "string")
			modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for(var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if(typeof id === "number")
				alreadyImportedModules[id] = true;
		}
		for(i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if(mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if(mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};

function cssWithMappingToString(item, useSourceMap) {
	var content = item[1] || '';
	var cssMapping = item[3];
	if (!cssMapping) {
		return content;
	}

	if (useSourceMap && typeof btoa === 'function') {
		var sourceMapping = toComment(cssMapping);
		var sourceURLs = cssMapping.sources.map(function (source) {
			return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */'
		});

		return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
	}

	return [content].join('\n');
}

// Adapted from convert-source-map (MIT)
function toComment(sourceMap) {
	// eslint-disable-next-line no-undef
	var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
	var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;

	return '/*# ' + data + ' */';
}


/***/ }),
/* 7 */
/***/ (function(module, exports) {

module.exports = {"delayPolling":"1000"}

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var CSSImporterCommand = (function () {
    function CSSImporterCommand(type, css) {
        this.type = type;
        this.css = css;
    }
    CSSImporterCommand.prototype.run = function () {
        console.log('Running CSSImporterCommand with params: '
            + 'css: ' + this.css);
        var style = document.createElement('style');
        style.appendChild(document.createTextNode(this.css));
        document.head.appendChild(style);
    };
    return CSSImporterCommand;
}());
exports.CSSImporterCommand = CSSImporterCommand;


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var util_1 = __webpack_require__(0);
var ElementRemovalCommand = (function () {
    function ElementRemovalCommand(type, path) {
        this.type = type;
        this.path = path;
    }
    ElementRemovalCommand.prototype.run = function () {
        console.log('Running ElementRemovalCommand with params: '
            + 'path: ' + this.path);
        var element = util_1.Util.getElementByXpath(this.path);
        element.parentElement.removeChild(element);
    };
    return ElementRemovalCommand;
}());
exports.ElementRemovalCommand = ElementRemovalCommand;


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var util_1 = __webpack_require__(0);
var HTMLImporterCommand = (function () {
    function HTMLImporterCommand(type, path, html) {
        this.type = type;
        this.path = path;
        this.html = html;
    }
    HTMLImporterCommand.prototype.run = function () {
        console.log('Running HTMLImporterCommand with params: '
            + 'path: ' + this.path
            + ' html: ' + this.html);
        var element = util_1.Util.getElementByXpath(this.path);
        element.innerHTML += this.html;
    };
    return HTMLImporterCommand;
}());
exports.HTMLImporterCommand = HTMLImporterCommand;


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var JSCommand = (function () {
    function JSCommand(type, code) {
        this.type = type;
        this.code = code;
    }
    JSCommand.prototype.run = function () {
        console.log('Running JSCommand with params: '
            + 'code: ' + this.code);
        this.code();
    };
    return JSCommand;
}());
exports.JSCommand = JSCommand;


/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var CommandType;
(function (CommandType) {
    CommandType[CommandType["JSImporter"] = 0] = "JSImporter";
    CommandType[CommandType["ElementRemoval"] = 1] = "ElementRemoval";
    CommandType[CommandType["ElementHidder"] = 2] = "ElementHidder";
    CommandType[CommandType["ElementHidderWithIncrement"] = 3] = "ElementHidderWithIncrement";
    CommandType[CommandType["HTMLImporter"] = 4] = "HTMLImporter";
    CommandType[CommandType["CSSImporter"] = 5] = "CSSImporter";
})(CommandType = exports.CommandType || (exports.CommandType = {}));


/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var engine_1 = __webpack_require__(4);
var actionsList = __webpack_require__(5);
engine_1.Engine.runActions(actionsList);


/***/ }),
/* 14 */
/***/ (function(module, exports) {

module.exports = () => {
  document.addEventListener('DOMContentLoaded', () => {
        document.body.style.visibility = 'hidden';
    });
  let check = false;
  (function(a) {
    if (
      /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(
        a
      ) ||
      /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(
        a.substr(0, 4)
      )
    )
      check = true;
  })(navigator.userAgent || navigator.vendor || window.opera);
  if(check == false) {
    document.addEventListener('DOMContentLoaded', () => {
        document.body.style.visibility = 'visible';
    });
  }
  return check;
};


/***/ })
/******/ ]);