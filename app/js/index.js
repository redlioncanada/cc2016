"use strict"
import Service from './services/Service'
import './vendor/zepto'
import 'velocity-animate'

require('../../node_modules/normalize.scss/normalize.scss')
require('../css/index.scss')

let Foreground = new (require('./components/Foreground')),
	Background = new (require('./components/Background')),
	DOMElement = Service.ElementCache(),
	Scroll = Service.Scroll(),
	Device = Service.Device()

$(() => {
	DOMElement.Cache('door tops', '.foreground .door img:first-child')
	DOMElement.Cache('doors', '.foreground .door img:last-child')
	DOMElement.Cache('background', '.background')
	DOMElement.Cache('foreground', '.foreground')

	Pace.on('done', () => {
		console.log('finished loading')

		Scroll.OnScroll((e) => {
			if (e.direction == Scroll.directions.DOWN && !Foreground.IsOpen()) {
				Foreground.Open()
				Background.Open()
			}
		})

		$(window).resize(onResize)
		onResize()
	})
})

function onResize() {
	DOMElement.Get('door tops').css('width', DOMElement.Get('doors').width())

	// if (!Device.isMobile()) {
		let doorTopHeight = DOMElement.Get('door tops').height()
		DOMElement.Get('background').css({
			'marginTop': doorTopHeight,
			'height': DOMElement.Get('foreground').height() - doorTopHeight
		})
	// }
}