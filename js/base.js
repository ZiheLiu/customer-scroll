var oContainer = document.getElementById("container"),
  oDiv1 = document.getElementById("div1"),
  oDiv2 = document.getElementById("div2"),
  oDiv3 = document.getElementById("div3");

oDiv3.onmousedown = function(e) {
  e = e || event;

  var disY = e.clientY - this.offsetTop;

  if (oDiv3.setCapture) {
    oDiv3.onmousemove = fnMove;
    oDiv3.onmouseup = fnUp;
    oDiv3.setCapture();
  } else {
    document.onmousemove = fnMove;
    document.onmouseup = fnUp;
  }

  function fnMove(ev) {
    ev = ev || event;

    var t = ev.clientY - disY;
    setTop(t);
  };

  function fnUp() {
    this.onmousemove = null;
    this.onmouseup = null;

    if (this.releaseCapture) {
      this.releaseCapture();
    }
  };

  return false;
};

function setTop(t) {
  var down = oDiv2.offsetHeight - oDiv3.offsetHeight;

  if (t < 0) {
    t = 0;
  } else if (t > down) {
    t = down
  }

  oDiv3.style.top = t + 'px';

  var scale = t / down;
  oDiv1.style.top = -(oDiv1.offsetHeight - oContainer.offsetHeight) * scale + 'px';
}

addEvent(oDiv1, 'mousewheel', mousewheel);
addEvent(oDiv1, 'DOMMouseScroll', mousewheel);
addEvent(oDiv2, 'mousewheel', mousewheel);
addEvent(oDiv2, 'DOMMouseScroll', mousewheel);

function addEvent(obj, oEvent, fn) {
  if (obj.attachEvent) {
    obj.attachEvent('on' + oEvent, fn);
  } else {
    obj.addEventListener(oEvent, fn, false);
  }
}

function mousewheel(e) {
  var ev = e || event,
    bDown = false;

  bDown = ev.wheelDelta ? ev.wheelDelta < 0 : ev.detail > 0;

  if (bDown) {
    setTop(oDiv3.offsetTop + 10);
  } else {
    setTop(oDiv3.offsetTop - 10);
  }

  //FF,绑定事件，阻止默认事件
  if (e.preventDefault) {
    e.preventDefault();
  }

  return false;
}