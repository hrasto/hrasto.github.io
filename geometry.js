(function(window){

    'use strict';

    function define_library(){
        var Library = {};
        var name = "Geometry";

        Library.greet = function(){
            alert("Hello from the " + name + " library.");
        }

        Library.octagon = function(element){

            if(typeof(element) !== 'object')
                element = document.querySelector(element);
            if(typeof(element) !== 'object')
                throw "invalid element or element selector specified";

            var e = parseInt(element.dataset.edge);
            var w = parseInt(element.dataset.width);

            if(typeof(e) !== 'undefined' && typeof(w) !== 'undefined'){
                if(true || w > e*(1+Math.SQRT2) ){
                    element.style.width = w;
                    element.style.height = w;

                    var A,B,C,D,E,F,AB,BF,BC,l;
                    l = e / Math.SQRT2;
                    BC = (w - e) / 2;
                    BF = BC - l;
                    AB = BC;

                    A = {x:BF+AB, y:0};
                    B = {x:BF, y:0};
                    C = {x:BF, y:BF + l};
                    D = {x:BF, y:BF + l + e};
                    E = {x:0, y:w-BF-AB};
                    F = {x:0, y:0};

                    var polygonT = [F,E,D,B];
                    var polygonS = [B,C,A];

                    if(element.children.length === 8){

                        //for(var i = 0; i < 8; ++i){
                            element.children[0].setAttributeNS(null, "points", Library.stringifyPoints(polygonT));
                            element.children[1].setAttributeNS(null, "points", Library.stringifyPoints(Library.rotatePoints(polygonT, -Math.PI/2, w/2)));
                            element.children[2].setAttributeNS(null, "points", Library.stringifyPoints(Library.rotatePoints(polygonT, -Math.PI, w/2)));
                            element.children[3].setAttributeNS(null, "points", Library.stringifyPoints(Library.rotatePoints(polygonT, -3*Math.PI/2, w/2)));

                            element.children[4].setAttributeNS(null, "points", Library.stringifyPoints(polygonS));
                            element.children[5].setAttributeNS(null, "points", Library.stringifyPoints(Library.rotatePoints(polygonS, -Math.PI/2, w/2)));
                            element.children[6].setAttributeNS(null, "points", Library.stringifyPoints(Library.rotatePoints(polygonS, -Math.PI, w/2)));
                            element.children[7].setAttributeNS(null, "points", Library.stringifyPoints(Library.rotatePoints(polygonS, -3*Math.PI/2, w/2)));
                        //}

                    }else{
                        Library.drawPolygon(element, polygonT, "#222");
                        Library.drawPolygon(element, Library.rotatePoints(polygonT, -Math.PI/2, w/2), "#222");
                        Library.drawPolygon(element, Library.rotatePoints(polygonT, -Math.PI, w/2), "#222");
                        Library.drawPolygon(element, Library.rotatePoints(polygonT, -3*Math.PI/2, w/2), "#222");

                        Library.drawPolygon(element, polygonS, "#555");
                        Library.drawPolygon(element, Library.rotatePoints(polygonS, -Math.PI/2, w/2),"#555");
                        Library.drawPolygon(element, Library.rotatePoints(polygonS, -Math.PI, w/2), "#555");
                        Library.drawPolygon(element, Library.rotatePoints(polygonS, -3*Math.PI/2, w/2), "#555");
                    }

                }else{
                    console.log('data-width must be greater than data-edge*(1+sqrt(2))');
                }
            }else{
                console.log('data-width and data-edge must be defined');
            }
            return element;
        }

        Library.redrawOctagon = function(element, e){
            element.dataset.edge = e;
            Library.octagon(element);
        }

        Library.animate = function(element, e, time=600) {

            if(typeof(element) !== 'object')
                element = document.querySelector(element);
            var FPS = 150;
            var iterations = (time/1000) * FPS; // 100 fps
            var delay = time/iterations;

            var from = parseInt(element.dataset.edge);
            var span = e - from;
            var stepSize = span / iterations;

            var i = 1;
            var interval = setInterval(func, delay);

            function func(){
                if(i >= iterations)
                    clearInterval(interval);

                Library.redrawOctagon(element, from + Library.sigmoid(i+1, iterations)*span );
                ++i;
            }
        }

        Library.sigmoid = function(i, total){
            var x = -7 + ((i)/total)*20;

            return 1/(1+Math.exp(-0.5*x));
        }

        Library.stringifyPoints = function(points){
            var pointsStr = '';
            for(var i = 0; i < points.length; ++i){
                if(i > 0) pointsStr += ' ';
                pointsStr += points[i].x + ',' + points[i].y;
            }
            return pointsStr;
        }

        Library.drawPolygon = function(element, points, color){
            var pointsStr = Library.stringifyPoints(points);
            var svgns = "http://www.w3.org/2000/svg";
            var shape = document.createElementNS(svgns, "polygon");
            shape.setAttributeNS(null, "points", pointsStr);
            shape.setAttributeNS(null, "style", "fill:"+color);
            element.appendChild(shape);
        }

        Library.rotatePoint = function(point, angle, offset = 0){
            var transformedPoint = {};
            var normalizedPoint = {x:point.x - offset, y:offset - point.y};

            transformedPoint.x = Math.cos(angle) * normalizedPoint.x - Math.sin(angle) * normalizedPoint.y;
            transformedPoint.y = Math.sin(angle) * normalizedPoint.x + Math.cos(angle) * normalizedPoint.y;
            transformedPoint.x += offset;
            transformedPoint.y = offset - transformedPoint.y;

            return transformedPoint;
        }

        Library.rotatePoints = function(points, angle, offset = 0){
            var newPoints = [];
            for(var i = 0; i < points.length; ++i)
                newPoints.push(Library.rotatePoint(points[i], angle, offset));

            return newPoints;
        }

        return Library;
    }

    //define globally if it doesn't already exist
    if(typeof(Geometry) === 'undefined'){
        window.Geometry = define_library();
    }else{
        console.log("Geometry already defined.");
    }

})(window);

var els = document.getElementsByClassName("octagon-box");

[].forEach.call(els, Geometry.octagon);
