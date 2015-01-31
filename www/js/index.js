var canvas;
var context;

var app = {
  // Setting up stuff. Not sure how it really works though
  initialize: function() {
    this.bindEvents();
  },
  bindEvents: function() {
    document.addEventListener('deviceready', this.onDeviceReady, false);
  },
  onDeviceReady: function() {
    
    // Touch events to be registered
    document.body.ontouchstart = down;
    document.body.ontouchmove = move;
    
    // Fill entire screen with canvas
    canvas = $('canvas');
    canvas.height = window.screen.availHeight;
    canvas.width = window.screen.availWidth;
    
    // Change background to white, to know the app is ready
    document.body.style.backgroundColor = '#FFFFFF';
    
    // Nice read colors and such
    context = canvas.getContext('2d');
    context.strokeStyle="#FF0000";
    context.fillStyle="#FF0000";
    
    // Anti-aliasing
    context.translate(0.5, 0.5);
  }
};

// Shorthand
function $(id) {
   return document.getElementById(id);
}

// Array of coordinates, indexed by the touchevent identifier.
var x = [];
var y = [];

// Register initial positions
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
    
    // Minimum cut length, because the original also has that
    if(length > 125)
    {
      
      // Makes 2 quadratic bezier curves between the endpoints, and color the area red
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
      
      // Remember endpoint for next line
      x[id] = newx;
      y[id] = newy;
    }
    
  }
}