/*-------------------------------------------------------------------------------------------------
  This plugin is based on the GAPJUMPER line example http://www.gapjumper.com/research/lines.html.
  Special thanks to its author!
  Author: Tiago do Bem
  Date: March 2013
  URL: https://github.com/tbem/jquery.line
  The jQuery.line.js plugin is distributed under the GNU General Public License version 3 (GPLv3).
  -------------------------------------------------------------------------------------------------
*/

(function($) {

  var helpers = {
    createLine: function(x1, y1, x2, y2, options){

                  // Check if browser is Internet Exploder ;)
                  var isIE = navigator.userAgent.indexOf("MSIE") > -1;
                  if (x2 < x1){
                    var temp = x1;
                    x1 = x2;
                    x2 = temp;
                    temp = y1;
                    y1 = y2;
                    y2 = temp;
                  }
                  var line = document.createElement("div");

                  // Formula for the distance between two points
                  // http://www.mathopenref.com/coorddist.html
                  var length = Math.sqrt((x1-x2)*(x1-x2) + (y1-y2)*(y1-y2));

                  line.style.width = length + "px";
                  line.style.borderBottom = options.stroke + "px " + options.style;
                  line.style.borderColor = options.color;
                  line.style.position = "absolute";
                  line.style.zIndex = options.zindex;

                  if(isIE){
                    line.style.top = (y2 > y1) ? y1 + "px" : y2 + "px";
                    line.style.left = x1 + "px";
                    var nCos = (x2-x1)/length;
                    var nSin = (y2-y1)/length;
                    line.style.filter = "progid:DXImageTransform.Microsoft.Matrix(sizingMethod='auto expand', M11=" + nCos + ", M12=" + -1*nSin + ", M21=" + nSin + ", M22=" + nCos + ")";
                  }else{
                    var angle = Math.atan((y2-y1)/(x2-x1));
                    line.style.top = y1 + 0.5*length*Math.sin(angle) + "px";
                    line.style.left = x1 - 0.5*length*(1 - Math.cos(angle)) + "px";
                    line.style.transform = line.style.MozTransform = line.style.WebkitTransform = line.style.msTransform = line.style.OTransform= "rotate(" + angle + "rad)";
                  }
                  return line;
                }
  }


  $.fn.line = function( element1, element2, options, callbacks) {


      var x1offset = element1.offset();
      var x2offset = element2.offset();

      var x1width = element1.width();
      var x1height = element1.height();

      var x2width = element2.width();
      var x2height = element2.height();

      var x1 = x1offset.left + x1width;
      var y1 = x1offset.top + x1height /2;

      var x2 = x2offset.left ;
      var y2 = x2offset.top + x2height /2;

      return $(this).each(function(){
        if($.isFunction(options)){
            callback = options;
            options = null;
        }else{
          callback = callbacks;
        }
        options = $.extend({}, $.fn.line.defaults, options);

        $(this).append(helpers.createLine(x1,y1,x2,y2,options)).promise().done(function(){
          if($.isFunction(callback)){
            callback.call();
          }
        });


    });
  };
  $.fn.line.defaults = {  zindex : 10000,
                          color : '#000000',
                          stroke: "1",
                          style: "solid",
                        };
})(jQuery);
