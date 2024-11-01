import domReady from '@wordpress/dom-ready';
import { createRoot, useState, useEffect } from '@wordpress/element';

import { Button, TextControl, Notice } from '@wordpress/components';
import apiFetch from '@wordpress/api-fetch';
import './index.scss';
import icon from '../assets/icon.svg';

const SettingsPage = () => {
  const [teamID, setTeamID] = useState( null );

  useEffect( () => {
		const fetchSettings = async () => {
		  await apiFetch( {
				path: '/wp/v2/settings?_fields=supermoon_team_id',
			}).then( data => {
        setTeamID( data.supermoon_team_id );
      } );
		};

		fetchSettings().catch( ( error ) => {
		  console.error( error );
		} );
      
	}, [] );

  const handleSubmit = async ( event ) => {
		event.preventDefault();
    if ( teamID.trim() !== '' ) {
      await apiFetch( {
        path: '/wp/v2/settings',
        method: 'POST',
        data: {
          supermoon_team_id: teamID,
        },
      });
    }
	};

  const goToSupermoon = async ( event ) => {
    window.open('https://app.getsupermoon.com/', '_blank');
	};

  return (
    <>
      <div className='supermoonSettingsHeader'>
        <img width='40' height='40' src={icon} />
        <h1>Supermoon Settings</h1>
      </div>

      <div className='settingsRow postbox'>
        { teamID ?  <Notice className='sm-notice' status='success' isDismissible={false}>Success!</Notice> : <Notice className='sm-notice' status='error' isDismissible={false}>Supermoon Team ID required. Find it <a href="https://app.getsupermoon.com/settings/smart-contact-form" target="_blank">here</a>.</Notice>  }
        <h2>Supermoon Team ID</h2>
        <TextControl
          className={ !teamID ? 'sm-error' : '' }
          help="You need a Supermoon account to use this plugin."
          onChange={ ( value ) => setTeamID( value ) }
          value={ teamID }
        />
        <Button onClick={ handleSubmit } variant="primary">
          Save ID
        </Button>
      </div>

      <div className='settingsRow postbox'>
        <h2>You need a Supermoon account</h2>
        <p>You need a Supermoon account to use this plugin. Please use the button below to login or signup for a Supermoon account. In the settings area you can customize your Supermoon Contact Form settings and get your Team ID.</p>
        <Button onClick={ goToSupermoon } variant="primary">
          Log in to Supermoon
        </Button>
      </div>

      <div className='settingsRow postbox'>
        <h2>Short Code</h2>
        <p>Copy and paste short code below at the point where you would like the Smart Contact Form to show.</p>
        <div className='shortcode-wrap'>[SupermoonContactForm]</div>
      </div>
    </>
  );
};

domReady( () => {
  const root = createRoot(
    document.getElementById( 'supermoon-settings' )
  );

  root.render( <SettingsPage /> );
} );