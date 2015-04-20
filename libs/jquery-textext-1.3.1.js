/**
 * jQuery TextExt Plugin
 * http://textextjs.com
 *
 * @version 1.3.1
 * @copyright Copyright (C) 2011 Alex Gorbatchev. All rights reserved.
 * @license MIT License
 */
(function(n){function u(){}function f(){}function h(){}function o(n,t){typeof t=="string"&&(t=t.split("."));var r=t.join(".").replace(/\.(\w)/g,function(n,t){return t.toUpperCase()}),u=t.shift(),i;return typeof(i=n[r])!=e?i=i:typeof(i=n[u])!=e&&t.length>0&&(i=o(i,t)),i}function a(){function u(n,t){r.bind(n,function(){return t.apply(i,arguments)})}var n=l.apply(arguments),i=this,r=n.length===1?i:n.shift(),t;n=n[0]||{};for(t in n)u(t,n[t])}function v(n,t){return{input:n,form:t}}var c=(JSON||{}).stringify,l=Array.prototype.slice,t,e="undefined",y="item.manager",p="plugins",r="ext",w="html.wrap",b="html.hidden",k="keys",d="preInvalidate",g="postInvalidate",nt="getFormData",tt="setFormData",it="setInputData",rt="postInit",ut="ready",ft={itemManager:f,plugins:[],ext:{},html:{wrap:'<div class="text-core"><div class="text-wrap"/><\/div>',hidden:'<input type="hidden" />'},keys:{8:"backspace",9:"tab",13:"enter!",27:"escape!",37:"left",38:"up!",39:"right",40:"down!",46:"delete",108:"numpadEnter"}},s,i;if(!c)throw new Error("JSON.stringify() not found");t=f.prototype;t.init=function(){};t.filter=function(n,t){for(var u=[],r,i=0;i<n.length;i++)r=n[i],this.itemContains(r,t)&&u.push(r);return u};t.itemContains=function(n,t){return this.itemToString(n).toLowerCase().indexOf(t.toLowerCase())==0};t.stringToItem=function(n){return n};t.itemToString=function(n){return n};t.compareItems=function(n,t){return n==t};t=u.prototype;t.init=function(t,i){var u=this,f,e,o;u._defaults=n.extend({},ft);u._opts=i||{};u._plugins={};u._itemManager=e=new(u.opts(y));t=n(t);o=n(u.opts(w));f=n(u.opts(b));t.wrap(o).keydown(function(n){return u.onKeyDown(n)}).keyup(function(n){return u.onKeyUp(n)}).data("textext",u);n(u).data({hiddenInput:f,wrapElement:t.parents(".text-wrap").first(),input:t});f.attr("name",t.attr("name"));t.attr("name",null);f.insertAfter(t);n.extend(!0,e,u.opts(r+".item.manager"));n.extend(!0,u,u.opts(r+".*"),u.opts(r+".core"));u.originalWidth=t.outerWidth();u.invalidateBounds();e.init(u);u.initPatches();u.initPlugins(u.opts(p),n.fn.textext.plugins);u.on({setFormData:u.onSetFormData,getFormData:u.onGetFormData,setInputData:u.onSetInputData,anyKeyUp:u.onAnyKeyUp});u.trigger(rt);u.trigger(ut);u.getFormData(0)};t.initPatches=function(){var t=[],i=n.fn.textext.patches,r;for(r in i)t.push(r);this.initPlugins(t,i)};t.initPlugins=function(t,i){var e=this,o,f,s=[],u;for(typeof t=="string"&&(t=t.split(/\s*,\s*|\s+/g)),u=0;u<t.length;u++)o=t[u],f=i[o],f&&(e._plugins[o]=f=new f,e[o]=function(n){return function(){return n}}(f),s.push(f),n.extend(!0,f,e.opts(r+".*"),e.opts(r+"."+o)));for(s.sort(function(n,t){return n=n.initPriority(),t=t.initPriority(),n===t?0:n<t?1:-1}),u=0;u<s.length;u++)s[u].init(e)};t.hasPlugin=function(n){return!!this._plugins[n]};t.on=a;t.bind=function(n,t){this.input().bind(n,t)};t.trigger=function(){var n=arguments;this.input().trigger(n[0],l.call(n,1))};t.itemManager=function(){return this._itemManager};t.input=function(){return n(this).data("input")};t.opts=function(n){var t=o(this._opts,n);return typeof t=="undefined"?o(this._defaults,n):t};t.wrapElement=function(){return n(this).data("wrapElement")};t.invalidateBounds=function(){var n=this,i=n.input(),r=n.wrapElement(),f=r.parent(),u=n.originalWidth+"px",t;n.trigger(d);t=i.outerHeight()+"px";i.css({width:u});r.css({width:u,height:t});f.css({height:t});n.trigger(g)};t.focusInput=function(){this.input()[0].focus()};t.serializeData=c;t.hiddenInput=function(){return n(this).data("hiddenInput")};t.getWeightedEventResponse=function(n,t){var f=this,i={},r=0,u;f.trigger(n,i,t);for(u in i)r=Math.max(r,u);return i[r]};t.getFormData=function(n){var t=this,i=t.getWeightedEventResponse(nt,n||0);t.trigger(tt,i.form);t.trigger(it,i.input)};t.onAnyKeyUp=function(n,t){this.getFormData(t)};t.onSetInputData=function(n,t){this.input().val(t)};t.onSetFormData=function(n,t){var i=this;i.hiddenInput().val(i.serializeData(t))};t.onGetFormData=function(n,t){var i=this.input().val();t[0]=v(i,i)};n(["Down","Up"]).each(function(){var n=this.toString();t["onKey"+n]=function(t){var i=this,r=i.opts(k)[t.keyCode],u=!0;return r&&(u=r.substr(-1)!="!",r=r.replace("!",""),i.trigger(r+"Key"+n),n=="Up"&&i._lastKeyDown==t.keyCode&&(i._lastKeyDown=null,i.trigger(r+"KeyPress")),n=="Down"&&(i._lastKeyDown=t.keyCode)),i.trigger("anyKey"+n,t.keyCode),u}});t=h.prototype;t.on=a;t.formDataObject=v;t.init=function(){throw new Error("Not implemented");};t.baseInit=function(t,i){var r=this;t._defaults=n.extend(!0,t._defaults,i);r._core=t;r._timers={}};t.startTimer=function(n,t,i){var r=this;r.stopTimer(n);r._timers[n]=setTimeout(function(){delete r._timers[n];i.apply(r)},t*1e3)};t.stopTimer=function(n){clearTimeout(this._timers[n])};t.core=function(){return this._core};t.opts=function(n){return this.core().opts(n)};t.itemManager=function(){return this.core().itemManager()};t.input=function(){return this.core().input()};t.val=function(n){var t=this.input();if(typeof n===e)return t.val();t.val(n)};t.trigger=function(){var n=this.core();n.trigger.apply(n,arguments)};t.bind=function(n,t){this.core().bind(n,t)};t.initPriority=function(){return 0};s=!1;i=n.fn.textext=function(t){var i;return s||(i=n.fn.textext.css)==null||(n("head").append("<style>"+i+"<\/style>"),s=!0),this.map(function(){var r=n(this),i;return t==null?r.data("textext"):(i=new u,i.init(r,t),r.data("textext",i),i.input()[0])})};i.addPlugin=function(n,t){i.plugins[n]=t;t.prototype=new i.TextExtPlugin};i.addPatch=function(n,t){i.patches[n]=t;t.prototype=new i.TextExtPlugin};i.TextExt=u;i.TextExtPlugin=h;i.ItemManager=f;i.plugins={};i.patches={}})(jQuery),function(n){function t(){}n.fn.textext.TextExtIE9Patches=t;n.fn.textext.addPatch("ie9",t);var i=t.prototype;i.init=function(n){if(navigator.userAgent.indexOf("MSIE 9")!=-1){var t=this;n.on({postInvalidate:t.onPostInvalidate})}};i.onPostInvalidate=function(){var t=this,n=t.input(),i=n.val();n.val(Math.random());n.val(i)}}(jQuery);
/**
 * jQuery TextExt Plugin
 * http://textextjs.com
 *
 * @version 1.3.1
 * @copyright Copyright (C) 2011 Alex Gorbatchev. All rights reserved.
 * @license MIT License
 */
