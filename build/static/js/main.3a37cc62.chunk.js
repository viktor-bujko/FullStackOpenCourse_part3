(this.webpackJsonpphonebook=this.webpackJsonpphonebook||[]).push([[0],{22:function(e,t,n){},42:function(e,t,n){"use strict";n.r(t);var o=n(2),r=n.n(o),c=n(17),s=n.n(c),a=(n(22),n(3)),u=n(0),i=function(e){var t=e.message,n=e.className;return null===t?null:Object(u.jsx)("div",{className:n,children:t})},l=function(e){var t=e.filter,n=t.state,o=t.setter;return Object(u.jsx)("form",{children:Object(u.jsxs)("div",{children:["Filter shown with: ",Object(u.jsx)("input",{onChange:function(e){var t=e.target.value;console.log("Current filter: ",t),o(t)},value:n})]})})},d=n(4),h=n.n(d),b="https://fullstackcourse-phonebook-vbjk.herokuapp.com/api/persons",f={getPeople:function(){return h.a.get(b).then((function(e){return console.log(e.data),e.data}))},createPerson:function(e){return h.a.post(b,e).then((function(e){return e.data}))},deletePerson:function(e){return h.a.delete("".concat(b,"/").concat(e)).then((function(e){return e.data}))},updatePerson:function(e,t){return h.a.put("".concat(b,"/").concat(e),t).then((function(e){return e.data}))}},j=n(8),m=3e3,p=function(e){var t=e.name,n=e.number,o=e.people,r=e.error,c=e.success,s=t.state,a=o.state,i=n.state,l=t.setter;return Object(u.jsxs)("form",{onSubmit:function(e){if(e.preventDefault(),0!==s.length&&0!==i.length)if(void 0!==a.find((function(e){return e.name===s})))!function(){var e=a.findIndex((function(e){return e.name===s})),t="".concat(a[e].name," is already added to phonebook. Replace the old number with a new one?");if(window.confirm(t)){var u=Object(j.a)(Object(j.a)({},a[e]),{},{number:i});console.log("UPDATE: ",u),f.updatePerson(u.id,u).then((function(e){console.log("Success: ",e);var t=a.map((function(t){return t.id!==u.id?t:e}));console.log("Updated array: ",t),o.setter(t),l(""),n.setter(""),c.setter("".concat(u.name,"'s number has been updated successfully!")),setTimeout((function(){return c.setter(null)}),m)})).catch((function(e){r.setter("Something went wrong during ".concat(u.name,"'s phone number modification!")),setTimeout((function(){r.setter(null)}),m)}))}}();else{console.log("Adding ",{newName:s}," to the phonebook.");var t={name:s,number:i};f.createPerson(t).then((function(e){console.log("Added: ",e),o.setter(a.concat(e)),c.setter("".concat(s," has been added to the phonebook.")),setTimeout((function(){return c.setter(null)}),m),l(""),n.setter("")})).catch((function(){r.setter("Something went wrong while adding ".concat(t.name," to the phonebook.")),setTimeout((function(){return r.setter(null)}),m)}))}else alert("Please, enter both the name and the phone number")},children:[Object(u.jsxs)("div",{children:["name: ",Object(u.jsx)("input",{onChange:function(e){var t=e.target.value;console.log("Current input state: ",t),l(t)},value:s})]}),Object(u.jsxs)("div",{children:["number: ",Object(u.jsx)("input",{onChange:function(e){var t=e.target.value;console.log("Current phone number: ",t),n.setter(t)},value:i})]}),Object(u.jsx)("div",{children:Object(u.jsx)("button",{type:"submit",children:"Add new person"})})]})},g=function(e){var t=e.people,n=e.filter,o=e.success,r=e.error,c=n.state,s=t.state,a=s.filter((function(e){return e.name.toLowerCase().startsWith(c.toLowerCase())}));return 0===a.length?Object(u.jsx)("div",{children:"No people to show."}):a.map((function(e){var n=e.name.indexOf(" ");return n=-1===n?e.name.length:n,Object(u.jsxs)("div",{className:"person",children:["".concat(e.name," ").concat(e.number," "),Object(u.jsxs)("button",{onClick:function(){return function(e){window.confirm("Delete ".concat(e.name," from the phonebook?"))&&f.deletePerson(e.id).then((function(n){var r=s.filter((function(t){return t.id!==e.id}));o.setter("".concat(e.name," has been deleted successfully.")),t.setter(r),setTimeout((function(){return o.setter(null)}),m)})).catch((function(){r.setter("Something went wrong while deleting ".concat(e.name,".")),setTimeout((function(){return r.setter(null)}),m)}))}(e)},children:["Delete ",e.name.slice(0,n)]})]},e.id)}))},O=function(){var e=Object(o.useState)([]),t=Object(a.a)(e,2),n=t[0],r=t[1],c=Object(o.useState)(""),s=Object(a.a)(c,2),d=s[0],h=s[1],b=Object(o.useState)(""),j=Object(a.a)(b,2),m=j[0],O=j[1],v=Object(o.useState)(""),x=Object(a.a)(v,2),w=x[0],k=x[1],P=Object(o.useState)(null),S=Object(a.a)(P,2),C=S[0],T=S[1],N=Object(o.useState)(null),y=Object(a.a)(N,2),A=y[0],D=y[1];Object(o.useEffect)((function(){f.getPeople().then((function(e){console.log(e),r(e)}))}),[]);var F={state:w,setter:k},L={state:d,setter:h},E={state:m,setter:O},I={state:n,setter:r},B={state:C,setter:T},J={state:A,setter:D};return Object(u.jsxs)("div",{children:[Object(u.jsx)("h1",{children:"Phonebook"}),Object(u.jsx)(i,{message:C,className:"error"}),Object(u.jsx)(i,{message:A,className:"success"}),Object(u.jsx)(l,{filter:F}),Object(u.jsx)("h3",{children:"Add a new"}),Object(u.jsx)(p,{name:L,number:E,people:I,error:B,success:J}),Object(u.jsx)("h3",{children:"Numbers"}),Object(u.jsx)(g,{people:I,filter:F,error:B,success:J})]})},v=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,43)).then((function(t){var n=t.getCLS,o=t.getFID,r=t.getFCP,c=t.getLCP,s=t.getTTFB;n(e),o(e),r(e),c(e),s(e)}))};s.a.render(Object(u.jsx)(r.a.StrictMode,{children:Object(u.jsx)(O,{})}),document.getElementById("root")),v()}},[[42,1,2]]]);
//# sourceMappingURL=main.3a37cc62.chunk.js.map