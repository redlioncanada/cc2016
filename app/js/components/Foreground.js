import '../vendor/zepto'
import 'velocity-animate'
import Service from '../services/Service'

class Foreground {
	constructor() {
		this.state = {
			'open': false,
			'element': $('.foreground')
		}
	}

	Open() {
		if (this.state.open) return
		this._animateDoors()
		this._animateZoom()
		this.state.open = true
	}

	Close() {
		if (!this.state.open) return
		this._animateDoors()
		this._animateZoom()
		this._animateBlur()
		this.state.open = false
	}

	_animateBlur() {
		var blur = 20,
			easing = 'easeOutQuad',
			duration = 1000,
			temp

		if (this.state.open) {
			temp = 0
		} else {
			temp = blur
		}

		$(this.state.element).velocity({
			blur: temp
		}, {
			duration: duration,
			easing: easing
		})
	}

	_animateZoom() {
		var scalePercent = 110,
			easing = 'easeOutQuad',
			duration = 1000,
			temp

		if (this.state.open) {
			temp = 1
		} else {
			temp = scalePercent / 100
		}

		$(this.state.element).velocity({
			scaleX: temp,
			scaleY: temp
		}, {
			duration: duration,
			easing: easing
		})
	}

	_animateDoors() {
		var translatePercent = Service.Device().isMobile() ? 70 : 90,
			easing = 'easeOutSine',
			duration = 1000,
			temp

		if (this.state.open) {
			temp = 0
		} else {
			temp = translatePercent
		}

		$(this.state.element).find('.left').velocity({
			translateX: temp*-1 + '%'
		}, {
			duration: duration,
			easing: easing
		})

		$(this.state.element).find('.right').velocity({
			translateX: temp + '%'
		}, {
			duration: duration,
			easing: easing
		})
	}
}

module.exports = new Foreground()