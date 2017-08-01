let Scroll = (function () {
  let _scroll = function () {
    const container = document.querySelector('.scroll-container')
    const content = container.querySelector(".content")
    const scroll = container.querySelector(".scroll")
    const scrollBox = scroll.querySelector(".scroll-box")

    const context = this

    let resizeObj = null

    function addEvent (obj, event, fun) {
      if (obj.attachEvent) {
        obj.attachEvent('on' + event, fun)
      } else {
        obj.addEventListener(event, fun, false)
      }
    }

     function mousewheel (e) {
      let ev = e || event
      let isDown = ev.wheelDelta ? ev.wheelDelta < 0 : ev.detail > 0

      if (isDown) {
        context.setTop(scrollBox.offsetTop + 10)
      } else {
        context.setTop(scrollBox.offsetTop - 10)
      }

      if (e.preventDefault) {
        e.preventDefault()
      }

      return false
    }

    let scale = null

    this.initDefault = function () {
      this.initScrollBox()
      this.activeDrag()
      this.activeWheel()
      this.activeResize()
    }

    this.initScrollBox = function () {
      scale = scroll.offsetHeight / content.offsetHeight
      scrollBox.style.height = scroll.offsetHeight * scale + 'px'
    }

    this.activeDrag = function () {
      scrollBox.onmousedown = function(e) {
        e = e || event

        let disY = e.clientY - this.offsetTop

        if (scrollBox.setCapture) {
          scrollBox.onmousemove = fnMove
          scrollBox.onmouseup = fnUp
          scrollBox.setCapture()
        } else {
          document.onmousemove = fnMove
          document.onmouseup = fnUp
        }

        function fnMove(ev) {
          ev = ev || event
          context.setTop(ev.clientY - disY)
        }

        function fnUp() {
          this.onmousemove = null
          this.onmouseup = null

          if (this.releaseCapture) {
            this.releaseCapture()
          }
        }

        return false
      }
    }

    this.activeWheel = function () {
      addEvent(content, 'mousewheel', mousewheel)
      addEvent(content, 'DOMMouseScroll', mousewheel)
      addEvent(scroll, 'mousewheel', mousewheel)
      addEvent(scroll, 'DOMMouseScroll', mousewheel)
    }

    this.setTop = function (top) {
      let maxTop = (content.offsetHeight - scroll.offsetHeight) * scale

      if (top < 0) {
        top = 0
      } else if (top > maxTop) {
        top = maxTop
      }

      scrollBox.style.top = top + 'px'
      content.style.top = -top / scale + 'px'
    }

    this.activeResize = function () {
      if (!resizeObj) {
        resizeObj = document.createElement('object')
        resizeObj.setAttribute('style',
          'display: block; ' +
          'position: absolute; ' +
          'top: 0; ' +
          'left: 0; ' +
          'height: 100%; ' +
          'width: 100%; ' +
          'overflow: hidden;' +
          'opacity: 0; ' +
          'pointer-events: none; ' +
          'z-index: -1;');
        resizeObj.type = 'text/html';
        resizeObj.data = 'about:blank';
        resizeObj.onload = function () {
          this.contentDocument.defaultView.addEventListener('resize', function () {
            context.initScrollBox()
            context.setTop(scrollBox.offsetTop)
          })
        }

        content.appendChild(resizeObj);
      }
    }
  }

  return _scroll
})()

window.onload = function () {
  let scroll = new Scroll()
  scroll.initDefault()
}
