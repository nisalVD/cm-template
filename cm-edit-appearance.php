<?php
  ?>
      <h1>Edit Appearance Page</h1>
    <form action="options.php" method="post">
  <?php settings_errors(); ?>
    <?php settings_fields('cm-edit-appearance-settings-group'); ?>
    <?php do_settings_sections('cm_edit_appearance_page'); ?>
    <?php submit_button(); ?>
    </form>
    <?php
