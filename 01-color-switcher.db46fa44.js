!function(){var t,e=document.querySelector("button[data-start]"),n=document.querySelector("button[data-stop]");e.addEventListener("click",(function(){t=setInterval((function(){e.disabled=!0,n.disabled=!1,document.body.style.background="#".concat(Math.floor(16777215*Math.random()).toString(16).padStart(6,0))}),1e3)})),n.addEventListener("click",(function(){clearInterval(t),e.disabled=!1,n.disabled=!0}))}();
//# sourceMappingURL=01-color-switcher.db46fa44.js.map
