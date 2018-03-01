<script src="https://unpkg.com/react@16/umd/react.development.js"></script>
<script src="https://unpkg.com/react-dom@16/umd/react-dom.development.js"></script>
<script src="https://unpkg.com/babel-standalone@6.15.0/babel.min.js"></script>
<div id="cm-edit-appearance-preview"></div>
<link rel="stylesheet" href="https://unpkg.com/huebee@1/dist/huebee.min.css">
<script crossorigin src="https://unpkg.com/huebee@1/dist/huebee.pkgd.min.js"></script>
<script type="text/babel">
  const backgroundStyles = {
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

    refdata = (e) => {
      console.log('e', e)
      const Huebee = window.Huebee
      var hueb = e && new Huebee( e, {
        // options
        notation: 'hex',
        saturations: 2,
      })
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
                    <input name={element} ref={this.refdata}  autoComplete="off" value=""/>
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

