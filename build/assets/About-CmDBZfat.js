import{r as i,j as s,G as n}from"./index-DC0nZYwh.js";import{S as l}from"./SpotMeUpIcon-63Kjyt4c.js";const d=({active:e,onClick:o})=>(i.useState(!1),s.jsxs("div",{className:`photoslider-container ${e?"topzindex":""}`,onClick:o,children:[s.jsxs("div",{className:"icons-tabs-container-photoslider ",children:[s.jsx("div",{className:"icon-minimize"}),s.jsx("div",{className:"icon-maximize"}),s.jsx("div",{className:"icon-close"})]}),s.jsx("div",{className:"photoslider-body",children:s.jsx("h1",{className:"black bigger-font",children:"PHOTO SLIDER"})})]})),r=({active:e,onClick:o})=>s.jsxs("div",{className:`videoabout-container ${e?"topzindex":""}`,onClick:o,id:"videoabout-container",children:[s.jsxs("div",{className:"icons-tabs-container-videoabout",id:"icons-tabs-container-videoabout",children:[s.jsx("div",{className:"icon-minimize"}),s.jsx("div",{className:"icon-maximize"}),s.jsx("div",{className:"icon-close"})]}),s.jsx("div",{className:"videoabout-body",id:"videoabout-body",children:s.jsx("h1",{className:"black bigger-font",children:"VIDEO"})})]}),m=()=>s.jsxs("div",{className:"info-container",children:[s.jsxs("div",{className:"icons-tabs-container-videoabout ",id:"icons-tabs-container-videoabout",children:[s.jsx("div",{className:"icon-minimize"}),s.jsx("div",{className:"icon-maximize"}),s.jsx("div",{className:"icon-close"})]}),s.jsx("div",{className:"videoabout-body",id:"videoabout-body",children:s.jsx("h1",{className:"black bigger-font",children:"INFO"})})]}),x=()=>{const{isApiLoaded:e}=i.useContext(n),o={lat:19.21555,lng:-70.51659},a=16,t={zoomControl:!1,fullscreenControl:!1};return i.useEffect(()=>{if(e&&window.google&&window.google.maps){const c=new window.google.maps.Map(document.getElementById("myMap"),{center:o,zoom:a,options:t});new window.google.maps.Marker({position:o,map:c,title:"Oh nou"})}},[e]),s.jsx("div",{className:"googlemap-container",id:"myMap"})},u=()=>s.jsxs("div",{className:"contactform-container",children:[s.jsxs("div",{className:"icons-tabs-container-contactform ",id:"icons-tabs-container-contactform",children:[s.jsxs("div",{className:"contactform-icon-left",children:[s.jsx("div",{className:"icon-minimize"}),s.jsx("div",{className:"icon-maximize"}),s.jsx("div",{className:"icon-close"})]}),s.jsx("h1",{className:"contactus-text",children:"Contact Us"})]}),s.jsxs("div",{className:"contactform-body",id:"contactform-body",children:[s.jsx("input",{type:"text",placeholder:"Full Name",className:"contactform-input",autoComplete:"given-name"}),s.jsx("input",{type:"text",placeholder:"e-mail",className:"contactform-input",autoComplete:"email"}),s.jsx("textarea",{type:"textarea",placeholder:"message",className:"contactform-input contactform-textarea"}),s.jsx("button",{className:"signup-btn",children:"Send Message"})]})]}),h=()=>{const[e,o]=i.useState(null),a=t=>{o(t)};return s.jsxs(s.Fragment,{children:[s.jsxs("div",{className:"about-container",children:[s.jsxs("div",{children:[s.jsx("h1",{className:"title",children:"About"}),s.jsx("h1",{className:"title",children:"Us"})]}),s.jsx(l,{})]}),s.jsxs("div",{className:"about-photoslider",children:[s.jsx(d,{active:e==="PhotoSlider",onClick:()=>a("PhotoSlider")}),s.jsx("div",{className:"about-video",id:"about-video",children:s.jsx(r,{active:e==="VideoAbout",onClick:()=>a("VideoAbout")})})]}),s.jsx("div",{className:"about-info",id:"about-info",children:s.jsx(m,{})}),s.jsx("div",{className:"about-contactus-container",children:s.jsxs("div",{className:"about-contactus",id:"about-contactus",children:[s.jsx("h1",{className:"designed-test",id:"designed-test",children:"HEADQUARTERS"}),s.jsx(x,{}),s.jsx(u,{})]})})]})};export{h as default};
