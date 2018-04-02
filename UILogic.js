"use strict"

$(document).ready(function() {
	
	InitAll();
    HideAll();

	addLampLogic();
	appendAnimPlay();

	appendClickArr($("#MenuAnimationButton"), AnimButtons, AnimButtonIsShow);
	appendClickArr($("#MenuLampButton"), LampButtons, LampButtonIsShow);
	appendClick($("#InfoButton"), InfoBlock, InfoBlockIsShow)

});

function appendAnimPlay() 
{
	$('#AnimButton_Cockpit').click(function() 
	{
		CocpitAnimData.StartAnimation();
	});
	$('#AnimButton_AirplaneScrew').click(function() 
	{
		AirplainScrewAnimation.StartStopAnimation();
	});
}

function appendClickArr (element, controlElement, logic)
{
	element.click(function() {
		if(logic)
			controlElement.forEach(function(element) {element.hide(300);});
		else
			controlElement.forEach(function(element) {element.show(300);});
		logic = !logic;
	});
}

function appendClick (element, controlElement, logic)
{
	element.click(function() {
		if(logic)
			controlElement.hide(300);
		else
			controlElement.show(300);
		logic = !logic;
	});
}

function InitAll() 
{
    var i = 0;
    AnimButtons[i++] = $('#AnimButton_AirplaneScrew');
    AnimButtons[i++] = $('#AnimButton_Cockpit');

    i = 0;
    MenuButtons[i++] = $('#MenuAnimationButton');
    MenuButtons[i++] = $('#MenuLampButton');
    MenuButtons[i++] = $('#InfoButton');

    i = 0;
    LampButtons[i++] = $('#LampButton_White');
    LampButtons[i++] = $('#LampButton_Red');
    LampButtons[i++] = $('#LampButton_Blue');

    InfoBlock = $('#InfoBlock');
}

function ShowHideElements(_element, isShow)
{
	if(isShow)
		_element.forEach(function(element) {element.show(300);});
	else
		_element.forEach(function(element) {element.hide(300);});
}

function HideAll() 
{
    AnimButtons.forEach(function(element) {element.hide();});
    MenuButtons.forEach(function(element) {element.hide();});
    LampButtons.forEach(function(element) {element.hide();});
    InfoBlock.hide();
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