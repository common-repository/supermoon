<?php
/**
 * Plugin Name: Supermoon
 * Plugin URI: https://getsupermoon.com/
 * Description: Easily add the Supermoon AI-Powered Smart Contact Form to your WordPress site.
 * Version: 1.0.0
 * Author: Supermoon Labs, Inc.
 * Author URI: https://getsupermoon.com/
 * Text Domain: supermoon
 * License: GPL-2.0+
 * License URI: http://www.gnu.org/licenses/gpl-2.0.html
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly
}

// Register the Settings Page
function smscf_supermoon_settings_page() {
  add_menu_page(
    __( 'Supermoon Contact Form', 'supermoon' ),
    'Supermoon',
    'manage_options',
    'supermoon-settings',
    'smscf_supermoon_settings_page_html',
    'dashicons-format-chat',
    100
  );
};
add_action( 'admin_menu', 'smscf_supermoon_settings_page' );

// Register the Block for the Editor
function smscf_supermoon_register_block() {
  register_block_type( __DIR__ . '/build/block' );
};
add_action( 'init', 'smscf_supermoon_register_block' );

// Add Short Code
function smscf_supermoon_smart_contact_form() {
  return '<div id="supermoon-smart-contact-form-container"></div>';
};
add_shortcode( 'SupermoonContactForm', 'smscf_supermoon_smart_contact_form' );

// Print the Settings Page
function smscf_supermoon_settings_page_html() {
  printf(
    '<div id="supermoon-settings" class="wrap">%s</div>',
    esc_html__( 'Loading…', 'supermoon' )
  );
};

// Enqueue Style and Script for the Settings Page
function smscf_supermoon_settings_page_enqueue_style_script( $admin_page ) {
  // echo '<script type="text/javascript">';
  // echo 'var supermoonTeamID = ' . wp_json_encode( get_option('supermoon_team_id') );
  // echo '</script>';

  if ( 'toplevel_page_supermoon-settings' !== $admin_page ) {
    return;
  };

  $asset_file = plugin_dir_path( __FILE__ ) . 'build/index.asset.php';

  if ( ! file_exists( $asset_file ) ) {
    return;
  };

  $asset = include $asset_file;

  wp_enqueue_script(
    'supermoon-settings-script',
    plugins_url( 'build/index.js', __FILE__ ),
    $asset['dependencies'],
    $asset['version'],
    array(
      'in_footer' => true,
    )
  );

  wp_enqueue_style( 'wp-components' );

  wp_enqueue_style(
    'supermoon-settings-style',
    plugins_url( 'build/index.css', __FILE__ ),
    array_filter(
      $asset['dependencies'],
      function ( $style ) {
        return wp_style_is( $style, 'registered' );
      }
    ),
    $asset['version'],
  );
};
add_action( 'admin_enqueue_scripts', 'smscf_supermoon_settings_page_enqueue_style_script' );

// Register the Team ID Field for the Database
function smscf_supermoon_register_settings() {
  register_setting(
    'options',
    'supermoon_team_id',
    array(
      'type'              => 'string',
      'description'       => __( 'Supermoon Team ID', 'supermoon' ),
      'sanitize_callback' => 'sanitize_text_field',
      'show_in_rest'      => true,
      'default'           => '',
    )
  );
};
add_action( 'admin_init', 'smscf_supermoon_register_settings' );
add_action( 'rest_api_init', 'smscf_supermoon_register_settings' );

// Show Error Notice if Team ID is not set
function scscf_supermoon_team_id_error(){
  if ( current_user_can('manage_options') && !get_option('supermoon_team_id') || get_option('supermoon_team_id') === '' ) {
    echo '<div class="notice notice-error is-dismissible"><p>Team ID is required to use the Supermoon Smart Contact Form.</p></div>';
  };
};
add_action( 'admin_notices', 'scscf_supermoon_team_id_error' );

// Do not do these things if Team ID is not set
if ( get_option('supermoon_team_id') ) {
  // Add Supermoon Script to Head only on Frontend
  function smscf_supermoon_enqueue_script_frontend() {
    // Only load the script if not in admin
    if ( !is_admin() ) {
      // Check if we are on a Divi builder page
      if ( !isset($_GET['et_fb']) && !isset($_GET['et_bfb']) ) {
        // Check if we are on an Elementor page
        if ( !isset( $_GET['elementor-preview'] ) ) {
          wp_enqueue_script(
            'supermoon-contact-form',
            'https://cdn.getsupermoon.com/smart-contact-form.js',
            array(),
            '1.0.0',
            true
          );
        };
      };
    };
  };
  add_action( 'wp_enqueue_scripts', 'smscf_supermoon_enqueue_script_frontend' );

  // Add data attribute to the Script
  function smscf_supermoon_add_data_attribute_to_script( $attributes ) {
    $supermoonTeamId = get_option('supermoon_team_id');

    // Only do this for Supermoon Smart Contact Form Script
    if ( isset( $attributes['id'] ) && $attributes['id'] === 'supermoon-contact-form-js' ) {
      $attributes['data-supermoon-team-id'] = $supermoonTeamId;
    };

    return $attributes;
  };
  add_filter( 'wp_script_attributes', 'smscf_supermoon_add_data_attribute_to_script', 10, 1 );

  // Init Elementor Widget
  function smscf_supermoon_custom_elementor_widget_init() {
    require_once( __DIR__ . '/src/elementor/widget.php' );
  }
  add_action('elementor/widgets/widgets_registered', 'smscf_supermoon_custom_elementor_widget_init');

  // Init Divi Module
  function smscf_supermoon_custom_divi_module_init() {
    if ( class_exists( 'ET_Builder_Module' ) ) {
      include_once plugin_dir_path( __FILE__ ) . '/src/divi/contact-form.php';
    }
  }
  add_action( 'et_builder_ready', 'smscf_supermoon_custom_divi_module_init' );
};