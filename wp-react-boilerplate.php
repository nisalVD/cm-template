<?php

/*
Plugin Name: WP React Boilerplate
Plugin URI:
Description:
Author: Peter Tasker
Version: 0.1
Author URI: http://deliciousbrains.com
Network: True
*/

class WP_React_Boilerplate {

	public $plugin_domain;
	public $views_dir;
	public $version;

	public function __construct() {
		$this->plugin_domain = 'wp-react-boilerplate';
		$this->views_dir     = trailingslashit( dirname( __FILE__ ) ) . 'server/views';
		$this->version       = '1.0';

		require_once __DIR__ . '/server/wprb-rest-server.php';
		$wprb_rest_server = new WPRB_Rest_Server();
		$wprb_rest_server->init();

		add_action( 'admin_menu', array( $this, 'admin_menu' ) );
		/**
		 * Use * for origin
		 */
		// https://joshpress.net/access-control-headers-for-the-wordpress-rest-api/
		add_action( 'rest_api_init', function () {

			remove_filter( 'rest_pre_serve_request', 'rest_send_cors_headers' );

			add_filter( 'rest_pre_serve_request', function ( $value ) {
				header( 'Access-Control-Allow-Origin: *' );
				header( 'Access-Control-Allow-Methods: POST, GET, OPTIONS, PUT, DELETE' );
				header( 'Access-Control-Allow-Credentials: true' );
				header( 'Access-Control-Allow-Headers: X-WP-Nonce, X-Requested-With, Content-Type, Origin, Authorization, Accept, Client-Security-Token, Accept-Encoding' );

				return $value;

			} );
		}, 15 );
	}

	public function admin_menu() {
		$title = __( 'WP React Boilerplate', $this->plugin_domain );

		$hook_suffix = add_management_page( $title, $title, 'export', $this->plugin_domain, array(
			$this,
			'load_admin_view',
		) );

		add_action( 'load-' . $hook_suffix, array( $this, 'load_assets' ) );
	}

	public function load_view( $view ) {
		$path = trailingslashit( $this->views_dir ) . $view;

		if ( file_exists( $path ) ) {
			include $path;
		}
	}

	public function load_admin_view() {
		$this->load_view( 'admin.php' );
	}

	public function load_assets() {
		wp_register_script( $this->plugin_domain . '-bundle', plugin_dir_url( __FILE__ ) . 'dist/bundle.js', array(), $this->version, 'all' );

		wp_localize_script( $this->plugin_domain . '-bundle', 'wpApiSettings', array(
			'nonce' => wp_create_nonce( 'wp_rest' ),
		) );

		wp_enqueue_script( $this->plugin_domain . '-bundle' );
		wp_add_inline_script( $this->plugin_domain . '-bundle', 'const wp_rest_api_nonce = `' . wp_create_nonce( 'wp_rest' ) . '`', 'before' );
		wp_enqueue_style( $this->plugin_domain . '-bundle-styles', plugin_dir_url( __FILE__ ) . 'dist/style.bundle.css', array(), $this->version, 'all' );
	}
}

new WP_React_Boilerplate();