import '../vendor/zepto'
import 'velocity-animate'
import Service from '../services/Service'
import Promise from 'bluebird'

let AnimateObject = require('./AnimateObject'),
	Device = Service.Device()

class Foreground extends AnimateObject {
	constructor() {
		super()
		this.state = {
			...this.state,
			elements: {
				main: $('.foreground'),
				doorLeft: $('.foreground .left'),
				doorRight: $('.foreground .right')
			},
			resolution: Device.isMobile() ? 5 : 0.8
		}
	}

	_animateMain() {
		if (Device.isMobile()) this._animateZoom()
		this._animateDoors()
	}

	_animateZoom() {
		let value = {
			scale: this._normalizedValue(1, 1.1)
		}

		$(this.state.elements.main).velocity('stop').velocity({
			scaleX: value.scale,
			scaleY: value.scale
		})
	}

	_animateDoors() {
		let min = 0,
			max = Device.isMobile() ? Device.isTablet() ? 70 : 100 : 78,
			value = {
				scale: this._normalizedValue(min, max),
			}

		$(this.state.elements.doorLeft).velocity('stop').velocity({
			translateX: value.scale * -1 + '%'
		})

		$(this.state.elements.doorRight).velocity('stop').velocity({
			translateX: value.scale + '%'
		})
	}
}

module.exports = Foreground