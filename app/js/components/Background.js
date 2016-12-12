import '../vendor/zepto'
import 'velocity-animate'
import Service from '../services/Service'
import Promise from 'bluebird'

let Foreground = require('./Foreground'),
	Device = Service.Device()

class Background extends Foreground {
	constructor() {
		super()
		this.state.element = Device.isMobile() ? $('.background') : $('.background .inner')
		this.state.textElement1 = $('.background .wierd .w1')
		this.state.textElement2 = $('.background .wierd .w2')
		this.state.treeElement = $('.background .tree img')

		this.textTimeout
	}

	Open() {
		if (this.state.open) return
		let promises = []

		if (Device.isMobile()) {
			promises = [
				this._animateZoom()
			]
		}

		this.state.open = true
		return Promise.all(promises)
	}

	Close() {
		if (!this.state.open) return
		clearTimeout(this.textTimeout)
		let promises = []

		if (Device.isMobile()) {
			promises = [
				this._animateZoom()
			]
		}

		this.state.open = false
		return Promise.all(promises)
	}

	ShowText() {
		this.state.textElement1.removeClass('hide')
		this.textTimeout = setTimeout(() => {
			this.state.textElement2.removeClass('hide')
		}, 2500)
	}

	HideText() {
		this.state.textElement1.addClass('hide')
		this.state.textElement2.addClass('hide')
	}

	_animateZoom() {
		var scalePercent = 108,
			easing = 'easeInOutQuint',
			duration = 1000,
			start, end, marginStart,marginEnd

		if (this.state.open) {
			end = 1
			start = scalePercent / 100
			marginStart = 5
			marginEnd = 21
		} else {
			end = scalePercent / 100
			start = 1
			marginStart = 21
			marginEnd = 5
		}

		return new Promise((resolve, reject) => {
			$(this.state.element).velocity('stop').velocity({
				scaleX: [end, start],
				scaleY: [end, start],
				marginTop: [marginEnd, marginStart]
			}, {
				duration: duration,
				easing: easing,
				queue: false,
				complete: resolve
			})
		})
	}
}

module.exports = Background