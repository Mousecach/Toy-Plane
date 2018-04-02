"use strict"

// register the application module
b4w.register("Toy-Plane_main", function(exports, require) {

// import modules used by the app
var m_app       = require("app");
var m_cfg       = require("config");
var m_data      = require("data");
var m_ver       = require("version");
var m_lights    = require("lights");
var m_tsr       = require("tsr");
var m_armat     = require("armature");
var m_scs       = require("scenes");

// detect application mode
var DEBUG = (m_ver.type() == "DEBUG");

// automatically detect assets path
var APP_ASSETS_PATH = m_cfg.get_assets_path("Toy-Plane");

// Custom vars
var ShowUI;
var Lamps;
var LampColor = {
    blue: 0,
    red: 1,
    white: 2
}
var Rig;
var tsr_tmp = new Float32Array(8);

var Preloader;

/**
 * export the method to initialize the app (called at the bottom of this file)
 */
exports.init = function() {
    m_app.init({
        canvas_container_id: "main_canvas_container",
        callback: init_cb,
        show_fps: DEBUG,
        console_verbose: DEBUG,
        autoresize: true
    });
}

/**
 * callback executed when the app is initialized 
 */
function init_cb(canvas_elem, success) {

    if (!success) {
        console.log("b4w init failure");
        return;
    }

    Preloader = document.getElementById("PreloaderContainer");
    Preloader.style.visibility = "visible";

    // ignore right-click on the canvas element
    canvas_elem.oncontextmenu = function(e) {
        e.preventDefault();
        e.stopPropagation();
        return false;
    };

    load();
}

/**
 * load the scene data
 */
function load() {
    m_data.load(APP_ASSETS_PATH + "Toy-Plane.json", load_cb, preloader_cb);
}

/**
 * update the app's preloader
 */
function preloader_cb(percentage) {
    var percantage_num = document.getElementById("PersentNumeric");
    percantage_num.innerHTML = percentage + "%";	 

    if (percentage == 100) {
        Preloader.style.visibility = "hidden";
        return;
    }
}

/**
 * callback executed when the scene data is loaded
 */
function load_cb(data_id, success) {

    if (!success) {
        console.log("b4w load failure");
        return;
    }

    m_app.enable_camera_controls();

    // place your code here
    ShowUI();

    Lamps = m_lights.get_lamps("SUN");
    Rig = m_scs.get_object_by_name("Armature");    
}

exports.setShowUI = function(_value) 
{
    ShowUI = _value;
}

exports.LampController = function(_color, _isEnable) 
{
   switch(_color) 
   {
    case Colors.white:
        m_lights.set_light_energy(Lamps[LampColor.white], _isEnable? 0: 1);
    break;
    case Colors.red:
        m_lights.set_light_energy(Lamps[LampColor.red], _isEnable? 0: 1);
    break;
    case Colors.blue:
        m_lights.set_light_energy(Lamps[LampColor.blue], _isEnable? 0: 1);
    break;
   }
}

exports.RotateBone = function(startTSR, endTSR, interpolatedValue, bone)
{
    var Start_tsr = m_tsr.from_values(startTSR[0], startTSR[1], startTSR[2], startTSR[3], startTSR[4], startTSR[5], startTSR[6], startTSR[7]);
    var End_tsr = m_tsr.from_values(endTSR[0], endTSR[1], endTSR[2], endTSR[3], endTSR[4], endTSR[5], endTSR[6], endTSR[7]);
    
    m_tsr.interpolate(Start_tsr, End_tsr, interpolatedValue, tsr_tmp);
    m_armat.set_bone_tsr_rel(Rig, bone, tsr_tmp);
}

});

var app = b4w.require("Toy-Plane_main");

app.setShowUI(ShowIUFunc);
app.init();

OnOffLamp = app.LampController;
RotateBone = app.RotateBone;