<?php
/*
Plugin Name: cm-template
Description: Random-Plugin.
Version:     0.0.1
Author:      nisalvd
Author URI: github.com/nisalvd
*/

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

add_action( 'wp_enqueue_scripts', 'include_react_files' );