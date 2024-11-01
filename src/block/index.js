import { registerBlockType } from '@wordpress/blocks';
import { useLayoutEffect } from '@wordpress/element';
import { useBlockProps } from '@wordpress/block-editor';
import apiFetch from '@wordpress/api-fetch';
import metadata from './block.json';

registerBlockType( metadata.name, {

	icon: {
    src: ( 
      <svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 527.3 527.4">
        <path fill="#FBE571" d="M354.1,15.9c41.9,47.7,72,110.1,148,135.3c-22.1-47-58.3-88-106.7-116C382,27.5,368.2,21.1,354.1,15.9"/>
        <path fill="#FFCB56" d="M502.1,151.3C426,126.1,396,63.6,354.1,15.9c-39-14.3-80-18.8-119.6-14.4C356.4,39,359.4,195.6,523.6,219.4
        C519.5,195.9,512.3,172.9,502.1,151.3"/>
        <path fill="#F4884D" d="M523.5,219.5C359.3,195.7,356.4,39.1,234.5,1.6c-33.7,3.8-66.5,14-96.4,30.2C332.5,39,305.7,262.7,526.7,281.3
        C528.1,260.5,527,239.8,523.5,219.5"/>
        <path fill="#ED5B3A" d="M526.7,281.3C305.7,262.7,332.5,39,138,31.8c-19,10.3-36.9,23-53.2,38c218.4,3.7,185.6,252.7,430.6,271.6
        C521.7,321.6,525.3,301.4,526.7,281.3"/>
        <path fill="#D34360" d="M515.5,341.4c-245-19-212.3-267.9-430.6-271.6c-12.5,11.6-24,24.5-34.3,38.7c217.2,13.7,193.1,264,438.6,291.7
        c0.9-1.6,1.9-3.1,2.8-4.7C502,377.9,509.8,359.8,515.5,341.4"/>
        <path fill="#B0337D" d="M489.1,400.1c-245.5-27.7-221.3-278-438.6-291.7c-5.4,7.4-10.5,15.2-15.2,23.4c-3.3,5.6-6.3,11.3-9.1,17.1
        c200.7,29,194.5,262,418.4,306.4C461.5,439.3,476.6,420.8,489.1,400.1"/>
        <path fill="#88278A" d="M444.7,455.2C220.8,410.8,227,177.9,26.3,148.9c-7,14.4-12.5,29.1-16.7,44.1c171.2,44.3,188.6,241.8,368.8,308
        C402.4,489.3,424.8,474,444.7,455.2"/>
        <path fill="#5D1E86" d="M378.4,500.9c-180.2-66.1-197.6-263.6-368.8-308C5,209.5,2,226.4,0.7,243.2C130.6,297.7,169.6,444,292.1,525.6
        C322,522.4,351.3,514,378.4,500.9"/>
        <path fill="#310F6A" d="M292.1,525.6C169.6,444,130.6,297.7,0.8,243.2c-1.6,21.2-0.7,42.3,2.8,63c78.7,52.2,124,139.3,191,211.8
        C226.8,526.8,259.8,529.1,292.1,525.6"/>
        <path fill="#16043F" d="M194.6,518c-67-72.5-112.3-159.6-191.1-211.7c12.4,75.2,57.2,144.5,128.3,185.6
        C152,503.5,173.1,512.2,194.6,518"/>
      </svg>
    ),
  },

  edit: () => {
    useLayoutEffect(() => {
      const fetchSettings = async () => {
        await apiFetch( {
          path: 'wp/v2/settings?_fields=supermoon_team_id',
        }).then( data => {
          var iframe = document.getElementsByTagName('iframe')[0];
          var head = iframe.contentWindow.document.getElementsByTagName('head')[0];
          var script = document.createElement('script');
          script.src = 'https://cdn.getsupermoon.com/smart-contact-form.js';
          script.setAttribute('data-supermoon-team-id', data.supermoon_team_id);
          head.appendChild(script);
        } );
      };
      fetchSettings().catch(( error ) => {
        console.error( error );
      });
    }, []);

    return ( 
      <div { ...useBlockProps() }>
        <div id='supermoon-smart-contact-form-container'></div>
      </div>
    );
  },

  save: () => {
    return <div { ...useBlockProps.save() }><div id='supermoon-smart-contact-form-container'></div></div>;
  },

});


