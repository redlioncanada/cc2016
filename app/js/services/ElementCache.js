import '../vendor/zepto'

class ElementCache {
	constructor() {
		this.elements = {}
	}

	Cache(alias, selector) {
		if (alias in this.elements) {
			return this.elements[alias]
		} else {
			this.elements[alias] = $(selector)
			return this.elements[alias]
		}
	}

	Get(alias) {
		if (alias in this.elements) {
			return this.elements[alias]
		} else {
			return false
		}
	}
}

export let instance = new ElementCache()