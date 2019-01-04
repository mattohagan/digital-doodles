

// 
// kinetics 12-16.18
// forked from kinetics 001 
// 


$(document).ready(function(){

	// to use for 3D canvas
	var sketch3D = function(p){
		let move = 0.25;
		let time = 0;
		let size = 300;
		let yDirection = 1;
		let rectF;

		p.setup = function(){
			p.createCanvas(400, 560, p.WEBGL);

			let buffer = 50;

			// randomize floating 3D rectangle properties
			let height = p.random(20, 50);
			let widthScale = p.random(0.5, 5);
			let width = height * widthScale;

			let xMin = buffer - (p.width / 2);
			let yMin = buffer - (p.height / 2);
			let x = p.random(xMin, (p.width / 2) - buffer);
			let y = p.random(yMin, (p.height / 2) - buffer);
			let z = 0;

			// just for debugging
			let vars = {
				height: height,
				width: width,
				x: x,
				y: y,
				z: z
			};
			console.log(vars);

			rectF = new Floater(width, height, x, y, z);
		}

		p.draw = function(){
			p.background(255, 255, 255, 0);
			p.ambientLight(255)

			rectF.move();
			rectF.display();

			time += 0.01;


			// Uncomment below to get a giant cube, scroll wheel controls it's rotation
			//
			// p.push();
			// // translate(0, 0, 0);
			// p.rotateX(time * move);
			// p.rotateY(time * yDirection);
			// p.strokeWeight(2);
			// p.stroke(0);
			// p.ambientMaterial(255);
			// p.box(size,size);
			// p.pop();

			// if (size > 30) {
			// 	let sizeDiff = 0.03;
			// 	size -= (time * sizeDiff);
			// }
		}

		p.mouseWheel = function(event){
			let moveDamper = 300;
			let sizeDamper = 100;

			// adjust global vars 
			move += (event.delta / moveDamper);
			size += (event.delta / sizeDamper);

			// if(event.delta >= 0){
			// 	yDirection = -1;
			// } else {
			// 	yDirection = 1;
			// }
		}

		function Floater(height, width, x, y, z) {
			this.x = x;
			this.y = y;
			this.z = z;
			this.amp = 0.8;
			this.offset = 0;
			this.offsetSpeed = 0.04;
			this.type = 'box';
			this.height = height;
			this.width = width;

			this.move = function() {
				this.offset += this.offsetSpeed;
				let wave = this.amp * Math.cos(this.offset);
				this.y = this.y + wave;
				// console.log(wave);
			}

			this.display = function() {
				p.push();
					p.translate(this.x, this.y, this.z);
					
					switch(this.type) {
						case 'box':
							p.box(this.height, this.width);
							break;
						default:
							break;
					}

				p.pop();
			}
		}
	}


	// to use for 2D canvas
	var sketch2D = function(p){
		let buffer, size, xOrigin, yOrigin, ySize;

		p.setup = function(){
			p.createCanvas(400, 560);
			buffer = 100;

			// vars for static block
			xSize = 50;
			ySize = xSize * 4;
			xOrigin = Math.ceil(p.random(25, 160) / 10) * 10;
			yOrigin = xOrigin * 5;

			// vars for circle 
			let xEllipse = p.random(0, p.width);
			let yEllipse = p.random(0, p.height);
			size = p.random(100, 400);

			// create circle only once
			p.fill(255);
			p.ellipse(xEllipse, yEllipse, size);
		}

		p.draw = function(){
			// update static block
			p.loadPixels();
			for(var x = xOrigin; x < xOrigin + xSize; x++){
				for(var y = yOrigin; y < yOrigin + ySize; y++){
				  var r = p.random(255);

				  // this is witchcraft 
				  var index = (x + (y * ySize)) * 16;

				  p.pixels[index + 0] = r;
				  p.pixels[index + 1] = r;
				  p.pixels[index + 2] = r;
				  p.pixels[index + 3] = 255;
				}
			}
			p.updatePixels();
		}
	}

	// create p5 instances
	let sketch1 = new p5(sketch3D, 'container3D');
	let sketch2 = new p5(sketch2D, 'container2D');



	//
	// Below functions are leftover from 
	// kinetics 001, see below for use
	//

	function SelectText(element) {
		// found all this on stackoverflow somewhere
	    var doc = document;
	    var text = doc.getElementById(element);
	    if (doc.body.createTextRange) { // ms
	        var range = doc.body.createTextRange();
	        range.moveToElementText(text);
	        range.select();
	    } else if (window.getSelection) {
	        var selection = window.getSelection();
	        var range = doc.createRange();
	        range.selectNodeContents(text);
	        selection.removeAllRanges();
	        selection.addRange(range);
	    }
	}


	let toSelect = ['firstLine', 'wondering'];
	let selectIndex = 0;

	function selectWondering(){
		let selecting = toSelect[1];
		SelectText(selecting);

		setTimeout(selectFirstLine, 200);
	}

	function selectFirstLine(){
		let selecting = toSelect[0];
		SelectText(selecting);

		setTimeout(deselect, 750);
	}

	function deselect(){
		document.getSelection().removeAllRanges();

		setTimeout(selectWondering, 1000);
	}


	// To use: uncomment this line as well as the
	// HTML snippet in index.html 

	// setTimeout(selectWondering, 1000);
});


