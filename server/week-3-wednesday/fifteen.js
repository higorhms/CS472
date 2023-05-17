"use strict";

$(document).ready(function () {
    var count = 0;
    var arr = [];
    var EMPTY_SQUARE = {};
    EMPTY_SQUARE.leftx = "300px";
    EMPTY_SQUARE.toppx = "300px";

    $('#puzzlearea div').each(function (){
        var filledSquares = {};
        var x = ((count % 4) * 100);
        var y = (Math.floor(count / 4) * 100);
        $(this).addClass('puzzlepiece');
        var leftpx = x + 'px';
        var toppx = y + 'px';
        filledSquares.leftpx = leftpx;
        filledSquares.toppx = toppx;
        arr.push(filledSquares);
      
        $(this).css({"left": leftpx, "top": toppx, "backgroundImage": "url('images/background.jpg')", "backgroundPosition": -x + 'px ' + (-y) + 'px'});
        count++;
    });

    $('.puzzlepiece').click(function (){
        var changedleft = $(this).css("left");
        var changedtop = $(this).css("top");
        
        if (clickableleft(changedleft, changedtop)){
            $(this).css({"left": EMPTY_SQUARE.leftx, "top": EMPTY_SQUARE.toppx});
            EMPTY_SQUARE.leftx = changedleft;
            EMPTY_SQUARE.toppx = changedtop;
        } else if (clickableTop(changedleft, changedtop)){
            $(this).css({"left": EMPTY_SQUARE.leftx, "top": EMPTY_SQUARE.toppx});
            EMPTY_SQUARE.leftx = changedleft;
            EMPTY_SQUARE.toppx = changedtop;
        }
    });

    $('#shufflebutton').click(function () {
        var i = 0, j = 0, suff=0, temp = null;

        for (i = arr.length - 1; i > 0; i -= 1) {
            j = Math.floor(Math.random() * (i + 1));
            temp = arr[i];
            arr[i] = arr[j];
            arr[j] = temp;
        }

        $('#puzzlearea div').each(function () {
            $(this).css({"left": arr[suff].leftpx, "top": arr[suff].toppx});
            suff++;
        });

        suff = 0;
        EMPTY_SQUARE.leftx = "300px";
        EMPTY_SQUARE.toppx = "300px";
    });

    $('.puzzlepiece').hover(function () {
        var changedleft = $(this).css("left");
        var changedtop = $(this).css("top");

        if (clickableleft(changedleft, changedtop)){
            $(this).addClass('movablepiece');
        } else if (clickableTop(changedleft, changedtop)){
            $(this).addClass('movablepiece');
        }   
    }, function () {
        $(this).removeClass('movablepiece');
    });

    var clickableleft = function (changedleft, changedtop) {
        if (parseInt(changedtop) === parseInt(EMPTY_SQUARE.toppx)) {
           return parseInt(changedleft) + 100 === parseInt(EMPTY_SQUARE.leftx) || parseInt(changedleft) - 100 === parseInt(EMPTY_SQUARE.leftx) ? true : false;
        }
    };

    var clickableTop = function (changedleft, changedtop){
        if (parseInt(changedleft) === parseInt(EMPTY_SQUARE.leftx)){
            return parseInt(changedtop) + 100 === parseInt(EMPTY_SQUARE.toppx) || parseInt(changedtop) - 100 === parseInt(EMPTY_SQUARE.toppx) ? true : false;
        }
    };
});