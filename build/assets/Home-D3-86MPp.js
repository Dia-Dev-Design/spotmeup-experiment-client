import{j as e,r as x,u as B,S as U,A as V,N as L,f as _}from"./index-CLCtADo9.js";import{g as k,c as Y,a as X,S as G,A as J,P as W,b as K}from"./a11y-BisvvVet.js";const Z="/assets/location-1-CeVy_aUR.png",Q="/assets/location-2-BrYJJB5f.png",ee="/assets/location-3-Yzdu5uKx.png",se="/assets/location-4-CF5wwN8u.png",te=()=>e.jsxs("div",{children:[e.jsxs("div",{className:"upcoming-events-title margin-top",children:[e.jsx("h1",{className:"find-your-spot",children:"Locate A Spot"}),e.jsx("h1",{className:"browse-events",children:"LOCATE SPOTS"})]}),e.jsxs("div",{className:"locations-infite",children:[e.jsx("img",{src:Z,alt:"spot-location-image"}),e.jsx("img",{src:Q,alt:"spot-location-image"}),e.jsx("img",{src:ee,alt:"spot-location-image"}),e.jsx("img",{src:se,alt:"spot-location-image"})]})]});function re(i){const{effect:a,swiper:s,on:o,setTranslate:p,setTransition:f,overwriteParams:h,perspective:t,recreateShadows:r,getEffectParams:d}=i;o("beforeInit",()=>{if(s.params.effect!==a)return;s.classNames.push(`${s.params.containerModifierClass}${a}`),t&&t()&&s.classNames.push(`${s.params.containerModifierClass}3d`);const n=h?h():{};Object.assign(s.params,n),Object.assign(s.originalParams,n)}),o("setTranslate",()=>{s.params.effect===a&&p()}),o("setTransition",(n,u)=>{s.params.effect===a&&f(u)}),o("transitionEnd",()=>{if(s.params.effect===a&&r){if(!d||!d().slideShadows)return;s.slides.forEach(n=>{n.querySelectorAll(".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left").forEach(u=>u.remove())}),r()}});let l;o("virtualUpdate",()=>{s.params.effect===a&&(s.slides.length||(l=!0),requestAnimationFrame(()=>{l&&s.slides&&s.slides.length&&(p(),l=!1)}))})}function ae(i,a){const s=k(a);return s!==a&&(s.style.backfaceVisibility="hidden",s.style["-webkit-backface-visibility"]="hidden"),s}function T(i,a,s){const o=`swiper-slide-shadow${s?`-${s}`:""}${` swiper-slide-shadow-${i}`}`,p=k(a);let f=p.querySelector(`.${o.split(" ").join(".")}`);return f||(f=Y("div",o.split(" ")),p.append(f)),f}function ie(i){let{swiper:a,extendParams:s,on:o}=i;s({coverflowEffect:{rotate:50,stretch:0,depth:100,scale:1,modifier:1,slideShadows:!0}}),re({effect:"coverflow",swiper:a,on:o,setTranslate:()=>{const{width:h,height:t,slides:r,slidesSizesGrid:d}=a,l=a.params.coverflowEffect,n=a.isHorizontal(),u=a.translate,O=n?-u+h/2:-u+t/2,M=n?l.rotate:-l.rotate,q=l.depth,P=X(a);for(let v=0,H=r.length;v<H;v+=1){const m=r[v],S=d[v],I=m.swiperSlideOffset,F=(O-I-S/2)/S,c=typeof l.modifier=="function"?l.modifier(F):F*l.modifier;let y=n?M*c:0,E=n?0:M*c,N=-q*Math.abs(c),w=l.stretch;typeof w=="string"&&w.indexOf("%")!==-1&&(w=parseFloat(l.stretch)/100*S);let A=n?0:w*c,C=n?w*c:0,$=1-(1-l.scale)*Math.abs(c);Math.abs(C)<.001&&(C=0),Math.abs(A)<.001&&(A=0),Math.abs(N)<.001&&(N=0),Math.abs(y)<.001&&(y=0),Math.abs(E)<.001&&(E=0),Math.abs($)<.001&&($=0);const R=`translate3d(${C}px,${A}px,${N}px)  rotateX(${P(E)}deg) rotateY(${P(y)}deg) scale(${$})`,z=ae(l,m);if(z.style.transform=R,m.style.zIndex=-Math.abs(Math.round(c))+1,l.slideShadows){let j=n?m.querySelector(".swiper-slide-shadow-left"):m.querySelector(".swiper-slide-shadow-top"),b=n?m.querySelector(".swiper-slide-shadow-right"):m.querySelector(".swiper-slide-shadow-bottom");j||(j=T("coverflow",m,n?"left":"top")),b||(b=T("coverflow",m,n?"right":"bottom")),j&&(j.style.opacity=c>0?c:0),b&&(b.style.opacity=-c>0?-c:0)}}},setTransition:h=>{a.slides.map(r=>k(r)).forEach(r=>{r.style.transitionDuration=`${h}ms`,r.querySelectorAll(".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left").forEach(d=>{d.style.transitionDuration=`${h}ms`})})},perspective:()=>!0,overwriteParams:()=>({watchSlidesProgress:!0})})}const D="data:image/svg+xml,%3csvg%20width='24'%20height='24'%20viewBox='0%200%2024%2024'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cg%20id='Arrows'%3e%3cpath%20id='Vector'%20d='M5%2012H19'%20stroke='%23B19FFF'%20stroke-width='2'%20stroke-linecap='round'%20stroke-linejoin='round'/%3e%3cpath%20id='Vector_2'%20d='M12%205L19%2012L12%2019'%20stroke='%23B19FFF'%20stroke-width='2'%20stroke-linecap='round'%20stroke-linejoin='round'/%3e%3c/g%3e%3c/svg%3e",oe=({events:i})=>{const[a,s]=x.useState(0),o=x.useRef(null),p=()=>{var r;const t=(r=o==null?void 0:o.current)==null?void 0:r.realIndex;s(t)},f=B();i==null||i.filter(t=>{const r=new Date(t.date),d=new Date;return r.setHours(0,0,0,0)>=d.setHours(0,0,0,0)});const h=(t,r)=>{a===r&&f(`/event-details/${t}`)};return e.jsxs(e.Fragment,{children:[e.jsxs("div",{className:"h-[536px] flex-col justify-start items-center gap-8 inline-flex",children:[e.jsx("div",{className:"w-[1300px] h-[480px] relative"}),e.jsxs("div",{className:"w-[188px] justify-between items-center inline-flex",children:[e.jsx("div",{style:{backgroundImage:`url(${D})`,backgroundSize:"100%",alignSelf:"center",cursor:"pointer",transform:"rotate(180deg)"},className:"w-6 h-6 relative   rounded-3xl "}),e.jsxs("div",{className:"rounded-3xl justify-start items-start gap-2 flex",children:[e.jsx("div",{className:"w-3 h-2 relative",children:e.jsx("div",{className:"w-3 h-2 left-0 top-0 absolute bg-[#b09fff] rounded-[20px]"})}),i&&i.sort((t,r)=>new Date(r.createdAt)-new Date(t.createdAt)).slice(0,5).map((t,r)=>e.jsx("div",{className:"w-3 h-2 relative",children:e.jsx("div",{className:"w-2 h-2 left-0 top-0 absolute bg-[#efefef] rounded-[20px]"})},r))]}),e.jsx("div",{style:{backgroundImage:`url(${D})`,backgroundSize:"100%",alignSelf:"center",cursor:"pointer"},className:"w-6 h-6 relative rounded-3xl "})]})]}),e.jsx(G,{effect:"coverflow",grabCursor:!0,slidesPerView:"auto",centeredSlides:!0,coverflowEffect:{rotate:50,stretch:0,depth:150,modifier:1,slideShadows:!0},className:"mySwiper",pagination:{clickable:!0,renderCustom:(t,r,d)=>{let l="";for(let n=1;n<=d;n++)l+=`
              <span class="${n===r?"custom-bullet active":"custom-bullet"}">
                ${n}
              </span>
            `;return`<div class="custom-pagination">${l}</div>`}},loop:!0,modules:[J,ie,W],onSlideChange:p,onSwiper:t=>{o.current=t},children:i&&i.sort((t,r)=>new Date(r.createdAt)-new Date(t.createdAt)).slice(0,10).map((t,r)=>e.jsx(K,{onClick:()=>h(t._id,r),style:{paddingBottom:"0rem",borderRadius:"20px"},children:e.jsx("img",{src:t!=null&&t.images[0]?t==null?void 0:t.images[0]:"/no-image.jpg",alt:"event-logo",style:{width:"100%",height:"300px",objectFit:"cover",borderRadius:"20px"}})},t._id))})]})},ne=()=>e.jsxs("div",{className:"footer-big-container",children:[e.jsxs("div",{className:"footer-divider",children:[e.jsx("img",{src:U,alt:"spotmeup-logo"}),e.jsxs("div",{className:"footer-links-divider",children:[e.jsx("h1",{children:"Buyer Guarantee"}),e.jsx("h1",{children:"About Us"}),e.jsx("h1",{children:"Promote Event"}),e.jsx("h1",{children:"Socials"})]})]}),e.jsxs("div",{className:"footer-divider light-text",children:[e.jsx("h1",{children:"©️ 2024 Spot Me Up. All Rights Reserved."}),e.jsx("h1",{className:"footer-terms-service",children:"Terms of Service Privacy Policy"})]})]}),g="/assets/event-card-D_8w5P20.svg",le=({events:i})=>(B(),i==null||i.filter(a=>{const s=new Date(a.date),o=new Date;return s.setHours(0,0,0,0)>=o.setHours(0,0,0,0)}),e.jsxs("div",{className:"upcoming-events-container",children:[e.jsxs("div",{className:"upcoming-events-title",children:[e.jsx("h1",{className:"find-your-spot",children:"Find your Spot"}),e.jsx("h1",{className:"browse-events",children:"BROWSE EVENTS"})]}),e.jsxs("div",{className:"upcoming-events-infite",children:[e.jsx("img",{src:g,alt:"Event Card"}),e.jsx("img",{src:g,alt:"Event Card"}),e.jsx("img",{src:g,alt:"Event Card"}),e.jsx("img",{src:g,alt:"Event Card"}),e.jsx("img",{src:g,alt:"Event Card"})]})]})),fe=()=>{const[i,a]=x.useState(null);x.useContext(V);const s=async()=>{try{const o=await _();o.success&&a(o.events)}catch(o){console.error("FindAllEvents - Error:",o.response)}};return x.useEffect(()=>{s()},[]),e.jsxs("div",{className:"homepage-container",children:[e.jsx("h1",{className:"become-promoter",children:"Become a promoter"}),e.jsx(L,{}),e.jsx(oe,{events:i}),e.jsx(le,{events:i}),e.jsx(te,{events:i}),e.jsx(ne,{})]})};export{fe as default};
