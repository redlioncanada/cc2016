import '../vendor/zepto'
import 'velocity-animate'
import Service from '../services/Service'
import Promise from 'bluebird'

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
		let promises = []

		if (Device.isMobile()) {
			promises = [
				this._animateDoors(),
				// this._animateBlur(),
				this._animateZoom()
			]
		} else {
			promises = [
				this._animateDoors()
			]
		}

		this.state.open = true
		return Promise.all(promises)
	}

	Close() {
		if (!this.state.open) return
		let promises = []

		if (Device.isMobile()) {
			promises = [
				// this._animateBlur(),
				this._animateZoom(),
				this._animateDoors()
			]
		} else {
			promises = [
				this._animateDoors()
			]
		}

		this.state.open = false
		return Promise.all(promises)
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

		return new Promise((resolve, reject) => {
			$(this.state.element).velocity('stop').velocity({
				blur: [end, start]
			}, {
				duration: duration,
				easing: easing,
				queue: false,
				complete: resolve
			})
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

		return new Promise((resolve, reject) => {
			$(this.state.element).velocity('stop').velocity({
				scaleX: [end, start],
				scaleY: [end, start]
			}, {
				duration: duration,
				easing: easing,
				queue: false,
				complete: resolve
			})
		})
	}

	_animateDoors() {
		var translatePercent = Device.isMobile() ? Device.isTablet() ? 70 : 100 : 78,
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

		return new Promise((resolve, reject) => {
			var complete = 0

			$(this.state.element).find('.left').velocity('stop').velocity({
				translateX: [end*-1 + '%', start*-1 + '%']
			}, {
				duration: duration,
				easing: easing,
				queue: false,
				complete: onComplete
			})

			$(this.state.element).find('.right').velocity('stop').velocity({
				translateX: [end + '%', start + '%']
			}, {
				duration: duration,
				easing: easing,
				queue: false,
				complete: onComplete
			})

			function onComplete() {
				if (++complete == 2) resolve()
			}
		})
	}
}

module.exports = Foreground