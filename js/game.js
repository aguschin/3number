var tile = {
  size: 64,
  number: 5,
  x: 0,
  y: 64
}

// Create the canvas
var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");
canvas.width = tile.number*tile.size;
canvas.height = (tile.number+1)*tile.size;
document.body.appendChild(canvas);


tile.init = function() {
	tile.array = new Array();
	for (var i=0;i<tile.number;i++) {
		tile.array[i]=new Array();
		for (var j=0;j<tile.number;j++) {
			tile.array[i][j]=0;
		}
	}
	var number = Math.floor(tile.number*4+1*tile.number*Math.random());
  	console.log(number);
	var i = 0;
	while (i < number) {
		x = Math.floor(Math.random()*tile.number-0.01);
		y = Math.floor(Math.random()*tile.number-0.01);
		if (tile.array[x][y] === 0) {
			tile.array[x][y] = 1;
			refresh(x,y);
			i += 1;
		}
	}
}

addEventListener("click", getClickPosition, false);

function getClickPosition(e) {
    var xPosition = e.clientX;
    var yPosition = e.clientY;
	change(e.clientX, e.clientY);
}

var clicks = 0;
var next = 1 + Math.round(Math.random());

var change = function(x,y) {
	x = Math.floor(x/tile.size);
	y = Math.floor((y-tile.y)/tile.size);
	if (tile.array[x][y] === 0) {
		clicks += 1;
		tile.array[x][y] = next;
		next = 1 + Math.round(Math.random());
		chain.array = new Array();
		var c = chain.find(x,y);
		if (c.length >= 3) {
			var value = tile.array[x][y];
			for (var i=0; i<c.length; i++) {
				tile.array[c[i][0]][c[i][1]] = 0;
				tile.array[x][y] = value*2;
			}
			refresh(x,y);
		}
		render();
	}
}

var refresh = function(x,y) {
	chain.array = new Array();
	var c = chain.find(x,y);
	if (c.length >= 3) {
		var value = tile.array[x][y];
		for (var i=0; i<c.length; i++) {
			tile.array[c[i][0]][c[i][1]] = 0;
		}
		tile.array[x][y] = value*2;
		refresh(x,y);
	}
}

chain = {}
chain.array = new Array()
chain.find = function(x,y) {
  if (tile.array[x][y] === 0) {
	  return new Array();
  }
  for (var i=0;i<this.array.length;i++) {
  	if (this.array[i][0] === x && this.array[i][1] === y) {
	  return 0;
	}
  }
  this.array.push([x,y]);
  for (var i=-1;i<=1;i++) {
    for (var j=-1;j<=1;j++) {
      if (x+i>=0 && y+j>=0
	    && x+i<tile.number 
	    && y+j<tile.number 
	    && !(i===0 && j===0)
		&& !(Math.abs(i)+Math.abs(j)===2)
	    && tile.array[x+i][y+j] === tile.array[x][y]) {
   		this.find(x+i,y+j);
      }
    }
  }
  return this.array;
}

// Draw everything
var render = function () {
	canvas.width = canvas.width;
	var inc = 0;
	for (var i=0;i<tile.number;i++) {
		for (var j=0;j<tile.number;j++) {
    	ctx.strokeStyle = "#FFFFFF";
		switch (tile.array[i][j]) {
			case 0: ctx.fillStyle = "rgba(0, 0, 256, 0.1)"; break;
			case 1: ctx.fillStyle = "rgba(0, 0, 256, 0.2)"; break;
			case 2: ctx.fillStyle = "rgba(0, 0, 256, 0.3)"; break;
			case 4: ctx.fillStyle = "rgba(0, 0, 256, 0.4)"; break;
			case 16: ctx.fillStyle = "rgba(0, 0, 256, 0.5)"; break;
			case 32: ctx.fillStyle = "rgba(256, 256, 0, 0.6)"; break;
			case 64: ctx.fillStyle = "rgba(256, 256, 0, 0.7)"; break;
			case 128: ctx.fillStyle = "rgba(256, 256, 0, 0.8)"; break;
			case 256: ctx.fillStyle = "rgba(256, 256, 0, 0.9)"; break;
			case 512: ctx.fillStyle = "rgba(256, 256, 0, 1)"; break;
			default: ctx.fillStyle = "#6BA0FF";
		} 
		ctx.fillRect(i*tile.size, tile.y+j*tile.size, tile.size, tile.size);
    	ctx.strokeRect(i*tile.size, tile.y+j*tile.size, tile.size, tile.size);
    	ctx.fillStyle = "#000000";
    	ctx.font = "24px Helvetica";
    	ctx.textAlign = "center";
    	ctx.textBaseline = "center";
    	ctx.fillText(tile.array[i][j], (i+0.5)*tile.size, tile.y+(j+0.5)*tile.size);
		//ctx.drawImage(tileImage, i*tile.size, j*tile.size, tile.size, tile.size);
		}
	}
	chain.array = new Array();	
	ctx.fillText(clicks, 32, 32);
	ctx.fillText(next, 288, 32);
	ctx.font = "14px Helvetica";
	ctx.fillText('steps', 32, 52);
	ctx.fillText('next', 288, 52);
}

tile.init();
render();