(function(n){function i(){}n.fn.textext.TextExtAjax=i;n.fn.textext.addPlugin("ajax",i);var t=i.prototype,f="ajax.data.callback",r="ajax.cache.results",e="ajax.loading.delay",o="ajax.loading.message",s="ajax.type.delay",h="setSuggestions",c="showDropdown",u="loading",l={ajax:{typeDelay:.5,loadingMessage:"Loading...",loadingDelay:.5,cacheResults:!1,dataCallback:null}};t.init=function(n){var t=this;t.baseInit(n,l);t.on({getSuggestions:t.onGetSuggestions});t._suggestions=null};t.load=function(t){var i=this,u=i.opts(f)||function(n){return{q:n}},r;r=n.extend(!0,{data:u(t),success:function(n){i.onComplete(n,t)},error:function(n,i){console.error(i,t)}},i.opts("ajax"));n.ajax(r)};t.onComplete=function(n,t){var i=this,u=n;i.dontShowLoading();i.opts(r)==!0&&(i._suggestions=n,u=i.itemManager().filter(n,t));i.trigger(h,{result:u})};t.dontShowLoading=function(){this.stopTimer(u)};t.showLoading=function(){var n=this;n.dontShowLoading();n.startTimer(u,n.opts(e),function(){n.trigger(c,function(t){t.clearItems();var i=t.addDropdownItem(n.opts(o));i.addClass("text-loading")})})};t.onGetSuggestions=function(n,t){var i=this,u=i._suggestions,f=(t||{}).query||"";if(u&&i.opts(r)===!0)return i.onComplete(u,f);i.startTimer("ajax",i.opts(s),function(){i.showLoading();i.load(f)})}})(jQuery);
/**
 * jQuery TextExt Plugin
 * http://textextjs.com
 *
 * @version 1.3.1
 * @copyright Copyright (C) 2011 Alex Gorbatchev. All rights reserved.
 * @license MIT License
 */
