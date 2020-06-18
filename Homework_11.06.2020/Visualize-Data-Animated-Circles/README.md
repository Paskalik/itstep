# circle
A simple circle data visualisation (jQuery Plugin)
# Usage
## Insert jQuery
load plugin after jQuery
````js
<script src="https://code.jquery.com/jquery-3.3.1.slim.min.js"></script>
<script src="jquery.circle.js"></script>
<script> 
	// dom ready
	$(function(){ 
		var elements = $('.circle').circle( { /* global options */ } ); 
	});
</script>
````
## Options

````js
{
	color: 'red',                       /* fill color */
	graduation: 4,                      /* amount of circles */
	graduationHighlight: 2,             /* highlight circle, get the css class "circle__highlight" */
	fill: 0,                            /* initial fill */
	animateDuration: 1000,              /* duration of the animation */
	animateDelay: 0,                    /* delay of the animation */
	
	// callbacks
	// The animationComplete function not works with duration 0
	animationComplete: function(){},    /* fired after animation */
	create: function(){}                /* fired after create */
}
````
## Set Options
````js
// set function: (fill, duration, delay, color)
elements
	.eq(0)
	.data('circle')
	.set(5)
	;
````
## HTML
get a look in ```test.html```
```html
<!-- set option as data-attribute -->
<div class="circle" data-circleconfig='{"color": "red", "graduation": 4, "fill": 3}'></div>
<div class="circle" data-circleconfig='{"color": "red", "graduation": 4, "fill":3, "animateDelay": 2000}'></div>
<div class="circle" data-circleconfig='{"color": "maroon", "graduation": 10, "graduationHighlight": 8, "fill": 5, "animateDelay": 400}'></div>
<div class="circle" data-circleconfig='{"fill": 3, "animateDelay": 600}'></div>
```