<?php
class Settings
{
    /**
     * Holds the values to be used in the fields callbacks
     */
    private $options;

    /**
     * Start up
     */
    public function __construct()
    {
        add_action( 'admin_menu', array( $this, 'add_plugin_page' ) );
        add_action( 'admin_init', array( $this, 'page_init' ) );
    }

    /**
     * Add options page
     */
    public function add_plugin_page()
    {
        // This page will be under "Settings"
        add_options_page(
            'Site Settings', 
            'Site Settings', 
            'manage_options', 
            'site-settings', 
            array( $this, 'create_admin_page' )
        );
    }

    /**
     * Options page callback
     */
    public function create_admin_page()
    {
        // Set class property
        $this->options = get_option( 'site_settings' );
        ?>
        <div class="wrap">
            <?php screen_icon(); ?>
            <h2>Site Settings</h2>           
            <form method="post" action="options.php">
            <?php
                // This prints out all hidden setting fields
                settings_fields( 'site_settiings_group' );   
                do_settings_sections( 'site-settings' );
                submit_button(); 
            ?>
            </form>
        </div>
        <?php
    }

    /**
     * Register and add settings
     */
    public function page_init()
    {        
        register_setting(
            'site_settiings_group', // Option group
            'site_settings', // Option name
            array( $this, 'sanitize' ) // Sanitize
        );

        add_settings_section(
            'setting_section_id', // ID
            'Business Info', // Title
            array( $this, 'print_section_info' ), // Callback
            'site-settings' // Page
        );
        
        add_settings_section(
            'ga_settings', // ID
            'Google Analytics', // Title
            array( $this, 'ga_section_info' ), // Callback
            'site-settings' // Page
        );
        
        add_settings_section(
            'social_settings', // ID
            'Social Networking', // Title
            array( $this, 'social_section_info' ), // Callback
            'site-settings' // Page
        );  






        add_settings_field(
            'business_name', // ID
            'Business Name', // Title 
            array( $this, 'business_name_callback' ), // Callback
            'site-settings', // Page
            'setting_section_id' // Section           
        );
        
        add_settings_field(
            'address1', // ID
            'Address 1', // Title 
            array( $this, 'address1_callback' ), // Callback
            'site-settings', // Page
            'setting_section_id' // Section           
        );
        
        add_settings_field(
            'address2', // ID
            'Address 2', // Title 
            array( $this, 'address2_callback' ), // Callback
            'site-settings', // Page
            'setting_section_id' // Section           
        );
        
        add_settings_field(
            'city', // ID
            'City', // Title 
            array( $this, 'city_callback' ), // Callback
            'site-settings', // Page
            'setting_section_id' // Section           
        );
        
        add_settings_field(
            'state', // ID
            'State', // Title 
            array( $this, 'state_callback' ), // Callback
            'site-settings', // Page
            'setting_section_id' // Section           
        );
        
        add_settings_field(
            'zip', // ID
            'Zip', // Title 
            array( $this, 'zip_callback' ), // Callback
            'site-settings', // Page
            'setting_section_id' // Section           
        );
        
        add_settings_field(
            'phone', // ID
            'Phone', // Title 
            array( $this, 'phone_callback' ), // Callback
            'site-settings', // Page
            'setting_section_id' // Section           
        );
        
        add_settings_field(
            'mobile', // ID
            'Mobile', // Title 
            array( $this, 'mobile_callback' ), // Callback
            'site-settings', // Page
            'setting_section_id' // Section           
        );
        
        add_settings_field(
            'fax', // ID
            'Fax', // Title 
            array( $this, 'fax_callback' ), // Callback
            'site-settings', // Page
            'setting_section_id' // Section           
        );
        
        add_settings_field(
            'google_analytics', // ID
            'Google Analytics Tracking ID', // Title 
            array( $this, 'ga_callback' ), // Callback
            'site-settings', // Page
            'ga_settings' // Section           
        );
              

        add_settings_field(
            'facebook_url', 
            'Facebook URL', 
            array( $this, 'facebook_callback' ), 
            'site-settings', 
            'social_settings'
        );
        
        add_settings_field(
            'twitter_url', 
            'Twitter URL', 
            array( $this, 'twitter_callback' ), 
            'site-settings', 
            'social_settings'
        );
        
        add_settings_field(
            'instagram_url', 
            'Instagram URL', 
            array( $this, 'instagram_callback' ), 
            'site-settings', 
            'social_settings'
        );
        
        add_settings_field(
            'pinterest_url', 
            'Pinterest URL', 
            array( $this, 'pinterest_callback' ), 
            'site-settings', 
            'social_settings'
        );
        
        add_settings_field(
            'gplus_url', 
            'Google Plus URL', 
            array( $this, 'gplus_callback' ), 
            'site-settings', 
            'social_settings'
        );    
        
        add_settings_field(
            'youtube_url', 
            'YouTube URL', 
            array( $this, 'youtube_callback' ), 
            'site-settings', 
            'social_settings'
        );
        
        add_settings_field(
            'gmaps_url', 
            'Google Maps URL', 
            array( $this, 'gmaps_callback' ), 
            'site-settings', 
            'social_settings'
        );

    }

