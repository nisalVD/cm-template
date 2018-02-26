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
	let pluginFlex = {
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
        bgColor: document.getElementsByName("cm_template_bg_color")[0].value,
        primaryColor: document.getElementsByName("cm_template_primary_color")[0].value,
        secondaryColor: document.getElementsByName("cm_template_secondary_color")[0].value,
        inputFieldOpen: false,
        selectedStyle: null,
        selectedElement: null,
        setColor: null,
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

    clickElement = (selectedStyle, selectedElement, e) => {
      e.stopPropagation()
      this.setState({inputFieldOpen: true})
      this.setState({selectedStyle})
      this.setState({selectedElement})
    }

    submitSetting = (e) => {
      e.preventDefault()
      const enteredSetting = e.target.elements.setting.value
      const {selectedStyle, selectedElement, setColor} = this.state
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
      const {bgColor, primaryColor, secondaryColor, inputFieldOpen, setColor} = this.state
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
            <div onClick={this.clickElement.bind(this, 'pluginFlex', 'backgroundColor')} style={Object.assign({}, pluginFlex,
              setColor && setColor.pluginFlex && setColor.pluginFlex)}>
              <p style={pluginFlexText}>Temperature: 23.037</p>
            </div>
            <p className="">Background Color: {bgColor}</p>
            <p>Primary Color: {primaryColor}</p>
            <p>Secondary Color: {secondaryColor}</p>
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

