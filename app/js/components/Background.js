import '../vendor/zepto'
import 'velocity-animate'
import Service from '../services/Service'
import Promise from 'bluebird'

let AnimateObject = require('./AnimateObject'),
	Device = Service.Device()

class Background extends AnimateObject {
	constructor() {
		super()
		this.state = {
			...this.state,
			elements: {
				main: Device.isMobile() ? $('.background') : $('.background .inner'),
				textElement1: $('.background .wierd .w1'),
				textElement2: $('.background .wierd .w2'),
				treeElement: $('.background .tree img')
			},
			resolution: 0.8
		}
	}

	ShowText() {
		this.state.elements.textElement1.removeClass('hide')
		this.textTimeout = setTimeout(() => {
			this.state.elements.textElement2.removeClass('hide')
		}, 2500)
	}

	HideText() {
		clearTimeout(this.textTimeout)
		this.state.elements.textElement1.addClass('hide')
		this.state.elements.textElement2.addClass('hide')
	}

	_animateMain() {
		if (Device.isMobile()) this._animateZoom.call(this)
	}

	_animateZoom() {
		let value = {
			scale: this._normalizedValue(1, 1.08),
			margin: this._normalizedValue(5, 21)
		}

		$(this.state.elements.main).velocity('stop').velocity({
			scaleX: value.scale,
			scaleY: value.scale,
			marginTop: value.margin
		})
	}
}

module.exports = Background