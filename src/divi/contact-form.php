<?php 
  if ( ! defined( 'ABSPATH' ) ) {
    exit; // Exit if accessed directly
  }

  class SMSCF_Supermoon_Divi_Module extends ET_Builder_Module {
    public $slug       = 'supermoon_divi_module';
    public $vb_support = 'off';

    public function init() {
      $this->name = esc_html__( 'Supermoon Smart Contact Form', 'supermoon' );
      $this->icon = 't';
    }

    public function render( $attrs, $content = null, $render_slug ) {
      return (
          '<div id="supermoon-smart-contact-form-container"></div>'
      );
    }
  };

  new SMSCF_Supermoon_Divi_Module;