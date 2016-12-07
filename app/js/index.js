"use strict"
import Service from './services/Service'

require('../../node_modules/normalize.scss/normalize.scss')
require('../css/index.scss')

import './vendor/zepto'
import 'velocity-animate'

var Foreground = require('./components/foreground')

$(() => {
	Pace.on('done', () => {
		console.log('finished loading')
	})

	$(Foreground.state.element).click(() => {
		if (Foreground.state.open) {
			// Foreground.Close()
		} else {
			Foreground.Open()
		}
	})
})