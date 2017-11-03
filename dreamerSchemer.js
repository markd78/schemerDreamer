
var ctx;
var WIDTH =580;
var HEIGHT =400;
var particles = new Array();
var rint = 60;
var millisecsBeforeHide = 5000;
var particleCount = 5000;
var newParticleCountSetting = 5000;
var circle;
var canvas;
var canvasMoustache;
var ctx_hidden;

var startTime;
var shape1StartTime;
var currenttime;
var isShapeShown;
var currentShapeNum =0;
var canvas_thought_bubble;
var ctx_thought_hidden;
var ctx_thought;
var ctx_thought_main;
var showGapBetweenDreams = true;

var isAnimatePhone = false;

window.requestAnimFrame = function(){
    return (
        window.requestAnimationFrame       || 
        window.webkitRequestAnimationFrame || 
        window.mozRequestAnimationFrame    || 
        window.oRequestAnimationFrame      || 
        window.msRequestAnimationFrame     || 
        function(/* function */ callback){
            window.setTimeout(callback, 1000 / 60);
        }
    );
}();

function animate() {
    requestAnimFrame( animate );
   
   showShapes();
   //getCurrentSceneBasedOnTime();

}


var _initialSceneDrawn = false;
function drawInitialScene() {

	if (!_initialSceneDrawn)
	{
		currentMoustacheX = 0;
		currentMoustacheY = 590;
		drawMoustache(ctx_moustache, currentMoustacheX, currentMoustacheY);
		_initialSceneDrawn = true;
	}
}

function showThoughtBubbles() {
	drawThoughtBubbles(ctx_thought,ctx_thought_main);

}


var _isParticlesInit = false;
	function initParticles()
	{
		if (!_isParticlesInit)
		{
	 		canvas.addEventListener('click', clickReporter, false);
	
			for(var i = 0; i < particleCount; i++) {
				particles[i] = new Circle();
				particles[i].reset();
			}
		}
		
		_isParticlesInit = true;
	}

var currentShapeDrawn = -1;

	function showShapes() {
	
	initParticles();
	if (currentShapeDrawn!=currentShapeNum)
	{
		if (!showGapBetweenDreams)
		{
		   showNextShape();
		}
		 currentShapeDrawn = currentShapeNum;
	}
		
		
		drawParticles();
	}

    function init() {

      canvas = document.getElementById("canvas");
      canvasMoustache = document.getElementById("canvasMoustache");
      canvas_hidden = document.getElementById("canvas_hidden");
      canvas_thought_bubble = document.getElementById("canvas_thought_bubble");
       canvas_thought_main = document.getElementById("canvas_thought_bubble_main");
      ctx = canvas.getContext("2d");
      ctx_hidden=canvas_hidden.getContext("2d");
      ctx_moustache = canvasMoustache.getContext("2d");
      ctx_thought = canvas_thought_bubble.getContext("2d");
      ctx_thought_main  = canvas_thought_main.getContext("2d");

		var startdate = new Date();
    	startTime = startdate.getTime();
		
      drawInitialScene();
   showThoughtBubbles();
	showShapes();
	
      animate();
    }
    
    function removeHiddenShapeAndFreeParticles()
    {
    	ctx_hidden.clearRect(0,0,WIDTH,HEIGHT);
    	isShapeShown = false;
    	
    	var aGoodX = 0;
    	var aGoodY = 0;
    	
    	for(var i = 0; i < particleCount; i++) {
			particles[i].trapped = false;
			// reset the speeds
			particles[i].dx = (Math.random()*particles[i].s.xmax +particles[i].s.xmin) * (Math.random() < .5 ? -1 : 1);
			particles[i].dy = (Math.random()*particles[i].s.ymax +particles[i].s.ymin) * (Math.random() < .5 ? -1 : 1);
			
			if (particles[i].hidden)
			{
				particles[i].hidden = false;
				particles[i].reset();
				particles[i].x = aGoodX;
				particles[i].y = aGoodY;
				particles[i].draw(ctx);
			}
			else
			{
				aGoodX = particles[i].x;
				aGoodY = particles[i].y;
			}
		};
		currentShapeNum++;
    }
    
    function showNextShape()
    {
    	isShapeShown = true;
    	var startdate = new Date();
    	shape1StartTime = startdate.getTime();
    	switch (currentShapeNum)
    	{
    		case 0:
    			drawMan(ctx_hidden,1);
    			break;
    		case 1:
    			drawManBoyKite(ctx_hidden,1);
    			break;
    		case 2:
    			drawPancakeMan(ctx_hidden,1);
    			break;
    		case 3:
    			drawGirlOnBike(ctx_hidden,1);
    			break;
    		case 4:
    			drawParachuteGirl(ctx_hidden,1);
    			break;
    		case 5:
    			drawDinner(ctx_hidden,1);
    			break;
    		default:
    			currentShapeNum = 0;
    			drawMan(ctx_hidden,1);
    			break;
    	}
    }
    
    function clickReporter(e)
    {
    	if (isShapeShown)
    	{
			removeHiddenShapeAndFreeParticles();
		}
		else
		{
			showNextShape();
		}
    }
    
    function drawParticles() {
    
     currenttime = new Date();
	ctx.clearRect(0,0,WIDTH,HEIGHT);
	for(var i = 0; i < particles.length; i++) {
		particles[i].move(ctx,ctx_hidden);
		particles[i].draw(ctx);
		}
	}


