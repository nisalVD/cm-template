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
	let pluginFlexStyle = {
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

	let pluginFlexText = {
		color: 'blue'
	}
  class App extends React.Component {
    constructor(props) {
    super(props)
      this.state = {
        inputFieldOpen: false,
        selectedStyle: null,
        selectedElement: null,
        setColor: null,
      }
    }
    componentDidMount() {
      const bgColorInput = document.getElementsByName("cm_template_bg_color")[0]
        const pluginFlexColorInput = document.getElementsByName("cm_template_plugin_flex_color")[0]

      console.log('Plugin Flex Color', pluginFlexColorInput.value)
      const colorStyles = {
        backgroundStyles: {
          backgroundColor: bgColorInput.value,
        },
        pluginFlexStyle : {
          backgroundColor: pluginFlexColorInput.value
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
      e.preventDefault()
      const enteredSetting = e.target.elements.setting.value
      const {selectedStyle, selectedElement, setColor} = this.state

      if (selectedStyle === 'backgroundStyles') {
        bgColorInput.value = enteredSetting
      }
      if (selectedStyle === 'pluginFlexStyle') {
        pluginFlexColorInput.value = enteredSetting
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

    render() {
      const {inputFieldOpen, setColor} = this.state
      console.log('setColor', setColor)
      return(
        <div>
          {
          inputFieldOpen &&
          <form onSubmit={this.submitSetting}>
            <input name="setting" type="text"/>
            <button type="submit">ok</button>
          </form>
          }
          <div onClick={this.clickElement.bind(this,'backgroundStyles', 'backgroundColor')} style={Object.assign({}, backgroundStyles,
            setColor && setColor.backgroundStyles && setColor.backgroundStyles)}>
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

