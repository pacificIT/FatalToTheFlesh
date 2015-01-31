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
    
    if(Math.pow(x[id] - newx, 2) + Math.pow(y[id] - newy, 2) > 8100)
    {
      console.log(Math.pow(x[id] - newx, 2) + Math.pow(y[id] - newy, 2));
      context.moveTo(x[id], y[id]);
      context.lineTo(newx, newy);
      context.stroke();
      
      x[id] = newx;
      y[id] = newy;
    }
    
  }
}