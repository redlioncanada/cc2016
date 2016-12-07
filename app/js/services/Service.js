import {instance as Device} from './Device.js'
import {instance as Scroll} from './Scroll.js'

export default class Service {
	static Device() {
		return Device
	}

	static Scroll() {
		return Scroll
	}
}