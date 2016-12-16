import '../vendor/zepto'
import Service from '../services/Service'
import Promise from 'bluebird'

let Device = Service.Device()

class AnimateObject {
	constructor() {
		this.state = {
			percent: 0,
			elements: {
			},
			resolution: 1,
			dirty: false
		}
	}

	IsOpen() {
		return this.state.percent >= 40
	}

	IsClosed() {
		return this.state.percent == 0
	}

	IsInBetween() {
		return this.state.percent > 0 && this.state.percent < 100
	}

	IsDirty() {
		return this.state.dirty
	}

	Animate(value) {
		if (!this.state.dirty) this.state.dirty = true
		if (!value || (this.state.percent == 100 && value > 0) || (this.state.percent == 0 && value < 0) || value == 0) return
		this.state.percent += value * this.state.resolution
		if (this.state.percent < 0) this.state.percent = 0
		if (this.state.percent > 100) this.state.percent = 100

		this._animateMain()
	}

	_animateMain() {
	}

	_normalizedValue(min, max) {
		var diff = max - min
		return (diff * (this.state.percent/100)) + min
	}
}

module.exports = AnimateObject