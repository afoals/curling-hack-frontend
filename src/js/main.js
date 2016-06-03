var ran = function(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

var Confetti = {
  active: false,
  amount: 10,
  colors: ['#FF8E70', '#C76DFC', '#4192F6', '#77DDA8', '#F8E71C'],
  newPiece: function() {
    var n = document.createElement('div');
    n.style.width = 10+'px';
    n.style.height = 14+'px';
    n.style.position = 'absolute';
    n.style.left = 0;
    n.style.right = 0;
    n.style.margin = '0 auto';
    n.style.opacity = 0;
    n.style.pointerEvents = 'none';
    n.style.backgroundColor = this.colors[ran(0, 4)];
    return n;
  },
  render: function(event) {
      var el = document.getElementsByClassName('confettibox')[0];
      var c = Confetti.newPiece();
      var s = Confetti.size;
      var degs = 0;
      var x = 0;
      var y = 0;
      var opacity = 0;
      var count = 0;
      var xfactor;
      var yfactor = ran(10,40)*(10);
      if(ran(0,1) === 1) {
         xfactor = ran(5,40)*(10);
         c.style.left = '-30px';
      }
      else {
         xfactor = ran(-5,-40)*(10);
         c.style.left = '30px';
      }
      var start = null;
      el.appendChild(c);
      var animate = function(timestamp){
        if (!start) {start = timestamp;}
        var progress = timestamp - start;
        if(progress < 2000) {
          window.requestAnimationFrame(animate);
        }
        else {
          el.removeChild(c);
        }
        c.style.opacity = opacity;
        c.style.webkitTransform = 'translate3d('+Math.cos(Math.PI / 36 * x)*xfactor+'px, '+Math.cos(Math.PI / 18 * y)*yfactor+'px, 0) rotateZ('+degs+'deg) rotateY('+degs+'deg)';
        degs += 15;
        x += 0.5;
        y += 0.5;
        if(count > 25) {
          opacity -= 0.1;
        }
        else {
          opacity += 0.1;
        }
        count++;
      };
      window.requestAnimationFrame(animate);
  },
  fire: function(event) { epilepsy(event) },
  bindEvents: function() {
    var elements = document.querySelectorAll(this.element);
    for (var i = 0; i < elements.length; i++ ) {
      elements[i].onclick = Confetti.fire;
    }
  },
  init: function(el, amt, size) {
    this.element = el;
    this.amount = amt;
    this.size = size;
    this.bindEvents();
  }
};

function epilepsy (event) {
  var count = 0;
  var launch = setInterval(function() {
    if(count < Confetti.amount){
      Confetti.render(event);
      count++;
    }
    else {
      clearTimeout(launch);
    }
  }, 32);
  Confetti.active = true;
    // if(event.target.classList.length === 1) {
    //   event.target.classList.add('checked');
    //   var count = 0;
    //   var launch = setInterval(function() {
    //     if(count < Confetti.amount){
    //       Confetti.render(event);
    //       count++;
    //     }
    //     else {
    //       clearTimeout(launch);
    //     }
    //   }, 32);
    //   Confetti.active = true;
    // }
    // else {
    //   event.target.classList.remove('checked');
    //   Confetti.active = false;
    // }
  }

Confetti.init('.checkbox', 20000000, 1);
epilepsy();