(function(n){function t(){}n.fn.textext.TextExtArrow=t;n.fn.textext.addPlugin("arrow",t);var i=t.prototype,r="html.arrow",u={html:{arrow:'<div class="text-arrow"/>'}};i.init=function(t){var i=this,f;i.baseInit(t,u);i._arrow=f=n(i.opts(r));i.core().wrapElement().append(f);f.bind("click",function(n){i.onArrowClick(n)})};i.onArrowClick=function(){this.trigger("toggleDropdown");this.core().focusInput()}})(jQuery);
/**
 * jQuery TextExt Plugin
 * http://textextjs.com
 *
 * @version 1.3.1
 * @copyright Copyright (C) 2011 Alex Gorbatchev. All rights reserved.
 * @license MIT License
 */
(function(n){function f(){}n.fn.textext.TextExtAutocomplete=f;n.fn.textext.addPlugin("autocomplete",f);var t=f.prototype,e=".",i="text-selected",a=e+i,u="text-suggestion",o=e+u,v=e+"text-label",y="autocomplete.enabled",h="autocomplete.dropdown.position",p="autocomplete.dropdown.maxHeight",w="autocomplete.render",b="html.dropdown",k="html.suggestion",r="hideDropdown",c="showDropdown",l="getSuggestions",d="above",s="mousedownOnAutocomplete",g={autocomplete:{enabled:!0,dropdown:{position:"below",maxHeight:"100px"}},html:{dropdown:'<div class="text-dropdown"><div class="text-list"/><\/div>',suggestion:'<div class="text-suggestion"><span class="text-label"/><\/div>'}};t.init=function(t){var i=this,f,u;if(i.baseInit(t,g),f=i.input(),i.opts(y)===!0){i.on({blur:i.onBlur,anyKeyUp:i.onAnyKeyUp,deleteKeyUp:i.onAnyKeyUp,backspaceKeyPress:i.onBackspaceKeyPress,enterKeyPress:i.onEnterKeyPress,escapeKeyPress:i.onEscapeKeyPress,setSuggestions:i.onSetSuggestions,showDropdown:i.onShowDropdown,hideDropdown:i.onHideDropdown,toggleDropdown:i.onToggleDropdown,postInvalidate:i.positionDropdown,getFormData:i.onGetFormData,downKeyDown:i.onDownKeyDown,upKeyDown:i.onUpKeyDown});u=n(i.opts(b));u.insertAfter(f);i.on(u,{mouseover:i.onMouseOver,mousedown:i.onMouseDown,click:i.onClick});u.css("maxHeight",i.opts(p)).addClass("text-position-"+i.opts(h));n(i).data("container",u);n(document.body).click(function(n){i.isDropdownVisible()&&!i.withinWrapElement(n.target)&&i.trigger(r)});i.positionDropdown()}};t.containerElement=function(){return n(this).data("container")};t.onMouseOver=function(t){var u=this,r=n(t.target);r.is(o)&&(u.clearSelected(),r.addClass(i))};t.onMouseDown=function(){this.containerElement().data(s,!0)};t.onClick=function(t){var i=this,r=n(t.target);(r.is(o)||r.is(v))&&i.trigger("enterKeyPress");i.core().hasPlugin("tags")&&i.val("")};t.onBlur=function(){var n=this,t=n.containerElement(),i=t.data(s)===!0;n.isDropdownVisible()&&(i?n.core().focusInput():n.trigger(r));t.removeData(s)};t.onBackspaceKeyPress=function(){var n=this,t=n.val().length>0;(t||n.isDropdownVisible())&&n.getSuggestions()};t.onAnyKeyUp=function(n,t){var i=this,r=i.opts("keys."+t)!=null;i.val().length>0&&!r&&i.getSuggestions()};t.onDownKeyDown=function(){var n=this;n.isDropdownVisible()?n.toggleNextSuggestion():n.getSuggestions()};t.onUpKeyDown=function(){this.togglePreviousSuggestion()};t.onEnterKeyPress=function(){var n=this;n.isDropdownVisible()&&n.selectFromDropdown()};t.onEscapeKeyPress=function(){var n=this;n.isDropdownVisible()&&n.trigger(r)};t.positionDropdown=function(){var n=this,i=n.containerElement(),r=n.opts(h),u=n.core().wrapElement().outerHeight(),t={};t[r===d?"bottom":"top"]=u+"px";i.css(t)};t.suggestionElements=function(){return this.containerElement().find(o)};t.setSelectedSuggestion=function(t){if(t){var r=this,e=r.suggestionElements(),o=e.first(),s,f;for(r.clearSelected(),f=0;f<e.length;f++)if(s=n(e[f]),r.itemManager().compareItems(s.data(u),t)){o=s.addClass(i);break}o.addClass(i);r.scrollSuggestionIntoView(o)}};t.selectedSuggestionElement=function(){return this.suggestionElements().filter(a).first()};t.isDropdownVisible=function(){return this.containerElement().is(":visible")===!0};t.onGetFormData=function(n,t){var i=this,r=i.val(),u=r,f=r;t[100]=i.formDataObject(u,f)};t.initPriority=function(){return 200};t.onHideDropdown=function(){this.hideDropdown()};t.onToggleDropdown=function(){var n=this;n.trigger(n.containerElement().is(":visible")?r:c)};t.onShowDropdown=function(t,i){var r=this,f=r.selectedSuggestionElement().data(u),e=r._suggestions;if(!e)return r.trigger(l);n.isFunction(i)?i(r):(r.renderSuggestions(r._suggestions),r.toggleNextSuggestion());r.showDropdown(r.containerElement());r.setSelectedSuggestion(f)};t.onSetSuggestions=function(n,t){var i=this,u=i._suggestions=t.result;t.showHideDropdown!==!1&&i.trigger(u===null||u.length===0?r:c)};t.getSuggestions=function(){var n=this,t=n.val();n._previousInputValue!=t&&(t==""&&(current=null),n._previousInputValue=t,n.trigger(l,{query:t}))};t.clearItems=function(){this.containerElement().find(".text-list").children().remove()};t.renderSuggestions=function(t){var i=this;i.clearItems();n.each(t||[],function(n,t){i.addSuggestion(t)})};t.showDropdown=function(){this.containerElement().show()};t.hideDropdown=function(){var n=this,t=n.containerElement();n._previousInputValue=null;t.hide()};t.addSuggestion=function(n){var t=this,i=t.opts(w),r=t.addDropdownItem(i?i.call(t,n):t.itemManager().itemToString(n));r.data(u,n)};t.addDropdownItem=function(t){var r=this,u=r.containerElement().find(".text-list"),i=n(r.opts(k));return i.find(".text-label").html(t),u.append(i),i};t.clearSelected=function(){this.suggestionElements().removeClass(i)};t.toggleNextSuggestion=function(){var t=this,r=t.selectedSuggestionElement(),n;r.length>0?(n=r.next(),n.length>0&&r.removeClass(i)):n=t.suggestionElements().first();n.addClass(i);t.scrollSuggestionIntoView(n)};t.togglePreviousSuggestion=function(){var n=this,r=n.selectedSuggestionElement(),t=r.prev();t.length!=0&&(n.clearSelected(),t.addClass(i),n.scrollSuggestionIntoView(t))};t.scrollSuggestionIntoView=function(n){var u=n.outerHeight(),i=this.containerElement(),f=i.innerHeight(),e=i.scrollTop(),t=(n.position()||{}).top,r=null,o=parseInt(i.css("paddingTop"));t!=null&&(t+u>f&&(r=t+e+u-f+o),t<0&&(r=t+e-o),r!=null&&i.scrollTop(r))};t.selectFromDropdown=function(){var n=this,t=n.selectedSuggestionElement().data(u);t&&(n.val(n.itemManager().itemToString(t)),n.core().getFormData());n.trigger(r)};t.withinWrapElement=function(n){return this.core().wrapElement().find(n).size()>0}})(jQuery);
/**
 * jQuery TextExt Plugin
 * http://textextjs.com
 *
 * @version 1.3.1
 * @copyright Copyright (C) 2011 Alex Gorbatchev. All rights reserved.
 * @license MIT License
 */
