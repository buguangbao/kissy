/*
Copyright 2011, KISSY UI Library v1.20dev
MIT Licensed
build time: Aug 2 22:27
*/
KISSY.add("event/base",function(t,a,h,i){function p(b,f,n){if((n=t.trim(n))&&n.indexOf(w)>0){var s=d(arguments);t.each(n.split(w),function(x){var c=t.clone(s);c.splice(0,3,f,x);j[b].apply(j,c)});return true}return i}function e(b){return b&&b.nodeType!==3&&b.nodeType!==8}function l(b,f,n,s,x){var c=j.special[f]||{};if(!s.length&&(!c.setup||c.setup.call(b)===false))o(b,f,n);c.add&&c.add.call(b,x)}var m=document,d=t.makeArray,o=m.addEventListener?function(b,f,n,s){b.addEventListener&&b.addEventListener(f,
n,!!s)}:function(b,f,n){b.attachEvent&&b.attachEvent("on"+f,n)},q=m.removeEventListener?function(b,f,n,s){b.removeEventListener&&b.removeEventListener(f,n,!!s)}:function(b,f,n){b.detachEvent&&b.detachEvent("on"+f,n)},w=" ",g="",k="trigger-none-"+t.now(),u="ksEventTargetId"+t.now(),j={_data:function(){var b=d(arguments);b.splice(1,0,u);return a.data.apply(a,b)},_removeData:function(){var b=d(arguments);b.splice(1,0,u);return a.removeData.apply(a,b)},special:{},add:function(b,f,n,s,x){if(p("add",b,
f,n,s,x))return b;a.query(b).each(function(c){var v=!c.isCustomEventTarget,r;if(!(!c||!f||!t.isFunction(n)||v&&!e(c))){(r=j._data(c))||j._data(c,r={});var B=r.events=r.events||{};B=B[f]=B[f]||[];var z={fn:n,scope:s||c,data:x},A=r.handler;if(!A){A=r.handler=function(y,C){if(!(y&&y.type==g)){var E=A.target;if(!y||!y.fixed)y=new h(E,y);t.isPlainObject(C)&&t.mix(y,C);return j._handle(E,y)}};A.target=c}if(v){l(c,f,A,B,z);c=null}B.push(z)}});return b},__getListeners:function(b,f){return(j.__getEvents(b)||
{})[f]||[]},__getEvents:function(b){return(b=j._data(b))&&b.events},remove:function(b,f,n,s,x){if(p("remove",b,f,n,s))return b;a.query(b).each(function(c){var v=j._data(c),r=v&&v.events,B,z,A,y,C,E=!c.isCustomEventTarget,G=E&&j.special[f]||{};if(!(!c||!E&&!e(c)||!r))if(f===i)for(f in r)j.remove.call(j,c,f);else{s=s||c;if(B=r[f]){z=B.length;if(n&&z){y=A=0;for(C=[];A<z;++A){var H=false,D=B[A];if(n!==D.fn||s!==D.scope){C[y++]=D;H=true}else if(x!==F){var F=D.data;if(!x&&F||F&&!x){C[y++]=D;H=true}else if(x&&
F)if(x.equals&&F.equals)if(!F.equals(x)){C[y++]=D;H=true}}!H&&G.remove&&G.remove.call(c,D)}r[f]=C;z=C.length}if(n===i||z===0){if(E&&(!G.tearDown||G.tearDown.call(c)===false))q(c,f,v.handler);delete r[f]}}if(t.isEmptyObject(r)){v.handler.target=null;delete v.handler;delete v.events;j._removeData(c)}}});return b},_handle:function(b,f){for(var n=j.__getListeners(b,f.type).slice(0),s,x,c=0,v=n.length;c<v;++c){s=n[c];s=s.fn.call(s.scope,f,s.data);if(s!==i){if(x!==false)x=s;s===false&&f.halt()}if(f.isImmediatePropagationStopped)break}return x},
fire:function(b,f,n,s){if(!p("fire",b,f,n)){var x;a.query(b).each(function(c){var v=!c.isCustomEventTarget;n=n||{};n.type=f;if(v){var r=n,B;if(e(c)){v=new h(c);t.mix(v,r);if(s){v.stopPropagation();v.preventDefault()}r=v.target=c;var z="on"+f;do{var A=(j._data(r)||{}).handler;v.currentTarget=r;A&&A.call(r,v);if(r[z]&&r[z].call(r)===false){B=false;v.preventDefault()}r=r.parentNode||r.ownerDocument||r===c.ownerDocument&&window}while(r&&!v.isPropagationStopped);if(!v.isDefaultPrevented)if(!(f==="click"&&
c.nodeName.toLowerCase()=="a")){var y;try{if(z&&c[f]){if(y=c[z])c[z]=null;g=f;c[f]()}}catch(C){}if(y)c[z]=y;g=k}}c=B;if(c!==i)x=c}else if((c=j._data(c))&&t.isFunction(c.handler))x=c.handler(i,n)});return x}},_batchForType:p,_simpleAdd:o,_simpleRemove:q};j.on=j.add;j.detach=j.remove;return j},{requires:["dom","event/object"]});
KISSY.add("event/delegate",function(t,a,h){function i(d){return d.fn===undefined&&d.selector===undefined?true:d.fn===undefined?this.selector==d.selector:this.fn==d.fn&&this.selector==d.selector&&this.scope==d.scope}function p(d,o){var q=a.closest(d.target,[o.selector],this),w;if(q)for(var g=0;g<q.length;g++){d.currentTarget=q[g];var k=o.fn.call(o.scope||this,d);if(k===false||d.isPropagationStopped||d.isImmediatePropagationStopped){if(k===false)w=k;if(d.isPropagationStopped||d.isImmediatePropagationStopped)break}}return w}
function e(d,o){var q=d.target,w=d.relatedTarget;d.type=o.preType;if(q=a.closest(q,o.selector,this))if(q!==w&&(!w||!a.contains(q,w))){d.currentTarget=q;return o.fn.call(o.scope||this,d)}}var l=h._batchForType,m={focus:{type:"focusin"},blur:{type:"focusout"},mouseenter:{type:"mouseover",handler:e},mouseleave:{type:"mouseout",handler:e}};t.mix(h,{delegate:function(d,o,q,w,g){if(l("delegate",d,o,q,w,g))return d;a.query(d).each(function(k){if(!k.isCustomEventTarget){var u=o,j=p;if(m[o]){o=m[u].type;j=
m[u].handler||j}h.on(k,o,j,k,{fn:w,selector:q,preType:u,scope:g,equals:i})}});return d},undelegate:function(d,o,q,w,g){if(l("undelegate",d,o,q,w,g))return d;a.query(d).each(function(k){if(!k.isCustomEventTarget){var u=o,j=p;if(m[o]){o=m[u].type;j=m[u].handler||j}h.remove(k,o,j,k,{fn:w,selector:q,preType:u,scope:g,equals:i})}});return d}});return h},{requires:["dom","./base"]});
KISSY.add("event/focusin",function(t,a,h){a.ie||t.each([{name:"focusin",fix:"focus"},{name:"focusout",fix:"blur"}],function(i){function p(l){return h.fire(l.target,i.name)}var e=0;h.special[i.name]={setup:function(){e++===0&&document.addEventListener(i.fix,p,true)},tearDown:function(){--e===0&&document.removeEventListener(i.fix,p,true)}}});return h},{requires:["ua","./base"]});
KISSY.add("event/hashchange",function(t,a,h,i){i=e||i.ie;if(!("onhashchange"in window)||i<8){var p=window,e=document.documentMode,l=function(){return"#"+location.href.replace(/^[^#]*#?(.*)$/,"$1")},m,d=l(),o=function(){var u=l();if(u!==d){q(u);d=u}m=setTimeout(o,50)},q=i<8?function(u){u="<html><body>"+u+"</body></html>";var j=k.contentWindow.document;try{j.open();j.write(u);j.close();return true}catch(b){return false}}:function(){a.fire(p,"hashchange")},w=function(){m||o()},g=function(){m&&clearTimeout(m);
m=null},k;if(i<8){w=function(){if(!k){k=h.create('<iframe style="display: none" height="0" width="0" tabindex="-1" title="empty"/>');h.prepend(k,document.documentElement);a.add(k,"load",function(){a.remove(k,"load");q(l());a.add(k,"load",u);o()});var u=function(){var j=t.trim(k.contentWindow.document.body.innerHTML),b=l();if(j!=b)d=location.hash=j;a.fire(p,"hashchange")}}};g=function(){m&&clearTimeout(m);m=null;a.detach(k);h.remove(k);k=null}}a.special.hashchange={setup:function(){this===p&&w()},
tearDown:function(){this===p&&g()}}}},{requires:["./base","dom","ua"]});
KISSY.add("event/mouseenter",function(t,a,h,i){i.ie||t.each([{name:"mouseenter",fix:"mouseover"},{name:"mouseleave",fix:"mouseout"}],function(p){function e(l){var m=l.relatedTarget;l.type=p.name;try{if(!(m&&m!==document&&!m.parentNode))if(m!==this&&(!m||!h.contains(this,m)))a._handle(this,l)}catch(d){}}a.special[p.name]={setup:function(){a.add(this,p.fix,e)},tearDown:function(){a.remove(this,p.fix,e)}}});return a},{requires:["./base","dom","ua"]});
KISSY.add("event/object",function(t,a){function h(e,l,m){this.currentTarget=e;this.originalEvent=l||{};if(l){this.type=l.type;this._fix()}else{this.type=m;this.target=e}this.currentTarget=e;this.fixed=true}var i=document,p="altKey attrChange attrName bubbles button cancelable charCode clientX clientY ctrlKey currentTarget data detail eventPhase fromElement handler keyCode layerX layerY metaKey newValue offsetX offsetY originalTarget pageX pageY prevValue relatedNode relatedTarget screenX screenY shiftKey srcElement target toElement view wheelDelta which".split(" ");
t.augment(h,{_fix:function(){var e=this.originalEvent,l=p.length,m,d=this.currentTarget;for(d=d.nodeType===9?d:d.ownerDocument||i;l;){m=p[--l];this[m]=e[m]}if(!this.target)this.target=this.srcElement||i;if(this.target.nodeType===3)this.target=this.target.parentNode;if(!this.relatedTarget&&this.fromElement)this.relatedTarget=this.fromElement===this.target?this.toElement:this.fromElement;if(this.pageX===a&&this.clientX!==a){e=d.documentElement;l=d.body;this.pageX=this.clientX+(e&&e.scrollLeft||l&&l.scrollLeft||
0)-(e&&e.clientLeft||l&&l.clientLeft||0);this.pageY=this.clientY+(e&&e.scrollTop||l&&l.scrollTop||0)-(e&&e.clientTop||l&&l.clientTop||0)}if(this.which===a)this.which=this.charCode!==a?this.charCode:this.keyCode;if(this.metaKey===a)this.metaKey=this.ctrlKey;if(!this.which&&this.button!==a)this.which=this.button&1?1:this.button&2?3:this.button&4?2:0},preventDefault:function(){var e=this.originalEvent;if(e.preventDefault)e.preventDefault();else e.returnValue=false;this.isDefaultPrevented=true},stopPropagation:function(){var e=
this.originalEvent;if(e.stopPropagation)e.stopPropagation();else e.cancelBubble=true;this.isPropagationStopped=true},stopImmediatePropagation:function(){var e=this.originalEvent;e.stopImmediatePropagation?e.stopImmediatePropagation():this.stopPropagation();this.isImmediatePropagationStopped=true},halt:function(e){e?this.stopImmediatePropagation():this.stopPropagation();this.preventDefault()}});return h});
KISSY.add("event/target",function(t,a){return{isCustomEventTarget:true,fire:function(h,i){return a.fire(this,h,i)},on:function(h,i,p){a.add(this,h,i,p);return this},detach:function(h,i,p){a.remove(this,h,i,p);return this}}},{requires:["./base"]});
KISSY.add("event/valuechange",function(t,a,h){function i(g){h.removeData(g,o);if(h.hasData(g,q)){var k=h.data(g,q);clearTimeout(k);h.removeData(g,q)}}function p(g){i(g.target)}function e(g){h.hasData(g,q)||h.data(g,q,setTimeout(function(){var k=g.value,u=h.data(g,o);if(k!==u){a.fire(g,d,{prevVal:u,newVal:k},true);h.data(g,o,k)}h.data(g,q,setTimeout(arguments.callee,w))},w))}function l(g){var k=g.target;g.type=="focus"&&h.data(k,o,k.value);e(k)}function m(g){i(g);a.remove(g,"blur",p);a.remove(g,"mousedown keyup keydown focus",
l)}var d="valuechange",o="event/valuechange/history",q="event/valuechange/poll",w=50;a.special[d]={setup:function(){var g=this.nodeName.toLowerCase();if("input"==g||"textarea"==g){m(this);a.on(this,"blur",p);a.on(this,"mousedown keyup keydown focus",l)}},tearDown:function(){m(this)}};return a},{requires:["./base","dom"]});
KISSY.add("event",function(t,a,h,i){a.Target=h;a.Object=i;return a},{requires:["event/base","event/target","event/object","event/focusin","event/hashchange","event/valuechange","event/delegate","event/mouseenter"]});