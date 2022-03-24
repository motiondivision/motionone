(function () {
	'use strict';

	var react = {exports: {}};

	var react_production_min = {};

	/*
	object-assign
	(c) Sindre Sorhus
	@license MIT
	*/
	/* eslint-disable no-unused-vars */
	var getOwnPropertySymbols = Object.getOwnPropertySymbols;
	var hasOwnProperty = Object.prototype.hasOwnProperty;
	var propIsEnumerable = Object.prototype.propertyIsEnumerable;

	function toObject(val) {
		if (val === null || val === undefined) {
			throw new TypeError('Object.assign cannot be called with null or undefined');
		}

		return Object(val);
	}

	function shouldUseNative() {
		try {
			if (!Object.assign) {
				return false;
			}

			// Detect buggy property enumeration order in older V8 versions.

			// https://bugs.chromium.org/p/v8/issues/detail?id=4118
			var test1 = new String('abc');  // eslint-disable-line no-new-wrappers
			test1[5] = 'de';
			if (Object.getOwnPropertyNames(test1)[0] === '5') {
				return false;
			}

			// https://bugs.chromium.org/p/v8/issues/detail?id=3056
			var test2 = {};
			for (var i = 0; i < 10; i++) {
				test2['_' + String.fromCharCode(i)] = i;
			}
			var order2 = Object.getOwnPropertyNames(test2).map(function (n) {
				return test2[n];
			});
			if (order2.join('') !== '0123456789') {
				return false;
			}

			// https://bugs.chromium.org/p/v8/issues/detail?id=3056
			var test3 = {};
			'abcdefghijklmnopqrst'.split('').forEach(function (letter) {
				test3[letter] = letter;
			});
			if (Object.keys(Object.assign({}, test3)).join('') !==
					'abcdefghijklmnopqrst') {
				return false;
			}

			return true;
		} catch (err) {
			// We don't expect any of the above to throw, but better to be safe.
			return false;
		}
	}

	var objectAssign = shouldUseNative() ? Object.assign : function (target, source) {
		var from;
		var to = toObject(target);
		var symbols;

		for (var s = 1; s < arguments.length; s++) {
			from = Object(arguments[s]);

			for (var key in from) {
				if (hasOwnProperty.call(from, key)) {
					to[key] = from[key];
				}
			}

			if (getOwnPropertySymbols) {
				symbols = getOwnPropertySymbols(from);
				for (var i = 0; i < symbols.length; i++) {
					if (propIsEnumerable.call(from, symbols[i])) {
						to[symbols[i]] = from[symbols[i]];
					}
				}
			}
		}

		return to;
	};

	/** @license React v17.0.2
	 * react.production.min.js
	 *
	 * Copyright (c) Facebook, Inc. and its affiliates.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 */
	var l=objectAssign,n=60103,p=60106;react_production_min.Fragment=60107;react_production_min.StrictMode=60108;react_production_min.Profiler=60114;var q=60109,r=60110,t=60112;react_production_min.Suspense=60113;var u=60115,v=60116;
	if("function"===typeof Symbol&&Symbol.for){var w=Symbol.for;n=w("react.element");p=w("react.portal");react_production_min.Fragment=w("react.fragment");react_production_min.StrictMode=w("react.strict_mode");react_production_min.Profiler=w("react.profiler");q=w("react.provider");r=w("react.context");t=w("react.forward_ref");react_production_min.Suspense=w("react.suspense");u=w("react.memo");v=w("react.lazy");}var x="function"===typeof Symbol&&Symbol.iterator;
	function y(a){if(null===a||"object"!==typeof a)return null;a=x&&a[x]||a["@@iterator"];return "function"===typeof a?a:null}function z(a){for(var b="https://reactjs.org/docs/error-decoder.html?invariant="+a,c=1;c<arguments.length;c++)b+="&args[]="+encodeURIComponent(arguments[c]);return "Minified React error #"+a+"; visit "+b+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}
	var A={isMounted:function(){return !1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},B={};function C(a,b,c){this.props=a;this.context=b;this.refs=B;this.updater=c||A;}C.prototype.isReactComponent={};C.prototype.setState=function(a,b){if("object"!==typeof a&&"function"!==typeof a&&null!=a)throw Error(z(85));this.updater.enqueueSetState(this,a,b,"setState");};C.prototype.forceUpdate=function(a){this.updater.enqueueForceUpdate(this,a,"forceUpdate");};
	function D(){}D.prototype=C.prototype;function E(a,b,c){this.props=a;this.context=b;this.refs=B;this.updater=c||A;}var F=E.prototype=new D;F.constructor=E;l(F,C.prototype);F.isPureReactComponent=!0;var G={current:null},H=Object.prototype.hasOwnProperty,I={key:!0,ref:!0,__self:!0,__source:!0};
	function J(a,b,c){var e,d={},k=null,h=null;if(null!=b)for(e in void 0!==b.ref&&(h=b.ref),void 0!==b.key&&(k=""+b.key),b)H.call(b,e)&&!I.hasOwnProperty(e)&&(d[e]=b[e]);var g=arguments.length-2;if(1===g)d.children=c;else if(1<g){for(var f=Array(g),m=0;m<g;m++)f[m]=arguments[m+2];d.children=f;}if(a&&a.defaultProps)for(e in g=a.defaultProps,g)void 0===d[e]&&(d[e]=g[e]);return {$$typeof:n,type:a,key:k,ref:h,props:d,_owner:G.current}}
	function K(a,b){return {$$typeof:n,type:a.type,key:b,ref:a.ref,props:a.props,_owner:a._owner}}function L(a){return "object"===typeof a&&null!==a&&a.$$typeof===n}function escape(a){var b={"=":"=0",":":"=2"};return "$"+a.replace(/[=:]/g,function(a){return b[a]})}var M=/\/+/g;function N(a,b){return "object"===typeof a&&null!==a&&null!=a.key?escape(""+a.key):b.toString(36)}
	function O(a,b,c,e,d){var k=typeof a;if("undefined"===k||"boolean"===k)a=null;var h=!1;if(null===a)h=!0;else switch(k){case "string":case "number":h=!0;break;case "object":switch(a.$$typeof){case n:case p:h=!0;}}if(h)return h=a,d=d(h),a=""===e?"."+N(h,0):e,Array.isArray(d)?(c="",null!=a&&(c=a.replace(M,"$&/")+"/"),O(d,b,c,"",function(a){return a})):null!=d&&(L(d)&&(d=K(d,c+(!d.key||h&&h.key===d.key?"":(""+d.key).replace(M,"$&/")+"/")+a)),b.push(d)),1;h=0;e=""===e?".":e+":";if(Array.isArray(a))for(var g=
	0;g<a.length;g++){k=a[g];var f=e+N(k,g);h+=O(k,b,c,f,d);}else if(f=y(a),"function"===typeof f)for(a=f.call(a),g=0;!(k=a.next()).done;)k=k.value,f=e+N(k,g++),h+=O(k,b,c,f,d);else if("object"===k)throw b=""+a,Error(z(31,"[object Object]"===b?"object with keys {"+Object.keys(a).join(", ")+"}":b));return h}function P(a,b,c){if(null==a)return a;var e=[],d=0;O(a,e,"","",function(a){return b.call(c,a,d++)});return e}
	function Q(a){if(-1===a._status){var b=a._result;b=b();a._status=0;a._result=b;b.then(function(b){0===a._status&&(b=b.default,a._status=1,a._result=b);},function(b){0===a._status&&(a._status=2,a._result=b);});}if(1===a._status)return a._result;throw a._result;}var R={current:null};function S(){var a=R.current;if(null===a)throw Error(z(321));return a}var T={ReactCurrentDispatcher:R,ReactCurrentBatchConfig:{transition:0},ReactCurrentOwner:G,IsSomeRendererActing:{current:!1},assign:l};
	react_production_min.Children={map:P,forEach:function(a,b,c){P(a,function(){b.apply(this,arguments);},c);},count:function(a){var b=0;P(a,function(){b++;});return b},toArray:function(a){return P(a,function(a){return a})||[]},only:function(a){if(!L(a))throw Error(z(143));return a}};react_production_min.Component=C;react_production_min.PureComponent=E;react_production_min.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=T;
	react_production_min.cloneElement=function(a,b,c){if(null===a||void 0===a)throw Error(z(267,a));var e=l({},a.props),d=a.key,k=a.ref,h=a._owner;if(null!=b){void 0!==b.ref&&(k=b.ref,h=G.current);void 0!==b.key&&(d=""+b.key);if(a.type&&a.type.defaultProps)var g=a.type.defaultProps;for(f in b)H.call(b,f)&&!I.hasOwnProperty(f)&&(e[f]=void 0===b[f]&&void 0!==g?g[f]:b[f]);}var f=arguments.length-2;if(1===f)e.children=c;else if(1<f){g=Array(f);for(var m=0;m<f;m++)g[m]=arguments[m+2];e.children=g;}return {$$typeof:n,type:a.type,
	key:d,ref:k,props:e,_owner:h}};react_production_min.createContext=function(a,b){void 0===b&&(b=null);a={$$typeof:r,_calculateChangedBits:b,_currentValue:a,_currentValue2:a,_threadCount:0,Provider:null,Consumer:null};a.Provider={$$typeof:q,_context:a};return a.Consumer=a};react_production_min.createElement=J;react_production_min.createFactory=function(a){var b=J.bind(null,a);b.type=a;return b};react_production_min.createRef=function(){return {current:null}};react_production_min.forwardRef=function(a){return {$$typeof:t,render:a}};react_production_min.isValidElement=L;
	react_production_min.lazy=function(a){return {$$typeof:v,_payload:{_status:-1,_result:a},_init:Q}};react_production_min.memo=function(a,b){return {$$typeof:u,type:a,compare:void 0===b?null:b}};react_production_min.useCallback=function(a,b){return S().useCallback(a,b)};react_production_min.useContext=function(a,b){return S().useContext(a,b)};react_production_min.useDebugValue=function(){};react_production_min.useEffect=function(a,b){return S().useEffect(a,b)};react_production_min.useImperativeHandle=function(a,b,c){return S().useImperativeHandle(a,b,c)};
	react_production_min.useLayoutEffect=function(a,b){return S().useLayoutEffect(a,b)};react_production_min.useMemo=function(a,b){return S().useMemo(a,b)};react_production_min.useReducer=function(a,b,c){return S().useReducer(a,b,c)};react_production_min.useRef=function(a){return S().useRef(a)};react_production_min.useState=function(a){return S().useState(a)};react_production_min.version="17.0.2";

	{
	  react.exports = react_production_min;
	}

	function createStore(createState) {
	  let state;
	  const listeners = /* @__PURE__ */ new Set();
	  const setState = (partial, replace) => {
	    const nextState = typeof partial === "function" ? partial(state) : partial;
	    if (nextState !== state) {
	      const previousState = state;
	      state = replace ? nextState : Object.assign({}, state, nextState);
	      listeners.forEach((listener) => listener(state, previousState));
	    }
	  };
	  const getState = () => state;
	  const subscribeWithSelector = (listener, selector = getState, equalityFn = Object.is) => {
	    console.warn("[DEPRECATED] Please use `subscribeWithSelector` middleware");
	    let currentSlice = selector(state);
	    function listenerToAdd() {
	      const nextSlice = selector(state);
	      if (!equalityFn(currentSlice, nextSlice)) {
	        const previousSlice = currentSlice;
	        listener(currentSlice = nextSlice, previousSlice);
	      }
	    }
	    listeners.add(listenerToAdd);
	    return () => listeners.delete(listenerToAdd);
	  };
	  const subscribe = (listener, selector, equalityFn) => {
	    if (selector || equalityFn) {
	      return subscribeWithSelector(listener, selector, equalityFn);
	    }
	    listeners.add(listener);
	    return () => listeners.delete(listener);
	  };
	  const destroy = () => listeners.clear();
	  const api = { setState, getState, subscribe, destroy };
	  state = createState(setState, getState, api);
	  return api;
	}

	const isSSR = typeof window === "undefined" || !window.navigator || /ServerSideRendering|^Deno\//.test(window.navigator.userAgent);
	const useIsomorphicLayoutEffect = isSSR ? react.exports.useEffect : react.exports.useLayoutEffect;
	function create(createState) {
	  const api = typeof createState === "function" ? createStore(createState) : createState;
	  const useStore = (selector = api.getState, equalityFn = Object.is) => {
	    const [, forceUpdate] = react.exports.useReducer((c) => c + 1, 0);
	    const state = api.getState();
	    const stateRef = react.exports.useRef(state);
	    const selectorRef = react.exports.useRef(selector);
	    const equalityFnRef = react.exports.useRef(equalityFn);
	    const erroredRef = react.exports.useRef(false);
	    const currentSliceRef = react.exports.useRef();
	    if (currentSliceRef.current === void 0) {
	      currentSliceRef.current = selector(state);
	    }
	    let newStateSlice;
	    let hasNewStateSlice = false;
	    if (stateRef.current !== state || selectorRef.current !== selector || equalityFnRef.current !== equalityFn || erroredRef.current) {
	      newStateSlice = selector(state);
	      hasNewStateSlice = !equalityFn(currentSliceRef.current, newStateSlice);
	    }
	    useIsomorphicLayoutEffect(() => {
	      if (hasNewStateSlice) {
	        currentSliceRef.current = newStateSlice;
	      }
	      stateRef.current = state;
	      selectorRef.current = selector;
	      equalityFnRef.current = equalityFn;
	      erroredRef.current = false;
	    });
	    const stateBeforeSubscriptionRef = react.exports.useRef(state);
	    useIsomorphicLayoutEffect(() => {
	      const listener = () => {
	        try {
	          const nextState = api.getState();
	          const nextStateSlice = selectorRef.current(nextState);
	          if (!equalityFnRef.current(currentSliceRef.current, nextStateSlice)) {
	            stateRef.current = nextState;
	            currentSliceRef.current = nextStateSlice;
	            forceUpdate();
	          }
	        } catch (error) {
	          erroredRef.current = true;
	          forceUpdate();
	        }
	      };
	      const unsubscribe = api.subscribe(listener);
	      if (api.getState() !== stateBeforeSubscriptionRef.current) {
	        listener();
	      }
	      return unsubscribe;
	    }, []);
	    const sliceToReturn = hasNewStateSlice ? newStateSlice : currentSliceRef.current;
	    react.exports.useDebugValue(sliceToReturn);
	    return sliceToReturn;
	  };
	  Object.assign(useStore, api);
	  useStore[Symbol.iterator] = function() {
	    console.warn("[useStore, api] = create() is deprecated and will be removed in v4");
	    const items = [useStore, api];
	    return {
	      next() {
	        const done = items.length <= 0;
	        return { value: items.shift(), done };
	      }
	    };
	  };
	  return useStore;
	}

	const subscribeWithSelector = (fn) => (set, get, api) => {
	  const origSubscribe = api.subscribe;
	  api.subscribe = (selector, optListener, options) => {
	    let listener = selector;
	    if (optListener) {
	      const equalityFn = (options == null ? void 0 : options.equalityFn) || Object.is;
	      let currentSlice = selector(api.getState());
	      listener = (state) => {
	        const nextSlice = selector(state);
	        if (!equalityFn(currentSlice, nextSlice)) {
	          const previousSlice = currentSlice;
	          optListener(currentSlice = nextSlice, previousSlice);
	        }
	      };
	      if (options == null ? void 0 : options.fireImmediately) {
	        optListener(currentSlice, currentSlice);
	      }
	    }
	    return origSubscribe(listener);
	  };
	  const initialState = fn(set, get, api);
	  return initialState;
	};

	let counter = 0;
	function generateElementId(element) {
	    if (element.id)
	        return `#${element.id}`;
	    counter++;
	    return element.tagName.toLowerCase() + " " + counter;
	}
	function getElementId(element) {
	    let motionId = element.dataset.motionId;
	    if (!motionId) {
	        element.dataset.motionId = motionId = generateElementId(element);
	    }
	    return motionId;
	}

	let id = 0;
	function uuid() {
	    id++;
	    return id;
	}

	const store = create(subscribeWithSelector((set, get) => ({
	    inspectedAnimation: undefined,
	    isRecording: false,
	    recordedAnimationCount: 0,
	    recordedAnimations: undefined,
	    startRecording: () => {
	        set({
	            isRecording: true,
	            recordedAnimations: undefined,
	            recordedAnimationCount: 1,
	            inspectedAnimation: undefined,
	        });
	    },
	    stopRecording: () => set({ isRecording: false }),
	    flushRecordedAnimations: () => {
	        set({
	            recordedAnimations: undefined,
	            recordedAnimationCount: get().recordedAnimationCount + 1,
	        });
	    },
	    inspectAnimation: (inspectedAnimation) => set({ inspectedAnimation }),
	    scrubTo: (currentTime) => {
	        const existingAnimation = get().inspectedAnimation;
	        if (existingAnimation) {
	            set({ inspectedAnimation: Object.assign(Object.assign({}, existingAnimation), { currentTime }) });
	        }
	    },
	    recordAnimation: (element, valueName, keyframes, options, source) => {
	        const { isRecording, recordedAnimationCount, recordedAnimations = {}, } = get();
	        if (!isRecording)
	            return;
	        // TODO: Replace animation name with options.name if present
	        const animationName = `Animation ${recordedAnimationCount}`;
	        const elementId = getElementId(element);
	        // TODO: This section probably doesn't need to be immutible
	        const newRecordedAnimations = Object.assign({}, recordedAnimations);
	        newRecordedAnimations[animationName] = Object.assign({}, (newRecordedAnimations[animationName] || createAnimationMetadata()));
	        newRecordedAnimations[animationName].elements[elementId] = [
	            ...(newRecordedAnimations[animationName].elements[elementId] || []),
	        ];
	        newRecordedAnimations[animationName].elements[elementId].push({
	            id: uuid(),
	            elementId,
	            animationName,
	            valueName,
	            keyframes,
	            options,
	            source,
	        });
	        set({
	            recordedAnimations: newRecordedAnimations,
	        });
	    },
	})));
	const createAnimationMetadata = () => ({
	    elements: {},
	    currentTime: 0,
	});

	function handleMessages() {
	    window.addEventListener("message", ({ source, data }) => {
	        if (source !== window)
	            return;
	        const state = store.getState();
	        switch (data.type) {
	            case "isrecording": {
	                data.isRecording ? state.startRecording() : state.stopRecording();
	                break;
	            }
	            case "scrubanimation": {
	                state.scrubTo(data.time);
	                break;
	            }
	            case "inspectanimation": {
	                state.inspectAnimation(data.animation);
	                break;
	            }
	        }
	    });
	}

	/*! *****************************************************************************
	Copyright (c) Microsoft Corporation.

	Permission to use, copy, modify, and/or distribute this software for any
	purpose with or without fee is hereby granted.

	THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
	REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
	AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
	INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
	LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
	OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
	PERFORMANCE OF THIS SOFTWARE.
	***************************************************************************** */

	function __rest(s, e) {
	    var t = {};
	    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
	        t[p] = s[p];
	    if (s != null && typeof Object.getOwnPropertySymbols === "function")
	        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
	            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
	                t[p[i]] = s[p[i]];
	        }
	    return t;
	}

	function addUniqueItem(array, item) {
	    array.indexOf(item) === -1 && array.push(item);
	}

	const clamp = (min, max, v) => Math.min(Math.max(v, min), max);

	const defaults = {
	    duration: 0.3,
	    delay: 0,
	    endDelay: 0,
	    repeat: 0,
	    easing: "ease",
	};

	const isNumber = (value) => typeof value === "number";
	const isEasingGenerator = (easing) => typeof easing === "object" &&
	    Boolean(easing.createAnimation);
	const isCubicBezier = (easing) => Array.isArray(easing) && isNumber(easing[0]);
	const isEasingList = (easing) => Array.isArray(easing) && !isNumber(easing[0]);

	const mix = (min, max, progress) => -progress * min + progress * max + min;

	const noop = () => { };
	const noopReturn = (v) => v;

	const progress = (min, max, value) => max - min === 0 ? 1 : (value - min) / (max - min);

	function fillOffset(offset, remaining) {
	    const min = offset[offset.length - 1];
	    for (let i = 1; i <= remaining; i++) {
	        const offsetProgress = progress(0, remaining, i);
	        offset.push(mix(min, 1, offsetProgress));
	    }
	}
	function defaultOffset(length) {
	    const offset = [0];
	    fillOffset(offset, length - 1);
	    return offset;
	}

	const time = {
	    ms: (seconds) => seconds * 1000,
	    s: (milliseconds) => milliseconds / 1000,
	};

	const wrap = (min, max, v) => {
	    const rangeSize = max - min;
	    return ((((v - min) % rangeSize) + rangeSize) % rangeSize) + min;
	};

	function getAnimationsFromAnimationEvent({ target, animationName, }) {
	    var _a;
	    if (!target)
	        return;
	    const element = target;
	    const elementAnimations = element.getAnimations();
	    const cssAnimation = elementAnimations.find((animation) => animation.animationName === animationName);
	    if (!cssAnimation)
	        return;
	    const animationTiming = cssAnimation.effect.getComputedTiming();
	    const duration = time.s(animationTiming.duration);
	    const iterations = animationTiming.iterations;
	    const repeat = iterations === Infinity ? "Infinity" : Math.max(0, (iterations !== null && iterations !== void 0 ? iterations : 1) - 1);
	    const animationKeyframes = cssAnimation.effect.getKeyframes();
	    const valueAnimations = {};
	    for (let _b of animationKeyframes) {
	        const { composite, computedOffset, easing, offset } = _b, values = __rest(_b, ["composite", "computedOffset", "easing", "offset"]);
	        for (const valueName in values) {
	            if (!valueAnimations[valueName]) {
	                valueAnimations[valueName] = {
	                    valueName,
	                    keyframes: [],
	                    options: {
	                        duration,
	                        repeat,
	                        easing: [],
	                        offset: [],
	                    },
	                };
	            }
	            const { keyframes, options } = valueAnimations[valueName];
	            if (keyframes.length) {
	                options === null || options === void 0 ? void 0 : options.easing.push(easing);
	            }
	            (_a = options === null || options === void 0 ? void 0 : options.offset) === null || _a === void 0 ? void 0 : _a.push(offset);
	            keyframes === null || keyframes === void 0 ? void 0 : keyframes.push(values[valueName]);
	        }
	    }
	    return Object.values(valueAnimations);
	}
	function record$1(event) {
	    const animations = getAnimationsFromAnimationEvent(event);
	    if (animations) {
	        animations.forEach(({ valueName, keyframes, options }) => {
	            store
	                .getState()
	                .recordAnimation(event.target, valueName, keyframes, options, "css-animation");
	        });
	    }
	}
	const cssAnimation = {
	    id: "css-animation",
	    onRecordStart: () => {
	        window.addEventListener("animationstart", record$1);
	    },
	    onRecordEnd: () => {
	        window.removeEventListener("animationstart", record$1);
	    },
	};

	const splitTransitions = (transitions) => transitions.split(/,\s*(?!\s*\d)/);
	const splitTransitionIntoProps = (transition) => transition.split(/ (?![^()]*\))/);
	function getRecordedAnimationFromTransitionEvent({ target, propertyName, }) {
	    var _a, _b;
	    if (!target)
	        return;
	    const element = target;
	    const { transition: transitionStyle } = window.getComputedStyle(element);
	    const transitions = splitTransitions(transitionStyle);
	    const nameAsPipeCase = pipeToCamel(propertyName);
	    let valueTransition;
	    for (const transitionDefinition of transitions) {
	        const props = splitTransitionIntoProps(transitionDefinition);
	        if (props[0] === "all") {
	            valueTransition = props;
	        }
	        else if (props[0] === propertyName) {
	            valueTransition = props;
	            break;
	        }
	    }
	    if (!valueTransition)
	        return;
	    const [_, duration, easing, delay] = valueTransition;
	    const elementAnimations = element.getAnimations();
	    const valueAnimation = elementAnimations.find((animation) => animation.transitionProperty === propertyName);
	    if (!valueAnimation)
	        return;
	    const keyframes = (_b = (_a = valueAnimation.effect) === null || _a === void 0 ? void 0 : _a.getKeyframes) === null || _b === void 0 ? void 0 : _b.call(_a);
	    if (!keyframes)
	        return;
	    return {
	        valueName: nameAsPipeCase,
	        keyframes: keyframes.map((keyframe) => keyframe[nameAsPipeCase]),
	        options: {
	            delay: parseFloat(delay),
	            duration: parseFloat(duration),
	            easing: easing.startsWith("cubic-bezier")
	                ? getEasingPoints(easing)
	                : easing,
	        },
	    };
	}
	function record(event) {
	    const animation = getRecordedAnimationFromTransitionEvent(event);
	    if (animation) {
	        store
	            .getState()
	            .recordAnimation(event.target, animation.valueName, animation.keyframes, animation.options, "css-transition");
	    }
	}
	const cssTransition = {
	    id: "css-transition",
	    onRecordStart: () => {
	        window.addEventListener("transitionrun", record);
	    },
	    onRecordEnd: () => {
	        window.removeEventListener("transitionrun", record);
	    },
	};
	const getEasingPoints = (easing) => easing
	    .replace("cubic-bezier(", "")
	    .replace(")", "")
	    .split(",")
	    .map(parseFloat);
	const pipeToCamel = (str) => str.replace(/-([a-z])/g, (g) => g[1].toUpperCase());

	const motionOne = {
	    id: "motion-one",
	    onRecordStart: () => {
	        window.__MOTION_DEV_TOOLS_RECORD =
	            store.getState().recordAnimation;
	    },
	    onRecordEnd: () => {
	        window.__MOTION_DEV_TOOLS_RECORD = undefined;
	    },
	};

	const plugins = [cssTransition, cssAnimation, motionOne];
	function handleRecordedAnimations() {
	    let scheduledFlush = undefined;
	    function flushAnimations() {
	        scheduledFlush = undefined;
	        const { recordedAnimations, flushRecordedAnimations } = store.getState();
	        if (!recordedAnimations)
	            return;
	        const message = {
	            type: "animationstart",
	            animations: recordedAnimations,
	        };
	        window.postMessage(message, "*");
	        flushRecordedAnimations();
	    }
	    /**
	     * Handle newly recorded animations
	     */
	    store.subscribe((state) => state.recordedAnimations, (recordedAnimations) => {
	        if (!recordedAnimations)
	            return;
	        if (scheduledFlush === undefined) {
	            scheduledFlush = requestAnimationFrame(flushAnimations);
	        }
	    });
	    store.subscribe(({ isRecording }) => isRecording, (isRecording) => {
	        plugins.forEach((plugin) => {
	            isRecording ? plugin.onRecordStart() : plugin.onRecordEnd();
	        });
	    });
	}

	/**
	 * The MotionValue tracks the state of a single animatable
	 * value. Currently, updatedAt and current are unused. The
	 * long term idea is to use this to minimise the number
	 * of DOM reads, and to abstract the DOM interactions here.
	 */
	class MotionValue {
	    setAnimation(animation) {
	        this.animation = animation;
	        animation === null || animation === void 0 ? void 0 : animation.finished.then(() => this.clearAnimation()).catch(() => { });
	    }
	    clearAnimation() {
	        this.animation = this.generator = undefined;
	    }
	}

	const data = new WeakMap();
	function getAnimationData(element) {
	    if (!data.has(element)) {
	        data.set(element, {
	            transforms: [],
	            values: new Map(),
	        });
	    }
	    return data.get(element);
	}
	function getMotionValue(motionValues, name) {
	    if (!motionValues.has(name)) {
	        motionValues.set(name, new MotionValue());
	    }
	    return motionValues.get(name);
	}

	/**
	 * A list of all transformable axes. We'll use this list to generated a version
	 * of each axes for each transform.
	 */
	const axes = ["", "X", "Y", "Z"];
	/**
	 * An ordered array of each transformable value. By default, transform values
	 * will be sorted to this order.
	 */
	const order = ["translate", "scale", "rotate", "skew"];
	const transformAlias = {
	    x: "translateX",
	    y: "translateY",
	    z: "translateZ",
	};
	const rotation = {
	    syntax: "<angle>",
	    initialValue: "0deg",
	    toDefaultUnit: (v) => v + "deg",
	};
	const baseTransformProperties = {
	    translate: {
	        syntax: "<length-percentage>",
	        initialValue: "0px",
	        toDefaultUnit: (v) => v + "px",
	    },
	    rotate: rotation,
	    scale: {
	        syntax: "<number>",
	        initialValue: 1,
	        toDefaultUnit: noopReturn,
	    },
	    skew: rotation,
	};
	const transformDefinitions = new Map();
	const asTransformCssVar = (name) => `--motion-${name}`;
	/**
	 * Generate a list of every possible transform key
	 */
	const transforms = ["x", "y", "z"];
	order.forEach((name) => {
	    axes.forEach((axis) => {
	        transforms.push(name + axis);
	        transformDefinitions.set(asTransformCssVar(name + axis), baseTransformProperties[name]);
	    });
	});
	/**
	 * A function to use with Array.sort to sort transform keys by their default order.
	 */
	const compareTransformOrder = (a, b) => transforms.indexOf(a) - transforms.indexOf(b);
	/**
	 * Provide a quick way to check if a string is the name of a transform
	 */
	const transformLookup = new Set(transforms);
	const isTransform = (name) => transformLookup.has(name);
	const addTransformToElement = (element, name) => {
	    // Map x to translateX etc
	    if (transformAlias[name])
	        name = transformAlias[name];
	    const { transforms } = getAnimationData(element);
	    addUniqueItem(transforms, name);
	    /**
	     * TODO: An optimisation here could be to cache the transform in element data
	     * and only update if this has changed.
	     */
	    element.style.transform = buildTransformTemplate(transforms);
	};
	const buildTransformTemplate = (transforms) => transforms
	    .sort(compareTransformOrder)
	    .reduce(transformListToString, "")
	    .trim();
	const transformListToString = (template, name) => `${template} ${name}(var(${asTransformCssVar(name)}))`;

	const isCssVar = (name) => name.startsWith("--");
	const registeredProperties = new Set();
	function registerCssVariable(name) {
	    if (registeredProperties.has(name))
	        return;
	    registeredProperties.add(name);
	    try {
	        const { syntax, initialValue } = transformDefinitions.has(name)
	            ? transformDefinitions.get(name)
	            : {};
	        CSS.registerProperty({
	            name,
	            inherits: false,
	            syntax,
	            initialValue,
	        });
	    }
	    catch (e) { }
	}

	/*
	  Bezier function generator

	  This has been modified from Gaëtan Renaudeau's BezierEasing
	  https://github.com/gre/bezier-easing/blob/master/src/index.js
	  https://github.com/gre/bezier-easing/blob/master/LICENSE
	  
	  I've removed the newtonRaphsonIterate algo because in benchmarking it
	  wasn't noticiably faster than binarySubdivision, indeed removing it
	  usually improved times, depending on the curve.

	  I also removed the lookup table, as for the added bundle size and loop we're
	  only cutting ~4 or so subdivision iterations. I bumped the max iterations up
	  to 12 to compensate and this still tended to be faster for no perceivable
	  loss in accuracy.

	  Usage
	    const easeOut = cubicBezier(.17,.67,.83,.67);
	    const x = easeOut(0.5); // returns 0.627...
	*/
	// Returns x(t) given t, x1, and x2, or y(t) given t, y1, and y2.
	const calcBezier = (t, a1, a2) => (((1.0 - 3.0 * a2 + 3.0 * a1) * t + (3.0 * a2 - 6.0 * a1)) * t + 3.0 * a1) * t;
	const subdivisionPrecision = 0.0000001;
	const subdivisionMaxIterations = 12;
	function binarySubdivide(x, lowerBound, upperBound, mX1, mX2) {
	    let currentX;
	    let currentT;
	    let i = 0;
	    do {
	        currentT = lowerBound + (upperBound - lowerBound) / 2.0;
	        currentX = calcBezier(currentT, mX1, mX2) - x;
	        if (currentX > 0.0) {
	            upperBound = currentT;
	        }
	        else {
	            lowerBound = currentT;
	        }
	    } while (Math.abs(currentX) > subdivisionPrecision &&
	        ++i < subdivisionMaxIterations);
	    return currentT;
	}
	function cubicBezier(mX1, mY1, mX2, mY2) {
	    // If this is a linear gradient, return linear easing
	    if (mX1 === mY1 && mX2 === mY2)
	        return noopReturn;
	    const getTForX = (aX) => binarySubdivide(aX, 0, 1, mX1, mX2);
	    // If animation is at start/end, return t without easing
	    return (t) => t === 0 || t === 1 ? t : calcBezier(getTForX(t), mY1, mY2);
	}

	const steps = (steps, direction = "end") => (progress) => {
	    progress =
	        direction === "end"
	            ? Math.min(progress, 0.999)
	            : Math.max(progress, 0.001);
	    const expanded = progress * steps;
	    const rounded = direction === "end" ? Math.floor(expanded) : Math.ceil(expanded);
	    return clamp(0, 1, rounded / steps);
	};

	const namedEasings = {
	    ease: cubicBezier(0.25, 0.1, 0.25, 1.0),
	    "ease-in": cubicBezier(0.42, 0.0, 1.0, 1.0),
	    "ease-in-out": cubicBezier(0.42, 0.0, 0.58, 1.0),
	    "ease-out": cubicBezier(0.0, 0.0, 0.58, 1.0),
	};
	const functionArgsRegex = /\((.*?)\)/;
	function getEasingFunction(definition) {
	    // If already an easing function, return
	    if (typeof definition === "function")
	        return definition;
	    // If an easing curve definition, return bezier function
	    if (Array.isArray(definition))
	        return cubicBezier(...definition);
	    // If we have a predefined easing function, return
	    if (namedEasings[definition])
	        return namedEasings[definition];
	    // If this is a steps function, attempt to create easing curve
	    if (definition.startsWith("steps")) {
	        const args = functionArgsRegex.exec(definition);
	        if (args) {
	            const argsArray = args[1].split(",");
	            return steps(parseFloat(argsArray[0]), argsArray[1].trim());
	        }
	    }
	    return noopReturn;
	}
	function getEasingForSegment(easing, i) {
	    return isEasingList(easing)
	        ? easing[wrap(0, easing.length, i)]
	        : easing;
	}

	const clampProgress = (p) => Math.min(1, Math.max(p, 0));
	function interpolate(output, input = defaultOffset(output.length), easing = noopReturn) {
	    const length = output.length;
	    /**
	     * If the input length is lower than the output we
	     * fill the input to match. This currently assumes the input
	     * is an animation progress value so is a good candidate for
	     * moving outside the function.
	     */
	    const remainder = length - input.length;
	    remainder > 0 && fillOffset(input, remainder);
	    return (t) => {
	        let i = 0;
	        for (; i < length - 2; i++) {
	            if (t < input[i + 1])
	                break;
	        }
	        let progressInRange = clampProgress(progress(input[i], input[i + 1], t));
	        const segmentEasing = getEasingForSegment(easing, i);
	        progressInRange = segmentEasing(progressInRange);
	        return mix(output[i], output[i + 1], progressInRange);
	    };
	}

	class Animation {
	    constructor(output, keyframes = [0, 1], { easing = defaults.easing, duration = defaults.duration, delay = defaults.delay, endDelay = defaults.endDelay, repeat = defaults.repeat, offset, direction = "normal", } = {}) {
	        this.startTime = null;
	        this.rate = 1;
	        this.t = 0;
	        this.cancelTimestamp = null;
	        this.playState = "idle";
	        this.finished = new Promise((resolve, reject) => {
	            this.resolve = resolve;
	            this.reject = reject;
	        });
	        if (isEasingGenerator(easing)) {
	            const custom = easing.createAnimation(keyframes, () => "0", true);
	            easing = custom.easing;
	            if (custom.keyframes !== undefined)
	                keyframes = custom.keyframes;
	            if (custom.duration !== undefined)
	                duration = custom.duration;
	        }
	        const totalDuration = duration * (repeat + 1);
	        const interpolate$1 = interpolate(keyframes, offset, isEasingList(easing)
	            ? easing.map(getEasingFunction)
	            : getEasingFunction(easing));
	        this.tick = (timestamp) => {
	            var _a;
	            if (this.pauseTime)
	                timestamp = this.pauseTime;
	            let t = (timestamp - this.startTime) * this.rate;
	            this.t = t;
	            // Convert to seconds
	            t /= 1000;
	            // Rebase on delay
	            t = Math.max(t - delay, 0);
	            /**
	             * If this animation has finished, set the current time
	             * to the total duration.
	             */
	            if (this.playState === "finished")
	                t = totalDuration;
	            /**
	             * Get the current progress (0-1) of the animation. If t is >
	             * than duration we'll get values like 2.5 (midway through the
	             * third iteration)
	             */
	            const progress = t / duration;
	            // TODO progress += iterationStart
	            /**
	             * Get the current iteration (0 indexed). For instance the floor of
	             * 2.5 is 2.
	             */
	            let currentIteration = Math.floor(progress);
	            /**
	             * Get the current progress of the iteration by taking the remainder
	             * so 2.5 is 0.5 through iteration 2
	             */
	            let iterationProgress = progress % 1.0;
	            if (!iterationProgress && progress >= 1) {
	                iterationProgress = 1;
	            }
	            /**
	             * If iteration progress is 1 we count that as the end
	             * of the previous iteration.
	             */
	            iterationProgress === 1 && currentIteration--;
	            /**
	             * Reverse progress if we're not running in "normal" direction
	             */
	            const iterationIsOdd = currentIteration % 2;
	            if (direction === "reverse" ||
	                (direction === "alternate" && iterationIsOdd) ||
	                (direction === "alternate-reverse" && !iterationIsOdd)) {
	                iterationProgress = 1 - iterationProgress;
	            }
	            const latest = interpolate$1(t >= totalDuration ? 1 : Math.min(iterationProgress, 1));
	            output(latest);
	            const isAnimationFinished = this.playState === "finished" || t >= totalDuration + endDelay;
	            if (isAnimationFinished) {
	                this.playState = "finished";
	                (_a = this.resolve) === null || _a === void 0 ? void 0 : _a.call(this, latest);
	            }
	            else if (this.playState !== "idle") {
	                this.frameRequestId = requestAnimationFrame(this.tick);
	            }
	        };
	        this.play();
	    }
	    play() {
	        var _a;
	        const now = performance.now();
	        this.playState = "running";
	        if (this.pauseTime) {
	            this.startTime = now - (this.pauseTime - ((_a = this.startTime) !== null && _a !== void 0 ? _a : 0));
	        }
	        else if (!this.startTime) {
	            this.startTime = now;
	        }
	        this.cancelTimestamp = this.startTime;
	        this.pauseTime = undefined;
	        requestAnimationFrame(this.tick);
	    }
	    pause() {
	        this.playState = "paused";
	        this.pauseTime = performance.now();
	    }
	    finish() {
	        this.playState = "finished";
	        this.tick(0);
	    }
	    stop() {
	        var _a;
	        this.playState = "idle";
	        if (this.frameRequestId !== undefined) {
	            cancelAnimationFrame(this.frameRequestId);
	        }
	        (_a = this.reject) === null || _a === void 0 ? void 0 : _a.call(this, false);
	    }
	    cancel() {
	        this.stop();
	        this.tick(this.cancelTimestamp);
	    }
	    reverse() {
	        this.rate *= -1;
	    }
	    commitStyles() { }
	    get currentTime() {
	        return this.t;
	    }
	    set currentTime(t) {
	        if (this.pauseTime || this.rate === 0) {
	            this.pauseTime = t;
	        }
	        else {
	            this.startTime = performance.now() - t / this.rate;
	        }
	    }
	    get playbackRate() {
	        return this.rate;
	    }
	    set playbackRate(rate) {
	        this.rate = rate;
	    }
	}

	const convertEasing = (easing) => isCubicBezier(easing) ? cubicBezierAsString(easing) : easing;
	const cubicBezierAsString = ([a, b, c, d]) => `cubic-bezier(${a}, ${b}, ${c}, ${d})`;

	const testAnimation = (keyframes) => document.createElement("div").animate(keyframes, { duration: 0.001 });
	const featureTests = {
	    cssRegisterProperty: () => typeof CSS !== "undefined" &&
	        Object.hasOwnProperty.call(CSS, "registerProperty"),
	    waapi: () => Object.hasOwnProperty.call(Element.prototype, "animate"),
	    partialKeyframes: () => {
	        try {
	            testAnimation({ opacity: [1] });
	        }
	        catch (e) {
	            return false;
	        }
	        return true;
	    },
	    finished: () => Boolean(testAnimation({ opacity: [0, 1] }).finished),
	};
	const results = {};
	const supports = {};
	for (const key in featureTests) {
	    supports[key] = () => {
	        if (results[key] === undefined)
	            results[key] = featureTests[key]();
	        return results[key];
	    };
	}

	function hydrateKeyframes(keyframes, readInitialValue) {
	    for (let i = 0; i < keyframes.length; i++) {
	        if (keyframes[i] === null) {
	            keyframes[i] = i ? keyframes[i - 1] : readInitialValue();
	        }
	    }
	    return keyframes;
	}
	const keyframesList = (keyframes) => Array.isArray(keyframes) ? keyframes : [keyframes];

	function getStyleName(key) {
	    if (transformAlias[key])
	        key = transformAlias[key];
	    return isTransform(key) ? asTransformCssVar(key) : key;
	}

	const style = {
	    get: (element, name) => {
	        name = getStyleName(name);
	        let value = isCssVar(name)
	            ? element.style.getPropertyValue(name)
	            : getComputedStyle(element)[name];
	        if (!value && value !== 0) {
	            const definition = transformDefinitions.get(name);
	            if (definition)
	                value = definition.initialValue;
	        }
	        return value;
	    },
	    set: (element, name, value) => {
	        name = getStyleName(name);
	        if (isCssVar(name)) {
	            element.style.setProperty(name, value);
	        }
	        else {
	            element.style[name] = value;
	        }
	    },
	};

	function stopAnimation(animation, needsCommit = true) {
	    if (!animation || animation.playState === "finished")
	        return;
	    // Suppress error thrown by WAAPI
	    try {
	        if (animation.stop) {
	            animation.stop();
	        }
	        else {
	            needsCommit && animation.commitStyles();
	            animation.cancel();
	        }
	    }
	    catch (e) { }
	}

	function getDevToolsRecord() {
	    return window.__MOTION_DEV_TOOLS_RECORD;
	}
	function animateStyle(element, key, keyframesDefinition, options = {}) {
	    const record = getDevToolsRecord();
	    const isRecording = options.record !== false && record;
	    let animation;
	    let { duration = defaults.duration, delay = defaults.delay, endDelay = defaults.endDelay, repeat = defaults.repeat, easing = defaults.easing, direction, offset, allowWebkitAcceleration = false, } = options;
	    const data = getAnimationData(element);
	    let canAnimateNatively = supports.waapi();
	    const valueIsTransform = isTransform(key);
	    /**
	     * If this is an individual transform, we need to map its
	     * key to a CSS variable and update the element's transform style
	     */
	    valueIsTransform && addTransformToElement(element, key);
	    const name = getStyleName(key);
	    const motionValue = getMotionValue(data.values, name);
	    /**
	     * Get definition of value, this will be used to convert numerical
	     * keyframes into the default value type.
	     */
	    const definition = transformDefinitions.get(name);
	    /**
	     * Stop the current animation, if any. Because this will trigger
	     * commitStyles (DOM writes) and we might later trigger DOM reads,
	     * this is fired now and we return a factory function to create
	     * the actual animation that can get called in batch,
	     */
	    stopAnimation(motionValue.animation, !(isEasingGenerator(easing) && motionValue.generator) &&
	        options.record !== false);
	    /**
	     * Batchable factory function containing all DOM reads.
	     */
	    return () => {
	        const readInitialValue = () => { var _a, _b; return (_b = (_a = style.get(element, name)) !== null && _a !== void 0 ? _a : definition === null || definition === void 0 ? void 0 : definition.initialValue) !== null && _b !== void 0 ? _b : 0; };
	        /**
	         * Replace null values with the previous keyframe value, or read
	         * it from the DOM if it's the first keyframe.
	         */
	        let keyframes = hydrateKeyframes(keyframesList(keyframesDefinition), readInitialValue);
	        if (isEasingGenerator(easing)) {
	            const custom = easing.createAnimation(keyframes, readInitialValue, valueIsTransform, name, motionValue);
	            easing = custom.easing;
	            if (custom.keyframes !== undefined)
	                keyframes = custom.keyframes;
	            if (custom.duration !== undefined)
	                duration = custom.duration;
	        }
	        /**
	         * If this is a CSS variable we need to register it with the browser
	         * before it can be animated natively. We also set it with setProperty
	         * rather than directly onto the element.style object.
	         */
	        if (isCssVar(name)) {
	            if (supports.cssRegisterProperty()) {
	                registerCssVariable(name);
	            }
	            else {
	                canAnimateNatively = false;
	            }
	        }
	        /**
	         * If we can animate this value with WAAPI, do so. Currently this only
	         * feature detects CSS.registerProperty but could check WAAPI too.
	         */
	        if (canAnimateNatively) {
	            /**
	             * Convert numbers to default value types. Currently this only supports
	             * transforms but it could also support other value types.
	             */
	            if (definition) {
	                keyframes = keyframes.map((value) => isNumber(value) ? definition.toDefaultUnit(value) : value);
	            }
	            /**
	             * If this browser doesn't support partial/implicit keyframes we need to
	             * explicitly provide one.
	             */
	            const needsToReadInitialKeyframe = !supports.partialKeyframes() && keyframes.length === 1;
	            if (isRecording || needsToReadInitialKeyframe) {
	                keyframes.unshift(readInitialValue());
	            }
	            const animationOptions = {
	                delay: time.ms(delay),
	                duration: time.ms(duration),
	                endDelay: time.ms(endDelay),
	                easing: !isEasingList(easing) ? convertEasing(easing) : undefined,
	                direction,
	                iterations: repeat + 1,
	                fill: "both",
	            };
	            animation = element.animate({
	                [name]: keyframes,
	                offset,
	                easing: isEasingList(easing) ? easing.map(convertEasing) : undefined,
	            }, animationOptions);
	            /**
	             * Polyfill finished Promise in browsers that don't support it
	             */
	            if (!animation.finished) {
	                animation.finished = new Promise((resolve, reject) => {
	                    animation.onfinish = resolve;
	                    animation.oncancel = reject;
	                });
	            }
	            const target = keyframes[keyframes.length - 1];
	            animation.finished
	                .then(() => {
	                // Apply styles to target
	                style.set(element, name, target);
	                // Ensure fill modes don't persist
	                animation.cancel();
	            })
	                .catch(noop);
	            /**
	             * This forces Webkit to run animations on the main thread by exploiting
	             * this condition:
	             * https://trac.webkit.org/browser/webkit/trunk/Source/WebCore/platform/graphics/ca/GraphicsLayerCA.cpp?rev=281238#L1099
	             *
	             * This fixes Webkit's timing bugs, like accelerated animations falling
	             * out of sync with main thread animations and massive delays in starting
	             * accelerated animations in WKWebView.
	             */
	            if (!allowWebkitAcceleration)
	                animation.playbackRate = 1.000001;
	            /**
	             * If we can't animate the value natively then we can fallback to the numbers-only
	             * polyfill for transforms. All keyframes must be numerical.
	             */
	        }
	        else if (valueIsTransform && keyframes.every(isNumber)) {
	            /**
	             * If we only have a single keyframe, we need to create an initial keyframe by reading
	             * the current value from the DOM.
	             */
	            if (keyframes.length === 1) {
	                keyframes.unshift(parseFloat(readInitialValue()));
	            }
	            const render = (latest) => {
	                if (definition)
	                    latest = definition.toDefaultUnit(latest);
	                style.set(element, name, latest);
	            };
	            animation = new Animation(render, keyframes, Object.assign(Object.assign({}, options), { duration,
	                easing }));
	        }
	        else {
	            const target = keyframes[keyframes.length - 1];
	            style.set(element, name, definition && isNumber(target)
	                ? definition.toDefaultUnit(target)
	                : target);
	        }
	        if (isRecording) {
	            record(element, key, keyframes, {
	                duration,
	                delay,
	                easing,
	                repeat,
	                offset,
	            }, "motion-one");
	        }
	        motionValue.setAnimation(animation);
	        return animation;
	    };
	}

	function handleInspectedAnimation() {
	    const animations = [];
	    function scrubTo(time) {
	        for (const animation of animations) {
	            animation.currentTime = time * 1000;
	        }
	    }
	    function createAnimations(animation) {
	        cancelAllAnimations();
	        for (const elementId in animation.elements) {
	            const element = document.querySelector(`[data-motion-id="${elementId}"]`);
	            if (!element)
	                continue;
	            for (const valueAnimation of animation.elements[elementId]) {
	                const { valueName, keyframes, options } = valueAnimation;
	                const newAnimation = animateStyle(element, valueName, keyframes, Object.assign(Object.assign({}, options), { repeat: options.repeat === "Infinity" ? Infinity : options.repeat, record: false }))();
	                newAnimation === null || newAnimation === void 0 ? void 0 : newAnimation.pause();
	                newAnimation && animations.push(newAnimation);
	            }
	        }
	        scrubTo(animation.currentTime);
	    }
	    function cancelAllAnimations() {
	        for (const animation of animations)
	            animation.cancel();
	        animations.length = 0;
	    }
	    store.subscribe((state) => state.inspectedAnimation, (inspectedAnimation, prevInspectedAnimation) => {
	        cancelAllAnimations();
	        if (prevInspectedAnimation && inspectedAnimation) {
	            createAnimations(inspectedAnimation);
	        }
	    });
	    store.subscribe((state) => { var _a; return (_a = state.inspectedAnimation) === null || _a === void 0 ? void 0 : _a.currentTime; }, (currentTime) => {
	        if (currentTime === undefined)
	            return;
	        scrubTo(currentTime);
	    });
	    store.subscribe((state) => state.isRecording, (isRecording) => {
	        isRecording && cancelAllAnimations();
	    });
	}

	function createDevToolsClient() {
	    handleRecordedAnimations();
	    handleInspectedAnimation();
	    handleMessages();
	    window.postMessage({ type: "clientready" }, "*");
	}

	if (!window.__MOTION_DEV_TOOLS) {
	    window.__MOTION_DEV_TOOLS = true;
	    createDevToolsClient();
	}

})();