(function(n){function i(){}n.fn.textext.TextExtFilter=i;n.fn.textext.addPlugin("filter",i);var t=i.prototype,r="filter.enabled",u={filter:{enabled:!0,items:null}};t.init=function(n){var t=this;t.baseInit(n,u);t.on({getFormData:t.onGetFormData,isTagAllowed:t.onIsTagAllowed,setSuggestions:t.onSetSuggestions});t._suggestions=null};t.onGetFormData=function(n,t){var i=this,r=i.val(),u=r,f="";i.core().hasPlugin("tags")||(i.isValueAllowed(u)&&(f=r),t[300]=i.formDataObject(u,f))};t.isValueAllowed=function(n){for(var t=this,f=t.opts("filterItems")||t._suggestions||[],e=t.itemManager(),u=!t.opts(r),i=0;i<f.length&&!u;i++)e.compareItems(n,f[i])&&(u=!0);return u};t.onIsTagAllowed=function(n,t){t.result=this.isValueAllowed(t.tag)};t.onSetSuggestions=function(n,t){this._suggestions=t.result}})(jQuery);
/**
 * jQuery TextExt Plugin
 * http://textextjs.com
 *
 * @version 1.3.1
 * @copyright Copyright (C) 2011 Alex Gorbatchev. All rights reserved.
 * @license MIT License
 */
