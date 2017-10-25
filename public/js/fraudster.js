var arrPos = [];
//69:she is not
//79:he is not
//88:she is!
const SHE_IS_NOT = "sheisnot";
const HE_IS_NOT = "heisnot";
const GO_TO_END = "gotoend";

var glblAction = "";
var glblPos = "-1";
var glblTime;
var vidAudio;
var isMuted = false;
var didLocteFraudster = false;
var isPaused = false;
var noActionTaken = false;
var isFrausterFound = false;
$( document ).ready(function() {
	scaleSizes();
	
	arrPos.push(17);//0 first fraud buttons
	arrPos.push(25.08);//1 first guy show
	arrPos.push(27.6);//2 fraud buttons
	arrPos.push(36.15);//3 real fraudster
	arrPos.push(38.9);//4 fraud buttons
	arrPos.push(47.15);//5 second guy
	arrPos.push(50.29);//6 fraud buttons
	arrPos.push(58.15);//7 second girl
	arrPos.push(61.2);//8 fraud buttons
	arrPos.push(69.1);//9 she is not
	arrPos.push(78.4);//10 he is not
	arrPos.push(87.9);//11 you failed
	arrPos.push(96.6);//12 pause the game
	//arrPos.push(97.1);//13 show real fraudster
	arrPos.push(98.5);//13 show buttons
	arrPos.push(14.1);//14 hide skip
	arrPos.push(77);//15 end after she
	arrPos.push(86);//16 end after he
	arrPos.push(70.1);//17 she is not button
	arrPos.push(78.6);/18 he is not buttons
	arrPos.push(88.1);/19 you failed btns
	
	//vidAudio = new Audio('audio/bgsound.mp3');
	//vidAudio.setAttribute("id", "audio1");
	vidAudio = document.getElementById('audio1');	
	var vid = document.getElementById("vid1");
	if (isAndroid()){
		vid.muted = false;
		$( "#btnMute" ).click(function() {
			if (isMuted){
				isMuted = false;
				vid.muted = false;
				$( "#btnMute" ).attr("src","img/mute.png");
			}
			else{
				isMuted = true;
				vid.muted = true;
				$( "#btnMute" ).attr("src","img/un-mute.png");
			}
		});
	}
	else {
		$( "#btnMute" ).click(function() {
			if (isMuted){
				$("#audio1").animate({volume: 0.7}, 0);
				isMuted = false;
				$( "#btnMute" ).attr("src","img/mute.png");
			}
			else{
				$("#audio1").animate({volume: 0.0}, 0);
				isMuted = true;
				$( "#btnMute" ).attr("src","img/un-mute.png");
			}
		});
	}
	
	$( "#btnPlay" ).click(function() {
		var vid = document.getElementById("vid1");
		//vid.currentTime = 15;
		vid.play();
		$( "#btnPlay" ).hide();
		$( "#btnMute" ).show();
		$( "#btnPause" ).show();
		$( "#btnSkip" ).show();
	});
	
	
	$( "#btnPause" ).click(function() {
		var vid = document.getElementById("vid1");
		if (isPaused){
			$( "#btnPause" ).attr("src","img/pause_btn.png");
			isPaused = false;			
			vid.play();
		}
		else {
			$( "#btnPause" ).attr("src","img/play_btn.png");
			isPaused = true;			
			vid.pause();
		}
		
	});
	
	$( "#btnSkip" ).click(function() {
		skipTheGuide();
	});
	
	
	$( "#btnWhy" ).click(function() {
		goToEnd();
	});
	
	$( "#btnHow" ).click(function() {
		learnMore();
	});
	
	$( "#btnLearn" ).click(function() {
		learnMore();
	});

	$( "#btnAgain" ).click(function() {
		restartGame();
	});

	$( "#btnAgainSmall" ).click(function() {
		restartGame();
	});

	
	if (!isAndroid()){
		vid.onplay = function() {
			vidAudio.play();
		};
	
		vid.onpause = function() {
			var vid = document.getElementById("vid1");
			if (vid.currentTime > (vid.duration - 0.2)){
				
				fadeOutAudio();
				$("#btnMute").hide();
			}
			//else if ((glblAction == SHE_IS_NOT) || (glblAction == SHE_IS_NOT)) {
			else if (noActionTaken){
				fadeOutAudio();
			}
			else {
				vidAudio.pause();
			}
		};
	}
	
	vid.addEventListener("timeupdate", function(){
		for (i = 0;i < arrPos.length; i++) { 
			//console.log(parseInt(this.currentTime) + " == " + arrPos[i]);
			var newVal = (this.currentTime.toFixed(1) - arrPos[i]);
		//	console.log(newVal);
			if ((newVal > -0.3) && (newVal < 0.8) ) {
				if (i != glblPos){
					glblPos = i;
					vidAction(i);				
				}
			}
		}
	}); 
});
  
