<?php

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly
}

class SMSCF_Supermoon_Elementor_Widget extends \Elementor\Widget_Base {

  public function __construct($data = [], $args = null) {
    parent::__construct($data, $args);

    wp_register_script( 'smscf-script', plugin_dir_url(__FILE__) . 'assets/contact-form.js', [ 'elementor-frontend' ], '1.0.0', true );

    wp_enqueue_script('wp-api-fetch');
  }

  public function get_script_depends() {
    return [ 'smscf-script' ];
  }

  public function get_name() {
    return 'supermoon';
  }

  public function get_title() {
    return __('Supermoon Smart Contact Form', 'supermoon');
  }

  public function get_icon() {
    return 'eicon-code';
  }

  public function get_categories() {
    return ['basic'];
  }
  
  protected function render() {
    echo '<div id="supermoon-smart-contact-form-container"></div>';
  }

  protected function _content_template() {
    ?>
      <div id="supermoon-smart-contact-form-container"></div>
    <?php
  }
}

\Elementor\Plugin::instance()->widgets_manager->register_widget_type(new SMSCF_Supermoon_Elementor_Widget());