    /**
     * Sanitize each setting field as needed
     *
     * @param array $input Contains all settings fields as array keys
     */
    public function sanitize( $input )
    {
        $new_input = array();
        if( isset( $input['business_name'] ) )
            $new_input['business_name'] = sanitize_text_field( $input['business_name'] );

        if( isset( $input['address1'] ) )
            $new_input['address1'] = sanitize_text_field( $input['address1'] );
            
        if( isset( $input['address2'] ) )
            $new_input['address2'] = sanitize_text_field( $input['address2'] );
            
        if( isset( $input['city'] ) )
            $new_input['city'] = sanitize_text_field( $input['city'] );
        
        if( isset( $input['state'] ) )
            $new_input['state'] = sanitize_text_field( $input['state'] );
        
        if( isset( $input['zip'] ) )
            $new_input['zip'] = sanitize_text_field( $input['zip'] ); 
        
        if( isset( $input['phone'] ) )
            $new_input['phone'] = sanitize_text_field( $input['phone'] );    
        
        if( isset( $input['mobile'] ) )
            $new_input['mobile'] = sanitize_text_field( $input['mobile'] );    
        
        if( isset( $input['fax'] ) )
            $new_input['fax'] = sanitize_text_field( $input['fax'] );
            
        if( isset( $input['google_analytics'] ) )
            $new_input['google_analytics'] = sanitize_text_field( $input['google_analytics'] );
        
        if( isset( $input['facebook_url'] ) )
            $new_input['facebook_url'] = sanitize_text_field( $input['facebook_url'] );
            
        if( isset( $input['twitter_url'] ) )
            $new_input['twitter_url'] = sanitize_text_field( $input['twitter_url'] );
        
        if( isset( $input['instagram_url'] ) )
            $new_input['instagram_url'] = sanitize_text_field( $input['instagram_url'] );
        
        if( isset( $input['pinterest_url'] ) )
            $new_input['pinterest_url'] = sanitize_text_field( $input['pinterest_url'] );
            
        if( isset( $input['youtube_url'] ) )
            $new_input['youtube_url'] = sanitize_text_field( $input['youtube_url'] );
            
        if( isset( $input['gplus_url'] ) )
            $new_input['gplus_url'] = sanitize_text_field( $input['gplus_url'] );
        
        if( isset( $input['gmaps_url'] ) )
            $new_input['gmaps_url'] = sanitize_text_field( $input['gmaps_url'] );
            
        return $new_input;
    }

    /** 
     * Print the Section text
     */
    public function print_section_info()
    {
        print 'Enter your settings below:';
    }
    
    public function ga_section_info()
    {
        print 'Enter your Google Analytics ID below:';
    }
    
    public function social_section_info()
    {
        print 'Enter your social networks below:';
    }

    /** 
     * Get the settings option array and print one of its values
     */
    public function business_name_callback()
    {
        printf(
            '<input type="text" id="business-name" name="site_settings[business_name]" value="%s" />',
            isset( $this->options['business_name'] ) ? esc_attr( $this->options['business_name']) : ''
        );
    }

