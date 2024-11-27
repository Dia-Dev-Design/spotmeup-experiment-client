import{r as a,M as V,G as z,V as E,j as e,k as G,u as F,m as _,n as O,o as k,p as R,q as B,t as q,L as Y,v as K,w as U,N as Z}from"./index-CLCtADo9.js";import{E as $}from"./EditModal-DrTCNHuS.js";import"./cjs-BH8AYiWt.js";const H=({toggleForm:t})=>{a.useContext(V);const{isApiLoaded:j}=a.useContext(z),{venueDetail:s,setVenueDetail:b,venueId:h}=a.useContext(E),[f,y]=a.useState(null),[d,g]=a.useState(null),m=a.useRef(null),[c,u]=a.useState({_id:s==null?void 0:s._id,name:(s==null?void 0:s.name)||"",maxCapacity:(s==null?void 0:s.maxCapacity)||0,contact:{email:(s==null?void 0:s.contact.email)||"",owner:(s==null?void 0:s.contact.owner)||"",telephone:(s==null?void 0:s.contact.telephone)||""},address:{street:(s==null?void 0:s.address.street)||"",state:(s==null?void 0:s.address.state)||"",city:(s==null?void 0:s.address.city)||"",zip:(s==null?void 0:s.address.zip)||""},description:""});a.useEffect(()=>{if(console.log("API Loaded:",j),j&&m.current){const i=new window.google.maps.places.Autocomplete(m.current,{componentRestrictions:{country:["DO","US"]},fields:["place_id","geometry","name","formatted_address","address_components"]}),n=(o,N)=>{var p;return((p=o.find(x=>x.types.indexOf(N)!==-1))==null?void 0:p.long_name)||""};i.addListener("place_changed",()=>{const o=i.getPlace();if(console.log("formatted address:",o),o.formatted_address&&o.address_components){const N=n(o.address_components,"locality"),p=n(o.address_components,"administrative_area_level_1"),x=n(o.address_components,"postal_code");u(L=>({...L,address:{...L.address,street:o.formatted_address,city:N,state:p,zip:x},name:o.name}))}})}},[j]);const v=async i=>{i.preventDefault(),console.log("venueDetails",s);try{const n=await G(s._id,c);n.success&&y(n.message),setTimeout(()=>{y(null),b(c),t()},3e3)}catch(n){console.error("Line 98 - Error:",n),setTimeout(()=>{g(null)},3e3)}},l=i=>{const{name:n,value:o}=i.target,[N,p]=n.split(".");u(N&&p?x=>({...x,[N]:{...x[N],[p]:o}}):x=>({...x,[n]:o}))};return e.jsxs("form",{onSubmit:v,className:"venueform-container",children:[e.jsx("div",{className:"goback-container",children:e.jsx("button",{onClick:t,className:"goback-admin-form",children:"Go Back"})}),e.jsxs("div",{children:[f&&e.jsx("h1",{className:"success-message",children:f}),d&&e.jsx("h1",{className:"notsucces-messsage",children:d}),e.jsxs("div",{className:"venueform-spacefortwo",children:[e.jsxs("div",{className:"venueform-label-input",children:[e.jsx("label",{htmlFor:"address.street",children:"Full Address"}),e.jsx("input",{ref:m,type:"text",name:"address.street",onChange:l,value:c.address.street})]}),e.jsxs("div",{className:"venueform-label-input",children:[e.jsx("label",{htmlFor:"name",children:"Name"}),e.jsx("input",{type:"text",name:"name",onChange:l,value:c.name})]})]}),e.jsxs("div",{className:"venueform-spacefortwo",children:[e.jsxs("div",{className:"venueform-label-input",children:[e.jsx("label",{htmlFor:"address.city",children:"City"}),e.jsx("input",{type:"text",name:"address.city",onChange:l,value:c.address.city})]}),e.jsxs("div",{className:"venueform-label-input",children:[e.jsx("label",{htmlFor:"address.state",children:"State / Provice"}),e.jsx("input",{type:"state",name:"address.state",onChange:l,value:c.address.state})]})]}),e.jsxs("div",{className:"venueform-spacefortwo",children:[e.jsxs("div",{className:"venueform-label-input",children:[e.jsx("label",{htmlFor:"address.zip",children:"Zip-Code"}),e.jsx("input",{type:"number",name:"address.zip",onChange:l,value:c.address.zip})]}),e.jsxs("div",{className:"venueform-label-input",children:[e.jsx("label",{htmlFor:"contact.owner",children:"Owner"}),e.jsx("input",{type:"owner",name:"contact.owner",onChange:l,value:c.contact.owner})]})]}),e.jsxs("div",{className:"venueform-spacefortwo-special-container",children:[e.jsxs("div",{className:"venueform-label-input",children:[e.jsx("label",{htmlFor:"maxCapacity",children:"Max Capacity"}),e.jsx("input",{type:"number",name:"maxCapacity",onChange:l,value:c.maxCapacity})]}),e.jsxs("div",{className:"venueform-spacefortwo-special",children:[e.jsxs("div",{className:"venueform-label-input-special",children:[e.jsx("label",{htmlFor:"contact.email",children:"e-mail"}),e.jsx("input",{type:"email",name:"contact.email",onChange:l,value:c.contact.email})]}),e.jsxs("div",{className:"venueform-label-input-special",children:[e.jsx("label",{htmlFor:"contact.telephone",children:"Telephone"}),e.jsx("input",{type:"telephone",name:"contact.telephone",onChange:l,value:c.contact.telephone})]})]})]})]}),e.jsx("button",{type:"submit",className:"editprofile-submit width-100",children:"Submit"})]})},J=()=>{var o,N,p,x,L;const{venueDetail:t,setVenueId:j}=a.useContext(E),[s,b]=a.useState(!1),[h,f]=a.useState(!1),y=F(),d=_(),[g,m]=a.useState(null),[c,u]=a.useState(null),v=()=>{b(S=>!S)},l=()=>{f(S=>!S)},i=()=>{y("/myevents")};a.useEffect(()=>{d&&j(d.venueIdParam)},[d.venueIdParam,j]);const n=async S=>{try{const w=await O(S);console.log("Line 38 - Response",w),m(w.message),setTimeout(()=>{console.log("cleared success message"),y("/myevents"),m(null)},3e3)}catch(w){console.log("error:",w),u(w.response.data.message),setTimeout(()=>{console.log("cleared Not Success message"),u(null)},3e3)}};return e.jsxs("div",{className:"photoslider-container photoslider-container-venue",children:[e.jsx("div",{className:"icons-tabs-container-photoslider admin-tabs-icons",children:e.jsx("div",{className:"icon-close admin-icon-close",onClick:i})}),e.jsxs("div",{className:"photoslider-body admin-body",children:[!s&&!h&&e.jsxs(e.Fragment,{children:[e.jsx("div",{className:"admin-venue-img"}),e.jsxs("div",{className:"admin-fields-container",children:[e.jsx("h1",{id:"admin-detail-name",children:t==null?void 0:t.name}),e.jsxs("h1",{id:"admin-detail-city",children:[(o=t==null?void 0:t.address)==null?void 0:o.city,", ",(N=t==null?void 0:t.address)==null?void 0:N.state]}),e.jsxs("div",{className:"admin-options",children:[e.jsx("h1",{children:"Max Capacity:"}),e.jsx("h1",{children:t==null?void 0:t.maxCapacity})]}),e.jsxs("div",{className:"admin-options",children:[e.jsx("h1",{children:"Contact:"}),e.jsx("h1",{children:(p=t==null?void 0:t.contact)==null?void 0:p.email})]}),e.jsxs("div",{className:"admin-options",children:[e.jsx("h1",{children:"Owner:"}),e.jsx("h1",{children:(x=t==null?void 0:t.contact)==null?void 0:x.owner})]}),e.jsxs("div",{className:"admin-options",children:[e.jsx("h1",{children:"Telephone:"}),e.jsx("h1",{children:(L=t==null?void 0:t.contact)==null?void 0:L.telephone})]}),e.jsxs("div",{className:"admin-options",children:[e.jsx("button",{onClick:l,children:"Edit Venue"}),e.jsx("button",{className:"delete-venue",onClick:v,children:"Delete Venue"})]})]})]}),s&&e.jsxs("div",{className:"admin-options-prompt",children:[g&&e.jsx("h1",{id:"success-message-venue",children:g}),c&&e.jsx("h1",{id:"not-success-message-venue",children:c}),e.jsxs("h1",{children:["Are you sure you want to delete ",t==null?void 0:t.name,"?"]}),e.jsxs("div",{className:"admin-options-two",children:[e.jsx("button",{onClick:()=>n(d.venueIdParam),children:"Yes"}),e.jsx("button",{className:"delete-venue",onClick:v,children:"No"})]})]}),!s&&h&&e.jsx("div",{children:e.jsx(H,{toggleForm:l})})]})]})},Q=()=>{const[t,j]=a.useState(null),[s,b]=a.useState(null),[h,f]=a.useState(null),[y,d]=a.useState(!0),g=_(),{toggleLayoutForm:m,layoutAdded:c,setLayoutAdded:u}=a.useContext(k),v=n=>{j(n.target.value)},l=()=>{d(n=>!n)},i=async n=>{n.preventDefault();try{const o=await R(g.venueIdParam,t);console.log("response",o),b(o.message),console.log("success message:",s),setTimeout(()=>{l(),b(null),m(),u(!0)},3e3)}catch(o){console.log("error:",o),f(o.response.data.message),console.log("not success message:",h),setTimeout(()=>{f(null)},3e3)}};return e.jsxs("form",{className:"layout-form-container",children:[e.jsx("input",{type:"text",name:"name",value:t,onChange:v}),y&&e.jsxs(e.Fragment,{children:[e.jsx("button",{type:"submit",className:"correct-btn",onClick:i}),e.jsx("button",{className:"incorrect-btn"})]}),s&&e.jsx("h1",{className:"layout-success-msg",children:s}),h&&e.jsx("h1",{className:"layout-not-success-msg",children:h})]})},W=()=>{const{layoutDetails:t,setLayoutDetails:j,layoutEdited:s,setLayoutEdited:b,setLayoutId:h}=a.useContext(k),[f,y]=a.useState({name:t==null?void 0:t.name}),d=()=>{j(null),h(null)},[g,m]=a.useState(null),[c,u]=a.useState(null),v=i=>{y({name:i.target.value}),console.log("e.target.value",i.target.value)},l=async i=>{i.preventDefault();try{const n=await B(t._id,f);console.log("response",n),m(n.message),setTimeout(()=>{m(null),b(!0),d()},1500)}catch(n){console.log("error:",n),u(n.response.data.message),setTimeout(()=>{u(null),d()},1500)}};return e.jsxs("form",{onSubmit:l,className:"layout-edit-form",children:[e.jsx("input",{type:"text",value:f.name,onChange:v}),e.jsx("button",{type:"submit",className:"correct-btn",onClick:l}),e.jsx("button",{className:"incorrect-btn",onClick:d}),g&&e.jsx("h1",{className:"layout-success-msg",children:g}),c&&e.jsx("h1",{className:"layout-not-success-msg",children:c})]})},X=()=>{const{toggleEditingModal:t,showEditingModal:j,toggleLayoutForm:s,showLayoutForm:b,setLayoutId:h,layoutId:f,layoutAdded:y,setLayoutAdded:d,layoutDetails:g,layoutEdited:m,setLayoutEdited:c,layoutDeleted:u,setLayoutDeleted:v,layoutGoBack:l,setLayoutGoBack:i,setLayoutDetails:n}=a.useContext(k),{setCircles:o,setSquares:N}=a.useContext(q),[p,x]=a.useState(null),[L,S]=a.useState(null),w=_(),M=F();a.useEffect(()=>{h(null),n(null),o([]),N([])},[]),a.useEffect(()=>{(async()=>{try{const C=await K(w.venueIdParam);x(C.layouts),y&&d(null),m&&c(null),u&&v(null)}catch(C){console.log("error:",C)}})()},[y,m,u]);const I=r=>r%2===0,T=r=>{console.log("layoutId",r),h(r)},P=async r=>{try{const C=await U(r);console.log("Deleted Layout",C),h(r),v(!0),S(!1)}catch(C){console.error("Error:",C)}},A=r=>{M(`/admin/designpage/${r}`)};return e.jsxs(e.Fragment,{children:[e.jsxs("div",{className:"layout-title-container-parent",children:[e.jsxs("div",{className:"layout-title-container",children:[e.jsx("h1",{className:"layout-title",children:"Layouts"}),e.jsx("button",{className:"layout-add-btn",onClick:s,children:"Add New Layout"})]}),j&&e.jsx($,{})]}),b&&e.jsx(Q,{}),e.jsx("div",{className:"layouts-display-container",children:p&&[...p].reverse().map((r,C)=>e.jsx("div",{className:I(C)?"layout-content-container":"layout-content-container2",children:e.jsx("div",{className:"layout-map-content",children:g&&g._id===r._id?e.jsx(W,{}):e.jsxs("div",{className:"layout-table-container",children:[e.jsxs("div",{className:"layout-table",children:[e.jsx("h1",{className:"layout-display-font",children:r.name}),e.jsx(Y,{className:"edit-icon",onClick:()=>T(r._id)})]}),L===r._id?e.jsxs("div",{className:"layout-delete-prompt",children:[e.jsx("button",{onClick:()=>{P(r._id)},id:"layout-delete-btn-prompt",children:"Yes"}),e.jsx("button",{onClick:()=>S(null),children:"No"})]}):e.jsxs("div",{className:"layout-delete-page",children:[e.jsx("button",{id:"layout-design-prompt",onClick:()=>{A(r._id)},children:"Design"}),e.jsx("button",{onClick:()=>{S(r._id)},children:"Delete"})]})]})})},C))})]})},te=()=>e.jsxs("div",{className:"admin-venue-detail-full-container",children:[e.jsx(Z,{}),e.jsxs("div",{className:"admin-venue-detail-container",children:[e.jsx(J,{}),e.jsx(X,{})]})]});export{te as default};
