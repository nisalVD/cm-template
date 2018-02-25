<?php
/*
Plugin Name: cm-template
Description: Template_Plugin.
Version:     0.0.1
Author:      @nisalvd, @mizukiZ, @JazzHutchy
Author URI: github.com/nisalvd
*/

// ############Including compiled js and css files
function cm_template() {
  echo '<div id="cm-template"></div>';
}

function include_react_files() {
  wp_enqueue_style('prefix-style', plugin_dir_url( __FILE__ ) . 'dist/style.bundle.css', array(), '0.0.1', 'all' );
  wp_enqueue_script('plugin-scripts', plugin_dir_url( __FILE__ ) . 'dist/bundle.js', array(), '0.0.1', 'all' );
  wp_enqueue_style('font-awesome', '//maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css'); 

  wp_localize_script('plugin-scripts','cm_device_info', array(
      "api_key" => get_option("api_key"),
      "app_id" => get_option("app_id"),
      "device_id" => get_option("device_id")
  ));
}

// change this later to be compiled automatically with webpack
function actionhero_js() {
  $url = plugin_dir_url(__FILE__). 'actionheroClient.min.js';
  echo '<script type="text/javascript" src= '.$url.' ></script>';
}

add_action('wp_head', 'actionhero_js');
add_action( 'wp_enqueue_scripts', 'include_react_files' );

//#### Admin Setting Page

function cm_template_admin_menu() {
  add_menu_page(
    "CM Admin Page", // Page Title
    "CM Admin Menu", // Menu Title
    "manage_options",
    "cm_template_admin", // Menu Slug(url)
    "cm_template_admin_menu_page" // Callback Function
  );

  add_submenu_page(
    'cm_template_admin', // parent slug(url)
    'Alert Setting Page', // page title
    'Alert Setting Page', // menu titile
    'manage_options',
    'my-custom-submenu-page', // slug
    'alert_setting_page_callback' //callback
   );

    add_submenu_page(
        'cm_template_admin', // parent slug(url)
        'CM Edit Appearance Page', // page title
        'CM Edit Appearance', // menu titile
        'manage_options',
        'cm-edit-appearance', // slug
        'cm_edit_appearance' //callback
       );
  //Activate custom settings
  add_action('admin_init', 'cm_template_custom_settings');
}
add_action("admin_menu", "cm_template_admin_menu");
// include admin stuff
include_once('cm-admin.php');


//  call template
function cm_edit_appearance() {
  include_once('cm-edit-appearance.php');
}
//  call template
function alert_setting_page_callback() {
  include_once('cm-alert-setting.php');
}

// add main.js file
add_action("admin_print_scripts", function(){
  wp_enqueue_script( 'main_js', plugins_url('cm-alert/main.js', __FILE__), NULL, null, true);
  wp_localize_script('main_js','cm_device_info', array(
    "apiKey" => get_option("api_key"),
    "appId" => get_option("app_id"),
    "deviceId" => get_option("device_id")
  ));
 });

 // add short code for this plugin
 function shortcode_func() {
  return "<div id=cm-template></div>";
  }
  add_shortcode('cm-template', 'shortcode_func');
