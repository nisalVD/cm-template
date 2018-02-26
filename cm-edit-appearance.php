<?php
  ?>
  <h1>Edit Appearance Page</h1>
  <form action="options.php" method="post">
  <div class="sunset">
  <?php settings_errors(); ?>
  <?php settings_fields('cm-edit-appearance-settings-group'); ?>
  <?php do_settings_sections('cm_edit_appearance_page'); ?>
  <?php submit_button(); ?>
  </form>
  <?php
?>
<?php
$backgroundColor = get_option('cm_template_bg_color');
?>
<?php
include_once('editAppearanceComponent.js');

