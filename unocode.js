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
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var types_1 = __webpack_require__(12);
var js_command_1 = __webpack_require__(11);
var elem_removal_command_1 = __webpack_require__(9);
var elem_hidder_command_1 = __webpack_require__(1);
var elem_hidder_command_2 = __webpack_require__(1);
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
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = [
  /*______________________________________ Proposta Livre_____________________________________*/

  /*_______Ocultar Logo Topo______*/
  {
    enabled: __webpack_require__(14),
    nextActions: [
      {
        guard: {
          conditions: [
            {
              code: () => {
                var topo = document.getElementById("m_cabecalho");

                console.log("condition 1 Ocultar topo");
                return topo != null;
              }
            }
          ]
        },
        commands: [
          {
            type: "HTMLImporter",
            path: "//head",
            html: __webpack_require__(6)
          },
          {
            type: "CSSImporter",
            css: __webpack_require__(4)
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

              var removeZoonIos = document.createElement("meta");
              removeZoonIos.innerHTML = `<meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no">`;
              document.querySelector("head").append(removeZoonIos);
          }
          }
        ]
      },
      /*_______Ocultar Colunas grid______*/
      {
        guard: {
          conditions: [
            {
              code: () => {
                var gridBuscaPre = document.getElementById(
                  "propostaLivre_propostaLivreGrid"
                );

                console.log("condition 1 Ocultar Colunas grid");
                return gridBuscaPre != null;
              }
            }
          ]
        },
      },
      /*____Clica botão fluxo____*/
      {
        guard: {
          conditions: [
            {
              code: () => {
                var btnFluxoAprov = document.getElementById(
                  "propostaLivre_propostaLivreGridPanel"
                );
                return btnFluxoAprov != null;
              }
            }
          ]
        },
        commands: [
          {
            type: "JSImporter",
            code: () => {
              var btnFluxo = document.getElementById(
                "propostaLivre_workflowPropostaLivreButton"
              );
              setTimeout(() => {
                btnFluxo.click();
              }, 3000);
            }
          }
        ]
      }
    ]
  }
];


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(5)(undefined);
// imports