    /** 
     * Get the settings option array and print one of its values
     */
    public function address1_callback()
    {
        printf(
            '<input type="text" id="address1" name="site_settings[address1]" value="%s" />',
            isset( $this->options['address1'] ) ? esc_attr( $this->options['address1']) : ''
        );
    }
    
    public function address2_callback()
    {
        printf(
            '<input type="text" id="address2" name="site_settings[address2]" value="%s" />',
            isset( $this->options['address2'] ) ? esc_attr( $this->options['address2']) : ''
        );
    }
    
    public function city_callback()
    {
        printf(
            '<input type="text" id="city" name="site_settings[city]" value="%s" />',
            isset( $this->options['city'] ) ? esc_attr( $this->options['city']) : ''
        );
    }
    
    public function state_callback()
    {
        printf(
            '<input type="text" id="state" name="site_settings[state]" value="%s" />',
            isset( $this->options['state'] ) ? esc_attr( $this->options['state']) : ''
        );
    }
    
    public function zip_callback()
    {
        printf(
            '<input type="text" id="zip" name="site_settings[zip]" value="%s" />',
            isset( $this->options['zip'] ) ? esc_attr( $this->options['zip']) : ''
        );
    }
    
    public function phone_callback()
    {
        printf(
            '<input type="text" id="phone" name="site_settings[phone]" value="%s" />',
            isset( $this->options['phone'] ) ? esc_attr( $this->options['phone']) : ''
        );
    }
    
    public function mobile_callback()
    {
        printf(
            '<input type="text" id="mobile" name="site_settings[mobile]" value="%s" />',
            isset( $this->options['mobile'] ) ? esc_attr( $this->options['mobile']) : ''
        );
    }
    
    public function fax_callback()
    {
        printf(
            '<input type="text" id="fax" name="site_settings[fax]" value="%s" />',
            isset( $this->options['fax'] ) ? esc_attr( $this->options['fax']) : ''
        );
    }
    
    public function ga_callback()
    {
        printf(
            '<input type="text" id="google-analytics" name="site_settings[google_analytics]" value="%s" />',
            isset( $this->options['google_analytics'] ) ? esc_attr( $this->options['google_analytics']) : ''
        );
    }
    
    public function facebook_callback()
    {
        printf(
            '<input type="text" id="facebook-url" name="site_settings[facebook_url]" value="%s" />',
            isset( $this->options['facebook_url'] ) ? esc_attr( $this->options['facebook_url']) : ''
        );
    }
    
    public function twitter_callback()
    {
        printf(
            '<input type="text" id="twitter-url" name="site_settings[twitter_url]" value="%s" />',
            isset( $this->options['twitter_url'] ) ? esc_attr( $this->options['twitter_url']) : ''
        );
    }
    
    public function instagram_callback()
    {
        printf(
            '<input type="text" id="instagram-url" name="site_settings[instagram_url]" value="%s" />',
            isset( $this->options['instagram_url'] ) ? esc_attr( $this->options['instagram_url']) : ''
        );
    }
    
    public function pinterest_callback()
    {
        printf(
            '<input type="text" id="pinterest-url" name="site_settings[pinterest_url]" value="%s" />',
            isset( $this->options['pinterest_url'] ) ? esc_attr( $this->options['pinterest_url']) : ''
        );
    }
    
    public function gplus_callback()
    {
        printf(
            '<input type="text" id="gplus-url" name="site_settings[gplus_url]" value="%s" />',
            isset( $this->options['gplus_url'] ) ? esc_attr( $this->options['gplus_url']) : ''
        );
    }
    
    public function gmaps_callback()
    {
        printf(
            '<input type="text" id="gmaps-url" name="site_settings[gmaps_url]" value="%s" />',
            isset( $this->options['gmaps_url'] ) ? esc_attr( $this->options['gmaps_url']) : ''
        );
    }
    
    public function youtube_callback()
    {
        printf(
            '<input type="text" id="youtube-url" name="site_settings[youtube_url]" value="%s" />',
            isset( $this->options['youtube_url'] ) ? esc_attr( $this->options['youtube_url']) : ''
        );
    }
    
}
