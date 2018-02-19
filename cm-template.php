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
  wp_register_script('cm-template-bundle', plugin_dir_url( __FILE__ ) . 'dist/bundle.js', array(), '0.0.1', 'all' );
  // wp_enqueue_script('cm-template-bundle');
  // wp_add_inline_script('cm-template-bundle', '', 'before' );
  wp_enqueue_style('cm-template-bundle-styles', plugin_dir_url( __FILE__ ) . 'dist/style.bundle.css', array(), '0.0.1', 'all' );
}

add_action( 'wp_enqueue_scripts', 'include_react_files' );