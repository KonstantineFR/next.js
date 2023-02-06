;(() => {
  'use strict'
  var e = {
    8163: (e, t, r) => {
      Object.defineProperty(t, '__esModule', { value: true })
      t.AbstractAsyncHooksContextManager = void 0
      const n = r(2361)
      const a = [
        'addListener',
        'on',
        'once',
        'prependListener',
        'prependOnceListener',
      ]
      class AbstractAsyncHooksContextManager {
        constructor() {
          this._kOtListeners = Symbol('OtListeners')
          this._wrapped = false
        }
        bind(e, t) {
          if (t instanceof n.EventEmitter) {
            return this._bindEventEmitter(e, t)
          }
          if (typeof t === 'function') {
            return this._bindFunction(e, t)
          }
          return t
        }
        _bindFunction(e, t) {
          const r = this
          const contextWrapper = function (...n) {
            return r.with(e, () => t.apply(this, n))
          }
          Object.defineProperty(contextWrapper, 'length', {
            enumerable: false,
            configurable: true,
            writable: false,
            value: t.length,
          })
          return contextWrapper
        }
        _bindEventEmitter(e, t) {
          const r = this._getPatchMap(t)
          if (r !== undefined) return t
          this._createPatchMap(t)
          a.forEach((r) => {
            if (t[r] === undefined) return
            t[r] = this._patchAddListener(t, t[r], e)
          })
          if (typeof t.removeListener === 'function') {
            t.removeListener = this._patchRemoveListener(t, t.removeListener)
          }
          if (typeof t.off === 'function') {
            t.off = this._patchRemoveListener(t, t.off)
          }
          if (typeof t.removeAllListeners === 'function') {
            t.removeAllListeners = this._patchRemoveAllListeners(
              t,
              t.removeAllListeners
            )
          }
          return t
        }
        _patchRemoveListener(e, t) {
          const r = this
          return function (n, a) {
            var i
            const o =
              (i = r._getPatchMap(e)) === null || i === void 0 ? void 0 : i[n]
            if (o === undefined) {
              return t.call(this, n, a)
            }
            const s = o.get(a)
            return t.call(this, n, s || a)
          }
        }
        _patchRemoveAllListeners(e, t) {
          const r = this
          return function (n) {
            const a = r._getPatchMap(e)
            if (a !== undefined) {
              if (arguments.length === 0) {
                r._createPatchMap(e)
              } else if (a[n] !== undefined) {
                delete a[n]
              }
            }
            return t.apply(this, arguments)
          }
        }
        _patchAddListener(e, t, r) {
          const n = this
          return function (a, i) {
            if (n._wrapped) {
              return t.call(this, a, i)
            }
            let o = n._getPatchMap(e)
            if (o === undefined) {
              o = n._createPatchMap(e)
            }
            let s = o[a]
            if (s === undefined) {
              s = new WeakMap()
              o[a] = s
            }
            const c = n.bind(r, i)
            s.set(i, c)
            n._wrapped = true
            try {
              return t.call(this, a, c)
            } finally {
              n._wrapped = false
            }
          }
        }
        _createPatchMap(e) {
          const t = Object.create(null)
          e[this._kOtListeners] = t
          return t
        }
        _getPatchMap(e) {
          return e[this._kOtListeners]
        }
      }
      t.AbstractAsyncHooksContextManager = AbstractAsyncHooksContextManager
    },
    3500: (e, t, r) => {
      Object.defineProperty(t, '__esModule', { value: true })
      t.AsyncHooksContextManager = void 0
      const n = r(8720)
      const a = r(852)
      const i = r(8163)
      class AsyncHooksContextManager extends i.AbstractAsyncHooksContextManager {
        constructor() {
          super()
          this._contexts = new Map()
          this._stack = []
          this._asyncHook = a.createHook({
            init: this._init.bind(this),
            before: this._before.bind(this),
            after: this._after.bind(this),
            destroy: this._destroy.bind(this),
            promiseResolve: this._destroy.bind(this),
          })
        }
        active() {
          var e
          return (e = this._stack[this._stack.length - 1]) !== null &&
            e !== void 0
            ? e
            : n.ROOT_CONTEXT
        }
        with(e, t, r, ...n) {
          this._enterContext(e)
          try {
            return t.call(r, ...n)
          } finally {
            this._exitContext()
          }
        }
        enable() {
          this._asyncHook.enable()
          return this
        }
        disable() {
          this._asyncHook.disable()
          this._contexts.clear()
          this._stack = []
          return this
        }
        _init(e, t) {
          if (t === 'TIMERWRAP') return
          const r = this._stack[this._stack.length - 1]
          if (r !== undefined) {
            this._contexts.set(e, r)
          }
        }
        _destroy(e) {
          this._contexts.delete(e)
        }
        _before(e) {
          const t = this._contexts.get(e)
          if (t !== undefined) {
            this._enterContext(t)
          }
        }
        _after() {
          this._exitContext()
        }
        _enterContext(e) {
          this._stack.push(e)
        }
        _exitContext() {
          this._stack.pop()
        }
      }
      t.AsyncHooksContextManager = AsyncHooksContextManager
    },
    9303: (e, t, r) => {
      Object.defineProperty(t, '__esModule', { value: true })
      t.AsyncLocalStorageContextManager = void 0
      const n = r(8720)
      const a = r(852)
      const i = r(8163)
      class AsyncLocalStorageContextManager extends i.AbstractAsyncHooksContextManager {
        constructor() {
          super()
          this._asyncLocalStorage = new a.AsyncLocalStorage()
        }
        active() {
          var e
          return (e = this._asyncLocalStorage.getStore()) !== null &&
            e !== void 0
            ? e
            : n.ROOT_CONTEXT
        }
        with(e, t, r, ...n) {
          const a = r == null ? t : t.bind(r)
          return this._asyncLocalStorage.run(e, a, ...n)
        }
        enable() {
          return this
        }
        disable() {
          this._asyncLocalStorage.disable()
          return this
        }
      }
      t.AsyncLocalStorageContextManager = AsyncLocalStorageContextManager
    },
    2588: function (e, t, r) {
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
      a(r(3500), t)
      a(r(9303), t)
    },
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
      const a = r(9665)
      const i = r(4466)
      const o = r(1760)
      class W3CBaggagePropagator {
        inject(e, t, r) {
          const s = n.propagation.getBaggage(e)
          if (!s || (0, a.isTracingSuppressed)(e)) return
          const c = (0, o.getKeyPairs)(s)
            .filter((e) => e.length <= i.BAGGAGE_MAX_PER_NAME_VALUE_PAIRS)
            .slice(0, i.BAGGAGE_MAX_NAME_VALUE_PAIRS)
          const u = (0, o.serializeKeyPairs)(c)
          if (u.length > 0) {
            r.set(t, i.BAGGAGE_HEADER, u)
          }
        }
        extract(e, t, r) {
          const a = r.get(t, i.BAGGAGE_HEADER)
          const s = Array.isArray(a) ? a.join(i.BAGGAGE_ITEMS_SEPARATOR) : a
          if (!s) return e
          const c = {}
          if (s.length === 0) {
            return e
          }
          const u = s.split(i.BAGGAGE_ITEMS_SEPARATOR)
          u.forEach((e) => {
            const t = (0, o.parsePairKeyValue)(e)
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
    1760: (e, t, r) => {
      Object.defineProperty(t, '__esModule', { value: true })
      t.parseKeyPairsIntoRecord =
        t.parsePairKeyValue =
        t.getKeyPairs =
        t.serializeKeyPairs =
          void 0
      const n = r(8720)
      const a = r(4466)
      function serializeKeyPairs(e) {
        return e.reduce((e, t) => {
          const r = `${e}${e !== '' ? a.BAGGAGE_ITEMS_SEPARATOR : ''}${t}`
          return r.length > a.BAGGAGE_MAX_TOTAL_LENGTH ? e : r
        }, '')
      }
      t.serializeKeyPairs = serializeKeyPairs
      function getKeyPairs(e) {
        return e.getAllEntries().map(([e, t]) => {
          let r = `${encodeURIComponent(e)}=${encodeURIComponent(t.value)}`
          if (t.metadata !== undefined) {
            r += a.BAGGAGE_PROPERTIES_SEPARATOR + t.metadata.toString()
          }
          return r
        })
      }
      t.getKeyPairs = getKeyPairs
      function parsePairKeyValue(e) {
        const t = e.split(a.BAGGAGE_PROPERTIES_SEPARATOR)
        if (t.length <= 0) return
        const r = t.shift()
        if (!r) return
        const i = r.split(a.BAGGAGE_KEY_PAIR_SEPARATOR)
        if (i.length !== 2) return
        const o = decodeURIComponent(i[0].trim())
        const s = decodeURIComponent(i[1].trim())
        let c
        if (t.length > 0) {
          c = (0, n.baggageEntryMetadataFromString)(
            t.join(a.BAGGAGE_PROPERTIES_SEPARATOR)
          )
        }
        return { key: o, value: s, metadata: c }
      }
      t.parsePairKeyValue = parsePairKeyValue
      function parseKeyPairsIntoRecord(e) {
        if (typeof e !== 'string' || e.length === 0) return {}
        return e
          .split(a.BAGGAGE_ITEMS_SEPARATOR)
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
        for (const [r, a] of Object.entries(e)) {
          if (!isAttributeKey(r)) {
            n.diag.warn(`Invalid attribute key: ${r}`)
            continue
          }
          if (!isAttributeValue(a)) {
            n.diag.warn(`Invalid attribute value set for key: ${r}`)
            continue
          }
          if (Array.isArray(a)) {
            t[r] = a.slice()
          } else {
            t[r] = a
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
      let a = (0, n.loggingErrorHandler)()
      function setGlobalErrorHandler(e) {
        a = e
      }
      t.setGlobalErrorHandler = setGlobalErrorHandler
      function globalErrorHandler(e) {
        try {
          a(e)
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
      const a = 9
      const i = Math.pow(10, a)
      function numberToHrtime(e) {
        const t = e / 1e3
        const r = Math.trunc(t)
        const n = Number((t - r).toFixed(a)) * i
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
        let a = t[0] + r[0]
        let o = t[1] + r[1]
        if (o > i) {
          o -= i
          a += 1
        }
        return [a, o]
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
        const t = a
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
      var a =
        (this && this.__exportStar) ||
        function (e, t) {
          for (var r in e)
            if (r !== 'default' && !Object.prototype.hasOwnProperty.call(t, r))
              n(t, e, r)
        }
      Object.defineProperty(t, '__esModule', { value: true })
      t.baggageUtils = void 0
      a(r(9537), t)
      a(r(8908), t)
      a(r(5943), t)
      a(r(1162), t)
      a(r(9750), t)
      a(r(9652), t)
      a(r(577), t)
      a(r(7943), t)
      t.baggageUtils = r(1760)
      a(r(2383), t)
      a(r(5617), t)
      a(r(8708), t)
      a(r(1963), t)
      a(r(9259), t)
      a(r(8875), t)
      a(r(9971), t)
      a(r(8302), t)
      a(r(1717), t)
      a(r(9665), t)
      a(r(1599), t)
      a(r(9651), t)
      a(r(348), t)
      a(r(5572), t)
      a(r(4394), t)
      a(r(4630), t)
      a(r(7820), t)
      a(r(7943), t)
    },
    7849: (e, t) => {
      Object.defineProperty(t, '__esModule', { value: true })
      t.validateValue = t.validateKey = void 0
      const r = '[_0-9a-z-*/]'
      const n = `[a-z]${r}{0,255}`
      const a = `[a-z0-9]${r}{0,240}@[a-z]${r}{0,13}`
      const i = new RegExp(`^(?:${n}|${a})$`)
      const o = /^[ -~]{0,255}[!-~]$/
      const s = /,|=/
      function validateKey(e) {
        return i.test(e)
      }
      t.validateKey = validateKey
      function validateValue(e) {
        return o.test(e) && !s.test(e)
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
      var a =
        (this && this.__exportStar) ||
        function (e, t) {
          for (var r in e)
            if (r !== 'default' && !Object.prototype.hasOwnProperty.call(t, r))
              n(t, e, r)
        }
      Object.defineProperty(t, '__esModule', { value: true })
      a(r(4708), t)
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
      const a = Buffer.allocUnsafe(n)
      function getIdGenerator(e) {
        return function generateId() {
          for (let t = 0; t < e / 4; t++) {
            a.writeUInt32BE((Math.random() * 2 ** 32) >>> 0, t * 4)
          }
          for (let t = 0; t < e; t++) {
            if (a[t] > 0) {
              break
            } else if (t === e - 1) {
              a[e - 1] = 1
            }
          }
          return a.toString('hex', 0, e)
        }
      }
    },
    9709: (e, t, r) => {
      Object.defineProperty(t, '__esModule', { value: true })
      t.getEnv = void 0
      const n = r(2037)
      const a = r(9651)
      function getEnv() {
        const e = (0, a.parseEnvironment)(process.env)
        return Object.assign(
          { HOSTNAME: n.hostname() },
          a.DEFAULT_ENVIRONMENT,
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
        let a = 0
        for (let r = 0; r < e.length; r += 2) {
          const n = intValue(e.charCodeAt(r))
          const i = intValue(e.charCodeAt(r + 1))
          t.writeUInt8((n << 4) | i, a++)
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
      var a =
        (this && this.__exportStar) ||
        function (e, t) {
          for (var r in e)
            if (r !== 'default' && !Object.prototype.hasOwnProperty.call(t, r))
              n(t, e, r)
        }
      Object.defineProperty(t, '__esModule', { value: true })
      a(r(9709), t)
      a(r(8924), t)
      a(r(1443), t)
      a(r(8799), t)
      a(r(5894), t)
      a(r(8254), t)
      a(r(6157), t)
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
      const a = r(3190)
      t.SDK_INFO = {
        [a.SemanticResourceAttributes.TELEMETRY_SDK_NAME]: 'opentelemetry',
        [a.SemanticResourceAttributes.PROCESS_RUNTIME_NAME]: 'node',
        [a.SemanticResourceAttributes.TELEMETRY_SDK_LANGUAGE]:
          a.TelemetrySdkLanguageValues.NODEJS,
        [a.SemanticResourceAttributes.TELEMETRY_SDK_VERSION]: n.VERSION,
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
          for (const a of this._propagators) {
            try {
              a.inject(e, t, r)
            } catch (e) {
              n.diag.warn(
                `Failed to inject with ${a.constructor.name}. Err: ${e.message}`
              )
            }
          }
        }
        extract(e, t, r) {
          return this._propagators.reduce((e, a) => {
            try {
              return a.extract(e, t, r)
            } catch (e) {
              n.diag.warn(
                `Failed to inject with ${a.constructor.name}. Err: ${e.message}`
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
      const a = 32
      const i = 512
      const o = ','
      const s = '='
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
              e.push(t + s + this.get(t))
              return e
            }, [])
            .join(o)
        }
        _parse(e) {
          if (e.length > i) return
          this._internalState = e
            .split(o)
            .reverse()
            .reduce((e, t) => {
              const r = t.trim()
              const a = r.indexOf(s)
              if (a !== -1) {
                const i = r.slice(0, a)
                const o = r.slice(a + 1, t.length)
                if ((0, n.validateKey)(i) && (0, n.validateValue)(o)) {
                  e.set(i, o)
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
      const a = r(9665)
      const i = r(1599)
      t.TRACE_PARENT_HEADER = 'traceparent'
      t.TRACE_STATE_HEADER = 'tracestate'
      const o = '00'
      const s = '(?!ff)[\\da-f]{2}'
      const c = '(?![0]{32})[\\da-f]{32}'
      const u = '(?![0]{16})[\\da-f]{16}'
      const l = '[\\da-f]{2}'
      const _ = new RegExp(`^\\s?(${s})-(${c})-(${u})-(${l})(-.*)?\\s?$`)
      function parseTraceParent(e) {
        const t = _.exec(e)
        if (!t) return null
        if (t[1] === '00' && t[5]) return null
        return { traceId: t[2], spanId: t[3], traceFlags: parseInt(t[4], 16) }
      }
      t.parseTraceParent = parseTraceParent
      class W3CTraceContextPropagator {
        inject(e, r, i) {
          const s = n.trace.getSpanContext(e)
          if (
            !s ||
            (0, a.isTracingSuppressed)(e) ||
            !(0, n.isSpanContextValid)(s)
          )
            return
          const c = `${o}-${s.traceId}-${s.spanId}-0${Number(
            s.traceFlags || n.TraceFlags.NONE
          ).toString(16)}`
          i.set(r, t.TRACE_PARENT_HEADER, c)
          if (s.traceState) {
            i.set(r, t.TRACE_STATE_HEADER, s.traceState.serialize())
          }
        }
        extract(e, r, a) {
          const o = a.get(r, t.TRACE_PARENT_HEADER)
          if (!o) return e
          const s = Array.isArray(o) ? o[0] : o
          if (typeof s !== 'string') return e
          const c = parseTraceParent(s)
          if (!c) return e
          c.isRemote = true
          const u = a.get(r, t.TRACE_STATE_HEADER)
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
    9259: (e, t, r) => {
      Object.defineProperty(t, '__esModule', { value: true })
      t.getRPCMetadata =
        t.deleteRPCMetadata =
        t.setRPCMetadata =
        t.RPCType =
          void 0
      const n = r(8720)
      const a = (0, n.createContextKey)(
        'OpenTelemetry SDK Context Key RPC_METADATA'
      )
      var i
      ;(function (e) {
        e['HTTP'] = 'http'
      })((i = t.RPCType || (t.RPCType = {})))
      function setRPCMetadata(e, t) {
        return e.setValue(a, t)
      }
      t.setRPCMetadata = setRPCMetadata
      function deleteRPCMetadata(e) {
        return e.deleteValue(a)
      }
      t.deleteRPCMetadata = deleteRPCMetadata
      function getRPCMetadata(e) {
        return e.getValue(a)
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
      const a = r(5943)
      const i = r(8875)
      const o = r(9971)
      class ParentBasedSampler {
        constructor(e) {
          var t, r, n, s
          this._root = e.root
          if (!this._root) {
            ;(0, a.globalErrorHandler)(
              new Error(
                'ParentBasedSampler must have a root sampler configured'
              )
            )
            this._root = new o.AlwaysOnSampler()
          }
          this._remoteParentSampled =
            (t = e.remoteParentSampled) !== null && t !== void 0
              ? t
              : new o.AlwaysOnSampler()
          this._remoteParentNotSampled =
            (r = e.remoteParentNotSampled) !== null && r !== void 0
              ? r
              : new i.AlwaysOffSampler()
          this._localParentSampled =
            (n = e.localParentSampled) !== null && n !== void 0
              ? n
              : new o.AlwaysOnSampler()
          this._localParentNotSampled =
            (s = e.localParentNotSampled) !== null && s !== void 0
              ? s
              : new i.AlwaysOffSampler()
        }
        shouldSample(e, t, r, a, i, o) {
          const s = n.trace.getSpanContext(e)
          if (!s || !(0, n.isSpanContextValid)(s)) {
            return this._root.shouldSample(e, t, r, a, i, o)
          }
          if (s.isRemote) {
            if (s.traceFlags & n.TraceFlags.SAMPLED) {
              return this._remoteParentSampled.shouldSample(e, t, r, a, i, o)
            }
            return this._remoteParentNotSampled.shouldSample(e, t, r, a, i, o)
          }
          if (s.traceFlags & n.TraceFlags.SAMPLED) {
            return this._localParentSampled.shouldSample(e, t, r, a, i, o)
          }
          return this._localParentNotSampled.shouldSample(e, t, r, a, i, o)
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
            const a = parseInt(e.slice(n, n + 8), 16)
            t = (t ^ a) >>> 0
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
      const a = (0, n.createContextKey)(
        'OpenTelemetry SDK Context Key SUPPRESS_TRACING'
      )
      function suppressTracing(e) {
        return e.setValue(a, true)
      }
      t.suppressTracing = suppressTracing
      function unsuppressTracing(e) {
        return e.deleteValue(a)
      }
      t.unsuppressTracing = unsuppressTracing
      function isTracingSuppressed(e) {
        return e.getValue(a) === true
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
      const a = r(5572)
      const i = r(5760)
      const o = ','
      const s = [
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
        return s.indexOf(e) > -1
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
        OTEL_TRACES_SAMPLER: a.TracesSamplerValues.ParentBasedAlwaysOn,
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
      function parseNumber(e, t, r, n = -Infinity, a = Infinity) {
        if (typeof r[e] !== 'undefined') {
          const i = Number(r[e])
          if (!isNaN(i)) {
            if (i < n) {
              t[e] = n
            } else if (i > a) {
              t[e] = a
            } else {
              t[e] = i
            }
          }
        }
      }
      function parseStringList(e, t, r, n = o) {
        const a = r[e]
        if (typeof a === 'string') {
          t[e] = a.split(n).map((e) => e.trim())
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
    3603: (e, t) => {
      Object.defineProperty(t, '__esModule', { value: true })
      t.isPlainObject = void 0
      const r = '[object Object]'
      const n = '[object Null]'
      const a = '[object Undefined]'
      const i = Function.prototype
      const o = i.toString
      const s = o.call(Object)
      const c = overArg(Object.getPrototypeOf, Object)
      const u = Object.prototype
      const l = u.hasOwnProperty
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
        const t = c(e)
        if (t === null) {
          return true
        }
        const n = l.call(t, 'constructor') && t.constructor
        return typeof n == 'function' && n instanceof n && o.call(n) === s
      }
      t.isPlainObject = isPlainObject
      function isObjectLike(e) {
        return e != null && typeof e == 'object'
      }
      function baseGetTag(e) {
        if (e == null) {
          return e === undefined ? a : n
        }
        return _ && _ in Object(e) ? getRawTag(e) : objectToString(e)
      }
      function getRawTag(e) {
        const t = l.call(e, _),
          r = e[_]
        let n = false
        try {
          e[_] = undefined
          n = true
        } catch (e) {}
        const a = d.call(e)
        if (n) {
          if (t) {
            e[_] = r
          } else {
            delete e[_]
          }
        }
        return a
      }
      function objectToString(e) {
        return d.call(e)
      }
    },
    348: (e, t, r) => {
      Object.defineProperty(t, '__esModule', { value: true })
      t.merge = void 0
      const n = r(3603)
      const a = 20
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
        if (r > a) {
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
            const a = Object.keys(t)
            for (let o = 0, s = a.length; o < s; o++) {
              const s = a[o]
              const c = t[s]
              if (isPrimitive(c)) {
                if (typeof c === 'undefined') {
                  delete i[s]
                } else {
                  i[s] = c
                }
              } else {
                const a = i[s]
                const o = c
                if (
                  wasObjectReferenced(e, s, n) ||
                  wasObjectReferenced(t, s, n)
                ) {
                  delete i[s]
                } else {
                  if (isObject(a) && isObject(o)) {
                    const r = n.get(a) || []
                    const i = n.get(o) || []
                    r.push({ obj: e, key: s })
                    i.push({ obj: t, key: s })
                    n.set(a, r)
                    n.set(o, i)
                  }
                  i[s] = mergeTwoObjects(i[s], c, r, n)
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
        for (let r = 0, a = n.length; r < a; r++) {
          const a = n[r]
          if (a.key === t && a.obj === e) {
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
    8499: (e, t, r) => {
      Object.defineProperty(t, '__esModule', { value: true })
      t.B3MultiPropagator = void 0
      const n = r(8720)
      const a = r(8485)
      const i = r(1820)
      const o = r(7228)
      const s = new Set([true, 'true', 'True', '1', 1])
      const c = new Set([false, 'false', 'False', '0', 0])
      function isValidSampledValue(e) {
        return e === n.TraceFlags.SAMPLED || e === n.TraceFlags.NONE
      }
      function parseHeader(e) {
        return Array.isArray(e) ? e[0] : e
      }
      function getHeaderValue(e, t, r) {
        const n = t.get(e, r)
        return parseHeader(n)
      }
      function getTraceId(e, t) {
        const r = getHeaderValue(e, t, o.X_B3_TRACE_ID)
        if (typeof r === 'string') {
          return r.padStart(32, '0')
        }
        return ''
      }
      function getSpanId(e, t) {
        const r = getHeaderValue(e, t, o.X_B3_SPAN_ID)
        if (typeof r === 'string') {
          return r
        }
        return ''
      }
      function getDebug(e, t) {
        const r = getHeaderValue(e, t, o.X_B3_FLAGS)
        return r === '1' ? '1' : undefined
      }
      function getTraceFlags(e, t) {
        const r = getHeaderValue(e, t, o.X_B3_SAMPLED)
        const a = getDebug(e, t)
        if (a === '1' || s.has(r)) {
          return n.TraceFlags.SAMPLED
        }
        if (r === undefined || c.has(r)) {
          return n.TraceFlags.NONE
        }
        return
      }
      class B3MultiPropagator {
        inject(e, t, r) {
          const s = n.trace.getSpanContext(e)
          if (
            !s ||
            !(0, n.isSpanContextValid)(s) ||
            (0, a.isTracingSuppressed)(e)
          )
            return
          const c = e.getValue(i.B3_DEBUG_FLAG_KEY)
          r.set(t, o.X_B3_TRACE_ID, s.traceId)
          r.set(t, o.X_B3_SPAN_ID, s.spanId)
          if (c === '1') {
            r.set(t, o.X_B3_FLAGS, c)
          } else if (s.traceFlags !== undefined) {
            r.set(
              t,
              o.X_B3_SAMPLED,
              (n.TraceFlags.SAMPLED & s.traceFlags) === n.TraceFlags.SAMPLED
                ? '1'
                : '0'
            )
          }
        }
        extract(e, t, r) {
          const a = getTraceId(t, r)
          const o = getSpanId(t, r)
          const s = getTraceFlags(t, r)
          const c = getDebug(t, r)
          if (
            (0, n.isValidTraceId)(a) &&
            (0, n.isValidSpanId)(o) &&
            isValidSampledValue(s)
          ) {
            e = e.setValue(i.B3_DEBUG_FLAG_KEY, c)
            return n.trace.setSpanContext(e, {
              traceId: a,
              spanId: o,
              isRemote: true,
              traceFlags: s,
            })
          }
          return e
        }
        fields() {
          return [
            o.X_B3_TRACE_ID,
            o.X_B3_SPAN_ID,
            o.X_B3_FLAGS,
            o.X_B3_SAMPLED,
            o.X_B3_PARENT_SPAN_ID,
          ]
        }
      }
      t.B3MultiPropagator = B3MultiPropagator
    },
    5257: (e, t, r) => {
      Object.defineProperty(t, '__esModule', { value: true })
      t.B3Propagator = void 0
      const n = r(8485)
      const a = r(8499)
      const i = r(597)
      const o = r(7228)
      const s = r(6569)
      class B3Propagator {
        constructor(e = {}) {
          this._b3MultiPropagator = new a.B3MultiPropagator()
          this._b3SinglePropagator = new i.B3SinglePropagator()
          if (e.injectEncoding === s.B3InjectEncoding.MULTI_HEADER) {
            this._inject = this._b3MultiPropagator.inject
            this._fields = this._b3MultiPropagator.fields()
          } else {
            this._inject = this._b3SinglePropagator.inject
            this._fields = this._b3SinglePropagator.fields()
          }
        }
        inject(e, t, r) {
          if ((0, n.isTracingSuppressed)(e)) {
            return
          }
          this._inject(e, t, r)
        }
        extract(e, t, r) {
          const n = r.get(t, o.B3_CONTEXT_HEADER)
          const a = Array.isArray(n) ? n[0] : n
          if (a) {
            return this._b3SinglePropagator.extract(e, t, r)
          } else {
            return this._b3MultiPropagator.extract(e, t, r)
          }
        }
        fields() {
          return this._fields
        }
      }
      t.B3Propagator = B3Propagator
    },
    597: (e, t, r) => {
      Object.defineProperty(t, '__esModule', { value: true })
      t.B3SinglePropagator = void 0
      const n = r(8720)
      const a = r(8485)
      const i = r(1820)
      const o = r(7228)
      const s =
        /((?:[0-9a-f]{16}){1,2})-([0-9a-f]{16})(?:-([01d](?![0-9a-f])))?(?:-([0-9a-f]{16}))?/
      const c = '0'.repeat(16)
      const u = new Set(['d', '1'])
      const l = 'd'
      function convertToTraceId128(e) {
        return e.length === 32 ? e : `${c}${e}`
      }
      function convertToTraceFlags(e) {
        if (e && u.has(e)) {
          return n.TraceFlags.SAMPLED
        }
        return n.TraceFlags.NONE
      }
      class B3SinglePropagator {
        inject(e, t, r) {
          const s = n.trace.getSpanContext(e)
          if (
            !s ||
            !(0, n.isSpanContextValid)(s) ||
            (0, a.isTracingSuppressed)(e)
          )
            return
          const c = e.getValue(i.B3_DEBUG_FLAG_KEY) || s.traceFlags & 1
          const u = `${s.traceId}-${s.spanId}-${c}`
          r.set(t, o.B3_CONTEXT_HEADER, u)
        }
        extract(e, t, r) {
          const a = r.get(t, o.B3_CONTEXT_HEADER)
          const c = Array.isArray(a) ? a[0] : a
          if (typeof c !== 'string') return e
          const u = c.match(s)
          if (!u) return e
          const [, _, d, E] = u
          const f = convertToTraceId128(_)
          if (!(0, n.isValidTraceId)(f) || !(0, n.isValidSpanId)(d)) return e
          const T = convertToTraceFlags(E)
          if (E === l) {
            e = e.setValue(i.B3_DEBUG_FLAG_KEY, E)
          }
          return n.trace.setSpanContext(e, {
            traceId: f,
            spanId: d,
            isRemote: true,
            traceFlags: T,
          })
        }
        fields() {
          return [o.B3_CONTEXT_HEADER]
        }
      }
      t.B3SinglePropagator = B3SinglePropagator
    },
    1820: (e, t, r) => {
      Object.defineProperty(t, '__esModule', { value: true })
      t.B3_DEBUG_FLAG_KEY = void 0
      const n = r(8720)
      t.B3_DEBUG_FLAG_KEY = (0, n.createContextKey)(
        'OpenTelemetry Context Key B3 Debug Flag'
      )
    },
    7228: (e, t) => {
      Object.defineProperty(t, '__esModule', { value: true })
      t.X_B3_FLAGS =
        t.X_B3_PARENT_SPAN_ID =
        t.X_B3_SAMPLED =
        t.X_B3_SPAN_ID =
        t.X_B3_TRACE_ID =
        t.B3_CONTEXT_HEADER =
          void 0
      t.B3_CONTEXT_HEADER = 'b3'
      t.X_B3_TRACE_ID = 'x-b3-traceid'
      t.X_B3_SPAN_ID = 'x-b3-spanid'
      t.X_B3_SAMPLED = 'x-b3-sampled'
      t.X_B3_PARENT_SPAN_ID = 'x-b3-parentspanid'
      t.X_B3_FLAGS = 'x-b3-flags'
    },
    8051: function (e, t, r) {
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
      a(r(5257), t)
      a(r(7228), t)
      a(r(6569), t)
    },
    6569: (e, t) => {
      Object.defineProperty(t, '__esModule', { value: true })
      t.B3InjectEncoding = void 0
      var r
      ;(function (e) {
        e[(e['SINGLE_HEADER'] = 0)] = 'SINGLE_HEADER'
        e[(e['MULTI_HEADER'] = 1)] = 'MULTI_HEADER'
      })((r = t.B3InjectEncoding || (t.B3InjectEncoding = {})))
    },
    6532: (e, t, r) => {
      Object.defineProperty(t, '__esModule', { value: true })
      t.JaegerPropagator =
        t.UBER_BAGGAGE_HEADER_PREFIX =
        t.UBER_TRACE_ID_HEADER =
          void 0
      const n = r(8720)
      const a = r(8485)
      t.UBER_TRACE_ID_HEADER = 'uber-trace-id'
      t.UBER_BAGGAGE_HEADER_PREFIX = 'uberctx'
      class JaegerPropagator {
        constructor(e) {
          if (typeof e === 'string') {
            this._jaegerTraceHeader = e
            this._jaegerBaggageHeaderPrefix = t.UBER_BAGGAGE_HEADER_PREFIX
          } else {
            this._jaegerTraceHeader =
              (e === null || e === void 0 ? void 0 : e.customTraceHeader) ||
              t.UBER_TRACE_ID_HEADER
            this._jaegerBaggageHeaderPrefix =
              (e === null || e === void 0
                ? void 0
                : e.customBaggageHeaderPrefix) || t.UBER_BAGGAGE_HEADER_PREFIX
          }
        }
        inject(e, t, r) {
          const i = n.trace.getSpanContext(e)
          const o = n.propagation.getBaggage(e)
          if (i && (0, a.isTracingSuppressed)(e) === false) {
            const e = `0${(i.traceFlags || n.TraceFlags.NONE).toString(16)}`
            r.set(t, this._jaegerTraceHeader, `${i.traceId}:${i.spanId}:0:${e}`)
          }
          if (o) {
            for (const [e, n] of o.getAllEntries()) {
              r.set(
                t,
                `${this._jaegerBaggageHeaderPrefix}-${e}`,
                encodeURIComponent(n.value)
              )
            }
          }
        }
        extract(e, t, r) {
          var a
          const i = r.get(t, this._jaegerTraceHeader)
          const o = Array.isArray(i) ? i[0] : i
          const s = r
            .keys(t)
            .filter((e) => e.startsWith(`${this._jaegerBaggageHeaderPrefix}-`))
            .map((e) => {
              const n = r.get(t, e)
              return {
                key: e.substring(this._jaegerBaggageHeaderPrefix.length + 1),
                value: Array.isArray(n) ? n[0] : n,
              }
            })
          let c = e
          if (typeof o === 'string') {
            const e = deserializeSpanContext(o)
            if (e) {
              c = n.trace.setSpanContext(c, e)
            }
          }
          if (s.length === 0) return c
          let u =
            (a = n.propagation.getBaggage(e)) !== null && a !== void 0
              ? a
              : n.propagation.createBaggage()
          for (const e of s) {
            if (e.value === undefined) continue
            u = u.setEntry(e.key, { value: decodeURIComponent(e.value) })
          }
          c = n.propagation.setBaggage(c, u)
          return c
        }
        fields() {
          return [this._jaegerTraceHeader]
        }
      }
      t.JaegerPropagator = JaegerPropagator
      function deserializeSpanContext(e) {
        const t = decodeURIComponent(e).split(':')
        if (t.length !== 4) {
          return null
        }
        const [r, n, , a] = t
        const i = r.padStart(32, '0')
        const o = n.padStart(16, '0')
        const s = a.match(/^[0-9a-f]{1,2}$/i) ? parseInt(a, 16) & 1 : 1
        return { traceId: i, spanId: o, isRemote: true, traceFlags: s }
      }
    },
    4841: function (e, t, r) {
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
      a(r(6532), t)
    },
    9727: (e, t, r) => {
      Object.defineProperty(t, '__esModule', { value: true })
      t.NodeTracerProvider = void 0
      const n = r(2588)
      const a = r(8051)
      const i = r(1403)
      const o = r(1028)
      const s = r(4841)
      class NodeTracerProvider extends i.BasicTracerProvider {
        constructor(e = {}) {
          super(e)
        }
        register(e = {}) {
          if (e.contextManager === undefined) {
            const t = o.gte(process.version, '14.8.0')
              ? n.AsyncLocalStorageContextManager
              : n.AsyncHooksContextManager
            e.contextManager = new t()
            e.contextManager.enable()
          }
          super.register(e)
        }
      }
      t.NodeTracerProvider = NodeTracerProvider
      NodeTracerProvider._registeredPropagators = new Map([
        ...i.BasicTracerProvider._registeredPropagators,
        [
          'b3',
          () =>
            new a.B3Propagator({
              injectEncoding: a.B3InjectEncoding.SINGLE_HEADER,
            }),
        ],
        [
          'b3multi',
          () =>
            new a.B3Propagator({
              injectEncoding: a.B3InjectEncoding.MULTI_HEADER,
            }),
        ],
        ['jaeger', () => new s.JaegerPropagator()],
      ])
    },
    6414: function (e, t, r) {
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
      a(r(9727), t)
    },
    852: (e) => {
      e.exports = require('async_hooks')
    },
    2361: (e) => {
      e.exports = require('events')
    },
    8720: (e) => {
      e.exports = require('next/dist/compiled/@opentelemetry/api')
    },
    1403: (e) => {
      e.exports = require('next/dist/compiled/@opentelemetry/sdk-trace-base')
    },
    3190: (e) => {
      e.exports = require('next/dist/compiled/@opentelemetry/semantic-conventions')
    },
    1028: (e) => {
      e.exports = require('next/dist/compiled/semver')
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
    var a = (t[r] = { exports: {} })
    var i = true
    try {
      e[r].call(a.exports, a, a.exports, __nccwpck_require__)
      i = false
    } finally {
      if (i) delete t[r]
    }
    return a.exports
  }
  if (typeof __nccwpck_require__ !== 'undefined')
    __nccwpck_require__.ab = __dirname + '/'
  var r = __nccwpck_require__(6414)
  module.exports = r
})()
