(function(){(function(j){function a(c){for(var c=c.split("."),d=this,k=c[0]==="window"?1:0;k<c.length;k++)d=d[c[k]]||(d[c[k]]={});return d}var p=a(j.split(".")[0]),b;b=p.Features={};if(!(b.load&&typeof b.load==="function")){var g=function(){return!0},h={},m={},n=function(){for(var c in m)m.hasOwnProperty(c)&&m[c]&&!m[c].cancelled&&m[c].load()},l=function(c,d){for(var k=h[c],b=k?k.length:0;b--;)if(k[b].name===d)return k[b];throw"InvalidArgument: Feature implementation [$1] does not exist in the registry.".replace("$1",
c+":"+d);},o=function(c,d){var k;if(!d||d==="auto")a:{for(var b=(k=h[c])?k.length:0,a=0;a<b;a++)if(k[a].readyState==="complete"||k[a].readyState==="loading"){k=k[a];break a}for(a=0;a<b;a++)if(k[a].detector()){k=k[a];break a}k=null}else k=d==="none"?null:l(c,d);return k},f=function(c){var c=c||g,d={},k,a,b;for(a in h)if(h.hasOwnProperty(a)){k=[];for(b=0;b<h[a].length;b++)c(h[a][b])&&k.push(h[a][b].name);k.length>0&&(d[a]=k)}return d},d,e=0,q=function(c,d,a,b,e,f,i){this.featureName=c;this.name=d;this.loadPath=
a;this.detector=b||g;this.dependencies=e;this.overrides=f;this.charset=i||"UTF-8";this.readyState="uninitialized"};q.prototype={onWrite:function(c){this.readyState="loading";c&&n()},onLoad:function(c){c&&this.onWrite(c);this.readyState="complete";n()},canLoad:function(c,d){for(var a=this.dependencies,b=a?a.length:0,e;b--;){if(c[a[b]]==="none")throw"InvalidState: Feature [$1] requires [$2] but it has been explicitly set to 'none'. Aborting loader.".replace("$1",this.featureName).replace("$2",a[b]);
e=o(a[b],c[a[b]]||"auto");if(!e)throw"InvalidArgument: Feature implementation [$1] does not exist in the registry.".replace("$1",a[b]);if(e.readyState==="uninitialized"||!d&&e.readyState==="loading")return!1}return!0},writeSync:function(c){this.readyState="loading";c.write('<script type="text/javascript" charset="$ENC$" src="$SRC$"><\/script>'.replace("$SRC$",this.loadPath).replace("$ENC$",this.charset));this.onLoad(!0)},writeAsync:function(c,a,d){this.readyState="loading";var b=this,e=c.createElement("script");
a&&(e.async=!1);e.type="text/javascript";e.charset=this.charset;e.onload=e.onreadystatechange=function(){var d=e.readyState;if(!d||/^(?:loaded|complete)$/i.test(d))e.onload=e.onreadystatechange=null,b.onLoadCallback&&b.onLoadCallback(c),b.onLoad(a)};e.onerror=function(c){d(c)};e.src=this.loadPath;c.getElementsByTagName("head")[0].appendChild(e);this.onWrite(a)}};q.prototype.featureName=null;q.prototype.onLoadCallback=q.prototype.onLoadCallback;q.prototype.readyState=null;var i=function(c){this.matrix=
c};i.prototype={resolve:function(c,d){var a={},b,e=this.matrix,f=c.length,i,g,o;if(d)for(b in d)a[b]=d[b];for(;f--;)for(i=(b=e[c[f]])?b.length:0;i--;)o=b[i]&&b[i].split("="),g=o[0],h[g]&&this.addToMap(o[0],o.length===2?o[1]:null,a);return a},addToMap:function(c,d,a){!d&&!a[c]?a[c]="auto":!a[c]||a[c]=="auto"?a[c]=d:this.doesOverride(c,d,a[c])&&(a[c]=d)},doesOverride:function(c,a,d){if(!a)return!1;var b=(c=l(c,a).overrides)&&c.length;if(!c)throw"InvalidState: Cannot resolve package conflict between [$1] and [$2]. There is no override specification.".replace("$1",
a).replace("$2",d);for(;b--;)if(c[b]===d)return!0;return!1}};var r=function(c,a,b,f,i){f=f||document;this.requested=c;this.onSuccess=a||g;this.onError=b||function(c){throw c;};this.doc=f;this.detectLanguage();i===void 0?(this.inHead=f.readyState!=="complete",this.writeSync=d==null?d=f.createElement("script").async:d):this.inHead=this.writeSync=i;this.id=e++;m[this.id]=this};r.prototype={onFinished:function(c){delete m[this.id];if(c)this.onError(c);else this.onSuccess()},load:function(){var c=this.requested,
a,d,b=!0,e=this;try{for(d in c)h[d]&&(a=o(d,c[d]))&&this.loadSingle(a,c,this.inHead,this.writeSync,function(c){e.onFinished(c)})&&(b=!1);b&&this.onDone()}catch(f){this.onFinished(f),this.onFinished=g}},detectLanguage:function(){var c=this.requested.language;if(c)this.requested.language=p.Language.detect(c)},onDone:function(){if(!this.done){var c=this;this.inHead||window.setTimeout(function(){c.onFinished()},1);this.done=!0}},loadSingle:function(c,a,d,b,e){if(c.readyState==="complete")return!1;else if(c.readyState===
"loading")return!0;var f,i;if(c.canLoad(a,b))d?c.writeSync(this.doc,this.id,e):c.writeAsync(this.doc,b,e);else{c=c.dependencies;for(f=c.length;f--;)i=o(c[f],a[c[f]]||"auto"),this.loadSingle(i,a,d,b,e)}return!0}};r.prototype.onFinished=r.prototype.onFinished;r.prototype.id=null;r.prototype.doc=null;b.loaders=m;b.features=h;b._detectors={};b.get=o;b.add=function(c,a,d,b,e,f,i){if(!c||!a||!d)throw"InvalidArgument: A feature implementation must have at least a feature name, name and a loadPath.";(h[c]||
(h[c]=[])).push(new q(c,a,d,b,e,f,i))};b.isLoaded=function(c,a){return l(c,a).readyState==="complete"};b.load=function(a,d,b,e,f){(new r(a,d,b,e,f)).load()};b.getFeatureMap=function(){return f(function(a){return a.featureName!="base"})};b.getLoadedMap=function(){return f(function(a){return a.featureName!="base"&&a.readyState==="complete"})};b.setFeatureMatrix=function(a){b.featureMatrix=new i(a)};b.getFeaturesFromMatrix=function(a,d){return b.featureMatrix.resolve(a,d)};a("nokia.maps").Features=b}})("nokia.maps",
this);
(function(j,a){var p=j.split(".")[0],b=j.split(".")[1],g,h=a.navigator,m=h.userLanguage||h.language,h=function(a){var b={},d;for(d=a.length;d--;){var e=a[d].split(" "),g=e[0],i={};i.key=g;i.iso639_1=g.substr(0,2);i.marc=e[1];i.locale=e[2];b[g]=i}return b}(["al ALB","ar ARA ar-SA","be BEL","bg BUL bg-BG","bn BEN","bs BOS","ca CAT","cs CZE cs-CZ","cy WEL","da DAN da-DK","de GER de-DE","el GRE el-GR","en ENG en-GB","en-us ENG en-US","es SPA es-ES","eu BAQ","et EST et-EE","fa IRN fa-IR","fi FIN fi-FI","fr FRE fr-FR",
"ga GLE","gl GLG","hi IND hi-IN","he HBR","hr SCR hr-HR","hu HUN hu-HU","id IND id-ID","id-id IND id-ID","in-id IND id-ID","is ICE is-IS","it ITA it-IT","ja JPN","km KHM","ko KOR ko-KR","ky KIR","lt LIT lt-LT","lv LAV lv-LV","me MNE","mi MAO","mk MAC","mn MON","mo MOL","ms MAY ms-MY","nl DUT nl-NL","no NOR no-NO","pl POL pl-PL","pt POR pt-PT","pt-br BRA pt-BR","py PYN","ro RUM ro-RO","ru RUS ru-RU","sk SLO sk-SK","sl SLV","sr SRB sr-RS","sv SWE sv-SE","sw SWA","ta TAM","th THA th-TH","tl PHL tl-PH",
"tr TUR tr-TR","uk UKR uk-UA","ur PAK ur-PK","vi VNM vi-VN","zh CHI zh-CN"]),n,l;a[p]||(a[p]={});g=a[p];g.Language={definitions:h,detect:function(a){var b=g.Features&&g.Features.getFeatureMap().language||["en-US"],d=b?b.length:0,e,h={},i=[];if(!n){for(l=b&&b.length>0?b[0]:"en-US";d--;)if(e=b[d].toLowerCase(),(e=this.getDefinition(e))&&e.locale&&!h[e.key])h[e.key]=e,i.push(e.locale);n=h}return a==="none"?"en-US":this.autoDetect(a)},autoDetect:function(a){var b=l,a=this.getDefinition(!a||a==="auto"?
m||b:a,n);if(!a||!a.locale)a=this.getDefinition(b,n);return a.locale},getDefinition:function(a,b){var b=b||this.definitions,d=a.toLowerCase();return d.length>=2?b[d]||b[d.substr(0,2)]:null},a:function(){nokia.maps.resources={};nokia.maps.resources.ui={};nokia.maps.resources.ui.i18n={}},setTranslations:function(a){var a=this.getDefinition(a),b=a.locale,d=b.substr(0,2).toLowerCase(),b=b.substr(3,2).toUpperCase(),e;nokia.maps.resources||this.a();e=nokia.maps.resources.ui.i18n;if(e[d]&&e[d][b])this.translations=
(new Function("return "+e[d][b].translation.json+";"))(),this.language=a}};b?(g[b]=g[b]||{},g[b].language={},g[b].language.Info=g.Language):(g.language={},g.language.Info=g.Language)})("nokia.maps",this);(function(){var j=[0.1];j.pop();j.push("");if(j[0]!==""){var a=function(a,b){var g=a[b];a[b]=function(){this.length||(this[0]="")||(this.length=0);return g.apply(this,arguments)}},j=Array.prototype;a(j,"push");a(j,"splice")}})();
(function(j,a){function p(a){var b=f[a];return function(a){g.Settings[b]=a}}var b=j.split(".")[0],g,h={},m,n,l=!1,o,f={appId:"app_id",authenticationToken:"app_code",app_id:"appId",app_code:"authenticationToken"};a[b]||(a[b]={});g=a[b];n=g.Features;m=g.Language;g.Settings=b={addObserver:function(a,b,g){(h[a]?h[a]:h[a]=[]).push({callback:b,context:g})},removeObserver:function(a,b,g){var a=h[a],i,f=0;if(a)for(i=a.length;f<i;)a[f]===b&&a[f+1]===g&&a.splice(f,2),f+=2},set:function(a,b,f){var i=this[a];
this[a]=this[a+"Setter"]?this[a+"Setter"](b):b;this.b(a,b,i,f)},b:function(a,b,f,i){if((a=h[a])&&(f!==b||i))for(i=a.length;f=a[--i];)f.callback.call(f.context||null,b)},lockLanguage:function(){l=!0},defaultLanguageSetter:function(a){var b;if(l)throw Error("Illegal: defaultLanguage cannot be set after a display was initialized");a=nokia.maps.config&&nokia.maps.config["language.overrideDetection"]?a==="auto"?m.detect(a):a:m.detect(a)||"en-US";try{b=n&&!n.isLoaded("language",a)}catch(f){b=!0}b?(b=n.getLoadedMap(),
n.load({language:a},null,null,null,!b.language||b.language.length===0?void 0:!1)):m.setTranslations(a);return a},languageLoaded:function(a){var b=l;b&&(l=!1);m.setTranslations(a);this.set("defaultLanguage",a,!0);b&&(l=!0)},defaultLanguage:"",appId:"",authenticationToken:"",app_id:"",app_code:""};for(o in f)f.hasOwnProperty(o)&&b.addObserver(o,p(o))})("nokia.maps",this);nokia.maps.Features._detectors["clustering-clustering"]=function(){return!0};nokia.maps.Features._detectors["heatmap-heatmap"]=function(){return!0};
nokia.maps.Features._detectors["ui-ovi_web"]=function(){return!0};nokia.maps.Features._detectors["ui-nokia_generic"]=function(){var j=navigator.userAgent.toLowerCase(),a=function(){var a=document.createElement("canvas");if(!a||!a.getContext)return!1;return typeof a.getContext("2d").fillText==="function"}(),p=document.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#BasicStructure","1.1"),b=j.match(/msie/)&&!window.opera&&!a,j=j.match(/msie\s7/);return a||p||b&&!j};
nokia.maps.Features._detectors["routing-nlp"]=function(){return!0};nokia.maps.Features._detectors["positioning-w3c"]=function(){var j=!1;try{j=!(!navigator||!(navigator.geolocation&&typeof navigator.geolocation.getCurrentPosition==="function"))}catch(a){}return j};nokia.maps.Features._detectors["behavior-touch"]=function(){return!0};nokia.maps.Features._detectors["behavior-all"]=function(){return!0};nokia.maps.Features._detectors["map-render-display"]=function(){return!0};
nokia.maps.Features._detectors["gfx-vml"]=function(){var j=navigator.userAgent.match(/MSIE ([\d.]+)/);return!!j&&j[1]<9};nokia.maps.Features._detectors["gfx-svg"]=function(){return document.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#BasicStructure","1.1")};nokia.maps.Features._detectors["gfx-canvas"]=function(){try{var j=typeof document.createElement("CANVAS").getContext("2d").fillText==="function"&&!/MSIE (\d+\.\d+);/.test(navigator.userAgent)}catch(a){}return j||!1};
nokia.maps.Features._detectors["kml-kml"]=function(){return!0};this.nokia.maps=this.nokia.maps||{};this.nokia.maps.build="nokiamapsapi-2.5.3-Titania-20131113-w45-rb5f869e340f512117a133fa4eceea9e736215d98";
(function(j){var a=j.config||{};a.reporter={full:"http://mapcreator.nokia.com/mapfeedback/widget/1.1.6/"};a.packages=a.packages||{routing:[{name:"nlp",dependencies:["map"]}],positioning:[{name:"w3c"}],map:[{name:"render-display",dependencies:["gfx","language"]}],behavior:[{name:"all"},{name:"touch"}],gfx:[{name:"canvas"},{name:"svg"},{name:"vml"}],ui:[{name:"nokia_generic",dependencies:["gfx","map"]},{name:"ovi_web",dependencies:["map"]}],language:[{name:"en-US"},{name:"en-GB"},{name:"de-DE"},{name:"es-ES"},
{name:"zh-CN"},{name:"fr-FR"},{name:"ru-RU"},{name:"it-IT"}],kml:[{name:"kml"}],heatmap:[{name:"heatmap",dependencies:["map"]}],clustering:[{name:"clustering",dependencies:["map"]}]};(function(){try{var a=document.createElement("canvas");return!(!window.WebGLRenderingContext||!a.getContext("webgl")&&!a.getContext("experimental-webgl"))}catch(b){return!1}})();a.excludePackaging={advsearch:1,advertising:1,advrouting:1,search:1};a.externalPackages=a.externalPackages||{places:[{name:"dataonly",url:a.places?
a.places.devPath:null,fileName:"jsPlacesDataAPI.js",detector:function(){return!nokia.places},overrides:[]},{name:"withui",url:a.places?a.places.devPath:null,fileName:"jsPlacesAPI.js",detector:function(){return!(nokia.places&&nokia.places.ui)},overrides:["dataonly"]}]};a.featureMatrix=a.featureMatrix||{maps:["gfx","behavior","map","positioning","ui","places","language"],positions:["gfx","behavior","map","positioning","ui","places","language"],places:["places=withui"],placesdata:["places=dataonly"],
directions:["gfx","behavior","map","positioning","routing","ui","places","language"],datarendering:["gfx","behavior","map","ui","places","kml","heatmap","clustering","language"],all:["gfx","behavior","map","ui","positioning","routing","places=withui","kml","heatmap","clustering","language"]};a.advertisement=a.advertisement||{endpoint:"http://onboard.lcpapi.lpaweb.net/nmg/",properties:{os:"js",device:"desktop",pub:"grouptest",app:"nokiamaps",output:"json"}};a.routing=a.routing||{baseUrl:"http://route{serviceMode}.api.here.com/routing/7.2/",
protocol:"nokia.maps.routing.navteq.protocolV72"};a.assetsPath=a.assetsPath||"assets/ovi/mapsapi";a.adbarCss=a.adbarCss||"adbar.css";a.tileProviders=a.tileProviders||"nokia.maps.map.js.nlpTileProviders";a.copyrightsInclude=a.copyrightsInclude||"nokia.maps.map._Copyright";a.copyrights=a.copyrights||"http://1.base.maps{serviceMode}.api.here.com/maptile/2.1/copyright/newest";a["language.warnOnMissingTranslation"]=a["language.warnOnMissingTranslation"]||!1;a.includePlaces=!0;j.config=a})(this.nokia.maps);
nokia.maps.config=this.nokia.maps.config;
(function(){function j(a){d=a.dependencies||[];d.push("base");o=n+"-"+a.name;e.add(n,a.name,g+o+".js",e._detectors[o],d,a.overrides)}function a(a){for(var b=/([\\?&]([^=]+)=([^&#]+))/g,c,d={};c=b.exec(a);)d[c[2]]=c[3];return d}function p(){if(m["jsl.js"])return m["jsl.js"];for(var a="jsl.js".replace(".","\\."),b=document.getElementsByTagName("script"),c=b.length,a=RegExp("^(.*\\/"+a+".*|"+a+".*)");c--;)if(a.test(b[c].src))return m["jsl.js"]=b[c].src,m["jsl.js"];throw"InternalError: could not locate jsl.js in the environment.";
}var b=nokia.maps.config,g,h,m={};if(!b.developmentMode&&!b.assetsPath)throw"Internal Error: no asset path has been specified";g=b.loadPath||function(a){a=a.split("/").slice(0,-1);return a.join("/")+(a.length>0?"/":"")}(p());h=b.params||a(p());var n,l,o,f,d,e=nokia.maps.Features,q=this;for(n in b.packages){l=b.packages[n];for(f=0;f<l.length;f++)j(l[f])}if(b.externalPackages)for(n in b.externalPackages){l=b.externalPackages[n];for(f=0;f<l.length;f++)e.add(n,l[f].name,(l[f].url?l[f].url:g)+l[f].fileName,
l[f].detector,l[f].dependencies,l[f].overrides)}e.add("base","noovi",g+"base_noovi.js",function(){return q.ovi&&q.ovi.win});e.add("base","withovi",g+"base.js",function(){return!q.ovi||!q.ovi.win});b.params=h;b.baseUrl=g;b.featureMatrix?(e.setFeatureMatrix(b.featureMatrix),b=h["with"]?h["with"].split(","):["maps"],delete h["with"],b=e.getFeaturesFromMatrix(b,h)):b=h;h.blank||e.load(b,null,function(a){throw a;})})("nokia.maps",this);})();
