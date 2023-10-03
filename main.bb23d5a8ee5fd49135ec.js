"use strict";(self.webpackChunkmovie_time=self.webpackChunkmovie_time||[]).push([[179],{49:(e,a,t)=>{var r=t(294),n=t(745),o=t(655),l=t(335),i=t(998),s=t(287),c=t(379),d=t.n(c),m=t(795),u=t.n(m),g=t(569),p=t.n(g),h=t(565),f=t.n(h),y=t(216),x=t.n(y),b=t(589),w=t.n(b),v=t(768),E={};E.styleTagTransform=w(),E.setAttributes=f(),E.insert=p().bind(null,"head"),E.domAPI=u(),E.insertStyleElement=x(),d()(v.Z,E),v.Z&&v.Z.locals&&v.Z.locals;const Z=function(){var e=(0,r.useRef)(),a=(0,i.I0)(),t=(0,l.s0)();return r.createElement("div",{className:"navbar"},r.createElement("img",{className:"brand-logo",src:"".concat("https://ktanj1987.github.io/movie-time/","/assets/logo.png"),alt:"brand-logo"}),r.createElement(o.rU,{className:"brand-name",to:"/"},"Movie Time"),r.createElement("input",{"data-testid":"search",ref:e,onKeyDown:function(r){"Enter"===r.key&&e.current.value&&(t("search?query=".concat(e.current.value)),a((0,s._L)(e.current.value)),e.current.value="")},className:"navebar-search",placeholder:"Search movie by name"}))};var k=t(497),P={};P.styleTagTransform=w(),P.setAttributes=f(),P.insert=p().bind(null,"head"),P.domAPI=u(),P.insertStyleElement=x(),d()(k.Z,P),k.Z&&k.Z.locals&&k.Z.locals;var L=(0,r.lazy)((function(){return t.e(696).then(t.bind(t,696))})),C=(0,r.lazy)((function(){return t.e(189).then(t.bind(t,189))})),N=(0,r.lazy)((function(){return Promise.all([t.e(216),t.e(619)]).then(t.bind(t,619))}));const S=function(){return r.createElement(o.UT,null,r.createElement(r.Suspense,{fallback:r.createElement("h1",null,"Loading ...")},r.createElement(Z,null),r.createElement("div",{className:"container"},r.createElement(l.Z5,null,r.createElement(l.AW,{exact:!0,path:"/",element:r.createElement(L,null)}),r.createElement(l.AW,{path:"/search",element:r.createElement(N,null)}),r.createElement(l.AW,{path:"/movie/:id",element:r.createElement(C,null)}),r.createElement(l.AW,{path:"*",element:r.createElement("h1",{className:"error"},"404 Page")})))))},q=(0,t(633).xC)({reducer:{movies:s.ZP}});n.createRoot(document.getElementById("root")).render(r.createElement(i.zt,{store:q},r.createElement(S,null)))},497:(e,a,t)=>{t.d(a,{Z:()=>i});var r=t(81),n=t.n(r),o=t(645),l=t.n(o)()(n());l.push([e.id,"body{background-color:#000;padding:0;margin:0;font-family:sans-serif;max-width:100%;width:100%;overflow-x:hidden;color:#fff}.container{width:100%;padding:80px 20px;box-sizing:border-box}.row{display:flex;flex-wrap:wrap;box-sizing:border-box}.col{width:20%;padding:0 10px;box-sizing:border-box}img{width:100%;height:auto}.d-flex{display:flex}.flex-column{flex-direction:column}.ml-1{margin-left:5px}.ml-2{margin-left:10px}.ml-3{margin-left:15px}.ml-4{margin-left:20px}.ml-auto{margin-left:auto}.error{color:red}@media only screen and (max-width: 768px){.col{width:33.33%}}@media only screen and (max-width: 576px){.col{width:100%}}",""]);const i=l},768:(e,a,t)=>{t.d(a,{Z:()=>i});var r=t(81),n=t.n(r),o=t(645),l=t.n(o)()(n());l.push([e.id,".navbar{background-color:#3c3c3c;display:flex;align-items:center;padding:10px 0;overflow:hidden;position:fixed;top:0;width:100%}.navbar .brand-name{margin-left:20px;text-decoration:none;font-weight:bold;color:#fff}.navbar .brand-logo{border-radius:50%;width:40px;height:40px;margin-left:10px}.navbar .navebar-search{margin-left:auto;font-size:18px;padding:5px;margin-right:10px}",""]);const i=l},626:(e,a,t)=>{t.d(a,{Ey:()=>i,Pg:()=>l,Wf:()=>o});const r="https://www.omdbapi.com/",n="f31b0964",o=async(e,a)=>{const t=await fetch(`${r}?type=movie&apikey=${n}&page=${e}&s=${a}`);return await t.json()},l=async e=>{const a=await fetch(`${r}?apikey=${n}&i=${e}`);return await a.json()},i=async()=>{const e=await fetch("https://qa.edclinic.co.uk/api/v2/homePageSection");return await e.json()}},287:(e,a,t)=>{t.d(a,{Mc:()=>l,ZP:()=>c,_L:()=>s,vw:()=>o});var r=t(633),n=t(626);const o=(0,r.hg)("fetchMovies",(async({page:e,query:a})=>{try{return await(0,n.Wf)(e,a)}catch(e){throw console.error(e),new Error("Something went wrong")}})),l=(0,r.hg)("fetchMovieById",(async e=>{try{return await(0,n.Pg)(e)}catch(e){throw console.error(e),new Error("Something went wrong")}})),i=(0,r.oM)({name:"movies",initialState:{query:null,data:[],isLoading:!1,error:null,page:1,hasNextPage:!1,selectedMovie:null},reducers:{setQuery(e,a){e.query=a.payload,e.page=1,e.data=[]}},extraReducers(e){e.addCase(o.pending,(e=>{e.isLoading=!0,e.error=null})).addCase(o.fulfilled,((e,a)=>{const{query:t}=a.meta.arg;"True"===a.payload.Response?(e.data=e.data.concat(a.payload.Search),e.hasNextPage=e.data.length!==a.payload.totalResults):(e.error=a.payload?.Error,e.hasNextPage=!1),e.query||(e.query=t),e.page+=1,e.isLoading=!1})).addCase(o.rejected,((e,a)=>{e.isLoading=!1,e.error=a.error.message})).addCase(l.pending,(e=>{e.selectedMovie=null,e.error=null,e.isLoading=!0})).addCase(l.fulfilled,((e,a)=>{e.isLoading=!1,"True"===a.payload.Response?e.selectedMovie=a.payload:e.error=a.payload?.Error})).addCase(l.rejected,((e,a)=>{e.isLoading=!1,e.error=a.error.message}))}}),{setQuery:s}=i.actions,c=i.reducer}},e=>{e.O(0,[216],(()=>(49,e(e.s=49)))),e.O()}]);