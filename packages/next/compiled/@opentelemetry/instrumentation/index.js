;(() => {
  var e = {
    8123: (e, r) => {
      'use strict'
      Object.defineProperty(r, '__esModule', { value: true })
      r.NOOP_OBSERVABLE_UP_DOWN_COUNTER_METRIC =
        r.NOOP_OBSERVABLE_GAUGE_METRIC =
        r.NOOP_OBSERVABLE_COUNTER_METRIC =
        r.NOOP_UP_DOWN_COUNTER_METRIC =
        r.NOOP_HISTOGRAM_METRIC =
        r.NOOP_COUNTER_METRIC =
        r.NOOP_METER =
        r.NoopObservableUpDownCounterMetric =
        r.NoopObservableGaugeMetric =
        r.NoopObservableCounterMetric =
        r.NoopObservableMetric =
        r.NoopHistogramMetric =
        r.NoopUpDownCounterMetric =
        r.NoopCounterMetric =
        r.NoopMetric =
        r.NoopMeter =
          void 0
      class NoopMeter {
        constructor() {}
        createHistogram(e, t) {
          return r.NOOP_HISTOGRAM_METRIC
        }
        createCounter(e, t) {
          return r.NOOP_COUNTER_METRIC
        }
        createUpDownCounter(e, t) {
          return r.NOOP_UP_DOWN_COUNTER_METRIC
        }
        createObservableGauge(e, t) {
          return r.NOOP_OBSERVABLE_GAUGE_METRIC
        }
        createObservableCounter(e, t) {
          return r.NOOP_OBSERVABLE_COUNTER_METRIC
        }
        createObservableUpDownCounter(e, t) {
          return r.NOOP_OBSERVABLE_UP_DOWN_COUNTER_METRIC
        }
        addBatchObservableCallback(e, r) {}
        removeBatchObservableCallback(e) {}
      }
      r.NoopMeter = NoopMeter
      class NoopMetric {}
      r.NoopMetric = NoopMetric
      class NoopCounterMetric extends NoopMetric {
        add(e, r) {}
      }
      r.NoopCounterMetric = NoopCounterMetric
      class NoopUpDownCounterMetric extends NoopMetric {
        add(e, r) {}
      }
      r.NoopUpDownCounterMetric = NoopUpDownCounterMetric
      class NoopHistogramMetric extends NoopMetric {
        record(e, r) {}
      }
      r.NoopHistogramMetric = NoopHistogramMetric
      class NoopObservableMetric {
        addCallback(e) {}
        removeCallback(e) {}
      }
      r.NoopObservableMetric = NoopObservableMetric
      class NoopObservableCounterMetric extends NoopObservableMetric {}
      r.NoopObservableCounterMetric = NoopObservableCounterMetric
      class NoopObservableGaugeMetric extends NoopObservableMetric {}
      r.NoopObservableGaugeMetric = NoopObservableGaugeMetric
      class NoopObservableUpDownCounterMetric extends NoopObservableMetric {}
      r.NoopObservableUpDownCounterMetric = NoopObservableUpDownCounterMetric
      r.NOOP_METER = new NoopMeter()
      r.NOOP_COUNTER_METRIC = new NoopCounterMetric()
      r.NOOP_HISTOGRAM_METRIC = new NoopHistogramMetric()
      r.NOOP_UP_DOWN_COUNTER_METRIC = new NoopUpDownCounterMetric()
      r.NOOP_OBSERVABLE_COUNTER_METRIC = new NoopObservableCounterMetric()
      r.NOOP_OBSERVABLE_GAUGE_METRIC = new NoopObservableGaugeMetric()
      r.NOOP_OBSERVABLE_UP_DOWN_COUNTER_METRIC =
        new NoopObservableUpDownCounterMetric()
    },
    8767: (e, r, t) => {
      'use strict'
      Object.defineProperty(r, '__esModule', { value: true })
      r.NOOP_METER_PROVIDER = r.NoopMeterProvider = void 0
      const n = t(8123)
      class NoopMeterProvider {
        getMeter(e, r, t) {
          return n.NOOP_METER
        }
      }
      r.NoopMeterProvider = NoopMeterProvider
      r.NOOP_METER_PROVIDER = new NoopMeterProvider()
    },
    9501: (e, r, t) => {
      'use strict'
      Object.defineProperty(r, '__esModule', { value: true })
      r.API_BACKWARDS_COMPATIBILITY_VERSION =
        r.makeGetter =
        r._global =
        r.GLOBAL_METRICS_API_KEY =
          void 0
      const n = t(3949)
      r.GLOBAL_METRICS_API_KEY = Symbol.for('io.opentelemetry.js.api.metrics')
      r._global = n._globalThis
      function makeGetter(e, r, t) {
        return (n) => (n === e ? r : t)
      }
      r.makeGetter = makeGetter
      r.API_BACKWARDS_COMPATIBILITY_VERSION = 4
    },
    3040: (e, r, t) => {
      'use strict'
      Object.defineProperty(r, '__esModule', { value: true })
      r.MetricsAPI = void 0
      const n = t(8767)
      const o = t(9501)
      class MetricsAPI {
        constructor() {}
        static getInstance() {
          if (!this._instance) {
            this._instance = new MetricsAPI()
          }
          return this._instance
        }
        setGlobalMeterProvider(e) {
          if (o._global[o.GLOBAL_METRICS_API_KEY]) {
            return this.getMeterProvider()
          }
          o._global[o.GLOBAL_METRICS_API_KEY] = (0, o.makeGetter)(
            o.API_BACKWARDS_COMPATIBILITY_VERSION,
            e,
            n.NOOP_METER_PROVIDER
          )
          return e
        }
        getMeterProvider() {
          var e, r
          return (r =
            (e = o._global[o.GLOBAL_METRICS_API_KEY]) === null || e === void 0
              ? void 0
              : e.call(o._global, o.API_BACKWARDS_COMPATIBILITY_VERSION)) !==
            null && r !== void 0
            ? r
            : n.NOOP_METER_PROVIDER
        }
        getMeter(e, r, t) {
          return this.getMeterProvider().getMeter(e, r, t)
        }
        disable() {
          delete o._global[o.GLOBAL_METRICS_API_KEY]
        }
      }
      r.MetricsAPI = MetricsAPI
    },
    2180: function (e, r, t) {
      'use strict'
      var n =
        (this && this.__createBinding) ||
        (Object.create
          ? function (e, r, t, n) {
              if (n === undefined) n = t
              Object.defineProperty(e, n, {
                enumerable: true,
                get: function () {
                  return r[t]
                },
              })
            }
          : function (e, r, t, n) {
              if (n === undefined) n = t
              e[n] = r[t]
            })
      var o =
        (this && this.__exportStar) ||
        function (e, r) {
          for (var t in e)
            if (t !== 'default' && !Object.prototype.hasOwnProperty.call(r, t))
              n(r, e, t)
        }
      Object.defineProperty(r, '__esModule', { value: true })
      r.metrics = void 0
      o(t(8123), r)
      o(t(8767), r)
      o(t(9896), r)
      o(t(9525), r)
      o(t(5343), r)
      o(t(2315), r)
      const i = t(3040)
      r.metrics = i.MetricsAPI.getInstance()
    },
    3949: function (e, r, t) {
      'use strict'
      var n =
        (this && this.__createBinding) ||
        (Object.create
          ? function (e, r, t, n) {
              if (n === undefined) n = t
              Object.defineProperty(e, n, {
                enumerable: true,
                get: function () {
                  return r[t]
                },
              })
            }
          : function (e, r, t, n) {
              if (n === undefined) n = t
              e[n] = r[t]
            })
      var o =
        (this && this.__exportStar) ||
        function (e, r) {
          for (var t in e)
            if (t !== 'default' && !Object.prototype.hasOwnProperty.call(r, t))
              n(r, e, t)
        }
      Object.defineProperty(r, '__esModule', { value: true })
      o(t(1297), r)
    },
    4058: (e, r) => {
      'use strict'
      Object.defineProperty(r, '__esModule', { value: true })
      r._globalThis = void 0
      r._globalThis = typeof globalThis === 'object' ? globalThis : global
    },
    1297: function (e, r, t) {
      'use strict'
      var n =
        (this && this.__createBinding) ||
        (Object.create
          ? function (e, r, t, n) {
              if (n === undefined) n = t
              Object.defineProperty(e, n, {
                enumerable: true,
                get: function () {
                  return r[t]
                },
              })
            }
          : function (e, r, t, n) {
              if (n === undefined) n = t
              e[n] = r[t]
            })
      var o =
        (this && this.__exportStar) ||
        function (e, r) {
          for (var t in e)
            if (t !== 'default' && !Object.prototype.hasOwnProperty.call(r, t))
              n(r, e, t)
        }
      Object.defineProperty(r, '__esModule', { value: true })
      o(t(4058), r)
    },
    9896: (e, r) => {
      'use strict'
      Object.defineProperty(r, '__esModule', { value: true })
    },
    9525: (e, r) => {
      'use strict'
      Object.defineProperty(r, '__esModule', { value: true })
    },
    5343: (e, r) => {
      'use strict'
      Object.defineProperty(r, '__esModule', { value: true })
      r.ValueType = void 0
      var t
      ;(function (e) {
        e[(e['INT'] = 0)] = 'INT'
        e[(e['DOUBLE'] = 1)] = 'DOUBLE'
      })((t = r.ValueType || (r.ValueType = {})))
    },
    2315: (e, r) => {
      'use strict'
      Object.defineProperty(r, '__esModule', { value: true })
    },
    9047: (e, r, t) => {
      'use strict'
      Object.defineProperty(r, '__esModule', { value: true })
      r.registerInstrumentations = void 0
      const n = t(8720)
      const o = t(2180)
      const i = t(7907)
      function registerInstrumentations(e) {
        const { instrumentations: r } = (0, i.parseInstrumentationOptions)(
          e.instrumentations
        )
        const t = e.tracerProvider || n.trace.getTracerProvider()
        const s = e.meterProvider || o.metrics.getMeterProvider()
        ;(0, i.enableInstrumentations)(r, t, s)
        return () => {
          ;(0, i.disableInstrumentations)(r)
        }
      }
      r.registerInstrumentations = registerInstrumentations
    },
    7907: (e, r) => {
      'use strict'
      Object.defineProperty(r, '__esModule', { value: true })
      r.disableInstrumentations =
        r.enableInstrumentations =
        r.parseInstrumentationOptions =
          void 0
      function parseInstrumentationOptions(e = []) {
        let r = []
        for (let t = 0, n = e.length; t < n; t++) {
          const n = e[t]
          if (Array.isArray(n)) {
            const e = parseInstrumentationOptions(n)
            r = r.concat(e.instrumentations)
          } else if (typeof n === 'function') {
            r.push(new n())
          } else if (n.instrumentationName) {
            r.push(n)
          }
        }
        return { instrumentations: r }
      }
      r.parseInstrumentationOptions = parseInstrumentationOptions
      function enableInstrumentations(e, r, t) {
        for (let n = 0, o = e.length; n < o; n++) {
          const o = e[n]
          if (r) {
            o.setTracerProvider(r)
          }
          if (t) {
            o.setMeterProvider(t)
          }
          if (!o.getConfig().enabled) {
            o.enable()
          }
        }
      }
      r.enableInstrumentations = enableInstrumentations
      function disableInstrumentations(e) {
        e.forEach((e) => e.disable())
      }
      r.disableInstrumentations = disableInstrumentations
    },
    3391: function (e, r, t) {
      'use strict'
      var n =
        (this && this.__createBinding) ||
        (Object.create
          ? function (e, r, t, n) {
              if (n === undefined) n = t
              Object.defineProperty(e, n, {
                enumerable: true,
                get: function () {
                  return r[t]
                },
              })
            }
          : function (e, r, t, n) {
              if (n === undefined) n = t
              e[n] = r[t]
            })
      var o =
        (this && this.__exportStar) ||
        function (e, r) {
          for (var t in e)
            if (t !== 'default' && !Object.prototype.hasOwnProperty.call(r, t))
              n(r, e, t)
        }
      Object.defineProperty(r, '__esModule', { value: true })
      o(t(9047), r)
      o(t(6667), r)
      o(t(5868), r)
      o(t(6293), r)
      o(t(4467), r)
    },
    9475: (e, r, t) => {
      'use strict'
      Object.defineProperty(r, '__esModule', { value: true })
      r.InstrumentationAbstract = void 0
      const n = t(8720)
      const o = t(2180)
      const i = t(1670)
      class InstrumentationAbstract {
        constructor(e, r, t = {}) {
          this.instrumentationName = e
          this.instrumentationVersion = r
          this._wrap = i.wrap
          this._unwrap = i.unwrap
          this._massWrap = i.massWrap
          this._massUnwrap = i.massUnwrap
          this._config = Object.assign({ enabled: true }, t)
          this._diag = n.diag.createComponentLogger({ namespace: e })
          this._tracer = n.trace.getTracer(e, r)
          this._meter = o.metrics.getMeter(e, r)
        }
        get meter() {
          return this._meter
        }
        setMeterProvider(e) {
          this._meter = e.getMeter(
            this.instrumentationName,
            this.instrumentationVersion
          )
        }
        getConfig() {
          return this._config
        }
        setConfig(e = {}) {
          this._config = Object.assign({}, e)
        }
        setTracerProvider(e) {
          this._tracer = e.getTracer(
            this.instrumentationName,
            this.instrumentationVersion
          )
        }
        get tracer() {
          return this._tracer
        }
      }
      r.InstrumentationAbstract = InstrumentationAbstract
    },
    6667: function (e, r, t) {
      'use strict'
      var n =
        (this && this.__createBinding) ||
        (Object.create
          ? function (e, r, t, n) {
              if (n === undefined) n = t
              Object.defineProperty(e, n, {
                enumerable: true,
                get: function () {
                  return r[t]
                },
              })
            }
          : function (e, r, t, n) {
              if (n === undefined) n = t
              e[n] = r[t]
            })
      var o =
        (this && this.__exportStar) ||
        function (e, r) {
          for (var t in e)
            if (t !== 'default' && !Object.prototype.hasOwnProperty.call(r, t))
              n(r, e, t)
        }
      Object.defineProperty(r, '__esModule', { value: true })
      o(t(5784), r)
    },
    5784: function (e, r, t) {
      'use strict'
      var n =
        (this && this.__createBinding) ||
        (Object.create
          ? function (e, r, t, n) {
              if (n === undefined) n = t
              Object.defineProperty(e, n, {
                enumerable: true,
                get: function () {
                  return r[t]
                },
              })
            }
          : function (e, r, t, n) {
              if (n === undefined) n = t
              e[n] = r[t]
            })
      var o =
        (this && this.__exportStar) ||
        function (e, r) {
          for (var t in e)
            if (t !== 'default' && !Object.prototype.hasOwnProperty.call(r, t))
              n(r, e, t)
        }
      Object.defineProperty(r, '__esModule', { value: true })
      o(t(9093), r)
      o(t(5242), r)
      o(t(6634), r)
      o(t(7085), r)
    },
    9093: (e, r, t) => {
      'use strict'
      Object.defineProperty(r, '__esModule', { value: true })
      r.InstrumentationBase = void 0
      const n = t(1017)
      const o = t(6154)
      const i = t(7849)
      const s = t(9475)
      const a = t(8720)
      class InstrumentationBase extends s.InstrumentationAbstract {
        constructor(e, r, t = {}) {
          super(e, r, t)
          this._hooks = []
          this._enabled = false
          let n = this.init()
          if (n && !Array.isArray(n)) {
            n = [n]
          }
          this._modules = n || []
          if (this._modules.length === 0) {
            a.diag.warn(
              'No modules instrumentation has been defined,' +
                ' nothing will be patched'
            )
          }
          if (this._config.enabled) {
            this.enable()
          }
        }
        _warnOnPreloadedModules() {
          this._modules.forEach((e) => {
            const { name: r } = e
            try {
              const e = require.resolve(r)
              if (require.cache[e]) {
                this._diag.warn(
                  `Module ${r} has been loaded before ${this.instrumentationName} so it might not work, please initialize it before requiring ${r}`
                )
              }
            } catch (e) {}
          })
        }
        _extractPackageVersion(e) {
          try {
            const r = require(n.join(e, 'package.json')).version
            return typeof r === 'string' ? r : undefined
          } catch (r) {
            a.diag.warn('Failed extracting version', e)
          }
          return undefined
        }
        _onRequire(e, r, t, n) {
          var o
          if (!n) {
            if (typeof e.patch === 'function') {
              e.moduleExports = r
              if (this._enabled) {
                return e.patch(r)
              }
            }
            return r
          }
          const i = this._extractPackageVersion(n)
          e.moduleVersion = i
          if (e.name === t) {
            if (isSupported(e.supportedVersions, i, e.includePrerelease)) {
              if (typeof e.patch === 'function') {
                e.moduleExports = r
                if (this._enabled) {
                  return e.patch(r, e.moduleVersion)
                }
              }
            }
            return r
          }
          const s = (o = e.files) !== null && o !== void 0 ? o : []
          const a = s
            .filter((e) => e.name === t)
            .filter((r) =>
              isSupported(r.supportedVersions, i, e.includePrerelease)
            )
          return a.reduce((r, t) => {
            t.moduleExports = r
            if (this._enabled) {
              return t.patch(r, e.moduleVersion)
            }
            return r
          }, r)
        }
        enable() {
          if (this._enabled) {
            return
          }
          this._enabled = true
          if (this._hooks.length > 0) {
            for (const e of this._modules) {
              if (typeof e.patch === 'function' && e.moduleExports) {
                e.patch(e.moduleExports, e.moduleVersion)
              }
              for (const r of e.files) {
                if (r.moduleExports) {
                  r.patch(r.moduleExports, e.moduleVersion)
                }
              }
            }
            return
          }
          this._warnOnPreloadedModules()
          for (const e of this._modules) {
            this._hooks.push(
              o([e.name], { internals: true }, (r, t, n) =>
                this._onRequire(e, r, t, n)
              )
            )
          }
        }
        disable() {
          if (!this._enabled) {
            return
          }
          this._enabled = false
          for (const e of this._modules) {
            if (typeof e.unpatch === 'function' && e.moduleExports) {
              e.unpatch(e.moduleExports, e.moduleVersion)
            }
            for (const r of e.files) {
              if (r.moduleExports) {
                r.unpatch(r.moduleExports, e.moduleVersion)
              }
            }
          }
        }
        isEnabled() {
          return this._enabled
        }
      }
      r.InstrumentationBase = InstrumentationBase
      function isSupported(e, r, t) {
        if (typeof r === 'undefined') {
          return e.includes('*')
        }
        return e.some((e) => (0, i.satisfies)(r, e, { includePrerelease: t }))
      }
    },
    5242: (e, r) => {
      'use strict'
      Object.defineProperty(r, '__esModule', { value: true })
      r.InstrumentationNodeModuleDefinition = void 0
      class InstrumentationNodeModuleDefinition {
        constructor(e, r, t, n, o) {
          this.name = e
          this.supportedVersions = r
          this.patch = t
          this.unpatch = n
          this.files = o || []
        }
      }
      r.InstrumentationNodeModuleDefinition =
        InstrumentationNodeModuleDefinition
    },
    6634: (e, r, t) => {
      'use strict'
      Object.defineProperty(r, '__esModule', { value: true })
      r.InstrumentationNodeModuleFile = void 0
      const n = t(1017)
      class InstrumentationNodeModuleFile {
        constructor(e, r, t, o) {
          this.supportedVersions = r
          this.patch = t
          this.unpatch = o
          this.name = (0, n.normalize)(e)
        }
      }
      r.InstrumentationNodeModuleFile = InstrumentationNodeModuleFile
    },
    7085: (e, r) => {
      'use strict'
      Object.defineProperty(r, '__esModule', { value: true })
    },
    5868: (e, r) => {
      'use strict'
      Object.defineProperty(r, '__esModule', { value: true })
    },
    6293: (e, r) => {
      'use strict'
      Object.defineProperty(r, '__esModule', { value: true })
    },
    4467: (e, r) => {
      'use strict'
      Object.defineProperty(r, '__esModule', { value: true })
      r.isWrapped =
        r.safeExecuteInTheMiddleAsync =
        r.safeExecuteInTheMiddle =
          void 0
      function safeExecuteInTheMiddle(e, r, t) {
        let n
        let o
        try {
          o = e()
        } catch (e) {
          n = e
        } finally {
          r(n, o)
          if (n && !t) {
            throw n
          }
          return o
        }
      }
      r.safeExecuteInTheMiddle = safeExecuteInTheMiddle
      async function safeExecuteInTheMiddleAsync(e, r, t) {
        let n
        let o
        try {
          o = await e()
        } catch (e) {
          n = e
        } finally {
          r(n, o)
          if (n && !t) {
            throw n
          }
          return o
        }
      }
      r.safeExecuteInTheMiddleAsync = safeExecuteInTheMiddleAsync
      function isWrapped(e) {
        return (
          typeof e === 'function' &&
          typeof e.__original === 'function' &&
          typeof e.__unwrap === 'function' &&
          e.__wrapped === true
        )
      }
      r.isWrapped = isWrapped
    },
    2426: (e) => {
      'use strict'
      var r = 'Function.prototype.bind called on incompatible '
      var t = Array.prototype.slice
      var n = Object.prototype.toString
      var o = '[object Function]'
      e.exports = function bind(e) {
        var i = this
        if (typeof i !== 'function' || n.call(i) !== o) {
          throw new TypeError(r + i)
        }
        var s = t.call(arguments, 1)
        var a
        var binder = function () {
          if (this instanceof a) {
            var r = i.apply(this, s.concat(t.call(arguments)))
            if (Object(r) === r) {
              return r
            }
            return this
          } else {
            return i.apply(e, s.concat(t.call(arguments)))
          }
        }
        var u = Math.max(0, i.length - s.length)
        var c = []
        for (var l = 0; l < u; l++) {
          c.push('$' + l)
        }
        a = Function(
          'binder',
          'return function (' +
            c.join(',') +
            '){ return binder.apply(this,arguments); }'
        )(binder)
        if (i.prototype) {
          var d = function Empty() {}
          d.prototype = i.prototype
          a.prototype = new d()
          d.prototype = null
        }
        return a
      }
    },
    2174: (e, r, t) => {
      'use strict'
      var n = t(2426)
      e.exports = Function.prototype.bind || n
    },
    101: (e, r, t) => {
      'use strict'
      var n = t(2174)
      e.exports = n.call(Function.call, Object.prototype.hasOwnProperty)
    },
    6765: (e, r, t) => {
      'use strict'
      var n = t(101)
      function specifierIncluded(e, r) {
        var t = e.split('.')
        var n = r.split(' ')
        var o = n.length > 1 ? n[0] : '='
        var i = (n.length > 1 ? n[1] : n[0]).split('.')
        for (var s = 0; s < 3; ++s) {
          var a = parseInt(t[s] || 0, 10)
          var u = parseInt(i[s] || 0, 10)
          if (a === u) {
            continue
          }
          if (o === '<') {
            return a < u
          }
          if (o === '>=') {
            return a >= u
          }
          return false
        }
        return o === '>='
      }
      function matchesRange(e, r) {
        var t = r.split(/ ?&& ?/)
        if (t.length === 0) {
          return false
        }
        for (var n = 0; n < t.length; ++n) {
          if (!specifierIncluded(e, t[n])) {
            return false
          }
        }
        return true
      }
      function versionIncluded(e, r) {
        if (typeof r === 'boolean') {
          return r
        }
        var t =
          typeof e === 'undefined'
            ? process.versions && process.versions.node
            : e
        if (typeof t !== 'string') {
          throw new TypeError(
            typeof e === 'undefined'
              ? 'Unable to determine current node version'
              : 'If provided, a valid node version is required'
          )
        }
        if (r && typeof r === 'object') {
          for (var n = 0; n < r.length; ++n) {
            if (matchesRange(t, r[n])) {
              return true
            }
          }
          return false
        }
        return matchesRange(t, r)
      }
      var o = t(5209)
      e.exports = function isCore(e, r) {
        return n(o, e) && versionIncluded(r, o[e])
      }
    },
    7604: (e, r, t) => {
      'use strict'
      var n = t(1017)
      e.exports = function (e) {
        var r = e.split(n.sep)
        var t = r.lastIndexOf('node_modules')
        if (t === -1) return
        if (!r[t + 1]) return
        var o = r[t + 1][0] === '@'
        var i = o ? r[t + 1] + '/' + r[t + 2] : r[t + 1]
        var s = o ? 3 : 2
        return {
          name: i,
          basedir: r.slice(0, t + s).join(n.sep),
          path: r.slice(t + s).join(n.sep),
        }
      }
    },
    1894: (e) => {
      'use strict'
      var r = process.platform === 'win32'
      var t =
        /^(((?:[a-zA-Z]:|[\\\/]{2}[^\\\/]+[\\\/]+[^\\\/]+)?[\\\/]?)(?:[^\\\/]*[\\\/])*)((\.{1,2}|[^\\\/]+?|)(\.[^.\/\\]*|))[\\\/]*$/
      var n = {}
      function win32SplitPath(e) {
        return t.exec(e).slice(1)
      }
      n.parse = function (e) {
        if (typeof e !== 'string') {
          throw new TypeError(
            "Parameter 'pathString' must be a string, not " + typeof e
          )
        }
        var r = win32SplitPath(e)
        if (!r || r.length !== 5) {
          throw new TypeError("Invalid path '" + e + "'")
        }
        return {
          root: r[1],
          dir: r[0] === r[1] ? r[0] : r[0].slice(0, -1),
          base: r[2],
          ext: r[4],
          name: r[3],
        }
      }
      var o = /^((\/?)(?:[^\/]*\/)*)((\.{1,2}|[^\/]+?|)(\.[^.\/]*|))[\/]*$/
      var i = {}
      function posixSplitPath(e) {
        return o.exec(e).slice(1)
      }
      i.parse = function (e) {
        if (typeof e !== 'string') {
          throw new TypeError(
            "Parameter 'pathString' must be a string, not " + typeof e
          )
        }
        var r = posixSplitPath(e)
        if (!r || r.length !== 5) {
          throw new TypeError("Invalid path '" + e + "'")
        }
        return {
          root: r[1],
          dir: r[0].slice(0, -1),
          base: r[2],
          ext: r[4],
          name: r[3],
        }
      }
      if (r) e.exports = n.parse
      else e.exports = i.parse
      e.exports.posix = i.parse
      e.exports.win32 = n.parse
    },
    6154: (e, r, t) => {
      'use strict'
      const n = t(1017)
      const o = t(8188)
      const i = t(742)
      const s = t(6937)('require-in-the-middle')
      const a = t(7604)
      e.exports = Hook
      let u
      if (o.isBuiltin) {
        u = o.isBuiltin
      } else {
        u = (e) => !!i.core[e]
      }
      const c = /([/\\]index)?(\.js)?$/
      function Hook(e, r, c) {
        if (this instanceof Hook === false) return new Hook(e, r, c)
        if (typeof e === 'function') {
          c = e
          e = null
          r = null
        } else if (typeof r === 'function') {
          c = r
          r = null
        }
        if (typeof o._resolveFilename !== 'function') {
          console.error(
            'Error: Expected Module._resolveFilename to be a function (was: %s) - aborting!',
            typeof o._resolveFilename
          )
          console.error(
            'Please report this error as an issue related to Node.js %s at %s',
            process.version,
            t(3502).eN.H
          )
          return
        }
        this.cache = new Map()
        this._unhooked = false
        this._origRequire = o.prototype.require
        const l = this
        const d = new Set()
        const p = r ? r.internals === true : false
        const f = Array.isArray(e)
        s('registering require hook')
        this._require = o.prototype.require = function (r) {
          if (l._unhooked === true) {
            s('ignoring require call - module is soft-unhooked')
            return l._origRequire.apply(this, arguments)
          }
          const t = u(r)
          let _
          if (t) {
            _ = r
            if (r.startsWith('node:')) {
              const e = r.slice(5)
              if (u(e)) {
                _ = e
              }
            }
          } else {
            _ = o._resolveFilename(r, this)
          }
          let v, m
          s(
            "processing %s module require('%s'): %s",
            t === true ? 'core' : 'non-core',
            r,
            _
          )
          if (l.cache.has(_) === true) {
            s('returning already patched cached module: %s', _)
            return l.cache.get(_)
          }
          const h = d.has(_)
          if (h === false) {
            d.add(_)
          }
          const g = l._origRequire.apply(this, arguments)
          if (h === true) {
            s(
              'module is in the process of being patched already - ignoring: %s',
              _
            )
            return g
          }
          d.delete(_)
          if (t === true) {
            if (f === true && e.includes(_) === false) {
              s('ignoring core module not on whitelist: %s', _)
              return g
            }
            v = _
          } else if (f === true && e.includes(_)) {
            const e = n.parse(_)
            v = e.name
            m = e.dir
          } else {
            const t = a(_)
            if (t === undefined) {
              s('could not parse filename: %s', _)
              return g
            }
            v = t.name
            m = t.basedir
            const o = resolveModuleName(t)
            s(
              'resolved filename to module: %s (id: %s, resolved: %s, basedir: %s)',
              v,
              r,
              o,
              m
            )
            if (f === true && e.includes(v) === false) {
              if (e.includes(o) === false) return g
              v = o
            } else {
              let e
              try {
                e = i.sync(v, { basedir: m })
              } catch (e) {
                s('could not resolve module: %s', v)
                return g
              }
              if (e !== _) {
                if (p === true) {
                  v = v + n.sep + n.relative(m, _)
                  s('preparing to process require of internal file: %s', v)
                } else {
                  s('ignoring require of non-main module file: %s', e)
                  return g
                }
              }
            }
          }
          if (l.cache.has(_) === false) {
            l.cache.set(_, g)
            s('calling require hook: %s', v)
            l.cache.set(_, c(g, v, m))
          }
          s('returning module: %s', v)
          return l.cache.get(_)
        }
      }
      Hook.prototype.unhook = function () {
        this._unhooked = true
        if (this._require === o.prototype.require) {
          o.prototype.require = this._origRequire
          s('unhook successful')
        } else {
          s('unhook unsuccessful')
        }
      }
      function resolveModuleName(e) {
        const r = n.sep !== '/' ? e.path.split(n.sep).join('/') : e.path
        return n.posix.join(e.name, r).replace(c, '')
      }
    },
    742: (e, r, t) => {
      var n = t(5495)
      n.core = t(8939)
      n.isCore = t(1520)
      n.sync = t(5782)
      e.exports = n
    },
    5495: (e, r, t) => {
      var n = t(7147)
      var o = t(4801)
      var i = t(1017)
      var s = t(2995)
      var a = t(9345)
      var u = t(5456)
      var c = t(6765)
      var l =
        process.platform !== 'win32' &&
        n.realpath &&
        typeof n.realpath.native === 'function'
          ? n.realpath.native
          : n.realpath
      var d = o()
      var defaultPaths = function () {
        return [i.join(d, '.node_modules'), i.join(d, '.node_libraries')]
      }
      var p = function isFile(e, r) {
        n.stat(e, function (e, t) {
          if (!e) {
            return r(null, t.isFile() || t.isFIFO())
          }
          if (e.code === 'ENOENT' || e.code === 'ENOTDIR') return r(null, false)
          return r(e)
        })
      }
      var f = function isDirectory(e, r) {
        n.stat(e, function (e, t) {
          if (!e) {
            return r(null, t.isDirectory())
          }
          if (e.code === 'ENOENT' || e.code === 'ENOTDIR') return r(null, false)
          return r(e)
        })
      }
      var _ = function realpath(e, r) {
        l(e, function (t, n) {
          if (t && t.code !== 'ENOENT') r(t)
          else r(null, t ? e : n)
        })
      }
      var v = function maybeRealpath(e, r, t, n) {
        if (t && t.preserveSymlinks === false) {
          e(r, n)
        } else {
          n(null, r)
        }
      }
      var m = function defaultReadPackage(e, r, t) {
        e(r, function (e, r) {
          if (e) t(e)
          else {
            try {
              var n = JSON.parse(r)
              t(null, n)
            } catch (e) {
              t(null)
            }
          }
        })
      }
      var h = function getPackageCandidates(e, r, t) {
        var n = a(r, t, e)
        for (var o = 0; o < n.length; o++) {
          n[o] = i.join(n[o], e)
        }
        return n
      }
      e.exports = function resolve(e, r, t) {
        var o = t
        var a = r
        if (typeof r === 'function') {
          o = a
          a = {}
        }
        if (typeof e !== 'string') {
          var l = new TypeError('Path must be a string.')
          return process.nextTick(function () {
            o(l)
          })
        }
        a = u(e, a)
        var d = a.isFile || p
        var g = a.isDirectory || f
        var y = a.readFile || n.readFile
        var b = a.realpath || _
        var O = a.readPackage || m
        if (a.readFile && a.readPackage) {
          var M = new TypeError(
            '`readFile` and `readPackage` are mutually exclusive.'
          )
          return process.nextTick(function () {
            o(M)
          })
        }
        var E = a.packageIterator
        var N = a.extensions || ['.js']
        var w = a.includeCoreModules !== false
        var P = a.basedir || i.dirname(s())
        var I = a.filename || P
        a.paths = a.paths || defaultPaths()
        var A = i.resolve(P)
        v(b, A, a, function (e, r) {
          if (e) o(e)
          else init(r)
        })
        var x
        function init(r) {
          if (/^(?:\.\.?(?:\/|$)|\/|([A-Za-z]:)?[/\\])/.test(e)) {
            x = i.resolve(r, e)
            if (e === '.' || e === '..' || e.slice(-1) === '/') x += '/'
            if (/\/$/.test(e) && x === r) {
              loadAsDirectory(x, a.package, onfile)
            } else loadAsFile(x, a.package, onfile)
          } else if (w && c(e)) {
            return o(null, e)
          } else
            loadNodeModules(e, r, function (r, t, n) {
              if (r) o(r)
              else if (t) {
                return v(b, t, a, function (e, r) {
                  if (e) {
                    o(e)
                  } else {
                    o(null, r, n)
                  }
                })
              } else {
                var i = new Error(
                  "Cannot find module '" + e + "' from '" + I + "'"
                )
                i.code = 'MODULE_NOT_FOUND'
                o(i)
              }
            })
        }
        function onfile(r, t, n) {
          if (r) o(r)
          else if (t) o(null, t, n)
          else
            loadAsDirectory(x, function (r, t, n) {
              if (r) o(r)
              else if (t) {
                v(b, t, a, function (e, r) {
                  if (e) {
                    o(e)
                  } else {
                    o(null, r, n)
                  }
                })
              } else {
                var i = new Error(
                  "Cannot find module '" + e + "' from '" + I + "'"
                )
                i.code = 'MODULE_NOT_FOUND'
                o(i)
              }
            })
        }
        function loadAsFile(e, r, t) {
          var n = r
          var o = t
          if (typeof n === 'function') {
            o = n
            n = undefined
          }
          var s = [''].concat(N)
          load(s, e, n)
          function load(e, r, t) {
            if (e.length === 0) return o(null, undefined, t)
            var n = r + e[0]
            var s = t
            if (s) onpkg(null, s)
            else loadpkg(i.dirname(n), onpkg)
            function onpkg(t, u, c) {
              s = u
              if (t) return o(t)
              if (c && s && a.pathFilter) {
                var l = i.relative(c, n)
                var p = l.slice(0, l.length - e[0].length)
                var f = a.pathFilter(s, r, p)
                if (f) return load([''].concat(N.slice()), i.resolve(c, f), s)
              }
              d(n, onex)
            }
            function onex(t, i) {
              if (t) return o(t)
              if (i) return o(null, n, s)
              load(e.slice(1), r, s)
            }
          }
        }
        function loadpkg(e, r) {
          if (e === '' || e === '/') return r(null)
          if (process.platform === 'win32' && /^\w:[/\\]*$/.test(e)) {
            return r(null)
          }
          if (/[/\\]node_modules[/\\]*$/.test(e)) return r(null)
          v(b, e, a, function (t, n) {
            if (t) return loadpkg(i.dirname(e), r)
            var o = i.join(n, 'package.json')
            d(o, function (t, n) {
              if (!n) return loadpkg(i.dirname(e), r)
              O(y, o, function (t, n) {
                if (t) r(t)
                var i = n
                if (i && a.packageFilter) {
                  i = a.packageFilter(i, o)
                }
                r(null, i, e)
              })
            })
          })
        }
        function loadAsDirectory(e, r, t) {
          var n = t
          var o = r
          if (typeof o === 'function') {
            n = o
            o = a.package
          }
          v(b, e, a, function (r, t) {
            if (r) return n(r)
            var s = i.join(t, 'package.json')
            d(s, function (r, t) {
              if (r) return n(r)
              if (!t) return loadAsFile(i.join(e, 'index'), o, n)
              O(y, s, function (r, t) {
                if (r) return n(r)
                var o = t
                if (o && a.packageFilter) {
                  o = a.packageFilter(o, s)
                }
                if (o && o.main) {
                  if (typeof o.main !== 'string') {
                    var u = new TypeError(
                      'package “' + o.name + '” `main` must be a string'
                    )
                    u.code = 'INVALID_PACKAGE_MAIN'
                    return n(u)
                  }
                  if (o.main === '.' || o.main === './') {
                    o.main = 'index'
                  }
                  loadAsFile(i.resolve(e, o.main), o, function (r, t, o) {
                    if (r) return n(r)
                    if (t) return n(null, t, o)
                    if (!o) return loadAsFile(i.join(e, 'index'), o, n)
                    var s = i.resolve(e, o.main)
                    loadAsDirectory(s, o, function (r, t, o) {
                      if (r) return n(r)
                      if (t) return n(null, t, o)
                      loadAsFile(i.join(e, 'index'), o, n)
                    })
                  })
                  return
                }
                loadAsFile(i.join(e, '/index'), o, n)
              })
            })
          })
        }
        function processDirs(e, r) {
          if (r.length === 0) return e(null, undefined)
          var t = r[0]
          g(i.dirname(t), isdir)
          function isdir(n, o) {
            if (n) return e(n)
            if (!o) return processDirs(e, r.slice(1))
            loadAsFile(t, a.package, onfile)
          }
          function onfile(r, n, o) {
            if (r) return e(r)
            if (n) return e(null, n, o)
            loadAsDirectory(t, a.package, ondir)
          }
          function ondir(t, n, o) {
            if (t) return e(t)
            if (n) return e(null, n, o)
            processDirs(e, r.slice(1))
          }
        }
        function loadNodeModules(e, r, t) {
          var thunk = function () {
            return h(e, r, a)
          }
          processDirs(t, E ? E(e, r, thunk, a) : thunk())
        }
      }
    },
    2995: (e) => {
      e.exports = function () {
        var e = Error.prepareStackTrace
        Error.prepareStackTrace = function (e, r) {
          return r
        }
        var r = new Error().stack
        Error.prepareStackTrace = e
        return r[2].getFileName()
      }
    },
    8939: (e, r, t) => {
      var n =
        (process.versions &&
          process.versions.node &&
          process.versions.node.split('.')) ||
        []
      function specifierIncluded(e) {
        var r = e.split(' ')
        var t = r.length > 1 ? r[0] : '='
        var o = (r.length > 1 ? r[1] : r[0]).split('.')
        for (var i = 0; i < 3; ++i) {
          var s = parseInt(n[i] || 0, 10)
          var a = parseInt(o[i] || 0, 10)
          if (s === a) {
            continue
          }
          if (t === '<') {
            return s < a
          } else if (t === '>=') {
            return s >= a
          }
          return false
        }
        return t === '>='
      }
      function matchesRange(e) {
        var r = e.split(/ ?&& ?/)
        if (r.length === 0) {
          return false
        }
        for (var t = 0; t < r.length; ++t) {
          if (!specifierIncluded(r[t])) {
            return false
          }
        }
        return true
      }
      function versionIncluded(e) {
        if (typeof e === 'boolean') {
          return e
        }
        if (e && typeof e === 'object') {
          for (var r = 0; r < e.length; ++r) {
            if (matchesRange(e[r])) {
              return true
            }
          }
          return false
        }
        return matchesRange(e)
      }
      var o = t(5271)
      var i = {}
      for (var s in o) {
        if (Object.prototype.hasOwnProperty.call(o, s)) {
          i[s] = versionIncluded(o[s])
        }
      }
      e.exports = i
    },
    4801: (e, r, t) => {
      'use strict'
      var n = t(2037)
      e.exports =
        n.homedir ||
        function homedir() {
          var e = process.env.HOME
          var r =
            process.env.LOGNAME ||
            process.env.USER ||
            process.env.LNAME ||
            process.env.USERNAME
          if (process.platform === 'win32') {
            return (
              process.env.USERPROFILE ||
              process.env.HOMEDRIVE + process.env.HOMEPATH ||
              e ||
              null
            )
          }
          if (process.platform === 'darwin') {
            return e || (r ? '/Users/' + r : null)
          }
          if (process.platform === 'linux') {
            return (
              e || (process.getuid() === 0 ? '/root' : r ? '/home/' + r : null)
            )
          }
          return e || null
        }
    },
    1520: (e, r, t) => {
      var n = t(6765)
      e.exports = function isCore(e) {
        return n(e)
      }
    },
    9345: (e, r, t) => {
      var n = t(1017)
      var o = n.parse || t(1894)
      var i = function getNodeModulesDirs(e, r) {
        var t = '/'
        if (/^([A-Za-z]:)/.test(e)) {
          t = ''
        } else if (/^\\\\/.test(e)) {
          t = '\\\\'
        }
        var i = [e]
        var s = o(e)
        while (s.dir !== i[i.length - 1]) {
          i.push(s.dir)
          s = o(s.dir)
        }
        return i.reduce(function (e, o) {
          return e.concat(
            r.map(function (e) {
              return n.resolve(t, o, e)
            })
          )
        }, [])
      }
      e.exports = function nodeModulesPaths(e, r, t) {
        var n =
          r && r.moduleDirectory
            ? [].concat(r.moduleDirectory)
            : ['node_modules']
        if (r && typeof r.paths === 'function') {
          return r.paths(
            t,
            e,
            function () {
              return i(e, n)
            },
            r
          )
        }
        var o = i(e, n)
        return r && r.paths ? o.concat(r.paths) : o
      }
    },
    5456: (e) => {
      e.exports = function (e, r) {
        return r || {}
      }
    },
    5782: (e, r, t) => {
      var n = t(6765)
      var o = t(7147)
      var i = t(1017)
      var s = t(4801)
      var a = t(2995)
      var u = t(9345)
      var c = t(5456)
      var l =
        process.platform !== 'win32' &&
        o.realpathSync &&
        typeof o.realpathSync.native === 'function'
          ? o.realpathSync.native
          : o.realpathSync
      var d = s()
      var defaultPaths = function () {
        return [i.join(d, '.node_modules'), i.join(d, '.node_libraries')]
      }
      var p = function isFile(e) {
        try {
          var r = o.statSync(e, { throwIfNoEntry: false })
        } catch (e) {
          if (e && (e.code === 'ENOENT' || e.code === 'ENOTDIR')) return false
          throw e
        }
        return !!r && (r.isFile() || r.isFIFO())
      }
      var f = function isDirectory(e) {
        try {
          var r = o.statSync(e, { throwIfNoEntry: false })
        } catch (e) {
          if (e && (e.code === 'ENOENT' || e.code === 'ENOTDIR')) return false
          throw e
        }
        return !!r && r.isDirectory()
      }
      var _ = function realpathSync(e) {
        try {
          return l(e)
        } catch (e) {
          if (e.code !== 'ENOENT') {
            throw e
          }
        }
        return e
      }
      var v = function maybeRealpathSync(e, r, t) {
        if (t && t.preserveSymlinks === false) {
          return e(r)
        }
        return r
      }
      var m = function defaultReadPackageSync(e, r) {
        var t = e(r)
        try {
          var n = JSON.parse(t)
          return n
        } catch (e) {}
      }
      var h = function getPackageCandidates(e, r, t) {
        var n = u(r, t, e)
        for (var o = 0; o < n.length; o++) {
          n[o] = i.join(n[o], e)
        }
        return n
      }
      e.exports = function resolveSync(e, r) {
        if (typeof e !== 'string') {
          throw new TypeError('Path must be a string.')
        }
        var t = c(e, r)
        var s = t.isFile || p
        var u = t.readFileSync || o.readFileSync
        var l = t.isDirectory || f
        var d = t.realpathSync || _
        var g = t.readPackageSync || m
        if (t.readFileSync && t.readPackageSync) {
          throw new TypeError(
            '`readFileSync` and `readPackageSync` are mutually exclusive.'
          )
        }
        var y = t.packageIterator
        var b = t.extensions || ['.js']
        var O = t.includeCoreModules !== false
        var M = t.basedir || i.dirname(a())
        var E = t.filename || M
        t.paths = t.paths || defaultPaths()
        var N = v(d, i.resolve(M), t)
        if (/^(?:\.\.?(?:\/|$)|\/|([A-Za-z]:)?[/\\])/.test(e)) {
          var w = i.resolve(N, e)
          if (e === '.' || e === '..' || e.slice(-1) === '/') w += '/'
          var P = loadAsFileSync(w) || loadAsDirectorySync(w)
          if (P) return v(d, P, t)
        } else if (O && n(e)) {
          return e
        } else {
          var I = loadNodeModulesSync(e, N)
          if (I) return v(d, I, t)
        }
        var A = new Error("Cannot find module '" + e + "' from '" + E + "'")
        A.code = 'MODULE_NOT_FOUND'
        throw A
        function loadAsFileSync(e) {
          var r = loadpkg(i.dirname(e))
          if (r && r.dir && r.pkg && t.pathFilter) {
            var n = i.relative(r.dir, e)
            var o = t.pathFilter(r.pkg, e, n)
            if (o) {
              e = i.resolve(r.dir, o)
            }
          }
          if (s(e)) {
            return e
          }
          for (var a = 0; a < b.length; a++) {
            var u = e + b[a]
            if (s(u)) {
              return u
            }
          }
        }
        function loadpkg(e) {
          if (e === '' || e === '/') return
          if (process.platform === 'win32' && /^\w:[/\\]*$/.test(e)) {
            return
          }
          if (/[/\\]node_modules[/\\]*$/.test(e)) return
          var r = i.join(v(d, e, t), 'package.json')
          if (!s(r)) {
            return loadpkg(i.dirname(e))
          }
          var n = g(u, r)
          if (n && t.packageFilter) {
            n = t.packageFilter(n, e)
          }
          return { pkg: n, dir: e }
        }
        function loadAsDirectorySync(e) {
          var r = i.join(v(d, e, t), '/package.json')
          if (s(r)) {
            try {
              var n = g(u, r)
            } catch (e) {}
            if (n && t.packageFilter) {
              n = t.packageFilter(n, e)
            }
            if (n && n.main) {
              if (typeof n.main !== 'string') {
                var o = new TypeError(
                  'package “' + n.name + '” `main` must be a string'
                )
                o.code = 'INVALID_PACKAGE_MAIN'
                throw o
              }
              if (n.main === '.' || n.main === './') {
                n.main = 'index'
              }
              try {
                var a = loadAsFileSync(i.resolve(e, n.main))
                if (a) return a
                var c = loadAsDirectorySync(i.resolve(e, n.main))
                if (c) return c
              } catch (e) {}
            }
          }
          return loadAsFileSync(i.join(e, '/index'))
        }
        function loadNodeModulesSync(e, r) {
          var thunk = function () {
            return h(e, r, t)
          }
          var n = y ? y(e, r, thunk, t) : thunk()
          for (var o = 0; o < n.length; o++) {
            var s = n[o]
            if (l(i.dirname(s))) {
              var a = loadAsFileSync(s)
              if (a) return a
              var u = loadAsDirectorySync(s)
              if (u) return u
            }
          }
        }
      }
    },
    1670: (e) => {
      'use strict'
      function isFunction(e) {
        return typeof e === 'function'
      }
      var r = console.error.bind(console)
      function defineProperty(e, r, t) {
        var n = !!e[r] && e.propertyIsEnumerable(r)
        Object.defineProperty(e, r, {
          configurable: true,
          enumerable: n,
          writable: true,
          value: t,
        })
      }
      function shimmer(e) {
        if (e && e.logger) {
          if (!isFunction(e.logger))
            r("new logger isn't a function, not replacing")
          else r = e.logger
        }
      }
      function wrap(e, t, n) {
        if (!e || !e[t]) {
          r('no original function ' + t + ' to wrap')
          return
        }
        if (!n) {
          r('no wrapper function')
          r(new Error().stack)
          return
        }
        if (!isFunction(e[t]) || !isFunction(n)) {
          r('original object and wrapper must be functions')
          return
        }
        var o = e[t]
        var i = n(o, t)
        defineProperty(i, '__original', o)
        defineProperty(i, '__unwrap', function () {
          if (e[t] === i) defineProperty(e, t, o)
        })
        defineProperty(i, '__wrapped', true)
        defineProperty(e, t, i)
        return i
      }
      function massWrap(e, t, n) {
        if (!e) {
          r('must provide one or more modules to patch')
          r(new Error().stack)
          return
        } else if (!Array.isArray(e)) {
          e = [e]
        }
        if (!(t && Array.isArray(t))) {
          r('must provide one or more functions to wrap on modules')
          return
        }
        e.forEach(function (e) {
          t.forEach(function (r) {
            wrap(e, r, n)
          })
        })
      }
      function unwrap(e, t) {
        if (!e || !e[t]) {
          r('no function to unwrap.')
          r(new Error().stack)
          return
        }
        if (!e[t].__unwrap) {
          r('no original to unwrap to -- has ' + t + ' already been unwrapped?')
        } else {
          return e[t].__unwrap()
        }
      }
      function massUnwrap(e, t) {
        if (!e) {
          r('must provide one or more modules to patch')
          r(new Error().stack)
          return
        } else if (!Array.isArray(e)) {
          e = [e]
        }
        if (!(t && Array.isArray(t))) {
          r('must provide one or more functions to unwrap on modules')
          return
        }
        e.forEach(function (e) {
          t.forEach(function (r) {
            unwrap(e, r)
          })
        })
      }
      shimmer.wrap = wrap
      shimmer.massWrap = massWrap
      shimmer.unwrap = unwrap
      shimmer.massUnwrap = massUnwrap
      e.exports = shimmer
    },
    7147: (e) => {
      'use strict'
      e.exports = require('fs')
    },
    8188: (e) => {
      'use strict'
      e.exports = require('module')
    },
    8720: (e) => {
      'use strict'
      e.exports = require('next/dist/compiled/@opentelemetry/api')
    },
    6937: (e) => {
      'use strict'
      e.exports = require('next/dist/compiled/debug')
    },
    7849: (e) => {
      'use strict'
      e.exports = require('next/dist/compiled/semver')
    },
    2037: (e) => {
      'use strict'
      e.exports = require('os')
    },
    1017: (e) => {
      'use strict'
      e.exports = require('path')
    },
    5209: (e) => {
      'use strict'
      e.exports = JSON.parse(
        '{"assert":true,"node:assert":[">= 14.18 && < 15",">= 16"],"assert/strict":">= 15","node:assert/strict":">= 16","async_hooks":">= 8","node:async_hooks":[">= 14.18 && < 15",">= 16"],"buffer_ieee754":">= 0.5 && < 0.9.7","buffer":true,"node:buffer":[">= 14.18 && < 15",">= 16"],"child_process":true,"node:child_process":[">= 14.18 && < 15",">= 16"],"cluster":">= 0.5","node:cluster":[">= 14.18 && < 15",">= 16"],"console":true,"node:console":[">= 14.18 && < 15",">= 16"],"constants":true,"node:constants":[">= 14.18 && < 15",">= 16"],"crypto":true,"node:crypto":[">= 14.18 && < 15",">= 16"],"_debug_agent":">= 1 && < 8","_debugger":"< 8","dgram":true,"node:dgram":[">= 14.18 && < 15",">= 16"],"diagnostics_channel":[">= 14.17 && < 15",">= 15.1"],"node:diagnostics_channel":[">= 14.18 && < 15",">= 16"],"dns":true,"node:dns":[">= 14.18 && < 15",">= 16"],"dns/promises":">= 15","node:dns/promises":">= 16","domain":">= 0.7.12","node:domain":[">= 14.18 && < 15",">= 16"],"events":true,"node:events":[">= 14.18 && < 15",">= 16"],"freelist":"< 6","fs":true,"node:fs":[">= 14.18 && < 15",">= 16"],"fs/promises":[">= 10 && < 10.1",">= 14"],"node:fs/promises":[">= 14.18 && < 15",">= 16"],"_http_agent":">= 0.11.1","node:_http_agent":[">= 14.18 && < 15",">= 16"],"_http_client":">= 0.11.1","node:_http_client":[">= 14.18 && < 15",">= 16"],"_http_common":">= 0.11.1","node:_http_common":[">= 14.18 && < 15",">= 16"],"_http_incoming":">= 0.11.1","node:_http_incoming":[">= 14.18 && < 15",">= 16"],"_http_outgoing":">= 0.11.1","node:_http_outgoing":[">= 14.18 && < 15",">= 16"],"_http_server":">= 0.11.1","node:_http_server":[">= 14.18 && < 15",">= 16"],"http":true,"node:http":[">= 14.18 && < 15",">= 16"],"http2":">= 8.8","node:http2":[">= 14.18 && < 15",">= 16"],"https":true,"node:https":[">= 14.18 && < 15",">= 16"],"inspector":">= 8","node:inspector":[">= 14.18 && < 15",">= 16"],"inspector/promises":[">= 19"],"node:inspector/promises":[">= 19"],"_linklist":"< 8","module":true,"node:module":[">= 14.18 && < 15",">= 16"],"net":true,"node:net":[">= 14.18 && < 15",">= 16"],"node-inspect/lib/_inspect":">= 7.6 && < 12","node-inspect/lib/internal/inspect_client":">= 7.6 && < 12","node-inspect/lib/internal/inspect_repl":">= 7.6 && < 12","os":true,"node:os":[">= 14.18 && < 15",">= 16"],"path":true,"node:path":[">= 14.18 && < 15",">= 16"],"path/posix":">= 15.3","node:path/posix":">= 16","path/win32":">= 15.3","node:path/win32":">= 16","perf_hooks":">= 8.5","node:perf_hooks":[">= 14.18 && < 15",">= 16"],"process":">= 1","node:process":[">= 14.18 && < 15",">= 16"],"punycode":">= 0.5","node:punycode":[">= 14.18 && < 15",">= 16"],"querystring":true,"node:querystring":[">= 14.18 && < 15",">= 16"],"readline":true,"node:readline":[">= 14.18 && < 15",">= 16"],"readline/promises":">= 17","node:readline/promises":">= 17","repl":true,"node:repl":[">= 14.18 && < 15",">= 16"],"smalloc":">= 0.11.5 && < 3","_stream_duplex":">= 0.9.4","node:_stream_duplex":[">= 14.18 && < 15",">= 16"],"_stream_transform":">= 0.9.4","node:_stream_transform":[">= 14.18 && < 15",">= 16"],"_stream_wrap":">= 1.4.1","node:_stream_wrap":[">= 14.18 && < 15",">= 16"],"_stream_passthrough":">= 0.9.4","node:_stream_passthrough":[">= 14.18 && < 15",">= 16"],"_stream_readable":">= 0.9.4","node:_stream_readable":[">= 14.18 && < 15",">= 16"],"_stream_writable":">= 0.9.4","node:_stream_writable":[">= 14.18 && < 15",">= 16"],"stream":true,"node:stream":[">= 14.18 && < 15",">= 16"],"stream/consumers":">= 16.7","node:stream/consumers":">= 16.7","stream/promises":">= 15","node:stream/promises":">= 16","stream/web":">= 16.5","node:stream/web":">= 16.5","string_decoder":true,"node:string_decoder":[">= 14.18 && < 15",">= 16"],"sys":[">= 0.4 && < 0.7",">= 0.8"],"node:sys":[">= 14.18 && < 15",">= 16"],"node:test":[">= 16.17 && < 17",">= 18"],"timers":true,"node:timers":[">= 14.18 && < 15",">= 16"],"timers/promises":">= 15","node:timers/promises":">= 16","_tls_common":">= 0.11.13","node:_tls_common":[">= 14.18 && < 15",">= 16"],"_tls_legacy":">= 0.11.3 && < 10","_tls_wrap":">= 0.11.3","node:_tls_wrap":[">= 14.18 && < 15",">= 16"],"tls":true,"node:tls":[">= 14.18 && < 15",">= 16"],"trace_events":">= 10","node:trace_events":[">= 14.18 && < 15",">= 16"],"tty":true,"node:tty":[">= 14.18 && < 15",">= 16"],"url":true,"node:url":[">= 14.18 && < 15",">= 16"],"util":true,"node:util":[">= 14.18 && < 15",">= 16"],"util/types":">= 15.3","node:util/types":">= 16","v8/tools/arguments":">= 10 && < 12","v8/tools/codemap":[">= 4.4 && < 5",">= 5.2 && < 12"],"v8/tools/consarray":[">= 4.4 && < 5",">= 5.2 && < 12"],"v8/tools/csvparser":[">= 4.4 && < 5",">= 5.2 && < 12"],"v8/tools/logreader":[">= 4.4 && < 5",">= 5.2 && < 12"],"v8/tools/profile_view":[">= 4.4 && < 5",">= 5.2 && < 12"],"v8/tools/splaytree":[">= 4.4 && < 5",">= 5.2 && < 12"],"v8":">= 1","node:v8":[">= 14.18 && < 15",">= 16"],"vm":true,"node:vm":[">= 14.18 && < 15",">= 16"],"wasi":">= 13.4 && < 13.5","worker_threads":">= 11.7","node:worker_threads":[">= 14.18 && < 15",">= 16"],"zlib":">= 0.5","node:zlib":[">= 14.18 && < 15",">= 16"]}'
      )
    },
    3502: (e) => {
      'use strict'
      e.exports = JSON.parse(
        '{"eN":{"H":"https://github.com/elastic/require-in-the-middle/issues"}}'
      )
    },
    5271: (e) => {
      'use strict'
      e.exports = JSON.parse(
        '{"assert":true,"node:assert":[">= 14.18 && < 15",">= 16"],"assert/strict":">= 15","node:assert/strict":">= 16","async_hooks":">= 8","node:async_hooks":[">= 14.18 && < 15",">= 16"],"buffer_ieee754":">= 0.5 && < 0.9.7","buffer":true,"node:buffer":[">= 14.18 && < 15",">= 16"],"child_process":true,"node:child_process":[">= 14.18 && < 15",">= 16"],"cluster":">= 0.5","node:cluster":[">= 14.18 && < 15",">= 16"],"console":true,"node:console":[">= 14.18 && < 15",">= 16"],"constants":true,"node:constants":[">= 14.18 && < 15",">= 16"],"crypto":true,"node:crypto":[">= 14.18 && < 15",">= 16"],"_debug_agent":">= 1 && < 8","_debugger":"< 8","dgram":true,"node:dgram":[">= 14.18 && < 15",">= 16"],"diagnostics_channel":[">= 14.17 && < 15",">= 15.1"],"node:diagnostics_channel":[">= 14.18 && < 15",">= 16"],"dns":true,"node:dns":[">= 14.18 && < 15",">= 16"],"dns/promises":">= 15","node:dns/promises":">= 16","domain":">= 0.7.12","node:domain":[">= 14.18 && < 15",">= 16"],"events":true,"node:events":[">= 14.18 && < 15",">= 16"],"freelist":"< 6","fs":true,"node:fs":[">= 14.18 && < 15",">= 16"],"fs/promises":[">= 10 && < 10.1",">= 14"],"node:fs/promises":[">= 14.18 && < 15",">= 16"],"_http_agent":">= 0.11.1","node:_http_agent":[">= 14.18 && < 15",">= 16"],"_http_client":">= 0.11.1","node:_http_client":[">= 14.18 && < 15",">= 16"],"_http_common":">= 0.11.1","node:_http_common":[">= 14.18 && < 15",">= 16"],"_http_incoming":">= 0.11.1","node:_http_incoming":[">= 14.18 && < 15",">= 16"],"_http_outgoing":">= 0.11.1","node:_http_outgoing":[">= 14.18 && < 15",">= 16"],"_http_server":">= 0.11.1","node:_http_server":[">= 14.18 && < 15",">= 16"],"http":true,"node:http":[">= 14.18 && < 15",">= 16"],"http2":">= 8.8","node:http2":[">= 14.18 && < 15",">= 16"],"https":true,"node:https":[">= 14.18 && < 15",">= 16"],"inspector":">= 8","node:inspector":[">= 14.18 && < 15",">= 16"],"_linklist":"< 8","module":true,"node:module":[">= 14.18 && < 15",">= 16"],"net":true,"node:net":[">= 14.18 && < 15",">= 16"],"node-inspect/lib/_inspect":">= 7.6 && < 12","node-inspect/lib/internal/inspect_client":">= 7.6 && < 12","node-inspect/lib/internal/inspect_repl":">= 7.6 && < 12","os":true,"node:os":[">= 14.18 && < 15",">= 16"],"path":true,"node:path":[">= 14.18 && < 15",">= 16"],"path/posix":">= 15.3","node:path/posix":">= 16","path/win32":">= 15.3","node:path/win32":">= 16","perf_hooks":">= 8.5","node:perf_hooks":[">= 14.18 && < 15",">= 16"],"process":">= 1","node:process":[">= 14.18 && < 15",">= 16"],"punycode":">= 0.5","node:punycode":[">= 14.18 && < 15",">= 16"],"querystring":true,"node:querystring":[">= 14.18 && < 15",">= 16"],"readline":true,"node:readline":[">= 14.18 && < 15",">= 16"],"readline/promises":">= 17","node:readline/promises":">= 17","repl":true,"node:repl":[">= 14.18 && < 15",">= 16"],"smalloc":">= 0.11.5 && < 3","_stream_duplex":">= 0.9.4","node:_stream_duplex":[">= 14.18 && < 15",">= 16"],"_stream_transform":">= 0.9.4","node:_stream_transform":[">= 14.18 && < 15",">= 16"],"_stream_wrap":">= 1.4.1","node:_stream_wrap":[">= 14.18 && < 15",">= 16"],"_stream_passthrough":">= 0.9.4","node:_stream_passthrough":[">= 14.18 && < 15",">= 16"],"_stream_readable":">= 0.9.4","node:_stream_readable":[">= 14.18 && < 15",">= 16"],"_stream_writable":">= 0.9.4","node:_stream_writable":[">= 14.18 && < 15",">= 16"],"stream":true,"node:stream":[">= 14.18 && < 15",">= 16"],"stream/consumers":">= 16.7","node:stream/consumers":">= 16.7","stream/promises":">= 15","node:stream/promises":">= 16","stream/web":">= 16.5","node:stream/web":">= 16.5","string_decoder":true,"node:string_decoder":[">= 14.18 && < 15",">= 16"],"sys":[">= 0.4 && < 0.7",">= 0.8"],"node:sys":[">= 14.18 && < 15",">= 16"],"node:test":">= 18","timers":true,"node:timers":[">= 14.18 && < 15",">= 16"],"timers/promises":">= 15","node:timers/promises":">= 16","_tls_common":">= 0.11.13","node:_tls_common":[">= 14.18 && < 15",">= 16"],"_tls_legacy":">= 0.11.3 && < 10","_tls_wrap":">= 0.11.3","node:_tls_wrap":[">= 14.18 && < 15",">= 16"],"tls":true,"node:tls":[">= 14.18 && < 15",">= 16"],"trace_events":">= 10","node:trace_events":[">= 14.18 && < 15",">= 16"],"tty":true,"node:tty":[">= 14.18 && < 15",">= 16"],"url":true,"node:url":[">= 14.18 && < 15",">= 16"],"util":true,"node:util":[">= 14.18 && < 15",">= 16"],"util/types":">= 15.3","node:util/types":">= 16","v8/tools/arguments":">= 10 && < 12","v8/tools/codemap":[">= 4.4 && < 5",">= 5.2 && < 12"],"v8/tools/consarray":[">= 4.4 && < 5",">= 5.2 && < 12"],"v8/tools/csvparser":[">= 4.4 && < 5",">= 5.2 && < 12"],"v8/tools/logreader":[">= 4.4 && < 5",">= 5.2 && < 12"],"v8/tools/profile_view":[">= 4.4 && < 5",">= 5.2 && < 12"],"v8/tools/splaytree":[">= 4.4 && < 5",">= 5.2 && < 12"],"v8":">= 1","node:v8":[">= 14.18 && < 15",">= 16"],"vm":true,"node:vm":[">= 14.18 && < 15",">= 16"],"wasi":">= 13.4 && < 13.5","worker_threads":">= 11.7","node:worker_threads":[">= 14.18 && < 15",">= 16"],"zlib":">= 0.5","node:zlib":[">= 14.18 && < 15",">= 16"]}'
      )
    },
  }
  var r = {}
  function __nccwpck_require__(t) {
    var n = r[t]
    if (n !== undefined) {
      return n.exports
    }
    var o = (r[t] = { exports: {} })
    var i = true
    try {
      e[t].call(o.exports, o, o.exports, __nccwpck_require__)
      i = false
    } finally {
      if (i) delete r[t]
    }
    return o.exports
  }
  if (typeof __nccwpck_require__ !== 'undefined')
    __nccwpck_require__.ab = __dirname + '/'
  var t = __nccwpck_require__(3391)
  module.exports = t
})()
