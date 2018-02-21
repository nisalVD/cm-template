<?php
/*
Plugin Name: cm-template
Description: Template_Plugin.
Version:     0.0.1
Author:      @nisalvd, @mizukiZ, @JazzHutchy
Author URI: github.com/nisalvd
*/

// ############Including compiled js and css files
function wp_react_hello_world() {
  echo '<div id="root"></div>';
}

function include_react_files() {
  wp_enqueue_style('prefix-style', plugin_dir_url( __FILE__ ) . 'dist/style.bundle.css', array(), '0.0.1', 'all' );
  wp_enqueue_script('plugin-scripts', plugin_dir_url( __FILE__ ) . 'dist/bundle.js', array(), '0.0.1', 'all' );

  wp_localize_script('plugin-scripts','wp_home_url', array(
      "base_url" => home_url()
  ));
}

// change this later to be compiled automatically with webpack
function actionhero_js() {
  $url = plugin_dir_url(__FILE__). 'dist/actionheroClient.min.js';
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
    "cm_template_admin_menu", // Menu Slug(url)
    "cm_template_admin_menu_page" // Callback Function
  );

  //Activate custom settings
  add_action('admin_init', 'cm_template_custom_settings');
}
add_action("admin_menu", "cm_template_admin_menu");
// include cm-admin.php
include_once('cm-admin.php');