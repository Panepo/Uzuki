(window.webpackJsonp=window.webpackJsonp||[]).push([[3],{427:function(e,t,l){"use strict";var a=l(3);Object.defineProperty(t,"__esModule",{value:!0}),Object.defineProperty(t,"default",{enumerable:!0,get:function(){return n.default}});var n=a(l(966))},428:function(e,t,l){"use strict";var a=l(3);Object.defineProperty(t,"__esModule",{value:!0}),Object.defineProperty(t,"default",{enumerable:!0,get:function(){return n.default}});var n=a(l(967))},429:function(e,t,l){"use strict";var a=l(3);Object.defineProperty(t,"__esModule",{value:!0}),Object.defineProperty(t,"default",{enumerable:!0,get:function(){return n.default}});var n=a(l(968))},959:function(e,t,l){"use strict";var a=l(3);Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var n=a(l(0)),i=(0,a(l(44)).default)(n.default.createElement(n.default.Fragment,null,n.default.createElement("path",{d:"M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"}),n.default.createElement("path",{fill:"none",d:"M0 0h24v24H0z"})),"Delete");t.default=i},963:function(e,t,l){(function(e){function l(e,t){for(var l=0,a=e.length-1;a>=0;a--){var n=e[a];"."===n?e.splice(a,1):".."===n?(e.splice(a,1),l++):l&&(e.splice(a,1),l--)}if(t)for(;l--;l)e.unshift("..");return e}var a=/^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/,n=function(e){return a.exec(e).slice(1)};function i(e,t){if(e.filter)return e.filter(t);for(var l=[],a=0;a<e.length;a++)t(e[a],a,e)&&l.push(e[a]);return l}t.resolve=function(){for(var t="",a=!1,n=arguments.length-1;n>=-1&&!a;n--){var o=n>=0?arguments[n]:e.cwd();if("string"!==typeof o)throw new TypeError("Arguments to path.resolve must be strings");o&&(t=o+"/"+t,a="/"===o.charAt(0))}return(a?"/":"")+(t=l(i(t.split("/"),function(e){return!!e}),!a).join("/"))||"."},t.normalize=function(e){var a=t.isAbsolute(e),n="/"===o(e,-1);return(e=l(i(e.split("/"),function(e){return!!e}),!a).join("/"))||a||(e="."),e&&n&&(e+="/"),(a?"/":"")+e},t.isAbsolute=function(e){return"/"===e.charAt(0)},t.join=function(){var e=Array.prototype.slice.call(arguments,0);return t.normalize(i(e,function(e,t){if("string"!==typeof e)throw new TypeError("Arguments to path.join must be strings");return e}).join("/"))},t.relative=function(e,l){function a(e){for(var t=0;t<e.length&&""===e[t];t++);for(var l=e.length-1;l>=0&&""===e[l];l--);return t>l?[]:e.slice(t,l-t+1)}e=t.resolve(e).substr(1),l=t.resolve(l).substr(1);for(var n=a(e.split("/")),i=a(l.split("/")),o=Math.min(n.length,i.length),r=o,s=0;s<o;s++)if(n[s]!==i[s]){r=s;break}var c=[];for(s=r;s<n.length;s++)c.push("..");return(c=c.concat(i.slice(r))).join("/")},t.sep="/",t.delimiter=":",t.dirname=function(e){var t=n(e),l=t[0],a=t[1];return l||a?(a&&(a=a.substr(0,a.length-1)),l+a):"."},t.basename=function(e,t){var l=n(e)[2];return t&&l.substr(-1*t.length)===t&&(l=l.substr(0,l.length-t.length)),l},t.extname=function(e){return n(e)[3]};var o="b"==="ab".substr(-1)?function(e,t,l){return e.substr(t,l)}:function(e,t,l){return t<0&&(t=e.length+t),e.substr(t,l)}}).call(this,l(81))},964:function(e,t,l){e.exports=l.p+"static/media/list.84b3ebaa.jpg"},965:function(e,t,l){e.exports=l.p+"static/media/uzukilist.a38a9a78.png"},966:function(e,t,l){"use strict";var a=l(3);Object.defineProperty(t,"__esModule",{value:!0}),t.default=t.styles=void 0;var n=a(l(6)),i=a(l(7)),o=a(l(0)),r=(a(l(5)),a(l(9))),s=(a(l(42)),l(13),a(l(11))),c={root:{display:"flex",flexWrap:"wrap",overflowY:"auto",listStyle:"none",padding:0,WebkitOverflowScrolling:"touch"}};function u(e){var t=e.cellHeight,l=e.children,a=e.classes,s=e.className,c=e.cols,u=e.component,f=e.spacing,d=e.style,m=(0,i.default)(e,["cellHeight","children","classes","className","cols","component","spacing","style"]);return o.default.createElement(u,(0,n.default)({className:(0,r.default)(a.root,s),style:(0,n.default)({margin:-f/2},d)},m),o.default.Children.map(l,function(e){if(!o.default.isValidElement(e))return null;var l=e.props.cols||1,a=e.props.rows||1;return o.default.cloneElement(e,{style:(0,n.default)({width:"".concat(100/c*l,"%"),height:"auto"===t?"auto":t*a+f,padding:f/2},e.props.style)})}))}t.styles=c,u.defaultProps={cellHeight:180,cols:2,component:"ul",spacing:4};var f=(0,s.default)(c,{name:"MuiGridList"})(u);t.default=f},967:function(e,t,l){"use strict";var a=l(3);Object.defineProperty(t,"__esModule",{value:!0}),t.default=t.styles=void 0;var n=a(l(6)),i=a(l(7)),o=a(l(285)),r=a(l(19)),s=a(l(20)),c=a(l(24)),u=a(l(25)),f=a(l(26)),d=a(l(0)),m=(a(l(5)),a(l(9))),p=a(l(117)),h=a(l(171)),g=(l(13),a(l(11))),v={root:{boxSizing:"border-box",flexShrink:0},tile:{position:"relative",display:"block",height:"100%",overflow:"hidden"},imgFullHeight:{height:"100%",transform:"translateX(-50%)",position:"relative",left:"50%"},imgFullWidth:{width:"100%",position:"relative",transform:"translateY(-50%)",top:"50%"}};t.styles=v;var b=function(e){function t(){var e;return(0,r.default)(this,t),(e=(0,c.default)(this,(0,u.default)(t).call(this))).fit=function(){var t=e.imgElement;if(t&&t.complete){var l,a,n,i;if(t.width/t.height>t.parentNode.offsetWidth/t.parentNode.offsetHeight)(l=t.classList).remove.apply(l,(0,o.default)(e.props.classes.imgFullWidth.split(" "))),(a=t.classList).add.apply(a,(0,o.default)(e.props.classes.imgFullHeight.split(" ")));else(n=t.classList).remove.apply(n,(0,o.default)(e.props.classes.imgFullHeight.split(" "))),(i=t.classList).add.apply(i,(0,o.default)(e.props.classes.imgFullWidth.split(" ")));t.removeEventListener("load",e.fit)}},"undefined"!==typeof window&&(e.handleResize=(0,h.default)(function(){e.fit()},166)),e}return(0,f.default)(t,e),(0,s.default)(t,[{key:"componentDidMount",value:function(){this.ensureImageCover()}},{key:"componentDidUpdate",value:function(){this.ensureImageCover()}},{key:"componentWillUnmount",value:function(){this.handleResize.clear()}},{key:"ensureImageCover",value:function(){this.imgElement&&(this.imgElement.complete?this.fit():this.imgElement.addEventListener("load",this.fit))}},{key:"render",value:function(){var e=this,t=this.props,l=t.children,a=t.classes,o=t.className,r=(t.cols,t.component),s=(t.rows,(0,i.default)(t,["children","classes","className","cols","component","rows"]));return d.default.createElement(r,(0,n.default)({className:(0,m.default)(a.root,o)},s),d.default.createElement(p.default,{target:"window",onResize:this.handleResize}),d.default.createElement("div",{className:a.tile},d.default.Children.map(l,function(t){return d.default.isValidElement(t)?"img"===t.type?d.default.cloneElement(t,{ref:function(t){e.imgElement=t}}):t:null})))}}]),t}(d.default.Component);b.defaultProps={cols:1,component:"li",rows:1};var y=(0,g.default)(v,{name:"MuiGridListTile"})(b);t.default=y},968:function(e,t,l){"use strict";var a=l(3);Object.defineProperty(t,"__esModule",{value:!0}),t.default=t.styles=void 0;var n=a(l(6)),i=a(l(14)),o=a(l(7)),r=a(l(0)),s=(a(l(5)),a(l(9))),c=a(l(11)),u=function(e){return{root:{position:"absolute",left:0,right:0,height:48,background:"rgba(0, 0, 0, 0.5)",display:"flex",alignItems:"center",fontFamily:e.typography.fontFamily},titlePositionBottom:{bottom:0},titlePositionTop:{top:0},rootSubtitle:{height:68},titleWrap:{flexGrow:1,marginLeft:e.mixins.gutters().paddingLeft,marginRight:e.mixins.gutters().paddingRight,color:e.palette.common.white,overflow:"hidden"},titleWrapActionPosLeft:{marginLeft:0},titleWrapActionPosRight:{marginRight:0},title:{fontSize:e.typography.pxToRem(16),lineHeight:"24px",textOverflow:"ellipsis",overflow:"hidden",whiteSpace:"nowrap"},subtitle:{fontSize:e.typography.pxToRem(12),lineHeight:1,textOverflow:"ellipsis",overflow:"hidden",whiteSpace:"nowrap"},actionIcon:{},actionIconActionPosLeft:{order:-1}}};function f(e){var t,l,a=e.actionIcon,c=e.actionPosition,u=e.classes,f=e.className,d=e.subtitle,m=e.title,p=e.titlePosition,h=(0,o.default)(e,["actionIcon","actionPosition","classes","className","subtitle","title","titlePosition"]),g=a&&c,v=(0,s.default)(u.root,(t={},(0,i.default)(t,u.titlePositionBottom,"bottom"===p),(0,i.default)(t,u.titlePositionTop,"top"===p),(0,i.default)(t,u.rootSubtitle,d),t),f),b=(0,s.default)(u.titleWrap,(l={},(0,i.default)(l,u.titleWrapActionPosLeft,"left"===g),(0,i.default)(l,u.titleWrapActionPosRight,"right"===g),l));return r.default.createElement("div",(0,n.default)({className:v},h),r.default.createElement("div",{className:b},r.default.createElement("div",{className:u.title},m),d?r.default.createElement("div",{className:u.subtitle},d):null),a?r.default.createElement("div",{className:(0,s.default)(u.actionIcon,(0,i.default)({},u.actionIconActionPosLeft,"left"===g))},a):null)}t.styles=u,f.defaultProps={actionPosition:"right",titlePosition:"bottom"};var d=(0,c.default)(u,{name:"MuiGridListTileBar"})(f);t.default=d},969:function(e,t,l){"use strict";var a=l(3);Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var n=a(l(0)),i=(0,a(l(44)).default)(n.default.createElement(n.default.Fragment,null,n.default.createElement("path",{fill:"none",d:"M0 0h24v24H0z"}),n.default.createElement("path",{d:"M15 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm-9-2V7H4v3H1v2h3v3h2v-3h3v-2H6zm9 4c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"})),"PersonAdd");t.default=i},972:function(e,t,l){"use strict";l.r(t);var a=l(0),n=l.n(a),i=l(23),o=l(427),r=l.n(o),s=l(428),c=l.n(s),u=l(429),f=l.n(u),d=l(12),m=l.n(d),p=l(959),h=l.n(p),g=l(969),v=l.n(g),b=l(102),y=l.n(b),E=l(29),w=l.n(E),P=l(963),N=l(964),j=l(965);t.default=Object(i.withStyles)(function(e){return{gridList:{transform:"translateZ(0)"},titleBar:{background:"linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)"},icon:{color:"white"}}})(function(e){return n.a.createElement(r.a,{cellHeight:256,cols:5,spacing:1,className:e.classes.gridList},e.faces.map(function(t,l){return n.a.createElement(c.a,{key:t,cols:1,rows:1},n.a.createElement("img",{src:t,alt:t,width:256,height:256}),n.a.createElement(f.a,{title:Object(P.basename)(t),titlePosition:"bottom",actionIcon:n.a.createElement(w.a,{title:"Delete file"},n.a.createElement(m.a,{className:e.classes.icon,onClick:e.toggleDialog("delete",!0,l)},n.a.createElement(h.a,null))),actionPosition:"right",className:e.classes.titleBar}))}),0===e.faces.length?n.a.createElement(c.a,{cols:1,rows:1},n.a.createElement("img",{src:e.toggleImage?j:N,alt:"add",width:256,height:256}),n.a.createElement(f.a,{title:"Add image",titlePosition:"bottom",actionIcon:n.a.createElement("div",null,n.a.createElement(w.a,{title:"Add face image from computer"},n.a.createElement(m.a,{className:e.classes.icon,onClick:e.toggleDialog("upload",!0,0)},n.a.createElement(v.a,null))),n.a.createElement(w.a,{title:"Start camera to capture face image"},n.a.createElement(m.a,{className:e.classes.icon,onClick:e.toggleDialog("camera",!0,0)},n.a.createElement(y.a,null)))),actionPosition:"right",className:e.classes.titleBar})):null)})}}]);
//# sourceMappingURL=3.209c22fc.chunk.js.map