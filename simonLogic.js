$(document).ready(function() {
    
    $("#instructions").trigger("click");
    var red = 1;
    var green = 2;
    var blue = 3;
    var yellow = 4;
    
    var clock = 100;
    var rounds = 10;
    
    $("#triangle-topleft").on("topLeft", function(){
        $("#triangle-topleft").css({"border-top":"100px solid red"});
    });

    $("#triangle-topright").on("topRight", function(){
        $("#triangle-topright").css({"border-top":"100px solid green"});
    });

    $("#triangle-bottomleft").on("bottomLeft", function(){
        $("#triangle-bottomleft").css({"border-bottom":"100px solid blue"});
    });

    $("#triangle-bottomright").on("bottomRight", function(){
        $("#triangle-bottomright").css({"border-bottom":"100px solid yellow"});
    });


    $("#triangle-topleft").mousedown(function(){
        $("#triangle-topleft").trigger("topLeft");
        var newPos = userChoices.push(red);
        verifyNumOfChoices();
    });

    $("#triangle-topright").mousedown(function(){
        $("#triangle-topright").trigger("topRight");
        userChoices.push(green);
        verifyNumOfChoices();
    });

    $("#triangle-bottomleft").mousedown(function(){
        $("#triangle-bottomleft").trigger("bottomLeft");
        userChoices.push(blue);
        verifyNumOfChoices();
    });

    $("#triangle-bottomright").mousedown(function(){
        $("#triangle-bottomright").trigger("bottomRight");
        userChoices.push(yellow);
        verifyNumOfChoices();
    });
    
    $(document).mouseup(function(){
        reset();
    });
    
    
    
    function getRandomNum() {
        return Math.floor(Math.random() * 4) +1;
    }
    
    function pushLight(lightColor) { 
        
        if(lightColor == red) {
                $("#triangle-topleft").trigger("topLeft");
            }

            if(lightColor == green) {
                $("#triangle-topright").trigger("topRight");
            }

            if(lightColor == blue) {
                $("#triangle-bottomleft").trigger("bottomLeft");
            }

            if(lightColor == yellow) {
                $("#triangle-bottomright").trigger("bottomRight");
            }
    }
    
    function reset() {
        $("#triangle-topleft").css({"border-top":"100px solid grey"});
        $("#triangle-topright").css({"border-top":"100px solid grey"});
        $("#triangle-bottomleft").css({"border-bottom":"100px solid grey"});
        $("#triangle-bottomright").css({"border-bottom":"100px solid grey"});
    }
    
    function setDelay(positionNum, timer) {
        
        setTimeout(function() {pushLight(simonChoices[positionNum])}, timer);
        setTimeout(function() {reset()}, timer + 500);
    }
    
    function gameStart() {
        
    }
    
    function resetGame() {
        simonChoices = [];
        userChoices = [];
        countdownClear();
        document.getElementById("countdownText").innerHTML = "Clock";
        $("button#begin").prop("disabled",false);
    }
    
    function verifyNumOfChoices() {
        if(userChoices.length == simonChoices.length) {
            verifyChoices();
            userChoices = [];
        }
    }
    
    function verifyChoices() {
        
        for(var i=0; i<userChoices.length; i++) {
            if(simonChoices[i] != userChoices[i]) {
                youLose();
                return;
            }
            if(userChoices.length == rounds) {
            youWin();
            return;
            }
        }
        
        simon();
    }
    
    function youLose() {
        gameOver("You Lose!");
        countdownClear();
        reset();
        resetGame();
    }
    
    function youWin() {
        gameOver("You Win!");
        countdownClear();
        reset();
        resetGame();
    }
    
    function gameOver(outcome) {
        document.getElementById("gameOver").innerHTML = outcome;
        $("div#triangle-topleft").animate({right: '450px', bottom: '50px'}, "slow");
        $("div#triangle-bottomleft").animate({right: '450px', top: '50px'}, "slow");
        $("div#triangle-topright").animate({left: '450px', bottom: '50px'}, "slow");
        $("div#triangle-bottomright").animate({left: '450px', top: '50px'}, "slow");
        
    }
    
    function resetCSS() {
        document.getElementById("gameOver").innerHTML = "";
        $("div#triangle-topleft").animate({right: '', bottom: ''}, "slow");
        $("div#triangle-bottomleft").animate({right: '', top:''}, "slow");
        $("div#triangle-topright").animate({left: '', bottom: ''}, "slow");
        $("div#triangle-bottomright").animate({left: '', top:''}, "slow");
    }
    
    var simonChoices = [];
    var userChoices = [];
    
    function simon() {
        
        var choice = getRandomNum();
        simonChoices.push(choice);
        var timer = 1000;
        
        for(var i = 0; i<simonChoices.length; i++) {
            setDelay(i, timer);            
            timer += 1000;
        }
    }
 
    
    var count;
    var counter;
    function timerInit() {
        count = clock;
        counter = setInterval(timer, 1000);
    }
    
    function timer() {
        document.getElementById("countdownText").innerHTML = count + " seconds";
        count--;
        timeCheck(count);
    }
    
    function timeCheck(count) {
        if (count < -1)
        {
            countdownClear();
             youLose();
             return;
          }
    }
    

	function countdownClear() {
		clearInterval(counter);
	}
    
       
    $("button#begin").click(function() {
        resetGame();
        simon();
        timerInit();
        $("button#begin").prop("disabled",true);
        });  
    
    $("button#reset").click(function() {
        resetGame();
        resetCSS();
    });
	
});