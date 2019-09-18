import 'core-js/es6/symbol';
import 'core-js/es6/object';
import 'core-js/es6/function';
import 'core-js/es6/parse-int';
import 'core-js/es6/parse-float';
import 'core-js/es6/number';
import 'core-js/es6/math';
import 'core-js/es6/string';
import 'core-js/es6/date';
import 'core-js/es6/array';
import 'core-js/es6/regexp';
import 'core-js/es6/map';
import 'core-js/es6/weak-map';
import 'core-js/es6/set';
import 'core-js/es7/array';
import 'core-js/es7/object';
import 'core-js/es6/reflect';
import 'mutationobserver-shim';

/**
 * Required to support Web Animations `@angular/platform-browser/animations`.
 * Needed for: All but Chrome, Firefox and Opera. http://caniuse.com/#feat=web-animation
 **/
import 'web-animations-js';
 (window as any).__Zone_disable_requestAnimationFrame = true;
 (window as any).__Zone_disable_on_property = true;
 (window as any).__zone_symbol__BLACK_LISTED_EVENTS = ['scroll', 'mousemove'];
(window as any).__Zone_enable_cross_context_check = true;
import 'zone.js/dist/zone';
