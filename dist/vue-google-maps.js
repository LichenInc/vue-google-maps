!function(root, factory) {
    "object" == typeof exports && "object" == typeof module ? module.exports = factory() : "function" == typeof define && define.amd ? define([], factory) : "object" == typeof exports ? exports.VueGoogleMap = factory() : root.VueGoogleMap = factory();
}(this, function() {
    return function(modules) {
        function __webpack_require__(moduleId) {
            if (installedModules[moduleId]) return installedModules[moduleId].exports;
            var module = installedModules[moduleId] = {
                exports: {},
                id: moduleId,
                loaded: !1
            };
            return modules[moduleId].call(module.exports, module, module.exports, __webpack_require__), 
            module.loaded = !0, module.exports;
        }
        var installedModules = {};
        return __webpack_require__.m = modules, __webpack_require__.c = installedModules, 
        __webpack_require__.p = "", __webpack_require__(0);
    }([ function(module, exports, __webpack_require__) {
        "use strict";
        function _interopRequireDefault(obj) {
            return obj && obj.__esModule ? obj : {
                default: obj
            };
        }
        Object.defineProperty(exports, "__esModule", {
            value: !0
        }), exports.PlaceInput = exports.Rectangle = exports.Circle = exports.Polygon = exports.Polyline = exports.InfoWindow = exports.Cluster = exports.Marker = exports.Map = exports.loaded = exports.load = void 0;
        var _manager = __webpack_require__(6);
        Object.defineProperty(exports, "load", {
            enumerable: !0,
            get: function() {
                return _manager.load;
            }
        }), Object.defineProperty(exports, "loaded", {
            enumerable: !0,
            get: function() {
                return _manager.loaded;
            }
        });
        var _map = __webpack_require__(70), _map2 = _interopRequireDefault(_map), _marker = __webpack_require__(71), _marker2 = _interopRequireDefault(_marker), _cluster = __webpack_require__(68), _cluster2 = _interopRequireDefault(_cluster), _infoWindow = __webpack_require__(69), _infoWindow2 = _interopRequireDefault(_infoWindow), _polyline = __webpack_require__(74), _polyline2 = _interopRequireDefault(_polyline), _polygon = __webpack_require__(73), _polygon2 = _interopRequireDefault(_polygon), _circle = __webpack_require__(67), _circle2 = _interopRequireDefault(_circle), _rectangle = __webpack_require__(75), _rectangle2 = _interopRequireDefault(_rectangle), _placeInput = __webpack_require__(72), _placeInput2 = _interopRequireDefault(_placeInput);
        exports.Map = _map2.default, exports.Marker = _marker2.default, exports.Cluster = _cluster2.default, 
        exports.InfoWindow = _infoWindow2.default, exports.Polyline = _polyline2.default, 
        exports.Polygon = _polygon2.default, exports.Circle = _circle2.default, exports.Rectangle = _rectangle2.default, 
        exports.PlaceInput = _placeInput2.default;
    }, function(module, exports) {
        "use strict";
        module.exports = window._;
    }, function(module, exports, __webpack_require__) {
        "use strict";
        function _interopRequireDefault(obj) {
            return obj && obj.__esModule ? obj : {
                default: obj
            };
        }
        function capitalizeFirstLetter(string) {
            return string.charAt(0).toUpperCase() + string.slice(1);
        }
        Object.defineProperty(exports, "__esModule", {
            value: !0
        });
        var _lodash = __webpack_require__(1), _lodash2 = _interopRequireDefault(_lodash);
        exports.default = function(vueElement, googleMapsElement, props, options) {
            options = options || {};
            var _options = options, afterModelChanged = _options.afterModelChanged;
            _lodash2.default.forEach(props, function(_ref, attribute) {
                var twoWay = _ref.twoWay, type = _ref.type, setMethodName = "set" + capitalizeFirstLetter(attribute), getMethodName = "get" + capitalizeFirstLetter(attribute), eventName = attribute.toLowerCase() + "_changed";
                if (twoWay) {
                    var stable = 0, modelWatcher = function() {
                        if (stable++, stable > 0) {
                            var attributeValue = vueElement[attribute];
                            googleMapsElement[setMethodName](attributeValue), afterModelChanged && afterModelChanged(attribute, attributeValue);
                        }
                    }, gmapWatcher = function() {
                        if (stable--, stable < 0) {
                            var value = googleMapsElement[getMethodName]();
                            value instanceof google.maps.LatLng ? vueElement[attribute] = {
                                lat: value.lat(),
                                lng: value.lng()
                            } : vueElement[attribute] = value;
                        }
                    };
                    vueElement.$watch(attribute, modelWatcher, {
                        deep: type === Object
                    }), googleMapsElement.addListener(eventName, _lodash2.default.throttle(gmapWatcher, 100, {
                        leading: !0,
                        trailing: !0
                    }));
                } else vueElement.$watch(attribute, function() {
                    var attributeValue = vueElement[attribute];
                    googleMapsElement[setMethodName](attributeValue), afterModelChanged && afterModelChanged(attribute, attributeValue);
                }, {
                    deep: type === Object
                });
            });
        };
    }, function(module, exports, __webpack_require__) {
        "use strict";
        function _interopRequireDefault(obj) {
            return obj && obj.__esModule ? obj : {
                default: obj
            };
        }
        Object.defineProperty(exports, "__esModule", {
            value: !0
        });
        var _lodash = __webpack_require__(1), _lodash2 = _interopRequireDefault(_lodash);
        exports.default = function(vueElement, googleMapObject, events) {
            _lodash2.default.forEach(events, function(eventName) {
                var exposedName = "g-" + eventName;
                googleMapObject.addListener(eventName, function(ev) {
                    vueElement.$emit(exposedName, ev);
                });
            });
        };
    }, function(module, exports, __webpack_require__) {
        "use strict";
        function _interopRequireDefault(obj) {
            return obj && obj.__esModule ? obj : {
                default: obj
            };
        }
        Object.defineProperty(exports, "__esModule", {
            value: !0
        });
        var _lodash = __webpack_require__(1), _lodash2 = _interopRequireDefault(_lodash);
        exports.default = {
            methods: {
                getPropsValues: function() {
                    var _this = this;
                    return _lodash2.default.mapValues(this.$options.props, function(v, k) {
                        return _this[k];
                    });
                }
            }
        };
    }, function(module, exports) {
        var $Object = Object;
        module.exports = {
            create: $Object.create,
            getProto: $Object.getPrototypeOf,
            isEnum: {}.propertyIsEnumerable,
            getDesc: $Object.getOwnPropertyDescriptor,
            setDesc: $Object.defineProperty,
            setDescs: $Object.defineProperties,
            getKeys: $Object.keys,
            getNames: $Object.getOwnPropertyNames,
            getSymbols: $Object.getOwnPropertySymbols,
            each: [].forEach
        };
    }, function(module, exports, __webpack_require__) {
        "use strict";
        function _interopRequireDefault(obj) {
            return obj && obj.__esModule ? obj : {
                default: obj
            };
        }
        Object.defineProperty(exports, "__esModule", {
            value: !0
        }), exports.load = exports.loaded = void 0;
        var _keys = __webpack_require__(35), _keys2 = _interopRequireDefault(_keys), _typeof2 = __webpack_require__(13), _typeof3 = _interopRequireDefault(_typeof2), Q = __webpack_require__(9), setUp = !1, loadingDefered = Q.defer();
        exports.loaded = loadingDefered.promise;
        window.vueGoogleMapsInit = function() {
            loadingDefered.resolve();
        };
        exports.load = function(apiKey, version, libraries, loadCn) {
            if (setUp) throw new Error("You already started the loading of google maps");
            var googleMapScript = document.createElement("SCRIPT"), options = {};
            if ("string" == typeof apiKey) options.key = apiKey; else {
                if ("object" != ("undefined" == typeof apiKey ? "undefined" : (0, _typeof3.default)(apiKey))) throw new Error("apiKey should either be a string or an object");
                for (var k in apiKey) options[k] = apiKey[k];
            }
            var librariesPath = "";
            libraries && libraries.length > 0 ? (librariesPath = libraries.join(","), options.libraries = librariesPath) : Array.prototype.isPrototypeOf(options.libraries) && (options.libraries = options.libraries.join(",")), 
            options.callback = "vueGoogleMapsInit", version && (url = url + "&v=" + version);
            var baseUrl = "https://maps.googleapis.com/";
            "boolean" == typeof loadCn && loadCn === !0 && (baseUrl = "http://maps.google.cn/");
            var url = baseUrl + "maps/api/js?" + (0, _keys2.default)(options).map(function(key) {
                return encodeURIComponent(key) + "=" + encodeURIComponent(options[key]);
            }).join("&");
            googleMapScript.setAttribute("src", url), googleMapScript.setAttribute("async", ""), 
            googleMapScript.setAttribute("defer", ""), document.body.appendChild(googleMapScript);
        };
    }, function(module, exports) {
        var core = module.exports = {
            version: "1.2.6"
        };
        "number" == typeof __e && (__e = core);
    }, function(module, exports) {
        var global = module.exports = "undefined" != typeof window && window.Math == Math ? window : "undefined" != typeof self && self.Math == Math ? self : Function("return this")();
        "number" == typeof __g && (__g = global);
    }, function(module, exports, __webpack_require__) {
        (function(process, setImmediate) {
            /*!
	 *
	 * Copyright 2009-2012 Kris Kowal under the terms of the MIT
	 * license found at http://github.com/kriskowal/q/raw/master/LICENSE
	 *
	 * With parts by Tyler Close
	 * Copyright 2007-2009 Tyler Close under the terms of the MIT X license found
	 * at http://www.opensource.org/licenses/mit-license.html
	 * Forked at ref_send.js version: 2009-05-11
	 *
	 * With parts by Mark Miller
	 * Copyright (C) 2011 Google Inc.
	 *
	 * Licensed under the Apache License, Version 2.0 (the "License");
	 * you may not use this file except in compliance with the License.
	 * You may obtain a copy of the License at
	 *
	 * http://www.apache.org/licenses/LICENSE-2.0
	 *
	 * Unless required by applicable law or agreed to in writing, software
	 * distributed under the License is distributed on an "AS IS" BASIS,
	 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	 * See the License for the specific language governing permissions and
	 * limitations under the License.
	 *
	 */
            !function(definition) {
                "use strict";
                if ("function" == typeof bootstrap) bootstrap("promise", definition); else {
                    module.exports = definition();
                }
            }(function() {
                "use strict";
                function uncurryThis(f) {
                    return function() {
                        return call.apply(f, arguments);
                    };
                }
                function isObject(value) {
                    return value === Object(value);
                }
                function isStopIteration(exception) {
                    return "[object StopIteration]" === object_toString(exception) || exception instanceof QReturnValue;
                }
                function makeStackTraceLong(error, promise) {
                    if (hasStacks && promise.stack && "object" == typeof error && null !== error && error.stack && error.stack.indexOf(STACK_JUMP_SEPARATOR) === -1) {
                        for (var stacks = [], p = promise; p; p = p.source) p.stack && stacks.unshift(p.stack);
                        stacks.unshift(error.stack);
                        var concatedStacks = stacks.join("\n" + STACK_JUMP_SEPARATOR + "\n");
                        error.stack = filterStackString(concatedStacks);
                    }
                }
                function filterStackString(stackString) {
                    for (var lines = stackString.split("\n"), desiredLines = [], i = 0; i < lines.length; ++i) {
                        var line = lines[i];
                        isInternalFrame(line) || isNodeFrame(line) || !line || desiredLines.push(line);
                    }
                    return desiredLines.join("\n");
                }
                function isNodeFrame(stackLine) {
                    return stackLine.indexOf("(module.js:") !== -1 || stackLine.indexOf("(node.js:") !== -1;
                }
                function getFileNameAndLineNumber(stackLine) {
                    var attempt1 = /at .+ \((.+):(\d+):(?:\d+)\)$/.exec(stackLine);
                    if (attempt1) return [ attempt1[1], Number(attempt1[2]) ];
                    var attempt2 = /at ([^ ]+):(\d+):(?:\d+)$/.exec(stackLine);
                    if (attempt2) return [ attempt2[1], Number(attempt2[2]) ];
                    var attempt3 = /.*@(.+):(\d+)$/.exec(stackLine);
                    return attempt3 ? [ attempt3[1], Number(attempt3[2]) ] : void 0;
                }
                function isInternalFrame(stackLine) {
                    var fileNameAndLineNumber = getFileNameAndLineNumber(stackLine);
                    if (!fileNameAndLineNumber) return !1;
                    var fileName = fileNameAndLineNumber[0], lineNumber = fileNameAndLineNumber[1];
                    return fileName === qFileName && lineNumber >= qStartingLine && lineNumber <= qEndingLine;
                }
                function captureLine() {
                    if (hasStacks) try {
                        throw new Error();
                    } catch (e) {
                        var lines = e.stack.split("\n"), firstLine = lines[0].indexOf("@") > 0 ? lines[1] : lines[2], fileNameAndLineNumber = getFileNameAndLineNumber(firstLine);
                        if (!fileNameAndLineNumber) return;
                        return qFileName = fileNameAndLineNumber[0], fileNameAndLineNumber[1];
                    }
                }
                function deprecate(callback, name, alternative) {
                    return function() {
                        return "undefined" != typeof console && "function" == typeof console.warn && console.warn(name + " is deprecated, use " + alternative + " instead.", new Error("").stack), 
                        callback.apply(callback, arguments);
                    };
                }
                function Q(value) {
                    return value instanceof Promise ? value : isPromiseAlike(value) ? coerce(value) : fulfill(value);
                }
                function defer() {
                    function become(newPromise) {
                        resolvedPromise = newPromise, promise.source = newPromise, array_reduce(messages, function(undefined, message) {
                            Q.nextTick(function() {
                                newPromise.promiseDispatch.apply(newPromise, message);
                            });
                        }, void 0), messages = void 0, progressListeners = void 0;
                    }
                    var resolvedPromise, messages = [], progressListeners = [], deferred = object_create(defer.prototype), promise = object_create(Promise.prototype);
                    if (promise.promiseDispatch = function(resolve, op, operands) {
                        var args = array_slice(arguments);
                        messages ? (messages.push(args), "when" === op && operands[1] && progressListeners.push(operands[1])) : Q.nextTick(function() {
                            resolvedPromise.promiseDispatch.apply(resolvedPromise, args);
                        });
                    }, promise.valueOf = function() {
                        if (messages) return promise;
                        var nearerValue = nearer(resolvedPromise);
                        return isPromise(nearerValue) && (resolvedPromise = nearerValue), nearerValue;
                    }, promise.inspect = function() {
                        return resolvedPromise ? resolvedPromise.inspect() : {
                            state: "pending"
                        };
                    }, Q.longStackSupport && hasStacks) try {
                        throw new Error();
                    } catch (e) {
                        promise.stack = e.stack.substring(e.stack.indexOf("\n") + 1);
                    }
                    return deferred.promise = promise, deferred.resolve = function(value) {
                        resolvedPromise || become(Q(value));
                    }, deferred.fulfill = function(value) {
                        resolvedPromise || become(fulfill(value));
                    }, deferred.reject = function(reason) {
                        resolvedPromise || become(reject(reason));
                    }, deferred.notify = function(progress) {
                        resolvedPromise || array_reduce(progressListeners, function(undefined, progressListener) {
                            Q.nextTick(function() {
                                progressListener(progress);
                            });
                        }, void 0);
                    }, deferred;
                }
                function promise(resolver) {
                    if ("function" != typeof resolver) throw new TypeError("resolver must be a function.");
                    var deferred = defer();
                    try {
                        resolver(deferred.resolve, deferred.reject, deferred.notify);
                    } catch (reason) {
                        deferred.reject(reason);
                    }
                    return deferred.promise;
                }
                function race(answerPs) {
                    return promise(function(resolve, reject) {
                        for (var i = 0, len = answerPs.length; i < len; i++) Q(answerPs[i]).then(resolve, reject);
                    });
                }
                function Promise(descriptor, fallback, inspect) {
                    void 0 === fallback && (fallback = function(op) {
                        return reject(new Error("Promise does not support operation: " + op));
                    }), void 0 === inspect && (inspect = function() {
                        return {
                            state: "unknown"
                        };
                    });
                    var promise = object_create(Promise.prototype);
                    if (promise.promiseDispatch = function(resolve, op, args) {
                        var result;
                        try {
                            result = descriptor[op] ? descriptor[op].apply(promise, args) : fallback.call(promise, op, args);
                        } catch (exception) {
                            result = reject(exception);
                        }
                        resolve && resolve(result);
                    }, promise.inspect = inspect, inspect) {
                        var inspected = inspect();
                        "rejected" === inspected.state && (promise.exception = inspected.reason), promise.valueOf = function() {
                            var inspected = inspect();
                            return "pending" === inspected.state || "rejected" === inspected.state ? promise : inspected.value;
                        };
                    }
                    return promise;
                }
                function when(value, fulfilled, rejected, progressed) {
                    return Q(value).then(fulfilled, rejected, progressed);
                }
                function nearer(value) {
                    if (isPromise(value)) {
                        var inspected = value.inspect();
                        if ("fulfilled" === inspected.state) return inspected.value;
                    }
                    return value;
                }
                function isPromise(object) {
                    return object instanceof Promise;
                }
                function isPromiseAlike(object) {
                    return isObject(object) && "function" == typeof object.then;
                }
                function isPending(object) {
                    return isPromise(object) && "pending" === object.inspect().state;
                }
                function isFulfilled(object) {
                    return !isPromise(object) || "fulfilled" === object.inspect().state;
                }
                function isRejected(object) {
                    return isPromise(object) && "rejected" === object.inspect().state;
                }
                function resetUnhandledRejections() {
                    unhandledReasons.length = 0, unhandledRejections.length = 0, trackUnhandledRejections || (trackUnhandledRejections = !0);
                }
                function trackRejection(promise, reason) {
                    trackUnhandledRejections && ("object" == typeof process && "function" == typeof process.emit && Q.nextTick.runAfter(function() {
                        array_indexOf(unhandledRejections, promise) !== -1 && (process.emit("unhandledRejection", reason, promise), 
                        reportedUnhandledRejections.push(promise));
                    }), unhandledRejections.push(promise), reason && "undefined" != typeof reason.stack ? unhandledReasons.push(reason.stack) : unhandledReasons.push("(no stack) " + reason));
                }
                function untrackRejection(promise) {
                    if (trackUnhandledRejections) {
                        var at = array_indexOf(unhandledRejections, promise);
                        at !== -1 && ("object" == typeof process && "function" == typeof process.emit && Q.nextTick.runAfter(function() {
                            var atReport = array_indexOf(reportedUnhandledRejections, promise);
                            atReport !== -1 && (process.emit("rejectionHandled", unhandledReasons[at], promise), 
                            reportedUnhandledRejections.splice(atReport, 1));
                        }), unhandledRejections.splice(at, 1), unhandledReasons.splice(at, 1));
                    }
                }
                function reject(reason) {
                    var rejection = Promise({
                        when: function(rejected) {
                            return rejected && untrackRejection(this), rejected ? rejected(reason) : this;
                        }
                    }, function() {
                        return this;
                    }, function() {
                        return {
                            state: "rejected",
                            reason: reason
                        };
                    });
                    return trackRejection(rejection, reason), rejection;
                }
                function fulfill(value) {
                    return Promise({
                        when: function() {
                            return value;
                        },
                        get: function(name) {
                            return value[name];
                        },
                        set: function(name, rhs) {
                            value[name] = rhs;
                        },
                        delete: function(name) {
                            delete value[name];
                        },
                        post: function(name, args) {
                            return null === name || void 0 === name ? value.apply(void 0, args) : value[name].apply(value, args);
                        },
                        apply: function(thisp, args) {
                            return value.apply(thisp, args);
                        },
                        keys: function() {
                            return object_keys(value);
                        }
                    }, void 0, function() {
                        return {
                            state: "fulfilled",
                            value: value
                        };
                    });
                }
                function coerce(promise) {
                    var deferred = defer();
                    return Q.nextTick(function() {
                        try {
                            promise.then(deferred.resolve, deferred.reject, deferred.notify);
                        } catch (exception) {
                            deferred.reject(exception);
                        }
                    }), deferred.promise;
                }
                function master(object) {
                    return Promise({
                        isDef: function() {}
                    }, function(op, args) {
                        return dispatch(object, op, args);
                    }, function() {
                        return Q(object).inspect();
                    });
                }
                function spread(value, fulfilled, rejected) {
                    return Q(value).spread(fulfilled, rejected);
                }
                function async(makeGenerator) {
                    return function() {
                        function continuer(verb, arg) {
                            var result;
                            if ("undefined" == typeof StopIteration) {
                                try {
                                    result = generator[verb](arg);
                                } catch (exception) {
                                    return reject(exception);
                                }
                                return result.done ? Q(result.value) : when(result.value, callback, errback);
                            }
                            try {
                                result = generator[verb](arg);
                            } catch (exception) {
                                return isStopIteration(exception) ? Q(exception.value) : reject(exception);
                            }
                            return when(result, callback, errback);
                        }
                        var generator = makeGenerator.apply(this, arguments), callback = continuer.bind(continuer, "next"), errback = continuer.bind(continuer, "throw");
                        return callback();
                    };
                }
                function spawn(makeGenerator) {
                    Q.done(Q.async(makeGenerator)());
                }
                function _return(value) {
                    throw new QReturnValue(value);
                }
                function promised(callback) {
                    return function() {
                        return spread([ this, all(arguments) ], function(self, args) {
                            return callback.apply(self, args);
                        });
                    };
                }
                function dispatch(object, op, args) {
                    return Q(object).dispatch(op, args);
                }
                function all(promises) {
                    return when(promises, function(promises) {
                        var pendingCount = 0, deferred = defer();
                        return array_reduce(promises, function(undefined, promise, index) {
                            var snapshot;
                            isPromise(promise) && "fulfilled" === (snapshot = promise.inspect()).state ? promises[index] = snapshot.value : (++pendingCount, 
                            when(promise, function(value) {
                                promises[index] = value, 0 === --pendingCount && deferred.resolve(promises);
                            }, deferred.reject, function(progress) {
                                deferred.notify({
                                    index: index,
                                    value: progress
                                });
                            }));
                        }, void 0), 0 === pendingCount && deferred.resolve(promises), deferred.promise;
                    });
                }
                function any(promises) {
                    if (0 === promises.length) return Q.resolve();
                    var deferred = Q.defer(), pendingCount = 0;
                    return array_reduce(promises, function(prev, current, index) {
                        function onFulfilled(result) {
                            deferred.resolve(result);
                        }
                        function onRejected() {
                            pendingCount--, 0 === pendingCount && deferred.reject(new Error("Can't get fulfillment value from any promise, all promises were rejected."));
                        }
                        function onProgress(progress) {
                            deferred.notify({
                                index: index,
                                value: progress
                            });
                        }
                        var promise = promises[index];
                        pendingCount++, when(promise, onFulfilled, onRejected, onProgress);
                    }, void 0), deferred.promise;
                }
                function allResolved(promises) {
                    return when(promises, function(promises) {
                        return promises = array_map(promises, Q), when(all(array_map(promises, function(promise) {
                            return when(promise, noop, noop);
                        })), function() {
                            return promises;
                        });
                    });
                }
                function allSettled(promises) {
                    return Q(promises).allSettled();
                }
                function progress(object, progressed) {
                    return Q(object).then(void 0, void 0, progressed);
                }
                function nodeify(object, nodeback) {
                    return Q(object).nodeify(nodeback);
                }
                var hasStacks = !1;
                try {
                    throw new Error();
                } catch (e) {
                    hasStacks = !!e.stack;
                }
                var qFileName, QReturnValue, qStartingLine = captureLine(), noop = function() {}, nextTick = function() {
                    function flush() {
                        for (var task, domain; head.next; ) head = head.next, task = head.task, head.task = void 0, 
                        domain = head.domain, domain && (head.domain = void 0, domain.enter()), runSingle(task, domain);
                        for (;laterQueue.length; ) task = laterQueue.pop(), runSingle(task);
                        flushing = !1;
                    }
                    function runSingle(task, domain) {
                        try {
                            task();
                        } catch (e) {
                            if (isNodeJS) throw domain && domain.exit(), setTimeout(flush, 0), domain && domain.enter(), 
                            e;
                            setTimeout(function() {
                                throw e;
                            }, 0);
                        }
                        domain && domain.exit();
                    }
                    var head = {
                        task: void 0,
                        next: null
                    }, tail = head, flushing = !1, requestTick = void 0, isNodeJS = !1, laterQueue = [];
                    if (nextTick = function(task) {
                        tail = tail.next = {
                            task: task,
                            domain: isNodeJS && process.domain,
                            next: null
                        }, flushing || (flushing = !0, requestTick());
                    }, "object" == typeof process && "[object process]" === process.toString() && process.nextTick) isNodeJS = !0, 
                    requestTick = function() {
                        process.nextTick(flush);
                    }; else if ("function" == typeof setImmediate) requestTick = "undefined" != typeof window ? setImmediate.bind(window, flush) : function() {
                        setImmediate(flush);
                    }; else if ("undefined" != typeof MessageChannel) {
                        var channel = new MessageChannel();
                        channel.port1.onmessage = function() {
                            requestTick = requestPortTick, channel.port1.onmessage = flush, flush();
                        };
                        var requestPortTick = function() {
                            channel.port2.postMessage(0);
                        };
                        requestTick = function() {
                            setTimeout(flush, 0), requestPortTick();
                        };
                    } else requestTick = function() {
                        setTimeout(flush, 0);
                    };
                    return nextTick.runAfter = function(task) {
                        laterQueue.push(task), flushing || (flushing = !0, requestTick());
                    }, nextTick;
                }(), call = Function.call, array_slice = uncurryThis(Array.prototype.slice), array_reduce = uncurryThis(Array.prototype.reduce || function(callback, basis) {
                    var index = 0, length = this.length;
                    if (1 === arguments.length) for (;;) {
                        if (index in this) {
                            basis = this[index++];
                            break;
                        }
                        if (++index >= length) throw new TypeError();
                    }
                    for (;index < length; index++) index in this && (basis = callback(basis, this[index], index));
                    return basis;
                }), array_indexOf = uncurryThis(Array.prototype.indexOf || function(value) {
                    for (var i = 0; i < this.length; i++) if (this[i] === value) return i;
                    return -1;
                }), array_map = uncurryThis(Array.prototype.map || function(callback, thisp) {
                    var self = this, collect = [];
                    return array_reduce(self, function(undefined, value, index) {
                        collect.push(callback.call(thisp, value, index, self));
                    }, void 0), collect;
                }), object_create = Object.create || function(prototype) {
                    function Type() {}
                    return Type.prototype = prototype, new Type();
                }, object_hasOwnProperty = uncurryThis(Object.prototype.hasOwnProperty), object_keys = Object.keys || function(object) {
                    var keys = [];
                    for (var key in object) object_hasOwnProperty(object, key) && keys.push(key);
                    return keys;
                }, object_toString = uncurryThis(Object.prototype.toString);
                QReturnValue = "undefined" != typeof ReturnValue ? ReturnValue : function(value) {
                    this.value = value;
                };
                var STACK_JUMP_SEPARATOR = "From previous event:";
                Q.resolve = Q, Q.nextTick = nextTick, Q.longStackSupport = !1, "object" == typeof process && process && {
                    NODE_ENV: "production"
                }.Q_DEBUG && (Q.longStackSupport = !0), Q.defer = defer, defer.prototype.makeNodeResolver = function() {
                    var self = this;
                    return function(error, value) {
                        error ? self.reject(error) : arguments.length > 2 ? self.resolve(array_slice(arguments, 1)) : self.resolve(value);
                    };
                }, Q.Promise = promise, Q.promise = promise, promise.race = race, promise.all = all, 
                promise.reject = reject, promise.resolve = Q, Q.passByCopy = function(object) {
                    return object;
                }, Promise.prototype.passByCopy = function() {
                    return this;
                }, Q.join = function(x, y) {
                    return Q(x).join(y);
                }, Promise.prototype.join = function(that) {
                    return Q([ this, that ]).spread(function(x, y) {
                        if (x === y) return x;
                        throw new Error("Can't join: not the same: " + x + " " + y);
                    });
                }, Q.race = race, Promise.prototype.race = function() {
                    return this.then(Q.race);
                }, Q.makePromise = Promise, Promise.prototype.toString = function() {
                    return "[object Promise]";
                }, Promise.prototype.then = function(fulfilled, rejected, progressed) {
                    function _fulfilled(value) {
                        try {
                            return "function" == typeof fulfilled ? fulfilled(value) : value;
                        } catch (exception) {
                            return reject(exception);
                        }
                    }
                    function _rejected(exception) {
                        if ("function" == typeof rejected) {
                            makeStackTraceLong(exception, self);
                            try {
                                return rejected(exception);
                            } catch (newException) {
                                return reject(newException);
                            }
                        }
                        return reject(exception);
                    }
                    function _progressed(value) {
                        return "function" == typeof progressed ? progressed(value) : value;
                    }
                    var self = this, deferred = defer(), done = !1;
                    return Q.nextTick(function() {
                        self.promiseDispatch(function(value) {
                            done || (done = !0, deferred.resolve(_fulfilled(value)));
                        }, "when", [ function(exception) {
                            done || (done = !0, deferred.resolve(_rejected(exception)));
                        } ]);
                    }), self.promiseDispatch(void 0, "when", [ void 0, function(value) {
                        var newValue, threw = !1;
                        try {
                            newValue = _progressed(value);
                        } catch (e) {
                            if (threw = !0, !Q.onerror) throw e;
                            Q.onerror(e);
                        }
                        threw || deferred.notify(newValue);
                    } ]), deferred.promise;
                }, Q.tap = function(promise, callback) {
                    return Q(promise).tap(callback);
                }, Promise.prototype.tap = function(callback) {
                    return callback = Q(callback), this.then(function(value) {
                        return callback.fcall(value).thenResolve(value);
                    });
                }, Q.when = when, Promise.prototype.thenResolve = function(value) {
                    return this.then(function() {
                        return value;
                    });
                }, Q.thenResolve = function(promise, value) {
                    return Q(promise).thenResolve(value);
                }, Promise.prototype.thenReject = function(reason) {
                    return this.then(function() {
                        throw reason;
                    });
                }, Q.thenReject = function(promise, reason) {
                    return Q(promise).thenReject(reason);
                }, Q.nearer = nearer, Q.isPromise = isPromise, Q.isPromiseAlike = isPromiseAlike, 
                Q.isPending = isPending, Promise.prototype.isPending = function() {
                    return "pending" === this.inspect().state;
                }, Q.isFulfilled = isFulfilled, Promise.prototype.isFulfilled = function() {
                    return "fulfilled" === this.inspect().state;
                }, Q.isRejected = isRejected, Promise.prototype.isRejected = function() {
                    return "rejected" === this.inspect().state;
                };
                var unhandledReasons = [], unhandledRejections = [], reportedUnhandledRejections = [], trackUnhandledRejections = !0;
                Q.resetUnhandledRejections = resetUnhandledRejections, Q.getUnhandledReasons = function() {
                    return unhandledReasons.slice();
                }, Q.stopUnhandledRejectionTracking = function() {
                    resetUnhandledRejections(), trackUnhandledRejections = !1;
                }, resetUnhandledRejections(), Q.reject = reject, Q.fulfill = fulfill, Q.master = master, 
                Q.spread = spread, Promise.prototype.spread = function(fulfilled, rejected) {
                    return this.all().then(function(array) {
                        return fulfilled.apply(void 0, array);
                    }, rejected);
                }, Q.async = async, Q.spawn = spawn, Q.return = _return, Q.promised = promised, 
                Q.dispatch = dispatch, Promise.prototype.dispatch = function(op, args) {
                    var self = this, deferred = defer();
                    return Q.nextTick(function() {
                        self.promiseDispatch(deferred.resolve, op, args);
                    }), deferred.promise;
                }, Q.get = function(object, key) {
                    return Q(object).dispatch("get", [ key ]);
                }, Promise.prototype.get = function(key) {
                    return this.dispatch("get", [ key ]);
                }, Q.set = function(object, key, value) {
                    return Q(object).dispatch("set", [ key, value ]);
                }, Promise.prototype.set = function(key, value) {
                    return this.dispatch("set", [ key, value ]);
                }, Q.del = Q.delete = function(object, key) {
                    return Q(object).dispatch("delete", [ key ]);
                }, Promise.prototype.del = Promise.prototype.delete = function(key) {
                    return this.dispatch("delete", [ key ]);
                }, Q.mapply = Q.post = function(object, name, args) {
                    return Q(object).dispatch("post", [ name, args ]);
                }, Promise.prototype.mapply = Promise.prototype.post = function(name, args) {
                    return this.dispatch("post", [ name, args ]);
                }, Q.send = Q.mcall = Q.invoke = function(object, name) {
                    return Q(object).dispatch("post", [ name, array_slice(arguments, 2) ]);
                }, Promise.prototype.send = Promise.prototype.mcall = Promise.prototype.invoke = function(name) {
                    return this.dispatch("post", [ name, array_slice(arguments, 1) ]);
                }, Q.fapply = function(object, args) {
                    return Q(object).dispatch("apply", [ void 0, args ]);
                }, Promise.prototype.fapply = function(args) {
                    return this.dispatch("apply", [ void 0, args ]);
                }, Q.try = Q.fcall = function(object) {
                    return Q(object).dispatch("apply", [ void 0, array_slice(arguments, 1) ]);
                }, Promise.prototype.fcall = function() {
                    return this.dispatch("apply", [ void 0, array_slice(arguments) ]);
                }, Q.fbind = function(object) {
                    var promise = Q(object), args = array_slice(arguments, 1);
                    return function() {
                        return promise.dispatch("apply", [ this, args.concat(array_slice(arguments)) ]);
                    };
                }, Promise.prototype.fbind = function() {
                    var promise = this, args = array_slice(arguments);
                    return function() {
                        return promise.dispatch("apply", [ this, args.concat(array_slice(arguments)) ]);
                    };
                }, Q.keys = function(object) {
                    return Q(object).dispatch("keys", []);
                }, Promise.prototype.keys = function() {
                    return this.dispatch("keys", []);
                }, Q.all = all, Promise.prototype.all = function() {
                    return all(this);
                }, Q.any = any, Promise.prototype.any = function() {
                    return any(this);
                }, Q.allResolved = deprecate(allResolved, "allResolved", "allSettled"), Promise.prototype.allResolved = function() {
                    return allResolved(this);
                }, Q.allSettled = allSettled, Promise.prototype.allSettled = function() {
                    return this.then(function(promises) {
                        return all(array_map(promises, function(promise) {
                            function regardless() {
                                return promise.inspect();
                            }
                            return promise = Q(promise), promise.then(regardless, regardless);
                        }));
                    });
                }, Q.fail = Q.catch = function(object, rejected) {
                    return Q(object).then(void 0, rejected);
                }, Promise.prototype.fail = Promise.prototype.catch = function(rejected) {
                    return this.then(void 0, rejected);
                }, Q.progress = progress, Promise.prototype.progress = function(progressed) {
                    return this.then(void 0, void 0, progressed);
                }, Q.fin = Q.finally = function(object, callback) {
                    return Q(object).finally(callback);
                }, Promise.prototype.fin = Promise.prototype.finally = function(callback) {
                    return callback = Q(callback), this.then(function(value) {
                        return callback.fcall().then(function() {
                            return value;
                        });
                    }, function(reason) {
                        return callback.fcall().then(function() {
                            throw reason;
                        });
                    });
                }, Q.done = function(object, fulfilled, rejected, progress) {
                    return Q(object).done(fulfilled, rejected, progress);
                }, Promise.prototype.done = function(fulfilled, rejected, progress) {
                    var onUnhandledError = function(error) {
                        Q.nextTick(function() {
                            if (makeStackTraceLong(error, promise), !Q.onerror) throw error;
                            Q.onerror(error);
                        });
                    }, promise = fulfilled || rejected || progress ? this.then(fulfilled, rejected, progress) : this;
                    "object" == typeof process && process && process.domain && (onUnhandledError = process.domain.bind(onUnhandledError)), 
                    promise.then(void 0, onUnhandledError);
                }, Q.timeout = function(object, ms, error) {
                    return Q(object).timeout(ms, error);
                }, Promise.prototype.timeout = function(ms, error) {
                    var deferred = defer(), timeoutId = setTimeout(function() {
                        error && "string" != typeof error || (error = new Error(error || "Timed out after " + ms + " ms"), 
                        error.code = "ETIMEDOUT"), deferred.reject(error);
                    }, ms);
                    return this.then(function(value) {
                        clearTimeout(timeoutId), deferred.resolve(value);
                    }, function(exception) {
                        clearTimeout(timeoutId), deferred.reject(exception);
                    }, deferred.notify), deferred.promise;
                }, Q.delay = function(object, timeout) {
                    return void 0 === timeout && (timeout = object, object = void 0), Q(object).delay(timeout);
                }, Promise.prototype.delay = function(timeout) {
                    return this.then(function(value) {
                        var deferred = defer();
                        return setTimeout(function() {
                            deferred.resolve(value);
                        }, timeout), deferred.promise;
                    });
                }, Q.nfapply = function(callback, args) {
                    return Q(callback).nfapply(args);
                }, Promise.prototype.nfapply = function(args) {
                    var deferred = defer(), nodeArgs = array_slice(args);
                    return nodeArgs.push(deferred.makeNodeResolver()), this.fapply(nodeArgs).fail(deferred.reject), 
                    deferred.promise;
                }, Q.nfcall = function(callback) {
                    var args = array_slice(arguments, 1);
                    return Q(callback).nfapply(args);
                }, Promise.prototype.nfcall = function() {
                    var nodeArgs = array_slice(arguments), deferred = defer();
                    return nodeArgs.push(deferred.makeNodeResolver()), this.fapply(nodeArgs).fail(deferred.reject), 
                    deferred.promise;
                }, Q.nfbind = Q.denodeify = function(callback) {
                    var baseArgs = array_slice(arguments, 1);
                    return function() {
                        var nodeArgs = baseArgs.concat(array_slice(arguments)), deferred = defer();
                        return nodeArgs.push(deferred.makeNodeResolver()), Q(callback).fapply(nodeArgs).fail(deferred.reject), 
                        deferred.promise;
                    };
                }, Promise.prototype.nfbind = Promise.prototype.denodeify = function() {
                    var args = array_slice(arguments);
                    return args.unshift(this), Q.denodeify.apply(void 0, args);
                }, Q.nbind = function(callback, thisp) {
                    var baseArgs = array_slice(arguments, 2);
                    return function() {
                        function bound() {
                            return callback.apply(thisp, arguments);
                        }
                        var nodeArgs = baseArgs.concat(array_slice(arguments)), deferred = defer();
                        return nodeArgs.push(deferred.makeNodeResolver()), Q(bound).fapply(nodeArgs).fail(deferred.reject), 
                        deferred.promise;
                    };
                }, Promise.prototype.nbind = function() {
                    var args = array_slice(arguments, 0);
                    return args.unshift(this), Q.nbind.apply(void 0, args);
                }, Q.nmapply = Q.npost = function(object, name, args) {
                    return Q(object).npost(name, args);
                }, Promise.prototype.nmapply = Promise.prototype.npost = function(name, args) {
                    var nodeArgs = array_slice(args || []), deferred = defer();
                    return nodeArgs.push(deferred.makeNodeResolver()), this.dispatch("post", [ name, nodeArgs ]).fail(deferred.reject), 
                    deferred.promise;
                }, Q.nsend = Q.nmcall = Q.ninvoke = function(object, name) {
                    var nodeArgs = array_slice(arguments, 2), deferred = defer();
                    return nodeArgs.push(deferred.makeNodeResolver()), Q(object).dispatch("post", [ name, nodeArgs ]).fail(deferred.reject), 
                    deferred.promise;
                }, Promise.prototype.nsend = Promise.prototype.nmcall = Promise.prototype.ninvoke = function(name) {
                    var nodeArgs = array_slice(arguments, 1), deferred = defer();
                    return nodeArgs.push(deferred.makeNodeResolver()), this.dispatch("post", [ name, nodeArgs ]).fail(deferred.reject), 
                    deferred.promise;
                }, Q.nodeify = nodeify, Promise.prototype.nodeify = function(nodeback) {
                    return nodeback ? void this.then(function(value) {
                        Q.nextTick(function() {
                            nodeback(null, value);
                        });
                    }, function(error) {
                        Q.nextTick(function() {
                            nodeback(error);
                        });
                    }) : this;
                }, Q.noConflict = function() {
                    throw new Error("Q.noConflict only works when Q is used as a global");
                };
                var qEndingLine = captureLine();
                return Q;
            });
        }).call(exports, __webpack_require__(23), __webpack_require__(12).setImmediate);
    }, function(module, exports) {
        module.exports = function(exec) {
            try {
                return !!exec();
            } catch (e) {
                return !0;
            }
        };
    }, function(module, exports, __webpack_require__) {
        var IObject = __webpack_require__(45), defined = __webpack_require__(15);
        module.exports = function(it) {
            return IObject(defined(it));
        };
    }, function(module, exports, __webpack_require__) {
        (function(setImmediate, clearImmediate) {
            function Timeout(id, clearFn) {
                this._id = id, this._clearFn = clearFn;
            }
            var nextTick = __webpack_require__(23).nextTick, apply = Function.prototype.apply, slice = Array.prototype.slice, immediateIds = {}, nextImmediateId = 0;
            exports.setTimeout = function() {
                return new Timeout(apply.call(setTimeout, window, arguments), clearTimeout);
            }, exports.setInterval = function() {
                return new Timeout(apply.call(setInterval, window, arguments), clearInterval);
            }, exports.clearTimeout = exports.clearInterval = function(timeout) {
                timeout.close();
            }, Timeout.prototype.unref = Timeout.prototype.ref = function() {}, Timeout.prototype.close = function() {
                this._clearFn.call(window, this._id);
            }, exports.enroll = function(item, msecs) {
                clearTimeout(item._idleTimeoutId), item._idleTimeout = msecs;
            }, exports.unenroll = function(item) {
                clearTimeout(item._idleTimeoutId), item._idleTimeout = -1;
            }, exports._unrefActive = exports.active = function(item) {
                clearTimeout(item._idleTimeoutId);
                var msecs = item._idleTimeout;
                msecs >= 0 && (item._idleTimeoutId = setTimeout(function() {
                    item._onTimeout && item._onTimeout();
                }, msecs));
            }, exports.setImmediate = "function" == typeof setImmediate ? setImmediate : function(fn) {
                var id = nextImmediateId++, args = !(arguments.length < 2) && slice.call(arguments, 1);
                return immediateIds[id] = !0, nextTick(function() {
                    immediateIds[id] && (args ? fn.apply(null, args) : fn.call(null), exports.clearImmediate(id));
                }), id;
            }, exports.clearImmediate = "function" == typeof clearImmediate ? clearImmediate : function(id) {
                delete immediateIds[id];
            };
        }).call(exports, __webpack_require__(12).setImmediate, __webpack_require__(12).clearImmediate);
    }, function(module, exports, __webpack_require__) {
        "use strict";
        var _Symbol = __webpack_require__(36).default;
        exports.default = function(obj) {
            return obj && obj.constructor === _Symbol ? "symbol" : typeof obj;
        }, exports.__esModule = !0;
    }, function(module, exports) {
        var toString = {}.toString;
        module.exports = function(it) {
            return toString.call(it).slice(8, -1);
        };
    }, function(module, exports) {
        module.exports = function(it) {
            if (void 0 == it) throw TypeError("Can't call method on  " + it);
            return it;
        };
    }, function(module, exports, __webpack_require__) {
        module.exports = !__webpack_require__(10)(function() {
            return 7 != Object.defineProperty({}, "a", {
                get: function() {
                    return 7;
                }
            }).a;
        });
    }, function(module, exports, __webpack_require__) {
        var global = __webpack_require__(8), core = __webpack_require__(7), ctx = __webpack_require__(41), PROTOTYPE = "prototype", $export = function(type, name, source) {
            var key, own, out, IS_FORCED = type & $export.F, IS_GLOBAL = type & $export.G, IS_STATIC = type & $export.S, IS_PROTO = type & $export.P, IS_BIND = type & $export.B, IS_WRAP = type & $export.W, exports = IS_GLOBAL ? core : core[name] || (core[name] = {}), target = IS_GLOBAL ? global : IS_STATIC ? global[name] : (global[name] || {})[PROTOTYPE];
            IS_GLOBAL && (source = name);
            for (key in source) own = !IS_FORCED && target && key in target, own && key in exports || (out = own ? target[key] : source[key], 
            exports[key] = IS_GLOBAL && "function" != typeof target[key] ? source[key] : IS_BIND && own ? ctx(out, global) : IS_WRAP && target[key] == out ? function(C) {
                var F = function(param) {
                    return this instanceof C ? new C(param) : C(param);
                };
                return F[PROTOTYPE] = C[PROTOTYPE], F;
            }(out) : IS_PROTO && "function" == typeof out ? ctx(Function.call, out) : out, IS_PROTO && ((exports[PROTOTYPE] || (exports[PROTOTYPE] = {}))[key] = out));
        };
        $export.F = 1, $export.G = 2, $export.S = 4, $export.P = 8, $export.B = 16, $export.W = 32, 
        module.exports = $export;
    }, function(module, exports) {
        var hasOwnProperty = {}.hasOwnProperty;
        module.exports = function(it, key) {
            return hasOwnProperty.call(it, key);
        };
    }, function(module, exports) {
        module.exports = function(bitmap, value) {
            return {
                enumerable: !(1 & bitmap),
                configurable: !(2 & bitmap),
                writable: !(4 & bitmap),
                value: value
            };
        };
    }, function(module, exports, __webpack_require__) {
        var global = __webpack_require__(8), SHARED = "__core-js_shared__", store = global[SHARED] || (global[SHARED] = {});
        module.exports = function(key) {
            return store[key] || (store[key] = {});
        };
    }, function(module, exports) {
        var id = 0, px = Math.random();
        module.exports = function(key) {
            return "Symbol(".concat(void 0 === key ? "" : key, ")_", (++id + px).toString(36));
        };
    }, function(module, exports, __webpack_require__) {
        var store = __webpack_require__(20)("wks"), uid = __webpack_require__(21), Symbol = __webpack_require__(8).Symbol;
        module.exports = function(name) {
            return store[name] || (store[name] = Symbol && Symbol[name] || (Symbol || uid)("Symbol." + name));
        };
    }, function(module, exports) {
        function defaultSetTimout() {
            throw new Error("setTimeout has not been defined");
        }
        function defaultClearTimeout() {
            throw new Error("clearTimeout has not been defined");
        }
        function runTimeout(fun) {
            if (cachedSetTimeout === setTimeout) return setTimeout(fun, 0);
            if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) return cachedSetTimeout = setTimeout, 
            setTimeout(fun, 0);
            try {
                return cachedSetTimeout(fun, 0);
            } catch (e) {
                try {
                    return cachedSetTimeout.call(null, fun, 0);
                } catch (e) {
                    return cachedSetTimeout.call(this, fun, 0);
                }
            }
        }
        function runClearTimeout(marker) {
            if (cachedClearTimeout === clearTimeout) return clearTimeout(marker);
            if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) return cachedClearTimeout = clearTimeout, 
            clearTimeout(marker);
            try {
                return cachedClearTimeout(marker);
            } catch (e) {
                try {
                    return cachedClearTimeout.call(null, marker);
                } catch (e) {
                    return cachedClearTimeout.call(this, marker);
                }
            }
        }
        function cleanUpNextTick() {
            draining && currentQueue && (draining = !1, currentQueue.length ? queue = currentQueue.concat(queue) : queueIndex = -1, 
            queue.length && drainQueue());
        }
        function drainQueue() {
            if (!draining) {
                var timeout = runTimeout(cleanUpNextTick);
                draining = !0;
                for (var len = queue.length; len; ) {
                    for (currentQueue = queue, queue = []; ++queueIndex < len; ) currentQueue && currentQueue[queueIndex].run();
                    queueIndex = -1, len = queue.length;
                }
                currentQueue = null, draining = !1, runClearTimeout(timeout);
            }
        }
        function Item(fun, array) {
            this.fun = fun, this.array = array;
        }
        function noop() {}
        var cachedSetTimeout, cachedClearTimeout, process = module.exports = {};
        !function() {
            try {
                cachedSetTimeout = "function" == typeof setTimeout ? setTimeout : defaultSetTimout;
            } catch (e) {
                cachedSetTimeout = defaultSetTimout;
            }
            try {
                cachedClearTimeout = "function" == typeof clearTimeout ? clearTimeout : defaultClearTimeout;
            } catch (e) {
                cachedClearTimeout = defaultClearTimeout;
            }
        }();
        var currentQueue, queue = [], draining = !1, queueIndex = -1;
        process.nextTick = function(fun) {
            var args = new Array(arguments.length - 1);
            if (arguments.length > 1) for (var i = 1; i < arguments.length; i++) args[i - 1] = arguments[i];
            queue.push(new Item(fun, args)), 1 !== queue.length || draining || runTimeout(drainQueue);
        }, Item.prototype.run = function() {
            this.fun.apply(null, this.array);
        }, process.title = "browser", process.browser = !0, process.env = {}, process.argv = [], 
        process.version = "", process.versions = {}, process.on = noop, process.addListener = noop, 
        process.once = noop, process.off = noop, process.removeListener = noop, process.removeAllListeners = noop, 
        process.emit = noop, process.binding = function(name) {
            throw new Error("process.binding is not supported");
        }, process.cwd = function() {
            return "/";
        }, process.chdir = function(dir) {
            throw new Error("process.chdir is not supported");
        }, process.umask = function() {
            return 0;
        };
    }, function(module, exports, __webpack_require__) {
        "use strict";
        function _interopRequireDefault(obj) {
            return obj && obj.__esModule ? obj : {
                default: obj
            };
        }
        Object.defineProperty(exports, "__esModule", {
            value: !0
        });
        var _lodash = __webpack_require__(1), _lodash2 = _interopRequireDefault(_lodash), _eventsBinder = __webpack_require__(3), _eventsBinder2 = _interopRequireDefault(_eventsBinder), _propsBinder = __webpack_require__(2), _propsBinder2 = _interopRequireDefault(_propsBinder), _getPropsValuesMixin = __webpack_require__(4), _getPropsValuesMixin2 = _interopRequireDefault(_getPropsValuesMixin), props = {
            center: {
                type: Object,
                twoWay: !0,
                required: !0
            },
            radius: {
                type: Number,
                default: 1e3,
                twoWay: !0
            },
            bounds: {
                type: Object,
                twoWay: !0
            },
            draggable: {
                type: Boolean,
                default: !1
            },
            editable: {
                type: Boolean,
                default: !1
            },
            options: {
                type: Object,
                twoWay: !1
            }
        }, events = [ "click", "dblclick", "drag", "dragend", "dragstart", "mousedown", "mousemove", "mouseout", "mouseover", "mouseup", "radius_changed", "rightclick" ];
        exports.default = {
            mixins: [ _getPropsValuesMixin2.default ],
            props: props,
            version: 2,
            ready: function() {
                this.destroyed = !1, this.$dispatch("register-circle", this);
            },
            methods: {
                createCircle: function(options, map) {
                    var _this = this;
                    if (!this.destroyed) {
                        this.circleObject = new google.maps.Circle(options);
                        var boundProps = _lodash2.default.clone(props);
                        delete boundProps.bounds, (0, _propsBinder2.default)(this, this.circleObject, boundProps), 
                        (0, _eventsBinder2.default)(this, this.circleObject, events);
                        var updateBounds = function() {
                            _this.bounds = _this.circleObject.getBounds();
                        };
                        this.$watch("radius", updateBounds), this.$watch("center", updateBounds, {
                            deep: !0
                        }), updateBounds();
                    }
                }
            },
            destroyed: function() {
                this.destroyed = !0, this.circleObject && this.circleObject.setMap(null);
            },
            events: {
                "map-ready": function(map) {
                    this.registrar = "map", this.mapObject = map;
                    var options = _lodash2.default.clone(this.getPropsValues());
                    options.map = this.mapObject, delete options.bounds, this.createCircle(options, map);
                }
            }
        };
    }, function(module, exports, __webpack_require__) {
        "use strict";
        function _interopRequireDefault(obj) {
            return obj && obj.__esModule ? obj : {
                default: obj
            };
        }
        Object.defineProperty(exports, "__esModule", {
            value: !0
        });
        var _q = __webpack_require__(9), _q2 = _interopRequireDefault(_q), _lodash = __webpack_require__(1), _lodash2 = _interopRequireDefault(_lodash), _propsBinder = __webpack_require__(2), _propsBinder2 = _interopRequireDefault(_propsBinder), _getPropsValuesMixin = __webpack_require__(4), _getPropsValuesMixin2 = _interopRequireDefault(_getPropsValuesMixin);
        __webpack_require__(59);
        var props = {
            maxZoom: {
                type: Number,
                twoWay: !1
            },
            calculor: {
                type: Function,
                twoWay: !1
            },
            gridSize: {
                type: Number,
                twoWay: !1
            },
            styles: {
                type: Array,
                twoWay: !1
            }
        };
        exports.default = {
            mixins: [ _getPropsValuesMixin2.default ],
            props: props,
            created: function() {
                this.mapReadyDefered = new _q2.default.defer(), this.mapReady = this.mapReadyDefered.promise, 
                this.clusterReadyDefered = new _q2.default.defer(), this.clusterReady = this.clusterReadyDefered.promise;
            },
            data: function() {
                return {
                    clusterObject: null
                };
            },
            ready: function() {
                var _this = this;
                this.$dispatch("register-cluster", this), this.mapReady.then(function(map) {
                    _this.mapObject = map;
                    var options = _lodash2.default.clone(_this.getPropsValues());
                    _this.clusterObject = new MarkerClusterer(_this.mapObject, [], options), _this.clusterReadyDefered.resolve(_this.clusterObject), 
                    (0, _propsBinder2.default)(_this, _this.clusterObject, props, {
                        afterModelChanged: function(a, v) {
                            var oldMarkers = _this.clusterObject.getMarkers();
                            _this.clusterObject.clearMarkers(), _this.clusterObject.addMarkers(oldMarkers);
                        }
                    });
                });
            },
            detached: function() {
                this.clusterObject.clearMarkers();
            },
            events: {
                "map-ready": function(map) {
                    this.mapReadyDefered.resolve(map);
                },
                "register-marker": function(element) {
                    var _this2 = this;
                    this.clusterReady.then(function(cluster) {
                        element.$emit("cluster-ready", cluster, _this2.mapObject);
                    });
                }
            }
        };
    }, function(module, exports, __webpack_require__) {
        "use strict";
        function _interopRequireDefault(obj) {
            return obj && obj.__esModule ? obj : {
                default: obj
            };
        }
        Object.defineProperty(exports, "__esModule", {
            value: !0
        });
        var _lodash = __webpack_require__(1), _lodash2 = _interopRequireDefault(_lodash), _propsBinder = __webpack_require__(2), _propsBinder2 = _interopRequireDefault(_propsBinder), _eventsBinder = __webpack_require__(3), _eventsBinder2 = _interopRequireDefault(_eventsBinder), _mutationObserver = __webpack_require__(33), _mutationObserver2 = _interopRequireDefault(_mutationObserver), props = {
            options: {
                type: Object,
                twoWay: !1,
                required: !1,
                default: function() {
                    return {};
                }
            },
            content: {
                default: null
            },
            opened: {
                type: Boolean,
                default: !0
            },
            position: {
                type: Object,
                twoWay: !1
            },
            zIndex: {
                type: Number,
                twoWay: !0
            }
        }, events = [ "domready", "closeclick" ];
        exports.default = {
            replace: !1,
            props: props,
            ready: function() {
                var _this = this;
                if (this.destroyed = !1, this.$el.style.display = "none", 0 === this.$el.getElementsByClassName("you-will-never-find-this").length) {
                    var innerChanged = function() {
                        _this.content = _this.$el.innerHTML;
                    };
                    innerChanged(), this.disconnect = (0, _mutationObserver2.default)(this.$el, innerChanged);
                }
                this.$dispatch("register-infoWindow", this), this.markerObject = null;
            },
            destroyed: function() {
                this.disconnect && this.disconnect(), this.infoWindow && this.infoWindow.setMap(null), 
                this.destroyed = !0;
            },
            methods: {
                openInfoWindow: function() {
                    this.opened ? null !== this.markerObject ? this.infoWindow.open(this.mapObject, this.markerObject) : this.infoWindow.open(this.mapObject) : this.infoWindow.close();
                },
                createInfoWindow: function(map) {
                    var _this2 = this;
                    if (!this.destroyed) {
                        this.mapObject = map;
                        var el = document.createElement("div");
                        el.innerHTML = this.content, google.maps.event.addDomListener(el, "click", function(ev) {
                            _this2.$emit("g-click", ev);
                        });
                        var options = _lodash2.default.clone(this.options);
                        options.content = el, null === this.markerObject && (options.position = this.position), 
                        this.infoWindow = new google.maps.InfoWindow(options);
                        var propsToBind = _lodash2.default.clone(props);
                        delete propsToBind.opened, (0, _propsBinder2.default)(this, this.infoWindow, propsToBind), 
                        (0, _eventsBinder2.default)(this, this.infoWindow, events), this.infoWindow.addListener("closeclick", function() {
                            _this2.opened = !1;
                        }), this.$watch("opened", function() {
                            _this2.openInfoWindow();
                        }), this.openInfoWindow();
                    }
                }
            },
            events: {
                "map-ready": function(map) {
                    this.createInfoWindow(map);
                },
                "marker-ready": function(marker, map) {
                    var _this3 = this;
                    this.markerObject = marker.markerObject, this.createInfoWindow(map), marker.$on("g-click", function() {
                        _this3.opened = !_this3.opened;
                    });
                }
            }
        };
    }, function(module, exports, __webpack_require__) {
        "use strict";
        function _interopRequireDefault(obj) {
            return obj && obj.__esModule ? obj : {
                default: obj
            };
        }
        Object.defineProperty(exports, "__esModule", {
            value: !0
        });
        var _q = __webpack_require__(9), _q2 = _interopRequireDefault(_q), _lodash = __webpack_require__(1), _lodash2 = _interopRequireDefault(_lodash), _manager = __webpack_require__(6), _eventsBinder = __webpack_require__(3), _eventsBinder2 = _interopRequireDefault(_eventsBinder), _propsBinder = __webpack_require__(2), _propsBinder2 = _interopRequireDefault(_propsBinder), _getPropsValuesMixin = __webpack_require__(4), _getPropsValuesMixin2 = _interopRequireDefault(_getPropsValuesMixin), props = {
            center: {
                required: !0,
                twoWay: !0,
                type: Object
            },
            zoom: {
                required: !1,
                twoWay: !0,
                type: Number
            },
            heading: {
                twoWay: !0,
                type: Number
            },
            mapTypeId: {
                twoWay: !0,
                type: String
            },
            bounds: {
                type: Object,
                twoWay: !0
            },
            options: {
                twoWay: !1,
                type: Object,
                default: function() {
                    return {};
                }
            }
        }, events = [ "click", "dblclick", "rightclick", "mousemove", "mouseout", "mouseover", "drag", "dragend", "dragstart", "idle", "resize", "tilesloaded", "bounds_changed" ], callableMethods = [ "panBy", "panTo", "panToBounds", "fitBounds" ], methods = {}, registerChild = function(child, type) {
            var _this = this;
            this.mapCreated.then(function(map) {
                _this.$emit("ready", map), child.$emit("map-ready", map);
            }, function(error) {
                throw error;
            });
        }, eventListeners = {
            "register-marker": registerChild,
            "register-cluster": registerChild,
            "register-infoWindow": registerChild,
            "register-polyline": registerChild,
            "register-polygon": registerChild,
            "register-circle": registerChild,
            "register-rectangle": registerChild,
            "g-bounds_changed": function() {
                this.bounds = this.mapObject.getBounds();
            },
            "g-fitBounds": function(bounds) {
                this.mapObject && bounds && this.mapObject.fitBounds;
            },
            "g-resize-map": function() {
                var center = this.mapObject.getCenter();
                google.maps.event.trigger(this.mapObject, "resize"), this.mapObject.setCenter(center);
            }
        };
        _lodash2.default.each(callableMethods, function(methodName) {
            var applier = function() {
                this.mapObject && this.mapObject[methodName].apply(this.mapObject, arguments);
            };
            eventListeners["g-" + methodName] = applier, methods[methodName] = applier;
        }), exports.default = {
            mixins: [ _getPropsValuesMixin2.default ],
            props: props,
            replace: !1,
            created: function() {
                this.mapCreatedDefered = new _q2.default.defer(), this.mapCreated = this.mapCreatedDefered.promise;
            },
            ready: function() {
                var _this2 = this;
                _manager.loaded.then(function() {
                    var element = _this2.$el.getElementsByClassName("vue-map")[0], copiedData = _lodash2.default.clone(_this2.getPropsValues());
                    delete copiedData.options;
                    var options = _lodash2.default.clone(_this2.options);
                    _lodash2.default.assign(options, copiedData), _this2.mapObject = new google.maps.Map(element, options);
                    var boundProps = _lodash2.default.clone(props);
                    delete boundProps.bounds, (0, _propsBinder2.default)(_this2, _this2.mapObject, boundProps), 
                    (0, _eventsBinder2.default)(_this2, _this2.mapObject, events), _this2.$emit("g-bounds_changed"), 
                    _this2.$once("g-bounds_changed", function() {
                        _this2.mapCreatedDefered.resolve(_this2.mapObject);
                    });
                }, function(error) {
                    throw error;
                });
            },
            events: eventListeners,
            methods: methods
        };
    }, function(module, exports, __webpack_require__) {
        "use strict";
        function _interopRequireDefault(obj) {
            return obj && obj.__esModule ? obj : {
                default: obj
            };
        }
        Object.defineProperty(exports, "__esModule", {
            value: !0
        });
        var _lodash = __webpack_require__(1), _lodash2 = _interopRequireDefault(_lodash), _eventsBinder = __webpack_require__(3), _eventsBinder2 = _interopRequireDefault(_eventsBinder), _propsBinder = __webpack_require__(2), _propsBinder2 = _interopRequireDefault(_propsBinder), _getPropsValuesMixin = __webpack_require__(4), _getPropsValuesMixin2 = _interopRequireDefault(_getPropsValuesMixin), _q = __webpack_require__(9), _q2 = _interopRequireDefault(_q), _markerwithlabel = __webpack_require__(60), _markerwithlabel2 = _interopRequireDefault(_markerwithlabel), _manager = __webpack_require__(6), MarkerWithLabel = void 0;
        _manager.loaded.then(function() {
            MarkerWithLabel = (0, _markerwithlabel2.default)(google.maps);
        });
        var props = {
            animation: {
                twoWay: !0,
                type: Number
            },
            attribution: {
                type: Object
            },
            clickable: {
                type: Boolean,
                twoWay: !0,
                default: !0
            },
            cursor: {
                type: String,
                twoWay: !0
            },
            draggable: {
                type: Boolean,
                twoWay: !0,
                default: !1
            },
            icon: {
                type: Object
            },
            labelContent: {},
            labelAnchor: {},
            labelClass: {},
            labelInBackground: {},
            opacity: {
                type: Number,
                default: 1
            },
            place: {
                type: Object
            },
            position: {
                type: Object,
                twoWay: !0
            },
            shape: {
                type: Object,
                twoWay: !0
            },
            title: {
                type: String,
                twoWay: !0
            },
            zIndex: {
                type: Number,
                twoWay: !0
            },
            visible: {
                twoWay: !0,
                default: "auto"
            }
        }, events = [ "click", "rightclick", "dblclick", "drag", "dragstart", "dragend", "mouseup", "mousedown", "mouseover", "mouseout" ];
        exports.default = {
            mixins: [ _getPropsValuesMixin2.default ],
            props: props,
            created: function() {
                this.mapAvailableDefered = new _q2.default.defer(), this.mapAvailable = this.mapAvailableDefered.promise, 
                this.destroyed = !1;
            },
            attached: function() {
                "auto" === this.visible && (this.visible = !0);
            },
            ready: function() {
                this.$dispatch("register-marker", this);
            },
            detached: function() {
                "auto" === this.visible && (this.visible = !1);
            },
            destroyed: function() {
                this.destroyed = !0, "map" === this.registrar && this.markerObject ? this.markerObject.setMap(null) : this.markerObject && this.clusterObject.removeMarker(this.markerObject);
            },
            methods: {
                createMarker: function(options, map) {
                    this.destroyed || (this.markerObject = new MarkerWithLabel(options), (0, _propsBinder2.default)(this, this.markerObject, props), 
                    (0, _eventsBinder2.default)(this, this.markerObject, events), this.mapAvailableDefered.resolve(map));
                }
            },
            events: {
                "map-ready": function(map) {
                    this.registrar = "map", this.mapObject = map;
                    var options = _lodash2.default.clone(this.getPropsValues());
                    options.map = this.mapObject, this.createMarker(options, map);
                },
                "cluster-ready": function(cluster, map) {
                    this.registrar = "cluster", this.clusterObject = cluster;
                    var options = _lodash2.default.clone(this.getPropsValues());
                    this.createMarker(options, map), cluster.addMarker(this.markerObject);
                },
                "register-infoWindow": function(infoWindow) {
                    var _this = this;
                    this.mapAvailable.then(function(map) {
                        infoWindow.$emit("marker-ready", _this, map);
                    });
                }
            }
        };
    }, function(module, exports, __webpack_require__) {
        "use strict";
        function _interopRequireDefault(obj) {
            return obj && obj.__esModule ? obj : {
                default: obj
            };
        }
        Object.defineProperty(exports, "__esModule", {
            value: !0
        });
        var _lodash = __webpack_require__(1), _lodash2 = _interopRequireDefault(_lodash), _eventsBinder = __webpack_require__(3), _eventsBinder2 = _interopRequireDefault(_eventsBinder), _propsBinder = __webpack_require__(2), _propsBinder2 = _interopRequireDefault(_propsBinder), _simulateArrowDown = __webpack_require__(34), _simulateArrowDown2 = _interopRequireDefault(_simulateArrowDown), _getPropsValuesMixin = __webpack_require__(4), _getPropsValuesMixin2 = _interopRequireDefault(_getPropsValuesMixin), _manager = __webpack_require__(6), props = {
            bounds: {
                type: Object,
                twoWay: !0
            },
            place: {
                type: Object,
                twoWay: !0,
                default: function() {
                    return {
                        name: ""
                    };
                }
            },
            componentRestrictions: {
                type: Object,
                twoWay: !1,
                default: null
            },
            types: {
                type: Array,
                twoWay: !1,
                default: []
            },
            placeholder: {
                required: !1,
                type: String
            },
            class: {
                required: !1,
                type: String
            },
            label: {
                required: !1,
                type: String,
                default: null
            },
            selectFirstOnEnter: {
                require: !1,
                type: Boolean,
                default: !1
            }
        }, events = [ "place_changed" ];
        exports.default = {
            mixins: [ _getPropsValuesMixin2.default ],
            ready: function() {
                var _this = this, input = this.$els.input;
                input.value = this.place.name, _manager.loaded.then(function() {
                    window.i = input;
                    var options = _lodash2.default.clone(_this.getPropsValues());
                    _this.selectFirstOnEnter && (0, _simulateArrowDown2.default)(_this.$els.input), 
                    _this.autoCompleter = new google.maps.places.Autocomplete(_this.$els.input, options), 
                    (0, _eventsBinder2.default)(_this, _this.autoCompleter, events);
                    var propsToBind = _lodash2.default.clone(props);
                    delete propsToBind.placeholder, delete propsToBind.place, delete propsToBind.selectFirstOnEnter, 
                    (0, _propsBinder2.default)(_this, _this.autoCompleter, propsToBind);
                }).catch(function() {
                    setTimeout(function() {
                        throw new Error("Impossible to load the Autocomplete Class from the google places api, did you loaded it ?");
                    }, 0);
                });
            },
            props: props,
            events: {
                "g-place_changed": function() {
                    this.place = this.autoCompleter.getPlace();
                }
            }
        };
    }, function(module, exports, __webpack_require__) {
        "use strict";
        function _interopRequireDefault(obj) {
            return obj && obj.__esModule ? obj : {
                default: obj
            };
        }
        Object.defineProperty(exports, "__esModule", {
            value: !0
        });
        var _lodash = __webpack_require__(1), _lodash2 = _interopRequireDefault(_lodash), _eventsBinder = __webpack_require__(3), _eventsBinder2 = _interopRequireDefault(_eventsBinder), _propsBinder = __webpack_require__(2), _propsBinder2 = _interopRequireDefault(_propsBinder), _getPropsValuesMixin = __webpack_require__(4), _getPropsValuesMixin2 = _interopRequireDefault(_getPropsValuesMixin), props = {
            draggable: {
                type: Boolean
            },
            editable: {
                type: Boolean
            },
            options: {
                twoWay: !1,
                type: Object
            },
            path: {
                type: Array,
                twoWay: !0
            },
            paths: {
                type: Array,
                twoWay: !0
            }
        }, events = [ "click", "dblclick", "drag", "dragend", "dragstart", "mousedown", "mousemove", "mouseout", "mouseover", "mouseup", "rightclick" ];
        exports.default = {
            mixins: [ _getPropsValuesMixin2.default ],
            props: props,
            ready: function() {
                this.destroyed = !1, this.$dispatch("register-polygon", this);
            },
            attached: function() {
                this.mapObject && null === this.polygonObject.getMap() && this.polygonObject.setMap(this.mapObject);
            },
            destroyed: function() {
                this.destroyed = !0, this.polygonObject && this.polygonObject.setMap(null);
            },
            events: {
                "map-ready": function(map) {
                    var _this = this;
                    if (!this.destroyed) {
                        this.mapObject = map;
                        var options = _lodash2.default.clone(this.getPropsValues());
                        delete options.options, _lodash2.default.assign(options, this.options), options.path || delete options.path, 
                        options.paths || delete options.paths, this.polygonObject = new google.maps.Polygon(options), 
                        this.polygonObject.setMap(this.mapObject);
                        var localProps = _lodash2.default.clone(props);
                        delete localProps.path, delete localProps.paths, (0, _propsBinder2.default)(this, this.polygonObject, localProps), 
                        (0, _eventsBinder2.default)(this, this.polygonObject, events);
                        var eventCancelers = [], convertToLatLng = function(arr) {
                            return _lodash2.default.map(arr, function(v) {
                                return {
                                    lat: v.lat(),
                                    lng: v.lng()
                                };
                            });
                        }, stable = 0, editHandler = function() {
                            stable -= 2, stable < 0 && (_this.path = convertToLatLng(_this.polygonObject.getPath().getArray()), 
                            _this.paths = _lodash2.default.map(_this.polygonObject.getPaths().getArray(), function(pArray) {
                                return convertToLatLng(pArray.getArray());
                            }));
                        }, setupBind = function() {
                            var mvcoPaths = _this.polygonObject.getPaths();
                            eventCancelers.push(mvcoPaths.addListener("insert_at", editHandler)), eventCancelers.push(mvcoPaths.addListener("remove_at", editHandler)), 
                            eventCancelers.push(mvcoPaths.addListener("set_at", editHandler)), _lodash2.default.each(mvcoPaths.getArray(), function(mvcoPath) {
                                eventCancelers.push(mvcoPath.addListener("insert_at", editHandler)), eventCancelers.push(mvcoPath.addListener("remove_at", editHandler)), 
                                eventCancelers.push(mvcoPath.addListener("set_at", editHandler));
                            });
                        }, setPath = function(paths) {
                            _lodash2.default.each(eventCancelers, function(id) {
                                google.maps.event.removeListener(id);
                            }), eventCancelers.length = 0, _this.polygonObject.setPaths(paths), setupBind();
                        };
                        this.$watch("paths", function() {
                            stable++, stable > -1 && setPath(_this.paths);
                        }, {
                            deep: !0
                        }), this.$watch("path", function() {
                            stable++, stable > -1 && setPath([ _this.path ]);
                        }, {
                            deep: !0
                        }), setupBind(), this.polygonObject.setMap(this.mapObject);
                    }
                }
            }
        };
    }, function(module, exports, __webpack_require__) {
        "use strict";
        function _interopRequireDefault(obj) {
            return obj && obj.__esModule ? obj : {
                default: obj
            };
        }
        Object.defineProperty(exports, "__esModule", {
            value: !0
        });
        var _lodash = __webpack_require__(1), _lodash2 = _interopRequireDefault(_lodash), _eventsBinder = __webpack_require__(3), _eventsBinder2 = _interopRequireDefault(_eventsBinder), _propsBinder = __webpack_require__(2), _propsBinder2 = _interopRequireDefault(_propsBinder), _getPropsValuesMixin = __webpack_require__(4), _getPropsValuesMixin2 = _interopRequireDefault(_getPropsValuesMixin), props = {
            draggable: {
                type: Boolean
            },
            editable: {
                type: Boolean
            },
            options: {
                twoWay: !1,
                type: Object
            },
            path: {
                type: Array,
                twoWay: !0
            }
        }, events = [ "click", "dblclick", "drag", "dragend", "dragstart", "mousedown", "mousemove", "mouseout", "mouseover", "mouseup", "rightclick" ];
        exports.default = {
            mixins: [ _getPropsValuesMixin2.default ],
            props: props,
            ready: function() {
                this.destroyed = !1, this.$dispatch("register-polyline", this);
            },
            attached: function() {
                this.mapObject && null === this.polyLineObject.getMap() && this.polyLineObject.setMap(this.mapObject);
            },
            destroyed: function() {
                this.destroyed = !0, this.polyLineObject && this.polyLineObject.setMap(null);
            },
            events: {
                "map-ready": function(map) {
                    var _this = this;
                    if (!this.destroyed) {
                        this.mapObject = map;
                        var options = _lodash2.default.clone(this.getPropsValues());
                        delete options.options, _lodash2.default.assign(options, this.options), this.polyLineObject = new google.maps.Polyline(options), 
                        this.polyLineObject.setMap(this.mapObject);
                        var localProps = _lodash2.default.clone(props);
                        delete localProps.path, (0, _propsBinder2.default)(this, this.polyLineObject, localProps), 
                        (0, _eventsBinder2.default)(this, this.polyLineObject, events);
                        var eventCancelers = [], editHandler = function() {
                            _this.path = _lodash2.default.map(_this.polyLineObject.getPath().getArray(), function(v) {
                                return {
                                    lat: v.lat(),
                                    lng: v.lng()
                                };
                            });
                        }, setupBind = function() {
                            var mvcoPath = _this.polyLineObject.getPath();
                            eventCancelers.push(mvcoPath.addListener("insert_at", editHandler)), eventCancelers.push(mvcoPath.addListener("remove_at", editHandler)), 
                            eventCancelers.push(mvcoPath.addListener("set_at", editHandler));
                        };
                        this.$watch("path", function() {
                            _lodash2.default.each(eventCancelers, function(id) {
                                google.maps.event.removeListener(id);
                            }), eventCancelers.length = 0, _this.polyLineObject.setPath(_this.path), setupBind();
                        }, {
                            deep: !0
                        }), setupBind(), this.polyLineObject.setMap(this.mapObject);
                    }
                }
            }
        };
    }, function(module, exports, __webpack_require__) {
        "use strict";
        function _interopRequireDefault(obj) {
            return obj && obj.__esModule ? obj : {
                default: obj
            };
        }
        Object.defineProperty(exports, "__esModule", {
            value: !0
        });
        var _lodash = __webpack_require__(1), _lodash2 = _interopRequireDefault(_lodash), _eventsBinder = __webpack_require__(3), _eventsBinder2 = _interopRequireDefault(_eventsBinder), _propsBinder = __webpack_require__(2), _propsBinder2 = _interopRequireDefault(_propsBinder), _getPropsValuesMixin = __webpack_require__(4), _getPropsValuesMixin2 = _interopRequireDefault(_getPropsValuesMixin), props = {
            bounds: {
                type: Object,
                twoWay: !0
            },
            draggable: {
                type: Boolean,
                default: !1
            },
            editable: {
                type: Boolean,
                default: !1
            },
            options: {
                type: Object,
                twoWay: !1
            }
        }, events = [ "click", "dblclick", "drag", "dragend", "dragstart", "mousedown", "mousemove", "mouseout", "mouseover", "mouseup", "rightclick" ];
        exports.default = {
            mixins: [ _getPropsValuesMixin2.default ],
            props: props,
            ready: function() {
                this.destroyed = !1, this.$dispatch("register-rectangle", this);
            },
            methods: {
                createRectangle: function(options, map) {
                    var _this = this;
                    if (!this.destroyed) {
                        this.rectangleObject = new google.maps.Rectangle(options), (0, _propsBinder2.default)(this, this.rectangleObject, props), 
                        (0, _eventsBinder2.default)(this, this.rectangleObject, events);
                        var updateBounds = function() {
                            _this.bounds = _this.rectangleObject.getBounds();
                        };
                        this.$watch("bounds_changed", updateBounds, {
                            deep: !0
                        });
                    }
                }
            },
            destroyed: function() {
                this.rectangleObject && this.rectangleObject.setMap(null), this.destroyed = !0;
            },
            events: {
                "map-ready": function(map) {
                    this.registrar = "map", this.mapObject = map;
                    var options = _lodash2.default.clone(this.getPropsValues());
                    options.map = this.mapObject, this.createRectangle(options, map);
                }
            }
        };
    }, function(module, exports, __webpack_require__) {
        "use strict";
        function _interopRequireDefault(obj) {
            return obj && obj.__esModule ? obj : {
                default: obj
            };
        }
        Object.defineProperty(exports, "__esModule", {
            value: !0
        });
        var _typeof2 = __webpack_require__(13), _typeof3 = _interopRequireDefault(_typeof2), mutatorObservatorConfig = {
            attributes: !0,
            childList: !0,
            characterData: !0,
            subtree: !0
        }, MutationObserver = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver;
        exports.default = function(element, callback) {
            if (!MutationObserver) {
                var oldContent = "";
                return setInterval(function() {
                    oldContent != element.innerHTML && (oldContent = element.innerHTML, callback());
                }, 500), function() {};
            }
            var _ret = function() {
                var observer = new MutationObserver(callback);
                return observer.observe(element, mutatorObservatorConfig), {
                    v: function() {
                        observer.disconnect();
                    }
                };
            }();
            if ("object" === ("undefined" == typeof _ret ? "undefined" : (0, _typeof3.default)(_ret))) return _ret.v;
        };
    }, function(module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
            value: !0
        }), exports.default = function(input) {
            function addEventListenerWrapper(type, listener) {
                if ("keydown" == type) {
                    var orig_listener = listener;
                    listener = function(event) {
                        var suggestion_selected = document.getElementsByClassName("ac-item-selected").length > 0;
                        if (13 == event.which && !suggestion_selected) {
                            var simulatedEvent = document.createEvent("Event");
                            simulatedEvent.keyCode = 40, simulatedEvent.which = 40, orig_listener.apply(input, [ simulatedEvent ]);
                        }
                        orig_listener.apply(input, [ event ]);
                    };
                }
                _addEventListener.apply(input, [ type, listener ]);
            }
            var _addEventListener = input.addEventListener ? input.addEventListener : input.attachEvent;
            input.addEventListener = addEventListenerWrapper, input.attachEvent = addEventListenerWrapper;
        };
    }, function(module, exports, __webpack_require__) {
        module.exports = {
            default: __webpack_require__(37),
            __esModule: !0
        };
    }, function(module, exports, __webpack_require__) {
        module.exports = {
            default: __webpack_require__(38),
            __esModule: !0
        };
    }, function(module, exports, __webpack_require__) {
        __webpack_require__(54), module.exports = __webpack_require__(7).Object.keys;
    }, function(module, exports, __webpack_require__) {
        __webpack_require__(56), __webpack_require__(55), module.exports = __webpack_require__(7).Symbol;
    }, function(module, exports) {
        module.exports = function(it) {
            if ("function" != typeof it) throw TypeError(it + " is not a function!");
            return it;
        };
    }, function(module, exports, __webpack_require__) {
        var isObject = __webpack_require__(47);
        module.exports = function(it) {
            if (!isObject(it)) throw TypeError(it + " is not an object!");
            return it;
        };
    }, function(module, exports, __webpack_require__) {
        var aFunction = __webpack_require__(39);
        module.exports = function(fn, that, length) {
            if (aFunction(fn), void 0 === that) return fn;
            switch (length) {
              case 1:
                return function(a) {
                    return fn.call(that, a);
                };

              case 2:
                return function(a, b) {
                    return fn.call(that, a, b);
                };

              case 3:
                return function(a, b, c) {
                    return fn.call(that, a, b, c);
                };
            }
            return function() {
                return fn.apply(that, arguments);
            };
        };
    }, function(module, exports, __webpack_require__) {
        var $ = __webpack_require__(5);
        module.exports = function(it) {
            var keys = $.getKeys(it), getSymbols = $.getSymbols;
            if (getSymbols) for (var key, symbols = getSymbols(it), isEnum = $.isEnum, i = 0; symbols.length > i; ) isEnum.call(it, key = symbols[i++]) && keys.push(key);
            return keys;
        };
    }, function(module, exports, __webpack_require__) {
        var toIObject = __webpack_require__(11), getNames = __webpack_require__(5).getNames, toString = {}.toString, windowNames = "object" == typeof window && Object.getOwnPropertyNames ? Object.getOwnPropertyNames(window) : [], getWindowNames = function(it) {
            try {
                return getNames(it);
            } catch (e) {
                return windowNames.slice();
            }
        };
        module.exports.get = function(it) {
            return windowNames && "[object Window]" == toString.call(it) ? getWindowNames(it) : getNames(toIObject(it));
        };
    }, function(module, exports, __webpack_require__) {
        var $ = __webpack_require__(5), createDesc = __webpack_require__(19);
        module.exports = __webpack_require__(16) ? function(object, key, value) {
            return $.setDesc(object, key, createDesc(1, value));
        } : function(object, key, value) {
            return object[key] = value, object;
        };
    }, function(module, exports, __webpack_require__) {
        var cof = __webpack_require__(14);
        module.exports = Object("z").propertyIsEnumerable(0) ? Object : function(it) {
            return "String" == cof(it) ? it.split("") : Object(it);
        };
    }, function(module, exports, __webpack_require__) {
        var cof = __webpack_require__(14);
        module.exports = Array.isArray || function(arg) {
            return "Array" == cof(arg);
        };
    }, function(module, exports) {
        module.exports = function(it) {
            return "object" == typeof it ? null !== it : "function" == typeof it;
        };
    }, function(module, exports, __webpack_require__) {
        var $ = __webpack_require__(5), toIObject = __webpack_require__(11);
        module.exports = function(object, el) {
            for (var key, O = toIObject(object), keys = $.getKeys(O), length = keys.length, index = 0; length > index; ) if (O[key = keys[index++]] === el) return key;
        };
    }, function(module, exports) {
        module.exports = !0;
    }, function(module, exports, __webpack_require__) {
        var $export = __webpack_require__(17), core = __webpack_require__(7), fails = __webpack_require__(10);
        module.exports = function(KEY, exec) {
            var fn = (core.Object || {})[KEY] || Object[KEY], exp = {};
            exp[KEY] = exec(fn), $export($export.S + $export.F * fails(function() {
                fn(1);
            }), "Object", exp);
        };
    }, function(module, exports, __webpack_require__) {
        module.exports = __webpack_require__(44);
    }, function(module, exports, __webpack_require__) {
        var def = __webpack_require__(5).setDesc, has = __webpack_require__(18), TAG = __webpack_require__(22)("toStringTag");
        module.exports = function(it, tag, stat) {
            it && !has(it = stat ? it : it.prototype, TAG) && def(it, TAG, {
                configurable: !0,
                value: tag
            });
        };
    }, function(module, exports, __webpack_require__) {
        var defined = __webpack_require__(15);
        module.exports = function(it) {
            return Object(defined(it));
        };
    }, function(module, exports, __webpack_require__) {
        var toObject = __webpack_require__(53);
        __webpack_require__(50)("keys", function($keys) {
            return function(it) {
                return $keys(toObject(it));
            };
        });
    }, function(module, exports) {}, function(module, exports, __webpack_require__) {
        "use strict";
        var $ = __webpack_require__(5), global = __webpack_require__(8), has = __webpack_require__(18), DESCRIPTORS = __webpack_require__(16), $export = __webpack_require__(17), redefine = __webpack_require__(51), $fails = __webpack_require__(10), shared = __webpack_require__(20), setToStringTag = __webpack_require__(52), uid = __webpack_require__(21), wks = __webpack_require__(22), keyOf = __webpack_require__(48), $names = __webpack_require__(43), enumKeys = __webpack_require__(42), isArray = __webpack_require__(46), anObject = __webpack_require__(40), toIObject = __webpack_require__(11), createDesc = __webpack_require__(19), getDesc = $.getDesc, setDesc = $.setDesc, _create = $.create, getNames = $names.get, $Symbol = global.Symbol, $JSON = global.JSON, _stringify = $JSON && $JSON.stringify, setter = !1, HIDDEN = wks("_hidden"), isEnum = $.isEnum, SymbolRegistry = shared("symbol-registry"), AllSymbols = shared("symbols"), useNative = "function" == typeof $Symbol, ObjectProto = Object.prototype, setSymbolDesc = DESCRIPTORS && $fails(function() {
            return 7 != _create(setDesc({}, "a", {
                get: function() {
                    return setDesc(this, "a", {
                        value: 7
                    }).a;
                }
            })).a;
        }) ? function(it, key, D) {
            var protoDesc = getDesc(ObjectProto, key);
            protoDesc && delete ObjectProto[key], setDesc(it, key, D), protoDesc && it !== ObjectProto && setDesc(ObjectProto, key, protoDesc);
        } : setDesc, wrap = function(tag) {
            var sym = AllSymbols[tag] = _create($Symbol.prototype);
            return sym._k = tag, DESCRIPTORS && setter && setSymbolDesc(ObjectProto, tag, {
                configurable: !0,
                set: function(value) {
                    has(this, HIDDEN) && has(this[HIDDEN], tag) && (this[HIDDEN][tag] = !1), setSymbolDesc(this, tag, createDesc(1, value));
                }
            }), sym;
        }, isSymbol = function(it) {
            return "symbol" == typeof it;
        }, $defineProperty = function(it, key, D) {
            return D && has(AllSymbols, key) ? (D.enumerable ? (has(it, HIDDEN) && it[HIDDEN][key] && (it[HIDDEN][key] = !1), 
            D = _create(D, {
                enumerable: createDesc(0, !1)
            })) : (has(it, HIDDEN) || setDesc(it, HIDDEN, createDesc(1, {})), it[HIDDEN][key] = !0), 
            setSymbolDesc(it, key, D)) : setDesc(it, key, D);
        }, $defineProperties = function(it, P) {
            anObject(it);
            for (var key, keys = enumKeys(P = toIObject(P)), i = 0, l = keys.length; l > i; ) $defineProperty(it, key = keys[i++], P[key]);
            return it;
        }, $create = function(it, P) {
            return void 0 === P ? _create(it) : $defineProperties(_create(it), P);
        }, $propertyIsEnumerable = function(key) {
            var E = isEnum.call(this, key);
            return !(E || !has(this, key) || !has(AllSymbols, key) || has(this, HIDDEN) && this[HIDDEN][key]) || E;
        }, $getOwnPropertyDescriptor = function(it, key) {
            var D = getDesc(it = toIObject(it), key);
            return !D || !has(AllSymbols, key) || has(it, HIDDEN) && it[HIDDEN][key] || (D.enumerable = !0), 
            D;
        }, $getOwnPropertyNames = function(it) {
            for (var key, names = getNames(toIObject(it)), result = [], i = 0; names.length > i; ) has(AllSymbols, key = names[i++]) || key == HIDDEN || result.push(key);
            return result;
        }, $getOwnPropertySymbols = function(it) {
            for (var key, names = getNames(toIObject(it)), result = [], i = 0; names.length > i; ) has(AllSymbols, key = names[i++]) && result.push(AllSymbols[key]);
            return result;
        }, $stringify = function(it) {
            if (void 0 !== it && !isSymbol(it)) {
                for (var replacer, $replacer, args = [ it ], i = 1, $$ = arguments; $$.length > i; ) args.push($$[i++]);
                return replacer = args[1], "function" == typeof replacer && ($replacer = replacer), 
                !$replacer && isArray(replacer) || (replacer = function(key, value) {
                    if ($replacer && (value = $replacer.call(this, key, value)), !isSymbol(value)) return value;
                }), args[1] = replacer, _stringify.apply($JSON, args);
            }
        }, buggyJSON = $fails(function() {
            var S = $Symbol();
            return "[null]" != _stringify([ S ]) || "{}" != _stringify({
                a: S
            }) || "{}" != _stringify(Object(S));
        });
        useNative || ($Symbol = function() {
            if (isSymbol(this)) throw TypeError("Symbol is not a constructor");
            return wrap(uid(arguments.length > 0 ? arguments[0] : void 0));
        }, redefine($Symbol.prototype, "toString", function() {
            return this._k;
        }), isSymbol = function(it) {
            return it instanceof $Symbol;
        }, $.create = $create, $.isEnum = $propertyIsEnumerable, $.getDesc = $getOwnPropertyDescriptor, 
        $.setDesc = $defineProperty, $.setDescs = $defineProperties, $.getNames = $names.get = $getOwnPropertyNames, 
        $.getSymbols = $getOwnPropertySymbols, DESCRIPTORS && !__webpack_require__(49) && redefine(ObjectProto, "propertyIsEnumerable", $propertyIsEnumerable, !0));
        var symbolStatics = {
            for: function(key) {
                return has(SymbolRegistry, key += "") ? SymbolRegistry[key] : SymbolRegistry[key] = $Symbol(key);
            },
            keyFor: function(key) {
                return keyOf(SymbolRegistry, key);
            },
            useSetter: function() {
                setter = !0;
            },
            useSimple: function() {
                setter = !1;
            }
        };
        $.each.call("hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables".split(","), function(it) {
            var sym = wks(it);
            symbolStatics[it] = useNative ? sym : wrap(sym);
        }), setter = !0, $export($export.G + $export.W, {
            Symbol: $Symbol
        }), $export($export.S, "Symbol", symbolStatics), $export($export.S + $export.F * !useNative, "Object", {
            create: $create,
            defineProperty: $defineProperty,
            defineProperties: $defineProperties,
            getOwnPropertyDescriptor: $getOwnPropertyDescriptor,
            getOwnPropertyNames: $getOwnPropertyNames,
            getOwnPropertySymbols: $getOwnPropertySymbols
        }), $JSON && $export($export.S + $export.F * (!useNative || buggyJSON), "JSON", {
            stringify: $stringify
        }), setToStringTag($Symbol, "Symbol"), setToStringTag(Math, "Math", !0), setToStringTag(global.JSON, "JSON", !0);
    }, function(module, exports, __webpack_require__) {
        exports = module.exports = __webpack_require__(58)(), exports.push([ module.id, ".vue-map-container,.vue-map-container .vue-map{width:100%;height:100%}", "", {
            version: 3,
            sources: [ "/./src/components/map.vue.style" ],
            names: [],
            mappings: "AAA0C,+CAA4B,WAAW,WAAW,CAAC",
            file: "map.vue",
            sourcesContent: [ ".vue-map-container{width:100%;height:100%}.vue-map-container .vue-map{width:100%;height:100%}" ],
            sourceRoot: "webpack://"
        } ]);
    }, function(module, exports) {
        module.exports = function() {
            var list = [];
            return list.toString = function() {
                for (var result = [], i = 0; i < this.length; i++) {
                    var item = this[i];
                    item[2] ? result.push("@media " + item[2] + "{" + item[1] + "}") : result.push(item[1]);
                }
                return result.join("");
            }, list.i = function(modules, mediaQuery) {
                "string" == typeof modules && (modules = [ [ null, modules, "" ] ]);
                for (var alreadyImportedModules = {}, i = 0; i < this.length; i++) {
                    var id = this[i][0];
                    "number" == typeof id && (alreadyImportedModules[id] = !0);
                }
                for (i = 0; i < modules.length; i++) {
                    var item = modules[i];
                    "number" == typeof item[0] && alreadyImportedModules[item[0]] || (mediaQuery && !item[2] ? item[2] = mediaQuery : mediaQuery && (item[2] = "(" + item[2] + ") and (" + mediaQuery + ")"), 
                    list.push(item));
                }
            }, list;
        };
    }, function(module, exports) {
        /**
	 * @license
	 * Copyright 2010 Google Inc. All Rights Reserved.
	 *
	 * Licensed under the Apache License, Version 2.0 (the "License");
	 * you may not use this file except in compliance with the License.
	 * You may obtain a copy of the License at
	 *
	 *     http://www.apache.org/licenses/LICENSE-2.0
	 *
	 * Unless required by applicable law or agreed to in writing, software
	 * distributed under the License is distributed on an "AS IS" BASIS,
	 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	 * See the License for the specific language governing permissions and
	 * limitations under the License.
	 */
        function MarkerClusterer(map, opt_markers, opt_options) {
            this.extend(MarkerClusterer, google.maps.OverlayView), this.map_ = map, this.markers_ = [], 
            this.clusters_ = [], this.sizes = [ 53, 56, 66, 78, 90 ], this.styles_ = [], this.ready_ = !1;
            var options = opt_options || {};
            this.gridSize_ = options.gridSize || 60, this.minClusterSize_ = options.minimumClusterSize || 2, 
            this.maxZoom_ = options.maxZoom || null, this.styles_ = options.styles || [], this.imagePath_ = options.imagePath || this.MARKER_CLUSTER_IMAGE_PATH_, 
            this.imageExtension_ = options.imageExtension || this.MARKER_CLUSTER_IMAGE_EXTENSION_, 
            this.zoomOnClick_ = !0, void 0 != options.zoomOnClick && (this.zoomOnClick_ = options.zoomOnClick), 
            this.averageCenter_ = !1, void 0 != options.averageCenter && (this.averageCenter_ = options.averageCenter), 
            this.setupStyles_(), this.setMap(map), this.prevZoom_ = this.map_.getZoom();
            var that = this;
            google.maps.event.addListener(this.map_, "zoom_changed", function() {
                var zoom = that.map_.getZoom();
                that.prevZoom_ != zoom && (that.prevZoom_ = zoom, that.resetViewport());
            }), google.maps.event.addListener(this.map_, "idle", function() {
                that.redraw();
            }), opt_markers && opt_markers.length && this.addMarkers(opt_markers, !1);
        }
        function Cluster(markerClusterer) {
            this.markerClusterer_ = markerClusterer, this.map_ = markerClusterer.getMap(), this.gridSize_ = markerClusterer.getGridSize(), 
            this.minClusterSize_ = markerClusterer.getMinClusterSize(), this.averageCenter_ = markerClusterer.isAverageCenter(), 
            this.center_ = null, this.markers_ = [], this.bounds_ = null, this.clusterIcon_ = new ClusterIcon(this, markerClusterer.getStyles(), markerClusterer.getGridSize());
        }
        function ClusterIcon(cluster, styles, opt_padding) {
            cluster.getMarkerClusterer().extend(ClusterIcon, google.maps.OverlayView), this.styles_ = styles, 
            this.padding_ = opt_padding || 0, this.cluster_ = cluster, this.center_ = null, 
            this.map_ = cluster.getMap(), this.div_ = null, this.sums_ = null, this.visible_ = !1, 
            this.setMap(this.map_);
        }
        MarkerClusterer.prototype.MARKER_CLUSTER_IMAGE_PATH_ = "../images/m", MarkerClusterer.prototype.MARKER_CLUSTER_IMAGE_EXTENSION_ = "png", 
        MarkerClusterer.prototype.extend = function(obj1, obj2) {
            return function(object) {
                for (var property in object.prototype) this.prototype[property] = object.prototype[property];
                return this;
            }.apply(obj1, [ obj2 ]);
        }, MarkerClusterer.prototype.onAdd = function() {
            this.setReady_(!0);
        }, MarkerClusterer.prototype.draw = function() {}, MarkerClusterer.prototype.setupStyles_ = function() {
            if (!this.styles_.length) for (var size, i = 0; size = this.sizes[i]; i++) this.styles_.push({
                url: this.imagePath_ + (i + 1) + "." + this.imageExtension_,
                height: size,
                width: size
            });
        }, MarkerClusterer.prototype.fitMapToMarkers = function() {
            for (var marker, markers = this.getMarkers(), bounds = new google.maps.LatLngBounds(), i = 0; marker = markers[i]; i++) bounds.extend(marker.getPosition());
            this.map_.fitBounds(bounds);
        }, MarkerClusterer.prototype.setStyles = function(styles) {
            this.styles_ = styles;
        }, MarkerClusterer.prototype.getStyles = function() {
            return this.styles_;
        }, MarkerClusterer.prototype.isZoomOnClick = function() {
            return this.zoomOnClick_;
        }, MarkerClusterer.prototype.isAverageCenter = function() {
            return this.averageCenter_;
        }, MarkerClusterer.prototype.getMarkers = function() {
            return this.markers_;
        }, MarkerClusterer.prototype.getTotalMarkers = function() {
            return this.markers_.length;
        }, MarkerClusterer.prototype.setMaxZoom = function(maxZoom) {
            this.maxZoom_ = maxZoom;
        }, MarkerClusterer.prototype.getMaxZoom = function() {
            return this.maxZoom_;
        }, MarkerClusterer.prototype.calculator_ = function(markers, numStyles) {
            for (var index = 0, count = markers.length, dv = count; 0 !== dv; ) dv = parseInt(dv / 10, 10), 
            index++;
            return index = Math.min(index, numStyles), {
                text: count,
                index: index
            };
        }, MarkerClusterer.prototype.setCalculator = function(calculator) {
            this.calculator_ = calculator;
        }, MarkerClusterer.prototype.getCalculator = function() {
            return this.calculator_;
        }, MarkerClusterer.prototype.addMarkers = function(markers, opt_nodraw) {
            for (var marker, i = 0; marker = markers[i]; i++) this.pushMarkerTo_(marker);
            opt_nodraw || this.redraw();
        }, MarkerClusterer.prototype.pushMarkerTo_ = function(marker) {
            if (marker.isAdded = !1, marker.draggable) {
                var that = this;
                google.maps.event.addListener(marker, "dragend", function() {
                    marker.isAdded = !1, that.repaint();
                });
            }
            this.markers_.push(marker);
        }, MarkerClusterer.prototype.addMarker = function(marker, opt_nodraw) {
            this.pushMarkerTo_(marker), opt_nodraw || this.redraw();
        }, MarkerClusterer.prototype.removeMarker_ = function(marker) {
            var index = -1;
            if (this.markers_.indexOf) index = this.markers_.indexOf(marker); else for (var m, i = 0; m = this.markers_[i]; i++) if (m == marker) {
                index = i;
                break;
            }
            return index != -1 && (marker.setMap(null), this.markers_.splice(index, 1), !0);
        }, MarkerClusterer.prototype.removeMarker = function(marker, opt_nodraw) {
            var removed = this.removeMarker_(marker);
            return !(opt_nodraw || !removed) && (this.resetViewport(), this.redraw(), !0);
        }, MarkerClusterer.prototype.removeMarkers = function(markers, opt_nodraw) {
            for (var marker, removed = !1, i = 0; marker = markers[i]; i++) {
                var r = this.removeMarker_(marker);
                removed = removed || r;
            }
            if (!opt_nodraw && removed) return this.resetViewport(), this.redraw(), !0;
        }, MarkerClusterer.prototype.setReady_ = function(ready) {
            this.ready_ || (this.ready_ = ready, this.createClusters_());
        }, MarkerClusterer.prototype.getTotalClusters = function() {
            return this.clusters_.length;
        }, MarkerClusterer.prototype.getMap = function() {
            return this.map_;
        }, MarkerClusterer.prototype.setMap = function(map) {
            this.map_ = map;
        }, MarkerClusterer.prototype.getGridSize = function() {
            return this.gridSize_;
        }, MarkerClusterer.prototype.setGridSize = function(size) {
            this.gridSize_ = size;
        }, MarkerClusterer.prototype.getMinClusterSize = function() {
            return this.minClusterSize_;
        }, MarkerClusterer.prototype.setMinClusterSize = function(size) {
            this.minClusterSize_ = size;
        }, MarkerClusterer.prototype.getExtendedBounds = function(bounds) {
            var projection = this.getProjection(), tr = new google.maps.LatLng(bounds.getNorthEast().lat(), bounds.getNorthEast().lng()), bl = new google.maps.LatLng(bounds.getSouthWest().lat(), bounds.getSouthWest().lng()), trPix = projection.fromLatLngToDivPixel(tr);
            trPix.x += this.gridSize_, trPix.y -= this.gridSize_;
            var blPix = projection.fromLatLngToDivPixel(bl);
            blPix.x -= this.gridSize_, blPix.y += this.gridSize_;
            var ne = projection.fromDivPixelToLatLng(trPix), sw = projection.fromDivPixelToLatLng(blPix);
            return bounds.extend(ne), bounds.extend(sw), bounds;
        }, MarkerClusterer.prototype.isMarkerInBounds_ = function(marker, bounds) {
            return bounds.contains(marker.getPosition());
        }, MarkerClusterer.prototype.clearMarkers = function() {
            this.resetViewport(!0), this.markers_ = [];
        }, MarkerClusterer.prototype.resetViewport = function(opt_hide) {
            for (var cluster, i = 0; cluster = this.clusters_[i]; i++) cluster.remove();
            for (var marker, i = 0; marker = this.markers_[i]; i++) marker.isAdded = !1, opt_hide && marker.setMap(null);
            this.clusters_ = [];
        }, MarkerClusterer.prototype.repaint = function() {
            var oldClusters = this.clusters_.slice();
            this.clusters_.length = 0, this.resetViewport(), this.redraw(), window.setTimeout(function() {
                for (var cluster, i = 0; cluster = oldClusters[i]; i++) cluster.remove();
            }, 0);
        }, MarkerClusterer.prototype.redraw = function() {
            this.createClusters_();
        }, MarkerClusterer.prototype.distanceBetweenPoints_ = function(p1, p2) {
            if (!p1 || !p2) return 0;
            var R = 6371, dLat = (p2.lat() - p1.lat()) * Math.PI / 180, dLon = (p2.lng() - p1.lng()) * Math.PI / 180, a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(p1.lat() * Math.PI / 180) * Math.cos(p2.lat() * Math.PI / 180) * Math.sin(dLon / 2) * Math.sin(dLon / 2), c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)), d = R * c;
            return d;
        }, MarkerClusterer.prototype.addToClosestCluster_ = function(marker) {
            for (var cluster, distance = 4e4, clusterToAddTo = null, i = (marker.getPosition(), 
            0); cluster = this.clusters_[i]; i++) {
                var center = cluster.getCenter();
                if (center) {
                    var d = this.distanceBetweenPoints_(center, marker.getPosition());
                    d < distance && (distance = d, clusterToAddTo = cluster);
                }
            }
            if (clusterToAddTo && clusterToAddTo.isMarkerInClusterBounds(marker)) clusterToAddTo.addMarker(marker); else {
                var cluster = new Cluster(this);
                cluster.addMarker(marker), this.clusters_.push(cluster);
            }
        }, MarkerClusterer.prototype.createClusters_ = function() {
            if (this.ready_) for (var marker, mapBounds = new google.maps.LatLngBounds(this.map_.getBounds().getSouthWest(), this.map_.getBounds().getNorthEast()), bounds = this.getExtendedBounds(mapBounds), i = 0; marker = this.markers_[i]; i++) !marker.isAdded && this.isMarkerInBounds_(marker, bounds) && this.addToClosestCluster_(marker);
        }, Cluster.prototype.isMarkerAlreadyAdded = function(marker) {
            if (this.markers_.indexOf) return this.markers_.indexOf(marker) != -1;
            for (var m, i = 0; m = this.markers_[i]; i++) if (m == marker) return !0;
            return !1;
        }, Cluster.prototype.addMarker = function(marker) {
            if (this.isMarkerAlreadyAdded(marker)) return !1;
            if (this.center_) {
                if (this.averageCenter_) {
                    var l = this.markers_.length + 1, lat = (this.center_.lat() * (l - 1) + marker.getPosition().lat()) / l, lng = (this.center_.lng() * (l - 1) + marker.getPosition().lng()) / l;
                    this.center_ = new google.maps.LatLng(lat, lng), this.calculateBounds_();
                }
            } else this.center_ = marker.getPosition(), this.calculateBounds_();
            marker.isAdded = !0, this.markers_.push(marker);
            var len = this.markers_.length;
            if (len < this.minClusterSize_ && marker.getMap() != this.map_ && marker.setMap(this.map_), 
            len == this.minClusterSize_) for (var i = 0; i < len; i++) this.markers_[i].setMap(null);
            return len >= this.minClusterSize_ && marker.setMap(null), this.updateIcon(), !0;
        }, Cluster.prototype.getMarkerClusterer = function() {
            return this.markerClusterer_;
        }, Cluster.prototype.getBounds = function() {
            for (var marker, bounds = new google.maps.LatLngBounds(this.center_, this.center_), markers = this.getMarkers(), i = 0; marker = markers[i]; i++) bounds.extend(marker.getPosition());
            return bounds;
        }, Cluster.prototype.remove = function() {
            this.clusterIcon_.remove(), this.markers_.length = 0, delete this.markers_;
        }, Cluster.prototype.getSize = function() {
            return this.markers_.length;
        }, Cluster.prototype.getMarkers = function() {
            return this.markers_;
        }, Cluster.prototype.getCenter = function() {
            return this.center_;
        }, Cluster.prototype.calculateBounds_ = function() {
            var bounds = new google.maps.LatLngBounds(this.center_, this.center_);
            this.bounds_ = this.markerClusterer_.getExtendedBounds(bounds);
        }, Cluster.prototype.isMarkerInClusterBounds = function(marker) {
            return this.bounds_.contains(marker.getPosition());
        }, Cluster.prototype.getMap = function() {
            return this.map_;
        }, Cluster.prototype.updateIcon = function() {
            var zoom = this.map_.getZoom(), mz = this.markerClusterer_.getMaxZoom();
            if (mz && zoom > mz) for (var marker, i = 0; marker = this.markers_[i]; i++) marker.setMap(this.map_); else {
                if (this.markers_.length < this.minClusterSize_) return void this.clusterIcon_.hide();
                var numStyles = this.markerClusterer_.getStyles().length, sums = this.markerClusterer_.getCalculator()(this.markers_, numStyles);
                this.clusterIcon_.setCenter(this.center_), this.clusterIcon_.setSums(sums), this.clusterIcon_.show();
            }
        }, ClusterIcon.prototype.triggerClusterClick = function(event) {
            var markerClusterer = this.cluster_.getMarkerClusterer();
            google.maps.event.trigger(markerClusterer, "clusterclick", this.cluster_, event), 
            markerClusterer.isZoomOnClick() && this.map_.fitBounds(this.cluster_.getBounds());
        }, ClusterIcon.prototype.onAdd = function() {
            if (this.div_ = document.createElement("DIV"), this.visible_) {
                var pos = this.getPosFromLatLng_(this.center_);
                this.div_.style.cssText = this.createCss(pos), this.div_.innerHTML = this.sums_.text;
            }
            var panes = this.getPanes();
            panes.overlayMouseTarget.appendChild(this.div_);
            var that = this, isDragging = !1;
            google.maps.event.addDomListener(this.div_, "click", function(event) {
                isDragging || that.triggerClusterClick(event);
            }), google.maps.event.addDomListener(this.div_, "mousedown", function() {
                isDragging = !1;
            }), google.maps.event.addDomListener(this.div_, "mousemove", function() {
                isDragging = !0;
            });
        }, ClusterIcon.prototype.getPosFromLatLng_ = function(latlng) {
            var pos = this.getProjection().fromLatLngToDivPixel(latlng);
            return "object" == typeof this.iconAnchor_ && 2 === this.iconAnchor_.length ? (pos.x -= this.iconAnchor_[0], 
            pos.y -= this.iconAnchor_[1]) : (pos.x -= parseInt(this.width_ / 2, 10), pos.y -= parseInt(this.height_ / 2, 10)), 
            pos;
        }, ClusterIcon.prototype.draw = function() {
            if (this.visible_) {
                var pos = this.getPosFromLatLng_(this.center_);
                this.div_.style.top = pos.y + "px", this.div_.style.left = pos.x + "px";
            }
        }, ClusterIcon.prototype.hide = function() {
            this.div_ && (this.div_.style.display = "none"), this.visible_ = !1;
        }, ClusterIcon.prototype.show = function() {
            if (this.div_) {
                var pos = this.getPosFromLatLng_(this.center_);
                this.div_.style.cssText = this.createCss(pos), this.div_.style.display = "";
            }
            this.visible_ = !0;
        }, ClusterIcon.prototype.remove = function() {
            this.setMap(null);
        }, ClusterIcon.prototype.onRemove = function() {
            this.div_ && this.div_.parentNode && (this.hide(), this.div_.parentNode.removeChild(this.div_), 
            this.div_ = null);
        }, ClusterIcon.prototype.setSums = function(sums) {
            this.sums_ = sums, this.text_ = sums.text, this.index_ = sums.index, this.div_ && (this.div_.innerHTML = sums.text), 
            this.useStyle();
        }, ClusterIcon.prototype.useStyle = function() {
            var index = Math.max(0, this.sums_.index - 1);
            index = Math.min(this.styles_.length - 1, index);
            var style = this.styles_[index];
            this.url_ = style.url, this.height_ = style.height, this.width_ = style.width, this.textColor_ = style.textColor, 
            this.anchor_ = style.anchor, this.textSize_ = style.textSize, this.backgroundPosition_ = style.backgroundPosition, 
            this.iconAnchor_ = style.iconAnchor;
        }, ClusterIcon.prototype.setCenter = function(center) {
            this.center_ = center;
        }, ClusterIcon.prototype.createCss = function(pos) {
            var style = [];
            style.push("background-image:url(" + this.url_ + ");");
            var backgroundPosition = this.backgroundPosition_ ? this.backgroundPosition_ : "0 0";
            style.push("background-position:" + backgroundPosition + ";"), "object" == typeof this.anchor_ ? ("number" == typeof this.anchor_[0] && this.anchor_[0] > 0 && this.anchor_[0] < this.height_ ? style.push("height:" + (this.height_ - this.anchor_[0]) + "px; padding-top:" + this.anchor_[0] + "px;") : "number" == typeof this.anchor_[0] && this.anchor_[0] < 0 && -this.anchor_[0] < this.height_ ? style.push("height:" + this.height_ + "px; line-height:" + (this.height_ + this.anchor_[0]) + "px;") : style.push("height:" + this.height_ + "px; line-height:" + this.height_ + "px;"), 
            "number" == typeof this.anchor_[1] && this.anchor_[1] > 0 && this.anchor_[1] < this.width_ ? style.push("width:" + (this.width_ - this.anchor_[1]) + "px; padding-left:" + this.anchor_[1] + "px;") : style.push("width:" + this.width_ + "px; text-align:center;")) : style.push("height:" + this.height_ + "px; line-height:" + this.height_ + "px; width:" + this.width_ + "px; text-align:center;");
            var txtColor = this.textColor_ ? this.textColor_ : "black", txtSize = this.textSize_ ? this.textSize_ : 11;
            return style.push("cursor:pointer; top:" + pos.y + "px; left:" + pos.x + "px; color:" + txtColor + "; position:absolute; font-size:" + txtSize + "px; font-family:Arial,sans-serif; font-weight:bold"), 
            style.join("");
        }, window.MarkerClusterer = MarkerClusterer, MarkerClusterer.prototype.addMarker = MarkerClusterer.prototype.addMarker, 
        MarkerClusterer.prototype.addMarkers = MarkerClusterer.prototype.addMarkers, MarkerClusterer.prototype.clearMarkers = MarkerClusterer.prototype.clearMarkers, 
        MarkerClusterer.prototype.fitMapToMarkers = MarkerClusterer.prototype.fitMapToMarkers, 
        MarkerClusterer.prototype.getCalculator = MarkerClusterer.prototype.getCalculator, 
        MarkerClusterer.prototype.getGridSize = MarkerClusterer.prototype.getGridSize, MarkerClusterer.prototype.getExtendedBounds = MarkerClusterer.prototype.getExtendedBounds, 
        MarkerClusterer.prototype.getMap = MarkerClusterer.prototype.getMap, MarkerClusterer.prototype.getMarkers = MarkerClusterer.prototype.getMarkers, 
        MarkerClusterer.prototype.getMaxZoom = MarkerClusterer.prototype.getMaxZoom, MarkerClusterer.prototype.getStyles = MarkerClusterer.prototype.getStyles, 
        MarkerClusterer.prototype.getTotalClusters = MarkerClusterer.prototype.getTotalClusters, 
        MarkerClusterer.prototype.getTotalMarkers = MarkerClusterer.prototype.getTotalMarkers, 
        MarkerClusterer.prototype.redraw = MarkerClusterer.prototype.redraw, MarkerClusterer.prototype.removeMarker = MarkerClusterer.prototype.removeMarker, 
        MarkerClusterer.prototype.removeMarkers = MarkerClusterer.prototype.removeMarkers, 
        MarkerClusterer.prototype.resetViewport = MarkerClusterer.prototype.resetViewport, 
        MarkerClusterer.prototype.repaint = MarkerClusterer.prototype.repaint, MarkerClusterer.prototype.setCalculator = MarkerClusterer.prototype.setCalculator, 
        MarkerClusterer.prototype.setGridSize = MarkerClusterer.prototype.setGridSize, MarkerClusterer.prototype.setMaxZoom = MarkerClusterer.prototype.setMaxZoom, 
        MarkerClusterer.prototype.onAdd = MarkerClusterer.prototype.onAdd, MarkerClusterer.prototype.draw = MarkerClusterer.prototype.draw, 
        Cluster.prototype.getCenter = Cluster.prototype.getCenter, Cluster.prototype.getSize = Cluster.prototype.getSize, 
        Cluster.prototype.getMarkers = Cluster.prototype.getMarkers, ClusterIcon.prototype.onAdd = ClusterIcon.prototype.onAdd, 
        ClusterIcon.prototype.draw = ClusterIcon.prototype.draw, ClusterIcon.prototype.onRemove = ClusterIcon.prototype.onRemove;
    }, function(module, exports) {
        /*!
	 *
	 * Licensed under the Apache License, Version 2.0 (the "License");
	 * you may not use this file except in compliance with the License.
	 * You may obtain a copy of the License at
	 *
	 *       http://www.apache.org/licenses/LICENSE-2.0
	 *
	 * Unless required by applicable law or agreed to in writing, software
	 * distributed under the License is distributed on an "AS IS" BASIS,
	 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	 * See the License for the specific language governing permissions and
	 * limitations under the License.
	 */
        function inherits(childCtor, parentCtor) {
            function tempCtor() {}
            tempCtor.prototype = parentCtor.prototype, childCtor.superClass_ = parentCtor.prototype, 
            childCtor.prototype = new tempCtor(), childCtor.prototype.constructor = childCtor;
        }
        module.exports = function(gMapsApi) {
            function MarkerLabel_(marker, crossURL, handCursorURL) {
                this.marker_ = marker, this.handCursorURL_ = marker.handCursorURL, this.labelDiv_ = document.createElement("div"), 
                this.labelDiv_.style.cssText = "position: absolute; overflow: hidden;", this.eventDiv_ = document.createElement("div"), 
                this.eventDiv_.style.cssText = this.labelDiv_.style.cssText, this.eventDiv_.setAttribute("onselectstart", "return false;"), 
                this.eventDiv_.setAttribute("ondragstart", "return false;"), this.crossDiv_ = MarkerLabel_.getSharedCross(crossURL);
            }
            function MarkerWithLabel(opt_options) {
                opt_options = opt_options || {}, opt_options.labelContent = opt_options.labelContent || "", 
                opt_options.labelAnchor = opt_options.labelAnchor || new gMapsApi.Point(0, 0), opt_options.labelClass = opt_options.labelClass || "markerLabels", 
                opt_options.labelStyle = opt_options.labelStyle || {}, opt_options.labelInBackground = opt_options.labelInBackground || !1, 
                "undefined" == typeof opt_options.labelVisible && (opt_options.labelVisible = !0), 
                "undefined" == typeof opt_options.raiseOnDrag && (opt_options.raiseOnDrag = !0), 
                "undefined" == typeof opt_options.clickable && (opt_options.clickable = !0), "undefined" == typeof opt_options.draggable && (opt_options.draggable = !1), 
                "undefined" == typeof opt_options.optimized && (opt_options.optimized = !1), opt_options.crossImage = opt_options.crossImage || "http" + ("https:" === document.location.protocol ? "s" : "") + "://maps.gstatic.com/intl/en_us/mapfiles/drag_cross_67_16.png", 
                opt_options.handCursor = opt_options.handCursor || "http" + ("https:" === document.location.protocol ? "s" : "") + "://maps.gstatic.com/intl/en_us/mapfiles/closedhand_8_8.cur", 
                opt_options.optimized = !1, this.label = new MarkerLabel_(this, opt_options.crossImage, opt_options.handCursor), 
                gMapsApi.Marker.apply(this, arguments);
            }
            return inherits(MarkerLabel_, gMapsApi.OverlayView), MarkerLabel_.getSharedCross = function(crossURL) {
                var div;
                return "undefined" == typeof MarkerLabel_.getSharedCross.crossDiv && (div = document.createElement("img"), 
                div.style.cssText = "position: absolute; z-index: 1000002; display: none;", div.style.marginLeft = "-8px", 
                div.style.marginTop = "-9px", div.src = crossURL, MarkerLabel_.getSharedCross.crossDiv = div), 
                MarkerLabel_.getSharedCross.crossDiv;
            }, MarkerLabel_.prototype.onAdd = function() {
                var cSavedZIndex, cLatOffset, cLngOffset, cIgnoreClick, cRaiseEnabled, cStartPosition, cStartCenter, me = this, cMouseIsDown = !1, cDraggingLabel = !1, cRaiseOffset = 20, cDraggingCursor = "url(" + this.handCursorURL_ + ")", cAbortEvent = function(e) {
                    e.preventDefault && e.preventDefault(), e.cancelBubble = !0, e.stopPropagation && e.stopPropagation();
                }, cStopBounce = function() {
                    me.marker_.setAnimation(null);
                };
                this.getPanes().markerLayer.appendChild(this.labelDiv_), this.getPanes().overlayMouseTarget.appendChild(this.eventDiv_), 
                "undefined" == typeof MarkerLabel_.getSharedCross.processed && (this.getPanes().markerLayer.appendChild(this.crossDiv_), 
                MarkerLabel_.getSharedCross.processed = !0), this.listeners_ = [ gMapsApi.event.addDomListener(this.eventDiv_, "mouseover", function(e) {
                    (me.marker_.getDraggable() || me.marker_.getClickable()) && (this.style.cursor = "pointer", 
                    gMapsApi.event.trigger(me.marker_, "mouseover", e));
                }), gMapsApi.event.addDomListener(this.eventDiv_, "mouseout", function(e) {
                    !me.marker_.getDraggable() && !me.marker_.getClickable() || cDraggingLabel || (this.style.cursor = me.marker_.getCursor(), 
                    gMapsApi.event.trigger(me.marker_, "mouseout", e));
                }), gMapsApi.event.addDomListener(this.eventDiv_, "mousedown", function(e) {
                    cDraggingLabel = !1, me.marker_.getDraggable() && (cMouseIsDown = !0, this.style.cursor = cDraggingCursor), 
                    (me.marker_.getDraggable() || me.marker_.getClickable()) && (gMapsApi.event.trigger(me.marker_, "mousedown", e), 
                    cAbortEvent(e));
                }), gMapsApi.event.addDomListener(document, "mouseup", function(mEvent) {
                    var position;
                    if (cMouseIsDown && (cMouseIsDown = !1, me.eventDiv_.style.cursor = "pointer", gMapsApi.event.trigger(me.marker_, "mouseup", mEvent)), 
                    cDraggingLabel) {
                        if (cRaiseEnabled) {
                            position = me.getProjection().fromLatLngToDivPixel(me.marker_.getPosition()), position.y += cRaiseOffset, 
                            me.marker_.setPosition(me.getProjection().fromDivPixelToLatLng(position));
                            try {
                                me.marker_.setAnimation(gMapsApi.Animation.BOUNCE), setTimeout(cStopBounce, 1406);
                            } catch (e) {}
                        }
                        me.crossDiv_.style.display = "none", me.marker_.setZIndex(cSavedZIndex), cIgnoreClick = !0, 
                        cDraggingLabel = !1, mEvent.latLng = me.marker_.getPosition(), gMapsApi.event.trigger(me.marker_, "dragend", mEvent);
                    }
                }), gMapsApi.event.addListener(me.marker_.getMap(), "mousemove", function(mEvent) {
                    var position;
                    cMouseIsDown && (cDraggingLabel ? (mEvent.latLng = new gMapsApi.LatLng(mEvent.latLng.lat() - cLatOffset, mEvent.latLng.lng() - cLngOffset), 
                    position = me.getProjection().fromLatLngToDivPixel(mEvent.latLng), cRaiseEnabled && (me.crossDiv_.style.left = position.x + "px", 
                    me.crossDiv_.style.top = position.y + "px", me.crossDiv_.style.display = "", position.y -= cRaiseOffset), 
                    me.marker_.setPosition(me.getProjection().fromDivPixelToLatLng(position)), cRaiseEnabled && (me.eventDiv_.style.top = position.y + cRaiseOffset + "px"), 
                    gMapsApi.event.trigger(me.marker_, "drag", mEvent)) : (cLatOffset = mEvent.latLng.lat() - me.marker_.getPosition().lat(), 
                    cLngOffset = mEvent.latLng.lng() - me.marker_.getPosition().lng(), cSavedZIndex = me.marker_.getZIndex(), 
                    cStartPosition = me.marker_.getPosition(), cStartCenter = me.marker_.getMap().getCenter(), 
                    cRaiseEnabled = me.marker_.get("raiseOnDrag"), cDraggingLabel = !0, me.marker_.setZIndex(1e6), 
                    mEvent.latLng = me.marker_.getPosition(), gMapsApi.event.trigger(me.marker_, "dragstart", mEvent)));
                }), gMapsApi.event.addDomListener(document, "keydown", function(e) {
                    cDraggingLabel && 27 === e.keyCode && (cRaiseEnabled = !1, me.marker_.setPosition(cStartPosition), 
                    me.marker_.getMap().setCenter(cStartCenter), gMapsApi.event.trigger(document, "mouseup", e));
                }), gMapsApi.event.addDomListener(this.eventDiv_, "click", function(e) {
                    (me.marker_.getDraggable() || me.marker_.getClickable()) && (cIgnoreClick ? cIgnoreClick = !1 : (gMapsApi.event.trigger(me.marker_, "click", e), 
                    cAbortEvent(e)));
                }), gMapsApi.event.addDomListener(this.eventDiv_, "dblclick", function(e) {
                    (me.marker_.getDraggable() || me.marker_.getClickable()) && (gMapsApi.event.trigger(me.marker_, "dblclick", e), 
                    cAbortEvent(e));
                }), gMapsApi.event.addListener(this.marker_, "dragstart", function(mEvent) {
                    cDraggingLabel || (cRaiseEnabled = this.get("raiseOnDrag"));
                }), gMapsApi.event.addListener(this.marker_, "drag", function(mEvent) {
                    cDraggingLabel || cRaiseEnabled && (me.setPosition(cRaiseOffset), me.labelDiv_.style.zIndex = 1e6 + (this.get("labelInBackground") ? -1 : 1));
                }), gMapsApi.event.addListener(this.marker_, "dragend", function(mEvent) {
                    cDraggingLabel || cRaiseEnabled && me.setPosition(0);
                }), gMapsApi.event.addListener(this.marker_, "position_changed", function() {
                    me.setPosition();
                }), gMapsApi.event.addListener(this.marker_, "zindex_changed", function() {
                    me.setZIndex();
                }), gMapsApi.event.addListener(this.marker_, "visible_changed", function() {
                    me.setVisible();
                }), gMapsApi.event.addListener(this.marker_, "labelvisible_changed", function() {
                    me.setVisible();
                }), gMapsApi.event.addListener(this.marker_, "title_changed", function() {
                    me.setTitle();
                }), gMapsApi.event.addListener(this.marker_, "labelcontent_changed", function() {
                    me.setContent();
                }), gMapsApi.event.addListener(this.marker_, "labelanchor_changed", function() {
                    me.setAnchor();
                }), gMapsApi.event.addListener(this.marker_, "labelclass_changed", function() {
                    me.setStyles();
                }), gMapsApi.event.addListener(this.marker_, "labelstyle_changed", function() {
                    me.setStyles();
                }) ];
            }, MarkerLabel_.prototype.onRemove = function() {
                var i;
                for (this.labelDiv_.parentNode.removeChild(this.labelDiv_), this.eventDiv_.parentNode.removeChild(this.eventDiv_), 
                i = 0; i < this.listeners_.length; i++) gMapsApi.event.removeListener(this.listeners_[i]);
            }, MarkerLabel_.prototype.draw = function() {
                this.setContent(), this.setTitle(), this.setStyles();
            }, MarkerLabel_.prototype.setContent = function() {
                var content = this.marker_.get("labelContent");
                if ("undefined" == typeof content.nodeType) this.labelDiv_.innerHTML = content, 
                this.eventDiv_.innerHTML = this.labelDiv_.innerHTML; else {
                    for (;this.labelDiv_.lastChild; ) this.labelDiv_.removeChild(this.labelDiv_.lastChild);
                    for (;this.eventDiv_.lastChild; ) this.eventDiv_.removeChild(this.eventDiv_.lastChild);
                    this.labelDiv_.appendChild(content), content = content.cloneNode(!0), this.eventDiv_.appendChild(content);
                }
            }, MarkerLabel_.prototype.setTitle = function() {
                this.eventDiv_.title = this.marker_.getTitle() || "";
            }, MarkerLabel_.prototype.setStyles = function() {
                var i, labelStyle;
                this.labelDiv_.className = this.marker_.get("labelClass"), this.eventDiv_.className = this.labelDiv_.className, 
                this.labelDiv_.style.cssText = "", this.eventDiv_.style.cssText = "", labelStyle = this.marker_.get("labelStyle");
                for (i in labelStyle) labelStyle.hasOwnProperty(i) && (this.labelDiv_.style[i] = labelStyle[i], 
                this.eventDiv_.style[i] = labelStyle[i]);
                this.setMandatoryStyles();
            }, MarkerLabel_.prototype.setMandatoryStyles = function() {
                this.labelDiv_.style.position = "absolute", this.labelDiv_.style.overflow = "hidden", 
                "undefined" != typeof this.labelDiv_.style.opacity && "" !== this.labelDiv_.style.opacity && (this.labelDiv_.style.MsFilter = '"progid:DXImageTransform.Microsoft.Alpha(opacity=' + 100 * this.labelDiv_.style.opacity + ')"', 
                this.labelDiv_.style.filter = "alpha(opacity=" + 100 * this.labelDiv_.style.opacity + ")"), 
                this.eventDiv_.style.position = this.labelDiv_.style.position, this.eventDiv_.style.overflow = this.labelDiv_.style.overflow, 
                this.eventDiv_.style.opacity = .01, this.eventDiv_.style.MsFilter = '"progid:DXImageTransform.Microsoft.Alpha(opacity=1)"', 
                this.eventDiv_.style.filter = "alpha(opacity=1)", this.setAnchor(), this.setPosition(), 
                this.setVisible();
            }, MarkerLabel_.prototype.setAnchor = function() {
                var anchor = this.marker_.get("labelAnchor");
                this.labelDiv_.style.marginLeft = -anchor.x + "px", this.labelDiv_.style.marginTop = -anchor.y + "px", 
                this.eventDiv_.style.marginLeft = -anchor.x + "px", this.eventDiv_.style.marginTop = -anchor.y + "px";
            }, MarkerLabel_.prototype.setPosition = function(yOffset) {
                var position = this.getProjection().fromLatLngToDivPixel(this.marker_.getPosition());
                "undefined" == typeof yOffset && (yOffset = 0), this.labelDiv_.style.left = Math.round(position.x) + "px", 
                this.labelDiv_.style.top = Math.round(position.y - yOffset) + "px", this.eventDiv_.style.left = this.labelDiv_.style.left, 
                this.eventDiv_.style.top = this.labelDiv_.style.top, this.setZIndex();
            }, MarkerLabel_.prototype.setZIndex = function() {
                var zAdjust = this.marker_.get("labelInBackground") ? -1 : 1;
                "undefined" == typeof this.marker_.getZIndex() ? (this.labelDiv_.style.zIndex = parseInt(this.labelDiv_.style.top, 10) + zAdjust, 
                this.eventDiv_.style.zIndex = this.labelDiv_.style.zIndex) : (this.labelDiv_.style.zIndex = this.marker_.getZIndex() + zAdjust, 
                this.eventDiv_.style.zIndex = this.labelDiv_.style.zIndex);
            }, MarkerLabel_.prototype.setVisible = function() {
                this.marker_.get("labelVisible") ? this.labelDiv_.style.display = this.marker_.getVisible() ? "block" : "none" : this.labelDiv_.style.display = "none", 
                this.eventDiv_.style.display = this.labelDiv_.style.display;
            }, inherits(MarkerWithLabel, gMapsApi.Marker), MarkerWithLabel.prototype.setMap = function(theMap) {
                gMapsApi.Marker.prototype.setMap.apply(this, arguments), this.label.setMap(theMap);
            }, MarkerWithLabel;
        };
    }, function(module, exports, __webpack_require__) {
        function addStylesToDom(styles, options) {
            for (var i = 0; i < styles.length; i++) {
                var item = styles[i], domStyle = stylesInDom[item.id];
                if (domStyle) {
                    domStyle.refs++;
                    for (var j = 0; j < domStyle.parts.length; j++) domStyle.parts[j](item.parts[j]);
                    for (;j < item.parts.length; j++) domStyle.parts.push(addStyle(item.parts[j], options));
                } else {
                    for (var parts = [], j = 0; j < item.parts.length; j++) parts.push(addStyle(item.parts[j], options));
                    stylesInDom[item.id] = {
                        id: item.id,
                        refs: 1,
                        parts: parts
                    };
                }
            }
        }
        function listToStyles(list) {
            for (var styles = [], newStyles = {}, i = 0; i < list.length; i++) {
                var item = list[i], id = item[0], css = item[1], media = item[2], sourceMap = item[3], part = {
                    css: css,
                    media: media,
                    sourceMap: sourceMap
                };
                newStyles[id] ? newStyles[id].parts.push(part) : styles.push(newStyles[id] = {
                    id: id,
                    parts: [ part ]
                });
            }
            return styles;
        }
        function insertStyleElement(options, styleElement) {
            var head = getHeadElement(), lastStyleElementInsertedAtTop = styleElementsInsertedAtTop[styleElementsInsertedAtTop.length - 1];
            if ("top" === options.insertAt) lastStyleElementInsertedAtTop ? lastStyleElementInsertedAtTop.nextSibling ? head.insertBefore(styleElement, lastStyleElementInsertedAtTop.nextSibling) : head.appendChild(styleElement) : head.insertBefore(styleElement, head.firstChild), 
            styleElementsInsertedAtTop.push(styleElement); else {
                if ("bottom" !== options.insertAt) throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
                head.appendChild(styleElement);
            }
        }
        function removeStyleElement(styleElement) {
            styleElement.parentNode.removeChild(styleElement);
            var idx = styleElementsInsertedAtTop.indexOf(styleElement);
            idx >= 0 && styleElementsInsertedAtTop.splice(idx, 1);
        }
        function createStyleElement(options) {
            var styleElement = document.createElement("style");
            return styleElement.type = "text/css", insertStyleElement(options, styleElement), 
            styleElement;
        }
        function createLinkElement(options) {
            var linkElement = document.createElement("link");
            return linkElement.rel = "stylesheet", insertStyleElement(options, linkElement), 
            linkElement;
        }
        function addStyle(obj, options) {
            var styleElement, update, remove;
            if (options.singleton) {
                var styleIndex = singletonCounter++;
                styleElement = singletonElement || (singletonElement = createStyleElement(options)), 
                update = applyToSingletonTag.bind(null, styleElement, styleIndex, !1), remove = applyToSingletonTag.bind(null, styleElement, styleIndex, !0);
            } else obj.sourceMap && "function" == typeof URL && "function" == typeof URL.createObjectURL && "function" == typeof URL.revokeObjectURL && "function" == typeof Blob && "function" == typeof btoa ? (styleElement = createLinkElement(options), 
            update = updateLink.bind(null, styleElement), remove = function() {
                removeStyleElement(styleElement), styleElement.href && URL.revokeObjectURL(styleElement.href);
            }) : (styleElement = createStyleElement(options), update = applyToTag.bind(null, styleElement), 
            remove = function() {
                removeStyleElement(styleElement);
            });
            return update(obj), function(newObj) {
                if (newObj) {
                    if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap) return;
                    update(obj = newObj);
                } else remove();
            };
        }
        function applyToSingletonTag(styleElement, index, remove, obj) {
            var css = remove ? "" : obj.css;
            if (styleElement.styleSheet) styleElement.styleSheet.cssText = replaceText(index, css); else {
                var cssNode = document.createTextNode(css), childNodes = styleElement.childNodes;
                childNodes[index] && styleElement.removeChild(childNodes[index]), childNodes.length ? styleElement.insertBefore(cssNode, childNodes[index]) : styleElement.appendChild(cssNode);
            }
        }
        function applyToTag(styleElement, obj) {
            var css = obj.css, media = obj.media;
            if (media && styleElement.setAttribute("media", media), styleElement.styleSheet) styleElement.styleSheet.cssText = css; else {
                for (;styleElement.firstChild; ) styleElement.removeChild(styleElement.firstChild);
                styleElement.appendChild(document.createTextNode(css));
            }
        }
        function updateLink(linkElement, obj) {
            var css = obj.css, sourceMap = obj.sourceMap;
            sourceMap && (css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */");
            var blob = new Blob([ css ], {
                type: "text/css"
            }), oldSrc = linkElement.href;
            linkElement.href = URL.createObjectURL(blob), oldSrc && URL.revokeObjectURL(oldSrc);
        }
        var stylesInDom = {}, memoize = function(fn) {
            var memo;
            return function() {
                return "undefined" == typeof memo && (memo = fn.apply(this, arguments)), memo;
            };
        }, isOldIE = memoize(function() {
            return /msie [6-9]\b/.test(window.navigator.userAgent.toLowerCase());
        }), getHeadElement = memoize(function() {
            return document.head || document.getElementsByTagName("head")[0];
        }), singletonElement = null, singletonCounter = 0, styleElementsInsertedAtTop = [];
        module.exports = function(list, options) {
            options = options || {}, "undefined" == typeof options.singleton && (options.singleton = isOldIE()), 
            "undefined" == typeof options.insertAt && (options.insertAt = "bottom");
            var styles = listToStyles(list);
            return addStylesToDom(styles, options), function(newList) {
                for (var mayRemove = [], i = 0; i < styles.length; i++) {
                    var item = styles[i], domStyle = stylesInDom[item.id];
                    domStyle.refs--, mayRemove.push(domStyle);
                }
                if (newList) {
                    var newStyles = listToStyles(newList);
                    addStylesToDom(newStyles, options);
                }
                for (var i = 0; i < mayRemove.length; i++) {
                    var domStyle = mayRemove[i];
                    if (0 === domStyle.refs) {
                        for (var j = 0; j < domStyle.parts.length; j++) domStyle.parts[j]();
                        delete stylesInDom[domStyle.id];
                    }
                }
            };
        };
        var replaceText = function() {
            var textStore = [];
            return function(index, replacement) {
                return textStore[index] = replacement, textStore.filter(Boolean).join("\n");
            };
        }();
    }, function(module, exports, __webpack_require__) {
        var content = __webpack_require__(57);
        "string" == typeof content && (content = [ [ module.id, content, "" ] ]);
        __webpack_require__(61)(content, {});
        content.locals && (module.exports = content.locals);
    }, function(module, exports) {
        module.exports = " <slot></slot> ";
    }, function(module, exports) {
        module.exports = " <div> <slot> <div class=you-will-never-find-this></div> </slot> </div> ";
    }, function(module, exports) {
        module.exports = " <div class=vue-map-container> <div class=vue-map></div> <slot></slot> </div> ";
    }, function(module, exports) {
        module.exports = " <label> {{ label }} <input type=text v-el:input :placeholder=placeholder :class=class /> </label> ";
    }, function(module, exports, __webpack_require__) {
        var __vue_script__, __vue_template__;
        __vue_script__ = __webpack_require__(24), module.exports = __vue_script__ || {}, 
        module.exports.__esModule && (module.exports = module.exports.default), __vue_template__ && (("function" == typeof module.exports ? module.exports.options : module.exports).template = __vue_template__);
    }, function(module, exports, __webpack_require__) {
        var __vue_script__, __vue_template__;
        __vue_script__ = __webpack_require__(25), __vue_template__ = __webpack_require__(63), 
        module.exports = __vue_script__ || {}, module.exports.__esModule && (module.exports = module.exports.default), 
        __vue_template__ && (("function" == typeof module.exports ? module.exports.options : module.exports).template = __vue_template__);
    }, function(module, exports, __webpack_require__) {
        var __vue_script__, __vue_template__;
        __vue_script__ = __webpack_require__(26), __vue_template__ = __webpack_require__(64), 
        module.exports = __vue_script__ || {}, module.exports.__esModule && (module.exports = module.exports.default), 
        __vue_template__ && (("function" == typeof module.exports ? module.exports.options : module.exports).template = __vue_template__);
    }, function(module, exports, __webpack_require__) {
        var __vue_script__, __vue_template__;
        __webpack_require__(62), __vue_script__ = __webpack_require__(27), __vue_template__ = __webpack_require__(65), 
        module.exports = __vue_script__ || {}, module.exports.__esModule && (module.exports = module.exports.default), 
        __vue_template__ && (("function" == typeof module.exports ? module.exports.options : module.exports).template = __vue_template__);
    }, function(module, exports, __webpack_require__) {
        var __vue_script__, __vue_template__;
        __vue_script__ = __webpack_require__(28), module.exports = __vue_script__ || {}, 
        module.exports.__esModule && (module.exports = module.exports.default), __vue_template__ && (("function" == typeof module.exports ? module.exports.options : module.exports).template = __vue_template__);
    }, function(module, exports, __webpack_require__) {
        var __vue_script__, __vue_template__;
        __vue_script__ = __webpack_require__(29), __vue_template__ = __webpack_require__(66), 
        module.exports = __vue_script__ || {}, module.exports.__esModule && (module.exports = module.exports.default), 
        __vue_template__ && (("function" == typeof module.exports ? module.exports.options : module.exports).template = __vue_template__);
    }, function(module, exports, __webpack_require__) {
        var __vue_script__, __vue_template__;
        __vue_script__ = __webpack_require__(30), module.exports = __vue_script__ || {}, 
        module.exports.__esModule && (module.exports = module.exports.default), __vue_template__ && (("function" == typeof module.exports ? module.exports.options : module.exports).template = __vue_template__);
    }, function(module, exports, __webpack_require__) {
        var __vue_script__, __vue_template__;
        __vue_script__ = __webpack_require__(31), module.exports = __vue_script__ || {}, 
        module.exports.__esModule && (module.exports = module.exports.default), __vue_template__ && (("function" == typeof module.exports ? module.exports.options : module.exports).template = __vue_template__);
    }, function(module, exports, __webpack_require__) {
        var __vue_script__, __vue_template__;
        __vue_script__ = __webpack_require__(32), module.exports = __vue_script__ || {}, 
        module.exports.__esModule && (module.exports = module.exports.default), __vue_template__ && (("function" == typeof module.exports ? module.exports.options : module.exports).template = __vue_template__);
    } ]);
});