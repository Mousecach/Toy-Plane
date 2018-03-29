"use strict"

// register the application module
b4w.register("Toy-Plane_main", function(exports, require) {

// import modules used by the app
var m_app       = require("app");
var m_cfg       = require("config");
var m_data      = require("data");
var m_preloader = require("preloader");
var m_ver       = require("version");
var m_lights    = require("lights");

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

    m_preloader.create_preloader();

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
    m_preloader.update_preloader(percentage);
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
    console.log(Lamps);
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

});

var app = b4w.require("Toy-Plane_main");

app.setShowUI(ShowIUFunc);
app.init();

OnOffLamp = app.LampController;