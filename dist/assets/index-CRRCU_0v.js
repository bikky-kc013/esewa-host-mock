var e=Object.create,t=Object.defineProperty,n=Object.getOwnPropertyDescriptor,r=Object.getOwnPropertyNames,i=Object.getPrototypeOf,a=Object.prototype.hasOwnProperty,o=(e,t)=>()=>(t||(e((t={exports:{}}).exports,t),e=null),t.exports),s=(e,i,o,s)=>{if(i&&typeof i==`object`||typeof i==`function`)for(var c=r(i),l=0,u=c.length,d;l<u;l++)d=c[l],!a.call(e,d)&&d!==o&&t(e,d,{get:(e=>i[e]).bind(null,d),enumerable:!(s=n(i,d))||s.enumerable});return e},c=(n,r,o)=>(o=n==null?{}:e(i(n)),s(r||!n||!n.__esModule||!a.call(n,`default`)?t(o,`default`,{value:n,enumerable:!0}):o,n));(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),t.credentials=e.crossOrigin===`use-credentials`?`include`:e.crossOrigin===`anonymous`?`omit`:`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var l=typeof window<`u`&&window.matchMedia?window.matchMedia.bind(window):null;if(typeof window<`u`){let e=l;window.matchMedia=(t=>t.includes(`prefers-color-scheme: dark`)?{matches:!1,media:t,onchange:null,addListener:()=>{},removeListener:()=>{},addEventListener:()=>{},removeEventListener:()=>{},dispatchEvent:()=>!0}:e?e(t):{matches:!1,media:t,onchange:null,addListener:()=>{},removeListener:()=>{},addEventListener:()=>{},removeEventListener:()=>{},dispatchEvent:()=>!0})}var u={INIT_APP:`INIT_APP`,REQUEST_PAYMENT:`REQUEST_PAYMENT`,USER_DETAIL_ACCESS:`USER_DETAIL_ACCESS`,MEDIA_ACCESS:`MEDIA_ACCESS`,LOCATION_ACCESS:`LOCATION_ACCESS`,VALIDATE_TRANSACTION:`VALIDATE_TRANSACTION`,CLOSE_APP:`CLOSE_APP`,FILE_DOWNLOAD_ACCESS:`FILE_DOWNLOAD_ACCESS`,GET_PRODUCT:`GET_PRODUCT`,VALIDATE_USER:`VALIDATE_USER`,MERCHANT_DETAIL:`MERCHANT_DETAIL`,QR_SCANNER_ACCESS:`QR_SCANNER_ACCESS`,PAYMENT_REQUEST:`PAYMENT_REQUEST`,CONNECTION_REQUEST:`CONNECTION_REQUEST`,CREDIT_ADDITION:`CREDIT_ADDITION`,PAYMENT_SETTLEMENT:`PAYMENT_SETTLEMENT`,DUE_DATE_REMINDER:`DUE_DATE_REMINDER`},d=100,f=[],p=[],m={token:null,user:{esewa_id:`9841000001`,name:`Ram Bahadur Thapa`,mobile:`9841000001`,email:`ram.thapa@esewa.mock`},product:{id:`3299`,name:`Vianet Internet`,product_code:`NP-ES-VIANET`,price:1200,currency:`NPR`},merchant:{merchant_code:`NP-ES-MOCK-MERCHANT`,merchant_name:`Mock Merchant Pvt. Ltd.`,address:`Kathmandu, Nepal`,contact:`9800000000`,email:`merchant@mock.com.np`}},h=new Set,g=new Set;function _(){h.forEach(e=>e()),g.forEach(e=>e()),typeof window<`u`&&(window.dispatchEvent(new CustomEvent(`esewaHostLogUpdate`)),window.dispatchEvent(new CustomEvent(`esewaHostPendingUpdate`)),window.dispatchEvent(new CustomEvent(`esewaHostSessionUpdate`)))}function v(){return Math.random().toString(36).slice(2,8)+`-`+Date.now().toString(36).slice(-4)}function y(e,t){let n;try{n=typeof e==`string`?JSON.parse(e):e}catch{n={raw:e,parseError:!0}}let r=n.requestType||n.request_type||`UNKNOWN`,i=n.callbackKey,a={id:v(),timestamp:new Date().toISOString(),platform:t,raw:typeof e==`string`?e:JSON.stringify(e),data:n,requestType:r,callbackKey:i,hasCallback:!!i,responded:!1};if(r===u.INIT_APP)try{let e=typeof window<`u`?localStorage.getItem(`esewa_dev_registered_miniapps`):null;if(e){let t=JSON.parse(e),r=n.merchant_identifier||n.merchantIdentifier;Array.isArray(t)&&t.find(e=>e.merchant_identifier===r&&e.status===`live`)||(a.suggestedResponseType=`error`,a.suggestedResponse={message:`Unknown or non-live merchant_identifier`})}else(n.merchant_identifier||n.merchantIdentifier)&&(a.suggestedResponseType=`error`,a.suggestedResponse={message:`Unknown or non-live merchant_identifier`})}catch{}f.unshift(a),f.length>d&&f.pop(),a.hasCallback&&(p.unshift(a),p.length>d&&p.pop()),console.info(`[eSewa Host] -> ${r} via ${t}`,n),_()}function b(e,t,n){let r=p.findIndex(t=>t.id===e);if(r===-1)return!1;let i=p[r],a=i.callbackKey,o=window,s={requestType:i.requestType,responseType:t,response:n};i.responded=!0,i.response=s;let c=f.find(t=>t.id===e);if(c&&(c.responded=!0,c.response=s),p.splice(r,1),i.requestType===u.INIT_APP&&t===`success`&&n?.token){m.token=n.token;try{sessionStorage.setItem(`token`,n.token),sessionStorage.setItem(`miniAppAuthToken`,n.token),n.scope&&sessionStorage.setItem(`miniAppAuthScope`,JSON.stringify(n.scope))}catch{}}i.requestType===u.USER_DETAIL_ACCESS&&t===`success`&&(m.user=n),i.requestType===u.GET_PRODUCT&&t===`success`&&(m.product=n),i.requestType===u.MERCHANT_DETAIL&&t===`success`&&(m.merchant=n);let l=o.Android&&o.Android[a]||o.iOSNative&&o.iOSNative[a]||o.flutter_inappwebview&&o.flutter_inappwebview[a];if(l||(i.platform===`android`?l=o.Android?.[a]:i.platform===`ios`?l=o.webkit?.messageHandlers?.iOSNative?.[a]||o.iOSNative?.[a]:i.platform===`flutter`&&(l=o.flutter_inappwebview?.[a])),!l&&o[a]&&(l=o[a]),typeof l==`function`)try{l(s),console.info(`[eSewa Host] <- ${i.requestType} ${t}`,s)}catch(e){console.error(`[eSewa Host] callback ${a} threw`,e)}else console.warn(`[eSewa Host] No callback found for ${a} (${i.requestType}). Envelope:`,s);return _(),!0}function x(){return[...f]}function S(){return[...p]}function C(){f=[],p=[],_()}function w(){return{...m}}function ee(e){if(Object.assign(m,e),e.token!==void 0)try{e.token?(sessionStorage.setItem(`token`,e.token),sessionStorage.setItem(`miniAppAuthToken`,e.token)):(sessionStorage.removeItem(`token`),sessionStorage.removeItem(`miniAppAuthToken`))}catch{}_()}var te={[u.INIT_APP]:{token:`mock_token_`+Math.random().toString(36).slice(2,10),scope:Object.values(u)},[u.USER_DETAIL_ACCESS]:{esewa_id:`9841000001`,name:`Ram Bahadur Thapa`,mobile:`9841000001`,email:`ram.thapa@esewa.mock`},[u.LOCATION_ACCESS]:{latitude:27.7172,longitude:85.324,accuracy:12.5,address:`Kathmandu, Nepal`},[u.MEDIA_ACCESS]:{media:`data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+ip1sAAAAASUVORK5CYII=`},[u.VALIDATE_TRANSACTION]:{status:`COMPLETE`,transaction_uuid:`mock-txn-`+Date.now(),refId:`MOCK123456`,amount:1250.5},[u.REQUEST_PAYMENT]:{status:`COMPLETE`,refId:`PAY123456`,transaction_uuid:`txn-`+Date.now(),amount:28.48},[u.CLOSE_APP]:{message:`App would close here`},[u.GET_PRODUCT]:{products:[{id:`3299`,name:`Vianet Internet`,product_code:`NP-ES-VIANET`,price:1200,currency:`NPR`}],total:1},[u.VALIDATE_USER]:{valid:!0,esewa_id:`9847474747`,name:`Ram Thapa`,status:`ACTIVE`},[u.MERCHANT_DETAIL]:{merchant_code:`NP-ES-MOCK-MERCHANT`,merchant_name:`Mock Merchant Pvt. Ltd.`,address:`Kathmandu, Nepal`,contact:`9800000000`,email:`merchant@mock.com.np`,status:`ACTIVE`},[u.QR_SCANNER_ACCESS]:{qr_data:`https://esewa.com.np/qr/MOCK123`,scanned_text:`esewa://pay?amt=500`,format:`QR_CODE`},[u.FILE_DOWNLOAD_ACCESS]:{message:`Download simulated`,fileName:`Statement-2025.pdf`,type:`url`,content:`https://example.com/sample.pdf`},[u.PAYMENT_REQUEST]:{status:`PENDING`,amount:100},[u.CONNECTION_REQUEST]:{status:`CONNECTED`},[u.CREDIT_ADDITION]:{status:`SUCCESS`,amount:500},[u.PAYMENT_SETTLEMENT]:{status:`SETTLED`},[u.DUE_DATE_REMINDER]:{due_date:`2026-09-01`,amount:200}},ne=!1;function re(){if(typeof window>`u`)return!1;let e=window;if(ne||e.__ESEWA_HOST_BRIDGE_INSTALLED__)return console.info(`[eSewa Host] Bridge already installed`),!0;let t=e.Android?.requestApp,n=e.webkit?.messageHandlers?.iOSNative?.postMessage,r=e.flutter_inappwebview?.callHandler;e.Android=e.Android||{},e.Android.requestApp=n=>{if(y(n,`android`),typeof t==`function`)try{t.call(e.Android,n)}catch{}},e.webkit=e.webkit||{},e.webkit.messageHandlers=e.webkit.messageHandlers||{},e.webkit.messageHandlers.iOSNative=e.webkit.messageHandlers.iOSNative||{};let i=e.webkit.messageHandlers.iOSNative,a=i.postMessage;i.postMessage=e=>{if(y(typeof e==`string`?e:JSON.stringify(e),`ios`),typeof n==`function`&&n!==i.postMessage)try{n.call(i,e)}catch{}else if(typeof a==`function`&&a!==i.postMessage)try{a.call(i,e)}catch{}},e.iOSNative=e.iOSNative||{},e.flutter_inappwebview=e.flutter_inappwebview||{};let o=e.flutter_inappwebview.callHandler;e.flutter_inappwebview.callHandler=(t,n)=>{if(t===`eSewaHandler`&&y(typeof n==`string`?n:JSON.stringify(n),`flutter`),typeof r==`function`&&r!==e.flutter_inappwebview.callHandler)try{r.call(e.flutter_inappwebview,t,n)}catch{}else if(typeof o==`function`&&o!==e.flutter_inappwebview.callHandler)try{o.call(e.flutter_inappwebview,t,n)}catch{}},typeof e.requestFromMiniApp!=`function`&&(e.requestFromMiniApp=(e,t)=>{y(JSON.stringify(e),s())});function s(){let e=typeof navigator<`u`?navigator.userAgent:``;return/Flutter/i.test(e)||/wv/i.test(e)?`flutter`:/iPhone|iPad|iPod/i.test(e)?`ios`:`android`}return e.__ESEWA_HOST_BRIDGE_INSTALLED__=!0,ne=!0,console.info(`[eSewa Host] Bridge installed — waiting for Mini App requests`),e.__ESEWA_HOST__={getBridgeRequests:x,getPendingRequests:S,getSessionState:w,setSessionState:ee,fireResponse:b,clearBridgeLog:C,REQUEST_TYPE_ENUM:u,_onOutgoing:y},!0}var ie=o((e=>{var t=Symbol.for(`react.transitional.element`),n=Symbol.for(`react.fragment`);function r(e,n,r){var i=null;if(r!==void 0&&(i=``+r),n.key!==void 0&&(i=``+n.key),`key`in n)for(var a in r={},n)a!==`key`&&(r[a]=n[a]);else r=n;return n=r.ref,{$$typeof:t,type:e,key:i,ref:n===void 0?null:n,props:r}}e.Fragment=n,e.jsx=r,e.jsxs=r})),ae=o(((e,t)=>{t.exports=ie()})),oe=o((e=>{var t=Symbol.for(`react.transitional.element`),n=Symbol.for(`react.portal`),r=Symbol.for(`react.fragment`),i=Symbol.for(`react.strict_mode`),a=Symbol.for(`react.profiler`),o=Symbol.for(`react.consumer`),s=Symbol.for(`react.context`),c=Symbol.for(`react.forward_ref`),l=Symbol.for(`react.suspense`),u=Symbol.for(`react.memo`),d=Symbol.for(`react.lazy`),f=Symbol.for(`react.activity`),p=Symbol.iterator;function m(e){return typeof e!=`object`||!e?null:(e=p&&e[p]||e[`@@iterator`],typeof e==`function`?e:null)}var h={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},g=Object.assign,_={};function v(e,t,n){this.props=e,this.context=t,this.refs=_,this.updater=n||h}v.prototype.isReactComponent={},v.prototype.setState=function(e,t){if(typeof e!=`object`&&typeof e!=`function`&&e!=null)throw Error(`takes an object of state variables to update or a function which returns an object of state variables.`);this.updater.enqueueSetState(this,e,t,`setState`)},v.prototype.forceUpdate=function(e){this.updater.enqueueForceUpdate(this,e,`forceUpdate`)};function y(){}y.prototype=v.prototype;function b(e,t,n){this.props=e,this.context=t,this.refs=_,this.updater=n||h}var x=b.prototype=new y;x.constructor=b,g(x,v.prototype),x.isPureReactComponent=!0;var S=Array.isArray;function C(){}var w={H:null,A:null,T:null,S:null},ee=Object.prototype.hasOwnProperty;function te(e,n,r){var i=r.ref;return{$$typeof:t,type:e,key:n,ref:i===void 0?null:i,props:r}}function ne(e,t){return te(e.type,t,e.props)}function re(e){return typeof e==`object`&&!!e&&e.$$typeof===t}function ie(e){var t={"=":`=0`,":":`=2`};return`$`+e.replace(/[=:]/g,function(e){return t[e]})}var ae=/\/+/g;function oe(e,t){return typeof e==`object`&&e&&e.key!=null?ie(``+e.key):t.toString(36)}function se(e){switch(e.status){case`fulfilled`:return e.value;case`rejected`:throw e.reason;default:switch(typeof e.status==`string`?e.then(C,C):(e.status=`pending`,e.then(function(t){e.status===`pending`&&(e.status=`fulfilled`,e.value=t)},function(t){e.status===`pending`&&(e.status=`rejected`,e.reason=t)})),e.status){case`fulfilled`:return e.value;case`rejected`:throw e.reason}}throw e}function T(e,r,i,a,o){var s=typeof e;(s===`undefined`||s===`boolean`)&&(e=null);var c=!1;if(e===null)c=!0;else switch(s){case`bigint`:case`string`:case`number`:c=!0;break;case`object`:switch(e.$$typeof){case t:case n:c=!0;break;case d:return c=e._init,T(c(e._payload),r,i,a,o)}}if(c)return o=o(e),c=a===``?`.`+oe(e,0):a,S(o)?(i=``,c!=null&&(i=c.replace(ae,`$&/`)+`/`),T(o,r,i,``,function(e){return e})):o!=null&&(re(o)&&(o=ne(o,i+(o.key==null||e&&e.key===o.key?``:(``+o.key).replace(ae,`$&/`)+`/`)+c)),r.push(o)),1;c=0;var l=a===``?`.`:a+`:`;if(S(e))for(var u=0;u<e.length;u++)a=e[u],s=l+oe(a,u),c+=T(a,r,i,s,o);else if(u=m(e),typeof u==`function`)for(e=u.call(e),u=0;!(a=e.next()).done;)a=a.value,s=l+oe(a,u++),c+=T(a,r,i,s,o);else if(s===`object`){if(typeof e.then==`function`)return T(se(e),r,i,a,o);throw r=String(e),Error(`Objects are not valid as a React child (found: `+(r===`[object Object]`?`object with keys {`+Object.keys(e).join(`, `)+`}`:r)+`). If you meant to render a collection of children, use an array instead.`)}return c}function ce(e,t,n){if(e==null)return e;var r=[],i=0;return T(e,r,``,``,function(e){return t.call(n,e,i++)}),r}function E(e){if(e._status===-1){var t=e._result;t=t(),t.then(function(t){(e._status===0||e._status===-1)&&(e._status=1,e._result=t)},function(t){(e._status===0||e._status===-1)&&(e._status=2,e._result=t)}),e._status===-1&&(e._status=0,e._result=t)}if(e._status===1)return e._result.default;throw e._result}var le=typeof reportError==`function`?reportError:function(e){if(typeof window==`object`&&typeof window.ErrorEvent==`function`){var t=new window.ErrorEvent(`error`,{bubbles:!0,cancelable:!0,message:typeof e==`object`&&e&&typeof e.message==`string`?String(e.message):String(e),error:e});if(!window.dispatchEvent(t))return}else if(typeof process==`object`&&typeof process.emit==`function`){process.emit(`uncaughtException`,e);return}console.error(e)},D={map:ce,forEach:function(e,t,n){ce(e,function(){t.apply(this,arguments)},n)},count:function(e){var t=0;return ce(e,function(){t++}),t},toArray:function(e){return ce(e,function(e){return e})||[]},only:function(e){if(!re(e))throw Error(`React.Children.only expected to receive a single React element child.`);return e}};e.Activity=f,e.Children=D,e.Component=v,e.Fragment=r,e.Profiler=a,e.PureComponent=b,e.StrictMode=i,e.Suspense=l,e.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE=w,e.__COMPILER_RUNTIME={__proto__:null,c:function(e){return w.H.useMemoCache(e)}},e.cache=function(e){return function(){return e.apply(null,arguments)}},e.cacheSignal=function(){return null},e.cloneElement=function(e,t,n){if(e==null)throw Error(`The argument must be a React element, but you passed `+e+`.`);var r=g({},e.props),i=e.key;if(t!=null)for(a in t.key!==void 0&&(i=``+t.key),t)!ee.call(t,a)||a===`key`||a===`__self`||a===`__source`||a===`ref`&&t.ref===void 0||(r[a]=t[a]);var a=arguments.length-2;if(a===1)r.children=n;else if(1<a){for(var o=Array(a),s=0;s<a;s++)o[s]=arguments[s+2];r.children=o}return te(e.type,i,r)},e.createContext=function(e){return e={$$typeof:s,_currentValue:e,_currentValue2:e,_threadCount:0,Provider:null,Consumer:null},e.Provider=e,e.Consumer={$$typeof:o,_context:e},e},e.createElement=function(e,t,n){var r,i={},a=null;if(t!=null)for(r in t.key!==void 0&&(a=``+t.key),t)ee.call(t,r)&&r!==`key`&&r!==`__self`&&r!==`__source`&&(i[r]=t[r]);var o=arguments.length-2;if(o===1)i.children=n;else if(1<o){for(var s=Array(o),c=0;c<o;c++)s[c]=arguments[c+2];i.children=s}if(e&&e.defaultProps)for(r in o=e.defaultProps,o)i[r]===void 0&&(i[r]=o[r]);return te(e,a,i)},e.createRef=function(){return{current:null}},e.forwardRef=function(e){return{$$typeof:c,render:e}},e.isValidElement=re,e.lazy=function(e){return{$$typeof:d,_payload:{_status:-1,_result:e},_init:E}},e.memo=function(e,t){return{$$typeof:u,type:e,compare:t===void 0?null:t}},e.startTransition=function(e){var t=w.T,n={};w.T=n;try{var r=e(),i=w.S;i!==null&&i(n,r),typeof r==`object`&&r&&typeof r.then==`function`&&r.then(C,le)}catch(e){le(e)}finally{t!==null&&n.types!==null&&(t.types=n.types),w.T=t}},e.unstable_useCacheRefresh=function(){return w.H.useCacheRefresh()},e.use=function(e){return w.H.use(e)},e.useActionState=function(e,t,n){return w.H.useActionState(e,t,n)},e.useCallback=function(e,t){return w.H.useCallback(e,t)},e.useContext=function(e){return w.H.useContext(e)},e.useDebugValue=function(){},e.useDeferredValue=function(e,t){return w.H.useDeferredValue(e,t)},e.useEffect=function(e,t){return w.H.useEffect(e,t)},e.useEffectEvent=function(e){return w.H.useEffectEvent(e)},e.useId=function(){return w.H.useId()},e.useImperativeHandle=function(e,t,n){return w.H.useImperativeHandle(e,t,n)},e.useInsertionEffect=function(e,t){return w.H.useInsertionEffect(e,t)},e.useLayoutEffect=function(e,t){return w.H.useLayoutEffect(e,t)},e.useMemo=function(e,t){return w.H.useMemo(e,t)},e.useOptimistic=function(e,t){return w.H.useOptimistic(e,t)},e.useReducer=function(e,t,n){return w.H.useReducer(e,t,n)},e.useRef=function(e){return w.H.useRef(e)},e.useState=function(e){return w.H.useState(e)},e.useSyncExternalStore=function(e,t,n){return w.H.useSyncExternalStore(e,t,n)},e.useTransition=function(){return w.H.useTransition()},e.version=`19.2.8`})),se=o(((e,t)=>{t.exports=oe()})),T=o((e=>{function t(e,t){var n=e.length;e.push(t);a:for(;0<n;){var r=n-1>>>1,a=e[r];if(0<i(a,t))e[r]=t,e[n]=a,n=r;else break a}}function n(e){return e.length===0?null:e[0]}function r(e){if(e.length===0)return null;var t=e[0],n=e.pop();if(n!==t){e[0]=n;a:for(var r=0,a=e.length,o=a>>>1;r<o;){var s=2*(r+1)-1,c=e[s],l=s+1,u=e[l];if(0>i(c,n))l<a&&0>i(u,c)?(e[r]=u,e[l]=n,r=l):(e[r]=c,e[s]=n,r=s);else if(l<a&&0>i(u,n))e[r]=u,e[l]=n,r=l;else break a}}return t}function i(e,t){var n=e.sortIndex-t.sortIndex;return n===0?e.id-t.id:n}if(e.unstable_now=void 0,typeof performance==`object`&&typeof performance.now==`function`){var a=performance;e.unstable_now=function(){return a.now()}}else{var o=Date,s=o.now();e.unstable_now=function(){return o.now()-s}}var c=[],l=[],u=1,d=null,f=3,p=!1,m=!1,h=!1,g=!1,_=typeof setTimeout==`function`?setTimeout:null,v=typeof clearTimeout==`function`?clearTimeout:null,y=typeof setImmediate<`u`?setImmediate:null;function b(e){for(var i=n(l);i!==null;){if(i.callback===null)r(l);else if(i.startTime<=e)r(l),i.sortIndex=i.expirationTime,t(c,i);else break;i=n(l)}}function x(e){if(h=!1,b(e),!m){if(n(c)!==null)m=!0,S||(S=!0,re());else{var t=n(l);t!==null&&oe(x,t.startTime-e)}}}var S=!1,C=-1,w=5,ee=-1;function te(){return g?!0:!(e.unstable_now()-ee<w)}function ne(){if(g=!1,S){var t=e.unstable_now();ee=t;var i=!0;try{a:{m=!1,h&&(h=!1,v(C),C=-1),p=!0;var a=f;try{b:{for(b(t),d=n(c);d!==null&&!(d.expirationTime>t&&te());){var o=d.callback;if(typeof o==`function`){d.callback=null,f=d.priorityLevel;var s=o(d.expirationTime<=t);if(t=e.unstable_now(),typeof s==`function`){d.callback=s,b(t),i=!0;break b}d===n(c)&&r(c),b(t)}else r(c);d=n(c)}if(d!==null)i=!0;else{var u=n(l);u!==null&&oe(x,u.startTime-t),i=!1}}break a}finally{d=null,f=a,p=!1}i=void 0}}finally{i?re():S=!1}}}var re;if(typeof y==`function`)re=function(){y(ne)};else if(typeof MessageChannel<`u`){var ie=new MessageChannel,ae=ie.port2;ie.port1.onmessage=ne,re=function(){ae.postMessage(null)}}else re=function(){_(ne,0)};function oe(t,n){C=_(function(){t(e.unstable_now())},n)}e.unstable_IdlePriority=5,e.unstable_ImmediatePriority=1,e.unstable_LowPriority=4,e.unstable_NormalPriority=3,e.unstable_Profiling=null,e.unstable_UserBlockingPriority=2,e.unstable_cancelCallback=function(e){e.callback=null},e.unstable_forceFrameRate=function(e){0>e||125<e?console.error(`forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported`):w=0<e?Math.floor(1e3/e):5},e.unstable_getCurrentPriorityLevel=function(){return f},e.unstable_next=function(e){switch(f){case 1:case 2:case 3:var t=3;break;default:t=f}var n=f;f=t;try{return e()}finally{f=n}},e.unstable_requestPaint=function(){g=!0},e.unstable_runWithPriority=function(e,t){switch(e){case 1:case 2:case 3:case 4:case 5:break;default:e=3}var n=f;f=e;try{return t()}finally{f=n}},e.unstable_scheduleCallback=function(r,i,a){var o=e.unstable_now();switch(typeof a==`object`&&a?(a=a.delay,a=typeof a==`number`&&0<a?o+a:o):a=o,r){case 1:var s=-1;break;case 2:s=250;break;case 5:s=1073741823;break;case 4:s=1e4;break;default:s=5e3}return s=a+s,r={id:u++,callback:i,priorityLevel:r,startTime:a,expirationTime:s,sortIndex:-1},a>o?(r.sortIndex=a,t(l,r),n(c)===null&&r===n(l)&&(h?(v(C),C=-1):h=!0,oe(x,a-o))):(r.sortIndex=s,t(c,r),m||p||(m=!0,S||(S=!0,re()))),r},e.unstable_shouldYield=te,e.unstable_wrapCallback=function(e){var t=f;return function(){var n=f;f=t;try{return e.apply(this,arguments)}finally{f=n}}}})),ce=o(((e,t)=>{t.exports=T()})),E=o((e=>{var t=se();function n(e){var t=`https://react.dev/errors/`+e;if(1<arguments.length){t+=`?args[]=`+encodeURIComponent(arguments[1]);for(var n=2;n<arguments.length;n++)t+=`&args[]=`+encodeURIComponent(arguments[n])}return`Minified React error #`+e+`; visit `+t+` for the full message or use the non-minified dev environment for full errors and additional helpful warnings.`}function r(){}var i={d:{f:r,r:function(){throw Error(n(522))},D:r,C:r,L:r,m:r,X:r,S:r,M:r},p:0,findDOMNode:null},a=Symbol.for(`react.portal`);function o(e,t,n){var r=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:a,key:r==null?null:``+r,children:e,containerInfo:t,implementation:n}}var s=t.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;function c(e,t){if(e===`font`)return``;if(typeof t==`string`)return t===`use-credentials`?t:``}e.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE=i,e.createPortal=function(e,t){var r=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!t||t.nodeType!==1&&t.nodeType!==9&&t.nodeType!==11)throw Error(n(299));return o(e,t,null,r)},e.flushSync=function(e){var t=s.T,n=i.p;try{if(s.T=null,i.p=2,e)return e()}finally{s.T=t,i.p=n,i.d.f()}},e.preconnect=function(e,t){typeof e==`string`&&(t?(t=t.crossOrigin,t=typeof t==`string`?t===`use-credentials`?t:``:void 0):t=null,i.d.C(e,t))},e.prefetchDNS=function(e){typeof e==`string`&&i.d.D(e)},e.preinit=function(e,t){if(typeof e==`string`&&t&&typeof t.as==`string`){var n=t.as,r=c(n,t.crossOrigin),a=typeof t.integrity==`string`?t.integrity:void 0,o=typeof t.fetchPriority==`string`?t.fetchPriority:void 0;n===`style`?i.d.S(e,typeof t.precedence==`string`?t.precedence:void 0,{crossOrigin:r,integrity:a,fetchPriority:o}):n===`script`&&i.d.X(e,{crossOrigin:r,integrity:a,fetchPriority:o,nonce:typeof t.nonce==`string`?t.nonce:void 0})}},e.preinitModule=function(e,t){if(typeof e==`string`){if(typeof t==`object`&&t){if(t.as==null||t.as===`script`){var n=c(t.as,t.crossOrigin);i.d.M(e,{crossOrigin:n,integrity:typeof t.integrity==`string`?t.integrity:void 0,nonce:typeof t.nonce==`string`?t.nonce:void 0})}}else t??i.d.M(e)}},e.preload=function(e,t){if(typeof e==`string`&&typeof t==`object`&&t&&typeof t.as==`string`){var n=t.as,r=c(n,t.crossOrigin);i.d.L(e,n,{crossOrigin:r,integrity:typeof t.integrity==`string`?t.integrity:void 0,nonce:typeof t.nonce==`string`?t.nonce:void 0,type:typeof t.type==`string`?t.type:void 0,fetchPriority:typeof t.fetchPriority==`string`?t.fetchPriority:void 0,referrerPolicy:typeof t.referrerPolicy==`string`?t.referrerPolicy:void 0,imageSrcSet:typeof t.imageSrcSet==`string`?t.imageSrcSet:void 0,imageSizes:typeof t.imageSizes==`string`?t.imageSizes:void 0,media:typeof t.media==`string`?t.media:void 0})}},e.preloadModule=function(e,t){if(typeof e==`string`){if(t){var n=c(t.as,t.crossOrigin);i.d.m(e,{as:typeof t.as==`string`&&t.as!==`script`?t.as:void 0,crossOrigin:n,integrity:typeof t.integrity==`string`?t.integrity:void 0})}else i.d.m(e)}},e.requestFormReset=function(e){i.d.r(e)},e.unstable_batchedUpdates=function(e,t){return e(t)},e.useFormState=function(e,t,n){return s.H.useFormState(e,t,n)},e.useFormStatus=function(){return s.H.useHostTransitionStatus()},e.version=`19.2.8`})),le=o(((e,t)=>{function n(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>`u`||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!=`function`))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(n)}catch(e){console.error(e)}}n(),t.exports=E()})),D=o((e=>{var t=ce(),n=se(),r=le();function i(e){var t=`https://react.dev/errors/`+e;if(1<arguments.length){t+=`?args[]=`+encodeURIComponent(arguments[1]);for(var n=2;n<arguments.length;n++)t+=`&args[]=`+encodeURIComponent(arguments[n])}return`Minified React error #`+e+`; visit `+t+` for the full message or use the non-minified dev environment for full errors and additional helpful warnings.`}function a(e){return!(!e||e.nodeType!==1&&e.nodeType!==9&&e.nodeType!==11)}function o(e){var t=e,n=e;if(e.alternate)for(;t.return;)t=t.return;else{e=t;do t=e,t.flags&4098&&(n=t.return),e=t.return;while(e)}return t.tag===3?n:null}function s(e){if(e.tag===13){var t=e.memoizedState;if(t===null&&(e=e.alternate,e!==null&&(t=e.memoizedState)),t!==null)return t.dehydrated}return null}function c(e){if(e.tag===31){var t=e.memoizedState;if(t===null&&(e=e.alternate,e!==null&&(t=e.memoizedState)),t!==null)return t.dehydrated}return null}function l(e){if(o(e)!==e)throw Error(i(188))}function u(e){var t=e.alternate;if(!t){if(t=o(e),t===null)throw Error(i(188));return t===e?e:null}for(var n=e,r=t;;){var a=n.return;if(a===null)break;var s=a.alternate;if(s===null){if(r=a.return,r!==null){n=r;continue}break}if(a.child===s.child){for(s=a.child;s;){if(s===n)return l(a),e;if(s===r)return l(a),t;s=s.sibling}throw Error(i(188))}if(n.return!==r.return)n=a,r=s;else{for(var c=!1,u=a.child;u;){if(u===n){c=!0,n=a,r=s;break}if(u===r){c=!0,r=a,n=s;break}u=u.sibling}if(!c){for(u=s.child;u;){if(u===n){c=!0,n=s,r=a;break}if(u===r){c=!0,r=s,n=a;break}u=u.sibling}if(!c)throw Error(i(189))}}if(n.alternate!==r)throw Error(i(190))}if(n.tag!==3)throw Error(i(188));return n.stateNode.current===n?e:t}function d(e){var t=e.tag;if(t===5||t===26||t===27||t===6)return e;for(e=e.child;e!==null;){if(t=d(e),t!==null)return t;e=e.sibling}return null}var f=Object.assign,p=Symbol.for(`react.element`),m=Symbol.for(`react.transitional.element`),h=Symbol.for(`react.portal`),g=Symbol.for(`react.fragment`),_=Symbol.for(`react.strict_mode`),v=Symbol.for(`react.profiler`),y=Symbol.for(`react.consumer`),b=Symbol.for(`react.context`),x=Symbol.for(`react.forward_ref`),S=Symbol.for(`react.suspense`),C=Symbol.for(`react.suspense_list`),w=Symbol.for(`react.memo`),ee=Symbol.for(`react.lazy`),te=Symbol.for(`react.activity`),ne=Symbol.for(`react.memo_cache_sentinel`),re=Symbol.iterator;function ie(e){return typeof e!=`object`||!e?null:(e=re&&e[re]||e[`@@iterator`],typeof e==`function`?e:null)}var ae=Symbol.for(`react.client.reference`);function oe(e){if(e==null)return null;if(typeof e==`function`)return e.$$typeof===ae?null:e.displayName||e.name||null;if(typeof e==`string`)return e;switch(e){case g:return`Fragment`;case v:return`Profiler`;case _:return`StrictMode`;case S:return`Suspense`;case C:return`SuspenseList`;case te:return`Activity`}if(typeof e==`object`)switch(e.$$typeof){case h:return`Portal`;case b:return e.displayName||`Context`;case y:return(e._context.displayName||`Context`)+`.Consumer`;case x:var t=e.render;return e=e.displayName,e||=(e=t.displayName||t.name||``,e===``?`ForwardRef`:`ForwardRef(`+e+`)`),e;case w:return t=e.displayName||null,t===null?oe(e.type)||`Memo`:t;case ee:t=e._payload,e=e._init;try{return oe(e(t))}catch{}}return null}var T=Array.isArray,E=n.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,D=r.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,ue={pending:!1,data:null,method:null,action:null},O=[],k=-1;function de(e){return{current:e}}function A(e){0>k||(e.current=O[k],O[k]=null,k--)}function j(e,t){k++,O[k]=e.current,e.current=t}var fe=de(null),M=de(null),pe=de(null),N=de(null);function me(e,t){switch(j(pe,t),j(M,e),j(fe,null),t.nodeType){case 9:case 11:e=(e=t.documentElement)&&(e=e.namespaceURI)?Vd(e):0;break;default:if(e=t.tagName,t=t.namespaceURI)t=Vd(t),e=Hd(t,e);else switch(e){case`svg`:e=1;break;case`math`:e=2;break;default:e=0}}A(fe),j(fe,e)}function he(){A(fe),A(M),A(pe)}function ge(e){e.memoizedState!==null&&j(N,e);var t=fe.current,n=Hd(t,e.type);t!==n&&(j(M,e),j(fe,n))}function _e(e){M.current===e&&(A(fe),A(M)),N.current===e&&(A(N),Qf._currentValue=ue)}var ve,ye;function be(e){if(ve===void 0)try{throw Error()}catch(e){var t=e.stack.trim().match(/\n( *(at )?)/);ve=t&&t[1]||``,ye=-1<e.stack.indexOf(`
    at`)?` (<anonymous>)`:-1<e.stack.indexOf(`@`)?`@unknown:0:0`:``}return`
`+ve+e+ye}var xe=!1;function Se(e,t){if(!e||xe)return``;xe=!0;var n=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{var r={DetermineComponentFrameRoot:function(){try{if(t){var n=function(){throw Error()};if(Object.defineProperty(n.prototype,"props",{set:function(){throw Error()}}),typeof Reflect==`object`&&Reflect.construct){try{Reflect.construct(n,[])}catch(e){var r=e}Reflect.construct(e,[],n)}else{try{n.call()}catch(e){r=e}e.call(n.prototype)}}else{try{throw Error()}catch(e){r=e}(n=e())&&typeof n.catch==`function`&&n.catch(function(){})}}catch(e){if(e&&r&&typeof e.stack==`string`)return[e.stack,r.stack]}return[null,null]}};r.DetermineComponentFrameRoot.displayName=`DetermineComponentFrameRoot`;var i=Object.getOwnPropertyDescriptor(r.DetermineComponentFrameRoot,`name`);i&&i.configurable&&Object.defineProperty(r.DetermineComponentFrameRoot,"name",{value:`DetermineComponentFrameRoot`});var a=r.DetermineComponentFrameRoot(),o=a[0],s=a[1];if(o&&s){var c=o.split(`
`),l=s.split(`
`);for(i=r=0;r<c.length&&!c[r].includes(`DetermineComponentFrameRoot`);)r++;for(;i<l.length&&!l[i].includes(`DetermineComponentFrameRoot`);)i++;if(r===c.length||i===l.length)for(r=c.length-1,i=l.length-1;1<=r&&0<=i&&c[r]!==l[i];)i--;for(;1<=r&&0<=i;r--,i--)if(c[r]!==l[i]){if(r!==1||i!==1)do if(r--,i--,0>i||c[r]!==l[i]){var u=`
`+c[r].replace(` at new `,` at `);return e.displayName&&u.includes(`<anonymous>`)&&(u=u.replace(`<anonymous>`,e.displayName)),u}while(1<=r&&0<=i);break}}}finally{xe=!1,Error.prepareStackTrace=n}return(n=e?e.displayName||e.name:``)?be(n):``}function Ce(e,t){switch(e.tag){case 26:case 27:case 5:return be(e.type);case 16:return be(`Lazy`);case 13:return e.child!==t&&t!==null?be(`Suspense Fallback`):be(`Suspense`);case 19:return be(`SuspenseList`);case 0:case 15:return Se(e.type,!1);case 11:return Se(e.type.render,!1);case 1:return Se(e.type,!0);case 31:return be(`Activity`);default:return``}}function we(e){try{var t=``,n=null;do t+=Ce(e,n),n=e,e=e.return;while(e);return t}catch(e){return`
Error generating stack: `+e.message+`
`+e.stack}}var Te=Object.prototype.hasOwnProperty,P=t.unstable_scheduleCallback,Ee=t.unstable_cancelCallback,De=t.unstable_shouldYield,Oe=t.unstable_requestPaint,ke=t.unstable_now,Ae=t.unstable_getCurrentPriorityLevel,je=t.unstable_ImmediatePriority,Me=t.unstable_UserBlockingPriority,Ne=t.unstable_NormalPriority,Pe=t.unstable_LowPriority,Fe=t.unstable_IdlePriority,Ie=t.log,Le=t.unstable_setDisableYieldValue,Re=null,ze=null;function Be(e){if(typeof Ie==`function`&&Le(e),ze&&typeof ze.setStrictMode==`function`)try{ze.setStrictMode(Re,e)}catch{}}var Ve=Math.clz32?Math.clz32:We,He=Math.log,Ue=Math.LN2;function We(e){return e>>>=0,e===0?32:31-(He(e)/Ue|0)|0}var Ge=256,Ke=262144,qe=4194304;function Je(e){var t=e&42;if(t!==0)return t;switch(e&-e){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:return 64;case 128:return 128;case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:return e&261888;case 262144:case 524288:case 1048576:case 2097152:return e&3932160;case 4194304:case 8388608:case 16777216:case 33554432:return e&62914560;case 67108864:return 67108864;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 0;default:return e}}function Ye(e,t,n){var r=e.pendingLanes;if(r===0)return 0;var i=0,a=e.suspendedLanes,o=e.pingedLanes;e=e.warmLanes;var s=r&134217727;return s===0?(s=r&~a,s===0?o===0?n||(n=r&~e,n!==0&&(i=Je(n))):i=Je(o):i=Je(s)):(r=s&~a,r===0?(o&=s,o===0?n||(n=s&~e,n!==0&&(i=Je(n))):i=Je(o)):i=Je(r)),i===0?0:t!==0&&t!==i&&(t&a)===0&&(a=i&-i,n=t&-t,a>=n||a===32&&n&4194048)?t:i}function Xe(e,t){return(e.pendingLanes&~(e.suspendedLanes&~e.pingedLanes)&t)===0}function Ze(e,t){switch(e){case 1:case 2:case 4:case 8:case 64:return t+250;case 16:case 32:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return t+5e3;case 4194304:case 8388608:case 16777216:case 33554432:return-1;case 67108864:case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function Qe(){var e=qe;return qe<<=1,!(qe&62914560)&&(qe=4194304),e}function $e(e){for(var t=[],n=0;31>n;n++)t.push(e);return t}function et(e,t){e.pendingLanes|=t,t!==268435456&&(e.suspendedLanes=0,e.pingedLanes=0,e.warmLanes=0)}function tt(e,t,n,r,i,a){var o=e.pendingLanes;e.pendingLanes=n,e.suspendedLanes=0,e.pingedLanes=0,e.warmLanes=0,e.expiredLanes&=n,e.entangledLanes&=n,e.errorRecoveryDisabledLanes&=n,e.shellSuspendCounter=0;var s=e.entanglements,c=e.expirationTimes,l=e.hiddenUpdates;for(n=o&~n;0<n;){var u=31-Ve(n),d=1<<u;s[u]=0,c[u]=-1;var f=l[u];if(f!==null)for(l[u]=null,u=0;u<f.length;u++){var p=f[u];p!==null&&(p.lane&=-536870913)}n&=~d}r!==0&&nt(e,r,0),a!==0&&i===0&&e.tag!==0&&(e.suspendedLanes|=a&~(o&~t))}function nt(e,t,n){e.pendingLanes|=t,e.suspendedLanes&=~t;var r=31-Ve(t);e.entangledLanes|=t,e.entanglements[r]=e.entanglements[r]|1073741824|n&261930}function rt(e,t){var n=e.entangledLanes|=t;for(e=e.entanglements;n;){var r=31-Ve(n),i=1<<r;i&t|e[r]&t&&(e[r]|=t),n&=~i}}function it(e,t){var n=t&-t;return n=n&42?1:at(n),(n&(e.suspendedLanes|t))===0?n:0}function at(e){switch(e){case 2:e=1;break;case 8:e=4;break;case 32:e=16;break;case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:e=128;break;case 268435456:e=134217728;break;default:e=0}return e}function ot(e){return e&=-e,2<e?8<e?e&134217727?32:268435456:8:2}function st(){var e=D.p;return e===0?(e=window.event,e===void 0?32:mp(e.type)):e}function ct(e,t){var n=D.p;try{return D.p=e,t()}finally{D.p=n}}var lt=Math.random().toString(36).slice(2),ut=`__reactFiber$`+lt,dt=`__reactProps$`+lt,ft=`__reactContainer$`+lt,pt=`__reactEvents$`+lt,mt=`__reactListeners$`+lt,ht=`__reactHandles$`+lt,gt=`__reactResources$`+lt,_t=`__reactMarker$`+lt;function vt(e){delete e[ut],delete e[dt],delete e[pt],delete e[mt],delete e[ht]}function yt(e){var t=e[ut];if(t)return t;for(var n=e.parentNode;n;){if(t=n[ft]||n[ut]){if(n=t.alternate,t.child!==null||n!==null&&n.child!==null)for(e=df(e);e!==null;){if(n=e[ut])return n;e=df(e)}return t}e=n,n=e.parentNode}return null}function bt(e){if(e=e[ut]||e[ft]){var t=e.tag;if(t===5||t===6||t===13||t===31||t===26||t===27||t===3)return e}return null}function xt(e){var t=e.tag;if(t===5||t===26||t===27||t===6)return e.stateNode;throw Error(i(33))}function St(e){var t=e[gt];return t||=e[gt]={hoistableStyles:new Map,hoistableScripts:new Map},t}function Ct(e){e[_t]=!0}var wt=new Set,Tt={};function Et(e,t){Dt(e,t),Dt(e+`Capture`,t)}function Dt(e,t){for(Tt[e]=t,e=0;e<t.length;e++)wt.add(t[e])}var Ot=RegExp(`^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$`),kt={},At={};function jt(e){return Te.call(At,e)?!0:Te.call(kt,e)?!1:Ot.test(e)?At[e]=!0:(kt[e]=!0,!1)}function Mt(e,t,n){if(jt(t)){if(n===null)e.removeAttribute(t);else{switch(typeof n){case`undefined`:case`function`:case`symbol`:e.removeAttribute(t);return;case`boolean`:var r=t.toLowerCase().slice(0,5);if(r!==`data-`&&r!==`aria-`){e.removeAttribute(t);return}}e.setAttribute(t,``+n)}}}function Nt(e,t,n){if(n===null)e.removeAttribute(t);else{switch(typeof n){case`undefined`:case`function`:case`symbol`:case`boolean`:e.removeAttribute(t);return}e.setAttribute(t,``+n)}}function Pt(e,t,n,r){if(r===null)e.removeAttribute(n);else{switch(typeof r){case`undefined`:case`function`:case`symbol`:case`boolean`:e.removeAttribute(n);return}e.setAttributeNS(t,n,``+r)}}function Ft(e){switch(typeof e){case`bigint`:case`boolean`:case`number`:case`string`:case`undefined`:return e;case`object`:return e;default:return``}}function It(e){var t=e.type;return(e=e.nodeName)&&e.toLowerCase()===`input`&&(t===`checkbox`||t===`radio`)}function Lt(e,t,n){var r=Object.getOwnPropertyDescriptor(e.constructor.prototype,t);if(!e.hasOwnProperty(t)&&r!==void 0&&typeof r.get==`function`&&typeof r.set==`function`){var i=r.get,a=r.set;return Object.defineProperty(e,t,{configurable:!0,get:function(){return i.call(this)},set:function(e){n=``+e,a.call(this,e)}}),Object.defineProperty(e,t,{enumerable:r.enumerable}),{getValue:function(){return n},setValue:function(e){n=``+e},stopTracking:function(){e._valueTracker=null,delete e[t]}}}}function Rt(e){if(!e._valueTracker){var t=It(e)?`checked`:`value`;e._valueTracker=Lt(e,t,``+e[t])}}function zt(e){if(!e)return!1;var t=e._valueTracker;if(!t)return!0;var n=t.getValue(),r=``;return e&&(r=It(e)?e.checked?`true`:`false`:e.value),e=r,e!==n&&(t.setValue(e),!0)}function Bt(e){if(e||=typeof document<`u`?document:void 0,e===void 0)return null;try{return e.activeElement||e.body}catch{return e.body}}var Vt=/[\n"\\]/g;function Ht(e){return e.replace(Vt,function(e){return`\\`+e.charCodeAt(0).toString(16)+` `})}function Ut(e,t,n,r,i,a,o,s){e.name=``,o!=null&&typeof o!=`function`&&typeof o!=`symbol`&&typeof o!=`boolean`?e.type=o:e.removeAttribute(`type`),t==null?o!==`submit`&&o!==`reset`||e.removeAttribute(`value`):o===`number`?(t===0&&e.value===``||e.value!=t)&&(e.value=``+Ft(t)):e.value!==``+Ft(t)&&(e.value=``+Ft(t)),t==null?n==null?r!=null&&e.removeAttribute(`value`):Gt(e,o,Ft(n)):Gt(e,o,Ft(t)),i==null&&a!=null&&(e.defaultChecked=!!a),i!=null&&(e.checked=i&&typeof i!=`function`&&typeof i!=`symbol`),s!=null&&typeof s!=`function`&&typeof s!=`symbol`&&typeof s!=`boolean`?e.name=``+Ft(s):e.removeAttribute(`name`)}function Wt(e,t,n,r,i,a,o,s){if(a!=null&&typeof a!=`function`&&typeof a!=`symbol`&&typeof a!=`boolean`&&(e.type=a),t!=null||n!=null){if(!(a!==`submit`&&a!==`reset`||t!=null)){Rt(e);return}n=n==null?``:``+Ft(n),t=t==null?n:``+Ft(t),s||t===e.value||(e.value=t),e.defaultValue=t}r??=i,r=typeof r!=`function`&&typeof r!=`symbol`&&!!r,e.checked=s?e.checked:!!r,e.defaultChecked=!!r,o!=null&&typeof o!=`function`&&typeof o!=`symbol`&&typeof o!=`boolean`&&(e.name=o),Rt(e)}function Gt(e,t,n){t===`number`&&Bt(e.ownerDocument)===e||e.defaultValue===``+n||(e.defaultValue=``+n)}function Kt(e,t,n,r){if(e=e.options,t){t={};for(var i=0;i<n.length;i++)t[`$`+n[i]]=!0;for(n=0;n<e.length;n++)i=t.hasOwnProperty(`$`+e[n].value),e[n].selected!==i&&(e[n].selected=i),i&&r&&(e[n].defaultSelected=!0)}else{for(n=``+Ft(n),t=null,i=0;i<e.length;i++){if(e[i].value===n){e[i].selected=!0,r&&(e[i].defaultSelected=!0);return}t!==null||e[i].disabled||(t=e[i])}t!==null&&(t.selected=!0)}}function qt(e,t,n){if(t!=null&&(t=``+Ft(t),t!==e.value&&(e.value=t),n==null)){e.defaultValue!==t&&(e.defaultValue=t);return}e.defaultValue=n==null?``:``+Ft(n)}function Jt(e,t,n,r){if(t==null){if(r!=null){if(n!=null)throw Error(i(92));if(T(r)){if(1<r.length)throw Error(i(93));r=r[0]}n=r}n??=``,t=n}n=Ft(t),e.defaultValue=n,r=e.textContent,r===n&&r!==``&&r!==null&&(e.value=r),Rt(e)}function Yt(e,t){if(t){var n=e.firstChild;if(n&&n===e.lastChild&&n.nodeType===3){n.nodeValue=t;return}}e.textContent=t}var Xt=new Set(`animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp`.split(` `));function Zt(e,t,n){var r=t.indexOf(`--`)===0;n==null||typeof n==`boolean`||n===``?r?e.setProperty(t,``):t===`float`?e.cssFloat=``:e[t]=``:r?e.setProperty(t,n):typeof n!=`number`||n===0||Xt.has(t)?t===`float`?e.cssFloat=n:e[t]=(``+n).trim():e[t]=n+`px`}function Qt(e,t,n){if(t!=null&&typeof t!=`object`)throw Error(i(62));if(e=e.style,n!=null){for(var r in n)!n.hasOwnProperty(r)||t!=null&&t.hasOwnProperty(r)||(r.indexOf(`--`)===0?e.setProperty(r,``):r===`float`?e.cssFloat=``:e[r]=``);for(var a in t)r=t[a],t.hasOwnProperty(a)&&n[a]!==r&&Zt(e,a,r)}else for(var o in t)t.hasOwnProperty(o)&&Zt(e,o,t[o])}function $t(e){if(e.indexOf(`-`)===-1)return!1;switch(e){case`annotation-xml`:case`color-profile`:case`font-face`:case`font-face-src`:case`font-face-uri`:case`font-face-format`:case`font-face-name`:case`missing-glyph`:return!1;default:return!0}}var en=new Map([[`acceptCharset`,`accept-charset`],[`htmlFor`,`for`],[`httpEquiv`,`http-equiv`],[`crossOrigin`,`crossorigin`],[`accentHeight`,`accent-height`],[`alignmentBaseline`,`alignment-baseline`],[`arabicForm`,`arabic-form`],[`baselineShift`,`baseline-shift`],[`capHeight`,`cap-height`],[`clipPath`,`clip-path`],[`clipRule`,`clip-rule`],[`colorInterpolation`,`color-interpolation`],[`colorInterpolationFilters`,`color-interpolation-filters`],[`colorProfile`,`color-profile`],[`colorRendering`,`color-rendering`],[`dominantBaseline`,`dominant-baseline`],[`enableBackground`,`enable-background`],[`fillOpacity`,`fill-opacity`],[`fillRule`,`fill-rule`],[`floodColor`,`flood-color`],[`floodOpacity`,`flood-opacity`],[`fontFamily`,`font-family`],[`fontSize`,`font-size`],[`fontSizeAdjust`,`font-size-adjust`],[`fontStretch`,`font-stretch`],[`fontStyle`,`font-style`],[`fontVariant`,`font-variant`],[`fontWeight`,`font-weight`],[`glyphName`,`glyph-name`],[`glyphOrientationHorizontal`,`glyph-orientation-horizontal`],[`glyphOrientationVertical`,`glyph-orientation-vertical`],[`horizAdvX`,`horiz-adv-x`],[`horizOriginX`,`horiz-origin-x`],[`imageRendering`,`image-rendering`],[`letterSpacing`,`letter-spacing`],[`lightingColor`,`lighting-color`],[`markerEnd`,`marker-end`],[`markerMid`,`marker-mid`],[`markerStart`,`marker-start`],[`overlinePosition`,`overline-position`],[`overlineThickness`,`overline-thickness`],[`paintOrder`,`paint-order`],[`panose-1`,`panose-1`],[`pointerEvents`,`pointer-events`],[`renderingIntent`,`rendering-intent`],[`shapeRendering`,`shape-rendering`],[`stopColor`,`stop-color`],[`stopOpacity`,`stop-opacity`],[`strikethroughPosition`,`strikethrough-position`],[`strikethroughThickness`,`strikethrough-thickness`],[`strokeDasharray`,`stroke-dasharray`],[`strokeDashoffset`,`stroke-dashoffset`],[`strokeLinecap`,`stroke-linecap`],[`strokeLinejoin`,`stroke-linejoin`],[`strokeMiterlimit`,`stroke-miterlimit`],[`strokeOpacity`,`stroke-opacity`],[`strokeWidth`,`stroke-width`],[`textAnchor`,`text-anchor`],[`textDecoration`,`text-decoration`],[`textRendering`,`text-rendering`],[`transformOrigin`,`transform-origin`],[`underlinePosition`,`underline-position`],[`underlineThickness`,`underline-thickness`],[`unicodeBidi`,`unicode-bidi`],[`unicodeRange`,`unicode-range`],[`unitsPerEm`,`units-per-em`],[`vAlphabetic`,`v-alphabetic`],[`vHanging`,`v-hanging`],[`vIdeographic`,`v-ideographic`],[`vMathematical`,`v-mathematical`],[`vectorEffect`,`vector-effect`],[`vertAdvY`,`vert-adv-y`],[`vertOriginX`,`vert-origin-x`],[`vertOriginY`,`vert-origin-y`],[`wordSpacing`,`word-spacing`],[`writingMode`,`writing-mode`],[`xmlnsXlink`,`xmlns:xlink`],[`xHeight`,`x-height`]]),tn=/^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;function nn(e){return tn.test(``+e)?`javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')`:e}function rn(){}var an=null;function on(e){return e=e.target||e.srcElement||window,e.correspondingUseElement&&(e=e.correspondingUseElement),e.nodeType===3?e.parentNode:e}var sn=null,cn=null;function ln(e){var t=bt(e);if(t&&(e=t.stateNode)){var n=e[dt]||null;a:switch(e=t.stateNode,t.type){case`input`:if(Ut(e,n.value,n.defaultValue,n.defaultValue,n.checked,n.defaultChecked,n.type,n.name),t=n.name,n.type===`radio`&&t!=null){for(n=e;n.parentNode;)n=n.parentNode;for(n=n.querySelectorAll(`input[name="`+Ht(``+t)+`"][type="radio"]`),t=0;t<n.length;t++){var r=n[t];if(r!==e&&r.form===e.form){var a=r[dt]||null;if(!a)throw Error(i(90));Ut(r,a.value,a.defaultValue,a.defaultValue,a.checked,a.defaultChecked,a.type,a.name)}}for(t=0;t<n.length;t++)r=n[t],r.form===e.form&&zt(r)}break a;case`textarea`:qt(e,n.value,n.defaultValue);break a;case`select`:t=n.value,t!=null&&Kt(e,!!n.multiple,t,!1)}}}var un=!1;function dn(e,t,n){if(un)return e(t,n);un=!0;try{return e(t)}finally{if(un=!1,(sn!==null||cn!==null)&&(vu(),sn&&(t=sn,e=cn,cn=sn=null,ln(t),e)))for(t=0;t<e.length;t++)ln(e[t])}}function fn(e,t){var n=e.stateNode;if(n===null)return null;var r=n[dt]||null;if(r===null)return null;n=r[t];a:switch(t){case`onClick`:case`onClickCapture`:case`onDoubleClick`:case`onDoubleClickCapture`:case`onMouseDown`:case`onMouseDownCapture`:case`onMouseMove`:case`onMouseMoveCapture`:case`onMouseUp`:case`onMouseUpCapture`:case`onMouseEnter`:(r=!r.disabled)||(e=e.type,r=e!==`button`&&e!==`input`&&e!==`select`&&e!==`textarea`),e=!r;break a;default:e=!1}if(e)return null;if(n&&typeof n!=`function`)throw Error(i(231,t,typeof n));return n}var pn=!(typeof window>`u`||window.document===void 0||window.document.createElement===void 0),mn=!1;if(pn)try{var hn={};Object.defineProperty(hn,"passive",{get:function(){mn=!0}}),window.addEventListener(`test`,hn,hn),window.removeEventListener(`test`,hn,hn)}catch{mn=!1}var gn=null,_n=null,vn=null;function yn(){if(vn)return vn;var e,t=_n,n=t.length,r,i=`value`in gn?gn.value:gn.textContent,a=i.length;for(e=0;e<n&&t[e]===i[e];e++);var o=n-e;for(r=1;r<=o&&t[n-r]===i[a-r];r++);return vn=i.slice(e,1<r?1-r:void 0)}function bn(e){var t=e.keyCode;return`charCode`in e?(e=e.charCode,e===0&&t===13&&(e=13)):e=t,e===10&&(e=13),32<=e||e===13?e:0}function xn(){return!0}function Sn(){return!1}function Cn(e){function t(t,n,r,i,a){for(var o in this._reactName=t,this._targetInst=r,this.type=n,this.nativeEvent=i,this.target=a,this.currentTarget=null,e)e.hasOwnProperty(o)&&(t=e[o],this[o]=t?t(i):i[o]);return this.isDefaultPrevented=(i.defaultPrevented==null?!1===i.returnValue:i.defaultPrevented)?xn:Sn,this.isPropagationStopped=Sn,this}return f(t.prototype,{preventDefault:function(){this.defaultPrevented=!0;var e=this.nativeEvent;e&&(e.preventDefault?e.preventDefault():typeof e.returnValue!=`unknown`&&(e.returnValue=!1),this.isDefaultPrevented=xn)},stopPropagation:function(){var e=this.nativeEvent;e&&(e.stopPropagation?e.stopPropagation():typeof e.cancelBubble!=`unknown`&&(e.cancelBubble=!0),this.isPropagationStopped=xn)},persist:function(){},isPersistent:xn}),t}var wn={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(e){return e.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},Tn=Cn(wn),En=f({},wn,{view:0,detail:0}),Dn=Cn(En),On,kn,An,jn=f({},En,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:Hn,button:0,buttons:0,relatedTarget:function(e){return e.relatedTarget===void 0?e.fromElement===e.srcElement?e.toElement:e.fromElement:e.relatedTarget},movementX:function(e){return`movementX`in e?e.movementX:(e!==An&&(An&&e.type===`mousemove`?(On=e.screenX-An.screenX,kn=e.screenY-An.screenY):kn=On=0,An=e),On)},movementY:function(e){return`movementY`in e?e.movementY:kn}}),Mn=Cn(jn),Nn=Cn(f({},jn,{dataTransfer:0})),Pn=Cn(f({},En,{relatedTarget:0})),Fn=Cn(f({},wn,{animationName:0,elapsedTime:0,pseudoElement:0})),In=Cn(f({},wn,{clipboardData:function(e){return`clipboardData`in e?e.clipboardData:window.clipboardData}})),Ln=Cn(f({},wn,{data:0})),Rn={Esc:`Escape`,Spacebar:` `,Left:`ArrowLeft`,Up:`ArrowUp`,Right:`ArrowRight`,Down:`ArrowDown`,Del:`Delete`,Win:`OS`,Menu:`ContextMenu`,Apps:`ContextMenu`,Scroll:`ScrollLock`,MozPrintableKey:`Unidentified`},zn={8:`Backspace`,9:`Tab`,12:`Clear`,13:`Enter`,16:`Shift`,17:`Control`,18:`Alt`,19:`Pause`,20:`CapsLock`,27:`Escape`,32:` `,33:`PageUp`,34:`PageDown`,35:`End`,36:`Home`,37:`ArrowLeft`,38:`ArrowUp`,39:`ArrowRight`,40:`ArrowDown`,45:`Insert`,46:`Delete`,112:`F1`,113:`F2`,114:`F3`,115:`F4`,116:`F5`,117:`F6`,118:`F7`,119:`F8`,120:`F9`,121:`F10`,122:`F11`,123:`F12`,144:`NumLock`,145:`ScrollLock`,224:`Meta`},Bn={Alt:`altKey`,Control:`ctrlKey`,Meta:`metaKey`,Shift:`shiftKey`};function Vn(e){var t=this.nativeEvent;return t.getModifierState?t.getModifierState(e):(e=Bn[e])?!!t[e]:!1}function Hn(){return Vn}var Un=Cn(f({},En,{key:function(e){if(e.key){var t=Rn[e.key]||e.key;if(t!==`Unidentified`)return t}return e.type===`keypress`?(e=bn(e),e===13?`Enter`:String.fromCharCode(e)):e.type===`keydown`||e.type===`keyup`?zn[e.keyCode]||`Unidentified`:``},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:Hn,charCode:function(e){return e.type===`keypress`?bn(e):0},keyCode:function(e){return e.type===`keydown`||e.type===`keyup`?e.keyCode:0},which:function(e){return e.type===`keypress`?bn(e):e.type===`keydown`||e.type===`keyup`?e.keyCode:0}})),Wn=Cn(f({},jn,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0})),Gn=Cn(f({},En,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:Hn})),Kn=Cn(f({},wn,{propertyName:0,elapsedTime:0,pseudoElement:0})),qn=Cn(f({},jn,{deltaX:function(e){return`deltaX`in e?e.deltaX:`wheelDeltaX`in e?-e.wheelDeltaX:0},deltaY:function(e){return`deltaY`in e?e.deltaY:`wheelDeltaY`in e?-e.wheelDeltaY:`wheelDelta`in e?-e.wheelDelta:0},deltaZ:0,deltaMode:0})),Jn=Cn(f({},wn,{newState:0,oldState:0})),Yn=[9,13,27,32],Xn=pn&&`CompositionEvent`in window,Zn=null;pn&&`documentMode`in document&&(Zn=document.documentMode);var Qn=pn&&`TextEvent`in window&&!Zn,$n=pn&&(!Xn||Zn&&8<Zn&&11>=Zn),er=` `,tr=!1;function nr(e,t){switch(e){case`keyup`:return Yn.indexOf(t.keyCode)!==-1;case`keydown`:return t.keyCode!==229;case`keypress`:case`mousedown`:case`focusout`:return!0;default:return!1}}function rr(e){return e=e.detail,typeof e==`object`&&`data`in e?e.data:null}var ir=!1;function F(e,t){switch(e){case`compositionend`:return rr(t);case`keypress`:return t.which===32?(tr=!0,er):null;case`textInput`:return e=t.data,e===er&&tr?null:e;default:return null}}function ar(e,t){if(ir)return e===`compositionend`||!Xn&&nr(e,t)?(e=yn(),vn=_n=gn=null,ir=!1,e):null;switch(e){case`paste`:return null;case`keypress`:if(!(t.ctrlKey||t.altKey||t.metaKey)||t.ctrlKey&&t.altKey){if(t.char&&1<t.char.length)return t.char;if(t.which)return String.fromCharCode(t.which)}return null;case`compositionend`:return $n&&t.locale!==`ko`?null:t.data;default:return null}}var or={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function sr(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t===`input`?!!or[e.type]:t===`textarea`}function cr(e,t,n,r){sn?cn?cn.push(r):cn=[r]:sn=r,t=Td(t,`onChange`),0<t.length&&(n=new Tn(`onChange`,`change`,null,n,r),e.push({event:n,listeners:t}))}var lr=null,ur=null;function dr(e){vd(e,0)}function fr(e){if(zt(xt(e)))return e}function pr(e,t){if(e===`change`)return t}var mr=!1;if(pn){var hr;if(pn){var gr=`oninput`in document;if(!gr){var _r=document.createElement(`div`);_r.setAttribute(`oninput`,`return;`),gr=typeof _r.oninput==`function`}hr=gr}else hr=!1;mr=hr&&(!document.documentMode||9<document.documentMode)}function vr(){lr&&(lr.detachEvent(`onpropertychange`,yr),ur=lr=null)}function yr(e){if(e.propertyName===`value`&&fr(ur)){var t=[];cr(t,ur,e,on(e)),dn(dr,t)}}function br(e,t,n){e===`focusin`?(vr(),lr=t,ur=n,lr.attachEvent(`onpropertychange`,yr)):e===`focusout`&&vr()}function xr(e){if(e===`selectionchange`||e===`keyup`||e===`keydown`)return fr(ur)}function Sr(e,t){if(e===`click`)return fr(t)}function Cr(e,t){if(e===`input`||e===`change`)return fr(t)}function wr(e,t){return e===t&&(e!==0||1/e==1/t)||e!==e&&t!==t}var Tr=typeof Object.is==`function`?Object.is:wr;function Er(e,t){if(Tr(e,t))return!0;if(typeof e!=`object`||!e||typeof t!=`object`||!t)return!1;var n=Object.keys(e),r=Object.keys(t);if(n.length!==r.length)return!1;for(r=0;r<n.length;r++){var i=n[r];if(!Te.call(t,i)||!Tr(e[i],t[i]))return!1}return!0}function Dr(e){for(;e&&e.firstChild;)e=e.firstChild;return e}function Or(e,t){var n=Dr(e);e=0;for(var r;n;){if(n.nodeType===3){if(r=e+n.textContent.length,e<=t&&r>=t)return{node:n,offset:t-e};e=r}a:{for(;n;){if(n.nextSibling){n=n.nextSibling;break a}n=n.parentNode}n=void 0}n=Dr(n)}}function kr(e,t){return e&&t?e===t?!0:e&&e.nodeType===3?!1:t&&t.nodeType===3?kr(e,t.parentNode):`contains`in e?e.contains(t):e.compareDocumentPosition?!!(e.compareDocumentPosition(t)&16):!1:!1}function Ar(e){e=e!=null&&e.ownerDocument!=null&&e.ownerDocument.defaultView!=null?e.ownerDocument.defaultView:window;for(var t=Bt(e.document);t instanceof e.HTMLIFrameElement;){try{var n=typeof t.contentWindow.location.href==`string`}catch{n=!1}if(n)e=t.contentWindow;else break;t=Bt(e.document)}return t}function jr(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t&&(t===`input`&&(e.type===`text`||e.type===`search`||e.type===`tel`||e.type===`url`||e.type===`password`)||t===`textarea`||e.contentEditable===`true`)}var Mr=pn&&`documentMode`in document&&11>=document.documentMode,Nr=null,Pr=null,Fr=null,Ir=!1;function Lr(e,t,n){var r=n.window===n?n.document:n.nodeType===9?n:n.ownerDocument;Ir||Nr==null||Nr!==Bt(r)||(r=Nr,`selectionStart`in r&&jr(r)?r={start:r.selectionStart,end:r.selectionEnd}:(r=(r.ownerDocument&&r.ownerDocument.defaultView||window).getSelection(),r={anchorNode:r.anchorNode,anchorOffset:r.anchorOffset,focusNode:r.focusNode,focusOffset:r.focusOffset}),Fr&&Er(Fr,r)||(Fr=r,r=Td(Pr,`onSelect`),0<r.length&&(t=new Tn(`onSelect`,`select`,null,t,n),e.push({event:t,listeners:r}),t.target=Nr)))}function Rr(e,t){var n={};return n[e.toLowerCase()]=t.toLowerCase(),n[`Webkit`+e]=`webkit`+t,n[`Moz`+e]=`moz`+t,n}var zr={animationend:Rr(`Animation`,`AnimationEnd`),animationiteration:Rr(`Animation`,`AnimationIteration`),animationstart:Rr(`Animation`,`AnimationStart`),transitionrun:Rr(`Transition`,`TransitionRun`),transitionstart:Rr(`Transition`,`TransitionStart`),transitioncancel:Rr(`Transition`,`TransitionCancel`),transitionend:Rr(`Transition`,`TransitionEnd`)},Br={},Vr={};pn&&(Vr=document.createElement(`div`).style,`AnimationEvent`in window||(delete zr.animationend.animation,delete zr.animationiteration.animation,delete zr.animationstart.animation),`TransitionEvent`in window||delete zr.transitionend.transition);function Hr(e){if(Br[e])return Br[e];if(!zr[e])return e;var t=zr[e],n;for(n in t)if(t.hasOwnProperty(n)&&n in Vr)return Br[e]=t[n];return e}var Ur=Hr(`animationend`),Wr=Hr(`animationiteration`),Gr=Hr(`animationstart`),Kr=Hr(`transitionrun`),qr=Hr(`transitionstart`),Jr=Hr(`transitioncancel`),Yr=Hr(`transitionend`),Xr=new Map,Zr=`abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel`.split(` `);Zr.push(`scrollEnd`);function Qr(e,t){Xr.set(e,t),Et(t,[e])}var $r=typeof reportError==`function`?reportError:function(e){if(typeof window==`object`&&typeof window.ErrorEvent==`function`){var t=new window.ErrorEvent(`error`,{bubbles:!0,cancelable:!0,message:typeof e==`object`&&e&&typeof e.message==`string`?String(e.message):String(e),error:e});if(!window.dispatchEvent(t))return}else if(typeof process==`object`&&typeof process.emit==`function`){process.emit(`uncaughtException`,e);return}console.error(e)},I=[],ei=0,ti=0;function ni(){for(var e=ei,t=ti=ei=0;t<e;){var n=I[t];I[t++]=null;var r=I[t];I[t++]=null;var i=I[t];I[t++]=null;var a=I[t];if(I[t++]=null,r!==null&&i!==null){var o=r.pending;o===null?i.next=i:(i.next=o.next,o.next=i),r.pending=i}a!==0&&oi(n,i,a)}}function ri(e,t,n,r){I[ei++]=e,I[ei++]=t,I[ei++]=n,I[ei++]=r,ti|=r,e.lanes|=r,e=e.alternate,e!==null&&(e.lanes|=r)}function ii(e,t,n,r){return ri(e,t,n,r),si(e)}function ai(e,t){return ri(e,null,null,t),si(e)}function oi(e,t,n){e.lanes|=n;var r=e.alternate;r!==null&&(r.lanes|=n);for(var i=!1,a=e.return;a!==null;)a.childLanes|=n,r=a.alternate,r!==null&&(r.childLanes|=n),a.tag===22&&(e=a.stateNode,e===null||e._visibility&1||(i=!0)),e=a,a=a.return;return e.tag===3?(a=e.stateNode,i&&t!==null&&(i=31-Ve(n),e=a.hiddenUpdates,r=e[i],r===null?e[i]=[t]:r.push(t),t.lane=n|536870912),a):null}function si(e){if(50<lu)throw lu=0,uu=null,Error(i(185));for(var t=e.return;t!==null;)e=t,t=e.return;return e.tag===3?e.stateNode:null}var ci={};function li(e,t,n,r){this.tag=e,this.key=n,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.refCleanup=this.ref=null,this.pendingProps=t,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=r,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function ui(e,t,n,r){return new li(e,t,n,r)}function di(e){return e=e.prototype,!(!e||!e.isReactComponent)}function L(e,t){var n=e.alternate;return n===null?(n=ui(e.tag,t,e.key,e.mode),n.elementType=e.elementType,n.type=e.type,n.stateNode=e.stateNode,n.alternate=e,e.alternate=n):(n.pendingProps=t,n.type=e.type,n.flags=0,n.subtreeFlags=0,n.deletions=null),n.flags=e.flags&65011712,n.childLanes=e.childLanes,n.lanes=e.lanes,n.child=e.child,n.memoizedProps=e.memoizedProps,n.memoizedState=e.memoizedState,n.updateQueue=e.updateQueue,t=e.dependencies,n.dependencies=t===null?null:{lanes:t.lanes,firstContext:t.firstContext},n.sibling=e.sibling,n.index=e.index,n.ref=e.ref,n.refCleanup=e.refCleanup,n}function fi(e,t){e.flags&=65011714;var n=e.alternate;return n===null?(e.childLanes=0,e.lanes=t,e.child=null,e.subtreeFlags=0,e.memoizedProps=null,e.memoizedState=null,e.updateQueue=null,e.dependencies=null,e.stateNode=null):(e.childLanes=n.childLanes,e.lanes=n.lanes,e.child=n.child,e.subtreeFlags=0,e.deletions=null,e.memoizedProps=n.memoizedProps,e.memoizedState=n.memoizedState,e.updateQueue=n.updateQueue,e.type=n.type,t=n.dependencies,e.dependencies=t===null?null:{lanes:t.lanes,firstContext:t.firstContext}),e}function pi(e,t,n,r,a,o){var s=0;if(r=e,typeof e==`function`)di(e)&&(s=1);else if(typeof e==`string`)s=Uf(e,n,fe.current)?26:e===`html`||e===`head`||e===`body`?27:5;else a:switch(e){case te:return e=ui(31,n,t,a),e.elementType=te,e.lanes=o,e;case g:return mi(n.children,a,o,t);case _:s=8,a|=24;break;case v:return e=ui(12,n,t,a|2),e.elementType=v,e.lanes=o,e;case S:return e=ui(13,n,t,a),e.elementType=S,e.lanes=o,e;case C:return e=ui(19,n,t,a),e.elementType=C,e.lanes=o,e;default:if(typeof e==`object`&&e)switch(e.$$typeof){case b:s=10;break a;case y:s=9;break a;case x:s=11;break a;case w:s=14;break a;case ee:s=16,r=null;break a}s=29,n=Error(i(130,e===null?`null`:typeof e,``)),r=null}return t=ui(s,n,t,a),t.elementType=e,t.type=r,t.lanes=o,t}function mi(e,t,n,r){return e=ui(7,e,r,t),e.lanes=n,e}function hi(e,t,n){return e=ui(6,e,null,t),e.lanes=n,e}function gi(e){var t=ui(18,null,null,0);return t.stateNode=e,t}function _i(e,t,n){return t=ui(4,e.children===null?[]:e.children,e.key,t),t.lanes=n,t.stateNode={containerInfo:e.containerInfo,pendingChildren:null,implementation:e.implementation},t}var vi=new WeakMap;function yi(e,t){if(typeof e==`object`&&e){var n=vi.get(e);return n===void 0?(t={value:e,source:t,stack:we(t)},vi.set(e,t),t):n}return{value:e,source:t,stack:we(t)}}var bi=[],xi=0,Si=null,Ci=0,wi=[],Ti=0,Ei=null,Di=1,Oi=``;function ki(e,t){bi[xi++]=Ci,bi[xi++]=Si,Si=e,Ci=t}function Ai(e,t,n){wi[Ti++]=Di,wi[Ti++]=Oi,wi[Ti++]=Ei,Ei=e;var r=Di;e=Oi;var i=32-Ve(r)-1;r&=~(1<<i),n+=1;var a=32-Ve(t)+i;if(30<a){var o=i-i%5;a=(r&(1<<o)-1).toString(32),r>>=o,i-=o,Di=1<<32-Ve(t)+i|n<<i|r,Oi=a+e}else Di=1<<a|n<<i|r,Oi=e}function ji(e){e.return!==null&&(ki(e,1),Ai(e,1,0))}function Mi(e){for(;e===Si;)Si=bi[--xi],bi[xi]=null,Ci=bi[--xi],bi[xi]=null;for(;e===Ei;)Ei=wi[--Ti],wi[Ti]=null,Oi=wi[--Ti],wi[Ti]=null,Di=wi[--Ti],wi[Ti]=null}function Ni(e,t){wi[Ti++]=Di,wi[Ti++]=Oi,wi[Ti++]=Ei,Di=t.id,Oi=t.overflow,Ei=e}var Pi=null,Fi=null,R=!1,Ii=null,Li=!1,Ri=Error(i(519));function zi(e){throw Gi(yi(Error(i(418,1<arguments.length&&arguments[1]!==void 0&&arguments[1]?`text`:`HTML`,``)),e)),Ri}function Bi(e){var t=e.stateNode,n=e.type,r=e.memoizedProps;switch(t[ut]=e,t[dt]=r,n){case`dialog`:$(`cancel`,t),$(`close`,t);break;case`iframe`:case`object`:case`embed`:$(`load`,t);break;case`video`:case`audio`:for(n=0;n<gd.length;n++)$(gd[n],t);break;case`source`:$(`error`,t);break;case`img`:case`image`:case`link`:$(`error`,t),$(`load`,t);break;case`details`:$(`toggle`,t);break;case`input`:$(`invalid`,t),Wt(t,r.value,r.defaultValue,r.checked,r.defaultChecked,r.type,r.name,!0);break;case`select`:$(`invalid`,t);break;case`textarea`:$(`invalid`,t),Jt(t,r.value,r.defaultValue,r.children)}n=r.children,typeof n!=`string`&&typeof n!=`number`&&typeof n!=`bigint`||t.textContent===``+n||!0===r.suppressHydrationWarning||jd(t.textContent,n)?(r.popover!=null&&($(`beforetoggle`,t),$(`toggle`,t)),r.onScroll!=null&&$(`scroll`,t),r.onScrollEnd!=null&&$(`scrollend`,t),r.onClick!=null&&(t.onclick=rn),t=!0):t=!1,t||zi(e,!0)}function Vi(e){for(Pi=e.return;Pi;)switch(Pi.tag){case 5:case 31:case 13:Li=!1;return;case 27:case 3:Li=!0;return;default:Pi=Pi.return}}function Hi(e){if(e!==Pi)return!1;if(!R)return Vi(e),R=!0,!1;var t=e.tag,n;if((n=t!==3&&t!==27)&&((n=t===5)&&(n=e.type,n=n===`form`||n===`button`||Ud(e.type,e.memoizedProps)),n=!n),n&&Fi&&zi(e),Vi(e),t===13){if(e=e.memoizedState,e=e===null?null:e.dehydrated,!e)throw Error(i(317));Fi=uf(e)}else if(t===31){if(e=e.memoizedState,e=e===null?null:e.dehydrated,!e)throw Error(i(317));Fi=uf(e)}else t===27?(t=Fi,Zd(e.type)?(e=lf,lf=null,Fi=e):Fi=t):Fi=Pi?cf(e.stateNode.nextSibling):null;return!0}function Ui(){Fi=Pi=null,R=!1}function Wi(){var e=Ii;return e!==null&&(Yl===null?Yl=e:Yl.push.apply(Yl,e),Ii=null),e}function Gi(e){Ii===null?Ii=[e]:Ii.push(e)}var Ki=de(null),qi=null,Ji=null;function Yi(e,t,n){j(Ki,t._currentValue),t._currentValue=n}function Xi(e){e._currentValue=Ki.current,A(Ki)}function Zi(e,t,n){for(;e!==null;){var r=e.alternate;if((e.childLanes&t)===t?r!==null&&(r.childLanes&t)!==t&&(r.childLanes|=t):(e.childLanes|=t,r!==null&&(r.childLanes|=t)),e===n)break;e=e.return}}function Qi(e,t,n,r){var a=e.child;for(a!==null&&(a.return=e);a!==null;){var o=a.dependencies;if(o!==null){var s=a.child;o=o.firstContext;a:for(;o!==null;){var c=o;o=a;for(var l=0;l<t.length;l++)if(c.context===t[l]){o.lanes|=n,c=o.alternate,c!==null&&(c.lanes|=n),Zi(o.return,n,e),r||(s=null);break a}o=c.next}}else if(a.tag===18){if(s=a.return,s===null)throw Error(i(341));s.lanes|=n,o=s.alternate,o!==null&&(o.lanes|=n),Zi(s,n,e),s=null}else s=a.child;if(s!==null)s.return=a;else for(s=a;s!==null;){if(s===e){s=null;break}if(a=s.sibling,a!==null){a.return=s.return,s=a;break}s=s.return}a=s}}function $i(e,t,n,r){e=null;for(var a=t,o=!1;a!==null;){if(!o){if(a.flags&524288)o=!0;else if(a.flags&262144)break}if(a.tag===10){var s=a.alternate;if(s===null)throw Error(i(387));if(s=s.memoizedProps,s!==null){var c=a.type;Tr(a.pendingProps.value,s.value)||(e===null?e=[c]:e.push(c))}}else if(a===N.current){if(s=a.alternate,s===null)throw Error(i(387));s.memoizedState.memoizedState!==a.memoizedState.memoizedState&&(e===null?e=[Qf]:e.push(Qf))}a=a.return}e!==null&&Qi(t,e,n,r),t.flags|=262144}function ea(e){for(e=e.firstContext;e!==null;){if(!Tr(e.context._currentValue,e.memoizedValue))return!0;e=e.next}return!1}function ta(e){qi=e,Ji=null,e=e.dependencies,e!==null&&(e.firstContext=null)}function na(e){return ia(qi,e)}function ra(e,t){return qi===null&&ta(e),ia(e,t)}function ia(e,t){var n=t._currentValue;if(t={context:t,memoizedValue:n,next:null},Ji===null){if(e===null)throw Error(i(308));Ji=t,e.dependencies={lanes:0,firstContext:t},e.flags|=524288}else Ji=Ji.next=t;return n}var aa=typeof AbortController<`u`?AbortController:function(){var e=[],t=this.signal={aborted:!1,addEventListener:function(t,n){e.push(n)}};this.abort=function(){t.aborted=!0,e.forEach(function(e){return e()})}},oa=t.unstable_scheduleCallback,sa=t.unstable_NormalPriority,ca={$$typeof:b,Consumer:null,Provider:null,_currentValue:null,_currentValue2:null,_threadCount:0};function la(){return{controller:new aa,data:new Map,refCount:0}}function ua(e){e.refCount--,e.refCount===0&&oa(sa,function(){e.controller.abort()})}var da=null,fa=0,pa=0,ma=null;function ha(e,t){if(da===null){var n=da=[];fa=0,pa=ud(),ma={status:`pending`,value:void 0,then:function(e){n.push(e)}}}return fa++,t.then(ga,ga),t}function ga(){if(--fa===0&&da!==null){ma!==null&&(ma.status=`fulfilled`);var e=da;da=null,pa=0,ma=null;for(var t=0;t<e.length;t++)(0,e[t])()}}function _a(e,t){var n=[],r={status:`pending`,value:null,reason:null,then:function(e){n.push(e)}};return e.then(function(){r.status=`fulfilled`,r.value=t;for(var e=0;e<n.length;e++)(0,n[e])(t)},function(e){for(r.status=`rejected`,r.reason=e,e=0;e<n.length;e++)(0,n[e])(void 0)}),r}var va=E.S;E.S=function(e,t){Ql=ke(),typeof t==`object`&&t&&typeof t.then==`function`&&ha(e,t),va!==null&&va(e,t)};var ya=de(null);function ba(){var e=ya.current;return e===null?Il.pooledCache:e}function xa(e,t){t===null?j(ya,ya.current):j(ya,t.pool)}function Sa(){var e=ba();return e===null?null:{parent:ca._currentValue,pool:e}}var Ca=Error(i(460)),wa=Error(i(474)),Ta=Error(i(542)),Ea={then:function(){}};function Da(e){return e=e.status,e===`fulfilled`||e===`rejected`}function Oa(e,t,n){switch(n=e[n],n===void 0?e.push(t):n!==t&&(t.then(rn,rn),t=n),t.status){case`fulfilled`:return t.value;case`rejected`:throw e=t.reason,Ma(e),e;default:if(typeof t.status==`string`)t.then(rn,rn);else{if(e=Il,e!==null&&100<e.shellSuspendCounter)throw Error(i(482));e=t,e.status=`pending`,e.then(function(e){if(t.status===`pending`){var n=t;n.status=`fulfilled`,n.value=e}},function(e){if(t.status===`pending`){var n=t;n.status=`rejected`,n.reason=e}})}switch(t.status){case`fulfilled`:return t.value;case`rejected`:throw e=t.reason,Ma(e),e}throw Aa=t,Ca}}function ka(e){try{var t=e._init;return t(e._payload)}catch(e){throw typeof e==`object`&&e&&typeof e.then==`function`?(Aa=e,Ca):e}}var Aa=null;function ja(){if(Aa===null)throw Error(i(459));var e=Aa;return Aa=null,e}function Ma(e){if(e===Ca||e===Ta)throw Error(i(483))}var Na=null,Pa=0;function Fa(e){var t=Pa;return Pa+=1,Na===null&&(Na=[]),Oa(Na,e,t)}function Ia(e,t){t=t.props.ref,e.ref=t===void 0?null:t}function La(e,t){throw t.$$typeof===p?Error(i(525)):(e=Object.prototype.toString.call(t),Error(i(31,e===`[object Object]`?`object with keys {`+Object.keys(t).join(`, `)+`}`:e)))}function Ra(e){function t(t,n){if(e){var r=t.deletions;r===null?(t.deletions=[n],t.flags|=16):r.push(n)}}function n(n,r){if(!e)return null;for(;r!==null;)t(n,r),r=r.sibling;return null}function r(e){for(var t=new Map;e!==null;)e.key===null?t.set(e.index,e):t.set(e.key,e),e=e.sibling;return t}function a(e,t){return e=L(e,t),e.index=0,e.sibling=null,e}function o(t,n,r){return t.index=r,e?(r=t.alternate,r===null?(t.flags|=67108866,n):(r=r.index,r<n?(t.flags|=67108866,n):r)):(t.flags|=1048576,n)}function s(t){return e&&t.alternate===null&&(t.flags|=67108866),t}function c(e,t,n,r){return t===null||t.tag!==6?(t=hi(n,e.mode,r),t.return=e,t):(t=a(t,n),t.return=e,t)}function l(e,t,n,r){var i=n.type;return i===g?d(e,t,n.props.children,r,n.key):t!==null&&(t.elementType===i||typeof i==`object`&&i&&i.$$typeof===ee&&ka(i)===t.type)?(t=a(t,n.props),Ia(t,n),t.return=e,t):(t=pi(n.type,n.key,n.props,null,e.mode,r),Ia(t,n),t.return=e,t)}function u(e,t,n,r){return t===null||t.tag!==4||t.stateNode.containerInfo!==n.containerInfo||t.stateNode.implementation!==n.implementation?(t=_i(n,e.mode,r),t.return=e,t):(t=a(t,n.children||[]),t.return=e,t)}function d(e,t,n,r,i){return t===null||t.tag!==7?(t=mi(n,e.mode,r,i),t.return=e,t):(t=a(t,n),t.return=e,t)}function f(e,t,n){if(typeof t==`string`&&t!==``||typeof t==`number`||typeof t==`bigint`)return t=hi(``+t,e.mode,n),t.return=e,t;if(typeof t==`object`&&t){switch(t.$$typeof){case m:return n=pi(t.type,t.key,t.props,null,e.mode,n),Ia(n,t),n.return=e,n;case h:return t=_i(t,e.mode,n),t.return=e,t;case ee:return t=ka(t),f(e,t,n)}if(T(t)||ie(t))return t=mi(t,e.mode,n,null),t.return=e,t;if(typeof t.then==`function`)return f(e,Fa(t),n);if(t.$$typeof===b)return f(e,ra(e,t),n);La(e,t)}return null}function p(e,t,n,r){var i=t===null?null:t.key;if(typeof n==`string`&&n!==``||typeof n==`number`||typeof n==`bigint`)return i===null?c(e,t,``+n,r):null;if(typeof n==`object`&&n){switch(n.$$typeof){case m:return n.key===i?l(e,t,n,r):null;case h:return n.key===i?u(e,t,n,r):null;case ee:return n=ka(n),p(e,t,n,r)}if(T(n)||ie(n))return i===null?d(e,t,n,r,null):null;if(typeof n.then==`function`)return p(e,t,Fa(n),r);if(n.$$typeof===b)return p(e,t,ra(e,n),r);La(e,n)}return null}function _(e,t,n,r,i){if(typeof r==`string`&&r!==``||typeof r==`number`||typeof r==`bigint`)return e=e.get(n)||null,c(t,e,``+r,i);if(typeof r==`object`&&r){switch(r.$$typeof){case m:return e=e.get(r.key===null?n:r.key)||null,l(t,e,r,i);case h:return e=e.get(r.key===null?n:r.key)||null,u(t,e,r,i);case ee:return r=ka(r),_(e,t,n,r,i)}if(T(r)||ie(r))return e=e.get(n)||null,d(t,e,r,i,null);if(typeof r.then==`function`)return _(e,t,n,Fa(r),i);if(r.$$typeof===b)return _(e,t,n,ra(t,r),i);La(t,r)}return null}function v(i,a,s,c){for(var l=null,u=null,d=a,m=a=0,h=null;d!==null&&m<s.length;m++){d.index>m?(h=d,d=null):h=d.sibling;var g=p(i,d,s[m],c);if(g===null){d===null&&(d=h);break}e&&d&&g.alternate===null&&t(i,d),a=o(g,a,m),u===null?l=g:u.sibling=g,u=g,d=h}if(m===s.length)return n(i,d),R&&ki(i,m),l;if(d===null){for(;m<s.length;m++)d=f(i,s[m],c),d!==null&&(a=o(d,a,m),u===null?l=d:u.sibling=d,u=d);return R&&ki(i,m),l}for(d=r(d);m<s.length;m++)h=_(d,i,m,s[m],c),h!==null&&(e&&h.alternate!==null&&d.delete(h.key===null?m:h.key),a=o(h,a,m),u===null?l=h:u.sibling=h,u=h);return e&&d.forEach(function(e){return t(i,e)}),R&&ki(i,m),l}function y(a,s,c,l){if(c==null)throw Error(i(151));for(var u=null,d=null,m=s,h=s=0,g=null,v=c.next();m!==null&&!v.done;h++,v=c.next()){m.index>h?(g=m,m=null):g=m.sibling;var y=p(a,m,v.value,l);if(y===null){m===null&&(m=g);break}e&&m&&y.alternate===null&&t(a,m),s=o(y,s,h),d===null?u=y:d.sibling=y,d=y,m=g}if(v.done)return n(a,m),R&&ki(a,h),u;if(m===null){for(;!v.done;h++,v=c.next())v=f(a,v.value,l),v!==null&&(s=o(v,s,h),d===null?u=v:d.sibling=v,d=v);return R&&ki(a,h),u}for(m=r(m);!v.done;h++,v=c.next())v=_(m,a,h,v.value,l),v!==null&&(e&&v.alternate!==null&&m.delete(v.key===null?h:v.key),s=o(v,s,h),d===null?u=v:d.sibling=v,d=v);return e&&m.forEach(function(e){return t(a,e)}),R&&ki(a,h),u}function x(e,r,o,c){if(typeof o==`object`&&o&&o.type===g&&o.key===null&&(o=o.props.children),typeof o==`object`&&o){switch(o.$$typeof){case m:a:{for(var l=o.key;r!==null;){if(r.key===l){if(l=o.type,l===g){if(r.tag===7){n(e,r.sibling),c=a(r,o.props.children),c.return=e,e=c;break a}}else if(r.elementType===l||typeof l==`object`&&l&&l.$$typeof===ee&&ka(l)===r.type){n(e,r.sibling),c=a(r,o.props),Ia(c,o),c.return=e,e=c;break a}n(e,r);break}t(e,r),r=r.sibling}o.type===g?(c=mi(o.props.children,e.mode,c,o.key),c.return=e,e=c):(c=pi(o.type,o.key,o.props,null,e.mode,c),Ia(c,o),c.return=e,e=c)}return s(e);case h:a:{for(l=o.key;r!==null;){if(r.key===l){if(r.tag===4&&r.stateNode.containerInfo===o.containerInfo&&r.stateNode.implementation===o.implementation){n(e,r.sibling),c=a(r,o.children||[]),c.return=e,e=c;break a}n(e,r);break}t(e,r),r=r.sibling}c=_i(o,e.mode,c),c.return=e,e=c}return s(e);case ee:return o=ka(o),x(e,r,o,c)}if(T(o))return v(e,r,o,c);if(ie(o)){if(l=ie(o),typeof l!=`function`)throw Error(i(150));return o=l.call(o),y(e,r,o,c)}if(typeof o.then==`function`)return x(e,r,Fa(o),c);if(o.$$typeof===b)return x(e,r,ra(e,o),c);La(e,o)}return typeof o==`string`&&o!==``||typeof o==`number`||typeof o==`bigint`?(o=``+o,r!==null&&r.tag===6?(n(e,r.sibling),c=a(r,o),c.return=e,e=c):(n(e,r),c=hi(o,e.mode,c),c.return=e,e=c),s(e)):n(e,r)}return function(e,t,n,r){try{Pa=0;var i=x(e,t,n,r);return Na=null,i}catch(t){if(t===Ca||t===Ta)throw t;var a=ui(29,t,null,e.mode);return a.lanes=r,a.return=e,a}}}var za=Ra(!0),Ba=Ra(!1),Va=!1;function Ha(e){e.updateQueue={baseState:e.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,lanes:0,hiddenCallbacks:null},callbacks:null}}function Ua(e,t){e=e.updateQueue,t.updateQueue===e&&(t.updateQueue={baseState:e.baseState,firstBaseUpdate:e.firstBaseUpdate,lastBaseUpdate:e.lastBaseUpdate,shared:e.shared,callbacks:null})}function Wa(e){return{lane:e,tag:0,payload:null,callback:null,next:null}}function Ga(e,t,n){var r=e.updateQueue;if(r===null)return null;if(r=r.shared,Y&2){var i=r.pending;return i===null?t.next=t:(t.next=i.next,i.next=t),r.pending=t,t=si(e),oi(e,null,n),t}return ri(e,r,t,n),si(e)}function Ka(e,t,n){if(t=t.updateQueue,t!==null&&(t=t.shared,n&4194048)){var r=t.lanes;r&=e.pendingLanes,n|=r,t.lanes=n,rt(e,n)}}function qa(e,t){var n=e.updateQueue,r=e.alternate;if(r!==null&&(r=r.updateQueue,n===r)){var i=null,a=null;if(n=n.firstBaseUpdate,n!==null){do{var o={lane:n.lane,tag:n.tag,payload:n.payload,callback:null,next:null};a===null?i=a=o:a=a.next=o,n=n.next}while(n!==null);a===null?i=a=t:a=a.next=t}else i=a=t;n={baseState:r.baseState,firstBaseUpdate:i,lastBaseUpdate:a,shared:r.shared,callbacks:r.callbacks},e.updateQueue=n;return}e=n.lastBaseUpdate,e===null?n.firstBaseUpdate=t:e.next=t,n.lastBaseUpdate=t}var Ja=!1;function Ya(){if(Ja){var e=ma;if(e!==null)throw e}}function Xa(e,t,n,r){Ja=!1;var i=e.updateQueue;Va=!1;var a=i.firstBaseUpdate,o=i.lastBaseUpdate,s=i.shared.pending;if(s!==null){i.shared.pending=null;var c=s,l=c.next;c.next=null,o===null?a=l:o.next=l,o=c;var u=e.alternate;u!==null&&(u=u.updateQueue,s=u.lastBaseUpdate,s!==o&&(s===null?u.firstBaseUpdate=l:s.next=l,u.lastBaseUpdate=c))}if(a!==null){var d=i.baseState;o=0,u=l=c=null,s=a;do{var p=s.lane&-536870913,m=p!==s.lane;if(m?(Z&p)===p:(r&p)===p){p!==0&&p===pa&&(Ja=!0),u!==null&&(u=u.next={lane:0,tag:s.tag,payload:s.payload,callback:null,next:null});a:{var h=e,g=s;p=t;var _=n;switch(g.tag){case 1:if(h=g.payload,typeof h==`function`){d=h.call(_,d,p);break a}d=h;break a;case 3:h.flags=h.flags&-65537|128;case 0:if(h=g.payload,p=typeof h==`function`?h.call(_,d,p):h,p==null)break a;d=f({},d,p);break a;case 2:Va=!0}}p=s.callback,p!==null&&(e.flags|=64,m&&(e.flags|=8192),m=i.callbacks,m===null?i.callbacks=[p]:m.push(p))}else m={lane:p,tag:s.tag,payload:s.payload,callback:s.callback,next:null},u===null?(l=u=m,c=d):u=u.next=m,o|=p;if(s=s.next,s===null){if(s=i.shared.pending,s===null)break;m=s,s=m.next,m.next=null,i.lastBaseUpdate=m,i.shared.pending=null}}while(1);u===null&&(c=d),i.baseState=c,i.firstBaseUpdate=l,i.lastBaseUpdate=u,a===null&&(i.shared.lanes=0),Ul|=o,e.lanes=o,e.memoizedState=d}}function Za(e,t){if(typeof e!=`function`)throw Error(i(191,e));e.call(t)}function Qa(e,t){var n=e.callbacks;if(n!==null)for(e.callbacks=null,e=0;e<n.length;e++)Za(n[e],t)}var $a=de(null),eo=de(0);function to(e,t){e=Vl,j(eo,e),j($a,t),Vl=e|t.baseLanes}function no(){j(eo,Vl),j($a,$a.current)}function ro(){Vl=eo.current,A($a),A(eo)}var io=de(null),ao=null;function oo(e){var t=e.alternate;j(fo,fo.current&1),j(io,e),ao===null&&(t===null||$a.current!==null||t.memoizedState!==null)&&(ao=e)}function so(e){j(fo,fo.current),j(io,e),ao===null&&(ao=e)}function co(e){e.tag===22?(j(fo,fo.current),j(io,e),ao===null&&(ao=e)):lo(e)}function lo(){j(fo,fo.current),j(io,io.current)}function uo(e){A(io),ao===e&&(ao=null),A(fo)}var fo=de(0);function po(e){for(var t=e;t!==null;){if(t.tag===13){var n=t.memoizedState;if(n!==null&&(n=n.dehydrated,n===null||af(n)||of(n)))return t}else if(t.tag===19&&(t.memoizedProps.revealOrder===`forwards`||t.memoizedProps.revealOrder===`backwards`||t.memoizedProps.revealOrder===`unstable_legacy-backwards`||t.memoizedProps.revealOrder===`together`)){if(t.flags&128)return t}else if(t.child!==null){t.child.return=t,t=t.child;continue}if(t===e)break;for(;t.sibling===null;){if(t.return===null||t.return===e)return null;t=t.return}t.sibling.return=t.return,t=t.sibling}return null}var mo=0,z=null,B=null,V=null,ho=!1,go=!1,_o=!1,vo=0,yo=0,bo=null,xo=0;function So(){throw Error(i(321))}function Co(e,t){if(t===null)return!1;for(var n=0;n<t.length&&n<e.length;n++)if(!Tr(e[n],t[n]))return!1;return!0}function wo(e,t,n,r,i,a){return mo=a,z=t,t.memoizedState=null,t.updateQueue=null,t.lanes=0,E.H=e===null||e.memoizedState===null?Rs:zs,_o=!1,a=n(r,i),_o=!1,go&&(a=Eo(t,n,r,i)),To(e),a}function To(e){E.H=Ls;var t=B!==null&&B.next!==null;if(mo=0,V=B=z=null,ho=!1,yo=0,bo=null,t)throw Error(i(300));e===null||Qs||(e=e.dependencies,e!==null&&ea(e)&&(Qs=!0))}function Eo(e,t,n,r){z=e;var a=0;do{if(go&&(bo=null),yo=0,go=!1,25<=a)throw Error(i(301));if(a+=1,V=B=null,e.updateQueue!=null){var o=e.updateQueue;o.lastEffect=null,o.events=null,o.stores=null,o.memoCache!=null&&(o.memoCache.index=0)}E.H=G,o=t(n,r)}while(go);return o}function Do(){var e=E.H,t=e.useState()[0];return t=typeof t.then==`function`?Po(t):t,e=e.useState()[0],(B===null?null:B.memoizedState)!==e&&(z.flags|=1024),t}function Oo(){var e=vo!==0;return vo=0,e}function ko(e,t,n){t.updateQueue=e.updateQueue,t.flags&=-2053,e.lanes&=~n}function Ao(e){if(ho){for(e=e.memoizedState;e!==null;){var t=e.queue;t!==null&&(t.pending=null),e=e.next}ho=!1}mo=0,V=B=z=null,go=!1,yo=vo=0,bo=null}function jo(){var e={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return V===null?z.memoizedState=V=e:V=V.next=e,V}function Mo(){if(B===null){var e=z.alternate;e=e===null?null:e.memoizedState}else e=B.next;var t=V===null?z.memoizedState:V.next;if(t!==null)V=t,B=e;else{if(e===null)throw z.alternate===null?Error(i(467)):Error(i(310));B=e,e={memoizedState:B.memoizedState,baseState:B.baseState,baseQueue:B.baseQueue,queue:B.queue,next:null},V===null?z.memoizedState=V=e:V=V.next=e}return V}function No(){return{lastEffect:null,events:null,stores:null,memoCache:null}}function Po(e){var t=yo;return yo+=1,bo===null&&(bo=[]),e=Oa(bo,e,t),t=z,(V===null?t.memoizedState:V.next)===null&&(t=t.alternate,E.H=t===null||t.memoizedState===null?Rs:zs),e}function H(e){if(typeof e==`object`&&e){if(typeof e.then==`function`)return Po(e);if(e.$$typeof===b)return na(e)}throw Error(i(438,String(e)))}function Fo(e){var t=null,n=z.updateQueue;if(n!==null&&(t=n.memoCache),t==null){var r=z.alternate;r!==null&&(r=r.updateQueue,r!==null&&(r=r.memoCache,r!=null&&(t={data:r.data.map(function(e){return e.slice()}),index:0})))}if(t??={data:[],index:0},n===null&&(n=No(),z.updateQueue=n),n.memoCache=t,n=t.data[t.index],n===void 0)for(n=t.data[t.index]=Array(e),r=0;r<e;r++)n[r]=ne;return t.index++,n}function Io(e,t){return typeof t==`function`?t(e):t}function Lo(e){return U(Mo(),B,e)}function U(e,t,n){var r=e.queue;if(r===null)throw Error(i(311));r.lastRenderedReducer=n;var a=e.baseQueue,o=r.pending;if(o!==null){if(a!==null){var s=a.next;a.next=o.next,o.next=s}t.baseQueue=a=o,r.pending=null}if(o=e.baseState,a===null)e.memoizedState=o;else{t=a.next;var c=s=null,l=null,u=t,d=!1;do{var f=u.lane&-536870913;if(f===u.lane?(mo&f)===f:(Z&f)===f){var p=u.revertLane;if(p===0)l!==null&&(l=l.next={lane:0,revertLane:0,gesture:null,action:u.action,hasEagerState:u.hasEagerState,eagerState:u.eagerState,next:null}),f===pa&&(d=!0);else if((mo&p)===p){u=u.next,p===pa&&(d=!0);continue}else f={lane:0,revertLane:u.revertLane,gesture:null,action:u.action,hasEagerState:u.hasEagerState,eagerState:u.eagerState,next:null},l===null?(c=l=f,s=o):l=l.next=f,z.lanes|=p,Ul|=p;f=u.action,_o&&n(o,f),o=u.hasEagerState?u.eagerState:n(o,f)}else p={lane:f,revertLane:u.revertLane,gesture:u.gesture,action:u.action,hasEagerState:u.hasEagerState,eagerState:u.eagerState,next:null},l===null?(c=l=p,s=o):l=l.next=p,z.lanes|=f,Ul|=f;u=u.next}while(u!==null&&u!==t);if(l===null?s=o:l.next=c,!Tr(o,e.memoizedState)&&(Qs=!0,d&&(n=ma,n!==null)))throw n;e.memoizedState=o,e.baseState=s,e.baseQueue=l,r.lastRenderedState=o}return a===null&&(r.lanes=0),[e.memoizedState,r.dispatch]}function Ro(e){var t=Mo(),n=t.queue;if(n===null)throw Error(i(311));n.lastRenderedReducer=e;var r=n.dispatch,a=n.pending,o=t.memoizedState;if(a!==null){n.pending=null;var s=a=a.next;do o=e(o,s.action),s=s.next;while(s!==a);Tr(o,t.memoizedState)||(Qs=!0),t.memoizedState=o,t.baseQueue===null&&(t.baseState=o),n.lastRenderedState=o}return[o,r]}function zo(e,t,n){var r=z,a=Mo(),o=R;if(o){if(n===void 0)throw Error(i(407));n=n()}else n=t();var s=!Tr((B||a).memoizedState,n);if(s&&(a.memoizedState=n,Qs=!0),a=a.queue,us(Ho.bind(null,r,a,e),[e]),a.getSnapshot!==t||s||V!==null&&V.memoizedState.tag&1){if(r.flags|=2048,as(9,{destroy:void 0},Vo.bind(null,r,a,n,t),null),Il===null)throw Error(i(349));o||mo&127||Bo(r,t,n)}return n}function Bo(e,t,n){e.flags|=16384,e={getSnapshot:t,value:n},t=z.updateQueue,t===null?(t=No(),z.updateQueue=t,t.stores=[e]):(n=t.stores,n===null?t.stores=[e]:n.push(e))}function Vo(e,t,n,r){t.value=n,t.getSnapshot=r,Uo(t)&&Wo(e)}function Ho(e,t,n){return n(function(){Uo(t)&&Wo(e)})}function Uo(e){var t=e.getSnapshot;e=e.value;try{var n=t();return!Tr(e,n)}catch{return!0}}function Wo(e){var t=ai(e,2);t!==null&&pu(t,e,2)}function Go(e){var t=jo();if(typeof e==`function`){var n=e;if(e=n(),_o){Be(!0);try{n()}finally{Be(!1)}}}return t.memoizedState=t.baseState=e,t.queue={pending:null,lanes:0,dispatch:null,lastRenderedReducer:Io,lastRenderedState:e},t}function Ko(e,t,n,r){return e.baseState=n,U(e,B,typeof r==`function`?r:Io)}function qo(e,t,n,r,a){if(Ps(e))throw Error(i(485));if(e=t.action,e!==null){var o={payload:a,action:e,next:null,isTransition:!0,status:`pending`,value:null,reason:null,listeners:[],then:function(e){o.listeners.push(e)}};E.T===null?o.isTransition=!1:n(!0),r(o),n=t.pending,n===null?(o.next=t.pending=o,Jo(t,o)):(o.next=n.next,t.pending=n.next=o)}}function Jo(e,t){var n=t.action,r=t.payload,i=e.state;if(t.isTransition){var a=E.T,o={};E.T=o;try{var s=n(i,r),c=E.S;c!==null&&c(o,s),Yo(e,t,s)}catch(n){Zo(e,t,n)}finally{a!==null&&o.types!==null&&(a.types=o.types),E.T=a}}else try{a=n(i,r),Yo(e,t,a)}catch(n){Zo(e,t,n)}}function Yo(e,t,n){typeof n==`object`&&n&&typeof n.then==`function`?n.then(function(n){Xo(e,t,n)},function(n){return Zo(e,t,n)}):Xo(e,t,n)}function Xo(e,t,n){t.status=`fulfilled`,t.value=n,Qo(t),e.state=n,t=e.pending,t!==null&&(n=t.next,n===t?e.pending=null:(n=n.next,t.next=n,Jo(e,n)))}function Zo(e,t,n){var r=e.pending;if(e.pending=null,r!==null){r=r.next;do t.status=`rejected`,t.reason=n,Qo(t),t=t.next;while(t!==r)}e.action=null}function Qo(e){e=e.listeners;for(var t=0;t<e.length;t++)(0,e[t])()}function $o(e,t){return t}function es(e,t){if(R){var n=Il.formState;if(n!==null){a:{var r=z;if(R){if(Fi){b:{for(var i=Fi,a=Li;i.nodeType!==8;){if(!a){i=null;break b}if(i=cf(i.nextSibling),i===null){i=null;break b}}a=i.data,i=a===`F!`||a===`F`?i:null}if(i){Fi=cf(i.nextSibling),r=i.data===`F!`;break a}}zi(r)}r=!1}r&&(t=n[0])}}return n=jo(),n.memoizedState=n.baseState=t,r={pending:null,lanes:0,dispatch:null,lastRenderedReducer:$o,lastRenderedState:t},n.queue=r,n=js.bind(null,z,r),r.dispatch=n,r=Go(!1),a=Ns.bind(null,z,!1,r.queue),r=jo(),i={state:t,dispatch:null,action:e,pending:null},r.queue=i,n=qo.bind(null,z,i,a,n),i.dispatch=n,r.memoizedState=e,[t,n,!1]}function ts(e){return ns(Mo(),B,e)}function ns(e,t,n){if(t=U(e,t,$o)[0],e=Lo(Io)[0],typeof t==`object`&&t&&typeof t.then==`function`)try{var r=Po(t)}catch(e){throw e===Ca?Ta:e}else r=t;t=Mo();var i=t.queue,a=i.dispatch;return n!==t.memoizedState&&(z.flags|=2048,as(9,{destroy:void 0},rs.bind(null,i,n),null)),[r,a,e]}function rs(e,t){e.action=t}function is(e){var t=Mo(),n=B;if(n!==null)return ns(t,n,e);Mo(),t=t.memoizedState,n=Mo();var r=n.queue.dispatch;return n.memoizedState=e,[t,r,!1]}function as(e,t,n,r){return e={tag:e,create:n,deps:r,inst:t,next:null},t=z.updateQueue,t===null&&(t=No(),z.updateQueue=t),n=t.lastEffect,n===null?t.lastEffect=e.next=e:(r=n.next,n.next=e,e.next=r,t.lastEffect=e),e}function os(){return Mo().memoizedState}function ss(e,t,n,r){var i=jo();z.flags|=e,i.memoizedState=as(1|t,{destroy:void 0},n,r===void 0?null:r)}function cs(e,t,n,r){var i=Mo();r=r===void 0?null:r;var a=i.memoizedState.inst;B!==null&&r!==null&&Co(r,B.memoizedState.deps)?i.memoizedState=as(t,a,n,r):(z.flags|=e,i.memoizedState=as(1|t,a,n,r))}function ls(e,t){ss(8390656,8,e,t)}function us(e,t){cs(2048,8,e,t)}function ds(e){z.flags|=4;var t=z.updateQueue;if(t===null)t=No(),z.updateQueue=t,t.events=[e];else{var n=t.events;n===null?t.events=[e]:n.push(e)}}function fs(e){var t=Mo().memoizedState;return ds({ref:t,nextImpl:e}),function(){if(Y&2)throw Error(i(440));return t.impl.apply(void 0,arguments)}}function ps(e,t){return cs(4,2,e,t)}function ms(e,t){return cs(4,4,e,t)}function hs(e,t){if(typeof t==`function`){e=e();var n=t(e);return function(){typeof n==`function`?n():t(null)}}if(t!=null)return e=e(),t.current=e,function(){t.current=null}}function gs(e,t,n){n=n==null?null:n.concat([e]),cs(4,4,hs.bind(null,t,e),n)}function _s(){}function vs(e,t){var n=Mo();t=t===void 0?null:t;var r=n.memoizedState;return t!==null&&Co(t,r[1])?r[0]:(n.memoizedState=[e,t],e)}function ys(e,t){var n=Mo();t=t===void 0?null:t;var r=n.memoizedState;if(t!==null&&Co(t,r[1]))return r[0];if(r=e(),_o){Be(!0);try{e()}finally{Be(!1)}}return n.memoizedState=[r,t],r}function bs(e,t,n){return n===void 0||mo&1073741824&&!(Z&261930)?e.memoizedState=t:(e.memoizedState=n,e=fu(),z.lanes|=e,Ul|=e,n)}function xs(e,t,n,r){return Tr(n,t)?n:$a.current===null?!(mo&42)||mo&1073741824&&!(Z&261930)?(Qs=!0,e.memoizedState=n):(e=fu(),z.lanes|=e,Ul|=e,t):(e=bs(e,n,r),Tr(e,t)||(Qs=!0),e)}function Ss(e,t,n,r,i){var a=D.p;D.p=a!==0&&8>a?a:8;var o=E.T,s={};E.T=s,Ns(e,!1,t,n);try{var c=i(),l=E.S;l!==null&&l(s,c),typeof c==`object`&&c&&typeof c.then==`function`?Ms(e,t,_a(c,r),du(e)):Ms(e,t,r,du(e))}catch(n){Ms(e,t,{then:function(){},status:`rejected`,reason:n},du())}finally{D.p=a,o!==null&&s.types!==null&&(o.types=s.types),E.T=o}}function Cs(){}function ws(e,t,n,r){if(e.tag!==5)throw Error(i(476));var a=Ts(e).queue;Ss(e,a,t,ue,n===null?Cs:function(){return Es(e),n(r)})}function Ts(e){var t=e.memoizedState;if(t!==null)return t;t={memoizedState:ue,baseState:ue,baseQueue:null,queue:{pending:null,lanes:0,dispatch:null,lastRenderedReducer:Io,lastRenderedState:ue},next:null};var n={};return t.next={memoizedState:n,baseState:n,baseQueue:null,queue:{pending:null,lanes:0,dispatch:null,lastRenderedReducer:Io,lastRenderedState:n},next:null},e.memoizedState=t,e=e.alternate,e!==null&&(e.memoizedState=t),t}function Es(e){var t=Ts(e);t.next===null&&(t=e.alternate.memoizedState),Ms(e,t.next.queue,{},du())}function W(){return na(Qf)}function Ds(){return Mo().memoizedState}function Os(){return Mo().memoizedState}function ks(e){for(var t=e.return;t!==null;){switch(t.tag){case 24:case 3:var n=du();e=Wa(n);var r=Ga(t,e,n);r!==null&&(pu(r,t,n),Ka(r,t,n)),t={cache:la()},e.payload=t;return}t=t.return}}function As(e,t,n){var r=du();n={lane:r,revertLane:0,gesture:null,action:n,hasEagerState:!1,eagerState:null,next:null},Ps(e)?Fs(t,n):(n=ii(e,t,n,r),n!==null&&(pu(n,e,r),Is(n,t,r)))}function js(e,t,n){Ms(e,t,n,du())}function Ms(e,t,n,r){var i={lane:r,revertLane:0,gesture:null,action:n,hasEagerState:!1,eagerState:null,next:null};if(Ps(e))Fs(t,i);else{var a=e.alternate;if(e.lanes===0&&(a===null||a.lanes===0)&&(a=t.lastRenderedReducer,a!==null))try{var o=t.lastRenderedState,s=a(o,n);if(i.hasEagerState=!0,i.eagerState=s,Tr(s,o))return ri(e,t,i,0),Il===null&&ni(),!1}catch{}if(n=ii(e,t,i,r),n!==null)return pu(n,e,r),Is(n,t,r),!0}return!1}function Ns(e,t,n,r){if(r={lane:2,revertLane:ud(),gesture:null,action:r,hasEagerState:!1,eagerState:null,next:null},Ps(e)){if(t)throw Error(i(479))}else t=ii(e,n,r,2),t!==null&&pu(t,e,2)}function Ps(e){var t=e.alternate;return e===z||t!==null&&t===z}function Fs(e,t){go=ho=!0;var n=e.pending;n===null?t.next=t:(t.next=n.next,n.next=t),e.pending=t}function Is(e,t,n){if(n&4194048){var r=t.lanes;r&=e.pendingLanes,n|=r,t.lanes=n,rt(e,n)}}var Ls={readContext:na,use:H,useCallback:So,useContext:So,useEffect:So,useImperativeHandle:So,useLayoutEffect:So,useInsertionEffect:So,useMemo:So,useReducer:So,useRef:So,useState:So,useDebugValue:So,useDeferredValue:So,useTransition:So,useSyncExternalStore:So,useId:So,useHostTransitionStatus:So,useFormState:So,useActionState:So,useOptimistic:So,useMemoCache:So,useCacheRefresh:So};Ls.useEffectEvent=So;var Rs={readContext:na,use:H,useCallback:function(e,t){return jo().memoizedState=[e,t===void 0?null:t],e},useContext:na,useEffect:ls,useImperativeHandle:function(e,t,n){n=n==null?null:n.concat([e]),ss(4194308,4,hs.bind(null,t,e),n)},useLayoutEffect:function(e,t){return ss(4194308,4,e,t)},useInsertionEffect:function(e,t){ss(4,2,e,t)},useMemo:function(e,t){var n=jo();t=t===void 0?null:t;var r=e();if(_o){Be(!0);try{e()}finally{Be(!1)}}return n.memoizedState=[r,t],r},useReducer:function(e,t,n){var r=jo();if(n!==void 0){var i=n(t);if(_o){Be(!0);try{n(t)}finally{Be(!1)}}}else i=t;return r.memoizedState=r.baseState=i,e={pending:null,lanes:0,dispatch:null,lastRenderedReducer:e,lastRenderedState:i},r.queue=e,e=e.dispatch=As.bind(null,z,e),[r.memoizedState,e]},useRef:function(e){var t=jo();return e={current:e},t.memoizedState=e},useState:function(e){e=Go(e);var t=e.queue,n=js.bind(null,z,t);return t.dispatch=n,[e.memoizedState,n]},useDebugValue:_s,useDeferredValue:function(e,t){return bs(jo(),e,t)},useTransition:function(){var e=Go(!1);return e=Ss.bind(null,z,e.queue,!0,!1),jo().memoizedState=e,[!1,e]},useSyncExternalStore:function(e,t,n){var r=z,a=jo();if(R){if(n===void 0)throw Error(i(407));n=n()}else{if(n=t(),Il===null)throw Error(i(349));Z&127||Bo(r,t,n)}a.memoizedState=n;var o={value:n,getSnapshot:t};return a.queue=o,ls(Ho.bind(null,r,o,e),[e]),r.flags|=2048,as(9,{destroy:void 0},Vo.bind(null,r,o,n,t),null),n},useId:function(){var e=jo(),t=Il.identifierPrefix;if(R){var n=Oi,r=Di;n=(r&~(1<<32-Ve(r)-1)).toString(32)+n,t=`_`+t+`R_`+n,n=vo++,0<n&&(t+=`H`+n.toString(32)),t+=`_`}else n=xo++,t=`_`+t+`r_`+n.toString(32)+`_`;return e.memoizedState=t},useHostTransitionStatus:W,useFormState:es,useActionState:es,useOptimistic:function(e){var t=jo();t.memoizedState=t.baseState=e;var n={pending:null,lanes:0,dispatch:null,lastRenderedReducer:null,lastRenderedState:null};return t.queue=n,t=Ns.bind(null,z,!0,n),n.dispatch=t,[e,t]},useMemoCache:Fo,useCacheRefresh:function(){return jo().memoizedState=ks.bind(null,z)},useEffectEvent:function(e){var t=jo(),n={impl:e};return t.memoizedState=n,function(){if(Y&2)throw Error(i(440));return n.impl.apply(void 0,arguments)}}},zs={readContext:na,use:H,useCallback:vs,useContext:na,useEffect:us,useImperativeHandle:gs,useInsertionEffect:ps,useLayoutEffect:ms,useMemo:ys,useReducer:Lo,useRef:os,useState:function(){return Lo(Io)},useDebugValue:_s,useDeferredValue:function(e,t){return xs(Mo(),B.memoizedState,e,t)},useTransition:function(){var e=Lo(Io)[0],t=Mo().memoizedState;return[typeof e==`boolean`?e:Po(e),t]},useSyncExternalStore:zo,useId:Ds,useHostTransitionStatus:W,useFormState:ts,useActionState:ts,useOptimistic:function(e,t){return Ko(Mo(),B,e,t)},useMemoCache:Fo,useCacheRefresh:Os};zs.useEffectEvent=fs;var G={readContext:na,use:H,useCallback:vs,useContext:na,useEffect:us,useImperativeHandle:gs,useInsertionEffect:ps,useLayoutEffect:ms,useMemo:ys,useReducer:Ro,useRef:os,useState:function(){return Ro(Io)},useDebugValue:_s,useDeferredValue:function(e,t){var n=Mo();return B===null?bs(n,e,t):xs(n,B.memoizedState,e,t)},useTransition:function(){var e=Ro(Io)[0],t=Mo().memoizedState;return[typeof e==`boolean`?e:Po(e),t]},useSyncExternalStore:zo,useId:Ds,useHostTransitionStatus:W,useFormState:is,useActionState:is,useOptimistic:function(e,t){var n=Mo();return B===null?(n.baseState=e,[e,n.queue.dispatch]):Ko(n,B,e,t)},useMemoCache:Fo,useCacheRefresh:Os};G.useEffectEvent=fs;function K(e,t,n,r){t=e.memoizedState,n=n(r,t),n=n==null?t:f({},t,n),e.memoizedState=n,e.lanes===0&&(e.updateQueue.baseState=n)}var Bs={enqueueSetState:function(e,t,n){e=e._reactInternals;var r=du(),i=Wa(r);i.payload=t,n!=null&&(i.callback=n),t=Ga(e,i,r),t!==null&&(pu(t,e,r),Ka(t,e,r))},enqueueReplaceState:function(e,t,n){e=e._reactInternals;var r=du(),i=Wa(r);i.tag=1,i.payload=t,n!=null&&(i.callback=n),t=Ga(e,i,r),t!==null&&(pu(t,e,r),Ka(t,e,r))},enqueueForceUpdate:function(e,t){e=e._reactInternals;var n=du(),r=Wa(n);r.tag=2,t!=null&&(r.callback=t),t=Ga(e,r,n),t!==null&&(pu(t,e,n),Ka(t,e,n))}};function Vs(e,t,n,r,i,a,o){return e=e.stateNode,typeof e.shouldComponentUpdate==`function`?e.shouldComponentUpdate(r,a,o):t.prototype&&t.prototype.isPureReactComponent?!Er(n,r)||!Er(i,a):!0}function Hs(e,t,n,r){e=t.state,typeof t.componentWillReceiveProps==`function`&&t.componentWillReceiveProps(n,r),typeof t.UNSAFE_componentWillReceiveProps==`function`&&t.UNSAFE_componentWillReceiveProps(n,r),t.state!==e&&Bs.enqueueReplaceState(t,t.state,null)}function q(e,t){var n=t;if(`ref`in t)for(var r in n={},t)r!==`ref`&&(n[r]=t[r]);if(e=e.defaultProps)for(var i in n===t&&(n=f({},n)),e)n[i]===void 0&&(n[i]=e[i]);return n}function J(e){$r(e)}function Us(e){console.error(e)}function Ws(e){$r(e)}function Gs(e,t){try{var n=e.onUncaughtError;n(t.value,{componentStack:t.stack})}catch(e){setTimeout(function(){throw e})}}function Ks(e,t,n){try{var r=e.onCaughtError;r(n.value,{componentStack:n.stack,errorBoundary:t.tag===1?t.stateNode:null})}catch(e){setTimeout(function(){throw e})}}function qs(e,t,n){return n=Wa(n),n.tag=3,n.payload={element:null},n.callback=function(){Gs(e,t)},n}function Js(e){return e=Wa(e),e.tag=3,e}function Ys(e,t,n,r){var i=n.type.getDerivedStateFromError;if(typeof i==`function`){var a=r.value;e.payload=function(){return i(a)},e.callback=function(){Ks(t,n,r)}}var o=n.stateNode;o!==null&&typeof o.componentDidCatch==`function`&&(e.callback=function(){Ks(t,n,r),typeof i!=`function`&&(tu===null?tu=new Set([this]):tu.add(this));var e=r.stack;this.componentDidCatch(r.value,{componentStack:e===null?``:e})})}function Xs(e,t,n,r,a){if(n.flags|=32768,typeof r==`object`&&r&&typeof r.then==`function`){if(t=n.alternate,t!==null&&$i(t,n,a,!0),n=io.current,n!==null){switch(n.tag){case 31:case 13:return ao===null?Tu():n.alternate===null&&Hl===0&&(Hl=3),n.flags&=-257,n.flags|=65536,n.lanes=a,r===Ea?n.flags|=16384:(t=n.updateQueue,t===null?n.updateQueue=new Set([r]):t.add(r),Wu(e,r,a)),!1;case 22:return n.flags|=65536,r===Ea?n.flags|=16384:(t=n.updateQueue,t===null?(t={transitions:null,markerInstances:null,retryQueue:new Set([r])},n.updateQueue=t):(n=t.retryQueue,n===null?t.retryQueue=new Set([r]):n.add(r)),Wu(e,r,a)),!1}throw Error(i(435,n.tag))}return Wu(e,r,a),Tu(),!1}if(R)return t=io.current,t===null?(r!==Ri&&(t=Error(i(423),{cause:r}),Gi(yi(t,n))),e=e.current.alternate,e.flags|=65536,a&=-a,e.lanes|=a,r=yi(r,n),a=qs(e.stateNode,r,a),qa(e,a),Hl!==4&&(Hl=2)):(!(t.flags&65536)&&(t.flags|=256),t.flags|=65536,t.lanes=a,r!==Ri&&(e=Error(i(422),{cause:r}),Gi(yi(e,n)))),!1;var o=Error(i(520),{cause:r});if(o=yi(o,n),Jl===null?Jl=[o]:Jl.push(o),Hl!==4&&(Hl=2),t===null)return!0;r=yi(r,n),n=t;do{switch(n.tag){case 3:return n.flags|=65536,e=a&-a,n.lanes|=e,e=qs(n.stateNode,r,e),qa(n,e),!1;case 1:if(t=n.type,o=n.stateNode,!(n.flags&128)&&(typeof t.getDerivedStateFromError==`function`||o!==null&&typeof o.componentDidCatch==`function`&&(tu===null||!tu.has(o))))return n.flags|=65536,a&=-a,n.lanes|=a,a=Js(a),Ys(a,e,n,r),qa(n,a),!1}n=n.return}while(n!==null);return!1}var Zs=Error(i(461)),Qs=!1;function $s(e,t,n,r){t.child=e===null?Ba(t,null,n,r):za(t,e.child,n,r)}function ec(e,t,n,r,i){n=n.render;var a=t.ref;if(`ref`in r){var o={};for(var s in r)s!==`ref`&&(o[s]=r[s])}else o=r;return ta(t),r=wo(e,t,n,o,a,i),s=Oo(),e!==null&&!Qs?(ko(e,t,i),wc(e,t,i)):(R&&s&&ji(t),t.flags|=1,$s(e,t,r,i),t.child)}function tc(e,t,n,r,i){if(e===null){var a=n.type;return typeof a==`function`&&!di(a)&&a.defaultProps===void 0&&n.compare===null?(t.tag=15,t.type=a,nc(e,t,a,r,i)):(e=pi(n.type,null,r,t,t.mode,i),e.ref=t.ref,e.return=t,t.child=e)}if(a=e.child,!Tc(e,i)){var o=a.memoizedProps;if(n=n.compare,n=n===null?Er:n,n(o,r)&&e.ref===t.ref)return wc(e,t,i)}return t.flags|=1,e=L(a,r),e.ref=t.ref,e.return=t,t.child=e}function nc(e,t,n,r,i){if(e!==null){var a=e.memoizedProps;if(Er(a,r)&&e.ref===t.ref){if(Qs=!1,t.pendingProps=r=a,Tc(e,i))e.flags&131072&&(Qs=!0);else return t.lanes=e.lanes,wc(e,t,i)}}return uc(e,t,n,r,i)}function rc(e,t,n,r){var i=r.children,a=e===null?null:e.memoizedState;if(e===null&&t.stateNode===null&&(t.stateNode={_visibility:1,_pendingMarkers:null,_retryCache:null,_transitions:null}),r.mode===`hidden`){if(t.flags&128){if(a=a===null?n:a.baseLanes|n,e!==null){for(r=t.child=e.child,i=0;r!==null;)i=i|r.lanes|r.childLanes,r=r.sibling;r=i&~a}else r=0,t.child=null;return ac(e,t,a,n,r)}if(n&536870912)t.memoizedState={baseLanes:0,cachePool:null},e!==null&&xa(t,a===null?null:a.cachePool),a===null?no():to(t,a),co(t);else return r=t.lanes=536870912,ac(e,t,a===null?n:a.baseLanes|n,n,r)}else a===null?(e!==null&&xa(t,null),no(),lo(t)):(xa(t,a.cachePool),to(t,a),lo(t),t.memoizedState=null);return $s(e,t,i,n),t.child}function ic(e,t){return e!==null&&e.tag===22||t.stateNode!==null||(t.stateNode={_visibility:1,_pendingMarkers:null,_retryCache:null,_transitions:null}),t.sibling}function ac(e,t,n,r,i){var a=ba();return a=a===null?null:{parent:ca._currentValue,pool:a},t.memoizedState={baseLanes:n,cachePool:a},e!==null&&xa(t,null),no(),co(t),e!==null&&$i(e,t,r,!0),t.childLanes=i,null}function oc(e,t){return t=yc({mode:t.mode,children:t.children},e.mode),t.ref=e.ref,e.child=t,t.return=e,t}function sc(e,t,n){return za(t,e.child,null,n),e=oc(t,t.pendingProps),e.flags|=2,uo(t),t.memoizedState=null,e}function cc(e,t,n){var r=t.pendingProps,a=!!(t.flags&128);if(t.flags&=-129,e===null){if(R){if(r.mode===`hidden`)return e=oc(t,r),t.lanes=536870912,ic(null,e);if(so(t),(e=Fi)?(e=rf(e,Li),e=e!==null&&e.data===`&`?e:null,e!==null&&(t.memoizedState={dehydrated:e,treeContext:Ei===null?null:{id:Di,overflow:Oi},retryLane:536870912,hydrationErrors:null},n=gi(e),n.return=t,t.child=n,Pi=t,Fi=null)):e=null,e===null)throw zi(t);return t.lanes=536870912,null}return oc(t,r)}var o=e.memoizedState;if(o!==null){var s=o.dehydrated;if(so(t),a){if(t.flags&256)t.flags&=-257,t=sc(e,t,n);else if(t.memoizedState!==null)t.child=e.child,t.flags|=128,t=null;else throw Error(i(558))}else if(Qs||$i(e,t,n,!1),a=(n&e.childLanes)!==0,Qs||a){if(r=Il,r!==null&&(s=it(r,n),s!==0&&s!==o.retryLane))throw o.retryLane=s,ai(e,s),pu(r,e,s),Zs;Tu(),t=sc(e,t,n)}else e=o.treeContext,Fi=cf(s.nextSibling),Pi=t,R=!0,Ii=null,Li=!1,e!==null&&Ni(t,e),t=oc(t,r),t.flags|=4096;return t}return e=L(e.child,{mode:r.mode,children:r.children}),e.ref=t.ref,t.child=e,e.return=t,e}function lc(e,t){var n=t.ref;if(n===null)e!==null&&e.ref!==null&&(t.flags|=4194816);else{if(typeof n!=`function`&&typeof n!=`object`)throw Error(i(284));(e===null||e.ref!==n)&&(t.flags|=4194816)}}function uc(e,t,n,r,i){return ta(t),n=wo(e,t,n,r,void 0,i),r=Oo(),e!==null&&!Qs?(ko(e,t,i),wc(e,t,i)):(R&&r&&ji(t),t.flags|=1,$s(e,t,n,i),t.child)}function dc(e,t,n,r,i,a){return ta(t),t.updateQueue=null,n=Eo(t,r,n,i),To(e),r=Oo(),e!==null&&!Qs?(ko(e,t,a),wc(e,t,a)):(R&&r&&ji(t),t.flags|=1,$s(e,t,n,a),t.child)}function fc(e,t,n,r,i){if(ta(t),t.stateNode===null){var a=ci,o=n.contextType;typeof o==`object`&&o&&(a=na(o)),a=new n(r,a),t.memoizedState=a.state!==null&&a.state!==void 0?a.state:null,a.updater=Bs,t.stateNode=a,a._reactInternals=t,a=t.stateNode,a.props=r,a.state=t.memoizedState,a.refs={},Ha(t),o=n.contextType,a.context=typeof o==`object`&&o?na(o):ci,a.state=t.memoizedState,o=n.getDerivedStateFromProps,typeof o==`function`&&(K(t,n,o,r),a.state=t.memoizedState),typeof n.getDerivedStateFromProps==`function`||typeof a.getSnapshotBeforeUpdate==`function`||typeof a.UNSAFE_componentWillMount!=`function`&&typeof a.componentWillMount!=`function`||(o=a.state,typeof a.componentWillMount==`function`&&a.componentWillMount(),typeof a.UNSAFE_componentWillMount==`function`&&a.UNSAFE_componentWillMount(),o!==a.state&&Bs.enqueueReplaceState(a,a.state,null),Xa(t,r,a,i),Ya(),a.state=t.memoizedState),typeof a.componentDidMount==`function`&&(t.flags|=4194308),r=!0}else if(e===null){a=t.stateNode;var s=t.memoizedProps,c=q(n,s);a.props=c;var l=a.context,u=n.contextType;o=ci,typeof u==`object`&&u&&(o=na(u));var d=n.getDerivedStateFromProps;u=typeof d==`function`||typeof a.getSnapshotBeforeUpdate==`function`,s=t.pendingProps!==s,u||typeof a.UNSAFE_componentWillReceiveProps!=`function`&&typeof a.componentWillReceiveProps!=`function`||(s||l!==o)&&Hs(t,a,r,o),Va=!1;var f=t.memoizedState;a.state=f,Xa(t,r,a,i),Ya(),l=t.memoizedState,s||f!==l||Va?(typeof d==`function`&&(K(t,n,d,r),l=t.memoizedState),(c=Va||Vs(t,n,c,r,f,l,o))?(u||typeof a.UNSAFE_componentWillMount!=`function`&&typeof a.componentWillMount!=`function`||(typeof a.componentWillMount==`function`&&a.componentWillMount(),typeof a.UNSAFE_componentWillMount==`function`&&a.UNSAFE_componentWillMount()),typeof a.componentDidMount==`function`&&(t.flags|=4194308)):(typeof a.componentDidMount==`function`&&(t.flags|=4194308),t.memoizedProps=r,t.memoizedState=l),a.props=r,a.state=l,a.context=o,r=c):(typeof a.componentDidMount==`function`&&(t.flags|=4194308),r=!1)}else{a=t.stateNode,Ua(e,t),o=t.memoizedProps,u=q(n,o),a.props=u,d=t.pendingProps,f=a.context,l=n.contextType,c=ci,typeof l==`object`&&l&&(c=na(l)),s=n.getDerivedStateFromProps,(l=typeof s==`function`||typeof a.getSnapshotBeforeUpdate==`function`)||typeof a.UNSAFE_componentWillReceiveProps!=`function`&&typeof a.componentWillReceiveProps!=`function`||(o!==d||f!==c)&&Hs(t,a,r,c),Va=!1,f=t.memoizedState,a.state=f,Xa(t,r,a,i),Ya();var p=t.memoizedState;o!==d||f!==p||Va||e!==null&&e.dependencies!==null&&ea(e.dependencies)?(typeof s==`function`&&(K(t,n,s,r),p=t.memoizedState),(u=Va||Vs(t,n,u,r,f,p,c)||e!==null&&e.dependencies!==null&&ea(e.dependencies))?(l||typeof a.UNSAFE_componentWillUpdate!=`function`&&typeof a.componentWillUpdate!=`function`||(typeof a.componentWillUpdate==`function`&&a.componentWillUpdate(r,p,c),typeof a.UNSAFE_componentWillUpdate==`function`&&a.UNSAFE_componentWillUpdate(r,p,c)),typeof a.componentDidUpdate==`function`&&(t.flags|=4),typeof a.getSnapshotBeforeUpdate==`function`&&(t.flags|=1024)):(typeof a.componentDidUpdate!=`function`||o===e.memoizedProps&&f===e.memoizedState||(t.flags|=4),typeof a.getSnapshotBeforeUpdate!=`function`||o===e.memoizedProps&&f===e.memoizedState||(t.flags|=1024),t.memoizedProps=r,t.memoizedState=p),a.props=r,a.state=p,a.context=c,r=u):(typeof a.componentDidUpdate!=`function`||o===e.memoizedProps&&f===e.memoizedState||(t.flags|=4),typeof a.getSnapshotBeforeUpdate!=`function`||o===e.memoizedProps&&f===e.memoizedState||(t.flags|=1024),r=!1)}return a=r,lc(e,t),r=!!(t.flags&128),a||r?(a=t.stateNode,n=r&&typeof n.getDerivedStateFromError!=`function`?null:a.render(),t.flags|=1,e!==null&&r?(t.child=za(t,e.child,null,i),t.child=za(t,null,n,i)):$s(e,t,n,i),t.memoizedState=a.state,e=t.child):e=wc(e,t,i),e}function pc(e,t,n,r){return Ui(),t.flags|=256,$s(e,t,n,r),t.child}var mc={dehydrated:null,treeContext:null,retryLane:0,hydrationErrors:null};function hc(e){return{baseLanes:e,cachePool:Sa()}}function gc(e,t,n){return e=e===null?0:e.childLanes&~n,t&&(e|=Kl),e}function _c(e,t,n){var r=t.pendingProps,a=!1,o=!!(t.flags&128),s;if((s=o)||(s=e!==null&&e.memoizedState===null?!1:!!(fo.current&2)),s&&(a=!0,t.flags&=-129),s=!!(t.flags&32),t.flags&=-33,e===null){if(R){if(a?oo(t):lo(t),(e=Fi)?(e=rf(e,Li),e=e!==null&&e.data!==`&`?e:null,e!==null&&(t.memoizedState={dehydrated:e,treeContext:Ei===null?null:{id:Di,overflow:Oi},retryLane:536870912,hydrationErrors:null},n=gi(e),n.return=t,t.child=n,Pi=t,Fi=null)):e=null,e===null)throw zi(t);return of(e)?t.lanes=32:t.lanes=536870912,null}var c=r.children;return r=r.fallback,a?(lo(t),a=t.mode,c=yc({mode:`hidden`,children:c},a),r=mi(r,a,n,null),c.return=t,r.return=t,c.sibling=r,t.child=c,r=t.child,r.memoizedState=hc(n),r.childLanes=gc(e,s,n),t.memoizedState=mc,ic(null,r)):(oo(t),vc(t,c))}var l=e.memoizedState;if(l!==null&&(c=l.dehydrated,c!==null)){if(o)t.flags&256?(oo(t),t.flags&=-257,t=bc(e,t,n)):t.memoizedState===null?(lo(t),c=r.fallback,a=t.mode,r=yc({mode:`visible`,children:r.children},a),c=mi(c,a,n,null),c.flags|=2,r.return=t,c.return=t,r.sibling=c,t.child=r,za(t,e.child,null,n),r=t.child,r.memoizedState=hc(n),r.childLanes=gc(e,s,n),t.memoizedState=mc,t=ic(null,r)):(lo(t),t.child=e.child,t.flags|=128,t=null);else if(oo(t),of(c)){if(s=c.nextSibling&&c.nextSibling.dataset,s)var u=s.dgst;s=u,r=Error(i(419)),r.stack=``,r.digest=s,Gi({value:r,source:null,stack:null}),t=bc(e,t,n)}else if(Qs||$i(e,t,n,!1),s=(n&e.childLanes)!==0,Qs||s){if(s=Il,s!==null&&(r=it(s,n),r!==0&&r!==l.retryLane))throw l.retryLane=r,ai(e,r),pu(s,e,r),Zs;af(c)||Tu(),t=bc(e,t,n)}else af(c)?(t.flags|=192,t.child=e.child,t=null):(e=l.treeContext,Fi=cf(c.nextSibling),Pi=t,R=!0,Ii=null,Li=!1,e!==null&&Ni(t,e),t=vc(t,r.children),t.flags|=4096);return t}return a?(lo(t),c=r.fallback,a=t.mode,l=e.child,u=l.sibling,r=L(l,{mode:`hidden`,children:r.children}),r.subtreeFlags=l.subtreeFlags&65011712,u===null?(c=mi(c,a,n,null),c.flags|=2):c=L(u,c),c.return=t,r.return=t,r.sibling=c,t.child=r,ic(null,r),r=t.child,c=e.child.memoizedState,c===null?c=hc(n):(a=c.cachePool,a===null?a=Sa():(l=ca._currentValue,a=a.parent===l?a:{parent:l,pool:l}),c={baseLanes:c.baseLanes|n,cachePool:a}),r.memoizedState=c,r.childLanes=gc(e,s,n),t.memoizedState=mc,ic(e.child,r)):(oo(t),n=e.child,e=n.sibling,n=L(n,{mode:`visible`,children:r.children}),n.return=t,n.sibling=null,e!==null&&(s=t.deletions,s===null?(t.deletions=[e],t.flags|=16):s.push(e)),t.child=n,t.memoizedState=null,n)}function vc(e,t){return t=yc({mode:`visible`,children:t},e.mode),t.return=e,e.child=t}function yc(e,t){return e=ui(22,e,null,t),e.lanes=0,e}function bc(e,t,n){return za(t,e.child,null,n),e=vc(t,t.pendingProps.children),e.flags|=2,t.memoizedState=null,e}function xc(e,t,n){e.lanes|=t;var r=e.alternate;r!==null&&(r.lanes|=t),Zi(e.return,t,n)}function Sc(e,t,n,r,i,a){var o=e.memoizedState;o===null?e.memoizedState={isBackwards:t,rendering:null,renderingStartTime:0,last:r,tail:n,tailMode:i,treeForkCount:a}:(o.isBackwards=t,o.rendering=null,o.renderingStartTime=0,o.last=r,o.tail=n,o.tailMode=i,o.treeForkCount=a)}function Cc(e,t,n){var r=t.pendingProps,i=r.revealOrder,a=r.tail;r=r.children;var o=fo.current,s=!!(o&2);if(s?(o=o&1|2,t.flags|=128):o&=1,j(fo,o),$s(e,t,r,n),r=R?Ci:0,!s&&e!==null&&e.flags&128)a:for(e=t.child;e!==null;){if(e.tag===13)e.memoizedState!==null&&xc(e,n,t);else if(e.tag===19)xc(e,n,t);else if(e.child!==null){e.child.return=e,e=e.child;continue}if(e===t)break a;for(;e.sibling===null;){if(e.return===null||e.return===t)break a;e=e.return}e.sibling.return=e.return,e=e.sibling}switch(i){case`forwards`:for(n=t.child,i=null;n!==null;)e=n.alternate,e!==null&&po(e)===null&&(i=n),n=n.sibling;n=i,n===null?(i=t.child,t.child=null):(i=n.sibling,n.sibling=null),Sc(t,!1,i,n,a,r);break;case`backwards`:case`unstable_legacy-backwards`:for(n=null,i=t.child,t.child=null;i!==null;){if(e=i.alternate,e!==null&&po(e)===null){t.child=i;break}e=i.sibling,i.sibling=n,n=i,i=e}Sc(t,!0,n,null,a,r);break;case`together`:Sc(t,!1,null,null,void 0,r);break;default:t.memoizedState=null}return t.child}function wc(e,t,n){if(e!==null&&(t.dependencies=e.dependencies),Ul|=t.lanes,(n&t.childLanes)===0){if(e!==null){if($i(e,t,n,!1),(n&t.childLanes)===0)return null}else return null}if(e!==null&&t.child!==e.child)throw Error(i(153));if(t.child!==null){for(e=t.child,n=L(e,e.pendingProps),t.child=n,n.return=t;e.sibling!==null;)e=e.sibling,n=n.sibling=L(e,e.pendingProps),n.return=t;n.sibling=null}return t.child}function Tc(e,t){return(e.lanes&t)!==0||(e=e.dependencies,!!(e!==null&&ea(e)))}function Ec(e,t,n){switch(t.tag){case 3:me(t,t.stateNode.containerInfo),Yi(t,ca,e.memoizedState.cache),Ui();break;case 27:case 5:ge(t);break;case 4:me(t,t.stateNode.containerInfo);break;case 10:Yi(t,t.type,t.memoizedProps.value);break;case 31:if(t.memoizedState!==null)return t.flags|=128,so(t),null;break;case 13:var r=t.memoizedState;if(r!==null)return r.dehydrated===null?(n&t.child.childLanes)===0?(oo(t),e=wc(e,t,n),e===null?null:e.sibling):_c(e,t,n):(oo(t),t.flags|=128,null);oo(t);break;case 19:var i=!!(e.flags&128);if(r=(n&t.childLanes)!==0,r||=($i(e,t,n,!1),(n&t.childLanes)!==0),i){if(r)return Cc(e,t,n);t.flags|=128}if(i=t.memoizedState,i!==null&&(i.rendering=null,i.tail=null,i.lastEffect=null),j(fo,fo.current),r)break;return null;case 22:return t.lanes=0,rc(e,t,n,t.pendingProps);case 24:Yi(t,ca,e.memoizedState.cache)}return wc(e,t,n)}function Dc(e,t,n){if(e!==null){if(e.memoizedProps!==t.pendingProps)Qs=!0;else{if(!Tc(e,n)&&!(t.flags&128))return Qs=!1,Ec(e,t,n);Qs=!!(e.flags&131072)}}else Qs=!1,R&&t.flags&1048576&&Ai(t,Ci,t.index);switch(t.lanes=0,t.tag){case 16:a:{var r=t.pendingProps;if(e=ka(t.elementType),t.type=e,typeof e==`function`)di(e)?(r=q(e,r),t.tag=1,t=fc(null,t,e,r,n)):(t.tag=0,t=uc(null,t,e,r,n));else{if(e!=null){var a=e.$$typeof;if(a===x){t.tag=11,t=ec(null,t,e,r,n);break a}if(a===w){t.tag=14,t=tc(null,t,e,r,n);break a}}throw t=oe(e)||e,Error(i(306,t,``))}}return t;case 0:return uc(e,t,t.type,t.pendingProps,n);case 1:return r=t.type,a=q(r,t.pendingProps),fc(e,t,r,a,n);case 3:a:{if(me(t,t.stateNode.containerInfo),e===null)throw Error(i(387));r=t.pendingProps;var o=t.memoizedState;a=o.element,Ua(e,t),Xa(t,r,null,n);var s=t.memoizedState;if(r=s.cache,Yi(t,ca,r),r!==o.cache&&Qi(t,[ca],n,!0),Ya(),r=s.element,o.isDehydrated){if(o={element:r,isDehydrated:!1,cache:s.cache},t.updateQueue.baseState=o,t.memoizedState=o,t.flags&256){t=pc(e,t,r,n);break a}if(r!==a){a=yi(Error(i(424)),t),Gi(a),t=pc(e,t,r,n);break a}switch(e=t.stateNode.containerInfo,e.nodeType){case 9:e=e.body;break;default:e=e.nodeName===`HTML`?e.ownerDocument.body:e}for(Fi=cf(e.firstChild),Pi=t,R=!0,Ii=null,Li=!0,n=Ba(t,null,r,n),t.child=n;n;)n.flags=n.flags&-3|4096,n=n.sibling}else{if(Ui(),r===a){t=wc(e,t,n);break a}$s(e,t,r,n)}t=t.child}return t;case 26:return lc(e,t),e===null?(n=kf(t.type,null,t.pendingProps,null))?t.memoizedState=n:R||(n=t.type,e=t.pendingProps,r=Bd(pe.current).createElement(n),r[ut]=t,r[dt]=e,Pd(r,n,e),Ct(r),t.stateNode=r):t.memoizedState=kf(t.type,e.memoizedProps,t.pendingProps,e.memoizedState),null;case 27:return ge(t),e===null&&R&&(r=t.stateNode=ff(t.type,t.pendingProps,pe.current),Pi=t,Li=!0,a=Fi,Zd(t.type)?(lf=a,Fi=cf(r.firstChild)):Fi=a),$s(e,t,t.pendingProps.children,n),lc(e,t),e===null&&(t.flags|=4194304),t.child;case 5:return e===null&&R&&((a=r=Fi)&&(r=tf(r,t.type,t.pendingProps,Li),r===null?a=!1:(t.stateNode=r,Pi=t,Fi=cf(r.firstChild),Li=!1,a=!0)),a||zi(t)),ge(t),a=t.type,o=t.pendingProps,s=e===null?null:e.memoizedProps,r=o.children,Ud(a,o)?r=null:s!==null&&Ud(a,s)&&(t.flags|=32),t.memoizedState!==null&&(a=wo(e,t,Do,null,null,n),Qf._currentValue=a),lc(e,t),$s(e,t,r,n),t.child;case 6:return e===null&&R&&((e=n=Fi)&&(n=nf(n,t.pendingProps,Li),n===null?e=!1:(t.stateNode=n,Pi=t,Fi=null,e=!0)),e||zi(t)),null;case 13:return _c(e,t,n);case 4:return me(t,t.stateNode.containerInfo),r=t.pendingProps,e===null?t.child=za(t,null,r,n):$s(e,t,r,n),t.child;case 11:return ec(e,t,t.type,t.pendingProps,n);case 7:return $s(e,t,t.pendingProps,n),t.child;case 8:return $s(e,t,t.pendingProps.children,n),t.child;case 12:return $s(e,t,t.pendingProps.children,n),t.child;case 10:return r=t.pendingProps,Yi(t,t.type,r.value),$s(e,t,r.children,n),t.child;case 9:return a=t.type._context,r=t.pendingProps.children,ta(t),a=na(a),r=r(a),t.flags|=1,$s(e,t,r,n),t.child;case 14:return tc(e,t,t.type,t.pendingProps,n);case 15:return nc(e,t,t.type,t.pendingProps,n);case 19:return Cc(e,t,n);case 31:return cc(e,t,n);case 22:return rc(e,t,n,t.pendingProps);case 24:return ta(t),r=na(ca),e===null?(a=ba(),a===null&&(a=Il,o=la(),a.pooledCache=o,o.refCount++,o!==null&&(a.pooledCacheLanes|=n),a=o),t.memoizedState={parent:r,cache:a},Ha(t),Yi(t,ca,a)):((e.lanes&n)!==0&&(Ua(e,t),Xa(t,null,null,n),Ya()),a=e.memoizedState,o=t.memoizedState,a.parent===r?(r=o.cache,Yi(t,ca,r),r!==a.cache&&Qi(t,[ca],n,!0)):(a={parent:r,cache:r},t.memoizedState=a,t.lanes===0&&(t.memoizedState=t.updateQueue.baseState=a),Yi(t,ca,r))),$s(e,t,t.pendingProps.children,n),t.child;case 29:throw t.pendingProps}throw Error(i(156,t.tag))}function Oc(e){e.flags|=4}function kc(e,t,n,r,i){if((t=!!(e.mode&32))&&(t=!1),t){if(e.flags|=16777216,(i&335544128)===i){if(e.stateNode.complete)e.flags|=8192;else if(Su())e.flags|=8192;else throw Aa=Ea,wa}}else e.flags&=-16777217}function Ac(e,t){if(t.type!==`stylesheet`||t.state.loading&4)e.flags&=-16777217;else if(e.flags|=16777216,!Wf(t)){if(Su())e.flags|=8192;else throw Aa=Ea,wa}}function jc(e,t){t!==null&&(e.flags|=4),e.flags&16384&&(t=e.tag===22?536870912:Qe(),e.lanes|=t,ql|=t)}function Mc(e,t){if(!R)switch(e.tailMode){case`hidden`:t=e.tail;for(var n=null;t!==null;)t.alternate!==null&&(n=t),t=t.sibling;n===null?e.tail=null:n.sibling=null;break;case`collapsed`:n=e.tail;for(var r=null;n!==null;)n.alternate!==null&&(r=n),n=n.sibling;r===null?t||e.tail===null?e.tail=null:e.tail.sibling=null:r.sibling=null}}function Nc(e){var t=e.alternate!==null&&e.alternate.child===e.child,n=0,r=0;if(t)for(var i=e.child;i!==null;)n|=i.lanes|i.childLanes,r|=i.subtreeFlags&65011712,r|=i.flags&65011712,i.return=e,i=i.sibling;else for(i=e.child;i!==null;)n|=i.lanes|i.childLanes,r|=i.subtreeFlags,r|=i.flags,i.return=e,i=i.sibling;return e.subtreeFlags|=r,e.childLanes=n,t}function Pc(e,t,n){var r=t.pendingProps;switch(Mi(t),t.tag){case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return Nc(t),null;case 1:return Nc(t),null;case 3:return n=t.stateNode,r=null,e!==null&&(r=e.memoizedState.cache),t.memoizedState.cache!==r&&(t.flags|=2048),Xi(ca),he(),n.pendingContext&&(n.context=n.pendingContext,n.pendingContext=null),(e===null||e.child===null)&&(Hi(t)?Oc(t):e===null||e.memoizedState.isDehydrated&&!(t.flags&256)||(t.flags|=1024,Wi())),Nc(t),null;case 26:var a=t.type,o=t.memoizedState;return e===null?(Oc(t),o===null?(Nc(t),kc(t,a,null,r,n)):(Nc(t),Ac(t,o))):o?o===e.memoizedState?(Nc(t),t.flags&=-16777217):(Oc(t),Nc(t),Ac(t,o)):(e=e.memoizedProps,e!==r&&Oc(t),Nc(t),kc(t,a,e,r,n)),null;case 27:if(_e(t),n=pe.current,a=t.type,e!==null&&t.stateNode!=null)e.memoizedProps!==r&&Oc(t);else{if(!r){if(t.stateNode===null)throw Error(i(166));return Nc(t),null}e=fe.current,Hi(t)?Bi(t,e):(e=ff(a,r,n),t.stateNode=e,Oc(t))}return Nc(t),null;case 5:if(_e(t),a=t.type,e!==null&&t.stateNode!=null)e.memoizedProps!==r&&Oc(t);else{if(!r){if(t.stateNode===null)throw Error(i(166));return Nc(t),null}if(o=fe.current,Hi(t))Bi(t,o);else{var s=Bd(pe.current);switch(o){case 1:o=s.createElementNS(`http://www.w3.org/2000/svg`,a);break;case 2:o=s.createElementNS(`http://www.w3.org/1998/Math/MathML`,a);break;default:switch(a){case`svg`:o=s.createElementNS(`http://www.w3.org/2000/svg`,a);break;case`math`:o=s.createElementNS(`http://www.w3.org/1998/Math/MathML`,a);break;case`script`:o=s.createElement(`div`),o.innerHTML=`<script><\/script>`,o=o.removeChild(o.firstChild);break;case`select`:o=typeof r.is==`string`?s.createElement(`select`,{is:r.is}):s.createElement(`select`),r.multiple?o.multiple=!0:r.size&&(o.size=r.size);break;default:o=typeof r.is==`string`?s.createElement(a,{is:r.is}):s.createElement(a)}}o[ut]=t,o[dt]=r;a:for(s=t.child;s!==null;){if(s.tag===5||s.tag===6)o.appendChild(s.stateNode);else if(s.tag!==4&&s.tag!==27&&s.child!==null){s.child.return=s,s=s.child;continue}if(s===t)break a;for(;s.sibling===null;){if(s.return===null||s.return===t)break a;s=s.return}s.sibling.return=s.return,s=s.sibling}t.stateNode=o;a:switch(Pd(o,a,r),a){case`button`:case`input`:case`select`:case`textarea`:r=!!r.autoFocus;break a;case`img`:r=!0;break a;default:r=!1}r&&Oc(t)}}return Nc(t),kc(t,t.type,e===null?null:e.memoizedProps,t.pendingProps,n),null;case 6:if(e&&t.stateNode!=null)e.memoizedProps!==r&&Oc(t);else{if(typeof r!=`string`&&t.stateNode===null)throw Error(i(166));if(e=pe.current,Hi(t)){if(e=t.stateNode,n=t.memoizedProps,r=null,a=Pi,a!==null)switch(a.tag){case 27:case 5:r=a.memoizedProps}e[ut]=t,e=!!(e.nodeValue===n||r!==null&&!0===r.suppressHydrationWarning||jd(e.nodeValue,n)),e||zi(t,!0)}else e=Bd(e).createTextNode(r),e[ut]=t,t.stateNode=e}return Nc(t),null;case 31:if(n=t.memoizedState,e===null||e.memoizedState!==null){if(r=Hi(t),n!==null){if(e===null){if(!r)throw Error(i(318));if(e=t.memoizedState,e=e===null?null:e.dehydrated,!e)throw Error(i(557));e[ut]=t}else Ui(),!(t.flags&128)&&(t.memoizedState=null),t.flags|=4;Nc(t),e=!1}else n=Wi(),e!==null&&e.memoizedState!==null&&(e.memoizedState.hydrationErrors=n),e=!0;if(!e)return t.flags&256?(uo(t),t):(uo(t),null);if(t.flags&128)throw Error(i(558))}return Nc(t),null;case 13:if(r=t.memoizedState,e===null||e.memoizedState!==null&&e.memoizedState.dehydrated!==null){if(a=Hi(t),r!==null&&r.dehydrated!==null){if(e===null){if(!a)throw Error(i(318));if(a=t.memoizedState,a=a===null?null:a.dehydrated,!a)throw Error(i(317));a[ut]=t}else Ui(),!(t.flags&128)&&(t.memoizedState=null),t.flags|=4;Nc(t),a=!1}else a=Wi(),e!==null&&e.memoizedState!==null&&(e.memoizedState.hydrationErrors=a),a=!0;if(!a)return t.flags&256?(uo(t),t):(uo(t),null)}return uo(t),t.flags&128?(t.lanes=n,t):(n=r!==null,e=e!==null&&e.memoizedState!==null,n&&(r=t.child,a=null,r.alternate!==null&&r.alternate.memoizedState!==null&&r.alternate.memoizedState.cachePool!==null&&(a=r.alternate.memoizedState.cachePool.pool),o=null,r.memoizedState!==null&&r.memoizedState.cachePool!==null&&(o=r.memoizedState.cachePool.pool),o!==a&&(r.flags|=2048)),n!==e&&n&&(t.child.flags|=8192),jc(t,t.updateQueue),Nc(t),null);case 4:return he(),e===null&&xd(t.stateNode.containerInfo),Nc(t),null;case 10:return Xi(t.type),Nc(t),null;case 19:if(A(fo),r=t.memoizedState,r===null)return Nc(t),null;if(a=!!(t.flags&128),o=r.rendering,o===null){if(a)Mc(r,!1);else{if(Hl!==0||e!==null&&e.flags&128)for(e=t.child;e!==null;){if(o=po(e),o!==null){for(t.flags|=128,Mc(r,!1),e=o.updateQueue,t.updateQueue=e,jc(t,e),t.subtreeFlags=0,e=n,n=t.child;n!==null;)fi(n,e),n=n.sibling;return j(fo,fo.current&1|2),R&&ki(t,r.treeForkCount),t.child}e=e.sibling}r.tail!==null&&ke()>$l&&(t.flags|=128,a=!0,Mc(r,!1),t.lanes=4194304)}}else{if(!a){if(e=po(o),e!==null){if(t.flags|=128,a=!0,e=e.updateQueue,t.updateQueue=e,jc(t,e),Mc(r,!0),r.tail===null&&r.tailMode===`hidden`&&!o.alternate&&!R)return Nc(t),null}else 2*ke()-r.renderingStartTime>$l&&n!==536870912&&(t.flags|=128,a=!0,Mc(r,!1),t.lanes=4194304)}r.isBackwards?(o.sibling=t.child,t.child=o):(e=r.last,e===null?t.child=o:e.sibling=o,r.last=o)}return r.tail===null?(Nc(t),null):(e=r.tail,r.rendering=e,r.tail=e.sibling,r.renderingStartTime=ke(),e.sibling=null,n=fo.current,j(fo,a?n&1|2:n&1),R&&ki(t,r.treeForkCount),e);case 22:case 23:return uo(t),ro(),r=t.memoizedState!==null,e===null?r&&(t.flags|=8192):e.memoizedState!==null!==r&&(t.flags|=8192),r?n&536870912&&!(t.flags&128)&&(Nc(t),t.subtreeFlags&6&&(t.flags|=8192)):Nc(t),n=t.updateQueue,n!==null&&jc(t,n.retryQueue),n=null,e!==null&&e.memoizedState!==null&&e.memoizedState.cachePool!==null&&(n=e.memoizedState.cachePool.pool),r=null,t.memoizedState!==null&&t.memoizedState.cachePool!==null&&(r=t.memoizedState.cachePool.pool),r!==n&&(t.flags|=2048),e!==null&&A(ya),null;case 24:return n=null,e!==null&&(n=e.memoizedState.cache),t.memoizedState.cache!==n&&(t.flags|=2048),Xi(ca),Nc(t),null;case 25:return null;case 30:return null}throw Error(i(156,t.tag))}function Fc(e,t){switch(Mi(t),t.tag){case 1:return e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 3:return Xi(ca),he(),e=t.flags,e&65536&&!(e&128)?(t.flags=e&-65537|128,t):null;case 26:case 27:case 5:return _e(t),null;case 31:if(t.memoizedState!==null){if(uo(t),t.alternate===null)throw Error(i(340));Ui()}return e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 13:if(uo(t),e=t.memoizedState,e!==null&&e.dehydrated!==null){if(t.alternate===null)throw Error(i(340));Ui()}return e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 19:return A(fo),null;case 4:return he(),null;case 10:return Xi(t.type),null;case 22:case 23:return uo(t),ro(),e!==null&&A(ya),e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 24:return Xi(ca),null;case 25:return null;default:return null}}function Ic(e,t){switch(Mi(t),t.tag){case 3:Xi(ca),he();break;case 26:case 27:case 5:_e(t);break;case 4:he();break;case 31:t.memoizedState!==null&&uo(t);break;case 13:uo(t);break;case 19:A(fo);break;case 10:Xi(t.type);break;case 22:case 23:uo(t),ro(),e!==null&&A(ya);break;case 24:Xi(ca)}}function Lc(e,t){try{var n=t.updateQueue,r=n===null?null:n.lastEffect;if(r!==null){var i=r.next;n=i;do{if((n.tag&e)===e){r=void 0;var a=n.create,o=n.inst;r=a(),o.destroy=r}n=n.next}while(n!==i)}}catch(e){Uu(t,t.return,e)}}function Rc(e,t,n){try{var r=t.updateQueue,i=r===null?null:r.lastEffect;if(i!==null){var a=i.next;r=a;do{if((r.tag&e)===e){var o=r.inst,s=o.destroy;if(s!==void 0){o.destroy=void 0,i=t;var c=n,l=s;try{l()}catch(e){Uu(i,c,e)}}}r=r.next}while(r!==a)}}catch(e){Uu(t,t.return,e)}}function zc(e){var t=e.updateQueue;if(t!==null){var n=e.stateNode;try{Qa(t,n)}catch(t){Uu(e,e.return,t)}}}function Bc(e,t,n){n.props=q(e.type,e.memoizedProps),n.state=e.memoizedState;try{n.componentWillUnmount()}catch(n){Uu(e,t,n)}}function Vc(e,t){try{var n=e.ref;if(n!==null){switch(e.tag){case 26:case 27:case 5:var r=e.stateNode;break;case 30:r=e.stateNode;break;default:r=e.stateNode}typeof n==`function`?e.refCleanup=n(r):n.current=r}}catch(n){Uu(e,t,n)}}function Hc(e,t){var n=e.ref,r=e.refCleanup;if(n!==null){if(typeof r==`function`)try{r()}catch(n){Uu(e,t,n)}finally{e.refCleanup=null,e=e.alternate,e!=null&&(e.refCleanup=null)}else if(typeof n==`function`)try{n(null)}catch(n){Uu(e,t,n)}else n.current=null}}function Uc(e){var t=e.type,n=e.memoizedProps,r=e.stateNode;try{a:switch(t){case`button`:case`input`:case`select`:case`textarea`:n.autoFocus&&r.focus();break a;case`img`:n.src?r.src=n.src:n.srcSet&&(r.srcset=n.srcSet)}}catch(t){Uu(e,e.return,t)}}function Wc(e,t,n){try{var r=e.stateNode;Fd(r,e.type,n,t),r[dt]=t}catch(t){Uu(e,e.return,t)}}function Gc(e){return e.tag===5||e.tag===3||e.tag===26||e.tag===27&&Zd(e.type)||e.tag===4}function Kc(e){a:for(;;){for(;e.sibling===null;){if(e.return===null||Gc(e.return))return null;e=e.return}for(e.sibling.return=e.return,e=e.sibling;e.tag!==5&&e.tag!==6&&e.tag!==18;){if(e.tag===27&&Zd(e.type)||e.flags&2||e.child===null||e.tag===4)continue a;e.child.return=e,e=e.child}if(!(e.flags&2))return e.stateNode}}function qc(e,t,n){var r=e.tag;if(r===5||r===6)e=e.stateNode,t?(n.nodeType===9?n.body:n.nodeName===`HTML`?n.ownerDocument.body:n).insertBefore(e,t):(t=n.nodeType===9?n.body:n.nodeName===`HTML`?n.ownerDocument.body:n,t.appendChild(e),n=n._reactRootContainer,n!=null||t.onclick!==null||(t.onclick=rn));else if(r!==4&&(r===27&&Zd(e.type)&&(n=e.stateNode,t=null),e=e.child,e!==null))for(qc(e,t,n),e=e.sibling;e!==null;)qc(e,t,n),e=e.sibling}function Jc(e,t,n){var r=e.tag;if(r===5||r===6)e=e.stateNode,t?n.insertBefore(e,t):n.appendChild(e);else if(r!==4&&(r===27&&Zd(e.type)&&(n=e.stateNode),e=e.child,e!==null))for(Jc(e,t,n),e=e.sibling;e!==null;)Jc(e,t,n),e=e.sibling}function Yc(e){var t=e.stateNode,n=e.memoizedProps;try{for(var r=e.type,i=t.attributes;i.length;)t.removeAttributeNode(i[0]);Pd(t,r,n),t[ut]=e,t[dt]=n}catch(t){Uu(e,e.return,t)}}var Xc=!1,Zc=!1,Qc=!1,$c=typeof WeakSet==`function`?WeakSet:Set,el=null;function tl(e,t){if(e=e.containerInfo,Rd=sp,e=Ar(e),jr(e)){if(`selectionStart`in e)var n={start:e.selectionStart,end:e.selectionEnd};else a:{n=(n=e.ownerDocument)&&n.defaultView||window;var r=n.getSelection&&n.getSelection();if(r&&r.rangeCount!==0){n=r.anchorNode;var a=r.anchorOffset,o=r.focusNode;r=r.focusOffset;try{n.nodeType,o.nodeType}catch{n=null;break a}var s=0,c=-1,l=-1,u=0,d=0,f=e,p=null;b:for(;;){for(var m;f!==n||a!==0&&f.nodeType!==3||(c=s+a),f!==o||r!==0&&f.nodeType!==3||(l=s+r),f.nodeType===3&&(s+=f.nodeValue.length),(m=f.firstChild)!==null;)p=f,f=m;for(;;){if(f===e)break b;if(p===n&&++u===a&&(c=s),p===o&&++d===r&&(l=s),(m=f.nextSibling)!==null)break;f=p,p=f.parentNode}f=m}n=c===-1||l===-1?null:{start:c,end:l}}else n=null}n||={start:0,end:0}}else n=null;for(zd={focusedElem:e,selectionRange:n},sp=!1,el=t;el!==null;)if(t=el,e=t.child,t.subtreeFlags&1028&&e!==null)e.return=t,el=e;else for(;el!==null;){switch(t=el,o=t.alternate,e=t.flags,t.tag){case 0:if(e&4&&(e=t.updateQueue,e=e===null?null:e.events,e!==null))for(n=0;n<e.length;n++)a=e[n],a.ref.impl=a.nextImpl;break;case 11:case 15:break;case 1:if(e&1024&&o!==null){e=void 0,n=t,a=o.memoizedProps,o=o.memoizedState,r=n.stateNode;try{var h=q(n.type,a);e=r.getSnapshotBeforeUpdate(h,o),r.__reactInternalSnapshotBeforeUpdate=e}catch(e){Uu(n,n.return,e)}}break;case 3:if(e&1024){if(e=t.stateNode.containerInfo,n=e.nodeType,n===9)ef(e);else if(n===1)switch(e.nodeName){case`HEAD`:case`HTML`:case`BODY`:ef(e);break;default:e.textContent=``}}break;case 5:case 26:case 27:case 6:case 4:case 17:break;default:if(e&1024)throw Error(i(163))}if(e=t.sibling,e!==null){e.return=t.return,el=e;break}el=t.return}}function nl(e,t,n){var r=n.flags;switch(n.tag){case 0:case 11:case 15:_l(e,n),r&4&&Lc(5,n);break;case 1:if(_l(e,n),r&4){if(e=n.stateNode,t===null)try{e.componentDidMount()}catch(e){Uu(n,n.return,e)}else{var i=q(n.type,t.memoizedProps);t=t.memoizedState;try{e.componentDidUpdate(i,t,e.__reactInternalSnapshotBeforeUpdate)}catch(e){Uu(n,n.return,e)}}}r&64&&zc(n),r&512&&Vc(n,n.return);break;case 3:if(_l(e,n),r&64&&(e=n.updateQueue,e!==null)){if(t=null,n.child!==null)switch(n.child.tag){case 27:case 5:t=n.child.stateNode;break;case 1:t=n.child.stateNode}try{Qa(e,t)}catch(e){Uu(n,n.return,e)}}break;case 27:t===null&&r&4&&Yc(n);case 26:case 5:_l(e,n),t===null&&r&4&&Uc(n),r&512&&Vc(n,n.return);break;case 12:_l(e,n);break;case 31:_l(e,n),r&4&&cl(e,n);break;case 13:_l(e,n),r&4&&ll(e,n),r&64&&(e=n.memoizedState,e!==null&&(e=e.dehydrated,e!==null&&(n=qu.bind(null,n),sf(e,n))));break;case 22:if(r=n.memoizedState!==null||Xc,!r){t=t!==null&&t.memoizedState!==null||Zc,i=Xc;var a=Zc;Xc=r,(Zc=t)&&!a?yl(e,n,!!(n.subtreeFlags&8772)):_l(e,n),Xc=i,Zc=a}break;case 30:break;default:_l(e,n)}}function rl(e){var t=e.alternate;t!==null&&(e.alternate=null,rl(t)),e.child=null,e.deletions=null,e.sibling=null,e.tag===5&&(t=e.stateNode,t!==null&&vt(t)),e.stateNode=null,e.return=null,e.dependencies=null,e.memoizedProps=null,e.memoizedState=null,e.pendingProps=null,e.stateNode=null,e.updateQueue=null}var il=null,al=!1;function ol(e,t,n){for(n=n.child;n!==null;)sl(e,t,n),n=n.sibling}function sl(e,t,n){if(ze&&typeof ze.onCommitFiberUnmount==`function`)try{ze.onCommitFiberUnmount(Re,n)}catch{}switch(n.tag){case 26:Zc||Hc(n,t),ol(e,t,n),n.memoizedState?n.memoizedState.count--:n.stateNode&&(n=n.stateNode,n.parentNode.removeChild(n));break;case 27:Zc||Hc(n,t);var r=il,i=al;Zd(n.type)&&(il=n.stateNode,al=!1),ol(e,t,n),pf(n.stateNode),il=r,al=i;break;case 5:Zc||Hc(n,t);case 6:if(r=il,i=al,il=null,ol(e,t,n),il=r,al=i,il!==null){if(al)try{(il.nodeType===9?il.body:il.nodeName===`HTML`?il.ownerDocument.body:il).removeChild(n.stateNode)}catch(e){Uu(n,t,e)}else try{il.removeChild(n.stateNode)}catch(e){Uu(n,t,e)}}break;case 18:il!==null&&(al?(e=il,Qd(e.nodeType===9?e.body:e.nodeName===`HTML`?e.ownerDocument.body:e,n.stateNode),Np(e)):Qd(il,n.stateNode));break;case 4:r=il,i=al,il=n.stateNode.containerInfo,al=!0,ol(e,t,n),il=r,al=i;break;case 0:case 11:case 14:case 15:Rc(2,n,t),Zc||Rc(4,n,t),ol(e,t,n);break;case 1:Zc||(Hc(n,t),r=n.stateNode,typeof r.componentWillUnmount==`function`&&Bc(n,t,r)),ol(e,t,n);break;case 21:ol(e,t,n);break;case 22:Zc=(r=Zc)||n.memoizedState!==null,ol(e,t,n),Zc=r;break;default:ol(e,t,n)}}function cl(e,t){if(t.memoizedState===null&&(e=t.alternate,e!==null&&(e=e.memoizedState,e!==null))){e=e.dehydrated;try{Np(e)}catch(e){Uu(t,t.return,e)}}}function ll(e,t){if(t.memoizedState===null&&(e=t.alternate,e!==null&&(e=e.memoizedState,e!==null&&(e=e.dehydrated,e!==null))))try{Np(e)}catch(e){Uu(t,t.return,e)}}function ul(e){switch(e.tag){case 31:case 13:case 19:var t=e.stateNode;return t===null&&(t=e.stateNode=new $c),t;case 22:return e=e.stateNode,t=e._retryCache,t===null&&(t=e._retryCache=new $c),t;default:throw Error(i(435,e.tag))}}function dl(e,t){var n=ul(e);t.forEach(function(t){if(!n.has(t)){n.add(t);var r=Ju.bind(null,e,t);t.then(r,r)}})}function fl(e,t){var n=t.deletions;if(n!==null)for(var r=0;r<n.length;r++){var a=n[r],o=e,s=t,c=s;a:for(;c!==null;){switch(c.tag){case 27:if(Zd(c.type)){il=c.stateNode,al=!1;break a}break;case 5:il=c.stateNode,al=!1;break a;case 3:case 4:il=c.stateNode.containerInfo,al=!0;break a}c=c.return}if(il===null)throw Error(i(160));sl(o,s,a),il=null,al=!1,o=a.alternate,o!==null&&(o.return=null),a.return=null}if(t.subtreeFlags&13886)for(t=t.child;t!==null;)ml(t,e),t=t.sibling}var pl=null;function ml(e,t){var n=e.alternate,r=e.flags;switch(e.tag){case 0:case 11:case 14:case 15:fl(t,e),hl(e),r&4&&(Rc(3,e,e.return),Lc(3,e),Rc(5,e,e.return));break;case 1:fl(t,e),hl(e),r&512&&(Zc||n===null||Hc(n,n.return)),r&64&&Xc&&(e=e.updateQueue,e!==null&&(r=e.callbacks,r!==null&&(n=e.shared.hiddenCallbacks,e.shared.hiddenCallbacks=n===null?r:n.concat(r))));break;case 26:var a=pl;if(fl(t,e),hl(e),r&512&&(Zc||n===null||Hc(n,n.return)),r&4){var o=n===null?null:n.memoizedState;if(r=e.memoizedState,n===null){if(r===null){if(e.stateNode===null){a:{r=e.type,n=e.memoizedProps,a=a.ownerDocument||a;b:switch(r){case`title`:o=a.getElementsByTagName(`title`)[0],(!o||o[_t]||o[ut]||o.namespaceURI===`http://www.w3.org/2000/svg`||o.hasAttribute(`itemprop`))&&(o=a.createElement(r),a.head.insertBefore(o,a.querySelector(`head > title`))),Pd(o,r,n),o[ut]=e,Ct(o),r=o;break a;case`link`:var s=Vf(`link`,`href`,a).get(r+(n.href||``));if(s){for(var c=0;c<s.length;c++)if(o=s[c],o.getAttribute(`href`)===(n.href==null||n.href===``?null:n.href)&&o.getAttribute(`rel`)===(n.rel==null?null:n.rel)&&o.getAttribute(`title`)===(n.title==null?null:n.title)&&o.getAttribute(`crossorigin`)===(n.crossOrigin==null?null:n.crossOrigin)){s.splice(c,1);break b}}o=a.createElement(r),Pd(o,r,n),a.head.appendChild(o);break;case`meta`:if(s=Vf(`meta`,`content`,a).get(r+(n.content||``))){for(c=0;c<s.length;c++)if(o=s[c],o.getAttribute(`content`)===(n.content==null?null:``+n.content)&&o.getAttribute(`name`)===(n.name==null?null:n.name)&&o.getAttribute(`property`)===(n.property==null?null:n.property)&&o.getAttribute(`http-equiv`)===(n.httpEquiv==null?null:n.httpEquiv)&&o.getAttribute(`charset`)===(n.charSet==null?null:n.charSet)){s.splice(c,1);break b}}o=a.createElement(r),Pd(o,r,n),a.head.appendChild(o);break;default:throw Error(i(468,r))}o[ut]=e,Ct(o),r=o}e.stateNode=r}else Hf(a,e.type,e.stateNode)}else e.stateNode=If(a,r,e.memoizedProps)}else o===r?r===null&&e.stateNode!==null&&Wc(e,e.memoizedProps,n.memoizedProps):(o===null?n.stateNode!==null&&(n=n.stateNode,n.parentNode.removeChild(n)):o.count--,r===null?Hf(a,e.type,e.stateNode):If(a,r,e.memoizedProps))}break;case 27:fl(t,e),hl(e),r&512&&(Zc||n===null||Hc(n,n.return)),n!==null&&r&4&&Wc(e,e.memoizedProps,n.memoizedProps);break;case 5:if(fl(t,e),hl(e),r&512&&(Zc||n===null||Hc(n,n.return)),e.flags&32){a=e.stateNode;try{Yt(a,``)}catch(t){Uu(e,e.return,t)}}r&4&&e.stateNode!=null&&(a=e.memoizedProps,Wc(e,a,n===null?a:n.memoizedProps)),r&1024&&(Qc=!0);break;case 6:if(fl(t,e),hl(e),r&4){if(e.stateNode===null)throw Error(i(162));r=e.memoizedProps,n=e.stateNode;try{n.nodeValue=r}catch(t){Uu(e,e.return,t)}}break;case 3:if(Bf=null,a=pl,pl=gf(t.containerInfo),fl(t,e),pl=a,hl(e),r&4&&n!==null&&n.memoizedState.isDehydrated)try{Np(t.containerInfo)}catch(t){Uu(e,e.return,t)}Qc&&(Qc=!1,gl(e));break;case 4:r=pl,pl=gf(e.stateNode.containerInfo),fl(t,e),hl(e),pl=r;break;case 12:fl(t,e),hl(e);break;case 31:fl(t,e),hl(e),r&4&&(r=e.updateQueue,r!==null&&(e.updateQueue=null,dl(e,r)));break;case 13:fl(t,e),hl(e),e.child.flags&8192&&e.memoizedState!==null!=(n!==null&&n.memoizedState!==null)&&(Zl=ke()),r&4&&(r=e.updateQueue,r!==null&&(e.updateQueue=null,dl(e,r)));break;case 22:a=e.memoizedState!==null;var l=n!==null&&n.memoizedState!==null,u=Xc,d=Zc;if(Xc=u||a,Zc=d||l,fl(t,e),Zc=d,Xc=u,hl(e),r&8192)a:for(t=e.stateNode,t._visibility=a?t._visibility&-2:t._visibility|1,a&&(n===null||l||Xc||Zc||vl(e)),n=null,t=e;;){if(t.tag===5||t.tag===26){if(n===null){l=n=t;try{if(o=l.stateNode,a)s=o.style,typeof s.setProperty==`function`?s.setProperty(`display`,`none`,`important`):s.display=`none`;else{c=l.stateNode;var f=l.memoizedProps.style,p=f!=null&&f.hasOwnProperty(`display`)?f.display:null;c.style.display=p==null||typeof p==`boolean`?``:(``+p).trim()}}catch(e){Uu(l,l.return,e)}}}else if(t.tag===6){if(n===null){l=t;try{l.stateNode.nodeValue=a?``:l.memoizedProps}catch(e){Uu(l,l.return,e)}}}else if(t.tag===18){if(n===null){l=t;try{var m=l.stateNode;a?$d(m,!0):$d(l.stateNode,!1)}catch(e){Uu(l,l.return,e)}}}else if((t.tag!==22&&t.tag!==23||t.memoizedState===null||t===e)&&t.child!==null){t.child.return=t,t=t.child;continue}if(t===e)break a;for(;t.sibling===null;){if(t.return===null||t.return===e)break a;n===t&&(n=null),t=t.return}n===t&&(n=null),t.sibling.return=t.return,t=t.sibling}r&4&&(r=e.updateQueue,r!==null&&(n=r.retryQueue,n!==null&&(r.retryQueue=null,dl(e,n))));break;case 19:fl(t,e),hl(e),r&4&&(r=e.updateQueue,r!==null&&(e.updateQueue=null,dl(e,r)));break;case 30:break;case 21:break;default:fl(t,e),hl(e)}}function hl(e){var t=e.flags;if(t&2){try{for(var n,r=e.return;r!==null;){if(Gc(r)){n=r;break}r=r.return}if(n==null)throw Error(i(160));switch(n.tag){case 27:var a=n.stateNode;Jc(e,Kc(e),a);break;case 5:var o=n.stateNode;n.flags&32&&(Yt(o,``),n.flags&=-33),Jc(e,Kc(e),o);break;case 3:case 4:var s=n.stateNode.containerInfo;qc(e,Kc(e),s);break;default:throw Error(i(161))}}catch(t){Uu(e,e.return,t)}e.flags&=-3}t&4096&&(e.flags&=-4097)}function gl(e){if(e.subtreeFlags&1024)for(e=e.child;e!==null;){var t=e;gl(t),t.tag===5&&t.flags&1024&&t.stateNode.reset(),e=e.sibling}}function _l(e,t){if(t.subtreeFlags&8772)for(t=t.child;t!==null;)nl(e,t.alternate,t),t=t.sibling}function vl(e){for(e=e.child;e!==null;){var t=e;switch(t.tag){case 0:case 11:case 14:case 15:Rc(4,t,t.return),vl(t);break;case 1:Hc(t,t.return);var n=t.stateNode;typeof n.componentWillUnmount==`function`&&Bc(t,t.return,n),vl(t);break;case 27:pf(t.stateNode);case 26:case 5:Hc(t,t.return),vl(t);break;case 22:t.memoizedState===null&&vl(t);break;case 30:vl(t);break;default:vl(t)}e=e.sibling}}function yl(e,t,n){for(n&&=!!(t.subtreeFlags&8772),t=t.child;t!==null;){var r=t.alternate,i=e,a=t,o=a.flags;switch(a.tag){case 0:case 11:case 15:yl(i,a,n),Lc(4,a);break;case 1:if(yl(i,a,n),r=a,i=r.stateNode,typeof i.componentDidMount==`function`)try{i.componentDidMount()}catch(e){Uu(r,r.return,e)}if(r=a,i=r.updateQueue,i!==null){var s=r.stateNode;try{var c=i.shared.hiddenCallbacks;if(c!==null)for(i.shared.hiddenCallbacks=null,i=0;i<c.length;i++)Za(c[i],s)}catch(e){Uu(r,r.return,e)}}n&&o&64&&zc(a),Vc(a,a.return);break;case 27:Yc(a);case 26:case 5:yl(i,a,n),n&&r===null&&o&4&&Uc(a),Vc(a,a.return);break;case 12:yl(i,a,n);break;case 31:yl(i,a,n),n&&o&4&&cl(i,a);break;case 13:yl(i,a,n),n&&o&4&&ll(i,a);break;case 22:a.memoizedState===null&&yl(i,a,n),Vc(a,a.return);break;case 30:break;default:yl(i,a,n)}t=t.sibling}}function bl(e,t){var n=null;e!==null&&e.memoizedState!==null&&e.memoizedState.cachePool!==null&&(n=e.memoizedState.cachePool.pool),e=null,t.memoizedState!==null&&t.memoizedState.cachePool!==null&&(e=t.memoizedState.cachePool.pool),e!==n&&(e!=null&&e.refCount++,n!=null&&ua(n))}function xl(e,t){e=null,t.alternate!==null&&(e=t.alternate.memoizedState.cache),t=t.memoizedState.cache,t!==e&&(t.refCount++,e!=null&&ua(e))}function Sl(e,t,n,r){if(t.subtreeFlags&10256)for(t=t.child;t!==null;)Cl(e,t,n,r),t=t.sibling}function Cl(e,t,n,r){var i=t.flags;switch(t.tag){case 0:case 11:case 15:Sl(e,t,n,r),i&2048&&Lc(9,t);break;case 1:Sl(e,t,n,r);break;case 3:Sl(e,t,n,r),i&2048&&(e=null,t.alternate!==null&&(e=t.alternate.memoizedState.cache),t=t.memoizedState.cache,t!==e&&(t.refCount++,e!=null&&ua(e)));break;case 12:if(i&2048){Sl(e,t,n,r),e=t.stateNode;try{var a=t.memoizedProps,o=a.id,s=a.onPostCommit;typeof s==`function`&&s(o,t.alternate===null?`mount`:`update`,e.passiveEffectDuration,-0)}catch(e){Uu(t,t.return,e)}}else Sl(e,t,n,r);break;case 31:Sl(e,t,n,r);break;case 13:Sl(e,t,n,r);break;case 23:break;case 22:a=t.stateNode,o=t.alternate,t.memoizedState===null?a._visibility&2?Sl(e,t,n,r):(a._visibility|=2,wl(e,t,n,r,!!(t.subtreeFlags&10256)||!1)):a._visibility&2?Sl(e,t,n,r):Tl(e,t),i&2048&&bl(o,t);break;case 24:Sl(e,t,n,r),i&2048&&xl(t.alternate,t);break;default:Sl(e,t,n,r)}}function wl(e,t,n,r,i){for(i&&=!!(t.subtreeFlags&10256)||!1,t=t.child;t!==null;){var a=e,o=t,s=n,c=r,l=o.flags;switch(o.tag){case 0:case 11:case 15:wl(a,o,s,c,i),Lc(8,o);break;case 23:break;case 22:var u=o.stateNode;o.memoizedState===null?(u._visibility|=2,wl(a,o,s,c,i)):u._visibility&2?wl(a,o,s,c,i):Tl(a,o),i&&l&2048&&bl(o.alternate,o);break;case 24:wl(a,o,s,c,i),i&&l&2048&&xl(o.alternate,o);break;default:wl(a,o,s,c,i)}t=t.sibling}}function Tl(e,t){if(t.subtreeFlags&10256)for(t=t.child;t!==null;){var n=e,r=t,i=r.flags;switch(r.tag){case 22:Tl(n,r),i&2048&&bl(r.alternate,r);break;case 24:Tl(n,r),i&2048&&xl(r.alternate,r);break;default:Tl(n,r)}t=t.sibling}}var El=8192;function Dl(e,t,n){if(e.subtreeFlags&El)for(e=e.child;e!==null;)Ol(e,t,n),e=e.sibling}function Ol(e,t,n){switch(e.tag){case 26:Dl(e,t,n),e.flags&El&&e.memoizedState!==null&&Gf(n,pl,e.memoizedState,e.memoizedProps);break;case 5:Dl(e,t,n);break;case 3:case 4:var r=pl;pl=gf(e.stateNode.containerInfo),Dl(e,t,n),pl=r;break;case 22:e.memoizedState===null&&(r=e.alternate,r!==null&&r.memoizedState!==null?(r=El,El=16777216,Dl(e,t,n),El=r):Dl(e,t,n));break;default:Dl(e,t,n)}}function kl(e){var t=e.alternate;if(t!==null&&(e=t.child,e!==null)){t.child=null;do t=e.sibling,e.sibling=null,e=t;while(e!==null)}}function Al(e){var t=e.deletions;if(e.flags&16){if(t!==null)for(var n=0;n<t.length;n++){var r=t[n];el=r,Nl(r,e)}kl(e)}if(e.subtreeFlags&10256)for(e=e.child;e!==null;)jl(e),e=e.sibling}function jl(e){switch(e.tag){case 0:case 11:case 15:Al(e),e.flags&2048&&Rc(9,e,e.return);break;case 3:Al(e);break;case 12:Al(e);break;case 22:var t=e.stateNode;e.memoizedState!==null&&t._visibility&2&&(e.return===null||e.return.tag!==13)?(t._visibility&=-3,Ml(e)):Al(e);break;default:Al(e)}}function Ml(e){var t=e.deletions;if(e.flags&16){if(t!==null)for(var n=0;n<t.length;n++){var r=t[n];el=r,Nl(r,e)}kl(e)}for(e=e.child;e!==null;){switch(t=e,t.tag){case 0:case 11:case 15:Rc(8,t,t.return),Ml(t);break;case 22:n=t.stateNode,n._visibility&2&&(n._visibility&=-3,Ml(t));break;default:Ml(t)}e=e.sibling}}function Nl(e,t){for(;el!==null;){var n=el;switch(n.tag){case 0:case 11:case 15:Rc(8,n,t);break;case 23:case 22:if(n.memoizedState!==null&&n.memoizedState.cachePool!==null){var r=n.memoizedState.cachePool.pool;r!=null&&r.refCount++}break;case 24:ua(n.memoizedState.cache)}if(r=n.child,r!==null)r.return=n,el=r;else a:for(n=e;el!==null;){r=el;var i=r.sibling,a=r.return;if(rl(r),r===n){el=null;break a}if(i!==null){i.return=a,el=i;break a}el=a}}}var Pl={getCacheForType:function(e){var t=na(ca),n=t.data.get(e);return n===void 0&&(n=e(),t.data.set(e,n)),n},cacheSignal:function(){return na(ca).controller.signal}},Fl=typeof WeakMap==`function`?WeakMap:Map,Y=0,Il=null,X=null,Z=0,Q=0,Ll=null,Rl=!1,zl=!1,Bl=!1,Vl=0,Hl=0,Ul=0,Wl=0,Gl=0,Kl=0,ql=0,Jl=null,Yl=null,Xl=!1,Zl=0,Ql=0,$l=1/0,eu=null,tu=null,nu=0,ru=null,iu=null,au=0,ou=0,su=null,cu=null,lu=0,uu=null;function du(){return Y&2&&Z!==0?Z&-Z:E.T===null?st():ud()}function fu(){if(Kl===0){if(!(Z&536870912)||R){var e=Ke;Ke<<=1,!(Ke&3932160)&&(Ke=262144),Kl=e}else Kl=536870912}return e=io.current,e!==null&&(e.flags|=32),Kl}function pu(e,t,n){(e===Il&&(Q===2||Q===9)||e.cancelPendingCommit!==null)&&(bu(e,0),_u(e,Z,Kl,!1)),et(e,n),(!(Y&2)||e!==Il)&&(e===Il&&(!(Y&2)&&(Wl|=n),Hl===4&&_u(e,Z,Kl,!1)),nd(e))}function mu(e,t,n){if(Y&6)throw Error(i(327));var r=!n&&!(t&127)&&(t&e.expiredLanes)===0||Xe(e,t),a=r?Ou(e,t):Eu(e,t,!0),o=r;do{if(a===0){zl&&!r&&_u(e,t,0,!1);break}if(n=e.current.alternate,o&&!gu(n)){a=Eu(e,t,!1),o=!1;continue}if(a===2){if(o=t,e.errorRecoveryDisabledLanes&o)var s=0;else s=e.pendingLanes&-536870913,s=s===0?s&536870912?536870912:0:s;if(s!==0){t=s;a:{var c=e;a=Jl;var l=c.current.memoizedState.isDehydrated;if(l&&(bu(c,s).flags|=256),s=Eu(c,s,!1),s!==2){if(Bl&&!l){c.errorRecoveryDisabledLanes|=o,Wl|=o,a=4;break a}o=Yl,Yl=a,o!==null&&(Yl===null?Yl=o:Yl.push.apply(Yl,o))}a=s}if(o=!1,a!==2)continue}}if(a===1){bu(e,0),_u(e,t,0,!0);break}a:{switch(r=e,o=a,o){case 0:case 1:throw Error(i(345));case 4:if((t&4194048)!==t)break;case 6:_u(r,t,Kl,!Rl);break a;case 2:Yl=null;break;case 3:case 5:break;default:throw Error(i(329))}if((t&62914560)===t&&(a=Zl+300-ke(),10<a)){if(_u(r,t,Kl,!Rl),Ye(r,0,!0)!==0)break a;au=t,r.timeoutHandle=Kd(hu.bind(null,r,n,Yl,eu,Xl,t,Kl,Wl,ql,Rl,o,`Throttled`,-0,0),a);break a}hu(r,n,Yl,eu,Xl,t,Kl,Wl,ql,Rl,o,null,-0,0)}break}while(1);nd(e)}function hu(e,t,n,r,i,a,o,s,c,l,u,d,f,p){if(e.timeoutHandle=-1,d=t.subtreeFlags,d&8192||(d&16785408)==16785408){d={stylesheets:null,count:0,imgCount:0,imgBytes:0,suspenseyImages:[],waitingForImages:!0,waitingForViewTransition:!1,unsuspend:rn},Ol(t,a,d);var m=(a&62914560)===a?Zl-ke():(a&4194048)===a?Ql-ke():0;if(m=qf(d,m),m!==null){au=a,e.cancelPendingCommit=m(Fu.bind(null,e,t,a,n,r,i,o,s,c,u,d,null,f,p)),_u(e,a,o,!l);return}}Fu(e,t,a,n,r,i,o,s,c)}function gu(e){for(var t=e;;){var n=t.tag;if((n===0||n===11||n===15)&&t.flags&16384&&(n=t.updateQueue,n!==null&&(n=n.stores,n!==null)))for(var r=0;r<n.length;r++){var i=n[r],a=i.getSnapshot;i=i.value;try{if(!Tr(a(),i))return!1}catch{return!1}}if(n=t.child,t.subtreeFlags&16384&&n!==null)n.return=t,t=n;else{if(t===e)break;for(;t.sibling===null;){if(t.return===null||t.return===e)return!0;t=t.return}t.sibling.return=t.return,t=t.sibling}}return!0}function _u(e,t,n,r){t&=~Gl,t&=~Wl,e.suspendedLanes|=t,e.pingedLanes&=~t,r&&(e.warmLanes|=t),r=e.expirationTimes;for(var i=t;0<i;){var a=31-Ve(i),o=1<<a;r[a]=-1,i&=~o}n!==0&&nt(e,n,t)}function vu(){return Y&6?!0:(rd(0,!1),!1)}function yu(){if(X!==null){if(Q===0)var e=X.return;else e=X,Ji=qi=null,Ao(e),Na=null,Pa=0,e=X;for(;e!==null;)Ic(e.alternate,e),e=e.return;X=null}}function bu(e,t){var n=e.timeoutHandle;n!==-1&&(e.timeoutHandle=-1,qd(n)),n=e.cancelPendingCommit,n!==null&&(e.cancelPendingCommit=null,n()),au=0,yu(),Il=e,X=n=L(e.current,null),Z=t,Q=0,Ll=null,Rl=!1,zl=Xe(e,t),Bl=!1,ql=Kl=Gl=Wl=Ul=Hl=0,Yl=Jl=null,Xl=!1,t&8&&(t|=t&32);var r=e.entangledLanes;if(r!==0)for(e=e.entanglements,r&=t;0<r;){var i=31-Ve(r),a=1<<i;t|=e[i],r&=~a}return Vl=t,ni(),n}function xu(e,t){z=null,E.H=Ls,t===Ca||t===Ta?(t=ja(),Q=3):t===wa?(t=ja(),Q=4):Q=t===Zs?8:typeof t==`object`&&t&&typeof t.then==`function`?6:1,Ll=t,X===null&&(Hl=1,Gs(e,yi(t,e.current)))}function Su(){var e=io.current;return e===null?!0:(Z&4194048)===Z?ao===null:(Z&62914560)===Z||Z&536870912?e===ao:!1}function Cu(){var e=E.H;return E.H=Ls,e===null?Ls:e}function wu(){var e=E.A;return E.A=Pl,e}function Tu(){Hl=4,Rl||(Z&4194048)!==Z&&io.current!==null||(zl=!0),!(Ul&134217727)&&!(Wl&134217727)||Il===null||_u(Il,Z,Kl,!1)}function Eu(e,t,n){var r=Y;Y|=2;var i=Cu(),a=wu();(Il!==e||Z!==t)&&(eu=null,bu(e,t)),t=!1;var o=Hl;a:do try{if(Q!==0&&X!==null){var s=X,c=Ll;switch(Q){case 8:yu(),o=6;break a;case 3:case 2:case 9:case 6:io.current===null&&(t=!0);var l=Q;if(Q=0,Ll=null,Mu(e,s,c,l),n&&zl){o=0;break a}break;default:l=Q,Q=0,Ll=null,Mu(e,s,c,l)}}Du(),o=Hl;break}catch(t){xu(e,t)}while(1);return t&&e.shellSuspendCounter++,Ji=qi=null,Y=r,E.H=i,E.A=a,X===null&&(Il=null,Z=0,ni()),o}function Du(){for(;X!==null;)Au(X)}function Ou(e,t){var n=Y;Y|=2;var r=Cu(),a=wu();Il!==e||Z!==t?(eu=null,$l=ke()+500,bu(e,t)):zl=Xe(e,t);a:do try{if(Q!==0&&X!==null){t=X;var o=Ll;b:switch(Q){case 1:Q=0,Ll=null,Mu(e,t,o,1);break;case 2:case 9:if(Da(o)){Q=0,Ll=null,ju(t);break}t=function(){Q!==2&&Q!==9||Il!==e||(Q=7),nd(e)},o.then(t,t);break a;case 3:Q=7;break a;case 4:Q=5;break a;case 7:Da(o)?(Q=0,Ll=null,ju(t)):(Q=0,Ll=null,Mu(e,t,o,7));break;case 5:var s=null;switch(X.tag){case 26:s=X.memoizedState;case 5:case 27:var c=X;if(s?Wf(s):c.stateNode.complete){Q=0,Ll=null;var l=c.sibling;if(l!==null)X=l;else{var u=c.return;u===null?X=null:(X=u,Nu(u))}break b}}Q=0,Ll=null,Mu(e,t,o,5);break;case 6:Q=0,Ll=null,Mu(e,t,o,6);break;case 8:yu(),Hl=6;break a;default:throw Error(i(462))}}ku();break}catch(t){xu(e,t)}while(1);return Ji=qi=null,E.H=r,E.A=a,Y=n,X===null?(Il=null,Z=0,ni(),Hl):0}function ku(){for(;X!==null&&!De();)Au(X)}function Au(e){var t=Dc(e.alternate,e,Vl);e.memoizedProps=e.pendingProps,t===null?Nu(e):X=t}function ju(e){var t=e,n=t.alternate;switch(t.tag){case 15:case 0:t=dc(n,t,t.pendingProps,t.type,void 0,Z);break;case 11:t=dc(n,t,t.pendingProps,t.type.render,t.ref,Z);break;case 5:Ao(t);default:Ic(n,t),t=X=fi(t,Vl),t=Dc(n,t,Vl)}e.memoizedProps=e.pendingProps,t===null?Nu(e):X=t}function Mu(e,t,n,r){Ji=qi=null,Ao(t),Na=null,Pa=0;var i=t.return;try{if(Xs(e,i,t,n,Z)){Hl=1,Gs(e,yi(n,e.current)),X=null;return}}catch(t){if(i!==null)throw X=i,t;Hl=1,Gs(e,yi(n,e.current)),X=null;return}t.flags&32768?(R||r===1?e=!0:zl||Z&536870912?e=!1:(Rl=e=!0,(r===2||r===9||r===3||r===6)&&(r=io.current,r!==null&&r.tag===13&&(r.flags|=16384))),Pu(t,e)):Nu(t)}function Nu(e){var t=e;do{if(t.flags&32768){Pu(t,Rl);return}e=t.return;var n=Pc(t.alternate,t,Vl);if(n!==null){X=n;return}if(t=t.sibling,t!==null){X=t;return}X=t=e}while(t!==null);Hl===0&&(Hl=5)}function Pu(e,t){do{var n=Fc(e.alternate,e);if(n!==null){n.flags&=32767,X=n;return}if(n=e.return,n!==null&&(n.flags|=32768,n.subtreeFlags=0,n.deletions=null),!t&&(e=e.sibling,e!==null)){X=e;return}X=e=n}while(e!==null);Hl=6,X=null}function Fu(e,t,n,r,a,o,s,c,l){e.cancelPendingCommit=null;do Bu();while(nu!==0);if(Y&6)throw Error(i(327));if(t!==null){if(t===e.current)throw Error(i(177));if(o=t.lanes|t.childLanes,o|=ti,tt(e,n,o,s,c,l),e===Il&&(X=Il=null,Z=0),iu=t,ru=e,au=n,ou=o,su=a,cu=r,t.subtreeFlags&10256||t.flags&10256?(e.callbackNode=null,e.callbackPriority=0,Yu(Ne,function(){return Vu(),null})):(e.callbackNode=null,e.callbackPriority=0),r=!!(t.flags&13878),t.subtreeFlags&13878||r){r=E.T,E.T=null,a=D.p,D.p=2,s=Y,Y|=4;try{tl(e,t,n)}finally{Y=s,D.p=a,E.T=r}}nu=1,Iu(),Lu(),Ru()}}function Iu(){if(nu===1){nu=0;var e=ru,t=iu,n=!!(t.flags&13878);if(t.subtreeFlags&13878||n){n=E.T,E.T=null;var r=D.p;D.p=2;var i=Y;Y|=4;try{ml(t,e);var a=zd,o=Ar(e.containerInfo),s=a.focusedElem,c=a.selectionRange;if(o!==s&&s&&s.ownerDocument&&kr(s.ownerDocument.documentElement,s)){if(c!==null&&jr(s)){var l=c.start,u=c.end;if(u===void 0&&(u=l),`selectionStart`in s)s.selectionStart=l,s.selectionEnd=Math.min(u,s.value.length);else{var d=s.ownerDocument||document,f=d&&d.defaultView||window;if(f.getSelection){var p=f.getSelection(),m=s.textContent.length,h=Math.min(c.start,m),g=c.end===void 0?h:Math.min(c.end,m);!p.extend&&h>g&&(o=g,g=h,h=o);var _=Or(s,h),v=Or(s,g);if(_&&v&&(p.rangeCount!==1||p.anchorNode!==_.node||p.anchorOffset!==_.offset||p.focusNode!==v.node||p.focusOffset!==v.offset)){var y=d.createRange();y.setStart(_.node,_.offset),p.removeAllRanges(),h>g?(p.addRange(y),p.extend(v.node,v.offset)):(y.setEnd(v.node,v.offset),p.addRange(y))}}}}for(d=[],p=s;p=p.parentNode;)p.nodeType===1&&d.push({element:p,left:p.scrollLeft,top:p.scrollTop});for(typeof s.focus==`function`&&s.focus(),s=0;s<d.length;s++){var b=d[s];b.element.scrollLeft=b.left,b.element.scrollTop=b.top}}sp=!!Rd,zd=Rd=null}finally{Y=i,D.p=r,E.T=n}}e.current=t,nu=2}}function Lu(){if(nu===2){nu=0;var e=ru,t=iu,n=!!(t.flags&8772);if(t.subtreeFlags&8772||n){n=E.T,E.T=null;var r=D.p;D.p=2;var i=Y;Y|=4;try{nl(e,t.alternate,t)}finally{Y=i,D.p=r,E.T=n}}nu=3}}function Ru(){if(nu===4||nu===3){nu=0,Oe();var e=ru,t=iu,n=au,r=cu;t.subtreeFlags&10256||t.flags&10256?nu=5:(nu=0,iu=ru=null,zu(e,e.pendingLanes));var i=e.pendingLanes;if(i===0&&(tu=null),ot(n),t=t.stateNode,ze&&typeof ze.onCommitFiberRoot==`function`)try{ze.onCommitFiberRoot(Re,t,void 0,(t.current.flags&128)==128)}catch{}if(r!==null){t=E.T,i=D.p,D.p=2,E.T=null;try{for(var a=e.onRecoverableError,o=0;o<r.length;o++){var s=r[o];a(s.value,{componentStack:s.stack})}}finally{E.T=t,D.p=i}}au&3&&Bu(),nd(e),i=e.pendingLanes,n&261930&&i&42?e===uu?lu++:(lu=0,uu=e):lu=0,rd(0,!1)}}function zu(e,t){(e.pooledCacheLanes&=t)===0&&(t=e.pooledCache,t!=null&&(e.pooledCache=null,ua(t)))}function Bu(){return Iu(),Lu(),Ru(),Vu()}function Vu(){if(nu!==5)return!1;var e=ru,t=ou;ou=0;var n=ot(au),r=E.T,a=D.p;try{D.p=32>n?32:n,E.T=null,n=su,su=null;var o=ru,s=au;if(nu=0,iu=ru=null,au=0,Y&6)throw Error(i(331));var c=Y;if(Y|=4,jl(o.current),Cl(o,o.current,s,n),Y=c,rd(0,!1),ze&&typeof ze.onPostCommitFiberRoot==`function`)try{ze.onPostCommitFiberRoot(Re,o)}catch{}return!0}finally{D.p=a,E.T=r,zu(e,t)}}function Hu(e,t,n){t=yi(n,t),t=qs(e.stateNode,t,2),e=Ga(e,t,2),e!==null&&(et(e,2),nd(e))}function Uu(e,t,n){if(e.tag===3)Hu(e,e,n);else for(;t!==null;){if(t.tag===3){Hu(t,e,n);break}if(t.tag===1){var r=t.stateNode;if(typeof t.type.getDerivedStateFromError==`function`||typeof r.componentDidCatch==`function`&&(tu===null||!tu.has(r))){e=yi(n,e),n=Js(2),r=Ga(t,n,2),r!==null&&(Ys(n,r,t,e),et(r,2),nd(r));break}}t=t.return}}function Wu(e,t,n){var r=e.pingCache;if(r===null){r=e.pingCache=new Fl;var i=new Set;r.set(t,i)}else i=r.get(t),i===void 0&&(i=new Set,r.set(t,i));i.has(n)||(Bl=!0,i.add(n),e=Gu.bind(null,e,t,n),t.then(e,e))}function Gu(e,t,n){var r=e.pingCache;r!==null&&r.delete(t),e.pingedLanes|=e.suspendedLanes&n,e.warmLanes&=~n,Il===e&&(Z&n)===n&&(Hl===4||Hl===3&&(Z&62914560)===Z&&300>ke()-Zl?!(Y&2)&&bu(e,0):Gl|=n,ql===Z&&(ql=0)),nd(e)}function Ku(e,t){t===0&&(t=Qe()),e=ai(e,t),e!==null&&(et(e,t),nd(e))}function qu(e){var t=e.memoizedState,n=0;t!==null&&(n=t.retryLane),Ku(e,n)}function Ju(e,t){var n=0;switch(e.tag){case 31:case 13:var r=e.stateNode,a=e.memoizedState;a!==null&&(n=a.retryLane);break;case 19:r=e.stateNode;break;case 22:r=e.stateNode._retryCache;break;default:throw Error(i(314))}r!==null&&r.delete(t),Ku(e,n)}function Yu(e,t){return P(e,t)}var Xu=null,Zu=null,Qu=!1,$u=!1,ed=!1,td=0;function nd(e){e!==Zu&&e.next===null&&(Zu===null?Xu=Zu=e:Zu=Zu.next=e),$u=!0,Qu||(Qu=!0,ld())}function rd(e,t){if(!ed&&$u){ed=!0;do for(var n=!1,r=Xu;r!==null;){if(!t){if(e!==0){var i=r.pendingLanes;if(i===0)var a=0;else{var o=r.suspendedLanes,s=r.pingedLanes;a=(1<<31-Ve(42|e)+1)-1,a&=i&~(o&~s),a=a&201326741?a&201326741|1:a?a|2:0}a!==0&&(n=!0,cd(r,a))}else a=Z,a=Ye(r,r===Il?a:0,r.cancelPendingCommit!==null||r.timeoutHandle!==-1),!(a&3)||Xe(r,a)||(n=!0,cd(r,a))}r=r.next}while(n);ed=!1}}function id(){ad()}function ad(){$u=Qu=!1;var e=0;td!==0&&Gd()&&(e=td);for(var t=ke(),n=null,r=Xu;r!==null;){var i=r.next,a=od(r,t);a===0?(r.next=null,n===null?Xu=i:n.next=i,i===null&&(Zu=n)):(n=r,(e!==0||a&3)&&($u=!0)),r=i}nu!==0&&nu!==5||rd(e,!1),td!==0&&(td=0)}function od(e,t){for(var n=e.suspendedLanes,r=e.pingedLanes,i=e.expirationTimes,a=e.pendingLanes&-62914561;0<a;){var o=31-Ve(a),s=1<<o,c=i[o];c===-1?((s&n)===0||(s&r)!==0)&&(i[o]=Ze(s,t)):c<=t&&(e.expiredLanes|=s),a&=~s}if(t=Il,n=Z,n=Ye(e,e===t?n:0,e.cancelPendingCommit!==null||e.timeoutHandle!==-1),r=e.callbackNode,n===0||e===t&&(Q===2||Q===9)||e.cancelPendingCommit!==null)return r!==null&&r!==null&&Ee(r),e.callbackNode=null,e.callbackPriority=0;if(!(n&3)||Xe(e,n)){if(t=n&-n,t===e.callbackPriority)return t;switch(r!==null&&Ee(r),ot(n)){case 2:case 8:n=Me;break;case 32:n=Ne;break;case 268435456:n=Fe;break;default:n=Ne}return r=sd.bind(null,e),n=P(n,r),e.callbackPriority=t,e.callbackNode=n,t}return r!==null&&r!==null&&Ee(r),e.callbackPriority=2,e.callbackNode=null,2}function sd(e,t){if(nu!==0&&nu!==5)return e.callbackNode=null,e.callbackPriority=0,null;var n=e.callbackNode;if(Bu()&&e.callbackNode!==n)return null;var r=Z;return r=Ye(e,e===Il?r:0,e.cancelPendingCommit!==null||e.timeoutHandle!==-1),r===0?null:(mu(e,r,t),od(e,ke()),e.callbackNode!=null&&e.callbackNode===n?sd.bind(null,e):null)}function cd(e,t){if(Bu())return null;mu(e,t,!0)}function ld(){Yd(function(){Y&6?P(je,id):ad()})}function ud(){if(td===0){var e=pa;e===0&&(e=Ge,Ge<<=1,!(Ge&261888)&&(Ge=256)),td=e}return td}function dd(e){return e==null||typeof e==`symbol`||typeof e==`boolean`?null:typeof e==`function`?e:nn(``+e)}function fd(e,t){var n=t.ownerDocument.createElement(`input`);return n.name=t.name,n.value=t.value,e.id&&n.setAttribute(`form`,e.id),t.parentNode.insertBefore(n,t),e=new FormData(e),n.parentNode.removeChild(n),e}function pd(e,t,n,r,i){if(t===`submit`&&n&&n.stateNode===i){var a=dd((i[dt]||null).action),o=r.submitter;o&&(t=(t=o[dt]||null)?dd(t.formAction):o.getAttribute(`formAction`),t!==null&&(a=t,o=null));var s=new Tn(`action`,`action`,null,r,i);e.push({event:s,listeners:[{instance:null,listener:function(){if(r.defaultPrevented){if(td!==0){var e=o?fd(i,o):new FormData(i);ws(n,{pending:!0,data:e,method:i.method,action:a},null,e)}}else typeof a==`function`&&(s.preventDefault(),e=o?fd(i,o):new FormData(i),ws(n,{pending:!0,data:e,method:i.method,action:a},a,e))},currentTarget:i}]})}}for(var md=0;md<Zr.length;md++){var hd=Zr[md];Qr(hd.toLowerCase(),`on`+(hd[0].toUpperCase()+hd.slice(1)))}Qr(Ur,`onAnimationEnd`),Qr(Wr,`onAnimationIteration`),Qr(Gr,`onAnimationStart`),Qr(`dblclick`,`onDoubleClick`),Qr(`focusin`,`onFocus`),Qr(`focusout`,`onBlur`),Qr(Kr,`onTransitionRun`),Qr(qr,`onTransitionStart`),Qr(Jr,`onTransitionCancel`),Qr(Yr,`onTransitionEnd`),Dt(`onMouseEnter`,[`mouseout`,`mouseover`]),Dt(`onMouseLeave`,[`mouseout`,`mouseover`]),Dt(`onPointerEnter`,[`pointerout`,`pointerover`]),Dt(`onPointerLeave`,[`pointerout`,`pointerover`]),Et(`onChange`,`change click focusin focusout input keydown keyup selectionchange`.split(` `)),Et(`onSelect`,`focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange`.split(` `)),Et(`onBeforeInput`,[`compositionend`,`keypress`,`textInput`,`paste`]),Et(`onCompositionEnd`,`compositionend focusout keydown keypress keyup mousedown`.split(` `)),Et(`onCompositionStart`,`compositionstart focusout keydown keypress keyup mousedown`.split(` `)),Et(`onCompositionUpdate`,`compositionupdate focusout keydown keypress keyup mousedown`.split(` `));var gd=`abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting`.split(` `),_d=new Set(`beforetoggle cancel close invalid load scroll scrollend toggle`.split(` `).concat(gd));function vd(e,t){t=!!(t&4);for(var n=0;n<e.length;n++){var r=e[n],i=r.event;r=r.listeners;a:{var a=void 0;if(t)for(var o=r.length-1;0<=o;o--){var s=r[o],c=s.instance,l=s.currentTarget;if(s=s.listener,c!==a&&i.isPropagationStopped())break a;a=s,i.currentTarget=l;try{a(i)}catch(e){$r(e)}i.currentTarget=null,a=c}else for(o=0;o<r.length;o++){if(s=r[o],c=s.instance,l=s.currentTarget,s=s.listener,c!==a&&i.isPropagationStopped())break a;a=s,i.currentTarget=l;try{a(i)}catch(e){$r(e)}i.currentTarget=null,a=c}}}}function $(e,t){var n=t[pt];n===void 0&&(n=t[pt]=new Set);var r=e+`__bubble`;n.has(r)||(Sd(t,e,2,!1),n.add(r))}function yd(e,t,n){var r=0;t&&(r|=4),Sd(n,e,r,t)}var bd=`_reactListening`+Math.random().toString(36).slice(2);function xd(e){if(!e[bd]){e[bd]=!0,wt.forEach(function(t){t!==`selectionchange`&&(_d.has(t)||yd(t,!1,e),yd(t,!0,e))});var t=e.nodeType===9?e:e.ownerDocument;t===null||t[bd]||(t[bd]=!0,yd(`selectionchange`,!1,t))}}function Sd(e,t,n,r){switch(mp(t)){case 2:var i=cp;break;case 8:i=lp;break;default:i=up}n=i.bind(null,t,n,e),i=void 0,!mn||t!==`touchstart`&&t!==`touchmove`&&t!==`wheel`||(i=!0),r?i===void 0?e.addEventListener(t,n,!0):e.addEventListener(t,n,{capture:!0,passive:i}):i===void 0?e.addEventListener(t,n,!1):e.addEventListener(t,n,{passive:i})}function Cd(e,t,n,r,i){var a=r;if(!(t&1)&&!(t&2)&&r!==null)a:for(;;){if(r===null)return;var s=r.tag;if(s===3||s===4){var c=r.stateNode.containerInfo;if(c===i)break;if(s===4)for(s=r.return;s!==null;){var l=s.tag;if((l===3||l===4)&&s.stateNode.containerInfo===i)return;s=s.return}for(;c!==null;){if(s=yt(c),s===null)return;if(l=s.tag,l===5||l===6||l===26||l===27){r=a=s;continue a}c=c.parentNode}}r=r.return}dn(function(){var r=a,i=on(n),s=[];a:{var c=Xr.get(e);if(c!==void 0){var l=Tn,u=e;switch(e){case`keypress`:if(bn(n)===0)break a;case`keydown`:case`keyup`:l=Un;break;case`focusin`:u=`focus`,l=Pn;break;case`focusout`:u=`blur`,l=Pn;break;case`beforeblur`:case`afterblur`:l=Pn;break;case`click`:if(n.button===2)break a;case`auxclick`:case`dblclick`:case`mousedown`:case`mousemove`:case`mouseup`:case`mouseout`:case`mouseover`:case`contextmenu`:l=Mn;break;case`drag`:case`dragend`:case`dragenter`:case`dragexit`:case`dragleave`:case`dragover`:case`dragstart`:case`drop`:l=Nn;break;case`touchcancel`:case`touchend`:case`touchmove`:case`touchstart`:l=Gn;break;case Ur:case Wr:case Gr:l=Fn;break;case Yr:l=Kn;break;case`scroll`:case`scrollend`:l=Dn;break;case`wheel`:l=qn;break;case`copy`:case`cut`:case`paste`:l=In;break;case`gotpointercapture`:case`lostpointercapture`:case`pointercancel`:case`pointerdown`:case`pointermove`:case`pointerout`:case`pointerover`:case`pointerup`:l=Wn;break;case`toggle`:case`beforetoggle`:l=Jn}var d=!!(t&4),f=!d&&(e===`scroll`||e===`scrollend`),p=d?c===null?null:c+`Capture`:c;d=[];for(var m=r,h;m!==null;){var g=m;if(h=g.stateNode,g=g.tag,g!==5&&g!==26&&g!==27||h===null||p===null||(g=fn(m,p),g!=null&&d.push(wd(m,g,h))),f)break;m=m.return}0<d.length&&(c=new l(c,u,null,n,i),s.push({event:c,listeners:d}))}}if(!(t&7)){a:{if(c=e===`mouseover`||e===`pointerover`,l=e===`mouseout`||e===`pointerout`,c&&n!==an&&(u=n.relatedTarget||n.fromElement)&&(yt(u)||u[ft]))break a;if((l||c)&&(c=i.window===i?i:(c=i.ownerDocument)?c.defaultView||c.parentWindow:window,l?(u=n.relatedTarget||n.toElement,l=r,u=u?yt(u):null,u!==null&&(f=o(u),d=u.tag,u!==f||d!==5&&d!==27&&d!==6)&&(u=null)):(l=null,u=r),l!==u)){if(d=Mn,g=`onMouseLeave`,p=`onMouseEnter`,m=`mouse`,(e===`pointerout`||e===`pointerover`)&&(d=Wn,g=`onPointerLeave`,p=`onPointerEnter`,m=`pointer`),f=l==null?c:xt(l),h=u==null?c:xt(u),c=new d(g,m+`leave`,l,n,i),c.target=f,c.relatedTarget=h,g=null,yt(i)===r&&(d=new d(p,m+`enter`,u,n,i),d.target=h,d.relatedTarget=f,g=d),f=g,l&&u)b:{for(d=Ed,p=l,m=u,h=0,g=p;g;g=d(g))h++;g=0;for(var _=m;_;_=d(_))g++;for(;0<h-g;)p=d(p),h--;for(;0<g-h;)m=d(m),g--;for(;h--;){if(p===m||m!==null&&p===m.alternate){d=p;break b}p=d(p),m=d(m)}d=null}else d=null;l!==null&&Dd(s,c,l,d,!1),u!==null&&f!==null&&Dd(s,f,u,d,!0)}}a:{if(c=r?xt(r):window,l=c.nodeName&&c.nodeName.toLowerCase(),l===`select`||l===`input`&&c.type===`file`)var v=pr;else if(sr(c)){if(mr)v=Cr;else{v=xr;var y=br}}else l=c.nodeName,!l||l.toLowerCase()!==`input`||c.type!==`checkbox`&&c.type!==`radio`?r&&$t(r.elementType)&&(v=pr):v=Sr;if(v&&=v(e,r)){cr(s,v,n,i);break a}y&&y(e,c,r),e===`focusout`&&r&&c.type===`number`&&r.memoizedProps.value!=null&&Gt(c,`number`,c.value)}switch(y=r?xt(r):window,e){case`focusin`:(sr(y)||y.contentEditable===`true`)&&(Nr=y,Pr=r,Fr=null);break;case`focusout`:Fr=Pr=Nr=null;break;case`mousedown`:Ir=!0;break;case`contextmenu`:case`mouseup`:case`dragend`:Ir=!1,Lr(s,n,i);break;case`selectionchange`:if(Mr)break;case`keydown`:case`keyup`:Lr(s,n,i)}var b;if(Xn)b:{switch(e){case`compositionstart`:var x=`onCompositionStart`;break b;case`compositionend`:x=`onCompositionEnd`;break b;case`compositionupdate`:x=`onCompositionUpdate`;break b}x=void 0}else ir?nr(e,n)&&(x=`onCompositionEnd`):e===`keydown`&&n.keyCode===229&&(x=`onCompositionStart`);x&&($n&&n.locale!==`ko`&&(ir||x!==`onCompositionStart`?x===`onCompositionEnd`&&ir&&(b=yn()):(gn=i,_n=`value`in gn?gn.value:gn.textContent,ir=!0)),y=Td(r,x),0<y.length&&(x=new Ln(x,e,null,n,i),s.push({event:x,listeners:y}),b?x.data=b:(b=rr(n),b!==null&&(x.data=b)))),(b=Qn?F(e,n):ar(e,n))&&(x=Td(r,`onBeforeInput`),0<x.length&&(y=new Ln(`onBeforeInput`,`beforeinput`,null,n,i),s.push({event:y,listeners:x}),y.data=b)),pd(s,e,r,n,i)}vd(s,t)})}function wd(e,t,n){return{instance:e,listener:t,currentTarget:n}}function Td(e,t){for(var n=t+`Capture`,r=[];e!==null;){var i=e,a=i.stateNode;if(i=i.tag,i!==5&&i!==26&&i!==27||a===null||(i=fn(e,n),i!=null&&r.unshift(wd(e,i,a)),i=fn(e,t),i!=null&&r.push(wd(e,i,a))),e.tag===3)return r;e=e.return}return[]}function Ed(e){if(e===null)return null;do e=e.return;while(e&&e.tag!==5&&e.tag!==27);return e||null}function Dd(e,t,n,r,i){for(var a=t._reactName,o=[];n!==null&&n!==r;){var s=n,c=s.alternate,l=s.stateNode;if(s=s.tag,c!==null&&c===r)break;s!==5&&s!==26&&s!==27||l===null||(c=l,i?(l=fn(n,a),l!=null&&o.unshift(wd(n,l,c))):i||(l=fn(n,a),l!=null&&o.push(wd(n,l,c)))),n=n.return}o.length!==0&&e.push({event:t,listeners:o})}var Od=/\r\n?/g,kd=/\u0000|\uFFFD/g;function Ad(e){return(typeof e==`string`?e:``+e).replace(Od,`
`).replace(kd,``)}function jd(e,t){return t=Ad(t),Ad(e)===t}function Md(e,t,n,r,a,o){switch(n){case`children`:typeof r==`string`?t===`body`||t===`textarea`&&r===``||Yt(e,r):(typeof r==`number`||typeof r==`bigint`)&&t!==`body`&&Yt(e,``+r);break;case`className`:Nt(e,`class`,r);break;case`tabIndex`:Nt(e,`tabindex`,r);break;case`dir`:case`role`:case`viewBox`:case`width`:case`height`:Nt(e,n,r);break;case`style`:Qt(e,r,o);break;case`data`:if(t!==`object`){Nt(e,`data`,r);break}case`src`:case`href`:if(r===``&&(t!==`a`||n!==`href`)){e.removeAttribute(n);break}if(r==null||typeof r==`function`||typeof r==`symbol`||typeof r==`boolean`){e.removeAttribute(n);break}r=nn(``+r),e.setAttribute(n,r);break;case`action`:case`formAction`:if(typeof r==`function`){e.setAttribute(n,`javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')`);break}if(typeof o==`function`&&(n===`formAction`?(t!==`input`&&Md(e,t,`name`,a.name,a,null),Md(e,t,`formEncType`,a.formEncType,a,null),Md(e,t,`formMethod`,a.formMethod,a,null),Md(e,t,`formTarget`,a.formTarget,a,null)):(Md(e,t,`encType`,a.encType,a,null),Md(e,t,`method`,a.method,a,null),Md(e,t,`target`,a.target,a,null))),r==null||typeof r==`symbol`||typeof r==`boolean`){e.removeAttribute(n);break}r=nn(``+r),e.setAttribute(n,r);break;case`onClick`:r!=null&&(e.onclick=rn);break;case`onScroll`:r!=null&&$(`scroll`,e);break;case`onScrollEnd`:r!=null&&$(`scrollend`,e);break;case`dangerouslySetInnerHTML`:if(r!=null){if(typeof r!=`object`||!(`__html`in r))throw Error(i(61));if(n=r.__html,n!=null){if(a.children!=null)throw Error(i(60));e.innerHTML=n}}break;case`multiple`:e.multiple=r&&typeof r!=`function`&&typeof r!=`symbol`;break;case`muted`:e.muted=r&&typeof r!=`function`&&typeof r!=`symbol`;break;case`suppressContentEditableWarning`:case`suppressHydrationWarning`:case`defaultValue`:case`defaultChecked`:case`innerHTML`:case`ref`:break;case`autoFocus`:break;case`xlinkHref`:if(r==null||typeof r==`function`||typeof r==`boolean`||typeof r==`symbol`){e.removeAttribute(`xlink:href`);break}n=nn(``+r),e.setAttributeNS(`http://www.w3.org/1999/xlink`,`xlink:href`,n);break;case`contentEditable`:case`spellCheck`:case`draggable`:case`value`:case`autoReverse`:case`externalResourcesRequired`:case`focusable`:case`preserveAlpha`:r!=null&&typeof r!=`function`&&typeof r!=`symbol`?e.setAttribute(n,``+r):e.removeAttribute(n);break;case`inert`:case`allowFullScreen`:case`async`:case`autoPlay`:case`controls`:case`default`:case`defer`:case`disabled`:case`disablePictureInPicture`:case`disableRemotePlayback`:case`formNoValidate`:case`hidden`:case`loop`:case`noModule`:case`noValidate`:case`open`:case`playsInline`:case`readOnly`:case`required`:case`reversed`:case`scoped`:case`seamless`:case`itemScope`:r&&typeof r!=`function`&&typeof r!=`symbol`?e.setAttribute(n,``):e.removeAttribute(n);break;case`capture`:case`download`:!0===r?e.setAttribute(n,``):!1!==r&&r!=null&&typeof r!=`function`&&typeof r!=`symbol`?e.setAttribute(n,r):e.removeAttribute(n);break;case`cols`:case`rows`:case`size`:case`span`:r!=null&&typeof r!=`function`&&typeof r!=`symbol`&&!isNaN(r)&&1<=r?e.setAttribute(n,r):e.removeAttribute(n);break;case`rowSpan`:case`start`:r==null||typeof r==`function`||typeof r==`symbol`||isNaN(r)?e.removeAttribute(n):e.setAttribute(n,r);break;case`popover`:$(`beforetoggle`,e),$(`toggle`,e),Mt(e,`popover`,r);break;case`xlinkActuate`:Pt(e,`http://www.w3.org/1999/xlink`,`xlink:actuate`,r);break;case`xlinkArcrole`:Pt(e,`http://www.w3.org/1999/xlink`,`xlink:arcrole`,r);break;case`xlinkRole`:Pt(e,`http://www.w3.org/1999/xlink`,`xlink:role`,r);break;case`xlinkShow`:Pt(e,`http://www.w3.org/1999/xlink`,`xlink:show`,r);break;case`xlinkTitle`:Pt(e,`http://www.w3.org/1999/xlink`,`xlink:title`,r);break;case`xlinkType`:Pt(e,`http://www.w3.org/1999/xlink`,`xlink:type`,r);break;case`xmlBase`:Pt(e,`http://www.w3.org/XML/1998/namespace`,`xml:base`,r);break;case`xmlLang`:Pt(e,`http://www.w3.org/XML/1998/namespace`,`xml:lang`,r);break;case`xmlSpace`:Pt(e,`http://www.w3.org/XML/1998/namespace`,`xml:space`,r);break;case`is`:Mt(e,`is`,r);break;case`innerText`:case`textContent`:break;default:(!(2<n.length)||n[0]!==`o`&&n[0]!==`O`||n[1]!==`n`&&n[1]!==`N`)&&(n=en.get(n)||n,Mt(e,n,r))}}function Nd(e,t,n,r,a,o){switch(n){case`style`:Qt(e,r,o);break;case`dangerouslySetInnerHTML`:if(r!=null){if(typeof r!=`object`||!(`__html`in r))throw Error(i(61));if(n=r.__html,n!=null){if(a.children!=null)throw Error(i(60));e.innerHTML=n}}break;case`children`:typeof r==`string`?Yt(e,r):(typeof r==`number`||typeof r==`bigint`)&&Yt(e,``+r);break;case`onScroll`:r!=null&&$(`scroll`,e);break;case`onScrollEnd`:r!=null&&$(`scrollend`,e);break;case`onClick`:r!=null&&(e.onclick=rn);break;case`suppressContentEditableWarning`:case`suppressHydrationWarning`:case`innerHTML`:case`ref`:break;case`innerText`:case`textContent`:break;default:if(!Tt.hasOwnProperty(n))a:{if(n[0]===`o`&&n[1]===`n`&&(a=n.endsWith(`Capture`),t=n.slice(2,a?n.length-7:void 0),o=e[dt]||null,o=o==null?null:o[n],typeof o==`function`&&e.removeEventListener(t,o,a),typeof r==`function`)){typeof o!=`function`&&o!==null&&(n in e?e[n]=null:e.hasAttribute(n)&&e.removeAttribute(n)),e.addEventListener(t,r,a);break a}n in e?e[n]=r:!0===r?e.setAttribute(n,``):Mt(e,n,r)}}}function Pd(e,t,n){switch(t){case`div`:case`span`:case`svg`:case`path`:case`a`:case`g`:case`p`:case`li`:break;case`img`:$(`error`,e),$(`load`,e);var r=!1,a=!1,o;for(o in n)if(n.hasOwnProperty(o)){var s=n[o];if(s!=null)switch(o){case`src`:r=!0;break;case`srcSet`:a=!0;break;case`children`:case`dangerouslySetInnerHTML`:throw Error(i(137,t));default:Md(e,t,o,s,n,null)}}a&&Md(e,t,`srcSet`,n.srcSet,n,null),r&&Md(e,t,`src`,n.src,n,null);return;case`input`:$(`invalid`,e);var c=o=s=a=null,l=null,u=null;for(r in n)if(n.hasOwnProperty(r)){var d=n[r];if(d!=null)switch(r){case`name`:a=d;break;case`type`:s=d;break;case`checked`:l=d;break;case`defaultChecked`:u=d;break;case`value`:o=d;break;case`defaultValue`:c=d;break;case`children`:case`dangerouslySetInnerHTML`:if(d!=null)throw Error(i(137,t));break;default:Md(e,t,r,d,n,null)}}Wt(e,o,c,l,u,s,a,!1);return;case`select`:for(a in $(`invalid`,e),r=s=o=null,n)if(n.hasOwnProperty(a)&&(c=n[a],c!=null))switch(a){case`value`:o=c;break;case`defaultValue`:s=c;break;case`multiple`:r=c;default:Md(e,t,a,c,n,null)}t=o,n=s,e.multiple=!!r,t==null?n!=null&&Kt(e,!!r,n,!0):Kt(e,!!r,t,!1);return;case`textarea`:for(s in $(`invalid`,e),o=a=r=null,n)if(n.hasOwnProperty(s)&&(c=n[s],c!=null))switch(s){case`value`:r=c;break;case`defaultValue`:a=c;break;case`children`:o=c;break;case`dangerouslySetInnerHTML`:if(c!=null)throw Error(i(91));break;default:Md(e,t,s,c,n,null)}Jt(e,r,a,o);return;case`option`:for(l in n)if(n.hasOwnProperty(l)&&(r=n[l],r!=null))switch(l){case`selected`:e.selected=r&&typeof r!=`function`&&typeof r!=`symbol`;break;default:Md(e,t,l,r,n,null)}return;case`dialog`:$(`beforetoggle`,e),$(`toggle`,e),$(`cancel`,e),$(`close`,e);break;case`iframe`:case`object`:$(`load`,e);break;case`video`:case`audio`:for(r=0;r<gd.length;r++)$(gd[r],e);break;case`image`:$(`error`,e),$(`load`,e);break;case`details`:$(`toggle`,e);break;case`embed`:case`source`:case`link`:$(`error`,e),$(`load`,e);case`area`:case`base`:case`br`:case`col`:case`hr`:case`keygen`:case`meta`:case`param`:case`track`:case`wbr`:case`menuitem`:for(u in n)if(n.hasOwnProperty(u)&&(r=n[u],r!=null))switch(u){case`children`:case`dangerouslySetInnerHTML`:throw Error(i(137,t));default:Md(e,t,u,r,n,null)}return;default:if($t(t)){for(d in n)n.hasOwnProperty(d)&&(r=n[d],r!==void 0&&Nd(e,t,d,r,n,void 0));return}}for(c in n)n.hasOwnProperty(c)&&(r=n[c],r!=null&&Md(e,t,c,r,n,null))}function Fd(e,t,n,r){switch(t){case`div`:case`span`:case`svg`:case`path`:case`a`:case`g`:case`p`:case`li`:break;case`input`:var a=null,o=null,s=null,c=null,l=null,u=null,d=null;for(m in n){var f=n[m];if(n.hasOwnProperty(m)&&f!=null)switch(m){case`checked`:break;case`value`:break;case`defaultValue`:l=f;default:r.hasOwnProperty(m)||Md(e,t,m,null,r,f)}}for(var p in r){var m=r[p];if(f=n[p],r.hasOwnProperty(p)&&(m!=null||f!=null))switch(p){case`type`:o=m;break;case`name`:a=m;break;case`checked`:u=m;break;case`defaultChecked`:d=m;break;case`value`:s=m;break;case`defaultValue`:c=m;break;case`children`:case`dangerouslySetInnerHTML`:if(m!=null)throw Error(i(137,t));break;default:m!==f&&Md(e,t,p,m,r,f)}}Ut(e,s,c,l,u,d,o,a);return;case`select`:for(o in m=s=c=p=null,n)if(l=n[o],n.hasOwnProperty(o)&&l!=null)switch(o){case`value`:break;case`multiple`:m=l;default:r.hasOwnProperty(o)||Md(e,t,o,null,r,l)}for(a in r)if(o=r[a],l=n[a],r.hasOwnProperty(a)&&(o!=null||l!=null))switch(a){case`value`:p=o;break;case`defaultValue`:c=o;break;case`multiple`:s=o;default:o!==l&&Md(e,t,a,o,r,l)}t=c,n=s,r=m,p==null?!!r!=!!n&&(t==null?Kt(e,!!n,n?[]:``,!1):Kt(e,!!n,t,!0)):Kt(e,!!n,p,!1);return;case`textarea`:for(c in m=p=null,n)if(a=n[c],n.hasOwnProperty(c)&&a!=null&&!r.hasOwnProperty(c))switch(c){case`value`:break;case`children`:break;default:Md(e,t,c,null,r,a)}for(s in r)if(a=r[s],o=n[s],r.hasOwnProperty(s)&&(a!=null||o!=null))switch(s){case`value`:p=a;break;case`defaultValue`:m=a;break;case`children`:break;case`dangerouslySetInnerHTML`:if(a!=null)throw Error(i(91));break;default:a!==o&&Md(e,t,s,a,r,o)}qt(e,p,m);return;case`option`:for(var h in n)if(p=n[h],n.hasOwnProperty(h)&&p!=null&&!r.hasOwnProperty(h))switch(h){case`selected`:e.selected=!1;break;default:Md(e,t,h,null,r,p)}for(l in r)if(p=r[l],m=n[l],r.hasOwnProperty(l)&&p!==m&&(p!=null||m!=null))switch(l){case`selected`:e.selected=p&&typeof p!=`function`&&typeof p!=`symbol`;break;default:Md(e,t,l,p,r,m)}return;case`img`:case`link`:case`area`:case`base`:case`br`:case`col`:case`embed`:case`hr`:case`keygen`:case`meta`:case`param`:case`source`:case`track`:case`wbr`:case`menuitem`:for(var g in n)p=n[g],n.hasOwnProperty(g)&&p!=null&&!r.hasOwnProperty(g)&&Md(e,t,g,null,r,p);for(u in r)if(p=r[u],m=n[u],r.hasOwnProperty(u)&&p!==m&&(p!=null||m!=null))switch(u){case`children`:case`dangerouslySetInnerHTML`:if(p!=null)throw Error(i(137,t));break;default:Md(e,t,u,p,r,m)}return;default:if($t(t)){for(var _ in n)p=n[_],n.hasOwnProperty(_)&&p!==void 0&&!r.hasOwnProperty(_)&&Nd(e,t,_,void 0,r,p);for(d in r)p=r[d],m=n[d],!r.hasOwnProperty(d)||p===m||p===void 0&&m===void 0||Nd(e,t,d,p,r,m);return}}for(var v in n)p=n[v],n.hasOwnProperty(v)&&p!=null&&!r.hasOwnProperty(v)&&Md(e,t,v,null,r,p);for(f in r)p=r[f],m=n[f],!r.hasOwnProperty(f)||p===m||p==null&&m==null||Md(e,t,f,p,r,m)}function Id(e){switch(e){case`css`:case`script`:case`font`:case`img`:case`image`:case`input`:case`link`:return!0;default:return!1}}function Ld(){if(typeof performance.getEntriesByType==`function`){for(var e=0,t=0,n=performance.getEntriesByType(`resource`),r=0;r<n.length;r++){var i=n[r],a=i.transferSize,o=i.initiatorType,s=i.duration;if(a&&s&&Id(o)){for(o=0,s=i.responseEnd,r+=1;r<n.length;r++){var c=n[r],l=c.startTime;if(l>s)break;var u=c.transferSize,d=c.initiatorType;u&&Id(d)&&(c=c.responseEnd,o+=u*(c<s?1:(s-l)/(c-l)))}if(--r,t+=8*(a+o)/(i.duration/1e3),e++,10<e)break}}if(0<e)return t/e/1e6}return navigator.connection&&(e=navigator.connection.downlink,typeof e==`number`)?e:5}var Rd=null,zd=null;function Bd(e){return e.nodeType===9?e:e.ownerDocument}function Vd(e){switch(e){case`http://www.w3.org/2000/svg`:return 1;case`http://www.w3.org/1998/Math/MathML`:return 2;default:return 0}}function Hd(e,t){if(e===0)switch(t){case`svg`:return 1;case`math`:return 2;default:return 0}return e===1&&t===`foreignObject`?0:e}function Ud(e,t){return e===`textarea`||e===`noscript`||typeof t.children==`string`||typeof t.children==`number`||typeof t.children==`bigint`||typeof t.dangerouslySetInnerHTML==`object`&&t.dangerouslySetInnerHTML!==null&&t.dangerouslySetInnerHTML.__html!=null}var Wd=null;function Gd(){var e=window.event;return e&&e.type===`popstate`?e!==Wd&&(Wd=e,!0):(Wd=null,!1)}var Kd=typeof setTimeout==`function`?setTimeout:void 0,qd=typeof clearTimeout==`function`?clearTimeout:void 0,Jd=typeof Promise==`function`?Promise:void 0,Yd=typeof queueMicrotask==`function`?queueMicrotask:Jd===void 0?Kd:function(e){return Jd.resolve(null).then(e).catch(Xd)};function Xd(e){setTimeout(function(){throw e})}function Zd(e){return e===`head`}function Qd(e,t){var n=t,r=0;do{var i=n.nextSibling;if(e.removeChild(n),i&&i.nodeType===8){if(n=i.data,n===`/$`||n===`/&`){if(r===0){e.removeChild(i),Np(t);return}r--}else if(n===`$`||n===`$?`||n===`$~`||n===`$!`||n===`&`)r++;else if(n===`html`)pf(e.ownerDocument.documentElement);else if(n===`head`){n=e.ownerDocument.head,pf(n);for(var a=n.firstChild;a;){var o=a.nextSibling,s=a.nodeName;a[_t]||s===`SCRIPT`||s===`STYLE`||s===`LINK`&&a.rel.toLowerCase()===`stylesheet`||n.removeChild(a),a=o}}else n===`body`&&pf(e.ownerDocument.body)}n=i}while(n);Np(t)}function $d(e,t){var n=e;e=0;do{var r=n.nextSibling;if(n.nodeType===1?t?(n._stashedDisplay=n.style.display,n.style.display=`none`):(n.style.display=n._stashedDisplay||``,n.getAttribute(`style`)===``&&n.removeAttribute(`style`)):n.nodeType===3&&(t?(n._stashedText=n.nodeValue,n.nodeValue=``):n.nodeValue=n._stashedText||``),r&&r.nodeType===8){if(n=r.data,n===`/$`){if(e===0)break;e--}else n!==`$`&&n!==`$?`&&n!==`$~`&&n!==`$!`||e++}n=r}while(n)}function ef(e){var t=e.firstChild;for(t&&t.nodeType===10&&(t=t.nextSibling);t;){var n=t;switch(t=t.nextSibling,n.nodeName){case`HTML`:case`HEAD`:case`BODY`:ef(n),vt(n);continue;case`SCRIPT`:case`STYLE`:continue;case`LINK`:if(n.rel.toLowerCase()===`stylesheet`)continue}e.removeChild(n)}}function tf(e,t,n,r){for(;e.nodeType===1;){var i=n;if(e.nodeName.toLowerCase()!==t.toLowerCase()){if(!r&&(e.nodeName!==`INPUT`||e.type!==`hidden`))break}else if(!r){if(t===`input`&&e.type===`hidden`){var a=i.name==null?null:``+i.name;if(i.type===`hidden`&&e.getAttribute(`name`)===a)return e}else return e}else if(!e[_t])switch(t){case`meta`:if(!e.hasAttribute(`itemprop`))break;return e;case`link`:if(a=e.getAttribute(`rel`),a===`stylesheet`&&e.hasAttribute(`data-precedence`)||a!==i.rel||e.getAttribute(`href`)!==(i.href==null||i.href===``?null:i.href)||e.getAttribute(`crossorigin`)!==(i.crossOrigin==null?null:i.crossOrigin)||e.getAttribute(`title`)!==(i.title==null?null:i.title))break;return e;case`style`:if(e.hasAttribute(`data-precedence`))break;return e;case`script`:if(a=e.getAttribute(`src`),(a!==(i.src==null?null:i.src)||e.getAttribute(`type`)!==(i.type==null?null:i.type)||e.getAttribute(`crossorigin`)!==(i.crossOrigin==null?null:i.crossOrigin))&&a&&e.hasAttribute(`async`)&&!e.hasAttribute(`itemprop`))break;return e;default:return e}if(e=cf(e.nextSibling),e===null)break}return null}function nf(e,t,n){if(t===``)return null;for(;e.nodeType!==3;)if((e.nodeType!==1||e.nodeName!==`INPUT`||e.type!==`hidden`)&&!n||(e=cf(e.nextSibling),e===null))return null;return e}function rf(e,t){for(;e.nodeType!==8;)if((e.nodeType!==1||e.nodeName!==`INPUT`||e.type!==`hidden`)&&!t||(e=cf(e.nextSibling),e===null))return null;return e}function af(e){return e.data===`$?`||e.data===`$~`}function of(e){return e.data===`$!`||e.data===`$?`&&e.ownerDocument.readyState!==`loading`}function sf(e,t){var n=e.ownerDocument;if(e.data===`$~`)e._reactRetry=t;else if(e.data!==`$?`||n.readyState!==`loading`)t();else{var r=function(){t(),n.removeEventListener(`DOMContentLoaded`,r)};n.addEventListener(`DOMContentLoaded`,r),e._reactRetry=r}}function cf(e){for(;e!=null;e=e.nextSibling){var t=e.nodeType;if(t===1||t===3)break;if(t===8){if(t=e.data,t===`$`||t===`$!`||t===`$?`||t===`$~`||t===`&`||t===`F!`||t===`F`)break;if(t===`/$`||t===`/&`)return null}}return e}var lf=null;function uf(e){e=e.nextSibling;for(var t=0;e;){if(e.nodeType===8){var n=e.data;if(n===`/$`||n===`/&`){if(t===0)return cf(e.nextSibling);t--}else n!==`$`&&n!==`$!`&&n!==`$?`&&n!==`$~`&&n!==`&`||t++}e=e.nextSibling}return null}function df(e){e=e.previousSibling;for(var t=0;e;){if(e.nodeType===8){var n=e.data;if(n===`$`||n===`$!`||n===`$?`||n===`$~`||n===`&`){if(t===0)return e;t--}else n!==`/$`&&n!==`/&`||t++}e=e.previousSibling}return null}function ff(e,t,n){switch(t=Bd(n),e){case`html`:if(e=t.documentElement,!e)throw Error(i(452));return e;case`head`:if(e=t.head,!e)throw Error(i(453));return e;case`body`:if(e=t.body,!e)throw Error(i(454));return e;default:throw Error(i(451))}}function pf(e){for(var t=e.attributes;t.length;)e.removeAttributeNode(t[0]);vt(e)}var mf=new Map,hf=new Set;function gf(e){return typeof e.getRootNode==`function`?e.getRootNode():e.nodeType===9?e:e.ownerDocument}var _f=D.d;D.d={f:vf,r:yf,D:Sf,C:Cf,L:wf,m:Tf,X:Df,S:Ef,M:Of};function vf(){var e=_f.f(),t=vu();return e||t}function yf(e){var t=bt(e);t!==null&&t.tag===5&&t.type===`form`?Es(t):_f.r(e)}var bf=typeof document>`u`?null:document;function xf(e,t,n){var r=bf;if(r&&typeof t==`string`&&t){var i=Ht(t);i=`link[rel="`+e+`"][href="`+i+`"]`,typeof n==`string`&&(i+=`[crossorigin="`+n+`"]`),hf.has(i)||(hf.add(i),e={rel:e,crossOrigin:n,href:t},r.querySelector(i)===null&&(t=r.createElement(`link`),Pd(t,`link`,e),Ct(t),r.head.appendChild(t)))}}function Sf(e){_f.D(e),xf(`dns-prefetch`,e,null)}function Cf(e,t){_f.C(e,t),xf(`preconnect`,e,t)}function wf(e,t,n){_f.L(e,t,n);var r=bf;if(r&&e&&t){var i=`link[rel="preload"][as="`+Ht(t)+`"]`;t===`image`&&n&&n.imageSrcSet?(i+=`[imagesrcset="`+Ht(n.imageSrcSet)+`"]`,typeof n.imageSizes==`string`&&(i+=`[imagesizes="`+Ht(n.imageSizes)+`"]`)):i+=`[href="`+Ht(e)+`"]`;var a=i;switch(t){case`style`:a=Af(e);break;case`script`:a=Pf(e)}mf.has(a)||(e=f({rel:`preload`,href:t===`image`&&n&&n.imageSrcSet?void 0:e,as:t},n),mf.set(a,e),r.querySelector(i)!==null||t===`style`&&r.querySelector(jf(a))||t===`script`&&r.querySelector(Ff(a))||(t=r.createElement(`link`),Pd(t,`link`,e),Ct(t),r.head.appendChild(t)))}}function Tf(e,t){_f.m(e,t);var n=bf;if(n&&e){var r=t&&typeof t.as==`string`?t.as:`script`,i=`link[rel="modulepreload"][as="`+Ht(r)+`"][href="`+Ht(e)+`"]`,a=i;switch(r){case`audioworklet`:case`paintworklet`:case`serviceworker`:case`sharedworker`:case`worker`:case`script`:a=Pf(e)}if(!mf.has(a)&&(e=f({rel:`modulepreload`,href:e},t),mf.set(a,e),n.querySelector(i)===null)){switch(r){case`audioworklet`:case`paintworklet`:case`serviceworker`:case`sharedworker`:case`worker`:case`script`:if(n.querySelector(Ff(a)))return}r=n.createElement(`link`),Pd(r,`link`,e),Ct(r),n.head.appendChild(r)}}}function Ef(e,t,n){_f.S(e,t,n);var r=bf;if(r&&e){var i=St(r).hoistableStyles,a=Af(e);t||=`default`;var o=i.get(a);if(!o){var s={loading:0,preload:null};if(o=r.querySelector(jf(a)))s.loading=5;else{e=f({rel:`stylesheet`,href:e,"data-precedence":t},n),(n=mf.get(a))&&Rf(e,n);var c=o=r.createElement(`link`);Ct(c),Pd(c,`link`,e),c._p=new Promise(function(e,t){c.onload=e,c.onerror=t}),c.addEventListener(`load`,function(){s.loading|=1}),c.addEventListener(`error`,function(){s.loading|=2}),s.loading|=4,Lf(o,t,r)}o={type:`stylesheet`,instance:o,count:1,state:s},i.set(a,o)}}}function Df(e,t){_f.X(e,t);var n=bf;if(n&&e){var r=St(n).hoistableScripts,i=Pf(e),a=r.get(i);a||(a=n.querySelector(Ff(i)),a||(e=f({src:e,async:!0},t),(t=mf.get(i))&&zf(e,t),a=n.createElement(`script`),Ct(a),Pd(a,`link`,e),n.head.appendChild(a)),a={type:`script`,instance:a,count:1,state:null},r.set(i,a))}}function Of(e,t){_f.M(e,t);var n=bf;if(n&&e){var r=St(n).hoistableScripts,i=Pf(e),a=r.get(i);a||(a=n.querySelector(Ff(i)),a||(e=f({src:e,async:!0,type:`module`},t),(t=mf.get(i))&&zf(e,t),a=n.createElement(`script`),Ct(a),Pd(a,`link`,e),n.head.appendChild(a)),a={type:`script`,instance:a,count:1,state:null},r.set(i,a))}}function kf(e,t,n,r){var a=(a=pe.current)?gf(a):null;if(!a)throw Error(i(446));switch(e){case`meta`:case`title`:return null;case`style`:return typeof n.precedence==`string`&&typeof n.href==`string`?(t=Af(n.href),n=St(a).hoistableStyles,r=n.get(t),r||(r={type:`style`,instance:null,count:0,state:null},n.set(t,r)),r):{type:`void`,instance:null,count:0,state:null};case`link`:if(n.rel===`stylesheet`&&typeof n.href==`string`&&typeof n.precedence==`string`){e=Af(n.href);var o=St(a).hoistableStyles,s=o.get(e);if(s||(a=a.ownerDocument||a,s={type:`stylesheet`,instance:null,count:0,state:{loading:0,preload:null}},o.set(e,s),(o=a.querySelector(jf(e)))&&!o._p&&(s.instance=o,s.state.loading=5),mf.has(e)||(n={rel:`preload`,as:`style`,href:n.href,crossOrigin:n.crossOrigin,integrity:n.integrity,media:n.media,hrefLang:n.hrefLang,referrerPolicy:n.referrerPolicy},mf.set(e,n),o||Nf(a,e,n,s.state))),t&&r===null)throw Error(i(528,``));return s}if(t&&r!==null)throw Error(i(529,``));return null;case`script`:return t=n.async,n=n.src,typeof n==`string`&&t&&typeof t!=`function`&&typeof t!=`symbol`?(t=Pf(n),n=St(a).hoistableScripts,r=n.get(t),r||(r={type:`script`,instance:null,count:0,state:null},n.set(t,r)),r):{type:`void`,instance:null,count:0,state:null};default:throw Error(i(444,e))}}function Af(e){return`href="`+Ht(e)+`"`}function jf(e){return`link[rel="stylesheet"][`+e+`]`}function Mf(e){return f({},e,{"data-precedence":e.precedence,precedence:null})}function Nf(e,t,n,r){e.querySelector(`link[rel="preload"][as="style"][`+t+`]`)?r.loading=1:(t=e.createElement(`link`),r.preload=t,t.addEventListener(`load`,function(){return r.loading|=1}),t.addEventListener(`error`,function(){return r.loading|=2}),Pd(t,`link`,n),Ct(t),e.head.appendChild(t))}function Pf(e){return`[src="`+Ht(e)+`"]`}function Ff(e){return`script[async]`+e}function If(e,t,n){if(t.count++,t.instance===null)switch(t.type){case`style`:var r=e.querySelector(`style[data-href~="`+Ht(n.href)+`"]`);if(r)return t.instance=r,Ct(r),r;var a=f({},n,{"data-href":n.href,"data-precedence":n.precedence,href:null,precedence:null});return r=(e.ownerDocument||e).createElement(`style`),Ct(r),Pd(r,`style`,a),Lf(r,n.precedence,e),t.instance=r;case`stylesheet`:a=Af(n.href);var o=e.querySelector(jf(a));if(o)return t.state.loading|=4,t.instance=o,Ct(o),o;r=Mf(n),(a=mf.get(a))&&Rf(r,a),o=(e.ownerDocument||e).createElement(`link`),Ct(o);var s=o;return s._p=new Promise(function(e,t){s.onload=e,s.onerror=t}),Pd(o,`link`,r),t.state.loading|=4,Lf(o,n.precedence,e),t.instance=o;case`script`:return o=Pf(n.src),(a=e.querySelector(Ff(o)))?(t.instance=a,Ct(a),a):(r=n,(a=mf.get(o))&&(r=f({},n),zf(r,a)),e=e.ownerDocument||e,a=e.createElement(`script`),Ct(a),Pd(a,`link`,r),e.head.appendChild(a),t.instance=a);case`void`:return null;default:throw Error(i(443,t.type))}else t.type===`stylesheet`&&!(t.state.loading&4)&&(r=t.instance,t.state.loading|=4,Lf(r,n.precedence,e));return t.instance}function Lf(e,t,n){for(var r=n.querySelectorAll(`link[rel="stylesheet"][data-precedence],style[data-precedence]`),i=r.length?r[r.length-1]:null,a=i,o=0;o<r.length;o++){var s=r[o];if(s.dataset.precedence===t)a=s;else if(a!==i)break}a?a.parentNode.insertBefore(e,a.nextSibling):(t=n.nodeType===9?n.head:n,t.insertBefore(e,t.firstChild))}function Rf(e,t){e.crossOrigin??=t.crossOrigin,e.referrerPolicy??=t.referrerPolicy,e.title??=t.title}function zf(e,t){e.crossOrigin??=t.crossOrigin,e.referrerPolicy??=t.referrerPolicy,e.integrity??=t.integrity}var Bf=null;function Vf(e,t,n){if(Bf===null){var r=new Map,i=Bf=new Map;i.set(n,r)}else i=Bf,r=i.get(n),r||(r=new Map,i.set(n,r));if(r.has(e))return r;for(r.set(e,null),n=n.getElementsByTagName(e),i=0;i<n.length;i++){var a=n[i];if(!(a[_t]||a[ut]||e===`link`&&a.getAttribute(`rel`)===`stylesheet`)&&a.namespaceURI!==`http://www.w3.org/2000/svg`){var o=a.getAttribute(t)||``;o=e+o;var s=r.get(o);s?s.push(a):r.set(o,[a])}}return r}function Hf(e,t,n){e=e.ownerDocument||e,e.head.insertBefore(n,t===`title`?e.querySelector(`head > title`):null)}function Uf(e,t,n){if(n===1||t.itemProp!=null)return!1;switch(e){case`meta`:case`title`:return!0;case`style`:if(typeof t.precedence!=`string`||typeof t.href!=`string`||t.href===``)break;return!0;case`link`:if(typeof t.rel!=`string`||typeof t.href!=`string`||t.href===``||t.onLoad||t.onError)break;switch(t.rel){case`stylesheet`:return e=t.disabled,typeof t.precedence==`string`&&e==null;default:return!0}case`script`:if(t.async&&typeof t.async!=`function`&&typeof t.async!=`symbol`&&!t.onLoad&&!t.onError&&t.src&&typeof t.src==`string`)return!0}return!1}function Wf(e){return!(e.type===`stylesheet`&&!(e.state.loading&3))}function Gf(e,t,n,r){if(n.type===`stylesheet`&&(typeof r.media!=`string`||!1!==matchMedia(r.media).matches)&&!(n.state.loading&4)){if(n.instance===null){var i=Af(r.href),a=t.querySelector(jf(i));if(a){t=a._p,typeof t==`object`&&t&&typeof t.then==`function`&&(e.count++,e=Jf.bind(e),t.then(e,e)),n.state.loading|=4,n.instance=a,Ct(a);return}a=t.ownerDocument||t,r=Mf(r),(i=mf.get(i))&&Rf(r,i),a=a.createElement(`link`),Ct(a);var o=a;o._p=new Promise(function(e,t){o.onload=e,o.onerror=t}),Pd(a,`link`,r),n.instance=a}e.stylesheets===null&&(e.stylesheets=new Map),e.stylesheets.set(n,t),(t=n.state.preload)&&!(n.state.loading&3)&&(e.count++,n=Jf.bind(e),t.addEventListener(`load`,n),t.addEventListener(`error`,n))}}var Kf=0;function qf(e,t){return e.stylesheets&&e.count===0&&Xf(e,e.stylesheets),0<e.count||0<e.imgCount?function(n){var r=setTimeout(function(){if(e.stylesheets&&Xf(e,e.stylesheets),e.unsuspend){var t=e.unsuspend;e.unsuspend=null,t()}},6e4+t);0<e.imgBytes&&Kf===0&&(Kf=62500*Ld());var i=setTimeout(function(){if(e.waitingForImages=!1,e.count===0&&(e.stylesheets&&Xf(e,e.stylesheets),e.unsuspend)){var t=e.unsuspend;e.unsuspend=null,t()}},(e.imgBytes>Kf?50:800)+t);return e.unsuspend=n,function(){e.unsuspend=null,clearTimeout(r),clearTimeout(i)}}:null}function Jf(){if(this.count--,this.count===0&&(this.imgCount===0||!this.waitingForImages)){if(this.stylesheets)Xf(this,this.stylesheets);else if(this.unsuspend){var e=this.unsuspend;this.unsuspend=null,e()}}}var Yf=null;function Xf(e,t){e.stylesheets=null,e.unsuspend!==null&&(e.count++,Yf=new Map,t.forEach(Zf,e),Yf=null,Jf.call(e))}function Zf(e,t){if(!(t.state.loading&4)){var n=Yf.get(e);if(n)var r=n.get(null);else{n=new Map,Yf.set(e,n);for(var i=e.querySelectorAll(`link[data-precedence],style[data-precedence]`),a=0;a<i.length;a++){var o=i[a];(o.nodeName===`LINK`||o.getAttribute(`media`)!==`not all`)&&(n.set(o.dataset.precedence,o),r=o)}r&&n.set(null,r)}i=t.instance,o=i.getAttribute(`data-precedence`),a=n.get(o)||r,a===r&&n.set(null,i),n.set(o,i),this.count++,r=Jf.bind(this),i.addEventListener(`load`,r),i.addEventListener(`error`,r),a?a.parentNode.insertBefore(i,a.nextSibling):(e=e.nodeType===9?e.head:e,e.insertBefore(i,e.firstChild)),t.state.loading|=4}}var Qf={$$typeof:b,Provider:null,Consumer:null,_currentValue:ue,_currentValue2:ue,_threadCount:0};function $f(e,t,n,r,i,a,o,s,c){this.tag=1,this.containerInfo=e,this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.next=this.pendingContext=this.context=this.cancelPendingCommit=null,this.callbackPriority=0,this.expirationTimes=$e(-1),this.entangledLanes=this.shellSuspendCounter=this.errorRecoveryDisabledLanes=this.expiredLanes=this.warmLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=$e(0),this.hiddenUpdates=$e(null),this.identifierPrefix=r,this.onUncaughtError=i,this.onCaughtError=a,this.onRecoverableError=o,this.pooledCache=null,this.pooledCacheLanes=0,this.formState=c,this.incompleteTransitions=new Map}function ep(e,t,n,r,i,a,o,s,c,l,u,d){return e=new $f(e,t,n,o,c,l,u,d,s),t=1,!0===a&&(t|=24),a=ui(3,null,null,t),e.current=a,a.stateNode=e,t=la(),t.refCount++,e.pooledCache=t,t.refCount++,a.memoizedState={element:r,isDehydrated:n,cache:t},Ha(a),e}function tp(e){return e?(e=ci,e):ci}function np(e,t,n,r,i,a){i=tp(i),r.context===null?r.context=i:r.pendingContext=i,r=Wa(t),r.payload={element:n},a=a===void 0?null:a,a!==null&&(r.callback=a),n=Ga(e,r,t),n!==null&&(pu(n,e,t),Ka(n,e,t))}function rp(e,t){if(e=e.memoizedState,e!==null&&e.dehydrated!==null){var n=e.retryLane;e.retryLane=n!==0&&n<t?n:t}}function ip(e,t){rp(e,t),(e=e.alternate)&&rp(e,t)}function ap(e){if(e.tag===13||e.tag===31){var t=ai(e,67108864);t!==null&&pu(t,e,67108864),ip(e,67108864)}}function op(e){if(e.tag===13||e.tag===31){var t=du();t=at(t);var n=ai(e,t);n!==null&&pu(n,e,t),ip(e,t)}}var sp=!0;function cp(e,t,n,r){var i=E.T;E.T=null;var a=D.p;try{D.p=2,up(e,t,n,r)}finally{D.p=a,E.T=i}}function lp(e,t,n,r){var i=E.T;E.T=null;var a=D.p;try{D.p=8,up(e,t,n,r)}finally{D.p=a,E.T=i}}function up(e,t,n,r){if(sp){var i=dp(r);if(i===null)Cd(e,t,r,fp,n),Cp(e,r);else if(Tp(i,e,t,n,r))r.stopPropagation();else if(Cp(e,r),t&4&&-1<Sp.indexOf(e)){for(;i!==null;){var a=bt(i);if(a!==null)switch(a.tag){case 3:if(a=a.stateNode,a.current.memoizedState.isDehydrated){var o=Je(a.pendingLanes);if(o!==0){var s=a;for(s.pendingLanes|=2,s.entangledLanes|=2;o;){var c=1<<31-Ve(o);s.entanglements[1]|=c,o&=~c}nd(a),!(Y&6)&&($l=ke()+500,rd(0,!1))}}break;case 31:case 13:s=ai(a,2),s!==null&&pu(s,a,2),vu(),ip(a,2)}if(a=dp(r),a===null&&Cd(e,t,r,fp,n),a===i)break;i=a}i!==null&&r.stopPropagation()}else Cd(e,t,r,null,n)}}function dp(e){return e=on(e),pp(e)}var fp=null;function pp(e){if(fp=null,e=yt(e),e!==null){var t=o(e);if(t===null)e=null;else{var n=t.tag;if(n===13){if(e=s(t),e!==null)return e;e=null}else if(n===31){if(e=c(t),e!==null)return e;e=null}else if(n===3){if(t.stateNode.current.memoizedState.isDehydrated)return t.tag===3?t.stateNode.containerInfo:null;e=null}else t!==e&&(e=null)}}return fp=e,null}function mp(e){switch(e){case`beforetoggle`:case`cancel`:case`click`:case`close`:case`contextmenu`:case`copy`:case`cut`:case`auxclick`:case`dblclick`:case`dragend`:case`dragstart`:case`drop`:case`focusin`:case`focusout`:case`input`:case`invalid`:case`keydown`:case`keypress`:case`keyup`:case`mousedown`:case`mouseup`:case`paste`:case`pause`:case`play`:case`pointercancel`:case`pointerdown`:case`pointerup`:case`ratechange`:case`reset`:case`resize`:case`seeked`:case`submit`:case`toggle`:case`touchcancel`:case`touchend`:case`touchstart`:case`volumechange`:case`change`:case`selectionchange`:case`textInput`:case`compositionstart`:case`compositionend`:case`compositionupdate`:case`beforeblur`:case`afterblur`:case`beforeinput`:case`blur`:case`fullscreenchange`:case`focus`:case`hashchange`:case`popstate`:case`select`:case`selectstart`:return 2;case`drag`:case`dragenter`:case`dragexit`:case`dragleave`:case`dragover`:case`mousemove`:case`mouseout`:case`mouseover`:case`pointermove`:case`pointerout`:case`pointerover`:case`scroll`:case`touchmove`:case`wheel`:case`mouseenter`:case`mouseleave`:case`pointerenter`:case`pointerleave`:return 8;case`message`:switch(Ae()){case je:return 2;case Me:return 8;case Ne:case Pe:return 32;case Fe:return 268435456;default:return 32}default:return 32}}var hp=!1,gp=null,_p=null,vp=null,yp=new Map,bp=new Map,xp=[],Sp=`mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset`.split(` `);function Cp(e,t){switch(e){case`focusin`:case`focusout`:gp=null;break;case`dragenter`:case`dragleave`:_p=null;break;case`mouseover`:case`mouseout`:vp=null;break;case`pointerover`:case`pointerout`:yp.delete(t.pointerId);break;case`gotpointercapture`:case`lostpointercapture`:bp.delete(t.pointerId)}}function wp(e,t,n,r,i,a){return e===null||e.nativeEvent!==a?(e={blockedOn:t,domEventName:n,eventSystemFlags:r,nativeEvent:a,targetContainers:[i]},t!==null&&(t=bt(t),t!==null&&ap(t)),e):(e.eventSystemFlags|=r,t=e.targetContainers,i!==null&&t.indexOf(i)===-1&&t.push(i),e)}function Tp(e,t,n,r,i){switch(t){case`focusin`:return gp=wp(gp,e,t,n,r,i),!0;case`dragenter`:return _p=wp(_p,e,t,n,r,i),!0;case`mouseover`:return vp=wp(vp,e,t,n,r,i),!0;case`pointerover`:var a=i.pointerId;return yp.set(a,wp(yp.get(a)||null,e,t,n,r,i)),!0;case`gotpointercapture`:return a=i.pointerId,bp.set(a,wp(bp.get(a)||null,e,t,n,r,i)),!0}return!1}function Ep(e){var t=yt(e.target);if(t!==null){var n=o(t);if(n!==null){if(t=n.tag,t===13){if(t=s(n),t!==null){e.blockedOn=t,ct(e.priority,function(){op(n)});return}}else if(t===31){if(t=c(n),t!==null){e.blockedOn=t,ct(e.priority,function(){op(n)});return}}else if(t===3&&n.stateNode.current.memoizedState.isDehydrated){e.blockedOn=n.tag===3?n.stateNode.containerInfo:null;return}}}e.blockedOn=null}function Dp(e){if(e.blockedOn!==null)return!1;for(var t=e.targetContainers;0<t.length;){var n=dp(e.nativeEvent);if(n===null){n=e.nativeEvent;var r=new n.constructor(n.type,n);an=r,n.target.dispatchEvent(r),an=null}else return t=bt(n),t!==null&&ap(t),e.blockedOn=n,!1;t.shift()}return!0}function Op(e,t,n){Dp(e)&&n.delete(t)}function kp(){hp=!1,gp!==null&&Dp(gp)&&(gp=null),_p!==null&&Dp(_p)&&(_p=null),vp!==null&&Dp(vp)&&(vp=null),yp.forEach(Op),bp.forEach(Op)}function Ap(e,n){e.blockedOn===n&&(e.blockedOn=null,hp||(hp=!0,t.unstable_scheduleCallback(t.unstable_NormalPriority,kp)))}var jp=null;function Mp(e){jp!==e&&(jp=e,t.unstable_scheduleCallback(t.unstable_NormalPriority,function(){jp===e&&(jp=null);for(var t=0;t<e.length;t+=3){var n=e[t],r=e[t+1],i=e[t+2];if(typeof r!=`function`){if(pp(r||n)===null)continue;break}var a=bt(n);a!==null&&(e.splice(t,3),t-=3,ws(a,{pending:!0,data:i,method:n.method,action:r},r,i))}}))}function Np(e){function t(t){return Ap(t,e)}gp!==null&&Ap(gp,e),_p!==null&&Ap(_p,e),vp!==null&&Ap(vp,e),yp.forEach(t),bp.forEach(t);for(var n=0;n<xp.length;n++){var r=xp[n];r.blockedOn===e&&(r.blockedOn=null)}for(;0<xp.length&&(n=xp[0],n.blockedOn===null);)Ep(n),n.blockedOn===null&&xp.shift();if(n=(e.ownerDocument||e).$$reactFormReplay,n!=null)for(r=0;r<n.length;r+=3){var i=n[r],a=n[r+1],o=i[dt]||null;if(typeof a==`function`)o||Mp(n);else if(o){var s=null;if(a&&a.hasAttribute(`formAction`)){if(i=a,o=a[dt]||null)s=o.formAction;else if(pp(i)!==null)continue}else s=o.action;typeof s==`function`?n[r+1]=s:(n.splice(r,3),r-=3),Mp(n)}}}function Pp(){function e(e){e.canIntercept&&e.info===`react-transition`&&e.intercept({handler:function(){return new Promise(function(e){return i=e})},focusReset:`manual`,scroll:`manual`})}function t(){i!==null&&(i(),i=null),r||setTimeout(n,20)}function n(){if(!r&&!navigation.transition){var e=navigation.currentEntry;e&&e.url!=null&&navigation.navigate(e.url,{state:e.getState(),info:`react-transition`,history:`replace`})}}if(typeof navigation==`object`){var r=!1,i=null;return navigation.addEventListener(`navigate`,e),navigation.addEventListener(`navigatesuccess`,t),navigation.addEventListener(`navigateerror`,t),setTimeout(n,100),function(){r=!0,navigation.removeEventListener(`navigate`,e),navigation.removeEventListener(`navigatesuccess`,t),navigation.removeEventListener(`navigateerror`,t),i!==null&&(i(),i=null)}}}function Fp(e){this._internalRoot=e}Ip.prototype.render=Fp.prototype.render=function(e){var t=this._internalRoot;if(t===null)throw Error(i(409));var n=t.current;np(n,du(),e,t,null,null)},Ip.prototype.unmount=Fp.prototype.unmount=function(){var e=this._internalRoot;if(e!==null){this._internalRoot=null;var t=e.containerInfo;np(e.current,2,null,e,null,null),vu(),t[ft]=null}};function Ip(e){this._internalRoot=e}Ip.prototype.unstable_scheduleHydration=function(e){if(e){var t=st();e={blockedOn:null,target:e,priority:t};for(var n=0;n<xp.length&&t!==0&&t<xp[n].priority;n++);xp.splice(n,0,e),n===0&&Ep(e)}};var Lp=n.version;if(Lp!==`19.2.8`)throw Error(i(527,Lp,`19.2.8`));D.findDOMNode=function(e){var t=e._reactInternals;if(t===void 0)throw typeof e.render==`function`?Error(i(188)):(e=Object.keys(e).join(`,`),Error(i(268,e)));return e=u(t),e=e===null?null:d(e),e=e===null?null:e.stateNode,e};var Rp={bundleType:0,version:`19.2.8`,rendererPackageName:`react-dom`,currentDispatcherRef:E,reconcilerVersion:`19.2.8`};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<`u`){var zp=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!zp.isDisabled&&zp.supportsFiber)try{Re=zp.inject(Rp),ze=zp}catch{}}e.createRoot=function(e,t){if(!a(e))throw Error(i(299));var n=!1,r=``,o=J,s=Us,c=Ws;return t!=null&&(!0===t.unstable_strictMode&&(n=!0),t.identifierPrefix!==void 0&&(r=t.identifierPrefix),t.onUncaughtError!==void 0&&(o=t.onUncaughtError),t.onCaughtError!==void 0&&(s=t.onCaughtError),t.onRecoverableError!==void 0&&(c=t.onRecoverableError)),t=ep(e,1,!1,null,null,n,r,null,o,s,c,Pp),e[ft]=t.current,xd(e),new Fp(t)}})),ue=o(((e,t)=>{function n(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>`u`||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!=`function`))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(n)}catch(e){console.error(e)}}n(),t.exports=D()})),O=ae(),k=c(se()),de=c(ue(),1),A=function(){return A=Object.assign||function(e){for(var t,n=1,r=arguments.length;n<r;n++)for(var i in t=arguments[n],t)Object.prototype.hasOwnProperty.call(t,i)&&(e[i]=t[i]);return e},A.apply(this,arguments)};function j(e,t,n){if(n||arguments.length===2)for(var r=0,i=t.length,a;r<i;r++)(a||!(r in t))&&(a||=Array.prototype.slice.call(t,0,r),a[r]=t[r]);return e.concat(a||Array.prototype.slice.call(t))}var fe=o(((e,t)=>{t.exports=function(e,t,n,r){var i=n?n.call(r,e,t):void 0;if(i!==void 0)return!!i;if(e===t)return!0;if(typeof e!=`object`||!e||typeof t!=`object`||!t)return!1;var a=Object.keys(e),o=Object.keys(t);if(a.length!==o.length)return!1;for(var s=Object.prototype.hasOwnProperty.bind(t),c=0;c<a.length;c++){var l=a[c];if(!s(l))return!1;var u=e[l],d=t[l];if(i=n?n.call(r,u,d,l):void 0,i===!1||i===void 0&&u!==d)return!1}return!0}})),M=`-ms-`,pe=`-moz-`,N=`-webkit-`,me=`comm`,he=`rule`,ge=`decl`,_e=`@import`,ve=`@keyframes`,ye=`@layer`,be=Math.abs,xe=String.fromCharCode,Se=Object.assign;function Ce(e,t){return De(e,0)^45?(((t<<2^De(e,0))<<2^De(e,1))<<2^De(e,2))<<2^De(e,3):0}function we(e){return e.trim()}function Te(e,t){return(e=t.exec(e))?e[0]:e}function P(e,t,n){return e.replace(t,n)}function Ee(e,t,n){return e.indexOf(t,n)}function De(e,t){return e.charCodeAt(t)|0}function Oe(e,t,n){return e.slice(t,n)}function ke(e){return e.length}function Ae(e){return e.length}function je(e,t){return t.push(e),e}function Me(e,t){return e.map(t).join(``)}function Ne(e,t){return e.filter(function(e){return!Te(e,t)})}var Pe=1,Fe=1,Ie=0,Le=0,Re=0,ze=``;function Be(e,t,n,r,i,a,o,s){return{value:e,root:t,parent:n,type:r,props:i,children:a,line:Pe,column:Fe,length:o,return:``,siblings:s}}function Ve(e,t){return Se(Be(``,null,null,``,null,null,0,e.siblings),e,{length:-e.length},t)}function He(e){for(;e.root;)e=Ve(e.root,{children:[e]});je(e,e.siblings)}function Ue(){return Re}function We(){return Re=Le>0?De(ze,--Le):0,Fe--,Re===10&&(Fe=1,Pe--),Re}function Ge(){return Re=Le<Ie?De(ze,Le++):0,Fe++,Re===10&&(Fe=1,Pe++),Re}function Ke(){return De(ze,Le)}function qe(){return Le}function Je(e,t){return Oe(ze,e,t)}function Ye(e){switch(e){case 0:case 9:case 10:case 13:case 32:return 5;case 33:case 43:case 44:case 47:case 62:case 64:case 126:case 59:case 123:case 125:return 4;case 58:return 3;case 34:case 39:case 40:case 91:return 2;case 41:case 93:return 1}return 0}function Xe(e){return Pe=Fe=1,Ie=ke(ze=e),Le=0,[]}function Ze(e){return ze=``,e}function Qe(e){return we(Je(Le-1,tt(e===91?e+2:e===40?e+1:e)))}function $e(e){for(;(Re=Ke())&&Re<33;)Ge();return Ye(e)>2||Ye(Re)>3?``:` `}function et(e,t){for(;--t&&Ge()&&!(Re<48||Re>102||Re>57&&Re<65||Re>70&&Re<97););return Je(e,qe()+(t<6&&Ke()==32&&Ge()==32))}function tt(e){for(;Ge();)switch(Re){case e:return Le;case 34:case 39:e!==34&&e!==39&&tt(Re);break;case 40:e===41&&tt(e);break;case 92:Ge();break}return Le}function nt(e,t){for(;Ge()&&e+Re!==57&&(e+Re!==84||Ke()!==47););return`/*`+Je(t,Le-1)+`*`+xe(e===47?e:Ge())}function rt(e){for(;!Ye(Ke());)Ge();return Je(e,Le)}function it(e){return Ze(at(``,null,null,null,[``],e=Xe(e),0,[0],e))}function at(e,t,n,r,i,a,o,s,c){for(var l=0,u=0,d=o,f=0,p=0,m=0,h=1,g=1,_=1,v=0,y=``,b=i,x=a,S=r,C=y;g;)switch(m=v,v=Ge()){case 40:if(m!=108&&De(C,d-1)==58){Ee(C+=P(Qe(v),`&`,`&\f`),`&\f`,be(l?s[l-1]:0))!=-1&&(_=-1);break}case 34:case 39:case 91:C+=Qe(v);break;case 9:case 10:case 13:case 32:C+=$e(m);break;case 92:C+=et(qe()-1,7);continue;case 47:switch(Ke()){case 42:case 47:je(st(nt(Ge(),qe()),t,n,c),c);break;default:C+=`/`}break;case 123*h:s[l++]=ke(C)*_;case 125*h:case 59:case 0:switch(v){case 0:case 125:g=0;case 59+u:_==-1&&(C=P(C,/\f/g,``)),p>0&&ke(C)-d&&je(p>32?ct(C+`;`,r,n,d-1,c):ct(P(C,` `,``)+`;`,r,n,d-2,c),c);break;case 59:C+=`;`;default:if(je(S=ot(C,t,n,l,u,i,s,y,b=[],x=[],d,a),a),v===123){if(u===0)at(C,t,S,S,b,a,d,s,x);else switch(f===99&&De(C,3)===110?100:f){case 100:case 108:case 109:case 115:at(e,S,S,r&&je(ot(e,S,S,0,0,i,s,y,i,b=[],d,x),x),i,x,d,s,r?b:x);break;default:at(C,S,S,S,[``],x,0,s,x)}}}l=u=p=0,h=_=1,y=C=``,d=o;break;case 58:d=1+ke(C),p=m;default:if(h<1){if(v==123)--h;else if(v==125&&h++==0&&We()==125)continue}switch(C+=xe(v),v*h){case 38:_=u>0?1:(C+=`\f`,-1);break;case 44:s[l++]=(ke(C)-1)*_,_=1;break;case 64:Ke()===45&&(C+=Qe(Ge())),f=Ke(),u=d=ke(y=C+=rt(qe())),v++;break;case 45:m===45&&ke(C)==2&&(h=0)}}return a}function ot(e,t,n,r,i,a,o,s,c,l,u,d){for(var f=i-1,p=i===0?a:[``],m=Ae(p),h=0,g=0,_=0;h<r;++h)for(var v=0,y=Oe(e,f+1,f=be(g=o[h])),b=e;v<m;++v)(b=we(g>0?p[v]+` `+y:P(y,/&\f/g,p[v])))&&(c[_++]=b);return Be(e,t,n,i===0?he:s,c,l,u,d)}function st(e,t,n,r){return Be(e,t,n,me,xe(Ue()),Oe(e,2,-2),0,r)}function ct(e,t,n,r,i){return Be(e,t,n,ge,Oe(e,0,r),Oe(e,r+1,-1),r,i)}function lt(e,t,n){switch(Ce(e,t)){case 5103:return N+`print-`+e+e;case 5737:case 4201:case 3177:case 3433:case 1641:case 4457:case 2921:case 5572:case 6356:case 5844:case 3191:case 6645:case 3005:case 6391:case 5879:case 5623:case 6135:case 4599:case 4855:case 4215:case 6389:case 5109:case 5365:case 5621:case 3829:return N+e+e;case 4789:return pe+e+e;case 5349:case 4246:case 4810:case 6968:case 2756:return N+e+pe+e+M+e+e;case 5936:switch(De(e,t+11)){case 114:return N+e+M+P(e,/[svh]\w+-[tblr]{2}/,`tb`)+e;case 108:return N+e+M+P(e,/[svh]\w+-[tblr]{2}/,`tb-rl`)+e;case 45:return N+e+M+P(e,/[svh]\w+-[tblr]{2}/,`lr`)+e}case 6828:case 4268:case 2903:return N+e+M+e+e;case 6165:return N+e+M+`flex-`+e+e;case 5187:return N+e+P(e,/(\w+).+(:[^]+)/,N+`box-$1$2`+M+`flex-$1$2`)+e;case 5443:return N+e+M+`flex-item-`+P(e,/flex-|-self/g,``)+(Te(e,/flex-|baseline/)?``:M+`grid-row-`+P(e,/flex-|-self/g,``))+e;case 4675:return N+e+M+`flex-line-pack`+P(e,/align-content|flex-|-self/g,``)+e;case 5548:return N+e+M+P(e,`shrink`,`negative`)+e;case 5292:return N+e+M+P(e,`basis`,`preferred-size`)+e;case 6060:return N+`box-`+P(e,`-grow`,``)+N+e+M+P(e,`grow`,`positive`)+e;case 4554:return N+P(e,/([^-])(transform)/g,`$1`+N+`$2`)+e;case 6187:return P(P(P(e,/(zoom-|grab)/,N+`$1`),/(image-set)/,N+`$1`),e,``)+e;case 5495:case 3959:return P(e,/(image-set\([^]*)/,N+"$1$`$1");case 4968:return P(P(e,/(.+:)(flex-)?(.*)/,N+`box-pack:$3`+M+`flex-pack:$3`),/s.+-b[^;]+/,`justify`)+N+e+e;case 4200:if(!Te(e,/flex-|baseline/))return M+`grid-column-align`+Oe(e,t)+e;break;case 2592:case 3360:return M+P(e,`template-`,``)+e;case 4384:case 3616:return n&&n.some(function(e,n){return t=n,Te(e.props,/grid-\w+-end/)})?~Ee(e+(n=n[t].value),`span`,0)?e:M+P(e,`-start`,``)+e+M+`grid-row-span:`+(~Ee(n,`span`,0)?Te(n,/\d+/):Te(n,/\d+/)-+Te(e,/\d+/))+`;`:M+P(e,`-start`,``)+e;case 4896:case 4128:return n&&n.some(function(e){return Te(e.props,/grid-\w+-start/)})?e:M+P(P(e,`-end`,`-span`),`span `,``)+e;case 4095:case 3583:case 4068:case 2532:return P(e,/(.+)-inline(.+)/,N+`$1$2`)+e;case 8116:case 7059:case 5753:case 5535:case 5445:case 5701:case 4933:case 4677:case 5533:case 5789:case 5021:case 4765:if(ke(e)-1-t>6)switch(De(e,t+1)){case 109:if(De(e,t+4)!==45)break;case 102:return P(e,/(.+:)(.+)-([^]+)/,`$1`+N+`$2-$3$1`+pe+(De(e,t+3)==108?`$3`:`$2-$3`))+e;case 115:return~Ee(e,`stretch`,0)?lt(P(e,`stretch`,`fill-available`),t,n)+e:e}break;case 5152:case 5920:return P(e,/(.+?):(\d+)(\s*\/\s*(span)?\s*(\d+))?(.*)/,function(t,n,r,i,a,o,s){return M+n+`:`+r+s+(i?M+n+`-span:`+(a?o:o-+r)+s:``)+e});case 4949:if(De(e,t+6)===121)return P(e,`:`,`:`+N)+e;break;case 6444:switch(De(e,De(e,14)===45?18:11)){case 120:return P(e,/(.+:)([^;\s!]+)(;|(\s+)?!.+)?/,`$1`+N+(De(e,14)===45?`inline-`:``)+`box$3$1`+N+`$2$3$1`+M+`$2box$3`)+e;case 100:return P(e,`:`,`:`+M)+e}break;case 5719:case 2647:case 2135:case 3927:case 2391:return P(e,`scroll-`,`scroll-snap-`)+e}return e}function ut(e,t){for(var n=``,r=0;r<e.length;r++)n+=t(e[r],r,e,t)||``;return n}function dt(e,t,n,r){switch(e.type){case ye:if(e.children.length)break;case _e:case ge:return e.return=e.return||e.value;case me:return``;case ve:return e.return=e.value+`{`+ut(e.children,r)+`}`;case he:if(!ke(e.value=e.props.join(`,`)))return``}return ke(n=ut(e.children,r))?e.return=e.value+`{`+n+`}`:``}function ft(e){var t=Ae(e);return function(n,r,i,a){for(var o=``,s=0;s<t;s++)o+=e[s](n,r,i,a)||``;return o}}function pt(e){return function(t){t.root||(t=t.return)&&e(t)}}function mt(e,t,n,r){if(e.length>-1&&!e.return)switch(e.type){case ge:e.return=lt(e.value,e.length,n);return;case ve:return ut([Ve(e,{value:P(e.value,`@`,`@`+N)})],r);case he:if(e.length)return Me(n=e.props,function(t){switch(Te(t,r=/(::plac\w+|:read-\w+)/)){case`:read-only`:case`:read-write`:He(Ve(e,{props:[P(t,/:(read-\w+)/,`:`+pe+`$1`)]})),He(Ve(e,{props:[t]})),Se(e,{props:Ne(n,r)});break;case`::placeholder`:He(Ve(e,{props:[P(t,/:(plac\w+)/,`:`+N+`input-$1`)]})),He(Ve(e,{props:[P(t,/:(plac\w+)/,`:`+pe+`$1`)]})),He(Ve(e,{props:[P(t,/:(plac\w+)/,M+`input-$1`)]})),He(Ve(e,{props:[t]})),Se(e,{props:Ne(n,r)})}return``})}}var ht=c(fe()),gt={animationIterationCount:1,aspectRatio:1,borderImageOutset:1,borderImageSlice:1,borderImageWidth:1,boxFlex:1,boxFlexGroup:1,boxOrdinalGroup:1,columnCount:1,columns:1,flex:1,flexGrow:1,flexPositive:1,flexShrink:1,flexNegative:1,flexOrder:1,gridRow:1,gridRowEnd:1,gridRowSpan:1,gridRowStart:1,gridColumn:1,gridColumnEnd:1,gridColumnSpan:1,gridColumnStart:1,msGridRow:1,msGridRowSpan:1,msGridColumn:1,msGridColumnSpan:1,fontWeight:1,lineHeight:1,opacity:1,order:1,orphans:1,tabSize:1,widows:1,zIndex:1,zoom:1,WebkitLineClamp:1,fillOpacity:1,floodOpacity:1,stopOpacity:1,strokeDasharray:1,strokeDashoffset:1,strokeMiterlimit:1,strokeOpacity:1,strokeWidth:1},_t=typeof process<`u`&&({}.REACT_APP_SC_ATTR||{}.SC_ATTR)||`data-styled`,vt=`active`,yt=`data-styled-version`,bt=`6.1.15`,xt=`/*!sc*/
`,St=typeof window<`u`&&`HTMLElement`in window,Ct=!!(typeof SC_DISABLE_SPEEDY==`boolean`?SC_DISABLE_SPEEDY:typeof process<`u`&&{}.REACT_APP_SC_DISABLE_SPEEDY!==void 0&&{}.REACT_APP_SC_DISABLE_SPEEDY!==``?{}.REACT_APP_SC_DISABLE_SPEEDY!==`false`&&{}.REACT_APP_SC_DISABLE_SPEEDY:typeof process<`u`&&{}.SC_DISABLE_SPEEDY!==void 0&&{}.SC_DISABLE_SPEEDY!==``&&{}.SC_DISABLE_SPEEDY!==`false`&&{}.SC_DISABLE_SPEEDY),wt=Object.freeze([]),Tt=Object.freeze({});function Et(e,t,n){return n===void 0&&(n=Tt),e.theme!==n.theme&&e.theme||t||n.theme}var Dt=new Set(`a.abbr.address.area.article.aside.audio.b.base.bdi.bdo.big.blockquote.body.br.button.canvas.caption.cite.code.col.colgroup.data.datalist.dd.del.details.dfn.dialog.div.dl.dt.em.embed.fieldset.figcaption.figure.footer.form.h1.h2.h3.h4.h5.h6.header.hgroup.hr.html.i.iframe.img.input.ins.kbd.keygen.label.legend.li.link.main.map.mark.menu.menuitem.meta.meter.nav.noscript.object.ol.optgroup.option.output.p.param.picture.pre.progress.q.rp.rt.ruby.s.samp.script.section.select.small.source.span.strong.style.sub.summary.sup.table.tbody.td.textarea.tfoot.th.thead.time.tr.track.u.ul.use.var.video.wbr.circle.clipPath.defs.ellipse.foreignObject.g.image.line.linearGradient.marker.mask.path.pattern.polygon.polyline.radialGradient.rect.stop.svg.text.tspan`.split(`.`)),Ot=/[!"#$%&'()*+,./:;<=>?@[\\\]^`{|}~-]+/g,kt=/(^-|-$)/g;function At(e){return e.replace(Ot,`-`).replace(kt,``)}var jt=/(a)(d)/gi,Mt=52,Nt=function(e){return String.fromCharCode(e+(e>25?39:97))};function Pt(e){var t,n=``;for(t=Math.abs(e);t>Mt;t=t/Mt|0)n=Nt(t%Mt)+n;return(Nt(t%Mt)+n).replace(jt,`$1-$2`)}var Ft,It=5381,Lt=function(e,t){for(var n=t.length;n;)e=33*e^t.charCodeAt(--n);return e},Rt=function(e){return Lt(It,e)};function zt(e){return Pt(Rt(e)>>>0)}function Bt(e){return e.displayName||e.name||`Component`}function Vt(e){return typeof e==`string`&&!0}var Ht=typeof Symbol==`function`&&Symbol.for,Ut=Ht?Symbol.for(`react.memo`):60115,Wt=Ht?Symbol.for(`react.forward_ref`):60112,Gt={childContextTypes:!0,contextType:!0,contextTypes:!0,defaultProps:!0,displayName:!0,getDefaultProps:!0,getDerivedStateFromError:!0,getDerivedStateFromProps:!0,mixins:!0,propTypes:!0,type:!0},Kt={name:!0,length:!0,prototype:!0,caller:!0,callee:!0,arguments:!0,arity:!0},qt={$$typeof:!0,compare:!0,defaultProps:!0,displayName:!0,propTypes:!0,type:!0},Jt=((Ft={})[Wt]={$$typeof:!0,render:!0,defaultProps:!0,displayName:!0,propTypes:!0},Ft[Ut]=qt,Ft);function Yt(e){return(`type`in(t=e)&&t.type.$$typeof)===Ut?qt:`$$typeof`in e?Jt[e.$$typeof]:Gt;var t}var Xt=Object.defineProperty,Zt=Object.getOwnPropertyNames,Qt=Object.getOwnPropertySymbols,$t=Object.getOwnPropertyDescriptor,en=Object.getPrototypeOf,tn=Object.prototype;function nn(e,t,n){if(typeof t!=`string`){if(tn){var r=en(t);r&&r!==tn&&nn(e,r,n)}var i=Zt(t);Qt&&(i=i.concat(Qt(t)));for(var a=Yt(e),o=Yt(t),s=0;s<i.length;++s){var c=i[s];if(!(c in Kt||n&&n[c]||o&&c in o||a&&c in a)){var l=$t(t,c);try{Xt(e,c,l)}catch{}}}}return e}function rn(e){return typeof e==`function`}function an(e){return typeof e==`object`&&`styledComponentId`in e}function on(e,t){return e&&t?`${e} ${t}`:e||t||``}function sn(e,t){if(e.length===0)return``;for(var n=e[0],r=1;r<e.length;r++)n+=t?t+e[r]:e[r];return n}function cn(e){return typeof e==`object`&&!!e&&e.constructor.name===Object.name&&!(`props`in e&&e.$$typeof)}function ln(e,t,n){if(n===void 0&&(n=!1),!n&&!cn(e)&&!Array.isArray(e))return t;if(Array.isArray(t))for(var r=0;r<t.length;r++)e[r]=ln(e[r],t[r]);else if(cn(t))for(var r in t)e[r]=ln(e[r],t[r]);return e}function un(e,t){Object.defineProperty(e,"toString",{value:t})}function dn(e){var t=[...arguments].slice(1);return Error(`An error occurred. See https://github.com/styled-components/styled-components/blob/main/packages/styled-components/src/utils/errors.md#${e} for more information.${t.length>0?` Args: ${t.join(`, `)}`:``}`)}var fn=function(){function e(e){this.groupSizes=new Uint32Array(512),this.length=512,this.tag=e}return e.prototype.indexOfGroup=function(e){for(var t=0,n=0;n<e;n++)t+=this.groupSizes[n];return t},e.prototype.insertRules=function(e,t){if(e>=this.groupSizes.length){for(var n=this.groupSizes,r=n.length,i=r;e>=i;)if((i<<=1)<0)throw dn(16,`${e}`);this.groupSizes=new Uint32Array(i),this.groupSizes.set(n),this.length=i;for(var a=r;a<i;a++)this.groupSizes[a]=0}for(var o=this.indexOfGroup(e+1),s=(a=0,t.length);a<s;a++)this.tag.insertRule(o,t[a])&&(this.groupSizes[e]++,o++)},e.prototype.clearGroup=function(e){if(e<this.length){var t=this.groupSizes[e],n=this.indexOfGroup(e),r=n+t;this.groupSizes[e]=0;for(var i=n;i<r;i++)this.tag.deleteRule(n)}},e.prototype.getGroup=function(e){var t=``;if(e>=this.length||this.groupSizes[e]===0)return t;for(var n=this.groupSizes[e],r=this.indexOfGroup(e),i=r+n,a=r;a<i;a++)t+=`${this.tag.getRule(a)}${xt}`;return t},e}(),pn=new Map,mn=new Map,hn=1,gn=function(e){if(pn.has(e))return pn.get(e);for(;mn.has(hn);)hn++;var t=hn++;return pn.set(e,t),mn.set(t,e),t},_n=function(e,t){hn=t+1,pn.set(e,t),mn.set(t,e)},vn=`style[${_t}][${yt}="${bt}"]`,yn=RegExp(`^${_t}\\.g(\\d+)\\[id="([\\w\\d-]+)"\\].*?"([^"]*)`),bn=function(e,t,n){for(var r,i=n.split(`,`),a=0,o=i.length;a<o;a++)(r=i[a])&&e.registerName(t,r)},xn=function(e,t){for(var n=(t.textContent??``).split(xt),r=[],i=0,a=n.length;i<a;i++){var o=n[i].trim();if(o){var s=o.match(yn);if(s){var c=0|parseInt(s[1],10),l=s[2];c!==0&&(_n(l,c),bn(e,l,s[3]),e.getTag().insertRules(c,r)),r.length=0}else r.push(o)}}},Sn=function(e){for(var t=document.querySelectorAll(vn),n=0,r=t.length;n<r;n++){var i=t[n];i&&i.getAttribute(_t)!==vt&&(xn(e,i),i.parentNode&&i.parentNode.removeChild(i))}};function Cn(){return typeof __webpack_nonce__<`u`?__webpack_nonce__:null}var wn=function(e){var t=document.head,n=e||t,r=document.createElement(`style`),i=function(e){var t=Array.from(e.querySelectorAll(`style[${_t}]`));return t[t.length-1]}(n),a=i===void 0?null:i.nextSibling;r.setAttribute(_t,vt),r.setAttribute(yt,bt);var o=Cn();return o&&r.setAttribute(`nonce`,o),n.insertBefore(r,a),r},Tn=function(){function e(e){this.element=wn(e),this.element.appendChild(document.createTextNode(``)),this.sheet=function(e){if(e.sheet)return e.sheet;for(var t=document.styleSheets,n=0,r=t.length;n<r;n++){var i=t[n];if(i.ownerNode===e)return i}throw dn(17)}(this.element),this.length=0}return e.prototype.insertRule=function(e,t){try{return this.sheet.insertRule(t,e),this.length++,!0}catch{return!1}},e.prototype.deleteRule=function(e){this.sheet.deleteRule(e),this.length--},e.prototype.getRule=function(e){var t=this.sheet.cssRules[e];return t&&t.cssText?t.cssText:``},e}(),En=function(){function e(e){this.element=wn(e),this.nodes=this.element.childNodes,this.length=0}return e.prototype.insertRule=function(e,t){if(e<=this.length&&e>=0){var n=document.createTextNode(t);return this.element.insertBefore(n,this.nodes[e]||null),this.length++,!0}return!1},e.prototype.deleteRule=function(e){this.element.removeChild(this.nodes[e]),this.length--},e.prototype.getRule=function(e){return e<this.length?this.nodes[e].textContent:``},e}(),Dn=function(){function e(e){this.rules=[],this.length=0}return e.prototype.insertRule=function(e,t){return e<=this.length&&(this.rules.splice(e,0,t),this.length++,!0)},e.prototype.deleteRule=function(e){this.rules.splice(e,1),this.length--},e.prototype.getRule=function(e){return e<this.length?this.rules[e]:``},e}(),On=St,kn={isServer:!St,useCSSOMInjection:!Ct},An=function(){function e(e,t,n){e===void 0&&(e=Tt),t===void 0&&(t={});var r=this;this.options=A(A({},kn),e),this.gs=t,this.names=new Map(n),this.server=!!e.isServer,!this.server&&St&&On&&(On=!1,Sn(this)),un(this,function(){return function(e){for(var t=e.getTag(),n=t.length,r=``,i=function(n){var i=function(e){return mn.get(e)}(n);if(i===void 0)return`continue`;var a=e.names.get(i),o=t.getGroup(n);if(a===void 0||!a.size||o.length===0)return`continue`;var s=`${_t}.g${n}[id="${i}"]`,c=``;a!==void 0&&a.forEach(function(e){e.length>0&&(c+=`${e},`)}),r+=`${o}${s}{content:"${c}"}${xt}`},a=0;a<n;a++)i(a);return r}(r)})}return e.registerId=function(e){return gn(e)},e.prototype.rehydrate=function(){!this.server&&St&&Sn(this)},e.prototype.reconstructWithOptions=function(t,n){return n===void 0&&(n=!0),new e(A(A({},this.options),t),this.gs,n&&this.names||void 0)},e.prototype.allocateGSInstance=function(e){return this.gs[e]=(this.gs[e]||0)+1},e.prototype.getTag=function(){return this.tag||=(e=function(e){var t=e.useCSSOMInjection,n=e.target;return e.isServer?new Dn(n):t?new Tn(n):new En(n)}(this.options),new fn(e));var e},e.prototype.hasNameForId=function(e,t){return this.names.has(e)&&this.names.get(e).has(t)},e.prototype.registerName=function(e,t){if(gn(e),this.names.has(e))this.names.get(e).add(t);else{var n=new Set;n.add(t),this.names.set(e,n)}},e.prototype.insertRules=function(e,t,n){this.registerName(e,t),this.getTag().insertRules(gn(e),n)},e.prototype.clearNames=function(e){this.names.has(e)&&this.names.get(e).clear()},e.prototype.clearRules=function(e){this.getTag().clearGroup(gn(e)),this.clearNames(e)},e.prototype.clearTag=function(){this.tag=void 0},e}(),jn=/&/g,Mn=/^\s*\/\/.*$/gm;function Nn(e,t){return e.map(function(e){return e.type===`rule`&&(e.value=`${t} ${e.value}`,e.value=e.value.replaceAll(`,`,`,${t} `),e.props=e.props.map(function(e){return`${t} ${e}`})),Array.isArray(e.children)&&e.type!==`@keyframes`&&(e.children=Nn(e.children,t)),e})}function Pn(e){var t,n,r,i=e===void 0?Tt:e,a=i.options,o=a===void 0?Tt:a,s=i.plugins,c=s===void 0?wt:s,l=function(e,r,i){return i.startsWith(n)&&i.endsWith(n)&&i.replaceAll(n,``).length>0?`.${t}`:e},u=c.slice();u.push(function(e){e.type===`rule`&&e.value.includes(`&`)&&(e.props[0]=e.props[0].replace(jn,n).replace(r,l))}),o.prefix&&u.push(mt),u.push(dt);var d=function(e,i,a,s){i===void 0&&(i=``),a===void 0&&(a=``),s===void 0&&(s=`&`),t=s,n=i,r=RegExp(`\\${n}\\b`,`g`);var c=e.replace(Mn,``),l=it(a||i?`${a} ${i} { ${c} }`:c);o.namespace&&(l=Nn(l,o.namespace));var d=[];return ut(l,ft(u.concat(pt(function(e){return d.push(e)})))),d};return d.hash=c.length?c.reduce(function(e,t){return t.name||dn(15),Lt(e,t.name)},It).toString():``,d}var Fn=new An,In=Pn(),Ln=k.createContext({shouldForwardProp:void 0,styleSheet:Fn,stylis:In});Ln.Consumer;var Rn=k.createContext(void 0);function zn(){return(0,k.useContext)(Ln)}function Bn(e){var t=(0,k.useState)(e.stylisPlugins),n=t[0],r=t[1],i=zn().styleSheet,a=(0,k.useMemo)(function(){var t=i;return e.sheet?t=e.sheet:e.target&&(t=t.reconstructWithOptions({target:e.target},!1)),e.disableCSSOMInjection&&(t=t.reconstructWithOptions({useCSSOMInjection:!1})),t},[e.disableCSSOMInjection,e.sheet,e.target,i]),o=(0,k.useMemo)(function(){return Pn({options:{namespace:e.namespace,prefix:e.enableVendorPrefixes},plugins:n})},[e.enableVendorPrefixes,e.namespace,n]);(0,k.useEffect)(function(){(0,ht.default)(n,e.stylisPlugins)||r(e.stylisPlugins)},[e.stylisPlugins]);var s=(0,k.useMemo)(function(){return{shouldForwardProp:e.shouldForwardProp,styleSheet:a,stylis:o}},[e.shouldForwardProp,a,o]);return k.createElement(Ln.Provider,{value:s},k.createElement(Rn.Provider,{value:o},e.children))}var Vn=function(){function e(e,t){var n=this;this.inject=function(e,t){t===void 0&&(t=In);var r=n.name+t.hash;e.hasNameForId(n.id,r)||e.insertRules(n.id,r,t(n.rules,r,`@keyframes`))},this.name=e,this.id=`sc-keyframes-${e}`,this.rules=t,un(this,function(){throw dn(12,String(n.name))})}return e.prototype.getName=function(e){return e===void 0&&(e=In),this.name+e.hash},e}(),Hn=function(e){return e>=`A`&&e<=`Z`};function Un(e){for(var t=``,n=0;n<e.length;n++){var r=e[n];if(n===1&&r===`-`&&e[0]===`-`)return e;Hn(r)?t+=`-`+r.toLowerCase():t+=r}return t.startsWith(`ms-`)?`-`+t:t}var Wn=function(e){return e==null||!1===e||e===``},Gn=function(e){var t,n,r=[];for(var i in e){var a=e[i];e.hasOwnProperty(i)&&!Wn(a)&&(Array.isArray(a)&&a.isCss||rn(a)?r.push(`${Un(i)}:`,a,`;`):cn(a)?r.push.apply(r,j(j([`${i} {`],Gn(a),!1),[`}`],!1)):r.push(`${Un(i)}: ${t=i,(n=a)==null||typeof n==`boolean`||n===``?``:typeof n!=`number`||n===0||t in gt||t.startsWith(`--`)?String(n).trim():`${n}px`};`))}return r};function Kn(e,t,n,r){if(Wn(e))return[];if(an(e))return[`.${e.styledComponentId}`];if(rn(e))return!rn(i=e)||i.prototype&&i.prototype.isReactComponent||!t?[e]:Kn(e(t),t,n,r);var i;return e instanceof Vn?n?(e.inject(n,r),[e.getName(r)]):[e]:cn(e)?Gn(e):Array.isArray(e)?Array.prototype.concat.apply(wt,e.map(function(e){return Kn(e,t,n,r)})):[e.toString()]}function qn(e){for(var t=0;t<e.length;t+=1){var n=e[t];if(rn(n)&&!an(n))return!1}return!0}var Jn=Rt(bt),Yn=function(){function e(e,t,n){this.rules=e,this.staticRulesId=``,this.isStatic=(n===void 0||n.isStatic)&&qn(e),this.componentId=t,this.baseHash=Lt(Jn,t),this.baseStyle=n,An.registerId(t)}return e.prototype.generateAndInjectStyles=function(e,t,n){var r=this.baseStyle?this.baseStyle.generateAndInjectStyles(e,t,n):``;if(this.isStatic&&!n.hash){if(this.staticRulesId&&t.hasNameForId(this.componentId,this.staticRulesId))r=on(r,this.staticRulesId);else{var i=sn(Kn(this.rules,e,t,n)),a=Pt(Lt(this.baseHash,i)>>>0);if(!t.hasNameForId(this.componentId,a)){var o=n(i,`.${a}`,void 0,this.componentId);t.insertRules(this.componentId,a,o)}r=on(r,a),this.staticRulesId=a}}else{for(var s=Lt(this.baseHash,n.hash),c=``,l=0;l<this.rules.length;l++){var u=this.rules[l];if(typeof u==`string`)c+=u;else if(u){var d=sn(Kn(u,e,t,n));s=Lt(s,d+l),c+=d}}if(c){var f=Pt(s>>>0);t.hasNameForId(this.componentId,f)||t.insertRules(this.componentId,f,n(c,`.${f}`,void 0,this.componentId)),r=on(r,f)}}return r},e}(),Xn=k.createContext(void 0);Xn.Consumer;function Zn(e){var t=k.useContext(Xn),n=(0,k.useMemo)(function(){return function(e,t){if(!e)throw dn(14);if(rn(e))return e(t);if(Array.isArray(e)||typeof e!=`object`)throw dn(8);return t?A(A({},t),e):e}(e.theme,t)},[e.theme,t]);return e.children?k.createElement(Xn.Provider,{value:n},e.children):null}var Qn={};function $n(e,t,n){var r=an(e),i=e,a=!Vt(e),o=t.attrs,s=o===void 0?wt:o,c=t.componentId,l=c===void 0?function(e,t){var n=typeof e==`string`?At(e):`sc`;Qn[n]=(Qn[n]||0)+1;var r=`${n}-${zt(bt+n+Qn[n])}`;return t?`${t}-${r}`:r}(t.displayName,t.parentComponentId):c,u=t.displayName,d=u===void 0?function(e){return Vt(e)?`styled.${e}`:`Styled(${Bt(e)})`}(e):u,f=t.displayName&&t.componentId?`${At(t.displayName)}-${t.componentId}`:t.componentId||l,p=r&&i.attrs?i.attrs.concat(s).filter(Boolean):s,m=t.shouldForwardProp;if(r&&i.shouldForwardProp){var h=i.shouldForwardProp;if(t.shouldForwardProp){var g=t.shouldForwardProp;m=function(e,t){return h(e,t)&&g(e,t)}}else m=h}var _=new Yn(n,f,r?i.componentStyle:void 0);function v(e,t){return function(e,t,n){var r=e.attrs,i=e.componentStyle,a=e.defaultProps,o=e.foldedComponentIds,s=e.styledComponentId,c=e.target,l=k.useContext(Xn),u=zn(),d=e.shouldForwardProp||u.shouldForwardProp,f=Et(t,l,a)||Tt,p=function(e,t,n){for(var r,i=A(A({},t),{className:void 0,theme:n}),a=0;a<e.length;a+=1){var o=rn(r=e[a])?r(i):r;for(var s in o)i[s]=s===`className`?on(i[s],o[s]):s===`style`?A(A({},i[s]),o[s]):o[s]}return t.className&&(i.className=on(i.className,t.className)),i}(r,t,f),m=p.as||c,h={};for(var g in p)p[g]===void 0||g[0]===`$`||g===`as`||g===`theme`&&p.theme===f||(g===`forwardedAs`?h.as=p.forwardedAs:d&&!d(g,m)||(h[g]=p[g]));var _=function(e,t){var n=zn();return e.generateAndInjectStyles(t,n.styleSheet,n.stylis)}(i,p),v=on(o,s);return _&&(v+=` `+_),p.className&&(v+=` `+p.className),h[Vt(m)&&!Dt.has(m)?`class`:`className`]=v,n&&(h.ref=n),(0,k.createElement)(m,h)}(y,e,t)}v.displayName=d;var y=k.forwardRef(v);return y.attrs=p,y.componentStyle=_,y.displayName=d,y.shouldForwardProp=m,y.foldedComponentIds=r?on(i.foldedComponentIds,i.styledComponentId):``,y.styledComponentId=f,y.target=r?i.target:e,Object.defineProperty(y,"defaultProps",{get:function(){return this._foldedDefaultProps},set:function(e){this._foldedDefaultProps=r?function(e){for(var t=[...arguments].slice(1),n=0,r=t;n<r.length;n++)ln(e,r[n],!0);return e}({},i.defaultProps,e):e}}),un(y,function(){return`.${y.styledComponentId}`}),a&&nn(y,e,{attrs:!0,componentStyle:!0,displayName:!0,foldedComponentIds:!0,shouldForwardProp:!0,styledComponentId:!0,target:!0}),y}function er(e,t){for(var n=[e[0]],r=0,i=t.length;r<i;r+=1)n.push(t[r],e[r+1]);return n}var tr=function(e){return Object.assign(e,{isCss:!0})};function nr(e){var t=[...arguments].slice(1);if(rn(e)||cn(e))return tr(Kn(er(wt,j([e],t,!0))));var n=e;return t.length===0&&n.length===1&&typeof n[0]==`string`?Kn(n):tr(Kn(er(n,t)))}function rr(e,t,n){if(n===void 0&&(n=Tt),!t)throw dn(1,t);var r=function(r){var i=[...arguments].slice(1);return e(t,n,nr.apply(void 0,j([r],i,!1)))};return r.attrs=function(r){return rr(e,t,A(A({},n),{attrs:Array.prototype.concat(n.attrs,r).filter(Boolean)}))},r.withConfig=function(r){return rr(e,t,A(A({},n),r))},r}var ir=function(e){return rr($n,e)},F=ir;Dt.forEach(function(e){F[e]=ir(e)}),function(){function e(e,t){this.rules=e,this.componentId=t,this.isStatic=qn(e),An.registerId(this.componentId+1)}return e.prototype.createStyles=function(e,t,n,r){var i=r(sn(Kn(this.rules,t,n,r)),``),a=this.componentId+e;n.insertRules(a,a,i)},e.prototype.removeStyles=function(e,t){t.clearRules(this.componentId+e)},e.prototype.renderStyles=function(e,t,n,r){e>2&&An.registerId(this.componentId+e),this.removeStyles(e,n),this.createStyles(e,t,n,r)},e}(),function(){function e(){var e=this;this._emitSheetCSS=function(){var t=e.instance.toString();if(!t)return``;var n=Cn();return`<style ${sn([n&&`nonce="${n}"`,`${_t}="true"`,`${yt}="${bt}"`].filter(Boolean),` `)}>${t}</style>`},this.getStyleTags=function(){if(e.sealed)throw dn(2);return e._emitSheetCSS()},this.getStyleElement=function(){var t;if(e.sealed)throw dn(2);var n=e.instance.toString();if(!n)return[];var r=((t={})[_t]=``,t[yt]=bt,t.dangerouslySetInnerHTML={__html:n},t),i=Cn();return i&&(r.nonce=i),[k.createElement(`style`,A({},r,{key:`sc-0-0`}))]},this.seal=function(){e.sealed=!0},this.instance=new An({isServer:!0}),this.sealed=!1}return e.prototype.collectStyles=function(e){if(this.sealed)throw dn(2);return k.createElement(Bn,{sheet:this.instance},e)},e.prototype.interleaveWithNodeStream=function(e){throw dn(3)},e}(),`${_t}`;var ar=c(le());function or(){return or=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)({}).hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},or.apply(null,arguments)}function sr(e,t){if(e==null)return{};var n={};for(var r in e)if({}.hasOwnProperty.call(e,r)){if(t.indexOf(r)!==-1)continue;n[r]=e[r]}return n}function cr(e,t){return t||=e.slice(0),e.raw=t,e}var lr,ur=F.div(lr||=cr([`
  .btn {
    border: none;
    cursor: pointer;
    font-weight: 500;
    transition: background-color 0.3s, border 0.3s;
    text-align: center;
    letter-spacing: 1.25px;
    line-height: 17px;
    border-radius: var(--grid-borderradius-border-radius-lg);
    &.border-radius-8 {
      border-radius: var(--grid-borderradius-border-radius-sm);
    }
    &.uppercase {
      text-transform: uppercase;
    }

    &.capitalized {
      text-transform: capitalize;
    }
    &.fullwidth {
      width: 100%;
    }
    &.small {
      padding: 4px 12px;
      font-size: 14px;
      height: 36px;
    }
    &.medium {
      padding: 10px 16px;
      font-size: 14px;
      height: 48px;
    }
    &.large {
      padding: 16px 20px;
      font-size: 14px;
      height: 56px;
    }

    .flex {
      display: flex;
      gap: 8px;
      justify-content: center;
      align-items: center;
      &-row {
        flex-direction: row;
      }
      &-reverse {
        flex-direction: row-reverse;
      }
    }
    @keyframes spin {
      0% {
        transform: rotate(0deg);
      }
      100% {
        transform: rotate(360deg);
      }
    }

    .spinner {
      width: 16px;
      height: 16px;
      border: 2px dotted var(--primary-50);
      border-top: 2px dotted var(--primary-900);
      border-radius: 50%;
      animation: spin 2s linear infinite;
    }

    &--primary {
      background-color: var(--primary-500);
      color: var(--button-primary-text);

      &:hover {
        background-color: var(--primary-dark);
      }

      &:disabled {
        background-color: var(--secondary-muted);
        color: var(--button-muted);
        opacity: 0.65;
        cursor: not-allowed;
      }
      &--outline {
        border-color: var(--primary-border);
        background-color: transparent;
        color: var(--primary-500);
        border: 1px solid;
        &:hover {
          background-color: var(--white);
        }

        &:disabled {
          background-color: var(--button-muted-bg);
          color: var(--button-muted);
          border-color: var(--button-muted);
          opacity: 0.65;
          cursor: not-allowed;
        }
      }
    }

    &--secondary {
      background-color: var(--secondary);
      color: var(--white);

      //&:hover {
      //  background-color:  var(--secondary-bg-light);
      //}

      &:disabled {
        background-color: var(--secondary-muted);
        color: var(--button-muted);
        opacity: 0.65;
        cursor: not-allowed;
      }
      &--outline {
        border-color: var(--secondary-border);
        background-color: transparent;
        color: var(--secondary-border);
        border: 1px solid;
        &:hover {
          background-color: var(--white);
        }

        &:disabled {
          background-color: var(--button-muted-bg);
          color: var(--button-muted);
          border-color: var(--button-muted);
          opacity: 0.65;
          cursor: not-allowed;
        }
      }
    }

    &--danger {
      background-color: var(--danger);
      color: var(--white);

      &:disabled {
        background-color: var(--secondary-muted);
        color: var(--button-muted);
        opacity: 0.65;
        cursor: not-allowed;
      }
      &--outline {
        border-color: var(--danger-border);
        background-color: transparent;
        color: var(--danger);
        border: 1px solid;
        &:hover {
          background-color: var(--white);
        }

        &:disabled {
          background-color: var(--button-muted-bg);
          color: var(--button-muted);
          border-color: var(--button-muted);
          opacity: 0.65;
          cursor: not-allowed;
        }
      }
    }

    &--success {
      background-color: var(--primary);
      color: var(--white);

      &:disabled {
        background-color: var(--secondary-muted);
        color: var(--button-muted);
        opacity: 0.65;
        cursor: not-allowed;
      }
      &--outline {
        border-color: var(--primary-border);
        background-color: transparent;
        color: var(--primary);
        border: 1px solid;
        &:hover {
          background-color: var(--white);
        }

        &:disabled {
          background-color: var(--button-muted-bg);
          color: var(--button-muted);
          border-color: var(--button-muted);
          opacity: 0.65;
          cursor: not-allowed;
        }
      }
    }

    &--warning {
      background-color: var(--warning-bg-light);
      color: var(--warning);

      &:disabled {
        background-color: var(--secondary-muted);
        color: var(--button-muted);
        opacity: 0.65;
        cursor: not-allowed;
      }
      &--outline {
        border-color: var(--warning-border);
        background-color: transparent;
        color: var(--warning);
        border: 1px solid;
        &:hover {
          background-color: var(--white);
        }

        &:disabled {
          background-color: var(--button-muted-bg);
          color: var(--button-muted);
          border-color: var(--button-muted);
          opacity: 0.65;
          cursor: not-allowed;
        }
      }
    }
    &--info {
      background-color: var(--info-bg-light);
      color: var(--info);

      &:disabled {
        background-color: var(--secondary-muted);
        color: var(--button-muted);
        opacity: 0.65;
        cursor: not-allowed;
      }
      &--outline {
        border-color: var(--info-border);
        background-color: transparent;
        color: var(--info);
        border: 1px solid;
        &:hover {
          background-color: var(--white);
        }

        &:disabled {
          background-color: var(--button-muted-bg);
          color: var(--button-muted);
          border-color: var(--button-muted);
          opacity: 0.65;
          cursor: not-allowed;
        }
      }
    }
    &--text {
      color: var(--text-dark);
      background: none;
      &:disabled {
        color: var(--button-muted);
        opacity: 0.65;
        cursor: not-allowed;
      }
    }
  }
`])),dr=function(e){var t=e.type,n=t===void 0?`button`:t,r=e.variant,i=r===void 0?`default`:r,a=e.onClick,o=e.children,s=e.disabled,c=s!==void 0&&s,l=e.outlined,u=l!==void 0&&l,d=e.className,f=d===void 0?``:d,p=e.fullwidth,m=e.icon,h=m===void 0?``:m,g=e.iconPlacement,_=g===void 0?`end`:g,v=e.size,y=v===void 0?`medium`:v,b=e.iconClass,x=e.textTransform,S=x===void 0?`uppercase`:x,C=u?`--outline`:``,w=p?`fullwidth`:``,ee=S;return k.createElement(ur,null,k.createElement(`button`,{type:n,className:`btn btn--`+i+C+` `+w+` `+ee+` `+f+` `+y,onClick:a,disabled:c},k.createElement(`div`,{className:`flex `+(_===`start`?`flex-row`:`flex-reverse`)},h&&(typeof h==`string`?k.createElement(`i`,{className:h},` `):{icon:h}),b&&k.createElement(`span`,{className:b}),k.createElement(`span`,null,` `,o))))},fr,pr=F.div.attrs(function(e){return{className:e.className}})(fr||=cr([`
  background-color: var(--card-bg);
  border-radius: var(--values-value-0);
  box-shadow: var(--shadow--1--umbra);
  padding: var(--values-value-16);
  color: var(--text-dark);

  &.border-radius {
    &-0{
      border-radius: var(--values-value-0);
    }
    &-2 {
      border-radius: var(--values-value-2);
    }
    &-4 {
      border-radius: var(--values-value-4);
    }
    &-6 {
      border-radius: var(--values-value-6);
    }
    &-8 {
      border-radius: var(--values-value-8);
    }
    &-10 {
      border-radius: var(--values-value-10);
    }
    &-12 {
      border-radius: var(--values-value-12);
    }
    &-14 {
      border-radius: var(--values-value-14);
    }
    &-16 {
      border-radius: var(--values-value-16);
    }
    &-round {
      border-radius: 50%;
    }
  }
`])),mr=function(e){var t=e.className,n=e.children,r=n===void 0?``:n;return k.createElement(pr,{className:t},r)},hr;F.div(hr||=cr([`
  .alert-card {
    display: flex;
    flex-direction: column;
    gap: var(--values-value-8);
    border-radius: var(--values-value-8);

    &--header {
      display: flex;
      align-items: center;
      gap: var(--values-value-10);
      &--icon{
        display: flex;
        font-size: 28px;
      }
      &--title {
        flex: 1;
      }
      &--dismiss-icon {
        display: flex;
        cursor: pointer;
        font-size: 16px;
        line-height: 16px;
      }
    }

    &.success {
      background-color: var(--success-bg-light);

      * {
        color: var(--primary);
      }
    }

    &.warning {
      background-color: var(--warning-bg-light);

      * {
        color: var(--warning);
      }
    }

    &.error {
      background-color: var(--danger-bg-light);

      * {
        color: var(--danger);
      }
    }

    &.info {
      background-color: var(--info-bg-light);
      * {
        color: var(--info);
      }
    }
  }
`]));var gr=(0,k.createContext)(void 0),_r=function(e){var t=e.children,n=(0,k.useState)({title:null}),r=n[0],i=n[1],a=(0,k.useState)({}),o=a[0],s=a[1],c=(0,k.useState)({}),l=c[0],u=c[1],d=(0,k.useState)({}),f=d[0],p=d[1];return k.createElement(gr.Provider,{value:{data:r,updateData:function(e){i(function(t){return or({},t,e)})},productDetails:o,setProductDetails:s,commissionDetails:l,setCommissionDetails:u,promoCodeCommission:f,setPromoCodeCommission:p}},t)},vr=function(){var e=(0,k.useContext)(gr);if(!e)throw Error(`useData must be used within a DataProvider`);return e},yr=[`title`,`icon`,`imageUrl`,`onTitleClick`,`onBackIconClick`,`onActionIconClick`,`titleposition`,`actionIcon`],br,xr=F.header.attrs(function(e){return{titleposition:e.titleposition}})(br||=cr([`
  width: 100%;

  .e-app-bar {
    display: flex;
    justify-content: space-between;
    flex-direction: row;
    align-items: center;
    background-color: var(--appbar-bg-top);
    padding: 7px 12px;
    position: relative;
    height: 56px;
    gap: var(--values-value-8);
    box-sizing: border-box;

    &--nav-icon,
    &--close-icon {
      padding: 7px;
      color: var(--white);
      display: flex;
      align-items: center;
      justify-content: center;
    }

    /* Title section */
    &--title-wrapper {
      display: flex;
      justify-content: `,`;
      align-items: center;
      width: 100%; // Ensures the title section takes full width to apply the alignment
    }

    &--title {
      display: flex;
      align-items: center;
      gap: 12px;
      overflow: hidden;
    }

    &--title-image img {
      width: 32px;
      object-fit: cover;
      background: var(--white);
      border: 1px solid var(--border);
      border-radius: var(--grid-borderradius-border-radius-xs);
    }

    &--title-label {
      color: var(--white);
      letter-spacing: 0.4px;
      font-size: var(--values-value-16);
      font-weight: 500;
    }
  }
`]),function(e){return e.titleposition===`left`?`flex-start`:e.titleposition===`right`?`flex-end`:`center`}),Sr=function(e){var t=e.title,n=e.icon,r=n===void 0?`icon-back`:n,i=e.imageUrl,a=e.onTitleClick,o=a===void 0?function(){}:a,s=e.onBackIconClick,c=s===void 0?function(){}:s,l=e.onActionIconClick,u=l===void 0?function(){}:l,d=e.titleposition,f=d===void 0?`center`:d,p=e.actionIcon,m=sr(e,yr),h=vr(),g=h.data,_=h.updateData,v=(0,k.useState)(g.title||t),y=v[0],b=v[1];return(0,k.useEffect)(function(){b(g.title),_(g)},[g.title]),k.createElement(xr,Object.assign({},m,{titleposition:f}),k.createElement(`div`,{className:`e-app-bar flex`},k.createElement(`div`,{className:`e-app-bar--nav-icon`,onClick:c},!r&&k.createElement(`svg`,{width:`28`,height:`28`,viewBox:`0 0 28 28`,fill:`none`,xmlns:`http://www.w3.org/2000/svg`},k.createElement(`path`,{d:`M15.4218 4.31438C15.8357 4.73135 15.8332 5.4049 15.4162 5.81879L7.64512 13.5324H22.9362C23.5237 13.5324 24 13.9801 24 14.5324C24 15.0847 23.5237 15.5324 22.9362 15.5324H7.76404L15.3644 22.1335C15.8079 22.5187 15.8552 23.1906 15.47 23.6342C15.0847 24.0777 14.4128 24.125 13.9693 23.7398L4.36625 15.3993C4.17619 15.2343 4.05889 15.0166 4.01719 14.7868C3.95669 14.4536 4.0559 14.0973 4.31438 13.8407L13.9174 4.30879C14.3344 3.8949 15.0079 3.8974 15.4218 4.31438Z`,fill:`#fff`})),typeof r==`string`?k.createElement(`span`,{className:r}):r),k.createElement(`div`,{className:`e-app-bar--title-wrapper`},k.createElement(`div`,{className:`e-app-bar--title`,onClick:o},i&&k.createElement(`div`,{className:`e-app-bar--title-image`},k.createElement(`img`,{src:i,alt:``})),k.createElement(`h5`,{className:`e-app-bar--title-label`},y))),p&&k.createElement(`div`,{className:`e-app-bar--close-icon`,onClick:u},typeof p==`string`?k.createElement(`span`,{className:p}):p)))},Cr;F.div(Cr||=cr([`
  .container {
    display: flex;
    align-items: flex-start;
    position: relative;
    padding-left: 24px;
    cursor: pointer;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }

  .container input {
    position: absolute;
    opacity: 0;
    cursor: pointer;
    height: 0;
    width: 0;
  }

  .checkmark {
    position: absolute;
    top: 8%;
    left: 0;
    height: 16px;
    width: 16px;
    // transform: translateY(-50%);
    background-color: var(--gray-50);
    border-radius: var(--grid-borderradius-border-radius-xxxs);
  }

  .container input:checked ~ .checkmark {
    background-color: var(--primary-500);
  }

  .checkmark:after {
    content: '';
    position: absolute;
    display: none;
  }

  /* Show the checkmark when checked */
  .container input:checked ~ .checkmark:after {
    display: block;
    content: '';
  }

  /* Style the checkmark/indicator */
  .container .checkmark:after {
    font-family: 'esewa-font';
    content: '';
    left: 1px;
    top: -4px;
    width: 4px;
    height: 8px;
    color:var(--white);
  }

  .container.disabled {
    cursor: not-allowed;
    opacity: 0.6;
  }

  .container input:disabled ~ .checkmark {
    background-color: var(--gray-200);
  }
`]));var wr;F.div(wr||=cr([`
  .flex-auto {
    flex: 1 1 auto !important;
  }
  .full-width {
    display: flex;
    width: 100%;
  }

  label {
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 17px;
    letter-spacing: 0.15px;
    color: `,`;
  }

  input {
    flex-grow: 1;
    border-radius: var(--values-value-8);
    padding: var(--values-value-12) var(--values-value-16);
    color: var(--text-dark);
    background: var(--input-bg);
    transition: background-color 0.2s, color 0.2s, border-color 0.2s, box-shadow 0.2s;
    appearance: none;
    outline-color: transparent;
    border: 1px solid var(--default-input-border);

    &::placeholder {
      color: var(--input-placeholder);
      letter-spacing: 0.5px;
      font-weight: 500;
      opacity: 1;
    }

    &:focus-visible {
      border: 1px solid var(--default-input-border);
      outline: 1px solid var(--primary);
    }

    &.error {
      border-color: var(--danger);
      outline: none;
    }
  }

  .validationMessage {
    color: var(--danger-text);
  }
`]),function(e){return e.theme[`text-dark`]});var Tr;F.div(Tr||=cr([`
  .dialog-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
    transition: opacity 400ms cubic-bezier(0.4, 0, 0.2, 1);
    animation: fadeIn 0.3s ease-out;
  }

  .dialog {
    &-box {
      background: var(--card-bg);
      border-top-left-radius: var(--values-value-16);
      border-top-right-radius: var(--values-value-16);
      width: 100%;
      max-width: 100%;
      padding: 16px;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
      transition: transform 0.3s ease-in-out;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      &.slide-down {
        animation: slideDown 0.2s ease-out forwards;
      }
      &.slide-up {
        animation: slideUp 0.3s ease-out forwards;
      }
    }
    &-center {
      align-self: center;
    }
    &-top {
      align-self: flex-start;
    }
    &-bottom {
      align-self: flex-end;
    }
    &-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding-bottom: 8px;
      border-bottom: 1px solid var(--border);
      &-left-icon {
        color: var(--secondary);
        [class^='icon-'],
        [class*=' icon-'] {
          font-weight: 600;
        }
      }
      &-title {
        margin: 0;
        font-weight: bold;
        text-align: center;
        color: var(--text-dark);
      }
      &-close-icon {
        color: var(--secondary);
        [class^='icon-'],
        [class*=' icon-'] {
          font-weight: 600;
        }
      }
    }

    &-body {
      margin: 16px 0;
      color: var(--text-tertiary);
    }
    &-footer {
      width: 100%;
    }
  }
  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  @keyframes slideUp {
    from {
      transform: translateY(100px);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }
  @keyframes slideDown {
    from {
      transform: translateY(0);
      opacity: 1;
    }
    to {
      transform: translateY(100px);
      opacity: 0;
    }
  }
`]));var Er;F.div(Er||=cr([`
  .divider {
    display: block;
    background-color: var(--border);
    height: 1px;
    width: 100%;
    margin: 8px 0;
  }
`]));var Dr;F.div(Dr||=cr([`
  .grid {
    display: grid;
    grid-template-columns: repeat(12, 1fr);
    gap: 16px;
  }

  .grid-item {
    //padding: 16px;
  }

  .col-span-1 {
    grid-column: span 1;
  }
  .col-span-2 {
    grid-column: span 2;
  }
  .col-span-3 {
    grid-column: span 3;
  }
  .col-span-4 {
    grid-column: span 4;
  }
  .col-span-5 {
    grid-column: span 5;
  }
  .col-span-6 {
    grid-column: span 6;
  }
  .col-span-7 {
    grid-column: span 7;
  }
  .col-span-8 {
    grid-column: span 8;
  }
  .col-span-9 {
    grid-column: span 9;
  }
  .col-span-10 {
    grid-column: span 10;
  }
  .col-span-11 {
    grid-column: span 11;
  }
  .col-span-12 {
    grid-column: span 12;
  }
`]));var Or;F.div(Or||=cr([`
  .modal {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.8);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
  }

  .modal-content {
    max-width: 90%;
    max-height: 90%;
  }

  .modal-image {
    width: 100%;
    height: auto;
    border-radius: 8px;
  }
  .image-holder {
    display: flex;
    justify-content: center;
    align-items: center;
  }
`]));var kr=[`type`,`name`,`label`,`placeholder`,`value`,`checked`,`min`,`max`,`step`,`required`,`readOnly`,`disabled`,`className`,`onChange`,`validationMessage`,`autoFocus`],Ar,jr=F.div(Ar||=cr([`
  .flex-auto {
    flex: 1 1 auto !important;
  }
  .full-width {
    display: flex;
    width: 100%;
  }

  label {
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 17px;
    letter-spacing: 0.15px;
    color: `,`;
  }

  input {
    width: 100%;
    border-radius: var(--values-value-8);      
    padding: var(--values-value-10) var(--values-value-12);
    color: var(--text-dark);
    background: var(--input-bg);
    transition: background-color 0.2s, color 0.2s, border-color 0.2s,
      box-shadow 0.2s;
    appearance: none;
    outline-color: transparent;
    height: 48px;
    border: 1px solid var(--default-input-border);
    box-sizing: border-box;

    &::placeholder {
      color: var(--input-placeholder);
      letter-spacing: 0.5px;
      font-weight: 400;
      opacity: 1;
    }

    &:focus-visible {
      border: 1px solid var(--default-input-border);
      outline: 1px solid var(--primary);
    }
    &.error {
      border-color: var(--danger-border);
      outline: none;
    }

    ::-ms-input-placeholder {
      color: var(--input-placeholder);
      font-weight: 400;
      letter-spacing: 0.5px;
      font-size: 16px;
      line-height: 20px;
    }
  }

  .validationMessage {
    color: var(--danger-text);
  }
`]),function(e){return e.theme[`text-dark`]});(0,k.forwardRef)(function(e,t){var n=e.type,r=n===void 0?`text`:n,i=e.name,a=e.label,o=e.placeholder,s=e.value,c=e.min,l=e.max,u=e.step,d=e.required,f=d!==void 0&&d,p=e.disabled,m=p!==void 0&&p,h=e.className,g=h===void 0?``:h,_=e.onChange,v=e.validationMessage,y=e.autoFocus,b=y!==void 0&&y,x=sr(e,kr);return k.createElement(jr,null,k.createElement(`div`,{className:g+` input-field flex flex-column align-self-start full-width gap-4 mb-16`},a&&k.createElement(`label`,{htmlFor:i},a,f&&k.createElement(`span`,{className:`required`},` *`)),k.createElement(`div`,{className:`flex-auto full-width`},k.createElement(`input`,Object.assign({ref:t,type:r,className:`body1 `+(v?`error`:``),value:s,required:f,name:i,onChange:_,min:c,max:l,placeholder:o,step:u,autoFocus:b,disabled:m},x))),v&&k.createElement(`div`,{className:`caption validationMessage`},` `,v)))});var Mr=[`name`,`label`,`placeholder`,`value`,`maxLength`,`rows`,`required`,`readOnly`,`disabled`,`className`,`onChange`,`validationMessage`],Nr,Pr=F.div(Nr||=cr([`
  .text-area {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 4px;
    margin-bottom: 16px;

    .flex-auto {
      flex: 1 1 auto !important;
    }

    .full-width {
      display: flex;
      width: 100%;
    }

    label {
      font-style: normal;
      font-weight: 500;
      font-size: 14px;
      line-height: 17px;
      letter-spacing: 0.15px;
      color: var(--text-dark);
    }

    .validationMessage {
      font-weight: 400;
      font-size: 12px;
      line-height: 15px;
      letter-spacing: 0.4px;
      color: var(--danger-text);
    }

    textarea {
      flex-grow: 1;
      border-radius: var(--values-value-8);
      padding: var(--values-value-10) var(--values-value-12);
      color: var(--text-dark);
      background: var(--input-bg);
      transition: background-color 0.2s, color 0.2s, border-color 0.2s,
        box-shadow 0.2s;
      appearance: none;
      outline-color: transparent;
      border: 1px solid var(--default-input-border);
      box-sizing: border-box;
      font-family: "Source Sans Pro", sans-serif;

      &::placeholder {
        color: var(--input-placeholder);
        letter-spacing: 0.5px;
        font-weight: 500;
        opacity: 1;
      }

      &:focus-visible {
        border: 1px solid var(--default-input-border);
        outline: 1px solid var(--primary);
      }
      &.error {
        border-color: var(--danger);
        outline: none;
      }

      ::-ms-input-placeholder {
       color: var(--input-placeholder);
       font-weight: 400;
       letter-spacing: 0.5px;
       font-size: 16px;
       line-height: 20px;
      }
    }
  }
`]));(0,k.forwardRef)(function(e,t){var n=e.name,r=e.label,i=e.placeholder,a=e.value,o=e.maxLength,s=e.rows,c=e.required,l=c!==void 0&&c,u=e.disabled,d=u!==void 0&&u,f=e.className,p=e.onChange,m=e.validationMessage,h=sr(e,Mr);return k.createElement(Pr,null,k.createElement(`div`,{className:`text-area `+(f||``)},r&&k.createElement(`label`,{htmlFor:n},r,l&&k.createElement(`span`,{className:`required`},` *`)),k.createElement(`div`,{className:`flex-auto full-width`},k.createElement(`textarea`,Object.assign({ref:t,className:`body1 `+(m?`error`:``),value:a,rows:s,required:l,name:n,maxLength:o,onChange:p,placeholder:i,disabled:d},h))),m&&k.createElement(`div`,{className:`caption validationMessage`},` `,m)))});var Fr;F.div(Fr||=cr([`
  .multi-select {
    position: relative;
    width: auto;

    &__toggle {
      border: 1px solid var(--default-input-border);
      padding: var(--values-value-10) var(--values-value-12);
      cursor: pointer;
      border-radius: 8px;
      background-color: var(--input-bg);
      transition: border-color 0.2s;
      user-select: none;
      color: var(--input-placeholder);
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      box-sizing: border-box;
      height: 48px;
      display: flex;
      align-items: center;
      &:hover {
        border-color: var(--input-bg);
      }
    }

    &__dropdown {
      position: absolute;
      top: 52px;
      left: 0;
      right: 0;
      border-radius: 8px;
      background-color: var(--card-bg);
      max-height: 200px;
      overflow-y: auto;
      z-index: 1000;
      box-shadow: var(--shadow--2--umbra);
      border: 1px solid var(--default-input-border);
      padding: 8px 0;
      animation: fadeIn 0.2s ease-in-out;
      min-width: 100%;
    }

    &__dropdown-inner {
      padding: 8px;
      width: 100%;
      box-sizing: border-box;
    }

    &__search {
      width: 100%;
      padding: 8px;
      border-radius: 8px;
      margin-bottom: 5px;
      border: 1px solid var(--default-input-border);
      background-color: var(--input-bg);
      transition: border-color 0.2s;
      user-select: none;
      color: var(--input-placeholder);
      box-sizing: border-box;
      &::placeholder {
        color: var(--input-placeholder);
        letter-spacing: -0.5px;
        font-weight: 500;
        opacity: 1;
      }

      &:focus-visible {
        border: 1px solid var(--default-input-border);
        outline: 1px solid var(--primary);
      }
      &.error {
        border-color: var(--danger);
        outline: none;
      }
    }

    &__option {
      display: flex;
      align-items: center;
      padding: 8px;
      cursor: pointer;

      &:hover {
        background-color: var(--success-bg-light);
        border-radius: 8px;
      }

      input {
        font-family: 'esewa-font';
        position: relative;
        margin-right: 8px;

        appearance: none;
        width: 16px;
        height: 16px;
        border-radius: 4px;
        background-color: var(--default-input-border);
        border: 2px solid var(--default-input-border);
        transition: background-color 0.3s ease, border-color 0.3s ease;
      }

      input:checked {
        background-color: var(--primary);
        border-color: var(--primary);
      }

      input:checked::after {
        content: '';
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        font-size: 10px;
        color: white;
      }
    }

    &__no-options {
      padding: 10px;
      color: #999;
      text-align: center;
    }
  }
`]));var Ir={maxBSYear:2100,minBSYear:1970,outputSeparator:`-`,bsMonthTotalDaysCount:[[30,31],[31,32],[31,32],[31,32],[31,32],[30,31],[29,30],[29,30],[29,30],[29,30],[29,30],[30,31]],monthReferences:[[0,1,1,22,1,3,1,1,1,3,1,22,1,3,1,3,1,22,1,3,1,19,1,3,1,1,3,1,2,2,1,3,1],[1,2,2,2,2,2,2,1,3,1,3,1,2,2,2,3,2,2,2,1,3,1,3,1,2,2,2,2,2,2,2,2,2,2,2,1,3,1,2,2,2,2,2,2,2,2,2,2,2,1,3,1,2,2,2,2,2,1,1,1,2,2,2,2,2,1,3,1,1,2],[0,1,2,1,3,1,3,1,2,2,2,2,2,2,2,2,3,2,2,2,2,2,2,2,2,1,3,1,3,1,2,2,2,2,2,2,2,2,2,1,3,1,3,1,2,2,2,2,2,2,2,2,2,1,3,1,3,1,1,1,1,2,2,2,2,2,1,3,1,1,2],[1,2,1,3,1,3,1,3,1,3,1,3,1,3,1,3,1,3,1,3,1,3,1,3,1,3,1,3,1,2,2,2,1,3,1,3,1,3,1,3,1,3,1,2,2,2,1,3,1,3,1,3,1,3,1,3,1,3,2,2,1,3,1,2,2,2,1,2],[59,1,26,1,28,1,2,1,12],[0,1,2,2,2,2,2,2,2,2,2,2,2,1,3,1,3,1,3,1,2,2,2,2,2,2,2,2,2,2,2,1,3,1,2,2,2,2,2,2,2,2,2,2,2,1,3,1,2,2,2,2,2,2,2,2,2,2,5,1,1,2,2,1,3,1,2,1,2],[0,12,1,3,1,3,1,5,1,11,1,3,1,3,1,18,1,3,1,3,1,18,1,3,1,3,1,27,1,2],[1,2,2,2,2,1,2,2,2,2,2,2,2,3,1,3,2,2,2,2,2,2,2,2,2,1,2,2,2,2,2,2,2,2,2,2,2,2,2,1,2,2,2,2,2,2,2,2,2,2,2,2,2,1,2,2,2,15,2,4],[0,1,2,2,2,2,1,3,1,3,1,3,1,2,2,2,3,2,2,2,1,3,1,3,1,3,1,2,2,2,2,2,2,2,1,3,1,3,1,3,1,2,2,2,2,2,2,2,2,2,1,3,1,3,1,2,2,2,15,2,4],[1,1,3,1,3,1,14,1,3,1,1,1,3,1,14,1,3,1,3,1,3,1,18,1,3,1,3,1,3,1,14,1,3,15,1,2,1,1],[0,1,1,3,1,3,1,10,1,3,1,3,1,1,1,3,1,3,1,10,1,3,1,3,1,3,1,3,1,14,1,3,1,3,1,3,1,3,1,10,1,20,1,1,1],[1,2,2,1,3,1,3,1,3,1,2,2,2,2,2,3,2,2,2,2,2,1,3,1,3,1,3,1,2,2,2,2,2,2,2,1,3,1,3,1,3,1,3,1,2,2,2,2,2,2,2,1,3,1,3,1,20,3]],referenceDate:{AD:`1913-03-13`,BS:`1970-01-01`}},Lr=function(){function e(){}return e.dateType=function(e){if(![`BS`,`AD`].includes(e))throw TypeError(`Invalid date type. Only 'AD' or 'BS' type supported.`);return!0},e.adYear=function(e){var t=Ir.minBSYear-57,n=Ir.maxBSYear-57;if(e<t||e>n)throw RangeError(`AD year should be in range of `+t+` to `+n)},e.adMonth=function(e){if(e<1||e>12)throw RangeError(`AD month should be in range of 1 to 12`)},e.adDay=function(e){if(e<1||e>31)throw RangeError(`AD day should be in range of 1 to 31`)},e.bsYear=function(e){var t=Ir.minBSYear,n=Ir.maxBSYear;if(e<t||e>n)throw RangeError(`BS year should be in range of `+t+` to `+n)},e.bsMonth=function(e){if(e<1||e>12)throw RangeError(`BS month should be in range of 1 to 12`)},e.bsDay=function(e){if(e<1||e>32)throw RangeError(`BS day should be in range of 1 to 32`)},e}();(function(){function e(e,t){t===void 0&&(t=`AD`),this.dateType=`AD`,this.date={year:0,month:0,day:0},e?this.setDate(e,t):this.setDate(new Date)}return e.prototype.setDate=function(e,t){if(t===void 0&&(t=`AD`),Lr.dateType(t),t===`BS`){if(typeof e!=`string`)throw TypeError(`BS date should be 'string' type.`);return this.dateType=`BS`,this.date=this.splitBsDate(e),this}return this.dateType=`AD`,this.date=this.splitAdDate(e),this},e.prototype.toAD=function(){if(this.dateType===`AD`)return this.format(this.date);var e=this.totalDaysSince(),t=this.splitDate(Ir.referenceDate.AD),n=t.year,r=t.month,i=t.day,a=new Date(n,r,i-1);return a.setDate(a.getDate()+e),this.format(this.splitAdDate(a))},e.prototype.toBS=function(){if(this.dateType===`BS`)return this.format(this.date);var t=this.date,n=t.year,r=t.month,i=t.day,a=n+57,o=(r+9)%12||12,s=1;if(r<4)--a;else if(r===4){var c=new e(this.format({year:a,month:1,day:1}),`BS`).toAD();i<new Date(c).getDate()&&--a}var l=new Date(new e(this.format({year:a,month:o,day:1}),`BS`).toAD());return i>=1&&i<l.getDate()?(o=o===1?12:o-1,s=this.daysInBsMonth(a,o)-(l.getDate()-i)+1):s=i-l.getDate()+1,this.format({year:a,month:o,day:s})},e.prototype.totalDaysSince=function(){for(var e=this.date,t=e.year,n=e.month,r=e.day,i=new Set([2,4,7,8,10]),a=0,o=t-Ir.minBSYear,s=1;s<=12;s++)a+=this.totalMonthDaysSince(s,s<n?o+1:o);return t>2085&&t<2088||t===2085&&n>5?a+=r-2:t===2081&&n===3?a+=r+1:t===2081&&n===12?a+=r-1:t>2088||t===2088&&n>5?a+=r-4:t===2082&&i.has(n)?a+=r+1:a+=r,a},e.prototype.totalMonthDaysSince=function(e,t){return t===0?0:Ir.monthReferences[e-1].slice(0).reduce(function(n,r,i,a){if(r===0)return n;var o=i%2;return t>n.year+r?(n.year+=r,n.month+=Ir.bsMonthTotalDaysCount[e-1][o]*r):(n.month+=Ir.bsMonthTotalDaysCount[e-1][o]*(t-n.year),n.year=t-n.year,a.splice(1)),n},{month:0,year:0}).month},e.prototype.daysInBsMonth=function(e,t){for(var n=e+1-Ir.minBSYear,r=Ir.monthReferences[t-1],i=0,a=0;a<r.length;a++)if(r[a]!==0){var o=a%2;if(i+=r[a],n<=i)return e===2085&&t===5||e===2088&&t===5?Ir.bsMonthTotalDaysCount[t-1][o]-2:e===2081&&t===2?Ir.bsMonthTotalDaysCount[t-1][o+1]:e===2081&&t===3?Ir.bsMonthTotalDaysCount[t-1][o-1]:e===2081&&t===11?Ir.bsMonthTotalDaysCount[t-1][o]-1:e===2081&&t===12?Ir.bsMonthTotalDaysCount[t-1][o]+1:Ir.bsMonthTotalDaysCount[t-1][o]}return 0},e.prototype.splitDate=function(e){var t=e.replace(/\//g,`-`).split(`-`).map(function(e){return Math.floor(Number(e))});return{year:t[0],month:t[1],day:t[2]}},e.prototype.splitAdDate=function(e){typeof e==`string`&&(e=new Date(e));var t=e.getFullYear(),n=e.getMonth()+1,r=e.getDate();return Lr.adYear(t),Lr.adMonth(n),Lr.adDay(r),{year:t,month:n,day:r}},e.prototype.splitBsDate=function(e){var t=this.splitDate(e),n=t.year,r=t.month,i=t.day;return Lr.bsYear(n),Lr.bsMonth(r),Lr.bsDay(i),{year:n,month:r,day:i}},e.prototype.format=function(e){var t=Ir.outputSeparator,n=e.year,r=e.month,i=e.day;return``+n+t+this.zeroPad(r)+t+this.zeroPad(i)},e.prototype.zeroPad=function(e){return e>9?``+e:`0`+e},e})(),function(){function e(e){this.outputLocale=`en`,this.numberString=``,this.supportedLocale=[`en`,`ne`],this.supportedNumberType=[`en-IN`,`en-US`],this.digitMapping=[`०`,`१`,`२`,`३`,`४`,`५`,`६`,`७`,`८`,`९`],e&&this.setNumber(e)}return e.prototype.setOutputLocale=function(e){if(!this.supportedLocale.includes(e))throw TypeError("Currently 'ne' and 'en' only supported as a `locale` parameter.");return this.outputLocale=e,this},e.prototype.setNumber=function(e){return this.numberString=``+e,this},e.prototype.toNepali=function(e){var t=this;return e||=this.numberString,e?e.toString().split(``).map(function(e){return isNaN(parseInt(e))?e:t.digitMapping[e]||e}).join(``):``},e.prototype.toEnglish=function(e){var t=this;return e||=this.numberString,e?e.toString().split(``).map(function(e){var n=t.digitMapping.findIndex(function(t){return t===e});return n===-1?e:``+n}).join(``):``},e.prototype.formatNumber=function(e){if(!this.supportedNumberType.includes(e))throw TypeError("Currently 'en-US' and 'en-IN' only supported as a `type` parameter.");var t=parseFloat(this.toEnglish());if(isNaN(t))return this.numberString;var n=new Intl.NumberFormat(e).format(t);return this.outputLocale===`en`?this.toEnglish(n):this.toNepali(n)},e.prototype.formatAmount=function(e,t){if(t===void 0&&(t=2),!this.supportedNumberType.includes(e))throw TypeError("Currently 'en-US' and 'en-IN' only supported as a `type` parameter.");var n=parseFloat(this.toEnglish());if(isNaN(n))return this.numberString;var r=new Intl.NumberFormat(e,{maximumFractionDigits:t,minimumFractionDigits:t}).format(n);return this.outputLocale===`en`?this.toEnglish(r):this.toNepali(r)},e}();var Rr=`ne`;(0,k.createContext)({dispatch:function(){return null},state:function(e,t){return{currentLocale:Rr,minYear:e??2e3,maxYear:t??2100}}()});var zr;F.div(zr||=cr([`
  .nepali-date-picker {
    position: relative;
    display: flex;
    input {
      flex: 1;
      border-radius: var(--values-value-8);
      padding: var(--values-value-12) var(--values-value-16);
      color: var(--text-dark);
      background: var(--input-bg);
      transition: background-color 0.2s, color 0.2s, border-color 0.2s,
        box-shadow 0.2s;
      appearance: none;
      outline-color: transparent;
      border: 1px solid var(--default-input-border);
      font-size: var(--font-size--body-1);
      line-height: 20px;

      &::placeholder {
        color: var(--input-placeholder);
        letter-spacing: 0.5px;
        font-weight: 500;
        opacity: 1;
      }

      &:focus-visible {
        border: 1px solid var(--default-input-border);
        outline: 1px solid var(--primary);
      }
      &.error {
        border-color: var(--danger);
        outline: none;
      }

      ::-ms-input-placeholder {
        color: var(--input-placeholder);
        font-weight: 400;
        letter-spacing: 0.5px;
        font-size: 16px;
        line-height: 20px;
      }
    }

    .calender {
      background: var(--card-bg) none repeat scroll 0 0;
      border-radius: var(--grid-borderradius-border-radius-md);
      box-shadow: var(--shadow--3--umbra);
      box-sizing: border-box;
      color: var(--text-dark);
      display: block;
      height: auto;
      letter-spacing: 0.2px;
      line-height: 1.25em;
      position: absolute;
      text-align: right;
      user-select: none;
      left: 0;
      z-index: 9999;

      .calendar-wrapper {
        position: relative;
        padding: var(--values-value-16);
      }

      .calendar-controller {
        display: flex;
        justify-content: space-between;
        align-items: center;

        .date-indicator {
          display: flex;
        }

        .control {
          cursor: pointer;
          text-align: center;

          &.icon-today {
            position: absolute;
            right: var(--values-value-20);
          }
          &.month .drop-down ul {
            grid-template-columns: repeat(2, 1fr);
          }

          &.month,
          &.year {
            line-height: var(--values-value-24);

            .current-month,
            .current-year {
              display: block;
              padding: var(--values-value-4);
            }
          }

          &.year {
            border-left: none;
          }

          .drop-down {
            background-color: var(--card-bg);
            box-shadow: var(--shadow--2--penumbra);
            left: 0;
            height: 100%;
            overflow-y: scroll;
            position: absolute;
            top: 0;
            width: 100%;
            z-index: 100;
            border-radius: var(--grid-borderradius-border-radius-md);

            ul {
              list-style: none;
              margin: 0;
              padding: 0;
              display: grid;
              grid-template-columns: repeat(4, 1fr);

              &.month {
                li {
                  padding: var(--values-value-16);
                }
              }

              li {
                padding: var(--values-value-16);
                color: var(--text-dark);

                &.active {
                  background: var(--primary);
                  color: var(--white);
                  border-radius: var(--grid-borderradius-border-radius-xs);
                }
              }
            }
          }
        }
      }

      td.month-day {
        &.current {
          opacity: 1;
        }

        &.disabled {
          color: var(--text-muted);
        }

        &.today {
          color: var(--primary);
          position: relative;

          &::before {
            background: var(--primary);
            border-radius: var(--grid-borderradius-border-radius-xs);
            bottom: var(--grid-sizing-size-xxs);
            content: '';
            height: var(--grid-sizing-size-xxs);
            left: 50%;
            margin: auto;
            position: absolute;
            transform: translateX(-50%);
            width: var(--grid-sizing-size-xxs);
          }
        }

        &.selected {
          color: var(--white);
          position: relative;

          &::after {
            background: var(--primary);
            border-radius: var(--grid-borderradius-border-radius-sm);
            content: '';
            height: var(--grid-sizing-size-5xlg);
            left: 50%;
            position: absolute;
            top: 50%;
            transform: translate(-50%, -50%);
            width: var(--grid-sizing-size-5xlg);
            z-index: -1;
          }
        }
      }

      table {
        text-align: center;
        width: 100%;
        border: none;

        td {
          height: var(--grid-sizing-size-6xlg);
          width: var(--grid-sizing-size-6xlg);
          border: none;
        }

        tr {
          border: none;
          height: var(--grid-sizing-size-5xlg);
        }
      }
    }

    .icon-today {
      display: none;
      height: 0;
      width: 0;
    }
  }
`]));var Br;F.span(Br||=cr([`
  .rating {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 14px;
    &-count {
      color: var(--text-dark);
      font-weight: 500;
      margin-bottom: -4px;
    }
    &-rating {
      font-weight: 600;
    }
  }
`]));var Vr=typeof globalThis<`u`?globalThis:typeof window<`u`?window:typeof global<`u`?global:typeof self<`u`?self:{};function Hr(e){return e&&e.__esModule&&Object.prototype.hasOwnProperty.call(e,`default`)?e.default:e}function Ur(e,t){return t={exports:{}},e(t,t.exports),t.exports}function Wr(e){return e&&e.default||e}function Gr(){return Gr=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)({}).hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},Gr.apply(null,arguments)}function Kr(e){var t=Object.create(null);return function(n){return t[n]===void 0&&(t[n]=e(n)),t[n]}}var qr=/^((children|dangerouslySetInnerHTML|key|ref|autoFocus|defaultValue|defaultChecked|innerHTML|suppressContentEditableWarning|suppressHydrationWarning|valueLink|abbr|accept|acceptCharset|accessKey|action|allow|allowUserMedia|allowPaymentRequest|allowFullScreen|allowTransparency|alt|async|autoComplete|autoPlay|capture|cellPadding|cellSpacing|challenge|charSet|checked|cite|classID|className|cols|colSpan|content|contentEditable|contextMenu|controls|controlsList|coords|crossOrigin|data|dateTime|decoding|default|defer|dir|disabled|disablePictureInPicture|disableRemotePlayback|download|draggable|encType|enterKeyHint|fetchpriority|fetchPriority|form|formAction|formEncType|formMethod|formNoValidate|formTarget|frameBorder|headers|height|hidden|high|href|hrefLang|htmlFor|httpEquiv|id|inputMode|integrity|is|keyParams|keyType|kind|label|lang|list|loading|loop|low|marginHeight|marginWidth|max|maxLength|media|mediaGroup|method|min|minLength|multiple|muted|name|nonce|noValidate|open|optimum|pattern|placeholder|playsInline|popover|popoverTarget|popoverTargetAction|poster|preload|profile|radioGroup|readOnly|referrerPolicy|rel|required|reversed|role|rows|rowSpan|sandbox|scope|scoped|scrolling|seamless|selected|shape|size|sizes|slot|span|spellCheck|src|srcDoc|srcLang|srcSet|start|step|style|summary|tabIndex|target|title|translate|type|useMap|value|width|wmode|wrap|about|datatype|inlist|prefix|property|resource|typeof|vocab|autoCapitalize|autoCorrect|autoSave|color|incremental|fallback|inert|itemProp|itemScope|itemType|itemID|itemRef|on|option|results|security|unselectable|accentHeight|accumulate|additive|alignmentBaseline|allowReorder|alphabetic|amplitude|arabicForm|ascent|attributeName|attributeType|autoReverse|azimuth|baseFrequency|baselineShift|baseProfile|bbox|begin|bias|by|calcMode|capHeight|clip|clipPathUnits|clipPath|clipRule|colorInterpolation|colorInterpolationFilters|colorProfile|colorRendering|contentScriptType|contentStyleType|cursor|cx|cy|d|decelerate|descent|diffuseConstant|direction|display|divisor|dominantBaseline|dur|dx|dy|edgeMode|elevation|enableBackground|end|exponent|externalResourcesRequired|fill|fillOpacity|fillRule|filter|filterRes|filterUnits|floodColor|floodOpacity|focusable|fontFamily|fontSize|fontSizeAdjust|fontStretch|fontStyle|fontVariant|fontWeight|format|from|fr|fx|fy|g1|g2|glyphName|glyphOrientationHorizontal|glyphOrientationVertical|glyphRef|gradientTransform|gradientUnits|hanging|horizAdvX|horizOriginX|ideographic|imageRendering|in|in2|intercept|k|k1|k2|k3|k4|kernelMatrix|kernelUnitLength|kerning|keyPoints|keySplines|keyTimes|lengthAdjust|letterSpacing|lightingColor|limitingConeAngle|local|markerEnd|markerMid|markerStart|markerHeight|markerUnits|markerWidth|mask|maskContentUnits|maskUnits|mathematical|mode|numOctaves|offset|opacity|operator|order|orient|orientation|origin|overflow|overlinePosition|overlineThickness|panose1|paintOrder|pathLength|patternContentUnits|patternTransform|patternUnits|pointerEvents|points|pointsAtX|pointsAtY|pointsAtZ|preserveAlpha|preserveAspectRatio|primitiveUnits|r|radius|refX|refY|renderingIntent|repeatCount|repeatDur|requiredExtensions|requiredFeatures|restart|result|rotate|rx|ry|scale|seed|shapeRendering|slope|spacing|specularConstant|specularExponent|speed|spreadMethod|startOffset|stdDeviation|stemh|stemv|stitchTiles|stopColor|stopOpacity|strikethroughPosition|strikethroughThickness|string|stroke|strokeDasharray|strokeDashoffset|strokeLinecap|strokeLinejoin|strokeMiterlimit|strokeOpacity|strokeWidth|surfaceScale|systemLanguage|tableValues|targetX|targetY|textAnchor|textDecoration|textRendering|textLength|to|transform|u1|u2|underlinePosition|underlineThickness|unicode|unicodeBidi|unicodeRange|unitsPerEm|vAlphabetic|vHanging|vIdeographic|vMathematical|values|vectorEffect|version|vertAdvY|vertOriginX|vertOriginY|viewBox|viewTarget|visibility|widths|wordSpacing|writingMode|x|xHeight|x1|x2|xChannelSelector|xlinkActuate|xlinkArcrole|xlinkHref|xlinkRole|xlinkShow|xlinkTitle|xlinkType|xmlBase|xmlns|xmlnsXlink|xmlLang|xmlSpace|y|y1|y2|yChannelSelector|z|zoomAndPan|for|class|autofocus)|(([Dd][Aa][Tt][Aa]|[Aa][Rr][Ii][Aa]|x)-.*))$/,Jr=Kr(function(e){return qr.test(e)||e.charCodeAt(0)===111&&e.charCodeAt(1)===110&&e.charCodeAt(2)<91});function Yr(e){if(e.sheet)return e.sheet;for(var t=0;t<document.styleSheets.length;t++)if(document.styleSheets[t].ownerNode===e)return document.styleSheets[t]}function Xr(e){var t=document.createElement(`style`);return t.setAttribute(`data-emotion`,e.key),e.nonce!==void 0&&t.setAttribute(`nonce`,e.nonce),t.appendChild(document.createTextNode(``)),t.setAttribute(`data-s`,``),t}var Zr=function(){function e(e){var t=this;this._insertTag=function(e){var n=t.tags.length===0?t.insertionPoint?t.insertionPoint.nextSibling:t.prepend?t.container.firstChild:t.before:t.tags[t.tags.length-1].nextSibling;t.container.insertBefore(e,n),t.tags.push(e)},this.isSpeedy=e.speedy===void 0||e.speedy,this.tags=[],this.ctr=0,this.nonce=e.nonce,this.key=e.key,this.container=e.container,this.prepend=e.prepend,this.insertionPoint=e.insertionPoint,this.before=null}var t=e.prototype;return t.hydrate=function(e){e.forEach(this._insertTag)},t.insert=function(e){this.ctr%(this.isSpeedy?65e3:1)==0&&this._insertTag(Xr(this));var t=this.tags[this.tags.length-1];if(this.isSpeedy){var n=Yr(t);try{n.insertRule(e,n.cssRules.length)}catch{}}else t.appendChild(document.createTextNode(e));this.ctr++},t.flush=function(){this.tags.forEach(function(e){return e.parentNode?.removeChild(e)}),this.tags=[],this.ctr=0},e}(),Qr=`-ms-`,$r=`-moz-`,I=`-webkit-`,ei=`comm`,ti=`rule`,ni=`decl`,ri=`@import`,ii=`@keyframes`,ai=`@layer`,oi=Math.abs,si=String.fromCharCode,ci=Object.assign;function li(e,t){return pi(e,0)^45?(((t<<2^pi(e,0))<<2^pi(e,1))<<2^pi(e,2))<<2^pi(e,3):0}function ui(e){return e.trim()}function di(e,t){return(e=t.exec(e))?e[0]:e}function L(e,t,n){return e.replace(t,n)}function fi(e,t){return e.indexOf(t)}function pi(e,t){return e.charCodeAt(t)|0}function mi(e,t,n){return e.slice(t,n)}function hi(e){return e.length}function gi(e){return e.length}function _i(e,t){return t.push(e),e}function vi(e,t){return e.map(t).join(``)}var yi=1,bi=1,xi=0,Si=0,Ci=0,wi=``;function Ti(e,t,n,r,i,a,o){return{value:e,root:t,parent:n,type:r,props:i,children:a,line:yi,column:bi,length:o,return:``}}function Ei(e,t){return ci(Ti(``,null,null,``,null,null,0),e,{length:-e.length},t)}function Di(){return Ci}function Oi(){return Ci=Si>0?pi(wi,--Si):0,bi--,Ci===10&&(bi=1,yi--),Ci}function ki(){return Ci=Si<xi?pi(wi,Si++):0,bi++,Ci===10&&(bi=1,yi++),Ci}function Ai(){return pi(wi,Si)}function ji(){return Si}function Mi(e,t){return mi(wi,e,t)}function Ni(e){switch(e){case 0:case 9:case 10:case 13:case 32:return 5;case 33:case 43:case 44:case 47:case 62:case 64:case 126:case 59:case 123:case 125:return 4;case 58:return 3;case 34:case 39:case 40:case 91:return 2;case 41:case 93:return 1}return 0}function Pi(e){return yi=bi=1,xi=hi(wi=e),Si=0,[]}function Fi(e){return wi=``,e}function R(e){return ui(Mi(Si-1,Ri(e===91?e+2:e===40?e+1:e)))}function Ii(e){for(;(Ci=Ai())&&Ci<33;)ki();return Ni(e)>2||Ni(Ci)>3?``:` `}function Li(e,t){for(;--t&&ki()&&!(Ci<48||Ci>102||Ci>57&&Ci<65||Ci>70&&Ci<97););return Mi(e,ji()+(t<6&&Ai()==32&&ki()==32))}function Ri(e){for(;ki();)switch(Ci){case e:return Si;case 34:case 39:e!==34&&e!==39&&Ri(Ci);break;case 40:e===41&&Ri(e);break;case 92:ki();break}return Si}function zi(e,t){for(;ki()&&e+Ci!==57&&(e+Ci!==84||Ai()!==47););return`/*`+Mi(t,Si-1)+`*`+si(e===47?e:ki())}function Bi(e){for(;!Ni(Ai());)ki();return Mi(e,Si)}function Vi(e){return Fi(Hi(``,null,null,null,[``],e=Pi(e),0,[0],e))}function Hi(e,t,n,r,i,a,o,s,c){for(var l=0,u=0,d=o,f=0,p=0,m=0,h=1,g=1,_=1,v=0,y=``,b=i,x=a,S=r,C=y;g;)switch(m=v,v=ki()){case 40:if(m!=108&&pi(C,d-1)==58){fi(C+=L(R(v),`&`,`&\f`),`&\f`)!=-1&&(_=-1);break}case 34:case 39:case 91:C+=R(v);break;case 9:case 10:case 13:case 32:C+=Ii(m);break;case 92:C+=Li(ji()-1,7);continue;case 47:switch(Ai()){case 42:case 47:_i(Wi(zi(ki(),ji()),t,n),c);break;default:C+=`/`}break;case 123*h:s[l++]=hi(C)*_;case 125*h:case 59:case 0:switch(v){case 0:case 125:g=0;case 59+u:_==-1&&(C=L(C,/\f/g,``)),p>0&&hi(C)-d&&_i(p>32?Gi(C+`;`,r,n,d-1):Gi(L(C,` `,``)+`;`,r,n,d-2),c);break;case 59:C+=`;`;default:if(_i(S=Ui(C,t,n,l,u,i,s,y,b=[],x=[],d),a),v===123){if(u===0)Hi(C,t,S,S,b,a,d,s,x);else switch(f===99&&pi(C,3)===110?100:f){case 100:case 108:case 109:case 115:Hi(e,S,S,r&&_i(Ui(e,S,S,0,0,i,s,y,i,b=[],d),x),i,x,d,s,r?b:x);break;default:Hi(C,S,S,S,[``],x,0,s,x)}}}l=u=p=0,h=_=1,y=C=``,d=o;break;case 58:d=1+hi(C),p=m;default:if(h<1){if(v==123)--h;else if(v==125&&h++==0&&Oi()==125)continue}switch(C+=si(v),v*h){case 38:_=u>0?1:(C+=`\f`,-1);break;case 44:s[l++]=(hi(C)-1)*_,_=1;break;case 64:Ai()===45&&(C+=R(ki())),f=Ai(),u=d=hi(y=C+=Bi(ji())),v++;break;case 45:m===45&&hi(C)==2&&(h=0)}}return a}function Ui(e,t,n,r,i,a,o,s,c,l,u){for(var d=i-1,f=i===0?a:[``],p=gi(f),m=0,h=0,g=0;m<r;++m)for(var _=0,v=mi(e,d+1,d=oi(h=o[m])),y=e;_<p;++_)(y=ui(h>0?f[_]+` `+v:L(v,/&\f/g,f[_])))&&(c[g++]=y);return Ti(e,t,n,i===0?ti:s,c,l,u)}function Wi(e,t,n){return Ti(e,t,n,ei,si(Di()),mi(e,2,-2),0)}function Gi(e,t,n,r){return Ti(e,t,n,ni,mi(e,0,r),mi(e,r+1,-1),r)}function Ki(e,t){for(var n=``,r=gi(e),i=0;i<r;i++)n+=t(e[i],i,e,t)||``;return n}function qi(e,t,n,r){switch(e.type){case ai:if(e.children.length)break;case ri:case ni:return e.return=e.return||e.value;case ei:return``;case ii:return e.return=e.value+`{`+Ki(e.children,r)+`}`;case ti:e.value=e.props.join(`,`)}return hi(n=Ki(e.children,r))?e.return=e.value+`{`+n+`}`:``}function Ji(e){var t=gi(e);return function(n,r,i,a){for(var o=``,s=0;s<t;s++)o+=e[s](n,r,i,a)||``;return o}}function Yi(e){return function(t){t.root||(t=t.return)&&e(t)}}var Xi=function(e){var t=new WeakMap;return function(n){if(t.has(n))return t.get(n);var r=e(n);return t.set(n,r),r}},Zi=typeof document<`u`,Qi=function(e,t,n){for(var r=0,i=0;r=i,i=Ai(),r===38&&i===12&&(t[n]=1),!Ni(i);)ki();return Mi(e,Si)},$i=function(e,t){var n=-1,r=44;do switch(Ni(r)){case 0:r===38&&Ai()===12&&(t[n]=1),e[n]+=Qi(Si-1,t,n);break;case 2:e[n]+=R(r);break;case 4:if(r===44){e[++n]=Ai()===58?`&\f`:``,t[n]=e[n].length;break}default:e[n]+=si(r)}while(r=ki());return e},ea=function(e,t){return Fi($i(Pi(e),t))},ta=new WeakMap,na=function(e){if(!(e.type!==`rule`||!e.parent||e.length<1)){for(var t=e.value,n=e.parent,r=e.column===n.column&&e.line===n.line;n.type!==`rule`;)if(n=n.parent,!n)return;if(!(e.props.length===1&&t.charCodeAt(0)!==58&&!ta.get(n))&&!r){ta.set(e,!0);for(var i=[],a=ea(t,i),o=n.props,s=0,c=0;s<a.length;s++)for(var l=0;l<o.length;l++,c++)e.props[c]=i[s]?a[s].replace(/&\f/g,o[l]):o[l]+` `+a[s]}}},ra=function(e){if(e.type===`decl`){var t=e.value;t.charCodeAt(0)===108&&t.charCodeAt(2)===98&&(e.return=``,e.value=``)}};function ia(e,t){switch(li(e,t)){case 5103:return I+`print-`+e+e;case 5737:case 4201:case 3177:case 3433:case 1641:case 4457:case 2921:case 5572:case 6356:case 5844:case 3191:case 6645:case 3005:case 6391:case 5879:case 5623:case 6135:case 4599:case 4855:case 4215:case 6389:case 5109:case 5365:case 5621:case 3829:return I+e+e;case 5349:case 4246:case 4810:case 6968:case 2756:return I+e+$r+e+Qr+e+e;case 6828:case 4268:return I+e+Qr+e+e;case 6165:return I+e+Qr+`flex-`+e+e;case 5187:return I+e+L(e,/(\w+).+(:[^]+)/,I+`box-$1$2`+Qr+`flex-$1$2`)+e;case 5443:return I+e+Qr+`flex-item-`+L(e,/flex-|-self/,``)+e;case 4675:return I+e+Qr+`flex-line-pack`+L(e,/align-content|flex-|-self/,``)+e;case 5548:return I+e+Qr+L(e,`shrink`,`negative`)+e;case 5292:return I+e+Qr+L(e,`basis`,`preferred-size`)+e;case 6060:return I+`box-`+L(e,`-grow`,``)+I+e+Qr+L(e,`grow`,`positive`)+e;case 4554:return I+L(e,/([^-])(transform)/g,`$1`+I+`$2`)+e;case 6187:return L(L(L(e,/(zoom-|grab)/,I+`$1`),/(image-set)/,I+`$1`),e,``)+e;case 5495:case 3959:return L(e,/(image-set\([^]*)/,I+"$1$`$1");case 4968:return L(L(e,/(.+:)(flex-)?(.*)/,I+`box-pack:$3`+Qr+`flex-pack:$3`),/s.+-b[^;]+/,`justify`)+I+e+e;case 4095:case 3583:case 4068:case 2532:return L(e,/(.+)-inline(.+)/,I+`$1$2`)+e;case 8116:case 7059:case 5753:case 5535:case 5445:case 5701:case 4933:case 4677:case 5533:case 5789:case 5021:case 4765:if(hi(e)-1-t>6)switch(pi(e,t+1)){case 109:if(pi(e,t+4)!==45)break;case 102:return L(e,/(.+:)(.+)-([^]+)/,`$1`+I+`$2-$3$1`+$r+(pi(e,t+3)==108?`$3`:`$2-$3`))+e;case 115:return~fi(e,`stretch`)?ia(L(e,`stretch`,`fill-available`),t)+e:e}break;case 4949:if(pi(e,t+1)!==115)break;case 6444:switch(pi(e,hi(e)-3-(~fi(e,`!important`)&&10))){case 107:return L(e,`:`,`:`+I)+e;case 101:return L(e,/(.+:)([^;!]+)(;|!.+)?/,`$1`+I+(pi(e,14)===45?`inline-`:``)+`box$3$1`+I+`$2$3$1`+Qr+`$2box$3`)+e}break;case 5936:switch(pi(e,t+11)){case 114:return I+e+Qr+L(e,/[svh]\w+-[tblr]{2}/,`tb`)+e;case 108:return I+e+Qr+L(e,/[svh]\w+-[tblr]{2}/,`tb-rl`)+e;case 45:return I+e+Qr+L(e,/[svh]\w+-[tblr]{2}/,`lr`)+e}return I+e+Qr+e+e}return e}var aa=function(e,t,n,r){if(e.length>-1&&!e.return)switch(e.type){case ni:e.return=ia(e.value,e.length);break;case ii:return Ki([Ei(e,{value:L(e.value,`@`,`@`+I)})],r);case ti:if(e.length)return vi(e.props,function(t){switch(di(t,/(::plac\w+|:read-\w+)/)){case`:read-only`:case`:read-write`:return Ki([Ei(e,{props:[L(t,/:(read-\w+)/,`:`+$r+`$1`)]})],r);case`::placeholder`:return Ki([Ei(e,{props:[L(t,/:(plac\w+)/,`:`+I+`input-$1`)]}),Ei(e,{props:[L(t,/:(plac\w+)/,`:`+$r+`$1`)]}),Ei(e,{props:[L(t,/:(plac\w+)/,Qr+`input-$1`)]})],r)}return``})}},oa=Zi?void 0:Xi(function(){return Kr(function(){return{}})}),sa=[aa],ca=function(e){var t=e.key;if(Zi&&t===`css`){var n=document.querySelectorAll(`style[data-emotion]:not([data-s])`);Array.prototype.forEach.call(n,function(e){e.getAttribute(`data-emotion`).indexOf(` `)!==-1&&(document.head.appendChild(e),e.setAttribute(`data-s`,``))})}var r=e.stylisPlugins||sa,i={},a,o=[];Zi&&(a=e.container||document.head,Array.prototype.forEach.call(document.querySelectorAll(`style[data-emotion^="`+t+` "]`),function(e){for(var t=e.getAttribute(`data-emotion`).split(` `),n=1;n<t.length;n++)i[t[n]]=!0;o.push(e)}));var s,c=[na,ra];if(oa){var l=[qi],u=Ji(c.concat(r,l)),d=function(e){return Ki(Vi(e),u)},f=oa(r)(t),p=function(e,t){var n=t.name;return f[n]===void 0&&(f[n]=d(e?e+`{`+t.styles+`}`:t.styles)),f[n]};s=function(e,t,n,r){var i=t.name,a=p(e,t);if(v.compat===void 0)return r&&(v.inserted[i]=!0),a;if(r)v.inserted[i]=a;else return a}}else{var m,h=[qi,Yi(function(e){m.insert(e)})],g=Ji(c.concat(r,h)),_=function(e){return Ki(Vi(e),g)};s=function(e,t,n,r){m=n,_(e?e+`{`+t.styles+`}`:t.styles),r&&(v.inserted[t.name]=!0)}}var v={key:t,sheet:new Zr({key:t,container:a,nonce:e.nonce,speedy:e.speedy,prepend:e.prepend,insertionPoint:e.insertionPoint}),nonce:e.nonce,inserted:i,registered:{},insert:s};return v.sheet.hydrate(o),v},la=typeof Symbol==`function`&&Symbol.for,ua=la?Symbol.for(`react.element`):60103,da=la?Symbol.for(`react.portal`):60106,fa=la?Symbol.for(`react.fragment`):60107,pa=la?Symbol.for(`react.strict_mode`):60108,ma=la?Symbol.for(`react.profiler`):60114,ha=la?Symbol.for(`react.provider`):60109,ga=la?Symbol.for(`react.context`):60110,_a=la?Symbol.for(`react.async_mode`):60111,va=la?Symbol.for(`react.concurrent_mode`):60111,ya=la?Symbol.for(`react.forward_ref`):60112,ba=la?Symbol.for(`react.suspense`):60113,xa=la?Symbol.for(`react.suspense_list`):60120,Sa=la?Symbol.for(`react.memo`):60115,Ca=la?Symbol.for(`react.lazy`):60116,wa=la?Symbol.for(`react.block`):60121,Ta=la?Symbol.for(`react.fundamental`):60117,Ea=la?Symbol.for(`react.responder`):60118,Da=la?Symbol.for(`react.scope`):60119;function Oa(e){if(typeof e==`object`&&e){var t=e.$$typeof;switch(t){case ua:switch(e=e.type,e){case _a:case va:case fa:case ma:case pa:case ba:return e;default:switch(e&&=e.$$typeof,e){case ga:case ya:case Ca:case Sa:case ha:return e;default:return t}}case da:return t}}}function ka(e){return Oa(e)===va}var Aa={AsyncMode:_a,ConcurrentMode:va,ContextConsumer:ga,ContextProvider:ha,Element:ua,ForwardRef:ya,Fragment:fa,Lazy:Ca,Memo:Sa,Portal:da,Profiler:ma,StrictMode:pa,Suspense:ba,isAsyncMode:function(e){return ka(e)||Oa(e)===_a},isConcurrentMode:ka,isContextConsumer:function(e){return Oa(e)===ga},isContextProvider:function(e){return Oa(e)===ha},isElement:function(e){return typeof e==`object`&&!!e&&e.$$typeof===ua},isForwardRef:function(e){return Oa(e)===ya},isFragment:function(e){return Oa(e)===fa},isLazy:function(e){return Oa(e)===Ca},isMemo:function(e){return Oa(e)===Sa},isPortal:function(e){return Oa(e)===da},isProfiler:function(e){return Oa(e)===ma},isStrictMode:function(e){return Oa(e)===pa},isSuspense:function(e){return Oa(e)===ba},isValidElementType:function(e){return typeof e==`string`||typeof e==`function`||e===fa||e===va||e===ma||e===pa||e===ba||e===xa||typeof e==`object`&&!!e&&(e.$$typeof===Ca||e.$$typeof===Sa||e.$$typeof===ha||e.$$typeof===ga||e.$$typeof===ya||e.$$typeof===Ta||e.$$typeof===Ea||e.$$typeof===Da||e.$$typeof===wa)},typeOf:Oa};Ur(function(e,t){}),Ur(function(e){e.exports=Aa});var ja=typeof document<`u`;function Ma(e,t,n){var r=``;return n.split(` `).forEach(function(n){e[n]===void 0?n&&(r+=n+` `):t.push(e[n]+`;`)}),r}var Na=function(e,t,n){var r=e.key+`-`+t.name;(n===!1||ja===!1&&e.compat!==void 0)&&e.registered[r]===void 0&&(e.registered[r]=t.styles)},Pa=function(e,t,n){Na(e,t,n);var r=e.key+`-`+t.name;if(e.inserted[t.name]===void 0){var i=``,a=t;do{var o=e.insert(t===a?`.`+r:``,a,e.sheet,!0);!ja&&o!==void 0&&(i+=o),a=a.next}while(a!==void 0);if(!ja&&i.length!==0)return i}};function Fa(e){for(var t=0,n,r=0,i=e.length;i>=4;++r,i-=4)n=e.charCodeAt(r)&255|(e.charCodeAt(++r)&255)<<8|(e.charCodeAt(++r)&255)<<16|(e.charCodeAt(++r)&255)<<24,n=(n&65535)*1540483477+((n>>>16)*59797<<16),n^=n>>>24,t=(n&65535)*1540483477+((n>>>16)*59797<<16)^(t&65535)*1540483477+((t>>>16)*59797<<16);switch(i){case 3:t^=(e.charCodeAt(r+2)&255)<<16;case 2:t^=(e.charCodeAt(r+1)&255)<<8;case 1:t^=e.charCodeAt(r)&255,t=(t&65535)*1540483477+((t>>>16)*59797<<16)}return t^=t>>>13,t=(t&65535)*1540483477+((t>>>16)*59797<<16),((t^t>>>15)>>>0).toString(36)}var Ia={animationIterationCount:1,aspectRatio:1,borderImageOutset:1,borderImageSlice:1,borderImageWidth:1,boxFlex:1,boxFlexGroup:1,boxOrdinalGroup:1,columnCount:1,columns:1,flex:1,flexGrow:1,flexPositive:1,flexShrink:1,flexNegative:1,flexOrder:1,gridRow:1,gridRowEnd:1,gridRowSpan:1,gridRowStart:1,gridColumn:1,gridColumnEnd:1,gridColumnSpan:1,gridColumnStart:1,msGridRow:1,msGridRowSpan:1,msGridColumn:1,msGridColumnSpan:1,fontWeight:1,lineHeight:1,opacity:1,order:1,orphans:1,scale:1,tabSize:1,widows:1,zIndex:1,zoom:1,WebkitLineClamp:1,fillOpacity:1,floodOpacity:1,stopOpacity:1,strokeDasharray:1,strokeDashoffset:1,strokeMiterlimit:1,strokeOpacity:1,strokeWidth:1},La=/[A-Z]|^ms/g,Ra=/_EMO_([^_]+?)_([^]*?)_EMO_/g,za=function(e){return e.charCodeAt(1)===45},Ba=function(e){return e!=null&&typeof e!=`boolean`},Va=Kr(function(e){return za(e)?e:e.replace(La,`-$&`).toLowerCase()}),Ha=function(e,t){switch(e){case`animation`:case`animationName`:if(typeof t==`string`)return t.replace(Ra,function(e,t,n){return Ka={name:t,styles:n,next:Ka},t})}return Ia[e]!==1&&!za(e)&&typeof t==`number`&&t!==0?t+`px`:t};function Ua(e,t,n){if(n==null)return``;var r=n;if(r.__emotion_styles!==void 0)return r;switch(typeof n){case`boolean`:return``;case`object`:var i=n;if(i.anim===1)return Ka={name:i.name,styles:i.styles,next:Ka},i.name;var a=n;if(a.styles!==void 0){var o=a.next;if(o!==void 0)for(;o!==void 0;)Ka={name:o.name,styles:o.styles,next:Ka},o=o.next;return a.styles+`;`}return Wa(e,t,n);case`function`:if(e!==void 0){var s=Ka,c=n(e);return Ka=s,Ua(e,t,c)}}var l=n;if(t==null)return l;var u=t[l];return u===void 0?l:u}function Wa(e,t,n){var r=``;if(Array.isArray(n))for(var i=0;i<n.length;i++)r+=Ua(e,t,n[i])+`;`;else for(var a in n){var o=n[a];if(typeof o!=`object`){var s=o;t!=null&&t[s]!==void 0?r+=a+`{`+t[s]+`}`:Ba(s)&&(r+=Va(a)+`:`+Ha(a,s)+`;`)}else if(Array.isArray(o)&&typeof o[0]==`string`&&(t==null||t[o[0]]===void 0))for(var c=0;c<o.length;c++)Ba(o[c])&&(r+=Va(a)+`:`+Ha(a,o[c])+`;`);else{var l=Ua(e,t,o);switch(a){case`animation`:case`animationName`:r+=Va(a)+`:`+l+`;`;break;default:r+=a+`{`+l+`}`}}}return r}var Ga=/label:\s*([^\s;{]+)\s*(;|$)/g,Ka;function qa(e,t,n){if(e.length===1&&typeof e[0]==`object`&&e[0]!==null&&e[0].styles!==void 0)return e[0];var r=!0,i=``;Ka=void 0;var a=e[0];a==null||a.raw===void 0?(r=!1,i+=Ua(n,t,a)):i+=a[0];for(var o=1;o<e.length;o++)i+=Ua(n,t,e[o]),r&&(i+=a[o]);Ga.lastIndex=0;for(var s=``,c;(c=Ga.exec(i))!==null;)s+=`-`+c[1];return{name:Fa(i)+s,styles:i,next:Ka}}var Ja=typeof document<`u`,Ya=function(e){return e()},Xa=k.useInsertionEffect?k.useInsertionEffect:!1,Za=Ja&&Xa||Ya;({}).hasOwnProperty;var Qa=(0,k.createContext)(typeof HTMLElement<`u`?ca({key:`css`}):null),$a=function(e){return(0,k.forwardRef)(function(t,n){return e(t,(0,k.useContext)(Qa),n)})},eo=(0,k.createContext)({}),to=Jr,no=function(e){return e!==`theme`},ro=function(e){return typeof e==`string`&&e.charCodeAt(0)>96?to:no},io=function(e,t,n){var r;if(t){var i=t.shouldForwardProp;r=e.__emotion_forwardProp&&i?function(t){return e.__emotion_forwardProp(t)&&i(t)}:i}return typeof r!=`function`&&n&&(r=e.__emotion_forwardProp),r},ao=function(e){var t=e.cache,n=e.serialized,r=e.isStringTag;return Na(t,n,r),Za(function(){return Pa(t,n,r)}),null},oo={__proto__:null,default:function e(t,n){var r=t.__emotion_real===t,i=r&&t.__emotion_base||t,a,o;n!==void 0&&(a=n.label,o=n.target);var s=io(t,n,r),c=s||ro(i),l=!c(`as`);return function(){var u=arguments,d=r&&t.__emotion_styles!==void 0?t.__emotion_styles.slice(0):[];if(a!==void 0&&d.push(`label:`+a+`;`),u[0]==null||u[0].raw===void 0)d.push.apply(d,u);else{d.push(u[0][0]);for(var f=u.length,p=1;p<f;p++)d.push(u[p],u[0][p])}var m=$a(function(e,t,n){var r=l&&e.as||i,a=``,u=[],f=e;if(e.theme==null){for(var p in f={},e)f[p]=e[p];f.theme=(0,k.useContext)(eo)}typeof e.className==`string`?a=Ma(t.registered,u,e.className):e.className!=null&&(a=e.className+` `);var m=qa(d.concat(u),t.registered,f);a+=t.key+`-`+m.name,o!==void 0&&(a+=` `+o);var h=l&&s===void 0?ro(r):c,g={};for(var _ in e)l&&_===`as`||h(_)&&(g[_]=e[_]);return g.className=a,g.ref=n,(0,k.createElement)(k.Fragment,null,(0,k.createElement)(ao,{cache:t,serialized:m,isStringTag:typeof r==`string`}),(0,k.createElement)(r,g))});return m.displayName=a===void 0?`Styled(`+(typeof i==`string`?i:i.displayName||i.name||`Component`)+`)`:a,m.defaultProps=t.defaultProps,m.__emotion_real=m,m.__emotion_base=i,m.__emotion_styles=d,m.__emotion_forwardProp=s,Object.defineProperty(m,"toString",{value:function(){return`.`+o}}),m.withComponent=function(t,r){return e(t,Gr({},n,r,{shouldForwardProp:io(m,r,!0)})).apply(void 0,d)},m}}};function so(){try{if(!Object.assign)return!1;var e=new String(`abc`);if(e[5]=`de`,Object.getOwnPropertyNames(e)[0]===`5`)return!1;for(var t={},n=0;n<10;n++)t[`_`+String.fromCharCode(n)]=n;if(Object.getOwnPropertyNames(t).map(function(e){return t[e]}).join(``)!==`0123456789`)return!1;var r={};return`abcdefghijklmnopqrst`.split(``).forEach(function(e){r[e]=e}),Object.keys(Object.assign({},r)).join(``)===`abcdefghijklmnopqrst`}catch{return!1}}so();var co=`SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED`;Function.call.bind(Object.prototype.hasOwnProperty);function lo(){}function uo(){}uo.resetWarningCache=lo;var fo=function(){function e(e,t,n,r,i,a){if(a!==co){var o=Error("Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types");throw o.name=`Invariant Violation`,o}}e.isRequired=e;function t(){return e}var n={array:e,bigint:e,bool:e,func:e,number:e,object:e,string:e,symbol:e,any:e,arrayOf:t,element:e,elementType:e,instanceOf:t,node:e,objectOf:t,oneOf:t,oneOfType:t,shape:t,exact:t,checkPropTypes:uo,resetWarningCache:lo};return n.PropTypes=n,n},po=Ur(function(e){e.exports=fo()}),mo=Ur(function(e,t){t.__esModule=!0,t.default=void 0;var n=r(k.default);function r(e){return e&&e.__esModule?e:{default:e}}function i(e,t){e.prototype=Object.create(t.prototype),e.prototype.constructor=e,a(e,t)}function a(e,t){return a=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(e,t){return e.__proto__=t,e},a(e,t)}t.default=function(e){function t(){for(var t,r=arguments.length,i=Array(r),a=0;a<r;a++)i[a]=arguments[a];return t=e.call.apply(e,[this].concat(i))||this,t.container=n.default.createRef(),t.handleClick=function(e){var n=t.container.current,r=e.target,i=t.props.onClickOutside;(n&&n===r||n&&!n.contains(r))&&i(e)},t}i(t,e);var r=t.prototype;return r.componentDidMount=function(){document.addEventListener(`click`,this.handleClick,!0)},r.componentWillUnmount=function(){document.removeEventListener(`click`,this.handleClick,!0)},r.render=function(){var e=this.props,t=e.className,r=e.children;return n.default.createElement(`div`,{className:t,ref:this.container},r)},t}(n.default.Component)});Hr(mo);var z=Ur(function(e,t){t.__esModule=!0,t.valueExistInSelected=t.isomorphicWindow=t.isEqual=t.hexToRGBA=t.getProp=t.getByPath=t.debounce=void 0,t.valueExistInSelected=function(e,t,r){return!!t.find(function(t){return n(t,r.valueField)===e||n(t,r.labelField)===e})},t.hexToRGBA=function(e,t){e.length===4&&(e=``+e[1]+e[1]+e[2]+e[2]+e[3]+e[3]+`}`);var n=parseInt(e.slice(1,3),16),r=parseInt(e.slice(3,5),16),i=parseInt(e.slice(5,7),16);return`rgba(`+n+`, `+r+`, `+i+(t&&`, `+t)+`)`},t.debounce=function(e,t){t===void 0&&(t=0);var n;return function(){var r=[...arguments];n&&clearTimeout(n),n=setTimeout(function(){e.apply(void 0,r),n=null},t)}},t.isEqual=function(e,t){return JSON.stringify(e)===JSON.stringify(t)};var n=function(e,t){return t?t.split(`.`).reduce(function(e,t){return e[t]},e):void 0};t.getByPath=n;var r=function(e,t,n){if(!t)return e;var i=Array.isArray(t)?t:t.split(`.`).filter(function(e){return e.length});return i.length?r(e[i.shift()],i,n):e===void 0?n:e};t.getProp=r,t.isomorphicWindow=function(){return typeof window>`u`&&(Vr.window={}),window}});Hr(z);var B=Ur(function(e,t){t.__esModule=!0,t.LIB_NAME=void 0,t.LIB_NAME=`react-dropdown-select`});Hr(B);var V=Wr(oo),ho=Ur(function(e,t){t.__esModule=!0,t.default=void 0;var n=i(V),r=i(k.default);function i(e){return e&&e.__esModule?e:{default:e}}var a=function(e){var t=e.item,n=e.props,i=e.state,a=e.methods;return t&&n.optionRenderer?n.optionRenderer({item:t,props:n,state:i,methods:a}):r.default.createElement(o,{role:`listitem`,disabled:n.disabled,direction:n.direction,className:B.LIB_NAME+`-option`,color:n.color},r.default.createElement(`span`,{className:B.LIB_NAME+`-option-label`},(0,z.getByPath)(t,n.labelField)),r.default.createElement(`span`,{className:B.LIB_NAME+`-option-remove`,onClick:function(e){return a.removeItem(e,t,n.closeOnSelect)}},`×`))},o=(0,n.default)(`span`,{target:`e1l4eby50`})(`padding:0 5px;border-radius:2px;line-height:21px;margin:3px 0 3px 5px;background:`,function(e){return e.color},`;color:#fff;display:flex;flex-direction:`,function(e){return e.direction===`rtl`?`row-reverse`:`row`},`;.`,B.LIB_NAME,`-option-remove{cursor:pointer;width:22px;height:22px;display:inline-block;text-align:center;margin:0 -5px 0 0px;border-radius:0 3px 3px 0;:hover{color:tomato;}}:hover,:hover>span{opacity:0.9;}`);t.default=a});Hr(ho);var go=Ur(function(e,t){t.__esModule=!0,t.default=void 0;var n=o(V),r=a(k.default);a(po);function i(e){if(typeof WeakMap!=`function`)return null;var t=new WeakMap,n=new WeakMap;return(i=function(e){return e?n:t})(e)}function a(e,t){if(!t&&e&&e.__esModule)return e;if(e===null||typeof e!=`object`&&typeof e!=`function`)return{default:e};var n=i(t);if(n&&n.has(e))return n.get(e);var r={},a=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var o in e)if(o!="default"&&Object.prototype.hasOwnProperty.call(e,o)){var s=a?Object.getOwnPropertyDescriptor(e,o):null;s&&(s.get||s.set)?Object.defineProperty(r,o,s):r[o]=e[o]}return r.default=e,n&&n.set(e,r),r}function o(e){return e&&e.__esModule?e:{default:e}}function s(e,t){e.prototype=Object.create(t.prototype),e.prototype.constructor=e,c(e,t)}function c(e,t){return c=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(e,t){return e.__proto__=t,e},c(e,t)}var l=function(e,t){var n=e.addPlaceholder,r=e.searchable,i=e.placeholder,a=t.values&&t.values.length===0;return t.values&&0<t.values.length&&n&&r?n:a?i:``},u=function(e){function t(){for(var t,n=arguments.length,i=Array(n),a=0;a<n;a++)i[a]=arguments[a];return t=e.call.apply(e,[this].concat(i))||this,t.input=r.default.createRef(),t.onBlur=function(e){return e.stopPropagation(),t.props.state.dropdown?t.input.current.focus():t.input.current.blur()},t.handleKeyPress=function(e){var n=t.props,r=n.props,i=n.state,a=n.methods;return r.create&&e.key===`Enter`&&!(0,z.valueExistInSelected)(i.search,[].concat(i.values,r.options),t.props)&&i.search&&i.cursor===null&&a.createNew(i.search)},t}s(t,e);var n=t.prototype;return n.componentDidUpdate=function(e){(this.props.state.dropdown||e.state.dropdown!==this.props.state.dropdown&&this.props.state.dropdown||this.props.props.autoFocus)&&this.input.current.focus(),e.state.dropdown===this.props.state.dropdown||this.props.state.dropdown||this.input.current.blur()},n.render=function(){var e=this.props,t=e.props,n=e.state,i=e.methods;return t.inputRenderer?t.inputRenderer({props:t,state:n,methods:i,inputRef:this.input}):r.default.createElement(d,{ref:this.input,tabIndex:`-1`,onFocus:function(e){return e.stopPropagation()},className:B.LIB_NAME+`-input`,size:i.getInputSize(),value:n.search,readOnly:!t.searchable,onClick:function(){return i.dropDown(`open`)},onKeyPress:this.handleKeyPress,onChange:i.setSearch,onBlur:this.onBlur,placeholder:l(t,n),disabled:t.disabled})},t}(r.Component),d=(0,n.default)(`input`,{target:`e11wid6y0`})(`line-height:inherit;border:none;margin-left:5px;background:transparent;padding:0;width:calc(`,function(e){return e.size+`ch`},` + 5px);font-size:smaller;`,function(e){return e.readOnly&&`cursor: pointer;`},` :focus{outline:none;}`);t.default=u});Hr(go);var _o=Ur(function(e,t){t.__esModule=!0,t.default=void 0;var n=o(V),r=o(k.default),i=o(ho),a=o(go);function o(e){return e&&e.__esModule?e:{default:e}}var s=function(e){var t=e.props,n=e.state,o=e.methods;return r.default.createElement(c,{className:B.LIB_NAME+`-content `+(t.multi?B.LIB_NAME+`-type-multi`:B.LIB_NAME+`-type-single`),onClick:function(e){return e.stopPropagation(),!0===n.dropdown&&t.closeOnClickInput&&!n.search?o.dropDown(`close`):o.dropDown(`open`)}},t.contentRenderer?t.contentRenderer({props:t,state:n,methods:o}):r.default.createElement(r.default.Fragment,null,t.multi?n.values&&n.values.map(function(e){return r.default.createElement(i.default,{key:``+(0,z.getByPath)(e,t.valueField)+(0,z.getByPath)(e,t.labelField),item:e,state:n,props:t,methods:o})}):n.values&&0<n.values.length&&r.default.createElement(`span`,null,(0,z.getByPath)(n.values[0],t.labelField)),r.default.createElement(a.default,{props:t,methods:o,state:n})))},c=(0,n.default)(`div`,{target:`e1gn6jc30`})({name:`1m5113o`,styles:`display:flex;flex:1;flex-wrap:wrap`});t.default=s});Hr(_o);var vo=Ur(function(e,t){t.__esModule=!0,t.default=void 0;var n=i(V),r=i(k.default);function i(e){return e&&e.__esModule?e:{default:e}}var a=function(e){var t=e.props,n=e.state,i=e.methods;return t.noDataRenderer?t.noDataRenderer({props:t,state:n,methods:i}):r.default.createElement(o,{className:B.LIB_NAME+`-no-data`,color:t.color},t.noDataLabel)},o=(0,n.default)(`div`,{target:`e1l5ho1t0`})(`padding:10px;text-align:center;color:`,function(e){return e.color},`;`);t.default=a});Hr(vo);var yo=Ur(function(e,t){t.__esModule=!0,t.default=void 0;var n=o(V),r=a(k.default);a(po);function i(e){if(typeof WeakMap!=`function`)return null;var t=new WeakMap,n=new WeakMap;return(i=function(e){return e?n:t})(e)}function a(e,t){if(!t&&e&&e.__esModule)return e;if(e===null||typeof e!=`object`&&typeof e!=`function`)return{default:e};var n=i(t);if(n&&n.has(e))return n.get(e);var r={},a=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var o in e)if(o!="default"&&Object.prototype.hasOwnProperty.call(e,o)){var s=a?Object.getOwnPropertyDescriptor(e,o):null;s&&(s.get||s.set)?Object.defineProperty(r,o,s):r[o]=e[o]}return r.default=e,n&&n.set(e,r),r}function o(e){return e&&e.__esModule?e:{default:e}}function s(e,t){e.prototype=Object.create(t.prototype),e.prototype.constructor=e,c(e,t)}function c(e,t){return c=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(e,t){return e.__proto__=t,e},c(e,t)}var l=function(e){function t(){for(var t,n=arguments.length,i=Array(n),a=0;a<n;a++)i[a]=arguments[a];return t=e.call.apply(e,[this].concat(i))||this,t.item=r.default.createRef(),t}s(t,e);var n=t.prototype;return n.componentDidMount=function(){var e=this.props,t=e.props,n=e.methods;this.item.current&&!t.multi&&t.keepSelectedInList&&n.isSelected(this.props.item)&&this.item.current.scrollIntoView({block:`nearest`,inline:`start`})},n.componentDidUpdate=function(){this.props.state.cursor===this.props.itemIndex&&this.item.current&&this.item.current.scrollIntoView({behavior:`smooth`,block:`nearest`,inline:`start`})},n.render=function(){var e=this.props,t=e.props,n=e.state,i=e.methods,a=e.item,o=e.itemIndex;return t.itemRenderer?t.itemRenderer({item:a,itemIndex:o,props:t,state:n,methods:i}):!t.keepSelectedInList&&i.isSelected(a)?null:r.default.createElement(u,{role:`option`,ref:this.item,"aria-selected":i.isSelected(a),"aria-disabled":a.disabled,"aria-label":(0,z.getByPath)(a,t.labelField),disabled:a.disabled,key:``+(0,z.getByPath)(a,t.valueField)+(0,z.getByPath)(a,t.labelField),tabIndex:`-1`,className:B.LIB_NAME+`-item `+(i.isSelected(a)?B.LIB_NAME+`-item-selected`:``)+` `+(n.cursor===o?B.LIB_NAME+`-item-active`:``)+` `+(a.disabled?B.LIB_NAME+`-item-disabled`:``),onClick:a.disabled?void 0:function(){return i.addItem(a)},onKeyPress:a.disabled?void 0:function(){return i.addItem(a)},color:t.color},(0,z.getByPath)(a,t.labelField),` `,a.disabled&&r.default.createElement(`ins`,null,t.disabledLabel))},t}(r.Component),u=(0,n.default)(`span`,{target:`evc32pp0`})(`padding:5px 10px;cursor:pointer;border-bottom:1px solid #fff;&.`,B.LIB_NAME,`-item-active{border-bottom:1px solid #fff;`,function(e){var t=e.disabled,n=e.color;return!t&&n&&`background: `+(0,z.hexToRGBA)(n,.1)+`;`},`;}:hover,:focus{background:`,function(e){var t=e.color;return t&&(0,z.hexToRGBA)(t,.1)},`;outline:none;}&.`,B.LIB_NAME,`-item-selected{`,function(e){var t=e.disabled,n=e.color;return t?`
    background: #f2f2f2;
    color: #ccc;
    `:`
    background: `+n+`;
    color: #fff;
    border-bottom: 1px solid #fff;
    `},`;}`,function(e){return e.disabled?`
    background: #f2f2f2;
    color: #ccc;

    ins {
      text-decoration: none;
      border:1px solid #ccc;
      border-radius: 2px;
      padding: 0px 3px;
      font-size: x-small;
      text-transform: uppercase;
    }
    `:``},`;`);t.default=l});Hr(yo);var bo=Ur(function(e,t){t.__esModule=!0,t.default=void 0;var n=o(V),r=o(k.default),i=o(vo),a=o(yo);function o(e){return e&&e.__esModule?e:{default:e}}var s=function(e,t){var n=t.getSelectRef().getBoundingClientRect(),r=n.bottom+parseInt(e.dropdownHeight,10)+parseInt(e.dropdownGap,10);return e.dropdownPosition===`auto`?r>(0,z.isomorphicWindow)().innerHeight&&r>n.top?`top`:`bottom`:e.dropdownPosition},c=function(e){var t=e.props,n=e.state,o=e.methods;return r.default.createElement(l,{tabIndex:`-1`,"aria-expanded":`true`,role:`list`,dropdownPosition:s(t,o),selectBounds:n.selectBounds,portal:t.portal,dropdownGap:t.dropdownGap,dropdownHeight:t.dropdownHeight,className:B.LIB_NAME+`-dropdown `+B.LIB_NAME+`-dropdown-position-`+s(t,o)},t.dropdownRenderer?t.dropdownRenderer({props:t,state:n,methods:o}):r.default.createElement(r.default.Fragment,null,t.create&&n.search&&!(0,z.valueExistInSelected)(n.search,[].concat(n.values,t.options),t)&&r.default.createElement(u,{role:`button`,className:B.LIB_NAME+`-dropdown-add-new`,color:t.color,onClick:function(){return o.createNew(n.search)}},t.createNewLabel.replace(`{search}`,`"`+n.search+`"`)),n.searchResults.length===0?r.default.createElement(i.default,{className:B.LIB_NAME+`-no-data`,state:n,props:t,methods:o}):n.searchResults.map(function(e,i){return r.default.createElement(a.default,{key:e[t.valueField].toString(),item:e,itemIndex:i,state:n,props:t,methods:o})}),t.selectAll&&t.options&&t.multi&&r.default.createElement(d,{role:`button`,className:B.LIB_NAME+`-dropdown-select-all`,color:t.color,onClick:function(){return o.areAllSelected()?o.clearAll():o.selectAll()}},o.areAllSelected()?t.clearAllLabel:t.selectAllLabel)))},l=(0,n.default)(`div`,{target:`e1qjn9k92`})(`position:absolute;`,function(e){var t=e.selectBounds,n=e.dropdownGap;return e.dropdownPosition===`top`?`bottom: `+(t.height+2+n)+`px`:`top: `+(t.height+2+n)+`px`},`;`,function(e){var t=e.selectBounds,n=e.dropdownGap,r=e.dropdownPosition;return e.portal?`
      position: fixed;
      `+(r===`bottom`?`top: `+(t.bottom+n)+`px;`:`bottom: `+((0,z.isomorphicWindow)().innerHeight-t.top+n)+`px;`)+`
      left: `+(t.left-1)+`px;`:`left: -1px;`},`;border:1px solid #ccc;width:`,function(e){return e.selectBounds.width},`px;padding:0;display:flex;flex-direction:column;background:#fff;border-radius:2px;box-shadow:0 0 10px 0 `,function(){return(0,z.hexToRGBA)(`#000000`,.2)},`;max-height:`,function(e){return e.dropdownHeight},`;overflow:auto;z-index:9;:focus{outline:none;}`),u=(0,n.default)(`div`,{target:`e1qjn9k91`})(`color:`,function(e){return e.color},`;padding:5px 10px;:hover{background:`,function(e){var t=e.color;return t&&(0,z.hexToRGBA)(t,.1)},`;outline:none;cursor:pointer;}`),d=(0,n.default)(`div`,{target:`e1qjn9k90`})(`color:`,function(e){return e.color},`;padding:5px 10px;position:sticky;bottom:0;margin:0;opacity:1;background:#fff;box-shadow:0 0 10px 0 `,function(){return(0,z.hexToRGBA)(`#000000`,.2)},`;:hover{outline:none;cursor:pointer;}`);t.default=c});Hr(bo);var xo=Ur(function(e,t){t.__esModule=!0,t.default=void 0;var n=i(V),r=i(k.default);function i(e){return e&&e.__esModule?e:{default:e}}var a=function(e){var t=e.props;return t.loadingRenderer?t.loadingRenderer({props:t}):r.default.createElement(o,{className:B.LIB_NAME+`-loading`,color:t.color})},o=(0,n.default)(`div`,{target:`e1l5cpc30`})(`@keyframes dual-ring-spin{0%{transform:rotate(0deg);}100%{transform:rotate(180deg);}}padding:0 5px;display:block;width:auto;height:auto;:after{content:' ';display:block;width:16px;height:16px;border-radius:50%;border-width:1px;border-style:solid;border-color:`,function(e){return e.color},` transparent;animation:dual-ring-spin 0.7s ease-in-out infinite;margin:0 0 0 -10px;}`);t.default=a});Hr(xo);var So=Ur(function(e,t){t.__esModule=!0,t.default=void 0;var n=i(V),r=i(k.default);function i(e){return e&&e.__esModule?e:{default:e}}var a=function(e){var t=e.props,n=e.state,i=e.methods;return t.clearRenderer?t.clearRenderer({props:t,state:n,methods:i}):r.default.createElement(o,{className:B.LIB_NAME+`-clear`,tabIndex:`-1`,onClick:function(){return i.clearAll()},onKeyPress:function(){return i.clearAll()}},`×`)},o=(0,n.default)(`div`,{target:`e11qlq5e0`})({name:`992gsg`,styles:`line-height:25px;margin:0 10px;cursor:pointer;:focus{outline:none;}:hover{color:tomato;}`});t.default=a});Hr(So);var Co=Ur(function(e,t){t.__esModule=!0,t.default=void 0;var n=i(V),r=i(k.default);function i(e){return e&&e.__esModule?e:{default:e}}var a=function(e){var t=e.props,n=e.state,i=e.methods;return t.separatorRenderer?t.separatorRenderer({props:t,state:n,methods:i}):r.default.createElement(o,{className:B.LIB_NAME+`-separator`})},o=(0,n.default)(`div`,{target:`e19h5j1v0`})({name:`cmi1n0`,styles:`border-left:1px solid #ccc;width:1px;height:25px;display:block`});t.default=a});Hr(Co);var wo=Ur(function(e,t){t.__esModule=!0,t.default=void 0;var n=i(V),r=i(k.default);function i(e){return e&&e.__esModule?e:{default:e}}var a=function(e){var t=e.props,n=e.state,i=e.methods;return r.default.createElement(o,{tabIndex:`-1`,onClick:function(e){return i.dropDown(n.dropdown?`close`:`open`,e)},dropdownOpen:n.dropdown,onKeyPress:function(e){return i.dropDown(`toggle`,e)},onKeyDown:function(e){return i.dropDown(`toggle`,e)},className:B.LIB_NAME+`-dropdown-handle`,rotate:+!t.dropdownHandleRenderer,color:t.color},t.dropdownHandleRenderer?t.dropdownHandleRenderer({props:t,state:n,methods:i}):r.default.createElement(`svg`,{fill:`currentColor`,viewBox:`0 0 40 40`},r.default.createElement(`path`,{d:`M31 26.4q0 .3-.2.5l-1.1 1.2q-.3.2-.6.2t-.5-.2l-8.7-8.8-8.8 8.8q-.2.2-.5.2t-.5-.2l-1.2-1.2q-.2-.2-.2-.5t.2-.5l10.4-10.4q.3-.2.6-.2t.5.2l10.4 10.4q.2.2.2.5z`})))},o=(0,n.default)(`div`,{target:`e1vudypg0`})(`text-align:center;`,function(e){var t=e.dropdownOpen,n=e.rotate;return t?`
      pointer-events: all;
      `+(n?`transform: rotate(0deg);margin: 0px 0 -3px 5px;`:``)+`
      `:`
      pointer-events: none;
      `+(n?`margin: 0 0 0 5px;transform: rotate(180deg);`:``)+`
      `},`;cursor:pointer;svg{width:16px;height:16px;}:hover{path{stroke:`,function(e){return e.color},`;}}:focus{outline:none;path{stroke:`,function(e){return e.color},`;}}`);t.default=a});Hr(wo),Hr(Ur(function(e,t){t.__esModule=!0,t.default=t.Select=void 0;var n=m(V),r=p(k.default),i=m(ar.default),a=m(mo),o=m(_o),s=m(bo),c=m(xo),l=m(So),u=m(Co),d=m(wo);function f(e){if(typeof WeakMap!=`function`)return null;var t=new WeakMap,n=new WeakMap;return(f=function(e){return e?n:t})(e)}function p(e,t){if(!t&&e&&e.__esModule)return e;if(e===null||typeof e!=`object`&&typeof e!=`function`)return{default:e};var n=f(t);if(n&&n.has(e))return n.get(e);var r={},i=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var a in e)if(a!="default"&&Object.prototype.hasOwnProperty.call(e,a)){var o=i?Object.getOwnPropertyDescriptor(e,a):null;o&&(o.get||o.set)?Object.defineProperty(r,a,o):r[a]=e[a]}return r.default=e,n&&n.set(e,r),r}function m(e){return e&&e.__esModule?e:{default:e}}function h(){return h=Object.assign?Object.assign.bind():function(e){for(var t,n=1;n<arguments.length;n++)for(var r in t=arguments[n],t)Object.prototype.hasOwnProperty.call(t,r)&&(e[r]=t[r]);return e},h.apply(this,arguments)}function g(e){if(e===void 0)throw ReferenceError(`this hasn't been initialised - super() hasn't been called`);return e}function _(e,t){e.prototype=Object.create(t.prototype),e.prototype.constructor=e,v(e,t)}function v(e,t){return v=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(e,t){return e.__proto__=t,e},v(e,t)}var y=function(e){function t(t){var n;return n=e.call(this,t)||this,n.onDropdownClose=function(){n.setState({cursor:null}),n.props.onDropdownClose()},n.onScroll=function(){n.props.closeOnScroll&&n.dropDown(`close`),n.updateSelectBounds()},n.updateSelectBounds=function(){return n.select.current&&n.setState({selectBounds:n.select.current.getBoundingClientRect()})},n.getSelectBounds=function(){return n.state.selectBounds},n.dropDown=function(e,t,r){e===void 0&&(e=`toggle`),r===void 0&&(r=!1);var i=t&&t.target||t&&t.srcElement;return n.props.onDropdownCloseRequest!==void 0&&n.state.dropdown&&!1===r&&e===`close`?n.props.onDropdownCloseRequest({props:n.props,methods:n.methods,state:n.state,close:function(){return n.dropDown(`close`,null,!0)}}):n.props.portal&&!n.props.closeOnScroll&&!n.props.closeOnSelect&&t&&i&&i.offsetParent&&i.offsetParent.classList.contains(`react-dropdown-select-dropdown`)?void 0:n.props.keepOpen?n.setState({dropdown:!0}):e===`close`&&n.state.dropdown?(n.select.current.blur(),n.setState({dropdown:!1,search:n.props.clearOnBlur?``:n.state.search,searchResults:n.props.options})):e!==`open`||n.state.dropdown?e===`toggle`&&(n.select.current.focus(),n.setState({dropdown:!n.state.dropdown})):n.setState({dropdown:!0})},n.getSelectRef=function(){return n.select.current},n.addItem=function(e){if(n.props.multi){if((0,z.valueExistInSelected)((0,z.getByPath)(e,n.props.valueField),n.state.values,n.props))return n.removeItem(null,e,!1);n.setState({values:[].concat(n.state.values,[e])}),n.props.onSelect([].concat(n.state.values,[e]))}else n.setState({values:[e],dropdown:!1}),n.props.onSelect([e]);return n.props.clearOnSelect&&n.setState({search:``},function(){n.setState({searchResults:n.searchResults()})}),!0},n.removeItem=function(e,t,r){r===void 0&&(r=!1),e&&r&&(e.preventDefault(),e.stopPropagation(),n.dropDown(`close`));var i=n.state.values.filter(function(e){return(0,z.getByPath)(e,n.props.valueField)!==(0,z.getByPath)(t,n.props.valueField)});n.setState({values:i}),n.props.onDeselect(i)},n.setSearch=function(e){n.setState({cursor:null}),n.setState({search:e.target.value},function(){n.setState({searchResults:n.searchResults()})})},n.getInputSize=function(){return n.state.search?n.state.search.length:0<n.state.values.length?n.props.addPlaceholder.length:n.props.placeholder.length},n.toggleSelectAll=function(){return n.setState({values:n.state.values.length===0?n.selectAll():n.clearAll()})},n.clearAll=function(){n.props.onClearAll(),n.setState({values:[]})},n.selectAll=function(e){e===void 0&&(e=[]),n.props.onSelectAll();var t=0<e.length?e:n.props.options.filter(function(e){return!e.disabled});n.setState({values:t})},n.isSelected=function(e){return!!n.state.values.find(function(t){return(0,z.getByPath)(t,n.props.valueField)===(0,z.getByPath)(e,n.props.valueField)})},n.areAllSelected=function(){return n.state.values.length===n.props.options.filter(function(e){return!e.disabled}).length},n.safeString=function(e){return e.replace(/[.*+?^${}()|[\]\\]/g,`\\$&`)},n.sortBy=function(){var e=n.props,t=e.sortBy,r=e.options;return t&&r.sort(function(e,n){return(0,z.getProp)(e,t)<(0,z.getProp)(n,t)?-1:+((0,z.getProp)(e,t)>(0,z.getProp)(n,t))}),r},n.searchFn=function(e){var t=e.state,r=e.methods,i=new RegExp(r.safeString(t.search),`i`);return r.sortBy().filter(function(e){return i.test((0,z.getByPath)(e,n.props.searchBy)||(0,z.getByPath)(e,n.props.valueField))})},n.searchResults=function(){var e={state:n.state,props:n.props,methods:n.methods};return n.props.searchFn(e)||n.searchFn(e)},n.activeCursorItem=function(e){return n.setState({activeCursorItem:e})},n.handleKeyDown=function(e){var t={event:e,state:n.state,props:n.props,methods:n.methods,setState:n.setState.bind(g(n))};return n.props.handleKeyDownFn(t)||n.handleKeyDownFn(t)},n.handleKeyDownFn=function(e){var t=e.event,r=e.state,i=e.props,a=e.methods,o=e.setState,s=r.cursor,c=r.searchResults,l=t.key===`Escape`,u=t.key===`Enter`,d=t.key===`ArrowUp`,f=t.key===`ArrowDown`,p=t.key===`Backspace`,m=t.key===`Tab`&&!t.shiftKey,h=t.shiftKey&&t.key===`Tab`;if(f&&!r.dropdown)return t.preventDefault(),n.dropDown(`open`),o({cursor:0});if((f||m&&r.dropdown)&&s===null)return o({cursor:0});if((d||f||h&&r.dropdown||m&&r.dropdown)&&t.preventDefault(),l&&n.dropDown(`close`),u){var g=c[s];if(g&&!g.disabled){if(i.create&&(0,z.valueExistInSelected)(r.search,r.values,i))return null;a.addItem(g)}}return(f||m&&r.dropdown)&&c.length===s?o({cursor:0}):void((f||m&&r.dropdown)&&o(function(e){return{cursor:e.cursor+1}}),(d||h&&r.dropdown)&&0<s&&o(function(e){return{cursor:e.cursor-1}}),(d||h&&r.dropdown)&&s===0&&o({cursor:c.length}),p&&i.backspaceDelete&&n.getInputSize()===0&&n.setState({values:n.state.values.slice(0,-1)}))},n.renderDropdown=function(){return n.props.portal?i.default.createPortal(r.default.createElement(s.default,{props:n.props,state:n.state,methods:n.methods}),n.dropdownRoot):r.default.createElement(s.default,{props:n.props,state:n.state,methods:n.methods})},n.createNew=function(e){var t,r=(t={},t[n.props.labelField]=e,t[n.props.valueField]=e,t);n.addItem(r),n.props.onCreateNew(r),n.setState({search:``})},n.state={dropdown:!1,values:t.values,search:``,selectBounds:{},cursor:null,searchResults:t.options},n.methods={activeCursorItem:n.activeCursorItem,addItem:n.addItem,areAllSelected:n.areAllSelected,clearAll:n.clearAll,createNew:n.createNew,dropDown:n.dropDown,getInputSize:n.getInputSize,getSelectBounds:n.getSelectBounds,getSelectRef:n.getSelectRef,handleKeyDown:n.handleKeyDown,isSelected:n.isSelected,removeItem:n.removeItem,safeString:n.safeString,searchResults:n.searchResults,selectAll:n.selectAll,setSearch:n.setSearch,sortBy:n.sortBy,toggleSelectAll:n.toggleSelectAll},n.select=r.default.createRef(),n.dropdownRoot=typeof document<`u`&&document.createElement(`div`),n}_(t,e);var n=t.prototype;return n.componentDidMount=function(){this.props.portal&&this.props.portal.appendChild(this.dropdownRoot),(0,z.isomorphicWindow)().addEventListener(`resize`,(0,z.debounce)(this.updateSelectBounds)),(0,z.isomorphicWindow)().addEventListener(`scroll`,(0,z.debounce)(this.onScroll)),this.dropDown(`close`),this.select&&this.updateSelectBounds(),this.props.defaultMenuIsOpen&&this.dropDown(`open`)},n.componentDidUpdate=function(e,t){var n=this;!this.props.compareValuesFunc(e.values,this.props.values)&&this.props.compareValuesFunc(e.values,t.values)&&(this.setState({values:this.props.values},function(){n.props.onChange(n.state.values)}),this.updateSelectBounds()),e.options!==this.props.options&&this.setState({searchResults:this.searchResults()}),t.values!==this.state.values&&(this.props.onChange(this.state.values),this.updateSelectBounds()),t.search!==this.state.search&&this.updateSelectBounds(),t.values!==this.state.values&&this.props.closeOnSelect&&this.dropDown(`close`),e.multi!==this.props.multi&&this.updateSelectBounds(),t.dropdown&&t.dropdown!==this.state.dropdown&&this.onDropdownClose(),t.dropdown||t.dropdown===this.state.dropdown||this.props.onDropdownOpen()},n.componentWillUnmount=function(){this.props.portal&&this.props.portal.removeChild(this.dropdownRoot),(0,z.isomorphicWindow)().removeEventListener(`resize`,(0,z.debounce)(this.updateSelectBounds,this.props.debounceDelay)),(0,z.isomorphicWindow)().removeEventListener(`scroll`,(0,z.debounce)(this.onScroll,this.props.debounceDelay))},n.render=function(){var e=this;return r.default.createElement(a.default,{onClickOutside:function(t){return e.dropDown(`close`,t)}},r.default.createElement(b,h({onKeyDown:this.handleKeyDown,"aria-label":`Dropdown select`,"aria-expanded":this.state.dropdown,onClick:function(t){return e.dropDown(`open`,t)},tabIndex:this.props.disabled?`-1`:`0`,direction:this.props.direction,style:this.props.style,ref:this.select,disabled:this.props.disabled,className:B.LIB_NAME+` `+this.props.className,color:this.props.color},this.props.additionalProps),r.default.createElement(o.default,{props:this.props,state:this.state,methods:this.methods}),(this.props.name||this.props.required)&&r.default.createElement(`input`,{tabIndex:-1,style:{opacity:0,width:0,position:`absolute`},name:this.props.name,required:this.props.required,pattern:this.props.pattern,defaultValue:this.state.values.map(function(t){return t[e.props.labelField]}).toString()||[],disabled:this.props.disabled}),this.props.loading&&r.default.createElement(c.default,{props:this.props}),this.props.clearable&&r.default.createElement(l.default,{props:this.props,state:this.state,methods:this.methods}),this.props.separator&&r.default.createElement(u.default,{props:this.props,state:this.state,methods:this.methods}),this.props.dropdownHandle&&r.default.createElement(d.default,{onClick:function(){return e.select.current.focus()},props:this.props,state:this.state,methods:this.methods}),this.state.dropdown&&!this.props.disabled&&this.renderDropdown()))},t}(r.Component);t.Select=y,y.defaultProps={addPlaceholder:``,additionalProps:null,autoFocus:!1,backspaceDelete:!0,clearAllLabel:`Clear all`,clearOnBlur:!0,clearOnSelect:!0,clearable:!1,closeOnScroll:!1,closeOnSelect:!1,closeOnClickInput:!1,color:`#0074D9`,compareValuesFunc:z.isEqual,create:!1,createNewLabel:`add {search}`,debounceDelay:0,direction:`ltr`,disabled:!1,disabledLabel:`disabled`,dropdownGap:5,dropdownHandle:!0,dropdownHeight:`300px`,dropdownPosition:`bottom`,handleKeyDownFn:function(){},keepOpen:!1,keepSelectedInList:!0,labelField:`label`,loading:!1,multi:!1,name:null,noDataLabel:`No data`,onChange:function(){},onSelect:function(){},onDeselect:function(){},onClearAll:function(){},onCreateNew:function(){},onDropdownClose:function(){},onDropdownCloseRequest:void 0,onDropdownOpen:function(){},onSelectAll:function(){},options:[],pattern:void 0,placeholder:`Select...`,portal:null,required:!1,searchBy:`label`,searchFn:function(){},searchable:!0,selectAll:!1,selectAllLabel:`Select all`,separator:!1,sortBy:null,valueField:`value`,values:[],defaultMenuIsOpen:!1};var b=(0,n.default)(`div`,{target:`e1gzf2xs0`})(`box-sizing:border-box;position:relative;display:flex;border:1px solid #ccc;width:100%;border-radius:2px;padding:2px 5px;flex-direction:row;direction:`,function(e){return e.direction},`;align-items:center;cursor:pointer;min-height:36px;`,function(e){return e.disabled?`cursor: not-allowed;pointer-events: none;opacity: 0.3;`:`pointer-events: all;`},` :hover,:focus-within{border-color:`,function(e){return e.color},`;}:focus,:focus-within{outline:0;box-shadow:0 0 0 3px `,function(e){var t=e.color;return(0,z.hexToRGBA)(t,.2)},`;}*{box-sizing:border-box;}`);t.default=y}));var To;F.div(To||=cr([`
  & .react-dropdown-select {
    border-radius: var(--values-value-8);
    padding: var(--values-value-12) var(--values-value-16);
    color: var(--text-dark);
    background: var(--input-bg);
    transition: background-color 0.2s, color 0.2s, border-color 0.2s,
      box-shadow 0.2s;
    appearance: none;
    outline-color: transparent;
    border: 1px solid var(--default-input-border);
    &:focus-visible,
    &:hover,
    &:focus-within {
      border: 1px solid var(--default-input-border);
      outline: 1px solid var(--primary);
    }

    &.error {
      border-color: var(--danger);
      outline: none;
    }
  }

  & .input-field {
    margin-bottom: 0 !important;
  }

  & .react-dropdown-select-content {
    color: var(--text-dark);
    letter-spacing: 0.5px;
    opacity: 1;
  }

  & .react-dropdown-select-dropdown {
    min-height: 100vh;
    top: 0;
    width: 100%;
    position: fixed;
    background-color: var(--body-bg);
    border: none;
  }
  & .dropdown-renderer-search {
    padding: var(--values-value-16);
    background: var(--card-bg);
  }
  & .dropdown-renderer-listing {
    .options {
      border-bottom: 1px solid var(--bluegray-100);
      &.selected {
        background: var(--primary-bg-light);
      }
    }
  }
  & .dropdown-renderer-listing-list {
    line-height: 1.4;
  }
`])),Ur(function(e,t){(function(t,n){e.exports=n()})(Vr,(function(){function e(e,t){(t==null||t>e.length)&&(t=e.length);for(var n=0,r=Array(t);n<t;n++)r[n]=e[n];return r}function t(e){if(Array.isArray(e))return e}function n(e,t){var n=e==null?null:typeof Symbol<`u`&&e[Symbol.iterator]||e[`@@iterator`];if(n!=null){var r,i,a,o,s=[],c=!0,l=!1;try{if(a=(n=n.call(e)).next,t!==0)for(;!(c=(r=a.call(n)).done)&&(s.push(r.value),s.length!==t);c=!0);}catch(e){l=!0,i=e}finally{try{if(!c&&n.return!=null&&(o=n.return(),Object(o)!==o))return}finally{if(l)throw i}}return s}}function r(){throw TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}function i(e,i){return t(e)||n(e,i)||a(e,i)||r()}function a(t,n){if(t){if(typeof t==`string`)return e(t,n);var r={}.toString.call(t).slice(8,-1);return r===`Object`&&t.constructor&&(r=t.constructor.name),r===`Map`||r===`Set`?Array.from(t):r===`Arguments`||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?e(t,n):void 0}}let o=Object.entries,s=Object.setPrototypeOf,c=Object.isFrozen,l=Object.getPrototypeOf,u=Object.getOwnPropertyDescriptor,d=Object.freeze,f=Object.seal,p=Object.create,m=typeof Reflect<`u`&&Reflect,h=m.apply,g=m.construct;d||=function(e){return e},f||=function(e){return e},h||=function(e,t){var n=[...arguments].slice(2);return e.apply(t,n)},g||=function(e){return new e(...[...arguments].slice(1))};let _=D(Array.prototype.forEach),v=D(Array.prototype.lastIndexOf),y=D(Array.prototype.pop),b=D(Array.prototype.push),x=D(Array.prototype.splice),S=Array.isArray,C=D(String.prototype.toLowerCase),w=D(String.prototype.toString),ee=D(String.prototype.match),te=D(String.prototype.replace),ne=D(String.prototype.indexOf),re=D(String.prototype.trim),ie=D(Number.prototype.toString),ae=D(Boolean.prototype.toString),oe=typeof BigInt>`u`?null:D(BigInt.prototype.toString),se=typeof Symbol>`u`?null:D(Symbol.prototype.toString),T=D(Object.prototype.hasOwnProperty),ce=D(Object.prototype.toString),E=D(RegExp.prototype.test),le=ue(TypeError);function D(e){return function(t){t instanceof RegExp&&(t.lastIndex=0);var n=[...arguments].slice(1);return h(e,t,n)}}function ue(e){return function(){return g(e,[...arguments])}}function O(e,t){let n=arguments.length>2&&arguments[2]!==void 0?arguments[2]:C;if(s&&s(e,null),!S(t))return e;let r=t.length;for(;r--;){let i=t[r];if(typeof i==`string`){let e=n(i);e!==i&&(c(t)||(t[r]=e),i=e)}e[i]=!0}return e}function k(e){for(let t=0;t<e.length;t++)T(e,t)||(e[t]=null);return e}function de(e){let t=p(null);for(let r of o(e)){var n=i(r,2);let a=n[0],o=n[1];T(e,a)&&(t[a]=S(o)?k(o):o&&typeof o==`object`&&o.constructor===Object?de(o):o)}return t}function A(e){switch(typeof e){case`string`:return e;case`number`:return ie(e);case`boolean`:return ae(e);case`bigint`:return oe?oe(e):`0`;case`symbol`:return se?se(e):`Symbol()`;case`undefined`:return ce(e);case`function`:case`object`:{if(e===null)return ce(e);let t=e,n=j(t,`toString`);if(typeof n==`function`){let e=n(t);return typeof e==`string`?e:ce(e)}return ce(e)}default:return ce(e)}}function j(e,t){for(;e!==null;){let n=u(e,t);if(n){if(n.get)return D(n.get);if(typeof n.value==`function`)return D(n.value)}e=l(e)}function n(){return null}return n}function fe(e){try{return E(e,``),!0}catch{return!1}}let M=d(`a.abbr.acronym.address.area.article.aside.audio.b.bdi.bdo.big.blink.blockquote.body.br.button.canvas.caption.center.cite.code.col.colgroup.content.data.datalist.dd.decorator.del.details.dfn.dialog.dir.div.dl.dt.element.em.fieldset.figcaption.figure.font.footer.form.h1.h2.h3.h4.h5.h6.head.header.hgroup.hr.html.i.img.input.ins.kbd.label.legend.li.main.map.mark.marquee.menu.menuitem.meter.nav.nobr.ol.optgroup.option.output.p.picture.pre.progress.q.rp.rt.ruby.s.samp.search.section.select.shadow.slot.small.source.spacer.span.strike.strong.style.sub.summary.sup.table.tbody.td.template.textarea.tfoot.th.thead.time.tr.track.tt.u.ul.var.video.wbr`.split(`.`)),pe=d(`svg.a.altglyph.altglyphdef.altglyphitem.animatecolor.animatemotion.animatetransform.circle.clippath.defs.desc.ellipse.enterkeyhint.exportparts.filter.font.g.glyph.glyphref.hkern.image.inputmode.line.lineargradient.marker.mask.metadata.mpath.part.path.pattern.polygon.polyline.radialgradient.rect.stop.style.switch.symbol.text.textpath.title.tref.tspan.view.vkern`.split(`.`)),N=d([`feBlend`,`feColorMatrix`,`feComponentTransfer`,`feComposite`,`feConvolveMatrix`,`feDiffuseLighting`,`feDisplacementMap`,`feDistantLight`,`feDropShadow`,`feFlood`,`feFuncA`,`feFuncB`,`feFuncG`,`feFuncR`,`feGaussianBlur`,`feImage`,`feMerge`,`feMergeNode`,`feMorphology`,`feOffset`,`fePointLight`,`feSpecularLighting`,`feSpotLight`,`feTile`,`feTurbulence`]),me=d([`animate`,`color-profile`,`cursor`,`discard`,`font-face`,`font-face-format`,`font-face-name`,`font-face-src`,`font-face-uri`,`foreignobject`,`hatch`,`hatchpath`,`mesh`,`meshgradient`,`meshpatch`,`meshrow`,`missing-glyph`,`script`,`set`,`solidcolor`,`unknown`,`use`]),he=d(`math.menclose.merror.mfenced.mfrac.mglyph.mi.mlabeledtr.mmultiscripts.mn.mo.mover.mpadded.mphantom.mroot.mrow.ms.mspace.msqrt.mstyle.msub.msup.msubsup.mtable.mtd.mtext.mtr.munder.munderover.mprescripts`.split(`.`)),ge=d([`maction`,`maligngroup`,`malignmark`,`mlongdiv`,`mscarries`,`mscarry`,`msgroup`,`mstack`,`msline`,`msrow`,`semantics`,`annotation`,`annotation-xml`,`mprescripts`,`none`]),_e=d([`#text`]),ve=d(`accept.action.align.alt.autocapitalize.autocomplete.autopictureinpicture.autoplay.background.bgcolor.border.capture.cellpadding.cellspacing.checked.cite.class.clear.color.cols.colspan.controls.controlslist.coords.crossorigin.datetime.decoding.default.dir.disabled.disablepictureinpicture.disableremoteplayback.download.draggable.enctype.enterkeyhint.exportparts.face.for.headers.height.hidden.high.href.hreflang.id.inert.inputmode.integrity.ismap.kind.label.lang.list.loading.loop.low.max.maxlength.media.method.min.minlength.multiple.muted.name.nonce.noshade.novalidate.nowrap.open.optimum.part.pattern.placeholder.playsinline.popover.popovertarget.popovertargetaction.poster.preload.pubdate.radiogroup.readonly.rel.required.rev.reversed.role.rows.rowspan.spellcheck.scope.selected.shape.size.sizes.slot.span.srclang.start.src.srcset.step.style.summary.tabindex.title.translate.type.usemap.valign.value.width.wrap.xmlns`.split(`.`)),ye=d(`accent-height.accumulate.additive.alignment-baseline.amplitude.ascent.attributename.attributetype.azimuth.basefrequency.baseline-shift.begin.bias.by.class.clip.clippathunits.clip-path.clip-rule.color.color-interpolation.color-interpolation-filters.color-profile.color-rendering.cx.cy.d.dx.dy.diffuseconstant.direction.display.divisor.dur.edgemode.elevation.end.exponent.fill.fill-opacity.fill-rule.filter.filterunits.flood-color.flood-opacity.font-family.font-size.font-size-adjust.font-stretch.font-style.font-variant.font-weight.fx.fy.g1.g2.glyph-name.glyphref.gradientunits.gradienttransform.height.href.id.image-rendering.in.in2.intercept.k.k1.k2.k3.k4.kerning.keypoints.keysplines.keytimes.lang.lengthadjust.letter-spacing.kernelmatrix.kernelunitlength.lighting-color.local.marker-end.marker-mid.marker-start.markerheight.markerunits.markerwidth.maskcontentunits.maskunits.max.mask.mask-type.media.method.mode.min.name.numoctaves.offset.operator.opacity.order.orient.orientation.origin.overflow.paint-order.path.pathlength.patterncontentunits.patterntransform.patternunits.points.preservealpha.preserveaspectratio.primitiveunits.r.rx.ry.radius.refx.refy.repeatcount.repeatdur.restart.result.rotate.scale.seed.shape-rendering.slope.specularconstant.specularexponent.spreadmethod.startoffset.stddeviation.stitchtiles.stop-color.stop-opacity.stroke-dasharray.stroke-dashoffset.stroke-linecap.stroke-linejoin.stroke-miterlimit.stroke-opacity.stroke.stroke-width.style.surfacescale.systemlanguage.tabindex.tablevalues.targetx.targety.transform.transform-origin.text-anchor.text-decoration.text-rendering.textlength.type.u1.u2.unicode.values.viewbox.visibility.version.vert-adv-y.vert-origin-x.vert-origin-y.width.word-spacing.wrap.writing-mode.xchannelselector.ychannelselector.x.x1.x2.xmlns.y.y1.y2.z.zoomandpan`.split(`.`)),be=d(`accent.accentunder.align.bevelled.close.columnalign.columnlines.columnspacing.columnspan.denomalign.depth.dir.display.displaystyle.encoding.fence.frame.height.href.id.largeop.length.linethickness.lquote.lspace.mathbackground.mathcolor.mathsize.mathvariant.maxsize.minsize.movablelimits.notation.numalign.open.rowalign.rowlines.rowspacing.rowspan.rspace.rquote.scriptlevel.scriptminsize.scriptsizemultiplier.selection.separator.separators.stretchy.subscriptshift.supscriptshift.symmetric.voffset.width.xmlns`.split(`.`)),xe=d([`xlink:href`,`xml:id`,`xlink:title`,`xml:space`,`xmlns:xlink`]),Se=f(/{{[\w\W]*|^[\w\W]*}}/g),Ce=f(/<%[\w\W]*|^[\w\W]*%>/g),we=f(/\${[\w\W]*/g),Te=f(/^data-[\-\w.\u00B7-\uFFFF]+$/),P=f(/^aria-[\-\w]+$/),Ee=f(/^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp|matrix):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i),De=f(/^(?:\w+script|data):/i),Oe=f(/[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g),ke=f(/^html$/i),Ae=f(/^[a-z][.\w]*(-[.\w]+)+$/i),je={element:1,text:3,progressingInstruction:7,comment:8,document:9},Me=function(){return typeof window>`u`?null:window},Ne=function(e,t){if(typeof e!=`object`||typeof e.createPolicy!=`function`)return null;let n=null,r=`data-tt-policy-suffix`;t&&t.hasAttribute(r)&&(n=t.getAttribute(r));let i=`dompurify`+(n?`#`+n:``);try{return e.createPolicy(i,{createHTML(e){return e},createScriptURL(e){return e}})}catch{return console.warn(`TrustedTypes policy `+i+` could not be created.`),null}},Pe=function(){return{afterSanitizeAttributes:[],afterSanitizeElements:[],afterSanitizeShadowDOM:[],beforeSanitizeAttributes:[],beforeSanitizeElements:[],beforeSanitizeShadowDOM:[],uponSanitizeAttribute:[],uponSanitizeElement:[],uponSanitizeShadowNode:[]}};function Fe(){let e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:Me(),t=e=>Fe(e);if(t.version=`3.4.3`,t.removed=[],!e||!e.document||e.document.nodeType!==je.document||!e.Element)return t.isSupported=!1,t;let n=e.document,r=n,i=r.currentScript,a=e.DocumentFragment,s=e.HTMLTemplateElement,c=e.Node,l=e.Element,u=e.NodeFilter,f=e.NamedNodeMap,m=f===void 0?e.NamedNodeMap||e.MozNamedAttrMap:f,h=e.HTMLFormElement,g=e.DOMParser,ie=e.trustedTypes,ae=l.prototype,oe=j(ae,`cloneNode`),se=j(ae,`remove`),ce=j(ae,`nextSibling`),D=j(ae,`childNodes`),ue=j(ae,`parentNode`);if(typeof s==`function`){let e=n.createElement(`template`);e.content&&e.content.ownerDocument&&(n=e.content.ownerDocument)}let k,Ie=``,Le=n,Re=Le.implementation,ze=Le.createNodeIterator,Be=Le.createDocumentFragment,Ve=Le.getElementsByTagName,He=r.importNode,Ue=Pe();t.isSupported=typeof o==`function`&&typeof ue==`function`&&Re&&Re.createHTMLDocument!==void 0;let We=Se,Ge=Ce,Ke=we,qe=Te,Je=P,Ye=De,Xe=Oe,Ze=Ae,Qe=Ee,$e=null,et=O({},[...M,...pe,...N,...he,..._e]),tt=null,nt=O({},[...ve,...ye,...be,...xe]),rt=Object.seal(p(null,{tagNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},allowCustomizedBuiltInElements:{writable:!0,configurable:!1,enumerable:!0,value:!1}})),it=null,at=null,ot=Object.seal(p(null,{tagCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeCheck:{writable:!0,configurable:!1,enumerable:!0,value:null}})),st=!0,ct=!0,lt=!1,ut=!0,dt=!1,ft=!0,pt=!1,mt=!1,ht=!1,gt=!1,_t=!1,vt=!1,yt=!0,bt=!1,xt=`user-content-`,St=!0,Ct=!1,wt={},Tt=null,Et=O({},[`annotation-xml`,`audio`,`colgroup`,`desc`,`foreignobject`,`head`,`iframe`,`math`,`mi`,`mn`,`mo`,`ms`,`mtext`,`noembed`,`noframes`,`noscript`,`plaintext`,`script`,`style`,`svg`,`template`,`thead`,`title`,`video`,`xmp`]),Dt=null,Ot=O({},[`audio`,`video`,`img`,`source`,`image`,`track`]),kt=null,At=O({},[`alt`,`class`,`for`,`id`,`label`,`name`,`pattern`,`placeholder`,`role`,`summary`,`title`,`value`,`style`,`xmlns`]),jt=`http://www.w3.org/1998/Math/MathML`,Mt=`http://www.w3.org/2000/svg`,Nt=`http://www.w3.org/1999/xhtml`,Pt=Nt,Ft=!1,It=null,Lt=O({},[jt,Mt,Nt],w),Rt=O({},[`mi`,`mo`,`mn`,`ms`,`mtext`]),zt=O({},[`annotation-xml`]),Bt=O({},[`title`,`style`,`font`,`a`,`script`]),Vt=null,Ht=[`application/xhtml+xml`,`text/html`],Ut=null,Wt=null,Gt=n.createElement(`form`),Kt=function(e){return e instanceof RegExp||e instanceof Function},qt=function(){let e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};if(Wt&&Wt===e)return;(!e||typeof e!=`object`)&&(e={}),e=de(e),Vt=Ht.indexOf(e.PARSER_MEDIA_TYPE)===-1?`text/html`:e.PARSER_MEDIA_TYPE,Ut=Vt===`application/xhtml+xml`?w:C,$e=T(e,`ALLOWED_TAGS`)&&S(e.ALLOWED_TAGS)?O({},e.ALLOWED_TAGS,Ut):et,tt=T(e,`ALLOWED_ATTR`)&&S(e.ALLOWED_ATTR)?O({},e.ALLOWED_ATTR,Ut):nt,It=T(e,`ALLOWED_NAMESPACES`)&&S(e.ALLOWED_NAMESPACES)?O({},e.ALLOWED_NAMESPACES,w):Lt,kt=T(e,`ADD_URI_SAFE_ATTR`)&&S(e.ADD_URI_SAFE_ATTR)?O(de(At),e.ADD_URI_SAFE_ATTR,Ut):At,Dt=T(e,`ADD_DATA_URI_TAGS`)&&S(e.ADD_DATA_URI_TAGS)?O(de(Ot),e.ADD_DATA_URI_TAGS,Ut):Ot,Tt=T(e,`FORBID_CONTENTS`)&&S(e.FORBID_CONTENTS)?O({},e.FORBID_CONTENTS,Ut):Et,it=T(e,`FORBID_TAGS`)&&S(e.FORBID_TAGS)?O({},e.FORBID_TAGS,Ut):de({}),at=T(e,`FORBID_ATTR`)&&S(e.FORBID_ATTR)?O({},e.FORBID_ATTR,Ut):de({}),wt=T(e,`USE_PROFILES`)?e.USE_PROFILES&&typeof e.USE_PROFILES==`object`?de(e.USE_PROFILES):e.USE_PROFILES:!1,st=e.ALLOW_ARIA_ATTR!==!1,ct=e.ALLOW_DATA_ATTR!==!1,lt=e.ALLOW_UNKNOWN_PROTOCOLS||!1,ut=e.ALLOW_SELF_CLOSE_IN_ATTR!==!1,dt=e.SAFE_FOR_TEMPLATES||!1,ft=e.SAFE_FOR_XML!==!1,pt=e.WHOLE_DOCUMENT||!1,gt=e.RETURN_DOM||!1,_t=e.RETURN_DOM_FRAGMENT||!1,vt=e.RETURN_TRUSTED_TYPE||!1,ht=e.FORCE_BODY||!1,yt=e.SANITIZE_DOM!==!1,bt=e.SANITIZE_NAMED_PROPS||!1,St=e.KEEP_CONTENT!==!1,Ct=e.IN_PLACE||!1,Qe=fe(e.ALLOWED_URI_REGEXP)?e.ALLOWED_URI_REGEXP:Ee,Pt=typeof e.NAMESPACE==`string`?e.NAMESPACE:Nt,Rt=T(e,`MATHML_TEXT_INTEGRATION_POINTS`)&&e.MATHML_TEXT_INTEGRATION_POINTS&&typeof e.MATHML_TEXT_INTEGRATION_POINTS==`object`?de(e.MATHML_TEXT_INTEGRATION_POINTS):O({},[`mi`,`mo`,`mn`,`ms`,`mtext`]),zt=T(e,`HTML_INTEGRATION_POINTS`)&&e.HTML_INTEGRATION_POINTS&&typeof e.HTML_INTEGRATION_POINTS==`object`?de(e.HTML_INTEGRATION_POINTS):O({},[`annotation-xml`]);let t=T(e,`CUSTOM_ELEMENT_HANDLING`)&&e.CUSTOM_ELEMENT_HANDLING&&typeof e.CUSTOM_ELEMENT_HANDLING==`object`?de(e.CUSTOM_ELEMENT_HANDLING):p(null);if(rt=p(null),T(t,`tagNameCheck`)&&Kt(t.tagNameCheck)&&(rt.tagNameCheck=t.tagNameCheck),T(t,`attributeNameCheck`)&&Kt(t.attributeNameCheck)&&(rt.attributeNameCheck=t.attributeNameCheck),T(t,`allowCustomizedBuiltInElements`)&&typeof t.allowCustomizedBuiltInElements==`boolean`&&(rt.allowCustomizedBuiltInElements=t.allowCustomizedBuiltInElements),dt&&(ct=!1),_t&&(gt=!0),wt&&($e=O({},_e),tt=p(null),wt.html===!0&&(O($e,M),O(tt,ve)),wt.svg===!0&&(O($e,pe),O(tt,ye),O(tt,xe)),wt.svgFilters===!0&&(O($e,N),O(tt,ye),O(tt,xe)),wt.mathMl===!0&&(O($e,he),O(tt,be),O(tt,xe))),ot.tagCheck=null,ot.attributeCheck=null,T(e,`ADD_TAGS`)&&(typeof e.ADD_TAGS==`function`?ot.tagCheck=e.ADD_TAGS:S(e.ADD_TAGS)&&($e===et&&($e=de($e)),O($e,e.ADD_TAGS,Ut))),T(e,`ADD_ATTR`)&&(typeof e.ADD_ATTR==`function`?ot.attributeCheck=e.ADD_ATTR:S(e.ADD_ATTR)&&(tt===nt&&(tt=de(tt)),O(tt,e.ADD_ATTR,Ut))),T(e,`ADD_URI_SAFE_ATTR`)&&S(e.ADD_URI_SAFE_ATTR)&&O(kt,e.ADD_URI_SAFE_ATTR,Ut),T(e,`FORBID_CONTENTS`)&&S(e.FORBID_CONTENTS)&&(Tt===Et&&(Tt=de(Tt)),O(Tt,e.FORBID_CONTENTS,Ut)),T(e,`ADD_FORBID_CONTENTS`)&&S(e.ADD_FORBID_CONTENTS)&&(Tt===Et&&(Tt=de(Tt)),O(Tt,e.ADD_FORBID_CONTENTS,Ut)),St&&($e[`#text`]=!0),pt&&O($e,[`html`,`head`,`body`]),$e.table&&(O($e,[`tbody`]),delete it.tbody),e.TRUSTED_TYPES_POLICY){if(typeof e.TRUSTED_TYPES_POLICY.createHTML!=`function`)throw le(`TRUSTED_TYPES_POLICY configuration option must provide a "createHTML" hook.`);if(typeof e.TRUSTED_TYPES_POLICY.createScriptURL!=`function`)throw le(`TRUSTED_TYPES_POLICY configuration option must provide a "createScriptURL" hook.`);k=e.TRUSTED_TYPES_POLICY,Ie=k.createHTML(``)}else k===void 0&&(k=Ne(ie,i)),k!==null&&typeof Ie==`string`&&(Ie=k.createHTML(``));d&&d(e),Wt=e},Jt=O({},[...pe,...N,...me]),Yt=O({},[...he,...ge]),Xt=function(e){let t=ue(e);(!t||!t.tagName)&&(t={namespaceURI:Pt,tagName:`template`});let n=C(e.tagName),r=C(t.tagName);return It[e.namespaceURI]?e.namespaceURI===Mt?t.namespaceURI===Nt?n===`svg`:t.namespaceURI===jt?n===`svg`&&(r===`annotation-xml`||Rt[r]):!!Jt[n]:e.namespaceURI===jt?t.namespaceURI===Nt?n===`math`:t.namespaceURI===Mt?n===`math`&&zt[r]:!!Yt[n]:e.namespaceURI===Nt?t.namespaceURI===Mt&&!zt[r]||t.namespaceURI===jt&&!Rt[r]?!1:!Yt[n]&&(Bt[n]||!Jt[n]):!!(Vt===`application/xhtml+xml`&&It[e.namespaceURI]):!1},Zt=function(e){b(t.removed,{element:e});try{ue(e).removeChild(e)}catch{se(e)}},Qt=function(e,n){try{b(t.removed,{attribute:n.getAttributeNode(e),from:n})}catch{b(t.removed,{attribute:null,from:n})}if(n.removeAttribute(e),e===`is`){if(gt||_t)try{Zt(n)}catch{}else try{n.setAttribute(e,``)}catch{}}},$t=function(e){let t=null,r=null;if(ht)e=`<remove></remove>`+e;else{let t=ee(e,/^[\r\n\t ]+/);r=t&&t[0]}Vt===`application/xhtml+xml`&&Pt===Nt&&(e=`<html xmlns="http://www.w3.org/1999/xhtml"><head></head><body>`+e+`</body></html>`);let i=k?k.createHTML(e):e;if(Pt===Nt)try{t=new g().parseFromString(i,Vt)}catch{}if(!t||!t.documentElement){t=Re.createDocument(Pt,`template`,null);try{t.documentElement.innerHTML=Ft?Ie:i}catch{}}let a=t.body||t.documentElement;return e&&r&&a.insertBefore(n.createTextNode(r),a.childNodes[0]||null),Pt===Nt?Ve.call(t,pt?`html`:`body`)[0]:pt?t.documentElement:a},en=function(e){return ze.call(e.ownerDocument||e,e,u.SHOW_ELEMENT|u.SHOW_COMMENT|u.SHOW_TEXT|u.SHOW_PROCESSING_INSTRUCTION|u.SHOW_CDATA_SECTION,null)},tn=function(e){return e instanceof h&&(typeof e.nodeName!=`string`||typeof e.textContent!=`string`||typeof e.removeChild!=`function`||!(e.attributes instanceof m)||typeof e.removeAttribute!=`function`||typeof e.setAttribute!=`function`||typeof e.namespaceURI!=`string`||typeof e.insertBefore!=`function`||typeof e.hasChildNodes!=`function`)},nn=function(e){return typeof c==`function`&&e instanceof c};function rn(e,n,r){_(e,e=>{e.call(t,n,r,Wt)})}let an=function(e){let n=null;if(rn(Ue.beforeSanitizeElements,e,null),tn(e))return Zt(e),!0;let r=Ut(e.nodeName);if(rn(Ue.uponSanitizeElement,e,{tagName:r,allowedTags:$e}),ft&&e.hasChildNodes()&&!nn(e.firstElementChild)&&E(/<[/\w!]/g,e.innerHTML)&&E(/<[/\w!]/g,e.textContent)||ft&&e.namespaceURI===Nt&&r===`style`&&nn(e.firstElementChild)||e.nodeType===je.progressingInstruction||ft&&e.nodeType===je.comment&&E(/<[/\w]/g,e.data))return Zt(e),!0;if(it[r]||!(ot.tagCheck instanceof Function&&ot.tagCheck(r))&&!$e[r]){if(!it[r]&&cn(r)&&(rt.tagNameCheck instanceof RegExp&&E(rt.tagNameCheck,r)||rt.tagNameCheck instanceof Function&&rt.tagNameCheck(r)))return!1;if(St&&!Tt[r]){let t=ue(e)||e.parentNode,n=D(e)||e.childNodes;if(n&&t){let r=n.length;for(let i=r-1;i>=0;--i){let r=oe(n[i],!0);t.insertBefore(r,ce(e))}}}return Zt(e),!0}return e instanceof l&&!Xt(e)||(r===`noscript`||r===`noembed`||r===`noframes`)&&E(/<\/no(script|embed|frames)/i,e.innerHTML)?(Zt(e),!0):(dt&&e.nodeType===je.text&&(n=e.textContent,_([We,Ge,Ke],e=>{n=te(n,e,` `)}),e.textContent!==n&&(b(t.removed,{element:e.cloneNode()}),e.textContent=n)),rn(Ue.afterSanitizeElements,e,null),!1)},on=function(e,t,r){if(at[t]||yt&&(t===`id`||t===`name`)&&(r in n||r in Gt))return!1;let i=tt[t]||ot.attributeCheck instanceof Function&&ot.attributeCheck(t,e);if(!(ct&&!at[t]&&E(qe,t))&&!(st&&E(Je,t))){if(!i||at[t]){if(!(cn(e)&&(rt.tagNameCheck instanceof RegExp&&E(rt.tagNameCheck,e)||rt.tagNameCheck instanceof Function&&rt.tagNameCheck(e))&&(rt.attributeNameCheck instanceof RegExp&&E(rt.attributeNameCheck,t)||rt.attributeNameCheck instanceof Function&&rt.attributeNameCheck(t,e))||t===`is`&&rt.allowCustomizedBuiltInElements&&(rt.tagNameCheck instanceof RegExp&&E(rt.tagNameCheck,r)||rt.tagNameCheck instanceof Function&&rt.tagNameCheck(r))))return!1}else if(!kt[t]&&!E(Qe,te(r,Xe,``))&&!((t===`src`||t===`xlink:href`||t===`href`)&&e!==`script`&&ne(r,`data:`)===0&&Dt[e])&&!(lt&&!E(Ye,te(r,Xe,``)))&&r)return!1}return!0},sn=O({},[`annotation-xml`,`color-profile`,`font-face`,`font-face-format`,`font-face-name`,`font-face-src`,`font-face-uri`,`missing-glyph`]),cn=function(e){return!sn[C(e)]&&E(Ze,e)},ln=function(e){rn(Ue.beforeSanitizeAttributes,e,null);let n=e.attributes;if(!n||tn(e))return;let r={attrName:``,attrValue:``,keepAttr:!0,allowedAttributes:tt,forceKeepAttr:void 0},i=n.length;for(;i--;){let a=n[i],o=a.name,s=a.namespaceURI,c=a.value,l=Ut(o),u=c,d=o===`value`?u:re(u);if(r.attrName=l,r.attrValue=d,r.keepAttr=!0,r.forceKeepAttr=void 0,rn(Ue.uponSanitizeAttribute,e,r),d=r.attrValue,bt&&(l===`id`||l===`name`)&&ne(d,xt)!==0&&(Qt(o,e),d=xt+d),ft&&E(/((--!?|])>)|<\/(style|script|title|xmp|textarea|noscript|iframe|noembed|noframes)/i,d)){Qt(o,e);continue}if(l===`attributename`&&ee(d,`href`)){Qt(o,e);continue}if(r.forceKeepAttr)continue;if(!r.keepAttr){Qt(o,e);continue}if(!ut&&E(/\/>/i,d)){Qt(o,e);continue}dt&&_([We,Ge,Ke],e=>{d=te(d,e,` `)});let f=Ut(e.nodeName);if(!on(f,l,d)){Qt(o,e);continue}if(k&&typeof ie==`object`&&typeof ie.getAttributeType==`function`&&!s)switch(ie.getAttributeType(f,l)){case`TrustedHTML`:d=k.createHTML(d);break;case`TrustedScriptURL`:d=k.createScriptURL(d)}if(d!==u)try{s?e.setAttributeNS(s,o,d):e.setAttribute(o,d),tn(e)?Zt(e):y(t.removed)}catch{Qt(o,e)}}rn(Ue.afterSanitizeAttributes,e,null)},un=function(e){let t=null,n=en(e);for(rn(Ue.beforeSanitizeShadowDOM,e,null);t=n.nextNode();)rn(Ue.uponSanitizeShadowNode,t,null),an(t),ln(t),t.content instanceof a&&un(t.content);rn(Ue.afterSanitizeShadowDOM,e,null)},dn=function(e){if(e.nodeType===je.element&&e.shadowRoot instanceof a){let t=e.shadowRoot;dn(t),un(t)}let t=e.childNodes;if(!t)return;let n=[];_(t,e=>{b(n,e)});for(let e of n)dn(e)};return t.sanitize=function(e){let n=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},i=null,o=null,s=null,l=null;if(Ft=!e,Ft&&(e=`<!-->`),typeof e!=`string`&&!nn(e)&&(e=A(e),typeof e!=`string`))throw le(`dirty is not a string, aborting`);if(!t.isSupported)return e;if(mt||qt(n),t.removed=[],typeof e==`string`&&(Ct=!1),Ct){let t=e.nodeName;if(typeof t==`string`){let e=Ut(t);if(!$e[e]||it[e])throw le(`root node is forbidden and cannot be sanitized in-place`)}dn(e)}else if(e instanceof c)i=$t(`<!---->`),o=i.ownerDocument.importNode(e,!0),o.nodeType===je.element&&o.nodeName===`BODY`||o.nodeName===`HTML`?i=o:i.appendChild(o),dn(o);else{if(!gt&&!dt&&!pt&&e.indexOf(`<`)===-1)return k&&vt?k.createHTML(e):e;if(i=$t(e),!i)return gt?null:vt?Ie:``}i&&ht&&Zt(i.firstChild);let u=en(Ct?e:i);for(;s=u.nextNode();)an(s),ln(s),s.content instanceof a&&un(s.content);if(Ct)return e;if(gt){if(dt){i.normalize();let e=i.innerHTML;_([We,Ge,Ke],t=>{e=te(e,t,` `)}),i.innerHTML=e}if(_t)for(l=Be.call(i.ownerDocument);i.firstChild;)l.appendChild(i.firstChild);else l=i;return(tt.shadowroot||tt.shadowrootmode)&&(l=He.call(r,l,!0)),l}let d=pt?i.outerHTML:i.innerHTML;return pt&&$e[`!doctype`]&&i.ownerDocument&&i.ownerDocument.doctype&&i.ownerDocument.doctype.name&&E(ke,i.ownerDocument.doctype.name)&&(d=`<!DOCTYPE `+i.ownerDocument.doctype.name+`>
`+d),dt&&_([We,Ge,Ke],e=>{d=te(d,e,` `)}),k&&vt?k.createHTML(d):d},t.setConfig=function(){let e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};qt(e),mt=!0},t.clearConfig=function(){Wt=null,mt=!1},t.isValidAttribute=function(e,t,n){Wt||qt({});let r=Ut(e),i=Ut(t);return on(r,i,n)},t.addHook=function(e,t){typeof t==`function`&&b(Ue[e],t)},t.removeHook=function(e,t){if(t!==void 0){let n=v(Ue[e],t);return n===-1?void 0:x(Ue[e],n,1)[0]}return y(Ue[e])},t.removeHooks=function(e){Ue[e]=[]},t.removeAllHooks=function(){Ue=Pe()},t}return Fe()}))});var Eo;F.div(Eo||=cr([`
  .skeleton {
    background: var(--gray-25);
    position: relative;
    overflow: hidden;
    border-radius: 4px;
    animation: pulse 1.5s infinite ease-in-out;

    &-circle {
      border-radius: 50%;
    }

    &.skeleton-text {
      height: 16px;
    }

    @keyframes pulse {
      0% {
        background-color: var(--gray-25);
      }
      50% {
        background-color: var(--gray-35);
      }
      100% {
        background-color: var(--gray-50);
      }
    }
  }
`]));var Do;F.div(Do||=cr([`
  .tag {
    display: inline-flex;
    align-items: center;
    padding: 6px 12px;
    border-radius: var(--grid-borderradius-border-radius-sm);
    font-size: 14px;
    cursor: pointer;
    user-select: none;
    transition: background-color 0.2s ease;
    &.primary {
      color: var(--primary);
      background-color: var(--success-bg-light);
    }
    &.secondary {
      color: var(--secondary-text);
      background-color: var(--secondary-bg-light);
    }
    &.danger {
      color: var(--danger);
      background-color: var(--danger-bg-light);
    }
    &.warning {
      color: var(--warning);
      background-color: var(--warning-bg-light);
    }
    &.info {
      color: var(--info);
      background-color: var(--info-bg-light);
    }

    &--normal {
      font-size: 12px;
      padding: 8px 4px;
    }

    &--small {
      font-size: 8px;
      padding: 4px;
    }

    &__icon {
      margin: 0 4px;
      display: flex;
      align-items: center;
    }

    &__text {
      display: inline-block;
    }
  }
`]));var Oo;F.div(Oo||=cr([`
  .tooltip {
    position: relative;
    display: inline-block;

    &__target {
      display: inline-block;
      cursor: pointer;
    }

    &__content {
      position: absolute;
      background-color: var(--tooltip-bg);
      color: var(--tooltip-fg);
      padding: 8px;
      border-radius: 8px;
      font-size: 14px;
      white-space: nowrap;
      z-index: 10;
      visibility: hidden;
      opacity: 0;
      transition: opacity 0.2s ease, visibility 0s ease 0.2s;

       &::after {
        content: '';
        position: absolute;
        border-style: solid;
        border-width: 6px;
      }

      &--top {
        bottom: 100%;
        left: 50%;
        transform: translateX(-50%);
        margin-bottom: 8px;
        &::after {
          top: 100%;
          left: 50%;
          transform: translateX(-50%);
          border-color: var(--tooltip-bg); transparent transparent transparent;
        }
      }

      &--bottom {
        top: 100%;
        left: 50%;
        transform: translateX(-50%);
        margin-top: 8px;
        &::after {
          bottom: 100%;
          left: 50%;
          transform: translateX(-50%);
          border-color: transparent transparent var(--tooltip-bg); transparent;
        }
      }

      &--left {
        top: 50%;
        right: 100%;
        transform: translateY(-50%);
        margin-right: 8px;
        &::after {
          right: -12px;
          top: 50%;
          transform: translateY(-50%);
          border-color: transparent transparent transparent var(--tooltip-bg);;
        }
      }

      &--right {
        top: 50%;
        left: 100%;
        transform: translateY(-50%);
        margin-left: 8px;
        &::after {
          left: -12px;
          top: 50%;
          transform: translateY(-50%);
          border-color: transparent var(--tooltip-bg); transparent transparent;
        }
      }

      &.tooltip__overlay_content {
        visibility: visible;
        opacity: 1;
        transition: opacity 0.2s ease, visibility 0s ease 0s;
      }
    }
  }
`]));var ko;F.div(ko||=cr([`
  display: flex;
  align-items: center;
  width: 100%;
  overflow: hidden;
  flex-direction: column;

  .carousel-wrapper {
    display: flex;
    // justify-content: center;
    overflow: auto;
    scroll-snap-type: x mandatory;
    scroll-behavior: smooth;
    -webkit-overflow-scrolling: touch;
    gap: 16px;
    width: 100%;
    white-space: nowrap;

    /* Fix for small screen widths */
    @media (max-width: 600px) {
      gap: 8px; /* Reduce gap for mobile */
    }
  }

  .carousel-wrapper.show-scrollbar {
    scrollbar-width: thin;
    scrollbar-color: #888 transparent;
  }

  .carousel-wrapper.show-scrollbar::-webkit-scrollbar {
    height: 6px;
    width: 6px;
  }

  .carousel-wrapper.show-scrollbar::-webkit-scrollbar-track {
    background: transparent;
  }

  .carousel-wrapper.show-scrollbar::-webkit-scrollbar-thumb {
    background: #888;
    border-radius: 3px;
  }

  .carousel-wrapper.show-scrollbar::-webkit-scrollbar-thumb:hover {
    background: #555;
  }

  .carousel-wrapper.hide-scrollbar {
    scrollbar-width: none;
  }

  .carousel-wrapper.hide-scrollbar::-webkit-scrollbar {
    display: none;
  }

  .carousel.vertical .carousel-wrapper {
    flex-direction: column;
    scroll-snap-type: y mandatory;
  }

  .carousel-item {
    flex: 0 0 auto;
    scroll-snap-align: start;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 8px;
    background-color: var(--card-bg);
    color: var(--body-color);
  }

  .carousel-nav-left-btn,
  .carousel-nav-right-btn {
    cursor: pointer;
    padding: 4px 8px;
    margin: 0 4px;
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    z-index: 1;
    top: 50%;
    transform: translateY(-50%);
  }

  .carousel-nav-left-btn {
    left: 0;
  }

  .carousel-nav-right-btn {
    right: 0;
  }

  .carousel-indicators {
    display: flex;
    justify-content: center;
    margin-top: 8px;
  }

  .indicator {
    width: 10px;
    height: 10px;
    margin: 0 4px;
    border-radius: 50%;
    background: #ccc;
    transition: background 0.3s;
  }

  .carousel.horizontal .carousel-indicators {
    margin-top: 8px;
  }

  .carousel.vertical .carousel-indicators {
    display: none;
  }

  .indicator.active {
    background: #333;
  }
`]));var Ao,jo;F.div(Ao||=cr([`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  padding: 8px;
`])),F.div(jo||=cr([`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 8px 12px;
  border-radius: 16px;
  cursor: pointer;
  font-size: 14px;
  background-color: `,`;
  color: `,`;
  &.border-radius-0 {
    border-radius: var(--values-value-0);
  }
  &.border-radius-2 {
    border-radius: var(--values-value-2);
  }
  &.border-radius-4 {
    border-radius: var(--values-value-4);
  }
  &.border-radius-8 {
    border-radius: var(--values-value-8);
  }
  &.border-radius-16 {
    border-radius: var(--values-value-16);
  }
  i {
    font-size: var(--values-value-12);
  }
  .chip__icon {
    display: flex;
    align-items: center;
    font-size: var(--values-value-12);
  }
`]),function(e){return e.selected?`var(--primary-500)`:`var(--secondary-bg-light)`},function(e){return e.selected?`var(--button-primary-text)`:`var(--secondary-text)`});var Mo;F.div(Mo||=cr([`
  .container{
    display:flex;
    align-items: center;
    gap: 8px;
  }

  .container input[type="radio" i] {
    margin: 0;
    appearance: none;
    width: 16px;
    height: 16px;
    border: 2px solid var(--secondary);
    border-radius: 50%;
    position: relative;
    cursor: pointer;
    transition: border-color 0.3s ease;
  }

   .container input[type="radio"]:checked {
    border-color: var(--primary);
  }

  .container input[type="radio"]::before {
    content: '';
    width: 10px;
    height: 10px;
    background-color: transparent;
    border-radius: 50%;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    transition: background-color 0.3s ease;
  }

  .container input[type="radio"]:checked::before {
    background-color: var(--primary);
  }

  .container input[type="radio"]:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }
`]));var No;F.i(No||=cr([``]));var Po;F.div(Po||=cr([`
  .select-field {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 4px;
    margin-bottom: 16px;

    .flex-auto {
      flex: 1 1 auto !important;
    }

    label {
      font-style: normal;
      font-weight: 500;
      font-size: 14px;
      line-height: 17px;
      letter-spacing: 0.15px;
      color: var(--text-dark);

      .required {
        color: var(--primary);
      }
    }

    select {
      flex-grow: 1;
      border-radius: var(--values-value-8); 
      font-size: 16px;
      color: var(--text-dark);
      padding: var(--values-value-10) var(--values-value-12);
      background: rgba(28, 37, 46, 0.03);
      transition: background-color 0.2s, color 0.2s, border-color 0.2s,
        box-shadow 0.2s;
      appearance: none;
      letter-spacing: 0.5px;
      line-height: 22px;
      outline-color: transparent;
      border: 1px solid var(--default-input-border);
      height: 48px;
      box-sizing: border-box;

      &:focus-visible {
        border: 1px solid var(--default-input-border);
        outline: 1px solid var(--primary);
      }

      ::placeholder {
        color: var(--input-placeholder);
        letter-spacing: 0.5px;
        font-weight: 500;
        opacity: 1;
      }

      ::-ms-input-placeholder {
        color: var(--input-placeholder);
        font-weight: 500;
        letter-spacing: 0.5px;
      }
    }

    .validationMessage {
      font-weight: 400;
      font-size: 12px;
      line-height: 15px;
      letter-spacing: 0.4px;
      color: var(--danger-text);
    }
  }
`]));var H={900:`#104B00`,800:`#219600`,700:`#25A800`,600:`#26AC00`,500:`#29BB00`,400:`#69CF4D`,300:`#74D359`,200:`#BFEBB3`,100:`#D4F1CC`,50:`#E7F8E3`},Fo={900:`#260C09`,800:`#601D15`,700:`#9A2E22`,600:`#AD3427`,500:`#C03A2B`,400:`#CD6155`,300:`#DF9C95`,200:`#ECC4BF`,100:`#F9EBEA`,50:`#FCF5F4`},Io={900:`#12314C`,800:`#246198`,700:`#3081CB`,600:`#3692E4`,500:`#3CA2FE`,400:`#63B5FE`,300:`#9DD0FE`,200:`#C5E3FF`,100:`#E6F3FF`,50:`#F5FAFF`},Lo={900:`#432602`,800:`#593303`,700:`#B26606`,600:`#C87206`,500:`#DE7F07`,400:`#E59939`,300:`#EEBF83`,200:`#F5D9B5`,100:`#FBEEDF`,50:`#FDF9F3`},U={900:`#080B0E`,800:`#141A20`,700:`#161E25`,600:`#192129`,500:`#1C252E`,400:`#2C343D`,300:`#333B43`,200:`#495158`,100:`#5E646B`,50:`#CFD1D3`,35:`#E8E9EA`,25:`#F8F8F8`},Ro={50:`#F7F8F9`,100:`#EEF0F2`,200:`#ABB5BF`,300:`#8897A5`,400:`#798999`,500:`#576C80`,600:`#4E6173`,700:`#465666`,800:`#3D4C5A`,900:`#34414D`},zo=`#fff`,Bo=`#FFCC05`,Vo={"bg-bottom":zo,"bg-top":H[500],"bg-tool":H[600],fg:zo},Ho={"body-bg":Io[50],"body-color":U[500]},Uo={primary:H[500],"primary-dark":H[800],"primary-bg-light":H[50],"primary-text":H[500],"primary-light-text":H[50],"primary-muted":H[200]},Wo={secondary:U[200],"secondary-bg-light":U[25],"secondary-border":U[200],"secondary-muted":U[25],"secondary-text":U[200],"secondary-text-light":zo},Go={info:Io[500],"info-bg-light":Io[100],"info-border":Io[500],"info-text":Io[500]},Ko={success:H[500],"success-bg-light":H[50],"success-border":H[500],"success-text":H[500]},qo={danger:Fo[500],"danger-bg-light":Fo[50],"danger-border":Fo[500],"danger-text":Fo[500]},Jo={warning:Lo[500],"warning-bg-light":Lo[50],"warning-border":Lo[500],"warning-text":Lo[500]},Yo={border:Ro[100],"default-input-border":U[25],"disabled-input-border":U[35]},Xo={"input-bg":`rgba(28, 37, 46, 0.03)`,"disabled-input-bg":`rgba(28, 37, 46, 0.03)`,"input-placeholder":U[50]},Zo={"icon-green":H[500],"icon-green-light":H[300],"icon-gray":U[100],"icon-bg":Io[50],"icon-muted":U[50],"icon-star-rating":Bo},Qo={"text-dark":U[500],"text-tertiary":Ro[500],"text-light":Ro[300],"text-muted":Ro[50]},$o={"card-bg":zo,"balance-bg":zo,"balance-bg-light-gray":U[25],"profile-balance-card-bg":H[500]},es={"surface-bg":zo},ts={"tooltip-bg":U[600],"tooltip-fg":zo},ns={"modal-backdrop-bg":`rgba(8, 11, 14, 0.4)`},rs={"button-muted-bg":U[25],"button-muted":U[50],"button-primary-text":zo,"button-white-bg":zo},is={"star-rating":Bo,"bar-active":H[500]},as={"body-bg":`rgba(0, 1, 0, 1)`,"body-color":Ro[200]},os={"bg-bottom":`rgba(15, 17, 20, 1)`,"bg-top":`rgba(15, 17, 20, 1)`,"bg-tool":`rgba(0, 1, 0, 1)`,fg:Ro[200]},ss={primary:H[700],"primary-dark":U[500],"primary-bg-light":U[400],"primary-text":H[700],"primary-light-text":U[50],"primary-muted":U[200]},cs={secondary:U[200],"secondary-bg-light":U[300],"secondary-border":U[25],"secondary-muted":U[200],"secondary-text":Ro[200],"secondary-text-light":zo},ls={info:Io[600],"info-bg-light":Io[900],"info-border":Io[600],"info-text":Io[600]},us={success:H[600],"success-bg-light":H[900],"success-border":H[600],"success-text":H[600]},ds={danger:Fo[600],"danger-bg-light":Fo[900],"danger-border":Fo[600],"danger-text":Fo[600]},fs={warning:Lo[600],"warning-bg-light":Lo[900],"warning-border":Lo[600],"warning-text":Lo[600]},ps={border:`rgba(40, 43, 49, 1)`,"default-input-border":`rgba(51, 60, 71, 1)`,"disabled-input-border":`rgba(35, 43, 52, 1)`},ms={"input-bg":`rgba(183, 220, 255, 0.06)`,"disabled-input-bg":`rgba(33, 37, 43, 0.06)`,"input-placeholder":`rgba(92, 108, 123, 1)`},hs={"icon-green":H[700],"icon-green-light":H[400],"icon-gray":Ro[200],"icon-bg":`rgba(62, 70, 80, 1)`,"icon-muted":Ro[200],"icon-star-rating":Bo},gs={"text-dark":Ro[200],"text-tertiary":Ro[200],"text-light":Ro[200],"text-muted":U[100]},_s={"profile-balance-card-bg":`rgba(31, 36, 43, 1)`,"balance-bg-light-gray":`rgba(0, 1, 0, 1)`,"balance-bg":`rgba(41, 46, 53, 1)`,"card-bg":`rgba(31, 36, 43, 1)`},vs={"surface-bg":`rgba(27, 36, 45, 1)`},ys={"tooltip-bg":`rgba(63, 71, 82, 1)`,"tooltip-fg":Ro[200]},bs={"modal-backdrop-bg":`rgba(8, 11, 14, 0.4)`},xs={"button-muted":U[100],"button-muted-bg":`transparent`,"button-primary-text":`rgba(238, 245, 235, 1)`,"button-white-bg":U[200]},Ss={"star-rating":Bo,"bar-active":Io[400]},Cs={primaryColor:Uo,appBarColor:Vo,bodyColor:Ho,border:Yo,secondaryColor:Wo,infoColor:Go,successColor:Ko,surfaceColor:es,danger:qo,warning:Jo,input:Xo,icon:Zo,textColor:Qo,cardColor:$o,tooltipColor:ts,modalBackDrop:ns,buttonColor:rs,miscellaneousColor:is},ws={primaryColor:ss,appBarColor:os,bodyColor:as,border:ps,secondaryColor:cs,infoColor:ls,successColor:us,surfaceColor:vs,danger:ds,warning:fs,input:ms,icon:hs,textColor:gs,cardColor:_s,tooltipColor:ys,modalBackDrop:bs,buttonColor:xs,miscellaneousColor:Ss},Ts={black:`#000`,white:`#fff`},Es={primary:H,gray:U,blue:Io,orange:Lo,bluegray:Ro},W={0:`0px`,2:`2px`,4:`4px`,6:`6px`,8:`8px`,10:`10px`,12:`12px`,14:`14px`,16:`16px`,20:`20px`,24:`24px`,28:`28px`,32:`32px`,34:`34px`,36:`36px`,40:`40px`,48:`48px`,56:`56px`,64:`64px`,72:`72px`},Ds={common:Ts,palette:Es,spacing:{"10xlg":W[72],"9xlg":W[64],"8xlg":W[56],"7xlg":W[48],"6xlg":W[40],"5xlg":W[36],"4xlg":W[32],"3xlg":W[28],"2xlg":W[24],xlg:W[20],lg:W[16],md:W[12],sm:W[8],xs:W[6],xxs:W[4],xxxs:W[2],none:W[0]},shadow:{"1--ambient--shadow":`0px 1px 3px rgba(0, 0, 0, 0.2)`,"1--umbra":`0px 0px 2px rgba(0, 0, 0, 0.14)`,"1--penumbra":`0px 2px 2px rgba(0, 0, 0, 0.12)`,"2--ambient--shadow":`0px 1px 5px rgba(0, 0, 0, 0.2)`,"2--umbra":`0px 0px 4px rgba(0, 0, 0, 0.14)`,"2--penumbra":`0px 3px 4px rgba(0, 0, 0, 0.12)`,"3--ambient--shadow":`0px 1px 8px rgba(0, 0, 0, 0.2)`,"3--umbra":`0px 3px 3px rgba(0, 0, 0, 0.14)`,"3--penumbra":`0px 3px 4px rgba(0, 0, 0, 0.12)`,"4--umbra":`0px 2px 4px rgba(0, 0, 0, 0.14)`,"4--penumbra":`0px 4px 5px rgba(0, 0, 0, 0.12)`,"4--ambient--shadow":`0px 1px 10px rgba(0, 0, 0, 0.2)`,"6--ambient--shadow":`0px 3px 5px rgba(0, 0, 0, 0.2)`,"6--umbra":`0px 6px 10px rgba(0, 0, 0, 0.14)`,"6--penumbra":`0px 1px 18px rgba(0, 0, 0, 0.12)`,"8--ambient--shadow":`0px 4px 15px rgba(0, 0, 0, 0.2)`,"8--penumbra":`0px 3px 14px rgba(0, 0, 0, 0.12)`,"8--umbra":`0px 8px 10px rgba(0, 0, 0, 0.14)`,"9--ambient--shadow":`0px 5px 6px rgba(0, 0, 0, 0.2)`,"9--umbra":`0px 9px 12px rgba(0, 0, 0, 0.14)`,"9--penumbra":`0px 3px 16px rgba(0, 0, 0, 0.12)`,"12--ambient--shadow":`0px 5px 6px rgba(0, 0, 0, 0.2)`,"12--umbra":`0px 12px 17px rgba(0, 0, 0, 0.14)`,"12--penumbra":`0px 5px 22px rgba(0, 0, 0, 0.12)`,"16--ambient--shadow":`0px 8px 10px rgba(0, 0, 0, 0.2)`,"16--umbra":`0px 16px 24px rgba(0, 0, 0, 0.14)`,"16--penumbra":`0px 6px 30px rgba(0, 0, 0, 0.12)`,"24--ambient--shadow":`0px 11px 15px rgba(0, 0, 0, 0.2)`,"24--umbra":`0px 24px 38px rgba(0, 0, 0, 0.14)`,"24--penumbra":`0px 9px 46px rgba(0, 0, 0, 0.12)`},fontSize:{h1:W[48],h2:W[34],h3:W[24],h4:W[20],h5:W[16],h6:W[14],"body-1":W[16],"body-1-body-2":W[14],button:W[14],label:W[12],caption:W[12],"sub--caption":W[10],overline:W[12],"overline-2":W[10],subcaption2:W[8]},borderRadius:{"2xlg":W[24],xlg:W[20],lg:W[16],md:W[12],sm:W[8],xs:W[6],xxs:W[4],none:W[0]}},Os=or({},Ds,Cs),ks=or({},Ds,ws),As=function(e){var t=e.children,n=(0,k.useState)(Os),r=n[0],i=n[1],a=(0,k.useState)(`light`)[1];return(0,k.useEffect)(function(){if(typeof window<`u`){var e=window.matchMedia(`(prefers-color-scheme: dark)`).matches,t=e?ks:Os,n=e?`dark`:`light`;i(t),a(n),document.documentElement.setAttribute(`data-theme`,n)}},[]),k.createElement(Zn,{theme:r},t)};(0,k.createContext)(void 0);var js=typeof navigator<`u`&&/wv|Flutter/i.test(navigator.userAgent),Ms=typeof navigator<`u`&&/Android/i.test(navigator.userAgent),Ns=typeof navigator<`u`&&/iPhone|iPad|iPod/i.test(navigator.userAgent),Ps=function(e){var t=sessionStorage.getItem(`token`);t&&(e=or({},e,{token:t})),Fs(JSON.stringify(e))},Fs=function(e){if(Ms){var t,n;(t=window)!=null&&t.Android&&(n=window)!=null&&n.Android.requestApp?window.Android.requestApp(e):console.warn(`Android interface not available`)}if(Ns){var r;(r=window.webkit)!=null&&r.messageHandlers.iOSNative?window.webkit.messageHandlers.iOSNative.postMessage(e):console.warn(`IOS interface not available`)}if(js){var i,a;(i=window)!=null&&i.flutter_inappwebview&&(a=window)!=null&&a.flutter_inappwebview.callHandler?window.flutter_inappwebview.callHandler(`eSewaHandler`,e):console.warn(`Flutter interface not available`)}},Is=function(e,t){var n=e.callbackKey;if(t&&!n)throw Error(`Callback key is missing in request data`);t&&(Ms?(window.Android=window.Android||{},window.Android[n]=t):Ns?(window.iOSNative=window.iOSNative||{},window.iOSNative[n]=t):js&&(window.flutter_inappwebview=window.flutter_inappwebview||{},window.flutter_inappwebview[n]=t)),Fs(JSON.stringify(e))},Ls;(function(e){e.INIT_APP=`INIT_APP`,e.REQUEST_PAYMENT=`REQUEST_PAYMENT`,e.USER_DETAIL_ACCESS=`USER_DETAIL_ACCESS`,e.MEDIA_ACCESS=`MEDIA_ACCESS`,e.LOCATION_ACCESS=`LOCATION_ACCESS`,e.VALIDATE_TRANSACTION=`VALIDATE_TRANSACTION`,e.CLOSE_APP=`CLOSE_APP`,e.FILE_DOWNLOAD_ACCESS=`FILE_DOWNLOAD_ACCESS`,e.GET_PRODUCT=`GET_PRODUCT`,e.VALIDATE_USER=`VALIDATE_USER`,e.MERCHANT_DETAIL=`MERCHANT_DETAIL`,e.QR_SCANNER_ACCESS=`QR_SCANNER_ACCESS`,e.PAYMENT_REQUEST=`PAYMENT_REQUEST`,e.CONNECTION_REQUEST=`CONNECTION_REQUEST`,e.CREDIT_ADDITION=`CREDIT_ADDITION`,e.PAYMENT_SETTLEMENT=`PAYMENT_SETTLEMENT`,e.DUE_DATE_REMINDER=`DUE_DATE_REMINDER`})(Ls||={});var Rs;(function(e){e.INIT_APP_CALLBACK=`INIT_APP_CALLBACK`,e.REQUEST_PAYMENT_CALLBACK=`REQUEST_PAYMENT_CALLBACK`,e.USER_DETAIL_ACCESS_CALLBACK=`USER_DETAIL_ACCESS_CALLBACK`,e.MEDIA_ACCESS_CALLBACK=`MEDIA_ACCESS_CALLBACK`,e.LOCATION_ACCESS_CALLBACK=`LOCATION_ACCESS_CALLBACK`,e.VALIDATE_TRANSACTION_CALLBACK=`VALIDATE_TRANSACTION_CALLBACK`,e.CLOSE_APP_CALLBACK=`CLOSE_APP_CALLBACK`,e.FILE_DOWNLOAD_ACCESS_CALLBACK=`FILE_DOWNLOAD_ACCESS_CALLBACK`,e.GET_PRODUCT_CALLBACK=`GET_PRODUCT_CALLBACK`,e.VALIDATE_USER_CALLBACK=`VALIDATE_USER_CALLBACK`,e.MERCHANT_DETAIL_CALLBACK=`MERCHANT_DETAIL_CALLBACK`,e.QR_SCANNER_ACCESS_CALLBACK=`QR_SCANNER_ACCESS_CALLBACK`,e.PAYMENT_REQUEST_CALLBACK=`PAYMENT_REQUEST_CALLBACK`,e.CONNECTION_REQUEST_CALLBACK=`CONNECTION_REQUEST_CALLBACK`,e.CREDIT_ADDITION_CALLBACK=`CREDIT_ADDITION_CALLBACK`,e.PAYMENT_SETTLEMENT_CALLBACK=`PAYMENT_SETTLEMENT_CALLBACK`,e.DUE_DATE_REMINDER_CALLBACK=`DUE_DATE_REMINDER_CALLBACK`})(Rs||={});var zs;F.div(zs||=cr([`
  .message-alert {
    position: fixed;
    bottom: 10%;
    left: 50%;
    transform: translateX(-50%);
    padding: 10px 20px;
    border-radius: 4px;
    color: var(--white);
    font-size: 14px;
    z-index: 1000;
    opacity: 0.9;
    transition: opacity 0.3s ease;
  }

  .message-success {
    background-color: var(--primary);
  }

  .message-error {
    background-color: var(--danger);
  }

  .message-info {
    background-color: var(--info);
  }

  .message-warning {
    background-color: var(--warning);
  }
`])),(function(){if(typeof window<`u`&&document&&!document.querySelector(`link[href*='Source+Sans+Pro']`)){var e=document.createElement(`link`);e.href=`https://fonts.googleapis.com/css2?family=Source+Sans+Pro:wght@300;400;600;700&display=swap`,e.rel=`stylesheet`,document.head.appendChild(e)}})();var G={900:`#104B00`,800:`#219600`,700:`#25A800`,600:`#26AC00`,500:`#29BB00`,400:`#69CF4D`,300:`#74D359`,200:`#BFEBB3`,100:`#D4F1CC`,50:`#E7F8E3`},K={900:`#080B0E`,800:`#141A20`,700:`#161E25`,600:`#192129`,500:`#1C252E`,400:`#2C343D`,300:`#333B43`,200:`#495158`,100:`#5E646B`,50:`#CFD1D3`,35:`#E8E9EA`,25:`#F8F8F8`},Bs={900:`#12314C`,800:`#246198`,700:`#3081CB`,600:`#3692E4`,500:`#3CA2FE`,400:`#63B5FE`,300:`#9DD0FE`,200:`#C5E3FF`,100:`#E6F3FF`,50:`#F5FAFF`},Vs={900:`#260C09`,800:`#601D15`,700:`#9A2E22`,600:`#AD3427`,500:`#C03A2B`,400:`#CD6155`,300:`#DF9C95`,200:`#ECC4BF`,100:`#F9EBEA`,50:`#FCF5F4`},Hs={900:`#432602`,800:`#593303`,700:`#B26606`,600:`#C87206`,500:`#DE7F07`,400:`#E59939`,300:`#EEBF83`,200:`#F5D9B5`,100:`#FBEEDF`,50:`#FDF9F3`},q={50:`#F7F8F9`,100:`#EEF0F2`,200:`#ABB5BF`,300:`#8897A5`,400:`#798999`,500:`#576C80`,600:`#4E6173`,700:`#465666`,800:`#3D4C5A`,900:`#34414D`},J=`#fff`;G[500],G[600],Bs[50],K[500],q[100],G[500],G[600],G[800],K[500],Bs[50],q[100];var Us=F.div`
  min-height: 100vh;
  background: ${Bs[50]}; /* body-bg */
  display: flex;
  align-items: flex-start;
  justify-content: center;
  padding: 24px 280px 24px 24px; /* right pad for drawer */
  box-sizing: border-box;
  @media (max-width: 1100px) {
    padding-right: 24px;
  }
`,Ws=F.div`
  width: 390px;
  min-height: 812px;
  max-height: 812px;
  background: ${J}; /* card-bg */
  border: 1px solid ${q[100]};
  border-radius: 32px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  box-shadow: 0 8px 30px rgba(28, 37, 46, 0.12), 0 4px 12px rgba(28, 37, 46, 0.08);
  position: relative;
`,Gs=F.div`
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 18px;
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.2px;
  background: ${e=>e.$green?G[500]:J};
  color: ${e=>e.$green?J:K[900]};
  border-bottom: 1px solid ${e=>e.$green?G[600]:q[100]};
  flex-shrink: 0;
  user-select: none;
`,Ks=F.span`
  font-variant-numeric: tabular-nums;
`,qs=F.span`
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 12px;
  opacity: 0.95;
`,Js=F.span`
  display: inline-flex;
  gap: 2px;
  align-items: flex-end;
  span {
    width: 3px;
    background: currentColor;
    border-radius: 1px;
    &:nth-child(1) { height: 4px; opacity: 0.8; }
    &:nth-child(2) { height: 7px; opacity: 0.9; }
    &:nth-child(3) { height: 10px; }
    &:nth-child(4) { height: 12px; }
  }
`,Ys=F.span`
  display: inline-flex;
  align-items: center;
  gap: 3px;
  i {
    width: 22px;
    height: 11px;
    border: 1px solid currentColor;
    border-radius: 3px;
    position: relative;
    display: inline-block;
    &::after {
      content: '';
      position: absolute;
      right: -3px;
      top: 3px;
      width: 2px;
      height: 4px;
      background: currentColor;
      border-radius: 0 1px 1px 0;
    }
    &::before {
      content: '';
      position: absolute;
      left: 1px;
      top: 1px;
      width: 14px;
      height: 7px;
      background: currentColor;
      border-radius: 1px;
      opacity: 0.9;
    }
  }
`,Xs=F.div`
  flex: 1;
  overflow-y: auto;
  overflow-x: hidden;
  background: ${Bs[50]};
  position: relative;
  /* hide scrollbar for phone feel but keep scroll */
  &::-webkit-scrollbar { width: 4px; }
  &::-webkit-scrollbar-thumb { background: ${q[200]}; border-radius: 4px; }
`,Zs=F.div`
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${J};
  border-top: 1px solid ${q[100]};
  flex-shrink: 0;
`,Qs=F.div`
  width: 134px;
  height: 5px;
  border-radius: 999px;
  background: ${K[900]};
  opacity: 0.9;
`,$s=F.div`
  height: 28px;
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 0 10px;
  background: ${K[25]}; /* #F8F8F8 */
  border-bottom: 1px solid ${q[100]};
  flex-shrink: 0;
  font-size: 11px;
  color: ${K[500]};
`,ec=F.button`
  background: ${J};
  border: 1px solid ${q[100]};
  border-radius: 999px;
  padding: 4px 10px;
  font-size: 11px;
  font-weight: 700;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 6px;
  color: ${K[500]};
  &:hover { border-color: ${q[200]}; }
`,tc=({children:e,greenStatusBar:t=!1,debugTitle:n,onBackToDiscovery:r})=>{let[i,a]=(0,k.useState)(()=>nc(new Date));return(0,k.useEffect)(()=>{let e=setInterval(()=>a(nc(new Date)),6e4);return()=>clearInterval(e)},[]),(0,O.jsx)(Us,{children:(0,O.jsxs)(Ws,{role:`region`,"aria-label":`eSewa phone frame`,children:[(0,O.jsxs)(Gs,{$green:t,children:[(0,O.jsx)(Ks,{children:i}),(0,O.jsxs)(qs,{children:[(0,O.jsxs)(Js,{"aria-hidden":!0,children:[(0,O.jsx)(`span`,{}),(0,O.jsx)(`span`,{}),(0,O.jsx)(`span`,{}),(0,O.jsx)(`span`,{})]}),(0,O.jsx)(`span`,{children:`4G`}),(0,O.jsxs)(Ys,{"aria-label":`battery`,children:[(0,O.jsx)(`i`,{}),(0,O.jsx)(`span`,{children:`92%`})]}),n&&(0,O.jsxs)(`span`,{style:{maxWidth:110,overflow:`hidden`,textOverflow:`ellipsis`,whiteSpace:`nowrap`,opacity:.85,fontWeight:500},children:[`• `,n]})]})]}),r&&(0,O.jsxs)($s,{children:[(0,O.jsx)(ec,{onClick:r,"aria-label":`Back to eSewa`,"data-testid":`back-to-esewa`,children:`← Back to eSewa`}),(0,O.jsx)(`span`,{style:{opacity:.7,fontWeight:500},children:`Simulates CLOSE_APP / back`})]}),(0,O.jsx)(Xs,{children:e}),(0,O.jsx)(Zs,{children:(0,O.jsx)(Qs,{})})]})})};function nc(e){let t=e.getHours(),n=String(e.getMinutes()).padStart(2,`0`),r=t>=12?`PM`:`AM`;return t%=12,t||=12,`${t}:${n} ${r}`}var rc={android:`Mozilla/5.0 (Linux; Android 13; Pixel 7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Mobile Safari/537.36`,ios:`Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1`,flutter:`Mozilla/5.0 (Linux; Android 13; Pixel 7 Build/TQ3A.230805.001; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/120.0.0.0 Mobile Safari/537.36 Flutter`},ic={android:`Android`,ios:`iOS`,flutter:`Flutter (wv)`},ac=`esewa-host-platform`;function oc(){try{let e=localStorage.getItem(ac);if(e&&rc[e])return e}catch{}return`android`}function sc(e){try{localStorage.setItem(ac,e)}catch{}window.location.reload()}var cc=F.div`
  position: fixed;
  top: 0;
  right: 0;
  width: 420px;
  height: 100vh;
  background: ${J};
  border-left: 1px solid ${q[100]};
  box-shadow: -8px 0 24px rgba(28, 37, 46, 0.08);
  transform: translateX(${e=>e.$open?`0`:`100%`});
  transition: transform 0.24s ease;
  display: flex;
  flex-direction: column;
  z-index: 9999;
  font-family: ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, sans-serif;
`,lc=F.button`
  position: fixed;
  top: 50%;
  right: ${e=>e.$open?`420px`:`0`};
  transform: translateY(-50%);
  background: ${G[500]};
  color: ${J};
  border: none;
  border-radius: 8px 0 0 8px;
  padding: 12px 8px;
  cursor: pointer;
  font-weight: 700;
  font-size: 11px;
  letter-spacing: 0.6px;
  writing-mode: vertical-rl;
  text-orientation: mixed;
  box-shadow: -4px 0 12px rgba(41, 187, 0, 0.25);
  z-index: 9999;
  transition: right 0.24s ease;
`,uc=F.div`
  padding: 14px 16px 12px;
  background: ${G[500]};
  color: ${J};
  display: flex;
  align-items: center;
  justify-content: space-between;
`,dc=F.div`
  font-weight: 800;
  font-size: 13px;
  letter-spacing: 0.4px;
`,fc=F.div`
  font-size: 11px;
  opacity: 0.9;
  margin-top: 2px;
`,pc=F.div`
  display: flex;
  gap: 6px;
  margin-top: 8px;
`,mc=F.button`
  flex: 1;
  padding: 6px 8px;
  border-radius: 8px;
  border: 1px solid ${e=>e.$active?J:`rgba(255,255,255,0.5)`};
  background: ${e=>e.$active?J:`rgba(255,255,255,0.15)`};
  color: ${e=>e.$active?G[600]:J};
  font-weight: 700;
  font-size: 11px;
  cursor: pointer;
`,hc=F.div`
  flex: 1;
  overflow-y: auto;
  padding: 12px 12px 0;
  background: ${Bs[50]};
`,gc=F.div`
  background: ${J};
  border: 1px solid ${q[100]};
  border-radius: 12px;
  padding: 10px;
  margin-bottom: 10px;
`,_c=F.div`
  font-size: 11px;
  font-weight: 800;
  letter-spacing: 0.6px;
  text-transform: uppercase;
  color: ${K[500]};
  margin-bottom: 8px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`,vc=F.div`
  border: 1px solid ${e=>e.$pending?Hs[500]:e.$success===!1?Vs[500]:q[100]};
  border-radius: 8px;
  padding: 8px;
  margin-bottom: 6px;
  background: ${e=>e.$pending?Hs[50]:J};
  font-size: 11px;
  font-family: ui-monospace, monospace;
`,yc=F.span`
  display: inline-block;
  padding: 2px 6px;
  border-radius: 999px;
  font-size: 10px;
  font-weight: 800;
  letter-spacing: 0.4px;
  background: ${e=>e.$tone===`green`?G[50]:e.$tone===`blue`?Bs[100]:e.$tone===`orange`?Hs[50]:e.$tone===`red`?Vs[50]:K[25]};
  color: ${e=>e.$tone===`green`?G[500]:e.$tone===`blue`?Bs[500]:e.$tone===`orange`?Hs[500]:e.$tone===`red`?Vs[500]:K[100]};
  border: 1px solid ${e=>e.$tone===`green`?G[500]:e.$tone===`blue`?Bs[500]:e.$tone===`orange`?Hs[500]:e.$tone===`red`?Vs[500]:q[100]};
`,bc=F.textarea`
  width: 100%;
  min-height: 84px;
  font-family: ui-monospace, monospace;
  font-size: 11px;
  border: 1px solid ${q[100]};
  border-radius: 8px;
  padding: 8px;
  background: ${J};
  color: ${K[500]};
  outline: none;
  &:focus { border-color: ${G[500]}; box-shadow: 0 0 0 2px ${G[50]}; }
`,xc=F.select`
  border: 1px solid ${q[100]};
  border-radius: 8px;
  padding: 6px 8px;
  font-size: 11px;
  font-weight: 600;
  background: ${J};
  color: ${K[500]};
`,Sc=F.button`
  border: none;
  border-radius: 8px;
  padding: 6px 10px;
  font-size: 11px;
  font-weight: 700;
  cursor: pointer;
  background: ${e=>e.$variant===`danger`?Vs[500]:e.$variant===`ghost`?J:G[500]};
  color: ${e=>e.$variant===`ghost`?K[500]:J};
  border: 1px solid ${e=>e.$variant===`ghost`?q[100]:`transparent`};
  &:disabled { opacity: 0.5; cursor: not-allowed; }
`,Cc=F.textarea`
  width: 100%;
  min-height: 72px;
  font-family: ui-monospace, monospace;
  font-size: 11px;
  border: 1px solid ${q[100]};
  border-radius: 8px;
  padding: 8px;
  background: #f8fafc;
  color: ${K[500]};
`,wc=()=>{let[e,t]=(0,k.useState)(!0),[n,r]=(0,k.useState)(x()),[i,a]=(0,k.useState)(S()),[o,s]=(0,k.useState)(w()),[c,l]=(0,k.useState)(oc()),[u,d]=(0,k.useState)({}),f=(0,k.useCallback)(()=>{r(x()),a(S()),s(w())},[]);(0,k.useEffect)(()=>{f();let e=()=>f(),t=()=>f(),n=()=>f();return window.addEventListener(`esewaHostLogUpdate`,e),window.addEventListener(`esewaHostPendingUpdate`,t),window.addEventListener(`esewaHostSessionUpdate`,n),()=>{window.removeEventListener(`esewaHostLogUpdate`,e),window.removeEventListener(`esewaHostPendingUpdate`,t),window.removeEventListener(`esewaHostSessionUpdate`,n)}},[f]),(0,k.useEffect)(()=>{d(e=>{let t={...e};for(let e of i)if(!t[e.id]){let n=e.suggestedResponse,r=e.suggestedResponseType,i=n??te[e.requestType]??{message:`ok`},a=r??`success`;t[e.id]={json:JSON.stringify(i,null,2),responseType:a}}for(let e of Object.keys(t))i.find(t=>t.id===e)||delete t[e];return t})},[i]);let p=e=>{let t=u[e];if(!t)return;let n;try{n=JSON.parse(t.json)}catch(e){alert(`Invalid JSON: `+e.message);return}b(e,t.responseType,n)},m=(e,t)=>{let n=t,r=t.trim();if(r.startsWith(`{`)&&r.endsWith(`}`)||r.startsWith(`[`)&&r.endsWith(`]`)||r.startsWith(`"`))try{n=JSON.parse(t)}catch{}else r===`null`&&(n=null);ee({[e]:n})};return(0,O.jsxs)(O.Fragment,{children:[(0,O.jsx)(lc,{$open:e,onClick:()=>t(e=>!e),children:e?`◀ HIDE HOST`:`HOST ▶`}),(0,O.jsxs)(cc,{$open:e,children:[(0,O.jsxs)(uc,{children:[(0,O.jsxs)(`div`,{children:[(0,O.jsx)(dc,{children:`eSewa Host — Dev Panel`}),(0,O.jsx)(fc,{children:`Bridge log · Pending queue · Session`}),(0,O.jsx)(pc,{children:Object.keys(ic).map(e=>(0,O.jsx)(mc,{$active:c===e,onClick:()=>{l(e),sc(e)},title:`Switch to ${ic[e]} — reloads to re-evaluate UA sniff`,children:ic[e]},e))}),(0,O.jsxs)(`div`,{style:{fontSize:10,opacity:.85,marginTop:4},children:[`Current UA: `,typeof navigator<`u`?navigator.userAgent.slice(0,48)+`…`:`—`,` (reload on change)`]})]}),(0,O.jsx)(Sc,{$variant:`ghost`,onClick:()=>{C()},style:{background:`white`,color:G[600]},children:`Clear`})]}),(0,O.jsxs)(hc,{children:[(0,O.jsxs)(gc,{children:[(0,O.jsxs)(_c,{children:[`Pending — needs response (`,i.length,`)`,(0,O.jsx)(`span`,{style:{fontWeight:400,textTransform:`none`,fontSize:10,color:K[100]},children:`Author JSON + pick success/error → Fire`})]}),i.length===0?(0,O.jsx)(`div`,{style:{fontSize:11,color:K[100],fontStyle:`italic`},children:`No pending callbacks. Trigger a Mini App action.`}):i.map(e=>{let t=u[e.id];return(0,O.jsxs)(vc,{$pending:!0,children:[(0,O.jsxs)(`div`,{style:{display:`flex`,justifyContent:`space-between`,gap:8,marginBottom:4},children:[(0,O.jsx)(yc,{$tone:`orange`,children:e.requestType}),(0,O.jsx)(`span`,{style:{fontSize:10,color:K[100]},children:e.platform}),(0,O.jsx)(`span`,{style:{fontSize:10,color:K[100]},children:new Date(e.timestamp).toLocaleTimeString()})]}),(0,O.jsxs)(`div`,{style:{color:K[400],marginBottom:6,wordBreak:`break-all`},children:[(0,O.jsx)(`div`,{style:{fontWeight:700,fontSize:10,color:K[500]},children:`outgoing payload:`}),(0,O.jsx)(`pre`,{style:{margin:`4px 0`,whiteSpace:`pre-wrap`,fontSize:10,background:J,padding:6,borderRadius:6,border:`1px solid ${q[100]}`},children:JSON.stringify(e.data,null,2).slice(0,800)}),(0,O.jsxs)(`div`,{style:{fontSize:10},children:[`callbackKey: `,(0,O.jsx)(`code`,{children:e.callbackKey})]})]}),t&&(0,O.jsxs)(`div`,{style:{display:`flex`,flexDirection:`column`,gap:6},children:[(0,O.jsxs)(`div`,{style:{display:`flex`,gap:6,alignItems:`center`},children:[(0,O.jsxs)(xc,{value:t.responseType,onChange:n=>d(r=>({...r,[e.id]:{...t,responseType:n.target.value}})),children:[(0,O.jsx)(`option`,{value:`success`,children:`success`}),(0,O.jsx)(`option`,{value:`error`,children:`error`})]}),(0,O.jsx)(Sc,{onClick:()=>p(e.id),children:e.callbackKey}),(0,O.jsx)(Sc,{$variant:`ghost`,onClick:()=>d(n=>({...n,[e.id]:{...t,json:JSON.stringify(te[e.requestType]??{message:`ok`},null,2)}})),children:`Reset`})]}),(0,O.jsx)(bc,{value:t.json,onChange:n=>d(r=>({...r,[e.id]:{...t,json:n.target.value}}))})]})]},e.id)})]}),(0,O.jsxs)(gc,{children:[(0,O.jsxs)(_c,{children:[`Live log (`,n.length,`)`,(0,O.jsx)(Sc,{$variant:`ghost`,onClick:()=>C(),children:`Clear log`})]}),(0,O.jsx)(`div`,{style:{maxHeight:260,overflowY:`auto`,display:`flex`,flexDirection:`column`,gap:6},children:n.length===0?(0,O.jsx)(`div`,{style:{fontSize:11,color:K[100],fontStyle:`italic`},children:`No requests yet.`}):n.slice(0,30).map(e=>(0,O.jsxs)(vc,{$success:e.response?.responseType===`error`?!1:e.responded?!0:void 0,children:[(0,O.jsxs)(`div`,{style:{display:`flex`,justifyContent:`space-between`,gap:6},children:[(0,O.jsx)(yc,{$tone:e.responded?e.response?.responseType===`error`?`red`:`green`:`gray`,children:e.requestType}),(0,O.jsxs)(`span`,{style:{fontSize:10,color:K[100]},children:[e.platform,` · `,e.hasCallback?e.callbackKey:`no-cb`]})]}),(0,O.jsx)(`div`,{style:{fontSize:10,color:K[300],marginTop:4,wordBreak:`break-all`},children:e.responded?`→ ${e.response?.responseType}: ${JSON.stringify(e.response?.response).slice(0,140)}`:`… pending`}),(0,O.jsx)(`div`,{style:{fontSize:9,color:K[100],marginTop:2},children:new Date(e.timestamp).toLocaleTimeString()})]},e.id))})]}),(0,O.jsxs)(gc,{children:[(0,O.jsx)(_c,{children:`Session state — editable JSON`}),(0,O.jsxs)(`div`,{style:{display:`flex`,flexDirection:`column`,gap:8},children:[(0,O.jsxs)(`div`,{children:[(0,O.jsx)(`div`,{style:{fontSize:10,fontWeight:700,color:K[500],marginBottom:4},children:`token (string | null)`}),(0,O.jsx)(Cc,{value:o.token??`null`,onChange:e=>s(t=>({...t,token:e.target.value===`null`?null:e.target.value})),onBlur:e=>m(`token`,e.target.value===`null`?`null`:JSON.stringify(e.target.value)),rows:1}),(0,O.jsxs)(`div`,{style:{display:`flex`,gap:6,marginTop:4},children:[(0,O.jsx)(Sc,{$variant:`ghost`,onClick:()=>m(`token`,JSON.stringify(`mock_token_`+Math.random().toString(36).slice(2,8))),children:`Gen token`}),(0,O.jsx)(Sc,{$variant:`ghost`,onClick:()=>m(`token`,`null`),children:`Clear`})]})]}),(0,O.jsx)(Tc,{label:`user (USER_DETAIL_ACCESS)`,value:o.user,onSave:e=>m(`user`,e)}),(0,O.jsx)(Tc,{label:`product (GET_PRODUCT)`,value:o.product,onSave:e=>m(`product`,e)}),(0,O.jsx)(Tc,{label:`merchant (MERCHANT_DETAIL)`,value:o.merchant,onSave:e=>m(`merchant`,e)})]})]}),(0,O.jsxs)(`div`,{style:{fontSize:10,color:K[100],padding:`8px 2px 12px`,lineHeight:1.5},children:[`Host does NOT create callback slots — library does. Host only calls `,(0,O.jsx)(`code`,{children:`window.Android[callbackKey]`}),` etc with `,(0,O.jsxs)(`code`,{children:[`{`,`requestType, responseType, response`,`}`]}),`. Reload after platform switch so library re-evaluates UA.`]})]})]})]})},Tc=({label:e,value:t,onSave:n})=>{let[r,i]=(0,k.useState)(()=>JSON.stringify(t,null,2));(0,k.useEffect)(()=>i(JSON.stringify(t,null,2)),[t]);let[a,o]=(0,k.useState)(null);return(0,O.jsxs)(`div`,{children:[(0,O.jsx)(`div`,{style:{fontSize:10,fontWeight:700,color:K[500],marginBottom:4},children:e}),(0,O.jsx)(Cc,{value:r,onChange:e=>i(e.target.value),rows:4}),a&&(0,O.jsx)(`div`,{style:{fontSize:10,color:Vs[500],marginTop:4},children:a}),(0,O.jsxs)(`div`,{style:{display:`flex`,gap:6,marginTop:4},children:[(0,O.jsx)(Sc,{$variant:`ghost`,onClick:()=>{try{JSON.parse(r),o(null),n(r)}catch(e){o(e.message)}},children:`Save`}),(0,O.jsx)(Sc,{$variant:`ghost`,onClick:()=>i(JSON.stringify(t,null,2)),children:`Reset`})]})]})},Ec=`esewa_dev_registered_miniapps`,Dc=`esewaMiniAppRegistryUpdate`;function Oc(e){let t=``;for(let n=0;n<e;n++)t+=`ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789`[Math.floor(Math.random()*36)];return t}function kc(){if(typeof window>`u`)return[];try{let e=localStorage.getItem(Ec);if(!e)return[];let t=JSON.parse(e);return Array.isArray(t)?t:[]}catch{return[]}}function Ac(e){try{localStorage.setItem(Ec,JSON.stringify(e))}catch{}typeof window<`u`&&window.dispatchEvent(new CustomEvent(Dc))}function jc(){return kc()}function Mc(e){return kc().find(t=>t.id===e)}function Nc(e){let t=new Date().toISOString(),n={id:typeof crypto<`u`&&`randomUUID`in crypto?crypto.randomUUID():`app_${Date.now()}_${Oc(4)}`,name:e.name,description:e.description,category:e.category,iconLabel:e.iconLabel.slice(0,2).toUpperCase()||`AP`,badge:e.badge?.trim()||void 0,launchMode:e.launchMode,launchUrl:e.launchMode===`iframe`?e.launchUrl?.trim():void 0,contactEmail:e.contactEmail,businessType:e.businessType,status:`pending_review`,merchant_identifier:`NP-ES-DEV-${Oc(6).toUpperCase()}`,vendorIdentifier:`VENDOR-${Oc(8).toUpperCase()}`,createdAt:t},r=kc();return r.unshift(n),Ac(r),n}function Pc(e,t,n){let r=kc(),i=r.findIndex(t=>t.id===e);if(i===-1)return;let a=r[i].reviewNote,o=t===`rejected`?n??a:t===`pending_review`&&n?n:void 0;return r[i]={...r[i],status:t,reviewNote:o},Ac(r),r[i]}function Fc(e){if(typeof window>`u`)return()=>{};let t=()=>e();return window.addEventListener(Dc,t),()=>window.removeEventListener(Dc,t)}var Ic=F.div`
  min-height: 100vh;
  background: ${Bs[50]};
  display: flex;
  flex-direction: column;
`,Lc=F.header`
  background: ${K[900]};
  color: ${J};
  position: sticky;
  top: 0;
  z-index: 10;
  border-bottom: 1px solid ${K[800]};
`,Rc=F.div`
  max-width: 1160px;
  margin: 0 auto;
  padding: 10px 20px;
  display: flex;
  align-items: center;
  gap: 18px;
  @media (max-width: 860px) {
    gap: 10px;
    padding: 10px 12px;
  }
`,zc=F.a`
  display: flex;
  align-items: center;
  gap: 8px;
  text-decoration: none;
  color: ${J};
  font-weight: 800;
  font-size: 22px;
  letter-spacing: 0.6px;
  white-space: nowrap;
  img {
    height: 28px;
    display: block;
  }
  span {
    color: ${G[500]};
  }
  small {
    font-size: 10px;
    font-weight: 600;
    color: ${q[200]};
    letter-spacing: 1px;
    text-transform: uppercase;
    margin-left: 2px;
  }
`,Bc=F.div`
  flex: 1;
  max-width: 520px;
  display: flex;
  align-items: center;
  background: ${J};
  border-radius: 6px;
  padding: 0 10px;
  height: 36px;
  color: ${K[100]};
  @media (max-width: 860px) {
    max-width: none;
  }
  input {
    flex: 1;
    border: none;
    outline: none;
    font-size: 13px;
    color: ${K[500]};
    background: transparent;
    &::placeholder { color: ${K[100]}; }
  }
  button {
    background: ${G[500]};
    color: ${J};
    border: none;
    border-radius: 4px;
    padding: 5px 10px;
    font-size: 12px;
    font-weight: 700;
    cursor: pointer;
    margin-left: 6px;
  }
`,Vc=F.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-left: auto;
  input {
    background: ${K[800]};
    border: 1px solid ${K[700]};
    color: ${J};
    border-radius: 6px;
    padding: 7px 10px;
    font-size: 12px;
    width: 120px;
    &::placeholder { color: ${q[300]}; }
    outline: none;
  }
  button {
    background: ${G[500]};
    color: ${J};
    border: none;
    border-radius: 6px;
    padding: 7px 14px;
    font-size: 12px;
    font-weight: 700;
    cursor: pointer;
    white-space: nowrap;
  }
  @media (max-width: 860px) {
    display: none;
  }
`,Hc=F.button`
  display: none;
  background: transparent;
  border: 1px solid ${K[700]};
  color: ${q[200]};
  border-radius: 6px;
  padding: 6px 10px;
  font-size: 12px;
  @media (max-width: 860px) {
    display: inline-flex;
  }
`,Uc=F.div`
  background: ${J};
  border-bottom: 1px solid ${q[100]};
  padding: 8px 0;
  overflow-x: auto;
  white-space: nowrap;
  &::-webkit-scrollbar { display: none; }
`,Wc=F.div`
  max-width: 1160px;
  margin: 0 auto;
  padding: 0 20px;
  display: flex;
  gap: 18px;
  font-size: 13px;
  font-weight: 600;
  color: ${K[500]};
  a {
    color: ${K[500]};
    text-decoration: none;
    padding: 4px 0;
    border-bottom: 2px solid transparent;
    &.active { color: ${G[500]}; border-color: ${G[500]}; }
  }
`,Gc=F.main`
  max-width: 1160px;
  width: 100%;
  margin: 0 auto;
  padding: 16px 20px 40px;
  box-sizing: border-box;
  @media (max-width: 860px) {
    padding: 12px 12px 30px;
  }
`,Kc=F.section`
  background: ${J};
  border: 1px solid ${q[100]};
  border-radius: 12px;
  padding: 14px 14px 10px;
  margin-bottom: 14px;
`,qc=F.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
  h4 {
    margin: 0;
    font-size: 15px;
    font-weight: 700;
    color: ${K[900]};
    letter-spacing: 0.2px;
  }
`,Jc=F.button`
  background: transparent;
  border: 1px solid ${q[100]};
  color: ${G[500]};
  font-size: 11px;
  font-weight: 700;
  border-radius: 999px;
  padding: 5px 12px;
  cursor: pointer;
  &:hover { border-color: ${G[200]}; background: ${G[50]}; }
`,Yc=F.div`
  display: flex;
  gap: 14px;
  overflow-x: auto;
  padding-bottom: 6px;
  scroll-snap-type: x proximity;
  &::-webkit-scrollbar { height: 6px; }
  &::-webkit-scrollbar-thumb { background: ${q[100]}; border-radius: 999px; }
  @media (max-width: 860px) {
    gap: 10px;
  }
`,Xc=F.figure`
  flex: 0 0 148px;
  margin: 0;
  background: ${J};
  border: 1px solid ${q[100]};
  border-radius: 10px;
  padding: 10px 8px 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  position: relative;
  cursor: ${e=>e.$clickable?`pointer`:`default`};
  transition: border-color 0.15s, box-shadow 0.15s, transform 0.15s;
  scroll-snap-align: start;
  &:hover {
    ${e=>e.$clickable?`border-color: ${G[200]}; box-shadow: 0 4px 14px rgba(41,187,0,0.12); transform: translateY(-1px);`:``}
  }
  @media (max-width: 860px) {
    flex: 0 0 132px;
  }
`,Zc=F.div`
  position: absolute;
  top: 6px;
  left: 6px;
  background: ${G[500]};
  color: ${J};
  font-size: 9px;
  font-weight: 800;
  letter-spacing: 0.4px;
  padding: 2px 6px;
  border-radius: 999px;
  text-transform: uppercase;
  max-width: 80px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`,Qc=F.div`
  width: 64px;
  height: 64px;
  border-radius: 50%;
  background: ${Bs[50]};
  border: 1px solid ${q[100]};
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  margin-top: 6px;
  img {
    width: 42px;
    height: 42px;
    object-fit: contain;
  }
  span {
    font-size: 22px;
    font-weight: 800;
    color: ${G[500]};
  }
`,$c=F.figcaption`
  margin-top: 8px;
  h5 {
    margin: 0;
    font-size: 12px;
    font-weight: 600;
    color: ${K[900]};
    line-height: 1.3;
    min-height: 32px;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
  p {
    margin: 2px 0 0;
    font-size: 10px;
    color: ${K[100]};
    line-height: 1.2;
    min-height: 14px;
  }
`,el=F.button`
  margin-top: 8px;
  background: ${e=>e.$muted?J:G[500]};
  color: ${e=>e.$muted?K[100]:J};
  border: 1px solid ${e=>e.$muted?q[100]:G[500]};
  border-radius: 6px;
  padding: 5px 10px;
  font-size: 11px;
  font-weight: 700;
  cursor: ${e=>e.$muted?`default`:`pointer`};
  width: 100%;
  &:hover {
    background: ${e=>e.$muted?J:G[600]};
  }
`,tl=F.div`
  border: 1px dashed ${q[100]};
  border-radius: 10px;
  padding: 18px;
  text-align: center;
  color: ${K[100]};
  font-size: 13px;
  background: ${Bs[50]};
  button {
    margin-top: 10px;
    background: ${K[900]};
    color: ${J};
    border: none;
    border-radius: 8px;
    padding: 7px 14px;
    font-size: 12px;
    font-weight: 700;
    cursor: pointer;
  }
`,nl=({onLaunchMiniApp:e,onOpenOnboarding:t})=>{let[n,r]=(0,k.useState)(()=>jc().filter(e=>e.status===`live`));return(0,k.useEffect)(()=>{let e=()=>r(jc().filter(e=>e.status===`live`));return e(),Fc(e)},[]),(0,O.jsxs)(Ic,{children:[(0,O.jsx)(Lc,{children:(0,O.jsxs)(Rc,{children:[(0,O.jsx)(Hc,{children:`☰`}),(0,O.jsxs)(zc,{href:`#`,onClick:e=>e.preventDefault(),children:[(0,O.jsx)(`img`,{src:`https://esewa.com.np/common/images/esewa_logo.png`,alt:`eSewa`,onError:e=>e.target.style.display=`none`}),(0,O.jsxs)(`span`,{style:{display:`inline-flex`,flexDirection:`column`,lineHeight:1},children:[(0,O.jsx)(`span`,{children:`eSewa`}),(0,O.jsx)(`small`,{children:`Pay • Send • Receive`})]})]}),(0,O.jsxs)(Bc,{children:[(0,O.jsx)(`span`,{"aria-hidden":!0,children:`🔍`}),(0,O.jsx)(`input`,{placeholder:`Search services, bills, merchants…`,"aria-label":`Search`}),(0,O.jsx)(`button`,{type:`button`,children:`Search`})]}),(0,O.jsxs)(Vc,{"aria-hidden":!0,children:[(0,O.jsx)(`input`,{placeholder:`eSewa ID`,tabIndex:-1}),(0,O.jsx)(`input`,{placeholder:`Password`,type:`password`,tabIndex:-1}),(0,O.jsx)(`button`,{tabIndex:-1,children:`Login`})]})]})}),(0,O.jsx)(Uc,{children:(0,O.jsxs)(Wc,{children:[(0,O.jsx)(`a`,{className:`active`,href:`#`,onClick:e=>e.preventDefault(),children:`Home`}),(0,O.jsx)(`a`,{href:`#`,onClick:e=>e.preventDefault(),children:`Top Up`}),(0,O.jsx)(`a`,{href:`#`,onClick:e=>e.preventDefault(),children:`Electricity`}),(0,O.jsx)(`a`,{href:`#`,onClick:e=>e.preventDefault(),children:`Khanepani`}),(0,O.jsx)(`a`,{href:`#`,onClick:e=>e.preventDefault(),children:`Internet`}),(0,O.jsx)(`a`,{href:`#`,onClick:e=>e.preventDefault(),children:`Airlines`}),(0,O.jsx)(`a`,{href:`#`,onClick:e=>e.preventDefault(),children:`Bus`}),(0,O.jsx)(`a`,{href:`#`,onClick:e=>e.preventDefault(),children:`Insurance`})]})}),(0,O.jsxs)(Gc,{children:[(0,O.jsxs)(Kc,{children:[(0,O.jsxs)(qc,{children:[(0,O.jsxs)(`h4`,{children:[`Mini Apps `,(0,O.jsx)(`span`,{style:{fontWeight:500,fontSize:11,color:K[100],background:Bs[100],border:`1px solid ${Bs[200]}`,borderRadius:999,padding:`2px 7px`,marginLeft:6},children:`Dev-only`})]}),(0,O.jsx)(Jc,{children:`View more`})]}),n.length===0?(0,O.jsxs)(tl,{children:[(0,O.jsx)(`div`,{style:{fontWeight:700,color:K[500]},children:`No Mini Apps live yet — register one in the Partner Console`}),(0,O.jsx)(`div`,{style:{marginTop:4},children:`Create → approve → go live, then it appears here as a tile.`}),t&&(0,O.jsx)(`button`,{onClick:t,children:`Open Partner Console`})]}):(0,O.jsx)(Yc,{children:n.map(t=>(0,O.jsxs)(Xc,{$clickable:!0,onClick:()=>e(t.id),role:`button`,"aria-label":`Open ${t.name}`,"data-testid":`tile-miniapp-${t.id}`,children:[t.badge&&(0,O.jsx)(Zc,{children:t.badge}),(0,O.jsx)(Qc,{children:(0,O.jsx)(`span`,{children:t.iconLabel})}),(0,O.jsxs)($c,{children:[(0,O.jsx)(`h5`,{children:t.name}),(0,O.jsx)(`p`,{children:t.category})]}),(0,O.jsx)(el,{children:`View Details`})]},t.id))}),(0,O.jsxs)(`div`,{style:{fontSize:11,color:K[100],marginTop:8},children:[`Tiles shown here require `,(0,O.jsx)(`b`,{children:`status === 'live'`}),` — pending/approved apps stay hidden until Go Live.`]})]}),(0,O.jsxs)(Kc,{children:[(0,O.jsxs)(qc,{children:[(0,O.jsx)(`h4`,{children:`Merchant Spotlight`}),(0,O.jsx)(Jc,{children:`View more`})]}),(0,O.jsx)(Yc,{children:[{name:`Dummy Service A`,icon:`🏦`,offer:`New`},{name:`Dummy Service B`,icon:`🛡️`,offer:`10% off`},{name:`Dummy Service C`,icon:`🎟️`,offer:`Registration`}].map(e=>(0,O.jsxs)(Xc,{children:[(0,O.jsx)(Zc,{style:{background:e.offer===`New`?Bs[500]:e.offer===`10% off`?G[500]:Hs[500]},children:e.offer}),(0,O.jsx)(Qc,{children:(0,O.jsx)(`span`,{children:e.icon})}),(0,O.jsxs)($c,{children:[(0,O.jsx)(`h5`,{children:e.name}),(0,O.jsx)(`p`,{children:`Marketplace filler`})]}),(0,O.jsx)(el,{$muted:!0,children:`View Details`})]},e.name))})]}),(0,O.jsxs)(Kc,{children:[(0,O.jsxs)(qc,{children:[(0,O.jsx)(`h4`,{children:`Popular Services`}),(0,O.jsx)(Jc,{children:`View more`})]}),(0,O.jsx)(Yc,{children:[{name:`Mobile Topup`,icon:`📞`,offer:`5% off`},{name:`Electricity`,icon:`💡`,offer:``},{name:`Khanepani`,icon:`💧`,offer:``},{name:`Internet`,icon:`🌐`,offer:`New`},{name:`Airlines`,icon:`✈️`,offer:``}].map(e=>(0,O.jsxs)(Xc,{children:[e.offer&&(0,O.jsx)(Zc,{children:e.offer}),(0,O.jsx)(Qc,{children:(0,O.jsx)(`span`,{children:e.icon})}),(0,O.jsx)($c,{children:(0,O.jsx)(`h5`,{children:e.name})}),(0,O.jsx)(el,{$muted:!0,children:`View Details`})]},e.name))})]}),(0,O.jsxs)(Kc,{children:[(0,O.jsxs)(qc,{children:[(0,O.jsx)(`h4`,{children:`Insurance`}),(0,O.jsx)(Jc,{children:`View more`})]}),(0,O.jsx)(Yc,{children:[{name:`Life Insurance`,icon:`🏥`,offer:`New`},{name:`Vehicle`,icon:`🚗`,offer:``},{name:`Travel`,icon:`🧳`,offer:`10% off`},{name:`Health Cover`,icon:`❤️`,offer:``}].map(e=>(0,O.jsxs)(Xc,{children:[e.offer&&(0,O.jsx)(Zc,{children:e.offer}),(0,O.jsx)(Qc,{children:(0,O.jsx)(`span`,{children:e.icon})}),(0,O.jsx)($c,{children:(0,O.jsx)(`h5`,{children:e.name})}),(0,O.jsx)(el,{$muted:!0,children:`View Details`})]},e.name))})]}),(0,O.jsxs)(`div`,{style:{marginTop:10,fontSize:11,color:K[100],lineHeight:1.6,borderTop:`1px dashed ${q[100]}`,paddingTop:10},children:[`Clone of `,(0,O.jsx)(`a`,{href:`https://esewa.com.np/#/home`,target:`_blank`,rel:`noreferrer`,style:{color:G[500],textDecoration:`none`},children:`esewa.com.np/#/home`}),` — only Mini Apps tiles with `,(0,O.jsx)(`code`,{children:`live`}),` status launch the PhoneShell; others are decorative.`]})]})]})},rl=F.div`
  max-width: 1100px;
  margin: 0 auto;
  padding: 18px 20px 32px;
  box-sizing: border-box;
  background: ${Bs[50]};
  min-height: calc(100vh - 56px);
`,il=F.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 14px;
  gap: 12px;
  flex-wrap: wrap;
`,al=F.h1`
  margin: 0;
  font-size: 18px;
  font-weight: 800;
  color: ${K[900]};
  span { font-weight: 500; font-size: 12px; color: ${K[100]}; margin-left: 8px; }
`,ol=F.div`
  display: inline-flex;
  background: ${J};
  border: 1px solid ${q[100]};
  border-radius: 999px;
  padding: 3px;
  gap: 3px;
`,sl=F.button`
  border: none;
  border-radius: 999px;
  padding: 7px 14px;
  font-size: 12px;
  font-weight: 700;
  cursor: pointer;
  background: ${e=>e.$active?K[900]:`transparent`};
  color: ${e=>e.$active?J:K[500]};
`,cl=F.div`
  background: ${J};
  border: 1px solid ${q[100]};
  border-radius: 12px;
  padding: 16px;
`,ll=F.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
  @media (max-width: 760px) { grid-template-columns: 1fr; }
`,ul=F.label`
  display: flex;
  flex-direction: column;
  gap: 5px;
  font-size: 12px;
  font-weight: 600;
  color: ${K[500]};
  span.req { color: ${Vs[500]}; }
  input, textarea, select {
    border: 1px solid ${q[100]};
    border-radius: 8px;
    padding: 8px 10px;
    font-size: 13px;
    outline: none;
    background: ${J};
    color: ${K[500]};
    &:focus { border-color: ${K[300]}; }
  }
  textarea { min-height: 64px; resize: vertical; }
  small { font-weight: 400; color: ${K[100]}; }
`,dl=F.div`
  display: flex;
  gap: 14px;
  align-items: center;
  font-size: 13px;
  label { display: flex; align-items: center; gap: 6px; font-weight: 500; cursor: pointer; }
`,fl=F.button`
  border: 1px solid ${e=>e.$primary?G[500]:q[100]};
  background: ${e=>e.$primary?G[500]:J};
  color: ${e=>e.$primary?J:K[500]};
  border-radius: 8px;
  padding: 8px 14px;
  font-size: 12px;
  font-weight: 700;
  cursor: pointer;
  &:disabled { opacity: 0.5; cursor: not-allowed; }
`,pl=F.span`
  display: inline-block;
  font-size: 10px;
  font-weight: 800;
  letter-spacing: 0.5px;
  text-transform: uppercase;
  padding: 3px 8px;
  border-radius: 999px;
  border: 1px solid;
  background: ${e=>e.$status===`live`?G[50]:e.$status===`approved`?Bs[100]:e.$status===`pending_review`?Hs[50]:e.$status===`rejected`?Vs[50]:K[25]};
  color: ${e=>e.$status===`live`?G[500]:e.$status===`approved`?Bs[500]:e.$status===`pending_review`?Hs[500]:e.$status===`rejected`?Vs[500]:K[100]};
  border-color: ${e=>e.$status===`live`?G[200]:e.$status===`approved`?Bs[200]:e.$status===`pending_review`?Hs[500]:e.$status===`rejected`?Vs[200]:q[100]};
`,ml=F.div`
  border: 1px solid ${q[100]};
  border-radius: 10px;
  padding: 12px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  background: ${J};
`,hl=F.code`
  font-family: ui-monospace, monospace;
  font-size: 11px;
  background: ${Bs[50]};
  border: 1px solid ${q[100]};
  border-radius: 6px;
  padding: 2px 6px;
  word-break: break-all;
`,gl=[`Sole Proprietor`,`Private Limited`,`Public Limited`,`Partnership`,`Cooperative`],_l=({onGoDiscovery:e,onForceLaunch:t})=>{let[n,r]=(0,k.useState)(`register`),[i,a]=(0,k.useState)(()=>jc()),[o,s]=(0,k.useState)({name:``,description:``,category:`Utilities`,iconLabel:``,badge:``,launchMode:`embedded`,launchUrl:``,contactEmail:``,businessType:gl[0]}),[c,l]=(0,k.useState)(null);(0,k.useEffect)(()=>Fc(()=>a(jc())),[]);let u=e=>{if(e.preventDefault(),l(null),!o.name.trim()||!o.description.trim()||!o.category.trim()||!o.iconLabel.trim()||!o.contactEmail.trim()){l(`Please fill required fields.`);return}if(o.launchMode===`iframe`&&!o.launchUrl.trim()){l(`Launch URL is required for Iframe mode.`);return}try{if(new URL(o.launchUrl||`https://example.com`),o.launchMode===`iframe`&&!o.launchUrl.startsWith(`http`))throw Error(`URL must start with http`)}catch{if(o.launchMode===`iframe`){l(`Launch URL must be a valid http(s) URL.`);return}}Nc({name:o.name.trim(),description:o.description.trim(),category:o.category.trim(),iconLabel:o.iconLabel.trim(),badge:o.badge.trim()||void 0,launchMode:o.launchMode,launchUrl:o.launchUrl.trim()||void 0,contactEmail:o.contactEmail.trim(),businessType:o.businessType}),s(e=>({...e,name:``,description:``,iconLabel:``,badge:``,launchUrl:``,contactEmail:``})),r(`queue`)},d=(e,t)=>{if(t===`rejected`){let n=window.prompt(`Rejection reason (reviewNote):`,`Missing required documents`);if(n===null)return;Pc(e,t,n||`Rejected by reviewer`)}else Pc(e,t)};return(0,O.jsxs)(rl,{children:[(0,O.jsxs)(il,{children:[(0,O.jsxs)(al,{children:[`Partner Console `,(0,O.jsx)(`span`,{children:`dev-only — Paytm-style onboarding simulation`})]}),(0,O.jsxs)(ol,{children:[(0,O.jsx)(sl,{$active:n===`register`,onClick:()=>r(`register`),children:`Register New App`}),(0,O.jsxs)(sl,{$active:n===`queue`,onClick:()=>r(`queue`),children:[`Review Queue (`,i.length,`)`]})]})]}),n===`register`?(0,O.jsxs)(cl,{as:`form`,onSubmit:u,children:[(0,O.jsxs)(`div`,{style:{fontSize:12,color:K[100],marginBottom:10},children:[`This console is `,(0,O.jsx)(`b`,{children:`dev tooling`}),`, intentionally plain — not eSewa UI — to avoid confusion with real eSewa surfaces.`]}),(0,O.jsxs)(ll,{children:[(0,O.jsxs)(ul,{children:[`Name *`,(0,O.jsx)(`input`,{value:o.name,onChange:e=>s({...o,name:e.target.value}),placeholder:`e.g. Khanepani Quick Pay`})]}),(0,O.jsxs)(ul,{children:[`Category`,(0,O.jsx)(`input`,{value:o.category,onChange:e=>s({...o,category:e.target.value}),placeholder:`Utilities, Shopping…`})]}),(0,O.jsxs)(ul,{children:[`Description *`,(0,O.jsx)(`textarea`,{value:o.description,onChange:e=>s({...o,description:e.target.value}),placeholder:`Short pitch…`})]}),(0,O.jsxs)(ul,{children:[`Icon label (1-2 letters) *`,(0,O.jsx)(`input`,{value:o.iconLabel,onChange:e=>s({...o,iconLabel:e.target.value}),placeholder:`KP`,maxLength:2})]}),(0,O.jsxs)(ul,{children:[`Badge (optional)`,(0,O.jsx)(`input`,{value:o.badge,onChange:e=>s({...o,badge:e.target.value}),placeholder:`New, 10% off…`})]}),(0,O.jsxs)(ul,{children:[`Contact email *`,(0,O.jsx)(`input`,{type:`email`,value:o.contactEmail,onChange:e=>s({...o,contactEmail:e.target.value}),placeholder:`team@example.com`})]}),(0,O.jsxs)(ul,{children:[`Business type`,(0,O.jsx)(`select`,{value:o.businessType,onChange:e=>s({...o,businessType:e.target.value}),children:gl.map(e=>(0,O.jsx)(`option`,{value:e,children:e},e))})]}),(0,O.jsxs)(ul,{children:[`Launch mode`,(0,O.jsxs)(dl,{children:[(0,O.jsxs)(`label`,{children:[(0,O.jsx)(`input`,{type:`radio`,checked:o.launchMode===`embedded`,onChange:()=>s({...o,launchMode:`embedded`})}),` Embedded`]}),(0,O.jsxs)(`label`,{children:[(0,O.jsx)(`input`,{type:`radio`,checked:o.launchMode===`iframe`,onChange:()=>s({...o,launchMode:`iframe`})}),` Iframe URL`]})]}),(0,O.jsx)(`small`,{children:`Embedded mounts SampleMiniApp inline; Iframe renders <iframe src> (same-origin host bridge injected).`})]}),o.launchMode===`iframe`&&(0,O.jsxs)(ul,{children:[`Launch URL *`,(0,O.jsx)(`input`,{value:o.launchUrl,onChange:e=>s({...o,launchUrl:e.target.value}),placeholder:`http://localhost:5174 or https://...`})]})]}),c&&(0,O.jsx)(`div`,{style:{marginTop:10,color:`#fff`,background:Vs[500],borderRadius:8,padding:`8px 10px`,fontSize:12},children:c}),(0,O.jsxs)(`div`,{style:{marginTop:14,display:`flex`,gap:8},children:[(0,O.jsx)(fl,{$primary:!0,type:`submit`,children:`Submit for review`}),(0,O.jsx)(fl,{type:`button`,onClick:()=>r(`queue`),children:`View queue`})]}),(0,O.jsxs)(`div`,{style:{marginTop:8,fontSize:11,color:K[100]},children:[`On submit: status → `,(0,O.jsx)(`b`,{children:`pending_review`}),`, identifiers auto-generated (`,(0,O.jsx)(`code`,{children:`NP-ES-DEV-XXXXXX`}),` / `,(0,O.jsx)(`code`,{children:`VENDOR-XXXXXXXX`}),`).`]})]}):(0,O.jsxs)(`div`,{style:{display:`flex`,flexDirection:`column`,gap:10},children:[i.length===0?(0,O.jsx)(cl,{children:(0,O.jsx)(`div`,{style:{fontSize:13,color:K[500]},children:`No apps registered yet. Switch to “Register New App” to create the first one.`})}):i.map(e=>(0,O.jsxs)(ml,{children:[(0,O.jsx)(`div`,{style:{display:`flex`,justifyContent:`space-between`,gap:10,alignItems:`flex-start`},children:(0,O.jsxs)(`div`,{children:[(0,O.jsxs)(`div`,{style:{display:`flex`,alignItems:`center`,gap:8,flexWrap:`wrap`},children:[(0,O.jsx)(`div`,{style:{width:36,height:36,borderRadius:8,background:e.status===`live`?G[500]:Bs[50],border:`1px solid ${q[100]}`,display:`flex`,alignItems:`center`,justifyContent:`center`,fontWeight:800,fontSize:12,color:e.status===`live`?J:K[500]},children:e.iconLabel}),(0,O.jsxs)(`div`,{children:[(0,O.jsx)(`div`,{style:{fontWeight:700,fontSize:13,color:K[900]},children:e.name}),(0,O.jsxs)(`div`,{style:{fontSize:11,color:K[100]},children:[e.category,` • `,e.businessType,` • `,new Date(e.createdAt).toLocaleString()]})]}),(0,O.jsx)(pl,{$status:e.status,children:e.status}),e.badge&&(0,O.jsx)(`span`,{style:{fontSize:10,background:G[50],border:`1px solid ${G[200]}`,color:G[500],borderRadius:999,padding:`2px 6px`,fontWeight:700},children:e.badge})]}),(0,O.jsx)(`div`,{style:{fontSize:12,color:K[500],marginTop:6},children:e.description}),(0,O.jsxs)(`div`,{style:{fontSize:11,color:K[100],marginTop:4},children:[e.contactEmail,` • launchMode: `,(0,O.jsx)(`b`,{children:e.launchMode}),e.launchUrl?` • ${e.launchUrl}`:``]}),(0,O.jsxs)(`div`,{style:{display:`flex`,gap:6,flexWrap:`wrap`,marginTop:6},children:[(0,O.jsx)(hl,{children:e.merchant_identifier}),(0,O.jsx)(hl,{children:e.vendorIdentifier})]}),e.reviewNote&&(0,O.jsxs)(`div`,{style:{marginTop:6,background:Vs[50],border:`1px solid ${Vs[100]}`,color:Vs[500],borderRadius:8,padding:`6px 8px`,fontSize:12},children:[(0,O.jsx)(`b`,{children:`Review note:`}),` `,e.reviewNote]})]})}),(0,O.jsxs)(`div`,{style:{display:`flex`,gap:6,flexWrap:`wrap`,alignItems:`center`},children:[e.status===`pending_review`&&(0,O.jsxs)(O.Fragment,{children:[(0,O.jsx)(fl,{$primary:!0,onClick:()=>d(e.id,`approved`),children:`Approve`}),(0,O.jsx)(fl,{onClick:()=>d(e.id,`rejected`),children:`Reject`}),t&&(0,O.jsx)(fl,{onClick:()=>t(e.id),style:{background:Hs[50],borderColor:Hs[500],color:Hs[500]},children:`Test launch (not live → error)`})]}),e.status===`approved`&&(0,O.jsxs)(O.Fragment,{children:[(0,O.jsx)(fl,{$primary:!0,onClick:()=>d(e.id,`live`),children:`Go Live`}),(0,O.jsx)(fl,{onClick:()=>d(e.id,`rejected`),children:`Reject`})]}),e.status===`live`&&(0,O.jsx)(fl,{onClick:()=>d(e.id,`approved`),children:`Take Down`}),e.status===`rejected`&&(0,O.jsxs)(O.Fragment,{children:[(0,O.jsx)(fl,{$primary:!0,onClick:()=>d(e.id,`pending_review`),children:`Resubmit`}),t&&(0,O.jsx)(fl,{onClick:()=>t(e.id),style:{background:Hs[50],borderColor:Hs[500],color:Hs[500]},children:`Test launch (rejected → error)`})]}),e.status===`draft`&&(0,O.jsx)(fl,{$primary:!0,onClick:()=>d(e.id,`pending_review`),children:`Submit`})]})]},e.id)),e&&(0,O.jsx)(`div`,{children:(0,O.jsx)(fl,{onClick:e,children:`← Back to eSewa Home`})})]})]})};function vl({merchantIdentifier:e,vendorIdentifier:t}){let{data:n,updateData:r}=vr(),[i,a]=(0,k.useState)(`Mini App Demo`),[o,s]=(0,k.useState)(null),[c,l]=(0,k.useState)(`Tap a button to fire a bridge request. Then respond from Host panel.`),u=e||`IAAAAABTOBAbFhAXHhEHAgoXX0FRR1FJJiw3LCwkJzE=`,d=t||`VENDOR-DEFAULT`;(0,k.useEffect)(()=>{r({title:i})},[]);let f=(e,t,n={})=>{let r={requestType:e,callbackKey:t,merchant_identifier:u,vendorIdentifier:d,...n},i=(()=>{try{return sessionStorage.getItem(`token`)||sessionStorage.getItem(`miniAppAuthToken`)}catch{return null}})();i&&(r.token=i),l(`→ ${e} (mid=${u.slice(0,12)}… awaiting Host panel via ${t})`),Is(r,t=>{if(s(t),t?.responseType===`error`)l(`← ${e} error: ${JSON.stringify(t.response).slice(0,200)}`);else if(l(`← ${e} success: ${JSON.stringify(t?.response).slice(0,200)}`),e===`INIT_APP`&&t?.response?.token)try{sessionStorage.setItem(`token`,t.response.token),sessionStorage.setItem(`miniAppAuthToken`,t.response.token)}catch{}})},p=(e,t={})=>{let n={requestType:e,merchant_identifier:u,vendorIdentifier:d,...t};l(`→ ${e} (no callback, one-way)`),Ps(n),s({info:`requestMiniApp sent, no callback expected`,requestType:e})};return(0,O.jsxs)(`div`,{style:{display:`flex`,flexDirection:`column`,minHeight:`100%`},children:[(0,O.jsx)(Sr,{title:n.title,titleposition:`center`,onBackIconClick:()=>l(`Back icon clicked`),onActionIconClick:()=>l(`Action icon clicked`),actionIcon:`icon-settings`}),(0,O.jsxs)(`div`,{style:{padding:12,display:`flex`,flexDirection:`column`,gap:12,flex:1},children:[(0,O.jsxs)(mr,{className:`border-radius-8`,children:[(0,O.jsx)(`div`,{style:{fontSize:11,color:`#5E646B`},children:`Identifiers from onboarding record (replaces static env)`}),(0,O.jsxs)(`div`,{style:{fontFamily:`ui-monospace, monospace`,fontSize:11,background:`#F5FAFF`,border:`1px solid #EEF0F2`,borderRadius:8,padding:8,marginTop:6},children:[`merchant_identifier: `,u,(0,O.jsx)(`br`,{}),`vendorIdentifier: `,d]}),(0,O.jsx)(`div`,{style:{fontWeight:700,fontSize:13,color:`#1C252E`,marginTop:10},children:`Title sync (useESewaDataProvider)`}),(0,O.jsx)(`div`,{style:{fontSize:11,color:`#5E646B`,marginTop:4},children:`Host logs this via data.title — ESewaAppBar stays inside Mini App DOM (spec §4 default).`}),(0,O.jsxs)(`div`,{style:{display:`flex`,gap:8,marginTop:8},children:[(0,O.jsx)(`input`,{value:i,onChange:e=>a(e.target.value),placeholder:`title`,style:{flex:1,border:`1px solid #EEF0F2`,borderRadius:8,padding:`8px 10px`,fontSize:13}}),(0,O.jsx)(dr,{size:`small`,onClick:()=>r({title:i}),children:`Update`})]}),(0,O.jsxs)(`div`,{style:{fontSize:11,marginTop:6,color:`#576C80`},children:[`Current data.title: `,(0,O.jsx)(`b`,{children:String(n.title||`—`)})]})]}),(0,O.jsxs)(`div`,{style:{display:`flex`,flexWrap:`wrap`,gap:8},children:[(0,O.jsx)(dr,{size:`small`,onClick:()=>f(`INIT_APP`,`INIT_APP_CALLBACK`),children:`INIT_APP`}),(0,O.jsx)(dr,{size:`small`,variant:`secondary`,onClick:()=>f(`USER_DETAIL_ACCESS`,`USER_DETAIL_ACCESS_CALLBACK`),children:`USER_DETAIL`}),(0,O.jsx)(dr,{size:`small`,variant:`secondary`,onClick:()=>f(`LOCATION_ACCESS`,`LOCATION_ACCESS_CALLBACK`),children:`LOCATION`}),(0,O.jsx)(dr,{size:`small`,variant:`secondary`,onClick:()=>f(`MEDIA_ACCESS`,`MEDIA_ACCESS_CALLBACK`),children:`MEDIA`}),(0,O.jsx)(dr,{size:`small`,variant:`secondary`,onClick:()=>f(`VALIDATE_TRANSACTION`,`VALIDATE_TRANSACTION_CALLBACK`),children:`VALIDATE_TXN`}),(0,O.jsx)(dr,{size:`small`,onClick:()=>f(`REQUEST_PAYMENT`,`REQUEST_PAYMENT_CALLBACK`,{data:{product_code:`NP-ES-VIANET`,amount:28.48,properties:{productId:`3299`}}}),children:`PAY`}),(0,O.jsx)(dr,{size:`small`,variant:`secondary`,onClick:()=>f(`GET_PRODUCT`,`GET_PRODUCT_CALLBACK`),children:`GET_PRODUCT`}),(0,O.jsx)(dr,{size:`small`,variant:`secondary`,onClick:()=>f(`VALIDATE_USER`,`VALIDATE_USER_CALLBACK`,{data:{esewa_id:`9847474747`}}),children:`VALIDATE_USER`}),(0,O.jsx)(dr,{size:`small`,variant:`secondary`,onClick:()=>f(`MERCHANT_DETAIL`,`MERCHANT_DETAIL_CALLBACK`),children:`MERCHANT`}),(0,O.jsx)(dr,{size:`small`,variant:`secondary`,onClick:()=>f(`QR_SCANNER_ACCESS`,`QR_SCANNER_ACCESS_CALLBACK`),children:`QR`}),(0,O.jsx)(dr,{size:`small`,variant:`secondary`,onClick:()=>f(`FILE_DOWNLOAD_ACCESS`,`FILE_DOWNLOAD_ACCESS_CALLBACK`,{data:{fileName:`Statement-2025.pdf`,type:`url`,content:`https://example.com/sample.pdf`}}),children:`FILE_DL`}),(0,O.jsx)(dr,{size:`small`,variant:`secondary`,onClick:()=>f(`PAYMENT_REQUEST`,`PAYMENT_REQUEST_CALLBACK`),children:`PAYMENT_REQUEST`}),(0,O.jsx)(dr,{size:`small`,variant:`secondary`,onClick:()=>f(`CONNECTION_REQUEST`,`CONNECTION_REQUEST_CALLBACK`),children:`CONNECTION`}),(0,O.jsx)(dr,{size:`small`,variant:`secondary`,onClick:()=>p(`CLOSE_APP`),children:`CLOSE_APP (no cb)`})]}),(0,O.jsxs)(mr,{className:`border-radius-8`,children:[(0,O.jsx)(`div`,{style:{fontSize:11,fontWeight:700,color:`#5E646B`,letterSpacing:.5,textTransform:`uppercase`},children:`Last bridge callback`}),(0,O.jsx)(`div`,{style:{fontSize:12,marginTop:6,wordBreak:`break-all`,whiteSpace:`pre-wrap`,color:`#1C252E`},children:c}),o&&(0,O.jsx)(`pre`,{style:{marginTop:8,background:`#F5FAFF`,padding:8,borderRadius:8,border:`1px solid #EEF0F2`,overflow:`auto`,maxHeight:200,fontSize:11},children:JSON.stringify(o,null,2)})]}),(0,O.jsxs)(`div`,{style:{fontSize:10,color:`#5E646B`,lineHeight:1.5},children:[`Envelope expected: `,(0,O.jsxs)(`code`,{children:[`{`,`requestType, responseType: 'success'|'error', response: any`,`}`]}),`. Author response in Host panel then fire `,(0,O.jsx)(`code`,{children:`*_CALLBACK`}),`.`]})]})]})}function yl(e){return(0,O.jsx)(vl,{...e})}var bl=F.nav`
  position: sticky;
  top: 0;
  z-index: 20;
  background: ${J};
  border-bottom: 1px solid ${q[100]};
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
`,xl=F.button`
  border: 1px solid ${e=>e.$active?K[900]:q[100]};
  background: ${e=>e.$active?K[900]:J};
  color: ${e=>e.$active?J:K[500]};
  border-radius: 999px;
  padding: 6px 12px;
  font-size: 12px;
  font-weight: 700;
  cursor: pointer;
`;function Sl({onChange:e}){let{data:t}=vr();return(0,k.useEffect)(()=>{t?.title&&e(String(t.title))},[t?.title,e]),null}function Cl(){let[e,t]=(0,k.useState)(`discovery`),[n,r]=(0,k.useState)(null),[i,a]=(0,k.useState)(``);(0,k.useEffect)(()=>{let e=document.documentElement.getAttribute(`data-theme`);e!==`light`&&console.info(`[Host] data-theme is`,e,`— expected light after forceLightTheme patch`)},[e]);let o=n?Mc(n):null;return(0,O.jsxs)(O.Fragment,{children:[(0,O.jsxs)(bl,{children:[(0,O.jsx)(`span`,{style:{fontWeight:800,fontSize:13,color:K[900],marginRight:6},children:`Dev Nav`}),(0,O.jsx)(xl,{$active:e===`discovery`,onClick:()=>t(`discovery`),children:`eSewa Home`}),(0,O.jsx)(xl,{$active:e===`onboarding`,onClick:()=>t(`onboarding`),children:`Partner Console`}),e===`miniapp`&&o&&(0,O.jsxs)(`span`,{style:{fontSize:11,color:K[100],marginLeft:8},children:[`Active: `,(0,O.jsx)(`b`,{style:{color:G[500]},children:o.name}),` (`,o.merchant_identifier,`)`]}),e===`miniapp`&&(0,O.jsx)(xl,{onClick:()=>t(`discovery`),style:{marginLeft:`auto`},children:`← Back to Home`})]}),e===`discovery`&&(0,O.jsxs)(O.Fragment,{children:[(0,O.jsx)(nl,{onLaunchMiniApp:e=>{r(e),t(`miniapp`)},onOpenOnboarding:()=>t(`onboarding`)}),(0,O.jsx)(wc,{})]}),e===`onboarding`&&(0,O.jsxs)(O.Fragment,{children:[(0,O.jsx)(_l,{onGoDiscovery:()=>t(`discovery`),onForceLaunch:e=>{r(e),t(`miniapp`)}}),(0,O.jsx)(wc,{})]}),e===`miniapp`&&(0,O.jsx)(As,{children:(0,O.jsxs)(_r,{children:[(0,O.jsxs)(tc,{debugTitle:i,onBackToDiscovery:()=>t(`discovery`),children:[o?o.launchMode===`iframe`&&o.launchUrl?(0,O.jsx)(wl,{app:o}):(0,O.jsx)(yl,{merchantIdentifier:o.merchant_identifier,vendorIdentifier:o.vendorIdentifier}):(0,O.jsx)(`div`,{style:{padding:20,fontSize:13},children:`No app selected.`}),(0,O.jsx)(Sl,{onChange:a})]}),(0,O.jsx)(wc,{})]})})]})}function wl({app:e}){let t=k.useRef(null);return(0,k.useEffect)(()=>{let n=t.current;if(!n)return;let r=()=>{try{let t=n.contentWindow;if(!t||!window.__ESEWA_HOST__)return;t.Android=t.Android||{};let r=t.Android.requestApp;t.Android.requestApp=e=>{try{window.Android.requestApp(e)}catch{}if(typeof r==`function`&&r!==t.Android.requestApp)try{r.call(t.Android,e)}catch{}},t.webkit=t.webkit||{},t.webkit.messageHandlers=t.webkit.messageHandlers||{},t.webkit.messageHandlers.iOSNative=t.webkit.messageHandlers.iOSNative||{};let i=t.webkit.messageHandlers.iOSNative.postMessage;t.webkit.messageHandlers.iOSNative.postMessage=e=>{let n=typeof e==`string`?e:JSON.stringify(e);try{window.webkit.messageHandlers.iOSNative.postMessage(n)}catch{}if(typeof i==`function`&&i!==t.webkit.messageHandlers.iOSNative.postMessage)try{i.call(t.webkit.messageHandlers.iOSNative,e)}catch{}},t.flutter_inappwebview=t.flutter_inappwebview||{};let a=t.flutter_inappwebview.callHandler;t.flutter_inappwebview.callHandler=(e,n)=>{if(e===`eSewaHandler`){let t=typeof n==`string`?n:JSON.stringify(n);try{window.flutter_inappwebview.callHandler(e,t)}catch{}}if(typeof a==`function`&&a!==t.flutter_inappwebview.callHandler)try{a.call(t.flutter_inappwebview,e,n)}catch{}};let o=window.Android,s=t.Android,c={set(e,t,n){if(e[t]=n,typeof t==`string`&&t.endsWith(`_CALLBACK`)){o[t]=n;let e=window;e.iOSNative=e.iOSNative||{},e.iOSNative[t]=n,e.flutter_inappwebview=e.flutter_inappwebview||{},e.flutter_inappwebview[t]=n}return!0},get(e,t){return e[t]}};try{t.Android=new Proxy(s,c),t.Android.requestApp=s.requestApp}catch{}console.info(`[Host] Bridge forwarded to iframe`,e.launchUrl)}catch(e){console.warn(`[Host] Failed to inject bridge into iframe`,e)}};return n.addEventListener(`load`,r),()=>n.removeEventListener(`load`,r)},[e.launchUrl]),(0,O.jsx)(`iframe`,{ref:t,src:e.launchUrl,title:e.name,style:{width:`100%`,height:`100%`,minHeight:640,border:`none`,background:J},sandbox:`allow-scripts allow-same-origin allow-forms allow-popups`})}re(),de.createRoot(document.getElementById(`root`)).render((0,O.jsx)(k.StrictMode,{children:(0,O.jsx)(Cl,{})}));