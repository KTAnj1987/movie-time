"use strict";(self.webpackChunkmovie_time=self.webpackChunkmovie_time||[]).push([[179],{49:(e,a,r)=>{var t=r(294),n=r(745),o=r(655),l=r(335),i=r(998),s=r(284),d=r(379),c=r.n(d),m=r(795),u=r.n(m),g=r(569),p=r.n(g),h=r(565),f=r.n(h),y=r(216),x=r.n(y),b=r(589),w=r.n(b),v=r(768),E={};E.styleTagTransform=w(),E.setAttributes=f(),E.insert=p().bind(null,"head"),E.domAPI=u(),E.insertStyleElement=x(),c()(v.Z,E),v.Z&&v.Z.locals&&v.Z.locals;const Z=function(){var e=(0,t.useRef)(),a=(0,i.I0)(),r=(0,l.s0)();return t.createElement("div",{className:"navbar"},t.createElement("img",{className:"brand-logo",src:"".concat("https://ktanj1987.github.io/movie-time/","/assets/logo.png"),alt:"brand-logo"}),t.createElement(o.rU,{className:"brand-name",to:"/"},"Movie Time"),t.createElement("input",{"data-testid":"search",ref:e,onKeyDown:function(t){"Enter"===t.key&&e.current.value&&(r("search?query=".concat(e.current.value)),a((0,s._L)(e.current.value)),e.current.value="")},className:"navebar-search",placeholder:"Search movie by name"}))};var k=r(497),L={};L.styleTagTransform=w(),L.setAttributes=f(),L.insert=p().bind(null,"head"),L.domAPI=u(),L.insertStyleElement=x(),c()(k.Z,L),k.Z&&k.Z.locals&&k.Z.locals;var C=(0,t.lazy)((function(){return r.e(696).then(r.bind(r,696))})),N=(0,t.lazy)((function(){return r.e(189).then(r.bind(r,189))})),P=(0,t.lazy)((function(){return Promise.all([r.e(216),r.e(619)]).then(r.bind(r,619))}));const z=function(){return t.createElement(o.UT,null,t.createElement(t.Suspense,{fallback:t.createElement("h1",null,"Loading ...")},t.createElement(Z,null),t.createElement("div",{className:"container"},t.createElement(l.Z5,null,t.createElement(l.AW,{exact:!0,path:"/",element:t.createElement(C,null)}),t.createElement(l.AW,{path:"/search",element:t.createElement(P,null)}),t.createElement(l.AW,{path:"/movie/:id",element:t.createElement(N,null)}),t.createElement(l.AW,{path:"*",element:t.createElement("h1",{className:"error"},"404 Page")})))))},A=(0,r(633).xC)({reducer:{movies:s.ZP}});n.createRoot(document.getElementById("root")).render(t.createElement(i.zt,{store:A},t.createElement(z,null)))},497:(e,a,r)=>{r.d(a,{Z:()=>i});var t=r(81),n=r.n(t),o=r(645),l=r.n(o)()(n());l.push([e.id,"body{background-color:#000;padding:0;margin:0;font-family:sans-serif;max-width:100%;width:100%;overflow-x:hidden;color:#fff}.container{width:100%;padding:80px 20px;box-sizing:border-box}.row{display:flex;flex-wrap:wrap;box-sizing:border-box}.col{width:20%;padding:0 10px;box-sizing:border-box}img{width:100%;height:auto}.d-flex{display:flex}.flex-column{flex-direction:column}.ml-1{margin-left:5px}.ml-2{margin-left:10px}.ml-3{margin-left:15px}.ml-4{margin-left:20px}.ml-auto{margin-left:auto}.error{color:red}@media only screen and (max-width: 768px){.col{width:33.33%}}@media only screen and (max-width: 576px){.col{width:100%}}",""]);const i=l},768:(e,a,r)=>{r.d(a,{Z:()=>i});var t=r(81),n=r.n(t),o=r(645),l=r.n(o)()(n());l.push([e.id,".navbar{background-color:#3c3c3c;display:flex;align-items:center;padding:10px 0;overflow:hidden;position:fixed;top:0;width:100%}.navbar .brand-name{margin-left:20px;text-decoration:none;font-weight:bold;color:#fff}.navbar .brand-logo{border-radius:50%;width:40px;height:40px;margin-left:10px}.navbar .navebar-search{margin-left:auto;font-size:18px;padding:5px;margin-right:10px}",""]);const i=l},284:(e,a,r)=>{r.d(a,{ZP:()=>c,Mc:()=>i,vw:()=>l,_L:()=>d});var t=r(633);const n="https://www.omdbapi.com/",o="f31b0964",l=(0,t.hg)("fetchMovies",(async({page:e,query:a})=>{try{return await(async(e,a)=>{const r=await fetch(`${n}?type=movie&apikey=${o}&page=${e}&s=${a}`);return await r.json()})(e,a)}catch(e){throw console.error(e),new Error("Something went wrong")}})),i=(0,t.hg)("fetchMovieById",(async e=>{try{return await(async e=>{const a=await fetch(`${n}?apikey=${o}&i=${e}`);return await a.json()})(e)}catch(e){throw console.error(e),new Error("Something went wrong")}})),s=(0,t.oM)({name:"movies",initialState:{query:null,data:[],isLoading:!1,error:null,page:1,hasNextPage:!1,selectedMovie:null},reducers:{setQuery(e,a){e.query=a.payload,e.page=1,e.data=[]}},extraReducers(e){e.addCase(l.pending,(e=>{e.isLoading=!0,e.error=null})).addCase(l.fulfilled,((e,a)=>{const{query:r}=a.meta.arg;"True"===a.payload.Response?(e.data=e.data.concat(a.payload.Search),e.hasNextPage=e.data.length!==a.payload.totalResults):(e.error=a.payload?.Error,e.hasNextPage=!1),e.query||(e.query=r),e.page+=1,e.isLoading=!1})).addCase(l.rejected,((e,a)=>{e.isLoading=!1,e.error=a.error.message})).addCase(i.pending,(e=>{e.selectedMovie=null,e.error=null,e.isLoading=!0})).addCase(i.fulfilled,((e,a)=>{e.isLoading=!1,"True"===a.payload.Response?e.selectedMovie=a.payload:e.error=a.payload?.Error})).addCase(i.rejected,((e,a)=>{e.isLoading=!1,e.error=a.error.message}))}}),{setQuery:d}=s.actions,c=s.reducer}},e=>{e.O(0,[216],(()=>(49,e(e.s=49)))),e.O()}]);