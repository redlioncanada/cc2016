"use strict"
import Service from './services/Service'
import './vendor/zepto'
import Promise from 'bluebird'

require('../../node_modules/normalize.scss/normalize.scss')
require('../css/index.scss')

let Foreground = new (require('./components/Foreground'))(),
	Background = new (require('./components/Background'))(),
	DOMElement = Service.ElementCache(),
	Scroll = Service.Scroll(),
	Keypress = Service.Keypress(),
	Device = Service.Device(),
	Log = Service.Log()

var timeout

$(() => {
	DOMElement.Cache('door tops', '.foreground .door img:first-child')
	DOMElement.Cache('doors', '.foreground .door img:last-child')
	DOMElement.Cache('background:desktop', '.desktop-background')
	DOMElement.Cache('background:mobile', '.mobile-background')
	DOMElement.Cache('foreground', '.foreground')
	DOMElement.Cache('tree images:mobile', '.mobile-background .tree img')
	DOMElement.Cache('tree images:desktop', '.desktop-background .tree img')
	DOMElement.Cache('tree:desktop', '.desktop-background .tree')

	Pace.on('done', () => {
		Log.Say('finished loading')

		Scroll.OnScroll((e) => {
			var value = 'deltaY' in e && e.deltaY !== 0 ? e.deltaY * -1 : e.direction
			Log.Say(e.direction == Scroll.directions.DOWN ? 'scroll down' : 'scroll up')
			animate(value)
		})

		Keypress.OnKey((key) => {
			switch(key) {
				case Keypress.keys.UP_ARROW:
					Log.Say('arrow up')
					animate(-4)
					break
				case Keypress.keys.DOWN_ARROW:
					Log.Say('arrow down')
					animate(4)
					break
			}
		})

		setTimeout(() => {
			if (!Foreground.IsDirty()) {
				Log.Say('dude, you gotta scroll')
				animate(150)
			}
		}, 4500)

		$(window).resize(onResize)
		onResize()
	})
})

function animate(value) {
	Foreground.Animate(value)
	Background.Animate(value)

	if (Foreground.IsOpen()) {
		timeout = setTimeout(() => {Background.ShowText()}, 1000)
	} else if (Foreground.IsClosed()) {
		// clearTimeout(timeout)
		// Background.HideText()
	}
}

function onResize() {
	//make sure the door hinges are the same width as the doors themselves
	DOMElement.Get('door tops').css('width', DOMElement.Get('doors').width())

	let doorTopHeight = DOMElement.Get('door tops').height(),
		inset = 15

	if (!Device.isMobile()) {
		//make sure the background isn't visible behind the door hinges
		DOMElement.Get('background:desktop').css({
			marginTop: doorTopHeight + inset,
			height: DOMElement.Get('foreground').height() - doorTopHeight - inset*2
		})
	} else {
		//make sure the background isn't visible behind the door hinges
		if (Device.isPhone()) {
			DOMElement.Get('background:mobile').css({
				marginTop: doorTopHeight + 10,
				height: DOMElement.Get('foreground').height() - doorTopHeight - 10
			})
		} else {
			DOMElement.Get('background:mobile').css({
				marginTop: doorTopHeight + 10
			})
		}

		let padding = Device.isMobile() ? Device.isTablet() ? 30 : 20 : 0

		//center the tree within it's container
		DOMElement.Get('tree images:mobile').css({
			left: (DOMElement.Get('background:mobile').width() - DOMElement.Get('tree images:mobile').width()) / 2 + padding
		})
	}
}