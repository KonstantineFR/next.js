;(() => {
  'use strict'
  var e = {
    35: function (e, t, r) {
      var n =
        (this && this.__spreadArray) ||
        function (e, t) {
          for (var r = 0, n = t.length, a = e.length; r < n; r++, a++)
            e[a] = t[r]
          return e
        }
      Object.defineProperty(t, '__esModule', { value: true })
      t.ContextAPI = void 0
      var a = r(129)
      var o = r(4346)
      var i = r(6647)
      var u = 'context'
      var c = new a.NoopContextManager()
      var g = (function () {
        function ContextAPI() {}
        ContextAPI.getInstance = function () {
          if (!this._instance) {
            this._instance = new ContextAPI()
          }
          return this._instance
        }
        ContextAPI.prototype.setGlobalContextManager = function (e) {
          return o.registerGlobal(u, e, i.DiagAPI.instance())
        }
        ContextAPI.prototype.active = function () {
          return this._getContextManager().active()
        }
        ContextAPI.prototype.with = function (e, t, r) {
          var a
          var o = []
          for (var i = 3; i < arguments.length; i++) {
            o[i - 3] = arguments[i]
          }
          return (a = this._getContextManager()).with.apply(a, n([e, t, r], o))
        }
        ContextAPI.prototype.bind = function (e, t) {
          return this._getContextManager().bind(e, t)
        }
        ContextAPI.prototype._getContextManager = function () {
          return o.getGlobal(u) || c
        }
        ContextAPI.prototype.disable = function () {
          this._getContextManager().disable()
          o.unregisterGlobal(u, i.DiagAPI.instance())
        }
        return ContextAPI
      })()
      t.ContextAPI = g
    },
    6647: (e, t, r) => {
      Object.defineProperty(t, '__esModule', { value: true })
      t.DiagAPI = void 0
      var n = r(9434)
      var a = r(6427)
      var o = r(7348)
      var i = r(4346)
      var u = 'diag'
      var c = (function () {
        function DiagAPI() {
          function _logProxy(e) {
            return function () {
              var t = []
              for (var r = 0; r < arguments.length; r++) {
                t[r] = arguments[r]
              }
              var n = i.getGlobal('diag')
              if (!n) return
              return n[e].apply(n, t)
            }
          }
          var e = this
          e.setLogger = function (t, r) {
            var n, u
            if (r === void 0) {
              r = o.DiagLogLevel.INFO
            }
            if (t === e) {
              var c = new Error(
                'Cannot use diag as the logger for itself. Please use a DiagLogger implementation like ConsoleDiagLogger or a custom implementation'
              )
              e.error((n = c.stack) !== null && n !== void 0 ? n : c.message)
              return false
            }
            var g = i.getGlobal('diag')
            var l = a.createLogLevelDiagLogger(r, t)
            if (g) {
              var p =
                (u = new Error().stack) !== null && u !== void 0
                  ? u
                  : '<failed to generate stacktrace>'
              g.warn('Current logger will be overwritten from ' + p)
              l.warn(
                'Current logger will overwrite one already registered from ' + p
              )
            }
            return i.registerGlobal('diag', l, e, true)
          }
          e.disable = function () {
            i.unregisterGlobal(u, e)
          }
          e.createComponentLogger = function (e) {
            return new n.DiagComponentLogger(e)
          }
          e.verbose = _logProxy('verbose')
          e.debug = _logProxy('debug')
          e.info = _logProxy('info')
          e.warn = _logProxy('warn')
          e.error = _logProxy('error')
        }
        DiagAPI.instance = function () {
          if (!this._instance) {
            this._instance = new DiagAPI()
          }
          return this._instance
        }
        return DiagAPI
      })()
      t.DiagAPI = c
    },
    1108: (e, t, r) => {
      Object.defineProperty(t, '__esModule', { value: true })
      t.PropagationAPI = void 0
      var n = r(4346)
      var a = r(5321)
      var o = r(769)
      var i = r(7066)
      var u = r(8170)
      var c = r(6647)
      var g = 'propagation'
      var l = new a.NoopTextMapPropagator()
      var p = (function () {
        function PropagationAPI() {
          this.createBaggage = u.createBaggage
          this.getBaggage = i.getBaggage
          this.setBaggage = i.setBaggage
          this.deleteBaggage = i.deleteBaggage
        }
        PropagationAPI.getInstance = function () {
          if (!this._instance) {
            this._instance = new PropagationAPI()
          }
          return this._instance
        }
        PropagationAPI.prototype.setGlobalPropagator = function (e) {
          return n.registerGlobal(g, e, c.DiagAPI.instance())
        }
        PropagationAPI.prototype.inject = function (e, t, r) {
          if (r === void 0) {
            r = o.defaultTextMapSetter
          }
          return this._getGlobalPropagator().inject(e, t, r)
        }
        PropagationAPI.prototype.extract = function (e, t, r) {
          if (r === void 0) {
            r = o.defaultTextMapGetter
          }
          return this._getGlobalPropagator().extract(e, t, r)
        }
        PropagationAPI.prototype.fields = function () {
          return this._getGlobalPropagator().fields()
        }
        PropagationAPI.prototype.disable = function () {
          n.unregisterGlobal(g, c.DiagAPI.instance())
        }
        PropagationAPI.prototype._getGlobalPropagator = function () {
          return n.getGlobal(g) || l
        }
        return PropagationAPI
      })()
      t.PropagationAPI = p
    },
    3293: (e, t, r) => {
      Object.defineProperty(t, '__esModule', { value: true })
      t.TraceAPI = void 0
      var n = r(4346)
      var a = r(2688)
      var o = r(9294)
      var i = r(3421)
      var u = r(6647)
      var c = 'trace'
      var g = (function () {
        function TraceAPI() {
          this._proxyTracerProvider = new a.ProxyTracerProvider()
          this.wrapSpanContext = o.wrapSpanContext
          this.isSpanContextValid = o.isSpanContextValid
          this.deleteSpan = i.deleteSpan
          this.getSpan = i.getSpan
          this.getSpanContext = i.getSpanContext
          this.setSpan = i.setSpan
          this.setSpanContext = i.setSpanContext
        }
        TraceAPI.getInstance = function () {
          if (!this._instance) {
            this._instance = new TraceAPI()
          }
          return this._instance
        }
        TraceAPI.prototype.setGlobalTracerProvider = function (e) {
          var t = n.registerGlobal(
            c,
            this._proxyTracerProvider,
            u.DiagAPI.instance()
          )
          if (t) {
            this._proxyTracerProvider.setDelegate(e)
          }
          return t
        }
        TraceAPI.prototype.getTracerProvider = function () {
          return n.getGlobal(c) || this._proxyTracerProvider
        }
        TraceAPI.prototype.getTracer = function (e, t) {
          return this.getTracerProvider().getTracer(e, t)
        }
        TraceAPI.prototype.disable = function () {
          n.unregisterGlobal(c, u.DiagAPI.instance())
          this._proxyTracerProvider = new a.ProxyTracerProvider()
        }
        return TraceAPI
      })()
      t.TraceAPI = g
    },
    7066: (e, t, r) => {
      Object.defineProperty(t, '__esModule', { value: true })
      t.deleteBaggage = t.setBaggage = t.getBaggage = void 0
      var n = r(7088)
      var a = n.createContextKey('OpenTelemetry Baggage Key')
      function getBaggage(e) {
        return e.getValue(a) || undefined
      }
      t.getBaggage = getBaggage
      function setBaggage(e, t) {
        return e.setValue(a, t)
      }
      t.setBaggage = setBaggage
      function deleteBaggage(e) {
        return e.deleteValue(a)
      }
      t.deleteBaggage = deleteBaggage
    },
    7870: (e, t) => {
      Object.defineProperty(t, '__esModule', { value: true })
      t.BaggageImpl = void 0
      var r = (function () {
        function BaggageImpl(e) {
          this._entries = e ? new Map(e) : new Map()
        }
        BaggageImpl.prototype.getEntry = function (e) {
          var t = this._entries.get(e)
          if (!t) {
            return undefined
          }
          return Object.assign({}, t)
        }
        BaggageImpl.prototype.getAllEntries = function () {
          return Array.from(this._entries.entries()).map(function (e) {
            var t = e[0],
              r = e[1]
            return [t, r]
          })
        }
        BaggageImpl.prototype.setEntry = function (e, t) {
          var r = new BaggageImpl(this._entries)
          r._entries.set(e, t)
          return r
        }
        BaggageImpl.prototype.removeEntry = function (e) {
          var t = new BaggageImpl(this._entries)
          t._entries.delete(e)
          return t
        }
        BaggageImpl.prototype.removeEntries = function () {
          var e = []
          for (var t = 0; t < arguments.length; t++) {
            e[t] = arguments[t]
          }
          var r = new BaggageImpl(this._entries)
          for (var n = 0, a = e; n < a.length; n++) {
            var o = a[n]
            r._entries.delete(o)
          }
          return r
        }
        BaggageImpl.prototype.clear = function () {
          return new BaggageImpl()
        }
        return BaggageImpl
      })()
      t.BaggageImpl = r
    },
    7797: (e, t) => {
      Object.defineProperty(t, '__esModule', { value: true })
      t.baggageEntryMetadataSymbol = void 0
      t.baggageEntryMetadataSymbol = Symbol('BaggageEntryMetadata')
    },
    3992: (e, t) => {
      Object.defineProperty(t, '__esModule', { value: true })
    },
    8170: (e, t, r) => {
      Object.defineProperty(t, '__esModule', { value: true })
      t.baggageEntryMetadataFromString = t.createBaggage = void 0
      var n = r(6647)
      var a = r(7870)
      var o = r(7797)
      var i = n.DiagAPI.instance()
      function createBaggage(e) {
        if (e === void 0) {
          e = {}
        }
        return new a.BaggageImpl(new Map(Object.entries(e)))
      }
      t.createBaggage = createBaggage
      function baggageEntryMetadataFromString(e) {
        if (typeof e !== 'string') {
          i.error(
            'Cannot create baggage metadata from unknown type: ' + typeof e
          )
          e = ''
        }
        return {
          __TYPE__: o.baggageEntryMetadataSymbol,
          toString: function () {
            return e
          },
        }
      }
      t.baggageEntryMetadataFromString = baggageEntryMetadataFromString
    },
    530: (e, t) => {
      Object.defineProperty(t, '__esModule', { value: true })
    },
    7437: (e, t) => {
      Object.defineProperty(t, '__esModule', { value: true })
    },
    4247: (e, t) => {
      Object.defineProperty(t, '__esModule', { value: true })
    },
    129: function (e, t, r) {
      var n =
        (this && this.__spreadArray) ||
        function (e, t) {
          for (var r = 0, n = t.length, a = e.length; r < n; r++, a++)
            e[a] = t[r]
          return e
        }
      Object.defineProperty(t, '__esModule', { value: true })
      t.NoopContextManager = void 0
      var a = r(7088)
      var o = (function () {
        function NoopContextManager() {}
        NoopContextManager.prototype.active = function () {
          return a.ROOT_CONTEXT
        }
        NoopContextManager.prototype.with = function (e, t, r) {
          var a = []
          for (var o = 3; o < arguments.length; o++) {
            a[o - 3] = arguments[o]
          }
          return t.call.apply(t, n([r], a))
        }
        NoopContextManager.prototype.bind = function (e, t) {
          return t
        }
        NoopContextManager.prototype.enable = function () {
          return this
        }
        NoopContextManager.prototype.disable = function () {
          return this
        }
        return NoopContextManager
      })()
      t.NoopContextManager = o
    },
    7088: (e, t) => {
      Object.defineProperty(t, '__esModule', { value: true })
      t.ROOT_CONTEXT = t.createContextKey = void 0
      function createContextKey(e) {
        return Symbol.for(e)
      }
      t.createContextKey = createContextKey
      var r = (function () {
        function BaseContext(e) {
          var t = this
          t._currentContext = e ? new Map(e) : new Map()
          t.getValue = function (e) {
            return t._currentContext.get(e)
          }
          t.setValue = function (e, r) {
            var n = new BaseContext(t._currentContext)
            n._currentContext.set(e, r)
            return n
          }
          t.deleteValue = function (e) {
            var r = new BaseContext(t._currentContext)
            r._currentContext.delete(e)
            return r
          }
        }
        return BaseContext
      })()
      t.ROOT_CONTEXT = new r()
    },
    1989: (e, t) => {
      Object.defineProperty(t, '__esModule', { value: true })
    },
    9434: (e, t, r) => {
      Object.defineProperty(t, '__esModule', { value: true })
      t.DiagComponentLogger = void 0
      var n = r(4346)
      var a = (function () {
        function DiagComponentLogger(e) {
          this._namespace = e.namespace || 'DiagComponentLogger'
        }
        DiagComponentLogger.prototype.debug = function () {
          var e = []
          for (var t = 0; t < arguments.length; t++) {
            e[t] = arguments[t]
          }
          return logProxy('debug', this._namespace, e)
        }
        DiagComponentLogger.prototype.error = function () {
          var e = []
          for (var t = 0; t < arguments.length; t++) {
            e[t] = arguments[t]
          }
          return logProxy('error', this._namespace, e)
        }
        DiagComponentLogger.prototype.info = function () {
          var e = []
          for (var t = 0; t < arguments.length; t++) {
            e[t] = arguments[t]
          }
          return logProxy('info', this._namespace, e)
        }
        DiagComponentLogger.prototype.warn = function () {
          var e = []
          for (var t = 0; t < arguments.length; t++) {
            e[t] = arguments[t]
          }
          return logProxy('warn', this._namespace, e)
        }
        DiagComponentLogger.prototype.verbose = function () {
          var e = []
          for (var t = 0; t < arguments.length; t++) {
            e[t] = arguments[t]
          }
          return logProxy('verbose', this._namespace, e)
        }
        return DiagComponentLogger
      })()
      t.DiagComponentLogger = a
      function logProxy(e, t, r) {
        var a = n.getGlobal('diag')
        if (!a) {
          return
        }
        r.unshift(t)
        return a[e].apply(a, r)
      }
    },
    9286: (e, t) => {
      Object.defineProperty(t, '__esModule', { value: true })
      t.DiagConsoleLogger = void 0
      var r = [
        { n: 'error', c: 'error' },
        { n: 'warn', c: 'warn' },
        { n: 'info', c: 'info' },
        { n: 'debug', c: 'debug' },
        { n: 'verbose', c: 'trace' },
      ]
      var n = (function () {
        function DiagConsoleLogger() {
          function _consoleFunc(e) {
            return function () {
              var t = []
              for (var r = 0; r < arguments.length; r++) {
                t[r] = arguments[r]
              }
              if (console) {
                var n = console[e]
                if (typeof n !== 'function') {
                  n = console.log
                }
                if (typeof n === 'function') {
                  return n.apply(console, t)
                }
              }
            }
          }
          for (var e = 0; e < r.length; e++) {
            this[r[e].n] = _consoleFunc(r[e].c)
          }
        }
        return DiagConsoleLogger
      })()
      t.DiagConsoleLogger = n
    },
    4939: function (e, t, r) {
      var n =
        (this && this.__createBinding) ||
        (Object.create
          ? function (e, t, r, n) {
              if (n === undefined) n = r
              Object.defineProperty(e, n, {
                enumerable: true,
                get: function () {
                  return t[r]
                },
              })
            }
          : function (e, t, r, n) {
              if (n === undefined) n = r
              e[n] = t[r]
            })
      var a =
        (this && this.__exportStar) ||
        function (e, t) {
          for (var r in e)
            if (r !== 'default' && !Object.prototype.hasOwnProperty.call(t, r))
              n(t, e, r)
        }
      Object.defineProperty(t, '__esModule', { value: true })
      a(r(9286), t)
      a(r(7348), t)
    },
    6427: (e, t, r) => {
      Object.defineProperty(t, '__esModule', { value: true })
      t.createLogLevelDiagLogger = void 0
      var n = r(7348)
      function createLogLevelDiagLogger(e, t) {
        if (e < n.DiagLogLevel.NONE) {
          e = n.DiagLogLevel.NONE
        } else if (e > n.DiagLogLevel.ALL) {
          e = n.DiagLogLevel.ALL
        }
        t = t || {}
        function _filterFunc(r, n) {
          var a = t[r]
          if (typeof a === 'function' && e >= n) {
            return a.bind(t)
          }
          return function () {}
        }
        return {
          error: _filterFunc('error', n.DiagLogLevel.ERROR),
          warn: _filterFunc('warn', n.DiagLogLevel.WARN),
          info: _filterFunc('info', n.DiagLogLevel.INFO),
          debug: _filterFunc('debug', n.DiagLogLevel.DEBUG),
          verbose: _filterFunc('verbose', n.DiagLogLevel.VERBOSE),
        }
      }
      t.createLogLevelDiagLogger = createLogLevelDiagLogger
    },
    7348: (e, t) => {
      Object.defineProperty(t, '__esModule', { value: true })
      t.DiagLogLevel = void 0
      var r
      ;(function (e) {
        e[(e['NONE'] = 0)] = 'NONE'
        e[(e['ERROR'] = 30)] = 'ERROR'
        e[(e['WARN'] = 50)] = 'WARN'
        e[(e['INFO'] = 60)] = 'INFO'
        e[(e['DEBUG'] = 70)] = 'DEBUG'
        e[(e['VERBOSE'] = 80)] = 'VERBOSE'
        e[(e['ALL'] = 9999)] = 'ALL'
      })((r = t.DiagLogLevel || (t.DiagLogLevel = {})))
    },
    2687: function (e, t, r) {
      var n =
        (this && this.__createBinding) ||
        (Object.create
          ? function (e, t, r, n) {
              if (n === undefined) n = r
              Object.defineProperty(e, n, {
                enumerable: true,
                get: function () {
                  return t[r]
                },
              })
            }
          : function (e, t, r, n) {
              if (n === undefined) n = r
              e[n] = t[r]
            })
      var a =
        (this && this.__exportStar) ||
        function (e, t) {
          for (var r in e)
            if (r !== 'default' && !Object.prototype.hasOwnProperty.call(t, r))
              n(t, e, r)
        }
      Object.defineProperty(t, '__esModule', { value: true })
      t.diag =
        t.propagation =
        t.trace =
        t.context =
        t.INVALID_SPAN_CONTEXT =
        t.INVALID_TRACEID =
        t.INVALID_SPANID =
        t.isValidSpanId =
        t.isValidTraceId =
        t.isSpanContextValid =
        t.createTraceState =
        t.baggageEntryMetadataFromString =
          void 0
      a(r(3992), t)
      var o = r(8170)
      Object.defineProperty(t, 'baggageEntryMetadataFromString', {
        enumerable: true,
        get: function () {
          return o.baggageEntryMetadataFromString
        },
      })
      a(r(7437), t)
      a(r(4247), t)
      a(r(530), t)
      a(r(4939), t)
      a(r(769), t)
      a(r(4447), t)
      a(r(4870), t)
      a(r(9539), t)
      a(r(2688), t)
      a(r(4557), t)
      a(r(499), t)
      a(r(5685), t)
      a(r(679), t)
      a(r(8520), t)
      a(r(8e3), t)
      a(r(6976), t)
      a(r(2817), t)
      a(r(6528), t)
      var i = r(4091)
      Object.defineProperty(t, 'createTraceState', {
        enumerable: true,
        get: function () {
          return i.createTraceState
        },
      })
      a(r(2921), t)
      a(r(6583), t)
      a(r(7931), t)
      var u = r(9294)
      Object.defineProperty(t, 'isSpanContextValid', {
        enumerable: true,
        get: function () {
          return u.isSpanContextValid
        },
      })
      Object.defineProperty(t, 'isValidTraceId', {
        enumerable: true,
        get: function () {
          return u.isValidTraceId
        },
      })
      Object.defineProperty(t, 'isValidSpanId', {
        enumerable: true,
        get: function () {
          return u.isValidSpanId
        },
      })
      var c = r(5834)
      Object.defineProperty(t, 'INVALID_SPANID', {
        enumerable: true,
        get: function () {
          return c.INVALID_SPANID
        },
      })
      Object.defineProperty(t, 'INVALID_TRACEID', {
        enumerable: true,
        get: function () {
          return c.INVALID_TRACEID
        },
      })
      Object.defineProperty(t, 'INVALID_SPAN_CONTEXT', {
        enumerable: true,
        get: function () {
          return c.INVALID_SPAN_CONTEXT
        },
      })
      a(r(7088), t)
      a(r(1989), t)
      var g = r(35)
      t.context = g.ContextAPI.getInstance()
      var l = r(3293)
      t.trace = l.TraceAPI.getInstance()
      var p = r(1108)
      t.propagation = p.PropagationAPI.getInstance()
      var s = r(6647)
      t.diag = s.DiagAPI.instance()
      t['default'] = {
        trace: t.trace,
        context: t.context,
        propagation: t.propagation,
        diag: t.diag,
      }
    },
    4346: (e, t, r) => {
      Object.defineProperty(t, '__esModule', { value: true })
      t.unregisterGlobal = t.getGlobal = t.registerGlobal = void 0
      var n = r(5257)
      var a = r(2196)
      var o = r(6505)
      var i = a.VERSION.split('.')[0]
      var u = Symbol.for('opentelemetry.js.api.' + i)
      var c = n._globalThis
      function registerGlobal(e, t, r, n) {
        var o
        if (n === void 0) {
          n = false
        }
        var i = (c[u] =
          (o = c[u]) !== null && o !== void 0 ? o : { version: a.VERSION })
        if (!n && i[e]) {
          var g = new Error(
            '@opentelemetry/api: Attempted duplicate registration of API: ' + e
          )
          r.error(g.stack || g.message)
          return false
        }
        if (i.version !== a.VERSION) {
          var g = new Error(
            '@opentelemetry/api: All API registration versions must match'
          )
          r.error(g.stack || g.message)
          return false
        }
        i[e] = t
        r.debug(
          '@opentelemetry/api: Registered a global for ' +
            e +
            ' v' +
            a.VERSION +
            '.'
        )
        return true
      }
      t.registerGlobal = registerGlobal
      function getGlobal(e) {
        var t, r
        var n = (t = c[u]) === null || t === void 0 ? void 0 : t.version
        if (!n || !o.isCompatible(n)) {
          return
        }
        return (r = c[u]) === null || r === void 0 ? void 0 : r[e]
      }
      t.getGlobal = getGlobal
      function unregisterGlobal(e, t) {
        t.debug(
          '@opentelemetry/api: Unregistering a global for ' +
            e +
            ' v' +
            a.VERSION +
            '.'
        )
        var r = c[u]
        if (r) {
          delete r[e]
        }
      }
      t.unregisterGlobal = unregisterGlobal
    },
    6505: (e, t, r) => {
      Object.defineProperty(t, '__esModule', { value: true })
      t.isCompatible = t._makeCompatibilityCheck = void 0
      var n = r(2196)
      var a = /^(\d+)\.(\d+)\.(\d+)(-(.+))?$/
      function _makeCompatibilityCheck(e) {
        var t = new Set([e])
        var r = new Set()
        var n = e.match(a)
        if (!n) {
          return function () {
            return false
          }
        }
        var o = { major: +n[1], minor: +n[2], patch: +n[3], prerelease: n[4] }
        if (o.prerelease != null) {
          return function isExactmatch(t) {
            return t === e
          }
        }
        function _reject(e) {
          r.add(e)
          return false
        }
        function _accept(e) {
          t.add(e)
          return true
        }
        return function isCompatible(e) {
          if (t.has(e)) {
            return true
          }
          if (r.has(e)) {
            return false
          }
          var n = e.match(a)
          if (!n) {
            return _reject(e)
          }
          var i = { major: +n[1], minor: +n[2], patch: +n[3], prerelease: n[4] }
          if (i.prerelease != null) {
            return _reject(e)
          }
          if (o.major !== i.major) {
            return _reject(e)
          }
          if (o.major === 0) {
            if (o.minor === i.minor && o.patch <= i.patch) {
              return _accept(e)
            }
            return _reject(e)
          }
          if (o.minor <= i.minor) {
            return _accept(e)
          }
          return _reject(e)
        }
      }
      t._makeCompatibilityCheck = _makeCompatibilityCheck
      t.isCompatible = _makeCompatibilityCheck(n.VERSION)
    },
    5257: function (e, t, r) {
      var n =
        (this && this.__createBinding) ||
        (Object.create
          ? function (e, t, r, n) {
              if (n === undefined) n = r
              Object.defineProperty(e, n, {
                enumerable: true,
                get: function () {
                  return t[r]
                },
              })
            }
          : function (e, t, r, n) {
              if (n === undefined) n = r
              e[n] = t[r]
            })
      var a =
        (this && this.__exportStar) ||
        function (e, t) {
          for (var r in e)
            if (r !== 'default' && !Object.prototype.hasOwnProperty.call(t, r))
              n(t, e, r)
        }
      Object.defineProperty(t, '__esModule', { value: true })
      a(r(6504), t)
    },
    2076: (e, t) => {
      Object.defineProperty(t, '__esModule', { value: true })
      t._globalThis = void 0
      t._globalThis = typeof globalThis === 'object' ? globalThis : global
    },
    6504: function (e, t, r) {
      var n =
        (this && this.__createBinding) ||
        (Object.create
          ? function (e, t, r, n) {
              if (n === undefined) n = r
              Object.defineProperty(e, n, {
                enumerable: true,
                get: function () {
                  return t[r]
                },
              })
            }
          : function (e, t, r, n) {
              if (n === undefined) n = r
              e[n] = t[r]
            })
      var a =
        (this && this.__exportStar) ||
        function (e, t) {
          for (var r in e)
            if (r !== 'default' && !Object.prototype.hasOwnProperty.call(t, r))
              n(t, e, r)
        }
      Object.defineProperty(t, '__esModule', { value: true })
      a(r(2076), t)
    },
    5321: (e, t) => {
      Object.defineProperty(t, '__esModule', { value: true })
      t.NoopTextMapPropagator = void 0
      var r = (function () {
        function NoopTextMapPropagator() {}
        NoopTextMapPropagator.prototype.inject = function (e, t) {}
        NoopTextMapPropagator.prototype.extract = function (e, t) {
          return e
        }
        NoopTextMapPropagator.prototype.fields = function () {
          return []
        }
        return NoopTextMapPropagator
      })()
      t.NoopTextMapPropagator = r
    },
    769: (e, t) => {
      Object.defineProperty(t, '__esModule', { value: true })
      t.defaultTextMapSetter = t.defaultTextMapGetter = void 0
      t.defaultTextMapGetter = {
        get: function (e, t) {
          if (e == null) {
            return undefined
          }
          return e[t]
        },
        keys: function (e) {
          if (e == null) {
            return []
          }
          return Object.keys(e)
        },
      }
      t.defaultTextMapSetter = {
        set: function (e, t, r) {
          if (e == null) {
            return
          }
          e[t] = r
        },
      }
    },
    1733: (e, t, r) => {
      Object.defineProperty(t, '__esModule', { value: true })
      t.NonRecordingSpan = void 0
      var n = r(5834)
      var a = (function () {
        function NonRecordingSpan(e) {
          if (e === void 0) {
            e = n.INVALID_SPAN_CONTEXT
          }
          this._spanContext = e
        }
        NonRecordingSpan.prototype.spanContext = function () {
          return this._spanContext
        }
        NonRecordingSpan.prototype.setAttribute = function (e, t) {
          return this
        }
        NonRecordingSpan.prototype.setAttributes = function (e) {
          return this
        }
        NonRecordingSpan.prototype.addEvent = function (e, t) {
          return this
        }
        NonRecordingSpan.prototype.setStatus = function (e) {
          return this
        }
        NonRecordingSpan.prototype.updateName = function (e) {
          return this
        }
        NonRecordingSpan.prototype.end = function (e) {}
        NonRecordingSpan.prototype.isRecording = function () {
          return false
        }
        NonRecordingSpan.prototype.recordException = function (e, t) {}
        return NonRecordingSpan
      })()
      t.NonRecordingSpan = a
    },
    5945: (e, t, r) => {
      Object.defineProperty(t, '__esModule', { value: true })
      t.NoopTracer = void 0
      var n = r(35)
      var a = r(3421)
      var o = r(1733)
      var i = r(9294)
      var u = n.ContextAPI.getInstance()
      var c = (function () {
        function NoopTracer() {}
        NoopTracer.prototype.startSpan = function (e, t, r) {
          var n = Boolean(t === null || t === void 0 ? void 0 : t.root)
          if (n) {
            return new o.NonRecordingSpan()
          }
          var u = r && a.getSpanContext(r)
          if (isSpanContext(u) && i.isSpanContextValid(u)) {
            return new o.NonRecordingSpan(u)
          } else {
            return new o.NonRecordingSpan()
          }
        }
        NoopTracer.prototype.startActiveSpan = function (e, t, r, n) {
          var o
          var i
          var c
          if (arguments.length < 2) {
            return
          } else if (arguments.length === 2) {
            c = t
          } else if (arguments.length === 3) {
            o = t
            c = r
          } else {
            o = t
            i = r
            c = n
          }
          var g = i !== null && i !== void 0 ? i : u.active()
          var l = this.startSpan(e, o, g)
          var p = a.setSpan(g, l)
          return u.with(p, c, undefined, l)
        }
        return NoopTracer
      })()
      t.NoopTracer = c
      function isSpanContext(e) {
        return (
          typeof e === 'object' &&
          typeof e['spanId'] === 'string' &&
          typeof e['traceId'] === 'string' &&
          typeof e['traceFlags'] === 'number'
        )
      }
    },
    9585: (e, t, r) => {
      Object.defineProperty(t, '__esModule', { value: true })
      t.NoopTracerProvider = void 0
      var n = r(5945)
      var a = (function () {
        function NoopTracerProvider() {}
        NoopTracerProvider.prototype.getTracer = function (e, t, r) {
          return new n.NoopTracer()
        }
        return NoopTracerProvider
      })()
      t.NoopTracerProvider = a
    },
    9539: (e, t, r) => {
      Object.defineProperty(t, '__esModule', { value: true })
      t.ProxyTracer = void 0
      var n = r(5945)
      var a = new n.NoopTracer()
      var o = (function () {
        function ProxyTracer(e, t, r, n) {
          this._provider = e
          this.name = t
          this.version = r
          this.options = n
        }
        ProxyTracer.prototype.startSpan = function (e, t, r) {
          return this._getTracer().startSpan(e, t, r)
        }
        ProxyTracer.prototype.startActiveSpan = function (e, t, r, n) {
          var a = this._getTracer()
          return Reflect.apply(a.startActiveSpan, a, arguments)
        }
        ProxyTracer.prototype._getTracer = function () {
          if (this._delegate) {
            return this._delegate
          }
          var e = this._provider.getDelegateTracer(
            this.name,
            this.version,
            this.options
          )
          if (!e) {
            return a
          }
          this._delegate = e
          return this._delegate
        }
        return ProxyTracer
      })()
      t.ProxyTracer = o
    },
    2688: (e, t, r) => {
      Object.defineProperty(t, '__esModule', { value: true })
      t.ProxyTracerProvider = void 0
      var n = r(9539)
      var a = r(9585)
      var o = new a.NoopTracerProvider()
      var i = (function () {
        function ProxyTracerProvider() {}
        ProxyTracerProvider.prototype.getTracer = function (e, t, r) {
          var a
          return (a = this.getDelegateTracer(e, t, r)) !== null && a !== void 0
            ? a
            : new n.ProxyTracer(this, e, t, r)
        }
        ProxyTracerProvider.prototype.getDelegate = function () {
          var e
          return (e = this._delegate) !== null && e !== void 0 ? e : o
        }
        ProxyTracerProvider.prototype.setDelegate = function (e) {
          this._delegate = e
        }
        ProxyTracerProvider.prototype.getDelegateTracer = function (e, t, r) {
          var n
          return (n = this._delegate) === null || n === void 0
            ? void 0
            : n.getTracer(e, t, r)
        }
        return ProxyTracerProvider
      })()
      t.ProxyTracerProvider = i
    },
    4557: (e, t) => {
      Object.defineProperty(t, '__esModule', { value: true })
    },
    499: (e, t) => {
      Object.defineProperty(t, '__esModule', { value: true })
      t.SamplingDecision = void 0
      var r
      ;(function (e) {
        e[(e['NOT_RECORD'] = 0)] = 'NOT_RECORD'
        e[(e['RECORD'] = 1)] = 'RECORD'
        e[(e['RECORD_AND_SAMPLED'] = 2)] = 'RECORD_AND_SAMPLED'
      })((r = t.SamplingDecision || (t.SamplingDecision = {})))
    },
    8e3: (e, t) => {
      Object.defineProperty(t, '__esModule', { value: true })
    },
    4447: (e, t) => {
      Object.defineProperty(t, '__esModule', { value: true })
    },
    3421: (e, t, r) => {
      Object.defineProperty(t, '__esModule', { value: true })
      t.getSpanContext =
        t.setSpanContext =
        t.deleteSpan =
        t.setSpan =
        t.getSpan =
          void 0
      var n = r(7088)
      var a = r(1733)
      var o = n.createContextKey('OpenTelemetry Context Key SPAN')
      function getSpan(e) {
        return e.getValue(o) || undefined
      }
      t.getSpan = getSpan
      function setSpan(e, t) {
        return e.setValue(o, t)
      }
      t.setSpan = setSpan
      function deleteSpan(e) {
        return e.deleteValue(o)
      }
      t.deleteSpan = deleteSpan
      function setSpanContext(e, t) {
        return setSpan(e, new a.NonRecordingSpan(t))
      }
      t.setSpanContext = setSpanContext
      function getSpanContext(e) {
        var t
        return (t = getSpan(e)) === null || t === void 0
          ? void 0
          : t.spanContext()
      }
      t.getSpanContext = getSpanContext
    },
    1452: (e, t, r) => {
      Object.defineProperty(t, '__esModule', { value: true })
      t.TraceStateImpl = void 0
      var n = r(5144)
      var a = 32
      var o = 512
      var i = ','
      var u = '='
      var c = (function () {
        function TraceStateImpl(e) {
          this._internalState = new Map()
          if (e) this._parse(e)
        }
        TraceStateImpl.prototype.set = function (e, t) {
          var r = this._clone()
          if (r._internalState.has(e)) {
            r._internalState.delete(e)
          }
          r._internalState.set(e, t)
          return r
        }
        TraceStateImpl.prototype.unset = function (e) {
          var t = this._clone()
          t._internalState.delete(e)
          return t
        }
        TraceStateImpl.prototype.get = function (e) {
          return this._internalState.get(e)
        }
        TraceStateImpl.prototype.serialize = function () {
          var e = this
          return this._keys()
            .reduce(function (t, r) {
              t.push(r + u + e.get(r))
              return t
            }, [])
            .join(i)
        }
        TraceStateImpl.prototype._parse = function (e) {
          if (e.length > o) return
          this._internalState = e
            .split(i)
            .reverse()
            .reduce(function (e, t) {
              var r = t.trim()
              var a = r.indexOf(u)
              if (a !== -1) {
                var o = r.slice(0, a)
                var i = r.slice(a + 1, t.length)
                if (n.validateKey(o) && n.validateValue(i)) {
                  e.set(o, i)
                } else {
                }
              }
              return e
            }, new Map())
          if (this._internalState.size > a) {
            this._internalState = new Map(
              Array.from(this._internalState.entries()).reverse().slice(0, a)
            )
          }
        }
        TraceStateImpl.prototype._keys = function () {
          return Array.from(this._internalState.keys()).reverse()
        }
        TraceStateImpl.prototype._clone = function () {
          var e = new TraceStateImpl()
          e._internalState = new Map(this._internalState)
          return e
        }
        return TraceStateImpl
      })()
      t.TraceStateImpl = c
    },
    5144: (e, t) => {
      Object.defineProperty(t, '__esModule', { value: true })
      t.validateValue = t.validateKey = void 0
      var r = '[_0-9a-z-*/]'
      var n = '[a-z]' + r + '{0,255}'
      var a = '[a-z0-9]' + r + '{0,240}@[a-z]' + r + '{0,13}'
      var o = new RegExp('^(?:' + n + '|' + a + ')$')
      var i = /^[ -~]{0,255}[!-~]$/
      var u = /,|=/
      function validateKey(e) {
        return o.test(e)
      }
      t.validateKey = validateKey
      function validateValue(e) {
        return i.test(e) && !u.test(e)
      }
      t.validateValue = validateValue
    },
    4091: (e, t, r) => {
      Object.defineProperty(t, '__esModule', { value: true })
      t.createTraceState = void 0
      var n = r(1452)
      function createTraceState(e) {
        return new n.TraceStateImpl(e)
      }
      t.createTraceState = createTraceState
    },
    5834: (e, t, r) => {
      Object.defineProperty(t, '__esModule', { value: true })
      t.INVALID_SPAN_CONTEXT = t.INVALID_TRACEID = t.INVALID_SPANID = void 0
      var n = r(2817)
      t.INVALID_SPANID = '0000000000000000'
      t.INVALID_TRACEID = '00000000000000000000000000000000'
      t.INVALID_SPAN_CONTEXT = {
        traceId: t.INVALID_TRACEID,
        spanId: t.INVALID_SPANID,
        traceFlags: n.TraceFlags.NONE,
      }
    },
    4870: (e, t) => {
      Object.defineProperty(t, '__esModule', { value: true })
    },
    8520: (e, t) => {
      Object.defineProperty(t, '__esModule', { value: true })
    },
    5685: (e, t) => {
      Object.defineProperty(t, '__esModule', { value: true })
    },
    679: (e, t) => {
      Object.defineProperty(t, '__esModule', { value: true })
      t.SpanKind = void 0
      var r
      ;(function (e) {
        e[(e['INTERNAL'] = 0)] = 'INTERNAL'
        e[(e['SERVER'] = 1)] = 'SERVER'
        e[(e['CLIENT'] = 2)] = 'CLIENT'
        e[(e['PRODUCER'] = 3)] = 'PRODUCER'
        e[(e['CONSUMER'] = 4)] = 'CONSUMER'
      })((r = t.SpanKind || (t.SpanKind = {})))
    },
    9294: (e, t, r) => {
      Object.defineProperty(t, '__esModule', { value: true })
      t.wrapSpanContext =
        t.isSpanContextValid =
        t.isValidSpanId =
        t.isValidTraceId =
          void 0
      var n = r(5834)
      var a = r(1733)
      var o = /^([0-9a-f]{32})$/i
      var i = /^[0-9a-f]{16}$/i
      function isValidTraceId(e) {
        return o.test(e) && e !== n.INVALID_TRACEID
      }
      t.isValidTraceId = isValidTraceId
      function isValidSpanId(e) {
        return i.test(e) && e !== n.INVALID_SPANID
      }
      t.isValidSpanId = isValidSpanId
      function isSpanContextValid(e) {
        return isValidTraceId(e.traceId) && isValidSpanId(e.spanId)
      }
      t.isSpanContextValid = isSpanContextValid
      function wrapSpanContext(e) {
        return new a.NonRecordingSpan(e)
      }
      t.wrapSpanContext = wrapSpanContext
    },
    6976: (e, t) => {
      Object.defineProperty(t, '__esModule', { value: true })
      t.SpanStatusCode = void 0
      var r
      ;(function (e) {
        e[(e['UNSET'] = 0)] = 'UNSET'
        e[(e['OK'] = 1)] = 'OK'
        e[(e['ERROR'] = 2)] = 'ERROR'
      })((r = t.SpanStatusCode || (t.SpanStatusCode = {})))
    },
    2817: (e, t) => {
      Object.defineProperty(t, '__esModule', { value: true })
      t.TraceFlags = void 0
      var r
      ;(function (e) {
        e[(e['NONE'] = 0)] = 'NONE'
        e[(e['SAMPLED'] = 1)] = 'SAMPLED'
      })((r = t.TraceFlags || (t.TraceFlags = {})))
    },
    6528: (e, t) => {
      Object.defineProperty(t, '__esModule', { value: true })
    },
    6583: (e, t) => {
      Object.defineProperty(t, '__esModule', { value: true })
    },
    7931: (e, t) => {
      Object.defineProperty(t, '__esModule', { value: true })
    },
    2921: (e, t) => {
      Object.defineProperty(t, '__esModule', { value: true })
    },
    2196: (e, t) => {
      Object.defineProperty(t, '__esModule', { value: true })
      t.VERSION = void 0
      t.VERSION = '1.1.0'
    },
  }
  var t = {}
  function __nccwpck_require__(r) {
    var n = t[r]
    if (n !== undefined) {
      return n.exports
    }
    var a = (t[r] = { exports: {} })
    var o = true
    try {
      e[r].call(a.exports, a, a.exports, __nccwpck_require__)
      o = false
    } finally {
      if (o) delete t[r]
    }
    return a.exports
  }
  if (typeof __nccwpck_require__ !== 'undefined')
    __nccwpck_require__.ab = __dirname + '/'
  var r = __nccwpck_require__(2687)
  module.exports = r
})()
