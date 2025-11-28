const menuN = document.getElementsByClassName("menuN")[0],
      menuD = document.getElementsByClassName("menuD")[0];
menuN.onclick = function(){
    menuD.classList.remove("remove")
}

menuD.onmouseout = function(){
   menuD.classList.add("remove")
}
