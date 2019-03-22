var $jscomp = {
        scope: {},
        global: this
    },
    Symbol;
$jscomp.initSymbol = function() {
    $jscomp.global.Symbol || (Symbol = $jscomp.Symbol);
    $jscomp.initSymbol = function() {}
};
$jscomp.symbolCounter_ = 0;
$jscomp.Symbol = function(a) {
    return "jscomp_symbol_" + a + $jscomp.symbolCounter_++
};
$jscomp.initSymbolIterator = function() {
    $jscomp.initSymbol();
    Symbol.iterator || (Symbol.iterator = Symbol("iterator"));
    $jscomp.initSymbolIterator = function() {}
};
var dcount = 0;
$jscomp.makeIterator = function(a) {
    $jscomp.initSymbolIterator();
    if (a[Symbol.iterator]) {
        return a[Symbol.iterator]();
    }
    
    if (!(a instanceof Array || "string" == typeof a || a instanceof String)){
        throw new TypeError(a + " is not iterable");
    } 
        
    var b = 0;
    return {
        next: function() {
            return b == a.length ? {
                done: !0
            } : {
                done: !1,
                value: a[b++]
            }
        }
    }
};
$jscomp.arrayFromIterator = function(a) {
    for (var b, c = []; !(b = a.next()).done;) c.push(b.value);
    return c
};
$jscomp.arrayFromIterable = function(a) {
    var set_to_arr = [];
    if (a instanceof Set)
        a.forEach((ele)=>set_to_arr.push(ele));
    return a instanceof Array ? a : set_to_arr;
    // return a instanceof Array ? a : $jscomp.arrayFromIterator($jscomp.makeIterator(a))
};
$jscomp.arrayFromArguments = function(a) {
    for (var b = [], c = 0; c < a.length; c++) b.push(a[c]);
    return b
};
$jscomp.inherits = function(a, b) {
    function c() {}
    c.prototype = b.prototype;
    a.prototype = new c;
    a.prototype.constructor = a;
    for (var d in b)
        if ($jscomp.global.Object.defineProperties) {
            var e = $jscomp.global.Object.getOwnPropertyDescriptor(b, d);
            void 0 !== e && $jscomp.global.Object.defineProperty(a, d, e)
        } else a[d] = b[d]
};
var COMPILED = !0,
    goog = goog || {};
goog.global = this;
goog.isDef = function(a) {
    return void 0 !== a
};
goog.exportPath_ = function(a, b, c) {
    a = a.split(".");
    c = c || goog.global;
    a[0] in c || !c.execScript || c.execScript("var " + a[0]);
    for (var d; a.length && (d = a.shift());) !a.length && goog.isDef(b) ? c[d] = b : c = c[d] ? c[d] : c[d] = {}
};
goog.define = function(a, b) {
    var c = b;
    COMPILED || (goog.global.CLOSURE_UNCOMPILED_DEFINES && Object.prototype.hasOwnProperty.call(goog.global.CLOSURE_UNCOMPILED_DEFINES, a) ? c = goog.global.CLOSURE_UNCOMPILED_DEFINES[a] : goog.global.CLOSURE_DEFINES && Object.prototype.hasOwnProperty.call(goog.global.CLOSURE_DEFINES, a) && (c = goog.global.CLOSURE_DEFINES[a]));
    goog.exportPath_(a, c)
};
goog.DEBUG = !0;
goog.LOCALE = "en";
goog.TRUSTED_SITE = !0;
goog.STRICT_MODE_COMPATIBLE = !1;
goog.DISALLOW_TEST_ONLY_CODE = COMPILED && !goog.DEBUG;
goog.ENABLE_CHROME_APP_SAFE_SCRIPT_LOADING = !1;
goog.provide = function(a) {
    if (!COMPILED && goog.isProvided_(a)) throw Error('Namespace "' + a + '" already declared.');
    goog.constructNamespace_(a)
};
goog.constructNamespace_ = function(a, b) {
    if (!COMPILED) {
        delete goog.implicitNamespaces_[a];
        for (var c = a;
            (c = c.substring(0, c.lastIndexOf("."))) && !goog.getObjectByName(c);) goog.implicitNamespaces_[c] = !0
    }
    goog.exportPath_(a, b)
};
goog.VALID_MODULE_RE_ = /^[a-zA-Z_$][a-zA-Z0-9._$]*$/;
goog.module = function(a) {
    if (!goog.isString(a) || !a || -1 == a.search(goog.VALID_MODULE_RE_)) throw Error("Invalid module identifier");
    if (!goog.isInModuleLoader_()) throw Error("Module " + a + " has been loaded incorrectly.");
    if (goog.moduleLoaderState_.moduleName) throw Error("goog.module may only be called once per module.");
    goog.moduleLoaderState_.moduleName = a;
    if (!COMPILED) {
        if (goog.isProvided_(a)) throw Error('Namespace "' + a + '" already declared.');
        delete goog.implicitNamespaces_[a]
    }
};
goog.module.get = function(a) {
    return goog.module.getInternal_(a)
};
goog.module.getInternal_ = function(a) {
    if (!COMPILED) return goog.isProvided_(a) ? a in goog.loadedModules_ ? goog.loadedModules_[a] : goog.getObjectByName(a) : null
};
goog.moduleLoaderState_ = null;
goog.isInModuleLoader_ = function() {
    return null != goog.moduleLoaderState_
};
goog.module.declareLegacyNamespace = function() {
    if (!COMPILED && !goog.isInModuleLoader_()) throw Error("goog.module.declareLegacyNamespace must be called from within a goog.module");
    if (!COMPILED && !goog.moduleLoaderState_.moduleName) throw Error("goog.module must be called prior to goog.module.declareLegacyNamespace.");
    goog.moduleLoaderState_.declareLegacyNamespace = !0
};
goog.setTestOnly = function(a) {
    if (goog.DISALLOW_TEST_ONLY_CODE) throw a = a || "", Error("Importing test-only code into non-debug environment" + (a ? ": " + a : "."));
};
goog.forwardDeclare = function(a) {};
COMPILED || (goog.isProvided_ = function(a) {
    return a in goog.loadedModules_ || !goog.implicitNamespaces_[a] && goog.isDefAndNotNull(goog.getObjectByName(a))
}, goog.implicitNamespaces_ = {
    "goog.module": !0
});
goog.getObjectByName = function(a, b) {
    for (var c = a.split("."), d = b || goog.global, e; e = c.shift();)
        if (goog.isDefAndNotNull(d[e])) d = d[e];
        else return null;
    return d
};
goog.globalize = function(a, b) {
    var c = b || goog.global,
        d;
    for (d in a) c[d] = a[d]
};
goog.addDependency = function(a, b, c, d) {
    if (goog.DEPENDENCIES_ENABLED) {
        var e;
        a = a.replace(/\\/g, "/");
        for (var f = goog.dependencies_, g = 0; e = b[g]; g++) f.nameToPath[e] = a, f.pathIsModule[a] = !!d;
        for (d = 0; b = c[d]; d++) a in f.requires || (f.requires[a] = {}), f.requires[a][b] = !0
    }
};
goog.ENABLE_DEBUG_LOADER = !0;
goog.logToConsole_ = function(a) {
    goog.global.console && goog.global.console.error(a)
};
goog.require = function(a) {
    if (!COMPILED) {
        goog.ENABLE_DEBUG_LOADER && goog.IS_OLD_IE_ && goog.maybeProcessDeferredDep_(a);
        if (goog.isProvided_(a)) return goog.isInModuleLoader_() ? goog.module.getInternal_(a) : null;
        if (goog.ENABLE_DEBUG_LOADER) {
            var b = goog.getPathFromDeps_(a);
            if (b) return goog.writeScripts_(b), null
        }
        a = "goog.require could not find: " + a;
        goog.logToConsole_(a);
        throw Error(a);
    }
};
goog.basePath = "";
goog.nullFunction = function() {};
goog.abstractMethod = function() {
    throw Error("unimplemented abstract method");
};
goog.addSingletonGetter = function(a) {
    a.getInstance = function() {
        if (a.instance_) return a.instance_;
        goog.DEBUG && (goog.instantiatedSingletons_[goog.instantiatedSingletons_.length] = a);
        return a.instance_ = new a
    }
};
goog.instantiatedSingletons_ = [];
goog.LOAD_MODULE_USING_EVAL = !0;
goog.SEAL_MODULE_EXPORTS = goog.DEBUG;
goog.loadedModules_ = {};
goog.DEPENDENCIES_ENABLED = !COMPILED && goog.ENABLE_DEBUG_LOADER;
goog.DEPENDENCIES_ENABLED && (goog.dependencies_ = {
        pathIsModule: {},
        nameToPath: {},
        requires: {},
        visited: {},
        written: {},
        deferred: {}
    }, goog.inHtmlDocument_ = function() {
        var a = goog.global.document;
        return null != a && "write" in a
    }, goog.findBasePath_ = function() {
        if (goog.isDef(goog.global.CLOSURE_BASE_PATH)) goog.basePath = goog.global.CLOSURE_BASE_PATH;
        else if (goog.inHtmlDocument_())
            for (var a = goog.global.document.getElementsByTagName("SCRIPT"), b = a.length - 1; 0 <= b; --b) {
                var c = a[b].src,
                    d = c.lastIndexOf("?"),
                    d = -1 == d ? c.length :
                    d;
                if ("base.js" == c.substr(d - 7, 7)) {
                    goog.basePath = c.substr(0, d - 7);
                    break
                }
            }
    }, goog.importScript_ = function(a, b) {
        (goog.global.CLOSURE_IMPORT_SCRIPT || goog.writeScriptTag_)(a, b) && (goog.dependencies_.written[a] = !0)
    }, goog.IS_OLD_IE_ = !(goog.global.atob || !goog.global.document || !goog.global.document.all), goog.importModule_ = function(a) {
        goog.importScript_("", 'goog.retrieveAndExecModule_("' + a + '");') && (goog.dependencies_.written[a] = !0)
    }, goog.queuedModules_ = [], goog.wrapModule_ = function(a, b) {
        return goog.LOAD_MODULE_USING_EVAL &&
            goog.isDef(goog.global.JSON) ? "goog.loadModule(" + goog.global.JSON.stringify(b + "\n//# sourceURL=" + a + "\n") + ");" : 'goog.loadModule(function(exports) {"use strict";' + b + "\n;return exports});\n//# sourceURL=" + a + "\n"
    }, goog.loadQueuedModules_ = function() {
        var a = goog.queuedModules_.length;
        if (0 < a) {
            var b = goog.queuedModules_;
            goog.queuedModules_ = [];
            for (var c = 0; c < a; c++) goog.maybeProcessDeferredPath_(b[c])
        }
    }, goog.maybeProcessDeferredDep_ = function(a) {
        goog.isDeferredModule_(a) && goog.allDepsAreAvailable_(a) && (a = goog.getPathFromDeps_(a),
            goog.maybeProcessDeferredPath_(goog.basePath + a))
    }, goog.isDeferredModule_ = function(a) {
        return (a = goog.getPathFromDeps_(a)) && goog.dependencies_.pathIsModule[a] ? goog.basePath + a in goog.dependencies_.deferred : !1
    }, goog.allDepsAreAvailable_ = function(a) {
        if ((a = goog.getPathFromDeps_(a)) && a in goog.dependencies_.requires)
            for (var b in goog.dependencies_.requires[a])
                if (!goog.isProvided_(b) && !goog.isDeferredModule_(b)) return !1;
        return !0
    }, goog.maybeProcessDeferredPath_ = function(a) {
        if (a in goog.dependencies_.deferred) {
            var b =
                goog.dependencies_.deferred[a];
            delete goog.dependencies_.deferred[a];
            goog.globalEval(b)
        }
    }, goog.loadModuleFromUrl = function(a) {
        goog.retrieveAndExecModule_(a)
    }, goog.loadModule = function(a) {
        var b = goog.moduleLoaderState_;
        try {
            goog.moduleLoaderState_ = {
                moduleName: void 0,
                declareLegacyNamespace: !1
            };
            var c;
            if (goog.isFunction(a)) c = a.call(goog.global, {});
            else if (goog.isString(a)) c = goog.loadModuleFromSource_.call(goog.global, a);
            else throw Error("Invalid module definition");
            var d = goog.moduleLoaderState_.moduleName;
            if (!goog.isString(d) || !d) throw Error('Invalid module name "' + d + '"');
            goog.moduleLoaderState_.declareLegacyNamespace ? goog.constructNamespace_(d, c) : goog.SEAL_MODULE_EXPORTS && Object.seal && Object.seal(c);
            goog.loadedModules_[d] = c
        } finally {
            goog.moduleLoaderState_ = b
        }
    }, goog.loadModuleFromSource_ = function(a) {
        eval(a);
        return {}
    }, goog.writeScriptSrcNode_ = function(a) {
        goog.global.document.write('<script type="text/javascript" src="' + a + '">\x3c/script>')
    }, goog.appendScriptSrcNode_ = function(a) {
        var b = goog.global.document,
            c = b.createElement("script");
        c.type = "text/javascript";
        c.src = a;
        c.defer = !1;
        c.async = !1;
        b.head.appendChild(c)
    }, goog.writeScriptTag_ = function(a, b) {
        if (goog.inHtmlDocument_()) {
            var c = goog.global.document;
            if (!goog.ENABLE_CHROME_APP_SAFE_SCRIPT_LOADING && "complete" == c.readyState) {
                if (/\bdeps.js$/.test(a)) return !1;
                throw Error('Cannot write "' + a + '" after document load');
            }
            var d = goog.IS_OLD_IE_;
            void 0 === b ? d ? (d = " onreadystatechange='goog.onScriptLoad_(this, " + ++goog.lastNonModuleScriptIndex_ + ")' ", c.write('<script type="text/javascript" src="' +
                a + '"' + d + ">\x3c/script>")) : goog.ENABLE_CHROME_APP_SAFE_SCRIPT_LOADING ? goog.appendScriptSrcNode_(a) : goog.writeScriptSrcNode_(a) : c.write('<script type="text/javascript">' + b + "\x3c/script>");
            return !0
        }
        return !1
    }, goog.lastNonModuleScriptIndex_ = 0, goog.onScriptLoad_ = function(a, b) {
        "complete" == a.readyState && goog.lastNonModuleScriptIndex_ == b && goog.loadQueuedModules_();
        return !0
    }, goog.writeScripts_ = function(a) {
        function b(a) {
            if (!(a in e.written || a in e.visited)) {
                e.visited[a] = !0;
                if (a in e.requires)
                    for (var f in e.requires[a])
                        if (!goog.isProvided_(f))
                            if (f in
                                e.nameToPath) b(e.nameToPath[f]);
                            else throw Error("Undefined nameToPath for " + f);
                a in d || (d[a] = !0, c.push(a))
            }
        }
        var c = [],
            d = {},
            e = goog.dependencies_;
        b(a);
        for (a = 0; a < c.length; a++) {
            var f = c[a];
            goog.dependencies_.written[f] = !0
        }
        var g = goog.moduleLoaderState_;
        goog.moduleLoaderState_ = null;
        for (a = 0; a < c.length; a++)
            if (f = c[a]) e.pathIsModule[f] ? goog.importModule_(goog.basePath + f) : goog.importScript_(goog.basePath + f);
            else throw goog.moduleLoaderState_ = g, Error("Undefined script input");
        goog.moduleLoaderState_ = g
    }, goog.getPathFromDeps_ =
    function(a) {
        return a in goog.dependencies_.nameToPath ? goog.dependencies_.nameToPath[a] : null
    }, goog.findBasePath_(), goog.global.CLOSURE_NO_DEPS || goog.importScript_(goog.basePath + "deps.js"));
goog.normalizePath_ = function(a) {
    a = a.split("/");
    for (var b = 0; b < a.length;) "." == a[b] ? a.splice(b, 1) : b && ".." == a[b] && a[b - 1] && ".." != a[b - 1] ? a.splice(--b, 2) : b++;
    return a.join("/")
};
goog.loadFileSync_ = function(a) {
    if (goog.global.CLOSURE_LOAD_FILE_SYNC) return goog.global.CLOSURE_LOAD_FILE_SYNC(a);
    var b = new goog.global.XMLHttpRequest;
    b.open("get", a, !1);
    b.send();
    return b.responseText
};
goog.retrieveAndExecModule_ = function(a) {
    if (!COMPILED) {
        var b = a;
        a = goog.normalizePath_(a);
        var c = goog.global.CLOSURE_IMPORT_SCRIPT || goog.writeScriptTag_,
            d = goog.loadFileSync_(a);
        if (null != d) d = goog.wrapModule_(a, d), goog.IS_OLD_IE_ ? (goog.dependencies_.deferred[b] = d, goog.queuedModules_.push(b)) : c(a, d);
        else throw Error("load of " + a + "failed");
    }
};
goog.typeOf = function(a) {
    var b = typeof a;
    if ("object" == b)
        if (a) {
            if (a instanceof Array) return "array";
            if (a instanceof Object) return b;
            var c = Object.prototype.toString.call(a);
            if ("[object Window]" == c) return "object";
            if ("[object Array]" == c || "number" == typeof a.length && "undefined" != typeof a.splice && "undefined" != typeof a.propertyIsEnumerable && !a.propertyIsEnumerable("splice")) return "array";
            if ("[object Function]" == c || "undefined" != typeof a.call && "undefined" != typeof a.propertyIsEnumerable && !a.propertyIsEnumerable("call")) return "function"
        } else return "null";
    else if ("function" == b && "undefined" == typeof a.call) return "object";
    return b
};
goog.isNull = function(a) {
    return null === a
};
goog.isDefAndNotNull = function(a) {
    return null != a
};
goog.isArray = function(a) {
    return "array" == goog.typeOf(a)
};
goog.isArrayLike = function(a) {
    var b = goog.typeOf(a);
    return "array" == b || "object" == b && "number" == typeof a.length
};
goog.isDateLike = function(a) {
    return goog.isObject(a) && "function" == typeof a.getFullYear
};
goog.isString = function(a) {
    return "string" == typeof a
};
goog.isBoolean = function(a) {
    return "boolean" == typeof a
};
goog.isNumber = function(a) {
    return "number" == typeof a
};
goog.isFunction = function(a) {
    return "function" == goog.typeOf(a)
};
goog.isObject = function(a) {
    var b = typeof a;
    return "object" == b && null != a || "function" == b
};
goog.getUid = function(a) {
    return a[goog.UID_PROPERTY_] || (a[goog.UID_PROPERTY_] = ++goog.uidCounter_)
};
goog.hasUid = function(a) {
    return !!a[goog.UID_PROPERTY_]
};
goog.removeUid = function(a) {
    null !== a && "removeAttribute" in a && a.removeAttribute(goog.UID_PROPERTY_);
    try {
        delete a[goog.UID_PROPERTY_]
    } catch (b) {}
};
goog.UID_PROPERTY_ = "closure_uid_" + (1E9 * Math.random() >>> 0);
goog.uidCounter_ = 0;
goog.getHashCode = goog.getUid;
goog.removeHashCode = goog.removeUid;
goog.cloneObject = function(a) {
    var b = goog.typeOf(a);
    if ("object" == b || "array" == b) {
        if (a.clone) return a.clone();
        var b = "array" == b ? [] : {},
            c;
        for (c in a) b[c] = goog.cloneObject(a[c]);
        return b
    }
    return a
};
goog.bindNative_ = function(a, b, c) {
    return a.call.apply(a.bind, arguments)
};
goog.bindJs_ = function(a, b, c) {
    if (!a) throw Error();
    if (2 < arguments.length) {
        var d = Array.prototype.slice.call(arguments, 2);
        return function() {
            var c = Array.prototype.slice.call(arguments);
            Array.prototype.unshift.apply(c, d);
            return a.apply(b, c)
        }
    }
    return function() {
        return a.apply(b, arguments)
    }
};
goog.bind = function(a, b, c) {
    Function.prototype.bind && -1 != Function.prototype.bind.toString().indexOf("native code") ? goog.bind = goog.bindNative_ : goog.bind = goog.bindJs_;
    return goog.bind.apply(null, arguments)
};
goog.partial = function(a, b) {
    var c = Array.prototype.slice.call(arguments, 1);
    return function() {
        var b = c.slice();
        b.push.apply(b, arguments);
        return a.apply(this, b)
    }
};
goog.mixin = function(a, b) {
    for (var c in b) a[c] = b[c]
};
goog.now = goog.TRUSTED_SITE && Date.now || function() {
    return +new Date
};
goog.globalEval = function(a) {
    if (goog.global.execScript) goog.global.execScript(a, "JavaScript");
    else if (goog.global.eval) {
        if (null == goog.evalWorksForGlobals_)
            if (goog.global.eval("var _evalTest_ = 1;"), "undefined" != typeof goog.global._evalTest_) {
                try {
                    delete goog.global._evalTest_
                } catch (d) {}
                goog.evalWorksForGlobals_ = !0
            } else goog.evalWorksForGlobals_ = !1;
        if (goog.evalWorksForGlobals_) goog.global.eval(a);
        else {
            var b = goog.global.document,
                c = b.createElement("SCRIPT");
            c.type = "text/javascript";
            c.defer = !1;
            c.appendChild(b.createTextNode(a));
            b.body.appendChild(c);
            b.body.removeChild(c)
        }
    } else throw Error("goog.globalEval not available");
};
goog.evalWorksForGlobals_ = null;
goog.getCssName = function(a, b) {
    var c = function(a) {
            return goog.cssNameMapping_[a] || a
        },
        d = function(a) {
            a = a.split("-");
            for (var b = [], d = 0; d < a.length; d++) b.push(c(a[d]));
            return b.join("-")
        },
        d = goog.cssNameMapping_ ? "BY_WHOLE" == goog.cssNameMappingStyle_ ? c : d : function(a) {
            return a
        };
    return b ? a + "-" + d(b) : d(a)
};
goog.setCssNameMapping = function(a, b) {
    goog.cssNameMapping_ = a;
    goog.cssNameMappingStyle_ = b
};
!COMPILED && goog.global.CLOSURE_CSS_NAME_MAPPING && (goog.cssNameMapping_ = goog.global.CLOSURE_CSS_NAME_MAPPING);
goog.getMsg = function(a, b) {
    b && (a = a.replace(/\{\$([^}]+)}/g, function(a, d) {
        return null != b && d in b ? b[d] : a
    }));
    return a
};
goog.getMsgWithFallback = function(a, b) {
    return a
};
goog.exportSymbol = function(a, b, c) {
    goog.exportPath_(a, b, c)
};
goog.exportProperty = function(a, b, c) {
    a[b] = c
};
goog.inherits = function(a, b) {
    function c() {}
    c.prototype = b.prototype;
    a.superClass_ = b.prototype;
    a.prototype = new c;
    a.prototype.constructor = a;
    a.base = function(a, c, f) {
        for (var g = Array(arguments.length - 2), h = 2; h < arguments.length; h++) g[h - 2] = arguments[h];
        return b.prototype[c].apply(a, g)
    }
};
goog.base = function(a, b, c) {
    var d = arguments.callee.caller;
    if (goog.STRICT_MODE_COMPATIBLE || goog.DEBUG && !d) throw Error("arguments.caller not defined.  goog.base() cannot be used with strict mode code. See http://www.ecma-international.org/ecma-262/5.1/#sec-C");
    if (d.superClass_) {
        for (var e = Array(arguments.length - 1), f = 1; f < arguments.length; f++) e[f - 1] = arguments[f];
        return d.superClass_.constructor.apply(a, e)
    }
    e = Array(arguments.length - 2);
    for (f = 2; f < arguments.length; f++) e[f - 2] = arguments[f];
    for (var f = !1, g = a.constructor; g; g =
        g.superClass_ && g.superClass_.constructor)
        if (g.prototype[b] === d) f = !0;
        else if (f) return g.prototype[b].apply(a, e);
    if (a[b] === d) return a.constructor.prototype[b].apply(a, e);
    throw Error("goog.base called from a method of one name to a method of a different name");
};
goog.scope = function(a) {
    a.call(goog.global)
};
COMPILED || (goog.global.COMPILED = COMPILED);
goog.defineClass = function(a, b) {
    var c = b.constructor,
        d = b.statics;
    c && c != Object.prototype.constructor || (c = function() {
        throw Error("cannot instantiate an interface (no constructor defined).");
    });
    c = goog.defineClass.createSealingConstructor_(c, a);
    a && goog.inherits(c, a);
    delete b.constructor;
    delete b.statics;
    goog.defineClass.applyProperties_(c.prototype, b);
    null != d && (d instanceof Function ? d(c) : goog.defineClass.applyProperties_(c, d));
    return c
};
goog.defineClass.SEAL_CLASS_INSTANCES = goog.DEBUG;
goog.defineClass.createSealingConstructor_ = function(a, b) {
    if (goog.defineClass.SEAL_CLASS_INSTANCES && Object.seal instanceof Function) {
        if (b && b.prototype && b.prototype[goog.UNSEALABLE_CONSTRUCTOR_PROPERTY_]) return a;
        var c = function() {
            var b = a.apply(this, arguments) || this;
            b[goog.UID_PROPERTY_] = b[goog.UID_PROPERTY_];
            this.constructor === c && Object.seal(b);
            return b
        };
        return c
    }
    return a
};
goog.defineClass.OBJECT_PROTOTYPE_FIELDS_ = "constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");
goog.defineClass.applyProperties_ = function(a, b) {
    for (var c in b) Object.prototype.hasOwnProperty.call(b, c) && (a[c] = b[c]);
    for (var d = 0; d < goog.defineClass.OBJECT_PROTOTYPE_FIELDS_.length; d++) c = goog.defineClass.OBJECT_PROTOTYPE_FIELDS_[d], Object.prototype.hasOwnProperty.call(b, c) && (a[c] = b[c])
};
goog.tagUnsealableClass = function(a) {
    !COMPILED && goog.defineClass.SEAL_CLASS_INSTANCES && (a.prototype[goog.UNSEALABLE_CONSTRUCTOR_PROPERTY_] = !0)
};
goog.UNSEALABLE_CONSTRUCTOR_PROPERTY_ = "goog_defineClass_legacy_unsealable";
goog.debug = {};
goog.debug.Error = function(a) {
    if (Error.captureStackTrace) Error.captureStackTrace(this, goog.debug.Error);
    else {
        var b = Error().stack;
        b && (this.stack = b)
    }
    a && (this.message = String(a));
    this.reportErrorToServer = !0
};
goog.inherits(goog.debug.Error, Error);
goog.debug.Error.prototype.name = "CustomError";
goog.dom = {};
goog.dom.NodeType = {
    ELEMENT: 1,
    ATTRIBUTE: 2,
    TEXT: 3,
    CDATA_SECTION: 4,
    ENTITY_REFERENCE: 5,
    ENTITY: 6,
    PROCESSING_INSTRUCTION: 7,
    COMMENT: 8,
    DOCUMENT: 9,
    DOCUMENT_TYPE: 10,
    DOCUMENT_FRAGMENT: 11,
    NOTATION: 12
};
goog.string = {};
goog.string.DETECT_DOUBLE_ESCAPING = !1;
goog.string.FORCE_NON_DOM_HTML_UNESCAPING = !1;
goog.string.Unicode = {
    NBSP: "\u00a0"
};
goog.string.startsWith = function(a, b) {
    return 0 == a.lastIndexOf(b, 0)
};
goog.string.endsWith = function(a, b) {
    var c = a.length - b.length;
    return 0 <= c && a.indexOf(b, c) == c
};
goog.string.caseInsensitiveStartsWith = function(a, b) {
    return 0 == goog.string.caseInsensitiveCompare(b, a.substr(0, b.length))
};
goog.string.caseInsensitiveEndsWith = function(a, b) {
    return 0 == goog.string.caseInsensitiveCompare(b, a.substr(a.length - b.length, b.length))
};
goog.string.caseInsensitiveEquals = function(a, b) {
    return a.toLowerCase() == b.toLowerCase()
};
goog.string.subs = function(a, b) {
    for (var c = a.split("%s"), d = "", e = Array.prototype.slice.call(arguments, 1); e.length && 1 < c.length;) d += c.shift() + e.shift();
    return d + c.join("%s")
};
goog.string.collapseWhitespace = function(a) {
    return a.replace(/[\s\xa0]+/g, " ").replace(/^\s+|\s+$/g, "")
};
goog.string.isEmptyOrWhitespace = function(a) {
    return /^[\s\xa0]*$/.test(a)
};
goog.string.isEmptyString = function(a) {
    return 0 == a.length
};
goog.string.isEmpty = goog.string.isEmptyOrWhitespace;
goog.string.isEmptyOrWhitespaceSafe = function(a) {
    return goog.string.isEmptyOrWhitespace(goog.string.makeSafe(a))
};
goog.string.isEmptySafe = goog.string.isEmptyOrWhitespaceSafe;
goog.string.isBreakingWhitespace = function(a) {
    return !/[^\t\n\r ]/.test(a)
};
goog.string.isAlpha = function(a) {
    return !/[^a-zA-Z]/.test(a)
};
goog.string.isNumeric = function(a) {
    return !/[^0-9]/.test(a)
};
goog.string.isAlphaNumeric = function(a) {
    return !/[^a-zA-Z0-9]/.test(a)
};
goog.string.isSpace = function(a) {
    return " " == a
};
goog.string.isUnicodeChar = function(a) {
    return 1 == a.length && " " <= a && "~" >= a || "\u0080" <= a && "\ufffd" >= a
};
goog.string.stripNewlines = function(a) {
    return a.replace(/(\r\n|\r|\n)+/g, " ")
};
goog.string.canonicalizeNewlines = function(a) {
    return a.replace(/(\r\n|\r|\n)/g, "\n")
};
goog.string.normalizeWhitespace = function(a) {
    return a.replace(/\xa0|\s/g, " ")
};
goog.string.normalizeSpaces = function(a) {
    return a.replace(/\xa0|[ \t]+/g, " ")
};
goog.string.collapseBreakingSpaces = function(a) {
    return a.replace(/[\t\r\n ]+/g, " ").replace(/^[\t\r\n ]+|[\t\r\n ]+$/g, "")
};
goog.string.trim = goog.TRUSTED_SITE && String.prototype.trim ? function(a) {
    return a.trim()
} : function(a) {
    return a.replace(/^[\s\xa0]+|[\s\xa0]+$/g, "")
};
goog.string.trimLeft = function(a) {
    return a.replace(/^[\s\xa0]+/, "")
};
goog.string.trimRight = function(a) {
    return a.replace(/[\s\xa0]+$/, "")
};
goog.string.caseInsensitiveCompare = function(a, b) {
    var c = String(a).toLowerCase(),
        d = String(b).toLowerCase();
    return c < d ? -1 : c == d ? 0 : 1
};
goog.string.numberAwareCompare_ = function(a, b, c) {
    if (a == b) return 0;
    if (!a) return -1;
    if (!b) return 1;
    for (var d = a.toLowerCase().match(c), e = b.toLowerCase().match(c), f = Math.min(d.length, e.length), g = 0; g < f; g++) {
        c = d[g];
        var h = e[g];
        if (c != h) return a = parseInt(c, 10), !isNaN(a) && (b = parseInt(h, 10), !isNaN(b) && a - b) ? a - b : c < h ? -1 : 1
    }
    return d.length != e.length ? d.length - e.length : a < b ? -1 : 1
};
goog.string.intAwareCompare = function(a, b) {
    return goog.string.numberAwareCompare_(a, b, /\d+|\D+/g)
};
goog.string.floatAwareCompare = function(a, b) {
    return goog.string.numberAwareCompare_(a, b, /\d+|\.\d+|\D+/g)
};
goog.string.numerateCompare = goog.string.floatAwareCompare;
goog.string.urlEncode = function(a) {
    return encodeURIComponent(String(a))
};
goog.string.urlDecode = function(a) {
    return decodeURIComponent(a.replace(/\+/g, " "))
};
goog.string.newLineToBr = function(a, b) {
    return a.replace(/(\r\n|\r|\n)/g, b ? "<br />" : "<br>")
};
goog.string.htmlEscape = function(a, b) {
    if (b) a = a.replace(goog.string.AMP_RE_, "&amp;").replace(goog.string.LT_RE_, "&lt;").replace(goog.string.GT_RE_, "&gt;").replace(goog.string.QUOT_RE_, "&quot;").replace(goog.string.SINGLE_QUOTE_RE_, "&#39;").replace(goog.string.NULL_RE_, "&#0;"), goog.string.DETECT_DOUBLE_ESCAPING && (a = a.replace(goog.string.E_RE_, "&#101;"));
    else {
        if (!goog.string.ALL_RE_.test(a)) return a; - 1 != a.indexOf("&") && (a = a.replace(goog.string.AMP_RE_, "&amp;")); - 1 != a.indexOf("<") && (a = a.replace(goog.string.LT_RE_,
            "&lt;")); - 1 != a.indexOf(">") && (a = a.replace(goog.string.GT_RE_, "&gt;")); - 1 != a.indexOf('"') && (a = a.replace(goog.string.QUOT_RE_, "&quot;")); - 1 != a.indexOf("'") && (a = a.replace(goog.string.SINGLE_QUOTE_RE_, "&#39;")); - 1 != a.indexOf("\x00") && (a = a.replace(goog.string.NULL_RE_, "&#0;"));
        goog.string.DETECT_DOUBLE_ESCAPING && -1 != a.indexOf("e") && (a = a.replace(goog.string.E_RE_, "&#101;"))
    }
    return a
};
goog.string.AMP_RE_ = /&/g;
goog.string.LT_RE_ = /</g;
goog.string.GT_RE_ = />/g;
goog.string.QUOT_RE_ = /"/g;
goog.string.SINGLE_QUOTE_RE_ = /'/g;
goog.string.NULL_RE_ = /\x00/g;
goog.string.E_RE_ = /e/g;
goog.string.ALL_RE_ = goog.string.DETECT_DOUBLE_ESCAPING ? /[\x00&<>"'e]/ : /[\x00&<>"']/;
goog.string.unescapeEntities = function(a) {
    return goog.string.contains(a, "&") ? !goog.string.FORCE_NON_DOM_HTML_UNESCAPING && "document" in goog.global ? goog.string.unescapeEntitiesUsingDom_(a) : goog.string.unescapePureXmlEntities_(a) : a
};
goog.string.unescapeEntitiesWithDocument = function(a, b) {
    return goog.string.contains(a, "&") ? goog.string.unescapeEntitiesUsingDom_(a, b) : a
};
goog.string.unescapeEntitiesUsingDom_ = function(a, b) {
    var c = {
            "&amp;": "&",
            "&lt;": "<",
            "&gt;": ">",
            "&quot;": '"'
        },
        d;
    d = b ? b.createElement("div") : goog.global.document.createElement("div");
    return a.replace(goog.string.HTML_ENTITY_PATTERN_, function(a, b) {
        var g = c[a];
        if (g) return g;
        if ("#" == b.charAt(0)) {
            var h = Number("0" + b.substr(1));
            isNaN(h) || (g = String.fromCharCode(h))
        }
        g || (d.innerHTML = a + " ", g = d.firstChild.nodeValue.slice(0, -1));
        return c[a] = g
    })
};
goog.string.unescapePureXmlEntities_ = function(a) {
    return a.replace(/&([^;]+);/g, function(a, c) {
        switch (c) {
            case "amp":
                return "&";
            case "lt":
                return "<";
            case "gt":
                return ">";
            case "quot":
                return '"';
            default:
                if ("#" == c.charAt(0)) {
                    var d = Number("0" + c.substr(1));
                    if (!isNaN(d)) return String.fromCharCode(d)
                }
                return a
        }
    })
};
goog.string.HTML_ENTITY_PATTERN_ = /&([^;\s<&]+);?/g;
goog.string.whitespaceEscape = function(a, b) {
    return goog.string.newLineToBr(a.replace(/  /g, " &#160;"), b)
};
goog.string.preserveSpaces = function(a) {
    return a.replace(/(^|[\n ]) /g, "$1" + goog.string.Unicode.NBSP)
};
goog.string.stripQuotes = function(a, b) {
    for (var c = b.length, d = 0; d < c; d++) {
        var e = 1 == c ? b : b.charAt(d);
        if (a.charAt(0) == e && a.charAt(a.length - 1) == e) return a.substring(1, a.length - 1)
    }
    return a
};
goog.string.truncate = function(a, b, c) {
    c && (a = goog.string.unescapeEntities(a));
    a.length > b && (a = a.substring(0, b - 3) + "...");
    c && (a = goog.string.htmlEscape(a));
    return a
};
goog.string.truncateMiddle = function(a, b, c, d) {
    c && (a = goog.string.unescapeEntities(a));
    if (d && a.length > b) {
        d > b && (d = b);
        var e = a.length - d;
        a = a.substring(0, b - d) + "..." + a.substring(e)
    } else a.length > b && (d = Math.floor(b / 2), e = a.length - d, a = a.substring(0, d + b % 2) + "..." + a.substring(e));
    c && (a = goog.string.htmlEscape(a));
    return a
};
goog.string.specialEscapeChars_ = {
    "\x00": "\\0",
    "\b": "\\b",
    "\f": "\\f",
    "\n": "\\n",
    "\r": "\\r",
    "\t": "\\t",
    "\x0B": "\\x0B",
    '"': '\\"',
    "\\": "\\\\",
    "<": "<"
};
goog.string.jsEscapeCache_ = {
    "'": "\\'"
};
goog.string.quote = function(a) {
    a = String(a);
    for (var b = ['"'], c = 0; c < a.length; c++) {
        var d = a.charAt(c),
            e = d.charCodeAt(0);
        b[c + 1] = goog.string.specialEscapeChars_[d] || (31 < e && 127 > e ? d : goog.string.escapeChar(d))
    }
    b.push('"');
    return b.join("")
};
goog.string.escapeString = function(a) {
    for (var b = [], c = 0; c < a.length; c++) b[c] = goog.string.escapeChar(a.charAt(c));
    return b.join("")
};
goog.string.escapeChar = function(a) {
    if (a in goog.string.jsEscapeCache_) return goog.string.jsEscapeCache_[a];
    if (a in goog.string.specialEscapeChars_) return goog.string.jsEscapeCache_[a] = goog.string.specialEscapeChars_[a];
    var b = a,
        c = a.charCodeAt(0);
    if (31 < c && 127 > c) b = a;
    else {
        if (256 > c) {
            if (b = "\\x", 16 > c || 256 < c) b += "0"
        } else b = "\\u", 4096 > c && (b += "0");
        b += c.toString(16).toUpperCase()
    }
    return goog.string.jsEscapeCache_[a] = b
};
goog.string.contains = function(a, b) {
    return -1 != a.indexOf(b)
};
goog.string.caseInsensitiveContains = function(a, b) {
    return goog.string.contains(a.toLowerCase(), b.toLowerCase())
};
goog.string.countOf = function(a, b) {
    return a && b ? a.split(b).length - 1 : 0
};
goog.string.removeAt = function(a, b, c) {
    var d = a;
    0 <= b && b < a.length && 0 < c && (d = a.substr(0, b) + a.substr(b + c, a.length - b - c));
    return d
};
goog.string.remove = function(a, b) {
    var c = new RegExp(goog.string.regExpEscape(b), "");
    return a.replace(c, "")
};
goog.string.removeAll = function(a, b) {
    var c = new RegExp(goog.string.regExpEscape(b), "g");
    return a.replace(c, "")
};
goog.string.regExpEscape = function(a) {
    return String(a).replace(/([-()\[\]{}+?*.$\^|,:#<!\\])/g, "\\$1").replace(/\x08/g, "\\x08")
};
goog.string.repeat = String.prototype.repeat ? function(a, b) {
    return a.repeat(b)
} : function(a, b) {
    return Array(b + 1).join(a)
};
goog.string.padNumber = function(a, b, c) {
    a = goog.isDef(c) ? a.toFixed(c) : String(a);
    c = a.indexOf("."); - 1 == c && (c = a.length);
    return goog.string.repeat("0", Math.max(0, b - c)) + a
};
goog.string.makeSafe = function(a) {
    return null == a ? "" : String(a)
};
goog.string.buildString = function(a) {
    return Array.prototype.join.call(arguments, "")
};
goog.string.getRandomString = function() {
    return Math.floor(2147483648 * Math.random()).toString(36) + Math.abs(Math.floor(2147483648 * Math.random()) ^ goog.now()).toString(36)
};
goog.string.compareVersions = function(a, b) {
    for (var c = 0, d = goog.string.trim(String(a)).split("."), e = goog.string.trim(String(b)).split("."), f = Math.max(d.length, e.length), g = 0; 0 == c && g < f; g++) {
        var h = d[g] || "",
            k = e[g] || "",
            l = /(\d*)(\D*)/g,
            m = /(\d*)(\D*)/g;
        do {
            var n = l.exec(h) || ["", "", ""],
                p = m.exec(k) || ["", "", ""];
            if (0 == n[0].length && 0 == p[0].length) break;
            var c = 0 == n[1].length ? 0 : parseInt(n[1], 10),
                q = 0 == p[1].length ? 0 : parseInt(p[1], 10),
                c = goog.string.compareElements_(c, q) || goog.string.compareElements_(0 == n[2].length, 0 == p[2].length) ||
                goog.string.compareElements_(n[2], p[2])
        } while (0 == c)
    }
    return c
};
goog.string.compareElements_ = function(a, b) {
    return a < b ? -1 : a > b ? 1 : 0
};
goog.string.hashCode = function(a) {
    for (var b = 0, c = 0; c < a.length; ++c) b = 31 * b + a.charCodeAt(c) >>> 0;
    return b
};
goog.string.uniqueStringCounter_ = 2147483648 * Math.random() | 0;
goog.string.createUniqueString = function() {
    return "goog_" + goog.string.uniqueStringCounter_++
};
goog.string.toNumber = function(a) {
    var b = Number(a);
    return 0 == b && goog.string.isEmptyOrWhitespace(a) ? NaN : b
};
goog.string.isLowerCamelCase = function(a) {
    return /^[a-z]+([A-Z][a-z]*)*$/.test(a)
};
goog.string.isUpperCamelCase = function(a) {
    return /^([A-Z][a-z]*)+$/.test(a)
};
goog.string.toCamelCase = function(a) {
    return String(a).replace(/\-([a-z])/g, function(a, c) {
        return c.toUpperCase()
    })
};
goog.string.toSelectorCase = function(a) {
    return String(a).replace(/([A-Z])/g, "-$1").toLowerCase()
};
goog.string.toTitleCase = function(a, b) {
    var c = goog.isString(b) ? goog.string.regExpEscape(b) : "\\s";
    return a.replace(new RegExp("(^" + (c ? "|[" + c + "]+" : "") + ")([a-z])", "g"), function(a, b, c) {
        return b + c.toUpperCase()
    })
};
goog.string.capitalize = function(a) {
    return String(a.charAt(0)).toUpperCase() + String(a.substr(1)).toLowerCase()
};
goog.string.parseInt = function(a) {
    isFinite(a) && (a = String(a));
    return goog.isString(a) ? /^\s*-?0x/i.test(a) ? parseInt(a, 16) : parseInt(a, 10) : NaN
};
goog.string.splitLimit = function(a, b, c) {
    a = a.split(b);
    for (var d = []; 0 < c && a.length;) d.push(a.shift()), c--;
    a.length && d.push(a.join(b));
    return d
};
goog.string.editDistance = function(a, b) {
    var c = [],
        d = [];
    if (a == b) return 0;
    if (!a.length || !b.length) return Math.max(a.length, b.length);
    for (var e = 0; e < b.length + 1; e++) c[e] = e;
    for (e = 0; e < a.length; e++) {
        d[0] = e + 1;
        for (var f = 0; f < b.length; f++) d[f + 1] = Math.min(d[f] + 1, c[f + 1] + 1, c[f] + (a[e] != b[f]));
        for (f = 0; f < c.length; f++) c[f] = d[f]
    }
    return d[b.length]
};
goog.asserts = {};
goog.asserts.ENABLE_ASSERTS = goog.DEBUG;
goog.asserts.AssertionError = function(a, b) {
    b.unshift(a);
    goog.debug.Error.call(this, goog.string.subs.apply(null, b));
    b.shift();
    this.messagePattern = a
};
goog.inherits(goog.asserts.AssertionError, goog.debug.Error);
goog.asserts.AssertionError.prototype.name = "AssertionError";
goog.asserts.DEFAULT_ERROR_HANDLER = function(a) {
    throw a;
};
goog.asserts.errorHandler_ = goog.asserts.DEFAULT_ERROR_HANDLER;
goog.asserts.doAssertFailure_ = function(a, b, c, d) {
    var e = "Assertion failed";
    if (c) var e = e + (": " + c),
        f = d;
    else a && (e += ": " + a, f = b);
    a = new goog.asserts.AssertionError("" + e, f || []);
    goog.asserts.errorHandler_(a)
};
goog.asserts.setErrorHandler = function(a) {
    goog.asserts.ENABLE_ASSERTS && (goog.asserts.errorHandler_ = a)
};
goog.asserts.assert = function(a, b, c) {
    goog.asserts.ENABLE_ASSERTS && !a && goog.asserts.doAssertFailure_("", null, b, Array.prototype.slice.call(arguments, 2));
    return a
};
goog.asserts.fail = function(a, b) {
    goog.asserts.ENABLE_ASSERTS && goog.asserts.errorHandler_(new goog.asserts.AssertionError("Failure" + (a ? ": " + a : ""), Array.prototype.slice.call(arguments, 1)))
};
goog.asserts.assertNumber = function(a, b, c) {
    goog.asserts.ENABLE_ASSERTS && !goog.isNumber(a) && goog.asserts.doAssertFailure_("Expected number but got %s: %s.", [goog.typeOf(a), a], b, Array.prototype.slice.call(arguments, 2));
    return a
};
goog.asserts.assertString = function(a, b, c) {
    goog.asserts.ENABLE_ASSERTS && !goog.isString(a) && goog.asserts.doAssertFailure_("Expected string but got %s: %s.", [goog.typeOf(a), a], b, Array.prototype.slice.call(arguments, 2));
    return a
};
goog.asserts.assertFunction = function(a, b, c) {
    goog.asserts.ENABLE_ASSERTS && !goog.isFunction(a) && goog.asserts.doAssertFailure_("Expected function but got %s: %s.", [goog.typeOf(a), a], b, Array.prototype.slice.call(arguments, 2));
    return a
};
goog.asserts.assertObject = function(a, b, c) {
    goog.asserts.ENABLE_ASSERTS && !goog.isObject(a) && goog.asserts.doAssertFailure_("Expected object but got %s: %s.", [goog.typeOf(a), a], b, Array.prototype.slice.call(arguments, 2));
    return a
};
goog.asserts.assertArray = function(a, b, c) {
    goog.asserts.ENABLE_ASSERTS && !goog.isArray(a) && goog.asserts.doAssertFailure_("Expected array but got %s: %s.", [goog.typeOf(a), a], b, Array.prototype.slice.call(arguments, 2));
    return a
};
goog.asserts.assertBoolean = function(a, b, c) {
    goog.asserts.ENABLE_ASSERTS && !goog.isBoolean(a) && goog.asserts.doAssertFailure_("Expected boolean but got %s: %s.", [goog.typeOf(a), a], b, Array.prototype.slice.call(arguments, 2));
    return a
};
goog.asserts.assertElement = function(a, b, c) {
    !goog.asserts.ENABLE_ASSERTS || goog.isObject(a) && a.nodeType == goog.dom.NodeType.ELEMENT || goog.asserts.doAssertFailure_("Expected Element but got %s: %s.", [goog.typeOf(a), a], b, Array.prototype.slice.call(arguments, 2));
    return a
};
goog.asserts.assertInstanceof = function(a, b, c, d) {
    !goog.asserts.ENABLE_ASSERTS || a instanceof b || goog.asserts.doAssertFailure_("Expected instanceof %s but got %s.", [goog.asserts.getType_(b), goog.asserts.getType_(a)], c, Array.prototype.slice.call(arguments, 3));
    return a
};
goog.asserts.assertObjectPrototypeIsIntact = function() {
    for (var a in Object.prototype) goog.asserts.fail(a + " should not be enumerable in Object.prototype.")
};
goog.asserts.getType_ = function(a) {
    return a instanceof Function ? a.displayName || a.name || "unknown type name" : a instanceof Object ? a.constructor.displayName || a.constructor.name || Object.prototype.toString.call(a) : null === a ? "null" : typeof a
};
goog.array = {};
goog.NATIVE_ARRAY_PROTOTYPES = goog.TRUSTED_SITE;
goog.array.ASSUME_NATIVE_FUNCTIONS = !1;
goog.array.peek = function(a) {
    return a[a.length - 1]
};
goog.array.last = goog.array.peek;
goog.array.indexOf = goog.NATIVE_ARRAY_PROTOTYPES && (goog.array.ASSUME_NATIVE_FUNCTIONS || Array.prototype.indexOf) ? function(a, b, c) {
    goog.asserts.assert(null != a.length);
    return Array.prototype.indexOf.call(a, b, c)
} : function(a, b, c) {
    c = null == c ? 0 : 0 > c ? Math.max(0, a.length + c) : c;
    if (goog.isString(a)) return goog.isString(b) && 1 == b.length ? a.indexOf(b, c) : -1;
    for (; c < a.length; c++)
        if (c in a && a[c] === b) return c;
    return -1
};
goog.array.lastIndexOf = goog.NATIVE_ARRAY_PROTOTYPES && (goog.array.ASSUME_NATIVE_FUNCTIONS || Array.prototype.lastIndexOf) ? function(a, b, c) {
    goog.asserts.assert(null != a.length);
    return Array.prototype.lastIndexOf.call(a, b, null == c ? a.length - 1 : c)
} : function(a, b, c) {
    c = null == c ? a.length - 1 : c;
    0 > c && (c = Math.max(0, a.length + c));
    if (goog.isString(a)) return goog.isString(b) && 1 == b.length ? a.lastIndexOf(b, c) : -1;
    for (; 0 <= c; c--)
        if (c in a && a[c] === b) return c;
    return -1
};
goog.array.forEach = goog.NATIVE_ARRAY_PROTOTYPES && (goog.array.ASSUME_NATIVE_FUNCTIONS || Array.prototype.forEach) ? function(a, b, c) {
    goog.asserts.assert(null != a.length);
    Array.prototype.forEach.call(a, b, c)
} : function(a, b, c) {
    for (var d = a.length, e = goog.isString(a) ? a.split("") : a, f = 0; f < d; f++) f in e && b.call(c, e[f], f, a)
};
goog.array.forEachRight = function(a, b, c) {
    for (var d = a.length, e = goog.isString(a) ? a.split("") : a, d = d - 1; 0 <= d; --d) d in e && b.call(c, e[d], d, a)
};
goog.array.filter = goog.NATIVE_ARRAY_PROTOTYPES && (goog.array.ASSUME_NATIVE_FUNCTIONS || Array.prototype.filter) ? function(a, b, c) {
    goog.asserts.assert(null != a.length);
    return Array.prototype.filter.call(a, b, c)
} : function(a, b, c) {
    for (var d = a.length, e = [], f = 0, g = goog.isString(a) ? a.split("") : a, h = 0; h < d; h++)
        if (h in g) {
            var k = g[h];
            b.call(c, k, h, a) && (e[f++] = k)
        } return e
};
goog.array.map = goog.NATIVE_ARRAY_PROTOTYPES && (goog.array.ASSUME_NATIVE_FUNCTIONS || Array.prototype.map) ? function(a, b, c) {
    goog.asserts.assert(null != a.length);
    return Array.prototype.map.call(a, b, c)
} : function(a, b, c) {
    for (var d = a.length, e = Array(d), f = goog.isString(a) ? a.split("") : a, g = 0; g < d; g++) g in f && (e[g] = b.call(c, f[g], g, a));
    return e
};
goog.array.reduce = goog.NATIVE_ARRAY_PROTOTYPES && (goog.array.ASSUME_NATIVE_FUNCTIONS || Array.prototype.reduce) ? function(a, b, c, d) {
    goog.asserts.assert(null != a.length);
    d && (b = goog.bind(b, d));
    return Array.prototype.reduce.call(a, b, c)
} : function(a, b, c, d) {
    var e = c;
    goog.array.forEach(a, function(c, g) {
        e = b.call(d, e, c, g, a)
    });
    return e
};
goog.array.reduceRight = goog.NATIVE_ARRAY_PROTOTYPES && (goog.array.ASSUME_NATIVE_FUNCTIONS || Array.prototype.reduceRight) ? function(a, b, c, d) {
    goog.asserts.assert(null != a.length);
    goog.asserts.assert(null != b);
    d && (b = goog.bind(b, d));
    return Array.prototype.reduceRight.call(a, b, c)
} : function(a, b, c, d) {
    var e = c;
    goog.array.forEachRight(a, function(c, g) {
        e = b.call(d, e, c, g, a)
    });
    return e
};
goog.array.some = goog.NATIVE_ARRAY_PROTOTYPES && (goog.array.ASSUME_NATIVE_FUNCTIONS || Array.prototype.some) ? function(a, b, c) {
    goog.asserts.assert(null != a.length);
    return Array.prototype.some.call(a, b, c)
} : function(a, b, c) {
    for (var d = a.length, e = goog.isString(a) ? a.split("") : a, f = 0; f < d; f++)
        if (f in e && b.call(c, e[f], f, a)) return !0;
    return !1
};
goog.array.every = goog.NATIVE_ARRAY_PROTOTYPES && (goog.array.ASSUME_NATIVE_FUNCTIONS || Array.prototype.every) ? function(a, b, c) {
    goog.asserts.assert(null != a.length);
    return Array.prototype.every.call(a, b, c)
} : function(a, b, c) {
    for (var d = a.length, e = goog.isString(a) ? a.split("") : a, f = 0; f < d; f++)
        if (f in e && !b.call(c, e[f], f, a)) return !1;
    return !0
};
goog.array.count = function(a, b, c) {
    var d = 0;
    goog.array.forEach(a, function(a, f, g) {
        b.call(c, a, f, g) && ++d
    }, c);
    return d
};
goog.array.find = function(a, b, c) {
    b = goog.array.findIndex(a, b, c);
    return 0 > b ? null : goog.isString(a) ? a.charAt(b) : a[b]
};
goog.array.findIndex = function(a, b, c) {
    for (var d = a.length, e = goog.isString(a) ? a.split("") : a, f = 0; f < d; f++)
        if (f in e && b.call(c, e[f], f, a)) return f;
    return -1
};
goog.array.findRight = function(a, b, c) {
    b = goog.array.findIndexRight(a, b, c);
    return 0 > b ? null : goog.isString(a) ? a.charAt(b) : a[b]
};
goog.array.findIndexRight = function(a, b, c) {
    for (var d = a.length, e = goog.isString(a) ? a.split("") : a, d = d - 1; 0 <= d; d--)
        if (d in e && b.call(c, e[d], d, a)) return d;
    return -1
};
goog.array.contains = function(a, b) {
    return 0 <= goog.array.indexOf(a, b)
};
goog.array.isEmpty = function(a) {
    return 0 == a.length
};
goog.array.clear = function(a) {
    if (!goog.isArray(a))
        for (var b = a.length - 1; 0 <= b; b--) delete a[b];
    a.length = 0
};
goog.array.insert = function(a, b) {
    goog.array.contains(a, b) || a.push(b)
};
goog.array.insertAt = function(a, b, c) {
    goog.array.splice(a, c, 0, b)
};
goog.array.insertArrayAt = function(a, b, c) {
    goog.partial(goog.array.splice, a, c, 0).apply(null, b)
};
goog.array.insertBefore = function(a, b, c) {
    var d;
    2 == arguments.length || 0 > (d = goog.array.indexOf(a, c)) ? a.push(b) : goog.array.insertAt(a, b, d)
};
goog.array.remove = function(a, b) {
    var c = goog.array.indexOf(a, b),
        d;
    (d = 0 <= c) && goog.array.removeAt(a, c);
    return d
};
goog.array.removeAt = function(a, b) {
    goog.asserts.assert(null != a.length);
    return 1 == Array.prototype.splice.call(a, b, 1).length
};
goog.array.removeIf = function(a, b, c) {
    b = goog.array.findIndex(a, b, c);
    return 0 <= b ? (goog.array.removeAt(a, b), !0) : !1
};
goog.array.removeAllIf = function(a, b, c) {
    var d = 0;
    goog.array.forEachRight(a, function(e, f) {
        b.call(c, e, f, a) && goog.array.removeAt(a, f) && d++
    });
    return d
};
goog.array.concat = function(a) {
    return Array.prototype.concat.apply(Array.prototype, arguments)
};
goog.array.join = function(a) {
    return Array.prototype.concat.apply(Array.prototype, arguments)
};
goog.array.toArray = function(a) {
    var b = a.length;
    if (0 < b) {
        for (var c = Array(b), d = 0; d < b; d++) c[d] = a[d];
        return c
    }
    return []
};
goog.array.clone = goog.array.toArray;
goog.array.extend = function(a, b) {
    for (var c = 1; c < arguments.length; c++) {
        var d = arguments[c];
        if (goog.isArrayLike(d)) {
            var e = a.length || 0,
                f = d.length || 0;
            a.length = e + f;
            for (var g = 0; g < f; g++) a[e + g] = d[g]
        } else a.push(d)
    }
};
goog.array.splice = function(a, b, c, d) {
    goog.asserts.assert(null != a.length);
    return Array.prototype.splice.apply(a, goog.array.slice(arguments, 1))
};
goog.array.slice = function(a, b, c) {
    goog.asserts.assert(null != a.length);
    return 2 >= arguments.length ? Array.prototype.slice.call(a, b) : Array.prototype.slice.call(a, b, c)
};
goog.array.removeDuplicates = function(a, b, c) {
    b = b || a;
    var d = function(a) {
        return goog.isObject(a) ? "o" + goog.getUid(a) : (typeof a).charAt(0) + a
    };
    c = c || d;
    for (var d = {}, e = 0, f = 0; f < a.length;) {
        var g = a[f++],
            h = c(g);
        Object.prototype.hasOwnProperty.call(d, h) || (d[h] = !0, b[e++] = g)
    }
    b.length = e
};
goog.array.binarySearch = function(a, b, c) {
    return goog.array.binarySearch_(a, c || goog.array.defaultCompare, !1, b)
};
goog.array.binarySelect = function(a, b, c) {
    return goog.array.binarySearch_(a, b, !0, void 0, c)
};
goog.array.binarySearch_ = function(a, b, c, d, e) {
    for (var f = 0, g = a.length, h; f < g;) {
        var k = f + g >> 1,
            l;
        l = c ? b.call(e, a[k], k, a) : b(d, a[k]);
        0 < l ? f = k + 1 : (g = k, h = !l)
    }
    return h ? f : ~f
};
goog.array.sort = function(a, b) {
    a.sort(b || goog.array.defaultCompare)
};
goog.array.stableSort = function(a, b) {
    for (var c = 0; c < a.length; c++) a[c] = {
        index: c,
        value: a[c]
    };
    var d = b || goog.array.defaultCompare;
    goog.array.sort(a, function(a, b) {
        return d(a.value, b.value) || a.index - b.index
    });
    for (c = 0; c < a.length; c++) a[c] = a[c].value
};
goog.array.sortByKey = function(a, b, c) {
    var d = c || goog.array.defaultCompare;
    goog.array.sort(a, function(a, c) {
        return d(b(a), b(c))
    })
};
goog.array.sortObjectsByKey = function(a, b, c) {
    goog.array.sortByKey(a, function(a) {
        return a[b]
    }, c)
};
goog.array.isSorted = function(a, b, c) {
    b = b || goog.array.defaultCompare;
    for (var d = 1; d < a.length; d++) {
        var e = b(a[d - 1], a[d]);
        if (0 < e || 0 == e && c) return !1
    }
    return !0
};
goog.array.equals = function(a, b, c) {
    if (!goog.isArrayLike(a) || !goog.isArrayLike(b) || a.length != b.length) return !1;
    var d = a.length;
    c = c || goog.array.defaultCompareEquality;
    for (var e = 0; e < d; e++)
        if (!c(a[e], b[e])) return !1;
    return !0
};
goog.array.compare3 = function(a, b, c) {
    c = c || goog.array.defaultCompare;
    for (var d = Math.min(a.length, b.length), e = 0; e < d; e++) {
        var f = c(a[e], b[e]);
        if (0 != f) return f
    }
    return goog.array.defaultCompare(a.length, b.length)
};
goog.array.defaultCompare = function(a, b) {
    return a > b ? 1 : a < b ? -1 : 0
};
goog.array.inverseDefaultCompare = function(a, b) {
    return -goog.array.defaultCompare(a, b)
};
goog.array.defaultCompareEquality = function(a, b) {
    return a === b
};
goog.array.binaryInsert = function(a, b, c) {
    c = goog.array.binarySearch(a, b, c);
    return 0 > c ? (goog.array.insertAt(a, b, -(c + 1)), !0) : !1
};
goog.array.binaryRemove = function(a, b, c) {
    b = goog.array.binarySearch(a, b, c);
    return 0 <= b ? goog.array.removeAt(a, b) : !1
};
goog.array.bucket = function(a, b, c) {
    for (var d = {}, e = 0; e < a.length; e++) {
        var f = a[e],
            g = b.call(c, f, e, a);
        goog.isDef(g) && (d[g] || (d[g] = [])).push(f)
    }
    return d
};
goog.array.toObject = function(a, b, c) {
    var d = {};
    goog.array.forEach(a, function(e, f) {
        d[b.call(c, e, f, a)] = e
    });
    return d
};
goog.array.range = function(a, b, c) {
    var d = [],
        e = 0,
        f = a;
    c = c || 1;
    void 0 !== b && (e = a, f = b);
    if (0 > c * (f - e)) return [];
    if (0 < c)
        for (a = e; a < f; a += c) d.push(a);
    else
        for (a = e; a > f; a += c) d.push(a);
    return d
};
goog.array.repeat = function(a, b) {
    for (var c = [], d = 0; d < b; d++) c[d] = a;
    return c
};
goog.array.flatten = function(a) {
    for (var b = [], c = 0; c < arguments.length; c++) {
        var d = arguments[c];
        if (goog.isArray(d))
            for (var e = 0; e < d.length; e += 8192)
                for (var f = goog.array.slice(d, e, e + 8192), f = goog.array.flatten.apply(null, f), g = 0; g < f.length; g++) b.push(f[g]);
        else b.push(d)
    }
    return b
};
goog.array.rotate = function(a, b) {
    goog.asserts.assert(null != a.length);
    a.length && (b %= a.length, 0 < b ? Array.prototype.unshift.apply(a, a.splice(-b, b)) : 0 > b && Array.prototype.push.apply(a, a.splice(0, -b)));
    return a
};
goog.array.moveItem = function(a, b, c) {
    goog.asserts.assert(0 <= b && b < a.length);
    goog.asserts.assert(0 <= c && c < a.length);
    b = Array.prototype.splice.call(a, b, 1);
    Array.prototype.splice.call(a, c, 0, b[0])
};
goog.array.zip = function(a) {
    if (!arguments.length) return [];
    for (var b = [], c = arguments[0].length, d = 1; d < arguments.length; d++) arguments[d].length < c && (c = arguments[d].length);
    for (d = 0; d < c; d++) {
        for (var e = [], f = 0; f < arguments.length; f++) e.push(arguments[f][d]);
        b.push(e)
    }
    return b
};
goog.array.shuffle = function(a, b) {
    for (var c = b || Math.random, d = a.length - 1; 0 < d; d--) {
        var e = Math.floor(c() * (d + 1)),
            f = a[d];
        a[d] = a[e];
        a[e] = f
    }
};
goog.array.copyByIndex = function(a, b) {
    var c = [];
    goog.array.forEach(b, function(b) {
        c.push(a[b])
    });
    return c
};
/*

 Copyright 2016 Google Inc. All rights reserved.
 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

   http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.

 @author lwe@google.com (Lukas Weichselbaum)
*/
var csp = {
    Finding: function(a, b, c, d, e) {
        this.type = a;
        this.description = b;
        this.severity = c;
        this.directive = d;
        this.value = e
    }
};
csp.Finding.Severity = {
    HIGH: 10,
    SYNTAX: 20,
    MEDIUM: 30,
    HIGH_MAYBE: 40,
    STRICT_CSP: 45,
    MEDIUM_MAYBE: 50,
    INFO: 60,
    NONE: 100
};
csp.Finding.Type = {
    MISSING_SEMICOLON: 100,
    UNKNOWN_DIRECTIVE: 101,
    INVALID_KEYWORD: 102,
    MISSING_DIRECTIVES: 300,
    SCRIPT_UNSAFE_INLINE: 301,
    SCRIPT_UNSAFE_EVAL: 302,
    PLAIN_URL_SCHEMES: 303,
    PLAIN_WILDCARD: 304,
    SCRIPT_WHITELIST_BYPASS: 305,
    OBJECT_WHITELIST_BYPASS: 306,
    NONCE_LENGTH: 307,
    IP_SOURCE: 308,
    DEPRECATED_DIRECTIVE: 309,
    SRC_HTTP: 310,
    STRICT_DYNAMIC: 400,
    STRICT_DYNAMIC_NOT_STANDALONE: 401,
    NONCE_HASH: 402,
    UNSAFE_INLINE_FALLBACK: 403,
    WHITELIST_FALLBACK: 404,
    IGNORED: 405
};
csp.Finding.getHighestSeverity = function(a) {
    if (goog.array.isEmpty(a)) return csp.Finding.Severity.NONE;
    a = goog.array.map(a, function(a) {
        return a.severity
    });
    return goog.array.reduce(a, function(a, c) {
        return a < c ? a : c
    }, csp.Finding.Severity.NONE)
};
goog.string.StringBuffer = function(a, b) {
    null != a && this.append.apply(this, arguments)
};
goog.string.StringBuffer.prototype.buffer_ = "";
goog.string.StringBuffer.prototype.set = function(a) {
    this.buffer_ = "" + a
};
goog.string.StringBuffer.prototype.append = function(a, b, c) {
    this.buffer_ += a;
    if (null != b)
        for (var d = 1; d < arguments.length; d++) this.buffer_ += arguments[d];
    return this
};
goog.string.StringBuffer.prototype.clear = function() {
    this.buffer_ = ""
};
goog.string.StringBuffer.prototype.getLength = function() {
    return this.buffer_.length
};
goog.string.StringBuffer.prototype.toString = function() {
    return this.buffer_
};
goog.object = {};
goog.object.forEach = function(a, b, c) {
    for (var d in a) b.call(c, a[d], d, a)
};
goog.object.filter = function(a, b, c) {
    var d = {},
        e;
    for (e in a) b.call(c, a[e], e, a) && (d[e] = a[e]);
    return d
};
goog.object.map = function(a, b, c) {
    var d = {},
        e;
    for (e in a) d[e] = b.call(c, a[e], e, a);
    return d
};
goog.object.some = function(a, b, c) {
    for (var d in a)
        if (b.call(c, a[d], d, a)) return !0;
    return !1
};
goog.object.every = function(a, b, c) {
    for (var d in a)
        if (!b.call(c, a[d], d, a)) return !1;
    return !0
};
goog.object.getCount = function(a) {
    var b = 0,
        c;
    for (c in a) b++;
    return b
};
goog.object.getAnyKey = function(a) {
    for (var b in a) return b
};
goog.object.getAnyValue = function(a) {
    for (var b in a) return a[b]
};
goog.object.contains = function(a, b) {
    return goog.object.containsValue(a, b)
};
goog.object.getValues = function(a) {
    var b = [],
        c = 0,
        d;
    for (d in a) b[c++] = a[d];
    return b
};
goog.object.getKeys = function(a) {
    var b = [],
        c = 0,
        d;
    for (d in a) b[c++] = d;
    return b
};
goog.object.getValueByKeys = function(a, b) {
    for (var c = goog.isArrayLike(b), d = c ? b : arguments, c = c ? 0 : 1; c < d.length && (a = a[d[c]], goog.isDef(a)); c++);
    return a
};
goog.object.containsKey = function(a, b) {
    return null !== a && b in a
};
goog.object.containsValue = function(a, b) {
    for (var c in a)
        if (a[c] == b) return !0;
    return !1
};
goog.object.findKey = function(a, b, c) {
    for (var d in a)
        if (b.call(c, a[d], d, a)) return d
};
goog.object.findValue = function(a, b, c) {
    return (b = goog.object.findKey(a, b, c)) && a[b]
};
goog.object.isEmpty = function(a) {
    for (var b in a) return !1;
    return !0
};
goog.object.clear = function(a) {
    for (var b in a) delete a[b]
};
goog.object.remove = function(a, b) {
    var c;
    (c = b in a) && delete a[b];
    return c
};
goog.object.add = function(a, b, c) {
    if (null !== a && b in a) throw Error('The object already contains the key "' + b + '"');
    goog.object.set(a, b, c)
};
goog.object.get = function(a, b, c) {
    return null !== a && b in a ? a[b] : c
};
goog.object.set = function(a, b, c) {
    a[b] = c
};
goog.object.setIfUndefined = function(a, b, c) {
    return b in a ? a[b] : a[b] = c
};
goog.object.setWithReturnValueIfNotSet = function(a, b, c) {
    if (b in a) return a[b];
    c = c();
    return a[b] = c
};
goog.object.equals = function(a, b) {
    for (var c in a)
        if (!(c in b) || a[c] !== b[c]) return !1;
    for (c in b)
        if (!(c in a)) return !1;
    return !0
};
goog.object.clone = function(a) {
    var b = {},
        c;
    for (c in a) b[c] = a[c];
    return b
};
goog.object.unsafeClone = function(a) {
    var b = goog.typeOf(a);
    if ("object" == b || "array" == b) {
        if (goog.isFunction(a.clone)) return a.clone();
        var b = "array" == b ? [] : {},
            c;
        for (c in a) b[c] = goog.object.unsafeClone(a[c]);
        return b
    }
    return a
};
goog.object.transpose = function(a) {
    var b = {},
        c;
    for (c in a) b[a[c]] = c;
    return b
};
goog.object.PROTOTYPE_FIELDS_ = "constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");
goog.object.extend = function(a, b) {
    for (var c, d, e = 1; e < arguments.length; e++) {
        d = arguments[e];
        for (c in d) a[c] = d[c];
        for (var f = 0; f < goog.object.PROTOTYPE_FIELDS_.length; f++) c = goog.object.PROTOTYPE_FIELDS_[f], Object.prototype.hasOwnProperty.call(d, c) && (a[c] = d[c])
    }
};
goog.object.create = function(a) {
    var b = arguments.length;
    if (1 == b && goog.isArray(arguments[0])) return goog.object.create.apply(null, arguments[0]);
    if (b % 2) throw Error("Uneven number of arguments");
    for (var c = {}, d = 0; d < b; d += 2) c[arguments[d]] = arguments[d + 1];
    return c
};
goog.object.createSet = function(a) {
    var b = arguments.length;
    if (1 == b && goog.isArray(arguments[0])) return goog.object.createSet.apply(null, arguments[0]);
    for (var c = {}, d = 0; d < b; d++) c[arguments[d]] = !0;
    return c
};
goog.object.createImmutableView = function(a) {
    var b = a;
    Object.isFrozen && !Object.isFrozen(a) && (b = Object.create(a), Object.freeze(b));
    return b
};
goog.object.isImmutableView = function(a) {
    return !!Object.isFrozen && Object.isFrozen(a)
};
/*

 Copyright 2016 Google Inc. All rights reserved.
 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

   http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.

 @fileoverview CSP definitions and helper functions.
 @author lwe@google.com (Lukas Weichselbaum)
*/
csp.Csp = function() {};
csp.Csp.clone = function(a) {
    for (var b = new csp.Csp, c = $jscomp.makeIterator(Object.keys(a)), d = c.next(); !d.done; d = c.next()) d = d.value, b[d] = goog.array.clone(a[d]);
    return b
};
csp.Csp.convertToString = function(a) {
    for (var b = new goog.string.StringBuffer, c = $jscomp.makeIterator(Object.keys(a)), d = c.next(); !d.done; d = c.next()) {
        d = d.value;
        b.append(d);
        for (var d = a[d], e, f = 0; e = d[f]; f++) b.append(" " + e);
        b.append("; ")
    }
    return b.toString()
};
csp.Csp.getEffectiveCsp = function(a, b, c) {
    c = c || [];
    var d = csp.Csp.clone(a),
        e = csp.Csp.getEffectiveDirective(a, csp.Directive.SCRIPT_SRC),
        f = a[e] || [];
    if (d[e] && (csp.Csp.policyHasScriptNonces(d) || csp.Csp.policyHasScriptHashes(d)))
        if (b >= csp.Version.CSP2) goog.array.contains(f, csp.Keyword.UNSAFE_INLINE) && (goog.array.remove(d[e], csp.Keyword.UNSAFE_INLINE), c.push(new csp.Finding(csp.Finding.Type.IGNORED, "unsafe-inline is ignored if a nonce or a hash is present. (CSP2 and above)", csp.Finding.Severity.NONE, e, csp.Keyword.UNSAFE_INLINE)));
        else
            for (var g = $jscomp.makeIterator(f), h = g.next(); !h.done; h = g.next()) h = h.value, (h.startsWith("'nonce-") || h.startsWith("'sha")) && goog.array.remove(d[e], h);
    if (d[e] && csp.Csp.policyHasStrictDynamic(a))
        if (b >= csp.Version.CSP3)
            for (a = $jscomp.makeIterator(f), h = a.next(); !h.done; h = a.next()) f = h.value, f.startsWith("'") && f != csp.Keyword.SELF && f != csp.Keyword.UNSAFE_INLINE || (goog.array.remove(d[e], f), c.push(new csp.Finding(csp.Finding.Type.IGNORED, "Because of strict-dynamic this entry is ignored in CSP3 and above",
                csp.Finding.Severity.NONE, e, f)));
        else goog.array.remove(d[e], csp.Keyword.STRICT_DYNAMIC);
    b < csp.Version.CSP3 && (goog.object.remove(d, csp.Directive.REPORT_TO), goog.object.remove(d, csp.Directive.WORKER_SRC), goog.object.remove(d, csp.Directive.MANIFEST_SRC));
    return d
};
csp.Csp.getEffectiveDirective = function(a, b) {
    return b in a ? b : csp.Directive.DEFAULT_SRC
};
csp.Csp.getEffectiveDirectives = function(a, b) {
    var c = new Set(goog.array.map(b, function(b) {
        return csp.Csp.getEffectiveDirective(a, b)
    }));
    return [].concat($jscomp.arrayFromIterable(c))
};
csp.Csp.policyHasScriptNonces = function(a) {
    var b = csp.Csp.getEffectiveDirective(a, csp.Directive.SCRIPT_SRC);
    return goog.array.some(a[b] || [], function(a) {
        return csp.isNonce(a)
    })
};
csp.Csp.policyHasScriptHashes = function(a) {
    var b = csp.Csp.getEffectiveDirective(a, csp.Directive.SCRIPT_SRC);
    return goog.array.some(a[b] || [], function(a) {
        return csp.isHash(a)
    })
};
csp.Csp.policyHasStrictDynamic = function(a) {
    var b = csp.Csp.getEffectiveDirective(a, csp.Directive.SCRIPT_SRC);
    return goog.array.contains(a[b] || [], csp.Keyword.STRICT_DYNAMIC)
};
csp.Keyword = {
    SELF: "'self'",
    NONE: "'none'",
    UNSAFE_INLINE: "'unsafe-inline'",
    UNSAFE_EVAL: "'unsafe-eval'",
    STRICT_DYNAMIC: "'strict-dynamic'"
};
csp.Directive = {
    CHILD_SRC: "child-src",
    CONNECT_SRC: "connect-src",
    DEFAULT_SRC: "default-src",
    FONT_SRC: "font-src",
    FRAME_SRC: "frame-src",
    IMG_SRC: "img-src",
    MEDIA_SRC: "media-src",
    OBJECT_SRC: "object-src",
    SCRIPT_SRC: "script-src",
    STYLE_SRC: "style-src",
    MANIFEST_SRC: "manifest-src",
    WORKER_SRC: "worker-src",
    BASE_URI: "base-uri",
    PLUGIN_TYPES: "plugin-types",
    SANDBOX: "sandbox",
    FORM_ACTION: "form-action",
    FRAME_ANCESTORS: "frame-ancestors",
    REPORT_TO: "report-to",
    REPORT_URI: "report-uri",
    BLOCK_ALL_MIXED_CONTENT: "block-all-mixed-content",
    UPGRADE_INSECURE_REQUESTS: "upgrade-insecure-requests",
    REFLECTED_XSS: "reflected-xss",
    REFERRER: "referrer"
};
csp.Version = {
    CSP1: 1,
    CSP2: 2,
    CSP3: 3
};
csp.isDirective = function(a) {
    return goog.object.contains(csp.Directive, a)
};
csp.isKeyword = function(a) {
    return goog.object.contains(csp.Keyword, a)
};
csp.isUrlScheme = function(a) {
    return /^[a-zA-Z][+a-zA-Z0-9.-]*:$/.test(a)
};
csp.STRICT_NONCE_PATTERN = /^'nonce-[a-zA-Z0-9+/]+[=]{0,2}'$/;
csp.NONCE_PATTERN = /^'nonce-(.+)'$/;
csp.isNonce = function(a, b) {
    return (b ? csp.STRICT_NONCE_PATTERN : csp.NONCE_PATTERN).test(a)
};
csp.STRICT_HASH_PATTERN = /^'(sha256|sha384|sha512)-[a-zA-Z0-9+/]+[=]{0,2}'$/;
csp.HASH_PATTERN = /^'(sha256|sha384|sha512)-(.+)'$/;
csp.isHash = function(a, b) {
    return (b ? csp.STRICT_HASH_PATTERN : csp.HASH_PATTERN).test(a)
};
csp.CspError = function(a) {
    goog.debug.Error.call(this, a)
};
goog.inherits(csp.CspError, goog.debug.Error);
/*

 Copyright 2016 Google Inc. All rights reserved.
 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

   http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.

 @fileoverview Collection of CSP parser checks which can be used to find
 common syntax mistakes like missing semicolons, invalid directives or
 invalid keywords.
 @author lwe@google.com (Lukas Weichselbaum)
*/
csp.parserChecks = {};
csp.parserChecks.checkUnknownDirective = function(a) {
    var b = [];
    a = $jscomp.makeIterator(Object.keys(a));
    for (var c = a.next(); !c.done; c = a.next()) c = c.value, csp.isDirective(c) || (c.endsWith(":") ? b.push(new csp.Finding(csp.Finding.Type.UNKNOWN_DIRECTIVE, "CSP directives don't end with a colon.", csp.Finding.Severity.SYNTAX, c)) : b.push(new csp.Finding(csp.Finding.Type.UNKNOWN_DIRECTIVE, 'Directive "' + c + '" is not a known CSP directive.', csp.Finding.Severity.SYNTAX, c)));
    return b
};
csp.parserChecks.checkMissingSemicolon = function(a) {
    for (var b = [], c = $jscomp.makeIterator(Object.keys(a)), d = c.next(); !d.done; d = c.next())
        for (var d = d.value, e = $jscomp.makeIterator(a[d]), f = e.next(); !f.done; f = e.next()) f = f.value, csp.isDirective(f) && b.push(new csp.Finding(csp.Finding.Type.MISSING_SEMICOLON, 'Did you forget the semicolon? "' + f + '" seems to be a directive, not a value', csp.Finding.Severity.SYNTAX, d, f));
    return b
};
csp.parserChecks.checkInvalidKeyword = function(a) {
    for (var b = [], c = goog.array.map(goog.object.getValues(csp.Keyword), function(a) {
            return a.replace(/'/g, "")
        }), d = $jscomp.makeIterator(Object.keys(a)), e = d.next(); !e.done; e = d.next())
        for (var e = e.value, f = {
                value: void 0
            }, g = $jscomp.makeIterator(a[e]), h = g.next(); !h.done; f = {
                value: f.value
            }, h = g.next()) f.value = h.value, goog.array.some(c, function(a) {
            return function(b) {
                return b == a.value
            }
        }(f)) || f.value.startsWith("nonce-") || f.value.match(/^(sha256|sha384|sha512)-/) ? b.push(new csp.Finding(csp.Finding.Type.INVALID_KEYWORD,
            'Did you forget to surround "' + f.value + '" with single-ticks?', csp.Finding.Severity.SYNTAX, e, f.value)) : f.value.startsWith("'") && (csp.isKeyword(f.value) || csp.isHash(f.value) || csp.isNonce(f.value) || b.push(new csp.Finding(csp.Finding.Type.INVALID_KEYWORD, f.value + " seems to be an invalid CSP keyword.", csp.Finding.Severity.SYNTAX, e, f.value)));
    return b
};
/*

 Copyright 2016 Google Inc. All rights reserved.
 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

   http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.

 @fileoverview Collection of "strict" CSP and backward compatibility checks.
 A "strict" CSP is based on nonces or hashes and drops the whitelist.
 These checks ensure that 'strict-dynamic' and a CSP nonce/hash are present.
 Due to 'strict-dynamic' any whitelist will get dropped in CSP3.
 The backward compatibility checks ensure that the strict nonce/hash based CSP
 will be a no-op in older browsers by checking for presence of 'unsafe-inline'
 (will be dropped in newer browsers if a nonce or hash is present) and for
 prsensence of http: and https: url schemes (will be droped in the presence of
 'strict-dynamic' in newer browsers).

 @author lwe@google.com (Lukas Weichselbaum)
*/
csp.strictcspChecks = {};
csp.strictcspChecks.checkStrictDynamic = function(a) {
    var b = csp.Csp.getEffectiveDirective(a, csp.Directive.SCRIPT_SRC);
    a = a[b] || [];
    return goog.array.some(a, function(a) {
        return !a.startsWith("'")
    }) && !goog.array.contains(a, csp.Keyword.STRICT_DYNAMIC) ? [new csp.Finding(csp.Finding.Type.STRICT_DYNAMIC, "Host whitelists can frequently be bypassed. Consider using 'strict-dynamic' in combination with CSP nonces or hashes.", csp.Finding.Severity.STRICT_CSP, b)] : []
};
csp.strictcspChecks.checkStrictDynamicNotStandalone = function(a) {
    var b = csp.Csp.getEffectiveDirective(a, csp.Directive.SCRIPT_SRC);
    return !goog.array.contains(a[b] || [], csp.Keyword.STRICT_DYNAMIC) || csp.Csp.policyHasScriptNonces(a) || csp.Csp.policyHasScriptHashes(a) ? [] : [new csp.Finding(csp.Finding.Type.STRICT_DYNAMIC_NOT_STANDALONE, "'strict-dynamic' without a CSP nonce/hash will block all scripts.", csp.Finding.Severity.INFO, b)]
};
csp.strictcspChecks.checkUnsafeInlineFallback = function(a) {
    if (!csp.Csp.policyHasScriptNonces(a) && !csp.Csp.policyHasScriptHashes(a)) return [];
    var b = csp.Csp.getEffectiveDirective(a, csp.Directive.SCRIPT_SRC);
    return goog.array.contains(a[b] || [], csp.Keyword.UNSAFE_INLINE) ? [] : [new csp.Finding(csp.Finding.Type.UNSAFE_INLINE_FALLBACK, "Consider adding 'unsafe-inline' (ignored by browsers supporting nonces/hashes) to be backward compatible with older browsers.", csp.Finding.Severity.STRICT_CSP, b)]
};
csp.strictcspChecks.checkWhitelistFallback = function(a) {
    var b = csp.Csp.getEffectiveDirective(a, csp.Directive.SCRIPT_SRC);
    a = a[b] || [];
    return goog.array.contains(a, csp.Keyword.STRICT_DYNAMIC) ? goog.array.some(a, function(a) {
        return goog.array.contains(["http:", "https:", "*"], a) || goog.string.contains(a, ".")
    }) ? [] : [new csp.Finding(csp.Finding.Type.WHITELIST_FALLBACK, "Consider adding https: and http: url schemes (ignored by browsers supporting 'strict-dynamic') to be backward compatible with older browsers.",
        csp.Finding.Severity.STRICT_CSP, b)] : []
};
goog.i18n = {};
goog.i18n.bidi = {};
goog.i18n.bidi.FORCE_RTL = !1;
goog.i18n.bidi.IS_RTL = goog.i18n.bidi.FORCE_RTL || ("ar" == goog.LOCALE.substring(0, 2).toLowerCase() || "fa" == goog.LOCALE.substring(0, 2).toLowerCase() || "he" == goog.LOCALE.substring(0, 2).toLowerCase() || "iw" == goog.LOCALE.substring(0, 2).toLowerCase() || "ps" == goog.LOCALE.substring(0, 2).toLowerCase() || "sd" == goog.LOCALE.substring(0, 2).toLowerCase() || "ug" == goog.LOCALE.substring(0, 2).toLowerCase() || "ur" == goog.LOCALE.substring(0, 2).toLowerCase() || "yi" == goog.LOCALE.substring(0, 2).toLowerCase()) && (2 == goog.LOCALE.length ||
    "-" == goog.LOCALE.substring(2, 3) || "_" == goog.LOCALE.substring(2, 3)) || 3 <= goog.LOCALE.length && "ckb" == goog.LOCALE.substring(0, 3).toLowerCase() && (3 == goog.LOCALE.length || "-" == goog.LOCALE.substring(3, 4) || "_" == goog.LOCALE.substring(3, 4));
goog.i18n.bidi.Format = {
    LRE: "\u202a",
    RLE: "\u202b",
    PDF: "\u202c",
    LRM: "\u200e",
    RLM: "\u200f"
};
goog.i18n.bidi.Dir = {
    LTR: 1,
    RTL: -1,
    NEUTRAL: 0
};
goog.i18n.bidi.RIGHT = "right";
goog.i18n.bidi.LEFT = "left";
goog.i18n.bidi.I18N_RIGHT = goog.i18n.bidi.IS_RTL ? goog.i18n.bidi.LEFT : goog.i18n.bidi.RIGHT;
goog.i18n.bidi.I18N_LEFT = goog.i18n.bidi.IS_RTL ? goog.i18n.bidi.RIGHT : goog.i18n.bidi.LEFT;
goog.i18n.bidi.toDir = function(a, b) {
    return "number" == typeof a ? 0 < a ? goog.i18n.bidi.Dir.LTR : 0 > a ? goog.i18n.bidi.Dir.RTL : b ? null : goog.i18n.bidi.Dir.NEUTRAL : null == a ? null : a ? goog.i18n.bidi.Dir.RTL : goog.i18n.bidi.Dir.LTR
};
goog.i18n.bidi.ltrChars_ = "A-Za-z\u00c0-\u00d6\u00d8-\u00f6\u00f8-\u02b8\u0300-\u0590\u0800-\u1fff\u200e\u2c00-\ufb1c\ufe00-\ufe6f\ufefd-\uffff";
goog.i18n.bidi.rtlChars_ = "\u0591-\u06ef\u06fa-\u07ff\u200f\ufb1d-\ufdff\ufe70-\ufefc";
goog.i18n.bidi.htmlSkipReg_ = /<[^>]*>|&[^;]+;/g;
goog.i18n.bidi.stripHtmlIfNeeded_ = function(a, b) {
    return b ? a.replace(goog.i18n.bidi.htmlSkipReg_, "") : a
};
goog.i18n.bidi.rtlCharReg_ = new RegExp("[" + goog.i18n.bidi.rtlChars_ + "]");
goog.i18n.bidi.ltrCharReg_ = new RegExp("[" + goog.i18n.bidi.ltrChars_ + "]");
goog.i18n.bidi.hasAnyRtl = function(a, b) {
    return goog.i18n.bidi.rtlCharReg_.test(goog.i18n.bidi.stripHtmlIfNeeded_(a, b))
};
goog.i18n.bidi.hasRtlChar = goog.i18n.bidi.hasAnyRtl;
goog.i18n.bidi.hasAnyLtr = function(a, b) {
    return goog.i18n.bidi.ltrCharReg_.test(goog.i18n.bidi.stripHtmlIfNeeded_(a, b))
};
goog.i18n.bidi.ltrRe_ = new RegExp("^[" + goog.i18n.bidi.ltrChars_ + "]");
goog.i18n.bidi.rtlRe_ = new RegExp("^[" + goog.i18n.bidi.rtlChars_ + "]");
goog.i18n.bidi.isRtlChar = function(a) {
    return goog.i18n.bidi.rtlRe_.test(a)
};
goog.i18n.bidi.isLtrChar = function(a) {
    return goog.i18n.bidi.ltrRe_.test(a)
};
goog.i18n.bidi.isNeutralChar = function(a) {
    return !goog.i18n.bidi.isLtrChar(a) && !goog.i18n.bidi.isRtlChar(a)
};
goog.i18n.bidi.ltrDirCheckRe_ = new RegExp("^[^" + goog.i18n.bidi.rtlChars_ + "]*[" + goog.i18n.bidi.ltrChars_ + "]");
goog.i18n.bidi.rtlDirCheckRe_ = new RegExp("^[^" + goog.i18n.bidi.ltrChars_ + "]*[" + goog.i18n.bidi.rtlChars_ + "]");
goog.i18n.bidi.startsWithRtl = function(a, b) {
    return goog.i18n.bidi.rtlDirCheckRe_.test(goog.i18n.bidi.stripHtmlIfNeeded_(a, b))
};
goog.i18n.bidi.isRtlText = goog.i18n.bidi.startsWithRtl;
goog.i18n.bidi.startsWithLtr = function(a, b) {
    return goog.i18n.bidi.ltrDirCheckRe_.test(goog.i18n.bidi.stripHtmlIfNeeded_(a, b))
};
goog.i18n.bidi.isLtrText = goog.i18n.bidi.startsWithLtr;
goog.i18n.bidi.isRequiredLtrRe_ = /^http:\/\/.*/;
goog.i18n.bidi.isNeutralText = function(a, b) {
    a = goog.i18n.bidi.stripHtmlIfNeeded_(a, b);
    return goog.i18n.bidi.isRequiredLtrRe_.test(a) || !goog.i18n.bidi.hasAnyLtr(a) && !goog.i18n.bidi.hasAnyRtl(a)
};
goog.i18n.bidi.ltrExitDirCheckRe_ = new RegExp("[" + goog.i18n.bidi.ltrChars_ + "][^" + goog.i18n.bidi.rtlChars_ + "]*$");
goog.i18n.bidi.rtlExitDirCheckRe_ = new RegExp("[" + goog.i18n.bidi.rtlChars_ + "][^" + goog.i18n.bidi.ltrChars_ + "]*$");
goog.i18n.bidi.endsWithLtr = function(a, b) {
    return goog.i18n.bidi.ltrExitDirCheckRe_.test(goog.i18n.bidi.stripHtmlIfNeeded_(a, b))
};
goog.i18n.bidi.isLtrExitText = goog.i18n.bidi.endsWithLtr;
goog.i18n.bidi.endsWithRtl = function(a, b) {
    return goog.i18n.bidi.rtlExitDirCheckRe_.test(goog.i18n.bidi.stripHtmlIfNeeded_(a, b))
};
goog.i18n.bidi.isRtlExitText = goog.i18n.bidi.endsWithRtl;
goog.i18n.bidi.rtlLocalesRe_ = /^(ar|ckb|dv|he|iw|fa|nqo|ps|sd|ug|ur|yi|.*[-_](Arab|Hebr|Thaa|Nkoo|Tfng))(?!.*[-_](Latn|Cyrl)($|-|_))($|-|_)/i;
goog.i18n.bidi.isRtlLanguage = function(a) {
    return goog.i18n.bidi.rtlLocalesRe_.test(a)
};
goog.i18n.bidi.bracketGuardHtmlRe_ = /(\(.*?\)+)|(\[.*?\]+)|(\{.*?\}+)|(&lt;.*?(&gt;)+)/g;
goog.i18n.bidi.bracketGuardTextRe_ = /(\(.*?\)+)|(\[.*?\]+)|(\{.*?\}+)|(<.*?>+)/g;
goog.i18n.bidi.guardBracketInHtml = function(a, b) {
    return (void 0 === b ? goog.i18n.bidi.hasAnyRtl(a) : b) ? a.replace(goog.i18n.bidi.bracketGuardHtmlRe_, "<span dir=rtl>$&</span>") : a.replace(goog.i18n.bidi.bracketGuardHtmlRe_, "<span dir=ltr>$&</span>")
};
goog.i18n.bidi.guardBracketInText = function(a, b) {
    var c = (void 0 === b ? goog.i18n.bidi.hasAnyRtl(a) : b) ? goog.i18n.bidi.Format.RLM : goog.i18n.bidi.Format.LRM;
    return a.replace(goog.i18n.bidi.bracketGuardTextRe_, c + "$&" + c)
};
goog.i18n.bidi.enforceRtlInHtml = function(a) {
    return "<" == a.charAt(0) ? a.replace(/<\w+/, "$& dir=rtl") : "\n<span dir=rtl>" + a + "</span>"
};
goog.i18n.bidi.enforceRtlInText = function(a) {
    return goog.i18n.bidi.Format.RLE + a + goog.i18n.bidi.Format.PDF
};
goog.i18n.bidi.enforceLtrInHtml = function(a) {
    return "<" == a.charAt(0) ? a.replace(/<\w+/, "$& dir=ltr") : "\n<span dir=ltr>" + a + "</span>"
};
goog.i18n.bidi.enforceLtrInText = function(a) {
    return goog.i18n.bidi.Format.LRE + a + goog.i18n.bidi.Format.PDF
};
goog.i18n.bidi.dimensionsRe_ = /:\s*([.\d][.\w]*)\s+([.\d][.\w]*)\s+([.\d][.\w]*)\s+([.\d][.\w]*)/g;
goog.i18n.bidi.leftRe_ = /left/gi;
goog.i18n.bidi.rightRe_ = /right/gi;
goog.i18n.bidi.tempRe_ = /%%%%/g;
goog.i18n.bidi.mirrorCSS = function(a) {
    return a.replace(goog.i18n.bidi.dimensionsRe_, ":$1 $4 $3 $2").replace(goog.i18n.bidi.leftRe_, "%%%%").replace(goog.i18n.bidi.rightRe_, goog.i18n.bidi.LEFT).replace(goog.i18n.bidi.tempRe_, goog.i18n.bidi.RIGHT)
};
goog.i18n.bidi.doubleQuoteSubstituteRe_ = /([\u0591-\u05f2])"/g;
goog.i18n.bidi.singleQuoteSubstituteRe_ = /([\u0591-\u05f2])'/g;
goog.i18n.bidi.normalizeHebrewQuote = function(a) {
    return a.replace(goog.i18n.bidi.doubleQuoteSubstituteRe_, "$1\u05f4").replace(goog.i18n.bidi.singleQuoteSubstituteRe_, "$1\u05f3")
};
goog.i18n.bidi.wordSeparatorRe_ = /\s+/;
goog.i18n.bidi.hasNumeralsRe_ = /[\d\u06f0-\u06f9]/;
goog.i18n.bidi.rtlDetectionThreshold_ = .4;
goog.i18n.bidi.estimateDirection = function(a, b) {
    for (var c = 0, d = 0, e = !1, f = goog.i18n.bidi.stripHtmlIfNeeded_(a, b).split(goog.i18n.bidi.wordSeparatorRe_), g = 0; g < f.length; g++) {
        var h = f[g];
        goog.i18n.bidi.startsWithRtl(h) ? (c++, d++) : goog.i18n.bidi.isRequiredLtrRe_.test(h) ? e = !0 : goog.i18n.bidi.hasAnyLtr(h) ? d++ : goog.i18n.bidi.hasNumeralsRe_.test(h) && (e = !0)
    }
    return 0 == d ? e ? goog.i18n.bidi.Dir.LTR : goog.i18n.bidi.Dir.NEUTRAL : c / d > goog.i18n.bidi.rtlDetectionThreshold_ ? goog.i18n.bidi.Dir.RTL : goog.i18n.bidi.Dir.LTR
};
goog.i18n.bidi.detectRtlDirectionality = function(a, b) {
    return goog.i18n.bidi.estimateDirection(a, b) == goog.i18n.bidi.Dir.RTL
};
goog.i18n.bidi.setElementDirAndAlign = function(a, b) {
    a && (b = goog.i18n.bidi.toDir(b)) && (a.style.textAlign = b == goog.i18n.bidi.Dir.RTL ? goog.i18n.bidi.RIGHT : goog.i18n.bidi.LEFT, a.dir = b == goog.i18n.bidi.Dir.RTL ? "rtl" : "ltr")
};
goog.i18n.bidi.setElementDirByTextDirectionality = function(a, b) {
    switch (goog.i18n.bidi.estimateDirection(b)) {
        case goog.i18n.bidi.Dir.LTR:
            a.dir = "ltr";
            break;
        case goog.i18n.bidi.Dir.RTL:
            a.dir = "rtl";
            break;
        default:
            a.removeAttribute("dir")
    }
};
goog.i18n.bidi.DirectionalString = function() {};
goog.fs = {};
goog.fs.url = {};
goog.fs.url.createObjectUrl = function(a) {
    return goog.fs.url.getUrlObject_().createObjectURL(a)
};
goog.fs.url.revokeObjectUrl = function(a) {
    goog.fs.url.getUrlObject_().revokeObjectURL(a)
};
goog.fs.url.getUrlObject_ = function() {
    var a = goog.fs.url.findUrlObject_();
    if (null != a) return a;
    throw Error("This browser doesn't seem to support blob URLs");
};
goog.fs.url.findUrlObject_ = function() {
    return goog.isDef(goog.global.URL) && goog.isDef(goog.global.URL.createObjectURL) ? goog.global.URL : goog.isDef(goog.global.webkitURL) && goog.isDef(goog.global.webkitURL.createObjectURL) ? goog.global.webkitURL : goog.isDef(goog.global.createObjectURL) ? goog.global : null
};
goog.fs.url.browserSupportsObjectUrls = function() {
    return null != goog.fs.url.findUrlObject_()
};
goog.string.TypedString = function() {};
goog.string.Const = function() {
    this.stringConstValueWithSecurityContract__googStringSecurityPrivate_ = "";
    this.STRING_CONST_TYPE_MARKER__GOOG_STRING_SECURITY_PRIVATE_ = goog.string.Const.TYPE_MARKER_
};
goog.string.Const.prototype.implementsGoogStringTypedString = !0;
goog.string.Const.prototype.getTypedStringValue = function() {
    return this.stringConstValueWithSecurityContract__googStringSecurityPrivate_
};
goog.string.Const.prototype.toString = function() {
    return "Const{" + this.stringConstValueWithSecurityContract__googStringSecurityPrivate_ + "}"
};
goog.string.Const.unwrap = function(a) {
    if (a instanceof goog.string.Const && a.constructor === goog.string.Const && a.STRING_CONST_TYPE_MARKER__GOOG_STRING_SECURITY_PRIVATE_ === goog.string.Const.TYPE_MARKER_) return a.stringConstValueWithSecurityContract__googStringSecurityPrivate_;
    goog.asserts.fail("expected object of type Const, got '" + a + "'");
    return "type_error:Const"
};
goog.string.Const.from = function(a) {
    return goog.string.Const.create__googStringSecurityPrivate_(a)
};
goog.string.Const.TYPE_MARKER_ = {};
goog.string.Const.create__googStringSecurityPrivate_ = function(a) {
    var b = new goog.string.Const;
    b.stringConstValueWithSecurityContract__googStringSecurityPrivate_ = a;
    return b
};
goog.html = {};
goog.html.SafeUrl = function() {
    this.privateDoNotAccessOrElseSafeHtmlWrappedValue_ = "";
    this.SAFE_URL_TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_ = goog.html.SafeUrl.TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_
};
goog.html.SafeUrl.INNOCUOUS_STRING = "about:invalid#zClosurez";
goog.html.SafeUrl.prototype.implementsGoogStringTypedString = !0;
goog.html.SafeUrl.prototype.getTypedStringValue = function() {
    return this.privateDoNotAccessOrElseSafeHtmlWrappedValue_
};
goog.html.SafeUrl.prototype.implementsGoogI18nBidiDirectionalString = !0;
goog.html.SafeUrl.prototype.getDirection = function() {
    return goog.i18n.bidi.Dir.LTR
};
goog.DEBUG && (goog.html.SafeUrl.prototype.toString = function() {
    return "SafeUrl{" + this.privateDoNotAccessOrElseSafeHtmlWrappedValue_ + "}"
});
goog.html.SafeUrl.unwrap = function(a) {
    if (a instanceof goog.html.SafeUrl && a.constructor === goog.html.SafeUrl && a.SAFE_URL_TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_ === goog.html.SafeUrl.TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_) return a.privateDoNotAccessOrElseSafeHtmlWrappedValue_;
    goog.asserts.fail("expected object of type SafeUrl, got '" + a + "'");
    return "type_error:SafeUrl"
};
goog.html.SafeUrl.fromConstant = function(a) {
    return goog.html.SafeUrl.createSafeUrlSecurityPrivateDoNotAccessOrElse(goog.string.Const.unwrap(a))
};
goog.html.SAFE_MIME_TYPE_PATTERN_ = /^(?:image\/(?:bmp|gif|jpeg|jpg|png|tiff|webp)|video\/(?:mpeg|mp4|ogg|webm))$/i;
goog.html.SafeUrl.fromBlob = function(a) {
    a = goog.html.SAFE_MIME_TYPE_PATTERN_.test(a.type) ? goog.fs.url.createObjectUrl(a) : goog.html.SafeUrl.INNOCUOUS_STRING;
    return goog.html.SafeUrl.createSafeUrlSecurityPrivateDoNotAccessOrElse(a)
};
goog.html.DATA_URL_PATTERN_ = /^data:([^;,]*);base64,[a-z0-9+\/]+=*$/i;
goog.html.SafeUrl.fromDataUrl = function(a) {
    var b = a.match(goog.html.DATA_URL_PATTERN_),
        b = b && goog.html.SAFE_MIME_TYPE_PATTERN_.test(b[1]);
    return goog.html.SafeUrl.createSafeUrlSecurityPrivateDoNotAccessOrElse(b ? a : goog.html.SafeUrl.INNOCUOUS_STRING)
};
goog.html.SAFE_URL_PATTERN_ = /^(?:(?:https?|mailto|ftp):|[^&:/?#]*(?:[/?#]|$))/i;
goog.html.SafeUrl.sanitize = function(a) {
    if (a instanceof goog.html.SafeUrl) return a;
    a = a.implementsGoogStringTypedString ? a.getTypedStringValue() : String(a);
    goog.html.SAFE_URL_PATTERN_.test(a) || (a = goog.html.SafeUrl.INNOCUOUS_STRING);
    return goog.html.SafeUrl.createSafeUrlSecurityPrivateDoNotAccessOrElse(a)
};
goog.html.SafeUrl.TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_ = {};
goog.html.SafeUrl.createSafeUrlSecurityPrivateDoNotAccessOrElse = function(a) {
    var b = new goog.html.SafeUrl;
    b.privateDoNotAccessOrElseSafeHtmlWrappedValue_ = a;
    return b
};
goog.dom.TagName = {
    A: "A",
    ABBR: "ABBR",
    ACRONYM: "ACRONYM",
    ADDRESS: "ADDRESS",
    APPLET: "APPLET",
    AREA: "AREA",
    ARTICLE: "ARTICLE",
    ASIDE: "ASIDE",
    AUDIO: "AUDIO",
    B: "B",
    BASE: "BASE",
    BASEFONT: "BASEFONT",
    BDI: "BDI",
    BDO: "BDO",
    BIG: "BIG",
    BLOCKQUOTE: "BLOCKQUOTE",
    BODY: "BODY",
    BR: "BR",
    BUTTON: "BUTTON",
    CANVAS: "CANVAS",
    CAPTION: "CAPTION",
    CENTER: "CENTER",
    CITE: "CITE",
    CODE: "CODE",
    COL: "COL",
    COLGROUP: "COLGROUP",
    COMMAND: "COMMAND",
    DATA: "DATA",
    DATALIST: "DATALIST",
    DD: "DD",
    DEL: "DEL",
    DETAILS: "DETAILS",
    DFN: "DFN",
    DIALOG: "DIALOG",
    DIR: "DIR",
    DIV: "DIV",
    DL: "DL",
    DT: "DT",
    EM: "EM",
    EMBED: "EMBED",
    FIELDSET: "FIELDSET",
    FIGCAPTION: "FIGCAPTION",
    FIGURE: "FIGURE",
    FONT: "FONT",
    FOOTER: "FOOTER",
    FORM: "FORM",
    FRAME: "FRAME",
    FRAMESET: "FRAMESET",
    H1: "H1",
    H2: "H2",
    H3: "H3",
    H4: "H4",
    H5: "H5",
    H6: "H6",
    HEAD: "HEAD",
    HEADER: "HEADER",
    HGROUP: "HGROUP",
    HR: "HR",
    HTML: "HTML",
    I: "I",
    IFRAME: "IFRAME",
    IMG: "IMG",
    INPUT: "INPUT",
    INS: "INS",
    ISINDEX: "ISINDEX",
    KBD: "KBD",
    KEYGEN: "KEYGEN",
    LABEL: "LABEL",
    LEGEND: "LEGEND",
    LI: "LI",
    LINK: "LINK",
    MAP: "MAP",
    MARK: "MARK",
    MATH: "MATH",
    MENU: "MENU",
    META: "META",
    METER: "METER",
    NAV: "NAV",
    NOFRAMES: "NOFRAMES",
    NOSCRIPT: "NOSCRIPT",
    OBJECT: "OBJECT",
    OL: "OL",
    OPTGROUP: "OPTGROUP",
    OPTION: "OPTION",
    OUTPUT: "OUTPUT",
    P: "P",
    PARAM: "PARAM",
    PRE: "PRE",
    PROGRESS: "PROGRESS",
    Q: "Q",
    RP: "RP",
    RT: "RT",
    RUBY: "RUBY",
    S: "S",
    SAMP: "SAMP",
    SCRIPT: "SCRIPT",
    SECTION: "SECTION",
    SELECT: "SELECT",
    SMALL: "SMALL",
    SOURCE: "SOURCE",
    SPAN: "SPAN",
    STRIKE: "STRIKE",
    STRONG: "STRONG",
    STYLE: "STYLE",
    SUB: "SUB",
    SUMMARY: "SUMMARY",
    SUP: "SUP",
    SVG: "SVG",
    TABLE: "TABLE",
    TBODY: "TBODY",
    TD: "TD",
    TEMPLATE: "TEMPLATE",
    TEXTAREA: "TEXTAREA",
    TFOOT: "TFOOT",
    TH: "TH",
    THEAD: "THEAD",
    TIME: "TIME",
    TITLE: "TITLE",
    TR: "TR",
    TRACK: "TRACK",
    TT: "TT",
    U: "U",
    UL: "UL",
    VAR: "VAR",
    VIDEO: "VIDEO",
    WBR: "WBR"
};
goog.html.SafeStyle = function() {
    this.privateDoNotAccessOrElseSafeStyleWrappedValue_ = "";
    this.SAFE_STYLE_TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_ = goog.html.SafeStyle.TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_
};
goog.html.SafeStyle.prototype.implementsGoogStringTypedString = !0;
goog.html.SafeStyle.TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_ = {};
goog.html.SafeStyle.fromConstant = function(a) {
    a = goog.string.Const.unwrap(a);
    if (0 === a.length) return goog.html.SafeStyle.EMPTY;
    goog.html.SafeStyle.checkStyle_(a);
    goog.asserts.assert(goog.string.endsWith(a, ";"), "Last character of style string is not ';': " + a);
    goog.asserts.assert(goog.string.contains(a, ":"), "Style string must contain at least one ':', to specify a \"name: value\" pair: " + a);
    return goog.html.SafeStyle.createSafeStyleSecurityPrivateDoNotAccessOrElse(a)
};
goog.html.SafeStyle.checkStyle_ = function(a) {
    goog.asserts.assert(!/[<>]/.test(a), "Forbidden characters in style string: " + a)
};
goog.html.SafeStyle.prototype.getTypedStringValue = function() {
    return this.privateDoNotAccessOrElseSafeStyleWrappedValue_
};
goog.DEBUG && (goog.html.SafeStyle.prototype.toString = function() {
    return "SafeStyle{" + this.privateDoNotAccessOrElseSafeStyleWrappedValue_ + "}"
});
goog.html.SafeStyle.unwrap = function(a) {
    if (a instanceof goog.html.SafeStyle && a.constructor === goog.html.SafeStyle && a.SAFE_STYLE_TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_ === goog.html.SafeStyle.TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_) return a.privateDoNotAccessOrElseSafeStyleWrappedValue_;
    goog.asserts.fail("expected object of type SafeStyle, got '" + a + "'");
    return "type_error:SafeStyle"
};
goog.html.SafeStyle.createSafeStyleSecurityPrivateDoNotAccessOrElse = function(a) {
    return (new goog.html.SafeStyle).initSecurityPrivateDoNotAccessOrElse_(a)
};
goog.html.SafeStyle.prototype.initSecurityPrivateDoNotAccessOrElse_ = function(a) {
    this.privateDoNotAccessOrElseSafeStyleWrappedValue_ = a;
    return this
};
goog.html.SafeStyle.EMPTY = goog.html.SafeStyle.createSafeStyleSecurityPrivateDoNotAccessOrElse("");
goog.html.SafeStyle.INNOCUOUS_STRING = "zClosurez";
goog.html.SafeStyle.create = function(a) {
    var b = "",
        c;
    for (c in a) {
        if (!/^[-_a-zA-Z0-9]+$/.test(c)) throw Error("Name allows only [-_a-zA-Z0-9], got: " + c);
        var d = a[c];
        null != d && (d instanceof goog.string.Const ? (d = goog.string.Const.unwrap(d), goog.asserts.assert(!/[{;}]/.test(d), "Value does not allow [{;}].")) : goog.html.SafeStyle.VALUE_RE_.test(d) ? goog.html.SafeStyle.hasBalancedQuotes_(d) || (goog.asserts.fail("String value requires balanced quotes, got: " + d), d = goog.html.SafeStyle.INNOCUOUS_STRING) : (goog.asserts.fail("String value allows only [-,.\"'%_!# a-zA-Z0-9], got: " +
            d), d = goog.html.SafeStyle.INNOCUOUS_STRING), b += c + ":" + d + ";")
    }
    if (!b) return goog.html.SafeStyle.EMPTY;
    goog.html.SafeStyle.checkStyle_(b);
    return goog.html.SafeStyle.createSafeStyleSecurityPrivateDoNotAccessOrElse(b)
};
goog.html.SafeStyle.hasBalancedQuotes_ = function(a) {
    for (var b = !0, c = !0, d = 0; d < a.length; d++) {
        var e = a.charAt(d);
        "'" == e && c ? b = !b : '"' == e && b && (c = !c)
    }
    return b && c
};
goog.html.SafeStyle.VALUE_RE_ = /^[-,."'%_!# a-zA-Z0-9]+$/;
goog.html.SafeStyle.concat = function(a) {
    var b = "",
        c = function(a) {
            goog.isArray(a) ? goog.array.forEach(a, c) : b += goog.html.SafeStyle.unwrap(a)
        };
    goog.array.forEach(arguments, c);
    return b ? goog.html.SafeStyle.createSafeStyleSecurityPrivateDoNotAccessOrElse(b) : goog.html.SafeStyle.EMPTY
};
goog.html.SafeStyleSheet = function() {
    this.privateDoNotAccessOrElseSafeStyleSheetWrappedValue_ = "";
    this.SAFE_SCRIPT_TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_ = goog.html.SafeStyleSheet.TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_
};
goog.html.SafeStyleSheet.prototype.implementsGoogStringTypedString = !0;
goog.html.SafeStyleSheet.TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_ = {};
goog.html.SafeStyleSheet.concat = function(a) {
    var b = "",
        c = function(a) {
            goog.isArray(a) ? goog.array.forEach(a, c) : b += goog.html.SafeStyleSheet.unwrap(a)
        };
    goog.array.forEach(arguments, c);
    return goog.html.SafeStyleSheet.createSafeStyleSheetSecurityPrivateDoNotAccessOrElse(b)
};
goog.html.SafeStyleSheet.fromConstant = function(a) {
    a = goog.string.Const.unwrap(a);
    if (0 === a.length) return goog.html.SafeStyleSheet.EMPTY;
    goog.asserts.assert(!goog.string.contains(a, "<"), "Forbidden '<' character in style sheet string: " + a);
    return goog.html.SafeStyleSheet.createSafeStyleSheetSecurityPrivateDoNotAccessOrElse(a)
};
goog.html.SafeStyleSheet.prototype.getTypedStringValue = function() {
    return this.privateDoNotAccessOrElseSafeStyleSheetWrappedValue_
};
goog.DEBUG && (goog.html.SafeStyleSheet.prototype.toString = function() {
    return "SafeStyleSheet{" + this.privateDoNotAccessOrElseSafeStyleSheetWrappedValue_ + "}"
});
goog.html.SafeStyleSheet.unwrap = function(a) {
    if (a instanceof goog.html.SafeStyleSheet && a.constructor === goog.html.SafeStyleSheet && a.SAFE_SCRIPT_TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_ === goog.html.SafeStyleSheet.TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_) return a.privateDoNotAccessOrElseSafeStyleSheetWrappedValue_;
    goog.asserts.fail("expected object of type SafeStyleSheet, got '" + a + "'");
    return "type_error:SafeStyleSheet"
};
goog.html.SafeStyleSheet.createSafeStyleSheetSecurityPrivateDoNotAccessOrElse = function(a) {
    return (new goog.html.SafeStyleSheet).initSecurityPrivateDoNotAccessOrElse_(a)
};
goog.html.SafeStyleSheet.prototype.initSecurityPrivateDoNotAccessOrElse_ = function(a) {
    this.privateDoNotAccessOrElseSafeStyleSheetWrappedValue_ = a;
    return this
};
goog.html.SafeStyleSheet.EMPTY = goog.html.SafeStyleSheet.createSafeStyleSheetSecurityPrivateDoNotAccessOrElse("");
goog.html.TrustedResourceUrl = function() {
    this.privateDoNotAccessOrElseTrustedResourceUrlWrappedValue_ = "";
    this.TRUSTED_RESOURCE_URL_TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_ = goog.html.TrustedResourceUrl.TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_
};
goog.html.TrustedResourceUrl.prototype.implementsGoogStringTypedString = !0;
goog.html.TrustedResourceUrl.prototype.getTypedStringValue = function() {
    return this.privateDoNotAccessOrElseTrustedResourceUrlWrappedValue_
};
goog.html.TrustedResourceUrl.prototype.implementsGoogI18nBidiDirectionalString = !0;
goog.html.TrustedResourceUrl.prototype.getDirection = function() {
    return goog.i18n.bidi.Dir.LTR
};
goog.DEBUG && (goog.html.TrustedResourceUrl.prototype.toString = function() {
    return "TrustedResourceUrl{" + this.privateDoNotAccessOrElseTrustedResourceUrlWrappedValue_ + "}"
});
goog.html.TrustedResourceUrl.unwrap = function(a) {
    if (a instanceof goog.html.TrustedResourceUrl && a.constructor === goog.html.TrustedResourceUrl && a.TRUSTED_RESOURCE_URL_TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_ === goog.html.TrustedResourceUrl.TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_) return a.privateDoNotAccessOrElseTrustedResourceUrlWrappedValue_;
    goog.asserts.fail("expected object of type TrustedResourceUrl, got '" + a + "'");
    return "type_error:TrustedResourceUrl"
};
goog.html.TrustedResourceUrl.fromConstant = function(a) {
    return goog.html.TrustedResourceUrl.createTrustedResourceUrlSecurityPrivateDoNotAccessOrElse(goog.string.Const.unwrap(a))
};
goog.html.TrustedResourceUrl.TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_ = {};
goog.html.TrustedResourceUrl.createTrustedResourceUrlSecurityPrivateDoNotAccessOrElse = function(a) {
    var b = new goog.html.TrustedResourceUrl;
    b.privateDoNotAccessOrElseTrustedResourceUrlWrappedValue_ = a;
    return b
};
goog.dom.tags = {};
goog.dom.tags.VOID_TAGS_ = {
    area: !0,
    base: !0,
    br: !0,
    col: !0,
    command: !0,
    embed: !0,
    hr: !0,
    img: !0,
    input: !0,
    keygen: !0,
    link: !0,
    meta: !0,
    param: !0,
    source: !0,
    track: !0,
    wbr: !0
};
goog.dom.tags.isVoidTag = function(a) {
    return !0 === goog.dom.tags.VOID_TAGS_[a]
};
goog.html.SafeHtml = function() {
    this.privateDoNotAccessOrElseSafeHtmlWrappedValue_ = "";
    this.SAFE_HTML_TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_ = goog.html.SafeHtml.TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_;
    this.dir_ = null
};
goog.html.SafeHtml.prototype.implementsGoogI18nBidiDirectionalString = !0;
goog.html.SafeHtml.prototype.getDirection = function() {
    return this.dir_
};
goog.html.SafeHtml.prototype.implementsGoogStringTypedString = !0;
goog.html.SafeHtml.prototype.getTypedStringValue = function() {
    return this.privateDoNotAccessOrElseSafeHtmlWrappedValue_
};
goog.DEBUG && (goog.html.SafeHtml.prototype.toString = function() {
    return "SafeHtml{" + this.privateDoNotAccessOrElseSafeHtmlWrappedValue_ + "}"
});
goog.html.SafeHtml.unwrap = function(a) {
    if (a instanceof goog.html.SafeHtml && a.constructor === goog.html.SafeHtml && a.SAFE_HTML_TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_ === goog.html.SafeHtml.TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_) return a.privateDoNotAccessOrElseSafeHtmlWrappedValue_;
    goog.asserts.fail("expected object of type SafeHtml, got '" + a + "'");
    return "type_error:SafeHtml"
};
goog.html.SafeHtml.htmlEscape = function(a) {
    if (a instanceof goog.html.SafeHtml) return a;
    var b = null;
    a.implementsGoogI18nBidiDirectionalString && (b = a.getDirection());
    a = a.implementsGoogStringTypedString ? a.getTypedStringValue() : String(a);
    return goog.html.SafeHtml.createSafeHtmlSecurityPrivateDoNotAccessOrElse(goog.string.htmlEscape(a), b)
};
goog.html.SafeHtml.htmlEscapePreservingNewlines = function(a) {
    if (a instanceof goog.html.SafeHtml) return a;
    a = goog.html.SafeHtml.htmlEscape(a);
    return goog.html.SafeHtml.createSafeHtmlSecurityPrivateDoNotAccessOrElse(goog.string.newLineToBr(goog.html.SafeHtml.unwrap(a)), a.getDirection())
};
goog.html.SafeHtml.htmlEscapePreservingNewlinesAndSpaces = function(a) {
    if (a instanceof goog.html.SafeHtml) return a;
    a = goog.html.SafeHtml.htmlEscape(a);
    return goog.html.SafeHtml.createSafeHtmlSecurityPrivateDoNotAccessOrElse(goog.string.whitespaceEscape(goog.html.SafeHtml.unwrap(a)), a.getDirection())
};
goog.html.SafeHtml.from = goog.html.SafeHtml.htmlEscape;
goog.html.SafeHtml.VALID_NAMES_IN_TAG_ = /^[a-zA-Z0-9-]+$/;
goog.html.SafeHtml.URL_ATTRIBUTES_ = {
    action: !0,
    cite: !0,
    data: !0,
    formaction: !0,
    href: !0,
    manifest: !0,
    poster: !0,
    src: !0
};
goog.html.SafeHtml.NOT_ALLOWED_TAG_NAMES_ = goog.object.createSet(goog.dom.TagName.EMBED, goog.dom.TagName.IFRAME, goog.dom.TagName.LINK, goog.dom.TagName.OBJECT, goog.dom.TagName.SCRIPT, goog.dom.TagName.STYLE, goog.dom.TagName.TEMPLATE);
goog.html.SafeHtml.create = function(a, b, c) {
    if (!goog.html.SafeHtml.VALID_NAMES_IN_TAG_.test(a)) throw Error("Invalid tag name <" + a + ">.");
    if (a.toUpperCase() in goog.html.SafeHtml.NOT_ALLOWED_TAG_NAMES_) throw Error("Tag name <" + a + "> is not allowed for SafeHtml.");
    return goog.html.SafeHtml.createSafeHtmlTagSecurityPrivateDoNotAccessOrElse(a, b, c)
};
goog.html.SafeHtml.createIframe = function(a, b, c, d) {
    var e = {};
    e.src = a || null;
    e.srcdoc = b || null;
    a = goog.html.SafeHtml.combineAttributes(e, {
        sandbox: ""
    }, c);
    return goog.html.SafeHtml.createSafeHtmlTagSecurityPrivateDoNotAccessOrElse("iframe", a, d)
};
goog.html.SafeHtml.createStyle = function(a, b) {
    var c = goog.html.SafeHtml.combineAttributes({
            type: "text/css"
        }, {}, b),
        d = "";
    a = goog.array.concat(a);
    for (var e = 0; e < a.length; e++) d += goog.html.SafeStyleSheet.unwrap(a[e]);
    d = goog.html.SafeHtml.createSafeHtmlSecurityPrivateDoNotAccessOrElse(d, goog.i18n.bidi.Dir.NEUTRAL);
    return goog.html.SafeHtml.createSafeHtmlTagSecurityPrivateDoNotAccessOrElse("style", c, d)
};
goog.html.SafeHtml.getAttrNameAndValue_ = function(a, b, c) {
    if (c instanceof goog.string.Const) c = goog.string.Const.unwrap(c);
    else if ("style" == b.toLowerCase()) c = goog.html.SafeHtml.getStyleValue_(c);
    else {
        if (/^on/i.test(b)) throw Error('Attribute "' + b + '" requires goog.string.Const value, "' + c + '" given.');
        if (b.toLowerCase() in goog.html.SafeHtml.URL_ATTRIBUTES_)
            if (c instanceof goog.html.TrustedResourceUrl) c = goog.html.TrustedResourceUrl.unwrap(c);
            else if (c instanceof goog.html.SafeUrl) c = goog.html.SafeUrl.unwrap(c);
        else if (goog.isString(c)) c = goog.html.SafeUrl.sanitize(c).getTypedStringValue();
        else throw Error('Attribute "' + b + '" on tag "' + a + '" requires goog.html.SafeUrl, goog.string.Const, or string, value "' + c + '" given.');
    }
    c.implementsGoogStringTypedString && (c = c.getTypedStringValue());
    goog.asserts.assert(goog.isString(c) || goog.isNumber(c), "String or number value expected, got " + typeof c + " with value: " + c);
    return b + '="' + goog.string.htmlEscape(String(c)) + '"'
};
goog.html.SafeHtml.getStyleValue_ = function(a) {
    if (!goog.isObject(a)) throw Error('The "style" attribute requires goog.html.SafeStyle or map of style properties, ' + typeof a + " given: " + a);
    a instanceof goog.html.SafeStyle || (a = goog.html.SafeStyle.create(a));
    return goog.html.SafeStyle.unwrap(a)
};
goog.html.SafeHtml.createWithDir = function(a, b, c, d) {
    b = goog.html.SafeHtml.create(b, c, d);
    b.dir_ = a;
    return b
};
goog.html.SafeHtml.concat = function(a) {
    var b = goog.i18n.bidi.Dir.NEUTRAL,
        c = "",
        d = function(a) {
            goog.isArray(a) ? goog.array.forEach(a, d) : (a = goog.html.SafeHtml.htmlEscape(a), c += goog.html.SafeHtml.unwrap(a), a = a.getDirection(), b == goog.i18n.bidi.Dir.NEUTRAL ? b = a : a != goog.i18n.bidi.Dir.NEUTRAL && b != a && (b = null))
        };
    goog.array.forEach(arguments, d);
    return goog.html.SafeHtml.createSafeHtmlSecurityPrivateDoNotAccessOrElse(c, b)
};
goog.html.SafeHtml.concatWithDir = function(a, b) {
    var c = goog.html.SafeHtml.concat(goog.array.slice(arguments, 1));
    c.dir_ = a;
    return c
};
goog.html.SafeHtml.TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_ = {};
goog.html.SafeHtml.createSafeHtmlSecurityPrivateDoNotAccessOrElse = function(a, b) {
    return (new goog.html.SafeHtml).initSecurityPrivateDoNotAccessOrElse_(a, b)
};
goog.html.SafeHtml.prototype.initSecurityPrivateDoNotAccessOrElse_ = function(a, b) {
    this.privateDoNotAccessOrElseSafeHtmlWrappedValue_ = a;
    this.dir_ = b;
    return this
};
goog.html.SafeHtml.createSafeHtmlTagSecurityPrivateDoNotAccessOrElse = function(a, b, c) {
    var d = null,
        e = "<" + a;
    if (b)
        for (var f in b) {
            if (!goog.html.SafeHtml.VALID_NAMES_IN_TAG_.test(f)) throw Error('Invalid attribute name "' + f + '".');
            var g = b[f];
            goog.isDefAndNotNull(g) && (e += " " + goog.html.SafeHtml.getAttrNameAndValue_(a, f, g))
        }
    goog.isDefAndNotNull(c) ? goog.isArray(c) || (c = [c]) : c = [];
    goog.dom.tags.isVoidTag(a.toLowerCase()) ? (goog.asserts.assert(!c.length, "Void tag <" + a + "> does not allow content."), e += ">") : (d = goog.html.SafeHtml.concat(c),
        e += ">" + goog.html.SafeHtml.unwrap(d) + "</" + a + ">", d = d.getDirection());
    (a = b && b.dir) && (d = /^(ltr|rtl|auto)$/i.test(a) ? goog.i18n.bidi.Dir.NEUTRAL : null);
    return goog.html.SafeHtml.createSafeHtmlSecurityPrivateDoNotAccessOrElse(e, d)
};
goog.html.SafeHtml.combineAttributes = function(a, b, c) {
    var d = {},
        e;
    for (e in a) goog.asserts.assert(e.toLowerCase() == e, "Must be lower case"), d[e] = a[e];
    for (e in b) goog.asserts.assert(e.toLowerCase() == e, "Must be lower case"), d[e] = b[e];
    for (e in c) {
        var f = e.toLowerCase();
        if (f in a) throw Error('Cannot override "' + f + '" attribute, got "' + e + '" with value "' + c[e] + '"');
        f in b && delete d[f];
        d[e] = c[e]
    }
    return d
};
goog.html.SafeHtml.DOCTYPE_HTML = goog.html.SafeHtml.createSafeHtmlSecurityPrivateDoNotAccessOrElse("<!DOCTYPE html>", goog.i18n.bidi.Dir.NEUTRAL);
goog.html.SafeHtml.EMPTY = goog.html.SafeHtml.createSafeHtmlSecurityPrivateDoNotAccessOrElse("", goog.i18n.bidi.Dir.NEUTRAL);
goog.labs = {};
goog.labs.userAgent = {};
goog.labs.userAgent.util = {};
goog.labs.userAgent.util.getNativeUserAgentString_ = function() {
    var a = goog.labs.userAgent.util.getNavigator_();
    return a && (a = a.userAgent) ? a : ""
};
goog.labs.userAgent.util.getNavigator_ = function() {
    return goog.global.navigator
};
goog.labs.userAgent.util.userAgent_ = goog.labs.userAgent.util.getNativeUserAgentString_();
goog.labs.userAgent.util.setUserAgent = function(a) {
    goog.labs.userAgent.util.userAgent_ = a || goog.labs.userAgent.util.getNativeUserAgentString_()
};
goog.labs.userAgent.util.getUserAgent = function() {
    return goog.labs.userAgent.util.userAgent_
};
goog.labs.userAgent.util.matchUserAgent = function(a) {
    var b = goog.labs.userAgent.util.getUserAgent();
    return goog.string.contains(b, a)
};
goog.labs.userAgent.util.matchUserAgentIgnoreCase = function(a) {
    var b = goog.labs.userAgent.util.getUserAgent();
    return goog.string.caseInsensitiveContains(b, a)
};
goog.labs.userAgent.util.extractVersionTuples = function(a) {
    for (var b = /(\w[\w ]+)\/([^\s]+)\s*(?:\((.*?)\))?/g, c = [], d; d = b.exec(a);) c.push([d[1], d[2], d[3] || void 0]);
    return c
};
goog.labs.userAgent.engine = {};
goog.labs.userAgent.engine.isPresto = function() {
    return goog.labs.userAgent.util.matchUserAgent("Presto")
};
goog.labs.userAgent.engine.isTrident = function() {
    return goog.labs.userAgent.util.matchUserAgent("Trident") || goog.labs.userAgent.util.matchUserAgent("MSIE")
};
goog.labs.userAgent.engine.isEdge = function() {
    return goog.labs.userAgent.util.matchUserAgent("Edge")
};
goog.labs.userAgent.engine.isWebKit = function() {
    return goog.labs.userAgent.util.matchUserAgentIgnoreCase("WebKit") && !goog.labs.userAgent.engine.isEdge()
};
goog.labs.userAgent.engine.isGecko = function() {
    return goog.labs.userAgent.util.matchUserAgent("Gecko") && !goog.labs.userAgent.engine.isWebKit() && !goog.labs.userAgent.engine.isTrident() && !goog.labs.userAgent.engine.isEdge()
};
goog.labs.userAgent.engine.getVersion = function() {
    var a = goog.labs.userAgent.util.getUserAgent();
    if (a) {
        var a = goog.labs.userAgent.util.extractVersionTuples(a),
            b = goog.labs.userAgent.engine.getEngineTuple_(a);
        if (b) return "Gecko" == b[0] ? goog.labs.userAgent.engine.getVersionForKey_(a, "Firefox") : b[1];
        var a = a[0],
            c;
        if (a && (c = a[2]) && (c = /Trident\/([^\s;]+)/.exec(c))) return c[1]
    }
    return ""
};
goog.labs.userAgent.engine.getEngineTuple_ = function(a) {
    if (!goog.labs.userAgent.engine.isEdge()) return a[1];
    for (var b = 0; b < a.length; b++) {
        var c = a[b];
        if ("Edge" == c[0]) return c
    }
};
goog.labs.userAgent.engine.isVersionOrHigher = function(a) {
    return 0 <= goog.string.compareVersions(goog.labs.userAgent.engine.getVersion(), a)
};
goog.labs.userAgent.engine.getVersionForKey_ = function(a, b) {
    var c = goog.array.find(a, function(a) {
        return b == a[0]
    });
    return c && c[1] || ""
};
goog.labs.userAgent.platform = {};
goog.labs.userAgent.platform.isAndroid = function() {
    return goog.labs.userAgent.util.matchUserAgent("Android")
};
goog.labs.userAgent.platform.isIpod = function() {
    return goog.labs.userAgent.util.matchUserAgent("iPod")
};
goog.labs.userAgent.platform.isIphone = function() {
    return goog.labs.userAgent.util.matchUserAgent("iPhone") && !goog.labs.userAgent.util.matchUserAgent("iPod") && !goog.labs.userAgent.util.matchUserAgent("iPad")
};
goog.labs.userAgent.platform.isIpad = function() {
    return goog.labs.userAgent.util.matchUserAgent("iPad")
};
goog.labs.userAgent.platform.isIos = function() {
    return goog.labs.userAgent.platform.isIphone() || goog.labs.userAgent.platform.isIpad() || goog.labs.userAgent.platform.isIpod()
};
goog.labs.userAgent.platform.isMacintosh = function() {
    return goog.labs.userAgent.util.matchUserAgent("Macintosh")
};
goog.labs.userAgent.platform.isLinux = function() {
    return goog.labs.userAgent.util.matchUserAgent("Linux")
};
goog.labs.userAgent.platform.isWindows = function() {
    return goog.labs.userAgent.util.matchUserAgent("Windows")
};
goog.labs.userAgent.platform.isChromeOS = function() {
    return goog.labs.userAgent.util.matchUserAgent("CrOS")
};
goog.labs.userAgent.platform.getVersion = function() {
    var a = goog.labs.userAgent.util.getUserAgent(),
        b = "";
    goog.labs.userAgent.platform.isWindows() ? (b = /Windows (?:NT|Phone) ([0-9.]+)/, b = (a = b.exec(a)) ? a[1] : "0.0") : goog.labs.userAgent.platform.isIos() ? (b = /(?:iPhone|iPod|iPad|CPU)\s+OS\s+(\S+)/, b = (a = b.exec(a)) && a[1].replace(/_/g, ".")) : goog.labs.userAgent.platform.isMacintosh() ? (b = /Mac OS X ([0-9_.]+)/, b = (a = b.exec(a)) ? a[1].replace(/_/g, ".") : "10") : goog.labs.userAgent.platform.isAndroid() ? (b = /Android\s+([^\);]+)(\)|;)/,
        b = (a = b.exec(a)) && a[1]) : goog.labs.userAgent.platform.isChromeOS() && (b = /(?:CrOS\s+(?:i686|x86_64)\s+([0-9.]+))/, b = (a = b.exec(a)) && a[1]);
    return b || ""
};
goog.labs.userAgent.platform.isVersionOrHigher = function(a) {
    return 0 <= goog.string.compareVersions(goog.labs.userAgent.platform.getVersion(), a)
};
goog.labs.userAgent.browser = {};
goog.labs.userAgent.browser.matchOpera_ = function() {
    return goog.labs.userAgent.util.matchUserAgent("Opera") || goog.labs.userAgent.util.matchUserAgent("OPR")
};
goog.labs.userAgent.browser.matchIE_ = function() {
    return goog.labs.userAgent.util.matchUserAgent("Trident") || goog.labs.userAgent.util.matchUserAgent("MSIE")
};
goog.labs.userAgent.browser.matchEdge_ = function() {
    return goog.labs.userAgent.util.matchUserAgent("Edge")
};
goog.labs.userAgent.browser.matchFirefox_ = function() {
    return goog.labs.userAgent.util.matchUserAgent("Firefox")
};
goog.labs.userAgent.browser.matchSafari_ = function() {
    return goog.labs.userAgent.util.matchUserAgent("Safari") && !(goog.labs.userAgent.browser.matchChrome_() || goog.labs.userAgent.browser.matchCoast_() || goog.labs.userAgent.browser.matchOpera_() || goog.labs.userAgent.browser.matchEdge_() || goog.labs.userAgent.browser.isSilk() || goog.labs.userAgent.util.matchUserAgent("Android"))
};
goog.labs.userAgent.browser.matchCoast_ = function() {
    return goog.labs.userAgent.util.matchUserAgent("Coast")
};
goog.labs.userAgent.browser.matchIosWebview_ = function() {
    return (goog.labs.userAgent.util.matchUserAgent("iPad") || goog.labs.userAgent.util.matchUserAgent("iPhone")) && !goog.labs.userAgent.browser.matchSafari_() && !goog.labs.userAgent.browser.matchChrome_() && !goog.labs.userAgent.browser.matchCoast_() && goog.labs.userAgent.util.matchUserAgent("AppleWebKit")
};
goog.labs.userAgent.browser.matchChrome_ = function() {
    return (goog.labs.userAgent.util.matchUserAgent("Chrome") || goog.labs.userAgent.util.matchUserAgent("CriOS")) && !goog.labs.userAgent.browser.matchOpera_() && !goog.labs.userAgent.browser.matchEdge_()
};
goog.labs.userAgent.browser.matchAndroidBrowser_ = function() {
    return goog.labs.userAgent.util.matchUserAgent("Android") && !(goog.labs.userAgent.browser.isChrome() || goog.labs.userAgent.browser.isFirefox() || goog.labs.userAgent.browser.isOpera() || goog.labs.userAgent.browser.isSilk())
};
goog.labs.userAgent.browser.isOpera = goog.labs.userAgent.browser.matchOpera_;
goog.labs.userAgent.browser.isIE = goog.labs.userAgent.browser.matchIE_;
goog.labs.userAgent.browser.isEdge = goog.labs.userAgent.browser.matchEdge_;
goog.labs.userAgent.browser.isFirefox = goog.labs.userAgent.browser.matchFirefox_;
goog.labs.userAgent.browser.isSafari = goog.labs.userAgent.browser.matchSafari_;
goog.labs.userAgent.browser.isCoast = goog.labs.userAgent.browser.matchCoast_;
goog.labs.userAgent.browser.isIosWebview = goog.labs.userAgent.browser.matchIosWebview_;
goog.labs.userAgent.browser.isChrome = goog.labs.userAgent.browser.matchChrome_;
goog.labs.userAgent.browser.isAndroidBrowser = goog.labs.userAgent.browser.matchAndroidBrowser_;
goog.labs.userAgent.browser.isSilk = function() {
    return goog.labs.userAgent.util.matchUserAgent("Silk")
};
goog.labs.userAgent.browser.getVersion = function() {
    function a(a) {
        a = goog.array.find(a, d);
        return c[a] || ""
    }
    var b = goog.labs.userAgent.util.getUserAgent();
    if (goog.labs.userAgent.browser.isIE()) return goog.labs.userAgent.browser.getIEVersion_(b);
    var b = goog.labs.userAgent.util.extractVersionTuples(b),
        c = {};
    goog.array.forEach(b, function(a) {
        c[a[0]] = a[1]
    });
    var d = goog.partial(goog.object.containsKey, c);
    return goog.labs.userAgent.browser.isOpera() ? a(["Version", "Opera", "OPR"]) : goog.labs.userAgent.browser.isEdge() ?
        a(["Edge"]) : goog.labs.userAgent.browser.isChrome() ? a(["Chrome", "CriOS"]) : (b = b[2]) && b[1] || ""
};
goog.labs.userAgent.browser.isVersionOrHigher = function(a) {
    return 0 <= goog.string.compareVersions(goog.labs.userAgent.browser.getVersion(), a)
};
goog.labs.userAgent.browser.getIEVersion_ = function(a) {
    var b = /rv: *([\d\.]*)/.exec(a);
    if (b && b[1]) return b[1];
    var b = "",
        c = /MSIE +([\d\.]+)/.exec(a);
    if (c && c[1])
        if (a = /Trident\/(\d.\d)/.exec(a), "7.0" == c[1])
            if (a && a[1]) switch (a[1]) {
                case "4.0":
                    b = "8.0";
                    break;
                case "5.0":
                    b = "9.0";
                    break;
                case "6.0":
                    b = "10.0";
                    break;
                case "7.0":
                    b = "11.0"
            } else b = "7.0";
            else b = c[1];
    return b
};
goog.userAgent = {};
goog.userAgent.ASSUME_IE = !1;
goog.userAgent.ASSUME_EDGE = !1;
goog.userAgent.ASSUME_GECKO = !1;
goog.userAgent.ASSUME_WEBKIT = !1;
goog.userAgent.ASSUME_MOBILE_WEBKIT = !1;
goog.userAgent.ASSUME_OPERA = !1;
goog.userAgent.ASSUME_ANY_VERSION = !1;
goog.userAgent.BROWSER_KNOWN_ = goog.userAgent.ASSUME_IE || goog.userAgent.ASSUME_EDGE || goog.userAgent.ASSUME_GECKO || goog.userAgent.ASSUME_MOBILE_WEBKIT || goog.userAgent.ASSUME_WEBKIT || goog.userAgent.ASSUME_OPERA;
goog.userAgent.getUserAgentString = function() {
    return goog.labs.userAgent.util.getUserAgent()
};
goog.userAgent.getNavigator = function() {
    return goog.global.navigator || null
};
goog.userAgent.OPERA = goog.userAgent.BROWSER_KNOWN_ ? goog.userAgent.ASSUME_OPERA : goog.labs.userAgent.browser.isOpera();
goog.userAgent.IE = goog.userAgent.BROWSER_KNOWN_ ? goog.userAgent.ASSUME_IE : goog.labs.userAgent.browser.isIE();
goog.userAgent.EDGE = goog.userAgent.BROWSER_KNOWN_ ? goog.userAgent.ASSUME_EDGE : goog.labs.userAgent.engine.isEdge();
goog.userAgent.EDGE_OR_IE = goog.userAgent.EDGE || goog.userAgent.IE;
goog.userAgent.GECKO = goog.userAgent.BROWSER_KNOWN_ ? goog.userAgent.ASSUME_GECKO : goog.labs.userAgent.engine.isGecko();
goog.userAgent.WEBKIT = goog.userAgent.BROWSER_KNOWN_ ? goog.userAgent.ASSUME_WEBKIT || goog.userAgent.ASSUME_MOBILE_WEBKIT : goog.labs.userAgent.engine.isWebKit();
goog.userAgent.isMobile_ = function() {
    return goog.userAgent.WEBKIT && goog.labs.userAgent.util.matchUserAgent("Mobile")
};
goog.userAgent.MOBILE = goog.userAgent.ASSUME_MOBILE_WEBKIT || goog.userAgent.isMobile_();
goog.userAgent.SAFARI = goog.userAgent.WEBKIT;
goog.userAgent.determinePlatform_ = function() {
    var a = goog.userAgent.getNavigator();
    return a && a.platform || ""
};
goog.userAgent.PLATFORM = goog.userAgent.determinePlatform_();
goog.userAgent.ASSUME_MAC = !1;
goog.userAgent.ASSUME_WINDOWS = !1;
goog.userAgent.ASSUME_LINUX = !1;
goog.userAgent.ASSUME_X11 = !1;
goog.userAgent.ASSUME_ANDROID = !1;
goog.userAgent.ASSUME_IPHONE = !1;
goog.userAgent.ASSUME_IPAD = !1;
goog.userAgent.PLATFORM_KNOWN_ = goog.userAgent.ASSUME_MAC || goog.userAgent.ASSUME_WINDOWS || goog.userAgent.ASSUME_LINUX || goog.userAgent.ASSUME_X11 || goog.userAgent.ASSUME_ANDROID || goog.userAgent.ASSUME_IPHONE || goog.userAgent.ASSUME_IPAD;
goog.userAgent.MAC = goog.userAgent.PLATFORM_KNOWN_ ? goog.userAgent.ASSUME_MAC : goog.labs.userAgent.platform.isMacintosh();
goog.userAgent.WINDOWS = goog.userAgent.PLATFORM_KNOWN_ ? goog.userAgent.ASSUME_WINDOWS : goog.labs.userAgent.platform.isWindows();
goog.userAgent.isLegacyLinux_ = function() {
    return goog.labs.userAgent.platform.isLinux() || goog.labs.userAgent.platform.isChromeOS()
};
goog.userAgent.LINUX = goog.userAgent.PLATFORM_KNOWN_ ? goog.userAgent.ASSUME_LINUX : goog.userAgent.isLegacyLinux_();
goog.userAgent.isX11_ = function() {
    var a = goog.userAgent.getNavigator();
    return !!a && goog.string.contains(a.appVersion || "", "X11")
};
goog.userAgent.X11 = goog.userAgent.PLATFORM_KNOWN_ ? goog.userAgent.ASSUME_X11 : goog.userAgent.isX11_();
goog.userAgent.ANDROID = goog.userAgent.PLATFORM_KNOWN_ ? goog.userAgent.ASSUME_ANDROID : goog.labs.userAgent.platform.isAndroid();
goog.userAgent.IPHONE = goog.userAgent.PLATFORM_KNOWN_ ? goog.userAgent.ASSUME_IPHONE : goog.labs.userAgent.platform.isIphone();
goog.userAgent.IPAD = goog.userAgent.PLATFORM_KNOWN_ ? goog.userAgent.ASSUME_IPAD : goog.labs.userAgent.platform.isIpad();
goog.userAgent.operaVersion_ = function() {
    var a = goog.global.opera.version;
    try {
        return a()
    } catch (b) {
        return a
    }
};
goog.userAgent.determineVersion_ = function() {
    if (goog.userAgent.OPERA && goog.global.opera) return goog.userAgent.operaVersion_();
    var a = "",
        b = goog.userAgent.getVersionRegexResult_();
    b && (a = b ? b[1] : "");
    return goog.userAgent.IE && (b = goog.userAgent.getDocumentMode_(), b > parseFloat(a)) ? String(b) : a
};
goog.userAgent.getVersionRegexResult_ = function() {
    var a = goog.userAgent.getUserAgentString();
    if (goog.userAgent.GECKO) return /rv\:([^\);]+)(\)|;)/.exec(a);
    if (goog.userAgent.EDGE) return /Edge\/([\d\.]+)/.exec(a);
    if (goog.userAgent.IE) return /\b(?:MSIE|rv)[: ]([^\);]+)(\)|;)/.exec(a);
    if (goog.userAgent.WEBKIT) return /WebKit\/(\S+)/.exec(a)
};
goog.userAgent.getDocumentMode_ = function() {
    var a = goog.global.document;
    return a ? a.documentMode : void 0
};
goog.userAgent.VERSION = goog.userAgent.determineVersion_();
goog.userAgent.compare = function(a, b) {
    return goog.string.compareVersions(a, b)
};
goog.userAgent.isVersionOrHigherCache_ = {};
goog.userAgent.isVersionOrHigher = function(a) {
    return goog.userAgent.ASSUME_ANY_VERSION || goog.userAgent.isVersionOrHigherCache_[a] || (goog.userAgent.isVersionOrHigherCache_[a] = 0 <= goog.string.compareVersions(goog.userAgent.VERSION, a))
};
goog.userAgent.isVersion = goog.userAgent.isVersionOrHigher;
goog.userAgent.isDocumentModeOrHigher = function(a) {
    return goog.userAgent.DOCUMENT_MODE >= a
};
goog.userAgent.isDocumentMode = goog.userAgent.isDocumentModeOrHigher;
goog.userAgent.DOCUMENT_MODE = function() {
    var a = goog.global.document,
        b = goog.userAgent.getDocumentMode_();
    return a && goog.userAgent.IE ? b || ("CSS1Compat" == a.compatMode ? parseInt(goog.userAgent.VERSION, 10) : 5) : void 0
}();
goog.html.SafeScript = function() {
    this.privateDoNotAccessOrElseSafeScriptWrappedValue_ = "";
    this.SAFE_SCRIPT_TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_ = goog.html.SafeScript.TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_
};
goog.html.SafeScript.prototype.implementsGoogStringTypedString = !0;
goog.html.SafeScript.TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_ = {};
goog.html.SafeScript.fromConstant = function(a) {
    a = goog.string.Const.unwrap(a);
    return 0 === a.length ? goog.html.SafeScript.EMPTY : goog.html.SafeScript.createSafeScriptSecurityPrivateDoNotAccessOrElse(a)
};
goog.html.SafeScript.prototype.getTypedStringValue = function() {
    return this.privateDoNotAccessOrElseSafeScriptWrappedValue_
};
goog.DEBUG && (goog.html.SafeScript.prototype.toString = function() {
    return "SafeScript{" + this.privateDoNotAccessOrElseSafeScriptWrappedValue_ + "}"
});
goog.html.SafeScript.unwrap = function(a) {
    if (a instanceof goog.html.SafeScript && a.constructor === goog.html.SafeScript && a.SAFE_SCRIPT_TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_ === goog.html.SafeScript.TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_) return a.privateDoNotAccessOrElseSafeScriptWrappedValue_;
    goog.asserts.fail("expected object of type SafeScript, got '" + a + "'");
    return "type_error:SafeScript"
};
goog.html.SafeScript.createSafeScriptSecurityPrivateDoNotAccessOrElse = function(a) {
    return (new goog.html.SafeScript).initSecurityPrivateDoNotAccessOrElse_(a)
};
goog.html.SafeScript.prototype.initSecurityPrivateDoNotAccessOrElse_ = function(a) {
    this.privateDoNotAccessOrElseSafeScriptWrappedValue_ = a;
    return this
};
goog.html.SafeScript.EMPTY = goog.html.SafeScript.createSafeScriptSecurityPrivateDoNotAccessOrElse("");
goog.html.uncheckedconversions = {};
goog.html.uncheckedconversions.safeHtmlFromStringKnownToSatisfyTypeContract = function(a, b, c) {
    goog.asserts.assertString(goog.string.Const.unwrap(a), "must provide justification");
    goog.asserts.assert(!goog.string.isEmptyOrWhitespace(goog.string.Const.unwrap(a)), "must provide non-empty justification");
    return goog.html.SafeHtml.createSafeHtmlSecurityPrivateDoNotAccessOrElse(b, c || null)
};
goog.html.uncheckedconversions.safeScriptFromStringKnownToSatisfyTypeContract = function(a, b) {
    goog.asserts.assertString(goog.string.Const.unwrap(a), "must provide justification");
    goog.asserts.assert(!goog.string.isEmpty(goog.string.Const.unwrap(a)), "must provide non-empty justification");
    return goog.html.SafeScript.createSafeScriptSecurityPrivateDoNotAccessOrElse(b)
};
goog.html.uncheckedconversions.safeStyleFromStringKnownToSatisfyTypeContract = function(a, b) {
    goog.asserts.assertString(goog.string.Const.unwrap(a), "must provide justification");
    goog.asserts.assert(!goog.string.isEmptyOrWhitespace(goog.string.Const.unwrap(a)), "must provide non-empty justification");
    return goog.html.SafeStyle.createSafeStyleSecurityPrivateDoNotAccessOrElse(b)
};
goog.html.uncheckedconversions.safeStyleSheetFromStringKnownToSatisfyTypeContract = function(a, b) {
    goog.asserts.assertString(goog.string.Const.unwrap(a), "must provide justification");
    goog.asserts.assert(!goog.string.isEmptyOrWhitespace(goog.string.Const.unwrap(a)), "must provide non-empty justification");
    return goog.html.SafeStyleSheet.createSafeStyleSheetSecurityPrivateDoNotAccessOrElse(b)
};
goog.html.uncheckedconversions.safeUrlFromStringKnownToSatisfyTypeContract = function(a, b) {
    goog.asserts.assertString(goog.string.Const.unwrap(a), "must provide justification");
    goog.asserts.assert(!goog.string.isEmptyOrWhitespace(goog.string.Const.unwrap(a)), "must provide non-empty justification");
    return goog.html.SafeUrl.createSafeUrlSecurityPrivateDoNotAccessOrElse(b)
};
goog.html.uncheckedconversions.trustedResourceUrlFromStringKnownToSatisfyTypeContract = function(a, b) {
    goog.asserts.assertString(goog.string.Const.unwrap(a), "must provide justification");
    goog.asserts.assert(!goog.string.isEmptyOrWhitespace(goog.string.Const.unwrap(a)), "must provide non-empty justification");
    return goog.html.TrustedResourceUrl.createTrustedResourceUrlSecurityPrivateDoNotAccessOrElse(b)
};
goog.structs = {};
goog.structs.Collection = function() {};
goog.functions = {};
goog.functions.constant = function(a) {
    return function() {
        return a
    }
};
goog.functions.FALSE = goog.functions.constant(!1);
goog.functions.TRUE = goog.functions.constant(!0);
goog.functions.NULL = goog.functions.constant(null);
goog.functions.identity = function(a, b) {
    return a
};
goog.functions.error = function(a) {
    return function() {
        throw Error(a);
    }
};
goog.functions.fail = function(a) {
    return function() {
        throw a;
    }
};
goog.functions.lock = function(a, b) {
    b = b || 0;
    return function() {
        return a.apply(this, Array.prototype.slice.call(arguments, 0, b))
    }
};
goog.functions.nth = function(a) {
    return function() {
        return arguments[a]
    }
};
goog.functions.withReturnValue = function(a, b) {
    return goog.functions.sequence(a, goog.functions.constant(b))
};
goog.functions.equalTo = function(a, b) {
    return function(c) {
        return b ? a == c : a === c
    }
};
goog.functions.compose = function(a, b) {
    var c = arguments,
        d = c.length;
    return function() {
        var a;
        d && (a = c[d - 1].apply(this, arguments));
        for (var b = d - 2; 0 <= b; b--) a = c[b].call(this, a);
        return a
    }
};
goog.functions.sequence = function(a) {
    var b = arguments,
        c = b.length;
    return function() {
        for (var a, e = 0; e < c; e++) a = b[e].apply(this, arguments);
        return a
    }
};
goog.functions.and = function(a) {
    var b = arguments,
        c = b.length;
    return function() {
        for (var a = 0; a < c; a++)
            if (!b[a].apply(this, arguments)) return !1;
        return !0
    }
};
goog.functions.or = function(a) {
    var b = arguments,
        c = b.length;
    return function() {
        for (var a = 0; a < c; a++)
            if (b[a].apply(this, arguments)) return !0;
        return !1
    }
};
goog.functions.not = function(a) {
    return function() {
        return !a.apply(this, arguments)
    }
};
goog.functions.create = function(a, b) {
    var c = function() {};
    c.prototype = a.prototype;
    c = new c;
    a.apply(c, Array.prototype.slice.call(arguments, 1));
    return c
};
goog.functions.CACHE_RETURN_VALUE = !0;
goog.functions.cacheReturnValue = function(a) {
    var b = !1,
        c;
    return function() {
        if (!goog.functions.CACHE_RETURN_VALUE) return a();
        b || (c = a(), b = !0);
        return c
    }
};
goog.functions.once = function(a) {
    var b = a;
    return function() {
        if (b) {
            var a = b;
            b = null;
            a()
        }
    }
};
goog.functions.debounce = function(a, b, c) {
    c && (a = goog.bind(a, c));
    var d = null;
    return function(c) {
        goog.global.clearTimeout(d);
        var f = arguments;
        d = goog.global.setTimeout(function() {
            a.apply(null, f)
        }, b)
    }
};
goog.functions.throttle = function(a, b, c) {
    c && (a = goog.bind(a, c));
    var d = null,
        e = !1,
        f = [],
        g = function() {
            d = null;
            e && (e = !1, h())
        },
        h = function() {
            d = goog.global.setTimeout(g, b);
            a.apply(null, f)
        };
    return function(a) {
        f = arguments;
        d ? e = !0 : h()
    }
};
goog.math = {};
goog.math.randomInt = function(a) {
    return Math.floor(Math.random() * a)
};
goog.math.uniformRandom = function(a, b) {
    return a + Math.random() * (b - a)
};
goog.math.clamp = function(a, b, c) {
    return Math.min(Math.max(a, b), c)
};
goog.math.modulo = function(a, b) {
    var c = a % b;
    return 0 > c * b ? c + b : c
};
goog.math.lerp = function(a, b, c) {
    return a + c * (b - a)
};
goog.math.nearlyEquals = function(a, b, c) {
    return Math.abs(a - b) <= (c || 1E-6)
};
goog.math.standardAngle = function(a) {
    return goog.math.modulo(a, 360)
};
goog.math.standardAngleInRadians = function(a) {
    return goog.math.modulo(a, 2 * Math.PI)
};
goog.math.toRadians = function(a) {
    return a * Math.PI / 180
};
goog.math.toDegrees = function(a) {
    return 180 * a / Math.PI
};
goog.math.angleDx = function(a, b) {
    return b * Math.cos(goog.math.toRadians(a))
};
goog.math.angleDy = function(a, b) {
    return b * Math.sin(goog.math.toRadians(a))
};
goog.math.angle = function(a, b, c, d) {
    return goog.math.standardAngle(goog.math.toDegrees(Math.atan2(d - b, c - a)))
};
goog.math.angleDifference = function(a, b) {
    var c = goog.math.standardAngle(b) - goog.math.standardAngle(a);
    180 < c ? c -= 360 : -180 >= c && (c = 360 + c);
    return c
};
goog.math.sign = Math.sign || function(a) {
    return 0 < a ? 1 : 0 > a ? -1 : a
};
goog.math.longestCommonSubsequence = function(a, b, c, d) {
    c = c || function(a, b) {
        return a == b
    };
    d = d || function(b, c) {
        return a[b]
    };
    for (var e = a.length, f = b.length, g = [], h = 0; h < e + 1; h++) g[h] = [], g[h][0] = 0;
    for (var k = 0; k < f + 1; k++) g[0][k] = 0;
    for (h = 1; h <= e; h++)
        for (k = 1; k <= f; k++) c(a[h - 1], b[k - 1]) ? g[h][k] = g[h - 1][k - 1] + 1 : g[h][k] = Math.max(g[h - 1][k], g[h][k - 1]);
    for (var l = [], h = e, k = f; 0 < h && 0 < k;) c(a[h - 1], b[k - 1]) ? (l.unshift(d(h - 1, k - 1)), h--, k--) : g[h - 1][k] > g[h][k - 1] ? h-- : k--;
    return l
};
goog.math.sum = function(a) {
    return goog.array.reduce(arguments, function(a, c) {
        return a + c
    }, 0)
};
goog.math.average = function(a) {
    return goog.math.sum.apply(null, arguments) / arguments.length
};
goog.math.sampleVariance = function(a) {
    var b = arguments.length;
    if (2 > b) return 0;
    var c = goog.math.average.apply(null, arguments);
    return goog.math.sum.apply(null, goog.array.map(arguments, function(a) {
        return Math.pow(a - c, 2)
    })) / (b - 1)
};
goog.math.standardDeviation = function(a) {
    return Math.sqrt(goog.math.sampleVariance.apply(null, arguments))
};
goog.math.isInt = function(a) {
    return isFinite(a) && 0 == a % 1
};
goog.math.isFiniteNumber = function(a) {
    return isFinite(a) && !isNaN(a)
};
goog.math.isNegativeZero = function(a) {
    return 0 == a && 0 > 1 / a
};
goog.math.log10Floor = function(a) {
    if (0 < a) {
        var b = Math.round(Math.log(a) * Math.LOG10E);
        return b - (parseFloat("1e" + b) > a ? 1 : 0)
    }
    return 0 == a ? -Infinity : NaN
};
goog.math.safeFloor = function(a, b) {
    goog.asserts.assert(!goog.isDef(b) || 0 < b);
    return Math.floor(a + (b || 2E-15))
};
goog.math.safeCeil = function(a, b) {
    goog.asserts.assert(!goog.isDef(b) || 0 < b);
    return Math.ceil(a - (b || 2E-15))
};
goog.iter = {};
goog.iter.StopIteration = "StopIteration" in goog.global ? goog.global.StopIteration : {
    message: "StopIteration",
    stack: ""
};
goog.iter.Iterator = function() {};
goog.iter.Iterator.prototype.next = function() {
    throw goog.iter.StopIteration;
};
goog.iter.Iterator.prototype.__iterator__ = function(a) {
    return this
};
goog.iter.toIterator = function(a) {
    if (a instanceof goog.iter.Iterator) return a;
    if ("function" == typeof a.__iterator__) return a.__iterator__(!1);
    if (goog.isArrayLike(a)) {
        var b = 0,
            c = new goog.iter.Iterator;
        c.next = function() {
            for (;;) {
                if (b >= a.length) throw goog.iter.StopIteration;
                if (b in a) return a[b++];
                b++
            }
        };
        return c
    }
    throw Error("Not implemented");
};
goog.iter.forEach = function(a, b, c) {
    if (goog.isArrayLike(a)) try {
        goog.array.forEach(a, b, c)
    } catch (d) {
        if (d !== goog.iter.StopIteration) throw d;
    } else {
        a = goog.iter.toIterator(a);
        try {
            for (;;) b.call(c, a.next(), void 0, a)
        } catch (d) {
            if (d !== goog.iter.StopIteration) throw d;
        }
    }
};
goog.iter.filter = function(a, b, c) {
    var d = goog.iter.toIterator(a);
    a = new goog.iter.Iterator;
    a.next = function() {
        for (;;) {
            var a = d.next();
            if (b.call(c, a, void 0, d)) return a
        }
    };
    return a
};
goog.iter.filterFalse = function(a, b, c) {
    return goog.iter.filter(a, goog.functions.not(b), c)
};
goog.iter.range = function(a, b, c) {
    var d = 0,
        e = a,
        f = c || 1;
    1 < arguments.length && (d = a, e = b);
    if (0 == f) throw Error("Range step argument must not be zero");
    var g = new goog.iter.Iterator;
    g.next = function() {
        if (0 < f && d >= e || 0 > f && d <= e) throw goog.iter.StopIteration;
        var a = d;
        d += f;
        return a
    };
    return g
};
goog.iter.join = function(a, b) {
    return goog.iter.toArray(a).join(b)
};
goog.iter.map = function(a, b, c) {
    var d = goog.iter.toIterator(a);
    a = new goog.iter.Iterator;
    a.next = function() {
        var a = d.next();
        return b.call(c, a, void 0, d)
    };
    return a
};
goog.iter.reduce = function(a, b, c, d) {
    var e = c;
    goog.iter.forEach(a, function(a) {
        e = b.call(d, e, a)
    });
    return e
};
goog.iter.some = function(a, b, c) {
    a = goog.iter.toIterator(a);
    try {
        for (;;)
            if (b.call(c, a.next(), void 0, a)) return !0
    } catch (d) {
        if (d !== goog.iter.StopIteration) throw d;
    }
    return !1
};
goog.iter.every = function(a, b, c) {
    a = goog.iter.toIterator(a);
    try {
        for (;;)
            if (!b.call(c, a.next(), void 0, a)) return !1
    } catch (d) {
        if (d !== goog.iter.StopIteration) throw d;
    }
    return !0
};
goog.iter.chain = function(a) {
    return goog.iter.chainFromIterable(arguments)
};
goog.iter.chainFromIterable = function(a) {
    var b = goog.iter.toIterator(a);
    a = new goog.iter.Iterator;
    var c = null;
    a.next = function() {
        for (;;) {
            if (null == c) {
                var a = b.next();
                c = goog.iter.toIterator(a)
            }
            try {
                return c.next()
            } catch (e) {
                if (e !== goog.iter.StopIteration) throw e;
                c = null
            }
        }
    };
    return a
};
goog.iter.dropWhile = function(a, b, c) {
    var d = goog.iter.toIterator(a);
    a = new goog.iter.Iterator;
    var e = !0;
    a.next = function() {
        for (;;) {
            var a = d.next();
            if (!e || !b.call(c, a, void 0, d)) return e = !1, a
        }
    };
    return a
};
goog.iter.takeWhile = function(a, b, c) {
    var d = goog.iter.toIterator(a);
    a = new goog.iter.Iterator;
    a.next = function() {
        var a = d.next();
        if (b.call(c, a, void 0, d)) return a;
        throw goog.iter.StopIteration;
    };
    return a
};
goog.iter.toArray = function(a) {
    if (goog.isArrayLike(a)) return goog.array.toArray(a);
    a = goog.iter.toIterator(a);
    var b = [];
    goog.iter.forEach(a, function(a) {
        b.push(a)
    });
    return b
};
goog.iter.equals = function(a, b, c) {
    a = goog.iter.zipLongest({}, a, b);
    var d = c || goog.array.defaultCompareEquality;
    return goog.iter.every(a, function(a) {
        return d(a[0], a[1])
    })
};
goog.iter.nextOrValue = function(a, b) {
    try {
        return goog.iter.toIterator(a).next()
    } catch (c) {
        if (c != goog.iter.StopIteration) throw c;
        return b
    }
};
goog.iter.product = function(a) {
    if (goog.array.some(arguments, function(a) {
            return !a.length
        }) || !arguments.length) return new goog.iter.Iterator;
    var b = new goog.iter.Iterator,
        c = arguments,
        d = goog.array.repeat(0, c.length);
    b.next = function() {
        if (d) {
            for (var a = goog.array.map(d, function(a, b) {
                    return c[b][a]
                }), b = d.length - 1; 0 <= b; b--) {
                goog.asserts.assert(d);
                if (d[b] < c[b].length - 1) {
                    d[b]++;
                    break
                }
                if (0 == b) {
                    d = null;
                    break
                }
                d[b] = 0
            }
            return a
        }
        throw goog.iter.StopIteration;
    };
    return b
};
goog.iter.cycle = function(a) {
    var b = goog.iter.toIterator(a),
        c = [],
        d = 0;
    a = new goog.iter.Iterator;
    var e = !1;
    a.next = function() {
        var a = null;
        if (!e) try {
            return a = b.next(), c.push(a), a
        } catch (g) {
            if (g != goog.iter.StopIteration || goog.array.isEmpty(c)) throw g;
            e = !0
        }
        a = c[d];
        d = (d + 1) % c.length;
        return a
    };
    return a
};
goog.iter.count = function(a, b) {
    var c = a || 0,
        d = goog.isDef(b) ? b : 1,
        e = new goog.iter.Iterator;
    e.next = function() {
        var a = c;
        c += d;
        return a
    };
    return e
};
goog.iter.repeat = function(a) {
    var b = new goog.iter.Iterator;
    b.next = goog.functions.constant(a);
    return b
};
goog.iter.accumulate = function(a) {
    var b = goog.iter.toIterator(a),
        c = 0;
    a = new goog.iter.Iterator;
    a.next = function() {
        return c += b.next()
    };
    return a
};
goog.iter.zip = function(a) {
    var b = arguments,
        c = new goog.iter.Iterator;
    if (0 < b.length) {
        var d = goog.array.map(b, goog.iter.toIterator);
        c.next = function() {
            return goog.array.map(d, function(a) {
                return a.next()
            })
        }
    }
    return c
};
goog.iter.zipLongest = function(a, b) {
    var c = goog.array.slice(arguments, 1),
        d = new goog.iter.Iterator;
    if (0 < c.length) {
        var e = goog.array.map(c, goog.iter.toIterator);
        d.next = function() {
            var b = !1,
                c = goog.array.map(e, function(c) {
                    var d;
                    try {
                        d = c.next(), b = !0
                    } catch (e) {
                        if (e !== goog.iter.StopIteration) throw e;
                        d = a
                    }
                    return d
                });
            if (!b) throw goog.iter.StopIteration;
            return c
        }
    }
    return d
};
goog.iter.compress = function(a, b) {
    var c = goog.iter.toIterator(b);
    return goog.iter.filter(a, function() {
        return !!c.next()
    })
};
goog.iter.GroupByIterator_ = function(a, b) {
    this.iterator = goog.iter.toIterator(a);
    this.keyFunc = b || goog.functions.identity
};
goog.inherits(goog.iter.GroupByIterator_, goog.iter.Iterator);
goog.iter.GroupByIterator_.prototype.next = function() {
    for (; this.currentKey == this.targetKey;) this.currentValue = this.iterator.next(), this.currentKey = this.keyFunc(this.currentValue);
    this.targetKey = this.currentKey;
    return [this.currentKey, this.groupItems_(this.targetKey)]
};
goog.iter.GroupByIterator_.prototype.groupItems_ = function(a) {
    for (var b = []; this.currentKey == a;) {
        b.push(this.currentValue);
        try {
            this.currentValue = this.iterator.next()
        } catch (c) {
            if (c !== goog.iter.StopIteration) throw c;
            break
        }
        this.currentKey = this.keyFunc(this.currentValue)
    }
    return b
};
goog.iter.groupBy = function(a, b) {
    return new goog.iter.GroupByIterator_(a, b)
};
goog.iter.starMap = function(a, b, c) {
    var d = goog.iter.toIterator(a);
    a = new goog.iter.Iterator;
    a.next = function() {
        var a = goog.iter.toArray(d.next());
        return b.apply(c, goog.array.concat(a, void 0, d))
    };
    return a
};
goog.iter.tee = function(a, b) {
    var c = goog.iter.toIterator(a),
        d = goog.isNumber(b) ? b : 2,
        e = goog.array.map(goog.array.range(d), function() {
            return []
        }),
        f = function() {
            var a = c.next();
            goog.array.forEach(e, function(b) {
                b.push(a)
            })
        };
    return goog.array.map(e, function(a) {
        var b = new goog.iter.Iterator;
        b.next = function() {
            goog.array.isEmpty(a) && f();
            goog.asserts.assert(!goog.array.isEmpty(a));
            return a.shift()
        };
        return b
    })
};
goog.iter.enumerate = function(a, b) {
    return goog.iter.zip(goog.iter.count(b), a)
};
goog.iter.limit = function(a, b) {
    goog.asserts.assert(goog.math.isInt(b) && 0 <= b);
    var c = goog.iter.toIterator(a),
        d = new goog.iter.Iterator,
        e = b;
    d.next = function() {
        if (0 < e--) return c.next();
        throw goog.iter.StopIteration;
    };
    return d
};
goog.iter.consume = function(a, b) {
    goog.asserts.assert(goog.math.isInt(b) && 0 <= b);
    for (var c = goog.iter.toIterator(a); 0 < b--;) goog.iter.nextOrValue(c, null);
    return c
};
goog.iter.slice = function(a, b, c) {
    goog.asserts.assert(goog.math.isInt(b) && 0 <= b);
    a = goog.iter.consume(a, b);
    goog.isNumber(c) && (goog.asserts.assert(goog.math.isInt(c) && c >= b), a = goog.iter.limit(a, c - b));
    return a
};
goog.iter.hasDuplicates_ = function(a) {
    var b = [];
    goog.array.removeDuplicates(a, b);
    return a.length != b.length
};
goog.iter.permutations = function(a, b) {
    var c = goog.iter.toArray(a),
        d = goog.isNumber(b) ? b : c.length,
        c = goog.array.repeat(c, d),
        c = goog.iter.product.apply(void 0, c);
    return goog.iter.filter(c, function(a) {
        return !goog.iter.hasDuplicates_(a)
    })
};
goog.iter.combinations = function(a, b) {
    function c(a) {
        return d[a]
    }
    var d = goog.iter.toArray(a),
        e = goog.iter.range(d.length),
        e = goog.iter.permutations(e, b),
        f = goog.iter.filter(e, function(a) {
            return goog.array.isSorted(a)
        }),
        e = new goog.iter.Iterator;
    e.next = function() {
        return goog.array.map(f.next(), c)
    };
    return e
};
goog.iter.combinationsWithReplacement = function(a, b) {
    function c(a) {
        return d[a]
    }
    var d = goog.iter.toArray(a),
        e = goog.array.range(d.length),
        e = goog.array.repeat(e, b),
        e = goog.iter.product.apply(void 0, e),
        f = goog.iter.filter(e, function(a) {
            return goog.array.isSorted(a)
        }),
        e = new goog.iter.Iterator;
    e.next = function() {
        return goog.array.map(f.next(), c)
    };
    return e
};
goog.structs.Map = function(a, b) {
    this.map_ = {};
    this.keys_ = [];
    this.version_ = this.count_ = 0;
    var c = arguments.length;
    if (1 < c) {
        if (c % 2) throw Error("Uneven number of arguments");
        for (var d = 0; d < c; d += 2) this.set(arguments[d], arguments[d + 1])
    } else a && this.addAll(a)
};
goog.structs.Map.prototype.getCount = function() {
    return this.count_
};
goog.structs.Map.prototype.getValues = function() {
    this.cleanupKeysArray_();
    for (var a = [], b = 0; b < this.keys_.length; b++) a.push(this.map_[this.keys_[b]]);
    return a
};
goog.structs.Map.prototype.getKeys = function() {
    this.cleanupKeysArray_();
    return this.keys_.concat()
};
goog.structs.Map.prototype.containsKey = function(a) {
    return goog.structs.Map.hasKey_(this.map_, a)
};
goog.structs.Map.prototype.containsValue = function(a) {
    for (var b = 0; b < this.keys_.length; b++) {
        var c = this.keys_[b];
        if (goog.structs.Map.hasKey_(this.map_, c) && this.map_[c] == a) return !0
    }
    return !1
};
goog.structs.Map.prototype.equals = function(a, b) {
    if (this === a) return !0;
    if (this.count_ != a.getCount()) return !1;
    var c = b || goog.structs.Map.defaultEquals;
    this.cleanupKeysArray_();
    for (var d, e = 0; d = this.keys_[e]; e++)
        if (!c(this.get(d), a.get(d))) return !1;
    return !0
};
goog.structs.Map.defaultEquals = function(a, b) {
    return a === b
};
goog.structs.Map.prototype.isEmpty = function() {
    return 0 == this.count_
};
goog.structs.Map.prototype.clear = function() {
    this.map_ = {};
    this.version_ = this.count_ = this.keys_.length = 0
};
goog.structs.Map.prototype.remove = function(a) {
    return goog.structs.Map.hasKey_(this.map_, a) ? (delete this.map_[a], this.count_--, this.version_++, this.keys_.length > 2 * this.count_ && this.cleanupKeysArray_(), !0) : !1
};
goog.structs.Map.prototype.cleanupKeysArray_ = function() {
    if (this.count_ != this.keys_.length) {
        for (var a = 0, b = 0; a < this.keys_.length;) {
            var c = this.keys_[a];
            goog.structs.Map.hasKey_(this.map_, c) && (this.keys_[b++] = c);
            a++
        }
        this.keys_.length = b
    }
    if (this.count_ != this.keys_.length) {
        for (var d = {}, b = a = 0; a < this.keys_.length;) c = this.keys_[a], goog.structs.Map.hasKey_(d, c) || (this.keys_[b++] = c, d[c] = 1), a++;
        this.keys_.length = b
    }
};
goog.structs.Map.prototype.get = function(a, b) {
    return goog.structs.Map.hasKey_(this.map_, a) ? this.map_[a] : b
};
goog.structs.Map.prototype.set = function(a, b) {
    goog.structs.Map.hasKey_(this.map_, a) || (this.count_++, this.keys_.push(a), this.version_++);
    this.map_[a] = b
};
goog.structs.Map.prototype.addAll = function(a) {
    var b;
    a instanceof goog.structs.Map ? (b = a.getKeys(), a = a.getValues()) : (b = goog.object.getKeys(a), a = goog.object.getValues(a));
    for (var c = 0; c < b.length; c++) this.set(b[c], a[c])
};
goog.structs.Map.prototype.forEach = function(a, b) {
    for (var c = this.getKeys(), d = 0; d < c.length; d++) {
        var e = c[d],
            f = this.get(e);
        a.call(b, f, e, this)
    }
};
goog.structs.Map.prototype.clone = function() {
    return new goog.structs.Map(this)
};
goog.structs.Map.prototype.transpose = function() {
    for (var a = new goog.structs.Map, b = 0; b < this.keys_.length; b++) {
        var c = this.keys_[b];
        a.set(this.map_[c], c)
    }
    return a
};
goog.structs.Map.prototype.toObject = function() {
    this.cleanupKeysArray_();
    for (var a = {}, b = 0; b < this.keys_.length; b++) {
        var c = this.keys_[b];
        a[c] = this.map_[c]
    }
    return a
};
goog.structs.Map.prototype.getKeyIterator = function() {
    return this.__iterator__(!0)
};
goog.structs.Map.prototype.getValueIterator = function() {
    return this.__iterator__(!1)
};
goog.structs.Map.prototype.__iterator__ = function(a) {
    this.cleanupKeysArray_();
    var b = 0,
        c = this.version_,
        d = this,
        e = new goog.iter.Iterator;
    e.next = function() {
        if (c != d.version_) throw Error("The map has changed since the iterator was created");
        if (b >= d.keys_.length) throw goog.iter.StopIteration;
        var e = d.keys_[b++];
        return a ? e : d.map_[e]
    };
    return e
};
goog.structs.Map.hasKey_ = function(a, b) {
    return Object.prototype.hasOwnProperty.call(a, b)
};
goog.structs.getCount = function(a) {
    return a.getCount && "function" == typeof a.getCount ? a.getCount() : goog.isArrayLike(a) || goog.isString(a) ? a.length : goog.object.getCount(a)
};
goog.structs.getValues = function(a) {
    if (a.getValues && "function" == typeof a.getValues) return a.getValues();
    if (goog.isString(a)) return a.split("");
    if (goog.isArrayLike(a)) {
        for (var b = [], c = a.length, d = 0; d < c; d++) b.push(a[d]);
        return b
    }
    return goog.object.getValues(a)
};
goog.structs.getKeys = function(a) {
    if (a.getKeys && "function" == typeof a.getKeys) return a.getKeys();
    if (!a.getValues || "function" != typeof a.getValues) {
        if (goog.isArrayLike(a) || goog.isString(a)) {
            var b = [];
            a = a.length;
            for (var c = 0; c < a; c++) b.push(c);
            return b
        }
        return goog.object.getKeys(a)
    }
};
goog.structs.contains = function(a, b) {
    return a.contains && "function" == typeof a.contains ? a.contains(b) : a.containsValue && "function" == typeof a.containsValue ? a.containsValue(b) : goog.isArrayLike(a) || goog.isString(a) ? goog.array.contains(a, b) : goog.object.containsValue(a, b)
};
goog.structs.isEmpty = function(a) {
    return a.isEmpty && "function" == typeof a.isEmpty ? a.isEmpty() : goog.isArrayLike(a) || goog.isString(a) ? goog.array.isEmpty(a) : goog.object.isEmpty(a)
};
goog.structs.clear = function(a) {
    a.clear && "function" == typeof a.clear ? a.clear() : goog.isArrayLike(a) ? goog.array.clear(a) : goog.object.clear(a)
};
goog.structs.forEach = function(a, b, c) {
    if (a.forEach && "function" == typeof a.forEach) a.forEach(b, c);
    else if (goog.isArrayLike(a) || goog.isString(a)) goog.array.forEach(a, b, c);
    else
        for (var d = goog.structs.getKeys(a), e = goog.structs.getValues(a), f = e.length, g = 0; g < f; g++) b.call(c, e[g], d && d[g], a)
};
goog.structs.filter = function(a, b, c) {
    if ("function" == typeof a.filter) return a.filter(b, c);
    if (goog.isArrayLike(a) || goog.isString(a)) return goog.array.filter(a, b, c);
    var d, e = goog.structs.getKeys(a),
        f = goog.structs.getValues(a),
        g = f.length;
    if (e) {
        d = {};
        for (var h = 0; h < g; h++) b.call(c, f[h], e[h], a) && (d[e[h]] = f[h])
    } else
        for (d = [], h = 0; h < g; h++) b.call(c, f[h], void 0, a) && d.push(f[h]);
    return d
};
goog.structs.map = function(a, b, c) {
    if ("function" == typeof a.map) return a.map(b, c);
    if (goog.isArrayLike(a) || goog.isString(a)) return goog.array.map(a, b, c);
    var d, e = goog.structs.getKeys(a),
        f = goog.structs.getValues(a),
        g = f.length;
    if (e) {
        d = {};
        for (var h = 0; h < g; h++) d[e[h]] = b.call(c, f[h], e[h], a)
    } else
        for (d = [], h = 0; h < g; h++) d[h] = b.call(c, f[h], void 0, a);
    return d
};
goog.structs.some = function(a, b, c) {
    if ("function" == typeof a.some) return a.some(b, c);
    if (goog.isArrayLike(a) || goog.isString(a)) return goog.array.some(a, b, c);
    for (var d = goog.structs.getKeys(a), e = goog.structs.getValues(a), f = e.length, g = 0; g < f; g++)
        if (b.call(c, e[g], d && d[g], a)) return !0;
    return !1
};
goog.structs.every = function(a, b, c) {
    if ("function" == typeof a.every) return a.every(b, c);
    if (goog.isArrayLike(a) || goog.isString(a)) return goog.array.every(a, b, c);
    for (var d = goog.structs.getKeys(a), e = goog.structs.getValues(a), f = e.length, g = 0; g < f; g++)
        if (!b.call(c, e[g], d && d[g], a)) return !1;
    return !0
};
goog.structs.Set = function(a) {
    this.map_ = new goog.structs.Map;
    a && this.addAll(a)
};
goog.structs.Set.getKey_ = function(a) {
    var b = typeof a;
    return "object" == b && a || "function" == b ? "o" + goog.getUid(a) : b.substr(0, 1) + a
};
goog.structs.Set.prototype.getCount = function() {
    return this.map_.getCount()
};
goog.structs.Set.prototype.add = function(a) {
    this.map_.set(goog.structs.Set.getKey_(a), a)
};
goog.structs.Set.prototype.addAll = function(a) {
    a = goog.structs.getValues(a);
    for (var b = a.length, c = 0; c < b; c++) this.add(a[c])
};
goog.structs.Set.prototype.removeAll = function(a) {
    a = goog.structs.getValues(a);
    for (var b = a.length, c = 0; c < b; c++) this.remove(a[c])
};
goog.structs.Set.prototype.remove = function(a) {
    return this.map_.remove(goog.structs.Set.getKey_(a))
};
goog.structs.Set.prototype.clear = function() {
    this.map_.clear()
};
goog.structs.Set.prototype.isEmpty = function() {
    return this.map_.isEmpty()
};
goog.structs.Set.prototype.contains = function(a) {
    return this.map_.containsKey(goog.structs.Set.getKey_(a))
};
goog.structs.Set.prototype.containsAll = function(a) {
    return goog.structs.every(a, this.contains, this)
};
goog.structs.Set.prototype.intersection = function(a) {
    var b = new goog.structs.Set;
    a = goog.structs.getValues(a);
    for (var c = 0; c < a.length; c++) {
        var d = a[c];
        this.contains(d) && b.add(d)
    }
    return b
};
goog.structs.Set.prototype.difference = function(a) {
    var b = this.clone();
    b.removeAll(a);
    return b
};
goog.structs.Set.prototype.getValues = function() {
    return this.map_.getValues()
};
goog.structs.Set.prototype.clone = function() {
    return new goog.structs.Set(this)
};
goog.structs.Set.prototype.equals = function(a) {
    return this.getCount() == goog.structs.getCount(a) && this.isSubsetOf(a)
};
goog.structs.Set.prototype.isSubsetOf = function(a) {
    var b = goog.structs.getCount(a);
    if (this.getCount() > b) return !1;
    !(a instanceof goog.structs.Set) && 5 < b && (a = new goog.structs.Set(a));
    return goog.structs.every(this, function(b) {
        return goog.structs.contains(a, b)
    })
};
goog.structs.Set.prototype.__iterator__ = function(a) {
    return this.map_.__iterator__(!1)
};
goog.debug.LOGGING_ENABLED = goog.DEBUG;
goog.debug.FORCE_SLOPPY_STACKS = !goog.STRICT_MODE_COMPATIBLE;
goog.debug.catchErrors = function(a, b, c) {
    c = c || goog.global;
    var d = c.onerror,
        e = !!b;
    goog.userAgent.WEBKIT && !goog.userAgent.isVersionOrHigher("535.3") && (e = !e);
    c.onerror = function(b, c, h, k, l) {
        d && d(b, c, h, k, l);
        a({
            message: b,
            fileName: c,
            line: h,
            col: k,
            error: l
        });
        return e
    }
};
goog.debug.expose = function(a, b) {
    if ("undefined" == typeof a) return "undefined";
    if (null == a) return "NULL";
    var c = [],
        d;
    for (d in a)
        if (b || !goog.isFunction(a[d])) {
            var e = d + " = ";
            try {
                e += a[d]
            } catch (f) {
                e += "*** " + f + " ***"
            }
            c.push(e)
        } return c.join("\n")
};
goog.debug.deepExpose = function(a, b) {
    var c = [],
        d = function(a, f, g) {
            var h = f + "  ";
            g = new goog.structs.Set(g);
            try {
                if (goog.isDef(a))
                    if (goog.isNull(a)) c.push("NULL");
                    else if (goog.isString(a)) c.push('"' + a.replace(/\n/g, "\n" + f) + '"');
                else if (goog.isFunction(a)) c.push(String(a).replace(/\n/g, "\n" + f));
                else if (goog.isObject(a))
                    if (g.contains(a)) c.push("*** reference loop detected ***");
                    else {
                        g.add(a);
                        c.push("{");
                        for (var k in a)
                            if (b || !goog.isFunction(a[k])) c.push("\n"), c.push(h), c.push(k + " = "), d(a[k], h, g);
                        c.push("\n" +
                            f + "}")
                    }
                else c.push(a);
                else c.push("undefined")
            } catch (l) {
                c.push("*** " + l + " ***")
            }
        };
    d(a, "", new goog.structs.Set);
    return c.join("")
};
goog.debug.exposeArray = function(a) {
    for (var b = [], c = 0; c < a.length; c++) goog.isArray(a[c]) ? b.push(goog.debug.exposeArray(a[c])) : b.push(a[c]);
    return "[ " + b.join(", ") + " ]"
};
goog.debug.exposeException = function(a, b) {
    var c = goog.debug.exposeExceptionAsHtml(a, b);
    return goog.html.SafeHtml.unwrap(c)
};
goog.debug.exposeExceptionAsHtml = function(a, b) {
    try {
        var c = goog.debug.normalizeErrorObject(a),
            d = goog.debug.createViewSourceUrl_(c.fileName);
        return goog.html.SafeHtml.concat(goog.html.SafeHtml.htmlEscapePreservingNewlinesAndSpaces("Message: " + c.message + "\nUrl: "), goog.html.SafeHtml.create("a", {
            href: d,
            target: "_new"
        }, c.fileName), goog.html.SafeHtml.htmlEscapePreservingNewlinesAndSpaces("\nLine: " + c.lineNumber + "\n\nBrowser stack:\n" + c.stack + "-> [end]\n\nJS stack traversal:\n" + goog.debug.getStacktrace(b) +
            "-> "))
    } catch (e) {
        return goog.html.SafeHtml.htmlEscapePreservingNewlinesAndSpaces("Exception trying to expose exception! You win, we lose. " + e)
    }
};
goog.debug.createViewSourceUrl_ = function(a) {
    goog.isDefAndNotNull(a) || (a = "");
    if (!/^https?:\/\//i.test(a)) return goog.html.SafeUrl.fromConstant(goog.string.Const.from("sanitizedviewsrc"));
    a = goog.html.SafeUrl.sanitize(a);
    return goog.html.uncheckedconversions.safeUrlFromStringKnownToSatisfyTypeContract(goog.string.Const.from("view-source scheme plus HTTP/HTTPS URL"), "view-source:" + goog.html.SafeUrl.unwrap(a))
};
goog.debug.normalizeErrorObject = function(a) {
    var b = goog.getObjectByName("window.location.href");
    if (goog.isString(a)) return {
        message: a,
        name: "Unknown error",
        lineNumber: "Not available",
        fileName: b,
        stack: "Not available"
    };
    var c, d, e = !1;
    try {
        c = a.lineNumber || a.line || "Not available"
    } catch (f) {
        c = "Not available", e = !0
    }
    try {
        d = a.fileName || a.filename || a.sourceURL || goog.global.$googDebugFname || b
    } catch (f) {
        d = "Not available", e = !0
    }
    return !e && a.lineNumber && a.fileName && a.stack && a.message && a.name ? a : {
        message: a.message || "Not available",
        name: a.name || "UnknownError",
        lineNumber: c,
        fileName: d,
        stack: a.stack || "Not available"
    }
};
goog.debug.enhanceError = function(a, b) {
    var c;
    "string" == typeof a ? (c = Error(a), Error.captureStackTrace && Error.captureStackTrace(c, goog.debug.enhanceError)) : c = a;
    c.stack || (c.stack = goog.debug.getStacktrace(goog.debug.enhanceError));
    if (b) {
        for (var d = 0; c["message" + d];) ++d;
        c["message" + d] = String(b)
    }
    return c
};
goog.debug.getStacktraceSimple = function(a) {
    if (!goog.debug.FORCE_SLOPPY_STACKS) {
        var b = goog.debug.getNativeStackTrace_(goog.debug.getStacktraceSimple);
        if (b) return b
    }
    for (var b = [], c = arguments.callee.caller, d = 0; c && (!a || d < a);) {
        b.push(goog.debug.getFunctionName(c));
        b.push("()\n");
        try {
            c = c.caller
        } catch (e) {
            b.push("[exception trying to get caller]\n");
            break
        }
        d++;
        if (d >= goog.debug.MAX_STACK_DEPTH) {
            b.push("[...long stack...]");
            break
        }
    }
    a && d >= a ? b.push("[...reached max depth limit...]") : b.push("[end]");
    return b.join("")
};
goog.debug.MAX_STACK_DEPTH = 50;
goog.debug.getNativeStackTrace_ = function(a) {
    var b = Error();
    if (Error.captureStackTrace) return Error.captureStackTrace(b, a), String(b.stack);
    try {
        throw b;
    } catch (c) {
        b = c
    }
    return (a = b.stack) ? String(a) : null
};
goog.debug.getStacktrace = function(a) {
    var b;
    goog.debug.FORCE_SLOPPY_STACKS || (b = goog.debug.getNativeStackTrace_(a || goog.debug.getStacktrace));
    b || (b = goog.debug.getStacktraceHelper_(a || arguments.callee.caller, []));
    return b
};
goog.debug.getStacktraceHelper_ = function(a, b) {
    var c = [];
    if (goog.array.contains(b, a)) c.push("[...circular reference...]");
    else if (a && b.length < goog.debug.MAX_STACK_DEPTH) {
        c.push(goog.debug.getFunctionName(a) + "(");
        for (var d = a.arguments, e = 0; d && e < d.length; e++) {
            0 < e && c.push(", ");
            var f;
            f = d[e];
            switch (typeof f) {
                case "object":
                    f = f ? "object" : "null";
                    break;
                case "string":
                    break;
                case "number":
                    f = String(f);
                    break;
                case "boolean":
                    f = f ? "true" : "false";
                    break;
                case "function":
                    f = (f = goog.debug.getFunctionName(f)) ? f : "[fn]";
                    break;
                default:
                    f = typeof f
            }
            40 < f.length && (f = f.substr(0, 40) + "...");
            c.push(f)
        }
        b.push(a);
        c.push(")\n");
        try {
            c.push(goog.debug.getStacktraceHelper_(a.caller, b))
        } catch (g) {
            c.push("[exception trying to get caller]\n")
        }
    } else a ? c.push("[...long stack...]") : c.push("[end]");
    return c.join("")
};
goog.debug.setFunctionResolver = function(a) {
    goog.debug.fnNameResolver_ = a
};
goog.debug.getFunctionName = function(a) {
    if (goog.debug.fnNameCache_[a]) return goog.debug.fnNameCache_[a];
    if (goog.debug.fnNameResolver_) {
        var b = goog.debug.fnNameResolver_(a);
        if (b) return goog.debug.fnNameCache_[a] = b
    }
    a = String(a);
    goog.debug.fnNameCache_[a] || (b = /function ([^\(]+)/.exec(a), goog.debug.fnNameCache_[a] = b ? b[1] : "[Anonymous]");
    return goog.debug.fnNameCache_[a]
};
goog.debug.makeWhitespaceVisible = function(a) {
    return a.replace(/ /g, "[_]").replace(/\f/g, "[f]").replace(/\n/g, "[n]\n").replace(/\r/g, "[r]").replace(/\t/g, "[t]")
};
goog.debug.runtimeType = function(a) {
    return a instanceof Function ? a.displayName || a.name || "unknown type name" : a instanceof Object ? a.constructor.displayName || a.constructor.name || Object.prototype.toString.call(a) : null === a ? "null" : typeof a
};
goog.debug.fnNameCache_ = {};
goog.debug.LogRecord = function(a, b, c, d, e) {
    this.reset(a, b, c, d, e)
};
goog.debug.LogRecord.prototype.sequenceNumber_ = 0;
goog.debug.LogRecord.prototype.exception_ = null;
goog.debug.LogRecord.ENABLE_SEQUENCE_NUMBERS = !0;
goog.debug.LogRecord.nextSequenceNumber_ = 0;
goog.debug.LogRecord.prototype.reset = function(a, b, c, d, e) {
    goog.debug.LogRecord.ENABLE_SEQUENCE_NUMBERS && (this.sequenceNumber_ = "number" == typeof e ? e : goog.debug.LogRecord.nextSequenceNumber_++);
    this.time_ = d || goog.now();
    this.level_ = a;
    this.msg_ = b;
    this.loggerName_ = c;
    delete this.exception_
};
goog.debug.LogRecord.prototype.getLoggerName = function() {
    return this.loggerName_
};
goog.debug.LogRecord.prototype.getException = function() {
    return this.exception_
};
goog.debug.LogRecord.prototype.setException = function(a) {
    this.exception_ = a
};
goog.debug.LogRecord.prototype.setLoggerName = function(a) {
    this.loggerName_ = a
};
goog.debug.LogRecord.prototype.getLevel = function() {
    return this.level_
};
goog.debug.LogRecord.prototype.setLevel = function(a) {
    this.level_ = a
};
goog.debug.LogRecord.prototype.getMessage = function() {
    return this.msg_
};
goog.debug.LogRecord.prototype.setMessage = function(a) {
    this.msg_ = a
};
goog.debug.LogRecord.prototype.getMillis = function() {
    return this.time_
};
goog.debug.LogRecord.prototype.setMillis = function(a) {
    this.time_ = a
};
goog.debug.LogRecord.prototype.getSequenceNumber = function() {
    return this.sequenceNumber_
};
goog.debug.LogBuffer = function() {
    goog.asserts.assert(goog.debug.LogBuffer.isBufferingEnabled(), "Cannot use goog.debug.LogBuffer without defining goog.debug.LogBuffer.CAPACITY.");
    this.clear()
};
goog.debug.LogBuffer.getInstance = function() {
    goog.debug.LogBuffer.instance_ || (goog.debug.LogBuffer.instance_ = new goog.debug.LogBuffer);
    return goog.debug.LogBuffer.instance_
};
goog.debug.LogBuffer.CAPACITY = 0;
goog.debug.LogBuffer.prototype.addRecord = function(a, b, c) {
    var d = (this.curIndex_ + 1) % goog.debug.LogBuffer.CAPACITY;
    this.curIndex_ = d;
    if (this.isFull_) return d = this.buffer_[d], d.reset(a, b, c), d;
    this.isFull_ = d == goog.debug.LogBuffer.CAPACITY - 1;
    return this.buffer_[d] = new goog.debug.LogRecord(a, b, c)
};
goog.debug.LogBuffer.isBufferingEnabled = function() {
    return 0 < goog.debug.LogBuffer.CAPACITY
};
goog.debug.LogBuffer.prototype.clear = function() {
    this.buffer_ = Array(goog.debug.LogBuffer.CAPACITY);
    this.curIndex_ = -1;
    this.isFull_ = !1
};
goog.debug.LogBuffer.prototype.forEachRecord = function(a) {
    var b = this.buffer_;
    if (b[0]) {
        var c = this.curIndex_,
            d = this.isFull_ ? c : -1;
        do d = (d + 1) % goog.debug.LogBuffer.CAPACITY, a(b[d]); while (d != c)
    }
};
goog.debug.Logger = function(a) {
    this.name_ = a;
    this.handlers_ = this.children_ = this.level_ = this.parent_ = null
};
goog.debug.Logger.ROOT_LOGGER_NAME = "";
goog.debug.Logger.ENABLE_HIERARCHY = !0;
goog.debug.Logger.ENABLE_HIERARCHY || (goog.debug.Logger.rootHandlers_ = []);
goog.debug.Logger.Level = function(a, b) {
    this.name = a;
    this.value = b
};
goog.debug.Logger.Level.prototype.toString = function() {
    return this.name
};
goog.debug.Logger.Level.OFF = new goog.debug.Logger.Level("OFF", Infinity);
goog.debug.Logger.Level.SHOUT = new goog.debug.Logger.Level("SHOUT", 1200);
goog.debug.Logger.Level.SEVERE = new goog.debug.Logger.Level("SEVERE", 1E3);
goog.debug.Logger.Level.WARNING = new goog.debug.Logger.Level("WARNING", 900);
goog.debug.Logger.Level.INFO = new goog.debug.Logger.Level("INFO", 800);
goog.debug.Logger.Level.CONFIG = new goog.debug.Logger.Level("CONFIG", 700);
goog.debug.Logger.Level.FINE = new goog.debug.Logger.Level("FINE", 500);
goog.debug.Logger.Level.FINER = new goog.debug.Logger.Level("FINER", 400);
goog.debug.Logger.Level.FINEST = new goog.debug.Logger.Level("FINEST", 300);
goog.debug.Logger.Level.ALL = new goog.debug.Logger.Level("ALL", 0);
goog.debug.Logger.Level.PREDEFINED_LEVELS = [goog.debug.Logger.Level.OFF, goog.debug.Logger.Level.SHOUT, goog.debug.Logger.Level.SEVERE, goog.debug.Logger.Level.WARNING, goog.debug.Logger.Level.INFO, goog.debug.Logger.Level.CONFIG, goog.debug.Logger.Level.FINE, goog.debug.Logger.Level.FINER, goog.debug.Logger.Level.FINEST, goog.debug.Logger.Level.ALL];
goog.debug.Logger.Level.predefinedLevelsCache_ = null;
goog.debug.Logger.Level.createPredefinedLevelsCache_ = function() {
    goog.debug.Logger.Level.predefinedLevelsCache_ = {};
    for (var a = 0, b; b = goog.debug.Logger.Level.PREDEFINED_LEVELS[a]; a++) goog.debug.Logger.Level.predefinedLevelsCache_[b.value] = b, goog.debug.Logger.Level.predefinedLevelsCache_[b.name] = b
};
goog.debug.Logger.Level.getPredefinedLevel = function(a) {
    goog.debug.Logger.Level.predefinedLevelsCache_ || goog.debug.Logger.Level.createPredefinedLevelsCache_();
    return goog.debug.Logger.Level.predefinedLevelsCache_[a] || null
};
goog.debug.Logger.Level.getPredefinedLevelByValue = function(a) {
    goog.debug.Logger.Level.predefinedLevelsCache_ || goog.debug.Logger.Level.createPredefinedLevelsCache_();
    if (a in goog.debug.Logger.Level.predefinedLevelsCache_) return goog.debug.Logger.Level.predefinedLevelsCache_[a];
    for (var b = 0; b < goog.debug.Logger.Level.PREDEFINED_LEVELS.length; ++b) {
        var c = goog.debug.Logger.Level.PREDEFINED_LEVELS[b];
        if (c.value <= a) return c
    }
    return null
};
goog.debug.Logger.getLogger = function(a) {
    return goog.debug.LogManager.getLogger(a)
};
goog.debug.Logger.logToProfilers = function(a) {
    goog.global.console && (goog.global.console.timeStamp ? goog.global.console.timeStamp(a) : goog.global.console.markTimeline && goog.global.console.markTimeline(a));
    goog.global.msWriteProfilerMark && goog.global.msWriteProfilerMark(a)
};
goog.debug.Logger.prototype.getName = function() {
    return this.name_
};
goog.debug.Logger.prototype.addHandler = function(a) {
    goog.debug.LOGGING_ENABLED && (goog.debug.Logger.ENABLE_HIERARCHY ? (this.handlers_ || (this.handlers_ = []), this.handlers_.push(a)) : (goog.asserts.assert(!this.name_, "Cannot call addHandler on a non-root logger when goog.debug.Logger.ENABLE_HIERARCHY is false."), goog.debug.Logger.rootHandlers_.push(a)))
};
goog.debug.Logger.prototype.removeHandler = function(a) {
    if (goog.debug.LOGGING_ENABLED) {
        var b = goog.debug.Logger.ENABLE_HIERARCHY ? this.handlers_ : goog.debug.Logger.rootHandlers_;
        return !!b && goog.array.remove(b, a)
    }
    return !1
};
goog.debug.Logger.prototype.getParent = function() {
    return this.parent_
};
goog.debug.Logger.prototype.getChildren = function() {
    this.children_ || (this.children_ = {});
    return this.children_
};
goog.debug.Logger.prototype.setLevel = function(a) {
    goog.debug.LOGGING_ENABLED && (goog.debug.Logger.ENABLE_HIERARCHY ? this.level_ = a : (goog.asserts.assert(!this.name_, "Cannot call setLevel() on a non-root logger when goog.debug.Logger.ENABLE_HIERARCHY is false."), goog.debug.Logger.rootLevel_ = a))
};
goog.debug.Logger.prototype.getLevel = function() {
    return goog.debug.LOGGING_ENABLED ? this.level_ : goog.debug.Logger.Level.OFF
};
goog.debug.Logger.prototype.getEffectiveLevel = function() {
    if (!goog.debug.LOGGING_ENABLED) return goog.debug.Logger.Level.OFF;
    if (!goog.debug.Logger.ENABLE_HIERARCHY) return goog.debug.Logger.rootLevel_;
    if (this.level_) return this.level_;
    if (this.parent_) return this.parent_.getEffectiveLevel();
    goog.asserts.fail("Root logger has no level set.");
    return null
};
goog.debug.Logger.prototype.isLoggable = function(a) {
    return goog.debug.LOGGING_ENABLED && a.value >= this.getEffectiveLevel().value
};
goog.debug.Logger.prototype.log = function(a, b, c) {
    goog.debug.LOGGING_ENABLED && this.isLoggable(a) && (goog.isFunction(b) && (b = b()), this.doLogRecord_(this.getLogRecord(a, b, c)))
};
goog.debug.Logger.prototype.getLogRecord = function(a, b, c) {
    a = goog.debug.LogBuffer.isBufferingEnabled() ? goog.debug.LogBuffer.getInstance().addRecord(a, b, this.name_) : new goog.debug.LogRecord(a, String(b), this.name_);
    c && a.setException(c);
    return a
};
goog.debug.Logger.prototype.shout = function(a, b) {
    goog.debug.LOGGING_ENABLED && this.log(goog.debug.Logger.Level.SHOUT, a, b)
};
goog.debug.Logger.prototype.severe = function(a, b) {
    goog.debug.LOGGING_ENABLED && this.log(goog.debug.Logger.Level.SEVERE, a, b)
};
goog.debug.Logger.prototype.warning = function(a, b) {
    goog.debug.LOGGING_ENABLED && this.log(goog.debug.Logger.Level.WARNING, a, b)
};
goog.debug.Logger.prototype.info = function(a, b) {
    goog.debug.LOGGING_ENABLED && this.log(goog.debug.Logger.Level.INFO, a, b)
};
goog.debug.Logger.prototype.config = function(a, b) {
    goog.debug.LOGGING_ENABLED && this.log(goog.debug.Logger.Level.CONFIG, a, b)
};
goog.debug.Logger.prototype.fine = function(a, b) {
    goog.debug.LOGGING_ENABLED && this.log(goog.debug.Logger.Level.FINE, a, b)
};
goog.debug.Logger.prototype.finer = function(a, b) {
    goog.debug.LOGGING_ENABLED && this.log(goog.debug.Logger.Level.FINER, a, b)
};
goog.debug.Logger.prototype.finest = function(a, b) {
    goog.debug.LOGGING_ENABLED && this.log(goog.debug.Logger.Level.FINEST, a, b)
};
goog.debug.Logger.prototype.logRecord = function(a) {
    goog.debug.LOGGING_ENABLED && this.isLoggable(a.getLevel()) && this.doLogRecord_(a)
};
goog.debug.Logger.prototype.doLogRecord_ = function(a) {
    goog.debug.Logger.logToProfilers("log:" + a.getMessage());
    if (goog.debug.Logger.ENABLE_HIERARCHY)
        for (var b = this; b;) b.callPublish_(a), b = b.getParent();
    else
        for (var b = 0, c; c = goog.debug.Logger.rootHandlers_[b++];) c(a)
};
goog.debug.Logger.prototype.callPublish_ = function(a) {
    if (this.handlers_)
        for (var b = 0, c; c = this.handlers_[b]; b++) c(a)
};
goog.debug.Logger.prototype.setParent_ = function(a) {
    this.parent_ = a
};
goog.debug.Logger.prototype.addChild_ = function(a, b) {
    this.getChildren()[a] = b
};
goog.debug.LogManager = {};
goog.debug.LogManager.loggers_ = {};
goog.debug.LogManager.rootLogger_ = null;
goog.debug.LogManager.initialize = function() {
    goog.debug.LogManager.rootLogger_ || (goog.debug.LogManager.rootLogger_ = new goog.debug.Logger(goog.debug.Logger.ROOT_LOGGER_NAME), goog.debug.LogManager.loggers_[goog.debug.Logger.ROOT_LOGGER_NAME] = goog.debug.LogManager.rootLogger_, goog.debug.LogManager.rootLogger_.setLevel(goog.debug.Logger.Level.CONFIG))
};
goog.debug.LogManager.getLoggers = function() {
    return goog.debug.LogManager.loggers_
};
goog.debug.LogManager.getRoot = function() {
    goog.debug.LogManager.initialize();
    return goog.debug.LogManager.rootLogger_
};
goog.debug.LogManager.getLogger = function(a) {
    goog.debug.LogManager.initialize();
    return goog.debug.LogManager.loggers_[a] || goog.debug.LogManager.createLogger_(a)
};
goog.debug.LogManager.createFunctionForCatchErrors = function(a) {
    return function(b) {
        (a || goog.debug.LogManager.getRoot()).severe("Error: " + b.message + " (" + b.fileName + " @ Line: " + b.line + ")")
    }
};
goog.debug.LogManager.createLogger_ = function(a) {
    var b = new goog.debug.Logger(a);
    if (goog.debug.Logger.ENABLE_HIERARCHY) {
        var c = a.lastIndexOf("."),
            d = a.substr(0, c),
            c = a.substr(c + 1),
            d = goog.debug.LogManager.getLogger(d);
        d.addChild_(c, b);
        b.setParent_(d)
    }
    return goog.debug.LogManager.loggers_[a] = b
};
goog.debug.RelativeTimeProvider = function() {
    this.relativeTimeStart_ = goog.now()
};
goog.debug.RelativeTimeProvider.defaultInstance_ = new goog.debug.RelativeTimeProvider;
goog.debug.RelativeTimeProvider.prototype.set = function(a) {
    this.relativeTimeStart_ = a
};
goog.debug.RelativeTimeProvider.prototype.reset = function() {
    this.set(goog.now())
};
goog.debug.RelativeTimeProvider.prototype.get = function() {
    return this.relativeTimeStart_
};
goog.debug.RelativeTimeProvider.getDefaultInstance = function() {
    return goog.debug.RelativeTimeProvider.defaultInstance_
};
goog.debug.Formatter = function(a) {
    this.prefix_ = a || "";
    this.startTimeProvider_ = goog.debug.RelativeTimeProvider.getDefaultInstance()
};
goog.debug.Formatter.prototype.appendNewline = !0;
goog.debug.Formatter.prototype.showAbsoluteTime = !0;
goog.debug.Formatter.prototype.showRelativeTime = !0;
goog.debug.Formatter.prototype.showLoggerName = !0;
goog.debug.Formatter.prototype.showExceptionText = !1;
goog.debug.Formatter.prototype.showSeverityLevel = !1;
goog.debug.Formatter.prototype.setStartTimeProvider = function(a) {
    this.startTimeProvider_ = a
};
goog.debug.Formatter.prototype.getStartTimeProvider = function() {
    return this.startTimeProvider_
};
goog.debug.Formatter.prototype.resetRelativeTimeStart = function() {
    this.startTimeProvider_.reset()
};
goog.debug.Formatter.getDateTimeStamp_ = function(a) {
    a = new Date(a.getMillis());
    return goog.debug.Formatter.getTwoDigitString_(a.getFullYear() - 2E3) + goog.debug.Formatter.getTwoDigitString_(a.getMonth() + 1) + goog.debug.Formatter.getTwoDigitString_(a.getDate()) + " " + goog.debug.Formatter.getTwoDigitString_(a.getHours()) + ":" + goog.debug.Formatter.getTwoDigitString_(a.getMinutes()) + ":" + goog.debug.Formatter.getTwoDigitString_(a.getSeconds()) + "." + goog.debug.Formatter.getTwoDigitString_(Math.floor(a.getMilliseconds() /
        10))
};
goog.debug.Formatter.getTwoDigitString_ = function(a) {
    return 10 > a ? "0" + a : String(a)
};
goog.debug.Formatter.getRelativeTime_ = function(a, b) {
    var c = (a.getMillis() - b) / 1E3,
        d = c.toFixed(3),
        e = 0;
    if (1 > c) e = 2;
    else
        for (; 100 > c;) e++, c *= 10;
    for (; 0 < e--;) d = " " + d;
    return d
};
goog.debug.HtmlFormatter = function(a) {
    goog.debug.Formatter.call(this, a)
};
goog.inherits(goog.debug.HtmlFormatter, goog.debug.Formatter);
goog.debug.HtmlFormatter.prototype.showExceptionText = !0;
goog.debug.HtmlFormatter.prototype.formatRecord = function(a) {
    return a ? this.formatRecordAsHtml(a).getTypedStringValue() : ""
};
goog.debug.HtmlFormatter.prototype.formatRecordAsHtml = function(a) {
    if (!a) return goog.html.SafeHtml.EMPTY;
    var b;
    switch (a.getLevel().value) {
        case goog.debug.Logger.Level.SHOUT.value:
            b = "dbg-sh";
            break;
        case goog.debug.Logger.Level.SEVERE.value:
            b = "dbg-sev";
            break;
        case goog.debug.Logger.Level.WARNING.value:
            b = "dbg-w";
            break;
        case goog.debug.Logger.Level.INFO.value:
            b = "dbg-i";
            break;
        default:
            b = "dbg-f"
    }
    var c = [];
    c.push(this.prefix_, " ");
    this.showAbsoluteTime && c.push("[", goog.debug.Formatter.getDateTimeStamp_(a), "] ");
    this.showRelativeTime && c.push("[", goog.debug.Formatter.getRelativeTime_(a, this.startTimeProvider_.get()), "s] ");
    this.showLoggerName && c.push("[", a.getLoggerName(), "] ");
    this.showSeverityLevel && c.push("[", a.getLevel().name, "] ");
    var c = goog.html.SafeHtml.htmlEscapePreservingNewlinesAndSpaces(c.join("")),
        d = goog.html.SafeHtml.EMPTY;
    this.showExceptionText && a.getException() && (d = goog.html.SafeHtml.concat(goog.html.SafeHtml.create("br"), goog.debug.exposeExceptionAsHtml(a.getException())));
    a = goog.html.SafeHtml.htmlEscapePreservingNewlinesAndSpaces(a.getMessage());
    b = goog.html.SafeHtml.create("span", {
        "class": b
    }, goog.html.SafeHtml.concat(a, d));
    return this.appendNewline ? goog.html.SafeHtml.concat(c, b, goog.html.SafeHtml.create("br")) : goog.html.SafeHtml.concat(c, b)
};
goog.debug.TextFormatter = function(a) {
    goog.debug.Formatter.call(this, a)
};
goog.inherits(goog.debug.TextFormatter, goog.debug.Formatter);
goog.debug.TextFormatter.prototype.formatRecord = function(a) {
    var b = [];
    b.push(this.prefix_, " ");
    this.showAbsoluteTime && b.push("[", goog.debug.Formatter.getDateTimeStamp_(a), "] ");
    this.showRelativeTime && b.push("[", goog.debug.Formatter.getRelativeTime_(a, this.startTimeProvider_.get()), "s] ");
    this.showLoggerName && b.push("[", a.getLoggerName(), "] ");
    this.showSeverityLevel && b.push("[", a.getLevel().name, "] ");
    b.push(a.getMessage());
    this.showExceptionText && (a = a.getException()) && b.push("\n", a instanceof Error ?
        a.message : a.toString());
    this.appendNewline && b.push("\n");
    return b.join("")
};
goog.debug.TextFormatter.prototype.formatRecordAsHtml = function(a) {
    return goog.html.SafeHtml.htmlEscapePreservingNewlinesAndSpaces(goog.debug.TextFormatter.prototype.formatRecord(a))
};
goog.debug.Console = function() {
    this.publishHandler_ = goog.bind(this.addLogRecord, this);
    this.formatter_ = new goog.debug.TextFormatter;
    this.formatter_.showAbsoluteTime = !1;
    this.formatter_.showExceptionText = !1;
    this.isCapturing_ = this.formatter_.appendNewline = !1;
    this.logBuffer_ = "";
    this.filteredLoggers_ = {}
};
goog.debug.Console.prototype.getFormatter = function() {
    return this.formatter_
};
goog.debug.Console.prototype.setCapturing = function(a) {
    if (a != this.isCapturing_) {
        var b = goog.debug.LogManager.getRoot();
        a ? b.addHandler(this.publishHandler_) : (b.removeHandler(this.publishHandler_), this.logBuffer = "");
        this.isCapturing_ = a
    }
};
goog.debug.Console.prototype.addLogRecord = function(a) {
    if (!this.filteredLoggers_[a.getLoggerName()]) {
        var b = this.formatter_.formatRecord(a),
            c = goog.debug.Console.console_;
        if (c) switch (a.getLevel()) {
            case goog.debug.Logger.Level.SHOUT:
                goog.debug.Console.logToConsole_(c, "info", b);
                break;
            case goog.debug.Logger.Level.SEVERE:
                goog.debug.Console.logToConsole_(c, "error", b);
                break;
            case goog.debug.Logger.Level.WARNING:
                goog.debug.Console.logToConsole_(c, "warn", b);
                break;
            default:
                goog.debug.Console.logToConsole_(c, "debug",
                    b)
        } else this.logBuffer_ += b
    }
};
goog.debug.Console.prototype.addFilter = function(a) {
    this.filteredLoggers_[a] = !0
};
goog.debug.Console.prototype.removeFilter = function(a) {
    delete this.filteredLoggers_[a]
};
goog.debug.Console.instance = null;
goog.debug.Console.console_ = goog.global.console;
goog.debug.Console.setConsole = function(a) {
    goog.debug.Console.console_ = a
};
goog.debug.Console.autoInstall = function() {
    goog.debug.Console.instance || (goog.debug.Console.instance = new goog.debug.Console);
    goog.global.location && -1 != goog.global.location.href.indexOf("Debug=true") && goog.debug.Console.instance.setCapturing(!0)
};
goog.debug.Console.show = function() {
    alert(goog.debug.Console.instance.logBuffer_)
};
goog.debug.Console.logToConsole_ = function(a, b, c) {
    if (a[b]) a[b](c);
    else a.log(c)
};
goog.uri = {};
goog.uri.utils = {};
goog.uri.utils.CharCode_ = {
    AMPERSAND: 38,
    EQUAL: 61,
    HASH: 35,
    QUESTION: 63
};
goog.uri.utils.buildFromEncodedParts = function(a, b, c, d, e, f, g) {
    var h = "";
    a && (h += a + ":");
    c && (h += "//", b && (h += b + "@"), h += c, d && (h += ":" + d));
    e && (h += e);
    f && (h += "?" + f);
    g && (h += "#" + g);
    return h
};
goog.uri.utils.splitRe_ = /^(?:([^:/?#.]+):)?(?:\/\/(?:([^/?#]*)@)?([^/#?]*?)(?::([0-9]+))?(?=[/#?]|$))?([^?#]+)?(?:\?([^#]*))?(?:#(.*))?$/;
goog.uri.utils.ComponentIndex = {
    SCHEME: 1,
    USER_INFO: 2,
    DOMAIN: 3,
    PORT: 4,
    PATH: 5,
    QUERY_DATA: 6,
    FRAGMENT: 7
};
goog.uri.utils.split = function(a) {
    return a.match(goog.uri.utils.splitRe_)
};
goog.uri.utils.decodeIfPossible_ = function(a, b) {
    return a ? b ? decodeURI(a) : decodeURIComponent(a) : a
};
goog.uri.utils.getComponentByIndex_ = function(a, b) {
    return goog.uri.utils.split(b)[a] || null
};
goog.uri.utils.getScheme = function(a) {
    return goog.uri.utils.getComponentByIndex_(goog.uri.utils.ComponentIndex.SCHEME, a)
};
goog.uri.utils.getEffectiveScheme = function(a) {
    a = goog.uri.utils.getScheme(a);
    !a && goog.global.self && goog.global.self.location && (a = goog.global.self.location.protocol, a = a.substr(0, a.length - 1));
    return a ? a.toLowerCase() : ""
};
goog.uri.utils.getUserInfoEncoded = function(a) {
    return goog.uri.utils.getComponentByIndex_(goog.uri.utils.ComponentIndex.USER_INFO, a)
};
goog.uri.utils.getUserInfo = function(a) {
    return goog.uri.utils.decodeIfPossible_(goog.uri.utils.getUserInfoEncoded(a))
};
goog.uri.utils.getDomainEncoded = function(a) {
    return goog.uri.utils.getComponentByIndex_(goog.uri.utils.ComponentIndex.DOMAIN, a)
};
goog.uri.utils.getDomain = function(a) {
    return goog.uri.utils.decodeIfPossible_(goog.uri.utils.getDomainEncoded(a), !0)
};
goog.uri.utils.getPort = function(a) {
    return Number(goog.uri.utils.getComponentByIndex_(goog.uri.utils.ComponentIndex.PORT, a)) || null
};
goog.uri.utils.getPathEncoded = function(a) {
    return goog.uri.utils.getComponentByIndex_(goog.uri.utils.ComponentIndex.PATH, a)
};
goog.uri.utils.getPath = function(a) {
    return goog.uri.utils.decodeIfPossible_(goog.uri.utils.getPathEncoded(a), !0)
};
goog.uri.utils.getQueryData = function(a) {
    return goog.uri.utils.getComponentByIndex_(goog.uri.utils.ComponentIndex.QUERY_DATA, a)
};
goog.uri.utils.getFragmentEncoded = function(a) {
    var b = a.indexOf("#");
    return 0 > b ? null : a.substr(b + 1)
};
goog.uri.utils.setFragmentEncoded = function(a, b) {
    return goog.uri.utils.removeFragment(a) + (b ? "#" + b : "")
};
goog.uri.utils.getFragment = function(a) {
    return goog.uri.utils.decodeIfPossible_(goog.uri.utils.getFragmentEncoded(a))
};
goog.uri.utils.getHost = function(a) {
    a = goog.uri.utils.split(a);
    return goog.uri.utils.buildFromEncodedParts(a[goog.uri.utils.ComponentIndex.SCHEME], a[goog.uri.utils.ComponentIndex.USER_INFO], a[goog.uri.utils.ComponentIndex.DOMAIN], a[goog.uri.utils.ComponentIndex.PORT])
};
goog.uri.utils.getPathAndAfter = function(a) {
    a = goog.uri.utils.split(a);
    return goog.uri.utils.buildFromEncodedParts(null, null, null, null, a[goog.uri.utils.ComponentIndex.PATH], a[goog.uri.utils.ComponentIndex.QUERY_DATA], a[goog.uri.utils.ComponentIndex.FRAGMENT])
};
goog.uri.utils.removeFragment = function(a) {
    var b = a.indexOf("#");
    return 0 > b ? a : a.substr(0, b)
};
goog.uri.utils.haveSameDomain = function(a, b) {
    var c = goog.uri.utils.split(a),
        d = goog.uri.utils.split(b);
    return c[goog.uri.utils.ComponentIndex.DOMAIN] == d[goog.uri.utils.ComponentIndex.DOMAIN] && c[goog.uri.utils.ComponentIndex.SCHEME] == d[goog.uri.utils.ComponentIndex.SCHEME] && c[goog.uri.utils.ComponentIndex.PORT] == d[goog.uri.utils.ComponentIndex.PORT]
};
goog.uri.utils.assertNoFragmentsOrQueries_ = function(a) {
    if (goog.DEBUG && (0 <= a.indexOf("#") || 0 <= a.indexOf("?"))) throw Error("goog.uri.utils: Fragment or query identifiers are not supported: [" + a + "]");
};
goog.uri.utils.parseQueryData = function(a, b) {
    if (a)
        for (var c = a.split("&"), d = 0; d < c.length; d++) {
            var e = c[d].indexOf("="),
                f = null,
                g = null;
            0 <= e ? (f = c[d].substring(0, e), g = c[d].substring(e + 1)) : f = c[d];
            b(f, g ? goog.string.urlDecode(g) : "")
        }
};
goog.uri.utils.appendQueryData_ = function(a) {
    if (a[1]) {
        var b = a[0],
            c = b.indexOf("#");
        0 <= c && (a.push(b.substr(c)), a[0] = b = b.substr(0, c));
        c = b.indexOf("?");
        0 > c ? a[1] = "?" : c == b.length - 1 && (a[1] = void 0)
    }
    return a.join("")
};
goog.uri.utils.appendKeyValuePairs_ = function(a, b, c) {
    if (goog.isArray(b)) {
        goog.asserts.assertArray(b);
        for (var d = 0; d < b.length; d++) goog.uri.utils.appendKeyValuePairs_(a, String(b[d]), c)
    } else null != b && c.push("&", a, "" === b ? "" : "=", goog.string.urlEncode(b))
};
goog.uri.utils.buildQueryDataBuffer_ = function(a, b, c) {
    goog.asserts.assert(0 == Math.max(b.length - (c || 0), 0) % 2, "goog.uri.utils: Key/value lists must be even in length.");
    for (c = c || 0; c < b.length; c += 2) goog.uri.utils.appendKeyValuePairs_(b[c], b[c + 1], a);
    return a
};
goog.uri.utils.buildQueryData = function(a, b) {
    var c = goog.uri.utils.buildQueryDataBuffer_([], a, b);
    c[0] = "";
    return c.join("")
};
goog.uri.utils.buildQueryDataBufferFromMap_ = function(a, b) {
    for (var c in b) goog.uri.utils.appendKeyValuePairs_(c, b[c], a);
    return a
};
goog.uri.utils.buildQueryDataFromMap = function(a) {
    a = goog.uri.utils.buildQueryDataBufferFromMap_([], a);
    a[0] = "";
    return a.join("")
};
goog.uri.utils.appendParams = function(a, b) {
    return goog.uri.utils.appendQueryData_(2 == arguments.length ? goog.uri.utils.buildQueryDataBuffer_([a], arguments[1], 0) : goog.uri.utils.buildQueryDataBuffer_([a], arguments, 1))
};
goog.uri.utils.appendParamsFromMap = function(a, b) {
    return goog.uri.utils.appendQueryData_(goog.uri.utils.buildQueryDataBufferFromMap_([a], b))
};
goog.uri.utils.appendParam = function(a, b, c) {
    a = [a, "&", b];
    goog.isDefAndNotNull(c) && a.push("=", goog.string.urlEncode(c));
    return goog.uri.utils.appendQueryData_(a)
};
goog.uri.utils.findParam_ = function(a, b, c, d) {
    for (var e = c.length; 0 <= (b = a.indexOf(c, b)) && b < d;) {
        var f = a.charCodeAt(b - 1);
        if (f == goog.uri.utils.CharCode_.AMPERSAND || f == goog.uri.utils.CharCode_.QUESTION)
            if (f = a.charCodeAt(b + e), !f || f == goog.uri.utils.CharCode_.EQUAL || f == goog.uri.utils.CharCode_.AMPERSAND || f == goog.uri.utils.CharCode_.HASH) return b;
        b += e + 1
    }
    return -1
};
goog.uri.utils.hashOrEndRe_ = /#|$/;
goog.uri.utils.hasParam = function(a, b) {
    return 0 <= goog.uri.utils.findParam_(a, 0, b, a.search(goog.uri.utils.hashOrEndRe_))
};
goog.uri.utils.getParamValue = function(a, b) {
    var c = a.search(goog.uri.utils.hashOrEndRe_),
        d = goog.uri.utils.findParam_(a, 0, b, c);
    if (0 > d) return null;
    var e = a.indexOf("&", d);
    if (0 > e || e > c) e = c;
    d += b.length + 1;
    return goog.string.urlDecode(a.substr(d, e - d))
};
goog.uri.utils.getParamValues = function(a, b) {
    for (var c = a.search(goog.uri.utils.hashOrEndRe_), d = 0, e, f = []; 0 <= (e = goog.uri.utils.findParam_(a, d, b, c));) {
        d = a.indexOf("&", e);
        if (0 > d || d > c) d = c;
        e += b.length + 1;
        f.push(goog.string.urlDecode(a.substr(e, d - e)))
    }
    return f
};
goog.uri.utils.trailingQueryPunctuationRe_ = /[?&]($|#)/;
goog.uri.utils.removeParam = function(a, b) {
    for (var c = a.search(goog.uri.utils.hashOrEndRe_), d = 0, e, f = []; 0 <= (e = goog.uri.utils.findParam_(a, d, b, c));) f.push(a.substring(d, e)), d = Math.min(a.indexOf("&", e) + 1 || c, c);
    f.push(a.substr(d));
    return f.join("").replace(goog.uri.utils.trailingQueryPunctuationRe_, "$1")
};
goog.uri.utils.setParam = function(a, b, c) {
    return goog.uri.utils.appendParam(goog.uri.utils.removeParam(a, b), b, c)
};
goog.uri.utils.appendPath = function(a, b) {
    goog.uri.utils.assertNoFragmentsOrQueries_(a);
    goog.string.endsWith(a, "/") && (a = a.substr(0, a.length - 1));
    goog.string.startsWith(b, "/") && (b = b.substr(1));
    return goog.string.buildString(a, "/", b)
};
goog.uri.utils.setPath = function(a, b) {
    goog.string.startsWith(b, "/") || (b = "/" + b);
    var c = goog.uri.utils.split(a);
    return goog.uri.utils.buildFromEncodedParts(c[goog.uri.utils.ComponentIndex.SCHEME], c[goog.uri.utils.ComponentIndex.USER_INFO], c[goog.uri.utils.ComponentIndex.DOMAIN], c[goog.uri.utils.ComponentIndex.PORT], b, c[goog.uri.utils.ComponentIndex.QUERY_DATA], c[goog.uri.utils.ComponentIndex.FRAGMENT])
};
goog.uri.utils.StandardQueryParam = {
    RANDOM: "zx"
};
goog.uri.utils.makeUnique = function(a) {
    return goog.uri.utils.setParam(a, goog.uri.utils.StandardQueryParam.RANDOM, goog.string.getRandomString())
};
goog.Uri = function(a, b) {
    this.domain_ = this.userInfo_ = this.scheme_ = "";
    this.port_ = null;
    this.fragment_ = this.path_ = "";
    this.ignoreCase_ = this.isReadOnly_ = !1;
    var c;
    a instanceof goog.Uri ? (this.ignoreCase_ = goog.isDef(b) ? b : a.getIgnoreCase(), this.setScheme(a.getScheme()), this.setUserInfo(a.getUserInfo()), this.setDomain(a.getDomain()), this.setPort(a.getPort()), this.setPath(a.getPath()), this.setQueryData(a.getQueryData().clone()), this.setFragment(a.getFragment())) : a && (c = goog.uri.utils.split(String(a))) ? (this.ignoreCase_ = !!b, this.setScheme(c[goog.uri.utils.ComponentIndex.SCHEME] || "", !0), this.setUserInfo(c[goog.uri.utils.ComponentIndex.USER_INFO] || "", !0), this.setDomain(c[goog.uri.utils.ComponentIndex.DOMAIN] || "", !0), this.setPort(c[goog.uri.utils.ComponentIndex.PORT]), this.setPath(c[goog.uri.utils.ComponentIndex.PATH] || "", !0), this.setQueryData(c[goog.uri.utils.ComponentIndex.QUERY_DATA] || "", !0), this.setFragment(c[goog.uri.utils.ComponentIndex.FRAGMENT] || "", !0)) : (this.ignoreCase_ = !!b, this.queryData_ = new goog.Uri.QueryData(null,
        null, this.ignoreCase_))
};
goog.Uri.preserveParameterTypesCompatibilityFlag = !1;
goog.Uri.RANDOM_PARAM = goog.uri.utils.StandardQueryParam.RANDOM;
goog.Uri.prototype.toString = function() {
    var a = [],
        b = this.getScheme();
    b && a.push(goog.Uri.encodeSpecialChars_(b, goog.Uri.reDisallowedInSchemeOrUserInfo_, !0), ":");
    var c = this.getDomain();
    if (c || "file" == b) a.push("//"), (b = this.getUserInfo()) && a.push(goog.Uri.encodeSpecialChars_(b, goog.Uri.reDisallowedInSchemeOrUserInfo_, !0), "@"), a.push(goog.Uri.removeDoubleEncoding_(goog.string.urlEncode(c))), c = this.getPort(), null != c && a.push(":", String(c));
    if (c = this.getPath()) this.hasDomain() && "/" != c.charAt(0) && a.push("/"),
        a.push(goog.Uri.encodeSpecialChars_(c, "/" == c.charAt(0) ? goog.Uri.reDisallowedInAbsolutePath_ : goog.Uri.reDisallowedInRelativePath_, !0));
    (c = this.getEncodedQuery()) && a.push("?", c);
    (c = this.getFragment()) && a.push("#", goog.Uri.encodeSpecialChars_(c, goog.Uri.reDisallowedInFragment_));
    return a.join("")
};
goog.Uri.prototype.resolve = function(a) {
    var b = this.clone(),
        c = a.hasScheme();
    c ? b.setScheme(a.getScheme()) : c = a.hasUserInfo();
    c ? b.setUserInfo(a.getUserInfo()) : c = a.hasDomain();
    c ? b.setDomain(a.getDomain()) : c = a.hasPort();
    var d = a.getPath();
    if (c) b.setPort(a.getPort());
    else if (c = a.hasPath()) {
        if ("/" != d.charAt(0))
            if (this.hasDomain() && !this.hasPath()) d = "/" + d;
            else {
                var e = b.getPath().lastIndexOf("/"); - 1 != e && (d = b.getPath().substr(0, e + 1) + d)
            } d = goog.Uri.removeDotSegments(d)
    }
    c ? b.setPath(d) : c = a.hasQuery();
    c ? b.setQueryData(a.getDecodedQuery()) :
        c = a.hasFragment();
    c && b.setFragment(a.getFragment());
    return b
};
goog.Uri.prototype.clone = function() {
    return new goog.Uri(this)
};
goog.Uri.prototype.getScheme = function() {
    return this.scheme_
};
goog.Uri.prototype.setScheme = function(a, b) {
    this.enforceReadOnly();
    if (this.scheme_ = b ? goog.Uri.decodeOrEmpty_(a, !0) : a) this.scheme_ = this.scheme_.replace(/:$/, "");
    return this
};
goog.Uri.prototype.hasScheme = function() {
    return !!this.scheme_
};
goog.Uri.prototype.getUserInfo = function() {
    return this.userInfo_
};
goog.Uri.prototype.setUserInfo = function(a, b) {
    this.enforceReadOnly();
    this.userInfo_ = b ? goog.Uri.decodeOrEmpty_(a) : a;
    return this
};
goog.Uri.prototype.hasUserInfo = function() {
    return !!this.userInfo_
};
goog.Uri.prototype.getDomain = function() {
    return this.domain_
};
goog.Uri.prototype.setDomain = function(a, b) {
    this.enforceReadOnly();
    this.domain_ = b ? goog.Uri.decodeOrEmpty_(a, !0) : a;
    return this
};
goog.Uri.prototype.hasDomain = function() {
    return !!this.domain_
};
goog.Uri.prototype.getPort = function() {
    return this.port_
};
goog.Uri.prototype.setPort = function(a) {
    this.enforceReadOnly();
    if (a) {
        a = Number(a);
        if (isNaN(a) || 0 > a) throw Error("Bad port number " + a);
        this.port_ = a
    } else this.port_ = null;
    return this
};
goog.Uri.prototype.hasPort = function() {
    return null != this.port_
};
goog.Uri.prototype.getPath = function() {
    return this.path_
};
goog.Uri.prototype.setPath = function(a, b) {
    this.enforceReadOnly();
    this.path_ = b ? goog.Uri.decodeOrEmpty_(a, !0) : a;
    return this
};
goog.Uri.prototype.hasPath = function() {
    return !!this.path_
};
goog.Uri.prototype.hasQuery = function() {
    return "" !== this.queryData_.toString()
};
goog.Uri.prototype.setQueryData = function(a, b) {
    this.enforceReadOnly();
    a instanceof goog.Uri.QueryData ? (this.queryData_ = a, this.queryData_.setIgnoreCase(this.ignoreCase_)) : (b || (a = goog.Uri.encodeSpecialChars_(a, goog.Uri.reDisallowedInQuery_)), this.queryData_ = new goog.Uri.QueryData(a, null, this.ignoreCase_));
    return this
};
goog.Uri.prototype.setQuery = function(a, b) {
    return this.setQueryData(a, b)
};
goog.Uri.prototype.getEncodedQuery = function() {
    return this.queryData_.toString()
};
goog.Uri.prototype.getDecodedQuery = function() {
    return this.queryData_.toDecodedString()
};
goog.Uri.prototype.getQueryData = function() {
    return this.queryData_
};
goog.Uri.prototype.getQuery = function() {
    return this.getEncodedQuery()
};
goog.Uri.prototype.setParameterValue = function(a, b) {
    this.enforceReadOnly();
    this.queryData_.set(a, b);
    return this
};
goog.Uri.prototype.setParameterValues = function(a, b) {
    this.enforceReadOnly();
    goog.isArray(b) || (b = [String(b)]);
    this.queryData_.setValues(a, b);
    return this
};
goog.Uri.prototype.getParameterValues = function(a) {
    return this.queryData_.getValues(a)
};
goog.Uri.prototype.getParameterValue = function(a) {
    return this.queryData_.get(a)
};
goog.Uri.prototype.getFragment = function() {
    return this.fragment_
};
goog.Uri.prototype.setFragment = function(a, b) {
    this.enforceReadOnly();
    this.fragment_ = b ? goog.Uri.decodeOrEmpty_(a) : a;
    return this
};
goog.Uri.prototype.hasFragment = function() {
    return !!this.fragment_
};
goog.Uri.prototype.hasSameDomainAs = function(a) {
    return (!this.hasDomain() && !a.hasDomain() || this.getDomain() == a.getDomain()) && (!this.hasPort() && !a.hasPort() || this.getPort() == a.getPort())
};
goog.Uri.prototype.makeUnique = function() {
    this.enforceReadOnly();
    this.setParameterValue(goog.Uri.RANDOM_PARAM, goog.string.getRandomString());
    return this
};
goog.Uri.prototype.removeParameter = function(a) {
    this.enforceReadOnly();
    this.queryData_.remove(a);
    return this
};
goog.Uri.prototype.setReadOnly = function(a) {
    this.isReadOnly_ = a;
    return this
};
goog.Uri.prototype.isReadOnly = function() {
    return this.isReadOnly_
};
goog.Uri.prototype.enforceReadOnly = function() {
    if (this.isReadOnly_) throw Error("Tried to modify a read-only Uri");
};
goog.Uri.prototype.setIgnoreCase = function(a) {
    this.ignoreCase_ = a;
    this.queryData_ && this.queryData_.setIgnoreCase(a);
    return this
};
goog.Uri.prototype.getIgnoreCase = function() {
    return this.ignoreCase_
};
goog.Uri.parse = function(a, b) {
    return a instanceof goog.Uri ? a.clone() : new goog.Uri(a, b)
};
goog.Uri.create = function(a, b, c, d, e, f, g, h) {
    h = new goog.Uri(null, h);
    a && h.setScheme(a);
    b && h.setUserInfo(b);
    c && h.setDomain(c);
    d && h.setPort(d);
    e && h.setPath(e);
    f && h.setQueryData(f);
    g && h.setFragment(g);
    return h
};
goog.Uri.resolve = function(a, b) {
    a instanceof goog.Uri || (a = goog.Uri.parse(a));
    b instanceof goog.Uri || (b = goog.Uri.parse(b));
    return a.resolve(b)
};
goog.Uri.removeDotSegments = function(a) {
    if (".." == a || "." == a) return "";
    if (goog.string.contains(a, "./") || goog.string.contains(a, "/.")) {
        var b = goog.string.startsWith(a, "/");
        a = a.split("/");
        for (var c = [], d = 0; d < a.length;) {
            var e = a[d++];
            "." == e ? b && d == a.length && c.push("") : ".." == e ? ((1 < c.length || 1 == c.length && "" != c[0]) && c.pop(), b && d == a.length && c.push("")) : (c.push(e), b = !0)
        }
        return c.join("/")
    }
    return a
};
goog.Uri.decodeOrEmpty_ = function(a, b) {
    return a ? b ? decodeURI(a.replace(/%25/g, "%2525")) : decodeURIComponent(a) : ""
};
goog.Uri.encodeSpecialChars_ = function(a, b, c) {
    return goog.isString(a) ? (a = encodeURI(a).replace(b, goog.Uri.encodeChar_), c && (a = goog.Uri.removeDoubleEncoding_(a)), a) : null
};
goog.Uri.encodeChar_ = function(a) {
    a = a.charCodeAt(0);
    return "%" + (a >> 4 & 15).toString(16) + (a & 15).toString(16)
};
goog.Uri.removeDoubleEncoding_ = function(a) {
    return a.replace(/%25([0-9a-fA-F]{2})/g, "%$1")
};
goog.Uri.reDisallowedInSchemeOrUserInfo_ = /[#\/\?@]/g;
goog.Uri.reDisallowedInRelativePath_ = /[\#\?:]/g;
goog.Uri.reDisallowedInAbsolutePath_ = /[\#\?]/g;
goog.Uri.reDisallowedInQuery_ = /[\#\?@]/g;
goog.Uri.reDisallowedInFragment_ = /#/g;
goog.Uri.haveSameDomain = function(a, b) {
    var c = goog.uri.utils.split(a),
        d = goog.uri.utils.split(b);
    return c[goog.uri.utils.ComponentIndex.DOMAIN] == d[goog.uri.utils.ComponentIndex.DOMAIN] && c[goog.uri.utils.ComponentIndex.PORT] == d[goog.uri.utils.ComponentIndex.PORT]
};
goog.Uri.QueryData = function(a, b, c) {
    this.count_ = this.keyMap_ = null;
    this.encodedQuery_ = a || null;
    this.ignoreCase_ = !!c
};
goog.Uri.QueryData.prototype.ensureKeyMapInitialized_ = function() {
    if (!this.keyMap_ && (this.keyMap_ = new goog.structs.Map, this.count_ = 0, this.encodedQuery_)) {
        var a = this;
        goog.uri.utils.parseQueryData(this.encodedQuery_, function(b, c) {
            a.add(goog.string.urlDecode(b), c)
        })
    }
};
goog.Uri.QueryData.createFromMap = function(a, b, c) {
    b = goog.structs.getKeys(a);
    if ("undefined" == typeof b) throw Error("Keys are undefined");
    c = new goog.Uri.QueryData(null, null, c);
    a = goog.structs.getValues(a);
    for (var d = 0; d < b.length; d++) {
        var e = b[d],
            f = a[d];
        goog.isArray(f) ? c.setValues(e, f) : c.add(e, f)
    }
    return c
};
goog.Uri.QueryData.createFromKeysValues = function(a, b, c, d) {
    if (a.length != b.length) throw Error("Mismatched lengths for keys/values");
    c = new goog.Uri.QueryData(null, null, d);
    for (d = 0; d < a.length; d++) c.add(a[d], b[d]);
    return c
};
goog.Uri.QueryData.prototype.getCount = function() {
    this.ensureKeyMapInitialized_();
    return this.count_
};
goog.Uri.QueryData.prototype.add = function(a, b) {
    this.ensureKeyMapInitialized_();
    this.invalidateCache_();
    a = this.getKeyName_(a);
    var c = this.keyMap_.get(a);
    c || this.keyMap_.set(a, c = []);
    c.push(b);
    this.count_++;
    return this
};
goog.Uri.QueryData.prototype.remove = function(a) {
    this.ensureKeyMapInitialized_();
    a = this.getKeyName_(a);
    return this.keyMap_.containsKey(a) ? (this.invalidateCache_(), this.count_ -= this.keyMap_.get(a).length, this.keyMap_.remove(a)) : !1
};
goog.Uri.QueryData.prototype.clear = function() {
    this.invalidateCache_();
    this.keyMap_ = null;
    this.count_ = 0
};
goog.Uri.QueryData.prototype.isEmpty = function() {
    this.ensureKeyMapInitialized_();
    return 0 == this.count_
};
goog.Uri.QueryData.prototype.containsKey = function(a) {
    this.ensureKeyMapInitialized_();
    a = this.getKeyName_(a);
    return this.keyMap_.containsKey(a)
};
goog.Uri.QueryData.prototype.containsValue = function(a) {
    var b = this.getValues();
    return goog.array.contains(b, a)
};
goog.Uri.QueryData.prototype.getKeys = function() {
    this.ensureKeyMapInitialized_();
    for (var a = this.keyMap_.getValues(), b = this.keyMap_.getKeys(), c = [], d = 0; d < b.length; d++)
        for (var e = a[d], f = 0; f < e.length; f++) c.push(b[d]);
    return c
};
goog.Uri.QueryData.prototype.getValues = function(a) {
    this.ensureKeyMapInitialized_();
    var b = [];
    if (goog.isString(a)) this.containsKey(a) && (b = goog.array.concat(b, this.keyMap_.get(this.getKeyName_(a))));
    else {
        a = this.keyMap_.getValues();
        for (var c = 0; c < a.length; c++) b = goog.array.concat(b, a[c])
    }
    return b
};
goog.Uri.QueryData.prototype.set = function(a, b) {
    this.ensureKeyMapInitialized_();
    this.invalidateCache_();
    a = this.getKeyName_(a);
    this.containsKey(a) && (this.count_ -= this.keyMap_.get(a).length);
    this.keyMap_.set(a, [b]);
    this.count_++;
    return this
};
goog.Uri.QueryData.prototype.get = function(a, b) {
    var c = a ? this.getValues(a) : [];
    return goog.Uri.preserveParameterTypesCompatibilityFlag ? 0 < c.length ? c[0] : b : 0 < c.length ? String(c[0]) : b
};
goog.Uri.QueryData.prototype.setValues = function(a, b) {
    this.remove(a);
    0 < b.length && (this.invalidateCache_(), this.keyMap_.set(this.getKeyName_(a), goog.array.clone(b)), this.count_ += b.length)
};
goog.Uri.QueryData.prototype.toString = function() {
    if (this.encodedQuery_) return this.encodedQuery_;
    if (!this.keyMap_) return "";
    for (var a = [], b = this.keyMap_.getKeys(), c = 0; c < b.length; c++)
        for (var d = b[c], e = goog.string.urlEncode(d), d = this.getValues(d), f = 0; f < d.length; f++) {
            var g = e;
            "" !== d[f] && (g += "=" + goog.string.urlEncode(d[f]));
            a.push(g)
        }
    return this.encodedQuery_ = a.join("&")
};
goog.Uri.QueryData.prototype.toDecodedString = function() {
    return goog.Uri.decodeOrEmpty_(this.toString())
};
goog.Uri.QueryData.prototype.invalidateCache_ = function() {
    this.encodedQuery_ = null
};
goog.Uri.QueryData.prototype.filterKeys = function(a) {
    this.ensureKeyMapInitialized_();
    this.keyMap_.forEach(function(b, c) {
        goog.array.contains(a, c) || this.remove(c)
    }, this);
    return this
};
goog.Uri.QueryData.prototype.clone = function() {
    var a = new goog.Uri.QueryData;
    a.encodedQuery_ = this.encodedQuery_;
    this.keyMap_ && (a.keyMap_ = this.keyMap_.clone(), a.count_ = this.count_);
    return a
};
goog.Uri.QueryData.prototype.getKeyName_ = function(a) {
    a = String(a);
    this.ignoreCase_ && (a = a.toLowerCase());
    return a
};
goog.Uri.QueryData.prototype.setIgnoreCase = function(a) {
    a && !this.ignoreCase_ && (this.ensureKeyMapInitialized_(), this.invalidateCache_(), this.keyMap_.forEach(function(a, c) {
        var d = c.toLowerCase();
        c != d && (this.remove(c), this.setValues(d, a))
    }, this));
    this.ignoreCase_ = a
};
goog.Uri.QueryData.prototype.extend = function(a) {
    for (var b = 0; b < arguments.length; b++) goog.structs.forEach(arguments[b], function(a, b) {
        this.add(b, a)
    }, this)
};
/*

 Copyright 2016 Google Inc. All rights reserved.
 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

   http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.

 @fileoverview Collection of popular sites/CDNs hosting Angular.
 @author lwe@google.com (Lukas Weichselbaum)
*/
csp.whitelistBypasses = {};
csp.whitelistBypasses.angular = {};
csp.whitelistBypasses.angular.URLS = goog.array.map("//gstatic.com/fsn/angular_js-bundle1.js //www.gstatic.com/fsn/angular_js-bundle1.js //www.googleadservices.com/pageadimg/imgad //yandex.st/angularjs/1.2.16/angular-cookies.min.js //yastatic.net/angularjs/1.2.23/angular.min.js //yuedust.yuedu.126.net/js/components/angular/angular.js //art.jobs.netease.com/script/angular.js //csu-c45.kxcdn.com/angular/angular.js //elysiumwebsite.s3.amazonaws.com/uploads/blog-media/rockstar/angular.min.js //inno.blob.core.windows.net/new/libs/AngularJS/1.2.1/angular.min.js //gift-talk.kakao.com/public/javascripts/angular.min.js //ajax.googleapis.com/ajax/libs/angularjs/1.2.0rc1/angular-route.min.js //master-sumok.ru/vendors/angular/angular-cookies.js //ayicommon-a.akamaihd.net/static/vendor/angular-1.4.2.min.js //pangxiehaitao.com/framework/angular-1.3.9/angular-animate.min.js //cdnjs.cloudflare.com/ajax/libs/angular.js/1.2.16/angular.min.js //96fe3ee995e96e922b6b-d10c35bd0a0de2c718b252bc575fdb73.ssl.cf1.rackcdn.com/angular.js //oss.maxcdn.com/angularjs/1.2.20/angular.min.js //reports.zemanta.com/smedia/common/angularjs/1.2.11/angular.js //cdn.shopify.com/s/files/1/0225/6463/t/1/assets/angular-animate.min.js //parademanagement.com.s3-website-ap-southeast-1.amazonaws.com/js/angular.min.js //cdn.jsdelivr.net/angularjs/1.1.2/angular.min.js //eb2883ede55c53e09fd5-9c145fb03d93709ea57875d307e2d82e.ssl.cf3.rackcdn.com/components/angular-resource.min.js //andors-trail.googlecode.com/git/AndorsTrailEdit/lib/angular.min.js //cdn.walkme.com/General/EnvironmentTests/angular/angular.min.js //laundrymail.com/angular/angular.js //s3-eu-west-1.amazonaws.com/staticancpa/js/angular-cookies.min.js //collade.demo.stswp.com/js/vendor/angular.min.js //mrfishie.github.io/sailor/bower_components/angular/angular.min.js //askgithub.com/static/js/angular.min.js //services.amazon.com/solution-providers/assets/vendor/angular-cookies.min.js //raw.githubusercontent.com/angular/code.angularjs.org/master/1.0.7/angular-resource.js //prb-resume.appspot.com/bower_components/angular-animate/angular-animate.js //dl.dropboxusercontent.com/u/30877786/angular.min.js //static.tumblr.com/x5qdx0r/nPOnngtff/angular-resource.min_1_.js //storage.googleapis.com/assets-prod.urbansitter.net/us-sym/assets/vendor/angular-sanitize/angular-sanitize.min.js //twitter.github.io/labella.js/bower_components/angular/angular.min.js //cdn2-casinoroom.global.ssl.fastly.net/js/lib/angular-animate.min.js //www.adobe.com/devnet-apps/flashshowcase/lib/angular/angular.1.1.5.min.js //eternal-sunset.herokuapp.com/bower_components/angular/angular.js //cdn.bootcss.com/angular.js/1.2.0/angular.min.js".split(" "), function(a) {
    return new goog.Uri(a)
});
goog.math.Integer = function(a, b) {
    this.bits_ = [];
    this.sign_ = b;
    for (var c = !0, d = a.length - 1; 0 <= d; d--) {
        var e = a[d] | 0;
        c && e == b || (this.bits_[d] = e, c = !1)
    }
};
goog.math.Integer.IntCache_ = {};
goog.math.Integer.fromInt = function(a) {
    if (-128 <= a && 128 > a) {
        var b = goog.math.Integer.IntCache_[a];
        if (b) return b
    }
    b = new goog.math.Integer([a | 0], 0 > a ? -1 : 0); - 128 <= a && 128 > a && (goog.math.Integer.IntCache_[a] = b);
    return b
};
goog.math.Integer.fromNumber = function(a) {
    if (isNaN(a) || !isFinite(a)) return goog.math.Integer.ZERO;
    if (0 > a) return goog.math.Integer.fromNumber(-a).negate();
    for (var b = [], c = 1, d = 0; a >= c; d++) b[d] = a / c | 0, c *= goog.math.Integer.TWO_PWR_32_DBL_;
    return new goog.math.Integer(b, 0)
};
goog.math.Integer.fromBits = function(a) {
    return new goog.math.Integer(a, a[a.length - 1] & -2147483648 ? -1 : 0)
};
goog.math.Integer.fromString = function(a, b) {
    if (0 == a.length) throw Error("number format error: empty string");
    var c = b || 10;
    if (2 > c || 36 < c) throw Error("radix out of range: " + c);
    if ("-" == a.charAt(0)) return goog.math.Integer.fromString(a.substring(1), c).negate();
    if (0 <= a.indexOf("-")) throw Error('number format error: interior "-" character');
    for (var d = goog.math.Integer.fromNumber(Math.pow(c, 8)), e = goog.math.Integer.ZERO, f = 0; f < a.length; f += 8) {
        var g = Math.min(8, a.length - f),
            h = parseInt(a.substring(f, f + g), c);
        8 > g ? (g =
            goog.math.Integer.fromNumber(Math.pow(c, g)), e = e.multiply(g).add(goog.math.Integer.fromNumber(h))) : (e = e.multiply(d), e = e.add(goog.math.Integer.fromNumber(h)))
    }
    return e
};
goog.math.Integer.TWO_PWR_32_DBL_ = 4294967296;
goog.math.Integer.ZERO = goog.math.Integer.fromInt(0);
goog.math.Integer.ONE = goog.math.Integer.fromInt(1);
goog.math.Integer.TWO_PWR_24_ = goog.math.Integer.fromInt(16777216);
goog.math.Integer.prototype.toInt = function() {
    return 0 < this.bits_.length ? this.bits_[0] : this.sign_
};
goog.math.Integer.prototype.toNumber = function() {
    if (this.isNegative()) return -this.negate().toNumber();
    for (var a = 0, b = 1, c = 0; c < this.bits_.length; c++) a += this.getBitsUnsigned(c) * b, b *= goog.math.Integer.TWO_PWR_32_DBL_;
    return a
};
goog.math.Integer.prototype.toString = function(a) {
    a = a || 10;
    if (2 > a || 36 < a) throw Error("radix out of range: " + a);
    if (this.isZero()) return "0";
    if (this.isNegative()) return "-" + this.negate().toString(a);
    for (var b = goog.math.Integer.fromNumber(Math.pow(a, 6)), c = this, d = "";;) {
        var e = c.divide(b),
            f = (c.subtract(e.multiply(b)).toInt() >>> 0).toString(a),
            c = e;
        if (c.isZero()) return f + d;
        for (; 6 > f.length;) f = "0" + f;
        d = "" + f + d
    }
};
goog.math.Integer.prototype.getBits = function(a) {
    return 0 > a ? 0 : a < this.bits_.length ? this.bits_[a] : this.sign_
};
goog.math.Integer.prototype.getBitsUnsigned = function(a) {
    a = this.getBits(a);
    return 0 <= a ? a : goog.math.Integer.TWO_PWR_32_DBL_ + a
};
goog.math.Integer.prototype.getSign = function() {
    return this.sign_
};
goog.math.Integer.prototype.isZero = function() {
    if (0 != this.sign_) return !1;
    for (var a = 0; a < this.bits_.length; a++)
        if (0 != this.bits_[a]) return !1;
    return !0
};
goog.math.Integer.prototype.isNegative = function() {
    return -1 == this.sign_
};
goog.math.Integer.prototype.isOdd = function() {
    return 0 == this.bits_.length && -1 == this.sign_ || 0 < this.bits_.length && 0 != (this.bits_[0] & 1)
};
goog.math.Integer.prototype.equals = function(a) {
    if (this.sign_ != a.sign_) return !1;
    for (var b = Math.max(this.bits_.length, a.bits_.length), c = 0; c < b; c++)
        if (this.getBits(c) != a.getBits(c)) return !1;
    return !0
};
goog.math.Integer.prototype.notEquals = function(a) {
    return !this.equals(a)
};
goog.math.Integer.prototype.greaterThan = function(a) {
    return 0 < this.compare(a)
};
goog.math.Integer.prototype.greaterThanOrEqual = function(a) {
    return 0 <= this.compare(a)
};
goog.math.Integer.prototype.lessThan = function(a) {
    return 0 > this.compare(a)
};
goog.math.Integer.prototype.lessThanOrEqual = function(a) {
    return 0 >= this.compare(a)
};
goog.math.Integer.prototype.compare = function(a) {
    a = this.subtract(a);
    return a.isNegative() ? -1 : a.isZero() ? 0 : 1
};
goog.math.Integer.prototype.shorten = function(a) {
    var b = a - 1 >> 5;
    a = (a - 1) % 32;
    for (var c = [], d = 0; d < b; d++) c[d] = this.getBits(d);
    var d = 31 == a ? 4294967295 : (1 << a + 1) - 1,
        e = this.getBits(b) & d;
    if (e & 1 << a) return c[b] = e | 4294967295 - d, new goog.math.Integer(c, -1);
    c[b] = e;
    return new goog.math.Integer(c, 0)
};
goog.math.Integer.prototype.negate = function() {
    return this.not().add(goog.math.Integer.ONE)
};
goog.math.Integer.prototype.add = function(a) {
    for (var b = Math.max(this.bits_.length, a.bits_.length), c = [], d = 0, e = 0; e <= b; e++) {
        var f = this.getBits(e) >>> 16,
            g = this.getBits(e) & 65535,
            h = a.getBits(e) >>> 16,
            k = a.getBits(e) & 65535,
            g = d + g + k,
            f = (g >>> 16) + f + h,
            d = f >>> 16,
            g = g & 65535,
            f = f & 65535;
        c[e] = f << 16 | g
    }
    return goog.math.Integer.fromBits(c)
};
goog.math.Integer.prototype.subtract = function(a) {
    return this.add(a.negate())
};
goog.math.Integer.prototype.multiply = function(a) {
    if (this.isZero() || a.isZero()) return goog.math.Integer.ZERO;
    if (this.isNegative()) return a.isNegative() ? this.negate().multiply(a.negate()) : this.negate().multiply(a).negate();
    if (a.isNegative()) return this.multiply(a.negate()).negate();
    if (this.lessThan(goog.math.Integer.TWO_PWR_24_) && a.lessThan(goog.math.Integer.TWO_PWR_24_)) return goog.math.Integer.fromNumber(this.toNumber() * a.toNumber());
    for (var b = this.bits_.length + a.bits_.length, c = [], d = 0; d < 2 * b; d++) c[d] =
        0;
    for (d = 0; d < this.bits_.length; d++)
        for (var e = 0; e < a.bits_.length; e++) {
            var f = this.getBits(d) >>> 16,
                g = this.getBits(d) & 65535,
                h = a.getBits(e) >>> 16,
                k = a.getBits(e) & 65535;
            c[2 * d + 2 * e] += g * k;
            goog.math.Integer.carry16_(c, 2 * d + 2 * e);
            c[2 * d + 2 * e + 1] += f * k;
            goog.math.Integer.carry16_(c, 2 * d + 2 * e + 1);
            c[2 * d + 2 * e + 1] += g * h;
            goog.math.Integer.carry16_(c, 2 * d + 2 * e + 1);
            c[2 * d + 2 * e + 2] += f * h;
            goog.math.Integer.carry16_(c, 2 * d + 2 * e + 2)
        }
    for (d = 0; d < b; d++) c[d] = c[2 * d + 1] << 16 | c[2 * d];
    for (d = b; d < 2 * b; d++) c[d] = 0;
    return new goog.math.Integer(c, 0)
};
goog.math.Integer.carry16_ = function(a, b) {
    for (;
        (a[b] & 65535) != a[b];) a[b + 1] += a[b] >>> 16, a[b] &= 65535
};
goog.math.Integer.prototype.slowDivide_ = function(a) {
    if (this.isNegative() || a.isNegative()) throw Error("slowDivide_ only works with positive integers.");
    for (var b = goog.math.Integer.ONE; a.lessThanOrEqual(this);) b = b.shiftLeft(1), a = a.shiftLeft(1);
    var c = b.shiftRight(1),
        d = a.shiftRight(1),
        e;
    a = a.shiftRight(2);
    for (b = b.shiftRight(2); !a.isZero();) e = d.add(a), e.lessThanOrEqual(this) && (c = c.add(b), d = e), a = a.shiftRight(1), b = b.shiftRight(1);
    return c
};
goog.math.Integer.prototype.divide = function(a) {
    if (a.isZero()) throw Error("division by zero");
    if (this.isZero()) return goog.math.Integer.ZERO;
    if (this.isNegative()) return a.isNegative() ? this.negate().divide(a.negate()) : this.negate().divide(a).negate();
    if (a.isNegative()) return this.divide(a.negate()).negate();
    if (30 < this.bits_.length) return this.slowDivide_(a);
    for (var b = goog.math.Integer.ZERO, c = this; c.greaterThanOrEqual(a);) {
        for (var d = Math.max(1, Math.floor(c.toNumber() / a.toNumber())), e = Math.ceil(Math.log(d) /
                Math.LN2), e = 48 >= e ? 1 : Math.pow(2, e - 48), f = goog.math.Integer.fromNumber(d), g = f.multiply(a); g.isNegative() || g.greaterThan(c);) d -= e, f = goog.math.Integer.fromNumber(d), g = f.multiply(a);
        f.isZero() && (f = goog.math.Integer.ONE);
        b = b.add(f);
        c = c.subtract(g)
    }
    return b
};
goog.math.Integer.prototype.modulo = function(a) {
    return this.subtract(this.divide(a).multiply(a))
};
goog.math.Integer.prototype.not = function() {
    for (var a = this.bits_.length, b = [], c = 0; c < a; c++) b[c] = ~this.bits_[c];
    return new goog.math.Integer(b, ~this.sign_)
};
goog.math.Integer.prototype.and = function(a) {
    for (var b = Math.max(this.bits_.length, a.bits_.length), c = [], d = 0; d < b; d++) c[d] = this.getBits(d) & a.getBits(d);
    return new goog.math.Integer(c, this.sign_ & a.sign_)
};
goog.math.Integer.prototype.or = function(a) {
    for (var b = Math.max(this.bits_.length, a.bits_.length), c = [], d = 0; d < b; d++) c[d] = this.getBits(d) | a.getBits(d);
    return new goog.math.Integer(c, this.sign_ | a.sign_)
};
goog.math.Integer.prototype.xor = function(a) {
    for (var b = Math.max(this.bits_.length, a.bits_.length), c = [], d = 0; d < b; d++) c[d] = this.getBits(d) ^ a.getBits(d);
    return new goog.math.Integer(c, this.sign_ ^ a.sign_)
};
goog.math.Integer.prototype.shiftLeft = function(a) {
    var b = a >> 5;
    a %= 32;
    for (var c = this.bits_.length + b + (0 < a ? 1 : 0), d = [], e = 0; e < c; e++) d[e] = 0 < a ? this.getBits(e - b) << a | this.getBits(e - b - 1) >>> 32 - a : this.getBits(e - b);
    return new goog.math.Integer(d, this.sign_)
};
goog.math.Integer.prototype.shiftRight = function(a) {
    var b = a >> 5;
    a %= 32;
    for (var c = this.bits_.length - b, d = [], e = 0; e < c; e++) d[e] = 0 < a ? this.getBits(e + b) >>> a | this.getBits(e + b + 1) << 32 - a : this.getBits(e + b);
    return new goog.math.Integer(d, this.sign_)
};
goog.net = {};
goog.net.IpAddress = function(a, b) {
    this.ip_ = a;
    this.version_ = b
};
goog.net.IpAddress.prototype.getVersion = function() {
    return this.version_
};
goog.net.IpAddress.prototype.equals = function(a) {
    return this.version_ == a.getVersion() && this.ip_.equals(a.toInteger())
};
goog.net.IpAddress.prototype.toInteger = function() {
    return goog.object.clone(this.ip_)
};
goog.net.IpAddress.fromString = function(a) {
    try {
        return -1 != a.indexOf(":") ? new goog.net.Ipv6Address(a) : new goog.net.Ipv4Address(a)
    } catch (b) {
        return null
    }
};
goog.net.IpAddress.fromUriString = function(a) {
    try {
        return goog.string.startsWith(a, "[") && goog.string.endsWith(a, "]") ? new goog.net.Ipv6Address(a.substring(1, a.length - 1)) : new goog.net.Ipv4Address(a)
    } catch (b) {
        return null
    }
};
goog.net.Ipv4Address = function(a) {
    var b = goog.math.Integer.ZERO;
    if (a instanceof goog.math.Integer) {
        if (0 != a.getSign() || a.lessThan(goog.math.Integer.ZERO) || a.greaterThan(goog.net.Ipv4Address.MAX_ADDRESS_)) throw Error("The address does not look like an IPv4.");
        b = goog.object.clone(a)
    } else {
        if (!goog.net.Ipv4Address.REGEX_.test(a)) throw Error(a + " does not look like an IPv4 address.");
        var c = a.split(".");
        if (4 != c.length) throw Error(a + " does not look like an IPv4 address.");
        for (var d = 0; d < c.length; d++) {
            var e = goog.string.toNumber(c[d]);
            if (isNaN(e) || 0 > e || 255 < e || 1 != c[d].length && goog.string.startsWith(c[d], "0")) throw Error("In " + a + ", octet " + d + " is not valid");
            e = goog.math.Integer.fromNumber(e);
            b = b.shiftLeft(8).or(e)
        }
    }
    goog.net.IpAddress.call(this, b, 4)
};
goog.inherits(goog.net.Ipv4Address, goog.net.IpAddress);
goog.net.Ipv4Address.REGEX_ = /^[0-9.]*$/;
goog.net.Ipv4Address.MAX_NETMASK_LENGTH = 32;
goog.net.Ipv4Address.MAX_ADDRESS_ = goog.math.Integer.ONE.shiftLeft(goog.net.Ipv4Address.MAX_NETMASK_LENGTH).subtract(goog.math.Integer.ONE);
goog.net.Ipv4Address.prototype.toString = function() {
    if (this.ipStr_) return this.ipStr_;
    for (var a = this.ip_.getBitsUnsigned(0), b = [], c = 3; 0 <= c; c--) b[c] = String(a & 255), a >>>= 8;
    return this.ipStr_ = b.join(".")
};
goog.net.Ipv4Address.prototype.toUriString = function() {
    return this.toString()
};
goog.net.Ipv6Address = function(a) {
    var b = goog.math.Integer.ZERO;
    if (a instanceof goog.math.Integer) {
        if (0 != a.getSign() || a.lessThan(goog.math.Integer.ZERO) || a.greaterThan(goog.net.Ipv6Address.MAX_ADDRESS_)) throw Error("The address does not look like a valid IPv6.");
        b = goog.object.clone(a)
    } else {
        if (!goog.net.Ipv6Address.REGEX_.test(a)) throw Error(a + " is not a valid IPv6 address.");
        var c = a.split(":"); - 1 != c[c.length - 1].indexOf(".") && (a = goog.net.Ipv6Address.dottedQuadtoHextets_(c[c.length - 1]), goog.array.removeAt(c,
            c.length - 1), goog.array.extend(c, a), a = c.join(":"));
        var d = a.split("::");
        if (2 < d.length || 1 == d.length && 8 != c.length) throw Error(a + " is not a valid IPv6 address.");
        c = 1 < d.length ? goog.net.Ipv6Address.explode_(d) : c;
        if (8 != c.length) throw Error(a + " is not a valid IPv6 address");
        for (d = 0; d < c.length; d++) {
            var e = goog.math.Integer.fromString(c[d], 16);
            if (e.lessThan(goog.math.Integer.ZERO) || e.greaterThan(goog.net.Ipv6Address.MAX_HEXTET_VALUE_)) throw Error(c[d] + " in " + a + " is not a valid hextet.");
            b = b.shiftLeft(16).or(e)
        }
    }
    goog.net.IpAddress.call(this,
        b, 6)
};
goog.inherits(goog.net.Ipv6Address, goog.net.IpAddress);
goog.net.Ipv6Address.REGEX_ = /^([a-fA-F0-9]*:){2}[a-fA-F0-9:.]*$/;
goog.net.Ipv6Address.MAX_NETMASK_LENGTH = 128;
goog.net.Ipv6Address.MAX_HEXTET_VALUE_ = goog.math.Integer.fromInt(65535);
goog.net.Ipv6Address.MAX_ADDRESS_ = goog.math.Integer.ONE.shiftLeft(goog.net.Ipv6Address.MAX_NETMASK_LENGTH).subtract(goog.math.Integer.ONE);
goog.net.Ipv6Address.prototype.toString = function() {
    if (this.ipStr_) return this.ipStr_;
    for (var a = [], b = 3; 0 <= b; b--) {
        var c = this.ip_.getBitsUnsigned(b),
            d = c & 65535;
        a.push((c >>> 16).toString(16));
        a.push(d.toString(16))
    }
    a = goog.net.Ipv6Address.compress_(a);
    return this.ipStr_ = a.join(":")
};
goog.net.Ipv6Address.prototype.toUriString = function() {
    return "[" + this.toString() + "]"
};
goog.net.Ipv6Address.explode_ = function(a) {
    var b = a[0].split(":");
    a = a[1].split(":");
    1 == b.length && "" == b[0] && (b = []);
    1 == a.length && "" == a[0] && (a = []);
    var c = 8 - (b.length + a.length);
    return 1 > c ? [] : goog.array.join(b, goog.array.repeat("0", c), a)
};
goog.net.Ipv6Address.compress_ = function(a) {
    for (var b = -1, c = -1, d = 0, e = 0, f = 0; f < a.length; f++) "0" == a[f] ? (e++, -1 == c && (c = f), e > d && (d = e, b = c)) : (c = -1, e = 0);
    0 < d && (b + d == a.length && a.push(""), a.splice(b, d, ""), 0 == b && (a = [""].concat(a)));
    return a
};
goog.net.Ipv6Address.dottedQuadtoHextets_ = function(a) {
    a = (new goog.net.Ipv4Address(a)).toInteger().getBitsUnsigned(0);
    var b = [];
    b.push((a >>> 16 & 65535).toString(16));
    b.push((a & 65535).toString(16));
    return b
};
goog.net.Ipv6Address.prototype.isMappedIpv4Address = function() {
    return 0 == this.ip_.getBitsUnsigned(3) && 0 == this.ip_.getBitsUnsigned(2) && 65535 == this.ip_.getBitsUnsigned(1)
};
goog.net.Ipv6Address.prototype.getMappedIpv4Address = function() {
    if (!this.isMappedIpv4Address()) return null;
    var a = new goog.math.Integer([this.ip_.getBitsUnsigned(0)], 0);
    return new goog.net.Ipv4Address(a)
};
/*

 Copyright 2016 Google Inc. All rights reserved.
 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

   http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.

 @fileoverview Collection of popular sites/CDNs hosting flash with user
 provided JS.
 @author lwe@google.com (Lukas Weichselbaum)
*/
csp.whitelistBypasses.flash = {};
csp.whitelistBypasses.flash.URLS = goog.array.map(["//vk.com/swf/video.swf", "//ajax.googleapis.com/ajax/libs/yui/2.8.0r4/build/charts/assets/charts.swf"], function(a) {
    return new goog.Uri(a)
});
/*

 Copyright 2016 Google Inc. All rights reserved.
 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

   http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.

 @fileoverview Collection of popular sites/CDNs hosting JSONP-like endpoints.
 Endpoints don't contain necessary parameters to trigger JSONP response
 because parameters are ignored in CSP whitelists.
 Usually per domain only one (popular) file path is listed to allow bypasses
 of the most common path based whitelists. It's not practical to ship a list
 for all possible paths/domains. Therefore the jsonp bypass check usually only
 works efficient for domain based whitelists.
 @author lwe@google.com (Lukas Weichselbaum)
*/
csp.whitelistBypasses.jsonp = {};
csp.whitelistBypasses.jsonp.NEEDS_EVAL = "googletagmanager.com www.googletagmanager.com www.googleadservices.com google-analytics.com ssl.google-analytics.com www.google-analytics.com".split(" ");
csp.whitelistBypasses.jsonp.URLS = goog.array.map("//bebezoo.1688.com/fragment/index.htm //www.google-analytics.com/gtm/js //googleads.g.doubleclick.net/pagead/conversion/1036918760/wcm //www.googleadservices.com/pagead/conversion/1070110417/wcm //www.google.com/tools/feedback/escalation-options //pin.aliyun.com/check_audio //offer.alibaba.com/market/CID100002954/5/fetchKeyword.do //ccrprod.alipay.com/ccr/arriveTime.json //group.aliexpress.com/ajaxAcquireGroupbuyProduct.do //detector.alicdn.com/2.7.3/index.php //suggest.taobao.com/sug //translate.google.com/translate_a/l //count.tbcdn.cn//counter3 //wb.amap.com/channel.php //translate.googleapis.com/translate_a/l //afpeng.alimama.com/ex //accounts.google.com/o/oauth2/revoke //pagead2.googlesyndication.com/relatedsearch //yandex.ru/soft/browsers/check //api.facebook.com/restserver.php //mts0.googleapis.com/maps/vt //syndication.twitter.com/widgets/timelines/765840589183213568 //www.youtube.com/profile_style //googletagmanager.com/gtm/js //mc.yandex.ru/watch/24306916/1 //share.yandex.net/counter/gpp/ //ok.go.mail.ru/lady_on_lady_recipes_r.json //d1f69o4buvlrj5.cloudfront.net/__efa_15_1_ornpba.xekq.arg/optout_check //www.googletagmanager.com/gtm/js //api.vk.com/method/wall.get //www.sharethis.com/get-publisher-info.php //google.ru/maps/vt //pro.netrox.sc/oapi/h_checksite.ashx //vimeo.com/api/oembed.json/ //de.blog.newrelic.com/wp-admin/admin-ajax.php //ajax.googleapis.com/ajax/services/search/news //ssl.google-analytics.com/gtm/js //pubsub.pubnub.com/subscribe/demo/hello_world/ //pass.yandex.ua/services //id.rambler.ru/script/topline_info.js //m.addthis.com/live/red_lojson/100eng.json //passport.ngs.ru/ajax/check //catalog.api.2gis.ru/ads/search //gum.criteo.com/sync //maps.google.com/maps/vt //ynuf.alipay.com/service/um.json //securepubads.g.doubleclick.net/gampad/ads //c.tiles.mapbox.com/v3/texastribune.tx-congress-cvap/6/15/26.grid.json //rexchange.begun.ru/banners //an.yandex.ru/page/147484 //links.services.disqus.com/api/ping //api.map.baidu.com/ //tj.gongchang.com/api/keywordrecomm/ //data.gongchang.com/livegrail/ //ulogin.ru/token.php //beta.gismeteo.ru/api/informer/layout.js/120x240-3/ru/ //maps.googleapis.com/maps/api/js/GeoPhotoService.GetMetadata //a.config.skype.com/config/v1/Skype/908_1.33.0.111/SkypePersonalization //maps.beeline.ru/w //target.ukr.net/ //www.meteoprog.ua/data/weather/informer/Poltava.js //cdn.syndication.twimg.com/widgets/timelines/599200054310604802 //wslocker.ru/client/user.chk.php //community.adobe.com/CommunityPod/getJSON //maps.google.lv/maps/vt //dev.virtualearth.net/REST/V1/Imagery/Metadata/AerialWithLabels/26.318581 //awaps.yandex.ru/10/8938/02400400. //a248.e.akamai.net/h5.hulu.com/h5.mp4 //nominatim.openstreetmap.org/ //plugins.mozilla.org/en-us/plugins_list.json //h.cackle.me/widget/32153/bootstrap //graph.facebook.com/1/ //fellowes.ugc.bazaarvoice.com/data/reviews.json //widgets.pinterest.com/v3/pidgets/boards/ciciwin/hedgehog-squirrel-crafts/pins/ //appcenter.intuit.com/Account/LogoutJSONP //www.linkedin.com/countserv/count/share //se.wikipedia.org/w/api.php //cse.google.com/api/007627024705277327428/cse/r3vs7b0fcli/queries/js //relap.io/api/v2/similar_pages_jsonp.js //c1n3.hypercomments.com/stream/subscribe //maps.google.de/maps/vt //books.google.com/books //connect.mail.ru/share_count //tr.indeed.com/m/newjobs //www-onepick-opensocial.googleusercontent.com/gadgets/proxy //www.panoramio.com/map/get_panoramas.php //client.siteheart.com/streamcli/client //www.facebook.com/restserver.php //autocomplete.travelpayouts.com/avia //www.googleapis.com/freebase/v1/topic/m/0344_ //mts1.googleapis.com/mapslt/ft //api.twitter.com/1/statuses/oembed.json //fast.wistia.com/embed/medias/o75jtw7654.json //partner.googleadservices.com/gampad/ads //pass.yandex.ru/services //gupiao.baidu.com/stocks/stockbets //widget.admitad.com/widget/init //api.instagram.com/v1/tags/partykungen23328/media/recent //video.media.yql.yahoo.com/v1/video/sapi/streams/063fb76c-6c70-38c5-9bbc-04b7c384de2b //ib.adnxs.com/jpt //pass.yandex.com/services //www.google.de/maps/vt //clients1.google.com/complete/search //api.userlike.com/api/chat/slot/proactive/ //www.youku.com/index_cookielist/s/jsonp //mt1.googleapis.com/mapslt/ft //api.mixpanel.com/track/ //wpd.b.qq.com/cgi/get_sign.php //pipes.yahooapis.com/pipes/pipe.run //gdata.youtube.com/feeds/api/videos/WsJIHN1kNWc //9.chart.apis.google.com/chart //cdn.syndication.twitter.com/moments/709229296800440320 //api.flickr.com/services/feeds/photos_friends.gne //cbks0.googleapis.com/cbk //www.blogger.com/feeds/5578653387562324002/posts/summary/4427562025302749269 //query.yahooapis.com/v1/public/yql //kecngantang.blogspot.com/feeds/posts/default/-/Komik //www.travelpayouts.com/widgets/50f53ce9ada1b54bcc000031.json //i.cackle.me/widget/32586/bootstrap //translate.yandex.net/api/v1.5/tr.json/detect //a.tiles.mapbox.com/v3/zentralmedia.map-n2raeauc.jsonp //maps.google.ru/maps/vt //c1n2.hypercomments.com/stream/subscribe //rec.ydf.yandex.ru/cookie".split(" "), function(a) {
    return new goog.Uri(a)
});
/*

 Copyright 2016 Google Inc. All rights reserved.
 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

   http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.

 @fileoverview Utils for CSP evaluator.
 @author lwe@google.com (Lukas Weichselbaum)
*/
csp.utils = {};
csp.utils.getSchemeFreeUrl = function(a) {
    a = a.replace(/^\w[+\w.-]*:\/\//i, "");
    return a = a.replace(/^\/\//, "")
};
csp.utils.matchWildcardUrls = function(a, b) {
    for (var c = a.getDomain().toLowerCase(), d = goog.string.startsWith(c, "*."), e = c.replace(/^\*/i, ""), f = a.getPath(), g = a.hasPath(), h = $jscomp.makeIterator(b), k = h.next(); !k.done; k = h.next()) {
        var k = k.value,
            l = k.getDomain();
        if (goog.string.endsWith(l, e) && (d || c == l)) {
            if (g)
                if (goog.string.endsWith(f, "/")) {
                    if (!goog.string.startsWith(k.getPath(), f)) continue
                } else if (k.getPath() != f) continue;
            return k
        }
    }
    return null
};
csp.utils.applyCheckFunktionToDirectives = function(a, b, c) {
    c = c || goog.object.getKeys(a);
    c = $jscomp.makeIterator(c);
    for (var d = c.next(); !d.done; d = c.next()) {
        var d = d.value,
            e = a[d];
        e && b(d, e)
    }
};
/*

 Copyright 2016 Google Inc. All rights reserved.
 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

   http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.

 @fileoverview Collection of CSP evaluation checks.
 @author lwe@google.com (Lukas Weichselbaum)
*/
csp.securityChecks = {};
csp.securityChecks.DIRECTIVES_CAUSING_XSS = [csp.Directive.SCRIPT_SRC, csp.Directive.OBJECT_SRC];
csp.securityChecks.URL_SCHEMES_CAUSING_XSS = ["data:", "http:", "https:"];
csp.securityChecks.checkScriptUnsafeInline = function(a) {
    var b = csp.Csp.getEffectiveDirective(a, csp.Directive.SCRIPT_SRC);
    return goog.array.contains(a[b] || [], csp.Keyword.UNSAFE_INLINE) ? [new csp.Finding(csp.Finding.Type.SCRIPT_UNSAFE_INLINE, "'unsafe-inline' allows the execution of unsafe in-page scripts and event handlers.", csp.Finding.Severity.HIGH, b, csp.Keyword.UNSAFE_INLINE)] : []
};
csp.securityChecks.checkScriptUnsafeEval = function(a) {
    var b = csp.Csp.getEffectiveDirective(a, csp.Directive.SCRIPT_SRC);
    return goog.array.contains(a[b] || [], csp.Keyword.UNSAFE_EVAL) ? [new csp.Finding(csp.Finding.Type.SCRIPT_UNSAFE_EVAL, "'unsafe-eval' allows the execution of code injected into DOM APIs such as eval().", csp.Finding.Severity.MEDIUM_MAYBE, b, csp.Keyword.UNSAFE_EVAL)] : []
};
csp.securityChecks.checkPlainUrlSchemes = function(a) {
    for (var b = [], c = csp.Csp.getEffectiveDirectives(a, csp.securityChecks.DIRECTIVES_CAUSING_XSS), c = $jscomp.makeIterator(c), d = c.next(); !d.done; d = c.next())
        for (var d = d.value, e = $jscomp.makeIterator(a[d] || []), f = e.next(); !f.done; f = e.next()) f = f.value, goog.array.contains(csp.securityChecks.URL_SCHEMES_CAUSING_XSS, f) && b.push(new csp.Finding(csp.Finding.Type.PLAIN_URL_SCHEMES, f + " URI in " + d + " allows the execution of unsafe scripts.", csp.Finding.Severity.HIGH, d,
            f));
    return b
};
csp.securityChecks.checkWildcards = function(a) {
    for (var b = [], c = csp.Csp.getEffectiveDirectives(a, csp.securityChecks.DIRECTIVES_CAUSING_XSS), c = $jscomp.makeIterator(c), d = c.next(); !d.done; d = c.next())
        for (var d = d.value, e = $jscomp.makeIterator(a[d] || []), f = e.next(); !f.done; f = e.next()) f = f.value, "*" == csp.utils.getSchemeFreeUrl(f) && b.push(new csp.Finding(csp.Finding.Type.PLAIN_WILDCARD, d + " should not allow '*' as source", csp.Finding.Severity.HIGH, d, f));
    return b
};
csp.securityChecks.checkMissingDirectives = function(a) {
    var b = [];
    if (csp.Directive.DEFAULT_SRC in a) {
        var c = a[csp.Directive.DEFAULT_SRC];
        csp.Directive.OBJECT_SRC in a || goog.array.contains(c, csp.Keyword.NONE) || b.push(new csp.Finding(csp.Finding.Type.MISSING_DIRECTIVES, "Can you restrict object-src to 'none'?", csp.Finding.Severity.HIGH_MAYBE, csp.Directive.OBJECT_SRC));
        return b
    }
    for (var c = $jscomp.makeIterator(csp.securityChecks.DIRECTIVES_CAUSING_XSS), d = c.next(); !d.done; d = c.next())
        if (d = d.value, !(d in a)) {
            var e =
                d + " directive is missing.";
            d == csp.Directive.OBJECT_SRC && (e = "Missing object-src allows the injection of plugins which can execute JavaScript. Can you set it to 'none'?");
            b.push(new csp.Finding(csp.Finding.Type.MISSING_DIRECTIVES, e, csp.Finding.Severity.HIGH, d))
        } return b
};
csp.securityChecks.checkScriptWhitelistBypass = function(a) {
    var b = [],
        c = csp.Csp.getEffectiveDirective(a, csp.Directive.SCRIPT_SRC);
    a = a[c] || [];
    for (var d = $jscomp.makeIterator(a), e = d.next(); !e.done; e = d.next())
        if (e = e.value, e == csp.Keyword.SELF) b.push(new csp.Finding(csp.Finding.Type.SCRIPT_WHITELIST_BYPASS, "'self' can be problematic if you host JSONP, Angular or user uploaded files.", csp.Finding.Severity.MEDIUM_MAYBE, c, e));
        else if (!goog.string.startsWith(e, "'") && !csp.isUrlScheme(e) && -1 != e.indexOf(".")) {
        var f =
            new goog.Uri("//" + csp.utils.getSchemeFreeUrl(e)),
            g = csp.utils.matchWildcardUrls(f, csp.whitelistBypasses.angular.URLS);
        if (f = csp.utils.matchWildcardUrls(f, csp.whitelistBypasses.jsonp.URLS)) {
            f.getDomain();
            f.getPath();
            var h = goog.array.contains(csp.whitelistBypasses.jsonp.NEEDS_EVAL, f.getDomain()),
                k = goog.array.contains(a, csp.Keyword.UNSAFE_EVAL);
            h && !k && (f = null)
        }
        f || g ? (k = h = "", f && (h = f.getDomain(), k = " JSONP endpoints"), g && (h = g.getDomain(), k += goog.string.isEmpty(k) ? "" : " and", k += " Angular libraries"), b.push(new csp.Finding(csp.Finding.Type.SCRIPT_WHITELIST_BYPASS,
            h + " is known to host" + k + " which allow to bypass this CSP.", csp.Finding.Severity.HIGH, c, e))) : b.push(new csp.Finding(csp.Finding.Type.SCRIPT_WHITELIST_BYPASS, "No bypass found; make sure that this URL doesn't serve JSONP replies or Angular libraries.", csp.Finding.Severity.MEDIUM_MAYBE, c, e))
    }
    return b
};
csp.securityChecks.checkFlashObjectWhitelistBypass = function(a) {
    for (var b = [], c = csp.Csp.getEffectiveDirective(a, csp.Directive.OBJECT_SRC), d = $jscomp.makeIterator(a[c] || []), e = d.next(); !e.done; e = d.next())
        if (e = e.value, e != csp.Keyword.NONE) {
            var f = a[csp.Directive.PLUGIN_TYPES];
            if (!f || goog.array.contains(f, "application/x-shockwave-flash")) f = new goog.Uri("//" + csp.utils.getSchemeFreeUrl(e)), (f = csp.utils.matchWildcardUrls(f, csp.whitelistBypasses.flash.URLS)) ? b.push(new csp.Finding(csp.Finding.Type.OBJECT_WHITELIST_BYPASS,
                f.getDomain() + " is known to host Flash files which allow to bypass this CSP.", csp.Finding.Severity.HIGH, c, e)) : c == csp.Directive.OBJECT_SRC && b.push(new csp.Finding(csp.Finding.Type.OBJECT_WHITELIST_BYPASS, "Can you restrict object-src to 'none' only?", csp.Finding.Severity.MEDIUM_MAYBE, c, e))
        } return b
};
csp.securityChecks.checkIpSource = function(a) {
    var b = [];
    csp.utils.applyCheckFunktionToDirectives(a, function(a, d) {
        for (var e = $jscomp.makeIterator(d), f = e.next(); !f.done; f = e.next()) {
            var f = f.value,
                g = "//" + csp.utils.getSchemeFreeUrl(f),
                g = (new goog.Uri(g)).getDomain();
            if (g = goog.net.IpAddress.fromUriString(g)) g = g.toString(), "127.0.0.1" == g ? b.push(new csp.Finding(csp.Finding.Type.IP_SOURCE, a + " directive allows localhost as source. Please make sure to remove this in production environments.", csp.Finding.Severity.INFO,
                a, f)) : b.push(new csp.Finding(csp.Finding.Type.IP_SOURCE, a + " directive has an IP-Address as source: " + g + " (will be ignored by browsers!). ", csp.Finding.Severity.INFO, a, f))
        }
    });
    return b
};
csp.securityChecks.checkDeprecatedDirective = function(a) {
    var b = [];
    csp.Directive.REPORT_URI in a && b.push(new csp.Finding(csp.Finding.Type.DEPRECATED_DIRECTIVE, "report-uri is deprecated in CSP3. Please use the report-to directive instead.", csp.Finding.Severity.INFO, csp.Directive.REPORT_URI));
    return b
};
csp.securityChecks.checkNonceLength = function(a) {
    var b = /^'nonce-(.+)'$/,
        c = [];
    csp.utils.applyCheckFunktionToDirectives(a, function(a, e) {
        for (var f = $jscomp.makeIterator(e), g = f.next(); !g.done; g = f.next()) {
            var g = g.value,
                h = g.match(b);
            h && (8 > h[1].length && c.push(new csp.Finding(csp.Finding.Type.NONCE_LENGTH, "Nonces should be at least 8 characters long.", csp.Finding.Severity.MEDIUM, a, g)), csp.isNonce(g, !0) || c.push(new csp.Finding(csp.Finding.Type.NONCE_LENGTH, "Nonces should only use the base64 charset.", csp.Finding.Severity.INFO,
                a, g)))
        }
    });
    return c
};
csp.securityChecks.checkSrcHttp = function(a) {
    var b = [];
    csp.utils.applyCheckFunktionToDirectives(a, function(a, d) {
        for (var e = $jscomp.makeIterator(d), f = e.next(); !f.done; f = e.next()) {
            var f = f.value,
                g = a == csp.Directive.REPORT_URI ? "Use HTTPS to send violation reports securely." : "Allow only resources downloaded over HTTPS.";
            f.startsWith("http://") && b.push(new csp.Finding(csp.Finding.Type.SRC_HTTP, g, csp.Finding.Severity.MEDIUM, a, f))
        }
    });
    return b
};
goog.log = {};
goog.log.ENABLED = goog.debug.LOGGING_ENABLED;
goog.log.ROOT_LOGGER_NAME = goog.debug.Logger.ROOT_LOGGER_NAME;
goog.log.Logger = goog.debug.Logger;
goog.log.Level = goog.debug.Logger.Level;
goog.log.LogRecord = goog.debug.LogRecord;
goog.log.getLogger = function(a, b) {
    if (goog.log.ENABLED) {
        var c = goog.debug.LogManager.getLogger(a);
        b && c && c.setLevel(b);
        return c
    }
    return null
};
goog.log.addHandler = function(a, b) {
    goog.log.ENABLED && a && a.addHandler(b)
};
goog.log.removeHandler = function(a, b) {
    return goog.log.ENABLED && a ? a.removeHandler(b) : !1
};
goog.log.log = function(a, b, c, d) {
    goog.log.ENABLED && a && a.log(b, c, d)
};
goog.log.error = function(a, b, c) {
    goog.log.ENABLED && a && a.severe(b, c)
};
goog.log.warning = function(a, b, c) {
    goog.log.ENABLED && a && a.warning(b, c)
};
goog.log.info = function(a, b, c) {
    goog.log.ENABLED && a && a.info(b, c)
};
goog.log.fine = function(a, b, c) {
    goog.log.ENABLED && a && a.fine(b, c)
};
csp.CspEvaluator = function(a, b) {
    // goog.debug.Console.autoInstall();
    // this.logger_ = goog.log.getLogger("csp.CspEvaluator");
    this.version = b || csp.Version.CSP3;
    this.csp = a;
    this.findings = []
};
csp.CspEvaluator.DEFAULT_CHECKS = [csp.securityChecks.checkScriptUnsafeInline, csp.securityChecks.checkScriptUnsafeEval, csp.securityChecks.checkPlainUrlSchemes, csp.securityChecks.checkWildcards, csp.securityChecks.checkMissingDirectives, csp.securityChecks.checkScriptWhitelistBypass, csp.securityChecks.checkFlashObjectWhitelistBypass, csp.securityChecks.checkIpSource, csp.securityChecks.checkNonceLength, csp.securityChecks.checkSrcHttp, csp.parserChecks.checkUnknownDirective, csp.parserChecks.checkMissingSemicolon,
    csp.parserChecks.checkInvalidKeyword
];
csp.CspEvaluator.STRICTCSP_CHECKS = [csp.strictcspChecks.checkStrictDynamic, csp.strictcspChecks.checkStrictDynamicNotStandalone, csp.strictcspChecks.checkUnsafeInlineFallback, csp.strictcspChecks.checkWhitelistFallback];
csp.CspEvaluator.prototype.evaluate = function(a, b) {
    this.findings = [];
    var c = b || csp.CspEvaluator.DEFAULT_CHECKS,
        d = csp.Csp.getEffectiveCsp(this.csp, this.version, this.findings);
    if (a)
        for (var e = $jscomp.makeIterator(a), f = e.next(); !f.done; f = e.next()) f = f.value, this.findings = this.findings.concat(f(this.csp));
    c = $jscomp.makeIterator(c);
    for (f = c.next(); !f.done; f = c.next()) e = f.value, this.findings = this.findings.concat(e(d));
    return this.findings
};
csp.CspParser = function(a) {
    // goog.debug.Console.autoInstall(); //4514
    // this.logger_ = goog.log.getLogger("csp.CspParser");
    // this.csp = new csp.Csp;//1679
    this.parse(a)
};
csp.CspParser.prototype.parse = function(a) {
    this.csp = new csp.Csp;//1679
    // goog.log.info(this.logger_, "Parsing: " + a);
    a = a.split(";");
    for (var b = 0; b < a.length; b++) {
        var c = a[b].trim().match(/\S+/g);
        if (goog.isArray(c)) {
            var d = c[0].toLowerCase();
            if (d in this.csp) goog.log.warning(this.logger_, "Duplicate directive detected: " + d);
            else {
                csp.isDirective(d) || goog.log.warning(this.logger_, "Invalid directive detected: " + d);
                
                this.csp[d] = [];
                for (var e, f = 1; e = c[f]; f++) e = csp.CspParser.normalizeDirectiveValue_(e), goog.array.insert(this.csp[d], e)
            }
        }
    }
    return this.csp
};
csp.CspParser.normalizeDirectiveValue_ = function(a) {
    a = a.trim();
    var b = a.toLowerCase();
    return csp.isKeyword(b) || csp.isUrlScheme(a) ? b : a
};
goog.events = {};
goog.events.BrowserFeature = {
    HAS_W3C_BUTTON: !goog.userAgent.IE || goog.userAgent.isDocumentModeOrHigher(9),
    HAS_W3C_EVENT_SUPPORT: !goog.userAgent.IE || goog.userAgent.isDocumentModeOrHigher(9),
    SET_KEY_CODE_TO_PREVENT_DEFAULT: goog.userAgent.IE && !goog.userAgent.isVersionOrHigher("9"),
    HAS_NAVIGATOR_ONLINE_PROPERTY: !goog.userAgent.WEBKIT || goog.userAgent.isVersionOrHigher("528"),
    HAS_HTML5_NETWORK_EVENT_SUPPORT: goog.userAgent.GECKO && goog.userAgent.isVersionOrHigher("1.9b") || goog.userAgent.IE && goog.userAgent.isVersionOrHigher("8") ||
        goog.userAgent.OPERA && goog.userAgent.isVersionOrHigher("9.5") || goog.userAgent.WEBKIT && goog.userAgent.isVersionOrHigher("528"),
    HTML5_NETWORK_EVENTS_FIRE_ON_BODY: goog.userAgent.GECKO && !goog.userAgent.isVersionOrHigher("8") || goog.userAgent.IE && !goog.userAgent.isVersionOrHigher("9"),
    TOUCH_ENABLED: "ontouchstart" in goog.global || !!(goog.global.document && document.documentElement && "ontouchstart" in document.documentElement) || !(!goog.global.navigator || !goog.global.navigator.msMaxTouchPoints)
};
goog.events.EventId = function(a) {
    this.id = a
};
goog.events.EventId.prototype.toString = function() {
    return this.id
};
goog.events.Listenable = function() {};
goog.events.Listenable.IMPLEMENTED_BY_PROP = "closure_listenable_" + (1E6 * Math.random() | 0);
goog.events.Listenable.addImplementation = function(a) {
    a.prototype[goog.events.Listenable.IMPLEMENTED_BY_PROP] = !0
};
goog.events.Listenable.isImplementedBy = function(a) {
    return !(!a || !a[goog.events.Listenable.IMPLEMENTED_BY_PROP])
};
goog.events.ListenableKey = function() {};
goog.events.ListenableKey.counter_ = 0;
goog.events.ListenableKey.reserveKey = function() {
    return ++goog.events.ListenableKey.counter_
};
goog.events.getVendorPrefixedName_ = function(a) {
    return goog.userAgent.WEBKIT ? "webkit" + a : goog.userAgent.OPERA ? "o" + a.toLowerCase() : a.toLowerCase()
};
goog.events.EventType = {
    CLICK: "click",
    RIGHTCLICK: "rightclick",
    DBLCLICK: "dblclick",
    MOUSEDOWN: "mousedown",
    MOUSEUP: "mouseup",
    MOUSEOVER: "mouseover",
    MOUSEOUT: "mouseout",
    MOUSEMOVE: "mousemove",
    MOUSEENTER: "mouseenter",
    MOUSELEAVE: "mouseleave",
    SELECTSTART: "selectstart",
    WHEEL: "wheel",
    KEYPRESS: "keypress",
    KEYDOWN: "keydown",
    KEYUP: "keyup",
    BLUR: "blur",
    FOCUS: "focus",
    DEACTIVATE: "deactivate",
    FOCUSIN: goog.userAgent.IE ? "focusin" : "DOMFocusIn",
    FOCUSOUT: goog.userAgent.IE ? "focusout" : "DOMFocusOut",
    CHANGE: "change",
    RESET: "reset",
    SELECT: "select",
    SUBMIT: "submit",
    INPUT: "input",
    PROPERTYCHANGE: "propertychange",
    DRAGSTART: "dragstart",
    DRAG: "drag",
    DRAGENTER: "dragenter",
    DRAGOVER: "dragover",
    DRAGLEAVE: "dragleave",
    DROP: "drop",
    DRAGEND: "dragend",
    TOUCHSTART: "touchstart",
    TOUCHMOVE: "touchmove",
    TOUCHEND: "touchend",
    TOUCHCANCEL: "touchcancel",
    BEFOREUNLOAD: "beforeunload",
    CONSOLEMESSAGE: "consolemessage",
    CONTEXTMENU: "contextmenu",
    DOMCONTENTLOADED: "DOMContentLoaded",
    ERROR: "error",
    HELP: "help",
    LOAD: "load",
    LOSECAPTURE: "losecapture",
    ORIENTATIONCHANGE: "orientationchange",
    READYSTATECHANGE: "readystatechange",
    RESIZE: "resize",
    SCROLL: "scroll",
    UNLOAD: "unload",
    HASHCHANGE: "hashchange",
    PAGEHIDE: "pagehide",
    PAGESHOW: "pageshow",
    POPSTATE: "popstate",
    COPY: "copy",
    PASTE: "paste",
    CUT: "cut",
    BEFORECOPY: "beforecopy",
    BEFORECUT: "beforecut",
    BEFOREPASTE: "beforepaste",
    ONLINE: "online",
    OFFLINE: "offline",
    MESSAGE: "message",
    CONNECT: "connect",
    ANIMATIONSTART: goog.events.getVendorPrefixedName_("AnimationStart"),
    ANIMATIONEND: goog.events.getVendorPrefixedName_("AnimationEnd"),
    ANIMATIONITERATION: goog.events.getVendorPrefixedName_("AnimationIteration"),
    TRANSITIONEND: goog.events.getVendorPrefixedName_("TransitionEnd"),
    POINTERDOWN: "pointerdown",
    POINTERUP: "pointerup",
    POINTERCANCEL: "pointercancel",
    POINTERMOVE: "pointermove",
    POINTEROVER: "pointerover",
    POINTEROUT: "pointerout",
    POINTERENTER: "pointerenter",
    POINTERLEAVE: "pointerleave",
    GOTPOINTERCAPTURE: "gotpointercapture",
    LOSTPOINTERCAPTURE: "lostpointercapture",
    MSGESTURECHANGE: "MSGestureChange",
    MSGESTUREEND: "MSGestureEnd",
    MSGESTUREHOLD: "MSGestureHold",
    MSGESTURESTART: "MSGestureStart",
    MSGESTURETAP: "MSGestureTap",
    MSGOTPOINTERCAPTURE: "MSGotPointerCapture",
    MSINERTIASTART: "MSInertiaStart",
    MSLOSTPOINTERCAPTURE: "MSLostPointerCapture",
    MSPOINTERCANCEL: "MSPointerCancel",
    MSPOINTERDOWN: "MSPointerDown",
    MSPOINTERENTER: "MSPointerEnter",
    MSPOINTERHOVER: "MSPointerHover",
    MSPOINTERLEAVE: "MSPointerLeave",
    MSPOINTERMOVE: "MSPointerMove",
    MSPOINTEROUT: "MSPointerOut",
    MSPOINTEROVER: "MSPointerOver",
    MSPOINTERUP: "MSPointerUp",
    TEXT: "text",
    TEXTINPUT: "textInput",
    COMPOSITIONSTART: "compositionstart",
    COMPOSITIONUPDATE: "compositionupdate",
    COMPOSITIONEND: "compositionend",
    EXIT: "exit",
    LOADABORT: "loadabort",
    LOADCOMMIT: "loadcommit",
    LOADREDIRECT: "loadredirect",
    LOADSTART: "loadstart",
    LOADSTOP: "loadstop",
    RESPONSIVE: "responsive",
    SIZECHANGED: "sizechanged",
    UNRESPONSIVE: "unresponsive",
    VISIBILITYCHANGE: "visibilitychange",
    STORAGE: "storage",
    DOMSUBTREEMODIFIED: "DOMSubtreeModified",
    DOMNODEINSERTED: "DOMNodeInserted",
    DOMNODEREMOVED: "DOMNodeRemoved",
    DOMNODEREMOVEDFROMDOCUMENT: "DOMNodeRemovedFromDocument",
    DOMNODEINSERTEDINTODOCUMENT: "DOMNodeInsertedIntoDocument",
    DOMATTRMODIFIED: "DOMAttrModified",
    DOMCHARACTERDATAMODIFIED: "DOMCharacterDataModified",
    BEFOREPRINT: "beforeprint",
    AFTERPRINT: "afterprint"
};
goog.reflect = {};
goog.reflect.object = function(a, b) {
    return b
};
goog.reflect.sinkValue = function(a) {
    goog.reflect.sinkValue[" "](a);
    return a
};
goog.reflect.sinkValue[" "] = goog.nullFunction;
goog.reflect.canAccessProperty = function(a, b) {
    try {
        return goog.reflect.sinkValue(a[b]), !0
    } catch (c) {}
    return !1
};
goog.disposable = {};
goog.disposable.IDisposable = function() {};
goog.Disposable = function() {
    goog.Disposable.MONITORING_MODE != goog.Disposable.MonitoringMode.OFF && (goog.Disposable.INCLUDE_STACK_ON_CREATION && (this.creationStack = Error().stack), goog.Disposable.instances_[goog.getUid(this)] = this);
    this.disposed_ = this.disposed_;
    this.onDisposeCallbacks_ = this.onDisposeCallbacks_
};
goog.Disposable.MonitoringMode = {
    OFF: 0,
    PERMANENT: 1,
    INTERACTIVE: 2
};
goog.Disposable.MONITORING_MODE = 0;
goog.Disposable.INCLUDE_STACK_ON_CREATION = !0;
goog.Disposable.instances_ = {};
goog.Disposable.getUndisposedObjects = function() {
    var a = [],
        b;
    for (b in goog.Disposable.instances_) goog.Disposable.instances_.hasOwnProperty(b) && a.push(goog.Disposable.instances_[Number(b)]);
    return a
};
goog.Disposable.clearUndisposedObjects = function() {
    goog.Disposable.instances_ = {}
};
goog.Disposable.prototype.disposed_ = !1;
goog.Disposable.prototype.isDisposed = function() {
    return this.disposed_
};
goog.Disposable.prototype.getDisposed = goog.Disposable.prototype.isDisposed;
goog.Disposable.prototype.dispose = function() {
    if (!this.disposed_ && (this.disposed_ = !0, this.disposeInternal(), goog.Disposable.MONITORING_MODE != goog.Disposable.MonitoringMode.OFF)) {
        var a = goog.getUid(this);
        if (goog.Disposable.MONITORING_MODE == goog.Disposable.MonitoringMode.PERMANENT && !goog.Disposable.instances_.hasOwnProperty(a)) throw Error(this + " did not call the goog.Disposable base constructor or was disposed of after a clearUndisposedObjects call");
        delete goog.Disposable.instances_[a]
    }
};
goog.Disposable.prototype.registerDisposable = function(a) {
    this.addOnDisposeCallback(goog.partial(goog.dispose, a))
};
goog.Disposable.prototype.addOnDisposeCallback = function(a, b) {
    this.disposed_ ? a.call(b) : (this.onDisposeCallbacks_ || (this.onDisposeCallbacks_ = []), this.onDisposeCallbacks_.push(goog.isDef(b) ? goog.bind(a, b) : a))
};
goog.Disposable.prototype.disposeInternal = function() {
    if (this.onDisposeCallbacks_)
        for (; this.onDisposeCallbacks_.length;) this.onDisposeCallbacks_.shift()()
};
goog.Disposable.isDisposed = function(a) {
    return a && "function" == typeof a.isDisposed ? a.isDisposed() : !1
};
goog.dispose = function(a) {
    a && "function" == typeof a.dispose && a.dispose()
};
goog.disposeAll = function(a) {
    for (var b = 0, c = arguments.length; b < c; ++b) {
        var d = arguments[b];
        goog.isArrayLike(d) ? goog.disposeAll.apply(null, d) : goog.dispose(d)
    }
};
goog.events.Event = function(a, b) {
    this.type = a instanceof goog.events.EventId ? String(a) : a;
    this.currentTarget = this.target = b;
    this.defaultPrevented = this.propagationStopped_ = !1;
    this.returnValue_ = !0
};
goog.events.Event.prototype.stopPropagation = function() {
    this.propagationStopped_ = !0
};
goog.events.Event.prototype.preventDefault = function() {
    this.defaultPrevented = !0;
    this.returnValue_ = !1
};
goog.events.Event.stopPropagation = function(a) {
    a.stopPropagation()
};
goog.events.Event.preventDefault = function(a) {
    a.preventDefault()
};
goog.events.BrowserEvent = function(a, b) {
    goog.events.Event.call(this, a ? a.type : "");
    this.relatedTarget = this.currentTarget = this.target = null;
    this.charCode = this.keyCode = this.button = this.screenY = this.screenX = this.clientY = this.clientX = this.offsetY = this.offsetX = 0;
    this.metaKey = this.shiftKey = this.altKey = this.ctrlKey = !1;
    this.state = null;
    this.platformModifierKey = !1;
    this.event_ = null;
    a && this.init(a, b)
};
goog.inherits(goog.events.BrowserEvent, goog.events.Event);
goog.events.BrowserEvent.MouseButton = {
    LEFT: 0,
    MIDDLE: 1,
    RIGHT: 2
};
goog.events.BrowserEvent.IEButtonMap = [1, 4, 2];
goog.events.BrowserEvent.prototype.init = function(a, b) {
    var c = this.type = a.type,
        d = a.changedTouches ? a.changedTouches[0] : null;
    this.target = a.target || a.srcElement;
    this.currentTarget = b;
    var e = a.relatedTarget;
    e ? goog.userAgent.GECKO && (goog.reflect.canAccessProperty(e, "nodeName") || (e = null)) : c == goog.events.EventType.MOUSEOVER ? e = a.fromElement : c == goog.events.EventType.MOUSEOUT && (e = a.toElement);
    this.relatedTarget = e;
    goog.isNull(d) ? (this.offsetX = goog.userAgent.WEBKIT || void 0 !== a.offsetX ? a.offsetX : a.layerX, this.offsetY =
        goog.userAgent.WEBKIT || void 0 !== a.offsetY ? a.offsetY : a.layerY, this.clientX = void 0 !== a.clientX ? a.clientX : a.pageX, this.clientY = void 0 !== a.clientY ? a.clientY : a.pageY, this.screenX = a.screenX || 0, this.screenY = a.screenY || 0) : (this.clientX = void 0 !== d.clientX ? d.clientX : d.pageX, this.clientY = void 0 !== d.clientY ? d.clientY : d.pageY, this.screenX = d.screenX || 0, this.screenY = d.screenY || 0);
    this.button = a.button;
    this.keyCode = a.keyCode || 0;
    this.charCode = a.charCode || ("keypress" == c ? a.keyCode : 0);
    this.ctrlKey = a.ctrlKey;
    this.altKey =
        a.altKey;
    this.shiftKey = a.shiftKey;
    this.metaKey = a.metaKey;
    this.platformModifierKey = goog.userAgent.MAC ? a.metaKey : a.ctrlKey;
    this.state = a.state;
    this.event_ = a;
    a.defaultPrevented && this.preventDefault()
};
goog.events.BrowserEvent.prototype.isButton = function(a) {
    return goog.events.BrowserFeature.HAS_W3C_BUTTON ? this.event_.button == a : "click" == this.type ? a == goog.events.BrowserEvent.MouseButton.LEFT : !!(this.event_.button & goog.events.BrowserEvent.IEButtonMap[a])
};
goog.events.BrowserEvent.prototype.isMouseActionButton = function() {
    return this.isButton(goog.events.BrowserEvent.MouseButton.LEFT) && !(goog.userAgent.WEBKIT && goog.userAgent.MAC && this.ctrlKey)
};
goog.events.BrowserEvent.prototype.stopPropagation = function() {
    goog.events.BrowserEvent.superClass_.stopPropagation.call(this);
    this.event_.stopPropagation ? this.event_.stopPropagation() : this.event_.cancelBubble = !0
};
goog.events.BrowserEvent.prototype.preventDefault = function() {
    goog.events.BrowserEvent.superClass_.preventDefault.call(this);
    var a = this.event_;
    if (a.preventDefault) a.preventDefault();
    else if (a.returnValue = !1, goog.events.BrowserFeature.SET_KEY_CODE_TO_PREVENT_DEFAULT) try {
        if (a.ctrlKey || 112 <= a.keyCode && 123 >= a.keyCode) a.keyCode = -1
    } catch (b) {}
};
goog.events.BrowserEvent.prototype.getBrowserEvent = function() {
    return this.event_
};
// goog.debug.entryPointRegistry = {};
// goog.debug.EntryPointMonitor = function() {};
// goog.debug.entryPointRegistry.refList_ = [];
// goog.debug.entryPointRegistry.monitors_ = [];
// goog.debug.entryPointRegistry.monitorsMayExist_ = !1;
// goog.debug.entryPointRegistry.register = function(a) {
//     goog.debug.entryPointRegistry.refList_[goog.debug.entryPointRegistry.refList_.length] = a;
//     if (goog.debug.entryPointRegistry.monitorsMayExist_)
//         for (var b = goog.debug.entryPointRegistry.monitors_, c = 0; c < b.length; c++) a(goog.bind(b[c].wrap, b[c]))
// };
// goog.debug.entryPointRegistry.monitorAll = function(a) {
//     goog.debug.entryPointRegistry.monitorsMayExist_ = !0;
//     for (var b = goog.bind(a.wrap, a), c = 0; c < goog.debug.entryPointRegistry.refList_.length; c++) goog.debug.entryPointRegistry.refList_[c](b);
//     goog.debug.entryPointRegistry.monitors_.push(a)
// };
// goog.debug.entryPointRegistry.unmonitorAllIfPossible = function(a) {
//     var b = goog.debug.entryPointRegistry.monitors_;
//     goog.asserts.assert(a == b[b.length - 1], "Only the most recent monitor can be unwrapped.");
//     a = goog.bind(a.unwrap, a);
//     for (var c = 0; c < goog.debug.entryPointRegistry.refList_.length; c++) goog.debug.entryPointRegistry.refList_[c](a);
//     b.length--
// };
goog.events.Listener = function(a, b, c, d, e, f) {
    goog.events.Listener.ENABLE_MONITORING && (this.creationStack = Error().stack);
    this.listener = a;
    this.proxy = b;
    this.src = c;
    this.type = d;
    this.capture = !!e;
    this.handler = f;
    this.key = goog.events.ListenableKey.reserveKey();
    this.removed = this.callOnce = !1
};
goog.events.Listener.ENABLE_MONITORING = !1;
goog.events.Listener.prototype.markAsRemoved = function() {
    this.removed = !0;
    this.handler = this.src = this.proxy = this.listener = null
};
goog.events.ListenerMap = function(a) {
    this.src = a;
    this.listeners = {};
    this.typeCount_ = 0
};
goog.events.ListenerMap.prototype.getTypeCount = function() {
    return this.typeCount_
};
goog.events.ListenerMap.prototype.getListenerCount = function() {
    var a = 0,
        b;
    for (b in this.listeners) a += this.listeners[b].length;
    return a
};
goog.events.ListenerMap.prototype.add = function(a, b, c, d, e) {
    var f = a.toString();
    a = this.listeners[f];
    a || (a = this.listeners[f] = [], this.typeCount_++);
    var g = goog.events.ListenerMap.findListenerIndex_(a, b, d, e); - 1 < g ? (b = a[g], c || (b.callOnce = !1)) : (b = new goog.events.Listener(b, null, this.src, f, !!d, e), b.callOnce = c, a.push(b));
    return b
};
goog.events.ListenerMap.prototype.remove = function(a, b, c, d) {
    a = a.toString();
    if (!(a in this.listeners)) return !1;
    var e = this.listeners[a];
    b = goog.events.ListenerMap.findListenerIndex_(e, b, c, d);
    return -1 < b ? (e[b].markAsRemoved(), goog.array.removeAt(e, b), 0 == e.length && (delete this.listeners[a], this.typeCount_--), !0) : !1
};
goog.events.ListenerMap.prototype.removeByKey = function(a) {
    var b = a.type;
    if (!(b in this.listeners)) return !1;
    var c = goog.array.remove(this.listeners[b], a);
    c && (a.markAsRemoved(), 0 == this.listeners[b].length && (delete this.listeners[b], this.typeCount_--));
    return c
};
goog.events.ListenerMap.prototype.removeAll = function(a) {
    a = a && a.toString();
    var b = 0,
        c;
    for (c in this.listeners)
        if (!a || c == a) {
            for (var d = this.listeners[c], e = 0; e < d.length; e++) ++b, d[e].markAsRemoved();
            delete this.listeners[c];
            this.typeCount_--
        } return b
};
goog.events.ListenerMap.prototype.getListeners = function(a, b) {
    var c = this.listeners[a.toString()],
        d = [];
    if (c)
        for (var e = 0; e < c.length; ++e) {
            var f = c[e];
            f.capture == b && d.push(f)
        }
    return d
};
goog.events.ListenerMap.prototype.getListener = function(a, b, c, d) {
    a = this.listeners[a.toString()];
    var e = -1;
    a && (e = goog.events.ListenerMap.findListenerIndex_(a, b, c, d));
    return -1 < e ? a[e] : null
};
goog.events.ListenerMap.prototype.hasListener = function(a, b) {
    var c = goog.isDef(a),
        d = c ? a.toString() : "",
        e = goog.isDef(b);
    return goog.object.some(this.listeners, function(a, g) {
        for (var h = 0; h < a.length; ++h)
            if (!(c && a[h].type != d || e && a[h].capture != b)) return !0;
        return !1
    })
};
goog.events.ListenerMap.findListenerIndex_ = function(a, b, c, d) {
    for (var e = 0; e < a.length; ++e) {
        var f = a[e];
        if (!f.removed && f.listener == b && f.capture == !!c && f.handler == d) return e
    }
    return -1
};
goog.events.LISTENER_MAP_PROP_ = "closure_lm_" + (1E6 * Math.random() | 0);
goog.events.onString_ = "on";
goog.events.onStringMap_ = {};
goog.events.CaptureSimulationMode = {
    OFF_AND_FAIL: 0,
    OFF_AND_SILENT: 1,
    ON: 2
};
goog.events.CAPTURE_SIMULATION_MODE = 2;
goog.events.listenerCountEstimate_ = 0;
goog.events.listen = function(a, b, c, d, e) {
    if (goog.isArray(b)) {
        for (var f = 0; f < b.length; f++) goog.events.listen(a, b[f], c, d, e);
        return null
    }
    c = goog.events.wrapListener(c);
    return goog.events.Listenable.isImplementedBy(a) ? a.listen(b, c, d, e) : goog.events.listen_(a, b, c, !1, d, e)
};
goog.events.listen_ = function(a, b, c, d, e, f) {
    if (!b) throw Error("Invalid event type");
    var g = !!e;
    if (g && !goog.events.BrowserFeature.HAS_W3C_EVENT_SUPPORT) {
        if (goog.events.CAPTURE_SIMULATION_MODE == goog.events.CaptureSimulationMode.OFF_AND_FAIL) return goog.asserts.fail("Can not register capture listener in IE8-."), null;
        if (goog.events.CAPTURE_SIMULATION_MODE == goog.events.CaptureSimulationMode.OFF_AND_SILENT) return null
    }
    var h = goog.events.getListenerMap_(a);
    h || (a[goog.events.LISTENER_MAP_PROP_] = h = new goog.events.ListenerMap(a));
    c = h.add(b, c, d, e, f);
    if (c.proxy) return c;
    d = goog.events.getProxy();
    c.proxy = d;
    d.src = a;
    d.listener = c;
    if (a.addEventListener) a.addEventListener(b.toString(), d, g);
    else if (a.attachEvent) a.attachEvent(goog.events.getOnString_(b.toString()), d);
    else throw Error("addEventListener and attachEvent are unavailable.");
    goog.events.listenerCountEstimate_++;
    return c
};
goog.events.getProxy = function() {
    var a = goog.events.handleBrowserEvent_,
        b = goog.events.BrowserFeature.HAS_W3C_EVENT_SUPPORT ? function(c) {
            return a.call(b.src, b.listener, c)
        } : function(c) {
            c = a.call(b.src, b.listener, c);
            if (!c) return c
        };
    return b
};
goog.events.listenOnce = function(a, b, c, d, e) {
    if (goog.isArray(b)) {
        for (var f = 0; f < b.length; f++) goog.events.listenOnce(a, b[f], c, d, e);
        return null
    }
    c = goog.events.wrapListener(c);
    return goog.events.Listenable.isImplementedBy(a) ? a.listenOnce(b, c, d, e) : goog.events.listen_(a, b, c, !0, d, e)
};
goog.events.listenWithWrapper = function(a, b, c, d, e) {
    b.listen(a, c, d, e)
};
goog.events.unlisten = function(a, b, c, d, e) {
    if (goog.isArray(b)) {
        for (var f = 0; f < b.length; f++) goog.events.unlisten(a, b[f], c, d, e);
        return null
    }
    c = goog.events.wrapListener(c);
    if (goog.events.Listenable.isImplementedBy(a)) return a.unlisten(b, c, d, e);
    if (!a) return !1;
    d = !!d;
    if (a = goog.events.getListenerMap_(a))
        if (b = a.getListener(b, c, d, e)) return goog.events.unlistenByKey(b);
    return !1
};
goog.events.unlistenByKey = function(a) {
    if (goog.isNumber(a) || !a || a.removed) return !1;
    var b = a.src;
    if (goog.events.Listenable.isImplementedBy(b)) return b.unlistenByKey(a);
    var c = a.type,
        d = a.proxy;
    b.removeEventListener ? b.removeEventListener(c, d, a.capture) : b.detachEvent && b.detachEvent(goog.events.getOnString_(c), d);
    goog.events.listenerCountEstimate_--;
    (c = goog.events.getListenerMap_(b)) ? (c.removeByKey(a), 0 == c.getTypeCount() && (c.src = null, b[goog.events.LISTENER_MAP_PROP_] = null)) : a.markAsRemoved();
    return !0
};
goog.events.unlistenWithWrapper = function(a, b, c, d, e) {
    b.unlisten(a, c, d, e)
};
goog.events.removeAll = function(a, b) {
    if (!a) return 0;
    if (goog.events.Listenable.isImplementedBy(a)) return a.removeAllListeners(b);
    var c = goog.events.getListenerMap_(a);
    if (!c) return 0;
    var d = 0,
        e = b && b.toString(),
        f;
    for (f in c.listeners)
        if (!e || f == e)
            for (var g = c.listeners[f].concat(), h = 0; h < g.length; ++h) goog.events.unlistenByKey(g[h]) && ++d;
    return d
};
goog.events.getListeners = function(a, b, c) {
    return goog.events.Listenable.isImplementedBy(a) ? a.getListeners(b, c) : a ? (a = goog.events.getListenerMap_(a)) ? a.getListeners(b, c) : [] : []
};
goog.events.getListener = function(a, b, c, d, e) {
    c = goog.events.wrapListener(c);
    d = !!d;
    return goog.events.Listenable.isImplementedBy(a) ? a.getListener(b, c, d, e) : a ? (a = goog.events.getListenerMap_(a)) ? a.getListener(b, c, d, e) : null : null
};
goog.events.hasListener = function(a, b, c) {
    if (goog.events.Listenable.isImplementedBy(a)) return a.hasListener(b, c);
    a = goog.events.getListenerMap_(a);
    return !!a && a.hasListener(b, c)
};
goog.events.expose = function(a) {
    var b = [],
        c;
    for (c in a) a[c] && a[c].id ? b.push(c + " = " + a[c] + " (" + a[c].id + ")") : b.push(c + " = " + a[c]);
    return b.join("\n")
};
goog.events.getOnString_ = function(a) {
    return a in goog.events.onStringMap_ ? goog.events.onStringMap_[a] : goog.events.onStringMap_[a] = goog.events.onString_ + a
};
goog.events.fireListeners = function(a, b, c, d) {
    return goog.events.Listenable.isImplementedBy(a) ? a.fireListeners(b, c, d) : goog.events.fireListeners_(a, b, c, d)
};
goog.events.fireListeners_ = function(a, b, c, d) {
    var e = !0;
    if (a = goog.events.getListenerMap_(a))
        if (b = a.listeners[b.toString()])
            for (b = b.concat(), a = 0; a < b.length; a++) {
                var f = b[a];
                f && f.capture == c && !f.removed && (f = goog.events.fireListener(f, d), e = e && !1 !== f)
            }
    return e
};
goog.events.fireListener = function(a, b) {
    var c = a.listener,
        d = a.handler || a.src;
    a.callOnce && goog.events.unlistenByKey(a);
    return c.call(d, b)
};
goog.events.getTotalListenerCount = function() {
    return goog.events.listenerCountEstimate_
};
goog.events.dispatchEvent = function(a, b) {
    goog.asserts.assert(goog.events.Listenable.isImplementedBy(a), "Can not use goog.events.dispatchEvent with non-goog.events.Listenable instance.");
    return a.dispatchEvent(b)
};
goog.events.protectBrowserEventEntryPoint = function(a) {
    goog.events.handleBrowserEvent_ = a.protectEntryPoint(goog.events.handleBrowserEvent_)
};
goog.events.handleBrowserEvent_ = function(a, b) {
    if (a.removed) return !0;
    if (!goog.events.BrowserFeature.HAS_W3C_EVENT_SUPPORT) {
        var c = b || goog.getObjectByName("window.event"),
            d = new goog.events.BrowserEvent(c, this),
            e = !0;
        if (goog.events.CAPTURE_SIMULATION_MODE == goog.events.CaptureSimulationMode.ON) {
            if (!goog.events.isMarkedIeEvent_(c)) {
                goog.events.markIeEvent_(c);
                for (var c = [], f = d.currentTarget; f; f = f.parentNode) c.push(f);
                for (var f = a.type, g = c.length - 1; !d.propagationStopped_ && 0 <= g; g--) {
                    d.currentTarget = c[g];
                    var h =
                        goog.events.fireListeners_(c[g], f, !0, d),
                        e = e && h
                }
                for (g = 0; !d.propagationStopped_ && g < c.length; g++) d.currentTarget = c[g], h = goog.events.fireListeners_(c[g], f, !1, d), e = e && h
            }
        } else e = goog.events.fireListener(a, d);
        return e
    }
    return goog.events.fireListener(a, new goog.events.BrowserEvent(b, this))
};
goog.events.markIeEvent_ = function(a) {
    var b = !1;
    if (0 == a.keyCode) try {
        a.keyCode = -1;
        return
    } catch (c) {
        b = !0
    }
    if (b || void 0 == a.returnValue) a.returnValue = !0
};
goog.events.isMarkedIeEvent_ = function(a) {
    return 0 > a.keyCode || void 0 != a.returnValue
};
goog.events.uniqueIdCounter_ = 0;
goog.events.getUniqueId = function(a) {
    return a + "_" + goog.events.uniqueIdCounter_++
};
goog.events.getListenerMap_ = function(a) {
    a = a[goog.events.LISTENER_MAP_PROP_];
    return a instanceof goog.events.ListenerMap ? a : null
};
goog.events.LISTENER_WRAPPER_PROP_ = "__closure_events_fn_" + (1E9 * Math.random() >>> 0);
goog.events.wrapListener = function(a) {
    goog.asserts.assert(a, "Listener can not be null.");
    if (goog.isFunction(a)) return a;
    goog.asserts.assert(a.handleEvent, "An object listener must have handleEvent method.");
    a[goog.events.LISTENER_WRAPPER_PROP_] || (a[goog.events.LISTENER_WRAPPER_PROP_] = function(b) {
        return a.handleEvent(b)
    });
    return a[goog.events.LISTENER_WRAPPER_PROP_]
};
// goog.debug.entryPointRegistry.register(function(a) {
//     goog.events.handleBrowserEvent_ = a(goog.events.handleBrowserEvent_)
// });
goog.dom.safe = {};
goog.dom.safe.InsertAdjacentHtmlPosition = {
    AFTERBEGIN: "afterbegin",
    AFTEREND: "afterend",
    BEFOREBEGIN: "beforebegin",
    BEFOREEND: "beforeend"
};
goog.dom.safe.insertAdjacentHtml = function(a, b, c) {
    a.insertAdjacentHTML(b, goog.html.SafeHtml.unwrap(c))
};
goog.dom.safe.setInnerHtml = function(a, b) {
    a.innerHTML = goog.html.SafeHtml.unwrap(b)
};
goog.dom.safe.setOuterHtml = function(a, b) {
    a.outerHTML = goog.html.SafeHtml.unwrap(b)
};
goog.dom.safe.documentWrite = function(a, b) {
    a.write(goog.html.SafeHtml.unwrap(b))
};
goog.dom.safe.setAnchorHref = function(a, b) {
    var c;
    c = b instanceof goog.html.SafeUrl ? b : goog.html.SafeUrl.sanitize(b);
    a.href = goog.html.SafeUrl.unwrap(c)
};
goog.dom.safe.setEmbedSrc = function(a, b) {
    a.src = goog.html.TrustedResourceUrl.unwrap(b)
};
goog.dom.safe.setFrameSrc = function(a, b) {
    a.src = goog.html.TrustedResourceUrl.unwrap(b)
};
goog.dom.safe.setIframeSrc = function(a, b) {
    a.src = goog.html.TrustedResourceUrl.unwrap(b)
};
goog.dom.safe.setLinkHrefAndRel = function(a, b, c) {
    a.rel = c;
    goog.string.caseInsensitiveContains(c, "stylesheet") ? (goog.asserts.assert(b instanceof goog.html.TrustedResourceUrl, 'URL must be TrustedResourceUrl because "rel" contains "stylesheet"'), a.href = goog.html.TrustedResourceUrl.unwrap(b)) : a.href = b instanceof goog.html.TrustedResourceUrl ? goog.html.TrustedResourceUrl.unwrap(b) : b instanceof goog.html.SafeUrl ? goog.html.SafeUrl.unwrap(b) : goog.html.SafeUrl.sanitize(b).getTypedStringValue()
};
goog.dom.safe.setObjectData = function(a, b) {
    a.data = goog.html.TrustedResourceUrl.unwrap(b)
};
goog.dom.safe.setScriptSrc = function(a, b) {
    a.src = goog.html.TrustedResourceUrl.unwrap(b)
};
goog.dom.safe.setLocationHref = function(a, b) {
    var c;
    c = b instanceof goog.html.SafeUrl ? b : goog.html.SafeUrl.sanitize(b);
    a.href = goog.html.SafeUrl.unwrap(c)
};
goog.dom.safe.openInWindow = function(a, b, c, d, e) {
    a = a instanceof goog.html.SafeUrl ? a : goog.html.SafeUrl.sanitize(a);
    return (b || window).open(goog.html.SafeUrl.unwrap(a), c ? goog.string.Const.unwrap(c) : "", d, e)
};
goog.math.Coordinate = function(a, b) {
    this.x = goog.isDef(a) ? a : 0;
    this.y = goog.isDef(b) ? b : 0
};
goog.math.Coordinate.prototype.clone = function() {
    return new goog.math.Coordinate(this.x, this.y)
};
goog.DEBUG && (goog.math.Coordinate.prototype.toString = function() {
    return "(" + this.x + ", " + this.y + ")"
});
goog.math.Coordinate.equals = function(a, b) {
    return a == b ? !0 : a && b ? a.x == b.x && a.y == b.y : !1
};
goog.math.Coordinate.distance = function(a, b) {
    var c = a.x - b.x,
        d = a.y - b.y;
    return Math.sqrt(c * c + d * d)
};
goog.math.Coordinate.magnitude = function(a) {
    return Math.sqrt(a.x * a.x + a.y * a.y)
};
goog.math.Coordinate.azimuth = function(a) {
    return goog.math.angle(0, 0, a.x, a.y)
};
goog.math.Coordinate.squaredDistance = function(a, b) {
    var c = a.x - b.x,
        d = a.y - b.y;
    return c * c + d * d
};
goog.math.Coordinate.difference = function(a, b) {
    return new goog.math.Coordinate(a.x - b.x, a.y - b.y)
};
goog.math.Coordinate.sum = function(a, b) {
    return new goog.math.Coordinate(a.x + b.x, a.y + b.y)
};
goog.math.Coordinate.prototype.ceil = function() {
    this.x = Math.ceil(this.x);
    this.y = Math.ceil(this.y);
    return this
};
goog.math.Coordinate.prototype.floor = function() {
    this.x = Math.floor(this.x);
    this.y = Math.floor(this.y);
    return this
};
goog.math.Coordinate.prototype.round = function() {
    this.x = Math.round(this.x);
    this.y = Math.round(this.y);
    return this
};
goog.math.Coordinate.prototype.translate = function(a, b) {
    a instanceof goog.math.Coordinate ? (this.x += a.x, this.y += a.y) : (this.x += a, goog.isNumber(b) && (this.y += b));
    return this
};
goog.math.Coordinate.prototype.scale = function(a, b) {
    var c = goog.isNumber(b) ? b : a;
    this.x *= a;
    this.y *= c;
    return this
};
goog.math.Coordinate.prototype.rotateRadians = function(a, b) {
    var c = b || new goog.math.Coordinate(0, 0),
        d = this.x,
        e = this.y,
        f = Math.cos(a),
        g = Math.sin(a);
    this.x = (d - c.x) * f - (e - c.y) * g + c.x;
    this.y = (d - c.x) * g + (e - c.y) * f + c.y
};
goog.math.Coordinate.prototype.rotateDegrees = function(a, b) {
    this.rotateRadians(goog.math.toRadians(a), b)
};
goog.math.Size = function(a, b) {
    this.width = a;
    this.height = b
};
goog.math.Size.equals = function(a, b) {
    return a == b ? !0 : a && b ? a.width == b.width && a.height == b.height : !1
};
goog.math.Size.prototype.clone = function() {
    return new goog.math.Size(this.width, this.height)
};
goog.DEBUG && (goog.math.Size.prototype.toString = function() {
    return "(" + this.width + " x " + this.height + ")"
});
goog.math.Size.prototype.getLongest = function() {
    return Math.max(this.width, this.height)
};
goog.math.Size.prototype.getShortest = function() {
    return Math.min(this.width, this.height)
};
goog.math.Size.prototype.area = function() {
    return this.width * this.height
};
goog.math.Size.prototype.perimeter = function() {
    return 2 * (this.width + this.height)
};
goog.math.Size.prototype.aspectRatio = function() {
    return this.width / this.height
};
goog.math.Size.prototype.isEmpty = function() {
    return !this.area()
};
goog.math.Size.prototype.ceil = function() {
    this.width = Math.ceil(this.width);
    this.height = Math.ceil(this.height);
    return this
};
goog.math.Size.prototype.fitsInside = function(a) {
    return this.width <= a.width && this.height <= a.height
};
goog.math.Size.prototype.floor = function() {
    this.width = Math.floor(this.width);
    this.height = Math.floor(this.height);
    return this
};
goog.math.Size.prototype.round = function() {
    this.width = Math.round(this.width);
    this.height = Math.round(this.height);
    return this
};
goog.math.Size.prototype.scale = function(a, b) {
    var c = goog.isNumber(b) ? b : a;
    this.width *= a;
    this.height *= c;
    return this
};
goog.math.Size.prototype.scaleToCover = function(a) {
    a = this.aspectRatio() <= a.aspectRatio() ? a.width / this.width : a.height / this.height;
    return this.scale(a)
};
goog.math.Size.prototype.scaleToFit = function(a) {
    a = this.aspectRatio() > a.aspectRatio() ? a.width / this.width : a.height / this.height;
    return this.scale(a)
};
goog.math.Box = function(a, b, c, d) {
    this.top = a;
    this.right = b;
    this.bottom = c;
    this.left = d
};
goog.math.Box.boundingBox = function(a) {
    for (var b = new goog.math.Box(arguments[0].y, arguments[0].x, arguments[0].y, arguments[0].x), c = 1; c < arguments.length; c++) b.expandToIncludeCoordinate(arguments[c]);
    return b
};
goog.math.Box.prototype.getWidth = function() {
    return this.right - this.left
};
goog.math.Box.prototype.getHeight = function() {
    return this.bottom - this.top
};
goog.math.Box.prototype.clone = function() {
    return new goog.math.Box(this.top, this.right, this.bottom, this.left)
};
goog.DEBUG && (goog.math.Box.prototype.toString = function() {
    return "(" + this.top + "t, " + this.right + "r, " + this.bottom + "b, " + this.left + "l)"
});
goog.math.Box.prototype.contains = function(a) {
    return goog.math.Box.contains(this, a)
};
goog.math.Box.prototype.expand = function(a, b, c, d) {
    goog.isObject(a) ? (this.top -= a.top, this.right += a.right, this.bottom += a.bottom, this.left -= a.left) : (this.top -= a, this.right += b, this.bottom += c, this.left -= d);
    return this
};
goog.math.Box.prototype.expandToInclude = function(a) {
    this.left = Math.min(this.left, a.left);
    this.top = Math.min(this.top, a.top);
    this.right = Math.max(this.right, a.right);
    this.bottom = Math.max(this.bottom, a.bottom)
};
goog.math.Box.prototype.expandToIncludeCoordinate = function(a) {
    this.top = Math.min(this.top, a.y);
    this.right = Math.max(this.right, a.x);
    this.bottom = Math.max(this.bottom, a.y);
    this.left = Math.min(this.left, a.x)
};
goog.math.Box.equals = function(a, b) {
    return a == b ? !0 : a && b ? a.top == b.top && a.right == b.right && a.bottom == b.bottom && a.left == b.left : !1
};
goog.math.Box.contains = function(a, b) {
    return a && b ? b instanceof goog.math.Box ? b.left >= a.left && b.right <= a.right && b.top >= a.top && b.bottom <= a.bottom : b.x >= a.left && b.x <= a.right && b.y >= a.top && b.y <= a.bottom : !1
};
goog.math.Box.relativePositionX = function(a, b) {
    return b.x < a.left ? b.x - a.left : b.x > a.right ? b.x - a.right : 0
};
goog.math.Box.relativePositionY = function(a, b) {
    return b.y < a.top ? b.y - a.top : b.y > a.bottom ? b.y - a.bottom : 0
};
goog.math.Box.distance = function(a, b) {
    var c = goog.math.Box.relativePositionX(a, b),
        d = goog.math.Box.relativePositionY(a, b);
    return Math.sqrt(c * c + d * d)
};
goog.math.Box.intersects = function(a, b) {
    return a.left <= b.right && b.left <= a.right && a.top <= b.bottom && b.top <= a.bottom
};
goog.math.Box.intersectsWithPadding = function(a, b, c) {
    return a.left <= b.right + c && b.left <= a.right + c && a.top <= b.bottom + c && b.top <= a.bottom + c
};
goog.math.Box.prototype.ceil = function() {
    this.top = Math.ceil(this.top);
    this.right = Math.ceil(this.right);
    this.bottom = Math.ceil(this.bottom);
    this.left = Math.ceil(this.left);
    return this
};
goog.math.Box.prototype.floor = function() {
    this.top = Math.floor(this.top);
    this.right = Math.floor(this.right);
    this.bottom = Math.floor(this.bottom);
    this.left = Math.floor(this.left);
    return this
};
goog.math.Box.prototype.round = function() {
    this.top = Math.round(this.top);
    this.right = Math.round(this.right);
    this.bottom = Math.round(this.bottom);
    this.left = Math.round(this.left);
    return this
};
goog.math.Box.prototype.translate = function(a, b) {
    a instanceof goog.math.Coordinate ? (this.left += a.x, this.right += a.x, this.top += a.y, this.bottom += a.y) : (this.left += a, this.right += a, goog.isNumber(b) && (this.top += b, this.bottom += b));
    return this
};
goog.math.Box.prototype.scale = function(a, b) {
    var c = goog.isNumber(b) ? b : a;
    this.left *= a;
    this.right *= a;
    this.top *= c;
    this.bottom *= c;
    return this
};
goog.math.Rect = function(a, b, c, d) {
    this.left = a;
    this.top = b;
    this.width = c;
    this.height = d
};
goog.math.Rect.prototype.clone = function() {
    return new goog.math.Rect(this.left, this.top, this.width, this.height)
};
goog.math.Rect.prototype.toBox = function() {
    return new goog.math.Box(this.top, this.left + this.width, this.top + this.height, this.left)
};
goog.math.Rect.createFromPositionAndSize = function(a, b) {
    return new goog.math.Rect(a.x, a.y, b.width, b.height)
};
goog.math.Rect.createFromBox = function(a) {
    return new goog.math.Rect(a.left, a.top, a.right - a.left, a.bottom - a.top)
};
goog.DEBUG && (goog.math.Rect.prototype.toString = function() {
    return "(" + this.left + ", " + this.top + " - " + this.width + "w x " + this.height + "h)"
});
goog.math.Rect.equals = function(a, b) {
    return a == b ? !0 : a && b ? a.left == b.left && a.width == b.width && a.top == b.top && a.height == b.height : !1
};
goog.math.Rect.prototype.intersection = function(a) {
    var b = Math.max(this.left, a.left),
        c = Math.min(this.left + this.width, a.left + a.width);
    if (b <= c) {
        var d = Math.max(this.top, a.top);
        a = Math.min(this.top + this.height, a.top + a.height);
        if (d <= a) return this.left = b, this.top = d, this.width = c - b, this.height = a - d, !0
    }
    return !1
};
goog.math.Rect.intersection = function(a, b) {
    var c = Math.max(a.left, b.left),
        d = Math.min(a.left + a.width, b.left + b.width);
    if (c <= d) {
        var e = Math.max(a.top, b.top),
            f = Math.min(a.top + a.height, b.top + b.height);
        if (e <= f) return new goog.math.Rect(c, e, d - c, f - e)
    }
    return null
};
goog.math.Rect.intersects = function(a, b) {
    return a.left <= b.left + b.width && b.left <= a.left + a.width && a.top <= b.top + b.height && b.top <= a.top + a.height
};
goog.math.Rect.prototype.intersects = function(a) {
    return goog.math.Rect.intersects(this, a)
};
goog.math.Rect.difference = function(a, b) {
    var c = goog.math.Rect.intersection(a, b);
    if (!c || !c.height || !c.width) return [a.clone()];
    var c = [],
        d = a.top,
        e = a.height,
        f = a.left + a.width,
        g = a.top + a.height,
        h = b.left + b.width,
        k = b.top + b.height;
    b.top > a.top && (c.push(new goog.math.Rect(a.left, a.top, a.width, b.top - a.top)), d = b.top, e -= b.top - a.top);
    k < g && (c.push(new goog.math.Rect(a.left, k, a.width, g - k)), e = k - d);
    b.left > a.left && c.push(new goog.math.Rect(a.left, d, b.left - a.left, e));
    h < f && c.push(new goog.math.Rect(h, d, f - h, e));
    return c
};
goog.math.Rect.prototype.difference = function(a) {
    return goog.math.Rect.difference(this, a)
};
goog.math.Rect.prototype.boundingRect = function(a) {
    var b = Math.max(this.left + this.width, a.left + a.width),
        c = Math.max(this.top + this.height, a.top + a.height);
    this.left = Math.min(this.left, a.left);
    this.top = Math.min(this.top, a.top);
    this.width = b - this.left;
    this.height = c - this.top
};
goog.math.Rect.boundingRect = function(a, b) {
    if (!a || !b) return null;
    var c = a.clone();
    c.boundingRect(b);
    return c
};
goog.math.Rect.prototype.contains = function(a) {
    return a instanceof goog.math.Rect ? this.left <= a.left && this.left + this.width >= a.left + a.width && this.top <= a.top && this.top + this.height >= a.top + a.height : a.x >= this.left && a.x <= this.left + this.width && a.y >= this.top && a.y <= this.top + this.height
};
goog.math.Rect.prototype.squaredDistance = function(a) {
    var b = a.x < this.left ? this.left - a.x : Math.max(a.x - (this.left + this.width), 0);
    a = a.y < this.top ? this.top - a.y : Math.max(a.y - (this.top + this.height), 0);
    return b * b + a * a
};
goog.math.Rect.prototype.distance = function(a) {
    return Math.sqrt(this.squaredDistance(a))
};
goog.math.Rect.prototype.getSize = function() {
    return new goog.math.Size(this.width, this.height)
};
goog.math.Rect.prototype.getTopLeft = function() {
    return new goog.math.Coordinate(this.left, this.top)
};
goog.math.Rect.prototype.getCenter = function() {
    return new goog.math.Coordinate(this.left + this.width / 2, this.top + this.height / 2)
};
goog.math.Rect.prototype.getBottomRight = function() {
    return new goog.math.Coordinate(this.left + this.width, this.top + this.height)
};
goog.math.Rect.prototype.ceil = function() {
    this.left = Math.ceil(this.left);
    this.top = Math.ceil(this.top);
    this.width = Math.ceil(this.width);
    this.height = Math.ceil(this.height);
    return this
};
goog.math.Rect.prototype.floor = function() {
    this.left = Math.floor(this.left);
    this.top = Math.floor(this.top);
    this.width = Math.floor(this.width);
    this.height = Math.floor(this.height);
    return this
};
goog.math.Rect.prototype.round = function() {
    this.left = Math.round(this.left);
    this.top = Math.round(this.top);
    this.width = Math.round(this.width);
    this.height = Math.round(this.height);
    return this
};
goog.math.Rect.prototype.translate = function(a, b) {
    a instanceof goog.math.Coordinate ? (this.left += a.x, this.top += a.y) : (this.left += a, goog.isNumber(b) && (this.top += b));
    return this
};
goog.math.Rect.prototype.scale = function(a, b) {
    var c = goog.isNumber(b) ? b : a;
    this.left *= a;
    this.width *= a;
    this.top *= c;
    this.height *= c;
    return this
};
goog.dom.BrowserFeature = {
    CAN_ADD_NAME_OR_TYPE_ATTRIBUTES: !goog.userAgent.IE || goog.userAgent.isDocumentModeOrHigher(9),
    CAN_USE_CHILDREN_ATTRIBUTE: !goog.userAgent.GECKO && !goog.userAgent.IE || goog.userAgent.IE && goog.userAgent.isDocumentModeOrHigher(9) || goog.userAgent.GECKO && goog.userAgent.isVersionOrHigher("1.9.1"),
    CAN_USE_INNER_TEXT: goog.userAgent.IE && !goog.userAgent.isVersionOrHigher("9"),
    CAN_USE_PARENT_ELEMENT_PROPERTY: goog.userAgent.IE || goog.userAgent.OPERA || goog.userAgent.WEBKIT,
    INNER_HTML_NEEDS_SCOPED_ELEMENT: goog.userAgent.IE,
    LEGACY_IE_RANGES: goog.userAgent.IE && !goog.userAgent.isDocumentModeOrHigher(9)
};
goog.dom.ASSUME_QUIRKS_MODE = !1;
goog.dom.ASSUME_STANDARDS_MODE = !1;
goog.dom.COMPAT_MODE_KNOWN_ = goog.dom.ASSUME_QUIRKS_MODE || goog.dom.ASSUME_STANDARDS_MODE;
goog.dom.getDomHelper = function(a) {
    return a ? new goog.dom.DomHelper(goog.dom.getOwnerDocument(a)) : goog.dom.defaultDomHelper_ || (goog.dom.defaultDomHelper_ = new goog.dom.DomHelper)
};
goog.dom.getDocument = function() {
    return document
};
goog.dom.getElement = function(a) {
    return goog.dom.getElementHelper_(document, a)
};
goog.dom.getElementHelper_ = function(a, b) {
    return goog.isString(b) ? a.getElementById(b) : b
};
goog.dom.getRequiredElement = function(a) {
    return goog.dom.getRequiredElementHelper_(document, a)
};
goog.dom.getRequiredElementHelper_ = function(a, b) {
    goog.asserts.assertString(b);
    var c = goog.dom.getElementHelper_(a, b);
    return c = goog.asserts.assertElement(c, "No element found with id: " + b)
};
goog.dom.$ = goog.dom.getElement;
goog.dom.getElementsByTagNameAndClass = function(a, b, c) {
    return goog.dom.getElementsByTagNameAndClass_(document, a, b, c)
};
goog.dom.getElementsByClass = function(a, b) {
    var c = b || document;
    return goog.dom.canUseQuerySelector_(c) ? c.querySelectorAll("." + a) : goog.dom.getElementsByTagNameAndClass_(document, "*", a, b)
};
goog.dom.getElementByClass = function(a, b) {
    var c = b || document,
        d = null;
    return (d = c.getElementsByClassName ? c.getElementsByClassName(a)[0] : goog.dom.canUseQuerySelector_(c) ? c.querySelector("." + a) : goog.dom.getElementsByTagNameAndClass_(document, "*", a, b)[0]) || null
};
goog.dom.getRequiredElementByClass = function(a, b) {
    var c = goog.dom.getElementByClass(a, b);
    return goog.asserts.assert(c, "No element found with className: " + a)
};
goog.dom.canUseQuerySelector_ = function(a) {
    return !(!a.querySelectorAll || !a.querySelector)
};
goog.dom.getElementsByTagNameAndClass_ = function(a, b, c, d) {
    a = d || a;
    b = b && "*" != b ? b.toUpperCase() : "";
    if (goog.dom.canUseQuerySelector_(a) && (b || c)) return a.querySelectorAll(b + (c ? "." + c : ""));
    if (c && a.getElementsByClassName) {
        a = a.getElementsByClassName(c);
        if (b) {
            d = {};
            for (var e = 0, f = 0, g; g = a[f]; f++) b == g.nodeName && (d[e++] = g);
            d.length = e;
            return d
        }
        return a
    }
    a = a.getElementsByTagName(b || "*");
    if (c) {
        d = {};
        for (f = e = 0; g = a[f]; f++) b = g.className, "function" == typeof b.split && goog.array.contains(b.split(/\s+/), c) && (d[e++] = g);
        d.length =
            e;
        return d
    }
    return a
};
goog.dom.$$ = goog.dom.getElementsByTagNameAndClass;
goog.dom.setProperties = function(a, b) {
    goog.object.forEach(b, function(b, d) {
        "style" == d ? a.style.cssText = b : "class" == d ? a.className = b : "for" == d ? a.htmlFor = b : goog.dom.DIRECT_ATTRIBUTE_MAP_.hasOwnProperty(d) ? a.setAttribute(goog.dom.DIRECT_ATTRIBUTE_MAP_[d], b) : goog.string.startsWith(d, "aria-") || goog.string.startsWith(d, "data-") ? a.setAttribute(d, b) : a[d] = b
    })
};
goog.dom.DIRECT_ATTRIBUTE_MAP_ = {
    cellpadding: "cellPadding",
    cellspacing: "cellSpacing",
    colspan: "colSpan",
    frameborder: "frameBorder",
    height: "height",
    maxlength: "maxLength",
    role: "role",
    rowspan: "rowSpan",
    type: "type",
    usemap: "useMap",
    valign: "vAlign",
    width: "width"
};
goog.dom.getViewportSize = function(a) {
    return goog.dom.getViewportSize_(a || window)
};
goog.dom.getViewportSize_ = function(a) {
    a = a.document;
    a = goog.dom.isCss1CompatMode_(a) ? a.documentElement : a.body;
    return new goog.math.Size(a.clientWidth, a.clientHeight)
};
goog.dom.getDocumentHeight = function() {
    return goog.dom.getDocumentHeight_(window)
};
goog.dom.getDocumentHeight_ = function(a) {
    var b = a.document,
        c = 0;
    if (b) {
        var c = b.body,
            d = b.documentElement;
        if (!d || !c) return 0;
        a = goog.dom.getViewportSize_(a).height;
        if (goog.dom.isCss1CompatMode_(b) && d.scrollHeight) c = d.scrollHeight != a ? d.scrollHeight : d.offsetHeight;
        else {
            var b = d.scrollHeight,
                e = d.offsetHeight;
            d.clientHeight != e && (b = c.scrollHeight, e = c.offsetHeight);
            c = b > a ? b > e ? b : e : b < e ? b : e
        }
    }
    return c
};
goog.dom.getPageScroll = function(a) {
    return goog.dom.getDomHelper((a || goog.global || window).document).getDocumentScroll()
};
goog.dom.getDocumentScroll = function() {
    return goog.dom.getDocumentScroll_(document)
};
goog.dom.getDocumentScroll_ = function(a) {
    var b = goog.dom.getDocumentScrollElement_(a);
    a = goog.dom.getWindow_(a);
    return goog.userAgent.IE && goog.userAgent.isVersionOrHigher("10") && a.pageYOffset != b.scrollTop ? new goog.math.Coordinate(b.scrollLeft, b.scrollTop) : new goog.math.Coordinate(a.pageXOffset || b.scrollLeft, a.pageYOffset || b.scrollTop)
};
goog.dom.getDocumentScrollElement = function() {
    return goog.dom.getDocumentScrollElement_(document)
};
goog.dom.getDocumentScrollElement_ = function(a) {
    return a.scrollingElement ? a.scrollingElement : !goog.userAgent.WEBKIT && goog.dom.isCss1CompatMode_(a) ? a.documentElement : a.body || a.documentElement
};
goog.dom.getWindow = function(a) {
    return a ? goog.dom.getWindow_(a) : window
};
goog.dom.getWindow_ = function(a) {
    return a.parentWindow || a.defaultView
};
goog.dom.createDom = function(a, b, c) {
    return goog.dom.createDom_(document, arguments)
};
goog.dom.createDom_ = function(a, b) {
    var c = b[0],
        d = b[1];
    if (!goog.dom.BrowserFeature.CAN_ADD_NAME_OR_TYPE_ATTRIBUTES && d && (d.name || d.type)) {
        c = ["<", c];
        d.name && c.push(' name="', goog.string.htmlEscape(d.name), '"');
        if (d.type) {
            c.push(' type="', goog.string.htmlEscape(d.type), '"');
            var e = {};
            goog.object.extend(e, d);
            delete e.type;
            d = e
        }
        c.push(">");
        c = c.join("")
    }
    c = a.createElement(c);
    d && (goog.isString(d) ? c.className = d : goog.isArray(d) ? c.className = d.join(" ") : goog.dom.setProperties(c, d));
    2 < b.length && goog.dom.append_(a,
        c, b, 2);
    return c
};
goog.dom.append_ = function(a, b, c, d) {
    function e(c) {
        c && b.appendChild(goog.isString(c) ? a.createTextNode(c) : c)
    }
    for (; d < c.length; d++) {
        var f = c[d];
        goog.isArrayLike(f) && !goog.dom.isNodeLike(f) ? goog.array.forEach(goog.dom.isNodeList(f) ? goog.array.toArray(f) : f, e) : e(f)
    }
};
goog.dom.$dom = goog.dom.createDom;
goog.dom.createElement = function(a) {
    return document.createElement(a)
};
goog.dom.createTextNode = function(a) {
    return document.createTextNode(String(a))
};
goog.dom.createTable = function(a, b, c) {
    return goog.dom.createTable_(document, a, b, !!c)
};
goog.dom.createTable_ = function(a, b, c, d) {
    for (var e = a.createElement(goog.dom.TagName.TABLE), f = e.appendChild(a.createElement(goog.dom.TagName.TBODY)), g = 0; g < b; g++) {
        for (var h = a.createElement(goog.dom.TagName.TR), k = 0; k < c; k++) {
            var l = a.createElement(goog.dom.TagName.TD);
            d && goog.dom.setTextContent(l, goog.string.Unicode.NBSP);
            h.appendChild(l)
        }
        f.appendChild(h)
    }
    return e
};
goog.dom.safeHtmlToNode = function(a) {
    return goog.dom.safeHtmlToNode_(document, a)
};
goog.dom.safeHtmlToNode_ = function(a, b) {
    var c = a.createElement(goog.dom.TagName.DIV);
    goog.dom.BrowserFeature.INNER_HTML_NEEDS_SCOPED_ELEMENT ? (goog.dom.safe.setInnerHtml(c, goog.html.SafeHtml.concat(goog.html.SafeHtml.create("br"), b)), c.removeChild(c.firstChild)) : goog.dom.safe.setInnerHtml(c, b);
    return goog.dom.childrenToNode_(a, c)
};
goog.dom.htmlToDocumentFragment = function(a) {
    return goog.dom.htmlToDocumentFragment_(document, a)
};
goog.dom.htmlToDocumentFragment_ = function(a, b) {
    var c = a.createElement(goog.dom.TagName.DIV);
    goog.dom.BrowserFeature.INNER_HTML_NEEDS_SCOPED_ELEMENT ? (c.innerHTML = "<br>" + b, c.removeChild(c.firstChild)) : c.innerHTML = b;
    return goog.dom.childrenToNode_(a, c)
};
goog.dom.childrenToNode_ = function(a, b) {
    if (1 == b.childNodes.length) return b.removeChild(b.firstChild);
    for (var c = a.createDocumentFragment(); b.firstChild;) c.appendChild(b.firstChild);
    return c
};
goog.dom.isCss1CompatMode = function() {
    return goog.dom.isCss1CompatMode_(document)
};
goog.dom.isCss1CompatMode_ = function(a) {
    return goog.dom.COMPAT_MODE_KNOWN_ ? goog.dom.ASSUME_STANDARDS_MODE : "CSS1Compat" == a.compatMode
};
goog.dom.canHaveChildren = function(a) {
    if (a.nodeType != goog.dom.NodeType.ELEMENT) return !1;
    switch (a.tagName) {
        case goog.dom.TagName.APPLET:
        case goog.dom.TagName.AREA:
        case goog.dom.TagName.BASE:
        case goog.dom.TagName.BR:
        case goog.dom.TagName.COL:
        case goog.dom.TagName.COMMAND:
        case goog.dom.TagName.EMBED:
        case goog.dom.TagName.FRAME:
        case goog.dom.TagName.HR:
        case goog.dom.TagName.IMG:
        case goog.dom.TagName.INPUT:
        case goog.dom.TagName.IFRAME:
        case goog.dom.TagName.ISINDEX:
        case goog.dom.TagName.KEYGEN:
        case goog.dom.TagName.LINK:
        case goog.dom.TagName.NOFRAMES:
        case goog.dom.TagName.NOSCRIPT:
        case goog.dom.TagName.META:
        case goog.dom.TagName.OBJECT:
        case goog.dom.TagName.PARAM:
        case goog.dom.TagName.SCRIPT:
        case goog.dom.TagName.SOURCE:
        case goog.dom.TagName.STYLE:
        case goog.dom.TagName.TRACK:
        case goog.dom.TagName.WBR:
            return !1
    }
    return !0
};
goog.dom.appendChild = function(a, b) {
    a.appendChild(b)
};
goog.dom.append = function(a, b) {
    goog.dom.append_(goog.dom.getOwnerDocument(a), a, arguments, 1)
};
goog.dom.removeChildren = function(a) {
    for (var b; b = a.firstChild;) a.removeChild(b)
};
goog.dom.insertSiblingBefore = function(a, b) {
    b.parentNode && b.parentNode.insertBefore(a, b)
};
goog.dom.insertSiblingAfter = function(a, b) {
    b.parentNode && b.parentNode.insertBefore(a, b.nextSibling)
};
goog.dom.insertChildAt = function(a, b, c) {
    a.insertBefore(b, a.childNodes[c] || null)
};
goog.dom.removeNode = function(a) {
    return a && a.parentNode ? a.parentNode.removeChild(a) : null
};
goog.dom.replaceNode = function(a, b) {
    var c = b.parentNode;
    c && c.replaceChild(a, b)
};
goog.dom.flattenElement = function(a) {
    var b, c = a.parentNode;
    if (c && c.nodeType != goog.dom.NodeType.DOCUMENT_FRAGMENT) {
        if (a.removeNode) return a.removeNode(!1);
        for (; b = a.firstChild;) c.insertBefore(b, a);
        return goog.dom.removeNode(a)
    }
};
goog.dom.getChildren = function(a) {
    return goog.dom.BrowserFeature.CAN_USE_CHILDREN_ATTRIBUTE && void 0 != a.children ? a.children : goog.array.filter(a.childNodes, function(a) {
        return a.nodeType == goog.dom.NodeType.ELEMENT
    })
};
goog.dom.getFirstElementChild = function(a) {
    return goog.isDef(a.firstElementChild) ? a.firstElementChild : goog.dom.getNextElementNode_(a.firstChild, !0)
};
goog.dom.getLastElementChild = function(a) {
    return goog.isDef(a.lastElementChild) ? a.lastElementChild : goog.dom.getNextElementNode_(a.lastChild, !1)
};
goog.dom.getNextElementSibling = function(a) {
    return goog.isDef(a.nextElementSibling) ? a.nextElementSibling : goog.dom.getNextElementNode_(a.nextSibling, !0)
};
goog.dom.getPreviousElementSibling = function(a) {
    return goog.isDef(a.previousElementSibling) ? a.previousElementSibling : goog.dom.getNextElementNode_(a.previousSibling, !1)
};
goog.dom.getNextElementNode_ = function(a, b) {
    for (; a && a.nodeType != goog.dom.NodeType.ELEMENT;) a = b ? a.nextSibling : a.previousSibling;
    return a
};
goog.dom.getNextNode = function(a) {
    if (!a) return null;
    if (a.firstChild) return a.firstChild;
    for (; a && !a.nextSibling;) a = a.parentNode;
    return a ? a.nextSibling : null
};
goog.dom.getPreviousNode = function(a) {
    if (!a) return null;
    if (!a.previousSibling) return a.parentNode;
    for (a = a.previousSibling; a && a.lastChild;) a = a.lastChild;
    return a
};
goog.dom.isNodeLike = function(a) {
    return goog.isObject(a) && 0 < a.nodeType
};
goog.dom.isElement = function(a) {
    return goog.isObject(a) && a.nodeType == goog.dom.NodeType.ELEMENT
};
goog.dom.isWindow = function(a) {
    return goog.isObject(a) && a.window == a
};
goog.dom.getParentElement = function(a) {
    var b;
    if (goog.dom.BrowserFeature.CAN_USE_PARENT_ELEMENT_PROPERTY && !(goog.userAgent.IE && goog.userAgent.isVersionOrHigher("9") && !goog.userAgent.isVersionOrHigher("10") && goog.global.SVGElement && a instanceof goog.global.SVGElement) && (b = a.parentElement)) return b;
    b = a.parentNode;
    return goog.dom.isElement(b) ? b : null
};
goog.dom.contains = function(a, b) {
    if (a.contains && b.nodeType == goog.dom.NodeType.ELEMENT) return a == b || a.contains(b);
    if ("undefined" != typeof a.compareDocumentPosition) return a == b || Boolean(a.compareDocumentPosition(b) & 16);
    for (; b && a != b;) b = b.parentNode;
    return b == a
};
goog.dom.compareNodeOrder = function(a, b) {
    if (a == b) return 0;
    if (a.compareDocumentPosition) return a.compareDocumentPosition(b) & 2 ? 1 : -1;
    if (goog.userAgent.IE && !goog.userAgent.isDocumentModeOrHigher(9)) {
        if (a.nodeType == goog.dom.NodeType.DOCUMENT) return -1;
        if (b.nodeType == goog.dom.NodeType.DOCUMENT) return 1
    }
    if ("sourceIndex" in a || a.parentNode && "sourceIndex" in a.parentNode) {
        var c = a.nodeType == goog.dom.NodeType.ELEMENT,
            d = b.nodeType == goog.dom.NodeType.ELEMENT;
        if (c && d) return a.sourceIndex - b.sourceIndex;
        var e = a.parentNode,
            f = b.parentNode;
        return e == f ? goog.dom.compareSiblingOrder_(a, b) : !c && goog.dom.contains(e, b) ? -1 * goog.dom.compareParentsDescendantNodeIe_(a, b) : !d && goog.dom.contains(f, a) ? goog.dom.compareParentsDescendantNodeIe_(b, a) : (c ? a.sourceIndex : e.sourceIndex) - (d ? b.sourceIndex : f.sourceIndex)
    }
    d = goog.dom.getOwnerDocument(a);
    c = d.createRange();
    c.selectNode(a);
    c.collapse(!0);
    d = d.createRange();
    d.selectNode(b);
    d.collapse(!0);
    return c.compareBoundaryPoints(goog.global.Range.START_TO_END, d)
};
goog.dom.compareParentsDescendantNodeIe_ = function(a, b) {
    var c = a.parentNode;
    if (c == b) return -1;
    for (var d = b; d.parentNode != c;) d = d.parentNode;
    return goog.dom.compareSiblingOrder_(d, a)
};
goog.dom.compareSiblingOrder_ = function(a, b) {
    for (var c = b; c = c.previousSibling;)
        if (c == a) return -1;
    return 1
};
goog.dom.findCommonAncestor = function(a) {
    var b, c = arguments.length;
    if (!c) return null;
    if (1 == c) return arguments[0];
    var d = [],
        e = Infinity;
    for (b = 0; b < c; b++) {
        for (var f = [], g = arguments[b]; g;) f.unshift(g), g = g.parentNode;
        d.push(f);
        e = Math.min(e, f.length)
    }
    f = null;
    for (b = 0; b < e; b++) {
        for (var g = d[0][b], h = 1; h < c; h++)
            if (g != d[h][b]) return f;
        f = g
    }
    return f
};
goog.dom.getOwnerDocument = function(a) {
    goog.asserts.assert(a, "Node cannot be null or undefined.");
    return a.nodeType == goog.dom.NodeType.DOCUMENT ? a : a.ownerDocument || a.document
};
goog.dom.getFrameContentDocument = function(a) {
    return a.contentDocument || a.contentWindow.document
};
goog.dom.getFrameContentWindow = function(a) {
    try {
        return a.contentWindow || (a.contentDocument ? goog.dom.getWindow(a.contentDocument) : null)
    } catch (b) {}
    return null
};
goog.dom.setTextContent = function(a, b) {
    goog.asserts.assert(null != a, "goog.dom.setTextContent expects a non-null value for node");
    if ("textContent" in a) a.textContent = b;
    else if (a.nodeType == goog.dom.NodeType.TEXT) a.data = b;
    else if (a.firstChild && a.firstChild.nodeType == goog.dom.NodeType.TEXT) {
        for (; a.lastChild != a.firstChild;) a.removeChild(a.lastChild);
        a.firstChild.data = b
    } else {
        goog.dom.removeChildren(a);
        var c = goog.dom.getOwnerDocument(a);
        a.appendChild(c.createTextNode(String(b)))
    }
};
goog.dom.getOuterHtml = function(a) {
    if ("outerHTML" in a) return a.outerHTML;
    var b = goog.dom.getOwnerDocument(a).createElement(goog.dom.TagName.DIV);
    b.appendChild(a.cloneNode(!0));
    return b.innerHTML
};
goog.dom.findNode = function(a, b) {
    var c = [];
    return goog.dom.findNodes_(a, b, c, !0) ? c[0] : void 0
};
goog.dom.findNodes = function(a, b) {
    var c = [];
    goog.dom.findNodes_(a, b, c, !1);
    return c
};
goog.dom.findNodes_ = function(a, b, c, d) {
    if (null != a)
        for (a = a.firstChild; a;) {
            if (b(a) && (c.push(a), d) || goog.dom.findNodes_(a, b, c, d)) return !0;
            a = a.nextSibling
        }
    return !1
};
goog.dom.TAGS_TO_IGNORE_ = {
    SCRIPT: 1,
    STYLE: 1,
    HEAD: 1,
    IFRAME: 1,
    OBJECT: 1
};
goog.dom.PREDEFINED_TAG_VALUES_ = {
    IMG: " ",
    BR: "\n"
};
goog.dom.isFocusableTabIndex = function(a) {
    return goog.dom.hasSpecifiedTabIndex_(a) && goog.dom.isTabIndexFocusable_(a)
};
goog.dom.setFocusableTabIndex = function(a, b) {
    b ? a.tabIndex = 0 : (a.tabIndex = -1, a.removeAttribute("tabIndex"))
};
goog.dom.isFocusable = function(a) {
    var b;
    return (b = goog.dom.nativelySupportsFocus_(a) ? !a.disabled && (!goog.dom.hasSpecifiedTabIndex_(a) || goog.dom.isTabIndexFocusable_(a)) : goog.dom.isFocusableTabIndex(a)) && goog.userAgent.IE ? goog.dom.hasNonZeroBoundingRect_(a) : b
};
goog.dom.hasSpecifiedTabIndex_ = function(a) {
    a = a.getAttributeNode("tabindex");
    return goog.isDefAndNotNull(a) && a.specified
};
goog.dom.isTabIndexFocusable_ = function(a) {
    a = a.tabIndex;
    return goog.isNumber(a) && 0 <= a && 32768 > a
};
goog.dom.nativelySupportsFocus_ = function(a) {
    return a.tagName == goog.dom.TagName.A || a.tagName == goog.dom.TagName.INPUT || a.tagName == goog.dom.TagName.TEXTAREA || a.tagName == goog.dom.TagName.SELECT || a.tagName == goog.dom.TagName.BUTTON
};
goog.dom.hasNonZeroBoundingRect_ = function(a) {
    a = goog.isFunction(a.getBoundingClientRect) ? a.getBoundingClientRect() : {
        height: a.offsetHeight,
        width: a.offsetWidth
    };
    return goog.isDefAndNotNull(a) && 0 < a.height && 0 < a.width
};
goog.dom.getTextContent = function(a) {
    if (goog.dom.BrowserFeature.CAN_USE_INNER_TEXT && "innerText" in a) a = goog.string.canonicalizeNewlines(a.innerText);
    else {
        var b = [];
        goog.dom.getTextContent_(a, b, !0);
        a = b.join("")
    }
    a = a.replace(/ \xAD /g, " ").replace(/\xAD/g, "");
    a = a.replace(/\u200B/g, "");
    goog.dom.BrowserFeature.CAN_USE_INNER_TEXT || (a = a.replace(/ +/g, " "));
    " " != a && (a = a.replace(/^\s*/, ""));
    return a
};
goog.dom.getRawTextContent = function(a) {
    var b = [];
    goog.dom.getTextContent_(a, b, !1);
    return b.join("")
};
goog.dom.getTextContent_ = function(a, b, c) {
    if (!(a.nodeName in goog.dom.TAGS_TO_IGNORE_))
        if (a.nodeType == goog.dom.NodeType.TEXT) c ? b.push(String(a.nodeValue).replace(/(\r\n|\r|\n)/g, "")) : b.push(a.nodeValue);
        else if (a.nodeName in goog.dom.PREDEFINED_TAG_VALUES_) b.push(goog.dom.PREDEFINED_TAG_VALUES_[a.nodeName]);
    else
        for (a = a.firstChild; a;) goog.dom.getTextContent_(a, b, c), a = a.nextSibling
};
goog.dom.getNodeTextLength = function(a) {
    return goog.dom.getTextContent(a).length
};
goog.dom.getNodeTextOffset = function(a, b) {
    for (var c = b || goog.dom.getOwnerDocument(a).body, d = []; a && a != c;) {
        for (var e = a; e = e.previousSibling;) d.unshift(goog.dom.getTextContent(e));
        a = a.parentNode
    }
    return goog.string.trimLeft(d.join("")).replace(/ +/g, " ").length
};
goog.dom.getNodeAtOffset = function(a, b, c) {
    a = [a];
    for (var d = 0, e = null; 0 < a.length && d < b;)
        if (e = a.pop(), !(e.nodeName in goog.dom.TAGS_TO_IGNORE_))
            if (e.nodeType == goog.dom.NodeType.TEXT) var f = e.nodeValue.replace(/(\r\n|\r|\n)/g, "").replace(/ +/g, " "),
                d = d + f.length;
            else if (e.nodeName in goog.dom.PREDEFINED_TAG_VALUES_) d += goog.dom.PREDEFINED_TAG_VALUES_[e.nodeName].length;
    else
        for (f = e.childNodes.length - 1; 0 <= f; f--) a.push(e.childNodes[f]);
    goog.isObject(c) && (c.remainder = e ? e.nodeValue.length + b - d - 1 : 0, c.node = e);
    return e
};
goog.dom.isNodeList = function(a) {
    if (a && "number" == typeof a.length) {
        if (goog.isObject(a)) return "function" == typeof a.item || "string" == typeof a.item;
        if (goog.isFunction(a)) return "function" == typeof a.item
    }
    return !1
};
goog.dom.getAncestorByTagNameAndClass = function(a, b, c, d) {
    if (!b && !c) return null;
    var e = b ? b.toUpperCase() : null;
    return goog.dom.getAncestor(a, function(a) {
        return (!e || a.nodeName == e) && (!c || goog.isString(a.className) && goog.array.contains(a.className.split(/\s+/), c))
    }, !0, d)
};
goog.dom.getAncestorByClass = function(a, b, c) {
    return goog.dom.getAncestorByTagNameAndClass(a, null, b, c)
};
goog.dom.getAncestor = function(a, b, c, d) {
    c || (a = a.parentNode);
    c = null == d;
    for (var e = 0; a && (c || e <= d);) {
        goog.asserts.assert("parentNode" != a.name);
        if (b(a)) return a;
        a = a.parentNode;
        e++
    }
    return null
};
goog.dom.getActiveElement = function(a) {
    try {
        return a && a.activeElement
    } catch (b) {}
    return null
};
goog.dom.getPixelRatio = function() {
    var a = goog.dom.getWindow();
    return goog.isDef(a.devicePixelRatio) ? a.devicePixelRatio : a.matchMedia ? goog.dom.matchesPixelRatio_(.75) || goog.dom.matchesPixelRatio_(1.5) || goog.dom.matchesPixelRatio_(2) || goog.dom.matchesPixelRatio_(3) || 1 : 1
};
goog.dom.matchesPixelRatio_ = function(a) {
    return goog.dom.getWindow().matchMedia("(-webkit-min-device-pixel-ratio: " + a + "),(min--moz-device-pixel-ratio: " + a + "),(min-resolution: " + a + "dppx)").matches ? a : 0
};
goog.dom.DomHelper = function(a) {
    this.document_ = a || goog.global.document || document
};
goog.dom.DomHelper.prototype.getDomHelper = goog.dom.getDomHelper;
goog.dom.DomHelper.prototype.setDocument = function(a) {
    this.document_ = a
};
goog.dom.DomHelper.prototype.getDocument = function() {
    return this.document_
};
goog.dom.DomHelper.prototype.getElement = function(a) {
    return goog.dom.getElementHelper_(this.document_, a)
};
goog.dom.DomHelper.prototype.getRequiredElement = function(a) {
    return goog.dom.getRequiredElementHelper_(this.document_, a)
};
goog.dom.DomHelper.prototype.$ = goog.dom.DomHelper.prototype.getElement;
goog.dom.DomHelper.prototype.getElementsByTagNameAndClass = function(a, b, c) {
    return goog.dom.getElementsByTagNameAndClass_(this.document_, a, b, c)
};
goog.dom.DomHelper.prototype.getElementsByClass = function(a, b) {
    return goog.dom.getElementsByClass(a, b || this.document_)
};
goog.dom.DomHelper.prototype.getElementByClass = function(a, b) {
    return goog.dom.getElementByClass(a, b || this.document_)
};
goog.dom.DomHelper.prototype.getRequiredElementByClass = function(a, b) {
    return goog.dom.getRequiredElementByClass(a, b || this.document_)
};
goog.dom.DomHelper.prototype.$$ = goog.dom.DomHelper.prototype.getElementsByTagNameAndClass;
goog.dom.DomHelper.prototype.setProperties = goog.dom.setProperties;
goog.dom.DomHelper.prototype.getViewportSize = function(a) {
    return goog.dom.getViewportSize(a || this.getWindow())
};
goog.dom.DomHelper.prototype.getDocumentHeight = function() {
    return goog.dom.getDocumentHeight_(this.getWindow())
};
goog.dom.DomHelper.prototype.createDom = function(a, b, c) {
    return goog.dom.createDom_(this.document_, arguments)
};
goog.dom.DomHelper.prototype.$dom = goog.dom.DomHelper.prototype.createDom;
goog.dom.DomHelper.prototype.createElement = function(a) {
    return this.document_.createElement(a)
};
goog.dom.DomHelper.prototype.createTextNode = function(a) {
    return this.document_.createTextNode(String(a))
};
goog.dom.DomHelper.prototype.createTable = function(a, b, c) {
    return goog.dom.createTable_(this.document_, a, b, !!c)
};
goog.dom.DomHelper.prototype.safeHtmlToNode = function(a) {
    return goog.dom.safeHtmlToNode_(this.document_, a)
};
goog.dom.DomHelper.prototype.htmlToDocumentFragment = function(a) {
    return goog.dom.htmlToDocumentFragment_(this.document_, a)
};
goog.dom.DomHelper.prototype.isCss1CompatMode = function() {
    return goog.dom.isCss1CompatMode_(this.document_)
};
goog.dom.DomHelper.prototype.getWindow = function() {
    return goog.dom.getWindow_(this.document_)
};
goog.dom.DomHelper.prototype.getDocumentScrollElement = function() {
    return goog.dom.getDocumentScrollElement_(this.document_)
};
goog.dom.DomHelper.prototype.getDocumentScroll = function() {
    return goog.dom.getDocumentScroll_(this.document_)
};
goog.dom.DomHelper.prototype.getActiveElement = function(a) {
    return goog.dom.getActiveElement(a || this.document_)
};
goog.dom.DomHelper.prototype.appendChild = goog.dom.appendChild;
goog.dom.DomHelper.prototype.append = goog.dom.append;
goog.dom.DomHelper.prototype.canHaveChildren = goog.dom.canHaveChildren;
goog.dom.DomHelper.prototype.removeChildren = goog.dom.removeChildren;
goog.dom.DomHelper.prototype.insertSiblingBefore = goog.dom.insertSiblingBefore;
goog.dom.DomHelper.prototype.insertSiblingAfter = goog.dom.insertSiblingAfter;
goog.dom.DomHelper.prototype.insertChildAt = goog.dom.insertChildAt;
goog.dom.DomHelper.prototype.removeNode = goog.dom.removeNode;
goog.dom.DomHelper.prototype.replaceNode = goog.dom.replaceNode;
goog.dom.DomHelper.prototype.flattenElement = goog.dom.flattenElement;
goog.dom.DomHelper.prototype.getChildren = goog.dom.getChildren;
goog.dom.DomHelper.prototype.getFirstElementChild = goog.dom.getFirstElementChild;
goog.dom.DomHelper.prototype.getLastElementChild = goog.dom.getLastElementChild;
goog.dom.DomHelper.prototype.getNextElementSibling = goog.dom.getNextElementSibling;
goog.dom.DomHelper.prototype.getPreviousElementSibling = goog.dom.getPreviousElementSibling;
goog.dom.DomHelper.prototype.getNextNode = goog.dom.getNextNode;
goog.dom.DomHelper.prototype.getPreviousNode = goog.dom.getPreviousNode;
goog.dom.DomHelper.prototype.isNodeLike = goog.dom.isNodeLike;
goog.dom.DomHelper.prototype.isElement = goog.dom.isElement;
goog.dom.DomHelper.prototype.isWindow = goog.dom.isWindow;
goog.dom.DomHelper.prototype.getParentElement = goog.dom.getParentElement;
goog.dom.DomHelper.prototype.contains = goog.dom.contains;
goog.dom.DomHelper.prototype.compareNodeOrder = goog.dom.compareNodeOrder;
goog.dom.DomHelper.prototype.findCommonAncestor = goog.dom.findCommonAncestor;
goog.dom.DomHelper.prototype.getOwnerDocument = goog.dom.getOwnerDocument;
goog.dom.DomHelper.prototype.getFrameContentDocument = goog.dom.getFrameContentDocument;
goog.dom.DomHelper.prototype.getFrameContentWindow = goog.dom.getFrameContentWindow;
goog.dom.DomHelper.prototype.setTextContent = goog.dom.setTextContent;
goog.dom.DomHelper.prototype.getOuterHtml = goog.dom.getOuterHtml;
goog.dom.DomHelper.prototype.findNode = goog.dom.findNode;
goog.dom.DomHelper.prototype.findNodes = goog.dom.findNodes;
goog.dom.DomHelper.prototype.isFocusableTabIndex = goog.dom.isFocusableTabIndex;
goog.dom.DomHelper.prototype.setFocusableTabIndex = goog.dom.setFocusableTabIndex;
goog.dom.DomHelper.prototype.isFocusable = goog.dom.isFocusable;
goog.dom.DomHelper.prototype.getTextContent = goog.dom.getTextContent;
goog.dom.DomHelper.prototype.getNodeTextLength = goog.dom.getNodeTextLength;
goog.dom.DomHelper.prototype.getNodeTextOffset = goog.dom.getNodeTextOffset;
goog.dom.DomHelper.prototype.getNodeAtOffset = goog.dom.getNodeAtOffset;
goog.dom.DomHelper.prototype.isNodeList = goog.dom.isNodeList;
goog.dom.DomHelper.prototype.getAncestorByTagNameAndClass = goog.dom.getAncestorByTagNameAndClass;
goog.dom.DomHelper.prototype.getAncestorByClass = goog.dom.getAncestorByClass;
goog.dom.DomHelper.prototype.getAncestor = goog.dom.getAncestor;
goog.dom.vendor = {};
goog.dom.vendor.getVendorJsPrefix = function() {
    return goog.userAgent.WEBKIT ? "Webkit" : goog.userAgent.GECKO ? "Moz" : goog.userAgent.IE ? "ms" : goog.userAgent.OPERA ? "O" : null
};
goog.dom.vendor.getVendorPrefix = function() {
    return goog.userAgent.WEBKIT ? "-webkit" : goog.userAgent.GECKO ? "-moz" : goog.userAgent.IE ? "-ms" : goog.userAgent.OPERA ? "-o" : null
};
goog.dom.vendor.getPrefixedPropertyName = function(a, b) {
    if (b && a in b) return a;
    var c = goog.dom.vendor.getVendorJsPrefix();
    return c ? (c = c.toLowerCase(), c += goog.string.toTitleCase(a), !goog.isDef(b) || c in b ? c : null) : null
};
goog.dom.vendor.getPrefixedEventType = function(a) {
    return ((goog.dom.vendor.getVendorJsPrefix() || "") + a).toLowerCase()
};
goog.style = {};
goog.style.setStyle = function(a, b, c) {
    if (goog.isString(b)) goog.style.setStyle_(a, c, b);
    else
        for (var d in b) goog.style.setStyle_(a, b[d], d)
};
goog.style.setStyle_ = function(a, b, c) {
    (c = goog.style.getVendorJsStyleName_(a, c)) && (a.style[c] = b)
};
goog.style.styleNameCache_ = {};
goog.style.getVendorJsStyleName_ = function(a, b) {
    var c = goog.style.styleNameCache_[b];
    if (!c) {
        var d = goog.string.toCamelCase(b),
            c = d;
        void 0 === a.style[d] && (d = goog.dom.vendor.getVendorJsPrefix() + goog.string.toTitleCase(d), void 0 !== a.style[d] && (c = d));
        goog.style.styleNameCache_[b] = c
    }
    return c
};
goog.style.getVendorStyleName_ = function(a, b) {
    var c = goog.string.toCamelCase(b);
    return void 0 === a.style[c] && (c = goog.dom.vendor.getVendorJsPrefix() + goog.string.toTitleCase(c), void 0 !== a.style[c]) ? goog.dom.vendor.getVendorPrefix() + "-" + b : b
};
goog.style.getStyle = function(a, b) {
    var c = a.style[goog.string.toCamelCase(b)];
    return "undefined" !== typeof c ? c : a.style[goog.style.getVendorJsStyleName_(a, b)] || ""
};
goog.style.getComputedStyle = function(a, b) {
    var c = goog.dom.getOwnerDocument(a);
    return c.defaultView && c.defaultView.getComputedStyle && (c = c.defaultView.getComputedStyle(a, null)) ? c[b] || c.getPropertyValue(b) || "" : ""
};
goog.style.getCascadedStyle = function(a, b) {
    return a.currentStyle ? a.currentStyle[b] : null
};
goog.style.getStyle_ = function(a, b) {
    return goog.style.getComputedStyle(a, b) || goog.style.getCascadedStyle(a, b) || a.style && a.style[b]
};
goog.style.getComputedBoxSizing = function(a) {
    return goog.style.getStyle_(a, "boxSizing") || goog.style.getStyle_(a, "MozBoxSizing") || goog.style.getStyle_(a, "WebkitBoxSizing") || null
};
goog.style.getComputedPosition = function(a) {
    return goog.style.getStyle_(a, "position")
};
goog.style.getBackgroundColor = function(a) {
    return goog.style.getStyle_(a, "backgroundColor")
};
goog.style.getComputedOverflowX = function(a) {
    return goog.style.getStyle_(a, "overflowX")
};
goog.style.getComputedOverflowY = function(a) {
    return goog.style.getStyle_(a, "overflowY")
};
goog.style.getComputedZIndex = function(a) {
    return goog.style.getStyle_(a, "zIndex")
};
goog.style.getComputedTextAlign = function(a) {
    return goog.style.getStyle_(a, "textAlign")
};
goog.style.getComputedCursor = function(a) {
    return goog.style.getStyle_(a, "cursor")
};
goog.style.getComputedTransform = function(a) {
    var b = goog.style.getVendorStyleName_(a, "transform");
    return goog.style.getStyle_(a, b) || goog.style.getStyle_(a, "transform")
};
goog.style.setPosition = function(a, b, c) {
    var d;
    b instanceof goog.math.Coordinate ? (d = b.x, b = b.y) : (d = b, b = c);
    a.style.left = goog.style.getPixelStyleValue_(d, !1);
    a.style.top = goog.style.getPixelStyleValue_(b, !1)
};
goog.style.getPosition = function(a) {
    return new goog.math.Coordinate(a.offsetLeft, a.offsetTop)
};
goog.style.getClientViewportElement = function(a) {
    a = a ? goog.dom.getOwnerDocument(a) : goog.dom.getDocument();
    return !goog.userAgent.IE || goog.userAgent.isDocumentModeOrHigher(9) || goog.dom.getDomHelper(a).isCss1CompatMode() ? a.documentElement : a.body
};
goog.style.getViewportPageOffset = function(a) {
    var b = a.body;
    a = a.documentElement;
    return new goog.math.Coordinate(b.scrollLeft || a.scrollLeft, b.scrollTop || a.scrollTop)
};
goog.style.getBoundingClientRect_ = function(a) {
    var b;
    try {
        b = a.getBoundingClientRect()
    } catch (c) {
        return {
            left: 0,
            top: 0,
            right: 0,
            bottom: 0
        }
    }
    goog.userAgent.IE && a.ownerDocument.body && (a = a.ownerDocument, b.left -= a.documentElement.clientLeft + a.body.clientLeft, b.top -= a.documentElement.clientTop + a.body.clientTop);
    return b
};
goog.style.getOffsetParent = function(a) {
    if (goog.userAgent.IE && !goog.userAgent.isDocumentModeOrHigher(8)) return a.offsetParent;
    var b = goog.dom.getOwnerDocument(a),
        c = goog.style.getStyle_(a, "position"),
        d = "fixed" == c || "absolute" == c;
    for (a = a.parentNode; a && a != b; a = a.parentNode)
        if (a.nodeType == goog.dom.NodeType.DOCUMENT_FRAGMENT && a.host && (a = a.host), c = goog.style.getStyle_(a, "position"), d = d && "static" == c && a != b.documentElement && a != b.body, !d && (a.scrollWidth > a.clientWidth || a.scrollHeight > a.clientHeight || "fixed" == c ||
                "absolute" == c || "relative" == c)) return a;
    return null
};
goog.style.getVisibleRectForElement = function(a) {
    for (var b = new goog.math.Box(0, Infinity, Infinity, 0), c = goog.dom.getDomHelper(a), d = c.getDocument().body, e = c.getDocument().documentElement, f = c.getDocumentScrollElement(); a = goog.style.getOffsetParent(a);)
        if (!(goog.userAgent.IE && 0 == a.clientWidth || goog.userAgent.WEBKIT && 0 == a.clientHeight && a == d) && a != d && a != e && "visible" != goog.style.getStyle_(a, "overflow")) {
            var g = goog.style.getPageOffset(a),
                h = goog.style.getClientLeftTop(a);
            g.x += h.x;
            g.y += h.y;
            b.top = Math.max(b.top,
                g.y);
            b.right = Math.min(b.right, g.x + a.clientWidth);
            b.bottom = Math.min(b.bottom, g.y + a.clientHeight);
            b.left = Math.max(b.left, g.x)
        } d = f.scrollLeft;
    f = f.scrollTop;
    b.left = Math.max(b.left, d);
    b.top = Math.max(b.top, f);
    c = c.getViewportSize();
    b.right = Math.min(b.right, d + c.width);
    b.bottom = Math.min(b.bottom, f + c.height);
    return 0 <= b.top && 0 <= b.left && b.bottom > b.top && b.right > b.left ? b : null
};
goog.style.getContainerOffsetToScrollInto = function(a, b, c) {
    var d = b || goog.dom.getDocumentScrollElement(),
        e = goog.style.getPageOffset(a),
        f = goog.style.getPageOffset(d),
        g = goog.style.getBorderBox(d);
    d == goog.dom.getDocumentScrollElement() ? (b = e.x - d.scrollLeft, e = e.y - d.scrollTop, goog.userAgent.IE && !goog.userAgent.isDocumentModeOrHigher(10) && (b += g.left, e += g.top)) : (b = e.x - f.x - g.left, e = e.y - f.y - g.top);
    g = d.clientWidth - a.offsetWidth;
    a = d.clientHeight - a.offsetHeight;
    f = d.scrollLeft;
    d = d.scrollTop;
    c ? (f += b - g / 2, d += e - a / 2) :
        (f += Math.min(b, Math.max(b - g, 0)), d += Math.min(e, Math.max(e - a, 0)));
    return new goog.math.Coordinate(f, d)
};
goog.style.scrollIntoContainerView = function(a, b, c) {
    b = b || goog.dom.getDocumentScrollElement();
    a = goog.style.getContainerOffsetToScrollInto(a, b, c);
    b.scrollLeft = a.x;
    b.scrollTop = a.y
};
goog.style.getClientLeftTop = function(a) {
    return new goog.math.Coordinate(a.clientLeft, a.clientTop)
};
goog.style.getPageOffset = function(a) {
    var b = goog.dom.getOwnerDocument(a);
    goog.asserts.assertObject(a, "Parameter is required");
    var c = new goog.math.Coordinate(0, 0),
        d = goog.style.getClientViewportElement(b);
    if (a == d) return c;
    a = goog.style.getBoundingClientRect_(a);
    b = goog.dom.getDomHelper(b).getDocumentScroll();
    c.x = a.left + b.x;
    c.y = a.top + b.y;
    return c
};
goog.style.getPageOffsetLeft = function(a) {
    return goog.style.getPageOffset(a).x
};
goog.style.getPageOffsetTop = function(a) {
    return goog.style.getPageOffset(a).y
};
goog.style.getFramedPageOffset = function(a, b) {
    var c = new goog.math.Coordinate(0, 0),
        d = goog.dom.getWindow(goog.dom.getOwnerDocument(a));
    if (!goog.reflect.canAccessProperty(d, "parent")) return c;
    var e = a;
    do {
        var f = d == b ? goog.style.getPageOffset(e) : goog.style.getClientPositionForElement_(goog.asserts.assert(e));
        c.x += f.x;
        c.y += f.y
    } while (d && d != b && d != d.parent && (e = d.frameElement) && (d = d.parent));
    return c
};
goog.style.translateRectForAnotherFrame = function(a, b, c) {
    if (b.getDocument() != c.getDocument()) {
        var d = b.getDocument().body;
        c = goog.style.getFramedPageOffset(d, c.getWindow());
        c = goog.math.Coordinate.difference(c, goog.style.getPageOffset(d));
        !goog.userAgent.IE || goog.userAgent.isDocumentModeOrHigher(9) || b.isCss1CompatMode() || (c = goog.math.Coordinate.difference(c, b.getDocumentScroll()));
        a.left += c.x;
        a.top += c.y
    }
};
goog.style.getRelativePosition = function(a, b) {
    var c = goog.style.getClientPosition(a),
        d = goog.style.getClientPosition(b);
    return new goog.math.Coordinate(c.x - d.x, c.y - d.y)
};
goog.style.getClientPositionForElement_ = function(a) {
    a = goog.style.getBoundingClientRect_(a);
    return new goog.math.Coordinate(a.left, a.top)
};
goog.style.getClientPosition = function(a) {
    goog.asserts.assert(a);
    if (a.nodeType == goog.dom.NodeType.ELEMENT) return goog.style.getClientPositionForElement_(a);
    a = a.changedTouches ? a.changedTouches[0] : a;
    return new goog.math.Coordinate(a.clientX, a.clientY)
};
goog.style.setPageOffset = function(a, b, c) {
    var d = goog.style.getPageOffset(a);
    b instanceof goog.math.Coordinate && (c = b.y, b = b.x);
    goog.style.setPosition(a, a.offsetLeft + (b - d.x), a.offsetTop + (c - d.y))
};
goog.style.setSize = function(a, b, c) {
    if (b instanceof goog.math.Size) c = b.height, b = b.width;
    else if (void 0 == c) throw Error("missing height argument");
    goog.style.setWidth(a, b);
    goog.style.setHeight(a, c)
};
goog.style.getPixelStyleValue_ = function(a, b) {
    "number" == typeof a && (a = (b ? Math.round(a) : a) + "px");
    return a
};
goog.style.setHeight = function(a, b) {
    a.style.height = goog.style.getPixelStyleValue_(b, !0)
};
goog.style.setWidth = function(a, b) {
    a.style.width = goog.style.getPixelStyleValue_(b, !0)
};
goog.style.getSize = function(a) {
    return goog.style.evaluateWithTemporaryDisplay_(goog.style.getSizeWithDisplay_, a)
};
goog.style.evaluateWithTemporaryDisplay_ = function(a, b) {
    if ("none" != goog.style.getStyle_(b, "display")) return a(b);
    var c = b.style,
        d = c.display,
        e = c.visibility,
        f = c.position;
    c.visibility = "hidden";
    c.position = "absolute";
    c.display = "inline";
    var g = a(b);
    c.display = d;
    c.position = f;
    c.visibility = e;
    return g
};
goog.style.getSizeWithDisplay_ = function(a) {
    var b = a.offsetWidth,
        c = a.offsetHeight,
        d = goog.userAgent.WEBKIT && !b && !c;
    return goog.isDef(b) && !d || !a.getBoundingClientRect ? new goog.math.Size(b, c) : (a = goog.style.getBoundingClientRect_(a), new goog.math.Size(a.right - a.left, a.bottom - a.top))
};
goog.style.getTransformedSize = function(a) {
    if (!a.getBoundingClientRect) return null;
    a = goog.style.evaluateWithTemporaryDisplay_(goog.style.getBoundingClientRect_, a);
    return new goog.math.Size(a.right - a.left, a.bottom - a.top)
};
goog.style.getBounds = function(a) {
    var b = goog.style.getPageOffset(a);
    a = goog.style.getSize(a);
    return new goog.math.Rect(b.x, b.y, a.width, a.height)
};
goog.style.toCamelCase = function(a) {
    return goog.string.toCamelCase(String(a))
};
goog.style.toSelectorCase = function(a) {
    return goog.string.toSelectorCase(a)
};
goog.style.getOpacity = function(a) {
    var b = a.style;
    a = "";
    "opacity" in b ? a = b.opacity : "MozOpacity" in b ? a = b.MozOpacity : "filter" in b && (b = b.filter.match(/alpha\(opacity=([\d.]+)\)/)) && (a = String(b[1] / 100));
    return "" == a ? a : Number(a)
};
goog.style.setOpacity = function(a, b) {
    var c = a.style;
    "opacity" in c ? c.opacity = b : "MozOpacity" in c ? c.MozOpacity = b : "filter" in c && (c.filter = "" === b ? "" : "alpha(opacity=" + 100 * b + ")")
};
goog.style.setTransparentBackgroundImage = function(a, b) {
    var c = a.style;
    goog.userAgent.IE && !goog.userAgent.isVersionOrHigher("8") ? c.filter = 'progid:DXImageTransform.Microsoft.AlphaImageLoader(src="' + b + '", sizingMethod="crop")' : (c.backgroundImage = "url(" + b + ")", c.backgroundPosition = "top left", c.backgroundRepeat = "no-repeat")
};
goog.style.clearTransparentBackgroundImage = function(a) {
    a = a.style;
    "filter" in a ? a.filter = "" : a.backgroundImage = "none"
};
goog.style.showElement = function(a, b) {
    goog.style.setElementShown(a, b)
};
goog.style.setElementShown = function(a, b) {
    a.style.display = b ? "" : "none"
};
goog.style.isElementShown = function(a) {
    return "none" != a.style.display
};
goog.style.installStyles = function(a, b) {
    var c = goog.dom.getDomHelper(b),
        d = null,
        e = c.getDocument();
    goog.userAgent.IE && e.createStyleSheet ? (d = e.createStyleSheet(), goog.style.setStyles(d, a)) : (e = c.getElementsByTagNameAndClass(goog.dom.TagName.HEAD)[0], e || (d = c.getElementsByTagNameAndClass(goog.dom.TagName.BODY)[0], e = c.createDom(goog.dom.TagName.HEAD), d.parentNode.insertBefore(e, d)), d = c.createDom(goog.dom.TagName.STYLE), goog.style.setStyles(d, a), c.appendChild(e, d));
    return d
};
goog.style.uninstallStyles = function(a) {
    goog.dom.removeNode(a.ownerNode || a.owningElement || a)
};
goog.style.setStyles = function(a, b) {
    goog.userAgent.IE && goog.isDef(a.cssText) ? a.cssText = b : a.innerHTML = b
};
goog.style.setPreWrap = function(a) {
    a = a.style;
    goog.userAgent.IE && !goog.userAgent.isVersionOrHigher("8") ? (a.whiteSpace = "pre", a.wordWrap = "break-word") : a.whiteSpace = goog.userAgent.GECKO ? "-moz-pre-wrap" : "pre-wrap"
};
goog.style.setInlineBlock = function(a) {
    a = a.style;
    a.position = "relative";
    goog.userAgent.IE && !goog.userAgent.isVersionOrHigher("8") ? (a.zoom = "1", a.display = "inline") : a.display = "inline-block"
};
goog.style.isRightToLeft = function(a) {
    return "rtl" == goog.style.getStyle_(a, "direction")
};
goog.style.unselectableStyle_ = goog.userAgent.GECKO ? "MozUserSelect" : goog.userAgent.WEBKIT || goog.userAgent.EDGE ? "WebkitUserSelect" : null;
goog.style.isUnselectable = function(a) {
    return goog.style.unselectableStyle_ ? "none" == a.style[goog.style.unselectableStyle_].toLowerCase() : goog.userAgent.IE || goog.userAgent.OPERA ? "on" == a.getAttribute("unselectable") : !1
};
goog.style.setUnselectable = function(a, b, c) {
    c = c ? null : a.getElementsByTagName("*");
    var d = goog.style.unselectableStyle_;
    if (d) {
        if (b = b ? "none" : "", a.style && (a.style[d] = b), c) {
            a = 0;
            for (var e; e = c[a]; a++) e.style && (e.style[d] = b)
        }
    } else if (goog.userAgent.IE || goog.userAgent.OPERA)
        if (b = b ? "on" : "", a.setAttribute("unselectable", b), c)
            for (a = 0; e = c[a]; a++) e.setAttribute("unselectable", b)
};
goog.style.getBorderBoxSize = function(a) {
    return new goog.math.Size(a.offsetWidth, a.offsetHeight)
};
goog.style.setBorderBoxSize = function(a, b) {
    var c = goog.dom.getOwnerDocument(a),
        d = goog.dom.getDomHelper(c).isCss1CompatMode();
    if (!goog.userAgent.IE || goog.userAgent.isVersionOrHigher("10") || d && goog.userAgent.isVersionOrHigher("8")) goog.style.setBoxSizingSize_(a, b, "border-box");
    else if (c = a.style, d) {
        var d = goog.style.getPaddingBox(a),
            e = goog.style.getBorderBox(a);
        c.pixelWidth = b.width - e.left - d.left - d.right - e.right;
        c.pixelHeight = b.height - e.top - d.top - d.bottom - e.bottom
    } else c.pixelWidth = b.width, c.pixelHeight =
        b.height
};
goog.style.getContentBoxSize = function(a) {
    var b = goog.dom.getOwnerDocument(a),
        c = goog.userAgent.IE && a.currentStyle;
    if (c && goog.dom.getDomHelper(b).isCss1CompatMode() && "auto" != c.width && "auto" != c.height && !c.boxSizing) return b = goog.style.getIePixelValue_(a, c.width, "width", "pixelWidth"), a = goog.style.getIePixelValue_(a, c.height, "height", "pixelHeight"), new goog.math.Size(b, a);
    c = goog.style.getBorderBoxSize(a);
    b = goog.style.getPaddingBox(a);
    a = goog.style.getBorderBox(a);
    return new goog.math.Size(c.width - a.left -
        b.left - b.right - a.right, c.height - a.top - b.top - b.bottom - a.bottom)
};
goog.style.setContentBoxSize = function(a, b) {
    var c = goog.dom.getOwnerDocument(a),
        d = goog.dom.getDomHelper(c).isCss1CompatMode();
    if (!goog.userAgent.IE || goog.userAgent.isVersionOrHigher("10") || d && goog.userAgent.isVersionOrHigher("8")) goog.style.setBoxSizingSize_(a, b, "content-box");
    else if (c = a.style, d) c.pixelWidth = b.width, c.pixelHeight = b.height;
    else {
        var d = goog.style.getPaddingBox(a),
            e = goog.style.getBorderBox(a);
        c.pixelWidth = b.width + e.left + d.left + d.right + e.right;
        c.pixelHeight = b.height + e.top + d.top + d.bottom +
            e.bottom
    }
};
goog.style.setBoxSizingSize_ = function(a, b, c) {
    a = a.style;
    goog.userAgent.GECKO ? a.MozBoxSizing = c : goog.userAgent.WEBKIT ? a.WebkitBoxSizing = c : a.boxSizing = c;
    a.width = Math.max(b.width, 0) + "px";
    a.height = Math.max(b.height, 0) + "px"
};
goog.style.getIePixelValue_ = function(a, b, c, d) {
    if (/^\d+px?$/.test(b)) return parseInt(b, 10);
    var e = a.style[c],
        f = a.runtimeStyle[c];
    a.runtimeStyle[c] = a.currentStyle[c];
    a.style[c] = b;
    b = a.style[d];
    a.style[c] = e;
    a.runtimeStyle[c] = f;
    return b
};
goog.style.getIePixelDistance_ = function(a, b) {
    var c = goog.style.getCascadedStyle(a, b);
    return c ? goog.style.getIePixelValue_(a, c, "left", "pixelLeft") : 0
};
goog.style.getBox_ = function(a, b) {
    if (goog.userAgent.IE) {
        var c = goog.style.getIePixelDistance_(a, b + "Left"),
            d = goog.style.getIePixelDistance_(a, b + "Right"),
            e = goog.style.getIePixelDistance_(a, b + "Top"),
            f = goog.style.getIePixelDistance_(a, b + "Bottom");
        return new goog.math.Box(e, d, f, c)
    }
    c = goog.style.getComputedStyle(a, b + "Left");
    d = goog.style.getComputedStyle(a, b + "Right");
    e = goog.style.getComputedStyle(a, b + "Top");
    f = goog.style.getComputedStyle(a, b + "Bottom");
    return new goog.math.Box(parseFloat(e), parseFloat(d), parseFloat(f),
        parseFloat(c))
};
goog.style.getPaddingBox = function(a) {
    return goog.style.getBox_(a, "padding")
};
goog.style.getMarginBox = function(a) {
    return goog.style.getBox_(a, "margin")
};
goog.style.ieBorderWidthKeywords_ = {
    thin: 2,
    medium: 4,
    thick: 6
};
goog.style.getIePixelBorder_ = function(a, b) {
    if ("none" == goog.style.getCascadedStyle(a, b + "Style")) return 0;
    var c = goog.style.getCascadedStyle(a, b + "Width");
    return c in goog.style.ieBorderWidthKeywords_ ? goog.style.ieBorderWidthKeywords_[c] : goog.style.getIePixelValue_(a, c, "left", "pixelLeft")
};
goog.style.getBorderBox = function(a) {
    if (goog.userAgent.IE && !goog.userAgent.isDocumentModeOrHigher(9)) {
        var b = goog.style.getIePixelBorder_(a, "borderLeft"),
            c = goog.style.getIePixelBorder_(a, "borderRight"),
            d = goog.style.getIePixelBorder_(a, "borderTop");
        a = goog.style.getIePixelBorder_(a, "borderBottom");
        return new goog.math.Box(d, c, a, b)
    }
    b = goog.style.getComputedStyle(a, "borderLeftWidth");
    c = goog.style.getComputedStyle(a, "borderRightWidth");
    d = goog.style.getComputedStyle(a, "borderTopWidth");
    a = goog.style.getComputedStyle(a,
        "borderBottomWidth");
    return new goog.math.Box(parseFloat(d), parseFloat(c), parseFloat(a), parseFloat(b))
};
goog.style.getFontFamily = function(a) {
    var b = goog.dom.getOwnerDocument(a),
        c = "";
    if (b.body.createTextRange && goog.dom.contains(b, a)) {
        b = b.body.createTextRange();
        b.moveToElementText(a);
        try {
            c = b.queryCommandValue("FontName")
        } catch (d) {
            c = ""
        }
    }
    c || (c = goog.style.getStyle_(a, "fontFamily"));
    a = c.split(",");
    1 < a.length && (c = a[0]);
    return goog.string.stripQuotes(c, "\"'")
};
goog.style.lengthUnitRegex_ = /[^\d]+$/;
goog.style.getLengthUnits = function(a) {
    return (a = a.match(goog.style.lengthUnitRegex_)) && a[0] || null
};
goog.style.ABSOLUTE_CSS_LENGTH_UNITS_ = {
    cm: 1,
    "in": 1,
    mm: 1,
    pc: 1,
    pt: 1
};
goog.style.CONVERTIBLE_RELATIVE_CSS_UNITS_ = {
    em: 1,
    ex: 1
};
goog.style.getFontSize = function(a) {
    var b = goog.style.getStyle_(a, "fontSize"),
        c = goog.style.getLengthUnits(b);
    if (b && "px" == c) return parseInt(b, 10);
    if (goog.userAgent.IE) {
        if (c in goog.style.ABSOLUTE_CSS_LENGTH_UNITS_) return goog.style.getIePixelValue_(a, b, "left", "pixelLeft");
        if (a.parentNode && a.parentNode.nodeType == goog.dom.NodeType.ELEMENT && c in goog.style.CONVERTIBLE_RELATIVE_CSS_UNITS_) return a = a.parentNode, c = goog.style.getStyle_(a, "fontSize"), goog.style.getIePixelValue_(a, b == c ? "1em" : b, "left", "pixelLeft")
    }
    c =
        goog.dom.createDom(goog.dom.TagName.SPAN, {
            style: "visibility:hidden;position:absolute;line-height:0;padding:0;margin:0;border:0;height:1em;"
        });
    goog.dom.appendChild(a, c);
    b = c.offsetHeight;
    goog.dom.removeNode(c);
    return b
};
goog.style.parseStyleAttribute = function(a) {
    var b = {};
    goog.array.forEach(a.split(/\s*;\s*/), function(a) {
        var d = a.match(/\s*([\w-]+)\s*\:(.+)/);
        d && (a = d[1], d = goog.string.trim(d[2]), b[goog.string.toCamelCase(a.toLowerCase())] = d)
    });
    return b
};
goog.style.toStyleAttribute = function(a) {
    var b = [];
    goog.object.forEach(a, function(a, d) {
        b.push(goog.string.toSelectorCase(d), ":", a, ";")
    });
    return b.join("")
};
goog.style.setFloat = function(a, b) {
    a.style[goog.userAgent.IE ? "styleFloat" : "cssFloat"] = b
};
goog.style.getFloat = function(a) {
    return a.style[goog.userAgent.IE ? "styleFloat" : "cssFloat"] || ""
};
goog.style.getScrollbarWidth = function(a) {
    var b = goog.dom.createElement(goog.dom.TagName.DIV);
    a && (b.className = a);
    b.style.cssText = "overflow:auto;position:absolute;top:0;width:100px;height:100px";
    a = goog.dom.createElement(goog.dom.TagName.DIV);
    goog.style.setSize(a, "200px", "200px");
    b.appendChild(a);
    goog.dom.appendChild(goog.dom.getDocument().body, b);
    a = b.offsetWidth - b.clientWidth;
    goog.dom.removeNode(b);
    return a
};
goog.style.MATRIX_TRANSLATION_REGEX_ = /matrix\([0-9\.\-]+, [0-9\.\-]+, [0-9\.\-]+, [0-9\.\-]+, ([0-9\.\-]+)p?x?, ([0-9\.\-]+)p?x?\)/;
goog.style.getCssTranslation = function(a) {
    a = goog.style.getComputedTransform(a);
    return a ? (a = a.match(goog.style.MATRIX_TRANSLATION_REGEX_)) ? new goog.math.Coordinate(parseFloat(a[1]), parseFloat(a[2])) : new goog.math.Coordinate(0, 0) : new goog.math.Coordinate(0, 0)
};
goog.positioning = {};
goog.positioning.AbstractPosition = function() {};
goog.positioning.AbstractPosition.prototype.reposition = function(a, b, c, d) {};
goog.style.bidi = {};
goog.style.bidi.getScrollLeft = function(a) {
    var b = goog.style.isRightToLeft(a);
    return b && goog.userAgent.GECKO ? -a.scrollLeft : !b || goog.userAgent.EDGE_OR_IE && goog.userAgent.isVersionOrHigher("8") || "visible" == goog.style.getComputedOverflowX(a) ? a.scrollLeft : a.scrollWidth - a.clientWidth - a.scrollLeft
};
goog.style.bidi.getOffsetStart = function(a) {
    var b = a.offsetLeft,
        c = a.offsetParent;
    c || "fixed" != goog.style.getComputedPosition(a) || (c = goog.dom.getOwnerDocument(a).documentElement);
    if (!c) return b;
    if (goog.userAgent.GECKO) var d = goog.style.getBorderBox(c),
        b = b + d.left;
    else goog.userAgent.isDocumentModeOrHigher(8) && !goog.userAgent.isDocumentModeOrHigher(9) && (d = goog.style.getBorderBox(c), b -= d.left);
    return goog.style.isRightToLeft(c) ? c.clientWidth - (b + a.offsetWidth) : b
};
goog.style.bidi.setScrollOffset = function(a, b) {
    b = Math.max(b, 0);
    goog.style.isRightToLeft(a) ? goog.userAgent.GECKO ? a.scrollLeft = -b : goog.userAgent.EDGE_OR_IE && goog.userAgent.isVersionOrHigher("8") ? a.scrollLeft = b : a.scrollLeft = a.scrollWidth - b - a.clientWidth : a.scrollLeft = b
};
goog.style.bidi.setPosition = function(a, b, c, d) {
    goog.isNull(c) || (a.style.top = c + "px");
    d ? (a.style.right = b + "px", a.style.left = "") : (a.style.left = b + "px", a.style.right = "")
};
goog.positioning.Corner = {
    TOP_LEFT: 0,
    TOP_RIGHT: 2,
    BOTTOM_LEFT: 1,
    BOTTOM_RIGHT: 3,
    TOP_START: 4,
    TOP_END: 6,
    BOTTOM_START: 5,
    BOTTOM_END: 7
};
goog.positioning.CornerBit = {
    BOTTOM: 1,
    RIGHT: 2,
    FLIP_RTL: 4
};
goog.positioning.Overflow = {
    IGNORE: 0,
    ADJUST_X: 1,
    FAIL_X: 2,
    ADJUST_Y: 4,
    FAIL_Y: 8,
    RESIZE_WIDTH: 16,
    RESIZE_HEIGHT: 32,
    ADJUST_X_EXCEPT_OFFSCREEN: 65,
    ADJUST_Y_EXCEPT_OFFSCREEN: 132
};
goog.positioning.OverflowStatus = {
    NONE: 0,
    ADJUSTED_X: 1,
    ADJUSTED_Y: 2,
    WIDTH_ADJUSTED: 4,
    HEIGHT_ADJUSTED: 8,
    FAILED_LEFT: 16,
    FAILED_RIGHT: 32,
    FAILED_TOP: 64,
    FAILED_BOTTOM: 128,
    FAILED_OUTSIDE_VIEWPORT: 256
};
goog.positioning.OverflowStatus.FAILED = goog.positioning.OverflowStatus.FAILED_LEFT | goog.positioning.OverflowStatus.FAILED_RIGHT | goog.positioning.OverflowStatus.FAILED_TOP | goog.positioning.OverflowStatus.FAILED_BOTTOM | goog.positioning.OverflowStatus.FAILED_OUTSIDE_VIEWPORT;
goog.positioning.OverflowStatus.FAILED_HORIZONTAL = goog.positioning.OverflowStatus.FAILED_LEFT | goog.positioning.OverflowStatus.FAILED_RIGHT;
goog.positioning.OverflowStatus.FAILED_VERTICAL = goog.positioning.OverflowStatus.FAILED_TOP | goog.positioning.OverflowStatus.FAILED_BOTTOM;
goog.positioning.positionAtAnchor = function(a, b, c, d, e, f, g, h, k) {
    goog.asserts.assert(c);
    var l = goog.positioning.getOffsetParentPageOffset(c),
        m = goog.positioning.getVisiblePart_(a);
    goog.style.translateRectForAnotherFrame(m, goog.dom.getDomHelper(a), goog.dom.getDomHelper(c));
    a = goog.positioning.getEffectiveCorner(a, b);
    m = new goog.math.Coordinate(a & goog.positioning.CornerBit.RIGHT ? m.left + m.width : m.left, a & goog.positioning.CornerBit.BOTTOM ? m.top + m.height : m.top);
    m = goog.math.Coordinate.difference(m, l);
    e && (m.x +=
        (a & goog.positioning.CornerBit.RIGHT ? -1 : 1) * e.x, m.y += (a & goog.positioning.CornerBit.BOTTOM ? -1 : 1) * e.y);
    var n;
    if (g)
        if (k) n = k;
        else if (n = goog.style.getVisibleRectForElement(c)) n.top -= l.y, n.right -= l.x, n.bottom -= l.y, n.left -= l.x;
    return goog.positioning.positionAtCoordinate(m, c, d, f, n, g, h)
};
goog.positioning.getOffsetParentPageOffset = function(a) {
    var b;
    if (a = a.offsetParent) {
        var c = a.tagName == goog.dom.TagName.HTML || a.tagName == goog.dom.TagName.BODY;
        c && "static" == goog.style.getComputedPosition(a) || (b = goog.style.getPageOffset(a), c || (b = goog.math.Coordinate.difference(b, new goog.math.Coordinate(goog.style.bidi.getScrollLeft(a), a.scrollTop))))
    }
    return b || new goog.math.Coordinate
};
goog.positioning.getVisiblePart_ = function(a) {
    var b = goog.style.getBounds(a);
    (a = goog.style.getVisibleRectForElement(a)) && b.intersection(goog.math.Rect.createFromBox(a));
    return b
};
goog.positioning.positionAtCoordinate = function(a, b, c, d, e, f, g) {
    a = a.clone();
    var h = goog.positioning.getEffectiveCorner(b, c);
    c = goog.style.getSize(b);
    g = g ? g.clone() : c.clone();
    a = goog.positioning.getPositionAtCoordinate(a, g, h, d, e, f);
    if (a.status & goog.positioning.OverflowStatus.FAILED) return a.status;
    goog.style.setPosition(b, a.rect.getTopLeft());
    g = a.rect.getSize();
    goog.math.Size.equals(c, g) || goog.style.setBorderBoxSize(b, g);
    return a.status
};
goog.positioning.getPositionAtCoordinate = function(a, b, c, d, e, f) {
    a = a.clone();
    b = b.clone();
    var g = goog.positioning.OverflowStatus.NONE;
    if (d || c != goog.positioning.Corner.TOP_LEFT) c & goog.positioning.CornerBit.RIGHT ? a.x -= b.width + (d ? d.right : 0) : d && (a.x += d.left), c & goog.positioning.CornerBit.BOTTOM ? a.y -= b.height + (d ? d.bottom : 0) : d && (a.y += d.top);
    f && (g = e ? goog.positioning.adjustForViewport_(a, b, e, f) : goog.positioning.OverflowStatus.FAILED_OUTSIDE_VIEWPORT);
    c = new goog.math.Rect(0, 0, 0, 0);
    c.left = a.x;
    c.top = a.y;
    c.width =
        b.width;
    c.height = b.height;
    return {
        rect: c,
        status: g
    }
};
goog.positioning.adjustForViewport_ = function(a, b, c, d) {
    var e = goog.positioning.OverflowStatus.NONE,
        f = goog.positioning.Overflow.ADJUST_X_EXCEPT_OFFSCREEN,
        g = goog.positioning.Overflow.ADJUST_Y_EXCEPT_OFFSCREEN;
    (d & f) == f && (a.x < c.left || a.x >= c.right) && (d &= ~goog.positioning.Overflow.ADJUST_X);
    (d & g) == g && (a.y < c.top || a.y >= c.bottom) && (d &= ~goog.positioning.Overflow.ADJUST_Y);
    a.x < c.left && d & goog.positioning.Overflow.ADJUST_X && (a.x = c.left, e |= goog.positioning.OverflowStatus.ADJUSTED_X);
    d & goog.positioning.Overflow.RESIZE_WIDTH &&
        (f = a.x, a.x < c.left && (a.x = c.left, e |= goog.positioning.OverflowStatus.WIDTH_ADJUSTED), a.x + b.width > c.right && (b.width = Math.min(c.right - a.x, f + b.width - c.left), b.width = Math.max(b.width, 0), e |= goog.positioning.OverflowStatus.WIDTH_ADJUSTED));
    a.x + b.width > c.right && d & goog.positioning.Overflow.ADJUST_X && (a.x = Math.max(c.right - b.width, c.left), e |= goog.positioning.OverflowStatus.ADJUSTED_X);
    d & goog.positioning.Overflow.FAIL_X && (e = e | (a.x < c.left ? goog.positioning.OverflowStatus.FAILED_LEFT : 0) | (a.x + b.width > c.right ? goog.positioning.OverflowStatus.FAILED_RIGHT :
        0));
    a.y < c.top && d & goog.positioning.Overflow.ADJUST_Y && (a.y = c.top, e |= goog.positioning.OverflowStatus.ADJUSTED_Y);
    d & goog.positioning.Overflow.RESIZE_HEIGHT && (f = a.y, a.y < c.top && (a.y = c.top, e |= goog.positioning.OverflowStatus.HEIGHT_ADJUSTED), a.y + b.height > c.bottom && (b.height = Math.min(c.bottom - a.y, f + b.height - c.top), b.height = Math.max(b.height, 0), e |= goog.positioning.OverflowStatus.HEIGHT_ADJUSTED));
    a.y + b.height > c.bottom && d & goog.positioning.Overflow.ADJUST_Y && (a.y = Math.max(c.bottom - b.height, c.top), e |= goog.positioning.OverflowStatus.ADJUSTED_Y);
    d & goog.positioning.Overflow.FAIL_Y && (e = e | (a.y < c.top ? goog.positioning.OverflowStatus.FAILED_TOP : 0) | (a.y + b.height > c.bottom ? goog.positioning.OverflowStatus.FAILED_BOTTOM : 0));
    return e
};
goog.positioning.getEffectiveCorner = function(a, b) {
    return (b & goog.positioning.CornerBit.FLIP_RTL && goog.style.isRightToLeft(a) ? b ^ goog.positioning.CornerBit.RIGHT : b) & ~goog.positioning.CornerBit.FLIP_RTL
};
goog.positioning.flipCornerHorizontal = function(a) {
    return a ^ goog.positioning.CornerBit.RIGHT
};
goog.positioning.flipCornerVertical = function(a) {
    return a ^ goog.positioning.CornerBit.BOTTOM
};
goog.positioning.flipCorner = function(a) {
    return a ^ goog.positioning.CornerBit.BOTTOM ^ goog.positioning.CornerBit.RIGHT
};
goog.positioning.AnchoredPosition = function(a, b, c) {
    this.element = a;
    this.corner = b;
    this.overflow_ = c
};
goog.inherits(goog.positioning.AnchoredPosition, goog.positioning.AbstractPosition);
goog.positioning.AnchoredPosition.prototype.reposition = function(a, b, c, d) {
    goog.positioning.positionAtAnchor(this.element, this.corner, a, b, void 0, c, this.overflow_)
};
goog.events.EventTarget = function() {
    goog.Disposable.call(this);
    this.eventTargetListeners_ = new goog.events.ListenerMap(this);
    this.actualEventTarget_ = this;
    this.parentEventTarget_ = null
};
goog.inherits(goog.events.EventTarget, goog.Disposable);
goog.events.Listenable.addImplementation(goog.events.EventTarget);
goog.events.EventTarget.MAX_ANCESTORS_ = 1E3;
goog.events.EventTarget.prototype.getParentEventTarget = function() {
    return this.parentEventTarget_
};
goog.events.EventTarget.prototype.setParentEventTarget = function(a) {
    this.parentEventTarget_ = a
};
goog.events.EventTarget.prototype.addEventListener = function(a, b, c, d) {
    goog.events.listen(this, a, b, c, d)
};
goog.events.EventTarget.prototype.removeEventListener = function(a, b, c, d) {
    goog.events.unlisten(this, a, b, c, d)
};
goog.events.EventTarget.prototype.dispatchEvent = function(a) {
    this.assertInitialized_();
    var b, c = this.getParentEventTarget();
    if (c) {
        b = [];
        for (var d = 1; c; c = c.getParentEventTarget()) b.push(c), goog.asserts.assert(++d < goog.events.EventTarget.MAX_ANCESTORS_, "infinite loop")
    }
    return goog.events.EventTarget.dispatchEventInternal_(this.actualEventTarget_, a, b)
};
goog.events.EventTarget.prototype.disposeInternal = function() {
    goog.events.EventTarget.superClass_.disposeInternal.call(this);
    this.removeAllListeners();
    this.parentEventTarget_ = null
};
goog.events.EventTarget.prototype.listen = function(a, b, c, d) {
    this.assertInitialized_();
    return this.eventTargetListeners_.add(String(a), b, !1, c, d)
};
goog.events.EventTarget.prototype.listenOnce = function(a, b, c, d) {
    return this.eventTargetListeners_.add(String(a), b, !0, c, d)
};
goog.events.EventTarget.prototype.unlisten = function(a, b, c, d) {
    return this.eventTargetListeners_.remove(String(a), b, c, d)
};
goog.events.EventTarget.prototype.unlistenByKey = function(a) {
    return this.eventTargetListeners_.removeByKey(a)
};
goog.events.EventTarget.prototype.removeAllListeners = function(a) {
    return this.eventTargetListeners_ ? this.eventTargetListeners_.removeAll(a) : 0
};
goog.events.EventTarget.prototype.fireListeners = function(a, b, c) {
    a = this.eventTargetListeners_.listeners[String(a)];
    if (!a) return !0;
    a = a.concat();
    for (var d = !0, e = 0; e < a.length; ++e) {
        var f = a[e];
        if (f && !f.removed && f.capture == b) {
            var g = f.listener,
                h = f.handler || f.src;
            f.callOnce && this.unlistenByKey(f);
            d = !1 !== g.call(h, c) && d
        }
    }
    return d && 0 != c.returnValue_
};
goog.events.EventTarget.prototype.getListeners = function(a, b) {
    return this.eventTargetListeners_.getListeners(String(a), b)
};
goog.events.EventTarget.prototype.getListener = function(a, b, c, d) {
    return this.eventTargetListeners_.getListener(String(a), b, c, d)
};
goog.events.EventTarget.prototype.hasListener = function(a, b) {
    var c = goog.isDef(a) ? String(a) : void 0;
    return this.eventTargetListeners_.hasListener(c, b)
};
goog.events.EventTarget.prototype.setTargetForTesting = function(a) {
    this.actualEventTarget_ = a
};
goog.events.EventTarget.prototype.assertInitialized_ = function() {
    goog.asserts.assert(this.eventTargetListeners_, "Event target is not initialized. Did you call the superclass (goog.events.EventTarget) constructor?")
};
goog.events.EventTarget.dispatchEventInternal_ = function(a, b, c) {
    var d = b.type || b;
    if (goog.isString(b)) b = new goog.events.Event(b, a);
    else if (b instanceof goog.events.Event) b.target = b.target || a;
    else {
        var e = b;
        b = new goog.events.Event(d, a);
        goog.object.extend(b, e)
    }
    var e = !0,
        f;
    if (c)
        for (var g = c.length - 1; !b.propagationStopped_ && 0 <= g; g--) f = b.currentTarget = c[g], e = f.fireListeners(d, !0, b) && e;
    b.propagationStopped_ || (f = b.currentTarget = a, e = f.fireListeners(d, !0, b) && e, b.propagationStopped_ || (e = f.fireListeners(d, !1, b) && e));
    if (c)
        for (g = 0; !b.propagationStopped_ && g < c.length; g++) f = b.currentTarget = c[g], e = f.fireListeners(d, !1, b) && e;
    return e
};
goog.events.FocusHandler = function(a) {
    goog.events.EventTarget.call(this);
    this.element_ = a;
    a = goog.userAgent.IE ? "focusout" : "blur";
    this.listenKeyIn_ = goog.events.listen(this.element_, goog.userAgent.IE ? "focusin" : "focus", this, !goog.userAgent.IE);
    this.listenKeyOut_ = goog.events.listen(this.element_, a, this, !goog.userAgent.IE)
};
goog.inherits(goog.events.FocusHandler, goog.events.EventTarget);
goog.events.FocusHandler.EventType = {
    FOCUSIN: "focusin",
    FOCUSOUT: "focusout"
};
goog.events.FocusHandler.prototype.handleEvent = function(a) {
    var b = a.getBrowserEvent(),
        b = new goog.events.BrowserEvent(b);
    b.type = "focusin" == a.type || "focus" == a.type ? goog.events.FocusHandler.EventType.FOCUSIN : goog.events.FocusHandler.EventType.FOCUSOUT;
    this.dispatchEvent(b)
};
goog.events.FocusHandler.prototype.disposeInternal = function() {
    goog.events.FocusHandler.superClass_.disposeInternal.call(this);
    goog.events.unlistenByKey(this.listenKeyIn_);
    goog.events.unlistenByKey(this.listenKeyOut_);
    delete this.element_
};
goog.positioning.ViewportPosition = function(a, b) {
    this.coordinate = a instanceof goog.math.Coordinate ? a : new goog.math.Coordinate(a, b)
};
goog.inherits(goog.positioning.ViewportPosition, goog.positioning.AbstractPosition);
goog.positioning.ViewportPosition.prototype.reposition = function(a, b, c, d) {
    goog.positioning.positionAtAnchor(goog.style.getClientViewportElement(a), goog.positioning.Corner.TOP_LEFT, a, b, this.coordinate, c, null, d)
};
goog.events.EventHandler = function(a) {
    goog.Disposable.call(this);
    this.handler_ = a;
    this.keys_ = {}
};
goog.inherits(goog.events.EventHandler, goog.Disposable);
goog.events.EventHandler.typeArray_ = [];
goog.events.EventHandler.prototype.listen = function(a, b, c, d) {
    return this.listen_(a, b, c, d)
};
goog.events.EventHandler.prototype.listenWithScope = function(a, b, c, d, e) {
    return this.listen_(a, b, c, d, e)
};
goog.events.EventHandler.prototype.listen_ = function(a, b, c, d, e) {
    goog.isArray(b) || (b && (goog.events.EventHandler.typeArray_[0] = b.toString()), b = goog.events.EventHandler.typeArray_);
    for (var f = 0; f < b.length; f++) {
        var g = goog.events.listen(a, b[f], c || this.handleEvent, d || !1, e || this.handler_ || this);
        if (!g) break;
        this.keys_[g.key] = g
    }
    return this
};
goog.events.EventHandler.prototype.listenOnce = function(a, b, c, d) {
    return this.listenOnce_(a, b, c, d)
};
goog.events.EventHandler.prototype.listenOnceWithScope = function(a, b, c, d, e) {
    return this.listenOnce_(a, b, c, d, e)
};
goog.events.EventHandler.prototype.listenOnce_ = function(a, b, c, d, e) {
    if (goog.isArray(b))
        for (var f = 0; f < b.length; f++) this.listenOnce_(a, b[f], c, d, e);
    else {
        a = goog.events.listenOnce(a, b, c || this.handleEvent, d, e || this.handler_ || this);
        if (!a) return this;
        this.keys_[a.key] = a
    }
    return this
};
goog.events.EventHandler.prototype.listenWithWrapper = function(a, b, c, d) {
    return this.listenWithWrapper_(a, b, c, d)
};
goog.events.EventHandler.prototype.listenWithWrapperAndScope = function(a, b, c, d, e) {
    return this.listenWithWrapper_(a, b, c, d, e)
};
goog.events.EventHandler.prototype.listenWithWrapper_ = function(a, b, c, d, e) {
    b.listen(a, c, d, e || this.handler_ || this, this);
    return this
};
goog.events.EventHandler.prototype.getListenerCount = function() {
    var a = 0,
        b;
    for (b in this.keys_) Object.prototype.hasOwnProperty.call(this.keys_, b) && a++;
    return a
};
goog.events.EventHandler.prototype.unlisten = function(a, b, c, d, e) {
    if (goog.isArray(b))
        for (var f = 0; f < b.length; f++) this.unlisten(a, b[f], c, d, e);
    else if (a = goog.events.getListener(a, b, c || this.handleEvent, d, e || this.handler_ || this)) goog.events.unlistenByKey(a), delete this.keys_[a.key];
    return this
};
goog.events.EventHandler.prototype.unlistenWithWrapper = function(a, b, c, d, e) {
    b.unlisten(a, c, d, e || this.handler_ || this, this);
    return this
};
goog.events.EventHandler.prototype.removeAll = function() {
    goog.object.forEach(this.keys_, function(a, b) {
        this.keys_.hasOwnProperty(b) && goog.events.unlistenByKey(a)
    }, this);
    this.keys_ = {}
};
goog.events.EventHandler.prototype.disposeInternal = function() {
    goog.events.EventHandler.superClass_.disposeInternal.call(this);
    this.removeAll()
};
goog.events.EventHandler.prototype.handleEvent = function(a) {
    throw Error("EventHandler.handleEvent not implemented");
};
goog.events.KeyCodes = {
    WIN_KEY_FF_LINUX: 0,
    MAC_ENTER: 3,
    BACKSPACE: 8,
    TAB: 9,
    NUM_CENTER: 12,
    ENTER: 13,
    SHIFT: 16,
    CTRL: 17,
    ALT: 18,
    PAUSE: 19,
    CAPS_LOCK: 20,
    ESC: 27,
    SPACE: 32,
    PAGE_UP: 33,
    PAGE_DOWN: 34,
    END: 35,
    HOME: 36,
    LEFT: 37,
    UP: 38,
    RIGHT: 39,
    DOWN: 40,
    PLUS_SIGN: 43,
    PRINT_SCREEN: 44,
    INSERT: 45,
    DELETE: 46,
    ZERO: 48,
    ONE: 49,
    TWO: 50,
    THREE: 51,
    FOUR: 52,
    FIVE: 53,
    SIX: 54,
    SEVEN: 55,
    EIGHT: 56,
    NINE: 57,
    FF_SEMICOLON: 59,
    FF_EQUALS: 61,
    FF_DASH: 173,
    QUESTION_MARK: 63,
    AT_SIGN: 64,
    A: 65,
    B: 66,
    C: 67,
    D: 68,
    E: 69,
    F: 70,
    G: 71,
    H: 72,
    I: 73,
    J: 74,
    K: 75,
    L: 76,
    M: 77,
    N: 78,
    O: 79,
    P: 80,
    Q: 81,
    R: 82,
    S: 83,
    T: 84,
    U: 85,
    V: 86,
    W: 87,
    X: 88,
    Y: 89,
    Z: 90,
    META: 91,
    WIN_KEY_RIGHT: 92,
    CONTEXT_MENU: 93,
    NUM_ZERO: 96,
    NUM_ONE: 97,
    NUM_TWO: 98,
    NUM_THREE: 99,
    NUM_FOUR: 100,
    NUM_FIVE: 101,
    NUM_SIX: 102,
    NUM_SEVEN: 103,
    NUM_EIGHT: 104,
    NUM_NINE: 105,
    NUM_MULTIPLY: 106,
    NUM_PLUS: 107,
    NUM_MINUS: 109,
    NUM_PERIOD: 110,
    NUM_DIVISION: 111,
    F1: 112,
    F2: 113,
    F3: 114,
    F4: 115,
    F5: 116,
    F6: 117,
    F7: 118,
    F8: 119,
    F9: 120,
    F10: 121,
    F11: 122,
    F12: 123,
    NUMLOCK: 144,
    SCROLL_LOCK: 145,
    FIRST_MEDIA_KEY: 166,
    LAST_MEDIA_KEY: 183,
    SEMICOLON: 186,
    DASH: 189,
    EQUALS: 187,
    COMMA: 188,
    PERIOD: 190,
    SLASH: 191,
    APOSTROPHE: 192,
    TILDE: 192,
    SINGLE_QUOTE: 222,
    OPEN_SQUARE_BRACKET: 219,
    BACKSLASH: 220,
    CLOSE_SQUARE_BRACKET: 221,
    WIN_KEY: 224,
    MAC_FF_META: 224,
    MAC_WK_CMD_LEFT: 91,
    MAC_WK_CMD_RIGHT: 93,
    WIN_IME: 229,
    VK_NONAME: 252,
    PHANTOM: 255
};
goog.events.KeyCodes.isTextModifyingKeyEvent = function(a) {
    if (a.altKey && !a.ctrlKey || a.metaKey || a.keyCode >= goog.events.KeyCodes.F1 && a.keyCode <= goog.events.KeyCodes.F12) return !1;
    switch (a.keyCode) {
        case goog.events.KeyCodes.ALT:
        case goog.events.KeyCodes.CAPS_LOCK:
        case goog.events.KeyCodes.CONTEXT_MENU:
        case goog.events.KeyCodes.CTRL:
        case goog.events.KeyCodes.DOWN:
        case goog.events.KeyCodes.END:
        case goog.events.KeyCodes.ESC:
        case goog.events.KeyCodes.HOME:
        case goog.events.KeyCodes.INSERT:
        case goog.events.KeyCodes.LEFT:
        case goog.events.KeyCodes.MAC_FF_META:
        case goog.events.KeyCodes.META:
        case goog.events.KeyCodes.NUMLOCK:
        case goog.events.KeyCodes.NUM_CENTER:
        case goog.events.KeyCodes.PAGE_DOWN:
        case goog.events.KeyCodes.PAGE_UP:
        case goog.events.KeyCodes.PAUSE:
        case goog.events.KeyCodes.PHANTOM:
        case goog.events.KeyCodes.PRINT_SCREEN:
        case goog.events.KeyCodes.RIGHT:
        case goog.events.KeyCodes.SCROLL_LOCK:
        case goog.events.KeyCodes.SHIFT:
        case goog.events.KeyCodes.UP:
        case goog.events.KeyCodes.VK_NONAME:
        case goog.events.KeyCodes.WIN_KEY:
        case goog.events.KeyCodes.WIN_KEY_RIGHT:
            return !1;
        case goog.events.KeyCodes.WIN_KEY_FF_LINUX:
            return !goog.userAgent.GECKO;
        default:
            return a.keyCode < goog.events.KeyCodes.FIRST_MEDIA_KEY || a.keyCode > goog.events.KeyCodes.LAST_MEDIA_KEY
    }
};
goog.events.KeyCodes.firesKeyPressEvent = function(a, b, c, d, e) {
    if (!(goog.userAgent.IE || goog.userAgent.EDGE || goog.userAgent.WEBKIT && goog.userAgent.isVersionOrHigher("525"))) return !0;
    if (goog.userAgent.MAC && e) return goog.events.KeyCodes.isCharacterKey(a);
    if (e && !d) return !1;
    goog.isNumber(b) && (b = goog.events.KeyCodes.normalizeKeyCode(b));
    if (!c && (b == goog.events.KeyCodes.CTRL || b == goog.events.KeyCodes.ALT || goog.userAgent.MAC && b == goog.events.KeyCodes.META)) return !1;
    if ((goog.userAgent.WEBKIT || goog.userAgent.EDGE) &&
        d && c) switch (a) {
        case goog.events.KeyCodes.BACKSLASH:
        case goog.events.KeyCodes.OPEN_SQUARE_BRACKET:
        case goog.events.KeyCodes.CLOSE_SQUARE_BRACKET:
        case goog.events.KeyCodes.TILDE:
        case goog.events.KeyCodes.SEMICOLON:
        case goog.events.KeyCodes.DASH:
        case goog.events.KeyCodes.EQUALS:
        case goog.events.KeyCodes.COMMA:
        case goog.events.KeyCodes.PERIOD:
        case goog.events.KeyCodes.SLASH:
        case goog.events.KeyCodes.APOSTROPHE:
        case goog.events.KeyCodes.SINGLE_QUOTE:
            return !1
    }
    if (goog.userAgent.IE && d && b == a) return !1;
    switch (a) {
        case goog.events.KeyCodes.ENTER:
            return !0;
        case goog.events.KeyCodes.ESC:
            return !(goog.userAgent.WEBKIT || goog.userAgent.EDGE)
    }
    return goog.events.KeyCodes.isCharacterKey(a)
};
goog.events.KeyCodes.isCharacterKey = function(a) {
    if (a >= goog.events.KeyCodes.ZERO && a <= goog.events.KeyCodes.NINE || a >= goog.events.KeyCodes.NUM_ZERO && a <= goog.events.KeyCodes.NUM_MULTIPLY || a >= goog.events.KeyCodes.A && a <= goog.events.KeyCodes.Z || (goog.userAgent.WEBKIT || goog.userAgent.EDGE) && 0 == a) return !0;
    switch (a) {
        case goog.events.KeyCodes.SPACE:
        case goog.events.KeyCodes.PLUS_SIGN:
        case goog.events.KeyCodes.QUESTION_MARK:
        case goog.events.KeyCodes.AT_SIGN:
        case goog.events.KeyCodes.NUM_PLUS:
        case goog.events.KeyCodes.NUM_MINUS:
        case goog.events.KeyCodes.NUM_PERIOD:
        case goog.events.KeyCodes.NUM_DIVISION:
        case goog.events.KeyCodes.SEMICOLON:
        case goog.events.KeyCodes.FF_SEMICOLON:
        case goog.events.KeyCodes.DASH:
        case goog.events.KeyCodes.EQUALS:
        case goog.events.KeyCodes.FF_EQUALS:
        case goog.events.KeyCodes.COMMA:
        case goog.events.KeyCodes.PERIOD:
        case goog.events.KeyCodes.SLASH:
        case goog.events.KeyCodes.APOSTROPHE:
        case goog.events.KeyCodes.SINGLE_QUOTE:
        case goog.events.KeyCodes.OPEN_SQUARE_BRACKET:
        case goog.events.KeyCodes.BACKSLASH:
        case goog.events.KeyCodes.CLOSE_SQUARE_BRACKET:
            return !0;
        default:
            return !1
    }
};
goog.events.KeyCodes.normalizeKeyCode = function(a) {
    return goog.userAgent.GECKO ? goog.events.KeyCodes.normalizeGeckoKeyCode(a) : goog.userAgent.MAC && goog.userAgent.WEBKIT ? goog.events.KeyCodes.normalizeMacWebKitKeyCode(a) : a
};
goog.events.KeyCodes.normalizeGeckoKeyCode = function(a) {
    switch (a) {
        case goog.events.KeyCodes.FF_EQUALS:
            return goog.events.KeyCodes.EQUALS;
        case goog.events.KeyCodes.FF_SEMICOLON:
            return goog.events.KeyCodes.SEMICOLON;
        case goog.events.KeyCodes.FF_DASH:
            return goog.events.KeyCodes.DASH;
        case goog.events.KeyCodes.MAC_FF_META:
            return goog.events.KeyCodes.META;
        case goog.events.KeyCodes.WIN_KEY_FF_LINUX:
            return goog.events.KeyCodes.WIN_KEY;
        default:
            return a
    }
};
goog.events.KeyCodes.normalizeMacWebKitKeyCode = function(a) {
    switch (a) {
        case goog.events.KeyCodes.MAC_WK_CMD_RIGHT:
            return goog.events.KeyCodes.META;
        default:
            return a
    }
};
goog.fx = {};
goog.fx.Transition = function() {};
goog.fx.Transition.EventType = {
    PLAY: "play",
    BEGIN: "begin",
    RESUME: "resume",
    END: "end",
    STOP: "stop",
    FINISH: "finish",
    PAUSE: "pause"
};
goog.Thenable = function() {};
goog.Thenable.prototype.then = function(a, b, c) {};
goog.Thenable.IMPLEMENTED_BY_PROP = "$goog_Thenable";
goog.Thenable.addImplementation = function(a) {
    goog.exportProperty(a.prototype, "then", a.prototype.then);
    COMPILED ? a.prototype[goog.Thenable.IMPLEMENTED_BY_PROP] = !0 : a.prototype.$goog_Thenable = !0
};
goog.Thenable.isImplementedBy = function(a) {
    if (!a) return !1;
    try {
        return COMPILED ? !!a[goog.Thenable.IMPLEMENTED_BY_PROP] : !!a.$goog_Thenable
    } catch (b) {
        return !1
    }
};
goog.async = {};
goog.async.FreeList = function(a, b, c) {
    this.limit_ = c;
    this.create_ = a;
    this.reset_ = b;
    this.occupants_ = 0;
    this.head_ = null
};
goog.async.FreeList.prototype.get = function() {
    var a;
    0 < this.occupants_ ? (this.occupants_--, a = this.head_, this.head_ = a.next, a.next = null) : a = this.create_();
    return a
};
goog.async.FreeList.prototype.put = function(a) {
    this.reset_(a);
    this.occupants_ < this.limit_ && (this.occupants_++, a.next = this.head_, this.head_ = a)
};
goog.async.FreeList.prototype.occupants = function() {
    return this.occupants_
};
goog.async.WorkQueue = function() {
    this.workTail_ = this.workHead_ = null
};
goog.async.WorkQueue.DEFAULT_MAX_UNUSED = 100;
goog.async.WorkQueue.freelist_ = new goog.async.FreeList(function() {
    return new goog.async.WorkItem
}, function(a) {
    a.reset()
}, goog.async.WorkQueue.DEFAULT_MAX_UNUSED);
goog.async.WorkQueue.prototype.add = function(a, b) {
    var c = this.getUnusedItem_();
    c.set(a, b);
    this.workTail_ ? this.workTail_.next = c : (goog.asserts.assert(!this.workHead_), this.workHead_ = c);
    this.workTail_ = c
};
goog.async.WorkQueue.prototype.remove = function() {
    var a = null;
    this.workHead_ && (a = this.workHead_, this.workHead_ = this.workHead_.next, this.workHead_ || (this.workTail_ = null), a.next = null);
    return a
};
goog.async.WorkQueue.prototype.returnUnused = function(a) {
    goog.async.WorkQueue.freelist_.put(a)
};
goog.async.WorkQueue.prototype.getUnusedItem_ = function() {
    return goog.async.WorkQueue.freelist_.get()
};
goog.async.WorkItem = function() {
    this.next = this.scope = this.fn = null
};
goog.async.WorkItem.prototype.set = function(a, b) {
    this.fn = a;
    this.scope = b;
    this.next = null
};
goog.async.WorkItem.prototype.reset = function() {
    this.next = this.scope = this.fn = null
};
goog.async.throwException = function(a) {
    goog.global.setTimeout(function() {
        throw a;
    }, 0)
};
goog.async.nextTick = function(a, b, c) {
    var d = a;
    b && (d = goog.bind(a, b));
    d = goog.async.nextTick.wrapCallback_(d);
    goog.isFunction(goog.global.setImmediate) && (c || goog.async.nextTick.useSetImmediate_()) ? goog.global.setImmediate(d) : (goog.async.nextTick.setImmediate_ || (goog.async.nextTick.setImmediate_ = goog.async.nextTick.getSetImmediateEmulator_()), goog.async.nextTick.setImmediate_(d))
};
goog.async.nextTick.useSetImmediate_ = function() {
    return goog.global.Window && goog.global.Window.prototype && !goog.labs.userAgent.browser.isEdge() && goog.global.Window.prototype.setImmediate == goog.global.setImmediate ? !1 : !0
};
goog.async.nextTick.getSetImmediateEmulator_ = function() {
    var a = goog.global.MessageChannel;
    "undefined" === typeof a && "undefined" !== typeof window && window.postMessage && window.addEventListener && !goog.labs.userAgent.engine.isPresto() && (a = function() {
        var a = document.createElement(goog.dom.TagName.IFRAME);
        a.style.display = "none";
        a.src = "";
        document.documentElement.appendChild(a);
        var b = a.contentWindow,
            a = b.document;
        a.open();
        a.write("");
        a.close();
        var c = "callImmediate" + Math.random(),
            d = "file:" == b.location.protocol ? "*" :
            b.location.protocol + "//" + b.location.host,
            a = goog.bind(function(a) {
                if (("*" == d || a.origin == d) && a.data == c) this.port1.onmessage()
            }, this);
        b.addEventListener("message", a, !1);
        this.port1 = {};
        this.port2 = {
            postMessage: function() {
                b.postMessage(c, d)
            }
        }
    });
    if ("undefined" !== typeof a && !goog.labs.userAgent.browser.isIE()) {
        var b = new a,
            c = {},
            d = c;
        b.port1.onmessage = function() {
            if (goog.isDef(c.next)) {
                c = c.next;
                var a = c.cb;
                c.cb = null;
                a()
            }
        };
        return function(a) {
            d.next = {
                cb: a
            };
            d = d.next;
            b.port2.postMessage(0)
        }
    }
    return "undefined" !== typeof document &&
        "onreadystatechange" in document.createElement(goog.dom.TagName.SCRIPT) ? function(a) {
            var b = document.createElement(goog.dom.TagName.SCRIPT);
            b.onreadystatechange = function() {
                b.onreadystatechange = null;
                b.parentNode.removeChild(b);
                b = null;
                a();
                a = null
            };
            document.documentElement.appendChild(b)
        } : function(a) {
            goog.global.setTimeout(a, 0)
        }
};
goog.async.nextTick.wrapCallback_ = goog.functions.identity;
// goog.debug.entryPointRegistry.register(function(a) {
//     goog.async.nextTick.wrapCallback_ = a
// });
goog.async.run = function(a, b) {
    goog.async.run.schedule_ || goog.async.run.initializeRunner_();
    goog.async.run.workQueueScheduled_ || (goog.async.run.schedule_(), goog.async.run.workQueueScheduled_ = !0);
    goog.async.run.workQueue_.add(a, b)
};
goog.async.run.initializeRunner_ = function() {
    if (goog.global.Promise && goog.global.Promise.resolve) {
        var a = goog.global.Promise.resolve(void 0);
        goog.async.run.schedule_ = function() {
            a.then(goog.async.run.processWorkQueue)
        }
    } else goog.async.run.schedule_ = function() {
        goog.async.nextTick(goog.async.run.processWorkQueue)
    }
};
goog.async.run.forceNextTick = function(a) {
    goog.async.run.schedule_ = function() {
        goog.async.nextTick(goog.async.run.processWorkQueue);
        a && a(goog.async.run.processWorkQueue)
    }
};
goog.async.run.workQueueScheduled_ = !1;
goog.async.run.workQueue_ = new goog.async.WorkQueue;
goog.DEBUG && (goog.async.run.resetQueue = function() {
    goog.async.run.workQueueScheduled_ = !1;
    goog.async.run.workQueue_ = new goog.async.WorkQueue
});
goog.async.run.processWorkQueue = function() {
    for (var a = null; a = goog.async.run.workQueue_.remove();) {
        try {
            a.fn.call(a.scope)
        } catch (b) {
            goog.async.throwException(b)
        }
        goog.async.run.workQueue_.returnUnused(a)
    }
    goog.async.run.workQueueScheduled_ = !1
};
goog.promise = {};
goog.promise.Resolver = function() {};
goog.Promise = function(a, b) {
    this.state_ = goog.Promise.State_.PENDING;
    this.result_ = void 0;
    this.callbackEntriesTail_ = this.callbackEntries_ = this.parent_ = null;
    this.executing_ = !1;
    0 < goog.Promise.UNHANDLED_REJECTION_DELAY ? this.unhandledRejectionId_ = 0 : 0 == goog.Promise.UNHANDLED_REJECTION_DELAY && (this.hadUnhandledRejection_ = !1);
    goog.Promise.LONG_STACK_TRACES && (this.stack_ = [], this.addStackTrace_(Error("created")), this.currentStep_ = 0);
    if (a != goog.nullFunction) try {
        var c = this;
        a.call(b, function(a) {
            c.resolve_(goog.Promise.State_.FULFILLED,
                a)
        }, function(a) {
            if (goog.DEBUG && !(a instanceof goog.Promise.CancellationError)) try {
                if (a instanceof Error) throw a;
                throw Error("Promise rejected.");
            } catch (b) {}
            c.resolve_(goog.Promise.State_.REJECTED, a)
        })
    } catch (d) {
        this.resolve_(goog.Promise.State_.REJECTED, d)
    }
};
goog.Promise.LONG_STACK_TRACES = !1;
goog.Promise.UNHANDLED_REJECTION_DELAY = 0;
goog.Promise.State_ = {
    PENDING: 0,
    BLOCKED: 1,
    FULFILLED: 2,
    REJECTED: 3
};
goog.Promise.CallbackEntry_ = function() {
    this.next = this.context = this.onRejected = this.onFulfilled = this.child = null;
    this.always = !1
};
goog.Promise.CallbackEntry_.prototype.reset = function() {
    this.context = this.onRejected = this.onFulfilled = this.child = null;
    this.always = !1
};
goog.Promise.DEFAULT_MAX_UNUSED = 100;
goog.Promise.freelist_ = new goog.async.FreeList(function() {
    return new goog.Promise.CallbackEntry_
}, function(a) {
    a.reset()
}, goog.Promise.DEFAULT_MAX_UNUSED);
goog.Promise.getCallbackEntry_ = function(a, b, c) {
    var d = goog.Promise.freelist_.get();
    d.onFulfilled = a;
    d.onRejected = b;
    d.context = c;
    return d
};
goog.Promise.returnEntry_ = function(a) {
    goog.Promise.freelist_.put(a)
};
goog.Promise.resolve = function(a) {
    if (a instanceof goog.Promise) return a;
    var b = new goog.Promise(goog.nullFunction);
    b.resolve_(goog.Promise.State_.FULFILLED, a);
    return b
};
goog.Promise.reject = function(a) {
    return new goog.Promise(function(b, c) {
        c(a)
    })
};
goog.Promise.resolveThen_ = function(a, b, c) {
    goog.Promise.maybeThen_(a, b, c, null) || goog.async.run(goog.partial(b, a))
};
goog.Promise.race = function(a) {
    return new goog.Promise(function(b, c) {
        a.length || b(void 0);
        for (var d = 0, e; d < a.length; d++) e = a[d], goog.Promise.resolveThen_(e, b, c)
    })
};
goog.Promise.all = function(a) {
    return new goog.Promise(function(b, c) {
        var d = a.length,
            e = [];
        if (d)
            for (var f = function(a, c) {
                    d--;
                    e[a] = c;
                    0 == d && b(e)
                }, g = function(a) {
                    c(a)
                }, h = 0, k; h < a.length; h++) k = a[h], goog.Promise.resolveThen_(k, goog.partial(f, h), g);
        else b(e)
    })
};
goog.Promise.allSettled = function(a) {
    return new goog.Promise(function(b, c) {
        var d = a.length,
            e = [];
        if (d)
            for (var f = function(a, c, f) {
                    d--;
                    e[a] = c ? {
                        fulfilled: !0,
                        value: f
                    } : {
                        fulfilled: !1,
                        reason: f
                    };
                    0 == d && b(e)
                }, g = 0, h; g < a.length; g++) h = a[g], goog.Promise.resolveThen_(h, goog.partial(f, g, !0), goog.partial(f, g, !1));
        else b(e)
    })
};
goog.Promise.firstFulfilled = function(a) {
    return new goog.Promise(function(b, c) {
        var d = a.length,
            e = [];
        if (d)
            for (var f = function(a) {
                    b(a)
                }, g = function(a, b) {
                    d--;
                    e[a] = b;
                    0 == d && c(e)
                }, h = 0, k; h < a.length; h++) k = a[h], goog.Promise.resolveThen_(k, f, goog.partial(g, h));
        else b(void 0)
    })
};
goog.Promise.withResolver = function() {
    var a, b, c = new goog.Promise(function(c, e) {
        a = c;
        b = e
    });
    return new goog.Promise.Resolver_(c, a, b)
};
goog.Promise.prototype.then = function(a, b, c) {
    null != a && goog.asserts.assertFunction(a, "opt_onFulfilled should be a function.");
    null != b && goog.asserts.assertFunction(b, "opt_onRejected should be a function. Did you pass opt_context as the second argument instead of the third?");
    goog.Promise.LONG_STACK_TRACES && this.addStackTrace_(Error("then"));
    return this.addChildPromise_(goog.isFunction(a) ? a : null, goog.isFunction(b) ? b : null, c)
};
goog.Thenable.addImplementation(goog.Promise);
goog.Promise.prototype.thenVoid = function(a, b, c) {
    null != a && goog.asserts.assertFunction(a, "opt_onFulfilled should be a function.");
    null != b && goog.asserts.assertFunction(b, "opt_onRejected should be a function. Did you pass opt_context as the second argument instead of the third?");
    goog.Promise.LONG_STACK_TRACES && this.addStackTrace_(Error("then"));
    this.addCallbackEntry_(goog.Promise.getCallbackEntry_(a || goog.nullFunction, b || null, c))
};
goog.Promise.prototype.thenAlways = function(a, b) {
    goog.Promise.LONG_STACK_TRACES && this.addStackTrace_(Error("thenAlways"));
    var c = goog.Promise.getCallbackEntry_(a, a, b);
    c.always = !0;
    this.addCallbackEntry_(c);
    return this
};
goog.Promise.prototype.thenCatch = function(a, b) {
    goog.Promise.LONG_STACK_TRACES && this.addStackTrace_(Error("thenCatch"));
    return this.addChildPromise_(null, a, b)
};
goog.Promise.prototype.cancel = function(a) {
    this.state_ == goog.Promise.State_.PENDING && goog.async.run(function() {
        var b = new goog.Promise.CancellationError(a);
        this.cancelInternal_(b)
    }, this)
};
goog.Promise.prototype.cancelInternal_ = function(a) {
    this.state_ == goog.Promise.State_.PENDING && (this.parent_ ? (this.parent_.cancelChild_(this, a), this.parent_ = null) : this.resolve_(goog.Promise.State_.REJECTED, a))
};
goog.Promise.prototype.cancelChild_ = function(a, b) {
    if (this.callbackEntries_) {
        for (var c = 0, d = null, e = null, f = this.callbackEntries_; f && (f.always || (c++, f.child == a && (d = f), !(d && 1 < c))); f = f.next) d || (e = f);
        d && (this.state_ == goog.Promise.State_.PENDING && 1 == c ? this.cancelInternal_(b) : (e ? this.removeEntryAfter_(e) : this.popEntry_(), this.executeCallback_(d, goog.Promise.State_.REJECTED, b)))
    }
};
goog.Promise.prototype.addCallbackEntry_ = function(a) {
    this.hasEntry_() || this.state_ != goog.Promise.State_.FULFILLED && this.state_ != goog.Promise.State_.REJECTED || this.scheduleCallbacks_();
    this.queueEntry_(a)
};
goog.Promise.prototype.addChildPromise_ = function(a, b, c) {
    var d = goog.Promise.getCallbackEntry_(null, null, null);
    d.child = new goog.Promise(function(e, f) {
        d.onFulfilled = a ? function(b) {
            try {
                var d = a.call(c, b);
                e(d)
            } catch (k) {
                f(k)
            }
        } : e;
        d.onRejected = b ? function(a) {
            try {
                var d = b.call(c, a);
                !goog.isDef(d) && a instanceof goog.Promise.CancellationError ? f(a) : e(d)
            } catch (k) {
                f(k)
            }
        } : f
    });
    d.child.parent_ = this;
    this.addCallbackEntry_(d);
    return d.child
};
goog.Promise.prototype.unblockAndFulfill_ = function(a) {
    goog.asserts.assert(this.state_ == goog.Promise.State_.BLOCKED);
    this.state_ = goog.Promise.State_.PENDING;
    this.resolve_(goog.Promise.State_.FULFILLED, a)
};
goog.Promise.prototype.unblockAndReject_ = function(a) {
    goog.asserts.assert(this.state_ == goog.Promise.State_.BLOCKED);
    this.state_ = goog.Promise.State_.PENDING;
    this.resolve_(goog.Promise.State_.REJECTED, a)
};
goog.Promise.prototype.resolve_ = function(a, b) {
    this.state_ == goog.Promise.State_.PENDING && (this == b && (a = goog.Promise.State_.REJECTED, b = new TypeError("Promise cannot resolve to itself")), this.state_ = goog.Promise.State_.BLOCKED, goog.Promise.maybeThen_(b, this.unblockAndFulfill_, this.unblockAndReject_, this) || (this.result_ = b, this.state_ = a, this.parent_ = null, this.scheduleCallbacks_(), a != goog.Promise.State_.REJECTED || b instanceof goog.Promise.CancellationError || goog.Promise.addUnhandledRejection_(this, b)))
};
goog.Promise.maybeThen_ = function(a, b, c, d) {
    if (a instanceof goog.Promise) return a.thenVoid(b, c, d), !0;
    if (goog.Thenable.isImplementedBy(a)) return a.then(b, c, d), !0;
    if (goog.isObject(a)) try {
        var e = a.then;
        if (goog.isFunction(e)) return goog.Promise.tryThen_(a, e, b, c, d), !0
    } catch (f) {
        return c.call(d, f), !0
    }
    return !1
};
goog.Promise.tryThen_ = function(a, b, c, d, e) {
    var f = !1,
        g = function(a) {
            f || (f = !0, c.call(e, a))
        },
        h = function(a) {
            f || (f = !0, d.call(e, a))
        };
    try {
        b.call(a, g, h)
    } catch (k) {
        h(k)
    }
};
goog.Promise.prototype.scheduleCallbacks_ = function() {
    this.executing_ || (this.executing_ = !0, goog.async.run(this.executeCallbacks_, this))
};
goog.Promise.prototype.hasEntry_ = function() {
    return !!this.callbackEntries_
};
goog.Promise.prototype.queueEntry_ = function(a) {
    goog.asserts.assert(null != a.onFulfilled);
    this.callbackEntriesTail_ ? this.callbackEntriesTail_.next = a : this.callbackEntries_ = a;
    this.callbackEntriesTail_ = a
};
goog.Promise.prototype.popEntry_ = function() {
    var a = null;
    this.callbackEntries_ && (a = this.callbackEntries_, this.callbackEntries_ = a.next, a.next = null);
    this.callbackEntries_ || (this.callbackEntriesTail_ = null);
    null != a && goog.asserts.assert(null != a.onFulfilled);
    return a
};
goog.Promise.prototype.removeEntryAfter_ = function(a) {
    goog.asserts.assert(this.callbackEntries_);
    goog.asserts.assert(null != a);
    a.next == this.callbackEntriesTail_ && (this.callbackEntriesTail_ = a);
    a.next = a.next.next
};
goog.Promise.prototype.executeCallbacks_ = function() {
    for (var a = null; a = this.popEntry_();) goog.Promise.LONG_STACK_TRACES && this.currentStep_++, this.executeCallback_(a, this.state_, this.result_);
    this.executing_ = !1
};
goog.Promise.prototype.executeCallback_ = function(a, b, c) {
    b == goog.Promise.State_.REJECTED && a.onRejected && !a.always && this.removeUnhandledRejection_();
    if (a.child) a.child.parent_ = null, goog.Promise.invokeCallback_(a, b, c);
    else try {
        a.always ? a.onFulfilled.call(a.context) : goog.Promise.invokeCallback_(a, b, c)
    } catch (d) {
        goog.Promise.handleRejection_.call(null, d)
    }
    goog.Promise.returnEntry_(a)
};
goog.Promise.invokeCallback_ = function(a, b, c) {
    b == goog.Promise.State_.FULFILLED ? a.onFulfilled.call(a.context, c) : a.onRejected && a.onRejected.call(a.context, c)
};
goog.Promise.prototype.addStackTrace_ = function(a) {
    if (goog.Promise.LONG_STACK_TRACES && goog.isString(a.stack)) {
        var b = a.stack.split("\n", 4)[3];
        a = a.message;
        a += Array(11 - a.length).join(" ");
        this.stack_.push(a + b)
    }
};
goog.Promise.prototype.appendLongStack_ = function(a) {
    if (goog.Promise.LONG_STACK_TRACES && a && goog.isString(a.stack) && this.stack_.length) {
        for (var b = ["Promise trace:"], c = this; c; c = c.parent_) {
            for (var d = this.currentStep_; 0 <= d; d--) b.push(c.stack_[d]);
            b.push("Value: [" + (c.state_ == goog.Promise.State_.REJECTED ? "REJECTED" : "FULFILLED") + "] <" + String(c.result_) + ">")
        }
        a.stack += "\n\n" + b.join("\n")
    }
};
goog.Promise.prototype.removeUnhandledRejection_ = function() {
    if (0 < goog.Promise.UNHANDLED_REJECTION_DELAY)
        for (var a = this; a && a.unhandledRejectionId_; a = a.parent_) goog.global.clearTimeout(a.unhandledRejectionId_), a.unhandledRejectionId_ = 0;
    else if (0 == goog.Promise.UNHANDLED_REJECTION_DELAY)
        for (a = this; a && a.hadUnhandledRejection_; a = a.parent_) a.hadUnhandledRejection_ = !1
};
goog.Promise.addUnhandledRejection_ = function(a, b) {
    0 < goog.Promise.UNHANDLED_REJECTION_DELAY ? a.unhandledRejectionId_ = goog.global.setTimeout(function() {
        a.appendLongStack_(b);
        goog.Promise.handleRejection_.call(null, b)
    }, goog.Promise.UNHANDLED_REJECTION_DELAY) : 0 == goog.Promise.UNHANDLED_REJECTION_DELAY && (a.hadUnhandledRejection_ = !0, goog.async.run(function() {
        a.hadUnhandledRejection_ && (a.appendLongStack_(b), goog.Promise.handleRejection_.call(null, b))
    }))
};
goog.Promise.handleRejection_ = goog.async.throwException;
goog.Promise.setUnhandledRejectionHandler = function(a) {
    goog.Promise.handleRejection_ = a
};
goog.Promise.CancellationError = function(a) {
    goog.debug.Error.call(this, a)
};
goog.inherits(goog.Promise.CancellationError, goog.debug.Error);
goog.Promise.CancellationError.prototype.name = "cancel";
goog.Promise.Resolver_ = function(a, b, c) {
    this.promise = a;
    this.resolve = b;
    this.reject = c
};
goog.Timer = function(a, b) {
    goog.events.EventTarget.call(this);
    this.interval_ = a || 1;
    this.timerObject_ = b || goog.Timer.defaultTimerObject;
    this.boundTick_ = goog.bind(this.tick_, this);
    this.last_ = goog.now()
};
goog.inherits(goog.Timer, goog.events.EventTarget);
goog.Timer.MAX_TIMEOUT_ = 2147483647;
goog.Timer.INVALID_TIMEOUT_ID_ = -1;
goog.Timer.prototype.enabled = !1;
goog.Timer.defaultTimerObject = goog.global;
goog.Timer.intervalScale = .8;
goog.Timer.prototype.timer_ = null;
goog.Timer.prototype.getInterval = function() {
    return this.interval_
};
goog.Timer.prototype.setInterval = function(a) {
    this.interval_ = a;
    this.timer_ && this.enabled ? (this.stop(), this.start()) : this.timer_ && this.stop()
};
goog.Timer.prototype.tick_ = function() {
    if (this.enabled) {
        var a = goog.now() - this.last_;
        0 < a && a < this.interval_ * goog.Timer.intervalScale ? this.timer_ = this.timerObject_.setTimeout(this.boundTick_, this.interval_ - a) : (this.timer_ && (this.timerObject_.clearTimeout(this.timer_), this.timer_ = null), this.dispatchTick(), this.enabled && (this.timer_ = this.timerObject_.setTimeout(this.boundTick_, this.interval_), this.last_ = goog.now()))
    }
};
goog.Timer.prototype.dispatchTick = function() {
    this.dispatchEvent(goog.Timer.TICK)
};
goog.Timer.prototype.start = function() {
    this.enabled = !0;
    this.timer_ || (this.timer_ = this.timerObject_.setTimeout(this.boundTick_, this.interval_), this.last_ = goog.now())
};
goog.Timer.prototype.stop = function() {
    this.enabled = !1;
    this.timer_ && (this.timerObject_.clearTimeout(this.timer_), this.timer_ = null)
};
goog.Timer.prototype.disposeInternal = function() {
    goog.Timer.superClass_.disposeInternal.call(this);
    this.stop();
    delete this.timerObject_
};
goog.Timer.TICK = "tick";
goog.Timer.callOnce = function(a, b, c) {
    if (goog.isFunction(a)) c && (a = goog.bind(a, c));
    else if (a && "function" == typeof a.handleEvent) a = goog.bind(a.handleEvent, a);
    else throw Error("Invalid listener argument");
    return b > goog.Timer.MAX_TIMEOUT_ ? goog.Timer.INVALID_TIMEOUT_ID_ : goog.Timer.defaultTimerObject.setTimeout(a, b || 0)
};
goog.Timer.clear = function(a) {
    goog.Timer.defaultTimerObject.clearTimeout(a)
};
goog.Timer.promise = function(a, b) {
    var c = null;
    return (new goog.Promise(function(d, e) {
        c = goog.Timer.callOnce(function() {
            d(b)
        }, a);
        c == goog.Timer.INVALID_TIMEOUT_ID_ && e(Error("Failed to schedule timer."))
    })).thenCatch(function(a) {
        goog.Timer.clear(c);
        throw a;
    })
};
goog.ui = {};
goog.ui.PopupBase = function(a, b) {
    goog.events.EventTarget.call(this);
    this.handler_ = new goog.events.EventHandler(this);
    this.setElement(a || null);
    b && this.setType(b)
};
goog.inherits(goog.ui.PopupBase, goog.events.EventTarget);
goog.tagUnsealableClass(goog.ui.PopupBase);
goog.ui.PopupBase.Type = {
    TOGGLE_DISPLAY: "toggle_display",
    MOVE_OFFSCREEN: "move_offscreen"
};
goog.ui.PopupBase.prototype.element_ = null;
goog.ui.PopupBase.prototype.autoHide_ = !0;
goog.ui.PopupBase.prototype.autoHidePartners_ = null;
goog.ui.PopupBase.prototype.autoHideRegion_ = null;
goog.ui.PopupBase.prototype.isVisible_ = !1;
goog.ui.PopupBase.prototype.shouldHideAsync_ = !1;
goog.ui.PopupBase.prototype.lastShowTime_ = -1;
goog.ui.PopupBase.prototype.lastHideTime_ = -1;
goog.ui.PopupBase.prototype.hideOnEscape_ = !1;
goog.ui.PopupBase.prototype.enableCrossIframeDismissal_ = !0;
goog.ui.PopupBase.prototype.type_ = goog.ui.PopupBase.Type.TOGGLE_DISPLAY;
goog.ui.PopupBase.EventType = {
    BEFORE_SHOW: "beforeshow",
    SHOW: "show",
    BEFORE_HIDE: "beforehide",
    HIDE: "hide"
};
goog.ui.PopupBase.DEBOUNCE_DELAY_MS = 150;
goog.ui.PopupBase.prototype.getType = function() {
    return this.type_
};
goog.ui.PopupBase.prototype.setType = function(a) {
    this.type_ = a
};
goog.ui.PopupBase.prototype.shouldHideAsync = function() {
    return this.shouldHideAsync_
};
goog.ui.PopupBase.prototype.setShouldHideAsync = function(a) {
    this.shouldHideAsync_ = a
};
goog.ui.PopupBase.prototype.getElement = function() {
    return this.element_
};
goog.ui.PopupBase.prototype.setElement = function(a) {
    this.ensureNotVisible_();
    this.element_ = a
};
goog.ui.PopupBase.prototype.getAutoHide = function() {
    return this.autoHide_
};
goog.ui.PopupBase.prototype.setAutoHide = function(a) {
    this.ensureNotVisible_();
    this.autoHide_ = a
};
goog.ui.PopupBase.prototype.addAutoHidePartner = function(a) {
    this.autoHidePartners_ || (this.autoHidePartners_ = []);
    goog.array.insert(this.autoHidePartners_, a)
};
goog.ui.PopupBase.prototype.removeAutoHidePartner = function(a) {
    this.autoHidePartners_ && goog.array.remove(this.autoHidePartners_, a)
};
goog.ui.PopupBase.prototype.getHideOnEscape = function() {
    return this.hideOnEscape_
};
goog.ui.PopupBase.prototype.setHideOnEscape = function(a) {
    this.ensureNotVisible_();
    this.hideOnEscape_ = a
};
goog.ui.PopupBase.prototype.getEnableCrossIframeDismissal = function() {
    return this.enableCrossIframeDismissal_
};
goog.ui.PopupBase.prototype.setEnableCrossIframeDismissal = function(a) {
    this.enableCrossIframeDismissal_ = a
};
goog.ui.PopupBase.prototype.getAutoHideRegion = function() {
    return this.autoHideRegion_
};
goog.ui.PopupBase.prototype.setAutoHideRegion = function(a) {
    this.autoHideRegion_ = a
};
goog.ui.PopupBase.prototype.setTransition = function(a, b) {
    this.showTransition_ = a;
    this.hideTransition_ = b
};
goog.ui.PopupBase.prototype.getLastShowTime = function() {
    return this.lastShowTime_
};
goog.ui.PopupBase.prototype.getLastHideTime = function() {
    return this.lastHideTime_
};
goog.ui.PopupBase.prototype.getHandler = function() {
    return this.handler_
};
goog.ui.PopupBase.prototype.ensureNotVisible_ = function() {
    if (this.isVisible_) throw Error("Can not change this state of the popup while showing.");
};
goog.ui.PopupBase.prototype.isVisible = function() {
    return this.isVisible_
};
goog.ui.PopupBase.prototype.isOrWasRecentlyVisible = function() {
    return this.isVisible_ || goog.now() - this.lastHideTime_ < goog.ui.PopupBase.DEBOUNCE_DELAY_MS
};
goog.ui.PopupBase.prototype.setVisible = function(a) {
    this.showTransition_ && this.showTransition_.stop();
    this.hideTransition_ && this.hideTransition_.stop();
    a ? this.show_() : this.hide_()
};
goog.ui.PopupBase.prototype.reposition = goog.nullFunction;
goog.ui.PopupBase.prototype.show_ = function() {
    if (!this.isVisible_ && this.onBeforeShow()) {
        if (!this.element_) throw Error("Caller must call setElement before trying to show the popup");
        this.reposition();
        var a = goog.dom.getOwnerDocument(this.element_);
        this.hideOnEscape_ && this.handler_.listen(a, goog.events.EventType.KEYDOWN, this.onDocumentKeyDown_, !0);
        if (this.autoHide_)
            if (this.handler_.listen(a, goog.events.EventType.MOUSEDOWN, this.onDocumentMouseDown_, !0), goog.userAgent.IE) {
                var b;
                try {
                    b = a.activeElement
                } catch (d) {}
                for (; b &&
                    b.nodeName == goog.dom.TagName.IFRAME;) {
                    try {
                        var c = goog.dom.getFrameContentDocument(b)
                    } catch (d) {
                        break
                    }
                    a = c;
                    b = a.activeElement
                }
                this.handler_.listen(a, goog.events.EventType.MOUSEDOWN, this.onDocumentMouseDown_, !0);
                this.handler_.listen(a, goog.events.EventType.DEACTIVATE, this.onDocumentBlur_)
            } else this.handler_.listen(a, goog.events.EventType.BLUR, this.onDocumentBlur_);
        this.type_ == goog.ui.PopupBase.Type.TOGGLE_DISPLAY ? this.showPopupElement() : this.type_ == goog.ui.PopupBase.Type.MOVE_OFFSCREEN && this.reposition();
        this.isVisible_ = !0;
        this.lastShowTime_ = goog.now();
        this.lastHideTime_ = -1;
        if (this.showTransition_) goog.events.listenOnce(this.showTransition_, goog.fx.Transition.EventType.END, this.onShow_, !1, this), this.showTransition_.play();
        else this.onShow_()
    }
};
goog.ui.PopupBase.prototype.hide_ = function(a) {
    if (!this.isVisible_ || !this.onBeforeHide_(a)) return !1;
    this.handler_ && this.handler_.removeAll();
    this.isVisible_ = !1;
    this.lastHideTime_ = goog.now();
    this.hideTransition_ ? (goog.events.listenOnce(this.hideTransition_, goog.fx.Transition.EventType.END, goog.partial(this.continueHidingPopup_, a), !1, this), this.hideTransition_.play()) : this.continueHidingPopup_(a);
    return !0
};
goog.ui.PopupBase.prototype.continueHidingPopup_ = function(a) {
    this.type_ == goog.ui.PopupBase.Type.TOGGLE_DISPLAY ? this.shouldHideAsync_ ? goog.Timer.callOnce(this.hidePopupElement, 0, this) : this.hidePopupElement() : this.type_ == goog.ui.PopupBase.Type.MOVE_OFFSCREEN && this.moveOffscreen_();
    this.onHide_(a)
};
goog.ui.PopupBase.prototype.showPopupElement = function() {
    this.element_.style.visibility = "visible";
    goog.style.setElementShown(this.element_, !0)
};
goog.ui.PopupBase.prototype.hidePopupElement = function() {
    this.element_.style.visibility = "hidden";
    goog.style.setElementShown(this.element_, !1)
};
goog.ui.PopupBase.prototype.moveOffscreen_ = function() {
    this.element_.style.top = "-10000px"
};
goog.ui.PopupBase.prototype.onBeforeShow = function() {
    return this.dispatchEvent(goog.ui.PopupBase.EventType.BEFORE_SHOW)
};
goog.ui.PopupBase.prototype.onShow_ = function() {
    this.dispatchEvent(goog.ui.PopupBase.EventType.SHOW)
};
goog.ui.PopupBase.prototype.onBeforeHide_ = function(a) {
    return this.dispatchEvent({
        type: goog.ui.PopupBase.EventType.BEFORE_HIDE,
        target: a
    })
};
goog.ui.PopupBase.prototype.onHide_ = function(a) {
    this.dispatchEvent({
        type: goog.ui.PopupBase.EventType.HIDE,
        target: a
    })
};
goog.ui.PopupBase.prototype.onDocumentMouseDown_ = function(a) {
    a = a.target;
    goog.dom.contains(this.element_, a) || this.isOrWithinAutoHidePartner_(a) || !this.isWithinAutoHideRegion_(a) || this.shouldDebounce_() || this.hide_(a)
};
goog.ui.PopupBase.prototype.onDocumentKeyDown_ = function(a) {
    a.keyCode == goog.events.KeyCodes.ESC && this.hide_(a.target) && (a.preventDefault(), a.stopPropagation())
};
goog.ui.PopupBase.prototype.onDocumentBlur_ = function(a) {
    if (this.enableCrossIframeDismissal_) {
        var b = goog.dom.getOwnerDocument(this.element_);
        if ("undefined" != typeof document.activeElement) {
            if (a = b.activeElement, !a || goog.dom.contains(this.element_, a) || a.tagName == goog.dom.TagName.BODY) return
        } else if (a.target != b) return;
        this.shouldDebounce_() || this.hide_()
    }
};
goog.ui.PopupBase.prototype.isOrWithinAutoHidePartner_ = function(a) {
    return goog.array.some(this.autoHidePartners_ || [], function(b) {
        return a === b || goog.dom.contains(b, a)
    })
};
goog.ui.PopupBase.prototype.isWithinAutoHideRegion_ = function(a) {
    return this.autoHideRegion_ ? goog.dom.contains(this.autoHideRegion_, a) : !0
};
goog.ui.PopupBase.prototype.shouldDebounce_ = function() {
    return goog.now() - this.lastShowTime_ < goog.ui.PopupBase.DEBOUNCE_DELAY_MS
};
goog.ui.PopupBase.prototype.disposeInternal = function() {
    goog.ui.PopupBase.superClass_.disposeInternal.call(this);
    this.handler_.dispose();
    goog.dispose(this.showTransition_);
    goog.dispose(this.hideTransition_);
    delete this.element_;
    delete this.handler_;
    delete this.autoHidePartners_
};
goog.ui.Popup = function(a, b) {
    this.popupCorner_ = goog.positioning.Corner.TOP_START;
    this.position_ = b || void 0;
    goog.ui.PopupBase.call(this, a)
};
goog.inherits(goog.ui.Popup, goog.ui.PopupBase);
goog.tagUnsealableClass(goog.ui.Popup);
goog.ui.Popup.prototype.getPinnedCorner = function() {
    return this.popupCorner_
};
goog.ui.Popup.prototype.setPinnedCorner = function(a) {
    this.popupCorner_ = a;
    this.isVisible() && this.reposition()
};
goog.ui.Popup.prototype.getPosition = function() {
    return this.position_ || null
};
goog.ui.Popup.prototype.setPosition = function(a) {
    this.position_ = a || void 0;
    this.isVisible() && this.reposition()
};
goog.ui.Popup.prototype.getMargin = function() {
    return this.margin_ || null
};
goog.ui.Popup.prototype.setMargin = function(a, b, c, d) {
    this.margin_ = null == a || a instanceof goog.math.Box ? a : new goog.math.Box(a, b, c, d);
    this.isVisible() && this.reposition()
};
goog.ui.Popup.prototype.reposition = function() {
    if (this.position_) {
        var a = !this.isVisible() && this.getType() != goog.ui.PopupBase.Type.MOVE_OFFSCREEN,
            b = this.getElement();
        a && (b.style.visibility = "hidden", goog.style.setElementShown(b, !0));
        this.position_.reposition(b, this.popupCorner_, this.margin_);
        a && goog.style.setElementShown(b, !1)
    }
};
goog.html.legacyconversions = {};
goog.html.legacyconversions.ALLOW_LEGACY_CONVERSIONS = !0;
goog.html.legacyconversions.safeHtmlFromString = function(a) {
    goog.html.legacyconversions.throwIfConversionsDisallowed();
    return goog.html.SafeHtml.createSafeHtmlSecurityPrivateDoNotAccessOrElse(a, null)
};
goog.html.legacyconversions.safeStyleFromString = function(a) {
    goog.html.legacyconversions.throwIfConversionsDisallowed();
    return goog.html.SafeStyle.createSafeStyleSecurityPrivateDoNotAccessOrElse(a)
};
goog.html.legacyconversions.trustedResourceUrlFromString = function(a) {
    goog.html.legacyconversions.throwIfConversionsDisallowed();
    return goog.html.TrustedResourceUrl.createTrustedResourceUrlSecurityPrivateDoNotAccessOrElse(a)
};
goog.html.legacyconversions.safeUrlFromString = function(a) {
    goog.html.legacyconversions.throwIfConversionsDisallowed();
    return goog.html.SafeUrl.createSafeUrlSecurityPrivateDoNotAccessOrElse(a)
};
goog.html.legacyconversions.reportCallback_ = goog.nullFunction;
goog.html.legacyconversions.setReportCallback = function(a) {
    goog.html.legacyconversions.reportCallback_ = a
};
goog.html.legacyconversions.throwIfConversionsDisallowed = function() {
    if (!goog.html.legacyconversions.ALLOW_LEGACY_CONVERSIONS) throw Error("Error: Legacy conversion from string to goog.html types is disabled");
    goog.html.legacyconversions.reportCallback_()
};
goog.ui.Tooltip = function(a, b, c) {
    this.dom_ = c || (a ? goog.dom.getDomHelper(goog.dom.getElement(a)) : goog.dom.getDomHelper());
    goog.ui.Popup.call(this, this.dom_.createDom(goog.dom.TagName.DIV, {
        style: "position:absolute;display:none;"
    }));
    this.cursorPosition = new goog.math.Coordinate(1, 1);
    this.elements_ = new goog.structs.Set;
    this.tooltipFocusHandler_ = null;
    a && this.attach(a);
    null != b && this.setText(b)
};
goog.inherits(goog.ui.Tooltip, goog.ui.Popup);
goog.tagUnsealableClass(goog.ui.Tooltip);
goog.ui.Tooltip.activeInstances_ = [];
goog.ui.Tooltip.prototype.activeEl_ = null;
goog.ui.Tooltip.prototype.className = "goog-tooltip";
goog.ui.Tooltip.prototype.showDelayMs_ = 500;
goog.ui.Tooltip.prototype.hideDelayMs_ = 0;
goog.ui.Tooltip.State = {
    INACTIVE: 0,
    WAITING_TO_SHOW: 1,
    SHOWING: 2,
    WAITING_TO_HIDE: 3,
    UPDATING: 4
};
goog.ui.Tooltip.Activation = {
    CURSOR: 0,
    FOCUS: 1
};
goog.ui.Tooltip.prototype.getDomHelper = function() {
    return this.dom_
};
goog.ui.Tooltip.prototype.getChildTooltip = function() {
    return this.childTooltip_
};
goog.ui.Tooltip.prototype.attach = function(a) {
    a = goog.dom.getElement(a);
    this.elements_.add(a);
    goog.events.listen(a, goog.events.EventType.MOUSEOVER, this.handleMouseOver, !1, this);
    goog.events.listen(a, goog.events.EventType.MOUSEOUT, this.handleMouseOutAndBlur, !1, this);
    goog.events.listen(a, goog.events.EventType.MOUSEMOVE, this.handleMouseMove, !1, this);
    goog.events.listen(a, goog.events.EventType.FOCUS, this.handleFocus, !1, this);
    goog.events.listen(a, goog.events.EventType.BLUR, this.handleMouseOutAndBlur, !1, this)
};
goog.ui.Tooltip.prototype.detach = function(a) {
    if (a) a = goog.dom.getElement(a), this.detachElement_(a), this.elements_.remove(a);
    else {
        for (var b = this.elements_.getValues(), c = 0; a = b[c]; c++) this.detachElement_(a);
        this.elements_.clear()
    }
};
goog.ui.Tooltip.prototype.detachElement_ = function(a) {
    goog.events.unlisten(a, goog.events.EventType.MOUSEOVER, this.handleMouseOver, !1, this);
    goog.events.unlisten(a, goog.events.EventType.MOUSEOUT, this.handleMouseOutAndBlur, !1, this);
    goog.events.unlisten(a, goog.events.EventType.MOUSEMOVE, this.handleMouseMove, !1, this);
    goog.events.unlisten(a, goog.events.EventType.FOCUS, this.handleFocus, !1, this);
    goog.events.unlisten(a, goog.events.EventType.BLUR, this.handleMouseOutAndBlur, !1, this)
};
goog.ui.Tooltip.prototype.setShowDelayMs = function(a) {
    this.showDelayMs_ = a
};
goog.ui.Tooltip.prototype.getShowDelayMs = function() {
    return this.showDelayMs_
};
goog.ui.Tooltip.prototype.setHideDelayMs = function(a) {
    this.hideDelayMs_ = a
};
goog.ui.Tooltip.prototype.getHideDelayMs = function() {
    return this.hideDelayMs_
};
goog.ui.Tooltip.prototype.setText = function(a) {
    goog.dom.setTextContent(this.getElement(), a)
};
goog.ui.Tooltip.prototype.setHtml = function(a) {
    this.setSafeHtml(goog.html.legacyconversions.safeHtmlFromString(a))
};
goog.ui.Tooltip.prototype.setSafeHtml = function(a) {
    var b = this.getElement();
    b && goog.dom.safe.setInnerHtml(b, a)
};
goog.ui.Tooltip.prototype.setElement = function(a) {
    var b = this.getElement();
    b && goog.dom.removeNode(b);
    goog.ui.Tooltip.superClass_.setElement.call(this, a);
    a ? (b = this.dom_.getDocument().body, b.insertBefore(a, b.lastChild), this.registerContentFocusEvents_()) : (goog.dispose(this.tooltipFocusHandler_), this.tooltipFocusHandler_ = null)
};
goog.ui.Tooltip.prototype.registerContentFocusEvents_ = function() {
    goog.dispose(this.tooltipFocusHandler_);
    this.tooltipFocusHandler_ = new goog.events.FocusHandler(goog.asserts.assert(this.getElement()));
    this.registerDisposable(this.tooltipFocusHandler_);
    goog.events.listen(this.tooltipFocusHandler_, goog.events.FocusHandler.EventType.FOCUSIN, this.clearHideTimer, void 0, this);
    goog.events.listen(this.tooltipFocusHandler_, goog.events.FocusHandler.EventType.FOCUSOUT, this.startHideTimer, void 0, this)
};
goog.ui.Tooltip.prototype.getText = function() {
    return goog.dom.getTextContent(this.getElement())
};
goog.ui.Tooltip.prototype.getHtml = function() {
    return this.getElement().innerHTML
};
goog.ui.Tooltip.prototype.getState = function() {
    return this.showTimer ? this.isVisible() ? goog.ui.Tooltip.State.UPDATING : goog.ui.Tooltip.State.WAITING_TO_SHOW : this.hideTimer ? goog.ui.Tooltip.State.WAITING_TO_HIDE : this.isVisible() ? goog.ui.Tooltip.State.SHOWING : goog.ui.Tooltip.State.INACTIVE
};
goog.ui.Tooltip.prototype.setRequireInteraction = function(a) {
    this.requireInteraction_ = a
};
goog.ui.Tooltip.prototype.isCoordinateInTooltip = function(a) {
    if (!this.isVisible()) return !1;
    var b = goog.style.getPageOffset(this.getElement()),
        c = goog.style.getSize(this.getElement());
    return b.x <= a.x && a.x <= b.x + c.width && b.y <= a.y && a.y <= b.y + c.height
};
goog.ui.Tooltip.prototype.onBeforeShow = function() {
    if (!goog.ui.PopupBase.prototype.onBeforeShow.call(this)) return !1;
    if (this.anchor)
        for (var a, b = 0; a = goog.ui.Tooltip.activeInstances_[b]; b++) goog.dom.contains(a.getElement(), this.anchor) || a.setVisible(!1);
    goog.array.insert(goog.ui.Tooltip.activeInstances_, this);
    a = this.getElement();
    a.className = this.className;
    this.clearHideTimer();
    goog.events.listen(a, goog.events.EventType.MOUSEOVER, this.handleTooltipMouseOver, !1, this);
    goog.events.listen(a, goog.events.EventType.MOUSEOUT,
        this.handleTooltipMouseOut, !1, this);
    this.clearShowTimer();
    return !0
};
goog.ui.Tooltip.prototype.onHide_ = function() {
    goog.array.remove(goog.ui.Tooltip.activeInstances_, this);
    for (var a = this.getElement(), b, c = 0; b = goog.ui.Tooltip.activeInstances_[c]; c++) b.anchor && goog.dom.contains(a, b.anchor) && b.setVisible(!1);
    this.parentTooltip_ && this.parentTooltip_.startHideTimer();
    goog.events.unlisten(a, goog.events.EventType.MOUSEOVER, this.handleTooltipMouseOver, !1, this);
    goog.events.unlisten(a, goog.events.EventType.MOUSEOUT, this.handleTooltipMouseOut, !1, this);
    this.anchor = void 0;
    this.getState() ==
        goog.ui.Tooltip.State.INACTIVE && (this.seenInteraction_ = !1);
    goog.ui.PopupBase.prototype.onHide_.call(this)
};
goog.ui.Tooltip.prototype.maybeShow = function(a, b) {
    this.anchor == a && this.elements_.contains(this.anchor) && (this.seenInteraction_ || !this.requireInteraction_ ? (this.setVisible(!1), this.isVisible() || this.positionAndShow_(a, b)) : this.anchor = void 0);
    this.showTimer = void 0
};
goog.ui.Tooltip.prototype.getElements = function() {
    return this.elements_
};
goog.ui.Tooltip.prototype.getActiveElement = function() {
    return this.activeEl_
};
goog.ui.Tooltip.prototype.setActiveElement = function(a) {
    this.activeEl_ = a
};
goog.ui.Tooltip.prototype.showForElement = function(a, b) {
    this.attach(a);
    this.activeEl_ = a;
    this.positionAndShow_(a, b)
};
goog.ui.Tooltip.prototype.positionAndShow_ = function(a, b) {
    this.anchor = a;
    this.setPosition(b || this.getPositioningStrategy(goog.ui.Tooltip.Activation.CURSOR));
    this.setVisible(!0)
};
goog.ui.Tooltip.prototype.maybeHide = function(a) {
    this.hideTimer = void 0;
    if (a == this.anchor) {
        a = this.getDomHelper();
        var b = a.getActiveElement();
        a = b && this.getElement() && a.contains(this.getElement(), b);
        null != this.activeEl_ && (this.activeEl_ == this.getElement() || this.elements_.contains(this.activeEl_)) || a || this.hasActiveChild() || this.setVisible(!1)
    }
};
goog.ui.Tooltip.prototype.hasActiveChild = function() {
    return !(!this.childTooltip_ || !this.childTooltip_.activeEl_)
};
goog.ui.Tooltip.prototype.saveCursorPosition_ = function(a) {
    var b = this.dom_.getDocumentScroll();
    this.cursorPosition.x = a.clientX + b.x;
    this.cursorPosition.y = a.clientY + b.y
};
goog.ui.Tooltip.prototype.handleMouseOver = function(a) {
    var b = this.getAnchorFromElement(a.target);
    this.activeEl_ = b;
    this.clearHideTimer();
    b != this.anchor && (this.anchor = b, this.startShowTimer(b), this.checkForParentTooltip_(), this.saveCursorPosition_(a))
};
goog.ui.Tooltip.prototype.getAnchorFromElement = function(a) {
    try {
        for (; a && !this.elements_.contains(a);) a = a.parentNode;
        return a
    } catch (b) {
        return null
    }
};
goog.ui.Tooltip.prototype.handleMouseMove = function(a) {
    this.saveCursorPosition_(a);
    this.seenInteraction_ = !0
};
goog.ui.Tooltip.prototype.handleFocus = function(a) {
    this.activeEl_ = a = this.getAnchorFromElement(a.target);
    this.seenInteraction_ = !0;
    if (this.anchor != a) {
        this.anchor = a;
        var b = this.getPositioningStrategy(goog.ui.Tooltip.Activation.FOCUS);
        this.clearHideTimer();
        this.startShowTimer(a, b);
        this.checkForParentTooltip_()
    }
};
goog.ui.Tooltip.prototype.getPositioningStrategy = function(a) {
    return a == goog.ui.Tooltip.Activation.CURSOR ? (a = this.cursorPosition.clone(), new goog.ui.Tooltip.CursorTooltipPosition(a)) : new goog.ui.Tooltip.ElementTooltipPosition(this.activeEl_)
};
goog.ui.Tooltip.prototype.checkForParentTooltip_ = function() {
    if (this.anchor)
        for (var a, b = 0; a = goog.ui.Tooltip.activeInstances_[b]; b++) goog.dom.contains(a.getElement(), this.anchor) && (a.childTooltip_ = this, this.parentTooltip_ = a)
};
goog.ui.Tooltip.prototype.handleMouseOutAndBlur = function(a) {
    var b = this.getAnchorFromElement(a.target),
        c = this.getAnchorFromElement(a.relatedTarget);
    b != c && (b == this.activeEl_ && (this.activeEl_ = null), this.clearShowTimer(), this.seenInteraction_ = !1, !this.isVisible() || a.relatedTarget && goog.dom.contains(this.getElement(), a.relatedTarget) ? this.anchor = void 0 : this.startHideTimer())
};
goog.ui.Tooltip.prototype.handleTooltipMouseOver = function(a) {
    a = this.getElement();
    this.activeEl_ != a && (this.clearHideTimer(), this.activeEl_ = a)
};
goog.ui.Tooltip.prototype.handleTooltipMouseOut = function(a) {
    var b = this.getElement();
    this.activeEl_ != b || a.relatedTarget && goog.dom.contains(b, a.relatedTarget) || (this.activeEl_ = null, this.startHideTimer())
};
goog.ui.Tooltip.prototype.startShowTimer = function(a, b) {
    this.showTimer || (this.showTimer = goog.Timer.callOnce(goog.bind(this.maybeShow, this, a, b), this.showDelayMs_))
};
goog.ui.Tooltip.prototype.clearShowTimer = function() {
    this.showTimer && (goog.Timer.clear(this.showTimer), this.showTimer = void 0)
};
goog.ui.Tooltip.prototype.startHideTimer = function() {
    this.getState() == goog.ui.Tooltip.State.SHOWING && (this.hideTimer = goog.Timer.callOnce(goog.bind(this.maybeHide, this, this.anchor), this.getHideDelayMs()))
};
goog.ui.Tooltip.prototype.clearHideTimer = function() {
    this.hideTimer && (goog.Timer.clear(this.hideTimer), this.hideTimer = void 0)
};
goog.ui.Tooltip.prototype.disposeInternal = function() {
    this.setVisible(!1);
    this.clearShowTimer();
    this.detach();
    this.getElement() && goog.dom.removeNode(this.getElement());
    this.activeEl_ = null;
    delete this.dom_;
    goog.ui.Tooltip.superClass_.disposeInternal.call(this)
};
goog.ui.Tooltip.CursorTooltipPosition = function(a, b) {
    goog.positioning.ViewportPosition.call(this, a, b)
};
goog.inherits(goog.ui.Tooltip.CursorTooltipPosition, goog.positioning.ViewportPosition);
goog.ui.Tooltip.CursorTooltipPosition.prototype.reposition = function(a, b, c) {
    b = goog.style.getClientViewportElement(a);
    b = goog.style.getVisibleRectForElement(b);
    c = c ? new goog.math.Box(c.top + 10, c.right, c.bottom, c.left + 10) : new goog.math.Box(10, 0, 0, 10);
    goog.positioning.positionAtCoordinate(this.coordinate, a, goog.positioning.Corner.TOP_START, c, b, goog.positioning.Overflow.ADJUST_X | goog.positioning.Overflow.FAIL_Y) & goog.positioning.OverflowStatus.FAILED && goog.positioning.positionAtCoordinate(this.coordinate,
        a, goog.positioning.Corner.TOP_START, c, b, goog.positioning.Overflow.ADJUST_X | goog.positioning.Overflow.ADJUST_Y)
};
goog.ui.Tooltip.ElementTooltipPosition = function(a) {
    goog.positioning.AnchoredPosition.call(this, a, goog.positioning.Corner.BOTTOM_RIGHT)
};
goog.inherits(goog.ui.Tooltip.ElementTooltipPosition, goog.positioning.AnchoredPosition);
goog.ui.Tooltip.ElementTooltipPosition.prototype.reposition = function(a, b, c) {
    var d = new goog.math.Coordinate(10, 0);
    goog.positioning.positionAtAnchor(this.element, this.corner, a, b, d, c, goog.positioning.Overflow.ADJUST_X | goog.positioning.Overflow.FAIL_Y) & goog.positioning.OverflowStatus.FAILED && goog.positioning.positionAtAnchor(this.element, goog.positioning.Corner.TOP_RIGHT, a, goog.positioning.Corner.BOTTOM_LEFT, d, c, goog.positioning.Overflow.ADJUST_X | goog.positioning.Overflow.ADJUST_Y)
};
goog.a11y = {};
goog.a11y.aria = {};
goog.a11y.aria.Role = {
    ALERT: "alert",
    ALERTDIALOG: "alertdialog",
    APPLICATION: "application",
    ARTICLE: "article",
    BANNER: "banner",
    BUTTON: "button",
    CHECKBOX: "checkbox",
    COLUMNHEADER: "columnheader",
    COMBOBOX: "combobox",
    COMPLEMENTARY: "complementary",
    CONTENTINFO: "contentinfo",
    DEFINITION: "definition",
    DIALOG: "dialog",
    DIRECTORY: "directory",
    DOCUMENT: "document",
    FORM: "form",
    GRID: "grid",
    GRIDCELL: "gridcell",
    GROUP: "group",
    HEADING: "heading",
    IMG: "img",
    LINK: "link",
    LIST: "list",
    LISTBOX: "listbox",
    LISTITEM: "listitem",
    LOG: "log",
    MAIN: "main",
    MARQUEE: "marquee",
    MATH: "math",
    MENU: "menu",
    MENUBAR: "menubar",
    MENU_ITEM: "menuitem",
    MENU_ITEM_CHECKBOX: "menuitemcheckbox",
    MENU_ITEM_RADIO: "menuitemradio",
    NAVIGATION: "navigation",
    NOTE: "note",
    OPTION: "option",
    PRESENTATION: "presentation",
    PROGRESSBAR: "progressbar",
    RADIO: "radio",
    RADIOGROUP: "radiogroup",
    REGION: "region",
    ROW: "row",
    ROWGROUP: "rowgroup",
    ROWHEADER: "rowheader",
    SCROLLBAR: "scrollbar",
    SEARCH: "search",
    SEPARATOR: "separator",
    SLIDER: "slider",
    SPINBUTTON: "spinbutton",
    STATUS: "status",
    TAB: "tab",
    TAB_LIST: "tablist",
    TAB_PANEL: "tabpanel",
    TEXTBOX: "textbox",
    TEXTINFO: "textinfo",
    TIMER: "timer",
    TOOLBAR: "toolbar",
    TOOLTIP: "tooltip",
    TREE: "tree",
    TREEGRID: "treegrid",
    TREEITEM: "treeitem"
};
goog.a11y.aria.State = {
    ACTIVEDESCENDANT: "activedescendant",
    ATOMIC: "atomic",
    AUTOCOMPLETE: "autocomplete",
    BUSY: "busy",
    CHECKED: "checked",
    CONTROLS: "controls",
    DESCRIBEDBY: "describedby",
    DISABLED: "disabled",
    DROPEFFECT: "dropeffect",
    EXPANDED: "expanded",
    FLOWTO: "flowto",
    GRABBED: "grabbed",
    HASPOPUP: "haspopup",
    HIDDEN: "hidden",
    INVALID: "invalid",
    LABEL: "label",
    LABELLEDBY: "labelledby",
    LEVEL: "level",
    LIVE: "live",
    MULTILINE: "multiline",
    MULTISELECTABLE: "multiselectable",
    ORIENTATION: "orientation",
    OWNS: "owns",
    POSINSET: "posinset",
    PRESSED: "pressed",
    READONLY: "readonly",
    RELEVANT: "relevant",
    REQUIRED: "required",
    SELECTED: "selected",
    SETSIZE: "setsize",
    SORT: "sort",
    VALUEMAX: "valuemax",
    VALUEMIN: "valuemin",
    VALUENOW: "valuenow",
    VALUETEXT: "valuetext"
};
goog.a11y.aria.AutoCompleteValues = {
    INLINE: "inline",
    LIST: "list",
    BOTH: "both",
    NONE: "none"
};
goog.a11y.aria.DropEffectValues = {
    COPY: "copy",
    MOVE: "move",
    LINK: "link",
    EXECUTE: "execute",
    POPUP: "popup",
    NONE: "none"
};
goog.a11y.aria.LivePriority = {
    OFF: "off",
    POLITE: "polite",
    ASSERTIVE: "assertive"
};
goog.a11y.aria.OrientationValues = {
    VERTICAL: "vertical",
    HORIZONTAL: "horizontal"
};
goog.a11y.aria.RelevantValues = {
    ADDITIONS: "additions",
    REMOVALS: "removals",
    TEXT: "text",
    ALL: "all"
};
goog.a11y.aria.SortValues = {
    ASCENDING: "ascending",
    DESCENDING: "descending",
    NONE: "none",
    OTHER: "other"
};
goog.a11y.aria.CheckedValues = {
    TRUE: "true",
    FALSE: "false",
    MIXED: "mixed",
    UNDEFINED: "undefined"
};
goog.a11y.aria.ExpandedValues = {
    TRUE: "true",
    FALSE: "false",
    UNDEFINED: "undefined"
};
goog.a11y.aria.GrabbedValues = {
    TRUE: "true",
    FALSE: "false",
    UNDEFINED: "undefined"
};
goog.a11y.aria.InvalidValues = {
    FALSE: "false",
    TRUE: "true",
    GRAMMAR: "grammar",
    SPELLING: "spelling"
};
goog.a11y.aria.PressedValues = {
    TRUE: "true",
    FALSE: "false",
    MIXED: "mixed",
    UNDEFINED: "undefined"
};
goog.a11y.aria.SelectedValues = {
    TRUE: "true",
    FALSE: "false",
    UNDEFINED: "undefined"
};
goog.a11y.aria.datatables = {};
goog.a11y.aria.datatables.getDefaultValuesMap = function() {
    goog.a11y.aria.DefaultStateValueMap_ || (goog.a11y.aria.DefaultStateValueMap_ = goog.object.create(goog.a11y.aria.State.ATOMIC, !1, goog.a11y.aria.State.AUTOCOMPLETE, "none", goog.a11y.aria.State.DROPEFFECT, "none", goog.a11y.aria.State.HASPOPUP, !1, goog.a11y.aria.State.LIVE, "off", goog.a11y.aria.State.MULTILINE, !1, goog.a11y.aria.State.MULTISELECTABLE, !1, goog.a11y.aria.State.ORIENTATION, "vertical", goog.a11y.aria.State.READONLY, !1, goog.a11y.aria.State.RELEVANT,
        "additions text", goog.a11y.aria.State.REQUIRED, !1, goog.a11y.aria.State.SORT, "none", goog.a11y.aria.State.BUSY, !1, goog.a11y.aria.State.DISABLED, !1, goog.a11y.aria.State.HIDDEN, !1, goog.a11y.aria.State.INVALID, "false"));
    return goog.a11y.aria.DefaultStateValueMap_
};
goog.a11y.aria.ARIA_PREFIX_ = "aria-";
goog.a11y.aria.ROLE_ATTRIBUTE_ = "role";
goog.a11y.aria.TAGS_WITH_ASSUMED_ROLES_ = [goog.dom.TagName.A, goog.dom.TagName.AREA, goog.dom.TagName.BUTTON, goog.dom.TagName.HEAD, goog.dom.TagName.INPUT, goog.dom.TagName.LINK, goog.dom.TagName.MENU, goog.dom.TagName.META, goog.dom.TagName.OPTGROUP, goog.dom.TagName.OPTION, goog.dom.TagName.PROGRESS, goog.dom.TagName.STYLE, goog.dom.TagName.SELECT, goog.dom.TagName.SOURCE, goog.dom.TagName.TEXTAREA, goog.dom.TagName.TITLE, goog.dom.TagName.TRACK];
goog.a11y.aria.CONTAINER_ROLES_ = [goog.a11y.aria.Role.COMBOBOX, goog.a11y.aria.Role.GRID, goog.a11y.aria.Role.GROUP, goog.a11y.aria.Role.LISTBOX, goog.a11y.aria.Role.MENU, goog.a11y.aria.Role.MENUBAR, goog.a11y.aria.Role.RADIOGROUP, goog.a11y.aria.Role.ROW, goog.a11y.aria.Role.ROWGROUP, goog.a11y.aria.Role.TAB_LIST, goog.a11y.aria.Role.TEXTBOX, goog.a11y.aria.Role.TOOLBAR, goog.a11y.aria.Role.TREE, goog.a11y.aria.Role.TREEGRID];
goog.a11y.aria.setRole = function(a, b) {
    b ? (goog.asserts.ENABLE_ASSERTS && goog.asserts.assert(goog.object.containsValue(goog.a11y.aria.Role, b), "No such ARIA role " + b), a.setAttribute(goog.a11y.aria.ROLE_ATTRIBUTE_, b)) : goog.a11y.aria.removeRole(a)
};
goog.a11y.aria.getRole = function(a) {
    return a.getAttribute(goog.a11y.aria.ROLE_ATTRIBUTE_) || null
};
goog.a11y.aria.removeRole = function(a) {
    a.removeAttribute(goog.a11y.aria.ROLE_ATTRIBUTE_)
};
goog.a11y.aria.setState = function(a, b, c) {
    goog.isArray(c) && (c = c.join(" "));
    var d = goog.a11y.aria.getAriaAttributeName_(b);
    "" === c || void 0 == c ? (c = goog.a11y.aria.datatables.getDefaultValuesMap(), b in c ? a.setAttribute(d, c[b]) : a.removeAttribute(d)) : a.setAttribute(d, c)
};
goog.a11y.aria.toggleState = function(a, b) {
    var c = goog.a11y.aria.getState(a, b);
    goog.string.isEmptyOrWhitespace(goog.string.makeSafe(c)) || "true" == c || "false" == c ? goog.a11y.aria.setState(a, b, "true" == c ? "false" : "true") : goog.a11y.aria.removeState(a, b)
};
goog.a11y.aria.removeState = function(a, b) {
    a.removeAttribute(goog.a11y.aria.getAriaAttributeName_(b))
};
goog.a11y.aria.getState = function(a, b) {
    var c = a.getAttribute(goog.a11y.aria.getAriaAttributeName_(b));
    return null == c || void 0 == c ? "" : String(c)
};
goog.a11y.aria.getActiveDescendant = function(a) {
    var b = goog.a11y.aria.getState(a, goog.a11y.aria.State.ACTIVEDESCENDANT);
    return goog.dom.getOwnerDocument(a).getElementById(b)
};
goog.a11y.aria.setActiveDescendant = function(a, b) {
    var c = "";
    b && (c = b.id, goog.asserts.assert(c, "The active element should have an id."));
    goog.a11y.aria.setState(a, goog.a11y.aria.State.ACTIVEDESCENDANT, c)
};
goog.a11y.aria.getLabel = function(a) {
    return goog.a11y.aria.getState(a, goog.a11y.aria.State.LABEL)
};
goog.a11y.aria.setLabel = function(a, b) {
    goog.a11y.aria.setState(a, goog.a11y.aria.State.LABEL, b)
};
goog.a11y.aria.assertRoleIsSetInternalUtil = function(a, b) {
    if (!goog.array.contains(goog.a11y.aria.TAGS_WITH_ASSUMED_ROLES_, a.tagName)) {
        var c = goog.a11y.aria.getRole(a);
        goog.asserts.assert(null != c, "The element ARIA role cannot be null.");
        goog.asserts.assert(goog.array.contains(b, c), 'Non existing or incorrect role set for element.The role set is "' + c + '". The role should be any of "' + b + '". Check the ARIA specification for more details http://www.w3.org/TR/wai-aria/roles.')
    }
};
goog.a11y.aria.getStateBoolean = function(a, b) {
    var c = a.getAttribute(goog.a11y.aria.getAriaAttributeName_(b));
    goog.asserts.assert(goog.isBoolean(c) || null == c || "true" == c || "false" == c);
    return null == c ? c : goog.isBoolean(c) ? c : "true" == c
};
goog.a11y.aria.getStateNumber = function(a, b) {
    var c = a.getAttribute(goog.a11y.aria.getAriaAttributeName_(b));
    goog.asserts.assert((null == c || !isNaN(Number(c))) && !goog.isBoolean(c));
    return null == c ? null : Number(c)
};
goog.a11y.aria.getStateString = function(a, b) {
    var c = a.getAttribute(goog.a11y.aria.getAriaAttributeName_(b));
    goog.asserts.assert((null == c || goog.isString(c)) && ("" == c || isNaN(Number(c))) && "true" != c && "false" != c);
    return null == c || "" == c ? null : c
};
goog.a11y.aria.getStringArrayStateInternalUtil = function(a, b) {
    var c = a.getAttribute(goog.a11y.aria.getAriaAttributeName_(b));
    return goog.a11y.aria.splitStringOnWhitespace_(c)
};
goog.a11y.aria.hasState = function(a, b) {
    return a.hasAttribute(goog.a11y.aria.getAriaAttributeName_(b))
};
goog.a11y.aria.isContainerRole = function(a) {
    a = goog.a11y.aria.getRole(a);
    return goog.array.contains(goog.a11y.aria.CONTAINER_ROLES_, a)
};
goog.a11y.aria.splitStringOnWhitespace_ = function(a) {
    return a ? a.split(/\s+/) : []
};
goog.a11y.aria.getAriaAttributeName_ = function(a) {
    goog.asserts.ENABLE_ASSERTS && (goog.asserts.assert(a, "ARIA attribute cannot be empty."), goog.asserts.assert(goog.object.containsValue(goog.a11y.aria.State, a), "No such ARIA attribute " + a));
    return goog.a11y.aria.ARIA_PREFIX_ + a
};
goog.dom.classlist = {};
goog.dom.classlist.ALWAYS_USE_DOM_TOKEN_LIST = !1;
goog.dom.classlist.get = function(a) {
    if (goog.dom.classlist.ALWAYS_USE_DOM_TOKEN_LIST || a.classList) return a.classList;
    a = a.className;
    return goog.isString(a) && a.match(/\S+/g) || []
};
goog.dom.classlist.set = function(a, b) {
    a.className = b
};
goog.dom.classlist.contains = function(a, b) {
    return goog.dom.classlist.ALWAYS_USE_DOM_TOKEN_LIST || a.classList ? a.classList.contains(b) : goog.array.contains(goog.dom.classlist.get(a), b)
};
goog.dom.classlist.add = function(a, b) {
    goog.dom.classlist.ALWAYS_USE_DOM_TOKEN_LIST || a.classList ? a.classList.add(b) : goog.dom.classlist.contains(a, b) || (a.className += 0 < a.className.length ? " " + b : b)
};
goog.dom.classlist.addAll = function(a, b) {
    if (goog.dom.classlist.ALWAYS_USE_DOM_TOKEN_LIST || a.classList) goog.array.forEach(b, function(b) {
        goog.dom.classlist.add(a, b)
    });
    else {
        var c = {};
        goog.array.forEach(goog.dom.classlist.get(a), function(a) {
            c[a] = !0
        });
        goog.array.forEach(b, function(a) {
            c[a] = !0
        });
        a.className = "";
        for (var d in c) a.className += 0 < a.className.length ? " " + d : d
    }
};
goog.dom.classlist.remove = function(a, b) {
    goog.dom.classlist.ALWAYS_USE_DOM_TOKEN_LIST || a.classList ? a.classList.remove(b) : goog.dom.classlist.contains(a, b) && (a.className = goog.array.filter(goog.dom.classlist.get(a), function(a) {
        return a != b
    }).join(" "))
};
goog.dom.classlist.removeAll = function(a, b) {
    goog.dom.classlist.ALWAYS_USE_DOM_TOKEN_LIST || a.classList ? goog.array.forEach(b, function(b) {
        goog.dom.classlist.remove(a, b)
    }) : a.className = goog.array.filter(goog.dom.classlist.get(a), function(a) {
        return !goog.array.contains(b, a)
    }).join(" ")
};
goog.dom.classlist.enable = function(a, b, c) {
    c ? goog.dom.classlist.add(a, b) : goog.dom.classlist.remove(a, b)
};
goog.dom.classlist.enableAll = function(a, b, c) {
    (c ? goog.dom.classlist.addAll : goog.dom.classlist.removeAll)(a, b)
};
goog.dom.classlist.swap = function(a, b, c) {
    return goog.dom.classlist.contains(a, b) ? (goog.dom.classlist.remove(a, b), goog.dom.classlist.add(a, c), !0) : !1
};
goog.dom.classlist.toggle = function(a, b) {
    var c = !goog.dom.classlist.contains(a, b);
    goog.dom.classlist.enable(a, b, c);
    return c
};
goog.dom.classlist.addRemove = function(a, b, c) {
    goog.dom.classlist.remove(a, b);
    goog.dom.classlist.add(a, c)
};
goog.ui.Zippy = function(a, b, c, d, e) {
    function f(a) {
        a && (a.tabIndex = 0, goog.a11y.aria.setRole(a, g.getAriaRole()), goog.dom.classlist.add(a, "goog-zippy-header"), g.enableMouseEventsHandling_(a), g.enableKeyboardEventsHandling_(a))
    }
    goog.events.EventTarget.call(this);
    this.dom_ = e || goog.dom.getDomHelper();
    this.elHeader_ = this.dom_.getElement(a) || null;
    this.elExpandedHeader_ = this.dom_.getElement(d || null);
    this.elContent_ = (this.lazyCreateFunc_ = goog.isFunction(b) ? b : null) || !b ? null : this.dom_.getElement(b);
    this.expanded_ =
        1 == c;
    goog.isDef(c) || this.lazyCreateFunc_ || (this.elExpandedHeader_ ? this.expanded_ = goog.style.isElementShown(this.elExpandedHeader_) : this.elHeader_ && (this.expanded_ = goog.dom.classlist.contains(this.elHeader_, "goog-zippy-expanded")));
    this.keyboardEventHandler_ = new goog.events.EventHandler(this);
    this.mouseEventHandler_ = new goog.events.EventHandler(this);
    var g = this;
    f(this.elHeader_);
    f(this.elExpandedHeader_);
    this.setExpanded(this.expanded_)
};
goog.inherits(goog.ui.Zippy, goog.events.EventTarget);
goog.tagUnsealableClass(goog.ui.Zippy);
goog.ui.Zippy.Events = {
    ACTION: "action",
    TOGGLE: "toggle"
};
goog.ui.Zippy.prototype.handleMouseEvents_ = !0;
goog.ui.Zippy.prototype.handleKeyEvents_ = !0;
goog.ui.Zippy.prototype.disposeInternal = function() {
    goog.ui.Zippy.superClass_.disposeInternal.call(this);
    goog.dispose(this.keyboardEventHandler_);
    goog.dispose(this.mouseEventHandler_)
};
goog.ui.Zippy.prototype.getAriaRole = function() {
    return goog.a11y.aria.Role.TAB
};
goog.ui.Zippy.prototype.getContentElement = function() {
    return this.elContent_
};
goog.ui.Zippy.prototype.getVisibleHeaderElement = function() {
    var a = this.elExpandedHeader_;
    return a && goog.style.isElementShown(a) ? a : this.elHeader_
};
goog.ui.Zippy.prototype.expand = function() {
    this.setExpanded(!0)
};
goog.ui.Zippy.prototype.collapse = function() {
    this.setExpanded(!1)
};
goog.ui.Zippy.prototype.toggle = function() {
    this.setExpanded(!this.expanded_)
};
goog.ui.Zippy.prototype.setExpanded = function(a) {
    this.elContent_ ? goog.style.setElementShown(this.elContent_, a) : a && this.lazyCreateFunc_ && (this.elContent_ = this.lazyCreateFunc_());
    this.elContent_ && goog.dom.classlist.add(this.elContent_, "goog-zippy-content");
    this.elExpandedHeader_ ? (goog.style.setElementShown(this.elHeader_, !a), goog.style.setElementShown(this.elExpandedHeader_, a)) : this.updateHeaderClassName(a);
    this.setExpandedInternal(a);
    this.dispatchEvent(new goog.ui.ZippyEvent(goog.ui.Zippy.Events.TOGGLE,
        this, this.expanded_))
};
goog.ui.Zippy.prototype.setExpandedInternal = function(a) {
    this.expanded_ = a
};
goog.ui.Zippy.prototype.isExpanded = function() {
    return this.expanded_
};
goog.ui.Zippy.prototype.updateHeaderClassName = function(a) {
    this.elHeader_ && (goog.dom.classlist.enable(this.elHeader_, "goog-zippy-expanded", a), goog.dom.classlist.enable(this.elHeader_, "goog-zippy-collapsed", !a), goog.a11y.aria.setState(this.elHeader_, goog.a11y.aria.State.EXPANDED, a))
};
goog.ui.Zippy.prototype.isHandleKeyEvents = function() {
    return this.handleKeyEvents_
};
goog.ui.Zippy.prototype.isHandleMouseEvents = function() {
    return this.handleMouseEvents_
};
goog.ui.Zippy.prototype.setHandleKeyboardEvents = function(a) {
    this.handleKeyEvents_ != a && ((this.handleKeyEvents_ = a) ? (this.enableKeyboardEventsHandling_(this.elHeader_), this.enableKeyboardEventsHandling_(this.elExpandedHeader_)) : this.keyboardEventHandler_.removeAll())
};
goog.ui.Zippy.prototype.setHandleMouseEvents = function(a) {
    this.handleMouseEvents_ != a && ((this.handleMouseEvents_ = a) ? (this.enableMouseEventsHandling_(this.elHeader_), this.enableMouseEventsHandling_(this.elExpandedHeader_)) : this.mouseEventHandler_.removeAll())
};
goog.ui.Zippy.prototype.enableKeyboardEventsHandling_ = function(a) {
    a && this.keyboardEventHandler_.listen(a, goog.events.EventType.KEYDOWN, this.onHeaderKeyDown_)
};
goog.ui.Zippy.prototype.enableMouseEventsHandling_ = function(a) {
    a && this.mouseEventHandler_.listen(a, goog.events.EventType.CLICK, this.onHeaderClick_)
};
goog.ui.Zippy.prototype.onHeaderKeyDown_ = function(a) {
    if (a.keyCode == goog.events.KeyCodes.ENTER || a.keyCode == goog.events.KeyCodes.SPACE) this.toggle(), this.dispatchActionEvent_(), a.preventDefault(), a.stopPropagation()
};
goog.ui.Zippy.prototype.onHeaderClick_ = function(a) {
    this.toggle();
    this.dispatchActionEvent_()
};
goog.ui.Zippy.prototype.dispatchActionEvent_ = function() {
    this.dispatchEvent(new goog.events.Event(goog.ui.Zippy.Events.ACTION, this))
};
goog.ui.ZippyEvent = function(a, b, c) {
    goog.events.Event.call(this, a, b);
    this.expanded = c
};
goog.inherits(goog.ui.ZippyEvent, goog.events.Event);
goog.fx.easing = {};
goog.fx.easing.easeIn = function(a) {
    return goog.fx.easing.easeInInternal_(a, 3)
};
goog.fx.easing.easeInInternal_ = function(a, b) {
    return Math.pow(a, b)
};
goog.fx.easing.easeOut = function(a) {
    return goog.fx.easing.easeOutInternal_(a, 3)
};
goog.fx.easing.easeOutInternal_ = function(a, b) {
    return 1 - goog.fx.easing.easeInInternal_(1 - a, b)
};
goog.fx.easing.easeOutLong = function(a) {
    return goog.fx.easing.easeOutInternal_(a, 4)
};
goog.fx.easing.inAndOut = function(a) {
    return 3 * a * a - 2 * a * a * a
};
goog.fx.TransitionBase = function() {
    goog.events.EventTarget.call(this);
    this.state_ = goog.fx.TransitionBase.State.STOPPED;
    this.endTime = this.startTime = null
};
goog.inherits(goog.fx.TransitionBase, goog.events.EventTarget);
goog.fx.TransitionBase.State = {
    STOPPED: 0,
    PAUSED: -1,
    PLAYING: 1
};
goog.fx.TransitionBase.prototype.getStateInternal = function() {
    return this.state_
};
goog.fx.TransitionBase.prototype.setStatePlaying = function() {
    this.state_ = goog.fx.TransitionBase.State.PLAYING
};
goog.fx.TransitionBase.prototype.setStatePaused = function() {
    this.state_ = goog.fx.TransitionBase.State.PAUSED
};
goog.fx.TransitionBase.prototype.setStateStopped = function() {
    this.state_ = goog.fx.TransitionBase.State.STOPPED
};
goog.fx.TransitionBase.prototype.isPlaying = function() {
    return this.state_ == goog.fx.TransitionBase.State.PLAYING
};
goog.fx.TransitionBase.prototype.isPaused = function() {
    return this.state_ == goog.fx.TransitionBase.State.PAUSED
};
goog.fx.TransitionBase.prototype.isStopped = function() {
    return this.state_ == goog.fx.TransitionBase.State.STOPPED
};
goog.fx.TransitionBase.prototype.onBegin = function() {
    this.dispatchAnimationEvent(goog.fx.Transition.EventType.BEGIN)
};
goog.fx.TransitionBase.prototype.onEnd = function() {
    this.dispatchAnimationEvent(goog.fx.Transition.EventType.END)
};
goog.fx.TransitionBase.prototype.onFinish = function() {
    this.dispatchAnimationEvent(goog.fx.Transition.EventType.FINISH)
};
goog.fx.TransitionBase.prototype.onPause = function() {
    this.dispatchAnimationEvent(goog.fx.Transition.EventType.PAUSE)
};
goog.fx.TransitionBase.prototype.onPlay = function() {
    this.dispatchAnimationEvent(goog.fx.Transition.EventType.PLAY)
};
goog.fx.TransitionBase.prototype.onResume = function() {
    this.dispatchAnimationEvent(goog.fx.Transition.EventType.RESUME)
};
goog.fx.TransitionBase.prototype.onStop = function() {
    this.dispatchAnimationEvent(goog.fx.Transition.EventType.STOP)
};
goog.fx.TransitionBase.prototype.dispatchAnimationEvent = function(a) {
    this.dispatchEvent(a)
};
goog.async.AnimationDelay = function(a, b, c) {
    goog.Disposable.call(this);
    this.id_ = null;
    this.usingListeners_ = !1;
    this.listener_ = a;
    this.handler_ = c;
    this.win_ = b || window;
    this.callback_ = goog.bind(this.doAction_, this)
};
goog.inherits(goog.async.AnimationDelay, goog.Disposable);
goog.async.AnimationDelay.TIMEOUT = 20;
goog.async.AnimationDelay.MOZ_BEFORE_PAINT_EVENT_ = "MozBeforePaint";
goog.async.AnimationDelay.prototype.start = function() {
    this.stop();
    this.usingListeners_ = !1;
    var a = this.getRaf_(),
        b = this.getCancelRaf_();
    a && !b && this.win_.mozRequestAnimationFrame ? (this.id_ = goog.events.listen(this.win_, goog.async.AnimationDelay.MOZ_BEFORE_PAINT_EVENT_, this.callback_), this.win_.mozRequestAnimationFrame(null), this.usingListeners_ = !0) : this.id_ = a && b ? a.call(this.win_, this.callback_) : this.win_.setTimeout(goog.functions.lock(this.callback_), goog.async.AnimationDelay.TIMEOUT)
};
goog.async.AnimationDelay.prototype.stop = function() {
    if (this.isActive()) {
        var a = this.getRaf_(),
            b = this.getCancelRaf_();
        a && !b && this.win_.mozRequestAnimationFrame ? goog.events.unlistenByKey(this.id_) : a && b ? b.call(this.win_, this.id_) : this.win_.clearTimeout(this.id_)
    }
    this.id_ = null
};
goog.async.AnimationDelay.prototype.fire = function() {
    this.stop();
    this.doAction_()
};
goog.async.AnimationDelay.prototype.fireIfActive = function() {
    this.isActive() && this.fire()
};
goog.async.AnimationDelay.prototype.isActive = function() {
    return null != this.id_
};
goog.async.AnimationDelay.prototype.doAction_ = function() {
    this.usingListeners_ && this.id_ && goog.events.unlistenByKey(this.id_);
    this.id_ = null;
    this.listener_.call(this.handler_, goog.now())
};
goog.async.AnimationDelay.prototype.disposeInternal = function() {
    this.stop();
    goog.async.AnimationDelay.superClass_.disposeInternal.call(this)
};
goog.async.AnimationDelay.prototype.getRaf_ = function() {
    var a = this.win_;
    return a.requestAnimationFrame || a.webkitRequestAnimationFrame || a.mozRequestAnimationFrame || a.oRequestAnimationFrame || a.msRequestAnimationFrame || null
};
goog.async.AnimationDelay.prototype.getCancelRaf_ = function() {
    var a = this.win_;
    return a.cancelAnimationFrame || a.cancelRequestAnimationFrame || a.webkitCancelRequestAnimationFrame || a.mozCancelRequestAnimationFrame || a.oCancelRequestAnimationFrame || a.msCancelRequestAnimationFrame || null
};
goog.async.Delay = function(a, b, c) {
    goog.Disposable.call(this);
    this.listener_ = a;
    this.interval_ = b || 0;
    this.handler_ = c;
    this.callback_ = goog.bind(this.doAction_, this)
};
goog.inherits(goog.async.Delay, goog.Disposable);
goog.Delay = goog.async.Delay;
goog.async.Delay.prototype.id_ = 0;
goog.async.Delay.prototype.disposeInternal = function() {
    goog.async.Delay.superClass_.disposeInternal.call(this);
    this.stop();
    delete this.listener_;
    delete this.handler_
};
goog.async.Delay.prototype.start = function(a) {
    this.stop();
    this.id_ = goog.Timer.callOnce(this.callback_, goog.isDef(a) ? a : this.interval_)
};
goog.async.Delay.prototype.startIfNotActive = function(a) {
    this.isActive() || this.start(a)
};
goog.async.Delay.prototype.stop = function() {
    this.isActive() && goog.Timer.clear(this.id_);
    this.id_ = 0
};
goog.async.Delay.prototype.fire = function() {
    this.stop();
    this.doAction_()
};
goog.async.Delay.prototype.fireIfActive = function() {
    this.isActive() && this.fire()
};
goog.async.Delay.prototype.isActive = function() {
    return 0 != this.id_
};
goog.async.Delay.prototype.doAction_ = function() {
    this.id_ = 0;
    this.listener_ && this.listener_.call(this.handler_)
};
goog.fx.anim = {};
goog.fx.anim.Animated = function() {};
goog.fx.anim.TIMEOUT = goog.async.AnimationDelay.TIMEOUT;
goog.fx.anim.activeAnimations_ = {};
goog.fx.anim.animationWindow_ = null;
goog.fx.anim.animationDelay_ = null;
goog.fx.anim.registerAnimation = function(a) {
    var b = goog.getUid(a);
    b in goog.fx.anim.activeAnimations_ || (goog.fx.anim.activeAnimations_[b] = a);
    goog.fx.anim.requestAnimationFrame_()
};
goog.fx.anim.unregisterAnimation = function(a) {
    a = goog.getUid(a);
    delete goog.fx.anim.activeAnimations_[a];
    goog.object.isEmpty(goog.fx.anim.activeAnimations_) && goog.fx.anim.cancelAnimationFrame_()
};
goog.fx.anim.tearDown = function() {
    goog.fx.anim.animationWindow_ = null;
    goog.dispose(goog.fx.anim.animationDelay_);
    goog.fx.anim.animationDelay_ = null;
    goog.fx.anim.activeAnimations_ = {}
};
goog.fx.anim.setAnimationWindow = function(a) {
    var b = goog.fx.anim.animationDelay_ && goog.fx.anim.animationDelay_.isActive();
    goog.dispose(goog.fx.anim.animationDelay_);
    goog.fx.anim.animationDelay_ = null;
    goog.fx.anim.animationWindow_ = a;
    b && goog.fx.anim.requestAnimationFrame_()
};
goog.fx.anim.requestAnimationFrame_ = function() {
    goog.fx.anim.animationDelay_ || (goog.fx.anim.animationDelay_ = goog.fx.anim.animationWindow_ ? new goog.async.AnimationDelay(function(a) {
        goog.fx.anim.cycleAnimations_(a)
    }, goog.fx.anim.animationWindow_) : new goog.async.Delay(function() {
        goog.fx.anim.cycleAnimations_(goog.now())
    }, goog.async.AnimationDelay.TIMEOUT));
    var a = goog.fx.anim.animationDelay_;
    a.isActive() || a.start()
};
goog.fx.anim.cancelAnimationFrame_ = function() {
    goog.fx.anim.animationDelay_ && goog.fx.anim.animationDelay_.stop()
};
goog.fx.anim.cycleAnimations_ = function(a) {
    goog.object.forEach(goog.fx.anim.activeAnimations_, function(b) {
        b.onAnimationFrame(a)
    });
    goog.object.isEmpty(goog.fx.anim.activeAnimations_) || goog.fx.anim.requestAnimationFrame_()
};
goog.fx.Animation = function(a, b, c, d) {
    goog.fx.TransitionBase.call(this);
    if (!goog.isArray(a) || !goog.isArray(b)) throw Error("Start and end parameters must be arrays");
    if (a.length != b.length) throw Error("Start and end points must be the same length");
    this.startPoint = a;
    this.endPoint = b;
    this.duration = c;
    this.accel_ = d;
    this.coords = [];
    this.useRightPositioningForRtl_ = !1;
    this.progress = this.fps_ = 0;
    this.lastFrame = null
};
goog.inherits(goog.fx.Animation, goog.fx.TransitionBase);
goog.fx.Animation.prototype.enableRightPositioningForRtl = function(a) {
    this.useRightPositioningForRtl_ = a
};
goog.fx.Animation.prototype.isRightPositioningForRtlEnabled = function() {
    return this.useRightPositioningForRtl_
};
goog.fx.Animation.EventType = {
    PLAY: goog.fx.Transition.EventType.PLAY,
    BEGIN: goog.fx.Transition.EventType.BEGIN,
    RESUME: goog.fx.Transition.EventType.RESUME,
    END: goog.fx.Transition.EventType.END,
    STOP: goog.fx.Transition.EventType.STOP,
    FINISH: goog.fx.Transition.EventType.FINISH,
    PAUSE: goog.fx.Transition.EventType.PAUSE,
    ANIMATE: "animate",
    DESTROY: "destroy"
};
goog.fx.Animation.TIMEOUT = goog.async.AnimationDelay.TIMEOUT;
goog.fx.Animation.State = goog.fx.TransitionBase.State;
goog.fx.Animation.setAnimationWindow = function(a) {
    goog.fx.anim.setAnimationWindow(a)
};
goog.fx.Animation.prototype.play = function(a) {
    if (a || this.isStopped()) this.progress = 0, this.coords = this.startPoint;
    else if (this.isPlaying()) return !1;
    goog.fx.anim.unregisterAnimation(this);
    this.startTime = a = goog.now();
    this.isPaused() && (this.startTime -= this.duration * this.progress);
    this.endTime = this.startTime + this.duration;
    this.lastFrame = this.startTime;
    if (!this.progress) this.onBegin();
    this.onPlay();
    if (this.isPaused()) this.onResume();
    this.setStatePlaying();
    goog.fx.anim.registerAnimation(this);
    this.cycle(a);
    return !0
};
goog.fx.Animation.prototype.stop = function(a) {
    goog.fx.anim.unregisterAnimation(this);
    this.setStateStopped();
    a && (this.progress = 1);
    this.updateCoords_(this.progress);
    this.onStop();
    this.onEnd()
};
goog.fx.Animation.prototype.pause = function() {
    this.isPlaying() && (goog.fx.anim.unregisterAnimation(this), this.setStatePaused(), this.onPause())
};
goog.fx.Animation.prototype.getProgress = function() {
    return this.progress
};
goog.fx.Animation.prototype.setProgress = function(a) {
    this.progress = a;
    this.isPlaying() && (this.startTime = goog.now() - this.duration * this.progress, this.endTime = this.startTime + this.duration)
};
goog.fx.Animation.prototype.disposeInternal = function() {
    this.isStopped() || this.stop(!1);
    this.onDestroy();
    goog.fx.Animation.superClass_.disposeInternal.call(this)
};
goog.fx.Animation.prototype.destroy = function() {
    this.dispose()
};
goog.fx.Animation.prototype.onAnimationFrame = function(a) {
    this.cycle(a)
};
goog.fx.Animation.prototype.cycle = function(a) {
    this.progress = (a - this.startTime) / (this.endTime - this.startTime);
    1 <= this.progress && (this.progress = 1);
    this.fps_ = 1E3 / (a - this.lastFrame);
    this.lastFrame = a;
    this.updateCoords_(this.progress);
    if (1 == this.progress) this.setStateStopped(), goog.fx.anim.unregisterAnimation(this), this.onFinish(), this.onEnd();
    else if (this.isPlaying()) this.onAnimate()
};
goog.fx.Animation.prototype.updateCoords_ = function(a) {
    goog.isFunction(this.accel_) && (a = this.accel_(a));
    this.coords = Array(this.startPoint.length);
    for (var b = 0; b < this.startPoint.length; b++) this.coords[b] = (this.endPoint[b] - this.startPoint[b]) * a + this.startPoint[b]
};
goog.fx.Animation.prototype.onAnimate = function() {
    this.dispatchAnimationEvent(goog.fx.Animation.EventType.ANIMATE)
};
goog.fx.Animation.prototype.onDestroy = function() {
    this.dispatchAnimationEvent(goog.fx.Animation.EventType.DESTROY)
};
goog.fx.Animation.prototype.dispatchAnimationEvent = function(a) {
    this.dispatchEvent(new goog.fx.AnimationEvent(a, this))
};
goog.fx.AnimationEvent = function(a, b) {
    goog.events.Event.call(this, a);
    this.coords = b.coords;
    this.x = b.coords[0];
    this.y = b.coords[1];
    this.z = b.coords[2];
    this.duration = b.duration;
    this.progress = b.getProgress();
    this.fps = b.fps_;
    this.state = b.getStateInternal();
    this.anim = b
};
goog.inherits(goog.fx.AnimationEvent, goog.events.Event);
goog.fx.AnimationEvent.prototype.coordsAsInts = function() {
    return goog.array.map(this.coords, Math.round)
};
goog.ui.AnimatedZippy = function(a, b, c, d) {
    d = d || goog.dom.getDomHelper();
    var e = d.createDom(goog.dom.TagName.DIV, {
        style: "overflow:hidden"
    });
    b = d.getElement(b);
    b.parentNode.replaceChild(e, b);
    e.appendChild(b);
    this.elWrapper_ = e;
    this.anim_ = null;
    goog.ui.Zippy.call(this, a, b, c, void 0, d);
    a = this.isExpanded();
    this.elWrapper_.style.display = a ? "" : "none";
    this.updateHeaderClassName(a)
};
goog.inherits(goog.ui.AnimatedZippy, goog.ui.Zippy);
goog.tagUnsealableClass(goog.ui.AnimatedZippy);
goog.ui.AnimatedZippy.prototype.animationDuration = 500;
goog.ui.AnimatedZippy.prototype.animationAcceleration = goog.fx.easing.easeOut;
goog.ui.AnimatedZippy.prototype.isBusy = function() {
    return null != this.anim_
};
goog.ui.AnimatedZippy.prototype.setExpanded = function(a) {
    if (this.isExpanded() != a || this.anim_) {
        "none" == this.elWrapper_.style.display && (this.elWrapper_.style.display = "");
        var b = this.getContentElement().offsetHeight,
            c = 0;
        this.anim_ ? (a = this.isExpanded(), goog.events.removeAll(this.anim_), this.anim_.stop(!1), c = parseInt(this.getContentElement().style.marginTop, 10), c = b - Math.abs(c)) : c = a ? 0 : b;
        this.updateHeaderClassName(a);
        this.anim_ = new goog.fx.Animation([0, c], [0, a ? b : 0], this.animationDuration, this.animationAcceleration);
        goog.events.listen(this.anim_, [goog.fx.Transition.EventType.BEGIN, goog.fx.Animation.EventType.ANIMATE, goog.fx.Transition.EventType.END], this.onAnimate_, !1, this);
        goog.events.listen(this.anim_, goog.fx.Transition.EventType.END, goog.bind(this.onAnimationCompleted_, this, a));
        this.anim_.play(!1)
    }
};
goog.ui.AnimatedZippy.prototype.onAnimate_ = function(a) {
    var b = this.getContentElement();
    b.style.marginTop = a.y - b.offsetHeight + "px"
};
goog.ui.AnimatedZippy.prototype.onAnimationCompleted_ = function(a) {
    a && (this.getContentElement().style.marginTop = "0");
    goog.events.removeAll(this.anim_);
    this.setExpandedInternal(a);
    this.anim_ = null;
    a || (this.elWrapper_.style.display = "none");
    this.dispatchEvent(new goog.ui.ZippyEvent(goog.ui.Zippy.Events.TOGGLE, this, a))
};
goog.soy = {};
goog.soy.data = {};
goog.soy.data.SanitizedContentKind = {
    HTML: goog.DEBUG ? {
        sanitizedContentKindHtml: !0
    } : {},
    JS: goog.DEBUG ? {
        sanitizedContentJsChars: !0
    } : {},
    URI: goog.DEBUG ? {
        sanitizedContentUri: !0
    } : {},
    TRUSTED_RESOURCE_URI: goog.DEBUG ? {
        sanitizedContentTrustedResourceUri: !0
    } : {},
    ATTRIBUTES: goog.DEBUG ? {
        sanitizedContentHtmlAttribute: !0
    } : {},
    CSS: goog.DEBUG ? {
        sanitizedContentCss: !0
    } : {},
    TEXT: goog.DEBUG ? {
        sanitizedContentKindText: !0
    } : {}
};
goog.soy.data.SanitizedContent = function() {
    throw Error("Do not instantiate directly");
};
goog.soy.data.SanitizedContent.prototype.contentDir = null;
goog.soy.data.SanitizedContent.prototype.getContent = function() {
    return this.content
};
goog.soy.data.SanitizedContent.prototype.toString = function() {
    return this.content
};
goog.soy.data.SanitizedContent.prototype.toSafeHtml = function() {
    if (this.contentKind === goog.soy.data.SanitizedContentKind.TEXT) return goog.html.SafeHtml.htmlEscape(this.toString());
    if (this.contentKind !== goog.soy.data.SanitizedContentKind.HTML) throw Error("Sanitized content was not of kind TEXT or HTML.");
    return goog.html.uncheckedconversions.safeHtmlFromStringKnownToSatisfyTypeContract(goog.string.Const.from("Soy SanitizedContent of kind HTML produces SafeHtml-contract-compliant value."), this.toString(),
        this.contentDir)
};
goog.soy.data.UnsanitizedText = function() {
    goog.soy.data.SanitizedContent.call(this)
};
goog.inherits(goog.soy.data.UnsanitizedText, goog.soy.data.SanitizedContent);
goog.i18n.BidiFormatter = function(a, b) {
    this.contextDir_ = goog.i18n.bidi.toDir(a, !0);
    this.alwaysSpan_ = !!b
};
goog.i18n.BidiFormatter.prototype.getContextDir = function() {
    return this.contextDir_
};
goog.i18n.BidiFormatter.prototype.getAlwaysSpan = function() {
    return this.alwaysSpan_
};
goog.i18n.BidiFormatter.prototype.setContextDir = function(a) {
    this.contextDir_ = goog.i18n.bidi.toDir(a, !0)
};
goog.i18n.BidiFormatter.prototype.setAlwaysSpan = function(a) {
    this.alwaysSpan_ = a
};
goog.i18n.BidiFormatter.prototype.estimateDirection = goog.i18n.bidi.estimateDirection;
goog.i18n.BidiFormatter.prototype.areDirectionalitiesOpposite_ = function(a, b) {
    return 0 > a * b
};
goog.i18n.BidiFormatter.prototype.dirResetIfNeeded_ = function(a, b, c, d) {
    return d && (this.areDirectionalitiesOpposite_(b, this.contextDir_) || this.contextDir_ == goog.i18n.bidi.Dir.LTR && goog.i18n.bidi.endsWithRtl(a, c) || this.contextDir_ == goog.i18n.bidi.Dir.RTL && goog.i18n.bidi.endsWithLtr(a, c)) ? this.contextDir_ == goog.i18n.bidi.Dir.LTR ? goog.i18n.bidi.Format.LRM : goog.i18n.bidi.Format.RLM : ""
};
goog.i18n.BidiFormatter.prototype.dirAttrValue = function(a, b) {
    return this.knownDirAttrValue(this.estimateDirection(a, b))
};
goog.i18n.BidiFormatter.prototype.knownDirAttrValue = function(a) {
    return (a == goog.i18n.bidi.Dir.NEUTRAL ? this.contextDir_ : a) == goog.i18n.bidi.Dir.RTL ? "rtl" : "ltr"
};
goog.i18n.BidiFormatter.prototype.dirAttr = function(a, b) {
    return this.knownDirAttr(this.estimateDirection(a, b))
};
goog.i18n.BidiFormatter.prototype.knownDirAttr = function(a) {
    return a != this.contextDir_ ? a == goog.i18n.bidi.Dir.RTL ? 'dir="rtl"' : a == goog.i18n.bidi.Dir.LTR ? 'dir="ltr"' : "" : ""
};
goog.i18n.BidiFormatter.prototype.spanWrapSafeHtml = function(a, b) {
    return this.spanWrapSafeHtmlWithKnownDir(null, a, b)
};
goog.i18n.BidiFormatter.prototype.spanWrap = function(a, b, c) {
    return this.spanWrapWithKnownDir(null, a, b, c)
};
goog.i18n.BidiFormatter.prototype.spanWrapSafeHtmlWithKnownDir = function(a, b, c) {
    null == a && (a = this.estimateDirection(goog.html.SafeHtml.unwrap(b), !0));
    return this.spanWrapWithKnownDir_(a, b, c)
};
goog.i18n.BidiFormatter.prototype.spanWrapWithKnownDir = function(a, b, c, d) {
    b = c ? goog.html.legacyconversions.safeHtmlFromString(b) : goog.html.SafeHtml.htmlEscape(b);
    return goog.html.SafeHtml.unwrap(this.spanWrapSafeHtmlWithKnownDir(a, b, d))
};
goog.i18n.BidiFormatter.prototype.spanWrapWithKnownDir_ = function(a, b, c) {
    c = c || void 0 == c;
    var d;
    d = a != goog.i18n.bidi.Dir.NEUTRAL && a != this.contextDir_;
    if (this.alwaysSpan_ || d) {
        var e;
        d && (e = a == goog.i18n.bidi.Dir.RTL ? "rtl" : "ltr");
        d = goog.html.SafeHtml.create("span", {
            dir: e
        }, b)
    } else d = b;
    b = goog.html.SafeHtml.unwrap(b);
    return d = goog.html.SafeHtml.concatWithDir(goog.i18n.bidi.Dir.NEUTRAL, d, this.dirResetIfNeeded_(b, a, !0, c))
};
goog.i18n.BidiFormatter.prototype.unicodeWrap = function(a, b, c) {
    return this.unicodeWrapWithKnownDir(null, a, b, c)
};
goog.i18n.BidiFormatter.prototype.unicodeWrapWithKnownDir = function(a, b, c, d) {
    null == a && (a = this.estimateDirection(b, c));
    return this.unicodeWrapWithKnownDir_(a, b, c, d)
};
goog.i18n.BidiFormatter.prototype.unicodeWrapWithKnownDir_ = function(a, b, c, d) {
    d = d || void 0 == d;
    var e = [];
    a != goog.i18n.bidi.Dir.NEUTRAL && a != this.contextDir_ ? (e.push(a == goog.i18n.bidi.Dir.RTL ? goog.i18n.bidi.Format.RLE : goog.i18n.bidi.Format.LRE), e.push(b), e.push(goog.i18n.bidi.Format.PDF)) : e.push(b);
    e.push(this.dirResetIfNeeded_(b, a, c, d));
    return e.join("")
};
goog.i18n.BidiFormatter.prototype.markAfter = function(a, b) {
    return this.markAfterKnownDir(null, a, b)
};
goog.i18n.BidiFormatter.prototype.markAfterKnownDir = function(a, b, c) {
    null == a && (a = this.estimateDirection(b, c));
    return this.dirResetIfNeeded_(b, a, c, !0)
};
goog.i18n.BidiFormatter.prototype.mark = function() {
    switch (this.contextDir_) {
        case goog.i18n.bidi.Dir.LTR:
            return goog.i18n.bidi.Format.LRM;
        case goog.i18n.bidi.Dir.RTL:
            return goog.i18n.bidi.Format.RLM;
        default:
            return ""
    }
};
goog.i18n.BidiFormatter.prototype.startEdge = function() {
    return this.contextDir_ == goog.i18n.bidi.Dir.RTL ? goog.i18n.bidi.RIGHT : goog.i18n.bidi.LEFT
};
goog.i18n.BidiFormatter.prototype.endEdge = function() {
    return this.contextDir_ == goog.i18n.bidi.Dir.RTL ? goog.i18n.bidi.LEFT : goog.i18n.bidi.RIGHT
};
goog.soy.REQUIRE_STRICT_AUTOESCAPE = !1;
goog.soy.renderHtml = function(a, b) {
    a.innerHTML = goog.soy.ensureTemplateOutputHtml_(b)
};
goog.soy.renderElement = function(a, b, c, d) {
    goog.asserts.assert(b, "Soy template may not be null.");
    a.innerHTML = goog.soy.ensureTemplateOutputHtml_(b(c || goog.soy.defaultTemplateData_, void 0, d))
};
goog.soy.renderAsFragment = function(a, b, c, d) {
    goog.asserts.assert(a, "Soy template may not be null.");
    d = d || goog.dom.getDomHelper();
    a = goog.soy.ensureTemplateOutputHtml_(a(b || goog.soy.defaultTemplateData_, void 0, c));
    goog.soy.assertFirstTagValid_(a);
    return d.htmlToDocumentFragment(a)
};
goog.soy.renderAsElement = function(a, b, c, d) {
    goog.asserts.assert(a, "Soy template may not be null.");
    return goog.soy.convertToElement_(a(b || goog.soy.defaultTemplateData_, void 0, c), d)
};
goog.soy.convertToElement = function(a, b) {
    return goog.soy.convertToElement_(a, b)
};
goog.soy.convertToElement_ = function(a, b) {
    var c = (b || goog.dom.getDomHelper()).createElement(goog.dom.TagName.DIV),
        d = goog.soy.ensureTemplateOutputHtml_(a);
    goog.soy.assertFirstTagValid_(d);
    c.innerHTML = d;
    return 1 == c.childNodes.length && (d = c.firstChild, d.nodeType == goog.dom.NodeType.ELEMENT) ? d : c
};
goog.soy.ensureTemplateOutputHtml_ = function(a) {
    if (!goog.soy.REQUIRE_STRICT_AUTOESCAPE && !goog.isObject(a)) return String(a);
    if (a instanceof goog.soy.data.SanitizedContent) {
        var b = goog.soy.data.SanitizedContentKind;
        if (a.contentKind === b.HTML) return goog.asserts.assertString(a.getContent());
        if (a.contentKind === b.TEXT) return goog.string.htmlEscape(a.getContent())
    }
    goog.asserts.fail("Soy template output is unsafe for use as HTML: " + a);
    return "zSoyz"
};
goog.soy.assertFirstTagValid_ = function(a) {
    if (goog.asserts.ENABLE_ASSERTS) {
        var b = a.match(goog.soy.INVALID_TAG_TO_RENDER_);
        goog.asserts.assert(!b, "This template starts with a %s, which cannot be a child of a <div>, as required by soy internals. Consider using goog.soy.renderElement instead.\nTemplate output: %s", b && b[0], a)
    }
};
goog.soy.INVALID_TAG_TO_RENDER_ = /^<(body|caption|col|colgroup|head|html|tr|td|th|tbody|thead|tfoot)>/i;
goog.soy.defaultTemplateData_ = {};
goog.structs.InversionMap = function(a, b, c) {
    this.rangeArray = null;
    if (a.length != b.length) return null;
    this.storeInversion_(a, c);
    this.values = b
};
goog.structs.InversionMap.prototype.storeInversion_ = function(a, b) {
    this.rangeArray = a;
    for (var c = 1; c < a.length; c++) null == a[c] ? a[c] = a[c - 1] + 1 : b && (a[c] += a[c - 1])
};
goog.structs.InversionMap.prototype.spliceInversion = function(a, b, c) {
    a = new goog.structs.InversionMap(a, b, c);
    c = a.rangeArray[0];
    var d = goog.array.peek(a.rangeArray);
    b = this.getLeast(c);
    d = this.getLeast(d);
    c != this.rangeArray[b] && b++;
    c = d - b + 1;
    goog.partial(goog.array.splice, this.rangeArray, b, c).apply(null, a.rangeArray);
    goog.partial(goog.array.splice, this.values, b, c).apply(null, a.values)
};
goog.structs.InversionMap.prototype.at = function(a) {
    a = this.getLeast(a);
    return 0 > a ? null : this.values[a]
};
goog.structs.InversionMap.prototype.getLeast = function(a) {
    for (var b = this.rangeArray, c = 0, d = b.length; 8 < d - c;) {
        var e = d + c >> 1;
        b[e] <= a ? c = e : d = e
    }
    for (; c < d && !(a < b[c]); ++c);
    return c - 1
};
goog.i18n.GraphemeBreak = {};
goog.i18n.GraphemeBreak.property = {
    ANY: 0,
    CONTROL: 1,
    EXTEND: 2,
    PREPEND: 3,
    SPACING_MARK: 4,
    INDIC_CONSONANT: 5,
    VIRAMA: 6,
    L: 7,
    V: 8,
    T: 9,
    LV: 10,
    LVT: 11,
    CR: 12,
    LF: 13,
    REGIONAL_INDICATOR: 14
};
goog.i18n.GraphemeBreak.inversions_ = null;
goog.i18n.GraphemeBreak.applyLegacyBreakRules_ = function(a, b) {
    var c = goog.i18n.GraphemeBreak.property;
    return a == c.CR && b == c.LF ? !1 : a == c.CONTROL || a == c.CR || a == c.LF || b == c.CONTROL || b == c.CR || b == c.LF ? !0 : a == c.L && (b == c.L || b == c.V || b == c.LV || b == c.LVT) || !(a != c.LV && a != c.V || b != c.V && b != c.T) || (a == c.LVT || a == c.T) && b == c.T || b == c.EXTEND || b == c.VIRAMA || a == c.VIRAMA && b == c.INDIC_CONSONANT ? !1 : !0
};
goog.i18n.GraphemeBreak.getBreakProp_ = function(a) {
    if (44032 <= a && 55203 >= a) {
        var b = goog.i18n.GraphemeBreak.property;
        return 16 == a % 28 ? b.LV : b.LVT
    }
    goog.i18n.GraphemeBreak.inversions_ || (goog.i18n.GraphemeBreak.inversions_ = new goog.structs.InversionMap([0, 10, 1, 2, 1, 18, 95, 33, 13, 1, 594, 112, 275, 7, 263, 45, 1, 1, 1, 2, 1, 2, 1, 1, 56, 5, 11, 11, 48, 21, 16, 1, 101, 7, 1, 1, 6, 2, 2, 1, 4, 33, 1, 1, 1, 30, 27, 91, 11, 58, 9, 34, 4, 1, 9, 1, 3, 1, 5, 43, 3, 136, 31, 1, 17, 37, 1, 1, 1, 1, 3, 8, 4, 1, 2, 1, 7, 8, 2, 2, 21, 8, 1, 2, 17, 39, 1, 1, 1, 2, 6, 6, 1, 9, 5, 4, 2, 2, 12, 2, 15, 2, 1, 17, 39, 2, 3, 12,
        4, 8, 6, 17, 2, 3, 14, 1, 17, 39, 1, 1, 3, 8, 4, 1, 20, 2, 29, 1, 2, 17, 39, 1, 1, 2, 1, 6, 6, 9, 6, 4, 2, 2, 13, 1, 16, 1, 18, 41, 1, 1, 1, 12, 1, 9, 1, 41, 3, 17, 37, 4, 3, 5, 7, 8, 3, 2, 8, 2, 30, 2, 17, 39, 1, 1, 1, 1, 2, 1, 3, 1, 5, 1, 8, 9, 1, 3, 2, 30, 2, 17, 38, 3, 1, 2, 5, 7, 1, 9, 1, 10, 2, 30, 2, 22, 48, 5, 1, 2, 6, 7, 19, 2, 13, 46, 2, 1, 1, 1, 6, 1, 12, 8, 50, 46, 2, 1, 1, 1, 9, 11, 6, 14, 2, 58, 2, 27, 1, 1, 1, 1, 1, 4, 2, 49, 14, 1, 4, 1, 1, 2, 5, 48, 9, 1, 57, 33, 12, 4, 1, 6, 1, 2, 2, 2, 1, 16, 2, 4, 2, 2, 4, 3, 1, 3, 2, 7, 3, 4, 13, 1, 1, 1, 2, 6, 1, 1, 14, 1, 98, 96, 72, 88, 349, 3, 931, 15, 2, 1, 14, 15, 2, 1, 14, 15, 2, 15, 15, 14, 35, 17, 2, 1, 7, 8, 1, 2, 9, 1, 1, 9, 1, 45, 3, 155, 1, 87,
        31, 3, 4, 2, 9, 1, 6, 3, 20, 19, 29, 44, 9, 3, 2, 1, 69, 23, 2, 3, 4, 45, 6, 2, 1, 1, 1, 8, 1, 1, 1, 2, 8, 6, 13, 128, 4, 1, 14, 33, 1, 1, 5, 1, 1, 5, 1, 1, 1, 7, 31, 9, 12, 2, 1, 7, 23, 1, 4, 2, 2, 2, 2, 2, 11, 3, 2, 36, 2, 1, 1, 2, 3, 1, 1, 3, 2, 12, 36, 8, 8, 2, 2, 21, 3, 128, 3, 1, 13, 1, 7, 4, 1, 4, 2, 1, 203, 64, 523, 1, 2, 2, 24, 7, 49, 16, 96, 33, 3070, 3, 141, 1, 96, 32, 554, 6, 105, 2, 30164, 4, 1, 10, 33, 1, 80, 2, 272, 1, 3, 1, 4, 1, 23, 2, 2, 1, 24, 30, 4, 4, 3, 8, 1, 1, 13, 2, 16, 34, 16, 1, 27, 18, 24, 24, 4, 8, 2, 23, 11, 1, 1, 12, 32, 3, 1, 5, 3, 3, 36, 1, 2, 4, 2, 1, 3, 1, 69, 35, 6, 2, 2, 2, 2, 12, 1, 8, 1, 1, 18, 16, 1, 3, 6, 1, 5, 48, 1, 1, 3, 2, 2, 5, 2, 1, 1, 32, 9, 1, 2, 2, 5, 1,
        1, 201, 14, 2, 1, 1, 9, 8, 2, 1, 2, 1, 2, 1, 1, 1, 18, 11184, 27, 49, 1028, 1024, 6942, 1, 737, 16, 16, 7, 216, 1, 158, 2, 89, 3, 513, 1, 2051, 15, 40, 7, 1, 1472, 1, 1, 1, 53, 14, 1, 57, 2, 1, 45, 3, 4, 2, 1, 1, 2, 1, 66, 3, 36, 5, 1, 6, 2, 75, 2, 1, 48, 3, 9, 1, 1, 1258, 1, 1, 1, 2, 6, 1, 1, 22681, 62, 4, 25042, 1, 1, 3, 3, 1, 5, 8, 8, 2, 7, 30, 4, 148, 3, 8097, 26, 790017, 255
    ], [1, 13, 1, 12, 1, 0, 1, 0, 1, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 0, 1, 0, 2, 0, 2, 0, 2, 0, 2, 1, 0, 2, 0, 2, 0, 2, 0, 1, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 4, 0, 5, 2, 4, 2, 0, 4, 2, 4, 6, 4, 0, 2, 5, 0, 2, 0, 5, 2, 4, 0, 5, 2, 0, 2, 4, 2, 4, 6, 0, 2, 5, 0, 2, 0, 5, 0, 2, 4, 0, 5, 2, 4, 2, 6, 2,
        5, 0, 2, 0, 2, 4, 0, 5, 2, 0, 4, 2, 4, 6, 0, 2, 0, 2, 4, 0, 5, 2, 0, 2, 4, 2, 4, 6, 2, 5, 0, 2, 0, 5, 0, 2, 0, 5, 2, 4, 2, 4, 6, 0, 2, 0, 4, 0, 5, 0, 2, 4, 2, 6, 2, 5, 0, 2, 0, 4, 0, 5, 2, 0, 4, 2, 4, 2, 4, 2, 4, 2, 6, 2, 5, 0, 2, 0, 4, 0, 5, 0, 2, 4, 2, 4, 6, 0, 2, 0, 2, 0, 4, 0, 5, 6, 2, 4, 2, 4, 2, 4, 0, 5, 0, 2, 0, 4, 2, 6, 0, 2, 0, 5, 0, 2, 0, 4, 2, 0, 2, 0, 5, 0, 2, 0, 2, 0, 2, 0, 2, 0, 4, 5, 2, 4, 2, 6, 0, 2, 0, 2, 0, 2, 0, 5, 0, 2, 4, 2, 0, 6, 4, 2, 5, 0, 5, 0, 4, 2, 5, 2, 5, 0, 5, 0, 5, 2, 5, 2, 0, 4, 2, 0, 2, 5, 0, 2, 0, 7, 8, 9, 0, 2, 0, 5, 2, 6, 0, 5, 2, 6, 0, 5, 2, 0, 5, 2, 5, 0, 2, 4, 2, 4, 2, 4, 2, 6, 2, 0, 2, 0, 2, 0, 2, 0, 5, 2, 4, 2, 4, 2, 4, 2, 0, 5, 0, 5, 0, 4, 0, 4, 0, 5, 2, 4, 0, 5, 0, 5, 4, 2, 4, 2, 6, 0, 2, 0, 2, 4, 2,
        0, 2, 4, 0, 5, 2, 4, 2, 4, 2, 4, 2, 4, 6, 5, 0, 2, 0, 2, 4, 0, 5, 4, 2, 4, 2, 6, 4, 5, 0, 5, 0, 5, 0, 2, 4, 2, 4, 2, 4, 2, 6, 0, 5, 4, 2, 4, 2, 0, 5, 0, 2, 0, 2, 4, 2, 0, 2, 0, 4, 2, 0, 2, 0, 1, 2, 1, 0, 1, 0, 1, 0, 2, 0, 2, 0, 6, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 0, 6, 5, 2, 5, 4, 2, 4, 0, 5, 0, 5, 0, 5, 0, 5, 0, 4, 0, 5, 4, 6, 0, 2, 0, 5, 0, 2, 0, 5, 2, 4, 6, 0, 7, 2, 4, 0, 5, 0, 5, 2, 4, 2, 4, 2, 4, 6, 0, 5, 2, 4, 2, 4, 2, 0, 2, 0, 2, 4, 0, 5, 0, 5, 0, 5, 0, 5, 2, 0, 2, 0, 2, 0, 2, 0, 2, 0, 5, 4, 2, 4, 0, 4, 6, 0, 5, 0, 5, 0, 5, 0, 4, 2, 4, 2, 4, 0, 4, 6, 0, 11, 8, 9, 0, 2, 0, 2, 0, 2, 0, 2, 0, 1, 0, 2, 0, 1, 0, 2, 0, 2, 0, 2, 6, 0, 4, 2, 4, 0, 2, 6, 0, 2, 4, 0, 4, 2, 4, 6, 2, 0, 1, 0, 2, 0, 2, 4, 2, 6, 0, 2, 4, 0, 4, 2, 4,
        6, 0, 2, 4, 2, 4, 2, 6, 2, 0, 4, 2, 0, 2, 4, 2, 0, 4, 2, 1, 2, 0, 2, 0, 2, 0, 2, 0, 14, 0, 1, 2
    ], !0));
    return goog.i18n.GraphemeBreak.inversions_.at(a)
};
goog.i18n.GraphemeBreak.hasGraphemeBreak = function(a, b, c) {
    a = goog.i18n.GraphemeBreak.getBreakProp_(a);
    b = goog.i18n.GraphemeBreak.getBreakProp_(b);
    var d = goog.i18n.GraphemeBreak.property;
    return goog.i18n.GraphemeBreak.applyLegacyBreakRules_(a, b) && !(c && (a == d.PREPEND || b == d.SPACING_MARK))
};
goog.format = {};
goog.format.fileSize = function(a, b) {
    return goog.format.numBytesToString(a, b, !1)
};
goog.format.isConvertableScaledNumber = function(a) {
    return goog.format.SCALED_NUMERIC_RE_.test(a)
};
goog.format.stringToNumericValue = function(a) {
    return goog.string.endsWith(a, "B") ? goog.format.stringToNumericValue_(a, goog.format.NUMERIC_SCALES_BINARY_) : goog.format.stringToNumericValue_(a, goog.format.NUMERIC_SCALES_SI_)
};
goog.format.stringToNumBytes = function(a) {
    return goog.format.stringToNumericValue_(a, goog.format.NUMERIC_SCALES_BINARY_)
};
goog.format.numericValueToString = function(a, b) {
    return goog.format.numericValueToString_(a, goog.format.NUMERIC_SCALES_SI_, b)
};
goog.format.numBytesToString = function(a, b, c, d) {
    var e = "";
    if (!goog.isDef(c) || c) e = "B";
    return goog.format.numericValueToString_(a, goog.format.NUMERIC_SCALES_BINARY_, b, e, d)
};
goog.format.stringToNumericValue_ = function(a, b) {
    var c = a.match(goog.format.SCALED_NUMERIC_RE_);
    return c ? c[1] * b[c[2]] : NaN
};
goog.format.numericValueToString_ = function(a, b, c, d, e) {
    var f = goog.format.NUMERIC_SCALE_PREFIXES_,
        g = a,
        h = "",
        k = "",
        l = 1;
    0 > a && (a = -a);
    for (var m = 0; m < f.length; m++) {
        var n = f[m],
            l = b[n];
        if (a >= l || 1 >= l && a > .1 * l) {
            h = n;
            break
        }
    }
    h ? (d && (h += d), e && (k = " ")) : l = 1;
    a = Math.pow(10, goog.isDef(c) ? c : 2);
    return Math.round(g / l * a) / a + k + h
};
goog.format.SCALED_NUMERIC_RE_ = /^([-]?\d+\.?\d*)([K,M,G,T,P,k,m,u,n]?)[B]?$/;
goog.format.NUMERIC_SCALE_PREFIXES_ = "P T G M K  m u n".split(" ");
goog.format.NUMERIC_SCALES_SI_ = {
    "": 1,
    n: 1E-9,
    u: 1E-6,
    m: .001,
    k: 1E3,
    K: 1E3,
    M: 1E6,
    G: 1E9,
    T: 1E12,
    P: 1E15
};
goog.format.NUMERIC_SCALES_BINARY_ = {
    "": 1,
    n: Math.pow(1024, -3),
    u: Math.pow(1024, -2),
    m: 1 / 1024,
    k: 1024,
    K: 1024,
    M: Math.pow(1024, 2),
    G: Math.pow(1024, 3),
    T: Math.pow(1024, 4),
    P: Math.pow(1024, 5)
};
goog.format.FIRST_GRAPHEME_EXTEND_ = 768;
goog.format.isTreatedAsBreakingSpace_ = function(a) {
    return a <= goog.format.WbrToken_.SPACE || 4096 <= a && (8192 <= a && 8198 >= a || 8200 <= a && 8203 >= a || 5760 == a || 6158 == a || 8232 == a || 8233 == a || 8287 == a || 12288 == a)
};
goog.format.isInvisibleFormattingCharacter_ = function(a) {
    return 8204 <= a && 8207 >= a || 8234 <= a && 8238 >= a
};
goog.format.insertWordBreaksGeneric_ = function(a, b, c) {
    c = c || 10;
    if (c > a.length) return a;
    for (var d = [], e = 0, f = 0, g = 0, h = 0, k = 0; k < a.length; k++) {
        var l = h,
            h = a.charCodeAt(k),
            l = h >= goog.format.FIRST_GRAPHEME_EXTEND_ && !b(l, h, !0);
        e >= c && !goog.format.isTreatedAsBreakingSpace_(h) && !l && (d.push(a.substring(g, k), goog.format.WORD_BREAK_HTML), g = k, e = 0);
        f ? h == goog.format.WbrToken_.GT && f == goog.format.WbrToken_.LT ? f = 0 : h == goog.format.WbrToken_.SEMI_COLON && f == goog.format.WbrToken_.AMP && (f = 0, e++) : h == goog.format.WbrToken_.LT || h == goog.format.WbrToken_.AMP ?
            f = h : goog.format.isTreatedAsBreakingSpace_(h) ? e = 0 : goog.format.isInvisibleFormattingCharacter_(h) || e++
    }
    d.push(a.substr(g));
    return d.join("")
};
goog.format.insertWordBreaks = function(a, b) {
    return goog.format.insertWordBreaksGeneric_(a, goog.i18n.GraphemeBreak.hasGraphemeBreak, b)
};
goog.format.conservativelyHasGraphemeBreak_ = function(a, b, c) {
    return 1024 <= b && 1315 > b
};
goog.format.insertWordBreaksBasic = function(a, b) {
    return goog.format.insertWordBreaksGeneric_(a, goog.format.conservativelyHasGraphemeBreak_, b)
};
goog.format.IS_IE8_OR_ABOVE_ = goog.userAgent.IE && goog.userAgent.isVersionOrHigher(8);
goog.format.WORD_BREAK_HTML = goog.userAgent.WEBKIT ? "<wbr></wbr>" : goog.userAgent.OPERA ? "&shy;" : goog.format.IS_IE8_OR_ABOVE_ ? "&#8203;" : "<wbr>";
goog.format.WbrToken_ = {
    LT: 60,
    GT: 62,
    AMP: 38,
    SEMI_COLON: 59,
    SPACE: 32
};
var soy = {
        asserts: {},
        esc: {}
    },
    soydata = {
        SanitizedJsStrChars: {},
        VERY_UNSAFE: {}
    };
soy.StringBuilder = goog.string.StringBuffer;
soydata.SanitizedContentKind = goog.soy.data.SanitizedContentKind;
soydata.isContentKind = function(a, b) {
    return null != a && a.contentKind === b
};
soydata.getContentDir = function(a) {
    if (null != a) switch (a.contentDir) {
        case goog.i18n.bidi.Dir.LTR:
            return goog.i18n.bidi.Dir.LTR;
        case goog.i18n.bidi.Dir.RTL:
            return goog.i18n.bidi.Dir.RTL;
        case goog.i18n.bidi.Dir.NEUTRAL:
            return goog.i18n.bidi.Dir.NEUTRAL
    }
    return null
};
soydata.SanitizedHtml = function() {
    goog.soy.data.SanitizedContent.call(this)
};
goog.inherits(soydata.SanitizedHtml, goog.soy.data.SanitizedContent);
soydata.SanitizedHtml.prototype.contentKind = soydata.SanitizedContentKind.HTML;
soydata.SanitizedHtml.from = function(a) {
    return null != a && a.contentKind === soydata.SanitizedContentKind.HTML ? (goog.asserts.assert(a.constructor === soydata.SanitizedHtml), a) : a instanceof goog.html.SafeHtml ? soydata.VERY_UNSAFE.ordainSanitizedHtml(goog.html.SafeHtml.unwrap(a), a.getDirection()) : soydata.VERY_UNSAFE.ordainSanitizedHtml(soy.esc.$$escapeHtmlHelper(String(a)), soydata.getContentDir(a))
};
soydata.SanitizedJs = function() {
    goog.soy.data.SanitizedContent.call(this)
};
goog.inherits(soydata.SanitizedJs, goog.soy.data.SanitizedContent);
soydata.SanitizedJs.prototype.contentKind = soydata.SanitizedContentKind.JS;
soydata.SanitizedJs.prototype.contentDir = goog.i18n.bidi.Dir.LTR;
soydata.SanitizedUri = function() {
    goog.soy.data.SanitizedContent.call(this)
};
goog.inherits(soydata.SanitizedUri, goog.soy.data.SanitizedContent);
soydata.SanitizedUri.prototype.contentKind = soydata.SanitizedContentKind.URI;
soydata.SanitizedUri.prototype.contentDir = goog.i18n.bidi.Dir.LTR;
soydata.SanitizedHtmlAttribute = function() {
    goog.soy.data.SanitizedContent.call(this)
};
goog.inherits(soydata.SanitizedHtmlAttribute, goog.soy.data.SanitizedContent);
soydata.SanitizedHtmlAttribute.prototype.contentKind = soydata.SanitizedContentKind.ATTRIBUTES;
soydata.SanitizedHtmlAttribute.prototype.contentDir = goog.i18n.bidi.Dir.LTR;
soydata.SanitizedCss = function() {
    goog.soy.data.SanitizedContent.call(this)
};
goog.inherits(soydata.SanitizedCss, goog.soy.data.SanitizedContent);
soydata.SanitizedCss.prototype.contentKind = soydata.SanitizedContentKind.CSS;
soydata.SanitizedCss.prototype.contentDir = goog.i18n.bidi.Dir.LTR;
soydata.UnsanitizedText = function(a, b) {
    this.content = String(a);
    this.contentDir = null != b ? b : null
};
goog.inherits(soydata.UnsanitizedText, goog.soy.data.SanitizedContent);
soydata.UnsanitizedText.prototype.contentKind = soydata.SanitizedContentKind.TEXT;
soydata.$$EMPTY_STRING_ = {
    VALUE: ""
};
soydata.$$makeSanitizedContentFactory_ = function(a) {
    function b(a) {
        this.content = a
    }
    b.prototype = a.prototype;
    return function(a, d) {
        var e = new b(String(a));
        void 0 !== d && (e.contentDir = d);
        return e
    }
};
soydata.$$makeSanitizedContentFactoryWithDefaultDirOnly_ = function(a) {
    function b(a) {
        this.content = a
    }
    b.prototype = a.prototype;
    return function(a) {
        return new b(String(a))
    }
};
soydata.markUnsanitizedText = function(a, b) {
    return new soydata.UnsanitizedText(a, b)
};
soydata.VERY_UNSAFE.ordainSanitizedHtml = soydata.$$makeSanitizedContentFactory_(soydata.SanitizedHtml);
soydata.VERY_UNSAFE.ordainSanitizedJs = soydata.$$makeSanitizedContentFactoryWithDefaultDirOnly_(soydata.SanitizedJs);
soydata.VERY_UNSAFE.ordainSanitizedUri = soydata.$$makeSanitizedContentFactoryWithDefaultDirOnly_(soydata.SanitizedUri);
soydata.VERY_UNSAFE.ordainSanitizedHtmlAttribute = soydata.$$makeSanitizedContentFactoryWithDefaultDirOnly_(soydata.SanitizedHtmlAttribute);
soydata.VERY_UNSAFE.ordainSanitizedCss = soydata.$$makeSanitizedContentFactoryWithDefaultDirOnly_(soydata.SanitizedCss);
soy.renderElement = goog.soy.renderElement;
soy.renderAsFragment = function(a, b, c, d) {
    return goog.soy.renderAsFragment(a, b, d, new goog.dom.DomHelper(c))
};
soy.renderAsElement = function(a, b, c, d) {
    return goog.soy.renderAsElement(a, b, d, new goog.dom.DomHelper(c))
};
soy.$$IS_LOCALE_RTL = goog.i18n.bidi.IS_RTL;
soy.$$augmentMap = function(a, b) {
    function c() {}
    c.prototype = a;
    var d = new c,
        e;
    for (e in b) d[e] = b[e];
    return d
};
soy.$$checkMapKey = function(a) {
    if ("string" != typeof a) throw Error("Map literal's key expression must evaluate to string (encountered type \"" + typeof a + '").');
    return a
};
soy.$$getMapKeys = function(a) {
    var b = [],
        c;
    for (c in a) b.push(c);
    return b
};
soy.$$checkNotNull = function(a) {
    if (null == a) throw Error("unexpected null value");
    return a
};
soy.$$getDelTemplateId = function(a) {
    return a
};
soy.$$DELEGATE_REGISTRY_PRIORITIES_ = {};
soy.$$DELEGATE_REGISTRY_FUNCTIONS_ = {};
soy.$$registerDelegateFn = function(a, b, c, d) {
    var e = "key_" + a + ":" + b,
        f = soy.$$DELEGATE_REGISTRY_PRIORITIES_[e];
    if (void 0 === f || c > f) soy.$$DELEGATE_REGISTRY_PRIORITIES_[e] = c, soy.$$DELEGATE_REGISTRY_FUNCTIONS_[e] = d;
    else if (c == f) throw Error('Encountered two active delegates with the same priority ("' + a + ":" + b + '").');
};
soy.$$getDelegateFn = function(a, b, c) {
    var d = soy.$$DELEGATE_REGISTRY_FUNCTIONS_["key_" + a + ":" + b];
    d || "" == b || (d = soy.$$DELEGATE_REGISTRY_FUNCTIONS_["key_" + a + ":"]);
    if (d) return d;
    if (c) return soy.$$EMPTY_TEMPLATE_FN_;
    throw Error('Found no active impl for delegate call to "' + a + ":" + b + '" (and not allowemptydefault="true").');
};
soy.$$EMPTY_TEMPLATE_FN_ = function(a, b, c) {
    return ""
};
soydata.$$makeSanitizedContentFactoryForInternalBlocks_ = function(a) {
    function b(a) {
        this.content = a
    }
    b.prototype = a.prototype;
    return function(a, d) {
        var e = String(a);
        if (!e) return soydata.$$EMPTY_STRING_.VALUE;
        e = new b(e);
        void 0 !== d && (e.contentDir = d);
        return e
    }
};
soydata.$$makeSanitizedContentFactoryWithDefaultDirOnlyForInternalBlocks_ = function(a) {
    function b(a) {
        this.content = a
    }
    b.prototype = a.prototype;
    return function(a) {
        return (a = String(a)) ? new b(a) : soydata.$$EMPTY_STRING_.VALUE
    }
};
soydata.$$markUnsanitizedTextForInternalBlocks = function(a, b) {
    var c = String(a);
    return c ? new soydata.UnsanitizedText(c, b) : soydata.$$EMPTY_STRING_.VALUE
};
soydata.VERY_UNSAFE.$$ordainSanitizedHtmlForInternalBlocks = soydata.$$makeSanitizedContentFactoryForInternalBlocks_(soydata.SanitizedHtml);
soydata.VERY_UNSAFE.$$ordainSanitizedJsForInternalBlocks = soydata.$$makeSanitizedContentFactoryWithDefaultDirOnlyForInternalBlocks_(soydata.SanitizedJs);
soydata.VERY_UNSAFE.$$ordainSanitizedUriForInternalBlocks = soydata.$$makeSanitizedContentFactoryWithDefaultDirOnlyForInternalBlocks_(soydata.SanitizedUri);
soydata.VERY_UNSAFE.$$ordainSanitizedAttributesForInternalBlocks = soydata.$$makeSanitizedContentFactoryWithDefaultDirOnlyForInternalBlocks_(soydata.SanitizedHtmlAttribute);
soydata.VERY_UNSAFE.$$ordainSanitizedCssForInternalBlocks = soydata.$$makeSanitizedContentFactoryWithDefaultDirOnlyForInternalBlocks_(soydata.SanitizedCss);
soy.$$escapeHtml = function(a) {
    return soydata.SanitizedHtml.from(a)
};
soy.$$cleanHtml = function(a, b) {
    if (soydata.isContentKind(a, soydata.SanitizedContentKind.HTML)) return goog.asserts.assert(a.constructor === soydata.SanitizedHtml), a;
    var c;
    b ? (c = goog.object.createSet(b), goog.object.extend(c, soy.esc.$$SAFE_TAG_WHITELIST_)) : c = soy.esc.$$SAFE_TAG_WHITELIST_;
    return soydata.VERY_UNSAFE.ordainSanitizedHtml(soy.$$stripHtmlTags(a, c), soydata.getContentDir(a))
};
soy.$$normalizeHtml = function(a) {
    return soy.esc.$$normalizeHtmlHelper(a)
};
soy.$$escapeHtmlRcdata = function(a) {
    return soydata.isContentKind(a, soydata.SanitizedContentKind.HTML) ? (goog.asserts.assert(a.constructor === soydata.SanitizedHtml), soy.esc.$$normalizeHtmlHelper(a.getContent())) : soy.esc.$$escapeHtmlHelper(a)
};
soy.$$HTML5_VOID_ELEMENTS_ = /^<(?:area|base|br|col|command|embed|hr|img|input|keygen|link|meta|param|source|track|wbr)\b/;
soy.$$stripHtmlTags = function(a, b) {
    if (!b) return String(a).replace(soy.esc.$$HTML_TAG_REGEX_, "").replace(soy.esc.$$LT_REGEX_, "&lt;");
    var c = String(a).replace(/\[/g, "&#91;"),
        d = [],
        e = [],
        c = c.replace(soy.esc.$$HTML_TAG_REGEX_, function(a, c) {
            if (c && (c = c.toLowerCase(), b.hasOwnProperty(c) && b[c])) {
                var f = "/" == a.charAt(1),
                    l = d.length,
                    m = "</",
                    n = "";
                if (!f) {
                    for (m = "<"; f = soy.esc.$$HTML_ATTRIBUTE_REGEX_.exec(a);)
                        if (f[1] && "dir" == f[1].toLowerCase()) {
                            if (f = f[2]) {
                                if ("'" == f.charAt(0) || '"' == f.charAt(0)) f = f.substr(1, f.length - 2);
                                f = f.toLowerCase();
                                if ("ltr" == f || "rtl" == f || "auto" == f) n = ' dir="' + f + '"'
                            }
                            break
                        } soy.esc.$$HTML_ATTRIBUTE_REGEX_.lastIndex = 0
                }
                d[l] = m + c + ">";
                e[l] = n;
                return "[" + l + "]"
            }
            return ""
        }),
        c = soy.esc.$$normalizeHtmlHelper(c),
        f = soy.$$balanceTags_(d),
        c = c.replace(/\[(\d+)\]/g, function(a, b) {
            return e[b] && d[b] ? d[b].substr(0, d[b].length - 1) + e[b] + ">" : d[b]
        });
    return c + f
};
soy.$$embedCssIntoHtml_ = function(a) {
    return a.replace(/<\//g, "<\\/").replace(/\]\]>/g, "]]\\>")
};
soy.$$balanceTags_ = function(a) {
    for (var b = [], c = 0, d = a.length; c < d; ++c) {
        var e = a[c];
        "/" == e.charAt(1) ? (e = goog.array.lastIndexOf(b, e), 0 > e ? a[c] = "" : (a[c] = b.slice(e).reverse().join(""), b.length = e)) : "<li>" == e && 0 > goog.array.lastIndexOf(b, "</ol>") && 0 > goog.array.lastIndexOf(b, "</ul>") ? a[c] = "" : soy.$$HTML5_VOID_ELEMENTS_.test(e) || b.push("</" + e.substring(1))
    }
    return b.reverse().join("")
};
soy.$$escapeHtmlAttribute = function(a) {
    return soydata.isContentKind(a, soydata.SanitizedContentKind.HTML) ? (goog.asserts.assert(a.constructor === soydata.SanitizedHtml), soy.esc.$$normalizeHtmlHelper(soy.$$stripHtmlTags(a.getContent()))) : soy.esc.$$escapeHtmlHelper(a)
};
soy.$$escapeHtmlAttributeNospace = function(a) {
    return soydata.isContentKind(a, soydata.SanitizedContentKind.HTML) ? (goog.asserts.assert(a.constructor === soydata.SanitizedHtml), soy.esc.$$normalizeHtmlNospaceHelper(soy.$$stripHtmlTags(a.getContent()))) : soy.esc.$$escapeHtmlNospaceHelper(a)
};
soy.$$filterHtmlAttributes = function(a) {
    return soydata.isContentKind(a, soydata.SanitizedContentKind.ATTRIBUTES) ? (goog.asserts.assert(a.constructor === soydata.SanitizedHtmlAttribute), a.getContent().replace(/([^"'\s])$/, "$1 ")) : soy.esc.$$filterHtmlAttributesHelper(a)
};
soy.$$filterHtmlElementName = function(a) {
    return soy.esc.$$filterHtmlElementNameHelper(a)
};
soy.$$escapeJs = function(a) {
    return soy.$$escapeJsString(a)
};
soy.$$escapeJsString = function(a) {
    return soy.esc.$$escapeJsStringHelper(a)
};
soy.$$escapeJsValue = function(a) {
    if (null == a) return " null ";
    if (soydata.isContentKind(a, soydata.SanitizedContentKind.JS)) return goog.asserts.assert(a.constructor === soydata.SanitizedJs), a.getContent();
    switch (typeof a) {
        case "boolean":
        case "number":
            return " " + a + " ";
        default:
            return "'" + soy.esc.$$escapeJsStringHelper(String(a)) + "'"
    }
};
soy.$$escapeJsRegex = function(a) {
    return soy.esc.$$escapeJsRegexHelper(a)
};
soy.$$problematicUriMarks_ = /['()]/g;
soy.$$pctEncode_ = function(a) {
    return "%" + a.charCodeAt(0).toString(16)
};
soy.$$escapeUri = function(a) {
    a = soy.esc.$$escapeUriHelper(a);
    soy.$$problematicUriMarks_.lastIndex = 0;
    return soy.$$problematicUriMarks_.test(a) ? a.replace(soy.$$problematicUriMarks_, soy.$$pctEncode_) : a
};
soy.$$normalizeUri = function(a) {
    return soy.esc.$$normalizeUriHelper(a)
};
soy.$$filterNormalizeUri = function(a) {
    return soydata.isContentKind(a, soydata.SanitizedContentKind.URI) ? (goog.asserts.assert(a.constructor === soydata.SanitizedUri), soy.$$normalizeUri(a)) : a instanceof goog.html.SafeUrl ? soy.$$normalizeUri(goog.html.SafeUrl.unwrap(a)) : a instanceof goog.html.TrustedResourceUrl ? soy.$$normalizeUri(goog.html.TrustedResourceUrl.unwrap(a)) : soy.esc.$$filterNormalizeUriHelper(a)
};
soy.$$filterNormalizeMediaUri = function(a) {
    return soydata.isContentKind(a, soydata.SanitizedContentKind.URI) ? (goog.asserts.assert(a.constructor === soydata.SanitizedUri), soy.$$normalizeUri(a)) : a instanceof goog.html.SafeUrl ? soy.$$normalizeUri(goog.html.SafeUrl.unwrap(a)) : a instanceof goog.html.TrustedResourceUrl ? soy.$$normalizeUri(goog.html.TrustedResourceUrl.unwrap(a)) : soy.esc.$$filterNormalizeMediaUriHelper(a)
};
soy.$$filterImageDataUri = function(a) {
    return soydata.VERY_UNSAFE.ordainSanitizedUri(soy.esc.$$filterImageDataUriHelper(a))
};
soy.$$escapeCssString = function(a) {
    return soy.esc.$$escapeCssStringHelper(a)
};
soy.$$filterCssValue = function(a) {
    return soydata.isContentKind(a, soydata.SanitizedContentKind.CSS) ? (goog.asserts.assert(a.constructor === soydata.SanitizedCss), soy.$$embedCssIntoHtml_(a.getContent())) : null == a ? "" : a instanceof goog.html.SafeStyle ? soy.$$embedCssIntoHtml_(goog.html.SafeStyle.unwrap(a)) : soy.esc.$$filterCssValueHelper(a)
};
soy.$$filterNoAutoescape = function(a) {
    return soydata.isContentKind(a, soydata.SanitizedContentKind.TEXT) ? (goog.asserts.fail("Tainted SanitizedContentKind.TEXT for |noAutoescape: `%s`", [a.getContent()]), "zSoyz") : a
};
soy.$$changeNewlineToBr = function(a) {
    var b = goog.string.newLineToBr(String(a), !1);
    return soydata.isContentKind(a, soydata.SanitizedContentKind.HTML) ? soydata.VERY_UNSAFE.ordainSanitizedHtml(b, soydata.getContentDir(a)) : b
};
soy.$$insertWordBreaks = function(a, b) {
    var c = goog.format.insertWordBreaks(String(a), b);
    return soydata.isContentKind(a, soydata.SanitizedContentKind.HTML) ? soydata.VERY_UNSAFE.ordainSanitizedHtml(c, soydata.getContentDir(a)) : c
};
soy.$$truncate = function(a, b, c) {
    a = String(a);
    if (a.length <= b) return a;
    c && (3 < b ? b -= 3 : c = !1);
    soy.$$isHighSurrogate_(a.charAt(b - 1)) && soy.$$isLowSurrogate_(a.charAt(b)) && --b;
    a = a.substring(0, b);
    c && (a += "...");
    return a
};
soy.$$isHighSurrogate_ = function(a) {
    return 55296 <= a && 56319 >= a
};
soy.$$isLowSurrogate_ = function(a) {
    return 56320 <= a && 57343 >= a
};
soy.$$bidiFormatterCache_ = {};
soy.$$getBidiFormatterInstance_ = function(a) {
    return soy.$$bidiFormatterCache_[a] || (soy.$$bidiFormatterCache_[a] = new goog.i18n.BidiFormatter(a))
};
soy.$$bidiTextDir = function(a, b) {
    var c = soydata.getContentDir(a);
    if (null != c) return c;
    c = b || soydata.isContentKind(a, soydata.SanitizedContentKind.HTML);
    return goog.i18n.bidi.estimateDirection(a + "", c)
};
soy.$$bidiDirAttr = function(a, b, c) {
    a = soy.$$getBidiFormatterInstance_(a);
    var d = soydata.getContentDir(b);
    null == d && (c = c || soydata.isContentKind(b, soydata.SanitizedContentKind.HTML), d = goog.i18n.bidi.estimateDirection(b + "", c));
    return soydata.VERY_UNSAFE.ordainSanitizedHtmlAttribute(a.knownDirAttr(d))
};
soy.$$bidiMarkAfter = function(a, b, c) {
    a = soy.$$getBidiFormatterInstance_(a);
    c = c || soydata.isContentKind(b, soydata.SanitizedContentKind.HTML);
    return a.markAfterKnownDir(soydata.getContentDir(b), b + "", c)
};
soy.$$bidiSpanWrap = function(a, b) {
    var c = soy.$$getBidiFormatterInstance_(a),
        d = goog.html.uncheckedconversions.safeHtmlFromStringKnownToSatisfyTypeContract(goog.string.Const.from("Soy |bidiSpanWrap is applied on an autoescaped text."), String(b)),
        c = c.spanWrapSafeHtmlWithKnownDir(soydata.getContentDir(b), d);
    return goog.html.SafeHtml.unwrap(c)
};
soy.$$bidiUnicodeWrap = function(a, b) {
    var c = soy.$$getBidiFormatterInstance_(a),
        d = soydata.isContentKind(b, soydata.SanitizedContentKind.HTML),
        e = c.unicodeWrapWithKnownDir(soydata.getContentDir(b), b + "", d),
        c = c.getContextDir();
    return soydata.isContentKind(b, soydata.SanitizedContentKind.TEXT) ? new soydata.UnsanitizedText(e, c) : d ? soydata.VERY_UNSAFE.ordainSanitizedHtml(e, c) : e
};
soy.asserts.assertType = function(a, b, c, d, e) {
    b = "expected param " + b + " of type " + d + (goog.DEBUG ? ", but got " + goog.debug.runtimeType(c) : "") + ".";
    return goog.asserts.assert(a, b, e)
};
soy.esc.$$escapeHtmlHelper = function(a) {
    return goog.string.htmlEscape(String(a))
};
soy.esc.$$escapeUriHelper = function(a) {
    return goog.string.urlEncode(String(a))
};
soy.esc.$$ESCAPE_MAP_FOR_NORMALIZE_HTML__AND__ESCAPE_HTML_NOSPACE__AND__NORMALIZE_HTML_NOSPACE_ = {
    "\x00": "&#0;",
    "\t": "&#9;",
    "\n": "&#10;",
    "\x0B": "&#11;",
    "\f": "&#12;",
    "\r": "&#13;",
    " ": "&#32;",
    '"': "&quot;",
    "&": "&amp;",
    "'": "&#39;",
    "-": "&#45;",
    "/": "&#47;",
    "<": "&lt;",
    "=": "&#61;",
    ">": "&gt;",
    "`": "&#96;",
    "\u0085": "&#133;",
    "\u00a0": "&#160;",
    "\u2028": "&#8232;",
    "\u2029": "&#8233;"
};
soy.esc.$$REPLACER_FOR_NORMALIZE_HTML__AND__ESCAPE_HTML_NOSPACE__AND__NORMALIZE_HTML_NOSPACE_ = function(a) {
    return soy.esc.$$ESCAPE_MAP_FOR_NORMALIZE_HTML__AND__ESCAPE_HTML_NOSPACE__AND__NORMALIZE_HTML_NOSPACE_[a]
};
soy.esc.$$ESCAPE_MAP_FOR_ESCAPE_JS_STRING__AND__ESCAPE_JS_REGEX_ = {
    "\x00": "\\x00",
    "\b": "\\x08",
    "\t": "\\t",
    "\n": "\\n",
    "\x0B": "\\x0b",
    "\f": "\\f",
    "\r": "\\r",
    '"': "\\x22",
    $: "\\x24",
    "&": "\\x26",
    "'": "\\x27",
    "(": "\\x28",
    ")": "\\x29",
    "*": "\\x2a",
    "+": "\\x2b",
    ",": "\\x2c",
    "-": "\\x2d",
    ".": "\\x2e",
    "/": "\\/",
    ":": "\\x3a",
    "<": "\\x3c",
    "=": "\\x3d",
    ">": "\\x3e",
    "?": "\\x3f",
    "[": "\\x5b",
    "\\": "\\\\",
    "]": "\\x5d",
    "^": "\\x5e",
    "{": "\\x7b",
    "|": "\\x7c",
    "}": "\\x7d",
    "\u0085": "\\x85",
    "\u2028": "\\u2028",
    "\u2029": "\\u2029"
};
soy.esc.$$REPLACER_FOR_ESCAPE_JS_STRING__AND__ESCAPE_JS_REGEX_ = function(a) {
    return soy.esc.$$ESCAPE_MAP_FOR_ESCAPE_JS_STRING__AND__ESCAPE_JS_REGEX_[a]
};
soy.esc.$$ESCAPE_MAP_FOR_ESCAPE_CSS_STRING_ = {
    "\x00": "\\0 ",
    "\b": "\\8 ",
    "\t": "\\9 ",
    "\n": "\\a ",
    "\x0B": "\\b ",
    "\f": "\\c ",
    "\r": "\\d ",
    '"': "\\22 ",
    "&": "\\26 ",
    "'": "\\27 ",
    "(": "\\28 ",
    ")": "\\29 ",
    "*": "\\2a ",
    "/": "\\2f ",
    ":": "\\3a ",
    ";": "\\3b ",
    "<": "\\3c ",
    "=": "\\3d ",
    ">": "\\3e ",
    "@": "\\40 ",
    "\\": "\\5c ",
    "{": "\\7b ",
    "}": "\\7d ",
    "\u0085": "\\85 ",
    "\u00a0": "\\a0 ",
    "\u2028": "\\2028 ",
    "\u2029": "\\2029 "
};
soy.esc.$$REPLACER_FOR_ESCAPE_CSS_STRING_ = function(a) {
    return soy.esc.$$ESCAPE_MAP_FOR_ESCAPE_CSS_STRING_[a]
};
soy.esc.$$ESCAPE_MAP_FOR_NORMALIZE_URI__AND__FILTER_NORMALIZE_URI__AND__FILTER_NORMALIZE_MEDIA_URI_ = {
    "\x00": "%00",
    "\u0001": "%01",
    "\u0002": "%02",
    "\u0003": "%03",
    "\u0004": "%04",
    "\u0005": "%05",
    "\u0006": "%06",
    "\u0007": "%07",
    "\b": "%08",
    "\t": "%09",
    "\n": "%0A",
    "\x0B": "%0B",
    "\f": "%0C",
    "\r": "%0D",
    "\u000e": "%0E",
    "\u000f": "%0F",
    "\u0010": "%10",
    "\u0011": "%11",
    "\u0012": "%12",
    "\u0013": "%13",
    "\u0014": "%14",
    "\u0015": "%15",
    "\u0016": "%16",
    "\u0017": "%17",
    "\u0018": "%18",
    "\u0019": "%19",
    "\u001a": "%1A",
    "\u001b": "%1B",
    "\u001c": "%1C",
    "\u001d": "%1D",
    "\u001e": "%1E",
    "\u001f": "%1F",
    " ": "%20",
    '"': "%22",
    "'": "%27",
    "(": "%28",
    ")": "%29",
    "<": "%3C",
    ">": "%3E",
    "\\": "%5C",
    "{": "%7B",
    "}": "%7D",
    "\u007f": "%7F",
    "\u0085": "%C2%85",
    "\u00a0": "%C2%A0",
    "\u2028": "%E2%80%A8",
    "\u2029": "%E2%80%A9",
    "\uff01": "%EF%BC%81",
    "\uff03": "%EF%BC%83",
    "\uff04": "%EF%BC%84",
    "\uff06": "%EF%BC%86",
    "\uff07": "%EF%BC%87",
    "\uff08": "%EF%BC%88",
    "\uff09": "%EF%BC%89",
    "\uff0a": "%EF%BC%8A",
    "\uff0b": "%EF%BC%8B",
    "\uff0c": "%EF%BC%8C",
    "\uff0f": "%EF%BC%8F",
    "\uff1a": "%EF%BC%9A",
    "\uff1b": "%EF%BC%9B",
    "\uff1d": "%EF%BC%9D",
    "\uff1f": "%EF%BC%9F",
    "\uff20": "%EF%BC%A0",
    "\uff3b": "%EF%BC%BB",
    "\uff3d": "%EF%BC%BD"
};
soy.esc.$$REPLACER_FOR_NORMALIZE_URI__AND__FILTER_NORMALIZE_URI__AND__FILTER_NORMALIZE_MEDIA_URI_ = function(a) {
    return soy.esc.$$ESCAPE_MAP_FOR_NORMALIZE_URI__AND__FILTER_NORMALIZE_URI__AND__FILTER_NORMALIZE_MEDIA_URI_[a]
};
soy.esc.$$MATCHER_FOR_NORMALIZE_HTML_ = /[\x00\x22\x27\x3c\x3e]/g;
soy.esc.$$MATCHER_FOR_ESCAPE_HTML_NOSPACE_ = /[\x00\x09-\x0d \x22\x26\x27\x2d\/\x3c-\x3e`\x85\xa0\u2028\u2029]/g;
soy.esc.$$MATCHER_FOR_NORMALIZE_HTML_NOSPACE_ = /[\x00\x09-\x0d \x22\x27\x2d\/\x3c-\x3e`\x85\xa0\u2028\u2029]/g;
soy.esc.$$MATCHER_FOR_ESCAPE_JS_STRING_ = /[\x00\x08-\x0d\x22\x26\x27\/\x3c-\x3e\\\x85\u2028\u2029]/g;
soy.esc.$$MATCHER_FOR_ESCAPE_JS_REGEX_ = /[\x00\x08-\x0d\x22\x24\x26-\/\x3a\x3c-\x3f\x5b-\x5e\x7b-\x7d\x85\u2028\u2029]/g;
soy.esc.$$MATCHER_FOR_ESCAPE_CSS_STRING_ = /[\x00\x08-\x0d\x22\x26-\x2a\/\x3a-\x3e@\\\x7b\x7d\x85\xa0\u2028\u2029]/g;
soy.esc.$$MATCHER_FOR_NORMALIZE_URI__AND__FILTER_NORMALIZE_URI__AND__FILTER_NORMALIZE_MEDIA_URI_ = /[\x00- \x22\x27-\x29\x3c\x3e\\\x7b\x7d\x7f\x85\xa0\u2028\u2029\uff01\uff03\uff04\uff06-\uff0c\uff0f\uff1a\uff1b\uff1d\uff1f\uff20\uff3b\uff3d]/g;
soy.esc.$$FILTER_FOR_FILTER_CSS_VALUE_ = /^(?!-*(?:expression|(?:moz-)?binding))(?:[.#]?-?(?:[_a-z0-9-]+)(?:-[_a-z0-9-]+)*-?|-?(?:[0-9]+(?:\.[0-9]*)?|\.[0-9]+)(?:[a-z]{1,2}|%)?|!important|)$/i;
soy.esc.$$FILTER_FOR_FILTER_NORMALIZE_URI_ = /^(?![^#?]*\/(?:\.|%2E){2}(?:[\/?#]|$))(?:(?:https?|mailto):|[^&:\/?#]*(?:[\/?#]|$))/i;
soy.esc.$$FILTER_FOR_FILTER_NORMALIZE_MEDIA_URI_ = /^[^&:\/?#]*(?:[\/?#]|$)|^https?:|^data:image\/[a-z0-9+]+;base64,[a-z0-9+\/]+=*$|^blob:/i;
soy.esc.$$FILTER_FOR_FILTER_IMAGE_DATA_URI_ = /^data:image\/(?:bmp|gif|jpe?g|png|tiff|webp);base64,[a-z0-9+\/]+=*$/i;
soy.esc.$$FILTER_FOR_FILTER_HTML_ATTRIBUTES_ = /^(?!style|on|action|archive|background|cite|classid|codebase|data|dsync|href|longdesc|src|usemap)(?:[a-z0-9_$:-]*)$/i;
soy.esc.$$FILTER_FOR_FILTER_HTML_ELEMENT_NAME_ = /^(?!script|style|title|textarea|xmp|no)[a-z0-9_$:-]*$/i;
soy.esc.$$normalizeHtmlHelper = function(a) {
    return String(a).replace(soy.esc.$$MATCHER_FOR_NORMALIZE_HTML_, soy.esc.$$REPLACER_FOR_NORMALIZE_HTML__AND__ESCAPE_HTML_NOSPACE__AND__NORMALIZE_HTML_NOSPACE_)
};
soy.esc.$$escapeHtmlNospaceHelper = function(a) {
    return String(a).replace(soy.esc.$$MATCHER_FOR_ESCAPE_HTML_NOSPACE_, soy.esc.$$REPLACER_FOR_NORMALIZE_HTML__AND__ESCAPE_HTML_NOSPACE__AND__NORMALIZE_HTML_NOSPACE_)
};
soy.esc.$$normalizeHtmlNospaceHelper = function(a) {
    return String(a).replace(soy.esc.$$MATCHER_FOR_NORMALIZE_HTML_NOSPACE_, soy.esc.$$REPLACER_FOR_NORMALIZE_HTML__AND__ESCAPE_HTML_NOSPACE__AND__NORMALIZE_HTML_NOSPACE_)
};
soy.esc.$$escapeJsStringHelper = function(a) {
    return String(a).replace(soy.esc.$$MATCHER_FOR_ESCAPE_JS_STRING_, soy.esc.$$REPLACER_FOR_ESCAPE_JS_STRING__AND__ESCAPE_JS_REGEX_)
};
soy.esc.$$escapeJsRegexHelper = function(a) {
    return String(a).replace(soy.esc.$$MATCHER_FOR_ESCAPE_JS_REGEX_, soy.esc.$$REPLACER_FOR_ESCAPE_JS_STRING__AND__ESCAPE_JS_REGEX_)
};
soy.esc.$$escapeCssStringHelper = function(a) {
    return String(a).replace(soy.esc.$$MATCHER_FOR_ESCAPE_CSS_STRING_, soy.esc.$$REPLACER_FOR_ESCAPE_CSS_STRING_)
};
soy.esc.$$filterCssValueHelper = function(a) {
    a = String(a);
    return soy.esc.$$FILTER_FOR_FILTER_CSS_VALUE_.test(a) ? a : (goog.asserts.fail("Bad value `%s` for |filterCssValue", [a]), "zSoyz")
};
soy.esc.$$normalizeUriHelper = function(a) {
    return String(a).replace(soy.esc.$$MATCHER_FOR_NORMALIZE_URI__AND__FILTER_NORMALIZE_URI__AND__FILTER_NORMALIZE_MEDIA_URI_, soy.esc.$$REPLACER_FOR_NORMALIZE_URI__AND__FILTER_NORMALIZE_URI__AND__FILTER_NORMALIZE_MEDIA_URI_)
};
soy.esc.$$filterNormalizeUriHelper = function(a) {
    a = String(a);
    return soy.esc.$$FILTER_FOR_FILTER_NORMALIZE_URI_.test(a) ? a.replace(soy.esc.$$MATCHER_FOR_NORMALIZE_URI__AND__FILTER_NORMALIZE_URI__AND__FILTER_NORMALIZE_MEDIA_URI_, soy.esc.$$REPLACER_FOR_NORMALIZE_URI__AND__FILTER_NORMALIZE_URI__AND__FILTER_NORMALIZE_MEDIA_URI_) : (goog.asserts.fail("Bad value `%s` for |filterNormalizeUri", [a]), "#zSoyz")
};
soy.esc.$$filterNormalizeMediaUriHelper = function(a) {
    a = String(a);
    return soy.esc.$$FILTER_FOR_FILTER_NORMALIZE_MEDIA_URI_.test(a) ? a.replace(soy.esc.$$MATCHER_FOR_NORMALIZE_URI__AND__FILTER_NORMALIZE_URI__AND__FILTER_NORMALIZE_MEDIA_URI_, soy.esc.$$REPLACER_FOR_NORMALIZE_URI__AND__FILTER_NORMALIZE_URI__AND__FILTER_NORMALIZE_MEDIA_URI_) : (goog.asserts.fail("Bad value `%s` for |filterNormalizeMediaUri", [a]), "about:invalid#zSoyz")
};
soy.esc.$$filterImageDataUriHelper = function(a) {
    a = String(a);
    return soy.esc.$$FILTER_FOR_FILTER_IMAGE_DATA_URI_.test(a) ? a : (goog.asserts.fail("Bad value `%s` for |filterImageDataUri", [a]), "data:image/gif;base64,zSoyz")
};
soy.esc.$$filterHtmlAttributesHelper = function(a) {
    a = String(a);
    return soy.esc.$$FILTER_FOR_FILTER_HTML_ATTRIBUTES_.test(a) ? a : (goog.asserts.fail("Bad value `%s` for |filterHtmlAttributes", [a]), "zSoyz")
};
soy.esc.$$filterHtmlElementNameHelper = function(a) {
    a = String(a);
    return soy.esc.$$FILTER_FOR_FILTER_HTML_ELEMENT_NAME_.test(a) ? a : (goog.asserts.fail("Bad value `%s` for |filterHtmlElementName", [a]), "zSoyz")
};
soy.esc.$$HTML_TAG_REGEX_ = /<(?:!|\/?([a-zA-Z][a-zA-Z0-9:\-]*))(?:[^>'"]|"[^"]*"|'[^']*')*>/g;
soy.esc.$$LT_REGEX_ = /</g;
soy.esc.$$SAFE_TAG_WHITELIST_ = {
    b: !0,
    br: !0,
    em: !0,
    i: !0,
    s: !0,
    sub: !0,
    sup: !0,
    u: !0
};
soy.esc.$$HTML_ATTRIBUTE_REGEX_ = /([a-zA-Z][a-zA-Z0-9:\-]*)[\t\n\r\u0020]*=[\t\n\r\u0020]*("[^"]*"|'[^']*')/g;
csp.ui = {};
csp.ui.templates = {};
csp.ui.templates.CspWidget = function(a, b) {
    for (var c = '<div><span class="left"><h4 class="title">Evaluated CSP as seen by a browser supporting CSP Version ' + soy.$$escapeHtml(a.cspVersion) + '</h4></span><span id="expand_all" class="link right">expand/collapse all</span><div class="clear"></div><div class="evaluated-csp">', d = a.uiModel, e = d.length, f = 0; f < e; f++) {
        for (var g = d[f], c = c + ('<div class="directive"><a class="cols"><div class="col icon" data-tooltip="' + soy.$$escapeHtmlAttribute(g.coloredIcon.altText) + '" style="width: 25px;"><i class="material-icons ' +
                    soy.$$escapeHtmlAttribute(g.coloredIcon.color) + '">' + soy.$$escapeHtml(g.coloredIcon.icon) + '</i></div><div class="col ' + soy.$$escapeHtmlAttribute(g.coloredIcon.color) + '" data-tooltip="' + soy.$$escapeHtmlAttribute(g.coloredIcon.altText) + '" style="width: 30%;"><b class="' + (g.isIgnored ? "ignored" : "") + '">' + soy.$$escapeHtml(g.directive) + "</b>&nbsp;" + (g.isMissing ? '<div class="missing">[missing]</div>' : "") + '</div><div class="col" style="width: 0%;"></div><div class="col" style="width: 60%;"><ul class="descriptions">'),
                h = g.directiveLevelFindings, k = h.length, l = 0; l < k; l++) var m = h[l],
            c = c + (m.description ? "<li>" + soy.$$escapeHtml(m.description) + "</li>" : "");
        c += '</ul></div><div class="col" style="float: right;"><i class="material-icons expand">expand_more</i></div></a><div class="border"></div><div class="directive-values">';
        g = g.values;
        h = g.length;
        for (k = 0; k < h; k++) {
            for (var l = g[k], c = c + ('<div class="cols directive-value"><div class="col" style="width: 25px;"></div><div class="col icon" data-tooltip="' + soy.$$escapeHtmlAttribute(l.coloredIcon.altText) +
                    '" style="width: 25px;"><i class="material-icons ' + soy.$$escapeHtmlAttribute(l.coloredIcon.color) + '">' + soy.$$escapeHtml(l.coloredIcon.icon) + '</i></div><div class="col value ' + (l.isIgnored ? "ignored" : "") + '" data-tooltip="' + soy.$$escapeHtmlAttribute(l.coloredIcon.altText) + '" style="width: 35%;">' + soy.$$escapeHtml(l.value) + '</div><div class="col" style="width: 55%;"><ul class="descriptions">'), l = l.findings, m = l.length, n = 0; n < m; n++) var p = l[n],
                c = c + (p.description ? "<li>" + soy.$$escapeHtml(p.description) + "</li>" :
                    "");
            c += "</ul></div></div>"
        }
        c += "<br></div></div>"
    }
    return soydata.VERY_UNSAFE.ordainSanitizedHtml(c + "</div><br></div>")
};
goog.DEBUG && (csp.ui.templates.CspWidget.soyTemplateName = "csp.ui.templates.CspWidget");
csp.ui.templates.CspWidgetLegend = function(a, b) {
    for (var c = '<div style="width: 300px"><a><h4 class="title border">Legend</h4></a><div class="legend">', d = a.items, e = d.length, f = 0; f < e; f++) var g = d[f],
        c = c + ('<div class="cols"><div class="col icon" style="width: 20px"><i class="material-icons ' + soy.$$escapeHtmlAttribute(g.color) + '">' + soy.$$escapeHtml(g.icon) + '</i></div><div class="col">' + soy.$$escapeHtml(g.altText) + "</div></div>");
    return soydata.VERY_UNSAFE.ordainSanitizedHtml(c + "</div></div>")
};
goog.DEBUG && (csp.ui.templates.CspWidgetLegend.soyTemplateName = "csp.ui.templates.CspWidgetLegend");
csp.ui.templates.CspWidgetCss = function(a, b) {
    return soydata.VERY_UNSAFE.ordainSanitizedHtml('<link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons"><style>\n      #csp_widget {\n        min-width: 500px;\n      }\n\n      .cols:after {\n        clear: both;\n        content: " ";\n        display: block;\n        height: 0;\n        visibility: hidden;\n      }\n\n      .cols:focus {\n        outline: none;\n      }\n\n      a:hover {\n        cursor: pointer;\n      }\n\n      .col {\n        font-size: 12px;\n        word-break: break-all;\n        margin-bottom: 0px;\n        min-height: 18px;\n        float: left;\n      }\n\n      .col > ul > li{\n        font-size: 12px;\n      }\n\n      .icon {\n        line-height: 0;\n        padding-top: 3px;\n      }\n\n      .material-icons {\n        font-size: 14px;\n        line-height: 1;\n      }\n\n      .link:hover {\n        cursor: pointer;\n      }\n\n      .link {\n        margin: 1.236em 0 .618em;\n        font-size: 13px;\n        color: #444;\n        border-bottom: 1px solid #444;\n      }\n\n      .left {\n        float: left;\n      }\n\n      .right {\n        float: right;\n      }\n\n      .clear {\n        clear: both;\n      }\n\n      .red {\n        color: red;\n      }\n\n      .green {\n        color: #0F9D58;\n      }\n\n      .yellow {\n        color: #FFC107;\n      }\n\n      .blue {\n        color: #4285F4;\n      }\n\n      .purple {\n        color: #9C27B0;\n      }\n\n      .pink {\n        color: #CB3ED2;\n      }\n\n      .grey {\n        color: #757575;\n      }\n\n      .border {\n        border-bottom: 1px dashed #ccc;\n      }\n\n      .descriptions {\n        color: #444;\n        margin: 0px;\n        padding-left: 20px;\n        list-style-type: none;\n        word-break: normal;\n        margin-bottom: 5px;\n      }\n\n      .descriptions li {\n        margin-bottom: 5px;\n        line-height: 17px;\n      }\n\n      .missing {\n        display: inline;\n      }\n\n      .ignored {\n        color: #757575;\n      }\n\n      .title {\n        font-family: "open sans",arial,sans-serif;\n        font-weight: bold;\n        font-size: 13px;\n        margin: 1.236em 0 .618em;\n        color: #444;\n        display: table;\n      }\n\n      a.goog-zippy-expanded > div.col > i.expand {\n        transform: rotate(180deg);\n      }\n\n      .goog-tooltip {\n        width: 120px;\n        background-color: #9E9E9E;\n        color: #fff;\n        text-align: center;\n        padding: 5px 0;\n        border-radius: 6px;\n        position: absolute;\n        z-index: 1;\n      }\n\n      .goog-tooltip::after {\n        content: "";\n        position: absolute;\n        bottom: 100%;\n        left: 20%;\n        margin-left: -5px;\n        border-width: 5px;\n        border-style: solid;\n        border-color: transparent transparent #9E9E9E transparent;\n      }\n\n    </style>')
};
goog.DEBUG && (csp.ui.templates.CspWidgetCss.soyTemplateName = "csp.ui.templates.CspWidgetCss");
/*

 Copyright 2016 Google Inc. All rights reserved.
 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

   http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.

 @fileoverview Provides a UI widget to show a CSP and corresponding findings.
 @author lwe@google.com (Lukas Weichselbaum)
*/
csp.ui.Icon = {
    OK: "check",
    INFO: "info_outline",
    ERROR: "error",
    MAYBE: "help_outline",
    SYNTAX: "clear",
    IGNORED: "remove",
    STRICT: "local_atm"
};
csp.ui.Color = {
    GREEN: "green",
    BLUE: "blue",
    YELLOW: "yellow",
    RED: "red",
    PURPLE: "purple",
    PINK: "pink",
    GREY: "grey"
};
csp.ui.ColoredIcon = function(a, b, c) {
    this.color = a;
    this.icon = b;
    this.altText = c
};
csp.ui.Finding = function(a, b, c) {
    this.description = a;
    this.value = c;
    this.coloredIcon = b
};
csp.ui.DirectiveValue = function(a, b, c) {
    this.value = a;
    this.coloredIcon = b;
    this.findings = c;
    this.isIgnored = !1
};
csp.ui.Directive = function(a, b, c, d, e) {
    this.directive = a;
    this.values = b;
    this.coloredIcon = c;
    this.directiveLevelFindings = d;
    this.isMissing = e || !1;
    this.isIgnored = !1
};
csp.ui.Widget = function(a, b, c, d, e) {
    // goog.debug.Console.autoInstall();
    // this.logger_ = goog.log.getLogger("csp.CspEvaluator");
    this.csp = a;
    this.effectiveCsp = csp.Csp.getEffectiveCsp(a, c);
    this.findings = b;
    this.cspVersion = c;
    this.element = d || goog.dom.getElement("csp_widget");
    this.disableLegend = e || !1;
    this.expand = !0;
    this.element ? this.render() : goog.log.error(this.logger_, "No DOM-Element for rendering provided.")
};
csp.ui.Widget.prototype.render = function() {
    var a = this.markIgnoredDirectivesAndValues_(this.buildModel_()),
        b = this.element;
    goog.dom.removeChildren(b);
    var c = goog.soy.renderAsElement(csp.ui.templates.CspWidgetCss, {});
    b.appendChild(c);
    c = goog.soy.renderAsElement(csp.ui.templates.CspWidget, {
        uiModel: a,
        cspVersion: this.cspVersion
    });
    b.appendChild(c);
    for (var d = goog.dom.getChildren(goog.dom.getElementByClass("evaluated-csp", c)), e = [], f, a = 0; f = d[a]; a++) {
        var g = goog.dom.getFirstElementChild(f);
        f = goog.dom.getLastElementChild(f);
        g = new goog.ui.AnimatedZippy(g, f);
        g.animationDuration = 200;
        e.push(g)
    }
    a = goog.dom.getElement("expand_all");
    goog.events.listen(a, goog.events.EventType.CLICK, goog.bind(function(a) {
        var b = this;
        e.forEach(function(a) {
            return a.setExpanded(b.expand)
        });
        this.expand = !this.expand
    }, this));
    c = goog.dom.getElementsByClass("col", c);
    for (a = 0; d = c[a]; a++) d.hasAttribute("data-tooltip") && (g = d.getAttribute("data-tooltip"), new goog.ui.Tooltip(d, g));
    this.disableLegend || (a = goog.dom.createElement(goog.dom.TagName.DIV), this.renderLegend(a),
        b.appendChild(a))
};
csp.ui.Widget.prototype.renderLegend = function(a) {
    var b = goog.array.map([csp.Finding.Severity.HIGH, csp.Finding.Severity.MEDIUM, csp.Finding.Severity.HIGH_MAYBE, csp.Finding.Severity.MEDIUM_MAYBE, csp.Finding.Severity.SYNTAX, csp.Finding.Severity.INFO, csp.Finding.Severity.NONE], this.translateSeverity_, this),
        c = new csp.ui.ColoredIcon(csp.ui.Color.GREY, csp.ui.Icon.IGNORED, "Directive/value is ignored in this version of CSP");
    goog.array.insertAt(b, c, 3);
    goog.dom.removeChildren(a);
    b = goog.soy.renderAsElement(csp.ui.templates.CspWidgetLegend, {
        items: b
    });
    a.appendChild(b);
    (new goog.ui.AnimatedZippy(goog.dom.getElementByClass("title", b), goog.dom.getElementByClass("legend", b), !0)).animationDuration = 200
};
csp.ui.Widget.prototype.buildModel_ = function() {
    for (var a = {}, b = this.findings.sort(function(a, b) {
            return a.severity - b.severity
        }), b = $jscomp.makeIterator(b), c = b.next(); !c.done; c = b.next()) {
        var d = c.value;
        d.directive in a || (a[d.directive] = []);
        a[d.directive].push(d)
    }
    for (var b = [], d = new Set(Object.keys(this.csp).concat(Object.keys(a))), d = $jscomp.makeIterator(d.values()), e = d.next(); !e.done; e = d.next()) {
        for (var e = e.value, f = [], g = a[e] || [], h = {
                value: void 0
            }, k = $jscomp.makeIterator(this.csp[e] || []), c = k.next(); !c.done; h = {
                value: h.value
            }, c = k.next()) {
            h.value = c.value;
            for (var l = [], m = goog.array.filter(g, function(a) {
                    return function(b) {
                        return b.value == a.value
                    }
                }(h)), n = $jscomp.makeIterator(m), c = n.next(); !c.done; c = n.next()) {
                var p = c.value,
                    c = this.translateSeverity_(p.severity),
                    c = new csp.ui.Finding(p.description, c, p.value);
                l.push(c)
            }
            c = this.translateSeverity_(csp.Finding.getHighestSeverity(m));
            c = new csp.ui.DirectiveValue(h.value, c, l);
            f.push(c)
        }
        h = [];
        k = goog.array.filter(g, function(a) {
            return !goog.isDef(a.value)
        });
        k = $jscomp.makeIterator(k);
        for (c = k.next(); !c.done; c = k.next()) l = c.value, c = this.translateSeverity_(l.severity), c = new csp.ui.Finding(l.description, c, void 0), h.push(c);
        c = this.translateSeverity_(csp.Finding.getHighestSeverity(g));
        e = new csp.ui.Directive(e, f, c, h, !(e in this.csp));
        b.push(e)
    }
    return b
};
csp.ui.Widget.prototype.markIgnoredDirectivesAndValues_ = function(a) {
    for (var b = new csp.ui.ColoredIcon(csp.ui.Color.GREY, csp.ui.Icon.IGNORED, "Directive/Value is ignored in this version of CSP"), c = $jscomp.makeIterator(a), d = c.next(); !d.done; d = c.next()) {
        var e = d.value;
        e.isMissing || e.directive in this.effectiveCsp || (e.isIgnored = !0, e.coloredIcon = b);
        for (var d = this.effectiveCsp[e.directive] || [], e = $jscomp.makeIterator(e.values), f = e.next(); !f.done; f = e.next()) f = f.value, goog.array.contains(d, f.value) || (f.isIgnored = !0, f.coloredIcon = b)
    }
    return a
};
csp.ui.Widget.prototype.translateSeverity_ = function(a) {
    if (a != csp.Finding.Severity.NONE) {
        if (a == csp.Finding.Severity.INFO) return new csp.ui.ColoredIcon(csp.ui.Color.BLUE, csp.ui.Icon.INFO, "Information");
        if (a == csp.Finding.Severity.STRICT_CSP) return new csp.ui.ColoredIcon(csp.ui.Color.PINK, csp.ui.Icon.STRICT, "Hints for making CSP strict and backward-compatible.");
        if (a == csp.Finding.Severity.MEDIUM_MAYBE) return new csp.ui.ColoredIcon(csp.ui.Color.YELLOW, csp.ui.Icon.MAYBE, "Possible medium severity finding");
        if (a ==
            csp.Finding.Severity.HIGH_MAYBE) return new csp.ui.ColoredIcon(csp.ui.Color.RED, csp.ui.Icon.MAYBE, "Possible high severity finding");
        if (a == csp.Finding.Severity.MEDIUM) return new csp.ui.ColoredIcon(csp.ui.Color.YELLOW, csp.ui.Icon.ERROR, "Medium severity finding");
        if (a == csp.Finding.Severity.HIGH) return new csp.ui.ColoredIcon(csp.ui.Color.RED, csp.ui.Icon.ERROR, "High severity finding");
        if (a == csp.Finding.Severity.SYNTAX) return new csp.ui.ColoredIcon(csp.ui.Color.PURPLE, csp.ui.Icon.SYNTAX, "Syntax error")
    }
    return new csp.ui.ColoredIcon(csp.ui.Color.GREEN,
        csp.ui.Icon.OK, "All good")
};
csp.Demo = function() {
    var a = new csp.CspParser("script-src data: https://www.google.com;"),
        b = (new csp.CspEvaluator(a.csp, csp.Version.CSP3)).evaluate();
    new csp.ui.Widget(a.csp, b, csp.Version.CSP3)
};

exports.do_evaluation = function(rawCsp){
    var parser = new csp.CspParser(rawCsp);
    var evaluator = new csp.CspEvaluator(parser.csp, csp.Version.CSP3);
    var findings = evaluator.evaluate();

    return findings;
}

// var rawCsp = "sdsfa";
   
//     // var widget = new csp.ui.Widget(parser.csp, findings, csp.Version.CSP3);
// console.log(findings)