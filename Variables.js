"use strict"

var AnimButtons = [];
var LampButtons = [];
var MenuButtons = [];

var InfoBlock;

var AnimButtonIsShow = false;
var LampButtonIsShow = false;
var InfoBlockIsShow = false;

var AirplaneScrewLaunched = false;
var AnimLogic;

var LampEnable =  [true, true, true];

var Colors = {
	white: 0,
	red: 1,
	blue: 2
}

var curTime = 0;
var RefreshRate = 20;

//Animation
function CocpitAnim() 
{//[x, y, z, s, qx, qy, qz, qw]
	var TSRFirst = [0, 0, 0, 1, 0, 0, 0, 1];
	var TSRSecond = [0, 0, 0, 1, -0.383, 0, 0, 0.924];
	var startPos;
	var endPos;
	var bone = "CockpitBone";
	var animTime = 1000;
	var step = 0;
	var interpolatedValue = 0;
	var CocpitIsOpen = false;

	var PlayAnimation = function () 
	{
		interpolatedValue += step;
		if(interpolatedValue <= 1)
			setTimeout(PlayAnimation, RefreshRate);
		else
		{
			CocpitIsOpen = !CocpitIsOpen;

			ShowHideElements(AnimButtons, true);
			AnimButtonIsShow = true;
		}

		RotateBone(startPos, endPos, Math.max(Math.min(interpolatedValue, 1), 0), bone);
	};
	
	this.StartAnimation = function () 
	{
		interpolatedValue = 0;
		step = 1 / (animTime / RefreshRate);

		if(CocpitIsOpen)
		{
			startPos = TSRSecond;
			endPos = TSRFirst;
		}
		else
		{
			startPos = TSRFirst;
			endPos = TSRSecond;
		}

		RotateBone(startPos, endPos, interpolatedValue, bone);
		setTimeout(PlayAnimation, RefreshRate);

		ShowHideElements(AnimButtons, false);
		AnimButtonIsShow = false;		
	};	
}
var CocpitAnimData = new CocpitAnim();

function AirplainScrewAnim() 
{//[x, y, z, s, qx, qy, qz, qw]
	var TSR = [[0, 0, 0, 1, 0, 0, 0, 1],
			   [0, 0, 0, 1, 0, -0.707, 0, 0.707],
			   [0, 0, 0, 1, 0, -1, 0, 0],
			   [0, 0, 0, 1, 0, -0.707, 0, -0.707],
			   [0, 0, 0, 1, 0, 0, 0, 1]];
	var TSRIndex = 1;
	var startPos;
	var endPos;
	var bone = "AirplaneScewBone";
	var animTime = 1000;
	var animTimeMax = 1000;
	var animTimeMin = 50;
	var animSpeedChange = 200 * (RefreshRate / 1000);
	var step = 1 / (animTime / RefreshRate);
	var interpolatedValue = 0;
	var AnimType = {
		starting: 0,
		stopping: 1,
	};
	var curAnimType = AnimType.stopping;

	var PlayAnimation = function () 
	{
		console.log("animTime = " + animTime);
		switch (curAnimType) {
			case AnimType.starting:
			animTime = Math.max(animTime - animSpeedChange, animTimeMin);
				break;
			case AnimType.stopping:
			animTime = Math.min(animTime + animSpeedChange, animTimeMax);
			break;
		}
		step = 1 / (animTime / RefreshRate);
		interpolatedValue += step;
		
		if(interpolatedValue >= 1)
		{
			interpolatedValue = 0;
			TSRIndex++;
			if(TSRIndex == 5)
				TSRIndex = 1;

			startPos = TSR[TSRIndex - 1];
			endPos = TSR[TSRIndex];
		}

		if(!(curAnimType === AnimType.stopping && animTime === animTimeMax && interpolatedValue === 0 && TSRIndex === 1))
		setTimeout(PlayAnimation, RefreshRate);

		RotateBone(startPos, endPos, Math.max(Math.min(interpolatedValue, 1), 0), bone);
	};

	this.StartStopAnimation = function () 
	{
		interpolatedValue = 0;
		switch (curAnimType) {
			case AnimType.starting:
			curAnimType = AnimType.stopping;
				break;
			case AnimType.stopping:
			curAnimType = AnimType.starting;

			if(!startPos && !endPos)
			{
				startPos = TSR[0];
				endPos = TSR[1];
			}
			RotateBone(startPos, endPos, interpolatedValue, bone);
			setTimeout(PlayAnimation, RefreshRate);
				break;
		}
	};	
}
var AirplainScrewAnimation = new AirplainScrewAnim();

//Functions
var OnOffLamp;
var RotateBone;