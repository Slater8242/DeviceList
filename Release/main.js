/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/DynamicList.ts":
/*!****************************!*\
  !*** ./src/DynamicList.ts ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"DynamicList\": () => (/* binding */ DynamicList),\n/* harmony export */   \"sendData\": () => (/* binding */ sendData),\n/* harmony export */   \"updateData\": () => (/* binding */ updateData)\n/* harmony export */ });\nclass DynamicList {\n    constructor(_root) {\n        this._root = _root;\n    }\n}\nconst table = document.getElementById(\"na-table\");\nfunction sendData(data) {\n    const { is_online, uid, label, manufacturer, model, mode_index, mode_count, address, } = data;\n    const row = table.insertRow();\n    row.classList.add(\"trStyle\");\n    let options = \"\";\n    for (let i = 1; i <= mode_count; i++) {\n        options += `<option ${mode_index === i ? \"selected\" : \"\"}>Mode #${i}</option>`;\n    }\n    const select = `<select>${options}</select>`;\n    let cells = `\n    <td>\n      <span class=\"${is_online ? \"success\" : \"danger\"}\"></span>\n    </td>\n    <td>${uid}</td>\n    <td><span class=\"labelStyle\">${label}</span></td>\n    <td>${manufacturer}</td>\n    <td>${model}</td>\n    <td>${select}</td>\n    <td><span class=\"addressStyle\">${address}</span></td>`;\n    row.innerHTML = cells;\n}\nfunction updateData(data) {\n    const { is_online, uid, label, manufacturer, model, mode_index, mode_count, address, } = data;\n    const is_onlineSpanElem = document.getElementById(`is_online ${uid}`);\n    const labelSpanElem = document.getElementById(`label ${uid}`);\n    const manufacturerTdElem = document.getElementById(`manufacturer ${uid}`);\n    const modelTdElem = document.getElementById(`model ${uid}`);\n    const addressSpanElem = document.getElementById(`address ${uid}`);\n    const selectElem = document.getElementById(`select ${uid}`);\n    for (let i = 1; i <= mode_count; i++) {\n        i == mode_index ? (selectElem.value = `Mode #${i}`) : null;\n    }\n    console.log(selectElem.selectedIndex);\n    labelSpanElem.textContent = label;\n    manufacturerTdElem.textContent = manufacturer;\n    modelTdElem.textContent = model;\n    addressSpanElem.textContent = address.toString();\n    if (is_online == true) {\n        is_onlineSpanElem.classList.remove(\"danger\");\n        is_onlineSpanElem.classList.add(\"success\");\n    }\n    else {\n        is_onlineSpanElem.classList.remove(\"success\");\n        is_onlineSpanElem.classList.add(\"danger\");\n    }\n}\n\n\n//# sourceURL=webpack://webui/./src/DynamicList.ts?");

/***/ }),

