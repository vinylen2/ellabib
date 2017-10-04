webpackJsonp([1],[,,,,,,,,function(t,e,n){"use strict";var i=n(19);e.a={getAll:function(){return i.a.get("books/").then(function(t){return t.data})},get:function(t){return i.a.get("books/id/"+t).then(function(t){return t.data})},getFromSlug:function(t){return i.a.get("books/slug/"+t).then(function(t){return t.data})},getFromIsbn:function(t){return i.a.get("books/isbn/"+t).then(function(t){return t.data})},getAllFromGenres:function(t){return i.a.get("books",{params:{genre:t}}).then(function(t){return t.data})},create:function(t){return i.a.post("books/",t).then(function(t){return t.data})},search:function(t){return i.a.get("books/search",{params:t}).then(function(t){return t.data})}}},,,function(t,e,n){"use strict";e.a={isAdmin:!0,cordova:{isApp:!1,isActive:!1},audio:{description:{dataUrl:"",blob:"",length:"",previous:{dataUrl:"",blob:""}},review:{dataUrl:"",blob:"",length:"",previous:{dataUrl:"",blob:""}}},saveData:function(t,e,n){this.audio[t].dataUrl=n,this.audio[t].blob=e},updateData:function(t,e,n){this.audio[t].previous.dataUrl=this.audio[t].dataUrl,this.audio[t].previous.blob=this.audio[t].blob,this.saveData(t,e,n)},restoreData:function(t){this.audio[t].dataUrl=this.audio[t].previous.dataUrl,this.audio[t].blob=this.audio[t].previous.blob},getDataUrl:function(t){return"description"===t?this.audio.description.dataUrl:this.audio.review.dataUrl}}},,,,,,,,function(t,e,n){"use strict";var i=n(171),a=n.n(i);e.a=a.a.create({baseURL:"http://localhost:3000/",withCredentials:!1})},function(t,e,n){"use strict";var i=n(19);e.a={getAll:function(t){return i.a.get("reviews/id/"+t).then(function(t){return t.data})},create:function(t){return i.a.post("reviews/",t).then(function(t){return t.data})},getInactive:function(){return i.a.get("reviews/inactive").then(function(t){return t.data})},bulkActivate:function(t){return i.a.patch("reviews/",t).then(function(t){return t.data})}}},function(t,e,n){"use strict";e.a={images:"http://37.46.165.87/images/",audio:"http://37.46.165.87/"}},,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,function(t,e,n){function i(t){n(243)}var a=n(1)(n(195),n(277),i,"data-v-43636d50",null);t.exports=a.exports},function(t,e,n){"use strict";var i=n(33),a=n(286),s=n(266),r=n.n(s),o=n(267),c=n.n(o),u=n(265),d=n.n(u),l=n(270),v=n.n(l),f=n(271),p=n.n(f),h=n(262),m=n.n(h),g=n(263),b=n.n(g),_=n(269),w=n.n(_);i.a.use(a.a),e.a=new a.a({routes:[{path:"/",name:"frontpage",component:c.a},{path:"/books",name:"books",component:r.a},{path:"/book/:slug",name:"bok",component:d.a,props:!0},{path:"/book/:slug/review",name:"publish-review",component:v.a,props:!0},{path:"/scanner",name:"scanner",component:p.a},{path:"/admin",name:"admin",component:b.a},{path:"/activate-reviews",name:"activate-reviews",component:m.a},{path:"/post-book",name:"post-book",component:w.a}]})},function(t,e,n){function i(t){n(249)}var a=n(1)(n(191),n(283),i,"data-v-7a42d257",null);t.exports=a.exports},,,,,,,,,,,,,,,,,,,,,function(t,e,n){"use strict";var i=n(19);e.a={getAll:function(){return i.a.get("genres/").then(function(t){return t.data})},create:function(t){return i.a.post("genres/",t).then(function(t){return t.data})}}},function(t,e,n){"use strict";function i(){r.a.cordova.isActive=!0}function a(){document.addEventListener("deviceready",i,!1)}Object.defineProperty(e,"__esModule",{value:!0});var s=n(33),r=n(11),o=n(168),c=n.n(o),u=n(167);if(s.a.config.productionTip=!1,"file:"===window.location.protocol||"3000"===window.location.port){var d=document.createElement("script");d.setAttribute("type","text/javascript"),d.setAttribute("src","cordova.js"),document.body.appendChild(d),r.a.cordova.isApp=!0}new s.a({el:"#app",router:u.a,template:"<App/>",components:{App:c.a},created:function(){a()}})},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=n(268),a=n.n(i);e.default={name:"app",components:{"nav-bar":a.a}}},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=n(20),a=n(21),s=n(31),r=n.n(s),o=n(166),c=n.n(o),u=n(0),d=n.n(u),l=n(17);n.n(l);e.default={components:{AudioPlayer:c.a,StarRating:r.a},data:function(){return{reviews:[],imagesUrl:a.a.images,audioUrl:a.a.audio,selectedForActivation:[],unicodeIcons:{accepted:"&#10004;",deny:"N"}}},created:function(){var t=this;setTimeout(function(){t.getReviews()})},methods:{toggleActivationArray:function(t){var e=this.selectedForActivation.indexOf(t);-1===e?this.selectedForActivation.push(t):this.selectedForActivation.splice(e,1)},toggleAccepted:function(t){this.reviews.forEach(function(e){e.id===t.id&&(e.active=!e.active)}),this.toggleActivationArray(t.id)},formattedDate:function(t){return d()(t).format("Do MMMM")},formattedAudioUrl:function(t){return[this.audioUrl+t]},getReviews:function(){var t=this;i.a.getInactive().then(function(e){t.reviews=e.data})},activateReviews:function(){var t=this;i.a.bulkActivate(this.selectedForActivation).then(function(e){console.log(e.data),t.getReviews()})}}}},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={name:"admin",components:{},data:function(){return{}},methods:{}}},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=n(289),a=n.n(i),s=n(169),r=n.n(s),o=n(170),c=n.n(o),u=n(288),d=n.n(u);e.default={name:"audio-editor",data:function(){return{wavesurfer:null,history:[],time:{selected:0,length:""},isPlaying:!1,unicodeIcons:{edit:"&#x2702;",play:"&#9658;",undo:"&#8634;"}}},props:{dataUrl:"",source:"",isEditing:!1},computed:{roundedTime:function(){return this.time.selected.toFixed(1)},waveformId:function(){return"waveform-"+this.source}},watch:{dataUrl:function(){this.resetWavesurfer()}},created:function(){var t=this;this.$nextTick(function(){t.initiateWavesurfer()})},methods:{resetWavesurfer:function(){this.wavesurfer.destroy(),this.initiateWavesurfer()},cutBlob:function(){var t=this.wavesurfer.regions.list[1],e=t.start,n=t.end;this.newSlice(1e3*e,1e3*n),this.isEdited=!0},undoSlice:function(){this.audiobufferToWav(this.history.pop())},newSlice:function(t,e){var n=this;r()(this.wavesurfer.backend.buffer,t,e,function(t,e){t?console.log(t):(n.history.push(n.wavesurfer.backend.buffer),n.audiobufferToWav(e))})},audiobufferToWav:function(t){var e=c()(t),n=new Blob([new DataView(e)],{type:"audio/wav"});this.$emit("cut",n)},initiateWavesurfer:function(){var t=this;this.wavesurfer=a.a.create({container:"#"+this.waveformId,waveColor:"violet",plugins:[d.a.create({enableDragSelection:!1})]}),this.wavesurfer.load(this.dataUrl),this.wavesurfer.on("ready",function(){t.wavesurfer.addRegion({id:1,start:.2,end:1,resize:!0,drag:!1,color:"rgba(0, 0, 0, 0)"})})},play:function(){var t=this;this.isEditing&&(this.wavesurfer.playPause(),this.isPlaying=!0,this.interval=setInterval(function(){var e=parseFloat(t.wavesurfer.getCurrentTime());t.$set(t.time,"selected",e)},100))},pause:function(){this.isEditing&&(this.wavesurfer.pause(),this.isPlaying=!1,clearInterval(this.interval))},setTime:function(){var t=this;this.$nextTick(function(){var e=parseFloat(t.wavesurfer.getCurrentTime());t.$set(t.time,"selected",e)})}}}},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=n(261),a=n.n(i);e.default={mixins:[a.a],props:["small"],data:function(){return{unicodeIcons:{play:"►",pause:"&nbsp;&#9612&#9612",reset:"&#8634;"}}},methods:{reset:function(){this.setSeek(0),this.play()}}}},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=n(8),a=n(20),s=n(21),r=n(166),o=n.n(r),c=n(31),u=n.n(c),d=n(0),l=n.n(d),v=n(17);n.n(v);e.default={components:{"audio-player":o.a,StarRating:u.a},data:function(){return{imagesUrl:s.a.images,audioUrl:s.a.audio,reviews:[],randomDescription:{},currentBook:{},author:{name:"",id:null},genre:{name:"",slug:"",id:null}}},created:function(){var t=this;setTimeout(function(){t.getBookFromSlug()})},methods:{formattedAudioUrl:function(t){return[this.audioUrl+t]},formattedDate:function(t){return l()(t).format("Do MMMM")},randomizeNumber:function(t){return Math.floor(Math.random()*(t+1))},getBookFromSlug:function(){var t=this;i.a.getFromSlug(this.$route.params.slug).then(function(e){var n=e.data.reviews,i=t.randomizeNumber(n.length-1);t.currentBook=e.data,t.author.name=e.data.authors[0].firstname+" "+e.data.authors[0].lastname,t.author.id=e.data.authors[0].id,t.genre=e.data.genres[0],t.reviews=n,t.randomDescription=n[i]})},getReviews:function(t){var e=this;a.a.getAll(t).then(function(t){e.reviews=t.data})}}}},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=n(39),a=n.n(i),s=n(8),r=n(189),o=n(21);e.default={name:"books",props:["genre"],data:function(){return{selected:"",imagesUrl:o.a.images,busy:!1,books:[],image:"",genres:[],queryParams:{genre:[]}}},created:function(){this.getGenres(),this.$route.params.genre?this.addGenreToQuery(this.$route.params.genre):this.getBooks()},methods:{loadMore:function(){var t=this;setTimeout(function(){console.log("fetching"),t.busy=!0,t.getNewBooks().then(function(e){var n=t.books.concat(e);t.books=n,t.busy=!1})},1e3)},addGenreToQuery:function(t){this.queryParams.genre[0]===t.id?(this.getBooks(),this.queryParams.genre.pop()):(this.queryParams.genre[0]=t.id,this.getBooksFromGenres())},toggleSelected:function(t){this.selected===t?this.selected="":this.selected=t,this.addGenreToQuery(t)},getBooksFromGenres:function(){var t=this;s.a.getAllFromGenres(this.$data.queryParams.genre.join(",")).then(function(e){t.books=e.data})},getBooks:function(){var t=this;s.a.getAll().then(function(e){t.books=e.data})},getNewBooks:function(){return new a.a(function(t){s.a.getAll().then(function(e){t(e.data)})})},getGenres:function(){var t=this;r.a.getAll().then(function(e){t.genres=e.data,t.$route.params.genre&&t.genres.forEach(function(e){e.id===t.$route.params.genre.id&&(t.selected=e)})})}}}},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={name:"frontpage"}},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=n(11);e.default={name:"navbar",computed:{isCordovaApp:function(){return i.a.cordova.isApp},isAdmin:function(){return i.a.isAdmin}}}},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=n(8);e.default={name:"post-book",data:function(){return{manual:!1}},methods:{barcodeScanner:function(){var t=this;window.cordova.plugins.barcodeScanner.scan(function(e){t.postBook({isbn:e.text,scanned:!0}).then(function(){})},function(t){alert("Scanning failed: "+t)})},postBook:function(t){i.a.create(t).then(function(t){console.log(t.data)})}}}},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=n(204),a=n.n(i),s=n(8),r=n(20),o=n(31),c=n.n(o),u=n(272),d=n.n(u);e.default={name:"publish-review",components:{"vue-record":d.a,"star-rating":c.a},props:["book"],data:function(){return{currentBook:{},review:{description:"",review:"",rating:0,reviewerId:null,bookId:null},audio:{description:"",review:""},published:!1}},created:function(){this.getData()},computed:{reviewFormData:function(){var t=this,e=new FormData;return a()(this.review).forEach(function(n){e.append(n,t.review[n])}),e.append("descriptionRecording",this.audio.description,this.$route.params.slug),e.append("reviewRecording",this.audio.review,this.$route.params.slug),e}},methods:{updateAudio:function(t,e){console.log(t),this.audio[e]=t},getData:function(){this.book?(this.currentBook=this.book,this.review.bookId=this.book.id):this.getBookFromSlug()},getBookFromSlug:function(){var t=this;s.a.getFromSlug(this.$route.params.slug).then(function(e){t.currentBook=e.data,t.review.bookId=e.data.id})},postReview:function(){var t=this;r.a.create(this.reviewFormData).then(function(){t.published=!0})}}}},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=n(39),a=n.n(i),s=n(8),r=n(11);e.default={name:"scanner",computed:{isCordovaApp:function(){return r.a.cordova.isApp}},methods:{barcodeScanner:function(){var t=this;window.cordova.plugins.barcodeScanner.scan(function(e){t.getBookFromIsbn(e.text).then(function(e){t.$router.push("/book/"+e)}).catch(function(){console.log("nothing returned from API")})},function(t){alert("Scanning failed: "+t)})},getBookFromIsbn:function(t){return new a.a(function(e,n){s.a.getFromIsbn(t).then(function(t){e(t.data.slug)}).catch(function(t){n(t)})})}},data:function(){return{}}}},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=n(260),a=n.n(i),s=(n(11),n(257)),r=n.n(s),o=n(264),c=n.n(o);e.default={components:{"audio-editor":c.a},props:{blob:"",source:"",options:{default:function(){return{type:"audio",mimeType:"video/webm",bufferSize:0,sampleRate:44100,leftChannel:!1,disableLogs:!1}}}},data:function(){return{localBlob:this.blob,dataUrl:"",Timer:r()(),recordingLength:"",isRecording:!1,isEditing:!1,newRecording:0,unicodeIcons:{play:"&#9658;",record:"&#9679;",stop:"&#9632;",edit:"&#x2702;"}}},methods:{updateData:function(t){this.dataUrl=URL.createObjectURL(t),this.localBlob=t,this.$emit("updateBlob",t,this.source)},startTimer:function(){var t=this;this.Timer.start(),this.recordingLength=0,this.interval=window.setInterval(function(){var e=t.Timer.elapsedTime();t.recordingLength=(e/1e3).toFixed(1)},500)},stopTimer:function(t){this.updateData(t),window.clearInterval(this.interval),this.isEditing=!0},captureUserMedia:function(t,e,n){if(!!/BB10|BlackBerry/i.test(navigator.userAgent||"")&&(navigator.getUserMedia||navigator.webkitGetUserMedia||navigator.mozGetUserMedia))return navigator.getUserMedia=navigator.getUserMedia||navigator.webkitGetUserMedia||navigator.mozGetUserMedia,void navigator.getUserMedia(t,e,n);navigator.mediaDevices.getUserMedia(t).then(e).catch(n)},_addStreamStopListener:function(t,e){var n="ended";"oninactive"in t&&(n="inactive"),this._stream.addEventListener(n,function(){e(),e=function(){}},!1),this._stream.getAudioTracks().forEach(function(t){t.addEventListener(n,function(){e(),e=function(){}},!1)})},startRecording:function(){var t=this;this.captureUserMedia({audio:!0},function(e){t.$emit("record:start"),t.isRecording=!0,t._stream=e,t._recordRTC=a()(e,t.options),t._recordRTC.startRecording(),t._addStreamStopListener(e,function(){t.isRecording=!1})},function(e){t.$emit("record:error"),t.isRecording=!1}),this.startTimer()},stopRecording:function(){var t=this;this._recordRTC.stopRecording(function(){t._stream.stop(),t.stopTimer(t._recordRTC.getBlob())})},deleteRecording:function(){this.isEditing=!1}},destroyed:function(){this.stopRecording()}}},,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,function(t,e){},function(t,e){},function(t,e){},function(t,e){},function(t,e){},function(t,e){},function(t,e){},function(t,e){},function(t,e){},function(t,e){},function(t,e){},function(t,e){},function(t,e){},,,,,,,function(t,e,n){function i(t){return n(a(t))}function a(t){var e=s[t];if(!(e+1))throw new Error("Cannot find module '"+t+"'.");return e}var s={"./af":52,"./af.js":52,"./ar":59,"./ar-dz":53,"./ar-dz.js":53,"./ar-kw":54,"./ar-kw.js":54,"./ar-ly":55,"./ar-ly.js":55,"./ar-ma":56,"./ar-ma.js":56,"./ar-sa":57,"./ar-sa.js":57,"./ar-tn":58,"./ar-tn.js":58,"./ar.js":59,"./az":60,"./az.js":60,"./be":61,"./be.js":61,"./bg":62,"./bg.js":62,"./bn":63,"./bn.js":63,"./bo":64,"./bo.js":64,"./br":65,"./br.js":65,"./bs":66,"./bs.js":66,"./ca":67,"./ca.js":67,"./cs":68,"./cs.js":68,"./cv":69,"./cv.js":69,"./cy":70,"./cy.js":70,"./da":71,"./da.js":71,"./de":74,"./de-at":72,"./de-at.js":72,"./de-ch":73,"./de-ch.js":73,"./de.js":74,"./dv":75,"./dv.js":75,"./el":76,"./el.js":76,"./en-au":77,"./en-au.js":77,"./en-ca":78,"./en-ca.js":78,"./en-gb":79,"./en-gb.js":79,"./en-ie":80,"./en-ie.js":80,"./en-nz":81,"./en-nz.js":81,"./eo":82,"./eo.js":82,"./es":84,"./es-do":83,"./es-do.js":83,"./es.js":84,"./et":85,"./et.js":85,"./eu":86,"./eu.js":86,"./fa":87,"./fa.js":87,"./fi":88,"./fi.js":88,"./fo":89,"./fo.js":89,"./fr":92,"./fr-ca":90,"./fr-ca.js":90,"./fr-ch":91,"./fr-ch.js":91,"./fr.js":92,"./fy":93,"./fy.js":93,"./gd":94,"./gd.js":94,"./gl":95,"./gl.js":95,"./gom-latn":96,"./gom-latn.js":96,"./he":97,"./he.js":97,"./hi":98,"./hi.js":98,"./hr":99,"./hr.js":99,"./hu":100,"./hu.js":100,"./hy-am":101,"./hy-am.js":101,"./id":102,"./id.js":102,"./is":103,"./is.js":103,"./it":104,"./it.js":104,"./ja":105,"./ja.js":105,"./jv":106,"./jv.js":106,"./ka":107,"./ka.js":107,"./kk":108,"./kk.js":108,"./km":109,"./km.js":109,"./kn":110,"./kn.js":110,"./ko":111,"./ko.js":111,"./ky":112,"./ky.js":112,"./lb":113,"./lb.js":113,"./lo":114,"./lo.js":114,"./lt":115,"./lt.js":115,"./lv":116,"./lv.js":116,"./me":117,"./me.js":117,"./mi":118,"./mi.js":118,"./mk":119,"./mk.js":119,"./ml":120,"./ml.js":120,"./mr":121,"./mr.js":121,"./ms":123,"./ms-my":122,"./ms-my.js":122,"./ms.js":123,"./my":124,"./my.js":124,"./nb":125,"./nb.js":125,"./ne":126,"./ne.js":126,"./nl":128,"./nl-be":127,"./nl-be.js":127,"./nl.js":128,"./nn":129,"./nn.js":129,"./pa-in":130,"./pa-in.js":130,"./pl":131,"./pl.js":131,"./pt":133,"./pt-br":132,"./pt-br.js":132,"./pt.js":133,"./ro":134,"./ro.js":134,"./ru":135,"./ru.js":135,"./sd":136,"./sd.js":136,"./se":137,"./se.js":137,"./si":138,"./si.js":138,"./sk":139,"./sk.js":139,"./sl":140,"./sl.js":140,"./sq":141,"./sq.js":141,"./sr":143,"./sr-cyrl":142,"./sr-cyrl.js":142,"./sr.js":143,"./ss":144,"./ss.js":144,"./sv":17,"./sv.js":17,"./sw":145,"./sw.js":145,"./ta":146,"./ta.js":146,"./te":147,"./te.js":147,"./tet":148,"./tet.js":148,"./th":149,"./th.js":149,"./tl-ph":150,"./tl-ph.js":150,"./tlh":151,"./tlh.js":151,"./tr":152,"./tr.js":152,"./tzl":153,"./tzl.js":153,"./tzm":155,"./tzm-latn":154,"./tzm-latn.js":154,"./tzm.js":155,"./uk":156,"./uk.js":156,"./ur":157,"./ur.js":157,"./uz":159,"./uz-latn":158,"./uz-latn.js":158,"./uz.js":159,"./vi":160,"./vi.js":160,"./x-pseudo":161,"./x-pseudo.js":161,"./yo":162,"./yo.js":162,"./zh-cn":163,"./zh-cn.js":163,"./zh-hk":164,"./zh-hk.js":164,"./zh-tw":165,"./zh-tw.js":165};i.keys=function(){return Object.keys(s)},i.resolve=a,t.exports=i,i.id=258},,,,function(t,e,n){function i(t){n(246)}var a=n(1)(n(192),n(280),i,"data-v-64ea81a9",null);t.exports=a.exports},function(t,e,n){function i(t){n(248)}var a=n(1)(n(193),n(282),i,"data-v-74610910",null);t.exports=a.exports},function(t,e,n){function i(t){n(239)}var a=n(1)(n(194),n(273),i,null,null);t.exports=a.exports},function(t,e,n){function i(t){n(247)}var a=n(1)(n(196),n(281),i,"data-v-7323cc58",null);t.exports=a.exports},function(t,e,n){function i(t){n(240)}var a=n(1)(n(197),n(274),i,"data-v-2661fa2a",null);t.exports=a.exports},function(t,e,n){function i(t){n(250)}var a=n(1)(n(198),n(284),i,"data-v-9be61e0e",null);t.exports=a.exports},function(t,e,n){function i(t){n(242)}var a=n(1)(n(199),n(276),i,"data-v-3689edc2",null);t.exports=a.exports},function(t,e,n){function i(t){n(251)}var a=n(1)(n(200),n(285),i,"data-v-bda2a310",null);t.exports=a.exports},function(t,e,n){function i(t){n(245)}var a=n(1)(n(201),n(279),i,"data-v-574a6bf0",null);t.exports=a.exports},function(t,e,n){function i(t){n(244)}var a=n(1)(n(202),n(278),i,"data-v-547df402",null);t.exports=a.exports},function(t,e,n){function i(t){n(241)}var a=n(1)(n(203),n(275),i,"data-v-29379ab8",null);t.exports=a.exports},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"container flex-box"},[t.isPlaying?t._e():n("div",{staticClass:"button",domProps:{innerHTML:t._s(t.unicodeIcons.play)},on:{click:t.play}}),t._v(" "),t.isPlaying?n("div",{staticClass:"button",on:{click:t.pause}},[t._v("P\n  ")]):t._e(),t._v(" "),n("div",{directives:[{name:"show",rawName:"v-show",value:t.isEditing,expression:"isEditing"}],staticClass:"button"},[t._v("\n    "+t._s(t.roundedTime)+"\n  ")]),t._v(" "),n("div",{staticClass:"button edit",domProps:{innerHTML:t._s(t.unicodeIcons.edit)},on:{click:t.cutBlob}}),t._v(" "),t.history.length>0?n("div",{staticClass:"button undo",domProps:{innerHTML:t._s(t.unicodeIcons.undo)},on:{click:t.undoSlice}}):t._e(),t._v(" "),n("div",{attrs:{id:t.waveformId},on:{click:t.setTime}})])},staticRenderFns:[]}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"container"},[n("div",{staticClass:"genre-search"},t._l(t.genres,function(e){return n("div",{staticClass:"genre"},[n("img",{staticClass:"genre-icon",class:{selected:t.selected==e},attrs:{src:""+t.imagesUrl+e.slug+".png"},on:{click:function(n){t.toggleSelected(e)}}})])})),t._v(" "),n("div",{staticClass:"wrapper flex-container"},t._l(t.books,function(e){return n("div",{staticClass:"book"},[n("router-link",{staticClass:"link",attrs:{to:{name:"bok",params:{slug:e.slug}}}},[n("img",{attrs:{src:""+t.imagesUrl+e.imageUrl}}),t._v(" "),n("h3",[t._v(t._s(e.title))])])],1)}))])},staticRenderFns:[]}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"audio-recorder"},[n("div",{directives:[{name:"show",rawName:"v-show",value:t.isRecording,expression:"isRecording"}],staticClass:"button stop",domProps:{innerHTML:t._s(t.unicodeIcons.stop)},on:{click:t.stopRecording}}),t._v(" "),n("div",{directives:[{name:"show",rawName:"v-show",value:!t.isRecording,expression:"!isRecording"}],staticClass:"button record",domProps:{innerHTML:t._s(t.unicodeIcons.record)},on:{click:t.startRecording}}),t._v(" "),n("div",{directives:[{name:"show",rawName:"v-show",value:t.isRecording,expression:"isRecording"}],staticClass:"button counter"},[t._v("\n    "+t._s(t.recordingLength)+"\n  ")]),t._v(" "),t.dataUrl.length>0?n("audio-editor",{ref:"editor",staticClass:"editor",attrs:{dataUrl:t.dataUrl,source:t.source,isEditing:t.isEditing},on:{cut:t.updateData}}):t._e()],1)},staticRenderFns:[]}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("header",{staticClass:"header"},[n("div",{staticClass:"container"},[n("router-link",{attrs:{to:"/"}},[t._v("Hem")]),t._v(" "),n("router-link",{attrs:{to:"/books"}},[t._v("Böcker")]),t._v(" "),n("router-link",{directives:[{name:"show",rawName:"v-show",value:t.isCordovaApp,expression:"isCordovaApp"}],attrs:{to:"/scanner"}},[t._v("Scanner")]),t._v(" "),n("router-link",{directives:[{name:"show",rawName:"v-show",value:t.isAdmin,expression:"isAdmin"}],attrs:{to:"/post-book"}},[t._v("Lägg till bok")]),t._v(" "),n("router-link",{directives:[{name:"show",rawName:"v-show",value:t.isAdmin,expression:"isAdmin"}],attrs:{to:"/activate-reviews"}},[t._v("Aktivera recensioner")])],1)])},staticRenderFns:[]}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[t.playing?n("div",{staticClass:"button pause",domProps:{innerHTML:t._s(t.unicodeIcons.pause)},on:{click:t.togglePlayback}}):n("div",{staticClass:"button",domProps:{innerHTML:t._s(t.unicodeIcons.play)},on:{click:t.togglePlayback}}),t._v(" "),n("div",{staticClass:"button",domProps:{innerHTML:t._s(t.unicodeIcons.reset)},on:{click:t.reset}})])},staticRenderFns:[]}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"container"},[t.isCordovaApp?n("div",{staticClass:"scan button",on:{click:t.barcodeScanner}},[t._v("Tryck här för att scanna.\n  ")]):n("div",{staticClass:"browser"},[t._v("För att kunna scanna efter böcker måste du ha appen.\n  ")])])},staticRenderFns:[]}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"container"},[t.published?n("div",{staticClass:"wrapper"},[t._m(0)]):t._e(),t._v(" "),t.published?t._e():n("div",{staticClass:"wrapper"},[n("div",{staticClass:"book-description"},[n("h1",[t._v("Beskrivning")]),t._v(" "),n("textarea",{directives:[{name:"model",rawName:"v-model",value:t.review.description,expression:"review.description"}],attrs:{placeholder:"Skriv vad boken handlar om här."},domProps:{value:t.review.description},on:{input:function(e){e.target.composing||(t.review.description=e.target.value)}}}),t._v(" "),n("vue-record",{attrs:{source:"description",blob:t.audio.description},on:{updateBlob:t.updateAudio}})],1),t._v(" "),n("div",{staticClass:"book-review"},[n("h1",[t._v("Recension")]),t._v(" "),n("textarea",{directives:[{name:"model",rawName:"v-model",value:t.review.review,expression:"review.review"}],attrs:{placeholder:"Skriv din bokrecension här."},domProps:{value:t.review.review},on:{input:function(e){e.target.composing||(t.review.review=e.target.value)}}}),t._v(" "),n("vue-record",{attrs:{source:"review",blob:t.audio.review},on:{updateBlob:t.updateAudio}})],1),t._v(" "),n("div",{staticClass:"wrapper"},[n("div",{staticClass:"publish"},[n("star-rating",{attrs:{increment:1,"max-rating":5,"inactive-color":"#c2c7c9","active-color":"#c98bdb","star-size":30},model:{value:t.review.rating,callback:function(e){t.review.rating=e},expression:"review.rating"}}),t._v(" "),n("div",{staticClass:"publish-button",on:{click:t.postReview}},[t._v("Skicka")])],1)])])])},staticRenderFns:[function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"book-description"},[n("h1",[t._v("Jippi! Din recension har nu skickats in!")])])}]}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"container"},[t._l(t.reviews,function(e){return n("div",{staticClass:"reviews"},[n("div",{staticClass:"image"},[n("img",{attrs:{src:""+t.imagesUrl+e.books[0].imageUrl}})]),t._v(" "),n("div",{staticClass:"flex-container"},[n("div",{staticClass:"text-container"},[n("h1",[t._v(t._s(e.books[0].title))]),t._v(" "),n("div",{staticClass:"description-body"},[n("p",[t._v(" "+t._s(e.description)+" ")]),t._v(" "),n("audio-player",{staticClass:"audio-player",attrs:{sources:t.formattedAudioUrl(e.descriptionAudioUrl)}})],1)]),t._v(" "),n("div",{staticClass:"text-container"},[n("div",{staticClass:"review-header flex-container"},[n("div",{staticClass:"review-title"},[n("span",[t._v("Av: recencent den "+t._s(t.formattedDate(e.createdAt)))])]),t._v(" "),n("star-rating",{staticClass:"review-rating",attrs:{"read-only":!0,"max-rating":5,"inactive-color":"#c2c7c9","active-color":"#c98bdb","star-size":20},model:{value:e.rating,callback:function(t){e.rating=t},expression:"review.rating"}})],1),t._v(" "),n("div",{staticClass:"review-body"},[n("p",[t._v(t._s(e.review))]),t._v(" "),n("audio-player",{staticClass:"audio-player",attrs:{sources:t.formattedAudioUrl(e.reviewAudioUrl)}})],1)]),t._v(" "),e.active?t._e():n("div",{staticClass:"button accept",on:{click:function(n){t.toggleAccepted(e)}}}),t._v(" "),e.active?n("div",{staticClass:"button removeAccept",domProps:{innerHTML:t._s(t.unicodeIcons.accepted)},on:{click:function(n){t.toggleAccepted(e)}}}):t._e()])])}),t._v(" "),n("div",{staticClass:"publish-button",on:{click:t.activateReviews}},[t._v("Aktivera ("+t._s(t.selectedForActivation.length)+")\n  ")])],2)},staticRenderFns:[]}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"container"},[n("div",{staticClass:"wrapper"},[n("div",{staticClass:"description flex-container"},[n("div",{staticClass:"image"},[n("img",{attrs:{src:""+t.imagesUrl+t.currentBook.imageUrl}})]),t._v(" "),n("div",{staticClass:"text"},[n("header",{staticClass:"book-header"},[n("h1",[t._v(t._s(t.currentBook.title))]),t._v(" "),n("p",[t._v("av: "+t._s(t.author.name)+" ")])]),t._v(" "),n("div",{staticClass:"description-body"},[n("p",[t._v(t._s(t.randomDescription.description))]),t._v(" "),n("div",{staticClass:"buttons"},[n("audio-player",{staticClass:"audio-player",attrs:{sources:t.formattedAudioUrl(t.randomDescription.descriptionAudioUrl)}}),t._v(" "),n("router-link",{staticClass:"review-a",attrs:{to:{name:"publish-review",params:{book:t.currentBook}}}},[n("div",{staticClass:"button review-button"},[t._v("★")])]),t._v(" "),n("router-link",{attrs:{to:{name:"books",params:{genre:t.genre}}}},[n("img",{staticClass:"genre-icon",attrs:{src:""+t.imagesUrl+t.genre.slug+".png"}})])],1),t._v(" "),n("div",{staticClass:"book-information flex-container"},[n("div",{staticClass:"flex-left"},[t._v("Genre")]),t._v(" "),n("div",{staticClass:"flex-right"},[t._v(t._s(t.genre.name))]),t._v(" "),n("div",{staticClass:"flex-left"},[t._v("Sidor")]),t._v(" "),n("div",{staticClass:"flex-right"},[t._v(t._s(t.currentBook.pages))]),t._v(" "),n("div",{staticClass:"flex-left"},[t._v("Betyg")]),t._v(" "),n("div",{staticClass:"flex-right"},[n("star-rating",{attrs:{"read-only":!0,"max-rating":5,"inactive-color":"#c2c7c9","active-color":"#c98bdb","star-size":20,rtl:!0},model:{value:t.currentBook.rating,callback:function(e){t.currentBook.rating=e},expression:"currentBook.rating"}})],1)])])])]),t._v(" "),n("div",{staticClass:"reviews"},[n("h2",[t._v("Recensioner")]),t._v(" "),t._l(t.reviews,function(e){return n("div",{staticClass:"review"},[n("header",{staticClass:"review-header flex-container"},[n("div",{staticClass:"review-text"},[n("span",[t._v("\n              Av: recencent den "+t._s(t.formattedDate(e.createdAt))+"  \n            ")])]),t._v(" "),n("star-rating",{staticClass:"review-rating",attrs:{"read-only":!0,"max-rating":5,"inactive-color":"#c2c7c9","active-color":"#c98bdb","star-size":20},model:{value:e.rating,callback:function(t){e.rating=t},expression:"review.rating"}})],1),t._v(" "),n("div",{staticClass:"review-body"},[n("p",[t._v(t._s(e.review))]),t._v(" "),n("audio-player",{staticClass:"review-audio player",attrs:{sources:t.formattedAudioUrl(e.reviewAudioUrl)}})],1),t._v(" "),n("hr")])})],2)])])},staticRenderFns:[]}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement;return(t._self._c||e)("div",{staticClass:"container"},[t._v("\n  admin-login-page\n")])},staticRenderFns:[]}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{attrs:{id:"app"}},[n("nav-bar"),t._v(" "),n("router-view")],1)},staticRenderFns:[]}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement;t._self._c;return t._m(0)},staticRenderFns:[function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"container"},[n("h1",[t._v("Här är framsidan")])])}]}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"postbook-container"},[n("div",{staticClass:"menu"},[n("div",{staticClass:"scan button",on:{click:function(e){t.toggleMode("scan")}}}),t._v(" "),n("div",{staticClass:"manual button",on:{click:function(e){t.toggleMode("manual")}}})]),t._v(" "),n("div",{staticClass:"scan button",on:{click:t.barcodeScanner}},[t._v("Tryck här för att scanna.\n  ")])])},staticRenderFns:[]}}],[190]);
//# sourceMappingURL=app.4356e47ea4d8d54152df.js.map