function fadeOutAudio(){
	$("#audio1").animate({volume: 0.0}, 2700);  
}

function vidAction(actionId){
	hideAll();
	clearTimeout(glblTime);
	if (actionId == 0){
		setBtnLocation("39", "11", "22.8");
		$( "#btnTrue" ).click(function() {
			var nextPos = arrPos[1];
			goToPos(nextPos);
			//correctAnswer();
			
		});
				
		$( "#btnFraud" ).click(function() {
			wrongAnswer("female");
		});		
		
	}
	else if (actionId == 2){		
		setBtnLocation("41", "58", "69.8");
		$( "#btnTrue" ).click(function() {
			//correctAnswer();
			
			var nextPos = arrPos[3];
			goToPos(nextPos);
		});

		$( "#btnFraud" ).click(function() {
			wrongAnswer("male");
		});			
		
	}
	else if (actionId == 4){
		//the real fraudster
		setBtnLocation("41", "13", "25.1");		
		$( "#btnTrue" ).click(function() {
			//goTofinalFrame();
			
			var nextPos = arrPos[5];
			goToPos(nextPos);

		});

		$( "#btnFraud" ).click(function() {
			//var nextPos = arrPos[5];
			//goToPos(nextPos);
			
			//didLocteFraudster = true;
			isFrausterFound = true;
			goToEnd();
		});			
	}
	else if (actionId == 6){		
		setBtnLocation("41", "54", "65.8");
		$( "#btnTrue" ).click(function() {
			var nextPos = arrPos[7];
			goToPos(nextPos);
		});

		$( "#btnFraud" ).click(function() {
			wrongAnswer("male");
		});			
		
	}
	else if (actionId == 8){		
		setBtnLocation("72.3", "12", "24");
		$( "#btnTrue" ).click(function() {
			goTofinalFrame();
			//correctAnswer();
		});

		$( "#btnFraud" ).click(function() {
			wrongAnswer("female");
		});			
		
	}
	else if (actionId == 9){
		//she is not msg
		console.log("9:" + glblAction);
		if (glblAction == ""){
			goTofinalFrame();			
		}
		else {
			//showAgainButtins();
		}
	}
	else if (actionId == 10){
		//he is not msg
		console.log("10:" + glblAction);
		if (glblAction == ""){
			goTofinalFrame();			
		}
		else if (glblAction == SHE_IS_NOT){
			goTofinalFrame();			
		}
		else {
			//showAgainButtins();
		}
	}
	else if (actionId == 11){
		//showAgainButtins();	
	}	
	else if (actionId == 12){
		console.log("actoin 12");
		if (glblAction != GO_TO_END){
			//showAgainButtins();	
			pauseBeforeEnd();

		}
	}
	else if (actionId == 13){
		if (glblAction == GO_TO_END){
			console.log("actoin 13 inside");
			hideAll();
			$("#btnHow").css("top","74%");
			$("#btnHow").css("left","8%");
			$("#btnHow").show();
			
			$("#btnAgainSmall").css("top","74%");
			$("#btnAgainSmall").css("left","22%");
			$("#btnAgainSmall").show();					
		}
	}
	else if (actionId == 14){
		//hide skip button
		$("#btnSkip").hide();	
	}	
	else if (actionId == 15){
		//end after she is not
		pauseBeforeEnd();
	}	
	else if (actionId == 16){
		//end after she is not
		pauseBeforeEnd();
	}	
	else if (actionId == 17){
		showAgainButtins();
	}	
	else if (actionId == 18){
		showAgainButtins();
	}	
	else if (actionId == 19){
		showAgainButtins();
	}	
				
	 
 }
 
 function pauseBeforeEnd(){
	var vid = document.getElementById("vid1");
	vid.pause();		
	$("#btnPause").hide();
	$("#btnMute").hide();
	
	showAgainButtins();	
	fadeOutAudio();
	noActionTaken = true;
	 
 }
 
 function hideAll(){
	 $(".btnVid").hide();
 }
 
 function wrongAnswer(gender){
	console.log("inside wrong");
	if (gender == "male"){
		var nextPoint = arrPos[10];
		glblAction = HE_IS_NOT;
	}
	else {
		var nextPoint = arrPos[9];
		glblAction = SHE_IS_NOT;
	}
	
	var vid = document.getElementById("vid1");
	vid.pause();
	vid.currentTime = nextPoint;
	vid.play();
	 
 }
 
 function goTofinalFrame(){
 	var nextPos = arrPos[11];
	goToPos(nextPos);
 }
 
