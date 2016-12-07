import '../vendor/zepto'
import 'velocity-animate'
import Service from '../services/Service'

let Foreground = require('./Foreground'),
	Device = Service.Device()

class Background extends Foreground {
	constructor() {
		super()
		this.state.element = $('.background')
	}

	Open() {
		if (this.state.open) return

		if (Device.isMobile()) {
			this._animateZoom()
		}
		this.state.open = true
	}

	Close() {
		if (!this.state.open) return

		if (Device.isMobile()) {
			this._animateZoom()
		}
		this.state.open = false
	}
}

module.exports = Background