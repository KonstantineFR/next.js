;(() => {
  'use strict'
  var e = {
    6864: (e, t) => {
      Object.defineProperty(t, '__esModule', { value: true })
      t.createNoopMeter =
        t.NOOP_OBSERVABLE_UP_DOWN_COUNTER_METRIC =
        t.NOOP_OBSERVABLE_GAUGE_METRIC =
        t.NOOP_OBSERVABLE_COUNTER_METRIC =
        t.NOOP_UP_DOWN_COUNTER_METRIC =
        t.NOOP_HISTOGRAM_METRIC =
        t.NOOP_COUNTER_METRIC =
        t.NOOP_METER =
        t.NoopObservableUpDownCounterMetric =
        t.NoopObservableGaugeMetric =
        t.NoopObservableCounterMetric =
        t.NoopObservableMetric =
        t.NoopHistogramMetric =
        t.NoopUpDownCounterMetric =
        t.NoopCounterMetric =
        t.NoopMetric =
        t.NoopMeter =
          void 0
      class NoopMeter {
        constructor() {}
        createHistogram(e, r) {
          return t.NOOP_HISTOGRAM_METRIC
        }
        createCounter(e, r) {
          return t.NOOP_COUNTER_METRIC
        }
        createUpDownCounter(e, r) {
          return t.NOOP_UP_DOWN_COUNTER_METRIC
        }
        createObservableGauge(e, r) {
          return t.NOOP_OBSERVABLE_GAUGE_METRIC
        }
        createObservableCounter(e, r) {
          return t.NOOP_OBSERVABLE_COUNTER_METRIC
        }
        createObservableUpDownCounter(e, r) {
          return t.NOOP_OBSERVABLE_UP_DOWN_COUNTER_METRIC
        }
        addBatchObservableCallback(e, t) {}
        removeBatchObservableCallback(e) {}
      }
      t.NoopMeter = NoopMeter
      class NoopMetric {}
      t.NoopMetric = NoopMetric
      class NoopCounterMetric extends NoopMetric {
        add(e, t) {}
      }
      t.NoopCounterMetric = NoopCounterMetric
      class NoopUpDownCounterMetric extends NoopMetric {
        add(e, t) {}
      }
      t.NoopUpDownCounterMetric = NoopUpDownCounterMetric
      class NoopHistogramMetric extends NoopMetric {
        record(e, t) {}
      }
      t.NoopHistogramMetric = NoopHistogramMetric
      class NoopObservableMetric {
        addCallback(e) {}
        removeCallback(e) {}
      }
      t.NoopObservableMetric = NoopObservableMetric
      class NoopObservableCounterMetric extends NoopObservableMetric {}
      t.NoopObservableCounterMetric = NoopObservableCounterMetric
      class NoopObservableGaugeMetric extends NoopObservableMetric {}
      t.NoopObservableGaugeMetric = NoopObservableGaugeMetric
      class NoopObservableUpDownCounterMetric extends NoopObservableMetric {}
      t.NoopObservableUpDownCounterMetric = NoopObservableUpDownCounterMetric
      t.NOOP_METER = new NoopMeter()
      t.NOOP_COUNTER_METRIC = new NoopCounterMetric()
      t.NOOP_HISTOGRAM_METRIC = new NoopHistogramMetric()
      t.NOOP_UP_DOWN_COUNTER_METRIC = new NoopUpDownCounterMetric()
      t.NOOP_OBSERVABLE_COUNTER_METRIC = new NoopObservableCounterMetric()
      t.NOOP_OBSERVABLE_GAUGE_METRIC = new NoopObservableGaugeMetric()
      t.NOOP_OBSERVABLE_UP_DOWN_COUNTER_METRIC =
        new NoopObservableUpDownCounterMetric()
      function createNoopMeter() {
        return t.NOOP_METER
      }
      t.createNoopMeter = createNoopMeter
    },
    3875: (e, t, r) => {
      Object.defineProperty(t, '__esModule', { value: true })
      t.NOOP_METER_PROVIDER = t.NoopMeterProvider = void 0
      const n = r(6864)
      class NoopMeterProvider {
        getMeter(e, t, r) {
          return n.NOOP_METER
        }
      }
      t.NoopMeterProvider = NoopMeterProvider
      t.NOOP_METER_PROVIDER = new NoopMeterProvider()
    },
    9368: (e, t, r) => {
      Object.defineProperty(t, '__esModule', { value: true })
      t.API_BACKWARDS_COMPATIBILITY_VERSION =
        t.makeGetter =
        t._global =
        t.GLOBAL_METRICS_API_KEY =
          void 0
      const n = r(5733)
      t.GLOBAL_METRICS_API_KEY = Symbol.for('io.opentelemetry.js.api.metrics')
      t._global = n._globalThis
      function makeGetter(e, t, r) {
        return (n) => (n === e ? t : r)
      }
      t.makeGetter = makeGetter
      t.API_BACKWARDS_COMPATIBILITY_VERSION = 4
    },
    8194: (e, t, r) => {
      Object.defineProperty(t, '__esModule', { value: true })
      t.MetricsAPI = void 0
      const n = r(3875)
      const o = r(9368)
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
          var e, t
          return (t =
            (e = o._global[o.GLOBAL_METRICS_API_KEY]) === null || e === void 0
              ? void 0
              : e.call(o._global, o.API_BACKWARDS_COMPATIBILITY_VERSION)) !==
            null && t !== void 0
            ? t
            : n.NOOP_METER_PROVIDER
        }
        getMeter(e, t, r) {
          return this.getMeterProvider().getMeter(e, t, r)
        }
        disable() {
          delete o._global[o.GLOBAL_METRICS_API_KEY]
        }
      }
      t.MetricsAPI = MetricsAPI
    },
    4697: (e, t, r) => {
      Object.defineProperty(t, '__esModule', { value: true })
      t.metrics = t.ValueType = t.createNoopMeter = void 0
      var n = r(6864)
      Object.defineProperty(t, 'createNoopMeter', {
        enumerable: true,
        get: function () {
          return n.createNoopMeter
        },
      })
      var o = r(6291)
      Object.defineProperty(t, 'ValueType', {
        enumerable: true,
        get: function () {
          return o.ValueType
        },
      })
      const i = r(8194)
      t.metrics = i.MetricsAPI.getInstance()
    },
    5733: function (e, t, r) {
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
      var o =
        (this && this.__exportStar) ||
        function (e, t) {
          for (var r in e)
            if (r !== 'default' && !Object.prototype.hasOwnProperty.call(t, r))
              n(t, e, r)
        }
      Object.defineProperty(t, '__esModule', { value: true })
      o(r(4777), t)
    },
    9495: (e, t) => {
      Object.defineProperty(t, '__esModule', { value: true })
      t._globalThis = void 0
      t._globalThis = typeof globalThis === 'object' ? globalThis : global
    },
    4777: function (e, t, r) {
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
      var o =
        (this && this.__exportStar) ||
        function (e, t) {
          for (var r in e)
            if (r !== 'default' && !Object.prototype.hasOwnProperty.call(t, r))
              n(t, e, r)
        }
      Object.defineProperty(t, '__esModule', { value: true })
      o(r(9495), t)
    },
    6291: (e, t) => {
      Object.defineProperty(t, '__esModule', { value: true })
      t.ValueType = void 0
      var r
      ;(function (e) {
        e[(e['INT'] = 0)] = 'INT'
        e[(e['DOUBLE'] = 1)] = 'DOUBLE'
      })((r = t.ValueType || (t.ValueType = {})))
    },
    4397: (e, t) => {
      Object.defineProperty(t, '__esModule', { value: true })
      t.ExportResultCode = void 0
      var r
      ;(function (e) {
        e[(e['SUCCESS'] = 0)] = 'SUCCESS'
        e[(e['FAILED'] = 1)] = 'FAILED'
      })((r = t.ExportResultCode || (t.ExportResultCode = {})))
    },
    8233: (e, t) => {
      Object.defineProperty(t, '__esModule', { value: true })
      t.BAGGAGE_MAX_TOTAL_LENGTH =
        t.BAGGAGE_MAX_PER_NAME_VALUE_PAIRS =
        t.BAGGAGE_MAX_NAME_VALUE_PAIRS =
        t.BAGGAGE_HEADER =
        t.BAGGAGE_ITEMS_SEPARATOR =
        t.BAGGAGE_PROPERTIES_SEPARATOR =
        t.BAGGAGE_KEY_PAIR_SEPARATOR =
          void 0
      t.BAGGAGE_KEY_PAIR_SEPARATOR = '='
      t.BAGGAGE_PROPERTIES_SEPARATOR = ';'
      t.BAGGAGE_ITEMS_SEPARATOR = ','
      t.BAGGAGE_HEADER = 'baggage'
      t.BAGGAGE_MAX_NAME_VALUE_PAIRS = 180
      t.BAGGAGE_MAX_PER_NAME_VALUE_PAIRS = 4096
      t.BAGGAGE_MAX_TOTAL_LENGTH = 8192
    },
    8648: (e, t, r) => {
      Object.defineProperty(t, '__esModule', { value: true })
      t.W3CBaggagePropagator = void 0
      const n = r(8720)
      const o = r(8668)
      const i = r(8233)
      const s = r(7366)
      class W3CBaggagePropagator {
        inject(e, t, r) {
          const a = n.propagation.getBaggage(e)
          if (!a || (0, o.isTracingSuppressed)(e)) return
          const c = (0, s.getKeyPairs)(a)
            .filter((e) => e.length <= i.BAGGAGE_MAX_PER_NAME_VALUE_PAIRS)
            .slice(0, i.BAGGAGE_MAX_NAME_VALUE_PAIRS)
          const u = (0, s.serializeKeyPairs)(c)
          if (u.length > 0) {
            r.set(t, i.BAGGAGE_HEADER, u)
          }
        }
        extract(e, t, r) {
          const o = r.get(t, i.BAGGAGE_HEADER)
          const a = Array.isArray(o) ? o.join(i.BAGGAGE_ITEMS_SEPARATOR) : o
          if (!a) return e
          const c = {}
          if (a.length === 0) {
            return e
          }
          const u = a.split(i.BAGGAGE_ITEMS_SEPARATOR)
          u.forEach((e) => {
            const t = (0, s.parsePairKeyValue)(e)
            if (t) {
              const e = { value: t.value }
              if (t.metadata) {
                e.metadata = t.metadata
              }
              c[t.key] = e
            }
          })
          if (Object.entries(c).length === 0) {
            return e
          }
          return n.propagation.setBaggage(e, n.propagation.createBaggage(c))
        }
        fields() {
          return [i.BAGGAGE_HEADER]
        }
      }
      t.W3CBaggagePropagator = W3CBaggagePropagator
    },
    7366: (e, t, r) => {
      Object.defineProperty(t, '__esModule', { value: true })
      t.parseKeyPairsIntoRecord =
        t.parsePairKeyValue =
        t.getKeyPairs =
        t.serializeKeyPairs =
          void 0
      const n = r(8720)
      const o = r(8233)
      function serializeKeyPairs(e) {
        return e.reduce((e, t) => {
          const r = `${e}${e !== '' ? o.BAGGAGE_ITEMS_SEPARATOR : ''}${t}`
          return r.length > o.BAGGAGE_MAX_TOTAL_LENGTH ? e : r
        }, '')
      }
      t.serializeKeyPairs = serializeKeyPairs
      function getKeyPairs(e) {
        return e.getAllEntries().map(([e, t]) => {
          let r = `${encodeURIComponent(e)}=${encodeURIComponent(t.value)}`
          if (t.metadata !== undefined) {
            r += o.BAGGAGE_PROPERTIES_SEPARATOR + t.metadata.toString()
          }
          return r
        })
      }
      t.getKeyPairs = getKeyPairs
      function parsePairKeyValue(e) {
        const t = e.split(o.BAGGAGE_PROPERTIES_SEPARATOR)
        if (t.length <= 0) return
        const r = t.shift()
        if (!r) return
        const i = r.split(o.BAGGAGE_KEY_PAIR_SEPARATOR)
        if (i.length !== 2) return
        const s = decodeURIComponent(i[0].trim())
        const a = decodeURIComponent(i[1].trim())
        let c
        if (t.length > 0) {
          c = (0, n.baggageEntryMetadataFromString)(
            t.join(o.BAGGAGE_PROPERTIES_SEPARATOR)
          )
        }
        return { key: s, value: a, metadata: c }
      }
      t.parsePairKeyValue = parsePairKeyValue
      function parseKeyPairsIntoRecord(e) {
        if (typeof e !== 'string' || e.length === 0) return {}
        return e
          .split(o.BAGGAGE_ITEMS_SEPARATOR)
          .map((e) => parsePairKeyValue(e))
          .filter((e) => e !== undefined && e.value.length > 0)
          .reduce((e, t) => {
            e[t.key] = t.value
            return e
          }, {})
      }
      t.parseKeyPairsIntoRecord = parseKeyPairsIntoRecord
    },
    8692: (e, t) => {
      Object.defineProperty(t, '__esModule', { value: true })
      t.AnchoredClock = void 0
      class AnchoredClock {
        constructor(e, t) {
          this._monotonicClock = t
          this._epochMillis = e.now()
          this._performanceMillis = t.now()
        }
        now() {
          const e = this._monotonicClock.now() - this._performanceMillis
          return this._epochMillis + e
        }
      }
      t.AnchoredClock = AnchoredClock
    },
    7288: (e, t, r) => {
      Object.defineProperty(t, '__esModule', { value: true })
      t.isAttributeValue = t.isAttributeKey = t.sanitizeAttributes = void 0
      const n = r(8720)
      function sanitizeAttributes(e) {
        const t = {}
        if (typeof e !== 'object' || e == null) {
          return t
        }
        for (const [r, o] of Object.entries(e)) {
          if (!isAttributeKey(r)) {
            n.diag.warn(`Invalid attribute key: ${r}`)
            continue
          }
          if (!isAttributeValue(o)) {
            n.diag.warn(`Invalid attribute value set for key: ${r}`)
            continue
          }
          if (Array.isArray(o)) {
            t[r] = o.slice()
          } else {
            t[r] = o
          }
        }
        return t
      }
      t.sanitizeAttributes = sanitizeAttributes
      function isAttributeKey(e) {
        return typeof e === 'string' && e.length > 0
      }
      t.isAttributeKey = isAttributeKey
      function isAttributeValue(e) {
        if (e == null) {
          return true
        }
        if (Array.isArray(e)) {
          return isHomogeneousAttributeValueArray(e)
        }
        return isValidPrimitiveAttributeValue(e)
      }
      t.isAttributeValue = isAttributeValue
      function isHomogeneousAttributeValueArray(e) {
        let t
        for (const r of e) {
          if (r == null) continue
          if (!t) {
            if (isValidPrimitiveAttributeValue(r)) {
              t = typeof r
              continue
            }
            return false
          }
          if (typeof r === t) {
            continue
          }
          return false
        }
        return true
      }
      function isValidPrimitiveAttributeValue(e) {
        switch (typeof e) {
          case 'number':
          case 'boolean':
          case 'string':
            return true
        }
        return false
      }
    },
    1443: (e, t, r) => {
      Object.defineProperty(t, '__esModule', { value: true })
      t.globalErrorHandler = t.setGlobalErrorHandler = void 0
      const n = r(4701)
      let o = (0, n.loggingErrorHandler)()
      function setGlobalErrorHandler(e) {
        o = e
      }
      t.setGlobalErrorHandler = setGlobalErrorHandler
      function globalErrorHandler(e) {
        try {
          o(e)
        } catch (e) {}
      }
      t.globalErrorHandler = globalErrorHandler
    },
    4701: (e, t, r) => {
      Object.defineProperty(t, '__esModule', { value: true })
      t.loggingErrorHandler = void 0
      const n = r(8720)
      function loggingErrorHandler() {
        return (e) => {
          n.diag.error(stringifyException(e))
        }
      }
      t.loggingErrorHandler = loggingErrorHandler
      function stringifyException(e) {
        if (typeof e === 'string') {
          return e
        } else {
          return JSON.stringify(flattenException(e))
        }
      }
      function flattenException(e) {
        const t = {}
        let r = e
        while (r !== null) {
          Object.getOwnPropertyNames(r).forEach((e) => {
            if (t[e]) return
            const n = r[e]
            if (n) {
              t[e] = String(n)
            }
          })
          r = Object.getPrototypeOf(r)
        }
        return t
      }
    },
    7763: (e, t, r) => {
      Object.defineProperty(t, '__esModule', { value: true })
      t.isTimeInput =
        t.isTimeInputHrTime =
        t.hrTimeToMicroseconds =
        t.hrTimeToMilliseconds =
        t.hrTimeToNanoseconds =
        t.hrTimeToTimeStamp =
        t.hrTimeDuration =
        t.timeInputToHrTime =
        t.hrTime =
          void 0
      const n = r(1483)
      const o = 9
      const i = Math.pow(10, o)
      function numberToHrtime(e) {
        const t = e / 1e3
        const r = Math.trunc(t)
        const n = Number((t - r).toFixed(o)) * i
        return [r, n]
      }
      function getTimeOrigin() {
        let e = n.otperformance.timeOrigin
        if (typeof e !== 'number') {
          const t = n.otperformance
          e = t.timing && t.timing.fetchStart
        }
        return e
      }
      function hrTime(e) {
        const t = numberToHrtime(getTimeOrigin())
        const r = numberToHrtime(
          typeof e === 'number' ? e : n.otperformance.now()
        )
        let o = t[0] + r[0]
        let s = t[1] + r[1]
        if (s > i) {
          s -= i
          o += 1
        }
        return [o, s]
      }
      t.hrTime = hrTime
      function timeInputToHrTime(e) {
        if (isTimeInputHrTime(e)) {
          return e
        } else if (typeof e === 'number') {
          if (e < getTimeOrigin()) {
            return hrTime(e)
          } else {
            return numberToHrtime(e)
          }
        } else if (e instanceof Date) {
          return numberToHrtime(e.getTime())
        } else {
          throw TypeError('Invalid input type')
        }
      }
      t.timeInputToHrTime = timeInputToHrTime
      function hrTimeDuration(e, t) {
        let r = t[0] - e[0]
        let n = t[1] - e[1]
        if (n < 0) {
          r -= 1
          n += i
        }
        return [r, n]
      }
      t.hrTimeDuration = hrTimeDuration
      function hrTimeToTimeStamp(e) {
        const t = o
        const r = `${'0'.repeat(t)}${e[1]}Z`
        const n = r.substr(r.length - t - 1)
        const i = new Date(e[0] * 1e3).toISOString()
        return i.replace('000Z', n)
      }
      t.hrTimeToTimeStamp = hrTimeToTimeStamp
      function hrTimeToNanoseconds(e) {
        return e[0] * i + e[1]
      }
      t.hrTimeToNanoseconds = hrTimeToNanoseconds
      function hrTimeToMilliseconds(e) {
        return Math.round(e[0] * 1e3 + e[1] / 1e6)
      }
      t.hrTimeToMilliseconds = hrTimeToMilliseconds
      function hrTimeToMicroseconds(e) {
        return Math.round(e[0] * 1e6 + e[1] / 1e3)
      }
      t.hrTimeToMicroseconds = hrTimeToMicroseconds
      function isTimeInputHrTime(e) {
        return (
          Array.isArray(e) &&
          e.length === 2 &&
          typeof e[0] === 'number' &&
          typeof e[1] === 'number'
        )
      }
      t.isTimeInputHrTime = isTimeInputHrTime
      function isTimeInput(e) {
        return (
          isTimeInputHrTime(e) || typeof e === 'number' || e instanceof Date
        )
      }
      t.isTimeInput = isTimeInput
    },
    7529: (e, t) => {
      Object.defineProperty(t, '__esModule', { value: true })
    },
    245: function (e, t, r) {
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
      var o =
        (this && this.__exportStar) ||
        function (e, t) {
          for (var r in e)
            if (r !== 'default' && !Object.prototype.hasOwnProperty.call(t, r))
              n(t, e, r)
        }
      Object.defineProperty(t, '__esModule', { value: true })
      t.baggageUtils = void 0
      o(r(8648), t)
      o(r(8692), t)
      o(r(7288), t)
      o(r(1443), t)
      o(r(4701), t)
      o(r(7763), t)
      o(r(7529), t)
      o(r(4397), t)
      o(r(9129), t)
      t.baggageUtils = r(7366)
      o(r(1483), t)
      o(r(74), t)
      o(r(3432), t)
      o(r(704), t)
      o(r(4824), t)
      o(r(9176), t)
      o(r(126), t)
      o(r(6922), t)
      o(r(5594), t)
      o(r(8668), t)
      o(r(4422), t)
      o(r(9218), t)
      o(r(2861), t)
      o(r(6753), t)
      o(r(5481), t)
      o(r(9476), t)
      o(r(6157), t)
      o(r(9129), t)
    },
    2280: (e, t) => {
      Object.defineProperty(t, '__esModule', { value: true })
      t.validateValue = t.validateKey = void 0
      const r = '[_0-9a-z-*/]'
      const n = `[a-z]${r}{0,255}`
      const o = `[a-z0-9]${r}{0,240}@[a-z]${r}{0,13}`
      const i = new RegExp(`^(?:${n}|${o})$`)
      const s = /^[ -~]{0,255}[!-~]$/
      const a = /,|=/
      function validateKey(e) {
        return i.test(e)
      }
      t.validateKey = validateKey
      function validateValue(e) {
        return s.test(e) && !a.test(e)
      }
      t.validateValue = validateValue
    },
    3152: (e, t) => {
      Object.defineProperty(t, '__esModule', { value: true })
      t._globalThis = void 0
      t._globalThis =
        typeof globalThis === 'object'
          ? globalThis
          : typeof self === 'object'
          ? self
          : typeof window === 'object'
          ? window
          : typeof global === 'object'
          ? global
          : {}
    },
    1483: function (e, t, r) {
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
      var o =
        (this && this.__exportStar) ||
        function (e, t) {
          for (var r in e)
            if (r !== 'default' && !Object.prototype.hasOwnProperty.call(t, r))
              n(t, e, r)
        }
      Object.defineProperty(t, '__esModule', { value: true })
      o(r(4875), t)
    },
    5645: (e, t) => {
      Object.defineProperty(t, '__esModule', { value: true })
      t.RandomIdGenerator = void 0
      const r = 8
      const n = 16
      class RandomIdGenerator {
        constructor() {
          this.generateTraceId = getIdGenerator(n)
          this.generateSpanId = getIdGenerator(r)
        }
      }
      t.RandomIdGenerator = RandomIdGenerator
      const o = Buffer.allocUnsafe(n)
      function getIdGenerator(e) {
        return function generateId() {
          for (let t = 0; t < e / 4; t++) {
            o.writeUInt32BE((Math.random() * 2 ** 32) >>> 0, t * 4)
          }
          for (let t = 0; t < e; t++) {
            if (o[t] > 0) {
              break
            } else if (t === e - 1) {
              o[e - 1] = 1
            }
          }
          return o.toString('hex', 0, e)
        }
      }
    },
    76: (e, t, r) => {
      Object.defineProperty(t, '__esModule', { value: true })
      t.getEnv = void 0
      const n = r(2037)
      const o = r(9218)
      function getEnv() {
        const e = (0, o.parseEnvironment)(process.env)
        return Object.assign(
          { HOSTNAME: n.hostname() },
          o.DEFAULT_ENVIRONMENT,
          e
        )
      }
      t.getEnv = getEnv
    },
    9340: (e, t) => {
      Object.defineProperty(t, '__esModule', { value: true })
      t._globalThis = void 0
      t._globalThis = typeof globalThis === 'object' ? globalThis : global
    },
    6354: (e, t) => {
      Object.defineProperty(t, '__esModule', { value: true })
      t.hexToBase64 = void 0
      function intValue(e) {
        if (e >= 48 && e <= 57) {
          return e - 48
        }
        if (e >= 97 && e <= 102) {
          return e - 87
        }
        return e - 55
      }
      const r = Buffer.alloc(8)
      const n = Buffer.alloc(16)
      function hexToBase64(e) {
        let t
        if (e.length === 16) {
          t = r
        } else if (e.length === 32) {
          t = n
        } else {
          t = Buffer.alloc(e.length / 2)
        }
        let o = 0
        for (let r = 0; r < e.length; r += 2) {
          const n = intValue(e.charCodeAt(r))
          const i = intValue(e.charCodeAt(r + 1))
          t.writeUInt8((n << 4) | i, o++)
        }
        return t.toString('base64')
      }
      t.hexToBase64 = hexToBase64
    },
    4875: function (e, t, r) {
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
      var o =
        (this && this.__exportStar) ||
        function (e, t) {
          for (var r in e)
            if (r !== 'default' && !Object.prototype.hasOwnProperty.call(t, r))
              n(t, e, r)
        }
      Object.defineProperty(t, '__esModule', { value: true })
      o(r(76), t)
      o(r(9340), t)
      o(r(6354), t)
      o(r(5645), t)
      o(r(2434), t)
      o(r(4801), t)
      o(r(567), t)
    },
    2434: (e, t, r) => {
      Object.defineProperty(t, '__esModule', { value: true })
      t.otperformance = void 0
      const n = r(4074)
      t.otperformance = n.performance
    },
    4801: (e, t, r) => {
      Object.defineProperty(t, '__esModule', { value: true })
      t.SDK_INFO = void 0
      const n = r(9129)
      const o = r(3190)
      t.SDK_INFO = {
        [o.SemanticResourceAttributes.TELEMETRY_SDK_NAME]: 'opentelemetry',
        [o.SemanticResourceAttributes.PROCESS_RUNTIME_NAME]: 'node',
        [o.SemanticResourceAttributes.TELEMETRY_SDK_LANGUAGE]:
          o.TelemetrySdkLanguageValues.NODEJS,
        [o.SemanticResourceAttributes.TELEMETRY_SDK_VERSION]: n.VERSION,
      }
    },
    567: (e, t) => {
      Object.defineProperty(t, '__esModule', { value: true })
      t.unrefTimer = void 0
      function unrefTimer(e) {
        e.unref()
      }
      t.unrefTimer = unrefTimer
    },
    74: (e, t, r) => {
      Object.defineProperty(t, '__esModule', { value: true })
      t.CompositePropagator = void 0
      const n = r(8720)
      class CompositePropagator {
        constructor(e = {}) {
          var t
          this._propagators =
            (t = e.propagators) !== null && t !== void 0 ? t : []
          this._fields = Array.from(
            new Set(
              this._propagators
                .map((e) => (typeof e.fields === 'function' ? e.fields() : []))
                .reduce((e, t) => e.concat(t), [])
            )
          )
        }
        inject(e, t, r) {
          for (const o of this._propagators) {
            try {
              o.inject(e, t, r)
            } catch (e) {
              n.diag.warn(
                `Failed to inject with ${o.constructor.name}. Err: ${e.message}`
              )
            }
          }
        }
        extract(e, t, r) {
          return this._propagators.reduce((e, o) => {
            try {
              return o.extract(e, t, r)
            } catch (e) {
              n.diag.warn(
                `Failed to inject with ${o.constructor.name}. Err: ${e.message}`
              )
            }
            return e
          }, e)
        }
        fields() {
          return this._fields.slice()
        }
      }
      t.CompositePropagator = CompositePropagator
    },
    704: (e, t) => {
      Object.defineProperty(t, '__esModule', { value: true })
    },
    4422: (e, t, r) => {
      Object.defineProperty(t, '__esModule', { value: true })
      t.TraceState = void 0
      const n = r(2280)
      const o = 32
      const i = 512
      const s = ','
      const a = '='
      class TraceState {
        constructor(e) {
          this._internalState = new Map()
          if (e) this._parse(e)
        }
        set(e, t) {
          const r = this._clone()
          if (r._internalState.has(e)) {
            r._internalState.delete(e)
          }
          r._internalState.set(e, t)
          return r
        }
        unset(e) {
          const t = this._clone()
          t._internalState.delete(e)
          return t
        }
        get(e) {
          return this._internalState.get(e)
        }
        serialize() {
          return this._keys()
            .reduce((e, t) => {
              e.push(t + a + this.get(t))
              return e
            }, [])
            .join(s)
        }
        _parse(e) {
          if (e.length > i) return
          this._internalState = e
            .split(s)
            .reverse()
            .reduce((e, t) => {
              const r = t.trim()
              const o = r.indexOf(a)
              if (o !== -1) {
                const i = r.slice(0, o)
                const s = r.slice(o + 1, t.length)
                if ((0, n.validateKey)(i) && (0, n.validateValue)(s)) {
                  e.set(i, s)
                } else {
                }
              }
              return e
            }, new Map())
          if (this._internalState.size > o) {
            this._internalState = new Map(
              Array.from(this._internalState.entries()).reverse().slice(0, o)
            )
          }
        }
        _keys() {
          return Array.from(this._internalState.keys()).reverse()
        }
        _clone() {
          const e = new TraceState()
          e._internalState = new Map(this._internalState)
          return e
        }
      }
      t.TraceState = TraceState
    },
    3432: (e, t, r) => {
      Object.defineProperty(t, '__esModule', { value: true })
      t.W3CTraceContextPropagator =
        t.parseTraceParent =
        t.TRACE_STATE_HEADER =
        t.TRACE_PARENT_HEADER =
          void 0
      const n = r(8720)
      const o = r(8668)
      const i = r(4422)
      t.TRACE_PARENT_HEADER = 'traceparent'
      t.TRACE_STATE_HEADER = 'tracestate'
      const s = '00'
      const a = '(?!ff)[\\da-f]{2}'
      const c = '(?![0]{32})[\\da-f]{32}'
      const u = '(?![0]{16})[\\da-f]{16}'
      const l = '[\\da-f]{2}'
      const d = new RegExp(`^\\s?(${a})-(${c})-(${u})-(${l})(-.*)?\\s?$`)
      function parseTraceParent(e) {
        const t = d.exec(e)
        if (!t) return null
        if (t[1] === '00' && t[5]) return null
        return { traceId: t[2], spanId: t[3], traceFlags: parseInt(t[4], 16) }
      }
      t.parseTraceParent = parseTraceParent
      class W3CTraceContextPropagator {
        inject(e, r, i) {
          const a = n.trace.getSpanContext(e)
          if (
            !a ||
            (0, o.isTracingSuppressed)(e) ||
            !(0, n.isSpanContextValid)(a)
          )
            return
          const c = `${s}-${a.traceId}-${a.spanId}-0${Number(
            a.traceFlags || n.TraceFlags.NONE
          ).toString(16)}`
          i.set(r, t.TRACE_PARENT_HEADER, c)
          if (a.traceState) {
            i.set(r, t.TRACE_STATE_HEADER, a.traceState.serialize())
          }
        }
        extract(e, r, o) {
          const s = o.get(r, t.TRACE_PARENT_HEADER)
          if (!s) return e
          const a = Array.isArray(s) ? s[0] : s
          if (typeof a !== 'string') return e
          const c = parseTraceParent(a)
          if (!c) return e
          c.isRemote = true
          const u = o.get(r, t.TRACE_STATE_HEADER)
          if (u) {
            const e = Array.isArray(u) ? u.join(',') : u
            c.traceState = new i.TraceState(
              typeof e === 'string' ? e : undefined
            )
          }
          return n.trace.setSpanContext(e, c)
        }
        fields() {
          return [t.TRACE_PARENT_HEADER, t.TRACE_STATE_HEADER]
        }
      }
      t.W3CTraceContextPropagator = W3CTraceContextPropagator
    },
    4824: (e, t, r) => {
      Object.defineProperty(t, '__esModule', { value: true })
      t.getRPCMetadata =
        t.deleteRPCMetadata =
        t.setRPCMetadata =
        t.RPCType =
          void 0
      const n = r(8720)
      const o = (0, n.createContextKey)(
        'OpenTelemetry SDK Context Key RPC_METADATA'
      )
      var i
      ;(function (e) {
        e['HTTP'] = 'http'
      })((i = t.RPCType || (t.RPCType = {})))
      function setRPCMetadata(e, t) {
        return e.setValue(o, t)
      }
      t.setRPCMetadata = setRPCMetadata
      function deleteRPCMetadata(e) {
        return e.deleteValue(o)
      }
      t.deleteRPCMetadata = deleteRPCMetadata
      function getRPCMetadata(e) {
        return e.getValue(o)
      }
      t.getRPCMetadata = getRPCMetadata
    },
    9176: (e, t, r) => {
      Object.defineProperty(t, '__esModule', { value: true })
      t.AlwaysOffSampler = void 0
      const n = r(8720)
      class AlwaysOffSampler {
        shouldSample() {
          return { decision: n.SamplingDecision.NOT_RECORD }
        }
        toString() {
          return 'AlwaysOffSampler'
        }
      }
      t.AlwaysOffSampler = AlwaysOffSampler
    },
    126: (e, t, r) => {
      Object.defineProperty(t, '__esModule', { value: true })
      t.AlwaysOnSampler = void 0
      const n = r(8720)
      class AlwaysOnSampler {
        shouldSample() {
          return { decision: n.SamplingDecision.RECORD_AND_SAMPLED }
        }
        toString() {
          return 'AlwaysOnSampler'
        }
      }
      t.AlwaysOnSampler = AlwaysOnSampler
    },
    6922: (e, t, r) => {
      Object.defineProperty(t, '__esModule', { value: true })
      t.ParentBasedSampler = void 0
      const n = r(8720)
      const o = r(1443)
      const i = r(9176)
      const s = r(126)
      class ParentBasedSampler {
        constructor(e) {
          var t, r, n, a
          this._root = e.root
          if (!this._root) {
            ;(0, o.globalErrorHandler)(
              new Error(
                'ParentBasedSampler must have a root sampler configured'
              )
            )
            this._root = new s.AlwaysOnSampler()
          }
          this._remoteParentSampled =
            (t = e.remoteParentSampled) !== null && t !== void 0
              ? t
              : new s.AlwaysOnSampler()
          this._remoteParentNotSampled =
            (r = e.remoteParentNotSampled) !== null && r !== void 0
              ? r
              : new i.AlwaysOffSampler()
          this._localParentSampled =
            (n = e.localParentSampled) !== null && n !== void 0
              ? n
              : new s.AlwaysOnSampler()
          this._localParentNotSampled =
            (a = e.localParentNotSampled) !== null && a !== void 0
              ? a
              : new i.AlwaysOffSampler()
        }
        shouldSample(e, t, r, o, i, s) {
          const a = n.trace.getSpanContext(e)
          if (!a || !(0, n.isSpanContextValid)(a)) {
            return this._root.shouldSample(e, t, r, o, i, s)
          }
          if (a.isRemote) {
            if (a.traceFlags & n.TraceFlags.SAMPLED) {
              return this._remoteParentSampled.shouldSample(e, t, r, o, i, s)
            }
            return this._remoteParentNotSampled.shouldSample(e, t, r, o, i, s)
          }
          if (a.traceFlags & n.TraceFlags.SAMPLED) {
            return this._localParentSampled.shouldSample(e, t, r, o, i, s)
          }
          return this._localParentNotSampled.shouldSample(e, t, r, o, i, s)
        }
        toString() {
          return `ParentBased{root=${this._root.toString()}, remoteParentSampled=${this._remoteParentSampled.toString()}, remoteParentNotSampled=${this._remoteParentNotSampled.toString()}, localParentSampled=${this._localParentSampled.toString()}, localParentNotSampled=${this._localParentNotSampled.toString()}}`
        }
      }
      t.ParentBasedSampler = ParentBasedSampler
    },
    5594: (e, t, r) => {
      Object.defineProperty(t, '__esModule', { value: true })
      t.TraceIdRatioBasedSampler = void 0
      const n = r(8720)
      class TraceIdRatioBasedSampler {
        constructor(e = 0) {
          this._ratio = e
          this._ratio = this._normalize(e)
          this._upperBound = Math.floor(this._ratio * 4294967295)
        }
        shouldSample(e, t) {
          return {
            decision:
              (0, n.isValidTraceId)(t) && this._accumulate(t) < this._upperBound
                ? n.SamplingDecision.RECORD_AND_SAMPLED
                : n.SamplingDecision.NOT_RECORD,
          }
        }
        toString() {
          return `TraceIdRatioBased{${this._ratio}}`
        }
        _normalize(e) {
          if (typeof e !== 'number' || isNaN(e)) return 0
          return e >= 1 ? 1 : e <= 0 ? 0 : e
        }
        _accumulate(e) {
          let t = 0
          for (let r = 0; r < e.length / 8; r++) {
            const n = r * 8
            const o = parseInt(e.slice(n, n + 8), 16)
            t = (t ^ o) >>> 0
          }
          return t
        }
      }
      t.TraceIdRatioBasedSampler = TraceIdRatioBasedSampler
    },
    8668: (e, t, r) => {
      Object.defineProperty(t, '__esModule', { value: true })
      t.isTracingSuppressed = t.unsuppressTracing = t.suppressTracing = void 0
      const n = r(8720)
      const o = (0, n.createContextKey)(
        'OpenTelemetry SDK Context Key SUPPRESS_TRACING'
      )
      function suppressTracing(e) {
        return e.setValue(o, true)
      }
      t.suppressTracing = suppressTracing
      function unsuppressTracing(e) {
        return e.deleteValue(o)
      }
      t.unsuppressTracing = unsuppressTracing
      function isTracingSuppressed(e) {
        return e.getValue(o) === true
      }
      t.isTracingSuppressed = isTracingSuppressed
    },
    6157: (e, t, r) => {
      Object.defineProperty(t, '__esModule', { value: true })
      t.BindOnceFuture = void 0
      const n = r(1878)
      class BindOnceFuture {
        constructor(e, t) {
          this._callback = e
          this._that = t
          this._isCalled = false
          this._deferred = new n.Deferred()
        }
        get isCalled() {
          return this._isCalled
        }
        get promise() {
          return this._deferred.promise
        }
        call(...e) {
          if (!this._isCalled) {
            this._isCalled = true
            try {
              Promise.resolve(this._callback.call(this._that, ...e)).then(
                (e) => this._deferred.resolve(e),
                (e) => this._deferred.reject(e)
              )
            } catch (e) {
              this._deferred.reject(e)
            }
          }
          return this._deferred.promise
        }
      }
      t.BindOnceFuture = BindOnceFuture
    },
    9218: (e, t, r) => {
      Object.defineProperty(t, '__esModule', { value: true })
      t.getEnvWithoutDefaults =
        t.parseEnvironment =
        t.DEFAULT_ENVIRONMENT =
        t.DEFAULT_ATTRIBUTE_COUNT_LIMIT =
        t.DEFAULT_ATTRIBUTE_VALUE_LENGTH_LIMIT =
          void 0
      const n = r(8720)
      const o = r(6753)
      const i = r(3152)
      const s = ','
      const a = [
        'OTEL_BSP_EXPORT_TIMEOUT',
        'OTEL_BSP_MAX_EXPORT_BATCH_SIZE',
        'OTEL_BSP_MAX_QUEUE_SIZE',
        'OTEL_BSP_SCHEDULE_DELAY',
        'OTEL_ATTRIBUTE_VALUE_LENGTH_LIMIT',
        'OTEL_ATTRIBUTE_COUNT_LIMIT',
        'OTEL_SPAN_ATTRIBUTE_VALUE_LENGTH_LIMIT',
        'OTEL_SPAN_ATTRIBUTE_COUNT_LIMIT',
        'OTEL_SPAN_EVENT_COUNT_LIMIT',
        'OTEL_SPAN_LINK_COUNT_LIMIT',
        'OTEL_EXPORTER_OTLP_TIMEOUT',
        'OTEL_EXPORTER_OTLP_TRACES_TIMEOUT',
        'OTEL_EXPORTER_OTLP_METRICS_TIMEOUT',
        'OTEL_EXPORTER_JAEGER_AGENT_PORT',
      ]
      function isEnvVarANumber(e) {
        return a.indexOf(e) > -1
      }
      const c = ['OTEL_NO_PATCH_MODULES', 'OTEL_PROPAGATORS']
      function isEnvVarAList(e) {
        return c.indexOf(e) > -1
      }
      t.DEFAULT_ATTRIBUTE_VALUE_LENGTH_LIMIT = Infinity
      t.DEFAULT_ATTRIBUTE_COUNT_LIMIT = 128
      t.DEFAULT_ENVIRONMENT = {
        CONTAINER_NAME: '',
        ECS_CONTAINER_METADATA_URI_V4: '',
        ECS_CONTAINER_METADATA_URI: '',
        HOSTNAME: '',
        KUBERNETES_SERVICE_HOST: '',
        NAMESPACE: '',
        OTEL_BSP_EXPORT_TIMEOUT: 3e4,
        OTEL_BSP_MAX_EXPORT_BATCH_SIZE: 512,
        OTEL_BSP_MAX_QUEUE_SIZE: 2048,
        OTEL_BSP_SCHEDULE_DELAY: 5e3,
        OTEL_EXPORTER_JAEGER_AGENT_HOST: '',
        OTEL_EXPORTER_JAEGER_AGENT_PORT: 6832,
        OTEL_EXPORTER_JAEGER_ENDPOINT: '',
        OTEL_EXPORTER_JAEGER_PASSWORD: '',
        OTEL_EXPORTER_JAEGER_USER: '',
        OTEL_EXPORTER_OTLP_ENDPOINT: '',
        OTEL_EXPORTER_OTLP_TRACES_ENDPOINT: '',
        OTEL_EXPORTER_OTLP_METRICS_ENDPOINT: '',
        OTEL_EXPORTER_OTLP_HEADERS: '',
        OTEL_EXPORTER_OTLP_TRACES_HEADERS: '',
        OTEL_EXPORTER_OTLP_METRICS_HEADERS: '',
        OTEL_EXPORTER_OTLP_TIMEOUT: 1e4,
        OTEL_EXPORTER_OTLP_TRACES_TIMEOUT: 1e4,
        OTEL_EXPORTER_OTLP_METRICS_TIMEOUT: 1e4,
        OTEL_EXPORTER_ZIPKIN_ENDPOINT: 'http://localhost:9411/api/v2/spans',
        OTEL_LOG_LEVEL: n.DiagLogLevel.INFO,
        OTEL_NO_PATCH_MODULES: [],
        OTEL_PROPAGATORS: ['tracecontext', 'baggage'],
        OTEL_RESOURCE_ATTRIBUTES: '',
        OTEL_SERVICE_NAME: '',
        OTEL_ATTRIBUTE_VALUE_LENGTH_LIMIT:
          t.DEFAULT_ATTRIBUTE_VALUE_LENGTH_LIMIT,
        OTEL_ATTRIBUTE_COUNT_LIMIT: t.DEFAULT_ATTRIBUTE_COUNT_LIMIT,
        OTEL_SPAN_ATTRIBUTE_VALUE_LENGTH_LIMIT:
          t.DEFAULT_ATTRIBUTE_VALUE_LENGTH_LIMIT,
        OTEL_SPAN_ATTRIBUTE_COUNT_LIMIT: t.DEFAULT_ATTRIBUTE_COUNT_LIMIT,
        OTEL_SPAN_EVENT_COUNT_LIMIT: 128,
        OTEL_SPAN_LINK_COUNT_LIMIT: 128,
        OTEL_TRACES_EXPORTER: 'none',
        OTEL_TRACES_SAMPLER: o.TracesSamplerValues.ParentBasedAlwaysOn,
        OTEL_TRACES_SAMPLER_ARG: '',
        OTEL_EXPORTER_OTLP_INSECURE: '',
        OTEL_EXPORTER_OTLP_TRACES_INSECURE: '',
        OTEL_EXPORTER_OTLP_METRICS_INSECURE: '',
        OTEL_EXPORTER_OTLP_CERTIFICATE: '',
        OTEL_EXPORTER_OTLP_TRACES_CERTIFICATE: '',
        OTEL_EXPORTER_OTLP_METRICS_CERTIFICATE: '',
        OTEL_EXPORTER_OTLP_COMPRESSION: '',
        OTEL_EXPORTER_OTLP_TRACES_COMPRESSION: '',
        OTEL_EXPORTER_OTLP_METRICS_COMPRESSION: '',
        OTEL_EXPORTER_OTLP_CLIENT_KEY: '',
        OTEL_EXPORTER_OTLP_TRACES_CLIENT_KEY: '',
        OTEL_EXPORTER_OTLP_METRICS_CLIENT_KEY: '',
        OTEL_EXPORTER_OTLP_CLIENT_CERTIFICATE: '',
        OTEL_EXPORTER_OTLP_TRACES_CLIENT_CERTIFICATE: '',
        OTEL_EXPORTER_OTLP_METRICS_CLIENT_CERTIFICATE: '',
      }
      function parseNumber(e, t, r, n = -Infinity, o = Infinity) {
        if (typeof r[e] !== 'undefined') {
          const i = Number(r[e])
          if (!isNaN(i)) {
            if (i < n) {
              t[e] = n
            } else if (i > o) {
              t[e] = o
            } else {
              t[e] = i
            }
          }
        }
      }
      function parseStringList(e, t, r, n = s) {
        const o = r[e]
        if (typeof o === 'string') {
          t[e] = o.split(n).map((e) => e.trim())
        }
      }
      const u = {
        ALL: n.DiagLogLevel.ALL,
        VERBOSE: n.DiagLogLevel.VERBOSE,
        DEBUG: n.DiagLogLevel.DEBUG,
        INFO: n.DiagLogLevel.INFO,
        WARN: n.DiagLogLevel.WARN,
        ERROR: n.DiagLogLevel.ERROR,
        NONE: n.DiagLogLevel.NONE,
      }
      function setLogLevelFromEnv(e, t, r) {
        const n = r[e]
        if (typeof n === 'string') {
          const r = u[n.toUpperCase()]
          if (r != null) {
            t[e] = r
          }
        }
      }
      function parseEnvironment(e) {
        const r = {}
        for (const n in t.DEFAULT_ENVIRONMENT) {
          const t = n
          switch (t) {
            case 'OTEL_LOG_LEVEL':
              setLogLevelFromEnv(t, r, e)
              break
            default:
              if (isEnvVarANumber(t)) {
                parseNumber(t, r, e)
              } else if (isEnvVarAList(t)) {
                parseStringList(t, r, e)
              } else {
                const n = e[t]
                if (typeof n !== 'undefined' && n !== null) {
                  r[t] = String(n)
                }
              }
          }
        }
        return r
      }
      t.parseEnvironment = parseEnvironment
      function getEnvWithoutDefaults() {
        return typeof process !== 'undefined'
          ? parseEnvironment(process.env)
          : parseEnvironment(i._globalThis)
      }
      t.getEnvWithoutDefaults = getEnvWithoutDefaults
    },
    8271: (e, t) => {
      Object.defineProperty(t, '__esModule', { value: true })
      t.isPlainObject = void 0
      const r = '[object Object]'
      const n = '[object Null]'
      const o = '[object Undefined]'
      const i = Function.prototype
      const s = i.toString
      const a = s.call(Object)
      const c = overArg(Object.getPrototypeOf, Object)
      const u = Object.prototype
      const l = u.hasOwnProperty
      const d = Symbol ? Symbol.toStringTag : undefined
      const p = u.toString
      function overArg(e, t) {
        return function (r) {
          return e(t(r))
        }
      }
      function isPlainObject(e) {
        if (!isObjectLike(e) || baseGetTag(e) !== r) {
          return false
        }
        const t = c(e)
        if (t === null) {
          return true
        }
        const n = l.call(t, 'constructor') && t.constructor
        return typeof n == 'function' && n instanceof n && s.call(n) === a
      }
      t.isPlainObject = isPlainObject
      function isObjectLike(e) {
        return e != null && typeof e == 'object'
      }
      function baseGetTag(e) {
        if (e == null) {
          return e === undefined ? o : n
        }
        return d && d in Object(e) ? getRawTag(e) : objectToString(e)
      }
      function getRawTag(e) {
        const t = l.call(e, d),
          r = e[d]
        let n = false
        try {
          e[d] = undefined
          n = true
        } catch (e) {}
        const o = p.call(e)
        if (n) {
          if (t) {
            e[d] = r
          } else {
            delete e[d]
          }
        }
        return o
      }
      function objectToString(e) {
        return p.call(e)
      }
    },
    2861: (e, t, r) => {
      Object.defineProperty(t, '__esModule', { value: true })
      t.merge = void 0
      const n = r(8271)
      const o = 20
      function merge(...e) {
        let t = e.shift()
        const r = new WeakMap()
        while (e.length > 0) {
          t = mergeTwoObjects(t, e.shift(), 0, r)
        }
        return t
      }
      t.merge = merge
      function takeValue(e) {
        if (isArray(e)) {
          return e.slice()
        }
        return e
      }
      function mergeTwoObjects(e, t, r = 0, n) {
        let i
        if (r > o) {
          return undefined
        }
        r++
        if (isPrimitive(e) || isPrimitive(t) || isFunction(t)) {
          i = takeValue(t)
        } else if (isArray(e)) {
          i = e.slice()
          if (isArray(t)) {
            for (let e = 0, r = t.length; e < r; e++) {
              i.push(takeValue(t[e]))
            }
          } else if (isObject(t)) {
            const e = Object.keys(t)
            for (let r = 0, n = e.length; r < n; r++) {
              const n = e[r]
              i[n] = takeValue(t[n])
            }
          }
        } else if (isObject(e)) {
          if (isObject(t)) {
            if (!shouldMerge(e, t)) {
              return t
            }
            i = Object.assign({}, e)
            const o = Object.keys(t)
            for (let s = 0, a = o.length; s < a; s++) {
              const a = o[s]
              const c = t[a]
              if (isPrimitive(c)) {
                if (typeof c === 'undefined') {
                  delete i[a]
                } else {
                  i[a] = c
                }
              } else {
                const o = i[a]
                const s = c
                if (
                  wasObjectReferenced(e, a, n) ||
                  wasObjectReferenced(t, a, n)
                ) {
                  delete i[a]
                } else {
                  if (isObject(o) && isObject(s)) {
                    const r = n.get(o) || []
                    const i = n.get(s) || []
                    r.push({ obj: e, key: a })
                    i.push({ obj: t, key: a })
                    n.set(o, r)
                    n.set(s, i)
                  }
                  i[a] = mergeTwoObjects(i[a], c, r, n)
                }
              }
            }
          } else {
            i = t
          }
        }
        return i
      }
      function wasObjectReferenced(e, t, r) {
        const n = r.get(e[t]) || []
        for (let r = 0, o = n.length; r < o; r++) {
          const o = n[r]
          if (o.key === t && o.obj === e) {
            return true
          }
        }
        return false
      }
      function isArray(e) {
        return Array.isArray(e)
      }
      function isFunction(e) {
        return typeof e === 'function'
      }
      function isObject(e) {
        return (
          !isPrimitive(e) &&
          !isArray(e) &&
          !isFunction(e) &&
          typeof e === 'object'
        )
      }
      function isPrimitive(e) {
        return (
          typeof e === 'string' ||
          typeof e === 'number' ||
          typeof e === 'boolean' ||
          typeof e === 'undefined' ||
          e instanceof Date ||
          e instanceof RegExp ||
          e === null
        )
      }
      function shouldMerge(e, t) {
        if (!(0, n.isPlainObject)(e) || !(0, n.isPlainObject)(t)) {
          return false
        }
        return true
      }
    },
    1878: (e, t) => {
      Object.defineProperty(t, '__esModule', { value: true })
      t.Deferred = void 0
      class Deferred {
        constructor() {
          this._promise = new Promise((e, t) => {
            this._resolve = e
            this._reject = t
          })
        }
        get promise() {
          return this._promise
        }
        resolve(e) {
          this._resolve(e)
        }
        reject(e) {
          this._reject(e)
        }
      }
      t.Deferred = Deferred
    },
    6753: (e, t) => {
      Object.defineProperty(t, '__esModule', { value: true })
      t.TracesSamplerValues = void 0
      var r
      ;(function (e) {
        e['AlwaysOff'] = 'always_off'
        e['AlwaysOn'] = 'always_on'
        e['ParentBasedAlwaysOff'] = 'parentbased_always_off'
        e['ParentBasedAlwaysOn'] = 'parentbased_always_on'
        e['ParentBasedTraceIdRatio'] = 'parentbased_traceidratio'
        e['TraceIdRatio'] = 'traceidratio'
      })((r = t.TracesSamplerValues || (t.TracesSamplerValues = {})))
    },
    5481: (e, t) => {
      Object.defineProperty(t, '__esModule', { value: true })
      t.isUrlIgnored = t.urlMatches = void 0
      function urlMatches(e, t) {
        if (typeof t === 'string') {
          return e === t
        } else {
          return !!e.match(t)
        }
      }
      t.urlMatches = urlMatches
      function isUrlIgnored(e, t) {
        if (!t) {
          return false
        }
        for (const r of t) {
          if (urlMatches(e, r)) {
            return true
          }
        }
        return false
      }
      t.isUrlIgnored = isUrlIgnored
    },
    9476: (e, t) => {
      Object.defineProperty(t, '__esModule', { value: true })
      t.isWrapped = void 0
      function isWrapped(e) {
        return (
          typeof e === 'function' &&
          typeof e.__original === 'function' &&
          typeof e.__unwrap === 'function' &&
          e.__wrapped === true
        )
      }
      t.isWrapped = isWrapped
    },
    9129: (e, t) => {
      Object.defineProperty(t, '__esModule', { value: true })
      t.VERSION = void 0
      t.VERSION = '1.7.0'
    },
    9926: function (e, t, r) {
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
      var o =
        (this && this.__exportStar) ||
        function (e, t) {
          for (var r in e)
            if (r !== 'default' && !Object.prototype.hasOwnProperty.call(t, r))
              n(t, e, r)
        }
      Object.defineProperty(t, '__esModule', { value: true })
      o(r(8450), t)
    },
    8450: function (e, t, r) {
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
      var o =
        (this && this.__exportStar) ||
        function (e, t) {
          for (var r in e)
            if (r !== 'default' && !Object.prototype.hasOwnProperty.call(t, r))
              n(t, e, r)
        }
      Object.defineProperty(t, '__esModule', { value: true })
      o(r(3626), t)
    },
    2169: (e, t, r) => {
      Object.defineProperty(t, '__esModule', { value: true })
      t.OTLPTraceExporter = void 0
      const n = r(245)
      const o = r(1429)
      const i = r(1429)
      const s = r(3628)
      const a = 'v1/traces'
      const c = `http://localhost:4318/${a}`
      class OTLPTraceExporter extends o.OTLPExporterNodeBase {
        constructor(e = {}) {
          super(e)
          this.headers = Object.assign(
            this.headers,
            n.baggageUtils.parseKeyPairsIntoRecord(
              (0, n.getEnv)().OTEL_EXPORTER_OTLP_TRACES_HEADERS
            )
          )
        }
        convert(e) {
          return (0, s.createExportTraceServiceRequest)(e, true)
        }
        getDefaultUrl(e) {
          return typeof e.url === 'string'
            ? e.url
            : (0, n.getEnv)().OTEL_EXPORTER_OTLP_TRACES_ENDPOINT.length > 0
            ? (0, i.appendRootPathToUrlIfNeeded)(
                (0, n.getEnv)().OTEL_EXPORTER_OTLP_TRACES_ENDPOINT,
                a
              )
            : (0, n.getEnv)().OTEL_EXPORTER_OTLP_ENDPOINT.length > 0
            ? (0, i.appendResourcePathToUrl)(
                (0, n.getEnv)().OTEL_EXPORTER_OTLP_ENDPOINT,
                a
              )
            : c
        }
      }
      t.OTLPTraceExporter = OTLPTraceExporter
    },
    3626: function (e, t, r) {
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
      var o =
        (this && this.__exportStar) ||
        function (e, t) {
          for (var r in e)
            if (r !== 'default' && !Object.prototype.hasOwnProperty.call(t, r))
              n(t, e, r)
        }
      Object.defineProperty(t, '__esModule', { value: true })
      o(r(2169), t)
    },
    3424: (e, t, r) => {
      Object.defineProperty(t, '__esModule', { value: true })
      t.OTLPExporterBase = void 0
      const n = r(8720)
      const o = r(245)
      const i = r(2929)
      class OTLPExporterBase {
        constructor(e = {}) {
          this._sendingPromises = []
          this.url = this.getDefaultUrl(e)
          if (typeof e.hostname === 'string') {
            this.hostname = e.hostname
          }
          this.shutdown = this.shutdown.bind(this)
          this._shutdownOnce = new o.BindOnceFuture(this._shutdown, this)
          this._concurrencyLimit =
            typeof e.concurrencyLimit === 'number'
              ? e.concurrencyLimit
              : Infinity
          this.timeoutMillis = (0, i.configureExporterTimeout)(e.timeoutMillis)
          this.onInit(e)
        }
        export(e, t) {
          if (this._shutdownOnce.isCalled) {
            t({
              code: o.ExportResultCode.FAILED,
              error: new Error('Exporter has been shutdown'),
            })
            return
          }
          if (this._sendingPromises.length >= this._concurrencyLimit) {
            t({
              code: o.ExportResultCode.FAILED,
              error: new Error('Concurrent export limit reached'),
            })
            return
          }
          this._export(e)
            .then(() => {
              t({ code: o.ExportResultCode.SUCCESS })
            })
            .catch((e) => {
              t({ code: o.ExportResultCode.FAILED, error: e })
            })
        }
        _export(e) {
          return new Promise((t, r) => {
            try {
              n.diag.debug('items to be sent', e)
              this.send(e, t, r)
            } catch (e) {
              r(e)
            }
          })
        }
        shutdown() {
          return this._shutdownOnce.call()
        }
        _shutdown() {
          n.diag.debug('shutdown started')
          this.onShutdown()
          return Promise.all(this._sendingPromises).then(() => {})
        }
      }
      t.OTLPExporterBase = OTLPExporterBase
    },
    1429: function (e, t, r) {
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
      var o =
        (this && this.__exportStar) ||
        function (e, t) {
          for (var r in e)
            if (r !== 'default' && !Object.prototype.hasOwnProperty.call(t, r))
              n(t, e, r)
        }
      Object.defineProperty(t, '__esModule', { value: true })
      o(r(3424), t)
      o(r(2674), t)
      o(r(6717), t)
      o(r(2929), t)
    },
    3973: (e, t, r) => {
      Object.defineProperty(t, '__esModule', { value: true })
      t.OTLPExporterBrowserBase = void 0
      const n = r(3424)
      const o = r(2929)
      const i = r(3360)
      const s = r(8720)
      const a = r(245)
      class OTLPExporterBrowserBase extends n.OTLPExporterBase {
        constructor(e = {}) {
          super(e)
          this._useXHR = false
          this._useXHR =
            !!e.headers || typeof navigator.sendBeacon !== 'function'
          if (this._useXHR) {
            this._headers = Object.assign(
              {},
              (0, o.parseHeaders)(e.headers),
              a.baggageUtils.parseKeyPairsIntoRecord(
                (0, a.getEnv)().OTEL_EXPORTER_OTLP_HEADERS
              )
            )
          } else {
            this._headers = {}
          }
        }
        onInit() {
          window.addEventListener('unload', this.shutdown)
        }
        onShutdown() {
          window.removeEventListener('unload', this.shutdown)
        }
        send(e, t, r) {
          if (this._shutdownOnce.isCalled) {
            s.diag.debug('Shutdown already started. Cannot send objects')
            return
          }
          const n = this.convert(e)
          const o = JSON.stringify(n)
          const a = new Promise((e, t) => {
            if (this._useXHR) {
              ;(0, i.sendWithXhr)(
                o,
                this.url,
                this._headers,
                this.timeoutMillis,
                e,
                t
              )
            } else {
              ;(0, i.sendWithBeacon)(
                o,
                this.url,
                { type: 'application/json' },
                e,
                t
              )
            }
          }).then(t, r)
          this._sendingPromises.push(a)
          const popPromise = () => {
            const e = this._sendingPromises.indexOf(a)
            this._sendingPromises.splice(e, 1)
          }
          a.then(popPromise, popPromise)
        }
      }
      t.OTLPExporterBrowserBase = OTLPExporterBrowserBase
    },
    7681: function (e, t, r) {
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
      var o =
        (this && this.__exportStar) ||
        function (e, t) {
          for (var r in e)
            if (r !== 'default' && !Object.prototype.hasOwnProperty.call(t, r))
              n(t, e, r)
        }
      Object.defineProperty(t, '__esModule', { value: true })
      o(r(3973), t)
    },
    3360: (e, t, r) => {
      Object.defineProperty(t, '__esModule', { value: true })
      t.sendWithXhr = t.sendWithBeacon = void 0
      const n = r(8720)
      const o = r(6717)
      function sendWithBeacon(e, t, r, i, s) {
        if (navigator.sendBeacon(t, new Blob([e], r))) {
          n.diag.debug('sendBeacon - can send', e)
          i()
        } else {
          const t = new o.OTLPExporterError(`sendBeacon - cannot send ${e}`)
          s(t)
        }
      }
      t.sendWithBeacon = sendWithBeacon
      function sendWithXhr(e, t, r, i, s, a) {
        let c
        const u = setTimeout(() => {
          c = true
          l.abort()
        }, i)
        const l = new XMLHttpRequest()
        l.open('POST', t)
        const d = {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        }
        Object.entries(Object.assign(Object.assign({}, d), r)).forEach(
          ([e, t]) => {
            l.setRequestHeader(e, t)
          }
        )
        l.send(e)
        l.onreadystatechange = () => {
          if (l.readyState === XMLHttpRequest.DONE) {
            if (l.status >= 200 && l.status <= 299) {
              clearTimeout(u)
              n.diag.debug('xhr success', e)
              s()
            } else if (c) {
              const e = new o.OTLPExporterError('Request Timeout', l.status)
              a(e)
            } else {
              const e = new o.OTLPExporterError(
                `Failed to export with XHR (status: ${l.status})`,
                l.status
              )
              clearTimeout(u)
              a(e)
            }
          }
        }
      }
      t.sendWithXhr = sendWithXhr
    },
    2674: function (e, t, r) {
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
      var o =
        (this && this.__exportStar) ||
        function (e, t) {
          for (var r in e)
            if (r !== 'default' && !Object.prototype.hasOwnProperty.call(t, r))
              n(t, e, r)
        }
      Object.defineProperty(t, '__esModule', { value: true })
      t.OTLPExporterBrowserBase = void 0
      o(r(6071), t)
      var i = r(7681)
      Object.defineProperty(t, 'OTLPExporterBrowserBase', {
        enumerable: true,
        get: function () {
          return i.OTLPExporterBrowserBase
        },
      })
    },
    2377: (e, t, r) => {
      Object.defineProperty(t, '__esModule', { value: true })
      t.OTLPExporterNodeBase = void 0
      const n = r(3424)
      const o = r(2929)
      const i = r(2448)
      const s = r(8720)
      const a = r(245)
      class OTLPExporterNodeBase extends n.OTLPExporterBase {
        constructor(e = {}) {
          super(e)
          this.DEFAULT_HEADERS = {}
          if (e.metadata) {
            s.diag.warn('Metadata cannot be set when using http')
          }
          this.headers = Object.assign(
            this.DEFAULT_HEADERS,
            (0, o.parseHeaders)(e.headers),
            a.baggageUtils.parseKeyPairsIntoRecord(
              (0, a.getEnv)().OTEL_EXPORTER_OTLP_HEADERS
            )
          )
          this.agent = (0, i.createHttpAgent)(e)
          this.compression = (0, i.configureCompression)(e.compression)
        }
        onInit(e) {}
        send(e, t, r) {
          if (this._shutdownOnce.isCalled) {
            s.diag.debug('Shutdown already started. Cannot send objects')
            return
          }
          const n = this.convert(e)
          const o = new Promise((e, t) => {
            ;(0, i.sendWithHttp)(
              this,
              JSON.stringify(n),
              'application/json',
              e,
              t
            )
          }).then(t, r)
          this._sendingPromises.push(o)
          const popPromise = () => {
            const e = this._sendingPromises.indexOf(o)
            this._sendingPromises.splice(e, 1)
          }
          o.then(popPromise, popPromise)
        }
        onShutdown() {}
      }
      t.OTLPExporterNodeBase = OTLPExporterNodeBase
    },
    6071: function (e, t, r) {
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
      var o =
        (this && this.__exportStar) ||
        function (e, t) {
          for (var r in e)
            if (r !== 'default' && !Object.prototype.hasOwnProperty.call(t, r))
              n(t, e, r)
        }
      Object.defineProperty(t, '__esModule', { value: true })
      o(r(2377), t)
      o(r(2448), t)
      o(r(9082), t)
    },
    9082: (e, t) => {
      Object.defineProperty(t, '__esModule', { value: true })
      t.CompressionAlgorithm = void 0
      var r
      ;(function (e) {
        e['NONE'] = 'none'
        e['GZIP'] = 'gzip'
      })((r = t.CompressionAlgorithm || (t.CompressionAlgorithm = {})))
    },
    2448: (e, t, r) => {
      Object.defineProperty(t, '__esModule', { value: true })
      t.configureCompression = t.createHttpAgent = t.sendWithHttp = void 0
      const n = r(7310)
      const o = r(3685)
      const i = r(5687)
      const s = r(9796)
      const a = r(2781)
      const c = r(8720)
      const u = r(9082)
      const l = r(245)
      const d = r(6717)
      function sendWithHttp(e, t, r, a, l) {
        const p = e.timeoutMillis
        const g = new n.URL(e.url)
        let _
        const m = Number(process.versions.node.split('.')[0])
        const f = setTimeout(() => {
          _ = true
          if (m >= 14) {
            E.destroy()
          } else {
            E.abort()
          }
        }, p)
        const h = {
          hostname: g.hostname,
          port: g.port,
          path: g.pathname,
          method: 'POST',
          headers: Object.assign({ 'Content-Type': r }, e.headers),
          agent: e.agent,
        }
        const T = g.protocol === 'http:' ? o.request : i.request
        const E = T(h, (e) => {
          let t = ''
          e.on('data', (e) => (t += e))
          e.on('aborted', () => {
            if (_) {
              const e = new d.OTLPExporterError('Request Timeout')
              l(e)
            }
          })
          e.on('end', () => {
            if (!_) {
              if (e.statusCode && e.statusCode < 299) {
                c.diag.debug(`statusCode: ${e.statusCode}`, t)
                a()
              } else {
                const r = new d.OTLPExporterError(
                  e.statusMessage,
                  e.statusCode,
                  t
                )
                l(r)
              }
              clearTimeout(f)
            }
          })
        })
        E.on('error', (e) => {
          if (_) {
            const t = new d.OTLPExporterError('Request Timeout', e.code)
            l(t)
          } else {
            clearTimeout(f)
            l(e)
          }
        })
        switch (e.compression) {
          case u.CompressionAlgorithm.GZIP: {
            E.setHeader('Content-Encoding', 'gzip')
            const e = readableFromBuffer(t)
            e.on('error', l).pipe(s.createGzip()).on('error', l).pipe(E)
            break
          }
          default:
            E.end(t)
            break
        }
      }
      t.sendWithHttp = sendWithHttp
      function readableFromBuffer(e) {
        const t = new a.Readable()
        t.push(e)
        t.push(null)
        return t
      }
      function createHttpAgent(e) {
        if (e.httpAgentOptions && e.keepAlive === false) {
          c.diag.warn('httpAgentOptions is used only when keepAlive is true')
          return undefined
        }
        if (e.keepAlive === false || !e.url) return undefined
        try {
          const t = new n.URL(e.url)
          const r = t.protocol === 'http:' ? o.Agent : i.Agent
          return new r(Object.assign({ keepAlive: true }, e.httpAgentOptions))
        } catch (e) {
          c.diag.error(
            `collector exporter failed to create http agent. err: ${e.message}`
          )
          return undefined
        }
      }
      t.createHttpAgent = createHttpAgent
      function configureCompression(e) {
        if (e) {
          return e
        } else {
          const e =
            (0, l.getEnv)().OTEL_EXPORTER_OTLP_TRACES_COMPRESSION ||
            (0, l.getEnv)().OTEL_EXPORTER_OTLP_COMPRESSION
          return e === u.CompressionAlgorithm.GZIP
            ? u.CompressionAlgorithm.GZIP
            : u.CompressionAlgorithm.NONE
        }
      }
      t.configureCompression = configureCompression
    },
    6717: (e, t) => {
      Object.defineProperty(t, '__esModule', { value: true })
      t.OTLPExporterError = void 0
      class OTLPExporterError extends Error {
        constructor(e, t, r) {
          super(e)
          this.name = 'OTLPExporterError'
          this.data = r
          this.code = t
        }
      }
      t.OTLPExporterError = OTLPExporterError
    },
    2929: (e, t, r) => {
      Object.defineProperty(t, '__esModule', { value: true })
      t.invalidTimeout =
        t.configureExporterTimeout =
        t.appendRootPathToUrlIfNeeded =
        t.appendResourcePathToUrl =
        t.parseHeaders =
          void 0
      const n = r(8720)
      const o = r(245)
      const i = 1e4
      function parseHeaders(e = {}) {
        const t = {}
        Object.entries(e).forEach(([e, r]) => {
          if (typeof r !== 'undefined') {
            t[e] = String(r)
          } else {
            n.diag.warn(`Header "${e}" has wrong value and will be ignored`)
          }
        })
        return t
      }
      t.parseHeaders = parseHeaders
      function appendResourcePathToUrl(e, t) {
        if (!e.endsWith('/')) {
          e = e + '/'
        }
        return e + t
      }
      t.appendResourcePathToUrl = appendResourcePathToUrl
      function appendRootPathToUrlIfNeeded(e, t) {
        if (!e.includes(t) && !e.endsWith('/')) {
          e = e + '/'
        }
        return e
      }
      t.appendRootPathToUrlIfNeeded = appendRootPathToUrlIfNeeded
      function configureExporterTimeout(e) {
        if (typeof e === 'number') {
          if (e <= 0) {
            return invalidTimeout(e, i)
          }
          return e
        } else {
          return getExporterTimeoutFromEnv()
        }
      }
      t.configureExporterTimeout = configureExporterTimeout
      function getExporterTimeoutFromEnv() {
        var e
        const t = Number(
          (e = (0, o.getEnv)().OTEL_EXPORTER_OTLP_TRACES_TIMEOUT) !== null &&
            e !== void 0
            ? e
            : (0, o.getEnv)().OTEL_EXPORTER_OTLP_TIMEOUT
        )
        if (t <= 0) {
          return invalidTimeout(t, i)
        } else {
          return t
        }
      }
      function invalidTimeout(e, t) {
        n.diag.warn('Timeout must be greater than 0', e)
        return t
      }
      t.invalidTimeout = invalidTimeout
    },
    793: (e, t) => {
      Object.defineProperty(t, '__esModule', { value: true })
      t.bufToHex =
        t.hexToBuf =
        t.toAnyValue =
        t.toKeyValue =
        t.toAttributes =
          void 0
      function toAttributes(e) {
        return Object.keys(e).map((t) => toKeyValue(t, e[t]))
      }
      t.toAttributes = toAttributes
      function toKeyValue(e, t) {
        return { key: e, value: toAnyValue(t) }
      }
      t.toKeyValue = toKeyValue
      function toAnyValue(e) {
        const t = typeof e
        if (t === 'string') return { stringValue: e }
        if (t === 'number') {
          if (!Number.isInteger(e)) return { doubleValue: e }
          return { intValue: e }
        }
        if (t === 'boolean') return { boolValue: e }
        if (e instanceof Uint8Array) return { bytesValue: e }
        if (Array.isArray(e))
          return { arrayValue: { values: e.map(toAnyValue) } }
        if (t === 'object' && e != null)
          return {
            kvlistValue: {
              values: Object.entries(e).map(([e, t]) => toKeyValue(e, t)),
            },
          }
        return {}
      }
      t.toAnyValue = toAnyValue
      function hexToBuf(e) {
        var t
        const r =
          (t = e.match(/[\da-f]{2}/gi)) === null || t === void 0
            ? void 0
            : t.map((e) => parseInt(e, 16))
        return r && new Uint8Array(r)
      }
      t.hexToBuf = hexToBuf
      function i2hex(e) {
        return ('0' + e.toString(16)).slice(-2)
      }
      function bufToHex(e) {
        if (e == null || e.length === 0) return undefined
        return Array.from(e).map(i2hex).join('')
      }
      t.bufToHex = bufToHex
    },
    9674: (e, t) => {
      Object.defineProperty(t, '__esModule', { value: true })
    },
    3628: function (e, t, r) {
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
      var o =
        (this && this.__exportStar) ||
        function (e, t) {
          for (var r in e)
            if (r !== 'default' && !Object.prototype.hasOwnProperty.call(t, r))
              n(t, e, r)
        }
      Object.defineProperty(t, '__esModule', { value: true })
      t.createExportMetricsServiceRequest = t.createExportTraceServiceRequest =
        void 0
      o(r(9674), t)
      o(r(1392), t)
      o(r(170), t)
      o(r(8872), t)
      var i = r(6760)
      Object.defineProperty(t, 'createExportTraceServiceRequest', {
        enumerable: true,
        get: function () {
          return i.createExportTraceServiceRequest
        },
      })
      var s = r(9100)
      Object.defineProperty(t, 'createExportMetricsServiceRequest', {
        enumerable: true,
        get: function () {
          return s.createExportMetricsServiceRequest
        },
      })
    },
    9100: (e, t, r) => {
      Object.defineProperty(t, '__esModule', { value: true })
      t.createExportMetricsServiceRequest = void 0
      const n = r(1688)
      function createExportMetricsServiceRequest(e) {
        return { resourceMetrics: e.map((e) => (0, n.toResourceMetrics)(e)) }
      }
      t.createExportMetricsServiceRequest = createExportMetricsServiceRequest
    },
    1688: (e, t, r) => {
      Object.defineProperty(t, '__esModule', { value: true })
      t.toMetric = t.toScopeMetrics = t.toResourceMetrics = void 0
      const n = r(4697)
      const o = r(245)
      const i = r(7289)
      const s = r(793)
      function toResourceMetrics(e) {
        return {
          resource: {
            attributes: (0, s.toAttributes)(e.resource.attributes),
            droppedAttributesCount: 0,
          },
          schemaUrl: undefined,
          scopeMetrics: toScopeMetrics(e.scopeMetrics),
        }
      }
      t.toResourceMetrics = toResourceMetrics
      function toScopeMetrics(e) {
        return Array.from(
          e.map((e) => {
            const t = {
              scope: { name: e.scope.name, version: e.scope.version },
              metrics: e.metrics.map((e) => toMetric(e)),
              schemaUrl: e.scope.schemaUrl,
            }
            return t
          })
        )
      }
      t.toScopeMetrics = toScopeMetrics
      function toMetric(e) {
        const t = {
          name: e.descriptor.name,
          description: e.descriptor.description,
          unit: e.descriptor.unit,
        }
        const r = toAggregationTemporality(e.aggregationTemporality)
        if (e.dataPointType === i.DataPointType.SUM) {
          t.sum = {
            aggregationTemporality: r,
            isMonotonic: e.isMonotonic,
            dataPoints: toSingularDataPoints(e),
          }
        } else if (e.dataPointType === i.DataPointType.GAUGE) {
          t.gauge = { dataPoints: toSingularDataPoints(e) }
        } else if (e.dataPointType === i.DataPointType.HISTOGRAM) {
          t.histogram = {
            aggregationTemporality: r,
            dataPoints: toHistogramDataPoints(e),
          }
        }
        return t
      }
      t.toMetric = toMetric
      function toSingularDataPoint(e, t) {
        const r = {
          attributes: (0, s.toAttributes)(e.attributes),
          startTimeUnixNano: (0, o.hrTimeToNanoseconds)(e.startTime),
          timeUnixNano: (0, o.hrTimeToNanoseconds)(e.endTime),
        }
        if (t === n.ValueType.INT) {
          r.asInt = e.value
        } else if (t === n.ValueType.DOUBLE) {
          r.asDouble = e.value
        }
        return r
      }
      function toSingularDataPoints(e) {
        return e.dataPoints.map((t) =>
          toSingularDataPoint(t, e.descriptor.valueType)
        )
      }
      function toHistogramDataPoints(e) {
        return e.dataPoints.map((e) => {
          const t = e.value
          return {
            attributes: (0, s.toAttributes)(e.attributes),
            bucketCounts: t.buckets.counts,
            explicitBounds: t.buckets.boundaries,
            count: t.count,
            sum: t.sum,
            min: t.min,
            max: t.max,
            startTimeUnixNano: (0, o.hrTimeToNanoseconds)(e.startTime),
            timeUnixNano: (0, o.hrTimeToNanoseconds)(e.endTime),
          }
        })
      }
      function toAggregationTemporality(e) {
        if (e === i.AggregationTemporality.DELTA) {
          return 1
        }
        if (e === i.AggregationTemporality.CUMULATIVE) {
          return 2
        }
        return 0
      }
    },
    1392: (e, t) => {
      Object.defineProperty(t, '__esModule', { value: true })
    },
    170: (e, t) => {
      Object.defineProperty(t, '__esModule', { value: true })
    },
    6760: (e, t, r) => {
      Object.defineProperty(t, '__esModule', { value: true })
      t.createExportTraceServiceRequest = void 0
      const n = r(793)
      const o = r(6919)
      function createExportTraceServiceRequest(e, t) {
        return { resourceSpans: spanRecordsToResourceSpans(e, t) }
      }
      t.createExportTraceServiceRequest = createExportTraceServiceRequest
      function createResourceMap(e) {
        const t = new Map()
        for (const r of e) {
          let e = t.get(r.resource)
          if (!e) {
            e = new Map()
            t.set(r.resource, e)
          }
          const n = `${r.instrumentationLibrary.name}@${
            r.instrumentationLibrary.version || ''
          }:${r.instrumentationLibrary.schemaUrl || ''}`
          let o = e.get(n)
          if (!o) {
            o = []
            e.set(n, o)
          }
          o.push(r)
        }
        return t
      }
      function spanRecordsToResourceSpans(e, t) {
        const r = createResourceMap(e)
        const i = []
        const s = r.entries()
        let a = s.next()
        while (!a.done) {
          const [e, r] = a.value
          const c = []
          const u = r.values()
          let l = u.next()
          while (!l.done) {
            const e = l.value
            if (e.length > 0) {
              const {
                name: r,
                version: n,
                schemaUrl: i,
              } = e[0].instrumentationLibrary
              const s = e.map((e) => (0, o.sdkSpanToOtlpSpan)(e, t))
              c.push({ scope: { name: r, version: n }, spans: s, schemaUrl: i })
            }
            l = u.next()
          }
          const d = {
            resource: {
              attributes: (0, n.toAttributes)(e.attributes),
              droppedAttributesCount: 0,
            },
            scopeSpans: c,
            schemaUrl: undefined,
          }
          i.push(d)
          a = s.next()
        }
        return i
      }
    },
    6919: (e, t, r) => {
      Object.defineProperty(t, '__esModule', { value: true })
      t.toOtlpSpanEvent = t.toOtlpLink = t.sdkSpanToOtlpSpan = void 0
      const n = r(245)
      const o = r(793)
      const i = r(245)
      function sdkSpanToOtlpSpan(e, t) {
        const r = e.spanContext()
        const s = e.status
        const a = t
          ? e.parentSpanId
          : e.parentSpanId != null
          ? i.hexToBase64(e.parentSpanId)
          : undefined
        return {
          traceId: t ? r.traceId : i.hexToBase64(r.traceId),
          spanId: t ? r.spanId : i.hexToBase64(r.spanId),
          parentSpanId: a,
          name: e.name,
          kind: e.kind == null ? 0 : e.kind + 1,
          startTimeUnixNano: (0, n.hrTimeToNanoseconds)(e.startTime),
          endTimeUnixNano: (0, n.hrTimeToNanoseconds)(e.endTime),
          attributes: (0, o.toAttributes)(e.attributes),
          droppedAttributesCount: 0,
          events: e.events.map(toOtlpSpanEvent),
          droppedEventsCount: 0,
          status: { code: s.code, message: s.message },
          links: e.links.map((e) => toOtlpLink(e, t)),
          droppedLinksCount: 0,
        }
      }
      t.sdkSpanToOtlpSpan = sdkSpanToOtlpSpan
      function toOtlpLink(e, t) {
        return {
          attributes: e.attributes ? (0, o.toAttributes)(e.attributes) : [],
          spanId: t ? e.context.spanId : i.hexToBase64(e.context.spanId),
          traceId: t ? e.context.traceId : i.hexToBase64(e.context.traceId),
          droppedAttributesCount: 0,
        }
      }
      t.toOtlpLink = toOtlpLink
      function toOtlpSpanEvent(e) {
        return {
          attributes: e.attributes ? (0, o.toAttributes)(e.attributes) : [],
          name: e.name,
          timeUnixNano: (0, n.hrTimeToNanoseconds)(e.time),
          droppedAttributesCount: 0,
        }
      }
      t.toOtlpSpanEvent = toOtlpSpanEvent
    },
    8872: (e, t) => {
      Object.defineProperty(t, '__esModule', { value: true })
      t.ESpanKind = void 0
      var r
      ;(function (e) {
        e[(e['SPAN_KIND_UNSPECIFIED'] = 0)] = 'SPAN_KIND_UNSPECIFIED'
        e[(e['SPAN_KIND_INTERNAL'] = 1)] = 'SPAN_KIND_INTERNAL'
        e[(e['SPAN_KIND_SERVER'] = 2)] = 'SPAN_KIND_SERVER'
        e[(e['SPAN_KIND_CLIENT'] = 3)] = 'SPAN_KIND_CLIENT'
        e[(e['SPAN_KIND_PRODUCER'] = 4)] = 'SPAN_KIND_PRODUCER'
        e[(e['SPAN_KIND_CONSUMER'] = 5)] = 'SPAN_KIND_CONSUMER'
      })((r = t.ESpanKind || (t.ESpanKind = {})))
    },
    8745: (e, t, r) => {
      Object.defineProperty(t, '__esModule', { value: true })
      t.isDescriptorCompatibleWith =
        t.createInstrumentDescriptorWithView =
        t.createInstrumentDescriptor =
        t.InstrumentType =
          void 0
      const n = r(4697)
      var o
      ;(function (e) {
        e['COUNTER'] = 'COUNTER'
        e['HISTOGRAM'] = 'HISTOGRAM'
        e['UP_DOWN_COUNTER'] = 'UP_DOWN_COUNTER'
        e['OBSERVABLE_COUNTER'] = 'OBSERVABLE_COUNTER'
        e['OBSERVABLE_GAUGE'] = 'OBSERVABLE_GAUGE'
        e['OBSERVABLE_UP_DOWN_COUNTER'] = 'OBSERVABLE_UP_DOWN_COUNTER'
      })((o = t.InstrumentType || (t.InstrumentType = {})))
      function createInstrumentDescriptor(e, t, r) {
        var o, i, s
        return {
          name: e,
          type: t,
          description:
            (o = r === null || r === void 0 ? void 0 : r.description) !==
              null && o !== void 0
              ? o
              : '',
          unit:
            (i = r === null || r === void 0 ? void 0 : r.unit) !== null &&
            i !== void 0
              ? i
              : '',
          valueType:
            (s = r === null || r === void 0 ? void 0 : r.valueType) !== null &&
            s !== void 0
              ? s
              : n.ValueType.DOUBLE,
        }
      }
      t.createInstrumentDescriptor = createInstrumentDescriptor
      function createInstrumentDescriptorWithView(e, t) {
        var r, n
        return {
          name: (r = e.name) !== null && r !== void 0 ? r : t.name,
          description:
            (n = e.description) !== null && n !== void 0 ? n : t.description,
          type: t.type,
          unit: t.unit,
          valueType: t.valueType,
        }
      }
      t.createInstrumentDescriptorWithView = createInstrumentDescriptorWithView
      function isDescriptorCompatibleWith(e, t) {
        return (
          e.name === t.name &&
          e.unit === t.unit &&
          e.type === t.type &&
          e.valueType === t.valueType
        )
      }
      t.isDescriptorCompatibleWith = isDescriptorCompatibleWith
    },
    7833: (e, t, r) => {
      Object.defineProperty(t, '__esModule', { value: true })
      t.isObservableInstrument =
        t.ObservableUpDownCounterInstrument =
        t.ObservableGaugeInstrument =
        t.ObservableCounterInstrument =
        t.ObservableInstrument =
        t.HistogramInstrument =
        t.CounterInstrument =
        t.UpDownCounterInstrument =
        t.SyncInstrument =
          void 0
      const n = r(8720)
      const o = r(4697)
      const i = r(245)
      class SyncInstrument {
        constructor(e, t) {
          this._writableMetricStorage = e
          this._descriptor = t
        }
        _record(e, t = {}, r = n.context.active()) {
          if (
            this._descriptor.valueType === o.ValueType.INT &&
            !Number.isInteger(e)
          ) {
            n.diag.warn(
              `INT value type cannot accept a floating-point value for ${this._descriptor.name}, ignoring the fractional digits.`
            )
            e = Math.trunc(e)
          }
          this._writableMetricStorage.record(e, t, r, (0, i.hrTime)())
        }
      }
      t.SyncInstrument = SyncInstrument
      class UpDownCounterInstrument extends SyncInstrument {
        add(e, t, r) {
          this._record(e, t, r)
        }
      }
      t.UpDownCounterInstrument = UpDownCounterInstrument
      class CounterInstrument extends SyncInstrument {
        add(e, t, r) {
          if (e < 0) {
            n.diag.warn(
              `negative value provided to counter ${this._descriptor.name}: ${e}`
            )
            return
          }
          this._record(e, t, r)
        }
      }
      t.CounterInstrument = CounterInstrument
      class HistogramInstrument extends SyncInstrument {
        record(e, t, r) {
          if (e < 0) {
            n.diag.warn(
              `negative value provided to histogram ${this._descriptor.name}: ${e}`
            )
            return
          }
          this._record(e, t, r)
        }
      }
      t.HistogramInstrument = HistogramInstrument
      class ObservableInstrument {
        constructor(e, t, r) {
          this._observableRegistry = r
          this._descriptor = e
          this._metricStorages = t
        }
        addCallback(e) {
          this._observableRegistry.addCallback(e, this)
        }
        removeCallback(e) {
          this._observableRegistry.removeCallback(e, this)
        }
      }
      t.ObservableInstrument = ObservableInstrument
      class ObservableCounterInstrument extends ObservableInstrument {}
      t.ObservableCounterInstrument = ObservableCounterInstrument
      class ObservableGaugeInstrument extends ObservableInstrument {}
      t.ObservableGaugeInstrument = ObservableGaugeInstrument
      class ObservableUpDownCounterInstrument extends ObservableInstrument {}
      t.ObservableUpDownCounterInstrument = ObservableUpDownCounterInstrument
      function isObservableInstrument(e) {
        return e instanceof ObservableInstrument
      }
      t.isObservableInstrument = isObservableInstrument
    },
    8170: (e, t, r) => {
      Object.defineProperty(t, '__esModule', { value: true })
      t.Meter = void 0
      const n = r(8745)
      const o = r(7833)
      class Meter {
        constructor(e) {
          this._meterSharedState = e
        }
        createHistogram(e, t) {
          const r = (0, n.createInstrumentDescriptor)(
            e,
            n.InstrumentType.HISTOGRAM,
            t
          )
          const i = this._meterSharedState.registerMetricStorage(r)
          return new o.HistogramInstrument(i, r)
        }
        createCounter(e, t) {
          const r = (0, n.createInstrumentDescriptor)(
            e,
            n.InstrumentType.COUNTER,
            t
          )
          const i = this._meterSharedState.registerMetricStorage(r)
          return new o.CounterInstrument(i, r)
        }
        createUpDownCounter(e, t) {
          const r = (0, n.createInstrumentDescriptor)(
            e,
            n.InstrumentType.UP_DOWN_COUNTER,
            t
          )
          const i = this._meterSharedState.registerMetricStorage(r)
          return new o.UpDownCounterInstrument(i, r)
        }
        createObservableGauge(e, t) {
          const r = (0, n.createInstrumentDescriptor)(
            e,
            n.InstrumentType.OBSERVABLE_GAUGE,
            t
          )
          const i = this._meterSharedState.registerAsyncMetricStorage(r)
          return new o.ObservableGaugeInstrument(
            r,
            i,
            this._meterSharedState.observableRegistry
          )
        }
        createObservableCounter(e, t) {
          const r = (0, n.createInstrumentDescriptor)(
            e,
            n.InstrumentType.OBSERVABLE_COUNTER,
            t
          )
          const i = this._meterSharedState.registerAsyncMetricStorage(r)
          return new o.ObservableCounterInstrument(
            r,
            i,
            this._meterSharedState.observableRegistry
          )
        }
        createObservableUpDownCounter(e, t) {
          const r = (0, n.createInstrumentDescriptor)(
            e,
            n.InstrumentType.OBSERVABLE_UP_DOWN_COUNTER,
            t
          )
          const i = this._meterSharedState.registerAsyncMetricStorage(r)
          return new o.ObservableUpDownCounterInstrument(
            r,
            i,
            this._meterSharedState.observableRegistry
          )
        }
        addBatchObservableCallback(e, t) {
          this._meterSharedState.observableRegistry.addBatchCallback(e, t)
        }
        removeBatchObservableCallback(e, t) {
          this._meterSharedState.observableRegistry.removeBatchCallback(e, t)
        }
      }
      t.Meter = Meter
    },
    7909: (e, t, r) => {
      Object.defineProperty(t, '__esModule', { value: true })
      t.MeterProvider = void 0
      const n = r(8720)
      const o = r(4697)
      const i = r(8314)
      const s = r(4301)
      const a = r(1729)
      class MeterProvider {
        constructor(e) {
          var t
          this._shutdown = false
          this._sharedState = new s.MeterProviderSharedState(
            (t = e === null || e === void 0 ? void 0 : e.resource) !== null &&
            t !== void 0
              ? t
              : i.Resource.empty()
          )
          if (
            (e === null || e === void 0 ? void 0 : e.views) != null &&
            e.views.length > 0
          ) {
            for (const t of e.views) {
              this._sharedState.viewRegistry.addView(t)
            }
          }
        }
        getMeter(e, t = '', r = {}) {
          if (this._shutdown) {
            n.diag.warn('A shutdown MeterProvider cannot provide a Meter')
            return o.createNoopMeter()
          }
          return this._sharedState.getMeterSharedState({
            name: e,
            version: t,
            schemaUrl: r.schemaUrl,
          }).meter
        }
        addMetricReader(e) {
          const t = new a.MetricCollector(this._sharedState, e)
          e.setMetricProducer(t)
          this._sharedState.metricCollectors.push(t)
        }
        async shutdown(e) {
          if (this._shutdown) {
            n.diag.warn('shutdown may only be called once per MeterProvider')
            return
          }
          this._shutdown = true
          await Promise.all(
            this._sharedState.metricCollectors.map((t) => t.shutdown(e))
          )
        }
        async forceFlush(e) {
          if (this._shutdown) {
            n.diag.warn(
              'invalid attempt to force flush after MeterProvider shutdown'
            )
            return
          }
          await Promise.all(
            this._sharedState.metricCollectors.map((t) => t.forceFlush(e))
          )
        }
      }
      t.MeterProvider = MeterProvider
    },
    8178: (e, t, r) => {
      Object.defineProperty(t, '__esModule', { value: true })
      t.BatchObservableResultImpl = t.ObservableResultImpl = void 0
      const n = r(8720)
      const o = r(4697)
      const i = r(7090)
      const s = r(7833)
      class ObservableResultImpl {
        constructor(e) {
          this._descriptor = e
          this._buffer = new i.AttributeHashMap()
        }
        observe(e, t = {}) {
          if (
            this._descriptor.valueType === o.ValueType.INT &&
            !Number.isInteger(e)
          ) {
            n.diag.warn(
              `INT value type cannot accept a floating-point value for ${this._descriptor.name}, ignoring the fractional digits.`
            )
            e = Math.trunc(e)
          }
          this._buffer.set(t, e)
        }
      }
      t.ObservableResultImpl = ObservableResultImpl
      class BatchObservableResultImpl {
        constructor() {
          this._buffer = new Map()
        }
        observe(e, t, r = {}) {
          if (!(0, s.isObservableInstrument)(e)) {
            return
          }
          let a = this._buffer.get(e)
          if (a == null) {
            a = new i.AttributeHashMap()
            this._buffer.set(e, a)
          }
          if (
            e._descriptor.valueType === o.ValueType.INT &&
            !Number.isInteger(t)
          ) {
            n.diag.warn(
              `INT value type cannot accept a floating-point value for ${e._descriptor.name}, ignoring the fractional digits.`
            )
            t = Math.trunc(t)
          }
          a.set(r, t)
        }
      }
      t.BatchObservableResultImpl = BatchObservableResultImpl
    },
    5659: (e, t, r) => {
      Object.defineProperty(t, '__esModule', { value: true })
      t.DropAggregator = void 0
      const n = r(9530)
      class DropAggregator {
        constructor() {
          this.kind = n.AggregatorKind.DROP
        }
        createAccumulation() {
          return undefined
        }
        merge(e, t) {
          return undefined
        }
        diff(e, t) {
          return undefined
        }
        toMetricData(e, t, r, n) {
          return undefined
        }
      }
      t.DropAggregator = DropAggregator
    },
    3334: (e, t, r) => {
      Object.defineProperty(t, '__esModule', { value: true })
      t.HistogramAggregator = t.HistogramAccumulation = void 0
      const n = r(9530)
      const o = r(9899)
      const i = r(8745)
      function createNewEmptyCheckpoint(e) {
        const t = e.map(() => 0)
        t.push(0)
        return {
          buckets: { boundaries: e, counts: t },
          sum: 0,
          count: 0,
          hasMinMax: false,
          min: Infinity,
          max: -Infinity,
        }
      }
      class HistogramAccumulation {
        constructor(e, t, r = true, n = createNewEmptyCheckpoint(t)) {
          this.startTime = e
          this._boundaries = t
          this._recordMinMax = r
          this._current = n
        }
        record(e) {
          this._current.count += 1
          this._current.sum += e
          if (this._recordMinMax) {
            this._current.min = Math.min(e, this._current.min)
            this._current.max = Math.max(e, this._current.max)
            this._current.hasMinMax = true
          }
          for (let t = 0; t < this._boundaries.length; t++) {
            if (e < this._boundaries[t]) {
              this._current.buckets.counts[t] += 1
              return
            }
          }
          this._current.buckets.counts[this._boundaries.length] += 1
        }
        setStartTime(e) {
          this.startTime = e
        }
        toPointValue() {
          return this._current
        }
      }
      t.HistogramAccumulation = HistogramAccumulation
      class HistogramAggregator {
        constructor(e, t) {
          this._boundaries = e
          this._recordMinMax = t
          this.kind = n.AggregatorKind.HISTOGRAM
        }
        createAccumulation(e) {
          return new HistogramAccumulation(
            e,
            this._boundaries,
            this._recordMinMax
          )
        }
        merge(e, t) {
          const r = e.toPointValue()
          const n = t.toPointValue()
          const o = r.buckets.counts
          const i = n.buckets.counts
          const s = new Array(o.length)
          for (let e = 0; e < o.length; e++) {
            s[e] = o[e] + i[e]
          }
          let a = Infinity
          let c = -Infinity
          if (this._recordMinMax) {
            if (r.hasMinMax && n.hasMinMax) {
              a = Math.min(r.min, n.min)
              c = Math.max(r.max, n.max)
            } else if (r.hasMinMax) {
              a = r.min
              c = r.max
            } else if (n.hasMinMax) {
              a = n.min
              c = n.max
            }
          }
          return new HistogramAccumulation(
            e.startTime,
            r.buckets.boundaries,
            this._recordMinMax,
            {
              buckets: { boundaries: r.buckets.boundaries, counts: s },
              count: r.count + n.count,
              sum: r.sum + n.sum,
              hasMinMax: this._recordMinMax && (r.hasMinMax || n.hasMinMax),
              min: a,
              max: c,
            }
          )
        }
        diff(e, t) {
          const r = e.toPointValue()
          const n = t.toPointValue()
          const o = r.buckets.counts
          const i = n.buckets.counts
          const s = new Array(o.length)
          for (let e = 0; e < o.length; e++) {
            s[e] = i[e] - o[e]
          }
          return new HistogramAccumulation(
            t.startTime,
            r.buckets.boundaries,
            this._recordMinMax,
            {
              buckets: { boundaries: r.buckets.boundaries, counts: s },
              count: n.count - r.count,
              sum: n.sum - r.sum,
              hasMinMax: false,
              min: Infinity,
              max: -Infinity,
            }
          )
        }
        toMetricData(e, t, r, n) {
          return {
            descriptor: e,
            aggregationTemporality: t,
            dataPointType: o.DataPointType.HISTOGRAM,
            dataPoints: r.map(([t, r]) => {
              const o = r.toPointValue()
              const s =
                e.type === i.InstrumentType.UP_DOWN_COUNTER ||
                e.type === i.InstrumentType.OBSERVABLE_GAUGE ||
                e.type === i.InstrumentType.OBSERVABLE_UP_DOWN_COUNTER
              return {
                attributes: t,
                startTime: r.startTime,
                endTime: n,
                value: {
                  min: o.hasMinMax ? o.min : undefined,
                  max: o.hasMinMax ? o.max : undefined,
                  sum: !s ? o.sum : undefined,
                  buckets: o.buckets,
                  count: o.count,
                },
              }
            }),
          }
        }
      }
      t.HistogramAggregator = HistogramAggregator
    },
    3763: (e, t, r) => {
      Object.defineProperty(t, '__esModule', { value: true })
      t.LastValueAggregator = t.LastValueAccumulation = void 0
      const n = r(9530)
      const o = r(245)
      const i = r(9899)
      class LastValueAccumulation {
        constructor(e, t = 0, r = [0, 0]) {
          this.startTime = e
          this._current = t
          this.sampleTime = r
        }
        record(e) {
          this._current = e
          this.sampleTime = (0, o.hrTime)()
        }
        setStartTime(e) {
          this.startTime = e
        }
        toPointValue() {
          return this._current
        }
      }
      t.LastValueAccumulation = LastValueAccumulation
      class LastValueAggregator {
        constructor() {
          this.kind = n.AggregatorKind.LAST_VALUE
        }
        createAccumulation(e) {
          return new LastValueAccumulation(e)
        }
        merge(e, t) {
          const r =
            (0, o.hrTimeToMicroseconds)(t.sampleTime) >=
            (0, o.hrTimeToMicroseconds)(e.sampleTime)
              ? t
              : e
          return new LastValueAccumulation(
            e.startTime,
            r.toPointValue(),
            r.sampleTime
          )
        }
        diff(e, t) {
          const r =
            (0, o.hrTimeToMicroseconds)(t.sampleTime) >=
            (0, o.hrTimeToMicroseconds)(e.sampleTime)
              ? t
              : e
          return new LastValueAccumulation(
            t.startTime,
            r.toPointValue(),
            r.sampleTime
          )
        }
        toMetricData(e, t, r, n) {
          return {
            descriptor: e,
            aggregationTemporality: t,
            dataPointType: i.DataPointType.GAUGE,
            dataPoints: r.map(([e, t]) => ({
              attributes: e,
              startTime: t.startTime,
              endTime: n,
              value: t.toPointValue(),
            })),
          }
        }
      }
      t.LastValueAggregator = LastValueAggregator
    },
    6802: (e, t, r) => {
      Object.defineProperty(t, '__esModule', { value: true })
      t.SumAggregator = t.SumAccumulation = void 0
      const n = r(9530)
      const o = r(9899)
      class SumAccumulation {
        constructor(e, t, r = 0, n = false) {
          this.startTime = e
          this.monotonic = t
          this._current = r
          this.reset = n
        }
        record(e) {
          if (this.monotonic && e < 0) {
            return
          }
          this._current += e
        }
        setStartTime(e) {
          this.startTime = e
        }
        toPointValue() {
          return this._current
        }
      }
      t.SumAccumulation = SumAccumulation
      class SumAggregator {
        constructor(e) {
          this.monotonic = e
          this.kind = n.AggregatorKind.SUM
        }
        createAccumulation(e) {
          return new SumAccumulation(e, this.monotonic)
        }
        merge(e, t) {
          const r = e.toPointValue()
          const n = t.toPointValue()
          if (t.reset) {
            return new SumAccumulation(t.startTime, this.monotonic, n, t.reset)
          }
          return new SumAccumulation(e.startTime, this.monotonic, r + n)
        }
        diff(e, t) {
          const r = e.toPointValue()
          const n = t.toPointValue()
          if (this.monotonic && r > n) {
            return new SumAccumulation(t.startTime, this.monotonic, n, true)
          }
          return new SumAccumulation(t.startTime, this.monotonic, n - r)
        }
        toMetricData(e, t, r, n) {
          return {
            descriptor: e,
            aggregationTemporality: t,
            dataPointType: o.DataPointType.SUM,
            dataPoints: r.map(([e, t]) => ({
              attributes: e,
              startTime: t.startTime,
              endTime: n,
              value: t.toPointValue(),
            })),
            isMonotonic: this.monotonic,
          }
        }
      }
      t.SumAggregator = SumAggregator
    },
    3989: function (e, t, r) {
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
      var o =
        (this && this.__exportStar) ||
        function (e, t) {
          for (var r in e)
            if (r !== 'default' && !Object.prototype.hasOwnProperty.call(t, r))
              n(t, e, r)
        }
      Object.defineProperty(t, '__esModule', { value: true })
      o(r(5659), t)
      o(r(3334), t)
      o(r(3763), t)
      o(r(6802), t)
    },
    9530: (e, t) => {
      Object.defineProperty(t, '__esModule', { value: true })
      t.AggregatorKind = void 0
      var r
      ;(function (e) {
        e[(e['DROP'] = 0)] = 'DROP'
        e[(e['SUM'] = 1)] = 'SUM'
        e[(e['LAST_VALUE'] = 2)] = 'LAST_VALUE'
        e[(e['HISTOGRAM'] = 3)] = 'HISTOGRAM'
      })((r = t.AggregatorKind || (t.AggregatorKind = {})))
    },
    4796: (e, t, r) => {
      Object.defineProperty(t, '__esModule', { value: true })
      t.DEFAULT_AGGREGATION_TEMPORALITY_SELECTOR =
        t.DEFAULT_AGGREGATION_SELECTOR = void 0
      const n = r(3213)
      const o = r(1656)
      const DEFAULT_AGGREGATION_SELECTOR = (e) => n.Aggregation.Default()
      t.DEFAULT_AGGREGATION_SELECTOR = DEFAULT_AGGREGATION_SELECTOR
      const DEFAULT_AGGREGATION_TEMPORALITY_SELECTOR = (e) =>
        o.AggregationTemporality.CUMULATIVE
      t.DEFAULT_AGGREGATION_TEMPORALITY_SELECTOR =
        DEFAULT_AGGREGATION_TEMPORALITY_SELECTOR
    },
    1656: (e, t) => {
      Object.defineProperty(t, '__esModule', { value: true })
      t.AggregationTemporality = void 0
      var r
      ;(function (e) {
        e[(e['DELTA'] = 0)] = 'DELTA'
        e[(e['CUMULATIVE'] = 1)] = 'CUMULATIVE'
      })((r = t.AggregationTemporality || (t.AggregationTemporality = {})))
    },
    5297: (e, t, r) => {
      Object.defineProperty(t, '__esModule', { value: true })
      t.ConsoleMetricExporter = void 0
      const n = r(245)
      const o = r(1656)
      class ConsoleMetricExporter {
        constructor() {
          this._shutdown = false
        }
        export(e, t) {
          if (this._shutdown) {
            setImmediate(t, { code: n.ExportResultCode.FAILED })
            return
          }
          return ConsoleMetricExporter._sendMetrics(e, t)
        }
        forceFlush() {
          return Promise.resolve()
        }
        selectAggregationTemporality(e) {
          return o.AggregationTemporality.CUMULATIVE
        }
        shutdown() {
          this._shutdown = true
          return Promise.resolve()
        }
        static _sendMetrics(e, t) {
          for (const t of e.scopeMetrics) {
            for (const e of t.metrics) {
              console.dir({
                descriptor: e.descriptor,
                dataPointType: e.dataPointType,
                dataPoints: e.dataPoints,
              })
            }
          }
          t({ code: n.ExportResultCode.SUCCESS })
        }
      }
      t.ConsoleMetricExporter = ConsoleMetricExporter
    },
    4944: (e, t, r) => {
      Object.defineProperty(t, '__esModule', { value: true })
      t.InMemoryMetricExporter = void 0
      const n = r(245)
      class InMemoryMetricExporter {
        constructor(e) {
          this._shutdown = false
          this._metrics = []
          this._aggregationTemporality = e
        }
        export(e, t) {
          if (this._shutdown) {
            setTimeout(() => t({ code: n.ExportResultCode.FAILED }), 0)
            return
          }
          this._metrics.push(e)
          setTimeout(() => t({ code: n.ExportResultCode.SUCCESS }), 0)
        }
        getMetrics() {
          return this._metrics
        }
        forceFlush() {
          return Promise.resolve()
        }
        reset() {
          this._metrics = []
        }
        selectAggregationTemporality(e) {
          return this._aggregationTemporality
        }
        shutdown() {
          this._shutdown = true
          return Promise.resolve()
        }
      }
      t.InMemoryMetricExporter = InMemoryMetricExporter
    },
    9899: (e, t) => {
      Object.defineProperty(t, '__esModule', { value: true })
      t.DataPointType = void 0
      var r
      ;(function (e) {
        e[(e['HISTOGRAM'] = 0)] = 'HISTOGRAM'
        e[(e['EXPONENTIAL_HISTOGRAM'] = 1)] = 'EXPONENTIAL_HISTOGRAM'
        e[(e['GAUGE'] = 2)] = 'GAUGE'
        e[(e['SUM'] = 3)] = 'SUM'
      })((r = t.DataPointType || (t.DataPointType = {})))
    },
    5261: (e, t, r) => {
      Object.defineProperty(t, '__esModule', { value: true })
      t.MetricReader = void 0
      const n = r(8720)
      const o = r(5570)
      const i = r(4796)
      class MetricReader {
        constructor(e) {
          var t, r
          this._shutdown = false
          this._aggregationSelector =
            (t =
              e === null || e === void 0 ? void 0 : e.aggregationSelector) !==
              null && t !== void 0
              ? t
              : i.DEFAULT_AGGREGATION_SELECTOR
          this._aggregationTemporalitySelector =
            (r =
              e === null || e === void 0
                ? void 0
                : e.aggregationTemporalitySelector) !== null && r !== void 0
              ? r
              : i.DEFAULT_AGGREGATION_TEMPORALITY_SELECTOR
        }
        setMetricProducer(e) {
          if (this._metricProducer) {
            throw new Error(
              'MetricReader can not be bound to a MeterProvider again.'
            )
          }
          this._metricProducer = e
          this.onInitialized()
        }
        selectAggregation(e) {
          return this._aggregationSelector(e)
        }
        selectAggregationTemporality(e) {
          return this._aggregationTemporalitySelector(e)
        }
        onInitialized() {}
        async collect(e) {
          if (this._metricProducer === undefined) {
            throw new Error('MetricReader is not bound to a MetricProducer')
          }
          if (this._shutdown) {
            throw new Error('MetricReader is shutdown')
          }
          return this._metricProducer.collect({
            timeoutMillis:
              e === null || e === void 0 ? void 0 : e.timeoutMillis,
          })
        }
        async shutdown(e) {
          if (this._shutdown) {
            n.diag.error('Cannot call shutdown twice.')
            return
          }
          if ((e === null || e === void 0 ? void 0 : e.timeoutMillis) == null) {
            await this.onShutdown()
          } else {
            await (0, o.callWithTimeout)(this.onShutdown(), e.timeoutMillis)
          }
          this._shutdown = true
        }
        async forceFlush(e) {
          if (this._shutdown) {
            n.diag.warn('Cannot forceFlush on already shutdown MetricReader.')
            return
          }
          if ((e === null || e === void 0 ? void 0 : e.timeoutMillis) == null) {
            await this.onForceFlush()
            return
          }
          await (0, o.callWithTimeout)(this.onForceFlush(), e.timeoutMillis)
        }
      }
      t.MetricReader = MetricReader
    },
    5604: (e, t, r) => {
      Object.defineProperty(t, '__esModule', { value: true })
      t.PeriodicExportingMetricReader = void 0
      const n = r(8720)
      const o = r(245)
      const i = r(5261)
      const s = r(5570)
      class PeriodicExportingMetricReader extends i.MetricReader {
        constructor(e) {
          var t, r, n, o
          super({
            aggregationSelector:
              (t = e.exporter.selectAggregation) === null || t === void 0
                ? void 0
                : t.bind(e.exporter),
            aggregationTemporalitySelector:
              (r = e.exporter.selectAggregationTemporality) === null ||
              r === void 0
                ? void 0
                : r.bind(e.exporter),
          })
          if (
            e.exportIntervalMillis !== undefined &&
            e.exportIntervalMillis <= 0
          ) {
            throw Error('exportIntervalMillis must be greater than 0')
          }
          if (
            e.exportTimeoutMillis !== undefined &&
            e.exportTimeoutMillis <= 0
          ) {
            throw Error('exportTimeoutMillis must be greater than 0')
          }
          if (
            e.exportTimeoutMillis !== undefined &&
            e.exportIntervalMillis !== undefined &&
            e.exportIntervalMillis < e.exportTimeoutMillis
          ) {
            throw Error(
              'exportIntervalMillis must be greater than or equal to exportTimeoutMillis'
            )
          }
          this._exportInterval =
            (n = e.exportIntervalMillis) !== null && n !== void 0 ? n : 6e4
          this._exportTimeout =
            (o = e.exportTimeoutMillis) !== null && o !== void 0 ? o : 3e4
          this._exporter = e.exporter
        }
        async _runOnce() {
          const { resourceMetrics: e, errors: t } = await this.collect({})
          if (t.length > 0) {
            n.diag.error(
              'PeriodicExportingMetricReader: metrics collection errors',
              ...t
            )
          }
          return new Promise((t, r) => {
            this._exporter.export(e, (e) => {
              var n
              if (e.code !== o.ExportResultCode.SUCCESS) {
                r(
                  (n = e.error) !== null && n !== void 0
                    ? n
                    : new Error(
                        `PeriodicExportingMetricReader: metrics export failed (error ${e.error})`
                      )
                )
              } else {
                t()
              }
            })
          })
        }
        onInitialized() {
          this._interval = setInterval(async () => {
            try {
              await (0, s.callWithTimeout)(this._runOnce(), this._exportTimeout)
            } catch (e) {
              if (e instanceof s.TimeoutError) {
                n.diag.error(
                  'Export took longer than %s milliseconds and timed out.',
                  this._exportTimeout
                )
                return
              }
              ;(0, o.globalErrorHandler)(e)
            }
          }, this._exportInterval)
          ;(0, o.unrefTimer)(this._interval)
        }
        async onForceFlush() {
          await this._exporter.forceFlush()
        }
        async onShutdown() {
          if (this._interval) {
            clearInterval(this._interval)
          }
          await this._exporter.shutdown()
        }
      }
      t.PeriodicExportingMetricReader = PeriodicExportingMetricReader
    },
    7289: (e, t, r) => {
      Object.defineProperty(t, '__esModule', { value: true })
      t.TimeoutError =
        t.View =
        t.Aggregation =
        t.SumAggregation =
        t.LastValueAggregation =
        t.HistogramAggregation =
        t.DropAggregation =
        t.ExplicitBucketHistogramAggregation =
        t.DefaultAggregation =
        t.MeterProvider =
        t.InstrumentType =
        t.ConsoleMetricExporter =
        t.InMemoryMetricExporter =
        t.PeriodicExportingMetricReader =
        t.MetricReader =
        t.DataPointType =
        t.AggregationTemporality =
          void 0
      var n = r(1656)
      Object.defineProperty(t, 'AggregationTemporality', {
        enumerable: true,
        get: function () {
          return n.AggregationTemporality
        },
      })
      var o = r(9899)
      Object.defineProperty(t, 'DataPointType', {
        enumerable: true,
        get: function () {
          return o.DataPointType
        },
      })
      var i = r(5261)
      Object.defineProperty(t, 'MetricReader', {
        enumerable: true,
        get: function () {
          return i.MetricReader
        },
      })
      var s = r(5604)
      Object.defineProperty(t, 'PeriodicExportingMetricReader', {
        enumerable: true,
        get: function () {
          return s.PeriodicExportingMetricReader
        },
      })
      var a = r(4944)
      Object.defineProperty(t, 'InMemoryMetricExporter', {
        enumerable: true,
        get: function () {
          return a.InMemoryMetricExporter
        },
      })
      var c = r(5297)
      Object.defineProperty(t, 'ConsoleMetricExporter', {
        enumerable: true,
        get: function () {
          return c.ConsoleMetricExporter
        },
      })
      var u = r(8745)
      Object.defineProperty(t, 'InstrumentType', {
        enumerable: true,
        get: function () {
          return u.InstrumentType
        },
      })
      var l = r(7909)
      Object.defineProperty(t, 'MeterProvider', {
        enumerable: true,
        get: function () {
          return l.MeterProvider
        },
      })
      var d = r(3213)
      Object.defineProperty(t, 'DefaultAggregation', {
        enumerable: true,
        get: function () {
          return d.DefaultAggregation
        },
      })
      Object.defineProperty(t, 'ExplicitBucketHistogramAggregation', {
        enumerable: true,
        get: function () {
          return d.ExplicitBucketHistogramAggregation
        },
      })
      Object.defineProperty(t, 'DropAggregation', {
        enumerable: true,
        get: function () {
          return d.DropAggregation
        },
      })
      Object.defineProperty(t, 'HistogramAggregation', {
        enumerable: true,
        get: function () {
          return d.HistogramAggregation
        },
      })
      Object.defineProperty(t, 'LastValueAggregation', {
        enumerable: true,
        get: function () {
          return d.LastValueAggregation
        },
      })
      Object.defineProperty(t, 'SumAggregation', {
        enumerable: true,
        get: function () {
          return d.SumAggregation
        },
      })
      Object.defineProperty(t, 'Aggregation', {
        enumerable: true,
        get: function () {
          return d.Aggregation
        },
      })
      var p = r(5937)
      Object.defineProperty(t, 'View', {
        enumerable: true,
        get: function () {
          return p.View
        },
      })
      var g = r(5570)
      Object.defineProperty(t, 'TimeoutError', {
        enumerable: true,
        get: function () {
          return g.TimeoutError
        },
      })
    },
    2224: (e, t, r) => {
      Object.defineProperty(t, '__esModule', { value: true })
      t.AsyncMetricStorage = void 0
      const n = r(9039)
      const o = r(3571)
      const i = r(8721)
      const s = r(7090)
      class AsyncMetricStorage extends n.MetricStorage {
        constructor(e, t, r) {
          super(e)
          this._attributesProcessor = r
          this._deltaMetricStorage = new o.DeltaMetricProcessor(t)
          this._temporalMetricStorage = new i.TemporalMetricProcessor(t)
        }
        record(e, t) {
          const r = new s.AttributeHashMap()
          Array.from(e.entries()).forEach(([e, t]) => {
            r.set(this._attributesProcessor.process(e), t)
          })
          this._deltaMetricStorage.batchCumulate(r, t)
        }
        collect(e, t, r) {
          const n = this._deltaMetricStorage.collect()
          return this._temporalMetricStorage.buildMetrics(
            e,
            t,
            this._instrumentDescriptor,
            n,
            r
          )
        }
      }
      t.AsyncMetricStorage = AsyncMetricStorage
    },
    3571: (e, t, r) => {
      Object.defineProperty(t, '__esModule', { value: true })
      t.DeltaMetricProcessor = void 0
      const n = r(7090)
      class DeltaMetricProcessor {
        constructor(e) {
          this._aggregator = e
          this._activeCollectionStorage = new n.AttributeHashMap()
          this._cumulativeMemoStorage = new n.AttributeHashMap()
        }
        record(e, t, r, n) {
          const o = this._activeCollectionStorage.getOrDefault(t, () =>
            this._aggregator.createAccumulation(n)
          )
          o === null || o === void 0 ? void 0 : o.record(e)
        }
        batchCumulate(e, t) {
          Array.from(e.entries()).forEach(([e, r, n]) => {
            const o = this._aggregator.createAccumulation(t)
            o === null || o === void 0 ? void 0 : o.record(r)
            let i = o
            if (this._cumulativeMemoStorage.has(e, n)) {
              const t = this._cumulativeMemoStorage.get(e, n)
              i = this._aggregator.diff(t, o)
            }
            this._cumulativeMemoStorage.set(e, o, n)
            this._activeCollectionStorage.set(e, i, n)
          })
        }
        collect() {
          const e = this._activeCollectionStorage
          this._activeCollectionStorage = new n.AttributeHashMap()
          return e
        }
      }
      t.DeltaMetricProcessor = DeltaMetricProcessor
    },
    7090: (e, t, r) => {
      Object.defineProperty(t, '__esModule', { value: true })
      t.AttributeHashMap = t.HashMap = void 0
      const n = r(5570)
      class HashMap {
        constructor(e) {
          this._hash = e
          this._valueMap = new Map()
          this._keyMap = new Map()
        }
        get(e, t) {
          t !== null && t !== void 0 ? t : (t = this._hash(e))
          return this._valueMap.get(t)
        }
        getOrDefault(e, t) {
          const r = this._hash(e)
          if (this._valueMap.has(r)) {
            return this._valueMap.get(r)
          }
          const n = t()
          if (!this._keyMap.has(r)) {
            this._keyMap.set(r, e)
          }
          this._valueMap.set(r, n)
          return n
        }
        set(e, t, r) {
          r !== null && r !== void 0 ? r : (r = this._hash(e))
          if (!this._keyMap.has(r)) {
            this._keyMap.set(r, e)
          }
          this._valueMap.set(r, t)
        }
        has(e, t) {
          t !== null && t !== void 0 ? t : (t = this._hash(e))
          return this._valueMap.has(t)
        }
        *keys() {
          const e = this._keyMap.entries()
          let t = e.next()
          while (t.done !== true) {
            yield [t.value[1], t.value[0]]
            t = e.next()
          }
        }
        *entries() {
          const e = this._valueMap.entries()
          let t = e.next()
          while (t.done !== true) {
            yield [this._keyMap.get(t.value[0]), t.value[1], t.value[0]]
            t = e.next()
          }
        }
        get size() {
          return this._valueMap.size
        }
      }
      t.HashMap = HashMap
      class AttributeHashMap extends HashMap {
        constructor() {
          super(n.hashAttributes)
        }
      }
      t.AttributeHashMap = AttributeHashMap
    },
    4301: (e, t, r) => {
      Object.defineProperty(t, '__esModule', { value: true })
      t.MeterProviderSharedState = void 0
      const n = r(5570)
      const o = r(5271)
      const i = r(6076)
      class MeterProviderSharedState {
        constructor(e) {
          this.resource = e
          this.viewRegistry = new o.ViewRegistry()
          this.metricCollectors = []
          this.meterSharedStates = new Map()
        }
        getMeterSharedState(e) {
          const t = (0, n.instrumentationScopeId)(e)
          let r = this.meterSharedStates.get(t)
          if (r == null) {
            r = new i.MeterSharedState(this, e)
            this.meterSharedStates.set(t, r)
          }
          return r
        }
        selectAggregations(e) {
          const t = []
          for (const r of this.metricCollectors) {
            t.push([r, r.selectAggregation(e)])
          }
          return t
        }
      }
      t.MeterProviderSharedState = MeterProviderSharedState
    },
    6076: (e, t, r) => {
      Object.defineProperty(t, '__esModule', { value: true })
      t.MeterSharedState = void 0
      const n = r(8745)
      const o = r(8170)
      const i = r(5570)
      const s = r(2224)
      const a = r(3540)
      const c = r(1205)
      const u = r(2002)
      const l = r(4927)
      const d = r(6984)
      class MeterSharedState {
        constructor(e, t) {
          this._meterProviderSharedState = e
          this._instrumentationScope = t
          this.metricStorageRegistry = new a.MetricStorageRegistry()
          this.observableRegistry = new u.ObservableRegistry()
          this.meter = new o.Meter(this)
        }
        registerMetricStorage(e) {
          const t = this._registerMetricStorage(e, l.SyncMetricStorage)
          if (t.length === 1) {
            return t[0]
          }
          return new c.MultiMetricStorage(t)
        }
        registerAsyncMetricStorage(e) {
          const t = this._registerMetricStorage(e, s.AsyncMetricStorage)
          return t
        }
        async collect(e, t, r) {
          const n = await this.observableRegistry.observe(
            t,
            r === null || r === void 0 ? void 0 : r.timeoutMillis
          )
          const o = Array.from(this.metricStorageRegistry.getStorages(e))
            .map((r) =>
              r.collect(e, this._meterProviderSharedState.metricCollectors, t)
            )
            .filter(i.isNotNullish)
          return {
            scopeMetrics: {
              scope: this._instrumentationScope,
              metrics: o.filter(i.isNotNullish),
            },
            errors: n,
          }
        }
        _registerMetricStorage(e, t) {
          const r = this._meterProviderSharedState.viewRegistry.findViews(
            e,
            this._instrumentationScope
          )
          let o = r.map((r) => {
            const o = (0, n.createInstrumentDescriptorWithView)(r, e)
            const i =
              this.metricStorageRegistry.findOrUpdateCompatibleStorage(o)
            if (i != null) {
              return i
            }
            const s = r.aggregation.createAggregator(o)
            const a = new t(o, s, r.attributesProcessor)
            this.metricStorageRegistry.register(a)
            return a
          })
          if (o.length === 0) {
            const r = this._meterProviderSharedState.selectAggregations(e.type)
            const n = r.map(([r, n]) => {
              const o =
                this.metricStorageRegistry.findOrUpdateCompatibleCollectorStorage(
                  r,
                  e
                )
              if (o != null) {
                return o
              }
              const i = n.createAggregator(e)
              const s = new t(e, i, d.AttributesProcessor.Noop())
              this.metricStorageRegistry.registerForCollector(r, s)
              return s
            })
            o = o.concat(n)
          }
          return o
        }
      }
      t.MeterSharedState = MeterSharedState
    },
    1729: (e, t, r) => {
      Object.defineProperty(t, '__esModule', { value: true })
      t.MetricCollector = void 0
      const n = r(245)
      const o = r(5570)
      class MetricCollector {
        constructor(e, t) {
          this._sharedState = e
          this._metricReader = t
        }
        async collect(e) {
          const t = (0, n.hrTime)()
          const r = Array.from(
            this._sharedState.meterSharedStates.values()
          ).map((r) => r.collect(this, t, e))
          const i = await Promise.all(r)
          return {
            resourceMetrics: {
              resource: this._sharedState.resource,
              scopeMetrics: i.map((e) => e.scopeMetrics),
            },
            errors: (0, o.FlatMap)(i, (e) => e.errors),
          }
        }
        async forceFlush(e) {
          await this._metricReader.forceFlush(e)
        }
        async shutdown(e) {
          await this._metricReader.shutdown(e)
        }
        selectAggregationTemporality(e) {
          return this._metricReader.selectAggregationTemporality(e)
        }
        selectAggregation(e) {
          return this._metricReader.selectAggregation(e)
        }
      }
      t.MetricCollector = MetricCollector
    },
    9039: (e, t, r) => {
      Object.defineProperty(t, '__esModule', { value: true })
      t.MetricStorage = void 0
      const n = r(8745)
      class MetricStorage {
        constructor(e) {
          this._instrumentDescriptor = e
        }
        getInstrumentDescriptor() {
          return this._instrumentDescriptor
        }
        updateDescription(e) {
          this._instrumentDescriptor = (0, n.createInstrumentDescriptor)(
            this._instrumentDescriptor.name,
            this._instrumentDescriptor.type,
            {
              description: e,
              valueType: this._instrumentDescriptor.valueType,
              unit: this._instrumentDescriptor.unit,
            }
          )
        }
      }
      t.MetricStorage = MetricStorage
    },
    3540: (e, t, r) => {
      Object.defineProperty(t, '__esModule', { value: true })
      t.MetricStorageRegistry = void 0
      const n = r(8745)
      const o = r(8720)
      const i = r(1839)
      class MetricStorageRegistry {
        constructor() {
          this._sharedRegistry = new Map()
          this._perCollectorRegistry = new Map()
        }
        static create() {
          return new MetricStorageRegistry()
        }
        getStorages(e) {
          let t = []
          for (const e of this._sharedRegistry.values()) {
            t = t.concat(e)
          }
          const r = this._perCollectorRegistry.get(e)
          if (r != null) {
            for (const e of r.values()) {
              t = t.concat(e)
            }
          }
          return t
        }
        register(e) {
          this._registerStorage(e, this._sharedRegistry)
        }
        registerForCollector(e, t) {
          let r = this._perCollectorRegistry.get(e)
          if (r == null) {
            r = new Map()
            this._perCollectorRegistry.set(e, r)
          }
          this._registerStorage(t, r)
        }
        findOrUpdateCompatibleStorage(e) {
          const t = this._sharedRegistry.get(e.name)
          if (t === undefined) {
            return null
          }
          return this._findOrUpdateCompatibleStorage(e, t)
        }
        findOrUpdateCompatibleCollectorStorage(e, t) {
          const r = this._perCollectorRegistry.get(e)
          if (r === undefined) {
            return null
          }
          const n = this._sharedRegistry.get(t.name)
          if (n === undefined) {
            return null
          }
          return this._findOrUpdateCompatibleStorage(t, n)
        }
        _registerStorage(e, t) {
          const r = e.getInstrumentDescriptor()
          const n = t.get(r.name)
          if (n === undefined) {
            t.set(r.name, [e])
            return
          }
          n.push(e)
        }
        _findOrUpdateCompatibleStorage(e, t) {
          let r = null
          for (const s of t) {
            const t = s.getInstrumentDescriptor()
            if ((0, n.isDescriptorCompatibleWith)(t, e)) {
              if (t.description !== e.description) {
                if (e.description.length > t.description.length) {
                  s.updateDescription(e.description)
                }
                o.diag.warn(
                  'A view or instrument with the name ',
                  e.name,
                  ' has already been registered, but has a different description and is incompatible with another registered view.\n',
                  'Details:\n',
                  (0, i.getIncompatibilityDetails)(t, e),
                  'The longer description will be used.\nTo resolve the conflict:',
                  (0, i.getConflictResolutionRecipe)(t, e)
                )
              }
              r = s
            } else {
              o.diag.warn(
                'A view or instrument with the name ',
                e.name,
                ' has already been registered and is incompatible with another registered view.\n',
                'Details:\n',
                (0, i.getIncompatibilityDetails)(t, e),
                'To resolve the conflict:\n',
                (0, i.getConflictResolutionRecipe)(t, e)
              )
            }
          }
          return r
        }
      }
      t.MetricStorageRegistry = MetricStorageRegistry
    },
    1205: (e, t) => {
      Object.defineProperty(t, '__esModule', { value: true })
      t.MultiMetricStorage = void 0
      class MultiMetricStorage {
        constructor(e) {
          this._backingStorages = e
        }
        record(e, t, r, n) {
          this._backingStorages.forEach((o) => {
            o.record(e, t, r, n)
          })
        }
      }
      t.MultiMetricStorage = MultiMetricStorage
    },
    2002: (e, t, r) => {
      Object.defineProperty(t, '__esModule', { value: true })
      t.ObservableRegistry = void 0
      const n = r(8720)
      const o = r(7833)
      const i = r(8178)
      const s = r(5570)
      class ObservableRegistry {
        constructor() {
          this._callbacks = []
          this._batchCallbacks = []
        }
        addCallback(e, t) {
          const r = this._findCallback(e, t)
          if (r >= 0) {
            return
          }
          this._callbacks.push({ callback: e, instrument: t })
        }
        removeCallback(e, t) {
          const r = this._findCallback(e, t)
          if (r < 0) {
            return
          }
          this._callbacks.splice(r, 1)
        }
        addBatchCallback(e, t) {
          const r = new Set(t.filter(o.isObservableInstrument))
          if (r.size === 0) {
            n.diag.error(
              'BatchObservableCallback is not associated with valid instruments',
              t
            )
            return
          }
          const i = this._findBatchCallback(e, r)
          if (i >= 0) {
            return
          }
          this._batchCallbacks.push({ callback: e, instruments: r })
        }
        removeBatchCallback(e, t) {
          const r = new Set(t.filter(o.isObservableInstrument))
          const n = this._findBatchCallback(e, r)
          if (n < 0) {
            return
          }
          this._batchCallbacks.splice(n, 1)
        }
        async observe(e, t) {
          const r = this._observeCallbacks(e, t)
          const n = this._observeBatchCallbacks(e, t)
          const o = await (0, s.PromiseAllSettled)([...r, ...n])
          const i = o
            .filter(s.isPromiseAllSettledRejectionResult)
            .map((e) => e.reason)
          return i
        }
        _observeCallbacks(e, t) {
          return this._callbacks.map(async ({ callback: r, instrument: n }) => {
            const o = new i.ObservableResultImpl(n._descriptor)
            let a = Promise.resolve(r(o))
            if (t != null) {
              a = (0, s.callWithTimeout)(a, t)
            }
            await a
            n._metricStorages.forEach((t) => {
              t.record(o._buffer, e)
            })
          })
        }
        _observeBatchCallbacks(e, t) {
          return this._batchCallbacks.map(
            async ({ callback: r, instruments: n }) => {
              const o = new i.BatchObservableResultImpl()
              let a = Promise.resolve(r(o))
              if (t != null) {
                a = (0, s.callWithTimeout)(a, t)
              }
              await a
              n.forEach((t) => {
                const r = o._buffer.get(t)
                if (r == null) {
                  return
                }
                t._metricStorages.forEach((t) => {
                  t.record(r, e)
                })
              })
            }
          )
        }
        _findCallback(e, t) {
          return this._callbacks.findIndex(
            (r) => r.callback === e && r.instrument === t
          )
        }
        _findBatchCallback(e, t) {
          return this._batchCallbacks.findIndex(
            (r) => r.callback === e && (0, s.setEquals)(r.instruments, t)
          )
        }
      }
      t.ObservableRegistry = ObservableRegistry
    },
    4927: (e, t, r) => {
      Object.defineProperty(t, '__esModule', { value: true })
      t.SyncMetricStorage = void 0
      const n = r(9039)
      const o = r(3571)
      const i = r(8721)
      class SyncMetricStorage extends n.MetricStorage {
        constructor(e, t, r) {
          super(e)
          this._attributesProcessor = r
          this._deltaMetricStorage = new o.DeltaMetricProcessor(t)
          this._temporalMetricStorage = new i.TemporalMetricProcessor(t)
        }
        record(e, t, r, n) {
          t = this._attributesProcessor.process(t, r)
          this._deltaMetricStorage.record(e, t, r, n)
        }
        collect(e, t, r) {
          const n = this._deltaMetricStorage.collect()
          return this._temporalMetricStorage.buildMetrics(
            e,
            t,
            this._instrumentDescriptor,
            n,
            r
          )
        }
      }
      t.SyncMetricStorage = SyncMetricStorage
    },
    8721: (e, t, r) => {
      Object.defineProperty(t, '__esModule', { value: true })
      t.TemporalMetricProcessor = void 0
      const n = r(1656)
      const o = r(7090)
      class TemporalMetricProcessor {
        constructor(e) {
          this._aggregator = e
          this._unreportedAccumulations = new Map()
          this._reportHistory = new Map()
        }
        buildMetrics(e, t, r, o, i) {
          this._stashAccumulations(t, o)
          const s = this._getMergedUnreportedAccumulations(e)
          let a = s
          let c
          if (this._reportHistory.has(e)) {
            const t = this._reportHistory.get(e)
            const r = t.collectionTime
            c = t.aggregationTemporality
            if (c === n.AggregationTemporality.CUMULATIVE) {
              a = TemporalMetricProcessor.merge(
                t.accumulations,
                s,
                this._aggregator
              )
            } else {
              a = TemporalMetricProcessor.calibrateStartTime(
                t.accumulations,
                s,
                r
              )
            }
          } else {
            c = e.selectAggregationTemporality(r.type)
          }
          this._reportHistory.set(e, {
            accumulations: a,
            collectionTime: i,
            aggregationTemporality: c,
          })
          return this._aggregator.toMetricData(
            r,
            c,
            AttributesMapToAccumulationRecords(a),
            i
          )
        }
        _stashAccumulations(e, t) {
          e.forEach((e) => {
            let r = this._unreportedAccumulations.get(e)
            if (r === undefined) {
              r = []
              this._unreportedAccumulations.set(e, r)
            }
            r.push(t)
          })
        }
        _getMergedUnreportedAccumulations(e) {
          let t = new o.AttributeHashMap()
          const r = this._unreportedAccumulations.get(e)
          this._unreportedAccumulations.set(e, [])
          if (r === undefined) {
            return t
          }
          for (const e of r) {
            t = TemporalMetricProcessor.merge(t, e, this._aggregator)
          }
          return t
        }
        static merge(e, t, r) {
          const n = e
          const o = t.entries()
          let i = o.next()
          while (i.done !== true) {
            const [t, s, a] = i.value
            if (e.has(t, a)) {
              const o = e.get(t, a)
              const i = r.merge(o, s)
              n.set(t, i, a)
            } else {
              n.set(t, s, a)
            }
            i = o.next()
          }
          return n
        }
        static calibrateStartTime(e, t, r) {
          for (const [n, o] of e.keys()) {
            const e = t.get(n, o)
            e === null || e === void 0 ? void 0 : e.setStartTime(r)
          }
          return t
        }
      }
      t.TemporalMetricProcessor = TemporalMetricProcessor
      function AttributesMapToAccumulationRecords(e) {
        return Array.from(e.entries())
      }
    },
    5570: (e, t) => {
      Object.defineProperty(t, '__esModule', { value: true })
      t.setEquals =
        t.FlatMap =
        t.isPromiseAllSettledRejectionResult =
        t.PromiseAllSettled =
        t.callWithTimeout =
        t.TimeoutError =
        t.instrumentationScopeId =
        t.hashAttributes =
        t.isNotNullish =
          void 0
      function isNotNullish(e) {
        return e !== undefined && e !== null
      }
      t.isNotNullish = isNotNullish
      function hashAttributes(e) {
        let t = Object.keys(e)
        if (t.length === 0) return ''
        t = t.sort()
        return JSON.stringify(t.map((t) => [t, e[t]]))
      }
      t.hashAttributes = hashAttributes
      function instrumentationScopeId(e) {
        var t, r
        return `${e.name}:${
          (t = e.version) !== null && t !== void 0 ? t : ''
        }:${(r = e.schemaUrl) !== null && r !== void 0 ? r : ''}`
      }
      t.instrumentationScopeId = instrumentationScopeId
      class TimeoutError extends Error {
        constructor(e) {
          super(e)
          Object.setPrototypeOf(this, TimeoutError.prototype)
        }
      }
      t.TimeoutError = TimeoutError
      function callWithTimeout(e, t) {
        let r
        const n = new Promise(function timeoutFunction(e, n) {
          r = setTimeout(function timeoutHandler() {
            n(new TimeoutError('Operation timed out.'))
          }, t)
        })
        return Promise.race([e, n]).then(
          (e) => {
            clearTimeout(r)
            return e
          },
          (e) => {
            clearTimeout(r)
            throw e
          }
        )
      }
      t.callWithTimeout = callWithTimeout
      async function PromiseAllSettled(e) {
        return Promise.all(
          e.map(async (e) => {
            try {
              const t = await e
              return { status: 'fulfilled', value: t }
            } catch (e) {
              return { status: 'rejected', reason: e }
            }
          })
        )
      }
      t.PromiseAllSettled = PromiseAllSettled
      function isPromiseAllSettledRejectionResult(e) {
        return e.status === 'rejected'
      }
      t.isPromiseAllSettledRejectionResult = isPromiseAllSettledRejectionResult
      function FlatMap(e, t) {
        const r = []
        e.forEach((e) => {
          r.push(...t(e))
        })
        return r
      }
      t.FlatMap = FlatMap
      function setEquals(e, t) {
        if (e.size !== t.size) {
          return false
        }
        for (const r of e) {
          if (!t.has(r)) {
            return false
          }
        }
        return true
      }
      t.setEquals = setEquals
    },
    3213: (e, t, r) => {
      Object.defineProperty(t, '__esModule', { value: true })
      t.DefaultAggregation =
        t.ExplicitBucketHistogramAggregation =
        t.HistogramAggregation =
        t.LastValueAggregation =
        t.SumAggregation =
        t.DropAggregation =
        t.Aggregation =
          void 0
      const n = r(8720)
      const o = r(3989)
      const i = r(8745)
      class Aggregation {
        static Drop() {
          return s
        }
        static Sum() {
          return a
        }
        static LastValue() {
          return c
        }
        static Histogram() {
          return u
        }
        static Default() {
          return l
        }
      }
      t.Aggregation = Aggregation
      class DropAggregation extends Aggregation {
        createAggregator(e) {
          return DropAggregation.DEFAULT_INSTANCE
        }
      }
      t.DropAggregation = DropAggregation
      DropAggregation.DEFAULT_INSTANCE = new o.DropAggregator()
      class SumAggregation extends Aggregation {
        createAggregator(e) {
          switch (e.type) {
            case i.InstrumentType.COUNTER:
            case i.InstrumentType.OBSERVABLE_COUNTER:
            case i.InstrumentType.HISTOGRAM: {
              return SumAggregation.MONOTONIC_INSTANCE
            }
            default: {
              return SumAggregation.NON_MONOTONIC_INSTANCE
            }
          }
        }
      }
      t.SumAggregation = SumAggregation
      SumAggregation.MONOTONIC_INSTANCE = new o.SumAggregator(true)
      SumAggregation.NON_MONOTONIC_INSTANCE = new o.SumAggregator(false)
      class LastValueAggregation extends Aggregation {
        createAggregator(e) {
          return LastValueAggregation.DEFAULT_INSTANCE
        }
      }
      t.LastValueAggregation = LastValueAggregation
      LastValueAggregation.DEFAULT_INSTANCE = new o.LastValueAggregator()
      class HistogramAggregation extends Aggregation {
        createAggregator(e) {
          return HistogramAggregation.DEFAULT_INSTANCE
        }
      }
      t.HistogramAggregation = HistogramAggregation
      HistogramAggregation.DEFAULT_INSTANCE = new o.HistogramAggregator(
        [0, 5, 10, 25, 50, 75, 100, 250, 500, 1e3],
        true
      )
      class ExplicitBucketHistogramAggregation extends Aggregation {
        constructor(e, t = true) {
          super()
          this._recordMinMax = t
          if (e === undefined || e.length === 0) {
            throw new Error(
              'HistogramAggregator should be created with boundaries.'
            )
          }
          e = e.concat()
          e = e.sort((e, t) => e - t)
          const r = e.lastIndexOf(-Infinity)
          let n = e.indexOf(Infinity)
          if (n === -1) {
            n = undefined
          }
          this._boundaries = e.slice(r + 1, n)
        }
        createAggregator(e) {
          return new o.HistogramAggregator(this._boundaries, this._recordMinMax)
        }
      }
      t.ExplicitBucketHistogramAggregation = ExplicitBucketHistogramAggregation
      class DefaultAggregation extends Aggregation {
        _resolve(e) {
          switch (e.type) {
            case i.InstrumentType.COUNTER:
            case i.InstrumentType.UP_DOWN_COUNTER:
            case i.InstrumentType.OBSERVABLE_COUNTER:
            case i.InstrumentType.OBSERVABLE_UP_DOWN_COUNTER: {
              return a
            }
            case i.InstrumentType.OBSERVABLE_GAUGE: {
              return c
            }
            case i.InstrumentType.HISTOGRAM: {
              return u
            }
          }
          n.diag.warn(`Unable to recognize instrument type: ${e.type}`)
          return s
        }
        createAggregator(e) {
          return this._resolve(e).createAggregator(e)
        }
      }
      t.DefaultAggregation = DefaultAggregation
      const s = new DropAggregation()
      const a = new SumAggregation()
      const c = new LastValueAggregation()
      const u = new HistogramAggregation()
      const l = new DefaultAggregation()
    },
    6984: (e, t) => {
      Object.defineProperty(t, '__esModule', { value: true })
      t.FilteringAttributesProcessor =
        t.NoopAttributesProcessor =
        t.AttributesProcessor =
          void 0
      class AttributesProcessor {
        static Noop() {
          return r
        }
      }
      t.AttributesProcessor = AttributesProcessor
      class NoopAttributesProcessor extends AttributesProcessor {
        process(e, t) {
          return e
        }
      }
      t.NoopAttributesProcessor = NoopAttributesProcessor
      class FilteringAttributesProcessor extends AttributesProcessor {
        constructor(e) {
          super()
          this._allowedAttributeNames = e
        }
        process(e, t) {
          const r = {}
          Object.keys(e)
            .filter((e) => this._allowedAttributeNames.includes(e))
            .forEach((t) => (r[t] = e[t]))
          return r
        }
      }
      t.FilteringAttributesProcessor = FilteringAttributesProcessor
      const r = new NoopAttributesProcessor()
    },
    956: (e, t, r) => {
      Object.defineProperty(t, '__esModule', { value: true })
      t.InstrumentSelector = void 0
      const n = r(9155)
      class InstrumentSelector {
        constructor(e) {
          var t
          this._nameFilter = new n.PatternPredicate(
            (t = e === null || e === void 0 ? void 0 : e.name) !== null &&
            t !== void 0
              ? t
              : '*'
          )
          this._type = e === null || e === void 0 ? void 0 : e.type
        }
        getType() {
          return this._type
        }
        getNameFilter() {
          return this._nameFilter
        }
      }
      t.InstrumentSelector = InstrumentSelector
    },
    2787: (e, t, r) => {
      Object.defineProperty(t, '__esModule', { value: true })
      t.MeterSelector = void 0
      const n = r(9155)
      class MeterSelector {
        constructor(e) {
          this._nameFilter = new n.ExactPredicate(
            e === null || e === void 0 ? void 0 : e.name
          )
          this._versionFilter = new n.ExactPredicate(
            e === null || e === void 0 ? void 0 : e.version
          )
          this._schemaUrlFilter = new n.ExactPredicate(
            e === null || e === void 0 ? void 0 : e.schemaUrl
          )
        }
        getNameFilter() {
          return this._nameFilter
        }
        getVersionFilter() {
          return this._versionFilter
        }
        getSchemaUrlFilter() {
          return this._schemaUrlFilter
        }
      }
      t.MeterSelector = MeterSelector
    },
    9155: (e, t) => {
      Object.defineProperty(t, '__esModule', { value: true })
      t.ExactPredicate = t.PatternPredicate = void 0
      const r = /[\^$\\.+?()[\]{}|]/g
      class PatternPredicate {
        constructor(e) {
          if (e === '*') {
            this._matchAll = true
            this._regexp = /.*/
          } else {
            this._matchAll = false
            this._regexp = new RegExp(PatternPredicate.escapePattern(e))
          }
        }
        match(e) {
          if (this._matchAll) {
            return true
          }
          return this._regexp.test(e)
        }
        static escapePattern(e) {
          return `^${e.replace(r, '\\$&').replace('*', '.*')}$`
        }
        static hasWildcard(e) {
          return e.includes('*')
        }
      }
      t.PatternPredicate = PatternPredicate
      class ExactPredicate {
        constructor(e) {
          this._matchAll = e === undefined
          this._pattern = e
        }
        match(e) {
          if (this._matchAll) {
            return true
          }
          if (e === this._pattern) {
            return true
          }
          return false
        }
      }
      t.ExactPredicate = ExactPredicate
    },
    1839: (e, t) => {
      Object.defineProperty(t, '__esModule', { value: true })
      t.getConflictResolutionRecipe =
        t.getDescriptionResolutionRecipe =
        t.getTypeConflictResolutionRecipe =
        t.getUnitConflictResolutionRecipe =
        t.getValueTypeConflictResolutionRecipe =
        t.getIncompatibilityDetails =
          void 0
      function getIncompatibilityDetails(e, t) {
        let r = ''
        if (e.unit !== t.unit) {
          r += `\t- Unit '${e.unit}' does not match '${t.unit}'\n`
        }
        if (e.type !== t.type) {
          r += `\t- Type '${e.type}' does not match '${t.type}'\n`
        }
        if (e.valueType !== t.valueType) {
          r += `\t- Value Type '${e.valueType}' does not match '${t.valueType}'\n`
        }
        if (e.description !== t.description) {
          r += `\t- Description '${e.description}' does not match '${t.description}'\n`
        }
        return r
      }
      t.getIncompatibilityDetails = getIncompatibilityDetails
      function getValueTypeConflictResolutionRecipe(e, t) {
        return `\t- use valueType '${e.valueType}' on instrument creation or use an instrument name other than '${t.name}'`
      }
      t.getValueTypeConflictResolutionRecipe =
        getValueTypeConflictResolutionRecipe
      function getUnitConflictResolutionRecipe(e, t) {
        return `\t- use unit '${e.unit}' on instrument creation or use an instrument name other than '${t.name}'`
      }
      t.getUnitConflictResolutionRecipe = getUnitConflictResolutionRecipe
      function getTypeConflictResolutionRecipe(e, t) {
        const r = { name: t.name, type: t.type }
        const n = JSON.stringify(r)
        return `\t- create a new view with a name other than '${e.name}' and InstrumentSelector '${n}'`
      }
      t.getTypeConflictResolutionRecipe = getTypeConflictResolutionRecipe
      function getDescriptionResolutionRecipe(e, t) {
        const r = { name: t.name, type: t.type }
        const n = JSON.stringify(r)
        return `\t- create a new view with a name other than '${e.name}' and InstrumentSelector '${n}'\n    \t- OR - create a new view with the name ${e.name} and description '${e.description}' and InstrumentSelector ${n}\n    \t- OR - create a new view with the name ${t.name} and description '${e.description}' and InstrumentSelector ${n}`
      }
      t.getDescriptionResolutionRecipe = getDescriptionResolutionRecipe
      function getConflictResolutionRecipe(e, t) {
        if (e.valueType !== t.valueType) {
          return getValueTypeConflictResolutionRecipe(e, t)
        }
        if (e.unit !== t.unit) {
          return getUnitConflictResolutionRecipe(e, t)
        }
        if (e.type !== t.type) {
          return getTypeConflictResolutionRecipe(e, t)
        }
        if (e.description !== t.description) {
          return getDescriptionResolutionRecipe(e, t)
        }
        return ''
      }
      t.getConflictResolutionRecipe = getConflictResolutionRecipe
    },
    5937: (e, t, r) => {
      Object.defineProperty(t, '__esModule', { value: true })
      t.View = void 0
      const n = r(9155)
      const o = r(6984)
      const i = r(956)
      const s = r(2787)
      const a = r(3213)
      function isSelectorNotProvided(e) {
        return (
          e.instrumentName == null &&
          e.instrumentType == null &&
          e.meterName == null &&
          e.meterVersion == null &&
          e.meterSchemaUrl == null
        )
      }
      class View {
        constructor(e) {
          var t
          if (isSelectorNotProvided(e)) {
            throw new Error(
              'Cannot create view with no selector arguments supplied'
            )
          }
          if (
            e.name != null &&
            ((e === null || e === void 0 ? void 0 : e.instrumentName) == null ||
              n.PatternPredicate.hasWildcard(e.instrumentName))
          ) {
            throw new Error(
              'Views with a specified name must be declared with an instrument selector that selects at most one instrument per meter.'
            )
          }
          if (e.attributeKeys != null) {
            this.attributesProcessor = new o.FilteringAttributesProcessor(
              e.attributeKeys
            )
          } else {
            this.attributesProcessor = o.AttributesProcessor.Noop()
          }
          this.name = e.name
          this.description = e.description
          this.aggregation =
            (t = e.aggregation) !== null && t !== void 0
              ? t
              : a.Aggregation.Default()
          this.instrumentSelector = new i.InstrumentSelector({
            name: e.instrumentName,
            type: e.instrumentType,
          })
          this.meterSelector = new s.MeterSelector({
            name: e.meterName,
            version: e.meterVersion,
            schemaUrl: e.meterSchemaUrl,
          })
        }
      }
      t.View = View
    },
    5271: (e, t) => {
      Object.defineProperty(t, '__esModule', { value: true })
      t.ViewRegistry = void 0
      class ViewRegistry {
        constructor() {
          this._registeredViews = []
        }
        addView(e) {
          this._registeredViews.push(e)
        }
        findViews(e, t) {
          const r = this._registeredViews.filter(
            (r) =>
              this._matchInstrument(r.instrumentSelector, e) &&
              this._matchMeter(r.meterSelector, t)
          )
          return r
        }
        _matchInstrument(e, t) {
          return (
            (e.getType() === undefined || t.type === e.getType()) &&
            e.getNameFilter().match(t.name)
          )
        }
        _matchMeter(e, t) {
          return (
            e.getNameFilter().match(t.name) &&
            (t.version === undefined ||
              e.getVersionFilter().match(t.version)) &&
            (t.schemaUrl === undefined ||
              e.getSchemaUrlFilter().match(t.schemaUrl))
          )
        }
      }
      t.ViewRegistry = ViewRegistry
    },
    3685: (e) => {
      e.exports = require('http')
    },
    5687: (e) => {
      e.exports = require('https')
    },
    8720: (e) => {
      e.exports = require('next/dist/compiled/@opentelemetry/api')
    },
    8314: (e) => {
      e.exports = require('next/dist/compiled/@opentelemetry/resources')
    },
    3190: (e) => {
      e.exports = require('next/dist/compiled/@opentelemetry/semantic-conventions')
    },
    2037: (e) => {
      e.exports = require('os')
    },
    4074: (e) => {
      e.exports = require('perf_hooks')
    },
    2781: (e) => {
      e.exports = require('stream')
    },
    7310: (e) => {
      e.exports = require('url')
    },
    9796: (e) => {
      e.exports = require('zlib')
    },
  }
  var t = {}
  function __nccwpck_require__(r) {
    var n = t[r]
    if (n !== undefined) {
      return n.exports
    }
    var o = (t[r] = { exports: {} })
    var i = true
    try {
      e[r].call(o.exports, o, o.exports, __nccwpck_require__)
      i = false
    } finally {
      if (i) delete t[r]
    }
    return o.exports
  }
  if (typeof __nccwpck_require__ !== 'undefined')
    __nccwpck_require__.ab = __dirname + '/'
  var r = __nccwpck_require__(9926)
  module.exports = r
})()
