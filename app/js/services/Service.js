import {instance as Device} from './Device.js'
import {instance as Scroll} from './Scroll.js'
import {instance as ElementCache} from './ElementCache.js'
import {instance as Keypress} from './Keypress.js'
import {instance as Log} from './Log.js'

export default class Service {
	static Device() {
		return Device
	}

	static Scroll() {
		return Scroll
	}

	static ElementCache() {
		return ElementCache
	}

	static Keypress() {
		return Keypress
	}

	static Log() {
		return Log
	}
}