// module
exports.push([module.i, "               /*__CSS PRECIFICAÇÃO PROPOSTA LIVRE__*/\r\n               \r\n               body>div:nth-child(5) {\r\n                   height: auto !important;\r\n               }\r\n               \r\n               #precificacao2f ssg2e html_viewContainer {\r\n                   height: auto !important;\r\n               }\r\n               \r\n               body {\r\n                   overflow: hidden !important;\r\n                   margin-top: 10px !important;\r\n                   margin-right: 5px !important;\r\n                   margin-bottom: 5px !important;\r\n                   margin-left: 5px !important;\r\n                   height: 200% !important;\r\n               }\r\n               \r\n               body>div:nth-child(6) {\r\n                   height: auto !important;\r\n               }\r\n               /*/__Formata grid busca __*/\r\n               \r\n               #propostaLivre_propostaLivreDisclousePanel>tbody>tr:nth-child(2)>td>div {\r\n                   overflow: hidden !important;\r\n               }\r\n               \r\n               .propostaLivre_gridPropostaLivrePanel {\r\n                   height: 98% !important;\r\n               }\r\n               \r\n               #propostaLivre_propostaLivreDisclousePanel>tbody>tr:nth-child(2)>td>div {}\r\n               \r\n               .gridBuscaPre:first-child table td {\r\n                   display: none;\r\n               }\r\n               \r\n               .gridBuscaPre:first-child table td:nth-child(1) {\r\n                   display: table-cell !important;\r\n               }\r\n               \r\n               .gridBuscaPre:first-child table td:nth-child(2) {\r\n                   display: table-cell !important;\r\n               }\r\n               \r\n               .gridBuscaPre:first-child table td:nth-child(3) {\r\n                   display: table-cell !important;\r\n               }\r\n               /*__Oculta disclosurePanel__*/\r\n               \r\n               #propostaLivre_disclosureLabel {\r\n                   display: none !important;\r\n               }\r\n               \r\n               #propostaLivre_propostaLivreGrid {\r\n                   height: auto !important;\r\n                   width: 100% !important;\r\n               }\r\n               /*__Oculta tabBar__*/\r\n               \r\n               #propostaLivre_tabBar {\r\n                   display: none !important;\r\n               }\r\n               /*__Oculta Aba ajustes e info.preVenda*/\r\n               \r\n               #propostaLivre_propostaLivreResumoPanel>tbody>tr>td:nth-child(2) {\r\n                   display: none !important;\r\n               }\r\n               /*__Oculta propostaLivre_filterPropostaLivreAtividadePanel__*/\r\n               \r\n               #propostaLivre_PropostaLivreAtividadesFlowPanel {\r\n                   display: none !important;\r\n               }\r\n               /*__Muda cor topo das grids__*/\r\n               \r\n               #propostaLivre_propostaLivreGrid>div>table>tbody>tr.columnHeadersRow.row {\r\n                   background: #428bca !important;\r\n               }\r\n               /*__Oculta botão Aplicar Ajustes__*/\r\n               \r\n               #propostaLivre_propostaLivreInnerTabContainer>tbody>tr:nth-child(2)>td {\r\n                   display: none !important;\r\n               }\r\n               /*__Oculta DisclousePanelHeader__*/\r\n               \r\n               #propostaLivre_propostaLivreDisclousePanelHeader {\r\n                   display: none !important;\r\n               }\r\n               /*__Formata grid propostaLivreResumo__*/\r\n               \r\n               #propostaLivre_propostaLivreGridPanel>div>div>table {\r\n                   box-sizing: initial !important;\r\n               }\r\n               /*__Muda cor topo da grid Resumo__*/\r\n               \r\n               #propostaLivre_propostaLivreGridPanel>div>div>table>tbody>tr.columnHeadersRow.row>td:nth-child(1)>div>div>table>tbody>tr>td:nth-child(1)>div {\r\n                   color: #333333 !important;\r\n               }\r\n               \r\n               #propostaLivre_propostaLivreGridPanel>div>div>table>tbody>tr.columnHeadersRow.row>td:nth-child(2)>div>div>table>tbody>tr>td:nth-child(1)>div {\r\n                   color: #333333 !important;\r\n               }\r\n               \r\n               #propostaLivre_propostaLivreGridPanel>div>div>table>tbody>tr.columnHeadersRow.row>td:nth-child(5)>div>div>table>tbody>tr>td:nth-child(1)>div {\r\n                   color: #333333 !important;\r\n               }\r\n               \r\n               #propostaLivre_propostaLivreGridPanel>div>div>table>tbody>tr.columnHeadersRow.row>td:nth-child(1) {\r\n                   background: beige !important;\r\n               }\r\n               \r\n               #propostaLivre_propostaLivreGridPanel>div>div>table>tbody>tr.columnHeadersRow.row>td:nth-child(2) {\r\n                   background: beige !important;\r\n               }\r\n               \r\n               #propostaLivre_propostaLivreGridPanel>div>div>table>tbody>tr.columnHeadersRow.row>td:nth-child(5) {\r\n                   background: beige !important;\r\n               }\r\n               /*____Formata Fieldset____*/\r\n               \r\n               #propostaLivre_propostaLivreResumoCaptionPanel {\r\n                   border: none !important;\r\n                   margin-top: 35px !important;\r\n                   width: auto !important;\r\n               }\r\n               \r\n               #propostaLivre_propostaLivreResumoCaptionPanel>legend {\r\n                   position: absolute !important;\r\n                   top: 0 !important;\r\n                   left: 0 !important;\r\n                   margin: 0 !important;\r\n                   width: 100% !important;\r\n                   background: #428bca !important;\r\n                   color: #fff !important;\r\n                   padding: 10px !important;\r\n                   border: none !important;\r\n                   height: 40px !important;\r\n                   font-size: 14px !important;\r\n                   font-weight: normal !important;\r\n                   font-family: Verdana !important;\r\n               }\r\n               \r\n               #propostaLivre_propostaLivreResumoPanel {\r\n                   overflow: hidden !important;\r\n                   position: relative !important;\r\n               }\r\n               \r\n               .faces-NumberBox {\r\n                   color: #403d3d !important;\r\n                   font-weight: bold !important;\r\n                   opacity: 1 !important;\r\n               }\r\n               \r\n               .textBox {\r\n                   opacity: 1 !important;\r\n               }\r\n               /* Formatação interna Dialog Fluxo  da Precificação*/\r\n               \r\n               #propostaLivre_tramitarPropostaLivreDialogBoxWorkflow>div>div>div.dialogTopBar>div.dialogTitle {\r\n                   color: #FFF !important;\r\n                   text-align: left !important;\r\n                   margin: 1px !important;\r\n               }\r\n               \r\n               .dialogTopBarDragHandle {\r\n                   display: none !important;\r\n               }\r\n               \r\n               .dialogTopBar {\r\n                   background: #428bca !important;\r\n                   z-index: initial !important;\r\n                   box-shadow: initial !important;\r\n                   padding: 10px !important;\r\n                   border-radius: 9px 9px 0 0 !important;\r\n               }\r\n               \r\n               #propostaLivre_tramitacaoPropostaLivreFlexTable>tbody>tr:nth-child(1)>td:nth-child(2) {\r\n                   height: 90% !important;\r\n               }\r\n               \r\n               .dialogTitle {\r\n                   color: #000 !important;\r\n                   text-align: left !important;\r\n                   margin: 5px !important;\r\n               }\r\n               \r\n               #propostaLivre_tramitarPropostaLivreHistoricoTramitacaoGrid>div>table>tbody>tr.columnHeadersRow.row {\r\n                   background: beige !important;\r\n               }\r\n               \r\n               #propostaLivre_tramitarPropostaLivreHistoricoTramitacaoGrid>div>table>tbody>tr.columnHeadersRow.row>td:nth-child(1)>div>div>table>tbody>tr>td:nth-child(1)>div {\r\n                   color: #333 !important;\r\n               }\r\n               \r\n               #propostaLivre_tramitarPropostaLivreHistoricoTramitacaoGrid>div>table>tbody>tr.columnHeadersRow.row>td:nth-child(2)>div>div>table>tbody>tr>td:nth-child(1)>div {\r\n                   color: #333 !important;\r\n               }\r\n               \r\n               #propostaLivre_tramitarPropostaLivreHistoricoTramitacaoGrid>div>table>tbody>tr.columnHeadersRow.row>td:nth-child(3)>div>div>table>tbody>tr>td:nth-child(1)>div {\r\n                   color: #333 !important;\r\n               }\r\n               \r\n               #propostaLivre_tramitarPropostaLivreHistoricoTramitacaoGrid>div>table>tbody>tr.columnHeadersRow.row>td:nth-child(4)>div>div>table>tbody>tr>td:nth-child(1)>div {\r\n                   color: #333 !important;\r\n               }\r\n               \r\n               #propostaLivre_tramitacaoPropostaLivreFlexTable>tbody>tr:nth-child(1)>td:nth-child(1) {\r\n                   width: 15% !important;\r\n                   height: 35px !important;\r\n               }\r\n               \r\n               #propostaLivre_propostaLivreGridPanel>div>div>table td:nth-child(3) {\r\n                   display: none !important;\r\n               }\r\n               \r\n               #propostaLivre_propostaLivreGridPanel>div>div>table td:nth-child(4) {\r\n                   display: none !important;\r\n               }\r\n               \r\n               #propostaLivre_propostaLivreResumoFlowPanel {\r\n                   width: 100% !important;\r\n                   margin-left: 1px !important;\r\n                   padding-top: 5px !important;\r\n               }\r\n               \r\n               #propostaLivre_filterPropostaLivreHTMLPanel {\r\n                   display: none;\r\n               }\r\n               \r\n               #propostaLivre_propostaLivreResumoPanel {\r\n                   border: 1px solid #428bca !important;\r\n                   border-top-right-radius: 10px !important;\r\n                   border-top-left-radius: 10px !important;\r\n                   color: #428bca !important;\r\n                   font-size: 13px !important;\r\n                   font-weight: normal !important;\r\n                   width: 98% !important;\r\n                   height: 100% !important;\r\n                   font-family: Verdana !important;\r\n                   margin: 5px !important;\r\n               }\r\n               /*__________Formatação externa Dialog_________*/\r\n               \r\n               .dialogGlass {\r\n                   display: none !important;\r\n                   left: auto !important;\r\n                   top: auto !important;\r\n                   display: block;\r\n                   width: auto !important;\r\n                   height: auto !important;\r\n               }\r\n               \r\n               .faces-popup {\r\n                   box-shadow: none !important;\r\n               }\r\n               \r\n               .popupContent {\r\n                   border: 1px solid #428bca !important;\r\n                   border-top-left-radius: 10px !important;\r\n                   border-top-right-radius: 10px !important;\r\n               }\r\n               \r\n               #body>div.dialogGlass {\r\n                   position: relative !important;\r\n               }\r\n               \r\n               .dialogCloseButton {\r\n                   display: none !important;\r\n               }\r\n               \r\n               #root_viewContainer>div {\r\n                   height: auto !important;\r\n               }\r\n               \r\n               #root_viewContainer {\r\n                   height: auto !important;\r\n               }\r\n               \r\n               #precificacao2f precificacao2e html_viewContainer>div {\r\n                   height: auto !important;\r\n               }\r\n               \r\n               #precificacao2f precificacao2e html_viewContainer {\r\n                   height: auto !important;\r\n               }\r\n               \r\n               #body>div:nth-child(6) {\r\n                   height: auto !important;\r\n               }\r\n               \r\n               #propostaLivre_tramitarPropostaLivreDialogBoxWorkflow {\r\n                   position: relative !important;\r\n                   left: auto !important;\r\n                   top: auto !important;\r\n                   margin: 2px !important;\r\n                   width: 98% !important;\r\n                   transform: initial !important;\r\n                   margin-bottom: 30px !important;\r\n                   margin-top: 30px !important;\r\n                   margin-left: 5px !important;\r\n               }\r\n               \r\n               #propostaLivre_tramitarPropostaLivreHistoricoTramitacaoGrid {\r\n                   border: 1px solid #c0c0c0 !important;\r\n                   border-color: #c0c0c0 !important;\r\n                   margin-bottom: 10px !important;\r\n                   overflow: hidden !important;\r\n               }\r\n               \r\n               #propostaLivre_tramitarPropostaLivreObservacaoTextArea {\r\n                   height: auto !important;\r\n               }\r\n               \r\n               #propostaLivre_tramitacaoPropostaLivreFlexTable {\r\n                   width: 100% !important;\r\n               }\r\n               \r\n               #propostaLivre_tramitacaoPropostaLivreFlexTable>tbody>tr:nth-child(1)>td:nth-child(3) {\r\n                   width: 5% !important;\r\n               }\r\n               \r\n               #propostaLivre_tramitarPropostaLivreDialogBoxWorkflow .crux-Cell .gwt-Label {\r\n                   word-break: break-all !important;\r\n                   white-space: normal !important;\r\n               }\r\n               \r\n               #propostaLivre_tramitarPropostaLivreHistoricoTramitacaoGrid>div>table>tbody>tr.columnHeadersRow.row>td:nth-child(3)>div>div>table>tbody>tr>td:nth-child(1)>div {\r\n                   word-break: normal !important;\r\n                   white-space: nowrap !important;\r\n               }\r\n               \r\n               #propostaLivre_tramitarPropostaLivreHistoricoTramitacaoGrid>div>table>tbody>tr:nth-child(2)>td:nth-child(1)>div>div {\r\n                   word-break: inherit !important;\r\n               }\r\n               \r\n               #propostaLivre_tramitarPropostaLivreHistoricoTramitacaoGrid>div>table>tbody>tr:nth-child(2)>td:nth-child(2)>div>div {\r\n                   word-break: inherit !important;\r\n               }", ""]);

// exports


/***/ }),
/* 5 */
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
/* 6 */
/***/ (function(module, exports) {

module.exports = "<meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\"></meta>";

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
var engine_1 = __webpack_require__(2);
var actionsList = __webpack_require__(3);
engine_1.Engine.runActions(actionsList);


/***/ }),
/* 14 */
/***/ (function(module, exports) {

module.exports = () => {
   

    let check = false;
    (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
    return check;
}


/***/ })
/******/ ]);