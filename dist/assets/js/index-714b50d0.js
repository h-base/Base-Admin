import{a3 as le,c as ae,a4 as se,r as C,d as N,a as P,o as _,e as S,f as w,n as k,i as v,V as ue,W as ce,H as pe,k as de,_ as q,a1 as te,m as E,a5 as B,F as H,a6 as ie,a7 as Z,a8 as W,a9 as he,B as ge,w as fe,G as me,b as U,v as _e,x as be,N as h,y as z,h as F,j as x,aa as ve,ab as ye,$ as ee,s as Se}from"./index-9844670a.js";import{_ as ne}from"./notData-2dc2117c.js";import{_ as Ce}from"./_plugin-vue_export-helper-c27b6911.js";const we=(p,o={},n=!0,f,y)=>{const t=le({tableData:[],pageable:{pageNum:1,pageSize:25,total:0},searchParam:{},searchInitParam:{},totalParam:{}}),a=ae({get:()=>({pageNum:t.pageable.pageNum,pageSize:t.pageable.pageSize}),set:d=>{}}),r=async(d={})=>{if(p)try{t.tableData=[],Object.assign(t.totalParam,o,n?a.value:{},d);let{data:i}=await p({...t.searchInitParam,...t.totalParam});f&&(i=f(i)),t.tableData=n?i.list:i;const{pageNum:R,pageSize:j,total:K}=i;n&&b({pageNum:R,pageSize:j,total:K})}catch(i){y&&y(i)}},c=()=>{t.totalParam={};const d={};for(const i in t.searchParam)(t.searchParam[i]||t.searchParam[i]===!1||t.searchParam[i]===0)&&(d[i]=t.searchParam[i]);Object.assign(t.totalParam,d,n?a.value:{})},b=d=>{Object.assign(t.pageable,d)},m=()=>{t.pageable.pageNum=1,c(),r()},V=()=>{t.pageable.pageNum=1,t.searchParam={},Object.keys(t.searchInitParam).forEach(d=>{t.searchParam[d]=t.searchInitParam[d]}),c(),r()},I=d=>{t.pageable.pageNum=1,t.pageable.pageSize=d,r()},T=d=>{t.pageable.pageNum=d,r()};return{...se(t),getTableList:r,search:m,reset:V,handleSizeChange:I,handleCurrentChange:T,updatedTotalParam:c}},Pe=(p="id")=>{const o=C(!1),n=C([]),f=ae(()=>{const t=[];return n.value.forEach(a=>t.push(a[p])),t});return{isSelected:o,selectedList:n,selectedListIds:f,selectionChange:t=>{t.length?o.value=!0:o.value=!1,n.value=t}}},ke=N({name:"Pagination"}),Ve=N({...ke,props:{pageable:{},handleSizeChange:{type:Function},handleCurrentChange:{type:Function}},setup(p){return(o,n)=>{const f=P("el-pagination");return _(),S(f,{background:!0,"current-page":o.pageable.pageNum,"page-size":o.pageable.pageSize,"page-sizes":[10,25,50,100],total:o.pageable.total,layout:"total, sizes, prev, pager, next, jumper",onSizeChange:o.handleSizeChange,onCurrentChange:o.handleCurrentChange},null,8,["current-page","page-size","total","onSizeChange","onCurrentChange"])}}}),$e=p=>(ue("data-v-34709da4"),p=p(),ce(),p),ze={class:"table-main"},Ne=$e(()=>k("div",{class:"table-empty"},[k("img",{src:ne,alt:"notData"}),k("div",null,"暂无可配置列")],-1)),Fe=N({name:"ColSetting"}),Te=N({...Fe,props:{colSetting:{}},setup(p,{expose:o}){const n=C(!1);return o({openColSetting:()=>{n.value=!0}}),(y,t)=>{const a=P("el-table-column"),r=P("el-switch"),c=P("el-table"),b=P("el-drawer");return _(),S(b,{modelValue:n.value,"onUpdate:modelValue":t[0]||(t[0]=m=>n.value=m),title:"列设置",size:"450px"},{default:w(()=>[k("div",ze,[v(c,{data:y.colSetting,border:!0,"row-key":"prop","default-expand-all":"","tree-props":{children:"_children"}},{empty:w(()=>[Ne]),default:w(()=>[v(a,{prop:"label",align:"center",label:"列名"}),v(a,{prop:"isShow",align:"center",label:"显示"},{default:w(m=>[v(r,{modelValue:m.row.isShow,"onUpdate:modelValue":V=>m.row.isShow=V},null,8,["modelValue","onUpdate:modelValue"])]),_:1}),v(a,{prop:"sortable",align:"center",label:"排序"},{default:w(m=>[v(r,{modelValue:m.row.sortable,"onUpdate:modelValue":V=>m.row.sortable=V},null,8,["modelValue","onUpdate:modelValue"])]),_:1})]),_:1},8,["data"])])]),_:1},8,["modelValue"])}}});const Be=Ce(Te,[["__scopeId","data-v-34709da4"]]);function Ee(p){return typeof p=="function"||Object.prototype.toString.call(p)==="[object Object]"&&!ie(p)}const Ie=N({name:"TableColumn"}),Re=N({...Ie,props:{column:{}},setup(p){const o=pe(),n=de("enumMap",C(new Map)),f=(a,r)=>{var c,b;return n.value.get(a.prop)&&a.isFilterEnum?Z(W(r.row,a.prop??""),(b=(c=n.value).get)==null?void 0:b.call(c,a.prop),a.fieldNames):he(W(r.row,a.prop??""))},y=(a,r)=>Z(W(r.row,a.prop??""),n.value.get(a.prop),a.fieldNames,"tag"),t=a=>v(H,null,[a.isShow&&v(P("el-table-column"),E(a,{align:a.align??"center",showOverflowTooltip:a.showOverflowTooltip??a.prop!=="operation"}),{default:r=>{var b;let c;return a._children?a._children.map(m=>t(m)):a.render?a.render(r):o[B(a.prop??"")]?(b=o[B(a.prop??"")])==null?void 0:b.call(o,r):a.tag?v(P("el-tag"),{type:y(a,r)},Ee(c=f(a,r))?c:{default:()=>[c]}):f(a,r)},header:r=>{var c;return a.headerRender?a.headerRender(r):o[`${B(a.prop??"")}Header`]?(c=o[`${B(a.prop??"")}Header`])==null?void 0:c.call(o,r):a.label}})]);return(a,r)=>(_(),S(t,q(te(a.column)),null,16))}}),je={class:"card table-main"},Oe={class:"table-header"},De={class:"header-button-lf"},Le={key:0,class:"header-button-ri"},Me={class:"table-empty"},Ue=k("img",{src:ne,alt:"notData"},null,-1),qe=k("div",null,"暂无数据",-1),He=N({name:"ProTable"}),We=N({...He,props:{columns:{default:()=>[]},data:{default:void 0},requestApi:{type:Function,default:void 0},requestAuto:{type:Boolean,default:!0},requestError:{type:Function,default:void 0},dataCallback:{type:Function,default:void 0},pagination:{type:Boolean,default:!0},initParam:{default:{}},border:{type:Boolean,default:!0},toolButton:{type:Boolean,default:!0},rowKey:{default:"id"},searchCol:{default:()=>({xs:1,sm:2,md:2,lg:3,xl:4})}},setup(p,{expose:o}){var Y;const n=p,f=C(!0),y=C(),{selectionChange:t,selectedList:a,selectedListIds:r,isSelected:c}=Pe(n.rowKey),{tableData:b,pageable:m,searchParam:V,searchInitParam:I,getTableList:T,search:d,reset:i,handleSizeChange:R,handleCurrentChange:j}=we(n.requestApi,n.initParam,n.pagination,n.dataCallback,n.requestError),K=()=>{var e;return(e=y.value)==null?void 0:e.clearSelection()};ge(()=>n.requestAuto&&T()),fe(()=>n.initParam,e=>{T(e)},{deep:!0});const A=C(n.columns),O=C(new Map);me("enumMap",O);const re=async e=>{if(!e.enum)return;if(typeof e.enum!="function")return O.value.set(e.prop??"",e.enum);const{data:l}=await e.enum();O.value.set(e.prop??"",l)},J=(e,l=[])=>(e.forEach(async s=>{var g;(g=s._children)!=null&&g.length&&l.push(...J(s._children)),l.push(s),s.isShow=s.isShow??!0,s.isFilterEnum=s.isFilterEnum??!0,re(s)}),l.filter(s=>{var g;return!((g=s._children)!=null&&g.length)})),Q=C();Q.value=J(A.value);const D=Q.value.filter(e=>{var l,s;return((l=e.search)==null?void 0:l.el)||((s=e.search)==null?void 0:s.render)});D.forEach((e,l)=>{var s,g,L,u,$,M;(s=e.search)!=null&&s.order&&(e.search.order=((g=e.search)==null?void 0:g.order)??l+2),((L=e.search)==null?void 0:L.defaultValue)!==void 0&&((u=e.search)==null?void 0:u.defaultValue)!==null&&(I.value[e.search.key??B(e.prop??"")]=($=e.search)==null?void 0:$.defaultValue,V.value[e.search.key??B(e.prop??"")]=(M=e.search)==null?void 0:M.defaultValue)}),D.sort((e,l)=>{var s,g;return(((s=e==null?void 0:e.search)==null?void 0:s.order)??0)-(((g=l==null?void 0:l.search)==null?void 0:g.order)??0)});const X=C(),G=(Y=A.value)==null?void 0:Y.filter(e=>!["selection","index","expand"].includes(e.type??"")&&e.prop!=="operation"&&e.isShow),oe=()=>X.value.openColSetting();return o({element:y,tableData:b,pageable:m,searchParam:V,searchInitParam:I,getTableList:T,search:d,reset:i,handleSizeChange:R,handleCurrentChange:j,clearSelection:K,enumMap:O,isSelected:c,selectedList:a,selectedListIds:r}),(e,l)=>{const s=P("SearchForm"),g=P("el-button"),L=P("el-table-column");return _(),U(H,null,[_e(v(s,{search:h(d),reset:h(i),columns:h(D),"search-param":h(V),"search-col":e.searchCol},null,8,["search","reset","columns","search-param","search-col"]),[[be,f.value]]),k("div",je,[k("div",Oe,[k("div",De,[z(e.$slots,"tableHeader",{selectedListIds:h(r),selectedList:h(a),isSelected:h(c)})]),e.toolButton?(_(),U("div",Le,[z(e.$slots,"toolButton",{},()=>[v(g,{icon:"Refresh",circle:"",onClick:l[0]||(l[0]=u=>h(T)())}),e.columns.length?(_(),S(g,{key:0,icon:"Operation",circle:"",onClick:oe})):F("",!0),h(D).length?(_(),S(g,{key:1,icon:"Search",circle:"",onClick:l[1]||(l[1]=u=>f.value=!f.value)})):F("",!0)])])):F("",!0)]),v(h(ve),E({ref_key:"tableRef",ref:y},e.$attrs,{data:e.data??h(b),border:e.border,"row-key":e.rowKey,onSelectionChange:h(t)}),{append:w(()=>[z(e.$slots,"append")]),empty:w(()=>[k("div",Me,[z(e.$slots,"empty",{},()=>[Ue,qe])])]),default:w(()=>[z(e.$slots,"default"),(_(!0),U(H,null,x(A.value,u=>(_(),U(H,{key:u},[u.type&&["selection","index","expand"].includes(u.type)?(_(),S(L,E({key:0},u,{align:u.align??"center","reserve-selection":u.type=="selection"}),ee({_:2},[u.type=="expand"?{name:"default",fn:w($=>[u.render?(_(),S(Se(u.render),q(E({key:0},$)),null,16)):z(e.$slots,u.type,q(E({key:1},$)))]),key:"0"}:void 0]),1040,["align","reserve-selection"])):F("",!0),!u.type&&u.prop&&u.isShow?(_(),S(Re,{key:1,column:u},ee({_:2},[x(Object.keys(e.$slots),$=>({name:$,fn:w(M=>[z(e.$slots,$,q(te(M)))])}))]),1032,["column"])):F("",!0)],64))),128))]),_:3},16,["data","border","row-key","onSelectionChange"]),z(e.$slots,"pagination",{},()=>[e.pagination?(_(),S(Ve,{key:0,pageable:h(m),"handle-size-change":h(R),"handle-current-change":h(j)},null,8,["pageable","handle-size-change","handle-current-change"])):F("",!0)])]),e.toolButton?(_(),S(Be,{key:0,ref_key:"colRef",ref:X,"col-setting":h(G),"onUpdate:colSetting":l[2]||(l[2]=u=>ye(G)?G.value=u:null)},null,8,["col-setting"])):F("",!0)],64)}}});export{We as default};
