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
	const pluginFlexStyles = {
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
    cursor: 'pointer'
  }

  const buttonNormalStyles = {
    backgroundColor: '#77757a',
    color: '#fff'
  }

  const buttonHoverStyles = {
    backgroundColor: '#f16265',
    color: '#fff'
  }

  const buttonSelectedStyles = {
    backgroundColor: '#f16265',
    color: '#fff'
  }

  const ColorChangeInputField = ({
    name
  }) => {
    return (
      <input type="text" name={name}></input>
    )
  }

  class App extends React.Component {
    constructor(props) {
    super(props)
      this.state = {
        inputFieldOpen: false,
        setColor: null,
        selectedData: null,
        setMultipleColor: null,
        selectedElementsKey: null,
        selectedElementsArray: null
      }
    }
    componentDidMount() {
      const backgroundStylesBackgroundColor = document.getElementsByName("cm_template_bg_color")[0].value
      const pluginFlexStylesBackgroundColor = document.getElementsByName("cm_template_plugin_flex_color")[0].value
      const pluginFlexTextStylesColor = document.getElementsByName("cm_template_plugin_flex_text_color")[0].value
      const buttonGroupStylesBackgroundColor = document.getElementsByName("cm_template_plugin_button_group_bg")[0].value
      const buttonNormalStylesBackgroundColor = document.getElementsByName("cm_template_plugin_button_normal_bg")[0].value
      const buttonNormalStylesColor = document.getElementsByName("cm_template_plugin_button_normal_color")[0].value
      const buttonHoverStylesBackgroundColor = document.getElementsByName("cm_template_plugin_button_hover_bg")[0].value
      const buttonHoverStylesColor = document.getElementsByName("cm_template_plugin_button_hover_color")[0].value
      const buttonSelectedStylesBackgroundColor = document.getElementsByName("cm_template_plugin_button_selected_bg")[0].value
      const buttonSelectedColor = document.getElementsByName("cm_template_plugin_button_selected_color")[0].value

      // get initial value for each input from hidden php form
      const initialStyles = {
        backgroundStyles: {
          [!!backgroundStylesBackgroundColor && 'backgroundColor']: backgroundStylesBackgroundColor
        },
        buttonGroupStyles: {
          [!!buttonGroupStylesBackgroundColor && 'backgroundColor']: buttonGroupStylesBackgroundColor
        },
        buttonNormalStyles: {
          [!!buttonNormalStylesBackgroundColor && 'backgroundColor']: buttonNormalStylesBackgroundColor,
          [!!buttonNormalStylesColor && 'color']: buttonNormalStylesColor
        },
        buttonHoverStyles: {
          [!!buttonHoverStylesBackgroundColor && 'backgroundColor']: buttonHoverStylesBackgroundColor,
          [!!buttonHoverStylesColor && 'color']: buttonHoverStylesColor
        },
        buttonSelectedStyles: {
          [!!buttonSelectedStylesBackgroundColor && 'backgroundColor']: buttonSelectedStylesBackgroundColor,
          [!!buttonSelectedColor && 'color']: buttonSelectedColor
        },
        pluginFlexStyles: {
          [!!pluginFlexStylesBackgroundColor && 'backgroundColor']: pluginFlexStylesBackgroundColor
        },
        pluginFlexTextStyles : {
          [!!pluginFlexTextStylesColor && 'color']: pluginFlexTextStylesColor
        }
      }
      this.setState({setColor : initialStyles})
    }


    clickElement() {
      this.setState({inputFieldOpen: true})
      const argumentArr = Array.prototype.slice.call(arguments)
      const event = argumentArr[argumentArr.length - 1]
      // event actions
      event.preventDefault()
      event.stopPropagation()

      console.log('argumentArr', argumentArr)

      // arguments except the event method passed in onclick event
      const receivedArguments = argumentArr.slice(0, -1)

      let argumentKey = []
      let argumentKeyValue = []
      receivedArguments.forEach((argument, idx) => {
        if (idx%2 === 0){
          argumentKey.push(argument)
        } else {
          argumentKeyValue.push(argument)
        }
      })

      this.setState({selectedElementsKey: argumentKey})
      this.setState({selectedElementsArray: argumentKeyValue})
    }


    submitSettings = (e) => {
      e.preventDefault()
      const {selectedData, selectedElementsKey, selectedElementsArray, setColor} = this.state
      const elements = e.target.elements

      // selectedElemntArray is used to name the input field use
      // that to get all the values
      const elementFormData = selectedElementsArray.map(element => {
        return elements[element].value
      })
      console.log('submit settings selectedElementsKey', selectedElementsKey)
      console.log('submit settings selectedElementsArray', selectedElementsArray)

      const backgroundStylesBackgroundColor = document.getElementsByName("cm_template_bg_color")[0]
      const pluginFlexStylesBackgroundColor = document.getElementsByName("cm_template_plugin_flex_color")[0]
      const pluginFlexTextStylesColor = document.getElementsByName("cm_template_plugin_flex_text_color")[0]
      const buttonGroupStylesBackgroundColor = document.getElementsByName("cm_template_plugin_button_group_bg")[0]
      const buttonNormalStylesBackgroundColor = document.getElementsByName("cm_template_plugin_button_normal_bg")[0]
      const buttonNormalStylesColor = document.getElementsByName("cm_template_plugin_button_normal_color")[0]
      const buttonHoverStylesBackgroundColor = document.getElementsByName("cm_template_plugin_button_hover_bg")[0]
      const buttonHoverStylesColor = document.getElementsByName("cm_template_plugin_button_hover_color")[0]
      const buttonSelectedStylesBackgroundColor = document.getElementsByName("cm_template_plugin_button_selected_bg")[0]
      const buttonSelectedColor = document.getElementsByName("cm_template_plugin_button_selected_color")[0]

      const plugin = {
        backgroundStyles: {
          backgroundColor: backgroundStylesBackgroundColor
        },
        buttonGroupStyles: {
          backgroundColor: buttonGroupStylesBackgroundColor
        },
        buttonNormalStyles: {
          backgroundColor: buttonNormalStylesBackgroundColor,
          color: buttonNormalStylesColor
        },
        buttonHoverStyles: {
          backgroundColor: buttonHoverStylesBackgroundColor,
          color: buttonHoverStylesColor
        },
        buttonSelectedStyles: {
          backgroundColor: buttonSelectedStylesBackgroundColor,
          color: buttonSelectedColor
        },
        pluginFlexStyles: {
          backgroundColor: pluginFlexStylesBackgroundColor
        },
        pluginFlexTextStyles : {
          color: pluginFlexTextStylesColor
        }
      }

      const selectedParsedData = selectedElementsKey.reduce((acc, element, idx) => {
        // set the data to hidden form
        plugin[element][selectedElementsArray[idx]].value = elementFormData[idx]
        // compose the data to be displayed
        acc[element] = acc[element] || {}
        acc[element][selectedElementsArray[idx]] = elementFormData[idx]
        return acc
      },{})
      console.log('selectedParsedData', selectedParsedData)
      this.setState({setColor: Object.assign({}, setColor ,selectedParsedData)})
      this.setState({inputFieldOpen: false})

    }

    render() {
      const {setColor, inputFieldOpen, multipleSelectionData, selectedElementsArray} = this.state
      console.log('setColor', setColor)
      console.log('selectedElementsKeysArray', selectedElementsArray)
      console.log('multipleSelectionData', multipleSelectionData)
      return(
        <div>
          { inputFieldOpen &&
            <form onSubmit={this.submitSettings}>
              {
                selectedElementsArray.map(element => (
                  <div key={element}>
                    {element}{' '}
                    <ColorChangeInputField name={element} />
                    <br/>
                  </div>
                ))
              }
              <button type="submit">ok</button>
            </form>
          }
          <div onClick={this.clickElement.bind(this,'backgroundStyles', 'backgroundColor')} style={Object.assign({}, backgroundStyles,
            setColor && setColor.backgroundStyles)}>
            <div
              onClick={this.clickElement.bind(this, 'buttonGroupStyles', 'backgroundColor')}
              style={Object.assign({}, buttonGroupStyles, setColor && setColor.buttonGroupStyles)}>
              <button
                onClick={this.clickElement.bind(this, 'buttonNormalStyles',
                  'color', 'buttonNormalStyles', 'backgroundColor')}
                style={Object.assign({}, buttonStyles, buttonNormalStyles, setColor && setColor.buttonNormalStyles)}>
                 1 Week
              </button>
              <button
                onClick={this.clickElement.bind(this, 'buttonHoverStyles', 'color', 'buttonHoverStyles', 'backgroundColor')}
                style={Object.assign({}, buttonStyles, buttonHoverStyles,
                  setColor && setColor.buttonHoverStyles)}>
                1 Week(hover)
              </button>
              <button
                onClick={this.clickElement.bind(this, 'buttonSelectedStyles',
                  'color', 'buttonSelectedStyles', 'backgroundColor'
                )}
                style={Object.assign({}, buttonStyles, buttonSelectedStyles,
                  setColor && setColor.buttonSelectedStyles
                )}>
                1 Week(selected)
              </button>
            </div>
            <div onClick={this.clickElement.bind(this, 'pluginFlexTextStyles', 'color', 'pluginFlexStyles', 'backgroundColor')} style={Object.assign({}, pluginFlexStyles,
              setColor && setColor.pluginFlexStyles && setColor.pluginFlexStyles)}>
              <p style={Object.assign({}, pluginFlexTextStyles, setColor && setColor.pluginFlexTextStyles )}>Temperature: 23.037</p>
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

