var canvas;
var context;

var app = {
  initialize: function() {
    this.bindEvents();
  },
  bindEvents: function() {
    document.addEventListener('deviceready', this.onDeviceReady, false);
  },
  onDeviceReady: function() {
    
    document.body.ontouchstart = down;
    document.body.ontouchmove = move;
    // = document.body.onmspointerdown
    //document.body.onmousedown = 
    
    canvas = $('canvas');
    context = canvas.getContext('2d');
    
    canvas.height = window.screen.availHeight;
    canvas.width = window.screen.availWidth;
    document.body.style.backgroundColor = '#FFFFFF';
    context = canvas.getContext('2d');
    context.strokeStyle="#FF0000";
    context.fillStyle="#FF0000";
    context.translate(0.5, 0.5);
  }
};

function $(id) {
   return document.getElementById(id);
}


var x = [];
var y = [];

function down(e) {
  for(i = 0; i < e.targetTouches.length; i++)
  {
    x[e.targetTouches[i].identifier] = e.targetTouches[i].clientX;
    y[e.targetTouches[i].identifier] = e.targetTouches[i].clientY;
  }
}
function move(e) {
  for(i = 0; i < e.targetTouches.length; i++)
  {
    var id = e.targetTouches[i].identifier;
    var newx = e.targetTouches[i].clientX;
    var newy = e.targetTouches[i].clientY;
    
    var dx = x[id] - newx;
    var dy = y[id] - newy;
    
    
    var length = Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2));
    if(length > 125)
    {
      console.log(length);
      var midx = x[id] + (newx - x[id])/2;
      var midy = y[id] + (newy - y[id])/2;
      var width = length / 20;
      var controlx = -1 * width * dy / length;
      var controly = width * dx / length;
      
      context.beginPath();
      context.moveTo(x[id], y[id]);
      context.quadraticCurveTo(midx + controlx, midy + controly, newx, newy);
      context.quadraticCurveTo(midx - controlx, midy - controly, x[id], y[id]);
      context.stroke();
      context.fill()
      
      x[id] = newx;
      y[id] = newy;
    }
    
  }
}