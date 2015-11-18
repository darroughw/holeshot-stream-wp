!function(e,n,t){function a(e,n){return typeof e===n}function o(){var e,n,t,o,r,i,c;for(var u in s){if(e=[],n=s[u],n.name&&(e.push(n.name.toLowerCase()),n.options&&n.options.aliases&&n.options.aliases.length))for(t=0;t<n.options.aliases.length;t++)e.push(n.options.aliases[t].toLowerCase());for(o=a(n.fn,"function")?n.fn():n.fn,r=0;r<e.length;r++)i=e[r],c=i.split("."),1===c.length?l[c[0]]=o:(!l[c[0]]||l[c[0]]instanceof Boolean||(l[c[0]]=new Boolean(l[c[0]])),l[c[0]][c[1]]=o),f.push((o?"":"no-")+c.join("-"))}}function r(e){var n=d.className,t=l._config.classPrefix||"";if(h&&(n=n.baseVal),l._config.enableJSClass){var a=new RegExp("(^|\\s)"+t+"no-js(\\s|$)");n=n.replace(a,"$1"+t+"js$2")}l._config.enableClasses&&(n+=" "+t+e.join(" "+t),h?d.className.baseVal=n:d.className=n)}function i(e,n){if("object"==typeof e)for(var t in e)u(e,t)&&i(t,e[t]);else{e=e.toLowerCase();var a=e.split("."),o=l[a[0]];if(2==a.length&&(o=o[a[1]]),"undefined"!=typeof o)return l;n="function"==typeof n?n():n,1==a.length?l[a[0]]=n:(!l[a[0]]||l[a[0]]instanceof Boolean||(l[a[0]]=new Boolean(l[a[0]])),l[a[0]][a[1]]=n),r([(n&&0!=n?"":"no-")+a.join("-")]),l._trigger(e,n)}return l}var s=[],c={_version:"3.0.0-alpha.4",_config:{classPrefix:"",enableClasses:!0,enableJSClass:!0,usePrefixes:!0},_q:[],on:function(e,n){var t=this;setTimeout(function(){n(t[e])},0)},addTest:function(e,n,t){s.push({name:e,fn:n,options:t})},addAsyncTest:function(e){s.push({name:null,fn:e})}},l=function(){};l.prototype=c,l=new l;var u,f=[],d=n.documentElement,h="svg"===d.nodeName.toLowerCase();!function(){var e={}.hasOwnProperty;u=a(e,"undefined")||a(e.call,"undefined")?function(e,n){return n in e&&a(e.constructor.prototype[n],"undefined")}:function(n,t){return e.call(n,t)}}(),c._l={},c.on=function(e,n){this._l[e]||(this._l[e]=[]),this._l[e].push(n),l.hasOwnProperty(e)&&setTimeout(function(){l._trigger(e,l[e])},0)},c._trigger=function(e,n){if(this._l[e]){var t=this._l[e];setTimeout(function(){var e,a;for(e=0;e<t.length;e++)(a=t[e])(n)},0),delete this._l[e]}},l._q.push(function(){c.addTest=i});h||!function(e,n){function t(e,n){var t=e.createElement("p"),a=e.getElementsByTagName("head")[0]||e.documentElement;return t.innerHTML="x<style>"+n+"</style>",a.insertBefore(t.lastChild,a.firstChild)}function a(){var e=E.elements;return"string"==typeof e?e.split(" "):e}function o(e,n){var t=E.elements;"string"!=typeof t&&(t=t.join(" ")),"string"!=typeof e&&(e=e.join(" ")),E.elements=t+" "+e,l(n)}function r(e){var n=y[e[g]];return n||(n={},v++,e[g]=v,y[v]=n),n}function i(e,t,a){if(t||(t=n),f)return t.createElement(e);a||(a=r(t));var o;return o=a.cache[e]?a.cache[e].cloneNode():p.test(e)?(a.cache[e]=a.createElem(e)).cloneNode():a.createElem(e),!o.canHaveChildren||m.test(e)||o.tagUrn?o:a.frag.appendChild(o)}function s(e,t){if(e||(e=n),f)return e.createDocumentFragment();t=t||r(e);for(var o=t.frag.cloneNode(),i=0,s=a(),c=s.length;c>i;i++)o.createElement(s[i]);return o}function c(e,n){n.cache||(n.cache={},n.createElem=e.createElement,n.createFrag=e.createDocumentFragment,n.frag=n.createFrag()),e.createElement=function(t){return E.shivMethods?i(t,e,n):n.createElem(t)},e.createDocumentFragment=Function("h,f","return function(){var n=f.cloneNode(),c=n.createElement;h.shivMethods&&("+a().join().replace(/[\w\-:]+/g,function(e){return n.createElem(e),n.frag.createElement(e),'c("'+e+'")'})+");return n}")(E,n.frag)}function l(e){e||(e=n);var a=r(e);return!E.shivCSS||u||a.hasCSS||(a.hasCSS=!!t(e,"article,aside,dialog,figcaption,figure,footer,header,hgroup,main,nav,section{display:block}mark{background:#FF0;color:#000}template{display:none}")),f||c(e,a),e}var u,f,d="3.7.2",h=e.html5||{},m=/^<|^(?:button|map|select|textarea|object|iframe|option|optgroup)$/i,p=/^(?:a|b|code|div|fieldset|h1|h2|h3|h4|h5|h6|i|label|li|ol|p|q|span|strong|style|table|tbody|td|th|tr|ul)$/i,g="_html5shiv",v=0,y={};!function(){try{var e=n.createElement("a");e.innerHTML="<xyz></xyz>",u="hidden"in e,f=1==e.childNodes.length||function(){n.createElement("a");var e=n.createDocumentFragment();return"undefined"==typeof e.cloneNode||"undefined"==typeof e.createDocumentFragment||"undefined"==typeof e.createElement}()}catch(t){u=!0,f=!0}}();var E={elements:h.elements||"abbr article aside audio bdi canvas data datalist details dialog figcaption figure footer header hgroup main mark meter nav output picture progress section summary template time video",version:d,shivCSS:h.shivCSS!==!1,supportsUnknownElements:f,shivMethods:h.shivMethods!==!1,type:"default",shivDocument:l,createElement:i,createDocumentFragment:s,addElements:o};e.html5=E,l(n)}(this,n),o(),r(f),delete c.addTest,delete c.addAsyncTest;for(var m=0;m<l._q.length;m++)l._q[m]();e.Modernizr=l}(window,document);