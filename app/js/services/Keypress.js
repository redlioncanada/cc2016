import Observer from '../util/Observer'
import Util from '../util/Util'

class Keypress extends Observer {
	constructor() {
		super()

		this.keys = {
			LEFT_ARROW: 37,
			RIGHT_ARROW: 39,
			UP_ARROW: 38,
			DOWN_ARROW: 40
		}

		this.interval = setInterval(() => {
			if (!!window) {
				window.addEventListener('keydown', this._onkey.bind(this))
				clearTimeout(this.interval)
			}
		}, 50)
	}

	OnKey(fn, key) {
		if (!!key && key in this.keys) {
			this.on(key, fn)
		} else {
			this.on('key', fn)
		}
	}

	_onkey(e) {
		if (!e) e = event;
		e.normalizedCode = e.keyCode || e.which
  		this.emit('key', e.normalizedCode)
  		if (e.normalizedCode in this.keys) this.emit(this.keys[e.normalizedCode], e)
	}
}

export let instance = new Keypress()