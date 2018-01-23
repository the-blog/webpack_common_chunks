import JQ from "jquery/dist/jquery.js";
import css from './index.css';
window.JQ = JQ

JQ(() => {
  JQ('body').css({color:'red'})
})
