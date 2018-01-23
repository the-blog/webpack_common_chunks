import css from './index.css';
import JQ from './node_modules/jquery/dist/jquery.js';
window.JQ = JQ

JQ(() => {
  JQ('body').css({color:'red'})
})
