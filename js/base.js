let Scroll = (function () {
  let _scroll = function () {
    const container = document.querySelector('.scroll-container')
    const content = container.querySelector(".content")
    const scroll = container.querySelector(".scroll")
    const scrollBox = scroll.querySelector(".scroll-box")

    const context = this

    function addEvent (obj, event, fun) {
      if (obj.attachEvent) {
        obj.attachEvent('on' + event, fun)
      } else {
        obj.addEventListener(event, fun, false)
      }
    }

    this.scale = scroll.offsetHeight / content.offsetHeight

    this.initDefault = function () {
      this.initScrollBox()
      this.activeDrag()
      this.activeWheel()
    }

    this.initScrollBox = function () {
      scrollBox.style.height = scroll.offsetHeight * this.scale + 'px'
    }

    this.setTop = function (top) {
      let maxTop = (content.offsetHeight - scroll.offsetHeight) * this.scale

      if (top < 0) {
        top = 0
      } else if (top > maxTop) {
        top = maxTop
      }

      scrollBox.style.top = top + 'px'
      content.style.top = -top / this.scale + 'px'
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
      addEvent(content, 'mousewheel', this.mousewheel)
      addEvent(content, 'DOMMouseScroll', this.mousewheel)
      addEvent(scroll, 'mousewheel', this.mousewheel)
      addEvent(scroll, 'DOMMouseScroll', this.mousewheel)
    }

    this.mousewheel = function (e) {
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
  }

  return _scroll
})()

window.onload = function () {
  let scroll = new Scroll()
  scroll.initDefault()
}
