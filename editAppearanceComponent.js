<script src="https://unpkg.com/react@16/umd/react.development.js"></script>
<script src="https://unpkg.com/react-dom@16/umd/react-dom.development.js"></script>
<script src="https://unpkg.com/babel-standalone@6.15.0/babel.min.js"></script>
<div id="cm-edit-appearance-preview"></div>
<script type="text/babel">
  let backgroundStyles = {
		width: 592,
		height: 500,
    borderTop: '1px solid #e3e6ea',
		borderBottom: '1px solid #e3e6ea',
		backgroundColor: '#fff',
		color: '#f16265',
		marginBottom: 1,
		cursor: 'pointer',
    paddingTop: 15
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
	const pluginFlexTextStyles = {
		color: 'blue'
	}
  const buttonGroupStyles = {
    width: '100%',
    height: 42,
    backgroundColor: 'dodgerBlue',
    textAlign: 'center',
  }
  const buttonStyles = {
    width: 130,
    height: 42,
    fontSize: 12,
    textAlign: 'center',
    backgroundColor: '#77757a',
    borderRadius: '5px 5px 0px 0px',
    textAlign: 'center',
    fontFamily: 'sans-serif',
    fontSize: 13,
    fontWeight: 'bold',
    color: '#fff',
  }

  const buttonHoverStyles = {
    backgroundColor: '#f4c2b2'
  }

  const buttonSelectedStyles = {
    backgroundColor: '#f16265'
  }

  class App extends React.Component {
    constructor(props) {
    super(props)
      this.state = {
        inputFieldPrimaryOptionOpen: false,
        inputFieldMultipleOptions: false,
        selectedStyle: null,
        selectedElement: null,
        setColor: null,
        colorWheelValue: '',
        enteredColorValue: '',
        multipleSelectedData: null,
        setMultipleColor: null
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
        pluginFlexTextStyles : {
          color: pluginFlexTextColorInput.value
        }
      }
      this.setState({setColor : colorStyles})
    }

    // if only 1 element needs to be changed
    clickElement = (selectedStyle, selectedElement, e ) => {
      e.preventDefault()
      e.stopPropagation()
      this.setState({inputFieldMultipleOptions: false})
      this.setState({inputFieldPrimaryOptionOpen: true})
      this.setState({selectedStyle})
      this.setState({selectedElement})
    }

    // if more than 2 styles needs to be changed

    submitSetting = (e) => {
      const bgColorInput = document.getElementsByName("cm_template_bg_color")[0]
      e.preventDefault()
      const enteredSetting = e.target.elements.setting.value
      const {selectedStyle, selectedElement, setColor} = this.state
      if (selectedStyle === 'backgroundStyles') {
        bgColorInput.value = enteredSetting
      }
      const currentStyleData = {
        [selectedStyle]: {
          [selectedElement]: enteredSetting
        }
      }
      const newSetColor = Object.assign({}, setColor, currentStyleData)
      this.setState({setColor: newSetColor})
      this.setState({inputFieldPrimaryOptionOpen: false})
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

    // handle background color and text color
    clickWithTextElement = (primaryStyle, primaryElement, secondaryStyle, secondaryElement, e) => {
      e.preventDefault()
      e.stopPropagation()
      this.setState({inputFieldPrimaryOptionOpen: false})
      this.setState({inputFieldMultipleOptions: true})
      const selectedData = {
        [primaryStyle]: primaryElement,
        [secondaryStyle]: secondaryElement
      }
      this.setState({multipleSelectedData: selectedData})
    }

    submitMultipleSettings = (e) => {
      e.preventDefault()
      const pluginFlexColorInput = document.getElementsByName("cm_template_plugin_flex_color")[0]
      const pluginFlexColorTextInput = document.getElementsByName("cm_template_plugin_flex_text_color")[0]
      const elements = e.target.elements
      const backgroundColor = elements.backgroundColor.value
      const textColor = elements.textColor.value
      const {multipleSelectedData} = this.state
      const multipleSelectedDataKeys = Object.keys(multipleSelectedData)
      const data = {
        [multipleSelectedDataKeys[0]]: {
          backgroundColor
        },
        [multipleSelectedDataKeys[1]]: {
          color: textColor
        }
      }
      //check if its the correct type
      if(multipleSelectedDataKeys[0] === 'pluginFlexStyle' && multipleSelectedDataKeys[1] === 'pluginFlexTextStyles'){
        pluginFlexColorInput.value = backgroundColor
        pluginFlexColorTextInput.value = textColor
      }
      this.setState({setColor: data})
      this.setState({inputFieldMultipleOptions: false})
    }

    render() {
      const {inputFieldPrimaryOptionOpen, setColor, colorWheelValue, enteredColorValue, inputFieldMultipleOptions, multipleSelectionData} = this.state
      console.log('enteredColorValue', enteredColorValue)
      console.log('colorWheelValue', colorWheelValue)
      console.log('setColor', setColor)
      console.log('multipleSelectionData', multipleSelectionData)
      return(
        <div>
          {
          inputFieldPrimaryOptionOpen &&
            <form onSubmit={this.submitSetting}>
              BackgroundColor{' '}<input name="setting" type="text" onChange={this.handleSettingInputChange} value={enteredColorValue}/>
                <input type="color" value={colorWheelValue} onChange={this.handleColorWheelChange}/>
              <button type="submit">ok</button>
            </form>
          }
          { inputFieldMultipleOptions &&
          <form onSubmit={this.submitMultipleSettings}>
            Background Color:{''}<input type="text" name="backgroundColor"/>
            <br/>
            Text Color:<input type="text" name="textColor"/>
            <br/>
            <button type="submit">ok</button>
          </form>
          }
          <div onClick={this.clickElement.bind(this,'backgroundStyles', 'backgroundColor')} style={Object.assign({}, backgroundStyles,
            setColor && setColor.backgroundStyles && setColor.backgroundStyles)}>
            <div style={buttonGroupStyles}>
              <button style={buttonStyles}>
                 1 Week
              </button>
              <button style={Object.assign({}, buttonStyles, buttonHoverStyles)}>
                1 Week(hover)
              </button>
              <button style={Object.assign({}, buttonStyles, buttonSelectedStyles)}>
                1 Week(selected)
              </button>
            </div>
            <div onClick={this.clickWithTextElement.bind(this, 'pluginFlexStyle', 'backgroundColor', 'pluginFlexTextStyles', 'color')} style={Object.assign({}, pluginFlexStyle,
              setColor && setColor.pluginFlexStyle && setColor.pluginFlexStyle)}>
              <p style={Object.assign({}, pluginFlexTextStyles, setColor && setColor.pluginFlexTextStyles)}>Temperature: 23.037</p>
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

