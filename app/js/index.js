"use strict"
import Service from './services/Service'
import './vendor/zepto'
import 'velocity-animate'
import Promise from 'bluebird'

require('../../node_modules/normalize.scss/normalize.scss')
require('../css/index.scss')

let Foreground = new (require('./components/Foreground'))(),
	Background = new (require('./components/Background'))(),
	DOMElement = Service.ElementCache(),
	Scroll = Service.Scroll(),
	Device = Service.Device()

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
		console.log('finished loading')
		var timeout

		Scroll.OnScroll((e) => {
			if (e.direction == Scroll.directions.DOWN && !Foreground.IsOpen()) {
				Promise.all([
					Foreground.Open(),
					Background.Open()
				]).then(() => {
					timeout = setTimeout(() => Background.ShowText(), 1000)
				})
			} else if (e.direction == Scroll.directions.UP && Foreground.IsOpen()) {
				clearTimeout(timeout)

				Promise.all([
					Foreground.Close(),
					Background.Close()
				]).then(() => {
					Background.HideText()
				})
			}
		})

		$(window).resize(onResize)
		onResize()
	})
})

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