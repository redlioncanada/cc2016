import '../vendor/zepto'
import 'velocity-animate'
import Service from '../services/Service'

let Device = Service.Device()

class Foreground {
	constructor() {
		this.state = {
			open: false,
			element: $('.foreground')
		}
	}

	IsOpen() {
		return this.state.open
	}

	IsClosed() {
		return !this.state.open
	}

	Open() {
		if (this.state.open) return
		this._animateDoors()

		if (Device.isMobile()) {
			this._animateBlur()
			this._animateZoom()
		}
		this.state.open = true
	}

	Close() {
		if (!this.state.open) return
		this._animateDoors()

		if (Device.isMobile()) {
			this._animateBlur()
			this._animateZoom()
		}
		this.state.open = false
	}

	_animateBlur() {
		var blur = 1.5,
			easing = 'easeOutQuad',
			duration = 1000,
			start, end

		if (this.state.open) {
			start = blur
			end = 0
		} else {
			start = 0
			end = blur
		}

		$(this.state.element).velocity({
			blur: [end, start]
		}, {
			duration: duration,
			easing: easing,
			queue: false
		})
	}

	_animateZoom() {
		var scalePercent = 110,
			easing = 'easeInOutQuint',
			duration = 1000,
			start, end

		if (this.state.open) {
			end = 1
			start = scalePercent / 100
		} else {
			end = scalePercent / 100
			start = 1
		}

		$(this.state.element).velocity({
			scaleX: [end, start],
			scaleY: [end, start]
		}, {
			duration: duration,
			easing: easing,
			queue: false
		})
	}

	_animateDoors() {
		var translatePercent = Device.isMobile() ? 70 : 90,
			easing = 'easeInOutQuint',
			duration = 1000,
			end, start

		if (this.state.open) {
			start = translatePercent
			end = 0
		} else {
			start = 0
			end = translatePercent
		}

		$(this.state.element).find('.left').velocity({
			translateX: [end*-1 + '%', start*-1 + '%']
		}, {
			duration: duration,
			easing: easing,
			queue: false
		})

		$(this.state.element).find('.right').velocity({
			translateX: [end + '%', start + '%']
		}, {
			duration: duration,
			easing: easing,
			queue: false
		})
	}
}

module.exports = Foreground