function Circle() {
	this.s = {ttl:8000, spawnXMin:100, spawnxMax:200, spawnYMax:300,spawnYMin:200, xmax:10, ymax:10, xmin:5, ymin:5, rmax:3, rt:1, xdef:200, ydef:200, xdrift:5, ydrift: 5, random:true, blink:true};

	this.reset = function() {
		this.x = (this.s.random ? WIDTH*Math.random() : this.s.xdef);
		this.y = (this.s.random ? HEIGHT*Math.random() : this.s.ydef);
		this.radius = ((this.s.rmax-1)*Math.random()) ;
		this.dx = (Math.random()*this.s.xmax +this.s.xmin) * (Math.random() < .5 ? -1 : 1);
		this.dy = (Math.random()*this.s.ymax +this.s.ymin) * (Math.random() < .5 ? -1 : 1);
		this.hl = (this.s.ttl/rint)*(this.radius/this.s.rmax);
		this.rt = Math.random()*this.hl;
		this.s.rt = Math.random()+1;
		this.stop = Math.random()*.2+.4;
		this.s.xdrift *= Math.random() * (Math.random() < .5 ? -1 : 1);
		this.s.ydrift *= Math.random() * (Math.random() < .5 ? -1 : 1);
		this.trapped = false;
		this.hidden = false;
		this.hurry = false;
		this.didBounce = false;
	}

	this.fade = function() {
		this.rt += this.s.rt;
	}

	this.draw = function(ctx) {
	
		if (this.hidden)
		{
			return;
		}
		
		if(this.s.blink && (this.rt <= 0 || this.rt >= this.hl)) this.s.rt = this.s.rt*-1;
		else if(this.rt >= this.hl) this.reset();
		var newo = 1-(this.rt/this.hl);
		ctx.beginPath();
		ctx.arc(this.x,this.y,this.radius,0,Math.PI*2,true);
		ctx.closePath();
		var cr = this.radius*newo;
		ctx.fillStyle   = '#000';
		ctx.fill();
	}

	this.move = function(ctx,ctx_hidden) {
		
		var newX = this.x + (this.rt/this.hl)*this.dx;
		var newY = this.y + (this.rt/this.hl)*this.dy;
		
		imgData = ctx_hidden.getImageData(newX, newY, 5, 5).data;
		
		if (!this.trapped)
		{
			if (imgData[0] == 0 && imgData[1] ==0 && imgData[2]==0)
			{
				this.x = newX;
				this.y = newY;
				if(this.x > WIDTH || this.x < 0) this.dx *= -1;
				if(this.y > HEIGHT || this.y < 0) this.dy *= -1;
				
				var timediff = currenttime.getTime() - shape1StartTime;
				if (timediff  > millisecsBeforeHide && !this.trapped && isShapeShown)
				{
					// it didn't get trapped in time
					this.hidden = true;
				}
				else if (!this.trapped  && isShapeShown)
				{
					// better hurry up
					this.dx *= 1.3;
					this.dy *= 1.3;
				}
			}
			else
			{
				this.trapped = true;
			}
		}
		else
		{
			// keep it within the limits
			if (imgData[0] != 0 || imgData[1] !=0 || imgData[2]!=0)
			{
				this.x = newX;
				this.y = newY;
				if(this.x > WIDTH || this.x < 0) this.dx *= -1;
				if(this.y > HEIGHT || this.y < 0) this.dy *= -1;
			}
			else
			{
				// hit an edge of the shape
				 this.dx *= -1;
				 this.dy *= -1;
			}
		}
	}

	this.getX = function() { return this.x; }
	this.getY = function() { return this.y; }
}

  function drawMan(ctx,alpha) {

	   // layer1/Path
      ctx.save();
      ctx.beginPath();
      ctx.moveTo(341.2, 157.9);
      ctx.lineTo(349.5, 170.1);
      ctx.lineTo(351.7, 188.3);
      ctx.lineTo(365.1, 190.8);
      ctx.lineTo(377.1, 201.3);
      ctx.lineTo(373.7, 212.0);
      ctx.lineTo(401.5, 229.0);
      ctx.lineTo(405.3, 203.7);
      ctx.lineTo(371.4, 178.8);
      ctx.lineTo(363.2, 165.2);
      ctx.lineTo(343.6, 154.7);
      ctx.lineTo(341.2, 157.9);
      ctx.closePath();
      ctx.fillStyle = "rgb(1, 1, 1)";
      ctx.fill();

      // layer1/Path
      ctx.beginPath();
      ctx.moveTo(417.1, 70.9);
      ctx.bezierCurveTo(416.9, 71.9, 416.9, 72.5, 416.9, 72.5);
      ctx.lineTo(429.0, 96.2);
      ctx.lineTo(439.0, 97.9);
      ctx.lineTo(443.5, 113.8);
      ctx.bezierCurveTo(443.5, 113.8, 455.4, 104.8, 458.7, 103.1);
      ctx.lineTo(449.4, 84.4);
      ctx.bezierCurveTo(449.4, 84.4, 452.1, 79.2, 451.7, 75.2);
      ctx.bezierCurveTo(451.4, 71.2, 450.1, 66.7, 450.1, 66.7);
      ctx.bezierCurveTo(450.1, 66.7, 440.9, 68.8, 434.8, 69.8);
      ctx.bezierCurveTo(431.1, 70.4, 423.0, 70.7, 417.1, 70.9);
      ctx.fill();

      // layer1/Path
      ctx.beginPath();
      ctx.moveTo(445.9, 52.6);
      ctx.lineTo(439.2, 38.9);
      ctx.lineTo(409.9, 40.8);
      ctx.lineTo(410.1, 58.1);
      ctx.bezierCurveTo(410.1, 58.1, 400.9, 60.0, 397.8, 61.6);
      ctx.bezierCurveTo(394.6, 63.2, 398.2, 65.8, 399.6, 66.3);
      ctx.bezierCurveTo(401.0, 66.7, 404.3, 66.9, 417.0, 66.3);
      ctx.bezierCurveTo(423.0, 66.1, 428.8, 65.7, 432.4, 65.1);
      ctx.bezierCurveTo(438.6, 64.0, 444.0, 63.0, 448.6, 61.9);
      ctx.bezierCurveTo(466.2, 57.8, 458.6, 53.8, 457.7, 53.6);
      ctx.bezierCurveTo(456.0, 53.1, 449.3, 52.6, 445.9, 52.6);
      ctx.fill();

      // layer1/Path
      ctx.beginPath();
      ctx.moveTo(395.6, 305.5);
      ctx.bezierCurveTo(395.6, 305.5, 299.4, 189.0, 275.8, 179.8);
      ctx.bezierCurveTo(260.6, 173.9, 252.3, 189.2, 244.7, 201.4);
      ctx.bezierCurveTo(239.6, 209.7, 200.6, 315.4, 186.8, 344.8);
      ctx.bezierCurveTo(186.6, 345.3, 233.6, 342.7, 233.6, 342.7);
      ctx.lineTo(271.4, 223.5);
      ctx.lineTo(364.3, 328.2);
      ctx.lineTo(386.7, 328.8);
      ctx.lineTo(395.6, 305.5);
      ctx.closePath();
      ctx.fill();

      // layer1/Path
      ctx.beginPath();
      ctx.moveTo(383.2, 333.8);
      ctx.bezierCurveTo(379.3, 333.9, 267.7, 346.0, 267.7, 346.0);
      ctx.lineTo(87.4, 355.6);
      ctx.lineTo(85.1, 383.5);
      ctx.bezierCurveTo(85.1, 383.5, 298.7, 382.6, 341.2, 383.3);
      ctx.bezierCurveTo(383.7, 383.9, 457.9, 390.9, 470.6, 372.3);
      ctx.bezierCurveTo(474.5, 366.6, 482.9, 347.4, 482.9, 347.4);
      ctx.bezierCurveTo(482.9, 347.4, 465.9, 355.8, 436.5, 350.3);
      ctx.bezierCurveTo(407.1, 344.8, 392.0, 339.7, 392.0, 339.7);
      ctx.lineTo(383.2, 333.8);
      ctx.closePath();
      ctx.fill();

      // layer1/Path
      ctx.beginPath();
      ctx.moveTo(401.0, 301.7);
      ctx.bezierCurveTo(399.3, 311.3, 392.0, 330.9, 392.0, 330.9);
      ctx.bezierCurveTo(392.0, 330.9, 410.5, 341.3, 435.5, 344.8);
      ctx.bezierCurveTo(472.6, 350.1, 489.8, 328.8, 489.8, 328.8);
      ctx.bezierCurveTo(489.8, 328.8, 484.5, 324.5, 483.6, 302.0);
      ctx.bezierCurveTo(481.5, 250.9, 493.1, 157.4, 492.7, 154.8);
      ctx.bezierCurveTo(492.0, 149.9, 477.7, 108.0, 469.4, 105.4);
      ctx.bezierCurveTo(461.2, 102.7, 450.2, 113.8, 450.2, 113.8);
      ctx.lineTo(457.3, 139.8);
      ctx.lineTo(440.1, 149.9);
      ctx.lineTo(442.4, 166.2);
      ctx.bezierCurveTo(442.4, 166.2, 408.3, 240.3, 407.6, 243.4);
      ctx.lineTo(401.0, 301.7);
      ctx.closePath();
      ctx.fill();

      // layer1/Path
      ctx.beginPath();
      ctx.moveTo(328.9, 136.3);
      ctx.lineTo(371.4, 185.2);
      ctx.lineTo(355.0, 199.5);
      ctx.lineTo(351.6, 215.7);
      ctx.lineTo(295.0, 156.3);
      ctx.lineTo(295.9, 155.1);
      ctx.lineTo(297.4, 155.7);
      ctx.lineTo(300.6, 150.9);
      ctx.lineTo(315.2, 151.9);
      ctx.lineTo(328.9, 136.3);
      ctx.closePath();
      ctx.fillStyle = "rgb(128, 128, 128)";
      ctx.fill();

      // layer1/Path
      ctx.beginPath();
      ctx.moveTo(359.7, 169.9);
      ctx.lineTo(349.6, 168.5);
      ctx.lineTo(352.3, 174.7);
      ctx.lineTo(368.8, 180.3);
      ctx.lineTo(359.7, 169.9);
      ctx.closePath();
      ctx.fillStyle = "rgb(1, 1, 1)";
      ctx.fill();

      // layer1/Path
      ctx.beginPath();
      ctx.moveTo(324.8, 182.4);
      ctx.lineTo(332.2, 195.4);
      ctx.lineTo(333.2, 213.8);
      ctx.lineTo(346.4, 217.4);
      ctx.lineTo(360.4, 231.8);
      ctx.lineTo(355.6, 243.8);
      ctx.lineTo(411.3, 284.1);
      ctx.lineTo(411.5, 258.4);
      ctx.lineTo(353.5, 206.1);
      ctx.lineTo(346.2, 191.8);
      ctx.lineTo(327.4, 179.5);
      ctx.lineTo(324.8, 182.4);
      ctx.closePath();
      ctx.fill();

      // layer1/Path
      ctx.beginPath();
      ctx.moveTo(438.8, 119.2);
      ctx.lineTo(426.7, 117.3);
      ctx.lineTo(425.0, 127.8);
      ctx.lineTo(426.4, 132.5);
      ctx.lineTo(416.6, 145.2);
      ctx.lineTo(411.4, 181.9);
      ctx.lineTo(409.0, 210.4);
      ctx.lineTo(407.1, 233.8);
      ctx.lineTo(418.7, 198.0);
      ctx.lineTo(423.2, 149.5);
      ctx.lineTo(429.9, 133.9);
      ctx.lineTo(438.8, 119.2);
      ctx.closePath();
      ctx.fill();

      // layer1/Path
      ctx.beginPath();
      ctx.moveTo(80.4, 379.9);
      ctx.bezierCurveTo(80.4, 379.9, 70.2, 383.2, 65.9, 381.8);
      ctx.bezierCurveTo(60.8, 380.1, 58.8, 381.1, 58.8, 381.1);
      ctx.lineTo(58.8, 382.5);
      ctx.lineTo(54.7, 383.1);
      ctx.lineTo(53.0, 362.6);
      ctx.lineTo(56.8, 362.0);
      ctx.lineTo(51.5, 338.5);
      ctx.lineTo(47.9, 296.7);
      ctx.lineTo(50.5, 296.7);
      ctx.lineTo(51.6, 299.5);
      ctx.bezierCurveTo(51.6, 299.5, 56.3, 305.9, 58.4, 314.5);
      ctx.bezierCurveTo(60.6, 323.0, 70.9, 347.9, 70.9, 347.9);
      ctx.lineTo(81.1, 357.7);
      ctx.lineTo(80.4, 379.9);
      ctx.closePath();
      ctx.fill();

      // layer1/Path
      ctx.beginPath();
      ctx.moveTo(0.0, 215.7);
      ctx.lineTo(0.0, 221.3);

      // layer1/Path
      ctx.beginPath();
      ctx.moveTo(0.0, 0.0);
      ctx.lineTo(0.0, 4.6);
      ctx.restore();
    }
    
    function drawManBoyKite(ctx)
    {

      var alpha = ctx.globalAlpha;

      // layer1/Group
      ctx.save();
      ctx.globalAlpha = alpha * 0.80;

      // layer1/Group/Group
      ctx.save();
      ctx.globalAlpha = alpha * 1.00;

      // layer1/Group/Group/Clipping Path
      ctx.save();
      ctx.beginPath();
      ctx.moveTo(408.4, 124.1);
      ctx.lineTo(443.4, 124.1);
      ctx.lineTo(443.4, 73.1);
      ctx.lineTo(408.4, 73.1);
      ctx.lineTo(408.4, 124.1);
      ctx.closePath();
      ctx.clip();

      // layer1/Group/Group/Path
      ctx.beginPath();
      ctx.moveTo(408.9, 73.6);
      ctx.bezierCurveTo(408.9, 73.6, 415.3, 96.0, 424.0, 106.5);
      ctx.bezierCurveTo(432.7, 116.9, 442.8, 123.5, 442.8, 123.5);
      ctx.lineWidth = 1.1;
      ctx.strokeStyle = "rgb(1, 1, 1)";
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      ctx.stroke();

      // layer1/Path
      ctx.restore();
      ctx.restore();
      ctx.globalAlpha = alpha * 1.00;
      ctx.beginPath();
      ctx.moveTo(417.2, 73.7);
      ctx.lineTo(419.8, 81.0);
      ctx.lineTo(403.4, 78.8);
      ctx.lineTo(405.3, 85.7);
      ctx.lineTo(417.2, 73.7);
      ctx.closePath();
      ctx.fillStyle = "rgb(1, 1, 1)";
      ctx.fill();

      // layer1/Path
      ctx.beginPath();
      ctx.moveTo(424.4, 92.5);
      ctx.lineTo(428.5, 98.9);
      ctx.lineTo(412.2, 100.6);
      ctx.lineTo(415.5, 106.9);
      ctx.lineTo(424.4, 92.5);
      ctx.closePath();
      ctx.fill();

      // layer1/Path
      ctx.beginPath();
      ctx.moveTo(438.5, 109.0);
      ctx.lineTo(443.6, 114.8);
      ctx.lineTo(427.6, 119.0);
      ctx.lineTo(431.9, 124.7);
      ctx.lineTo(438.5, 109.0);
      ctx.closePath();
      ctx.fill();

      // layer1/Group
      ctx.globalAlpha = alpha * 0.80;

      // layer1/Group/Group
      ctx.save();
      ctx.globalAlpha = alpha * 1.00;

      // layer1/Group/Group/Clipping Path
      ctx.save();
      ctx.beginPath();
      ctx.moveTo(225.0, 171.5);
      ctx.lineTo(552.3, 171.5);
      ctx.lineTo(400.8, 37.7);
      ctx.lineTo(225.0, 0.0);
      ctx.lineTo(225.0, 171.5);
      ctx.closePath();
      ctx.clip();

      // layer1/Group/Group/Path
      ctx.beginPath();
      ctx.moveTo(225.0, 171.1);
      ctx.bezierCurveTo(225.0, 171.1, 370.1, 124.9, 399.6, 37.7);
      ctx.bezierCurveTo(419.8, -22.3, 399.6, 37.7, 399.6, 37.7);
      ctx.lineWidth = 1.3;
      ctx.strokeStyle = "rgb(1, 1, 1)";
      ctx.stroke();

      // layer1/Path
      ctx.restore();
      ctx.restore();
      ctx.globalAlpha = alpha * 1.00;
      ctx.beginPath();
      ctx.moveTo(224.1, 159.6);
      ctx.bezierCurveTo(224.1, 159.6, 222.5, 157.6, 221.6, 156.2);
      ctx.bezierCurveTo(220.7, 154.9, 221.9, 153.3, 223.2, 155.0);
      ctx.bezierCurveTo(224.5, 156.7, 225.4, 158.5, 225.4, 158.5);
      ctx.lineTo(228.7, 157.4);
      ctx.bezierCurveTo(228.7, 157.4, 229.2, 159.4, 226.3, 161.7);
      ctx.bezierCurveTo(224.0, 163.4, 221.9, 162.6, 221.9, 162.6);
      ctx.lineTo(224.1, 159.6);
      ctx.closePath();
      ctx.fill();

      // layer1/Path
      ctx.beginPath();
      ctx.moveTo(234.8, 170.7);
      ctx.bezierCurveTo(234.8, 170.7, 236.4, 172.9, 237.4, 174.3);
      ctx.bezierCurveTo(238.4, 175.8, 237.1, 177.5, 235.7, 175.7);
      ctx.bezierCurveTo(234.3, 173.8, 233.3, 171.8, 233.3, 171.8);
      ctx.lineTo(229.2, 172.2);
      ctx.bezierCurveTo(229.2, 172.2, 229.9, 172.1, 233.2, 169.6);
      ctx.bezierCurveTo(235.6, 167.8, 235.8, 166.5, 235.8, 166.5);
      ctx.lineTo(234.8, 170.7);
      ctx.closePath();
      ctx.fill();

      // layer1/Path
      ctx.beginPath();
      ctx.moveTo(115.9, 83.1);
      ctx.bezierCurveTo(116.0, 84.5, 116.1, 86.4, 113.4, 88.6);
      ctx.bezierCurveTo(111.6, 89.9, 109.7, 90.6, 107.6, 90.6);
      ctx.bezierCurveTo(107.2, 90.6, 106.8, 90.6, 106.5, 90.6);
      ctx.bezierCurveTo(106.7, 92.1, 106.9, 93.1, 106.9, 93.1);
      ctx.bezierCurveTo(106.9, 93.1, 108.7, 93.2, 110.1, 93.8);
      ctx.bezierCurveTo(111.6, 94.4, 113.4, 96.0, 113.4, 96.0);
      ctx.bezierCurveTo(113.4, 96.0, 112.9, 95.1, 115.8, 93.0);
      ctx.bezierCurveTo(119.2, 90.4, 119.3, 90.4, 118.8, 85.4);
      ctx.bezierCurveTo(118.6, 83.1, 118.5, 81.5, 118.3, 80.3);
      ctx.bezierCurveTo(117.7, 80.6, 117.0, 81.0, 116.4, 81.4);
      ctx.bezierCurveTo(115.9, 81.8, 115.9, 82.2, 115.9, 83.1);
      ctx.fill();

      // layer1/Path
      ctx.beginPath();
      ctx.moveTo(116.9, 75.7);
      ctx.bezierCurveTo(116.9, 75.7, 114.2, 73.3, 113.4, 73.3);
      ctx.bezierCurveTo(112.5, 73.3, 111.3, 73.6, 109.2, 74.3);
      ctx.bezierCurveTo(104.1, 75.8, 104.1, 76.0, 104.1, 80.1);
      ctx.bezierCurveTo(104.2, 83.7, 105.1, 87.4, 105.5, 88.6);
      ctx.bezierCurveTo(105.6, 88.6, 105.9, 88.7, 106.2, 88.7);
      ctx.bezierCurveTo(106.6, 88.8, 107.1, 88.9, 107.6, 88.9);
      ctx.bezierCurveTo(109.3, 88.9, 110.9, 88.3, 112.3, 87.2);
      ctx.bezierCurveTo(114.3, 85.6, 114.2, 84.4, 114.2, 83.2);
      ctx.bezierCurveTo(114.1, 82.2, 114.1, 81.0, 115.3, 80.1);
      ctx.bezierCurveTo(116.1, 79.5, 117.0, 79.0, 117.8, 78.6);
      ctx.bezierCurveTo(118.4, 78.4, 119.6, 78.1, 120.0, 77.9);
      ctx.bezierCurveTo(119.5, 77.4, 118.1, 76.8, 116.9, 75.7);
      ctx.fill();

      // layer1/Path
      ctx.beginPath();
      ctx.moveTo(131.2, 215.6);
      ctx.bezierCurveTo(131.2, 215.6, 136.4, 265.3, 137.0, 280.9);
      ctx.bezierCurveTo(137.6, 296.5, 138.5, 358.7, 138.5, 358.7);
      ctx.lineTo(121.1, 358.7);
      ctx.bezierCurveTo(121.1, 358.7, 127.9, 295.6, 126.5, 281.8);
      ctx.bezierCurveTo(125.0, 268.0, 116.8, 213.5, 116.8, 213.5);
      ctx.bezierCurveTo(116.8, 213.5, 114.5, 273.3, 113.6, 281.0);
      ctx.bezierCurveTo(112.7, 288.6, 107.1, 357.2, 107.1, 357.2);
      ctx.lineTo(87.5, 357.9);
      ctx.lineTo(103.1, 279.4);
      ctx.lineTo(103.8, 204.5);
      ctx.lineTo(129.9, 203.4);
      ctx.lineTo(131.2, 215.6);
      ctx.closePath();
      ctx.fill();

      // layer1/Path
      ctx.beginPath();
      ctx.moveTo(120.2, 366.5);
      ctx.bezierCurveTo(120.2, 366.5, 119.7, 374.9, 120.4, 376.1);
      ctx.bezierCurveTo(121.1, 377.3, 128.4, 376.1, 128.4, 376.1);
      ctx.lineTo(128.5, 373.8);
      ctx.lineTo(129.9, 375.0);
      ctx.bezierCurveTo(129.9, 375.0, 137.3, 374.3, 142.2, 371.6);
      ctx.bezierCurveTo(146.8, 369.0, 146.3, 367.1, 140.7, 366.4);
      ctx.bezierCurveTo(135.2, 365.7, 130.3, 365.4, 130.3, 365.4);
      ctx.lineTo(129.2, 363.7);
      ctx.lineTo(120.8, 363.7);
      ctx.lineTo(120.2, 366.5);
      ctx.closePath();
      ctx.fill();

      // layer1/Path
      ctx.beginPath();
      ctx.moveTo(90.6, 362.6);
      ctx.bezierCurveTo(90.6, 362.6, 90.8, 372.1, 90.8, 373.1);
      ctx.bezierCurveTo(90.8, 374.1, 95.9, 375.0, 95.9, 375.0);
      ctx.lineTo(102.3, 373.4);
      ctx.lineTo(102.4, 372.1);
      ctx.bezierCurveTo(102.4, 372.1, 108.6, 371.5, 111.5, 370.7);
      ctx.bezierCurveTo(114.3, 369.9, 119.2, 367.2, 116.8, 365.5);
      ctx.bezierCurveTo(114.4, 363.8, 108.3, 364.5, 105.8, 364.5);
      ctx.bezierCurveTo(103.7, 364.4, 101.5, 364.3, 101.5, 364.3);
      ctx.lineTo(101.0, 362.3);
      ctx.lineTo(90.6, 362.6);
      ctx.closePath();
      ctx.fill();

      // layer1/Path
      ctx.beginPath();
      ctx.moveTo(106.7, 94.4);
      ctx.bezierCurveTo(106.7, 94.4, 102.0, 99.4, 102.8, 112.5);
      ctx.bezierCurveTo(103.5, 125.5, 101.2, 150.7, 101.3, 165.2);
      ctx.bezierCurveTo(101.4, 179.7, 99.3, 196.6, 100.4, 200.6);
      ctx.bezierCurveTo(101.3, 204.1, 136.9, 199.5, 136.9, 199.5);
      ctx.bezierCurveTo(136.9, 199.5, 124.5, 172.5, 124.2, 148.3);
      ctx.bezierCurveTo(123.8, 124.1, 127.0, 118.1, 120.0, 106.3);
      ctx.bezierCurveTo(113.0, 94.5, 106.7, 94.4, 106.7, 94.4);
      ctx.fill();

      // layer1/Path
      ctx.beginPath();
      ctx.moveTo(100.6, 104.1);
      ctx.bezierCurveTo(100.6, 104.2, 89.2, 128.6, 87.8, 132.2);
      ctx.bezierCurveTo(86.3, 135.8, 97.8, 175.6, 97.8, 175.6);
      ctx.lineTo(99.2, 159.5);
      ctx.lineTo(93.8, 135.6);
      ctx.lineTo(101.1, 121.6);
      ctx.lineTo(100.6, 104.1);
      ctx.closePath();
      ctx.fill();

      // layer1/Path
      ctx.beginPath();
      ctx.moveTo(175.3, 192.4);
      ctx.bezierCurveTo(175.3, 192.4, 169.0, 195.7, 171.0, 204.5);
      ctx.bezierCurveTo(176.0, 227.2, 173.3, 228.8, 172.2, 239.2);
      ctx.bezierCurveTo(171.2, 248.7, 170.3, 250.4, 170.4, 253.5);
      ctx.bezierCurveTo(170.5, 255.9, 190.9, 251.0, 190.9, 251.0);
      ctx.bezierCurveTo(190.9, 251.0, 189.5, 240.3, 189.2, 224.3);
      ctx.bezierCurveTo(189.0, 208.4, 187.9, 208.0, 183.3, 200.3);
      ctx.bezierCurveTo(178.7, 192.5, 175.3, 192.4, 175.3, 192.4);
      ctx.fill();

      // layer1/Path
      ctx.beginPath();
      ctx.moveTo(177.3, 185.5);
      ctx.lineTo(177.3, 185.5);
      ctx.bezierCurveTo(175.7, 185.5, 174.4, 185.0, 173.6, 184.5);
      ctx.bezierCurveTo(173.6, 185.0, 173.6, 185.5, 173.8, 186.2);
      ctx.bezierCurveTo(174.2, 188.8, 175.7, 191.3, 175.7, 191.3);
      ctx.lineTo(178.9, 193.3);
      ctx.bezierCurveTo(178.9, 193.3, 178.6, 192.2, 180.4, 191.1);
      ctx.bezierCurveTo(182.8, 189.7, 183.0, 189.5, 182.7, 186.1);
      ctx.bezierCurveTo(182.6, 185.3, 182.5, 184.5, 182.5, 183.9);
      ctx.bezierCurveTo(181.9, 184.2, 180.8, 184.9, 179.2, 185.2);
      ctx.bezierCurveTo(178.6, 185.4, 177.9, 185.5, 177.3, 185.5);
      ctx.fill();

      // layer1/Path
      ctx.beginPath();
      ctx.moveTo(187.1, 177.9);
      ctx.bezierCurveTo(186.9, 177.3, 186.6, 176.6, 185.8, 176.1);
      ctx.bezierCurveTo(185.4, 175.9, 184.9, 175.8, 184.5, 175.8);
      ctx.bezierCurveTo(183.4, 175.8, 182.6, 176.3, 182.5, 176.3);
      ctx.lineTo(181.1, 177.0);
      ctx.lineTo(180.9, 176.7);
      ctx.bezierCurveTo(180.9, 176.7, 180.4, 176.0, 178.5, 176.0);
      ctx.bezierCurveTo(177.9, 176.0, 177.2, 176.1, 176.4, 176.3);
      ctx.bezierCurveTo(173.3, 176.9, 173.0, 178.4, 172.8, 179.7);
      ctx.bezierCurveTo(172.7, 179.9, 172.7, 180.1, 172.6, 180.4);
      ctx.bezierCurveTo(172.4, 181.2, 172.9, 182.6, 173.2, 183.2);
      ctx.bezierCurveTo(173.3, 183.2, 173.4, 183.3, 173.6, 183.5);
      ctx.bezierCurveTo(174.3, 183.9, 175.6, 184.5, 177.3, 184.5);
      ctx.lineTo(177.3, 184.5);
      ctx.bezierCurveTo(177.9, 184.5, 178.4, 184.4, 179.0, 184.3);
      ctx.bezierCurveTo(180.8, 183.9, 181.7, 183.6, 182.2, 183.3);
      ctx.bezierCurveTo(182.5, 183.1, 182.7, 182.9, 182.9, 182.7);
      ctx.lineTo(183.1, 182.6);
      ctx.bezierCurveTo(183.4, 182.3, 183.9, 182.1, 184.4, 181.7);
      ctx.bezierCurveTo(185.2, 181.2, 186.3, 180.5, 186.7, 179.9);
      ctx.bezierCurveTo(187.1, 179.4, 187.2, 178.6, 187.1, 177.9);
      ctx.fill();

      // layer1/Path
      ctx.beginPath();
      ctx.moveTo(175.5, 175.5);
      ctx.lineTo(178.5, 178.7);
      ctx.lineTo(174.4, 182.3);
      ctx.lineTo(166.9, 175.6);
      ctx.lineTo(168.0, 172.6);
      ctx.lineTo(170.7, 173.8);
      ctx.lineTo(174.8, 171.4);
      ctx.lineTo(174.8, 172.5);
      ctx.lineTo(173.0, 174.5);
      ctx.lineTo(175.5, 175.5);
      ctx.closePath();
      ctx.fill();

      // layer1/Path
      ctx.beginPath();
      ctx.moveTo(175.5, 175.5);
      ctx.lineTo(178.5, 178.7);
      ctx.lineTo(174.4, 182.3);
      ctx.lineTo(166.9, 175.6);
      ctx.lineTo(168.0, 172.6);
      ctx.lineTo(170.7, 173.8);
      ctx.lineTo(174.8, 171.4);
      ctx.lineTo(174.8, 172.5);
      ctx.lineTo(173.0, 174.5);
      ctx.lineTo(175.5, 175.5);
      ctx.closePath();
      ctx.lineWidth = 0.9;
      ctx.strokeStyle = "rgb(141, 208, 234)";
      ctx.stroke();

      // layer1/Path
      ctx.beginPath();
      ctx.moveTo(113.5, 105.0);
      ctx.bezierCurveTo(113.5, 105.0, 110.6, 104.1, 109.8, 105.8);
      ctx.bezierCurveTo(109.1, 107.4, 109.5, 114.8, 110.7, 116.6);
      ctx.bezierCurveTo(112.0, 118.5, 125.2, 138.4, 128.1, 141.5);
      ctx.bezierCurveTo(131.0, 144.6, 164.4, 175.9, 164.4, 175.9);
      ctx.lineTo(167.4, 169.5);
      ctx.lineTo(133.0, 136.8);
      ctx.lineTo(113.5, 105.0);
      ctx.closePath();
      ctx.fill();

      // layer1/Path
      ctx.beginPath();
      ctx.moveTo(173.4, 361.6);
      ctx.bezierCurveTo(173.4, 361.6, 176.8, 321.0, 177.3, 317.4);
      ctx.bezierCurveTo(177.5, 315.4, 177.8, 307.7, 178.1, 296.7);
      ctx.lineTo(172.7, 296.7);
      ctx.lineTo(172.4, 317.6);
      ctx.lineTo(165.8, 369.7);
      ctx.lineTo(169.6, 370.9);
      ctx.lineTo(186.3, 367.4);
      ctx.bezierCurveTo(186.3, 367.0, 186.4, 366.5, 186.4, 366.1);
      ctx.lineTo(173.4, 361.6);
      ctx.closePath();
      ctx.fill();

      // layer1/Path
      ctx.beginPath();
      ctx.moveTo(193.4, 364.1);
      ctx.bezierCurveTo(193.4, 364.1, 195.6, 324.7, 195.3, 317.1);
      ctx.bezierCurveTo(195.2, 313.8, 194.4, 307.7, 193.4, 297.7);
      ctx.lineTo(187.1, 297.7);
      ctx.bezierCurveTo(188.2, 307.7, 189.2, 315.1, 189.4, 317.4);
      ctx.bezierCurveTo(190.2, 324.6, 185.9, 371.1, 185.9, 371.1);
      ctx.lineTo(190.1, 372.4);
      ctx.lineTo(209.6, 368.3);
      ctx.lineTo(209.6, 367.2);
      ctx.lineTo(193.4, 364.1);
      ctx.closePath();
      ctx.fill();

      // layer1/Path
      ctx.beginPath();
      ctx.moveTo(189.2, 253.2);
      ctx.lineTo(172.4, 256.3);
      ctx.lineTo(170.4, 294.7);
      ctx.lineTo(172.7, 294.7);
      ctx.lineTo(178.1, 294.7);
      ctx.lineTo(181.1, 294.7);
      ctx.lineTo(181.3, 263.8);
      ctx.lineTo(182.9, 296.7);
      ctx.lineTo(187.1, 296.7);
      ctx.lineTo(193.4, 296.7);
      ctx.lineTo(196.5, 296.7);
      ctx.lineTo(189.2, 253.2);
      ctx.closePath();
      ctx.fill();

      // layer1/Path
      ctx.beginPath();
      ctx.moveTo(178.3, 196.9);
      ctx.bezierCurveTo(178.3, 196.9, 176.8, 199.1, 177.6, 200.7);
      ctx.bezierCurveTo(178.2, 202.1, 180.9, 203.1, 182.2, 202.5);
      ctx.bezierCurveTo(183.5, 201.9, 196.5, 197.1, 196.5, 197.1);
      ctx.bezierCurveTo(197.8, 194.2, 195.5, 189.1, 195.5, 189.1);
      ctx.lineTo(178.3, 196.9);
      ctx.closePath();
      ctx.fill();

      // layer1/Path
      ctx.beginPath();
      ctx.moveTo(228.1, 164.0);
      ctx.lineTo(231.0, 160.9);
      ctx.lineTo(234.5, 165.6);
      ctx.lineTo(211.9, 187.6);
      ctx.lineTo(198.3, 193.9);
      ctx.lineTo(198.0, 189.5);
      ctx.lineTo(210.4, 184.6);
      ctx.lineTo(228.0, 167.1);
      ctx.lineTo(226.2, 164.8);
      ctx.lineTo(228.1, 164.0);
      ctx.closePath();
      ctx.fill();

      // layer1/Path
      ctx.beginPath();
      ctx.moveTo(260.8, 326.5);
      ctx.bezierCurveTo(260.8, 326.5, 261.2, 319.7, 258.4, 317.1);
      ctx.lineTo(255.1, 321.9);
      ctx.bezierCurveTo(255.1, 321.9, 252.3, 321.3, 249.9, 320.9);
      ctx.bezierCurveTo(249.1, 320.8, 246.1, 322.4, 245.2, 322.3);
      ctx.bezierCurveTo(242.5, 321.8, 241.6, 320.9, 240.3, 320.7);
      ctx.bezierCurveTo(237.3, 320.2, 236.1, 326.6, 236.1, 326.6);
      ctx.lineTo(247.5, 333.1);
      ctx.lineTo(236.5, 334.0);
      ctx.bezierCurveTo(236.5, 334.0, 236.5, 337.0, 239.0, 337.2);
      ctx.bezierCurveTo(243.6, 337.6, 252.5, 337.8, 252.5, 337.8);
      ctx.bezierCurveTo(252.5, 337.8, 251.8, 350.6, 265.6, 350.0);
      ctx.bezierCurveTo(279.5, 349.5, 299.6, 349.8, 302.6, 345.8);
      ctx.bezierCurveTo(305.6, 341.9, 304.6, 333.9, 304.6, 333.9);
      ctx.bezierCurveTo(304.6, 333.9, 301.4, 333.2, 287.9, 330.5);
      ctx.bezierCurveTo(278.9, 328.6, 274.2, 331.3, 260.8, 326.5);
      ctx.fill();

      // layer1/Path
      ctx.beginPath();
      ctx.moveTo(301.8, 334.3);
      ctx.bezierCurveTo(301.8, 334.3, 307.0, 328.0, 308.5, 325.2);
      ctx.bezierCurveTo(309.3, 323.5, 311.8, 318.8, 311.9, 313.6);
      ctx.bezierCurveTo(312.0, 310.2, 313.5, 311.5, 313.8, 313.3);
      ctx.bezierCurveTo(314.1, 315.1, 313.9, 318.9, 313.3, 322.5);
      ctx.bezierCurveTo(313.2, 323.3, 312.5, 326.3, 310.9, 328.9);
      ctx.bezierCurveTo(308.5, 332.7, 304.3, 335.6, 304.3, 335.6);
      ctx.lineTo(301.8, 334.3);
      ctx.closePath();
      ctx.fill();

      // layer1/Path
      ctx.beginPath();
      ctx.moveTo(266.8, 369.5);
      ctx.bezierCurveTo(266.8, 370.7, 266.6, 371.5, 265.5, 371.5);
      ctx.lineTo(261.2, 371.8);
      ctx.bezierCurveTo(261.2, 371.8, 260.2, 370.5, 260.2, 369.4);
      ctx.lineTo(262.2, 367.7);
      ctx.lineTo(262.1, 340.7);
      ctx.bezierCurveTo(262.1, 339.5, 263.3, 337.7, 264.4, 337.7);
      ctx.lineTo(264.6, 337.7);
      ctx.bezierCurveTo(265.7, 337.7, 269.3, 340.2, 269.3, 341.4);
      ctx.bezierCurveTo(269.3, 341.4, 267.2, 345.2, 267.4, 354.6);
      ctx.bezierCurveTo(267.6, 363.9, 266.8, 369.5, 266.8, 369.5);
      ctx.fill();

      // layer1/Path
      ctx.beginPath();
      ctx.moveTo(224.3, 322.7);
      ctx.bezierCurveTo(223.8, 322.4, 223.6, 321.8, 223.8, 321.3);
      ctx.lineTo(223.9, 321.2);
      ctx.bezierCurveTo(224.1, 320.7, 224.8, 320.5, 225.3, 320.7);
      ctx.lineTo(232.3, 324.3);
      ctx.bezierCurveTo(232.8, 324.6, 233.0, 325.2, 232.7, 325.7);
      ctx.lineTo(232.7, 325.8);
      ctx.bezierCurveTo(232.4, 326.3, 231.8, 326.5, 231.3, 326.3);
      ctx.lineTo(224.3, 322.7);
      ctx.closePath();
      ctx.fill();

      // layer1/Path
      ctx.beginPath();
      ctx.moveTo(222.6, 331.1);
      ctx.bezierCurveTo(222.0, 331.1, 221.9, 330.7, 221.9, 330.1);
      ctx.lineTo(221.9, 330.0);
      ctx.bezierCurveTo(221.9, 329.4, 222.0, 328.9, 222.5, 328.9);
      ctx.lineTo(231.1, 328.9);
      ctx.bezierCurveTo(231.7, 328.9, 232.9, 329.4, 232.9, 330.0);
      ctx.lineTo(232.9, 330.0);
      ctx.bezierCurveTo(232.9, 330.6, 231.7, 331.1, 231.1, 331.1);
      ctx.lineTo(222.6, 331.1);
      ctx.closePath();
      ctx.fill();

      // layer1/Path
      ctx.beginPath();
      ctx.moveTo(222.8, 339.1);
      ctx.bezierCurveTo(222.3, 339.3, 221.7, 339.0, 221.5, 338.5);
      ctx.lineTo(221.5, 338.4);
      ctx.bezierCurveTo(221.2, 337.9, 221.5, 337.2, 222.1, 337.0);
      ctx.lineTo(229.8, 334.2);
      ctx.bezierCurveTo(230.3, 333.9, 231.3, 334.1, 231.5, 334.6);
      ctx.lineTo(231.5, 334.7);
      ctx.bezierCurveTo(231.8, 335.2, 231.1, 336.0, 230.5, 336.2);
      ctx.lineTo(222.8, 339.1);
      ctx.closePath();
      ctx.fill();

      // layer1/Compound Path
      ctx.beginPath();

      // layer1/Compound Path/Path
      ctx.moveTo(401.8, 4.8);
      ctx.lineTo(382.4, 31.9);
      ctx.lineTo(409.5, 75.6);
      ctx.lineTo(427.4, 30.3);
      ctx.lineTo(401.8, 4.8);
      ctx.closePath();

      // layer1/Compound Path/Path
      ctx.moveTo(405.8, 33.2);
      ctx.lineTo(409.2, 72.6);
      ctx.lineTo(408.0, 70.6);
      ctx.lineTo(403.4, 33.6);
      ctx.lineTo(385.1, 33.2);
      ctx.lineTo(384.3, 32.3);
      ctx.lineTo(403.0, 30.8);
      ctx.lineTo(401.5, 8.5);
      ctx.lineTo(402.1, 7.1);
      ctx.lineTo(405.9, 31.0);
      ctx.lineTo(425.9, 30.3);
      ctx.lineTo(425.4, 31.7);
      ctx.lineTo(405.8, 33.2);
      ctx.closePath();
      ctx.fill();

      // layer1/Path
      ctx.beginPath();
      ctx.moveTo(285.7, 344.1);
      ctx.lineTo(289.5, 353.0);
      ctx.lineTo(301.1, 363.4);
      ctx.lineTo(300.1, 368.5);
      ctx.lineTo(296.3, 370.3);
      ctx.lineTo(296.8, 372.1);
      ctx.bezierCurveTo(296.8, 372.1, 299.9, 371.9, 301.5, 371.9);
      ctx.bezierCurveTo(303.0, 371.9, 306.0, 361.9, 306.0, 361.9);
      ctx.bezierCurveTo(306.0, 361.9, 299.3, 356.7, 299.3, 354.8);
      ctx.bezierCurveTo(299.3, 353.0, 302.5, 345.6, 300.2, 343.2);
      ctx.bezierCurveTo(297.8, 340.9, 297.2, 338.7, 293.6, 340.0);
      ctx.bezierCurveTo(289.9, 341.2, 285.7, 344.1, 285.7, 344.1);
      ctx.fill();

      // layer1/Path
      ctx.beginPath();
      ctx.moveTo(0.5, 381.4);
      ctx.lineTo(0.5, 385.4);
      ctx.lineWidth = 1.0;
      ctx.strokeStyle = "rgb(0, 0, 0)";
      ctx.lineJoin = "miter";
      ctx.miterLimit = 4.0;
      ctx.stroke();
      ctx.restore();
    
    
    }
    
    function drawPancakeMan(ctx) {

       // layer1/Path
      ctx.save();
      ctx.beginPath();
      ctx.moveTo(356.8, 231.7);
      ctx.bezierCurveTo(356.9, 203.4, 349.9, 153.8, 354.1, 128.7);
      ctx.bezierCurveTo(359.0, 99.8, 354.6, 94.5, 354.6, 94.5);
      ctx.bezierCurveTo(354.6, 94.5, 352.1, 98.6, 343.5, 96.9);
      ctx.bezierCurveTo(342.2, 96.6, 337.3, 101.2, 334.6, 102.4);
      ctx.bezierCurveTo(334.4, 102.5, 324.9, 119.4, 318.3, 132.7);
      ctx.bezierCurveTo(316.1, 137.1, 305.1, 166.9, 305.0, 166.9);
      ctx.bezierCurveTo(305.0, 166.9, 309.1, 146.5, 315.1, 132.0);
      ctx.bezierCurveTo(320.9, 118.1, 332.0, 100.5, 332.0, 100.4);
      ctx.bezierCurveTo(332.2, 97.8, 333.4, 95.6, 333.3, 94.2);
      ctx.bezierCurveTo(333.3, 93.6, 332.5, 93.0, 332.5, 92.1);
      ctx.bezierCurveTo(332.5, 90.6, 333.7, 89.5, 333.7, 89.5);
      ctx.bezierCurveTo(327.7, 90.8, 324.7, 99.6, 320.2, 107.6);
      ctx.bezierCurveTo(307.4, 130.6, 298.4, 152.7, 291.6, 198.4);
      ctx.bezierCurveTo(284.5, 245.1, 291.6, 298.6, 291.6, 298.6);
      ctx.bezierCurveTo(291.6, 298.6, 293.6, 298.9, 296.9, 299.3);
      ctx.bezierCurveTo(298.7, 299.6, 300.0, 290.2, 300.0, 290.2);
      ctx.lineTo(305.0, 299.6);
      ctx.bezierCurveTo(305.0, 299.6, 354.1, 299.0, 360.8, 308.5);
      ctx.bezierCurveTo(365.3, 314.9, 356.7, 260.1, 356.8, 231.7);
      ctx.fillStyle = "rgb(1, 1, 1)";
      ctx.fill();

      // layer1/Path
      ctx.beginPath();
      ctx.moveTo(314.8, 164.2);
      ctx.bezierCurveTo(313.3, 164.2, 312.2, 163.0, 312.2, 161.5);
      ctx.bezierCurveTo(312.2, 160.0, 313.3, 158.8, 314.8, 158.8);
      ctx.bezierCurveTo(316.2, 158.8, 317.3, 160.0, 317.3, 161.5);
      ctx.bezierCurveTo(317.3, 163.0, 316.2, 164.2, 314.8, 164.2);
      ctx.fillStyle = "rgb(255, 255, 255)";
      ctx.fill();

      // layer1/Path
      ctx.beginPath();
      ctx.moveTo(323.9, 140.1);
      ctx.bezierCurveTo(322.4, 140.1, 321.3, 138.8, 321.3, 137.3);
      ctx.bezierCurveTo(321.3, 135.8, 322.4, 134.6, 323.9, 134.6);
      ctx.bezierCurveTo(325.3, 134.6, 326.4, 135.8, 326.4, 137.3);
      ctx.bezierCurveTo(326.4, 138.8, 325.3, 140.1, 323.9, 140.1);
      ctx.fill();

      // layer1/Path
      ctx.beginPath();
      ctx.moveTo(335.5, 118.1);
      ctx.bezierCurveTo(334.1, 118.1, 333.0, 116.9, 333.0, 115.4);
      ctx.bezierCurveTo(333.0, 113.9, 334.1, 112.7, 335.5, 112.7);
      ctx.bezierCurveTo(336.9, 112.7, 338.0, 113.9, 338.0, 115.4);
      ctx.bezierCurveTo(338.0, 116.9, 336.9, 118.1, 335.5, 118.1);
      ctx.fill();

      // layer1/Path
      ctx.beginPath();
      ctx.moveTo(339.3, 58.6);
      ctx.lineTo(357.1, 68.9);
      ctx.bezierCurveTo(357.1, 68.9, 372.2, 39.1, 378.1, 34.5);
      ctx.bezierCurveTo(384.0, 29.8, 391.3, 29.2, 393.8, 28.8);
      ctx.bezierCurveTo(396.3, 28.4, 400.5, 22.9, 395.7, 20.6);
      ctx.bezierCurveTo(390.9, 18.3, 389.0, 16.3, 389.0, 16.3);
      ctx.bezierCurveTo(389.0, 16.3, 389.0, 8.1, 383.5, 4.6);
      ctx.bezierCurveTo(378.1, 1.1, 374.9, 6.4, 374.9, 6.4);
      ctx.bezierCurveTo(374.9, 6.4, 373.6, 1.7, 369.1, 0.4);
      ctx.bezierCurveTo(364.6, -0.9, 362.2, 1.1, 362.4, 4.2);
      ctx.bezierCurveTo(362.7, 7.3, 363.7, 16.6, 363.7, 16.6);
      ctx.bezierCurveTo(363.7, 16.6, 349.5, 36.1, 344.9, 44.7);
      ctx.bezierCurveTo(340.3, 53.3, 339.3, 58.6, 339.3, 58.6);
      ctx.fillStyle = "rgb(1, 1, 1)";
      ctx.fill();

      // layer1/Path
      ctx.beginPath();
      ctx.moveTo(355.4, 73.5);
      ctx.lineTo(337.2, 63.7);
      ctx.bezierCurveTo(337.2, 63.7, 332.5, 73.8, 333.4, 79.7);
      ctx.bezierCurveTo(334.4, 85.5, 337.9, 89.0, 337.9, 89.0);
      ctx.bezierCurveTo(337.9, 89.0, 343.8, 93.6, 347.6, 91.5);
      ctx.bezierCurveTo(351.4, 89.5, 355.4, 73.5, 355.4, 73.5);
      ctx.fill();

      // layer1/Path
      ctx.beginPath();
      ctx.moveTo(245.0, 157.5);
      ctx.lineTo(290.9, 181.2);
      ctx.lineTo(288.9, 194.9);
      ctx.lineTo(238.4, 173.5);
      ctx.lineTo(245.0, 157.5);
      ctx.closePath();
      ctx.fill();

      // layer1/Path
      ctx.beginPath();
      ctx.moveTo(222.9, 143.7);
      ctx.lineTo(228.3, 140.4);
      ctx.lineTo(236.9, 152.4);
      ctx.lineTo(241.3, 155.6);
      ctx.lineTo(238.4, 160.3);
      ctx.lineTo(234.9, 157.6);
      ctx.lineTo(225.0, 161.5);
      ctx.lineTo(213.4, 153.4);
      ctx.lineTo(213.1, 140.1);
      ctx.lineTo(222.9, 143.7);
      ctx.closePath();
      ctx.fill();

      // layer1/Path
      ctx.beginPath();
      ctx.moveTo(132.5, 87.5);
      ctx.lineTo(127.8, 103.5);
      ctx.bezierCurveTo(127.8, 103.5, 141.9, 117.8, 156.0, 126.3);
      ctx.bezierCurveTo(167.1, 133.0, 166.7, 133.6, 192.3, 142.9);
      ctx.lineTo(196.2, 135.7);
      ctx.lineTo(222.3, 149.8);
      ctx.lineTo(228.4, 153.4);
      ctx.lineTo(229.5, 148.0);
      ctx.lineTo(199.2, 128.3);
      ctx.lineTo(200.9, 125.3);
      ctx.bezierCurveTo(200.9, 125.3, 184.2, 110.5, 168.1, 102.0);
      ctx.bezierCurveTo(152.0, 93.4, 132.5, 87.5, 132.5, 87.5);
      ctx.fill();

      // layer1/Path
      ctx.beginPath();
      ctx.moveTo(139.4, 8.5);
      ctx.bezierCurveTo(139.4, 8.5, 145.7, 20.8, 153.2, 26.3);
      ctx.bezierCurveTo(160.8, 31.8, 167.2, 31.8, 168.4, 33.7);
      ctx.bezierCurveTo(169.6, 35.6, 173.8, 36.0, 178.1, 38.9);
      ctx.bezierCurveTo(182.5, 41.9, 187.3, 39.8, 192.1, 46.6);
      ctx.bezierCurveTo(196.9, 53.4, 202.4, 58.4, 197.7, 58.9);
      ctx.bezierCurveTo(192.9, 59.3, 188.9, 55.0, 182.6, 52.5);
      ctx.bezierCurveTo(176.2, 50.0, 165.5, 46.6, 159.2, 42.4);
      ctx.bezierCurveTo(152.8, 38.1, 145.3, 33.5, 141.7, 27.1);
      ctx.bezierCurveTo(138.2, 20.8, 138.3, 17.4, 137.4, 14.4);
      ctx.bezierCurveTo(136.6, 11.5, 139.4, 8.5, 139.4, 8.5);
      ctx.fill();

      // layer1/Path
      ctx.beginPath();
      ctx.moveTo(355.0, 103.4);
      ctx.lineTo(352.1, 123.9);
      ctx.lineTo(379.5, 181.6);
      ctx.lineTo(352.1, 242.2);
      ctx.lineTo(357.8, 264.9);
      ctx.lineTo(393.2, 181.6);
      ctx.lineTo(355.0, 103.4);
      ctx.closePath();
      ctx.fill();

      // layer1/Path
      ctx.beginPath();
      ctx.moveTo(296.9, 306.7);
      ctx.bezierCurveTo(296.9, 306.7, 311.4, 306.1, 324.9, 306.7);
      ctx.bezierCurveTo(340.6, 307.4, 352.1, 310.8, 352.1, 310.8);
      ctx.lineTo(359.0, 381.4);
      ctx.lineTo(306.3, 384.2);
      ctx.lineTo(296.9, 306.7);
      ctx.closePath();
      ctx.fill();

      // layer1/Compound Path
      ctx.beginPath();

      // layer1/Compound Path/Path
      ctx.moveTo(356.8, 231.7);
      ctx.bezierCurveTo(356.9, 203.4, 349.9, 153.8, 354.1, 128.7);
      ctx.bezierCurveTo(359.0, 99.8, 354.6, 94.5, 354.6, 94.5);
      ctx.bezierCurveTo(354.6, 94.5, 352.1, 98.6, 343.5, 96.9);
      ctx.bezierCurveTo(342.2, 96.6, 337.3, 101.2, 334.6, 102.4);
      ctx.bezierCurveTo(334.4, 102.5, 324.9, 119.4, 318.3, 132.7);
      ctx.bezierCurveTo(316.1, 137.1, 305.1, 166.9, 305.0, 166.9);
      ctx.bezierCurveTo(305.0, 166.9, 309.1, 146.5, 315.1, 132.0);
      ctx.bezierCurveTo(320.9, 118.1, 332.0, 100.5, 332.0, 100.4);
      ctx.bezierCurveTo(332.2, 97.8, 333.4, 95.6, 333.3, 94.2);
      ctx.bezierCurveTo(333.3, 93.6, 332.5, 93.0, 332.5, 92.1);
      ctx.bezierCurveTo(332.5, 90.6, 333.7, 89.5, 333.7, 89.5);
      ctx.bezierCurveTo(327.7, 90.8, 324.7, 99.6, 320.2, 107.6);
      ctx.bezierCurveTo(307.4, 130.6, 298.4, 152.7, 291.6, 198.4);
      ctx.bezierCurveTo(284.5, 245.1, 291.6, 298.6, 291.6, 298.6);
      ctx.bezierCurveTo(291.6, 298.6, 293.6, 298.9, 296.9, 299.3);
      ctx.bezierCurveTo(298.7, 299.6, 300.0, 290.2, 300.0, 290.2);
      ctx.lineTo(305.0, 299.6);
      ctx.bezierCurveTo(305.0, 299.6, 354.1, 299.0, 360.8, 308.5);
      ctx.bezierCurveTo(365.3, 314.9, 356.7, 260.1, 356.8, 231.7);

      // layer1/Compound Path/Path
      ctx.moveTo(314.8, 164.2);
      ctx.bezierCurveTo(313.3, 164.2, 312.2, 163.0, 312.2, 161.5);
      ctx.bezierCurveTo(312.2, 160.0, 313.3, 158.8, 314.8, 158.8);
      ctx.bezierCurveTo(316.2, 158.8, 317.3, 160.0, 317.3, 161.5);
      ctx.bezierCurveTo(317.3, 163.0, 316.2, 164.2, 314.8, 164.2);

      // layer1/Compound Path/Path
      ctx.moveTo(323.9, 140.1);
      ctx.bezierCurveTo(322.4, 140.1, 321.3, 138.8, 321.3, 137.3);
      ctx.bezierCurveTo(321.3, 135.8, 322.4, 134.6, 323.9, 134.6);
      ctx.bezierCurveTo(325.3, 134.6, 326.4, 135.8, 326.4, 137.3);
      ctx.bezierCurveTo(326.4, 138.8, 325.3, 140.1, 323.9, 140.1);

      // layer1/Compound Path/Path
      ctx.moveTo(335.5, 118.1);
      ctx.bezierCurveTo(334.1, 118.1, 333.0, 116.9, 333.0, 115.4);
      ctx.bezierCurveTo(333.0, 113.9, 334.1, 112.7, 335.5, 112.7);
      ctx.bezierCurveTo(336.9, 112.7, 338.0, 113.9, 338.0, 115.4);
      ctx.bezierCurveTo(338.0, 116.9, 336.9, 118.1, 335.5, 118.1);
      ctx.fill();

      // layer1/Path
      ctx.beginPath();
      ctx.moveTo(339.3, 58.6);
      ctx.lineTo(357.1, 68.9);
      ctx.bezierCurveTo(357.1, 68.9, 372.2, 39.1, 378.1, 34.5);
      ctx.bezierCurveTo(384.0, 29.8, 391.3, 29.2, 393.8, 28.8);
      ctx.bezierCurveTo(396.3, 28.4, 400.5, 22.9, 395.7, 20.6);
      ctx.bezierCurveTo(390.9, 18.3, 389.0, 16.3, 389.0, 16.3);
      ctx.bezierCurveTo(389.0, 16.3, 389.0, 8.1, 383.5, 4.6);
      ctx.bezierCurveTo(378.1, 1.1, 374.9, 6.4, 374.9, 6.4);
      ctx.bezierCurveTo(374.9, 6.4, 373.6, 1.7, 369.1, 0.4);
      ctx.bezierCurveTo(364.6, -0.9, 362.2, 1.1, 362.4, 4.2);
      ctx.bezierCurveTo(362.7, 7.3, 363.7, 16.6, 363.7, 16.6);
      ctx.bezierCurveTo(363.7, 16.6, 349.5, 36.1, 344.9, 44.7);
      ctx.bezierCurveTo(340.3, 53.3, 339.3, 58.6, 339.3, 58.6);
      ctx.fill();

      // layer1/Path
      ctx.beginPath();
      ctx.moveTo(355.4, 73.5);
      ctx.lineTo(337.2, 63.7);
      ctx.bezierCurveTo(337.2, 63.7, 332.5, 73.8, 333.4, 79.7);
      ctx.bezierCurveTo(334.4, 85.5, 337.9, 89.0, 337.9, 89.0);
      ctx.bezierCurveTo(337.9, 89.0, 343.8, 93.6, 347.6, 91.5);
      ctx.bezierCurveTo(351.4, 89.5, 355.4, 73.5, 355.4, 73.5);
      ctx.fill();

      // layer1/Path
      ctx.beginPath();
      ctx.moveTo(245.0, 157.5);
      ctx.lineTo(290.9, 181.2);
      ctx.lineTo(288.9, 194.9);
      ctx.lineTo(238.4, 173.5);
      ctx.lineTo(245.0, 157.5);
      ctx.closePath();
      ctx.fill();

      // layer1/Path
      ctx.beginPath();
      ctx.moveTo(222.9, 143.7);
      ctx.lineTo(228.3, 140.4);
      ctx.lineTo(236.9, 152.4);
      ctx.lineTo(241.3, 155.6);
      ctx.lineTo(238.4, 160.3);
      ctx.lineTo(234.9, 157.6);
      ctx.lineTo(225.0, 161.5);
      ctx.lineTo(213.4, 153.4);
      ctx.lineTo(213.1, 140.1);
      ctx.lineTo(222.9, 143.7);
      ctx.closePath();
      ctx.fill();

      // layer1/Path
      ctx.beginPath();
      ctx.moveTo(132.5, 87.5);
      ctx.lineTo(127.8, 103.5);
      ctx.bezierCurveTo(127.8, 103.5, 141.9, 117.8, 156.0, 126.3);
      ctx.bezierCurveTo(167.1, 133.0, 166.7, 133.6, 192.3, 142.9);
      ctx.lineTo(196.2, 135.7);
      ctx.lineTo(222.3, 149.8);
      ctx.lineTo(228.4, 153.4);
      ctx.lineTo(229.5, 148.0);
      ctx.lineTo(199.2, 128.3);
      ctx.lineTo(200.9, 125.3);
      ctx.bezierCurveTo(200.9, 125.3, 184.2, 110.5, 168.1, 102.0);
      ctx.bezierCurveTo(152.0, 93.4, 132.5, 87.5, 132.5, 87.5);
      ctx.fill();

      // layer1/Path
      ctx.beginPath();
      ctx.moveTo(139.4, 8.5);
      ctx.bezierCurveTo(139.4, 8.5, 145.7, 20.8, 153.2, 26.3);
      ctx.bezierCurveTo(160.8, 31.8, 167.2, 31.8, 168.4, 33.7);
      ctx.bezierCurveTo(169.6, 35.6, 173.8, 36.0, 178.1, 38.9);
      ctx.bezierCurveTo(182.5, 41.9, 187.3, 39.8, 192.1, 46.6);
      ctx.bezierCurveTo(196.9, 53.4, 202.4, 58.4, 197.7, 58.9);
      ctx.bezierCurveTo(192.9, 59.3, 188.9, 55.0, 182.6, 52.5);
      ctx.bezierCurveTo(176.2, 50.0, 165.5, 46.6, 159.2, 42.4);
      ctx.bezierCurveTo(152.8, 38.1, 145.3, 33.5, 141.7, 27.1);
      ctx.bezierCurveTo(138.2, 20.8, 138.3, 17.4, 137.4, 14.4);
      ctx.bezierCurveTo(136.6, 11.5, 139.4, 8.5, 139.4, 8.5);
      ctx.fill();

      // layer1/Path
      ctx.beginPath();
      ctx.moveTo(355.0, 103.4);
      ctx.lineTo(352.1, 123.9);
      ctx.lineTo(379.5, 181.6);
      ctx.lineTo(352.1, 242.2);
      ctx.lineTo(357.8, 264.9);
      ctx.lineTo(393.2, 181.6);
      ctx.lineTo(355.0, 103.4);
      ctx.closePath();
      ctx.fill();

      // layer1/Path
      ctx.beginPath();
      ctx.moveTo(296.9, 306.7);
      ctx.bezierCurveTo(296.9, 306.7, 311.4, 306.1, 324.9, 306.7);
      ctx.bezierCurveTo(340.6, 307.4, 352.1, 310.8, 352.1, 310.8);
      ctx.lineTo(359.0, 381.4);
      ctx.lineTo(306.3, 384.2);
      ctx.lineTo(296.9, 306.7);
      ctx.closePath();
      ctx.fill();

      // layer1/Path
      ctx.beginPath();
      ctx.moveTo(0.0, 370.8);
      ctx.lineTo(0.0, 372.2);
      ctx.restore();
    }
    
    function drawGirlOnBike(ctx) {

      // layer1/Path
      ctx.save();
      ctx.beginPath();
      ctx.moveTo(260.8, 137.4);
      ctx.lineTo(328.9, 102.9);
      ctx.bezierCurveTo(328.9, 102.9, 336.9, 75.5, 337.1, 65.5);
      ctx.bezierCurveTo(337.2, 55.4, 337.1, 45.0, 338.9, 42.9);
      ctx.bezierCurveTo(340.7, 40.8, 343.2, 39.6, 344.8, 40.4);
      ctx.bezierCurveTo(346.5, 41.1, 347.6, 44.0, 349.0, 48.3);
      ctx.bezierCurveTo(350.5, 52.5, 351.9, 68.0, 353.0, 71.8);
      ctx.bezierCurveTo(354.1, 75.7, 371.8, 146.1, 372.4, 146.7);
      ctx.bezierCurveTo(372.9, 147.3, 376.6, 169.1, 376.6, 169.1);
      ctx.bezierCurveTo(376.6, 169.1, 341.6, 192.2, 323.8, 189.5);
      ctx.bezierCurveTo(306.1, 186.8, 284.1, 174.1, 278.5, 167.9);
      ctx.bezierCurveTo(272.9, 161.7, 264.8, 151.5, 262.9, 146.7);
      ctx.bezierCurveTo(261.1, 141.9, 260.8, 137.4, 260.8, 137.4);
      ctx.fillStyle = "rgb(1, 1, 1)";
      ctx.fill();

      // layer1/Path
      ctx.beginPath();
      ctx.moveTo(332.3, 80.1);
      ctx.lineTo(307.9, 90.9);
      ctx.lineTo(309.9, 98.1);
      ctx.lineTo(330.2, 87.8);
      ctx.lineTo(332.3, 80.1);
      ctx.closePath();
      ctx.fill();

      // layer1/Path
      ctx.beginPath();
      ctx.moveTo(308.6, 101.5);
      ctx.lineTo(341.4, 87.8);
      ctx.bezierCurveTo(341.4, 87.8, 342.7, 59.3, 342.7, 55.0);
      ctx.bezierCurveTo(342.7, 50.8, 344.5, 45.4, 346.7, 47.9);
      ctx.bezierCurveTo(348.8, 50.4, 345.9, 91.7, 345.9, 91.7);
      ctx.lineTo(310.6, 108.5);
      ctx.lineTo(308.6, 101.5);
      ctx.closePath();
      ctx.fill();

      // layer1/Path
      ctx.beginPath();
      ctx.moveTo(335.1, 26.1);
      ctx.bezierCurveTo(335.1, 26.1, 332.9, 30.2, 334.2, 33.3);
      ctx.bezierCurveTo(335.4, 36.4, 337.2, 38.8, 339.2, 39.0);
      ctx.bezierCurveTo(341.2, 39.1, 342.3, 39.5, 343.8, 38.4);
      ctx.bezierCurveTo(345.2, 37.5, 345.9, 37.7, 345.2, 35.0);
      ctx.bezierCurveTo(344.4, 32.3, 345.1, 30.1, 343.8, 29.6);
      ctx.bezierCurveTo(342.2, 29.1, 341.3, 29.4, 341.3, 29.4);
      ctx.bezierCurveTo(341.3, 29.4, 340.9, 28.6, 338.7, 27.3);
      ctx.bezierCurveTo(336.5, 25.9, 335.1, 26.1, 335.1, 26.1);
      ctx.fill();

      // layer1/Path
      ctx.beginPath();
      ctx.moveTo(335.5, 24.4);
      ctx.bezierCurveTo(335.3, 24.9, 340.6, 26.7, 341.5, 27.8);
      ctx.bezierCurveTo(342.4, 29.0, 345.1, 28.2, 345.8, 29.4);
      ctx.bezierCurveTo(346.5, 30.5, 346.3, 34.4, 346.3, 34.4);
      ctx.bezierCurveTo(346.3, 34.4, 351.6, 49.0, 352.0, 49.9);
      ctx.bezierCurveTo(352.3, 50.8, 355.2, 54.3, 358.0, 53.5);
      ctx.bezierCurveTo(360.7, 52.7, 365.0, 53.9, 366.3, 54.3);
      ctx.bezierCurveTo(367.6, 54.6, 368.3, 55.0, 370.5, 53.2);
      ctx.bezierCurveTo(371.6, 52.3, 372.0, 50.4, 374.7, 52.6);
      ctx.bezierCurveTo(377.3, 54.6, 377.3, 53.3, 378.6, 53.7);
      ctx.bezierCurveTo(379.8, 54.1, 384.4, 52.5, 381.1, 50.8);
      ctx.bezierCurveTo(377.8, 49.1, 378.7, 48.9, 375.5, 46.0);
      ctx.bezierCurveTo(372.2, 43.1, 372.4, 44.8, 368.9, 42.9);
      ctx.bezierCurveTo(365.5, 40.9, 364.8, 39.8, 363.0, 36.7);
      ctx.bezierCurveTo(361.2, 33.6, 360.8, 31.5, 357.0, 30.9);
      ctx.bezierCurveTo(353.2, 30.3, 351.6, 32.1, 350.3, 27.6);
      ctx.bezierCurveTo(349.0, 23.2, 347.4, 21.4, 342.7, 20.6);
      ctx.bezierCurveTo(338.0, 19.9, 336.8, 20.8, 335.9, 22.2);
      ctx.bezierCurveTo(335.0, 23.5, 335.5, 24.4, 335.5, 24.4);
      ctx.fill();

      // layer1/Path
      ctx.beginPath();
      ctx.moveTo(259.1, 144.6);
      ctx.lineTo(262.0, 153.0);
      ctx.lineTo(255.5, 155.0);
      ctx.lineTo(267.8, 235.2);
      ctx.lineTo(252.6, 240.2);
      ctx.lineTo(251.9, 235.6);
      ctx.lineTo(261.7, 230.2);
      ctx.lineTo(245.7, 149.6);
      ctx.lineTo(259.1, 144.6);
      ctx.closePath();
      ctx.fill();

      // layer1/Path
      ctx.beginPath();
      ctx.moveTo(296.5, 183.5);
      ctx.lineTo(305.2, 187.4);
      ctx.lineTo(297.2, 193.9);
      ctx.lineTo(311.7, 271.1);
      ctx.lineTo(297.9, 279.2);
      ctx.lineTo(296.8, 276.5);
      ctx.lineTo(304.4, 267.3);
      ctx.lineTo(288.1, 189.7);
      ctx.lineTo(296.5, 183.5);
      ctx.closePath();
      ctx.fill();

      // layer1/Path
      ctx.beginPath();
      ctx.moveTo(306.3, 102.5);
      ctx.lineTo(298.4, 104.0);
      ctx.lineTo(296.0, 110.3);
      ctx.lineTo(303.8, 111.9);
      ctx.lineTo(304.1, 108.2);
      ctx.lineTo(307.2, 107.1);
      ctx.lineTo(306.3, 102.5);
      ctx.closePath();
      ctx.fill();

      // layer1/Path
      ctx.beginPath();
      ctx.moveTo(305.8, 92.7);
      ctx.lineTo(301.5, 94.0);
      ctx.lineTo(295.9, 93.4);
      ctx.lineTo(293.6, 95.9);
      ctx.lineTo(298.8, 97.5);
      ctx.lineTo(297.1, 99.9);
      ctx.lineTo(299.5, 100.7);
      ctx.lineTo(303.4, 97.9);
      ctx.lineTo(307.0, 97.2);
      ctx.lineTo(305.8, 92.7);
      ctx.closePath();
      ctx.fill();

      // layer1/Path
      ctx.beginPath();
      ctx.moveTo(252.6, 262.6);
      ctx.bezierCurveTo(252.6, 309.7, 216.8, 347.9, 172.5, 347.9);
      ctx.bezierCurveTo(128.3, 347.9, 92.4, 309.7, 92.4, 262.6);
      ctx.bezierCurveTo(92.4, 215.5, 128.3, 177.4, 172.5, 177.4);
      ctx.bezierCurveTo(216.8, 177.4, 252.6, 215.5, 252.6, 262.6);
      ctx.closePath();
      ctx.lineWidth = 6.0;
      ctx.strokeStyle = "rgb(1, 1, 1)";
      ctx.stroke();

      // layer1/Path
      ctx.beginPath();
      ctx.moveTo(172.8, 179.8);
      ctx.lineTo(172.8, 348.3);
      ctx.lineWidth = 2.5;
      ctx.stroke();

      // layer1/Path
      ctx.beginPath();
      ctx.moveTo(133.0, 190.3);
      ctx.lineTo(212.7, 337.3);
      ctx.lineWidth = 3.0;
      ctx.stroke();

      // layer1/Path
      ctx.beginPath();
      ctx.moveTo(103.8, 221.3);
      ctx.lineTo(241.9, 306.2);
      ctx.stroke();

      // layer1/Path
      ctx.beginPath();
      ctx.moveTo(92.9, 264.0);
      ctx.lineTo(252.7, 264.0);
      ctx.lineWidth = 2.5;
      ctx.stroke();

      // layer1/Path
      ctx.beginPath();
      ctx.moveTo(103.8, 306.2);
      ctx.lineTo(241.9, 221.3);
      ctx.lineWidth = 3.0;
      ctx.stroke();

      // layer1/Path
      ctx.beginPath();
      ctx.moveTo(133.0, 337.3);
      ctx.lineTo(212.7, 190.3);
      ctx.stroke();

      // layer1/Path
      ctx.beginPath();
      ctx.moveTo(481.7, 262.6);
      ctx.bezierCurveTo(481.7, 309.7, 445.8, 347.9, 401.6, 347.9);
      ctx.bezierCurveTo(357.3, 347.9, 321.5, 309.7, 321.5, 262.6);
      ctx.bezierCurveTo(321.5, 215.5, 357.3, 177.4, 401.6, 177.4);
      ctx.bezierCurveTo(445.8, 177.4, 481.7, 215.5, 481.7, 262.6);
      ctx.closePath();
      ctx.lineWidth = 6.0;
      ctx.stroke();

      // layer1/Path
      ctx.beginPath();
      ctx.moveTo(402.6, 179.8);
      ctx.lineTo(402.6, 348.3);
      ctx.lineWidth = 2.5;
      ctx.stroke();

      // layer1/Path
      ctx.beginPath();
      ctx.moveTo(362.1, 190.3);
      ctx.lineTo(441.8, 337.3);
      ctx.lineWidth = 3.0;
      ctx.stroke();

      // layer1/Path
      ctx.beginPath();
      ctx.moveTo(332.9, 221.3);
      ctx.lineTo(471.0, 306.2);
      ctx.stroke();

      // layer1/Path
      ctx.beginPath();
      ctx.moveTo(322.6, 264.0);
      ctx.lineTo(481.7, 264.0);
      ctx.lineWidth = 2.5;
      ctx.stroke();

      // layer1/Path
      ctx.beginPath();
      ctx.moveTo(332.9, 306.2);
      ctx.lineTo(471.0, 221.3);
      ctx.lineWidth = 3.0;
      ctx.stroke();

      // layer1/Path
      ctx.beginPath();
      ctx.moveTo(362.1, 337.3);
      ctx.lineTo(441.8, 190.3);
      ctx.stroke();

      // layer1/Path
      ctx.beginPath();
      ctx.moveTo(305.5, 262.0);
      ctx.bezierCurveTo(305.5, 273.0, 297.1, 281.9, 286.8, 281.9);
      ctx.bezierCurveTo(276.4, 281.9, 268.0, 273.0, 268.0, 262.0);
      ctx.bezierCurveTo(268.0, 250.9, 276.4, 242.0, 286.8, 242.0);
      ctx.bezierCurveTo(297.1, 242.0, 305.5, 250.9, 305.5, 262.0);
      ctx.closePath();
      ctx.stroke();

      // layer1/Compound Path
      ctx.beginPath();

      // layer1/Compound Path/Path
      ctx.moveTo(399.0, 262.8);
      ctx.lineTo(291.2, 261.3);
      ctx.bezierCurveTo(291.2, 261.3, 337.7, 142.3, 337.9, 141.7);
      ctx.bezierCurveTo(338.1, 141.1, 400.5, 263.8, 400.5, 263.8);
      ctx.lineTo(404.4, 263.8);
      ctx.lineTo(345.5, 134.7);
      ctx.lineTo(230.3, 134.1);
      ctx.bezierCurveTo(230.3, 134.1, 248.1, 90.5, 249.2, 92.8);
      ctx.bezierCurveTo(250.3, 95.2, 257.0, 105.0, 264.4, 106.9);
      ctx.bezierCurveTo(273.5, 109.3, 273.8, 109.4, 297.8, 108.5);
      ctx.lineTo(298.1, 105.6);
      ctx.bezierCurveTo(298.1, 105.6, 282.2, 105.6, 272.6, 105.0);
      ctx.bezierCurveTo(262.8, 104.4, 260.0, 100.2, 255.6, 94.2);
      ctx.bezierCurveTo(251.9, 89.2, 252.7, 87.1, 255.9, 86.1);
      ctx.bezierCurveTo(258.7, 85.2, 261.0, 90.1, 268.2, 95.5);
      ctx.bezierCurveTo(272.8, 99.0, 300.1, 97.8, 300.1, 97.8);
      ctx.lineTo(300.1, 95.7);
      ctx.bezierCurveTo(300.1, 95.7, 286.0, 95.5, 275.3, 94.8);
      ctx.bezierCurveTo(263.6, 93.9, 265.1, 80.9, 254.3, 82.0);
      ctx.bezierCurveTo(243.4, 83.2, 239.3, 98.8, 239.3, 98.8);
      ctx.bezierCurveTo(239.3, 98.8, 173.2, 258.1, 172.7, 258.5);
      ctx.lineTo(175.1, 260.5);
      ctx.lineTo(222.6, 153.2);
      ctx.lineTo(287.6, 266.5);
      ctx.lineTo(400.8, 264.6);
      ctx.lineTo(399.0, 262.8);
      ctx.closePath();

      // layer1/Compound Path/Path
      ctx.moveTo(286.0, 255.7);
      ctx.lineTo(225.1, 146.1);
      ctx.lineTo(228.2, 139.3);
      ctx.lineTo(330.5, 143.0);
      ctx.lineTo(286.0, 255.7);
      ctx.closePath();
      ctx.fill();

      // layer1/Path
      ctx.beginPath();
      ctx.moveTo(299.5, 280.8);
      ctx.lineTo(314.8, 274.2);
      ctx.lineTo(317.7, 283.7);
      ctx.lineTo(302.8, 289.8);
      ctx.lineTo(299.5, 280.8);
      ctx.closePath();
      ctx.fill();

      // layer1/Path
      ctx.beginPath();
      ctx.moveTo(254.1, 242.8);
      ctx.lineTo(269.6, 237.2);
      ctx.lineTo(271.9, 245.3);
      ctx.lineTo(257.7, 250.7);
      ctx.lineTo(254.1, 242.8);
      ctx.closePath();
      ctx.fill();

      // layer1/Path
      ctx.beginPath();
      ctx.moveTo(0.5, 0.0);
      ctx.lineTo(0.5, 4.0);
      ctx.lineWidth = 1.0;
      ctx.strokeStyle = "rgb(0, 0, 0)";
      ctx.lineJoin = "miter";
      ctx.miterLimit = 4.0;
      ctx.stroke();
      ctx.restore();
    }
    
    function drawParachuteGirl(ctx) {

      // layer1/Path
      ctx.save();
      ctx.beginPath();
      ctx.moveTo(253.0, 259.0);
      ctx.lineTo(263.3, 259.9);
      ctx.lineTo(265.0, 302.1);
      ctx.lineTo(279.4, 343.3);
      ctx.lineTo(265.9, 343.0);
      ctx.lineTo(257.3, 300.9);
      ctx.lineTo(253.0, 259.0);
      ctx.closePath();
      ctx.fillStyle = "rgb(1, 1, 1)";
      ctx.fill();

      // layer1/Path
      ctx.beginPath();
      ctx.moveTo(272.4, 260.4);
      ctx.lineTo(282.6, 260.1);
      ctx.lineTo(285.6, 301.9);
      ctx.lineTo(301.1, 342.7);
      ctx.lineTo(287.7, 342.7);
      ctx.lineTo(277.8, 301.0);
      ctx.lineTo(272.4, 260.4);
      ctx.closePath();
      ctx.fill();

      // layer1/Path
      ctx.beginPath();
      ctx.moveTo(267.1, 347.1);
      ctx.bezierCurveTo(267.1, 347.1, 268.4, 352.0, 269.7, 360.1);
      ctx.bezierCurveTo(271.0, 368.2, 269.7, 378.2, 269.7, 378.2);
      ctx.lineTo(274.8, 378.2);
      ctx.lineTo(275.6, 364.4);
      ctx.lineTo(277.1, 368.2);
      ctx.lineTo(279.3, 367.5);
      ctx.lineTo(275.2, 359.5);
      ctx.lineTo(275.2, 347.1);
      ctx.lineTo(267.1, 347.1);
      ctx.closePath();
      ctx.fill();

      // layer1/Path
      ctx.beginPath();
      ctx.moveTo(292.8, 347.1);
      ctx.bezierCurveTo(292.8, 347.1, 294.1, 352.0, 295.4, 360.1);
      ctx.bezierCurveTo(296.7, 368.2, 295.4, 378.2, 295.4, 378.2);
      ctx.lineTo(300.5, 378.2);
      ctx.lineTo(301.3, 364.4);
      ctx.lineTo(302.7, 368.2);
      ctx.lineTo(304.7, 367.5);
      ctx.lineTo(300.2, 359.5);
      ctx.lineTo(300.2, 347.1);
      ctx.lineTo(292.8, 347.1);
      ctx.closePath();
      ctx.fill();

      // layer1/Compound Path
      ctx.beginPath();

      // layer1/Compound Path/Path
      ctx.moveTo(334.7, 130.0);
      ctx.lineTo(327.0, 125.9);
      ctx.bezierCurveTo(327.0, 125.9, 316.3, 146.4, 310.8, 154.1);
      ctx.bezierCurveTo(305.2, 161.8, 287.2, 179.7, 287.2, 179.7);
      ctx.lineTo(274.8, 179.7);
      ctx.bezierCurveTo(274.8, 179.7, 263.3, 162.9, 257.3, 153.0);
      ctx.bezierCurveTo(251.3, 143.1, 243.2, 120.9, 243.2, 120.9);
      ctx.lineTo(235.9, 124.4);
      ctx.bezierCurveTo(235.9, 124.4, 248.3, 151.2, 252.2, 156.4);
      ctx.bezierCurveTo(256.0, 161.5, 268.4, 183.6, 268.4, 183.6);
      ctx.lineTo(230.7, 252.6);
      ctx.bezierCurveTo(230.7, 252.6, 242.0, 258.0, 268.1, 257.6);
      ctx.bezierCurveTo(294.2, 257.2, 308.7, 255.4, 308.7, 255.4);
      ctx.lineTo(293.6, 183.4);
      ctx.bezierCurveTo(293.6, 183.4, 309.5, 168.9, 317.2, 158.6);
      ctx.bezierCurveTo(324.9, 148.3, 334.7, 130.0, 334.7, 130.0);

      // layer1/Compound Path/Path
      ctx.moveTo(303.7, 236.9);
      ctx.lineTo(304.8, 243.1);
      ctx.lineTo(277.2, 256.1);
      ctx.lineTo(274.7, 256.1);
      ctx.lineTo(274.6, 256.2);
      ctx.lineTo(262.4, 256.2);
      ctx.lineTo(259.3, 256.2);
      ctx.lineTo(240.0, 237.9);
      ctx.lineTo(243.0, 232.7);
      ctx.lineTo(247.4, 237.9);
      ctx.lineTo(274.7, 181.1);
      ctx.lineTo(275.8, 181.4);
      ctx.lineTo(251.9, 240.9);
      ctx.lineTo(262.4, 256.2);
      ctx.lineTo(274.7, 256.1);
      ctx.lineTo(288.7, 244.9);
      ctx.lineTo(285.5, 181.7);
      ctx.lineTo(287.2, 181.1);
      ctx.lineTo(292.8, 242.6);
      ctx.lineTo(303.7, 236.9);
      ctx.closePath();
      ctx.fill();

      // layer1/Path
      ctx.beginPath();
      ctx.moveTo(289.9, 171.1);
      ctx.bezierCurveTo(289.9, 175.2, 287.1, 178.6, 283.6, 178.6);
      ctx.bezierCurveTo(280.1, 178.6, 277.2, 175.2, 277.2, 171.1);
      ctx.bezierCurveTo(277.2, 167.0, 280.1, 163.7, 283.6, 163.7);
      ctx.bezierCurveTo(287.1, 163.7, 289.9, 167.0, 289.9, 171.1);
      ctx.fill();

      // layer1/Path
      ctx.beginPath();
      ctx.moveTo(278.3, 163.4);
      ctx.bezierCurveTo(279.7, 162.2, 280.7, 160.6, 283.8, 160.7);
      ctx.bezierCurveTo(287.0, 160.8, 287.2, 161.3, 288.6, 162.8);
      ctx.bezierCurveTo(290.0, 164.2, 291.0, 170.6, 291.0, 170.6);
      ctx.bezierCurveTo(291.0, 170.6, 293.1, 170.8, 295.1, 169.9);
      ctx.bezierCurveTo(297.0, 168.9, 296.4, 164.8, 296.4, 164.8);
      ctx.bezierCurveTo(296.4, 164.8, 294.1, 169.0, 293.1, 167.3);
      ctx.bezierCurveTo(291.3, 164.1, 291.4, 161.1, 290.4, 159.3);
      ctx.bezierCurveTo(289.3, 157.6, 287.4, 154.0, 283.6, 154.4);
      ctx.bezierCurveTo(279.8, 154.9, 276.4, 159.3, 276.1, 161.5);
      ctx.bezierCurveTo(275.8, 163.7, 275.6, 166.3, 274.7, 167.0);
      ctx.bezierCurveTo(273.7, 167.7, 271.8, 164.8, 271.8, 164.8);
      ctx.bezierCurveTo(271.8, 164.8, 271.6, 168.6, 273.5, 170.4);
      ctx.bezierCurveTo(274.8, 171.8, 276.4, 170.9, 276.4, 170.9);
      ctx.bezierCurveTo(276.4, 170.9, 276.9, 164.7, 278.3, 163.4);
      ctx.fill();

      // layer1/Path
      ctx.beginPath();
      ctx.moveTo(236.8, 117.6);
      ctx.lineTo(234.5, 116.8);
      ctx.lineTo(232.6, 114.9);
      ctx.lineTo(233.2, 111.9);
      ctx.lineTo(234.7, 111.0);
      ctx.lineTo(238.1, 112.2);
      ctx.lineTo(237.0, 109.6);
      ctx.lineTo(240.8, 111.5);
      ctx.lineTo(240.5, 117.0);
      ctx.lineTo(243.0, 122.1);
      ctx.lineTo(240.2, 123.4);
      ctx.lineTo(237.8, 118.6);
      ctx.lineTo(236.8, 117.6);
      ctx.closePath();
      ctx.fill();

      // layer1/Path
      ctx.beginPath();
      ctx.moveTo(336.2, 122.0);
      ctx.lineTo(338.6, 121.2);
      ctx.lineTo(340.5, 119.3);
      ctx.lineTo(339.8, 116.3);
      ctx.lineTo(338.5, 116.0);
      ctx.lineTo(336.4, 117.1);
      ctx.lineTo(337.2, 114.5);
      ctx.lineTo(333.1, 116.5);
      ctx.lineTo(333.2, 120.8);
      ctx.lineTo(330.1, 126.7);
      ctx.lineTo(332.8, 127.9);
      ctx.lineTo(335.3, 123.0);
      ctx.lineTo(336.2, 122.0);
      ctx.closePath();
      ctx.fill();

      // layer1/Path
      ctx.beginPath();
      ctx.moveTo(207.8, 58.0);
      ctx.bezierCurveTo(207.8, 58.0, 221.9, -3.9, 294.1, 0.2);
      ctx.bezierCurveTo(372.4, 4.6, 372.4, 73.9, 372.4, 73.9);
      ctx.bezierCurveTo(372.4, 73.9, 365.0, 62.7, 356.2, 63.3);
      ctx.bezierCurveTo(346.2, 63.9, 338.5, 73.9, 338.5, 73.9);
      ctx.bezierCurveTo(338.5, 73.9, 333.4, 60.0, 324.1, 59.3);
      ctx.bezierCurveTo(314.8, 58.6, 306.1, 70.8, 306.1, 70.8);
      ctx.bezierCurveTo(306.1, 70.8, 302.9, 55.4, 290.1, 55.0);
      ctx.bezierCurveTo(277.2, 54.6, 272.9, 67.3, 272.9, 67.3);
      ctx.bezierCurveTo(272.9, 67.3, 268.6, 55.8, 256.1, 55.7);
      ctx.bezierCurveTo(243.6, 55.6, 239.6, 66.9, 239.6, 66.9);
      ctx.bezierCurveTo(239.6, 66.9, 235.7, 53.8, 224.0, 52.9);
      ctx.bezierCurveTo(212.3, 52.1, 207.8, 58.0, 207.8, 58.0);
      ctx.fill();

      // layer1/Path
      ctx.beginPath();
      ctx.moveTo(209.9, 55.1);
      ctx.lineTo(237.8, 113.0);
      ctx.fill();

      // layer1/Path
      ctx.beginPath();
      ctx.moveTo(209.9, 55.1);
      ctx.lineTo(237.8, 113.0);
      ctx.lineWidth = 1.2;
      ctx.strokeStyle = "rgb(1, 1, 1)";
      ctx.stroke();

      // layer1/Path
      ctx.beginPath();
      ctx.moveTo(370.8, 70.6);
      ctx.lineTo(334.7, 118.8);
      ctx.fill();

      // layer1/Path
      ctx.beginPath();
      ctx.moveTo(370.8, 70.6);
      ctx.lineTo(334.7, 118.8);
      ctx.stroke();

      // layer1/Path
      ctx.beginPath();
      ctx.moveTo(238.8, 61.8);
      ctx.lineTo(274.1, 169.1);
      ctx.fill();

      // layer1/Path
      ctx.beginPath();
      ctx.moveTo(238.8, 61.8);
      ctx.lineTo(274.1, 169.1);
      ctx.stroke();

      // layer1/Path
      ctx.beginPath();
      ctx.moveTo(339.6, 71.3);
      ctx.lineTo(293.1, 169.1);
      ctx.fill();

      // layer1/Path
      ctx.beginPath();
      ctx.moveTo(339.6, 71.3);
      ctx.lineTo(293.1, 169.1);
      ctx.stroke();

      // layer1/Path
      ctx.beginPath();
      ctx.moveTo(272.8, 63.5);
      ctx.lineTo(279.3, 158.2);
      ctx.fill();

      // layer1/Path
      ctx.beginPath();
      ctx.moveTo(272.8, 63.5);
      ctx.lineTo(279.3, 158.2);
      ctx.stroke();

      // layer1/Path
      ctx.beginPath();
      ctx.moveTo(306.8, 67.8);
      ctx.lineTo(290.7, 162.8);
      ctx.fill();

      // layer1/Path
      ctx.beginPath();
      ctx.moveTo(306.8, 67.8);
      ctx.lineTo(290.7, 162.8);
      ctx.stroke();

      // layer1/Path
      ctx.beginPath();
      ctx.moveTo(0.5, 189.3);
      ctx.lineTo(0.5, 193.9);
      ctx.lineWidth = 1.0;
      ctx.strokeStyle = "rgb(0, 0, 0)";
      ctx.lineJoin = "miter";
      ctx.miterLimit = 4.0;
      ctx.stroke();
      ctx.restore();
    }
    
     function drawDinner(ctx) {

        // layer1/Path
      ctx.save();
      ctx.beginPath();
      ctx.moveTo(187.7, 89.6);
      ctx.lineTo(240.3, 112.3);
      ctx.lineTo(273.8, 87.6);
      ctx.lineTo(273.5, 81.7);
      ctx.lineTo(284.4, 77.2);
      ctx.lineTo(286.2, 79.1);
      ctx.lineTo(285.0, 81.7);
      ctx.lineTo(285.0, 88.1);
      ctx.lineTo(276.2, 93.3);
      ctx.lineTo(278.2, 97.2);
      ctx.lineTo(239.1, 121.0);
      ctx.lineTo(187.0, 104.5);
      ctx.lineTo(187.7, 89.6);
      ctx.closePath();
      ctx.fillStyle = "rgb(1, 1, 1)";
      ctx.fill();

      // layer1/Path
      ctx.beginPath();
      ctx.moveTo(443.3, 95.7);
      ctx.lineTo(451.9, 95.7);
      ctx.lineTo(445.0, 234.1);
      ctx.lineTo(457.0, 370.9);
      ctx.lineTo(450.1, 371.6);
      ctx.lineTo(434.6, 246.5);
      ctx.lineTo(422.3, 247.1);
      ctx.lineTo(434.5, 356.1);
      ctx.lineTo(427.5, 356.4);
      ctx.lineTo(410.3, 247.3);
      ctx.lineTo(373.2, 245.6);
      ctx.lineTo(373.2, 238.0);
      ctx.lineTo(433.5, 237.8);
      ctx.lineTo(443.3, 95.7);
      ctx.closePath();
      ctx.fill();

      // layer1/Path
      ctx.beginPath();
      ctx.moveTo(124.2, 97.8);
      ctx.lineTo(115.6, 97.8);
      ctx.lineTo(122.5, 236.3);
      ctx.lineTo(110.5, 373.2);
      ctx.lineTo(117.4, 373.9);
      ctx.lineTo(132.9, 248.8);
      ctx.lineTo(145.2, 249.4);
      ctx.lineTo(133.0, 358.4);
      ctx.lineTo(140.0, 358.7);
      ctx.lineTo(157.0, 249.6);
      ctx.lineTo(193.9, 247.9);
      ctx.lineTo(193.9, 240.3);
      ctx.lineTo(133.8, 240.0);
      ctx.lineTo(124.2, 97.8);
      ctx.closePath();
      ctx.fill();

      // layer1/Path
      ctx.beginPath();
      ctx.moveTo(347.1, 87.3);
      ctx.lineTo(336.6, 82.8);
      ctx.bezierCurveTo(336.6, 82.8, 336.6, 86.3, 337.1, 86.6);
      ctx.bezierCurveTo(337.6, 86.8, 339.7, 87.9, 339.7, 87.9);
      ctx.lineTo(340.1, 92.9);
      ctx.lineTo(344.7, 96.3);
      ctx.lineTo(350.7, 97.2);
      ctx.lineTo(363.9, 146.3);
      ctx.lineTo(388.6, 132.9);
      ctx.lineTo(388.2, 125.2);
      ctx.lineTo(368.9, 136.6);
      ctx.lineTo(353.0, 92.3);
      ctx.lineTo(347.1, 87.3);
      ctx.closePath();
      ctx.fill();

      // layer1/Path
      ctx.beginPath();
      ctx.moveTo(268.4, 59.9);
      ctx.bezierCurveTo(268.4, 59.9, 268.9, 68.0, 273.4, 72.1);
      ctx.bezierCurveTo(275.4, 73.9, 279.2, 76.0, 279.2, 76.0);
      ctx.bezierCurveTo(279.2, 76.0, 282.5, 86.3, 283.3, 89.3);
      ctx.bezierCurveTo(284.1, 92.3, 282.2, 95.4, 280.5, 96.8);
      ctx.bezierCurveTo(278.9, 98.2, 291.8, 92.8, 291.8, 92.8);
      ctx.bezierCurveTo(291.8, 92.8, 287.3, 92.4, 285.2, 89.7);
      ctx.bezierCurveTo(282.5, 86.3, 280.8, 75.0, 280.8, 75.0);
      ctx.bezierCurveTo(280.8, 75.0, 283.6, 71.7, 284.3, 68.3);
      ctx.bezierCurveTo(285.9, 60.1, 283.4, 55.7, 283.4, 55.7);
      ctx.bezierCurveTo(283.4, 55.7, 281.8, 52.8, 282.6, 56.5);
      ctx.bezierCurveTo(283.4, 60.1, 284.4, 63.8, 283.6, 64.1);
      ctx.bezierCurveTo(281.8, 64.7, 271.4, 65.9, 271.4, 65.9);
      ctx.bezierCurveTo(271.4, 65.9, 270.3, 64.7, 269.7, 60.1);
      ctx.bezierCurveTo(269.2, 55.4, 268.4, 59.9, 268.4, 59.9);
      ctx.fill();

      // layer1/Path
      ctx.beginPath();
      ctx.moveTo(340.4, 64.5);
      ctx.bezierCurveTo(340.4, 64.5, 337.4, 71.7, 339.5, 77.3);
      ctx.bezierCurveTo(340.5, 79.7, 342.8, 83.2, 342.8, 83.2);
      ctx.bezierCurveTo(342.8, 83.2, 341.4, 93.6, 340.8, 96.6);
      ctx.bezierCurveTo(340.3, 99.5, 337.3, 101.3, 335.3, 101.7);
      ctx.bezierCurveTo(333.4, 102.2, 346.7, 103.5, 346.7, 103.5);
      ctx.bezierCurveTo(346.7, 103.5, 343.0, 101.1, 342.3, 97.8);
      ctx.bezierCurveTo(341.3, 93.6, 344.7, 83.1, 344.7, 83.1);
      ctx.bezierCurveTo(344.7, 83.1, 348.4, 81.7, 350.4, 79.0);
      ctx.bezierCurveTo(355.3, 72.7, 354.9, 67.9, 354.9, 67.9);
      ctx.bezierCurveTo(354.9, 67.9, 354.8, 64.6, 353.9, 68.1);
      ctx.bezierCurveTo(353.1, 71.6, 352.8, 73.8, 352.0, 73.7);
      ctx.bezierCurveTo(350.2, 73.4, 340.2, 72.8, 340.2, 72.8);
      ctx.bezierCurveTo(340.2, 72.8, 339.9, 69.5, 341.4, 65.3);
      ctx.bezierCurveTo(342.9, 61.0, 340.4, 64.5, 340.4, 64.5);
      ctx.fill();

      // layer1/Path
      ctx.beginPath();
      ctx.moveTo(412.8, 67.7);
      ctx.bezierCurveTo(410.9, 69.5, 410.6, 75.0, 410.6, 76.8);
      ctx.bezierCurveTo(410.6, 78.6, 410.9, 81.5, 410.9, 81.5);
      ctx.bezierCurveTo(410.9, 81.5, 411.1, 87.1, 413.8, 88.2);
      ctx.bezierCurveTo(414.6, 88.4, 414.6, 88.3, 415.8, 88.2);
      ctx.bezierCurveTo(417.0, 88.1, 416.4, 92.8, 417.3, 93.6);
      ctx.bezierCurveTo(418.2, 94.3, 420.1, 94.0, 421.3, 92.5);
      ctx.bezierCurveTo(422.4, 91.1, 422.7, 86.9, 422.7, 86.9);
      ctx.bezierCurveTo(422.7, 86.9, 423.7, 86.4, 424.9, 82.7);
      ctx.bezierCurveTo(427.9, 74.1, 423.0, 77.5, 422.1, 75.2);
      ctx.bezierCurveTo(419.5, 68.6, 414.3, 66.4, 412.8, 67.7);
      ctx.fill();

      // layer1/Path
      ctx.beginPath();
      ctx.moveTo(414.9, 65.5);
      ctx.bezierCurveTo(414.9, 65.5, 416.9, 63.5, 422.7, 61.0);
      ctx.bezierCurveTo(432.6, 56.8, 434.9, 67.3, 434.2, 71.2);
      ctx.bezierCurveTo(433.5, 74.7, 431.7, 77.9, 432.4, 80.4);
      ctx.bezierCurveTo(433.1, 82.9, 434.2, 87.0, 438.9, 85.2);
      ctx.bezierCurveTo(438.9, 85.2, 435.4, 89.9, 432.1, 89.6);
      ctx.bezierCurveTo(428.7, 89.3, 425.7, 87.4, 425.7, 87.4);
      ctx.bezierCurveTo(425.7, 87.4, 427.6, 85.4, 428.2, 82.3);
      ctx.bezierCurveTo(430.5, 71.2, 425.8, 77.9, 423.5, 71.5);
      ctx.bezierCurveTo(421.5, 66.1, 414.9, 65.5, 414.9, 65.5);
      ctx.fill();

      // layer1/Path
      ctx.beginPath();
      ctx.moveTo(377.2, 235.7);
      ctx.bezierCurveTo(377.2, 235.7, 329.3, 232.8, 331.6, 233.8);
      ctx.bezierCurveTo(333.8, 234.9, 349.2, 250.5, 349.5, 262.2);
      ctx.bezierCurveTo(350.1, 285.4, 358.5, 314.2, 358.5, 314.2);
      ctx.lineTo(362.4, 315.5);
      ctx.bezierCurveTo(362.4, 315.5, 367.6, 316.8, 368.0, 323.0);
      ctx.bezierCurveTo(368.4, 329.3, 372.7, 337.8, 372.7, 337.8);
      ctx.lineTo(370.0, 339.9);
      ctx.lineTo(364.3, 327.1);
      ctx.bezierCurveTo(364.3, 327.1, 363.4, 344.9, 363.6, 348.4);
      ctx.bezierCurveTo(359.8, 351.3, 353.8, 355.1, 353.8, 355.1);
      ctx.bezierCurveTo(353.8, 355.1, 352.2, 357.6, 353.8, 349.8);
      ctx.lineTo(357.9, 342.5);
      ctx.bezierCurveTo(357.9, 342.5, 353.4, 321.1, 352.3, 317.2);
      ctx.bezierCurveTo(351.1, 313.3, 337.2, 269.4, 335.1, 262.7);
      ctx.bezierCurveTo(333.1, 256.0, 320.2, 230.7, 320.2, 230.7);
      ctx.lineTo(321.9, 223.8);
      ctx.lineTo(363.5, 216.1);
      ctx.lineTo(377.2, 235.7);
      ctx.closePath();
      ctx.fill();

      // layer1/Path
      ctx.beginPath();
      ctx.moveTo(318.2, 231.5);
      ctx.lineTo(315.4, 232.7);
      ctx.lineTo(312.0, 237.9);
      ctx.bezierCurveTo(312.0, 237.9, 315.9, 262.8, 315.8, 269.0);
      ctx.bezierCurveTo(315.7, 275.3, 315.3, 316.1, 315.2, 319.7);
      ctx.bezierCurveTo(315.1, 323.3, 313.9, 345.2, 313.9, 345.2);
      ctx.bezierCurveTo(313.9, 345.2, 311.7, 349.1, 310.6, 350.9);
      ctx.bezierCurveTo(309.5, 352.7, 310.0, 356.5, 310.0, 356.5);
      ctx.bezierCurveTo(310.0, 356.5, 315.8, 353.1, 319.4, 351.4);
      ctx.bezierCurveTo(321.2, 347.3, 319.4, 339.1, 320.1, 336.4);
      ctx.bezierCurveTo(321.5, 331.0, 322.5, 331.6, 322.5, 331.6);
      ctx.lineTo(324.8, 344.2);
      ctx.lineTo(326.7, 342.7);
      ctx.bezierCurveTo(326.7, 342.7, 325.3, 334.6, 326.7, 329.3);
      ctx.bezierCurveTo(328.1, 323.9, 324.2, 321.3, 324.2, 321.3);
      ctx.lineTo(321.2, 319.0);
      ctx.bezierCurveTo(321.2, 319.0, 322.1, 292.5, 327.8, 273.0);
      ctx.bezierCurveTo(330.8, 263.1, 322.2, 245.5, 320.6, 243.9);
      ctx.bezierCurveTo(320.2, 243.5, 324.1, 244.9, 324.1, 244.9);
      ctx.lineTo(318.2, 231.5);
      ctx.closePath();
      ctx.fill();

      // layer1/Compound Path
      ctx.beginPath();

      // layer1/Compound Path/Path
      ctx.moveTo(475.0, 227.3);
      ctx.bezierCurveTo(472.5, 223.1, 470.0, 217.3, 468.5, 215.6);
      ctx.bezierCurveTo(467.0, 213.9, 453.9, 215.6, 452.8, 217.5);
      ctx.bezierCurveTo(451.6, 219.3, 448.5, 245.2, 451.1, 248.4);
      ctx.bezierCurveTo(454.7, 252.7, 462.3, 251.6, 467.8, 249.6);
      ctx.bezierCurveTo(473.4, 247.5, 477.2, 246.2, 479.5, 244.1);
      ctx.bezierCurveTo(481.8, 242.1, 477.5, 231.4, 475.0, 227.3);

      // layer1/Compound Path/Path
      ctx.moveTo(466.3, 242.4);
      ctx.bezierCurveTo(463.5, 242.9, 461.0, 241.9, 460.7, 240.2);
      ctx.bezierCurveTo(460.4, 238.5, 462.5, 236.6, 465.3, 236.2);
      ctx.bezierCurveTo(468.1, 235.7, 470.6, 236.7, 470.9, 238.4);
      ctx.bezierCurveTo(471.1, 240.2, 469.1, 242.0, 466.3, 242.4);

      // layer1/Compound Path/Path
      ctx.moveTo(472.3, 232.3);
      ctx.bezierCurveTo(470.9, 232.8, 454.4, 235.5, 454.4, 235.5);
      ctx.lineTo(455.7, 220.7);
      ctx.lineTo(466.9, 218.7);
      ctx.bezierCurveTo(466.9, 218.7, 473.6, 231.7, 472.3, 232.3);
      ctx.fill();

      // layer1/Path
      ctx.beginPath();
      ctx.moveTo(456.5, 207.4);
      ctx.lineTo(458.2, 212.8);
      ctx.lineTo(455.5, 216.6);
      ctx.lineTo(457.8, 216.9);
      ctx.lineTo(459.3, 220.1);
      ctx.lineTo(457.2, 220.5);
      ctx.lineTo(459.8, 223.1);
      ctx.lineTo(465.7, 221.5);
      ctx.lineTo(465.5, 213.8);
      ctx.lineTo(462.0, 210.9);
      ctx.lineTo(460.4, 205.5);
      ctx.lineTo(456.5, 207.4);
      ctx.closePath();
      ctx.fill();

      // layer1/Path
      ctx.beginPath();
      ctx.moveTo(235.1, 339.6);
      ctx.lineTo(238.0, 341.2);
      ctx.bezierCurveTo(238.0, 341.2, 237.6, 346.0, 248.1, 348.0);
      ctx.bezierCurveTo(255.0, 349.3, 257.1, 347.7, 257.1, 347.7);
      ctx.lineTo(263.0, 344.1);
      ctx.lineTo(271.1, 351.6);
      ctx.lineTo(289.9, 355.7);
      ctx.lineTo(290.1, 361.7);
      ctx.lineTo(264.4, 362.3);
      ctx.lineTo(251.1, 359.1);
      ctx.lineTo(243.7, 358.6);
      ctx.lineTo(241.4, 360.8);
      ctx.lineTo(232.4, 360.2);
      ctx.bezierCurveTo(232.4, 360.2, 230.6, 351.9, 231.7, 346.2);
      ctx.bezierCurveTo(232.8, 340.5, 235.1, 339.6, 235.1, 339.6);
      ctx.fill();

      // layer1/Path
      ctx.beginPath();
      ctx.moveTo(235.1, 339.6);
      ctx.lineTo(238.0, 341.2);
      ctx.bezierCurveTo(238.0, 341.2, 237.6, 346.0, 248.1, 348.0);
      ctx.bezierCurveTo(255.0, 349.3, 257.1, 347.7, 257.1, 347.7);
      ctx.lineTo(263.0, 344.1);
      ctx.lineTo(271.1, 351.6);
      ctx.lineTo(289.9, 355.7);
      ctx.lineTo(290.1, 361.7);
      ctx.lineTo(264.4, 362.3);
      ctx.lineTo(251.1, 359.1);
      ctx.lineTo(243.7, 358.6);
      ctx.lineTo(241.4, 360.8);
      ctx.lineTo(232.4, 360.2);
      ctx.bezierCurveTo(232.4, 360.2, 230.6, 351.9, 231.7, 346.2);
      ctx.bezierCurveTo(232.8, 340.5, 235.1, 339.6, 235.1, 339.6);
      ctx.closePath();
      ctx.lineWidth = 2.3;
      ctx.strokeStyle = "rgb(255, 255, 255)";
      ctx.stroke();

      // layer1/Compound Path
      ctx.beginPath();

      // layer1/Compound Path/Path
      ctx.moveTo(127.7, 81.0);
      ctx.lineTo(127.7, 84.3);
      ctx.lineTo(146.1, 157.0);
      ctx.lineTo(133.8, 182.0);
      ctx.lineTo(178.1, 207.5);
      ctx.lineTo(183.4, 87.7);
      ctx.lineTo(127.7, 81.0);
      ctx.closePath();

      // layer1/Compound Path/Path
      ctx.moveTo(179.4, 99.4);
      ctx.lineTo(174.1, 108.9);
      ctx.lineTo(178.0, 119.4);
      ctx.lineTo(171.1, 150.1);
      ctx.lineTo(152.7, 119.7);
      ctx.lineTo(155.4, 111.4);
      ctx.lineTo(139.5, 96.6);
      ctx.lineTo(152.7, 86.9);
      ctx.lineTo(167.7, 87.3);
      ctx.lineTo(179.4, 99.4);
      ctx.closePath();
      ctx.fill();

      // layer1/Path
      ctx.beginPath();
      ctx.moveTo(152.7, 91.0);
      ctx.lineTo(153.9, 101.6);
      ctx.lineTo(167.8, 91.4);
      ctx.lineTo(167.8, 101.0);
      ctx.lineTo(152.7, 91.0);
      ctx.closePath();
      ctx.fill();

      // layer1/Path
      ctx.beginPath();
      ctx.moveTo(167.6, 112.0);
      ctx.bezierCurveTo(167.6, 113.3, 166.5, 114.4, 165.2, 114.4);
      ctx.bezierCurveTo(163.9, 114.4, 162.9, 113.3, 162.9, 112.0);
      ctx.bezierCurveTo(162.9, 110.6, 163.9, 109.5, 165.2, 109.5);
      ctx.bezierCurveTo(166.5, 109.5, 167.6, 110.6, 167.6, 112.0);
      ctx.fill();

      // layer1/Path
      ctx.beginPath();
      ctx.moveTo(169.9, 127.0);
      ctx.bezierCurveTo(169.9, 128.3, 168.9, 129.4, 167.6, 129.4);
      ctx.bezierCurveTo(166.3, 129.4, 165.3, 128.3, 165.3, 127.0);
      ctx.bezierCurveTo(165.3, 125.6, 166.3, 124.5, 167.6, 124.5);
      ctx.bezierCurveTo(168.9, 124.5, 169.9, 125.6, 169.9, 127.0);
      ctx.fill();

      // layer1/Path
      ctx.beginPath();
      ctx.moveTo(128.1, 81.0);
      ctx.lineTo(99.9, 144.0);
      ctx.lineTo(136.6, 205.2);
      ctx.lineTo(139.5, 194.7);
      ctx.lineTo(109.8, 144.0);
      ctx.lineTo(134.4, 97.3);
      ctx.lineTo(128.1, 81.0);
      ctx.closePath();
      ctx.fill();

      // layer1/Path
      ctx.beginPath();
      ctx.moveTo(154.6, 46.4);
      ctx.bezierCurveTo(154.6, 46.4, 153.0, 52.3, 154.4, 56.7);
      ctx.bezierCurveTo(154.7, 57.7, 150.6, 55.1, 153.3, 61.4);
      ctx.bezierCurveTo(155.3, 66.1, 157.8, 70.9, 158.1, 72.1);
      ctx.bezierCurveTo(158.7, 75.4, 157.5, 78.7, 162.9, 79.9);
      ctx.bezierCurveTo(163.9, 80.2, 165.1, 71.8, 166.3, 71.4);
      ctx.bezierCurveTo(168.5, 70.5, 170.7, 68.8, 171.7, 65.8);
      ctx.bezierCurveTo(174.0, 59.1, 173.9, 59.5, 171.9, 53.5);
      ctx.bezierCurveTo(170.2, 48.6, 168.8, 44.3, 165.4, 42.3);
      ctx.bezierCurveTo(164.7, 41.8, 163.1, 44.4, 162.1, 44.2);
      ctx.bezierCurveTo(155.7, 42.6, 154.6, 46.4, 154.6, 46.4);
      ctx.fill();

      // layer1/Path
      ctx.beginPath();
      ctx.moveTo(142.9, 190.8);
      ctx.lineTo(176.1, 209.2);
      ctx.lineTo(177.6, 221.0);
      ctx.lineTo(264.1, 220.6);
      ctx.lineTo(221.3, 345.7);
      ctx.bezierCurveTo(221.3, 345.7, 215.7, 348.2, 208.4, 347.2);
      ctx.bezierCurveTo(201.2, 346.2, 198.0, 342.4, 198.0, 342.4);
      ctx.bezierCurveTo(198.0, 342.4, 245.7, 236.7, 245.7, 237.5);
      ctx.bezierCurveTo(245.7, 238.3, 176.3, 238.4, 176.3, 238.4);
      ctx.lineTo(137.0, 235.6);
      ctx.lineTo(133.9, 211.3);
      ctx.lineTo(138.5, 208.5);
      ctx.lineTo(142.9, 190.8);
      ctx.closePath();
      ctx.fill();

      // layer1/Path
      ctx.beginPath();
      ctx.moveTo(164.9, 39.8);
      ctx.bezierCurveTo(166.8, 40.6, 168.3, 43.2, 168.3, 43.2);
      ctx.bezierCurveTo(168.3, 43.2, 168.7, 41.3, 170.3, 36.8);
      ctx.bezierCurveTo(171.1, 34.4, 168.2, 32.3, 165.2, 31.8);
      ctx.bezierCurveTo(162.9, 31.4, 160.3, 32.6, 155.9, 36.3);
      ctx.bezierCurveTo(150.9, 40.5, 149.5, 45.3, 149.5, 45.3);
      ctx.lineTo(146.1, 47.5);
      ctx.bezierCurveTo(146.1, 47.5, 147.0, 57.1, 148.0, 59.3);
      ctx.bezierCurveTo(149.0, 61.4, 151.1, 65.4, 151.1, 65.4);
      ctx.lineTo(153.0, 64.8);
      ctx.bezierCurveTo(153.0, 64.8, 150.6, 57.4, 150.6, 56.3);
      ctx.bezierCurveTo(150.7, 55.2, 152.3, 54.0, 152.3, 54.0);
      ctx.bezierCurveTo(152.3, 54.0, 150.9, 51.8, 152.7, 46.1);
      ctx.bezierCurveTo(154.6, 40.2, 162.2, 41.7, 162.2, 41.7);
      ctx.bezierCurveTo(162.2, 41.7, 163.1, 39.1, 164.9, 39.8);
      ctx.fill();

      // layer1/Path
      ctx.beginPath();
      ctx.moveTo(195.5, 344.2);
      ctx.lineTo(198.3, 345.9);
      ctx.bezierCurveTo(198.3, 345.9, 197.9, 350.6, 208.5, 352.6);
      ctx.bezierCurveTo(215.3, 354.0, 217.4, 352.4, 217.4, 352.4);
      ctx.lineTo(223.3, 348.8);
      ctx.lineTo(231.4, 356.3);
      ctx.lineTo(250.2, 360.4);
      ctx.lineTo(250.5, 366.4);
      ctx.lineTo(224.8, 366.9);
      ctx.lineTo(211.5, 363.7);
      ctx.lineTo(204.0, 363.3);
      ctx.lineTo(201.7, 365.4);
      ctx.lineTo(192.8, 364.8);
      ctx.bezierCurveTo(192.8, 364.8, 190.9, 356.5, 192.0, 350.8);
      ctx.bezierCurveTo(193.1, 345.1, 195.5, 344.2, 195.5, 344.2);
      ctx.fill();

      // layer1/Path
      ctx.beginPath();
      ctx.moveTo(195.5, 344.2);
      ctx.lineTo(198.3, 345.9);
      ctx.bezierCurveTo(198.3, 345.9, 197.9, 350.6, 208.5, 352.6);
      ctx.bezierCurveTo(215.3, 354.0, 217.4, 352.4, 217.4, 352.4);
      ctx.lineTo(223.3, 348.8);
      ctx.lineTo(231.4, 356.3);
      ctx.lineTo(250.2, 360.4);
      ctx.lineTo(250.5, 366.4);
      ctx.lineTo(224.8, 366.9);
      ctx.lineTo(211.5, 363.7);
      ctx.lineTo(204.0, 363.3);
      ctx.lineTo(201.7, 365.4);
      ctx.lineTo(192.8, 364.8);
      ctx.bezierCurveTo(192.8, 364.8, 190.9, 356.5, 192.0, 350.8);
      ctx.bezierCurveTo(193.1, 345.1, 195.5, 344.2, 195.5, 344.2);
      ctx.closePath();
      ctx.stroke();

      // layer1/Path
      ctx.beginPath();
      ctx.moveTo(263.2, 240.7);
      ctx.lineTo(251.1, 271.5);
      ctx.lineTo(239.1, 336.6);
      ctx.bezierCurveTo(239.1, 336.6, 243.5, 340.1, 250.2, 341.0);
      ctx.bezierCurveTo(256.9, 341.9, 261.3, 339.7, 261.3, 339.7);
      ctx.lineTo(263.2, 240.7);
      ctx.closePath();
      ctx.fill();

      // layer1/Path
      ctx.beginPath();
      ctx.moveTo(400.4, 111.4);
      ctx.lineTo(391.3, 121.0);
      ctx.lineTo(402.6, 207.5);
      ctx.lineTo(366.2, 214.9);
      ctx.lineTo(382.3, 237.3);
      ctx.lineTo(430.1, 237.3);
      ctx.bezierCurveTo(430.1, 237.3, 437.3, 194.9, 428.5, 183.3);
      ctx.bezierCurveTo(419.6, 171.7, 408.9, 157.8, 411.1, 145.9);
      ctx.bezierCurveTo(413.3, 134.1, 424.2, 112.7, 424.2, 112.7);
      ctx.lineTo(400.4, 111.4);
      ctx.closePath();
      ctx.fill();

      // layer1/Path
      ctx.beginPath();
      ctx.moveTo(402.6, 108.3);
      ctx.bezierCurveTo(402.6, 108.3, 408.5, 98.7, 412.5, 97.3);
      ctx.bezierCurveTo(416.4, 96.0, 430.6, 96.6, 432.8, 98.9);
      ctx.bezierCurveTo(435.1, 101.2, 439.7, 115.7, 441.3, 123.2);
      ctx.bezierCurveTo(443.0, 130.8, 451.0, 150.9, 451.0, 150.9);
      ctx.lineTo(459.8, 201.1);
      ctx.lineTo(456.2, 203.7);
      ctx.lineTo(444.4, 152.2);
      ctx.lineTo(427.6, 108.9);
      ctx.lineTo(402.6, 108.3);
      ctx.closePath();
      ctx.fill();

      // layer1/Path
      ctx.beginPath();
      ctx.moveTo(0.5, 345.4);
      ctx.lineTo(0.5, 350.1);
      ctx.lineWidth = 1.0;
      ctx.strokeStyle = "rgb(0, 0, 0)";
      ctx.lineJoin = "miter";
      ctx.miterLimit = 4.0;
      ctx.stroke();

      // layer1/Path
      ctx.beginPath();
      ctx.moveTo(0.5, 0.0);
      ctx.lineTo(0.5, 4.0);
      ctx.stroke();
      ctx.restore();
    }
    
    var currentMoustacheX = 0;
    var currentMoustacheY = 0;
    
    function animateMoustache(ctx)
    {
  		
  		currentMoustacheX += 10;
      	currentMoustacheY += 10;
      	
        	ctx.clearRect(0,0,800,800);
  		drawMoustache(ctx, currentMoustacheX, currentMoustacheY);
    }
    
    function drawMoustache(ctx, x, y) {

      	
      // layer1/Path
      ctx.save();
      ctx.beginPath();
      ctx.moveTo(196.9, 124.5);
      ctx.bezierCurveTo(196.9, 124.5, 186.6, 107.0, 179.7, 104.7);
      ctx.bezierCurveTo(179.7, 104.7, 173.9, 101.1, 166.4, 104.7);
      ctx.bezierCurveTo(155.5, 109.9, 142.6, 123.3, 136.4, 126.5);
      ctx.bezierCurveTo(125.3, 132.2, 116.4, 131.1, 108.7, 127.5);
      ctx.bezierCurveTo(99.8, 123.5, 89.7, 115.3, 95.0, 105.5);
      ctx.bezierCurveTo(99.2, 97.9, 104.2, 102.7, 103.8, 105.9);
      ctx.bezierCurveTo(103.3, 109.1, 102.0, 111.5, 102.0, 111.5);
      ctx.bezierCurveTo(102.0, 111.5, 106.1, 108.2, 106.5, 103.8);
      ctx.bezierCurveTo(106.7, 102.0, 104.1, 97.2, 100.6, 97.2);
      ctx.bezierCurveTo(94.9, 97.3, 89.2, 103.5, 88.9, 108.8);
      ctx.bezierCurveTo(87.9, 124.1, 98.3, 129.1, 109.5, 134.1);
      ctx.bezierCurveTo(122.8, 139.9, 139.8, 136.1, 161.2, 121.0);
      ctx.bezierCurveTo(170.0, 114.8, 173.3, 116.4, 176.8, 119.8);
      ctx.bezierCurveTo(185.5, 128.5, 195.5, 139.6, 196.4, 139.9);
      ctx.bezierCurveTo(197.3, 140.2, 209.7, 125.3, 215.0, 123.8);
      ctx.bezierCurveTo(220.3, 122.3, 230.7, 124.3, 235.7, 126.4);
      ctx.bezierCurveTo(246.2, 131.1, 257.1, 132.9, 271.2, 129.4);
      ctx.bezierCurveTo(277.7, 127.8, 280.0, 125.5, 282.6, 122.4);
      ctx.bezierCurveTo(285.7, 118.6, 286.1, 110.4, 281.4, 104.5);
      ctx.bezierCurveTo(279.4, 101.9, 274.8, 104.5, 274.8, 104.5);
      ctx.bezierCurveTo(274.8, 104.5, 277.1, 103.4, 279.0, 104.6);
      ctx.bezierCurveTo(280.6, 105.6, 281.1, 108.4, 281.7, 111.2);
      ctx.bezierCurveTo(282.6, 115.7, 280.5, 120.6, 276.9, 122.7);
      ctx.bezierCurveTo(273.2, 124.7, 262.5, 124.5, 255.1, 121.7);
      ctx.bezierCurveTo(250.7, 120.1, 248.0, 118.1, 239.5, 113.7);
      ctx.bezierCurveTo(231.0, 109.3, 222.1, 108.5, 214.1, 111.2);
      ctx.bezierCurveTo(206.1, 113.8, 196.9, 124.5, 196.9, 124.5);
      ctx.closePath();
      ctx.fill();

      // layer1/Group

      // layer1/Group/Path
      ctx.save();
      ctx.beginPath();
      ctx.moveTo(150.4, 28.5);
      ctx.lineTo(125.2, 28.9);
      ctx.lineTo(124.8, 1.0);
      ctx.lineTo(114.0, 1.5);
      ctx.lineTo(114.0, 72.2);
      ctx.lineTo(124.5, 72.2);
      ctx.lineTo(124.0, 40.3);
      ctx.lineTo(150.4, 41.3);
      ctx.lineTo(150.4, 72.2);
      ctx.lineTo(160.0, 72.2);
      ctx.lineTo(160.4, 1.5);
      ctx.lineTo(150.4, 1.0);
      ctx.lineTo(150.4, 28.5);
      ctx.closePath();
      ctx.fillStyle = "rgb(53, 76, 82)";
      ctx.fill();

      // layer1/Group/Path
      ctx.beginPath();
      ctx.moveTo(209.2, 14.5);
      ctx.lineTo(207.8, 4.7);
      ctx.lineTo(169.3, 2.8);
      ctx.lineTo(168.4, 65.6);
      ctx.lineTo(207.3, 66.5);
      ctx.lineTo(208.3, 57.8);
      ctx.lineTo(177.4, 56.8);
      ctx.lineTo(177.5, 45.7);
      ctx.lineTo(202.9, 45.1);
      ctx.lineTo(203.5, 36.5);
      ctx.lineTo(176.4, 35.5);
      ctx.lineTo(176.6, 13.8);
      ctx.lineTo(209.2, 14.5);
      ctx.closePath();
      ctx.fill();

      // layer1/Group/Path
      ctx.beginPath();
      ctx.moveTo(31.5, 0.1);
      ctx.bezierCurveTo(30.5, 0.0, 29.5, 0.0, 28.5, 0.0);
      ctx.bezierCurveTo(13.0, 0.0, 6.0, 5.8, 3.2, 9.3);
      ctx.bezierCurveTo(1.2, 11.8, 0.0, 14.6, 0.0, 17.0);
      ctx.bezierCurveTo(0.0, 26.5, 6.1, 33.1, 19.0, 37.7);
      ctx.bezierCurveTo(22.5, 38.9, 26.1, 39.7, 29.2, 40.3);
      ctx.bezierCurveTo(38.2, 42.3, 44.8, 43.6, 44.8, 54.4);
      ctx.bezierCurveTo(44.8, 64.0, 34.7, 64.0, 29.8, 64.0);
      ctx.bezierCurveTo(29.7, 64.0, 16.7, 63.8, 11.6, 48.0);
      ctx.lineTo(11.5, 47.6);
      ctx.lineTo(0.2, 48.2);
      ctx.lineTo(0.4, 48.9);
      ctx.bezierCurveTo(5.7, 75.9, 31.2, 76.2, 31.5, 76.2);
      ctx.bezierCurveTo(48.6, 76.2, 57.3, 69.1, 57.3, 55.0);
      ctx.bezierCurveTo(57.3, 50.6, 56.4, 36.0, 44.8, 32.5);
      ctx.bezierCurveTo(42.6, 31.9, 40.0, 31.3, 37.3, 30.6);
      ctx.bezierCurveTo(27.3, 28.1, 14.7, 25.0, 14.7, 17.9);
      ctx.bezierCurveTo(14.7, 13.8, 18.9, 11.7, 27.1, 11.7);
      ctx.bezierCurveTo(28.5, 11.7, 30.1, 11.8, 31.9, 11.9);
      ctx.lineTo(32.0, 11.9);
      ctx.bezierCurveTo(40.3, 12.5, 44.8, 18.8, 47.1, 24.0);
      ctx.lineTo(47.3, 24.3);
      ctx.lineTo(57.9, 24.3);
      ctx.lineTo(58.0, 23.7);
      ctx.bezierCurveTo(58.3, 18.7, 57.2, 14.3, 54.7, 10.8);
      ctx.bezierCurveTo(47.6, 0.9, 32.2, 0.1, 31.5, 0.1);
      ctx.closePath();
      ctx.fill();

      // layer1/Group/Path
      ctx.beginPath();
      ctx.moveTo(100.9, 48.3);
      ctx.bezierCurveTo(98.6, 55.5, 89.4, 56.1, 86.6, 56.1);
      ctx.lineTo(85.8, 56.1);
      ctx.bezierCurveTo(81.4, 55.8, 77.8, 53.9, 75.2, 50.3);
      ctx.bezierCurveTo(71.8, 45.7, 70.8, 39.2, 71.0, 35.0);
      ctx.bezierCurveTo(71.3, 28.5, 76.6, 18.4, 87.2, 17.7);
      ctx.bezierCurveTo(87.2, 17.6, 94.7, 17.1, 103.4, 23.6);
      ctx.lineTo(103.9, 24.0);
      ctx.lineTo(108.6, 15.3);
      ctx.lineTo(108.4, 14.9);
      ctx.bezierCurveTo(102.8, 5.7, 89.6, 5.6, 89.0, 5.6);
      ctx.bezierCurveTo(74.7, 5.6, 61.1, 20.1, 61.1, 35.4);
      ctx.bezierCurveTo(61.1, 51.3, 69.6, 68.5, 83.5, 68.5);
      ctx.bezierCurveTo(84.1, 68.5, 84.8, 68.5, 85.6, 68.4);
      ctx.bezierCurveTo(86.2, 68.3, 101.1, 65.5, 108.3, 56.4);
      ctx.lineTo(108.7, 55.9);
      ctx.lineTo(101.2, 47.4);
      ctx.lineTo(100.9, 48.3);
      ctx.closePath();
      ctx.fill();

      // layer1/Group/Path
      ctx.beginPath();
      ctx.moveTo(266.6, 3.8);
      ctx.lineTo(247.1, 57.0);
      ctx.lineTo(225.5, 1.9);
      ctx.lineTo(216.6, 1.4);
      ctx.lineTo(216.2, 73.0);
      ctx.lineTo(226.5, 72.2);
      ctx.lineTo(226.2, 30.9);
      ctx.lineTo(241.9, 72.9);
      ctx.lineTo(251.0, 72.9);
      ctx.lineTo(265.3, 32.7);
      ctx.lineTo(266.3, 71.0);
      ctx.lineTo(275.1, 71.8);
      ctx.lineTo(273.3, 4.4);
      ctx.lineTo(266.6, 3.8);
      ctx.closePath();
      ctx.fill();

      // layer1/Group/Compound Path
      ctx.beginPath();

      // layer1/Group/Compound Path/Path
      ctx.moveTo(361.3, 19.2);
      ctx.bezierCurveTo(359.8, 21.3, 356.3, 23.8, 348.1, 23.8);
      ctx.bezierCurveTo(346.1, 23.8, 344.0, 23.7, 341.7, 23.4);
      ctx.lineTo(341.2, 11.6);
      ctx.bezierCurveTo(346.0, 9.8, 350.1, 8.9, 353.4, 8.9);
      ctx.bezierCurveTo(361.9, 8.9, 362.5, 14.6, 362.5, 14.9);
      ctx.bezierCurveTo(362.5, 14.9, 362.7, 17.0, 361.3, 19.2);
      ctx.closePath();

      // layer1/Group/Compound Path/Path
      ctx.moveTo(373.6, 65.9);
      ctx.bezierCurveTo(369.7, 45.1, 367.8, 41.1, 364.9, 36.4);
      ctx.bezierCurveTo(362.8, 32.8, 361.5, 31.5, 359.3, 30.0);
      ctx.bezierCurveTo(359.9, 30.0, 360.4, 29.9, 360.8, 29.8);
      ctx.bezierCurveTo(367.5, 28.3, 368.4, 21.2, 368.4, 15.1);
      ctx.bezierCurveTo(368.4, 13.2, 368.1, 9.7, 365.7, 6.5);
      ctx.bezierCurveTo(360.7, 0.2, 349.9, -0.8, 334.1, 3.5);
      ctx.lineTo(333.6, 3.6);
      ctx.lineTo(338.6, 68.8);
      ctx.lineTo(345.9, 69.3);
      ctx.lineTo(342.5, 33.0);
      ctx.bezierCurveTo(344.1, 33.0, 345.1, 32.9, 346.7, 32.8);
      ctx.lineTo(348.6, 32.6);
      ctx.bezierCurveTo(351.5, 32.3, 358.8, 37.7, 361.0, 41.2);
      ctx.bezierCurveTo(363.2, 44.5, 364.7, 48.1, 367.2, 67.9);
      ctx.lineTo(367.3, 68.7);
      ctx.lineTo(373.7, 66.5);
      ctx.lineTo(373.6, 65.9);
      ctx.closePath();
      ctx.fill();

      // layer1/Group/Path
      ctx.beginPath();
      ctx.moveTo(327.2, 17.3);
      ctx.lineTo(325.6, 4.9);
      ctx.lineTo(283.1, 3.8);
      ctx.lineTo(283.1, 69.6);
      ctx.lineTo(326.0, 69.6);
      ctx.lineTo(326.8, 58.2);
      ctx.lineTo(295.8, 57.8);
      ctx.lineTo(295.8, 47.2);
      ctx.lineTo(321.2, 45.9);
      ctx.lineTo(321.6, 36.7);
      ctx.lineTo(294.5, 36.3);
      ctx.lineTo(294.5, 17.3);
      ctx.lineTo(327.2, 17.3);
      ctx.closePath();
      ctx.fill();
      ctx.restore();
      ctx.restore();
    }
    
    function drawPhone(ctx, x, y, angle) {

      	var img = new Image();
 
        //image object is onload
        img.onload = function(){
        	ctx.clearRect(0,0,800,800);
        	// Save the current context
    		ctx.save();
    		 // Translate to the center point of our image
   				 ctx.translate(img.width * 0.5 + x, img.height * 0.5+y);
    			// Perform the rotation
    			ctx.rotate(DegToRad(angle));
    			// Translate back to the top left of our image
    		ctx.translate(-img.width * 0.5-x, -img.height * 0.5-y);
        	
            ctx.drawImage(img,x,y);
            ctx.restore();
        };
 
        img.src = 'phone.png';
    }
    
    function drawSmallThoughtBubble(ctx) {
    
      // layer1/Path
      ctx.save();
      ctx.beginPath();
      ctx.moveTo(160.4, 42.7);
      ctx.bezierCurveTo(160.4, 38.3, 156.5, 34.5, 151.0, 32.9);
      ctx.bezierCurveTo(154.2, 30.1, 156.3, 25.7, 156.3, 20.8);
      ctx.bezierCurveTo(156.3, 12.3, 149.9, 5.3, 142.0, 5.3);
      ctx.bezierCurveTo(137.8, 5.3, 134.1, 7.3, 131.5, 10.4);
      ctx.bezierCurveTo(129.7, 5.6, 124.0, 2.0, 117.2, 2.0);
      ctx.bezierCurveTo(111.8, 2.0, 107.1, 4.2, 104.5, 7.6);
      ctx.bezierCurveTo(102.8, 6.8, 101.0, 6.3, 99.0, 6.3);
      ctx.bezierCurveTo(92.0, 6.3, 86.3, 12.0, 86.3, 19.0);
      ctx.bezierCurveTo(86.3, 19.5, 86.3, 20.1, 86.4, 20.6);
      ctx.bezierCurveTo(85.9, 20.6, 85.4, 20.5, 85.0, 20.5);
      ctx.bezierCurveTo(77.1, 20.5, 70.8, 28.1, 70.8, 37.5);
      ctx.bezierCurveTo(70.8, 46.9, 77.1, 54.5, 85.0, 54.5);
      ctx.bezierCurveTo(89.5, 54.5, 93.5, 52.0, 96.1, 48.0);
      ctx.bezierCurveTo(99.0, 53.0, 105.2, 56.4, 112.4, 56.4);
      ctx.bezierCurveTo(116.1, 56.4, 119.6, 55.5, 122.5, 53.9);
      ctx.bezierCurveTo(122.5, 54.0, 122.5, 54.1, 122.5, 54.2);
      ctx.bezierCurveTo(122.5, 60.4, 127.9, 65.4, 134.6, 65.4);
      ctx.bezierCurveTo(141.3, 65.4, 146.8, 60.4, 146.8, 54.2);
      ctx.bezierCurveTo(146.8, 53.9, 146.8, 53.6, 146.7, 53.2);
      ctx.bezierCurveTo(154.4, 52.6, 160.4, 48.1, 160.4, 42.7);
      ctx.closePath();
       ctx.lineWidth = 2.4;
      ctx.lineJoin = "miter";
      ctx.miterLimit = 4.0;
       ctx.fillStyle = '#F9FBF6';
  ctx.fill();
      ctx.stroke();

      // layer1/Path
      ctx.beginPath();
      ctx.moveTo(90.8, 96.8);
      ctx.bezierCurveTo(90.8, 94.2, 88.9, 92.1, 86.1, 91.1);
      ctx.bezierCurveTo(87.7, 89.5, 88.8, 87.0, 88.8, 84.2);
      ctx.bezierCurveTo(88.8, 79.2, 85.5, 75.2, 81.6, 75.2);
      ctx.bezierCurveTo(79.5, 75.2, 77.6, 76.4, 76.2, 78.2);
      ctx.bezierCurveTo(75.4, 75.4, 72.5, 73.3, 69.0, 73.3);
      ctx.bezierCurveTo(66.3, 73.3, 64.0, 74.6, 62.7, 76.5);
      ctx.bezierCurveTo(61.8, 76.1, 60.9, 75.8, 59.9, 75.8);
      ctx.bezierCurveTo(56.4, 75.8, 53.5, 79.1, 53.5, 83.1);
      ctx.bezierCurveTo(53.5, 83.4, 53.5, 83.7, 53.5, 84.1);
      ctx.bezierCurveTo(53.3, 84.0, 53.1, 84.0, 52.8, 84.0);
      ctx.bezierCurveTo(48.9, 84.0, 45.7, 88.4, 45.7, 93.8);
      ctx.bezierCurveTo(45.7, 99.2, 48.9, 103.6, 52.8, 103.6);
      ctx.bezierCurveTo(55.1, 103.6, 57.1, 102.1, 58.4, 99.9);
      ctx.bezierCurveTo(59.9, 102.7, 63.0, 104.7, 66.7, 104.7);
      ctx.bezierCurveTo(68.5, 104.7, 70.3, 104.2, 71.7, 103.3);
      ctx.bezierCurveTo(71.7, 103.3, 71.7, 103.4, 71.7, 103.4);
      ctx.bezierCurveTo(71.7, 107.0, 74.5, 109.9, 77.8, 109.9);
      ctx.bezierCurveTo(81.2, 109.9, 84.0, 107.0, 84.0, 103.4);
      ctx.bezierCurveTo(84.0, 103.2, 84.0, 103.0, 83.9, 102.9);
      ctx.bezierCurveTo(87.8, 102.5, 90.8, 99.9, 90.8, 96.8);
      ctx.closePath();
       ctx.lineWidth = 2.4;
      ctx.lineJoin = "miter";
      ctx.miterLimit = 4.0;
       ctx.fillStyle = '#F9FBF6';
  ctx.fill();
      ctx.stroke();

      // layer1/Path
      ctx.beginPath();
      ctx.moveTo(32.3, 124.6);
      ctx.bezierCurveTo(32.3, 122.9, 31.0, 121.4, 29.2, 120.8);
      ctx.bezierCurveTo(30.3, 119.7, 31.0, 118.0, 31.0, 116.1);
      ctx.bezierCurveTo(31.0, 112.8, 28.9, 110.0, 26.3, 110.0);
      ctx.bezierCurveTo(24.9, 110.0, 23.7, 110.8, 22.8, 112.0);
      ctx.bezierCurveTo(22.3, 110.1, 20.4, 108.8, 18.2, 108.8);
      ctx.bezierCurveTo(16.4, 108.8, 14.9, 109.6, 14.0, 110.9);
      ctx.bezierCurveTo(13.5, 110.6, 12.9, 110.4, 12.2, 110.4);
      ctx.bezierCurveTo(9.9, 110.4, 8.1, 112.6, 8.1, 115.4);
      ctx.bezierCurveTo(8.1, 115.6, 8.1, 115.8, 8.1, 116.0);
      ctx.bezierCurveTo(8.0, 116.0, 7.8, 116.0, 7.6, 116.0);
      ctx.bezierCurveTo(5.1, 116.0, 3.0, 119.0, 3.0, 122.6);
      ctx.bezierCurveTo(3.0, 126.3, 5.1, 129.2, 7.6, 129.2);
      ctx.bezierCurveTo(9.1, 129.2, 10.4, 128.3, 11.3, 126.7);
      ctx.bezierCurveTo(12.2, 128.7, 14.2, 130.0, 16.6, 130.0);
      ctx.bezierCurveTo(17.8, 130.0, 19.0, 129.6, 19.9, 129.0);
      ctx.bezierCurveTo(19.9, 129.1, 19.9, 129.1, 19.9, 129.1);
      ctx.bezierCurveTo(19.9, 131.5, 21.7, 133.5, 23.9, 133.5);
      ctx.bezierCurveTo(26.1, 133.5, 27.8, 131.5, 27.8, 129.1);
      ctx.bezierCurveTo(27.8, 129.0, 27.8, 128.9, 27.8, 128.7);
      ctx.bezierCurveTo(30.3, 128.5, 32.3, 126.8, 32.3, 124.6);
      ctx.closePath();
       ctx.lineWidth = 2.4;
      ctx.lineJoin = "miter";
      ctx.miterLimit = 4.0;
       ctx.fillStyle = '#F9FBF6';
  ctx.fill();
      ctx.stroke();
      ctx.restore();
      
    }
    
    function drawMainThoughtBubble(ctx) {
    
     // layer1/Path
      ctx.save();
      ctx.beginPath();
      ctx.moveTo(4.5, 77.2);
      ctx.bezierCurveTo(-3.3, -0.1, 24.0, 0.6, 28.5, 0.8);
      ctx.bezierCurveTo(47.5, 0.8, 66.6, 4.7, 87.6, 4.7);
      ctx.bezierCurveTo(103.8, 4.7, 127.7, 12.0, 149.6, 9.7);
      ctx.bezierCurveTo(178.9, 6.6, 196.9, 0.4, 228.1, 3.7);
      ctx.bezierCurveTo(272.2, 8.7, 318.5, 16.0, 360.1, 10.2);
      ctx.bezierCurveTo(370.1, 9.2, 379.1, 4.2, 389.1, 2.2);
      ctx.bezierCurveTo(406.1, -1.8, 417.1, 3.2, 435.1, 8.2);
      ctx.bezierCurveTo(462.1, 16.2, 491.6, 3.2, 520.6, 4.2);
      ctx.bezierCurveTo(537.6, 4.2, 569.9, 1.2, 583.9, 12.2);
      ctx.bezierCurveTo(606.9, 28.2, 583.9, 74.2, 583.9, 97.2);
      ctx.bezierCurveTo(583.9, 125.2, 591.1, 154.2, 591.1, 182.2);
      ctx.bezierCurveTo(591.1, 195.2, 588.1, 208.2, 589.1, 221.2);
      ctx.bezierCurveTo(590.1, 234.2, 592.3, 247.9, 594.3, 260.9);
      ctx.bezierCurveTo(595.3, 278.9, 588.1, 291.2, 588.1, 309.2);
      ctx.bezierCurveTo(588.1, 331.2, 594.1, 356.2, 592.1, 378.2);
      ctx.bezierCurveTo(586.7, 424.6, 541.7, 409.0, 482.6, 411.2);
      ctx.bezierCurveTo(438.6, 412.2, 396.6, 406.5, 351.6, 404.5);
      ctx.bezierCurveTo(284.6, 403.0, 231.5, 417.7, 206.1, 411.2);
      ctx.bezierCurveTo(118.6, 388.9, 74.6, 422.5, 31.1, 407.2);
      ctx.bezierCurveTo(11.1, 400.2, 1.1, 399.2, 1.1, 376.2);
      ctx.bezierCurveTo(1.1, 350.2, 10.1, 322.7, 8.1, 297.7);
      ctx.bezierCurveTo(5.1, 271.7, 6.4, 254.1, 2.1, 228.2);
      ctx.bezierCurveTo(-1.4, 207.2, 7.3, 178.2, 5.1, 150.7);
      ctx.bezierCurveTo(4.1, 126.7, 12.5, 101.2, 4.5, 77.2);
      
      ctx.lineWidth = 2.4;
      ctx.lineJoin = "miter";
      ctx.miterLimit = 4.0;
       ctx.fillStyle = '#F9FBF6';
  ctx.fill();
      ctx.stroke();
      ctx.restore();
      

    }
    
     function drawThoughtBubbles(ctx, ctx_main_thought) {



	drawSmallThoughtBubble(ctx);
	drawMainThoughtBubble(ctx_main_thought);
     

     
    }
    

    
    function DegToRad(d) {
    // Converts degrees to radians
    return d * 0.0174532925199432957;
}