import{r as c,T as j,B as v,j as e}from"./index-B9oWzHjl.js";const u=()=>{var l;const{tShapeEdited:r}=c.useContext(j),{layoutObject:a,setLayoutObject:b}=c.useContext(v);c.useState(0);const[m,h]=c.useState(!1);c.useEffect(()=>{console.log("layoutObject:",a)},[a]),c.useEffect(()=>{a&&h(()=>{var s;return(s=a==null?void 0:a.blocks)==null?void 0:s.some(i=>i.tables.length)})},[a,r]);const[d,x]=c.useState(0);console.log("dropdownNumber:",d);const o=s=>{x(i=>i===s?null:s)};function t(s){return s.toString().replace(/\B(?=(\d{3})+(?!\d))/g,",")}return e.jsxs("div",{className:"BD-tickets-container",children:[e.jsxs("div",{className:"tickets-expectation",children:[e.jsx("div",{className:"ticket-expectation-item",children:"Total Tickets"}),e.jsxs("div",{className:"ticket-expectation-item",children:[e.jsx("h1",{className:"ticket-expected-return",children:"Expected Return:"}),e.jsx("h1",{className:"ticket-expected-return-h1",children:" $5000"})]})]}),e.jsxs("div",{className:"bd-excel-container",children:[e.jsxs("div",{className:"bd-excel-titles-container",children:[e.jsx("h1",{className:"bd-excel-titles",children:"Item"}),m&&e.jsx("h1",{className:"bd-excel-titles",children:"Tickets Included"}),e.jsx("h1",{className:"bd-excel-titles",children:"Max Capacity"}),e.jsx("h1",{className:"bd-excel-titles",children:"Tickets"}),e.jsx("h1",{className:"bd-excel-titles",children:"Price"}),e.jsx("h1",{className:"bd-excel-titles arrow-container"})]}),(l=a==null?void 0:a.blocks)==null?void 0:l.map((s,i)=>e.jsxs("div",{className:"BD-Mapping-bigcontainer",children:[e.jsxs("div",{className:"BD-block-mapping-container",onClick:()=>o(i),children:[e.jsx("div",{className:"bd-div",children:e.jsx("h1",{className:"BD-block-name",children:s==null?void 0:s.name})}),e.jsx("div",{className:"bd-div",children:e.jsx("h1",{className:"BD-block-name",children:e.jsx("h1",{className:"BD-block-name",children:s.tables.length?s==null?void 0:s.totalTicketsIncluded:"-"})})}),e.jsx("div",{className:"bd-div",children:e.jsx("h1",{className:"BD-block-name",children:s==null?void 0:s.maxCapacity})}),e.jsx("div",{className:"bd-div",children:e.jsx("h1",{className:"BD-block-name",children:s==null?void 0:s.btickets})}),e.jsx("div",{className:"bd-div",children:e.jsxs("h1",{className:"BD-block-name",children:["$",t(s.bprice)]})}),e.jsx("div",{className:"bd-div arrow-container",children:e.jsx("div",{className:s.tables.length?"arrow down":"hide"})})]}),e.jsx("div",{className:d===i?"animation":"hide-dropdown animation",children:s.tables.map((n,N)=>e.jsxs("div",{className:"breakdown-table-container",children:[e.jsx("div",{className:"breakdown-div",children:e.jsxs("h1",{className:"breakdown-table",children:["Table #",n.number]})}),e.jsx("div",{className:"breakdown-div",children:e.jsx("h1",{className:"breakdown-table",children:n.ticketsIncluded})}),e.jsx("div",{className:"breakdown-div",children:e.jsx("h1",{className:"breakdown-table",children:n.maxCapacity})}),e.jsx("div",{className:"breakdown-div",children:e.jsx("h1",{className:"breakdown-table",children:n.tickets})}),e.jsx("div",{className:"breakdown-div",children:e.jsxs("h1",{className:"breakdown-table",children:["$",t(n.tprice)]})}),e.jsx("div",{className:"breakdown-div arrow-container"})]},N))})]},i))]}),e.jsx("div",{className:"breakdown-bg"})]})};export{u as default};