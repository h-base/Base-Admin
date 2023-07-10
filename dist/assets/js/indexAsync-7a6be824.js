import{d as O,ac as K,ad as G,ax as X,r as Z,a as d,o as r,e as m,f as n,i as l,g as k,n as e,O as b,N as s,h as C,ab as u,ay as ee,V as te,W as le,c as oe,b as se,az as ne,F as ae,s as de,aA as g,aB as w}from"./index-9844670a.js";import ie from"./index-8e125b9a.js";import{m as ue}from"./mittBus-4d5f3f5b.js";import{_ as z}from"./_plugin-vue_export-helper-c27b6911.js";const a=p=>(te("data-v-1b0d281f"),p=p(),le(),p),ce={class:"layout-box mb30"},_e=a(()=>e("div",{class:"layout-dark"},null,-1)),re=a(()=>e("div",{class:"layout-container"},[e("div",{class:"layout-light"}),e("div",{class:"layout-content"})],-1)),me=a(()=>e("div",{class:"layout-dark"},null,-1)),pe=a(()=>e("div",{class:"layout-container"},[e("div",{class:"layout-light"}),e("div",{class:"layout-content"})],-1)),ve=a(()=>e("div",{class:"layout-dark"},null,-1)),fe=a(()=>e("div",{class:"layout-content"},null,-1)),ye=a(()=>e("div",{class:"layout-dark"},null,-1)),Ve=a(()=>e("div",{class:"layout-light"},null,-1)),he=a(()=>e("div",{class:"layout-content"},null,-1)),ke={class:"theme-item"},be=a(()=>e("span",null,"主题颜色",-1)),Ce={class:"theme-item"},ge=a(()=>e("span",null,"暗黑模式",-1)),we={class:"theme-item"},xe=a(()=>e("span",null,"灰色模式",-1)),Ae={class:"theme-item"},Ie=a(()=>e("span",null,"色弱模式",-1)),De={class:"theme-item mb40"},Se={class:"theme-item"},Ue=a(()=>e("span",null,"折叠菜单",-1)),Te={class:"theme-item"},Ee=a(()=>e("span",null,"面包屑",-1)),Le={class:"theme-item"},Re=a(()=>e("span",null,"面包屑图标",-1)),Fe={class:"theme-item"},Ne=a(()=>e("span",null,"标签栏",-1)),Pe={class:"theme-item"},Be=a(()=>e("span",null,"标签栏图标",-1)),Oe={class:"theme-item"},$e=a(()=>e("span",null,"页脚",-1)),Ge=O({__name:"index",setup(p){const{changePrimary:x,changeGreyOrWeak:f,setAsideTheme:y}=K(),A=G(),{layout:i,primary:I,isGrey:D,isWeak:S,asideInverted:U,isCollapse:T,breadcrumb:E,breadcrumbIcon:L,tabs:R,tabsIcon:F,footer:N}=X(A),W=[ee,"#daa96e","#0c819f","#409eff","#27ae60","#ff5c93","#e74c3c","#fd726d","#f39c12","#9b59b6"],V=$=>{A.setGlobalState("layout",$),y()},P=Z(!1);return ue.on("openThemeDrawer",()=>P.value=!0),($,t)=>{const Q=d("Notification"),_=d("el-icon"),B=d("el-divider"),h=d("CircleCheckFilled"),v=d("el-tooltip"),M=d("ColdDrink"),Y=d("el-color-picker"),j=d("SwitchDark"),c=d("el-switch"),q=d("QuestionFilled"),H=d("Setting"),J=d("el-drawer");return r(),m(J,{modelValue:P.value,"onUpdate:modelValue":t[16]||(t[16]=o=>P.value=o),title:"布局设置",size:"300px"},{default:n(()=>[l(B,{class:"divider","content-position":"center"},{default:n(()=>[l(_,null,{default:n(()=>[l(Q)]),_:1}),k(" 布局切换 ")]),_:1}),e("div",ce,[l(v,{effect:"dark",content:"纵向",placement:"top","show-after":200},{default:n(()=>[e("div",{class:b(["layout-item layout-vertical",{"is-active":s(i)=="vertical"}]),onClick:t[0]||(t[0]=o=>V("vertical"))},[_e,re,s(i)=="vertical"?(r(),m(_,{key:0},{default:n(()=>[l(h)]),_:1})):C("",!0)],2)]),_:1}),l(v,{effect:"dark",content:"经典",placement:"top","show-after":200},{default:n(()=>[e("div",{class:b(["layout-item layout-classic",{"is-active":s(i)=="classic"}]),onClick:t[1]||(t[1]=o=>V("classic"))},[me,pe,s(i)=="classic"?(r(),m(_,{key:0},{default:n(()=>[l(h)]),_:1})):C("",!0)],2)]),_:1}),l(v,{effect:"dark",content:"横向",placement:"top","show-after":200},{default:n(()=>[e("div",{class:b(["layout-item layout-transverse",{"is-active":s(i)=="transverse"}]),onClick:t[2]||(t[2]=o=>V("transverse"))},[ve,fe,s(i)=="transverse"?(r(),m(_,{key:0},{default:n(()=>[l(h)]),_:1})):C("",!0)],2)]),_:1}),l(v,{effect:"dark",content:"分栏",placement:"top","show-after":200},{default:n(()=>[e("div",{class:b(["layout-item layout-columns",{"is-active":s(i)=="columns"}]),onClick:t[3]||(t[3]=o=>V("columns"))},[ye,Ve,he,s(i)=="columns"?(r(),m(_,{key:0},{default:n(()=>[l(h)]),_:1})):C("",!0)],2)]),_:1})]),l(B,{class:"divider","content-position":"center"},{default:n(()=>[l(_,null,{default:n(()=>[l(M)]),_:1}),k(" 全局主题 ")]),_:1}),e("div",ke,[be,l(Y,{modelValue:s(I),"onUpdate:modelValue":t[4]||(t[4]=o=>u(I)?I.value=o:null),predefine:W,onChange:s(x)},null,8,["modelValue","onChange"])]),e("div",Ce,[ge,l(j)]),e("div",we,[xe,l(c,{modelValue:s(D),"onUpdate:modelValue":t[5]||(t[5]=o=>u(D)?D.value=o:null),onChange:t[6]||(t[6]=o=>s(f)("grey",!!o))},null,8,["modelValue"])]),e("div",Ae,[Ie,l(c,{modelValue:s(S),"onUpdate:modelValue":t[7]||(t[7]=o=>u(S)?S.value=o:null),onChange:t[8]||(t[8]=o=>s(f)("weak",!!o))},null,8,["modelValue"])]),e("div",De,[e("span",null,[k(" 侧边栏反转色 "),l(v,{effect:"dark",content:"该属性目前只在纵向布局模式下生效",placement:"top"},{default:n(()=>[l(_,null,{default:n(()=>[l(q)]),_:1})]),_:1})]),l(c,{modelValue:s(U),"onUpdate:modelValue":t[9]||(t[9]=o=>u(U)?U.value=o:null),disabled:s(i)!=="vertical",onChange:s(y)},null,8,["modelValue","disabled","onChange"])]),l(B,{class:"divider","content-position":"center"},{default:n(()=>[l(_,null,{default:n(()=>[l(H)]),_:1}),k(" 界面设置 ")]),_:1}),e("div",Se,[Ue,l(c,{modelValue:s(T),"onUpdate:modelValue":t[10]||(t[10]=o=>u(T)?T.value=o:null)},null,8,["modelValue"])]),e("div",Te,[Ee,l(c,{modelValue:s(E),"onUpdate:modelValue":t[11]||(t[11]=o=>u(E)?E.value=o:null)},null,8,["modelValue"])]),e("div",Le,[Re,l(c,{modelValue:s(L),"onUpdate:modelValue":t[12]||(t[12]=o=>u(L)?L.value=o:null)},null,8,["modelValue"])]),e("div",Fe,[Ne,l(c,{modelValue:s(R),"onUpdate:modelValue":t[13]||(t[13]=o=>u(R)?R.value=o:null)},null,8,["modelValue"])]),e("div",Pe,[Be,l(c,{modelValue:s(F),"onUpdate:modelValue":t[14]||(t[14]=o=>u(F)?F.value=o:null)},null,8,["modelValue"])]),e("div",Oe,[$e,l(c,{modelValue:s(N),"onUpdate:modelValue":t[15]||(t[15]=o=>u(N)?N.value=o:null)},null,8,["modelValue"])])]),_:1},8,["modelValue"])}}});const ze=z(Ge,[["__scopeId","data-v-1b0d281f"]]),We=O({name:"layoutAsync"}),Qe=O({...We,setup(p){const x={vertical:g(()=>w(()=>import("./index-63c93872.js"),["assets/js/index-63c93872.js","assets/js/index-9844670a.js","assets/css/index-17922009.css","assets/js/logo-76d8b2b8.js","assets/js/SubMenu.vue_vue_type_style_index_0_lang-005060e3.js","assets/js/index-29d3d16d.js","assets/js/_plugin-vue_export-helper-c27b6911.js","assets/js/mittBus-4d5f3f5b.js","assets/js/notData-2dc2117c.js","assets/css/SubMenu-95cf026e.css","assets/js/ToolBarLeft-104d446d.js","assets/css/ToolBarLeft-8f0fff9e.css","assets/css/index-8c406413.css"])),classic:g(()=>w(()=>import("./index-ac532772.js"),["assets/js/index-ac532772.js","assets/js/logo-76d8b2b8.js","assets/js/index-9844670a.js","assets/css/index-17922009.css","assets/js/SubMenu.vue_vue_type_style_index_0_lang-005060e3.js","assets/js/index-29d3d16d.js","assets/js/_plugin-vue_export-helper-c27b6911.js","assets/js/mittBus-4d5f3f5b.js","assets/js/notData-2dc2117c.js","assets/css/SubMenu-95cf026e.css","assets/js/ToolBarLeft-104d446d.js","assets/css/ToolBarLeft-8f0fff9e.css","assets/css/index-54694d74.css"])),transverse:g(()=>w(()=>import("./index-64bcc23f.js"),["assets/js/index-64bcc23f.js","assets/js/logo-76d8b2b8.js","assets/js/index-9844670a.js","assets/css/index-17922009.css","assets/js/SubMenu.vue_vue_type_style_index_0_lang-005060e3.js","assets/js/index-29d3d16d.js","assets/js/_plugin-vue_export-helper-c27b6911.js","assets/js/mittBus-4d5f3f5b.js","assets/js/notData-2dc2117c.js","assets/css/SubMenu-95cf026e.css","assets/css/index-f6b94139.css"])),columns:g(()=>w(()=>import("./index-7270619d.js"),["assets/js/index-7270619d.js","assets/js/index-9844670a.js","assets/css/index-17922009.css","assets/js/logo-76d8b2b8.js","assets/js/SubMenu.vue_vue_type_style_index_0_lang-005060e3.js","assets/js/index-29d3d16d.js","assets/js/_plugin-vue_export-helper-c27b6911.js","assets/js/mittBus-4d5f3f5b.js","assets/js/notData-2dc2117c.js","assets/css/SubMenu-95cf026e.css","assets/js/ToolBarLeft-104d446d.js","assets/css/ToolBarLeft-8f0fff9e.css","assets/css/index-ea3df739.css"]))},f=G(),y=oe(()=>f.layout);return(A,i)=>(r(),se(ae,null,[(r(),m(ne,null,{default:n(()=>[(r(),m(de(x[y.value])))]),fallback:n(()=>[l(ie)]),_:1})),l(ze)],64))}});const He=z(Qe,[["__scopeId","data-v-33bd728f"]]);export{He as default};
