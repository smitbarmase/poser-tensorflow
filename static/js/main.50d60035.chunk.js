(this["webpackJsonpposex-tensorflow"]=this["webpackJsonpposex-tensorflow"]||[]).push([[0],{261:function(e,t,n){},267:function(e,t){},268:function(e,t){},276:function(e,t){},279:function(e,t){},280:function(e,t){},290:function(e,t){},294:function(e,t,n){"use strict";n.r(t);var a=n(78),c=n(237),s=n.n(c),r=(n(261),n(4)),i=n.n(r),l=n(11),o=n(6),u=n(194),d=n(52),b=function(){var e=Object(a.useState)(null),t=Object(o.a)(e,2),n=t[0],c=t[1],s=Object(a.useState)(null),r=Object(o.a)(s,2),b=r[0],p=r[1],h=Object(a.useState)(null),f=Object(o.a)(h,2),j=f[0],m=f[1],x=["bg-red-50","bg-yellow-50","bg-blue-50","bg-pink-50","bg-purple-50","bg-green-50"],g=["bg-red-300","bg-yellow-300","bg-blue-300","bg-pink-300","bg-purple-300","bg-green-300"],w=Object(a.useCallback)(Object(l.a)(i.a.mark((function e(){var t,a,c;return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!n||!b){e.next=7;break}return e.next=3,b.predict(n.canvas);case 3:for(t=e.sent,a=[],c=0;c<b.getTotalClasses();c++)a.push({name:t[c].className,probability:t[c].probability.toFixed(2)});m(a);case 7:case"end":return e.stop()}}),e)}))),[n,b]),v=Object(a.useCallback)(Object(l.a)(i.a.mark((function e(){return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n.update(),e.next=3,w();case 3:window.requestAnimationFrame(v);case 4:case"end":return e.stop()}}),e)}))),[n,w]),O=function(){var e=Object(l.a)(i.a.mark((function e(){var t;return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!n){e.next=9;break}return t=document.getElementById("canvas"),t.getContext("2d").clearRect(0,0,t.width,t.height),e.next=6,n.stop();case 6:c(null),e.next=10;break;case 9:c(new u.Webcam(300,300,!0));case 10:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();return Object(a.useEffect)((function(){n?function(){var e=Object(l.a)(i.a.mark((function e(){return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,n.setup();case 2:return e.next=4,n.play();case 4:window.requestAnimationFrame(v),n.canvas=document.getElementById("canvas");case 6:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}()():m(null)}),[n,v]),Object(a.useEffect)((function(){u.load("https://teachablemachine.withgoogle.com/models/_btPzUnuE/model.json","https://teachablemachine.withgoogle.com/models/_btPzUnuE/metadata.json").then((function(e){return p(e)}))}),[]),Object(d.jsx)("div",{className:"bg-gray-200 h-screen w-full flex flex-col justify-center",children:Object(d.jsxs)("div",{className:"mx-auto w-min flex space-x-4",children:[Object(d.jsxs)("div",{className:"space-y-4",children:[Object(d.jsxs)("div",{className:"bg-white rounded-md shadow p-4 space-y-4",children:[Object(d.jsx)("div",{className:"text-lg",children:"Preview"}),Object(d.jsx)("canvas",{id:"canvas",width:"300",height:"300",className:"rounded bg-gray-50"})]}),Object(d.jsx)("button",{onClick:O,className:"bg-white rounded-md shadow text-lg py-3 w-full ".concat(n?"text-red-500":"text-blue-500"," ").concat(b?"hover:bg-gray-50":"opacity-70 cursor-default"),disabled:!b,children:b?n?"Stop":"Start":"Setting up..."})]}),j&&Object(d.jsxs)("div",{className:"bg-white rounded-md shadow p-4 w-80 space-y-4",children:[Object(d.jsx)("div",{className:"text-lg",children:"Classes"}),Object(d.jsx)("div",{className:"space-y-3",children:j.map((function(e,t){var n=e.name,a=e.probability;return Object(d.jsxs)("div",{className:"space-y-2",children:[Object(d.jsx)("div",{className:"text-base text-gray-800",children:n}),Object(d.jsx)("div",{className:"h-10 rounded w-full flex ".concat(x[t%x.length]),children:Object(d.jsx)("div",{className:"rounded ".concat(g[t%g.length]),style:{width:100*a+"%"}})})]},t)}))})]})]})})};s.a.render(Object(d.jsx)(b,{}),document.getElementById("root"))}},[[294,1,2]]]);
//# sourceMappingURL=main.50d60035.chunk.js.map