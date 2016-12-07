//determines which platform we're on, desktop/tablet/mobile/phone

class Device {
	isMobile() {
		var regex = navigator.userAgent.match(/Mobi/i)	//suggested string to use via mozilla docs
		return !!regex && regex.length ? true : false
	}

	isTablet() {
		var regex = navigator.userAgent.match(/Tablet|iPad/i)
		return !!regex && regex.length ? true : false
	}

	isPhone() {
		return !this.isTablet() && this.isMobile()
	}

	isDesktop() {
		return !this.isMobile()
	}

	type() {
		if (this.isPhone()) return 'Phone'
		else if (this.isTablet()) return 'Tablet'
		else return 'Desktop'
	}
}

export let instance = new Device()