function goToEnd(){
	 
	hideAll();
	console.log("btnwhy");
	glblAction = GO_TO_END;
	 
	console.log("dotoend");
 	var nextPos = 97.11;
	goToPos(nextPos);
	console.log("after dotoend");
	$( "#btnPause" ).show();
	$( "#btnMute" ).show();
	
	if (!isAndroid()){
		console.log("..356");
		if (!isFrausterFound){
			console.log("..358");
			if (!isMuted){
				console.log("..360");
				vidAudio = document.getElementById('audio1');	
				if (vidAudio.volume == 0.0){
					$("#audio1").animate({volume: 0.7}, 0,
					function() {
						vidAudio = document.getElementById('audio1');	
						vidAudio.pause();
						vidAudio.currentTime = 15;
						vidAudio.play();
					});
			}
			}
		}
	}
	
	
}
  
function correctAnswer(){
	hideAll();
 }
 
  
function getVid(){
	return vid;
}
 
function showAgainButtins(){
	$("#btnAgain").css("top","49%");
	$("#btnAgain").css("left","26%");
	$("#btnAgain").show();
	
	$("#btnWhy").css("top","49%");
	$("#btnWhy").css("left","53%");
	$("#btnWhy").show();
	 
}

function goToPos(newPos){
	var vid = document.getElementById("vid1");
	vid.pause();
	vid.currentTime = newPos;
	vid.play();
	
	
}

function setBtnLocation(btnTop, btnTrue, btnFraud){
	$("#btnTrue").unbind( "click" );
	$("#btnFraud").unbind( "click" );
	
	$("#btnTrue").css("top",btnTop + "%");
	$("#btnTrue").css("left",btnTrue + "%");
	
	$("#btnFraud").css("top",btnTop + "%");
	$("#btnFraud").css("left",btnFraud + "%");
	
	//clearTimeout(glblTime);
	//glblTime = setTimeout("showButtons();", 2500);
	showButtons();
	
}

function showButtons(){
	
	//$("#btnFraud").fadeIn(400);
	$("#btnTrue").effect( "bounce", {times:3}, 0 );
//	$("#btnTrue").effect( "bounce", {times:3}, 0 );
	clearTimeout(glblTime);
	glblTime = setTimeout('$("#btnFraud").effect( "bounce", {times:3}, 0 );', 400);

}

function learnMore(){
	hideAll();
	location.href = "https://www.ibm.com/us-en/marketplace/trusteer-new-account-fraud";	
}

