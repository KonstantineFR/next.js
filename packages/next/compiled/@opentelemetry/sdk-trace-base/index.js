;(() => {
  'use strict'
  var e = {
    577: (e, t) => {
      Object.defineProperty(t, '__esModule', { value: true })
      t.ExportResultCode = void 0
      var r
      ;(function (e) {
        e[(e['SUCCESS'] = 0)] = 'SUCCESS'
        e[(e['FAILED'] = 1)] = 'FAILED'
      })((r = t.ExportResultCode || (t.ExportResultCode = {})))
    },
    4466: (e, t) => {
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
    9537: (e, t, r) => {
      Object.defineProperty(t, '__esModule', { value: true })
      t.W3CBaggagePropagator = void 0
      const n = r(8720)
      const i = r(9665)
      const o = r(4466)
      const s = r(1760)
      class W3CBaggagePropagator {
        inject(e, t, r) {
          const a = n.propagation.getBaggage(e)
          if (!a || (0, i.isTracingSuppressed)(e)) return
          const l = (0, s.getKeyPairs)(a)
            .filter((e) => e.length <= o.BAGGAGE_MAX_PER_NAME_VALUE_PAIRS)
            .slice(0, o.BAGGAGE_MAX_NAME_VALUE_PAIRS)
          const u = (0, s.serializeKeyPairs)(l)
          if (u.length > 0) {
            r.set(t, o.BAGGAGE_HEADER, u)
          }
        }
        extract(e, t, r) {
          const i = r.get(t, o.BAGGAGE_HEADER)
          const a = Array.isArray(i) ? i.join(o.BAGGAGE_ITEMS_SEPARATOR) : i
          if (!a) return e
          const l = {}
          if (a.length === 0) {
            return e
          }
          const u = a.split(o.BAGGAGE_ITEMS_SEPARATOR)
          u.forEach((e) => {
            const t = (0, s.parsePairKeyValue)(e)
            if (t) {
              const e = { value: t.value }
              if (t.metadata) {
                e.metadata = t.metadata
              }
              l[t.key] = e
            }
          })
          if (Object.entries(l).length === 0) {
            return e
          }
          return n.propagation.setBaggage(e, n.propagation.createBaggage(l))
        }
        fields() {
          return [o.BAGGAGE_HEADER]
        }
      }
      t.W3CBaggagePropagator = W3CBaggagePropagator
    },
    1760: (e, t, r) => {
      Object.defineProperty(t, '__esModule', { value: true })
      t.parseKeyPairsIntoRecord =
        t.parsePairKeyValue =
        t.getKeyPairs =
        t.serializeKeyPairs =
          void 0
      const n = r(8720)
      const i = r(4466)
      function serializeKeyPairs(e) {
        return e.reduce((e, t) => {
          const r = `${e}${e !== '' ? i.BAGGAGE_ITEMS_SEPARATOR : ''}${t}`
          return r.length > i.BAGGAGE_MAX_TOTAL_LENGTH ? e : r
        }, '')
      }
      t.serializeKeyPairs = serializeKeyPairs
      function getKeyPairs(e) {
        return e.getAllEntries().map(([e, t]) => {
          let r = `${encodeURIComponent(e)}=${encodeURIComponent(t.value)}`
          if (t.metadata !== undefined) {
            r += i.BAGGAGE_PROPERTIES_SEPARATOR + t.metadata.toString()
          }
          return r
        })
      }
      t.getKeyPairs = getKeyPairs
      function parsePairKeyValue(e) {
        const t = e.split(i.BAGGAGE_PROPERTIES_SEPARATOR)
        if (t.length <= 0) return
        const r = t.shift()
        if (!r) return
        const o = r.split(i.BAGGAGE_KEY_PAIR_SEPARATOR)
        if (o.length !== 2) return
        const s = decodeURIComponent(o[0].trim())
        const a = decodeURIComponent(o[1].trim())
        let l
        if (t.length > 0) {
          l = (0, n.baggageEntryMetadataFromString)(
            t.join(i.BAGGAGE_PROPERTIES_SEPARATOR)
          )
        }
        return { key: s, value: a, metadata: l }
      }
      t.parsePairKeyValue = parsePairKeyValue
      function parseKeyPairsIntoRecord(e) {
        if (typeof e !== 'string' || e.length === 0) return {}
        return e
          .split(i.BAGGAGE_ITEMS_SEPARATOR)
          .map((e) => parsePairKeyValue(e))
          .filter((e) => e !== undefined && e.value.length > 0)
          .reduce((e, t) => {
            e[t.key] = t.value
            return e
          }, {})
      }
      t.parseKeyPairsIntoRecord = parseKeyPairsIntoRecord
    },
    8908: (e, t, r) => {
      Object.defineProperty(t, '__esModule', { value: true })
      t.isAttributeValue = t.isAttributeKey = t.sanitizeAttributes = void 0
      const n = r(8720)
      function sanitizeAttributes(e) {
        const t = {}
        if (typeof e !== 'object' || e == null) {
          return t
        }
        for (const [r, i] of Object.entries(e)) {
          if (!isAttributeKey(r)) {
            n.diag.warn(`Invalid attribute key: ${r}`)
            continue
          }
          if (!isAttributeValue(i)) {
            n.diag.warn(`Invalid attribute value set for key: ${r}`)
            continue
          }
          if (Array.isArray(i)) {
            t[r] = i.slice()
          } else {
            t[r] = i
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
    5943: (e, t, r) => {
      Object.defineProperty(t, '__esModule', { value: true })
      t.globalErrorHandler = t.setGlobalErrorHandler = void 0
      const n = r(1162)
      let i = (0, n.loggingErrorHandler)()
      function setGlobalErrorHandler(e) {
        i = e
      }
      t.setGlobalErrorHandler = setGlobalErrorHandler
      function globalErrorHandler(e) {
        try {
          i(e)
        } catch (e) {}
      }
      t.globalErrorHandler = globalErrorHandler
    },
    1162: (e, t, r) => {
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
    9750: (e, t, r) => {
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
      const n = r(2383)
      const i = 9
      const o = Math.pow(10, i)
      function numberToHrtime(e) {
        const t = e / 1e3
        const r = Math.trunc(t)
        const n = Number((t - r).toFixed(i)) * o
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
        let i = t[0] + r[0]
        let s = t[1] + r[1]
        if (s > o) {
          s -= o
          i += 1
        }
        return [i, s]
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
          n += o
        }
        return [r, n]
      }
      t.hrTimeDuration = hrTimeDuration
      function hrTimeToTimeStamp(e) {
        const t = i
        const r = `${'0'.repeat(t)}${e[1]}Z`
        const n = r.substr(r.length - t - 1)
        const o = new Date(e[0] * 1e3).toISOString()
        return o.replace('000Z', n)
      }
      t.hrTimeToTimeStamp = hrTimeToTimeStamp
      function hrTimeToNanoseconds(e) {
        return e[0] * o + e[1]
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
    9652: (e, t) => {
      Object.defineProperty(t, '__esModule', { value: true })
    },
    8485: function (e, t, r) {
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
      var i =
        (this && this.__exportStar) ||
        function (e, t) {
          for (var r in e)
            if (r !== 'default' && !Object.prototype.hasOwnProperty.call(t, r))
              n(t, e, r)
        }
      Object.defineProperty(t, '__esModule', { value: true })
      t.baggageUtils = void 0
      i(r(9537), t)
      i(r(8908), t)
      i(r(5943), t)
      i(r(1162), t)
      i(r(9750), t)
      i(r(9652), t)
      i(r(577), t)
      i(r(7943), t)
      t.baggageUtils = r(1760)
      i(r(2383), t)
      i(r(5617), t)
      i(r(8708), t)
      i(r(1963), t)
      i(r(9259), t)
      i(r(8875), t)
      i(r(9971), t)
      i(r(8302), t)
      i(r(1717), t)
      i(r(9665), t)
      i(r(1599), t)
      i(r(9651), t)
      i(r(348), t)
      i(r(5572), t)
      i(r(4394), t)
      i(r(4630), t)
      i(r(7820), t)
      i(r(7943), t)
    },
    7849: (e, t) => {
      Object.defineProperty(t, '__esModule', { value: true })
      t.validateValue = t.validateKey = void 0
      const r = '[_0-9a-z-*/]'
      const n = `[a-z]${r}{0,255}`
      const i = `[a-z0-9]${r}{0,240}@[a-z]${r}{0,13}`
      const o = new RegExp(`^(?:${n}|${i})$`)
      const s = /^[ -~]{0,255}[!-~]$/
      const a = /,|=/
      function validateKey(e) {
        return o.test(e)
      }
      t.validateKey = validateKey
      function validateValue(e) {
        return s.test(e) && !a.test(e)
      }
      t.validateValue = validateValue
    },
    5760: (e, t) => {
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
    2383: function (e, t, r) {
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
      var i =
        (this && this.__exportStar) ||
        function (e, t) {
          for (var r in e)
            if (r !== 'default' && !Object.prototype.hasOwnProperty.call(t, r))
              n(t, e, r)
        }
      Object.defineProperty(t, '__esModule', { value: true })
      i(r(4708), t)
    },
    8799: (e, t) => {
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
      const i = Buffer.allocUnsafe(n)
      function getIdGenerator(e) {
        return function generateId() {
          for (let t = 0; t < e / 4; t++) {
            i.writeUInt32BE((Math.random() * 2 ** 32) >>> 0, t * 4)
          }
          for (let t = 0; t < e; t++) {
            if (i[t] > 0) {
              break
            } else if (t === e - 1) {
              i[e - 1] = 1
            }
          }
          return i.toString('hex', 0, e)
        }
      }
    },
    9709: (e, t, r) => {
      Object.defineProperty(t, '__esModule', { value: true })
      t.getEnv = void 0
      const n = r(2037)
      const i = r(9651)
      function getEnv() {
        const e = (0, i.parseEnvironment)(process.env)
        return Object.assign(
          { HOSTNAME: n.hostname() },
          i.DEFAULT_ENVIRONMENT,
          e
        )
      }
      t.getEnv = getEnv
    },
    8924: (e, t) => {
      Object.defineProperty(t, '__esModule', { value: true })
      t._globalThis = void 0
      t._globalThis = typeof globalThis === 'object' ? globalThis : global
    },
    1443: (e, t) => {
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
        let i = 0
        for (let r = 0; r < e.length; r += 2) {
          const n = intValue(e.charCodeAt(r))
          const o = intValue(e.charCodeAt(r + 1))
          t.writeUInt8((n << 4) | o, i++)
        }
        return t.toString('base64')
      }
      t.hexToBase64 = hexToBase64
    },
    4708: function (e, t, r) {
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
      var i =
        (this && this.__exportStar) ||
        function (e, t) {
          for (var r in e)
            if (r !== 'default' && !Object.prototype.hasOwnProperty.call(t, r))
              n(t, e, r)
        }
      Object.defineProperty(t, '__esModule', { value: true })
      i(r(9709), t)
      i(r(8924), t)
      i(r(1443), t)
      i(r(8799), t)
      i(r(5894), t)
      i(r(8254), t)
      i(r(6157), t)
    },
    5894: (e, t, r) => {
      Object.defineProperty(t, '__esModule', { value: true })
      t.otperformance = void 0
      const n = r(4074)
      t.otperformance = n.performance
    },
    8254: (e, t, r) => {
      Object.defineProperty(t, '__esModule', { value: true })
      t.SDK_INFO = void 0
      const n = r(7943)
      const i = r(3190)
      t.SDK_INFO = {
        [i.SemanticResourceAttributes.TELEMETRY_SDK_NAME]: 'opentelemetry',
        [i.SemanticResourceAttributes.PROCESS_RUNTIME_NAME]: 'node',
        [i.SemanticResourceAttributes.TELEMETRY_SDK_LANGUAGE]:
          i.TelemetrySdkLanguageValues.NODEJS,
        [i.SemanticResourceAttributes.TELEMETRY_SDK_VERSION]: n.VERSION,
      }
    },
    6157: (e, t) => {
      Object.defineProperty(t, '__esModule', { value: true })
      t.unrefTimer = void 0
      function unrefTimer(e) {
        e.unref()
      }
      t.unrefTimer = unrefTimer
    },
    5617: (e, t, r) => {
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
          for (const i of this._propagators) {
            try {
              i.inject(e, t, r)
            } catch (e) {
              n.diag.warn(
                `Failed to inject with ${i.constructor.name}. Err: ${e.message}`
              )
            }
          }
        }
        extract(e, t, r) {
          return this._propagators.reduce((e, i) => {
            try {
              return i.extract(e, t, r)
            } catch (e) {
              n.diag.warn(
                `Failed to inject with ${i.constructor.name}. Err: ${e.message}`
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
    1963: (e, t) => {
      Object.defineProperty(t, '__esModule', { value: true })
    },
    1599: (e, t, r) => {
      Object.defineProperty(t, '__esModule', { value: true })
      t.TraceState = void 0
      const n = r(7849)
      const i = 32
      const o = 512
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
          if (e.length > o) return
          this._internalState = e
            .split(s)
            .reverse()
            .reduce((e, t) => {
              const r = t.trim()
              const i = r.indexOf(a)
              if (i !== -1) {
                const o = r.slice(0, i)
                const s = r.slice(i + 1, t.length)
                if ((0, n.validateKey)(o) && (0, n.validateValue)(s)) {
                  e.set(o, s)
                } else {
                }
              }
              return e
            }, new Map())
          if (this._internalState.size > i) {
            this._internalState = new Map(
              Array.from(this._internalState.entries()).reverse().slice(0, i)
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
    8708: (e, t, r) => {
      Object.defineProperty(t, '__esModule', { value: true })
      t.W3CTraceContextPropagator =
        t.parseTraceParent =
        t.TRACE_STATE_HEADER =
        t.TRACE_PARENT_HEADER =
          void 0
      const n = r(8720)
      const i = r(9665)
      const o = r(1599)
      t.TRACE_PARENT_HEADER = 'traceparent'
      t.TRACE_STATE_HEADER = 'tracestate'
      const s = '00'
      const a = '(?!ff)[\\da-f]{2}'
      const l = '(?![0]{32})[\\da-f]{32}'
      const u = '(?![0]{16})[\\da-f]{16}'
      const c = '[\\da-f]{2}'
      const _ = new RegExp(`^\\s?(${a})-(${l})-(${u})-(${c})(-.*)?\\s?$`)
      function parseTraceParent(e) {
        const t = _.exec(e)
        if (!t) return null
        if (t[1] === '00' && t[5]) return null
        return { traceId: t[2], spanId: t[3], traceFlags: parseInt(t[4], 16) }
      }
      t.parseTraceParent = parseTraceParent
      class W3CTraceContextPropagator {
        inject(e, r, o) {
          const a = n.trace.getSpanContext(e)
          if (
            !a ||
            (0, i.isTracingSuppressed)(e) ||
            !(0, n.isSpanContextValid)(a)
          )
            return
          const l = `${s}-${a.traceId}-${a.spanId}-0${Number(
            a.traceFlags || n.TraceFlags.NONE
          ).toString(16)}`
          o.set(r, t.TRACE_PARENT_HEADER, l)
          if (a.traceState) {
            o.set(r, t.TRACE_STATE_HEADER, a.traceState.serialize())
          }
        }
        extract(e, r, i) {
          const s = i.get(r, t.TRACE_PARENT_HEADER)
          if (!s) return e
          const a = Array.isArray(s) ? s[0] : s
          if (typeof a !== 'string') return e
          const l = parseTraceParent(a)
          if (!l) return e
          l.isRemote = true
          const u = i.get(r, t.TRACE_STATE_HEADER)
          if (u) {
            const e = Array.isArray(u) ? u.join(',') : u
            l.traceState = new o.TraceState(
              typeof e === 'string' ? e : undefined
            )
          }
          return n.trace.setSpanContext(e, l)
        }
        fields() {
          return [t.TRACE_PARENT_HEADER, t.TRACE_STATE_HEADER]
        }
      }
      t.W3CTraceContextPropagator = W3CTraceContextPropagator
    },
    9259: (e, t, r) => {
      Object.defineProperty(t, '__esModule', { value: true })
      t.getRPCMetadata =
        t.deleteRPCMetadata =
        t.setRPCMetadata =
        t.RPCType =
          void 0
      const n = r(8720)
      const i = (0, n.createContextKey)(
        'OpenTelemetry SDK Context Key RPC_METADATA'
      )
      var o
      ;(function (e) {
        e['HTTP'] = 'http'
      })((o = t.RPCType || (t.RPCType = {})))
      function setRPCMetadata(e, t) {
        return e.setValue(i, t)
      }
      t.setRPCMetadata = setRPCMetadata
      function deleteRPCMetadata(e) {
        return e.deleteValue(i)
      }
      t.deleteRPCMetadata = deleteRPCMetadata
      function getRPCMetadata(e) {
        return e.getValue(i)
      }
      t.getRPCMetadata = getRPCMetadata
    },
    8875: (e, t, r) => {
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
    9971: (e, t, r) => {
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
    8302: (e, t, r) => {
      Object.defineProperty(t, '__esModule', { value: true })
      t.ParentBasedSampler = void 0
      const n = r(8720)
      const i = r(5943)
      const o = r(8875)
      const s = r(9971)
      class ParentBasedSampler {
        constructor(e) {
          var t, r, n, a
          this._root = e.root
          if (!this._root) {
            ;(0, i.globalErrorHandler)(
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
              : new o.AlwaysOffSampler()
          this._localParentSampled =
            (n = e.localParentSampled) !== null && n !== void 0
              ? n
              : new s.AlwaysOnSampler()
          this._localParentNotSampled =
            (a = e.localParentNotSampled) !== null && a !== void 0
              ? a
              : new o.AlwaysOffSampler()
        }
        shouldSample(e, t, r, i, o, s) {
          const a = n.trace.getSpanContext(e)
          if (!a || !(0, n.isSpanContextValid)(a)) {
            return this._root.shouldSample(e, t, r, i, o, s)
          }
          if (a.isRemote) {
            if (a.traceFlags & n.TraceFlags.SAMPLED) {
              return this._remoteParentSampled.shouldSample(e, t, r, i, o, s)
            }
            return this._remoteParentNotSampled.shouldSample(e, t, r, i, o, s)
          }
          if (a.traceFlags & n.TraceFlags.SAMPLED) {
            return this._localParentSampled.shouldSample(e, t, r, i, o, s)
          }
          return this._localParentNotSampled.shouldSample(e, t, r, i, o, s)
        }
        toString() {
          return `ParentBased{root=${this._root.toString()}, remoteParentSampled=${this._remoteParentSampled.toString()}, remoteParentNotSampled=${this._remoteParentNotSampled.toString()}, localParentSampled=${this._localParentSampled.toString()}, localParentNotSampled=${this._localParentNotSampled.toString()}}`
        }
      }
      t.ParentBasedSampler = ParentBasedSampler
    },
    1717: (e, t, r) => {
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
            const i = parseInt(e.slice(n, n + 8), 16)
            t = (t ^ i) >>> 0
          }
          return t
        }
      }
      t.TraceIdRatioBasedSampler = TraceIdRatioBasedSampler
    },
    9665: (e, t, r) => {
      Object.defineProperty(t, '__esModule', { value: true })
      t.isTracingSuppressed = t.unsuppressTracing = t.suppressTracing = void 0
      const n = r(8720)
      const i = (0, n.createContextKey)(
        'OpenTelemetry SDK Context Key SUPPRESS_TRACING'
      )
      function suppressTracing(e) {
        return e.setValue(i, true)
      }
      t.suppressTracing = suppressTracing
      function unsuppressTracing(e) {
        return e.deleteValue(i)
      }
      t.unsuppressTracing = unsuppressTracing
      function isTracingSuppressed(e) {
        return e.getValue(i) === true
      }
      t.isTracingSuppressed = isTracingSuppressed
    },
    7820: (e, t, r) => {
      Object.defineProperty(t, '__esModule', { value: true })
      t.BindOnceFuture = void 0
      const n = r(4155)
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
    9651: (e, t, r) => {
      Object.defineProperty(t, '__esModule', { value: true })
      t.getEnvWithoutDefaults =
        t.parseEnvironment =
        t.DEFAULT_ENVIRONMENT =
        t.DEFAULT_ATTRIBUTE_COUNT_LIMIT =
        t.DEFAULT_ATTRIBUTE_VALUE_LENGTH_LIMIT =
          void 0
      const n = r(8720)
      const i = r(5572)
      const o = r(5760)
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
      const l = ['OTEL_NO_PATCH_MODULES', 'OTEL_PROPAGATORS']
      function isEnvVarAList(e) {
        return l.indexOf(e) > -1
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
        OTEL_TRACES_SAMPLER: i.TracesSamplerValues.ParentBasedAlwaysOn,
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
      function parseNumber(e, t, r, n = -Infinity, i = Infinity) {
        if (typeof r[e] !== 'undefined') {
          const o = Number(r[e])
          if (!isNaN(o)) {
            if (o < n) {
              t[e] = n
            } else if (o > i) {
              t[e] = i
            } else {
              t[e] = o
            }
          }
        }
      }
      function parseStringList(e, t, r, n = s) {
        const i = r[e]
        if (typeof i === 'string') {
          t[e] = i.split(n).map((e) => e.trim())
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
          : parseEnvironment(o._globalThis)
      }
      t.getEnvWithoutDefaults = getEnvWithoutDefaults
    },
    3603: (e, t) => {
      Object.defineProperty(t, '__esModule', { value: true })
      t.isPlainObject = void 0
      const r = '[object Object]'
      const n = '[object Null]'
      const i = '[object Undefined]'
      const o = Function.prototype
      const s = o.toString
      const a = s.call(Object)
      const l = overArg(Object.getPrototypeOf, Object)
      const u = Object.prototype
      const c = u.hasOwnProperty
      const _ = Symbol ? Symbol.toStringTag : undefined
      const d = u.toString
      function overArg(e, t) {
        return function (r) {
          return e(t(r))
        }
      }
      function isPlainObject(e) {
        if (!isObjectLike(e) || baseGetTag(e) !== r) {
          return false
        }
        const t = l(e)
        if (t === null) {
          return true
        }
        const n = c.call(t, 'constructor') && t.constructor
        return typeof n == 'function' && n instanceof n && s.call(n) === a
      }
      t.isPlainObject = isPlainObject
      function isObjectLike(e) {
        return e != null && typeof e == 'object'
      }
      function baseGetTag(e) {
        if (e == null) {
          return e === undefined ? i : n
        }
        return _ && _ in Object(e) ? getRawTag(e) : objectToString(e)
      }
      function getRawTag(e) {
        const t = c.call(e, _),
          r = e[_]
        let n = false
        try {
          e[_] = undefined
          n = true
        } catch (e) {}
        const i = d.call(e)
        if (n) {
          if (t) {
            e[_] = r
          } else {
            delete e[_]
          }
        }
        return i
      }
      function objectToString(e) {
        return d.call(e)
      }
    },
    348: (e, t, r) => {
      Object.defineProperty(t, '__esModule', { value: true })
      t.merge = void 0
      const n = r(3603)
      const i = 20
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
        let o
        if (r > i) {
          return undefined
        }
        r++
        if (isPrimitive(e) || isPrimitive(t) || isFunction(t)) {
          o = takeValue(t)
        } else if (isArray(e)) {
          o = e.slice()
          if (isArray(t)) {
            for (let e = 0, r = t.length; e < r; e++) {
              o.push(takeValue(t[e]))
            }
          } else if (isObject(t)) {
            const e = Object.keys(t)
            for (let r = 0, n = e.length; r < n; r++) {
              const n = e[r]
              o[n] = takeValue(t[n])
            }
          }
        } else if (isObject(e)) {
          if (isObject(t)) {
            if (!shouldMerge(e, t)) {
              return t
            }
            o = Object.assign({}, e)
            const i = Object.keys(t)
            for (let s = 0, a = i.length; s < a; s++) {
              const a = i[s]
              const l = t[a]
              if (isPrimitive(l)) {
                if (typeof l === 'undefined') {
                  delete o[a]
                } else {
                  o[a] = l
                }
              } else {
                const i = o[a]
                const s = l
                if (
                  wasObjectReferenced(e, a, n) ||
                  wasObjectReferenced(t, a, n)
                ) {
                  delete o[a]
                } else {
                  if (isObject(i) && isObject(s)) {
                    const r = n.get(i) || []
                    const o = n.get(s) || []
                    r.push({ obj: e, key: a })
                    o.push({ obj: t, key: a })
                    n.set(i, r)
                    n.set(s, o)
                  }
                  o[a] = mergeTwoObjects(o[a], l, r, n)
                }
              }
            }
          } else {
            o = t
          }
        }
        return o
      }
      function wasObjectReferenced(e, t, r) {
        const n = r.get(e[t]) || []
        for (let r = 0, i = n.length; r < i; r++) {
          const i = n[r]
          if (i.key === t && i.obj === e) {
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
    4155: (e, t) => {
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
    5572: (e, t) => {
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
    4394: (e, t) => {
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
    4630: (e, t) => {
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
    7943: (e, t) => {
      Object.defineProperty(t, '__esModule', { value: true })
      t.VERSION = void 0
      t.VERSION = '1.6.0'
    },
    5538: (e, t, r) => {
      Object.defineProperty(t, '__esModule', { value: true })
      t.BasicTracerProvider = t.ForceFlushState = void 0
      const n = r(8720)
      const i = r(8485)
      const o = r(8314)
      const s = r(3218)
      const a = r(2942)
      const l = r(6667)
      const u = r(2900)
      const c = r(7671)
      const _ = r(5418)
      var d
      ;(function (e) {
        e[(e['resolved'] = 0)] = 'resolved'
        e[(e['timeout'] = 1)] = 'timeout'
        e[(e['error'] = 2)] = 'error'
        e[(e['unresolved'] = 3)] = 'unresolved'
      })((d = t.ForceFlushState || (t.ForceFlushState = {})))
      class BasicTracerProvider {
        constructor(e = {}) {
          var t
          this._registeredSpanProcessors = []
          this._tracers = new Map()
          const r = (0, i.merge)(
            {},
            (0, a.loadDefaultConfig)(),
            (0, _.reconfigureLimits)(e)
          )
          this.resource =
            (t = r.resource) !== null && t !== void 0 ? t : o.Resource.empty()
          this.resource = o.Resource.default().merge(this.resource)
          this._config = Object.assign({}, r, { resource: this.resource })
          const n = this._buildExporterFromEnv()
          if (n !== undefined) {
            const e = new c.BatchSpanProcessor(n)
            this.activeSpanProcessor = e
          } else {
            this.activeSpanProcessor = new u.NoopSpanProcessor()
          }
        }
        getTracer(e, t, r) {
          const n = `${e}@${t || ''}:${
            (r === null || r === void 0 ? void 0 : r.schemaUrl) || ''
          }`
          if (!this._tracers.has(n)) {
            this._tracers.set(
              n,
              new s.Tracer(
                {
                  name: e,
                  version: t,
                  schemaUrl: r === null || r === void 0 ? void 0 : r.schemaUrl,
                },
                this._config,
                this
              )
            )
          }
          return this._tracers.get(n)
        }
        addSpanProcessor(e) {
          if (this._registeredSpanProcessors.length === 0) {
            this.activeSpanProcessor
              .shutdown()
              .catch((e) =>
                n.diag.error(
                  'Error while trying to shutdown current span processor',
                  e
                )
              )
          }
          this._registeredSpanProcessors.push(e)
          this.activeSpanProcessor = new l.MultiSpanProcessor(
            this._registeredSpanProcessors
          )
        }
        getActiveSpanProcessor() {
          return this.activeSpanProcessor
        }
        register(e = {}) {
          n.trace.setGlobalTracerProvider(this)
          if (e.propagator === undefined) {
            e.propagator = this._buildPropagatorFromEnv()
          }
          if (e.contextManager) {
            n.context.setGlobalContextManager(e.contextManager)
          }
          if (e.propagator) {
            n.propagation.setGlobalPropagator(e.propagator)
          }
        }
        forceFlush() {
          const e = this._config.forceFlushTimeoutMillis
          const t = this._registeredSpanProcessors.map(
            (t) =>
              new Promise((r) => {
                let n
                const i = setTimeout(() => {
                  r(
                    new Error(
                      `Span processor did not completed within timeout period of ${e} ms`
                    )
                  )
                  n = d.timeout
                }, e)
                t.forceFlush()
                  .then(() => {
                    clearTimeout(i)
                    if (n !== d.timeout) {
                      n = d.resolved
                      r(n)
                    }
                  })
                  .catch((e) => {
                    clearTimeout(i)
                    n = d.error
                    r(e)
                  })
              })
          )
          return new Promise((e, r) => {
            Promise.all(t)
              .then((t) => {
                const n = t.filter((e) => e !== d.resolved)
                if (n.length > 0) {
                  r(n)
                } else {
                  e()
                }
              })
              .catch((e) => r([e]))
          })
        }
        shutdown() {
          return this.activeSpanProcessor.shutdown()
        }
        _getPropagator(e) {
          var t
          return (t = this.constructor._registeredPropagators.get(e)) ===
            null || t === void 0
            ? void 0
            : t()
        }
        _getSpanExporter(e) {
          var t
          return (t = this.constructor._registeredExporters.get(e)) === null ||
            t === void 0
            ? void 0
            : t()
        }
        _buildPropagatorFromEnv() {
          const e = Array.from(new Set((0, i.getEnv)().OTEL_PROPAGATORS))
          const t = e.map((e) => {
            const t = this._getPropagator(e)
            if (!t) {
              n.diag.warn(
                `Propagator "${e}" requested through environment variable is unavailable.`
              )
            }
            return t
          })
          const r = t.reduce((e, t) => {
            if (t) {
              e.push(t)
            }
            return e
          }, [])
          if (r.length === 0) {
            return
          } else if (e.length === 1) {
            return r[0]
          } else {
            return new i.CompositePropagator({ propagators: r })
          }
        }
        _buildExporterFromEnv() {
          const e = (0, i.getEnv)().OTEL_TRACES_EXPORTER
          if (e === 'none') return
          const t = this._getSpanExporter(e)
          if (!t) {
            n.diag.error(
              `Exporter "${e}" requested through environment variable is unavailable.`
            )
          }
          return t
        }
      }
      t.BasicTracerProvider = BasicTracerProvider
      BasicTracerProvider._registeredPropagators = new Map([
        ['tracecontext', () => new i.W3CTraceContextPropagator()],
        ['baggage', () => new i.W3CBaggagePropagator()],
      ])
      BasicTracerProvider._registeredExporters = new Map()
    },
    4620: (e, t) => {
      Object.defineProperty(t, '__esModule', { value: true })
    },
    6667: (e, t, r) => {
      Object.defineProperty(t, '__esModule', { value: true })
      t.MultiSpanProcessor = void 0
      const n = r(8485)
      class MultiSpanProcessor {
        constructor(e) {
          this._spanProcessors = e
        }
        forceFlush() {
          const e = []
          for (const t of this._spanProcessors) {
            e.push(t.forceFlush())
          }
          return new Promise((t) => {
            Promise.all(e)
              .then(() => {
                t()
              })
              .catch((e) => {
                ;(0, n.globalErrorHandler)(
                  e || new Error('MultiSpanProcessor: forceFlush failed')
                )
                t()
              })
          })
        }
        onStart(e, t) {
          for (const r of this._spanProcessors) {
            r.onStart(e, t)
          }
        }
        onEnd(e) {
          for (const t of this._spanProcessors) {
            t.onEnd(e)
          }
        }
        shutdown() {
          const e = []
          for (const t of this._spanProcessors) {
            e.push(t.shutdown())
          }
          return new Promise((t, r) => {
            Promise.all(e).then(() => {
              t()
            }, r)
          })
        }
      }
      t.MultiSpanProcessor = MultiSpanProcessor
    },
    1557: (e, t) => {
      Object.defineProperty(t, '__esModule', { value: true })
      t.SamplingDecision = void 0
      var r
      ;(function (e) {
        e[(e['NOT_RECORD'] = 0)] = 'NOT_RECORD'
        e[(e['RECORD'] = 1)] = 'RECORD'
        e[(e['RECORD_AND_SAMPLED'] = 2)] = 'RECORD_AND_SAMPLED'
      })((r = t.SamplingDecision || (t.SamplingDecision = {})))
    },
    5982: (e, t, r) => {
      Object.defineProperty(t, '__esModule', { value: true })
      t.Span = void 0
      const n = r(8720)
      const i = r(8485)
      const o = r(3190)
      const s = r(4834)
      class Span {
        constructor(e, t, r, o, s, a, l = [], u = (0, i.hrTime)()) {
          this.attributes = {}
          this.links = []
          this.events = []
          this.status = { code: n.SpanStatusCode.UNSET }
          this.endTime = [0, 0]
          this._ended = false
          this._duration = [-1, -1]
          this.name = r
          this._spanContext = o
          this.parentSpanId = a
          this.kind = s
          this.links = l
          this.startTime = (0, i.timeInputToHrTime)(u)
          this.resource = e.resource
          this.instrumentationLibrary = e.instrumentationLibrary
          this._spanLimits = e.getSpanLimits()
          this._spanProcessor = e.getActiveSpanProcessor()
          this._spanProcessor.onStart(this, t)
          this._attributeValueLengthLimit =
            this._spanLimits.attributeValueLengthLimit || 0
        }
        spanContext() {
          return this._spanContext
        }
        setAttribute(e, t) {
          if (t == null || this._isSpanEnded()) return this
          if (e.length === 0) {
            n.diag.warn(`Invalid attribute key: ${e}`)
            return this
          }
          if (!(0, i.isAttributeValue)(t)) {
            n.diag.warn(`Invalid attribute value set for key: ${e}`)
            return this
          }
          if (
            Object.keys(this.attributes).length >=
              this._spanLimits.attributeCountLimit &&
            !Object.prototype.hasOwnProperty.call(this.attributes, e)
          ) {
            return this
          }
          this.attributes[e] = this._truncateToSize(t)
          return this
        }
        setAttributes(e) {
          for (const [t, r] of Object.entries(e)) {
            this.setAttribute(t, r)
          }
          return this
        }
        addEvent(e, t, r) {
          if (this._isSpanEnded()) return this
          if (this._spanLimits.eventCountLimit === 0) {
            n.diag.warn('No events allowed.')
            return this
          }
          if (this.events.length >= this._spanLimits.eventCountLimit) {
            n.diag.warn('Dropping extra events.')
            this.events.shift()
          }
          if ((0, i.isTimeInput)(t)) {
            if (typeof r === 'undefined') {
              r = t
            }
            t = undefined
          }
          if (typeof r === 'undefined') {
            r = (0, i.hrTime)()
          }
          const o = (0, i.sanitizeAttributes)(t)
          this.events.push({
            name: e,
            attributes: o,
            time: (0, i.timeInputToHrTime)(r),
          })
          return this
        }
        setStatus(e) {
          if (this._isSpanEnded()) return this
          this.status = e
          return this
        }
        updateName(e) {
          if (this._isSpanEnded()) return this
          this.name = e
          return this
        }
        end(e = (0, i.hrTime)()) {
          if (this._isSpanEnded()) {
            n.diag.error('You can only call end() on a span once.')
            return
          }
          this._ended = true
          this.endTime = (0, i.timeInputToHrTime)(e)
          this._duration = (0, i.hrTimeDuration)(this.startTime, this.endTime)
          if (this._duration[0] < 0) {
            n.diag.warn(
              'Inconsistent start and end time, startTime > endTime',
              this.startTime,
              this.endTime
            )
          }
          this._spanProcessor.onEnd(this)
        }
        isRecording() {
          return this._ended === false
        }
        recordException(e, t = (0, i.hrTime)()) {
          const r = {}
          if (typeof e === 'string') {
            r[o.SemanticAttributes.EXCEPTION_MESSAGE] = e
          } else if (e) {
            if (e.code) {
              r[o.SemanticAttributes.EXCEPTION_TYPE] = e.code.toString()
            } else if (e.name) {
              r[o.SemanticAttributes.EXCEPTION_TYPE] = e.name
            }
            if (e.message) {
              r[o.SemanticAttributes.EXCEPTION_MESSAGE] = e.message
            }
            if (e.stack) {
              r[o.SemanticAttributes.EXCEPTION_STACKTRACE] = e.stack
            }
          }
          if (
            r[o.SemanticAttributes.EXCEPTION_TYPE] ||
            r[o.SemanticAttributes.EXCEPTION_MESSAGE]
          ) {
            this.addEvent(s.ExceptionEventName, r, t)
          } else {
            n.diag.warn(`Failed to record an exception ${e}`)
          }
        }
        get duration() {
          return this._duration
        }
        get ended() {
          return this._ended
        }
        _isSpanEnded() {
          if (this._ended) {
            n.diag.warn(
              `Can not execute the operation on ended Span {traceId: ${this._spanContext.traceId}, spanId: ${this._spanContext.spanId}}`
            )
          }
          return this._ended
        }
        _truncateToLimitUtil(e, t) {
          if (e.length <= t) {
            return e
          }
          return e.substr(0, t)
        }
        _truncateToSize(e) {
          const t = this._attributeValueLengthLimit
          if (t <= 0) {
            n.diag.warn(`Attribute value limit must be positive, got ${t}`)
            return e
          }
          if (typeof e === 'string') {
            return this._truncateToLimitUtil(e, t)
          }
          if (Array.isArray(e)) {
            return e.map((e) =>
              typeof e === 'string' ? this._truncateToLimitUtil(e, t) : e
            )
          }
          return e
        }
      }
      t.Span = Span
    },
    698: (e, t) => {
      Object.defineProperty(t, '__esModule', { value: true })
    },
    4039: (e, t) => {
      Object.defineProperty(t, '__esModule', { value: true })
    },
    358: (e, t, r) => {
      Object.defineProperty(t, '__esModule', { value: true })
      t.Tracer = void 0
      const n = r(8720)
      const i = r(8485)
      const o = r(5982)
      const s = r(5418)
      const a = r(7671)
      class Tracer {
        constructor(e, t, r) {
          this._tracerProvider = r
          const n = (0, s.mergeConfig)(t)
          this._sampler = n.sampler
          this._generalLimits = n.generalLimits
          this._spanLimits = n.spanLimits
          this._idGenerator = t.idGenerator || new a.RandomIdGenerator()
          this.resource = r.resource
          this.instrumentationLibrary = e
        }
        startSpan(e, t = {}, r = n.context.active()) {
          var s, a
          if ((0, i.isTracingSuppressed)(r)) {
            n.diag.debug('Instrumentation suppressed, returning Noop Span')
            return n.trace.wrapSpanContext(n.INVALID_SPAN_CONTEXT)
          }
          if (t.root) {
            r = n.trace.deleteSpan(r)
          }
          const l = n.trace.getSpanContext(r)
          const u = this._idGenerator.generateSpanId()
          let c
          let _
          let d
          if (!l || !n.trace.isSpanContextValid(l)) {
            c = this._idGenerator.generateTraceId()
          } else {
            c = l.traceId
            _ = l.traceState
            d = l.spanId
          }
          const p =
            (s = t.kind) !== null && s !== void 0 ? s : n.SpanKind.INTERNAL
          const E = ((a = t.links) !== null && a !== void 0 ? a : []).map(
            (e) => ({
              context: e.context,
              attributes: (0, i.sanitizeAttributes)(e.attributes),
            })
          )
          const T = (0, i.sanitizeAttributes)(t.attributes)
          const f = this._sampler.shouldSample(r, c, e, p, T, E)
          const m =
            f.decision === n.SamplingDecision.RECORD_AND_SAMPLED
              ? n.TraceFlags.SAMPLED
              : n.TraceFlags.NONE
          const h = { traceId: c, spanId: u, traceFlags: m, traceState: _ }
          if (f.decision === n.SamplingDecision.NOT_RECORD) {
            n.diag.debug(
              'Recording is off, propagating context in a non-recording span'
            )
            return n.trace.wrapSpanContext(h)
          }
          const S = new o.Span(this, r, e, h, p, d, E, t.startTime)
          const g = (0, i.sanitizeAttributes)(Object.assign(T, f.attributes))
          S.setAttributes(g)
          return S
        }
        startActiveSpan(e, t, r, i) {
          let o
          let s
          let a
          if (arguments.length < 2) {
            return
          } else if (arguments.length === 2) {
            a = t
          } else if (arguments.length === 3) {
            o = t
            a = r
          } else {
            o = t
            s = r
            a = i
          }
          const l = s !== null && s !== void 0 ? s : n.context.active()
          const u = this.startSpan(e, o, l)
          const c = n.trace.setSpan(l, u)
          return n.context.with(c, a, undefined, u)
        }
        getGeneralLimits() {
          return this._generalLimits
        }
        getSpanLimits() {
          return this._spanLimits
        }
        getActiveSpanProcessor() {
          return this._tracerProvider.getActiveSpanProcessor()
        }
      }
      t.Tracer = Tracer
    },
    2942: (e, t, r) => {
      Object.defineProperty(t, '__esModule', { value: true })
      t.buildSamplerFromEnv = t.loadDefaultConfig = void 0
      const n = r(8720)
      const i = r(8485)
      const o = r(245)
      const s = r(5089)
      const a = r(9052)
      const l = r(4237)
      const u = (0, i.getEnv)()
      const c = i.TracesSamplerValues.AlwaysOn
      const _ = 1
      function loadDefaultConfig() {
        return {
          sampler: buildSamplerFromEnv(u),
          forceFlushTimeoutMillis: 3e4,
          generalLimits: {
            attributeValueLengthLimit: (0, i.getEnv)()
              .OTEL_ATTRIBUTE_VALUE_LENGTH_LIMIT,
            attributeCountLimit: (0, i.getEnv)().OTEL_ATTRIBUTE_COUNT_LIMIT,
          },
          spanLimits: {
            attributeValueLengthLimit: (0, i.getEnv)()
              .OTEL_SPAN_ATTRIBUTE_VALUE_LENGTH_LIMIT,
            attributeCountLimit: (0, i.getEnv)()
              .OTEL_SPAN_ATTRIBUTE_COUNT_LIMIT,
            linkCountLimit: (0, i.getEnv)().OTEL_SPAN_LINK_COUNT_LIMIT,
            eventCountLimit: (0, i.getEnv)().OTEL_SPAN_EVENT_COUNT_LIMIT,
          },
        }
      }
      t.loadDefaultConfig = loadDefaultConfig
      function buildSamplerFromEnv(e = (0, i.getEnv)()) {
        switch (e.OTEL_TRACES_SAMPLER) {
          case i.TracesSamplerValues.AlwaysOn:
            return new s.AlwaysOnSampler()
          case i.TracesSamplerValues.AlwaysOff:
            return new o.AlwaysOffSampler()
          case i.TracesSamplerValues.ParentBasedAlwaysOn:
            return new a.ParentBasedSampler({ root: new s.AlwaysOnSampler() })
          case i.TracesSamplerValues.ParentBasedAlwaysOff:
            return new a.ParentBasedSampler({ root: new o.AlwaysOffSampler() })
          case i.TracesSamplerValues.TraceIdRatio:
            return new l.TraceIdRatioBasedSampler(
              getSamplerProbabilityFromEnv(e)
            )
          case i.TracesSamplerValues.ParentBasedTraceIdRatio:
            return new a.ParentBasedSampler({
              root: new l.TraceIdRatioBasedSampler(
                getSamplerProbabilityFromEnv(e)
              ),
            })
          default:
            n.diag.error(
              `OTEL_TRACES_SAMPLER value "${e.OTEL_TRACES_SAMPLER} invalid, defaulting to ${c}".`
            )
            return new s.AlwaysOnSampler()
        }
      }
      t.buildSamplerFromEnv = buildSamplerFromEnv
      function getSamplerProbabilityFromEnv(e) {
        if (
          e.OTEL_TRACES_SAMPLER_ARG === undefined ||
          e.OTEL_TRACES_SAMPLER_ARG === ''
        ) {
          n.diag.error(`OTEL_TRACES_SAMPLER_ARG is blank, defaulting to ${_}.`)
          return _
        }
        const t = Number(e.OTEL_TRACES_SAMPLER_ARG)
        if (isNaN(t)) {
          n.diag.error(
            `OTEL_TRACES_SAMPLER_ARG=${e.OTEL_TRACES_SAMPLER_ARG} was given, but it is invalid, defaulting to ${_}.`
          )
          return _
        }
        if (t < 0 || t > 1) {
          n.diag.error(
            `OTEL_TRACES_SAMPLER_ARG=${e.OTEL_TRACES_SAMPLER_ARG} was given, but it is out of range ([0..1]), defaulting to ${_}.`
          )
          return _
        }
        return t
      }
    },
    4834: (e, t) => {
      Object.defineProperty(t, '__esModule', { value: true })
      t.ExceptionEventName = void 0
      t.ExceptionEventName = 'exception'
    },
    6719: (e, t, r) => {
      Object.defineProperty(t, '__esModule', { value: true })
      t.BatchSpanProcessorBase = void 0
      const n = r(8720)
      const i = r(8485)
      class BatchSpanProcessorBase {
        constructor(e, t) {
          this._exporter = e
          this._finishedSpans = []
          const r = (0, i.getEnv)()
          this._maxExportBatchSize =
            typeof (t === null || t === void 0
              ? void 0
              : t.maxExportBatchSize) === 'number'
              ? t.maxExportBatchSize
              : r.OTEL_BSP_MAX_EXPORT_BATCH_SIZE
          this._maxQueueSize =
            typeof (t === null || t === void 0 ? void 0 : t.maxQueueSize) ===
            'number'
              ? t.maxQueueSize
              : r.OTEL_BSP_MAX_QUEUE_SIZE
          this._scheduledDelayMillis =
            typeof (t === null || t === void 0
              ? void 0
              : t.scheduledDelayMillis) === 'number'
              ? t.scheduledDelayMillis
              : r.OTEL_BSP_SCHEDULE_DELAY
          this._exportTimeoutMillis =
            typeof (t === null || t === void 0
              ? void 0
              : t.exportTimeoutMillis) === 'number'
              ? t.exportTimeoutMillis
              : r.OTEL_BSP_EXPORT_TIMEOUT
          this._shutdownOnce = new i.BindOnceFuture(this._shutdown, this)
        }
        forceFlush() {
          if (this._shutdownOnce.isCalled) {
            return this._shutdownOnce.promise
          }
          return this._flushAll()
        }
        onStart(e, t) {}
        onEnd(e) {
          if (this._shutdownOnce.isCalled) {
            return
          }
          if ((e.spanContext().traceFlags & n.TraceFlags.SAMPLED) === 0) {
            return
          }
          this._addToBuffer(e)
        }
        shutdown() {
          return this._shutdownOnce.call()
        }
        _shutdown() {
          return Promise.resolve()
            .then(() => this.onShutdown())
            .then(() => this._flushAll())
            .then(() => this._exporter.shutdown())
        }
        _addToBuffer(e) {
          if (this._finishedSpans.length >= this._maxQueueSize) {
            return
          }
          this._finishedSpans.push(e)
          this._maybeStartTimer()
        }
        _flushAll() {
          return new Promise((e, t) => {
            const r = []
            const n = Math.ceil(
              this._finishedSpans.length / this._maxExportBatchSize
            )
            for (let e = 0, t = n; e < t; e++) {
              r.push(this._flushOneBatch())
            }
            Promise.all(r)
              .then(() => {
                e()
              })
              .catch(t)
          })
        }
        _flushOneBatch() {
          this._clearTimer()
          if (this._finishedSpans.length === 0) {
            return Promise.resolve()
          }
          return new Promise((e, t) => {
            const r = setTimeout(() => {
              t(new Error('Timeout'))
            }, this._exportTimeoutMillis)
            n.context.with((0, i.suppressTracing)(n.context.active()), () => {
              this._exporter.export(
                this._finishedSpans.splice(0, this._maxExportBatchSize),
                (n) => {
                  var o
                  clearTimeout(r)
                  if (n.code === i.ExportResultCode.SUCCESS) {
                    e()
                  } else {
                    t(
                      (o = n.error) !== null && o !== void 0
                        ? o
                        : new Error('BatchSpanProcessor: span export failed')
                    )
                  }
                }
              )
            })
          })
        }
        _maybeStartTimer() {
          if (this._timer !== undefined) return
          this._timer = setTimeout(() => {
            this._flushOneBatch()
              .then(() => {
                if (this._finishedSpans.length > 0) {
                  this._clearTimer()
                  this._maybeStartTimer()
                }
              })
              .catch((e) => {
                ;(0, i.globalErrorHandler)(e)
              })
          }, this._scheduledDelayMillis)
          ;(0, i.unrefTimer)(this._timer)
        }
        _clearTimer() {
          if (this._timer !== undefined) {
            clearTimeout(this._timer)
            this._timer = undefined
          }
        }
      }
      t.BatchSpanProcessorBase = BatchSpanProcessorBase
    },
    8463: (e, t, r) => {
      Object.defineProperty(t, '__esModule', { value: true })
      t.ConsoleSpanExporter = void 0
      const n = r(8485)
      class ConsoleSpanExporter {
        export(e, t) {
          return this._sendSpans(e, t)
        }
        shutdown() {
          this._sendSpans([])
          return Promise.resolve()
        }
        _exportInfo(e) {
          return {
            traceId: e.spanContext().traceId,
            parentId: e.parentSpanId,
            name: e.name,
            id: e.spanContext().spanId,
            kind: e.kind,
            timestamp: (0, n.hrTimeToMicroseconds)(e.startTime),
            duration: (0, n.hrTimeToMicroseconds)(e.duration),
            attributes: e.attributes,
            status: e.status,
            events: e.events,
            links: e.links,
          }
        }
        _sendSpans(e, t) {
          for (const t of e) {
            console.dir(this._exportInfo(t), { depth: 3 })
          }
          if (t) {
            return t({ code: n.ExportResultCode.SUCCESS })
          }
        }
      }
      t.ConsoleSpanExporter = ConsoleSpanExporter
    },
    9492: (e, t, r) => {
      Object.defineProperty(t, '__esModule', { value: true })
      t.InMemorySpanExporter = void 0
      const n = r(8485)
      class InMemorySpanExporter {
        constructor() {
          this._finishedSpans = []
          this._stopped = false
        }
        export(e, t) {
          if (this._stopped)
            return t({
              code: n.ExportResultCode.FAILED,
              error: new Error('Exporter has been stopped'),
            })
          this._finishedSpans.push(...e)
          setTimeout(() => t({ code: n.ExportResultCode.SUCCESS }), 0)
        }
        shutdown() {
          this._stopped = true
          this._finishedSpans = []
          return Promise.resolve()
        }
        reset() {
          this._finishedSpans = []
        }
        getFinishedSpans() {
          return this._finishedSpans
        }
      }
      t.InMemorySpanExporter = InMemorySpanExporter
    },
    2900: (e, t) => {
      Object.defineProperty(t, '__esModule', { value: true })
      t.NoopSpanProcessor = void 0
      class NoopSpanProcessor {
        onStart(e, t) {}
        onEnd(e) {}
        shutdown() {
          return Promise.resolve()
        }
        forceFlush() {
          return Promise.resolve()
        }
      }
      t.NoopSpanProcessor = NoopSpanProcessor
    },
    3197: (e, t) => {
      Object.defineProperty(t, '__esModule', { value: true })
    },
    9499: (e, t, r) => {
      Object.defineProperty(t, '__esModule', { value: true })
      t.SimpleSpanProcessor = void 0
      const n = r(8720)
      const i = r(8485)
      class SimpleSpanProcessor {
        constructor(e) {
          this._exporter = e
          this._shutdownOnce = new i.BindOnceFuture(this._shutdown, this)
        }
        forceFlush() {
          return Promise.resolve()
        }
        onStart(e, t) {}
        onEnd(e) {
          if (this._shutdownOnce.isCalled) {
            return
          }
          if ((e.spanContext().traceFlags & n.TraceFlags.SAMPLED) === 0) {
            return
          }
          n.context.with((0, i.suppressTracing)(n.context.active()), () => {
            this._exporter.export([e], (e) => {
              var t
              if (e.code !== i.ExportResultCode.SUCCESS) {
                ;(0, i.globalErrorHandler)(
                  (t = e.error) !== null && t !== void 0
                    ? t
                    : new Error(
                        `SimpleSpanProcessor: span export failed (status ${e})`
                      )
                )
              }
            })
          })
        }
        shutdown() {
          return this._shutdownOnce.call()
        }
        _shutdown() {
          return this._exporter.shutdown()
        }
      }
      t.SimpleSpanProcessor = SimpleSpanProcessor
    },
    9650: (e, t) => {
      Object.defineProperty(t, '__esModule', { value: true })
    },
    3218: function (e, t, r) {
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
      var i =
        (this && this.__exportStar) ||
        function (e, t) {
          for (var r in e)
            if (r !== 'default' && !Object.prototype.hasOwnProperty.call(t, r))
              n(t, e, r)
        }
      Object.defineProperty(t, '__esModule', { value: true })
      i(r(358), t)
      i(r(5538), t)
      i(r(7671), t)
      i(r(8463), t)
      i(r(9492), t)
      i(r(3197), t)
      i(r(9499), t)
      i(r(9650), t)
      i(r(2900), t)
      i(r(245), t)
      i(r(5089), t)
      i(r(9052), t)
      i(r(4237), t)
      i(r(1557), t)
      i(r(5982), t)
      i(r(698), t)
      i(r(4039), t)
      i(r(9716), t)
      i(r(4620), t)
    },
    7671: function (e, t, r) {
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
      var i =
        (this && this.__exportStar) ||
        function (e, t) {
          for (var r in e)
            if (r !== 'default' && !Object.prototype.hasOwnProperty.call(t, r))
              n(t, e, r)
        }
      Object.defineProperty(t, '__esModule', { value: true })
      i(r(9622), t)
    },
    7052: (e, t) => {
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
      const i = Buffer.allocUnsafe(n)
      function getIdGenerator(e) {
        return function generateId() {
          for (let t = 0; t < e / 4; t++) {
            i.writeUInt32BE((Math.random() * 2 ** 32) >>> 0, t * 4)
          }
          for (let t = 0; t < e; t++) {
            if (i[t] > 0) {
              break
            } else if (t === e - 1) {
              i[e - 1] = 1
            }
          }
          return i.toString('hex', 0, e)
        }
      }
    },
    1451: (e, t, r) => {
      Object.defineProperty(t, '__esModule', { value: true })
      t.BatchSpanProcessor = void 0
      const n = r(6719)
      class BatchSpanProcessor extends n.BatchSpanProcessorBase {
        onShutdown() {}
      }
      t.BatchSpanProcessor = BatchSpanProcessor
    },
    9622: function (e, t, r) {
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
      var i =
        (this && this.__exportStar) ||
        function (e, t) {
          for (var r in e)
            if (r !== 'default' && !Object.prototype.hasOwnProperty.call(t, r))
              n(t, e, r)
        }
      Object.defineProperty(t, '__esModule', { value: true })
      i(r(1451), t)
      i(r(7052), t)
    },
    245: (e, t, r) => {
      Object.defineProperty(t, '__esModule', { value: true })
      t.AlwaysOffSampler = void 0
      const n = r(1557)
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
    5089: (e, t, r) => {
      Object.defineProperty(t, '__esModule', { value: true })
      t.AlwaysOnSampler = void 0
      const n = r(1557)
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
    9052: (e, t, r) => {
      Object.defineProperty(t, '__esModule', { value: true })
      t.ParentBasedSampler = void 0
      const n = r(8720)
      const i = r(8485)
      const o = r(245)
      const s = r(5089)
      class ParentBasedSampler {
        constructor(e) {
          var t, r, n, a
          this._root = e.root
          if (!this._root) {
            ;(0, i.globalErrorHandler)(
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
              : new o.AlwaysOffSampler()
          this._localParentSampled =
            (n = e.localParentSampled) !== null && n !== void 0
              ? n
              : new s.AlwaysOnSampler()
          this._localParentNotSampled =
            (a = e.localParentNotSampled) !== null && a !== void 0
              ? a
              : new o.AlwaysOffSampler()
        }
        shouldSample(e, t, r, i, o, s) {
          const a = n.trace.getSpanContext(e)
          if (!a || !(0, n.isSpanContextValid)(a)) {
            return this._root.shouldSample(e, t, r, i, o, s)
          }
          if (a.isRemote) {
            if (a.traceFlags & n.TraceFlags.SAMPLED) {
              return this._remoteParentSampled.shouldSample(e, t, r, i, o, s)
            }
            return this._remoteParentNotSampled.shouldSample(e, t, r, i, o, s)
          }
          if (a.traceFlags & n.TraceFlags.SAMPLED) {
            return this._localParentSampled.shouldSample(e, t, r, i, o, s)
          }
          return this._localParentNotSampled.shouldSample(e, t, r, i, o, s)
        }
        toString() {
          return `ParentBased{root=${this._root.toString()}, remoteParentSampled=${this._remoteParentSampled.toString()}, remoteParentNotSampled=${this._remoteParentNotSampled.toString()}, localParentSampled=${this._localParentSampled.toString()}, localParentNotSampled=${this._localParentNotSampled.toString()}}`
        }
      }
      t.ParentBasedSampler = ParentBasedSampler
    },
    4237: (e, t, r) => {
      Object.defineProperty(t, '__esModule', { value: true })
      t.TraceIdRatioBasedSampler = void 0
      const n = r(8720)
      const i = r(1557)
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
                ? i.SamplingDecision.RECORD_AND_SAMPLED
                : i.SamplingDecision.NOT_RECORD,
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
            const i = parseInt(e.slice(n, n + 8), 16)
            t = (t ^ i) >>> 0
          }
          return t
        }
      }
      t.TraceIdRatioBasedSampler = TraceIdRatioBasedSampler
    },
    9716: (e, t) => {
      Object.defineProperty(t, '__esModule', { value: true })
    },
    5418: (e, t, r) => {
      Object.defineProperty(t, '__esModule', { value: true })
      t.reconfigureLimits = t.mergeConfig = void 0
      const n = r(2942)
      const i = r(8485)
      function mergeConfig(e) {
        const t = { sampler: (0, n.buildSamplerFromEnv)() }
        const r = (0, n.loadDefaultConfig)()
        const i = Object.assign({}, r, t, e)
        i.generalLimits = Object.assign(
          {},
          r.generalLimits,
          e.generalLimits || {}
        )
        i.spanLimits = Object.assign({}, r.spanLimits, e.spanLimits || {})
        return i
      }
      t.mergeConfig = mergeConfig
      function reconfigureLimits(e) {
        var t, r, n, o, s, a, l, u, c, _, d, p
        const E = Object.assign({}, e.spanLimits)
        const T = (0, i.getEnvWithoutDefaults)()
        E.attributeCountLimit =
          (a =
            (s =
              (o =
                (r =
                  (t = e.spanLimits) === null || t === void 0
                    ? void 0
                    : t.attributeCountLimit) !== null && r !== void 0
                  ? r
                  : (n = e.generalLimits) === null || n === void 0
                  ? void 0
                  : n.attributeCountLimit) !== null && o !== void 0
                ? o
                : T.OTEL_SPAN_ATTRIBUTE_COUNT_LIMIT) !== null && s !== void 0
              ? s
              : T.OTEL_ATTRIBUTE_COUNT_LIMIT) !== null && a !== void 0
            ? a
            : i.DEFAULT_ATTRIBUTE_COUNT_LIMIT
        E.attributeValueLengthLimit =
          (p =
            (d =
              (_ =
                (u =
                  (l = e.spanLimits) === null || l === void 0
                    ? void 0
                    : l.attributeValueLengthLimit) !== null && u !== void 0
                  ? u
                  : (c = e.generalLimits) === null || c === void 0
                  ? void 0
                  : c.attributeValueLengthLimit) !== null && _ !== void 0
                ? _
                : T.OTEL_SPAN_ATTRIBUTE_VALUE_LENGTH_LIMIT) !== null &&
            d !== void 0
              ? d
              : T.OTEL_ATTRIBUTE_VALUE_LENGTH_LIMIT) !== null && p !== void 0
            ? p
            : i.DEFAULT_ATTRIBUTE_VALUE_LENGTH_LIMIT
        return Object.assign({}, e, { spanLimits: E })
      }
      t.reconfigureLimits = reconfigureLimits
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
  }
  var t = {}
  function __nccwpck_require__(r) {
    var n = t[r]
    if (n !== undefined) {
      return n.exports
    }
    var i = (t[r] = { exports: {} })
    var o = true
    try {
      e[r].call(i.exports, i, i.exports, __nccwpck_require__)
      o = false
    } finally {
      if (o) delete t[r]
    }
    return i.exports
  }
  if (typeof __nccwpck_require__ !== 'undefined')
    __nccwpck_require__.ab = __dirname + '/'
  var r = __nccwpck_require__(3218)
  module.exports = r
})()
