"use strict"

$(document).ready(function() {
	
	InitAll();
    HideAll();

	addLampLogic();

	$("#MenuAnimationButton").click(function() {
		if(AnimButtonIsShow)
			AnimButtons.forEach(function(element) {element.hide(300);});
		else
			AnimButtons.forEach(function(element) {element.show(300);});
		AnimButtonIsShow = !AnimButtonIsShow;
	});

	$("#MenuLampButton").click(function() {
		if(LampButtonIsShow)
			LampButtons.forEach(function(element) {element.hide(300);});
		else
			LampButtons.forEach(function(element) {element.show(300);});
		LampButtonIsShow = !LampButtonIsShow;
	});
});

function InitAll() 
{
    var i = 0;
    AnimButtons[i++] = $('#AnimButton_AirplaneScrew');
    AnimButtons[i++] = $('#AnimButton_Cockpit');

    i = 0;
    MenuButtons[i++] = $('#MenuAnimationButton');
    MenuButtons[i++] = $('#MenuLampButton');

    i = 0;
    LampButtons[i++] = $('#LampButton_White');
    LampButtons[i++] = $('#LampButton_Red');
    LampButtons[i++] = $('#LampButton_Blue');
}

function HideAll() 
{
    AnimButtons.forEach(function(element) {element.hide();});
    MenuButtons.forEach(function(element) {element.hide();});
    LampButtons.forEach(function(element) {element.hide();});
}

function addLampLogic()
{
	function addLogic(colorNum, postfix) {
		LampButtons[colorNum].click(function () {
			OnOffLamp(colorNum, LampEnable[colorNum]);
			if(LampEnable[colorNum])
			{
				LampButtons[colorNum].removeClass('BGLampActive' + postfix);
				LampButtons[colorNum].addClass('BGLampDisable' + postfix);
			}
			else
			{
				LampButtons[colorNum].removeClass('BGLampDisable' + postfix);
				LampButtons[colorNum].addClass('BGLampActive' + postfix);
			}
			LampEnable[colorNum] = !LampEnable[colorNum];
		});
	}

	addLogic(Colors.white, '');
	addLogic(Colors.red, 'Red');
	addLogic(Colors.blue, 'Blue');	
}

var ShowIUFunc = function()
{
	 MenuButtons.forEach(function(element) {element.show(500);});
}
