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
<script src="https://unpkg.com/react@16/umd/react.development.js"></script>
<script src="https://unpkg.com/react-dom@16/umd/react-dom.development.js"></script>
<script src="https://unpkg.com/babel-standalone@6.15.0/babel.min.js"></script>
<div id="cm-edit-appearance-preview"></div>
<script type="text/babel">
  const divStyles = {
    width: 200
    height: 500,
    backgroundColor: 'red'
  }
  class App extends React.Component {
    constructor(props) {
    super(props);
      this.state = {
        bgColor: document.getElementsByName("cm_template_bg_color")[0].value,
        primaryColor: document.getElementsByName("cm_template_primary_color")[0].value,
        secondaryColor: document.getElementsByName("cm_template_secondary_color")[0].value
      }
    }
    componentDidMount() {
      const bgColorInput = document.getElementsByName("cm_template_bg_color")[0]
      const primaryColorInput = document.getElementsByName("cm_template_primary_color")[0]
      const secondaryColorInput = document.getElementsByName("cm_template_secondary_color")[0]
      bgColorInput.onkeyup = () => {
        this.setState({bgColor: bgColorInput.value})
      }
      primaryColorInput.onkeyup = () => {
        this.setState({primaryColor: primaryColorInput.value})
      }
      secondaryColorInput.onkeyup = () => {
        this.setState({secondaryColor: secondaryColorInput.value})
      }
    }

    render() {
      const {bgColor, primaryColor, secondaryColor} = this.state
      console.log('bgcolor', bgColor)
      console.log('primaryColor', primaryColor)
      console.log('secondary Color', secondaryColor)
      console.log('styles', divStyles)
      return(
        <div style={divStyles}>
          <p>Background Color: {bgColor}</p>
          <p>Primary Color: {primaryColor}</p>
          <p>Secondary Color: {secondaryColor}</p>
        </div>
      )
    }
  }

ReactDOM.render(
  <App />,
  document.getElementById('cm-edit-appearance-preview')
);

</script>

