import{i as l}from"./index-a22d978d.js";import{d,o as f,b as p}from"./index-9844670a.js";import{_ as m}from"./_plugin-vue_export-helper-c27b6911.js";const h={class:"echarts",id:"AgeRatioChart"},g=d({__name:"AgeRatioChart",setup(u,{expose:s}){return s({initChart:o=>{const r=document.getElementById("AgeRatioChart"),a=l(r),n=["#F6C95C","#EF7D33","#1F9393","#184EA1","#81C8EF","#9270CA"],c={color:n,tooltip:{show:!0,trigger:"item",formatter:"{b} <br/>占比：{d}%"},legend:{orient:"vertical",right:"20px",top:"15px",itemGap:15,itemWidth:14,formatter:function(e){let t="";return o.forEach(i=>{i.name===e&&(t=" "+e+"　 "+i.percentage)}),t},textStyle:{color:"#fff"}},grid:{top:"bottom",left:10,bottom:10},series:[{zlevel:1,name:"年龄比例",type:"pie",selectedMode:"single",radius:[50,90],center:["35%","50%"],startAngle:60,label:{position:"inside",show:!0,color:"#fff",formatter:function(e){return e.data.percentage},rich:{b:{fontSize:16,lineHeight:30,color:"#fff"}}},itemStyle:{shadowColor:"rgba(0, 0, 0, 0.2)",shadowBlur:10},data:o.map((e,t)=>({value:e.value,name:e.name,percentage:e.percentage,itemStyle:{borderWidth:10,shadowBlur:20,borderColor:n[t],borderRadius:10}}))},{name:"",type:"pie",selectedMode:"single",radius:[50,90],center:["35%","50%"],startAngle:60,data:[{value:1e3,name:"",label:{show:!0,formatter:"{a|本日总数}",rich:{a:{align:"center",color:"rgb(98,137,169)",fontSize:14}},position:"center"}}]}]};return a.setOption(c),a}}),(o,r)=>(f(),p("div",h))}});const A=m(g,[["__scopeId","data-v-ff6fd5f9"]]);export{A as default};
