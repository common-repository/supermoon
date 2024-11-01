(function($) {

  var teamID = null;
  
  // Get the team ID from the WP REST API
  wp.apiFetch({ path: 'wp/v2/settings?_fields=supermoon_team_id' })
  .then(function(data) {
    teamID = data.supermoon_team_id;
  })
  .catch(function(error) {
    console.error('Error fetching data:', error);
  });

  $( window ).on( 'elementor/frontend/init', () => {
    // Check if the builder is loaded
    // Reload script so editor will display the Smart Contact Form
    const runScript = () => {
      var script = document.createElement('script');
      script.src = 'https://cdn.getsupermoon.com/smart-contact-form.js';
      script.setAttribute('data-supermoon-team-id', teamID);
      document.getElementsByTagName('head')[0].appendChild(script);
    };
 
    elementorFrontend.hooks.addAction( 'frontend/element_ready/supermoon.default', runScript );
 } );
 
})(jQuery);