/***/ "./src/Server.ts":
/*!***********************!*\
  !*** ./src/Server.ts ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Server\": () => (/* binding */ Server)\n/* harmony export */ });\nclass Server {\n    constructor(_param) {\n        this._param = _param;\n        this.m_Counter = 1;\n        this.m_Devices = [];\n        document.getElementById(\"add_1\").onclick = () => {\n            this.AddDevices(1);\n        };\n        document.getElementById(\"add_10\").onclick = () => {\n            this.AddDevices(10);\n        };\n        document.getElementById(\"add_100\").onclick = () => {\n            this.AddDevices(100);\n        };\n        document.getElementById(\"add_1000\").onclick = () => {\n            this.AddDevices(1000);\n        };\n        document.getElementById(\"all_online\").onclick = () => {\n            for (var i = 0; i < this.m_Devices.length; i++) {\n                var device = this.m_Devices[i];\n                if (device.is_online != true) {\n                    device.is_online = true;\n                    this._param.device_updated_callback(device);\n                }\n            }\n        };\n        document.getElementById(\"all_offline\").onclick = () => {\n            for (var i = 0; i < this.m_Devices.length; i++) {\n                var device = this.m_Devices[i];\n                if (device.is_online != false) {\n                    device.is_online = false;\n                    this._param.device_updated_callback(device);\n                }\n            }\n        };\n        document.getElementById(\"random_online\").onclick = () => {\n            for (var i = 0; i < this.m_Devices.length; i++) {\n                var device = this.m_Devices[i];\n                const random_state = Math.random() > 0.5;\n                if (device.is_online != random_state) {\n                    device.is_online = random_state;\n                    this._param.device_updated_callback(device);\n                }\n            }\n        };\n        document.getElementById(\"all_update\").onclick = () => {\n            var update_list = [];\n            for (var i = 0; i < this.m_Devices.length; i++) {\n                var device = this.m_Devices[i];\n                var updated = false;\n                const random_state = Math.random() > 0.5;\n                const random_address = Math.floor((Math.random() * 511)) + 1;\n                const random_mode = Math.floor((Math.random() * 15));\n                const change_label = Math.random() > 0.75;\n                if (device.is_online != random_state) {\n                    device.is_online = random_state;\n                    updated = true;\n                }\n                if (device.address != random_address) {\n                    device.address = random_address;\n                    updated = true;\n                }\n                if (device.mode_index != random_mode) {\n                    device.mode_index = random_mode;\n                    updated = true;\n                }\n                if (change_label) {\n                    device.label = \"Random Label \" + Math.floor(Math.random() * 1000);\n                    updated = true;\n                }\n                if (updated) {\n                    update_list.push(device);\n                }\n            }\n            for (var i = 0; i < update_list.length; i++) {\n                this._param.device_updated_callback(update_list[i]);\n            }\n        };\n        document.getElementById(\"first_10_update\").onclick = () => {\n            var update_list = [];\n            for (var i = 0; i < Math.min(this.m_Devices.length, 10); i++) {\n                var device = this.m_Devices[i];\n                var updated = false;\n                const random_state = Math.random() > 0.5;\n                const random_address = Math.floor((Math.random() * 511)) + 1;\n                const random_mode = Math.floor((Math.random() * 15));\n                const change_label = Math.random() > 0.75;\n                if (device.is_online != random_state) {\n                    device.is_online = random_state;\n                    updated = true;\n                }\n                if (device.address != random_address) {\n                    device.address = random_address;\n                    updated = true;\n                }\n                if (device.mode_index != random_mode) {\n                    device.mode_index = random_mode;\n                    updated = true;\n                }\n                if (change_label) {\n                    device.label = \"Random Label \" + Math.floor(Math.random() * 1000);\n                    updated = true;\n                }\n                if (updated) {\n                    update_list.push(device);\n                }\n            }\n            for (var i = 0; i < update_list.length; i++) {\n                this._param.device_updated_callback(update_list[i]);\n            }\n        };\n        document.getElementById(\"first_100_update\").onclick = () => {\n            var update_list = [];\n            for (var i = 0; i < Math.min(this.m_Devices.length, 100); i++) {\n                var device = this.m_Devices[i];\n                var updated = false;\n                const random_state = Math.random() > 0.5;\n                const random_address = Math.floor((Math.random() * 511)) + 1;\n                const random_mode = Math.floor((Math.random() * 15));\n                const change_label = Math.random() > 0.75;\n                if (device.is_online != random_state) {\n                    device.is_online = random_state;\n                    updated = true;\n                }\n                if (device.address != random_address) {\n                    device.address = random_address;\n                    updated = true;\n                }\n                if (device.mode_index != random_mode) {\n                    device.mode_index = random_mode;\n                    updated = true;\n                }\n                if (change_label) {\n                    device.label = \"Random Label \" + Math.floor(Math.random() * 1000);\n                    updated = true;\n                }\n                if (updated) {\n                    update_list.push(device);\n                }\n            }\n            for (var i = 0; i < update_list.length; i++) {\n                this._param.device_updated_callback(update_list[i]);\n            }\n        };\n        document.getElementById(\"random_update_50\").onclick = () => {\n            var update_list = [];\n            for (var i = 0; i < this.m_Devices.length; i++) {\n                if (Math.random() > 0.5)\n                    continue;\n                var device = this.m_Devices[i];\n                var updated = false;\n                const random_state = Math.random() > 0.5;\n                const random_address = Math.floor((Math.random() * 511)) + 1;\n                const random_mode = Math.floor((Math.random() * 15));\n                const change_label = Math.random() > 0.75;\n                if (device.is_online != random_state) {\n                    device.is_online = random_state;\n                    updated = true;\n                }\n                if (device.address != random_address) {\n                    device.address = random_address;\n                    updated = true;\n                }\n                if (device.mode_index != random_mode) {\n                    device.address = random_mode;\n                    updated = true;\n                }\n                if (change_label) {\n                    device.label = \"Random Label \" + Math.floor(Math.random() * 1000);\n                    updated = true;\n                }\n                if (updated) {\n                    update_list.push(device);\n                }\n            }\n            for (var i = 0; i < update_list.length; i++) {\n                this._param.device_updated_callback(update_list[i]);\n            }\n        };\n        document.getElementById(\"random_update_2\").onclick = () => {\n            var update_list = [];\n            for (var i = 0; i < this.m_Devices.length; i++) {\n                if (Math.random() > 0.02)\n                    continue;\n                var device = this.m_Devices[i];\n                var updated = false;\n                const random_state = Math.random() > 0.5;\n                const random_address = Math.floor((Math.random() * 511)) + 1;\n                const random_mode = Math.floor((Math.random() * 15));\n                const change_label = Math.random() > 0.75;\n                if (device.is_online != random_state) {\n                    device.is_online = random_state;\n                    updated = true;\n                }\n                if (device.address != random_address) {\n                    device.address = random_address;\n                    updated = true;\n                }\n                if (device.mode_index != random_mode) {\n                    device.address = random_mode;\n                    updated = true;\n                }\n                if (change_label) {\n                    device.label = \"Random Label \" + Math.floor(Math.random() * 1000);\n                    updated = true;\n                }\n                if (updated) {\n                    update_list.push(device);\n                }\n            }\n            for (var i = 0; i < update_list.length; i++) {\n                this._param.device_updated_callback(update_list[i]);\n            }\n        };\n    }\n    GetDeviceCount() {\n        return this.m_Devices.length;\n    }\n    GetDeviceByIndex(index) {\n        return this.m_Devices[index];\n    }\n    AddDevices(count) {\n        for (var i = 0; i < count; i++) {\n            const na = Math.random() > 0.5;\n            this.m_Devices.push({\n                is_online: true,\n                uid: (na ? \"4E41\" : \"1AFA\") + this.m_Counter.toString(16).padStart(8, '0'),\n                uid_integer: BigInt((na ? 0x4E4100000000 : 0x1AFA00000000) + this.m_Counter),\n                label: \"Device \" + this.m_Counter,\n                manufacturer: na ? \"Company NA\" : \"TMB\",\n                model: \"Test Device\",\n                mode_index: 1,\n                mode_count: 16,\n                address: 1,\n            });\n            this.m_Counter++;\n            this._param.device_added_callback(this.m_Devices[this.m_Devices.length - 1]);\n        }\n    }\n}\n\n\n//# sourceURL=webpack://webui/./src/Server.ts?");

/***/ }),