(function(n){function i(){}n.fn.textext.TextExtFocus=i;n.fn.textext.addPlugin("focus",i);var t=i.prototype,r="html.focus",u={html:{focus:'<div class="text-focus"/>'}};t.init=function(n){var t=this;t.baseInit(n,u);t.core().wrapElement().append(t.opts(r));t.on({blur:t.onBlur,focus:t.onFocus});t._timeoutId=0};t.onBlur=function(){var n=this;clearTimeout(n._timeoutId);n._timeoutId=setTimeout(function(){n.getFocus().hide()},100)};t.onFocus=function(){var n=this;clearTimeout(n._timeoutId);n.getFocus().show()};t.getFocus=function(){return this.core().wrapElement().find(".text-focus")}})(jQuery);
/**
 * jQuery TextExt Plugin
 * http://textextjs.com
 *
 * @version 1.3.1
 * @copyright Copyright (C) 2011 Alex Gorbatchev. All rights reserved.
 * @license MIT License
 */
(function(n){function i(){}n.fn.textext.TextExtPrompt=i;n.fn.textext.addPlugin("prompt",i);var t=i.prototype,r="text-hide-prompt",u="prompt",f="html.prompt",e={prompt:"Awaiting input...",html:{prompt:'<div class="text-prompt"/>'}};t.init=function(t){var i=this,s="placeholder",o,r;i.baseInit(t,e);o=n(i.opts(f));n(i).data("container",o);i.core().wrapElement().append(o);i.setPrompt(i.opts(u));r=t.input().attr(s);r||(r=i.opts(u));t.input().attr(s,"");r&&i.setPrompt(r);n.trim(i.val()).length>0&&i.hidePrompt();i.on({blur:i.onBlur,focus:i.onFocus,postInvalidate:i.onPostInvalidate,postInit:i.onPostInit})};t.onPostInit=function(){this.invalidateBounds()};t.onPostInvalidate=function(){this.invalidateBounds()};t.invalidateBounds=function(){var n=this,t=n.input();n.containerElement().css({paddingLeft:t.css("paddingLeft"),paddingTop:t.css("paddingTop")})};t.onBlur=function(){var n=this;n.startTimer("prompt",.1,function(){n.showPrompt()})};t.showPrompt=function(){var t=this,i=t.input();n.trim(t.val()).length!==0||i.is(":focus")||t.containerElement().removeClass(r)};t.hidePrompt=function(){this.stopTimer("prompt");this.containerElement().addClass(r)};t.onFocus=function(){this.hidePrompt()};t.setPrompt=function(n){this.containerElement().text(n)};t.containerElement=function(){return n(this).data("container")}})(jQuery);
/**
 * jQuery TextExt Plugin
 * http://textextjs.com
 *
 * @version 1.3.1
 * @copyright Copyright (C) 2011 Alex Gorbatchev. All rights reserved.
 * @license MIT License
 */