function restartGame(){
	glblPos = "-1";
	hideAll();
	didLocteFraudster = false;
	noActionTaken = false;
	isFrausterFound = false;
	$("#btnMute").show();
	$( "#btnSkip" ).show();
	
	var restartPos = 9;
	$( "#btnPause" ).show();
	if (!isAndroid()){
		vidAudio.pause();
		vidAudio.currentTime = restartPos;
		if  (!isMuted){
			$("#audio1").animate({volume: 0.7}, 0);
		}
	}
	
	goToPos(restartPos);
	glblAction = "";
}

function scaleSizes(){
	var wWidth = $( window ).width();
	var wHeight = $( window ).height();
	
	var wr = wWidth / 1330 ;
	console.log("wr:" + wr);
	
	var vidW = 720;
	if (wHeight > wWidth){
		$("#dvVid").width( wWidth);	
		var vidRatio = wWidth / 500;
	}
	else {		
		$("#dvVid").width( parseInt(vidW * wr));	
		var vidRatio = 1;
	}
	
	var btnFraudHeight = parseInt(vidW / 27.27);
	var btnAgainHeight = parseInt(vidW / 18.75);
	var btnHowHeight = parseInt(vidW / 25);

	$("#dvLogo").css("padding-top", parseInt(11 * wr) + "px");
	$("#dvLogo").css("padding-bottom", parseInt(8 * wr) + "px");
	$("#dvLogo").css("padding-left", parseInt(30 * wr * vidRatio) + "px");
	$("#dvLogo img").height( parseInt(20 * wr * vidRatio));
	
	$("#dvTopHdr").height( parseInt(127 * wr  * vidRatio ));	
	
	$("#dvHdrTitle1").css("padding-top", parseInt(30 * wr * vidRatio) + "px");
	$("#dvHdrTitle1").css("padding-left", parseInt(30 * wr * vidRatio) + "px");
	$("#dvHdrTitle1").css("font-size", parseInt(22 * wr * vidRatio) + "px");

	$("#dvHdrTitle2").css("padding-top", parseInt(10 * wr * vidRatio) + "px");
	$("#dvHdrTitle2").css("padding-left", parseInt(30 * wr * vidRatio) + "px");
	$("#dvHdrTitle2").css("font-size", parseInt(18 * wr * vidRatio) + "px");
	
//	$("#dvContent").css("padding-top", parseInt(15 * wr * vidRatio) + "px");
	$("#dvContent").css("line-height", parseInt(25 * wr * vidRatio) + "px");
	$("#dvContent").css("font-size", parseInt(18 * wr * vidRatio) + "px");
	
	
	$("#vid1").css("margin-top", parseInt(15 * wr * vidRatio) + "px");
	
	$("#btnLearn").css("padding", parseInt(5 * wr * vidRatio) + "px");
	$("#btnLearn").css("margin-top", parseInt(7 * wr * vidRatio) + "px");
	$("#btnLearn").css("margin-bottom", parseInt(15 * wr * vidRatio) + "px");
	$("#btnLearn").css("font-size", parseInt(20 * wr * vidRatio) + "px");
	
	$("#btnTrue, #btnFraud").height(parseInt(btnFraudHeight * vidRatio * wr));
	$("#btnAgain, #btnWhy").height(parseInt(btnAgainHeight * vidRatio * wr));
	$("#btnHow, #btnAgainSmall").height(parseInt(btnHowHeight * vidRatio * wr));
	
//	$("#btnMute, #btnPause, #btnSkip").height(parseInt(28 * vidRatio * wr));
	$(".btnVidAction").height(parseInt(28 * vidRatio * wr));
	
	
	
	console.log("wWidth:" +wWidth);
	
	
	
	
	
}

function isAndroid(){
	var ua = navigator.userAgent.toLowerCase();
	var isAndroid = ua.indexOf("android") > -1; //&& ua.indexOf("mobile");
	if(isAndroid) {
		return true;
	}
	else {
		return false;
	}
}

function skipTheGuide(){
	goToPos(14.6);
	$("#btnSkip").hide();
}