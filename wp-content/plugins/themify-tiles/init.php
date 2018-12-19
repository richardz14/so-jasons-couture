<?php
/*
Plugin Name:  Themify Tiles
Plugin URI:   https://themify.me/tiles-plugin
Version:      1.1.8
Author:       Themify
Author URI:   https://themify.me
Description:  Create masonry tile layouts that's similar to the Windows 8 Metro desktop style.
Text Domain:  themify-tiles
Domain Path:  /languages
*/

defined( 'ABSPATH' ) or die( '-1' );

/**
 * Bootstrap Tiles plugin
 *
 * @since 1.0
 */
function themify_tiles_setup() {
	$data = get_file_data( __FILE__, array( 'Version' ) );
	if( ! defined( 'THEMIFY_TILES_DIR' ) )
		define( 'THEMIFY_TILES_DIR', trailingslashit( plugin_dir_path( __FILE__ ) ) );

	if( ! defined( 'THEMIFY_TILES_URI' ) )
		define( 'THEMIFY_TILES_URI', trailingslashit( plugin_dir_url( __FILE__ ) ) );

	if( ! defined( 'THEMIFY_TILES_VERSION' ) )
		define( 'THEMIFY_TILES_VERSION', $data[0] );

	include THEMIFY_TILES_DIR . 'includes/system.php';

	Themify_Tiles::get_instance();
}
add_action( 'after_setup_theme', 'themify_tiles_setup', 1 );

function themify_tiles_updater_setup() {
	require_once( THEMIFY_TILES_DIR . 'themify-tiles-updater.php' );
	new Themify_Tiles_Updater( trim( dirname( plugin_basename( __FILE__) ), '/' ), THEMIFY_TILES_VERSION, trim( plugin_basename( __FILE__), '/' ) );
}
add_action( 'init', 'themify_tiles_updater_setup' );
add_filter( 'plugin_row_meta', 'themify_tiles_plugin_meta', 10, 2 );
function themify_tiles_plugin_meta( $links, $file ) {
	if ( plugin_basename( __FILE__ ) == $file ) {
		$row_meta = array(
		  'changelogs'    => '<a href="' . esc_url( 'https://themify.me/changelogs/' ) . basename( dirname( $file ) ) .'.txt" target="_blank" aria-label="' . esc_attr__( 'Plugin Changelogs', 'themify-tiles' ) . '">' . esc_html__( 'View Changelogs', 'themify-tiles' ) . '</a>'
		);
 
		return array_merge( $links, $row_meta );
	}
	return (array) $links;
}