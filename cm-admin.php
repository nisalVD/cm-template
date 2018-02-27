<?php

function cm_template_custom_settings() {
  register_setting( 'wp-starter-settings-group', 'api_key');
  register_setting( 'wp-starter-settings-group', 'app_id');
  register_setting( 'wp-starter-settings-group', 'device_id');

  add_settings_section( 'wp-starter-options', NULL, 'cm_template_settings_options', 'cm_template_admin_menu_page');

  add_settings_field( 'cm-temlate-api', 'Api key', 'cm_temlate_api', 'cm_template_admin_menu_page', 'wp-starter-options');
  add_settings_field( 'cm-temlate-app', 'Application id', 'cm_temlate_app', 'cm_template_admin_menu_page', 'wp-starter-options');
  add_settings_field( 'cm-temlate-device', 'Device id', 'cm_temlate_device', 'cm_template_admin_menu_page', 'wp-starter-options');

  // Appearance Settings
  register_setting( 'cm-edit-appearance-settings-group', 'cm_template_bg_color');
  register_setting( 'cm-edit-appearance-settings-group', 'cm_template_plugin_flex_color');
  register_setting( 'cm-edit-appearance-settings-group', 'cm_template_plugin_flex_text_color');

  add_settings_section( 'cm-edit-appearance-options', NULL, 'cm_edit_appearance_settings_options', 'cm_edit_appearance_page');

}
// Appearance Settings
function cm_edit_appearance_settings_options() {
$bg_color = esc_attr(get_option('cm_template_bg_color'));
    echo '<input type="hidden" name="cm_template_bg_color" value="'.$bg_color.'" />';
$plugin_flex = esc_attr(get_option('cm_template_plugin_flex_color'));
    echo '<input type="hidden" name="cm_template_plugin_flex_color" value="'.$plugin_flex.'"/>';
$plugin_text_flex = esc_attr(get_option('cm_template_plugin_flex_text_color'));
    echo '<input type="hidden" name="cm_template_plugin_flex_text_color" value="'.$plugin_text_flex.'"/>';
}
// admin Settings


function cm_template_settings_options() {
  echo 'Customize Your Settings';
}


function cm_temlate_api() {
  $api_key = esc_attr(get_option('api_key'));
  echo '<input type="text" name="api_key" value="'.$api_key.'" placeholder="Api key" />';
}
function cm_temlate_app() {
  $app_id = esc_attr(get_option('app_id'));
  echo '<input type="text" name="app_id" value="'.$app_id.'" placeholder="App id" />';
}
function cm_temlate_device() {
  $device_id = esc_attr(get_option('device_id'));
  echo '<input type="text" name="device_id" value="'.$device_id.'" placeholder="Device id" />';
}

function cm_template_admin_menu_page() {
  ?>
  <div id="admin-head">
      <h1>CM Admin Page</h1>
      <!-- Trigger/Open The Modal -->
<p id="myBtn">Set up guide</p>
</div>

<!-- The Modal -->
<div id="myModal" class="cm-admin-modal">

  <!-- Modal content -->
  <div class="cm-admin-modal-content">
    <span class="cm-admin-close">&times;</span>
    <h3>## Get your Authorisation Keys for the plugin</h3>
1.Go to <a href="https://conctr.com/" target=_blank>https://conctr.com/</a> and create an account <br/>
2.Log into Conctr, you will get taken to the dashboard<br/>
3.Select your device below<br/>
4.On the next screen, click on the Models tab<br/>
5. Identify the model for the device that you are using and then click on Example Code<br/>
6.Click on the information tab and you can view your Application Id and API key<br/>
7. To get your Device Id, go to the Devices tab <br/>
8. Click on Search under the Data Fields section and then click on Select/List under the Devices windows<br/>
9.In the popup window, you can view all devices that you own, identify the device that you own and look for the Device Id on the left-hand column labelled Device Id<br/>

<h3>## Input your Authorisation Keys</h3>
1. Access the CM Admin menu and click on CM Admin Menu<br/>
2. Enter your Authorisation Keys in the appropriate sections<br/>
3. Click on Save Changes when you are done<br/>

<h3>## Customise the data to be displayed and their Alert Settings</h3>
1. Access the CM Admin menu and click on Alert Setting Page<br/>
2. You can toggle the statistics you want to view in the checkboxes at the top of the page<br/>
3. You can customise the warning thresholds (the maximum and minimum points when the statistics begin to flash warning colours) underneath<br/>
4. If you are satisfied, click the Update button at the bottom<br/>


<h3>## Customise the chart/user interface</h3>
1. Access the CM Admin menu and click on CM Edit Appearance<br/>
2. Hello World (get off Vim and get this thing working Nisal!)<br/>

<h3>## Put the plugin on the site using shortcode</h3>
1.Go to the Appearance tab on the Wordpress dashboard and enter the Widgets submenu<br/>
2.Select the Text widget and drag it to the desired location on the right-hand side of the page<br/>
3.Enter the shortcode [cm-template] in the text-area and save when ready<br/>
4.When you view your page, you should see the widget appear in the section that you placed it in<br/>
</p>
  </div>

</div>
  <?php settings_errors(); ?>


  <form action="options.php" method="post">
    <?php settings_fields('wp-starter-settings-group'); ?>
    <?php do_settings_sections('cm_template_admin_menu_page'); ?>
    <?php submit_button(); ?>
  </form>
  <?php
}
function cm_template_register_endpoints() {
  register_rest_route( 'cmtemplate/v1', '/device', array(
    'methods' => 'GET',
    'callback' => 'get_wp_settings',
  ) );
}

add_action( 'rest_api_init', 'cm_template_register_endpoints');

function get_wp_settings($request) {
  return array(
    "apiKey" => get_option('api_key'),
    "appId" => get_option('app_id'),
    "deviceId" => get_option('device_id')
  );
}