(function(n){function i(){}n.fn.textext.TextExtSuggestions=i;n.fn.textext.addPlugin("suggestions",i);var t=i.prototype,r="suggestions",u={suggestions:null};t.init=function(n){var t=this;t.baseInit(n,u);t.on({getSuggestions:t.onGetSuggestions,postInit:t.onPostInit})};t.setSuggestions=function(n,t){this.trigger("setSuggestions",{result:n,showHideDropdown:t!=!1})};t.onPostInit=function(){var n=this;n.setSuggestions(n.opts(r),!1)};t.onGetSuggestions=function(n,t){var i=this,u=i.opts(r);u.sort();i.setSuggestions(i.itemManager().filter(u,t.query))}})(jQuery);
/**
 * jQuery TextExt Plugin
 * http://textextjs.com
 *
 * @version 1.3.1
 * @copyright Copyright (C) 2011 Alex Gorbatchev. All rights reserved.
 * @license MIT License
 */
(function(n){function u(){}n.fn.textext.TextExtTags=u;n.fn.textext.addPlugin("tags",u);var t=u.prototype,r=".",e="text-tags-on-top",s=r+e,i="text-tag",f=r+i,h=r+"text-tags",o=r+"text-label",c=r+"text-remove",l="tags.enabled",a="tags.items",v="html.tag",y="html.tags",p="isTagAllowed",w="tagClick",b={tags:{enabled:!0,items:null},html:{tags:'<div class="text-tags"/>',tag:'<div class="text-tag"><div class="text-button"><span class="text-label"/><a class="text-remove"/><\/div><\/div>'}};t.init=function(t){this.baseInit(t,b);var i=this,r=i.input(),u;if(i.opts(l)){u=n(i.opts(y));r.after(u);n(i).data("container",u);i.on({enterKeyPress:i.onEnterKeyPress,backspaceKeyDown:i.onBackspaceKeyDown,preInvalidate:i.onPreInvalidate,postInit:i.onPostInit,getFormData:i.onGetFormData});i.on(u,{click:i.onClick,mousemove:i.onContainerMouseMove});i.on(r,{mousemove:i.onInputMouseMove})}i._originalPadding={left:parseInt(r.css("paddingLeft")||0),top:parseInt(r.css("paddingTop")||0)};i._paddingBox={left:0,top:0};i.updateFormCache()};t.containerElement=function(){return n(this).data("container")};t.onPostInit=function(){var n=this;n.addTags(n.opts(a))};t.onGetFormData=function(n,t,i){var r=this,u=i===13?"":r.val(),f=r._formData;t[200]=r.formDataObject(u,f)};t.initPriority=function(){return 100};t.onInputMouseMove=function(n){this.toggleZIndex(n)};t.onContainerMouseMove=function(n){this.toggleZIndex(n)};t.onBackspaceKeyDown=function(){var n=this,t=n.tagElements().last();n.val().length==0&&n.removeTag(t)};t.onPreInvalidate=function(){var t=this,i=t.tagElements().last(),n=i.position();i.length>0?n.left+=i.innerWidth():n=t._originalPadding;t._paddingBox=n;t.input().css({paddingLeft:n.left,paddingTop:n.top})};t.onClick=function(t){function a(n,t){e.data(i,n);e.find(o).text(r.itemManager().itemToString(n));r.updateFormCache();s.getFormData();s.invalidateBounds();t&&s.focusInput()}var r=this,s=r.core(),u=n(t.target),l=0,e;u.is(h)?l=1:u.is(c)?(r.removeTag(u.parents(f+":first")),l=1):u.is(o)&&(e=u.parents(f+":first"),r.trigger(w,e,e.data(i),a));l&&s.focusInput()};t.onEnterKeyPress=function(){var n=this,i=n.val(),t=n.itemManager().stringToItem(i);n.isTagAllowed(t)&&(n.addTags([t]),n.core().focusInput())};t.updateFormCache=function(){var t=this,r=[];t.tagElements().each(function(){r.push(n(this).data(i))});t._formData=r};t.toggleZIndex=function(n){var t=this,r=t.input().offset(),h=n.clientX-r.left,c=n.clientY-r.top,u=t._paddingBox,f=t.containerElement(),i=f.is(s),o=h>u.left&&c>u.top;(!i&&!o||i&&o)&&f[(i?"remove":"add")+"Class"](e)};t.tagElements=function(){return this.containerElement().find(f)};t.isTagAllowed=function(n){var t={tag:n,result:!0};return this.trigger(p,t),t.result===!0};t.addTags=function(n){if(n&&n.length!=0){for(var t=this,u=t.core(),f=t.containerElement(),r,i=0;i<n.length;i++)r=n[i],r&&t.isTagAllowed(r)&&f.append(t.renderTag(r));t.updateFormCache();u.getFormData();u.invalidateBounds()}};t.getTagElement=function(t){for(var f=this,e=f.tagElements(),u,r=0;r<e.length,u=n(e[r]);r++)if(f.itemManager().compareItems(u.data(i),t))return u};t.removeTag=function(t){var r=this,f=r.core(),u;t instanceof n?(u=t,t=t.data(i)):u=r.getTagElement(t);u.remove();r.updateFormCache();f.getFormData();f.invalidateBounds()};t.renderTag=function(t){var u=this,r=n(u.opts(v));return r.find(".text-label").text(u.itemManager().itemToString(t)),r.data(i,t),r}})(jQuery),function(n){var t=document,i="getElementsByTagName",u=t[i]("head")[0]||t[i]("body")[0],r=t.createElement("style");r.innerHTML=n;u.appendChild(r)}('\n.text-core {  position: relative;}.text-core .text-wrap {  background: #fff;  position: absolute;}.text-core .text-wrap textarea, .text-core .text-wrap input {  -webkit-box-sizing: border-box;  -moz-box-sizing: border-box;  box-sizing: border-box;  -webkit-border-radius: 0px;  -moz-border-radius: 0px;  border-radius: 0px;  border: 1px solid #9daccc;  outline: none;  resize: none;  position: absolute;  z-index: 1;  background: none;  overflow: hidden;  margin: 0;  padding: 3px 5px 4px 5px;  white-space: nowrap;  font: 11px "lucida grande", tahoma, verdana, arial, sans-serif;  line-height: 13px;  height: auto;}\n.text-core .text-wrap .text-arrow {  -webkit-box-sizing: border-box;  -moz-box-sizing: border-box;  box-sizing: border-box;  position: absolute;  top: 0;  right: 0;  width: 22px;  height: 22px;  background: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAkAAAAOAQMAAADHWqTrAAAAA3NCSVQICAjb4U/gAAAABlBMVEX///8yXJnt8Ns4AAAACXBIWXMAAAsSAAALEgHS3X78AAAAHHRFWHRTb2Z0d2FyZQBBZG9iZSBGaXJld29ya3MgQ1MzmNZGAwAAABpJREFUCJljYEAF/xsY6hkY7BgYZBgYOFBkADkdAmFDagYFAAAAAElFTkSuQmCC") 50% 50% no-repeat;  cursor: pointer;  z-index: 2;}\n.text-core .text-wrap .text-dropdown {  -webkit-box-sizing: border-box;  -moz-box-sizing: border-box;  box-sizing: border-box;  padding: 0;  position: absolute;  z-index: 3;  background: #fff;  border: 1px solid #9daccc;  width: 100%;  max-height: 100px;  padding: 1px;  font: 11px "lucida grande", tahoma, verdana, arial, sans-serif;  display: none;  overflow-x: hidden;  overflow-y: auto;}.text-core .text-wrap .text-dropdown.text-position-below {  margin-top: 1px;}.text-core .text-wrap .text-dropdown.text-position-above {  margin-bottom: 1px;}.text-core .text-wrap .text-dropdown .text-list .text-suggestion {  padding: 3px 5px;  cursor: pointer;}.text-core .text-wrap .text-dropdown .text-list .text-suggestion em {  font-style: normal;  text-decoration: underline;}.text-core .text-wrap .text-dropdown .text-list .text-suggestion.text-selected {  color: #fff;  background: #6d84b4;}\n.text-core .text-wrap .text-focus {  -webkit-box-shadow: 0px 0px 6px #6d84b4;  -moz-box-shadow: 0px 0px 6px #6d84b4;  box-shadow: 0px 0px 6px #6d84b4;  position: absolute;  width: 100%;  height: 100%;  display: none;}.text-core .text-wrap .text-focus.text-show-focus {  display: block;}\n.text-core .text-wrap .text-prompt {  -webkit-box-sizing: border-box;  -moz-box-sizing: border-box;  box-sizing: border-box;  position: absolute;  width: 100%;  height: 100%;  margin: 1px 0 0 2px;  font: 11px "lucida grande", tahoma, verdana, arial, sans-serif;  color: #c0c0c0;  overflow: hidden;  white-space: pre;}.text-core .text-wrap .text-prompt.text-hide-prompt {  display: none;}\n.text-core .text-wrap .text-tags {  -webkit-box-sizing: border-box;  -moz-box-sizing: border-box;  box-sizing: border-box;  position: absolute;  width: 100%;  height: 100%;  padding: 3px 35px 3px 3px;  cursor: text;}.text-core .text-wrap .text-tags.text-tags-on-top {  z-index: 2;}.text-core .text-wrap .text-tags .text-tag {  float: left;}.text-core .text-wrap .text-tags .text-tag .text-button {  -webkit-border-radius: 2px;  -moz-border-radius: 2px;  border-radius: 2px;  -webkit-box-sizing: border-box;  -moz-box-sizing: border-box;  box-sizing: border-box;  position: relative;  float: left;  border: 1px solid #9daccc;  background: #e2e6f0;  color: #000;  padding: 0px 17px 0px 3px;  margin: 0 2px 2px 0;  cursor: pointer;  height: 16px;  font: 11px "lucida grande", tahoma, verdana, arial, sans-serif;}.text-core .text-wrap .text-tags .text-tag .text-button a.text-remove {  position: absolute;  right: 3px;  top: 2px;  display: block;  width: 11px;  height: 11px;  background: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAsAAAAhCAYAAAAPm1F2AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAALEgAACxIB0t1+/AAAAB50RVh0U29mdHdhcmUAQWRvYmUgRmlyZXdvcmtzIENTNS4xqx9I6wAAAQ5JREFUOI2dlD0WwiAQhCc8L6HHgAPoASwtSYvX8BrQxtIyveYA8RppLO1jE+LwE8lzms2yH8MCj1QoaBzH+VuUYNYMS213UlvDRamtUbXb5ZyPHuDoxwGgip3ipfvGuGzPz+vZ/coDONdzFuYCO6ramQQG0DJIE1oPBBvM6e9LqaS2FwD7FWwnVoIAsOc2Xn1jDlyd8pfPBRVOBHA8cc/3yCmQqt0jcY4LuTyAF3pOYS6wI48LAm4MUrx5JthgSQJAt5LtNgAUgEMBBIC3AL2xgo58dEPfhE9wygef89FtCeC49UwltR1pQrK2qr9vNr7uRTCBF3pOYS6wI4/zdQ8MUpxPI9hgSQL0Xyio/QBt54DzsHQx6gAAAABJRU5ErkJggg==") 0 0 no-repeat;}.text-core .text-wrap .text-tags .text-tag .text-button a.text-remove:hover {  background-position: 0 -11px;}.text-core .text-wrap .text-tags .text-tag .text-button a.text-remove:active {  background-position: 0 -22px;}')