/**
 * COPYRIGHT NOTICE
 *
 * Copyright (c) 2017 Neue Rituale GbR
 * @author Julian Winkel <code@neuerituale.com>
 * @version 1.0.0
 * @license MIT
 *
 * This file is part of the score project.
 * For the full copyright and license information, please read the
 * LICENSE file that was distributed with this source code.
 */

(function($, window, document, undefined) {
	'use strict';

	/**
	 * Circle
	 */
	$.Circle = function(el, data, options) {

		var self = this;
		var defaults = {
			color: 'red',
			graduation: 4,
			graduationHighlight: 2,
			fill: 0,
			animateDuration: 1000,
			animateDelay: 0,

			// events
			animationComplete: function(){},
			create: function(){}
		};

		self.settings = $.extend(true, {}, defaults, data, options);
		self.$context = $(el);

		/**
		 * Initial Draw
		 * @returns {$}
		 * @private
		 */
		var _draw = function (){

			// fill circle
			self.$fill = $('<span>')
				.addClass('circle__fill')
				.css('background-color', self.settings.color)
				.appendTo(self.$contextWrapper);


			// draw circles
			var steps = 100 / self.settings.graduation;
			for (var i = 1; i <= self.settings.graduation; i++){
				var span = $('<span>').css({
					width: steps*i + '%',
					height: steps*i + '%'
				});
				if(i === self.settings.graduationHighlight){
					span.addClass('circle__highlight');
				}
				if(i === self.settings.graduation) {
					span.addClass('circle__full');
				}
				self.$contextWrapper.prepend(span);
			}

			return self;
		};

		/**
		 *
		 * @param fill
		 * @param duration
		 * @param delay
		 * @param color
		 * @returns {$}
		 */
		self.set = function (fill, duration, delay, color){

			if(duration === undefined || duration === false) duration = self.settings.animateDuration;
			if(delay === undefined || delay === false) delay = self.settings.animateDelay;
			if(color === undefined || color === false) color = self.settings.color;

			// calculate size
			var pc = 100 / self.settings.graduation;
			if(fill >= self.settings.graduation) {
				fill = self.settings.graduation;
			}

			// add callback event
			self.$fill.one('animationend', function(){  self.settings.animationComplete.call(self); });

			// set css
			self.$fill.css({
				'transition-delay': delay + 'ms',
				'transition-duration': duration + 'ms',
				width: pc * fill + '%',
				height: pc * fill + '%',
				backgroundColor: color
			});

			return self;
		};

		/**
		 * Init the Program
		 */
		self.init = function() {

			// remove Data, html and class
			self
				.$context
				.html('')
			;

			// add Container
			self
				.$contextWrapper = $('<div>')
				.addClass('circle__el')
				.appendTo(self.$context);

			// draw
			_draw().set(0, 0, 0).set(self.settings.fill);

			// event:create
			self.settings.create.call(self);

			return self;
		};

		/**
		 * Run
		 */
		self.init();
	};

	/**
	 * Extend jQuery
	 * @param options
	 * @returns {*}
	 */
	$.fn.circle = function(options) {
		if(!options) options = {};
		return this.each(function() {
			if(undefined === $(this).data('circle')) {
				$(this).data('circle', new $.Circle( this, $(this).data('circleconfig'), options ));
			}
		});

	};

}(jQuery, window, window.document));