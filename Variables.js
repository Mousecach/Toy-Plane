"use strict"

var AnimButtons = [];
var LampButtons = [];
var MenuButtons = [];

var InfoBlock;

var AnimButtonIsShow = false;
var LampButtonIsShow = false;
var InfoBlockIsShow = false;

var CocpitOpen = { value: false };
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
var interpolatedValue = 0;
var step = 0;

function AnimData(_data, _inverce = false) 
{
	return {
		startPos: _inverce ? _data.endPos: _data.startPos,
		endPos:  _inverce ? _data.startPos: _data.endPos,
		bone: _data.bone,
		animTime: _data.animTime
	};
}

//Animation
var AnimTemp;
var CocpitAnimData = 
{//[x, y, z, s, qx, qy, qz, qw]
	startPos: [0, 0, 0, 1, 0, 0, 0, 1],
	endPos: [0, 0, 0, 1, -0.383, 0, 0, 0.924],
	bone: "CockpitBone",
	animTime: 1000
}

//Functions
var OnOffLamp;
var RotateBone;