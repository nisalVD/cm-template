<script src="https://unpkg.com/react@16/umd/react.development.js"></script>
<script src="https://unpkg.com/react-dom@16/umd/react-dom.development.js"></script>
<script src="https://unpkg.com/babel-standalone@6.15.0/babel.min.js"></script>
<div id="cm-edit-appearance-preview"></div>
<script type="text/babel">
  let backgroundStyles = {
		width: 350,
		height: 300,
    borderTop: '1px solid #e3e6ea',
		borderBottom: '1px solid #e3e6ea',
		backgroundColor: '#fff',
		color: '#f16265',
		marginBottom: 1,
		cursor: 'pointer'
  }
	const pluginFlexStyle = {
		borderTop: '1px solid #e3e6ea',
		borderBottom: '1px solid #e3e6ea',
		backgroundColor: '#fff',
		color: '#f16265',
		marginBottom: '1px',
		width: '100%',
		height: 50,
		textAlign: 'center',
		cursor: 'pointer'
	}
	const pluginFlexText = {
		color: 'blue'
	}
  const buttonGroupStyles = {
    width: '100%',
    height: 42,
    textAlign: 'center',
    backgroundColor: 'dodgerBlue'
  }
  const buttonStyles = {
    width: 90,
    height: 42,
    fontSize: 12,
    textAlign: 'center',
    backgroundColor: '#77757a',
    borderRadius: '5px 5px 0px 0px'
  }

  class App extends React.Component {
    constructor(props) {
    super(props)
      this.state = {
        inputFieldOpen: false,
        selectedStyle: null,
        selectedElement: null,
        setColor: null,
        colorWheelValue: '',
        enteredColorValue: ''
      }
    }
    componentDidMount() {
      const bgColorInput = document.getElementsByName("cm_template_bg_color")[0]
        const pluginFlexColorInput = document.getElementsByName("cm_template_plugin_flex_color")[0]
        const pluginFlexTextColorInput = document.getElementsByName("cm_template_plugin_flex_text_color")[0]

      console.log('Plugin Flex Color', pluginFlexColorInput.value)
      // get initial value for each input from hidden php form
      const colorStyles = {
        backgroundStyles: {
          backgroundColor: bgColorInput.value,
        },
        pluginFlexStyle : {
          backgroundColor: pluginFlexColorInput.value
        },
        pluginFlexText : {
          color: pluginFlexTextColorInput.value
        }
      }
      this.setState({setColor : colorStyles})
    }

    clickElement = (selectedStyle, selectedElement, e) => {
      e.stopPropagation()
      this.setState({inputFieldOpen: true})
      this.setState({selectedStyle})
      this.setState({selectedElement})
    }

    submitSetting = (e) => {
      const bgColorInput = document.getElementsByName("cm_template_bg_color")[0]
      const pluginFlexColorInput = document.getElementsByName("cm_template_plugin_flex_color")[0]
      const pluginFlexColorTextInput = document.getElementsByName("cm_template_plugin_flex_text_color")[0]
      e.preventDefault()
      const enteredSetting = e.target.elements.setting.value
      const {selectedStyle, selectedElement, setColor} = this.state
      if (selectedStyle === 'backgroundStyles') {
        bgColorInput.value = enteredSetting
      }
      if (selectedStyle === 'pluginFlexStyle') {
        pluginFlexColorInput.value = enteredSetting
      }
      if (selectedStyle === 'pluginFlexText') {
        pluginFlexColorTextInput.value = enteredSetting
      }

      const currentStyleData = {
        [selectedStyle]: {
          [selectedElement]: enteredSetting
        }
      }
      const newSetColor = Object.assign({}, setColor, currentStyleData)
      this.setState({setColor: newSetColor})
      this.setState({inputFieldOpen: false})
    }

    handleColorWheelChange = (e) => {
      const {enteredColorValue} = this.state
      const colorWheelValue = e.target.value
      this.setState({colorWheelValue})
      this.setState({enteredColorValue: colorWheelValue})
    }

    handleSettingInputChange = (e) => {
      this.setState({enteredColorValue: e.target.value})
    }

    render() {
      const {inputFieldOpen, setColor, colorWheelValue, enteredColorValue} = this.state
      console.log('enteredColorValue', enteredColorValue)
      console.log('colorWheelValue', colorWheelValue)
      console.log('setColor', setColor)
      return(
        <div>
          {
          inputFieldOpen &&
          <form onSubmit={this.submitSetting}>
            <input name="setting" type="text" onChange={this.handleSettingInputChange} value={enteredColorValue}/>
            <input type="color" value={colorWheelValue} onChange={this.handleColorWheelChange}/>
            <button type="submit">ok</button>
          </form>
          }
          <div onClick={this.clickElement.bind(this,'backgroundStyles', 'backgroundColor')} style={Object.assign({}, backgroundStyles,
            setColor && setColor.backgroundStyles && setColor.backgroundStyles)}>
            <div style={buttonGroupStyles}>
              <div style={buttonStyles}></div>
            </div>
            <div onClick={this.clickElement.bind(this, 'pluginFlexStyle', 'backgroundColor')} style={Object.assign({}, pluginFlexStyle,
              setColor && setColor.pluginFlexStyle && setColor.pluginFlexStyle)}>
              <p onClick={this.clickElement.bind(this, 'pluginFlexText', 'color')} style={
                Object.assign({},pluginFlexText, setColor && setColor.pluginFlexText && setColor.pluginFlexText)}>Temperature: 23.037</p>
            </div>
          </div>
        </div>
      )
    }
  }

ReactDOM.render(
  <App />,
  document.getElementById('cm-edit-appearance-preview')
);

</script>