/***/ "./src/main.ts":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"main\": () => (/* binding */ main)\n/* harmony export */ });\n/* harmony import */ var _DynamicList__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./DynamicList */ \"./src/DynamicList.ts\");\n/* harmony import */ var _Server__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Server */ \"./src/Server.ts\");\n\n\nwindow.onload = () => {\n    main();\n};\nvar g_Server;\nvar g_DeviceList;\nfunction main() {\n    g_Server = new _Server__WEBPACK_IMPORTED_MODULE_1__.Server({\n        device_added_callback: (device_data) => {\n            // Called when a new RDM Device has been discovered.\n            // Create an RDM Device entry in the RDM Device List with the values in device_data.\n            (0,_DynamicList__WEBPACK_IMPORTED_MODULE_0__.sendData)(device_data);\n            console.log(\"Add Device\", device_data);\n        },\n        device_updated_callback: (device_data) => {\n            // Called when an RDM Device parameter change is detected.\n            // Update existing associated RDM Device entry in the RDM Device List with the values in device_data.\n            (0,_DynamicList__WEBPACK_IMPORTED_MODULE_0__.updateData)(device_data);\n            console.log(\"Update Device\", device_data);\n        }\n    });\n    // Use Server.GetDeviceCount() to get number of devices in backend device list\n    console.log(\"Current Device Count: \", g_Server.GetDeviceCount());\n    // Use Server.GetDeviceByIndex() to get backend device by index (index 0 - first added device, index 2 - third added device, ...)\n    console.log(\"First Device: \", g_Server.GetDeviceByIndex(0));\n    document.getElementById(\"filter_none\").onclick = () => {\n        console.log(\"Set DynamicList filter to show all devices\");\n    };\n    document.getElementById(\"filter_na\").onclick = () => {\n        console.log('Set DynamicList filter to show devices if RDM_Device.manufacturer == \"Company NA\"');\n    };\n    document.getElementById(\"filter_tmb\").onclick = () => {\n        console.log('Set DynamicList filter to show devices if RDM_Device.manufacturer == \"TMB\"');\n    };\n    document.getElementById(\"sort_uid\").onclick = () => {\n        console.log(\"Set DynamicList sort mode to RDM_Device.uid_value\");\n    };\n    document.getElementById(\"sort_address\").onclick = () => {\n        console.log(\"Set DynamicList sort mode to RDM_Device.address\");\n    };\n    document.getElementById(\"sort_manufacturer\").onclick = () => {\n        console.log(\"Set DynamicList sort mode to RDM_Device.manufacturer\");\n    };\n    g_DeviceList = new _DynamicList__WEBPACK_IMPORTED_MODULE_0__.DynamicList(document.getElementById(\"rdm_device_list\"));\n}\n\n\n//# sourceURL=webpack://webui/./src/main.ts?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/main.ts");
/******/ 	
/******/ })()
;