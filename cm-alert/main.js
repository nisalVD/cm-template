const btn = document.getElementById('btn')
const pageBody = document.getElementById('pageBody')
const loadIcon = document.getElementById('loadIcon')
const errorMessage = document.getElementById('errorMessage')
const updateMessage = document.getElementById('updateMessage')
let KeysArray = null

//  capitalize function
function capitalize(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}


const { apiKey, appId, deviceId } = cm_device_info

const api = axios.create({
  baseURL: `https://api.staging.conctr.com/data/apps/${appId}/devices/${deviceId}/`,
  headers: {
    "Content-type": "application/json",
    Authorization: `api:${apiKey}`
  }
});

//  default setting
let settingData = null
api.post(`getdata`).then((alertconfigData) => {

  //  get data keys (e.g. humidity) from device info
  const alertconfigDataKeysArray = Object.keys(alertconfigData.data.data)
  const dataToFilter = [
    "acceleration_x",
    "acceleration_y",
    "acceleration_z",
    "battery",
    "_data",
    "_device_id",
    "_last_online",
    "_loc_point",
    "_location",
    "_model_id",
    "_rtid",
    "_ts",
    "_ts_entered",
    "_ts_w"
  ]

  KeysArray = alertconfigDataKeysArray.filter(
    key => dataToFilter.indexOf(key) < 0
  )


  //　create checkboxes based on keys
  KeysArray.forEach((key) => {

    const input = document.createElement('input');

    input.setAttribute('type', 'checkbox');
    input.setAttribute('id', key);
    input.setAttribute('name', key);
    input.setAttribute('value', key);

    const label = document.createElement('label');
    label.htmlFor = key
    label.style.margin = "0 10px 15px 0"
    label.appendChild(document.createTextNode(capitalize(key)));

    pageBody.appendChild(input);
    pageBody.appendChild(label);

  })

  // create input field
  KeysArray.forEach((key) => {

    const itemForm = document.createElement('div')
    itemForm.setAttribute('id', `${key}Form`)

    const title = document.createElement('h2')
    title.appendChild(document.createTextNode(capitalize(key)))
    itemForm.appendChild(title)

    const inputMax = document.createElement('input')
    inputMax.setAttribute('type', "number")
    inputMax.setAttribute('id', `${key}Max`)
    inputMax.setAttribute('placeholder', "max")

    const inputMin = document.createElement('input')
    inputMin.setAttribute('type', "number")
    inputMin.setAttribute('id', `${key}Min`)
    inputMin.setAttribute('placeholder', "min")

    itemForm.appendChild(inputMax)
    itemForm.appendChild(inputMin)

    pageBody.appendChild(itemForm)
  })

  // toggle logic(hide or show)

  KeysArray.forEach((key) => {
    document.getElementById(key).addEventListener('click', function (e) {
      const toggle = e.target.checked ? "block" : "none"
      document.getElementById(`${key}Form`).style.display = toggle
    })
  })

  //  after the api call show body and hide the loading icon
  loadIcon.style.display = "none"
  pageBody.style.display = "block"

  settingData = alertconfigData.data.data._data.alertconfig
  //  set checkbox default 
  settingData.selectedKey.forEach((key) => {
    document.getElementById(key).checked = true

    //  set  default value of each field
    document.getElementById(`${key}Max`).value = settingData[key]["GT"]
    document.getElementById(`${key}Min`).value = settingData[key]["LT"]
  })

  //  default shown keys
  KeysArray.forEach((key) => {
    const toggle = document.getElementById(key).checked ? "block" : "none"
    document.getElementById(`${key}Form`).style.display = toggle
  })

}).catch((error) => {
  // when couldn't get data
  loadIcon.style.display = "none"
  errorMessage.style.display = "block"
})

// alert updating
btn.addEventListener("click", function () {
  //  send data to conctr api

  // create selected keys array
  const shownKeysArray = KeysArray.map((key) => {
    const element = document.getElementById(key)
    if (element.checked) return element.value
  }).filter((element) => element)

  //  create data format
  const alertSettingFormat = { alertconfig: {} }
  alertSettingFormat.alertconfig["selectedKey"] = shownKeysArray

  KeysArray.forEach((key) => {
    alertSettingFormat.alertconfig[key] = {}

    if (document.getElementById(key).checked) {
      // when corresponding checkbox is checked
      alertSettingFormat.alertconfig[key]['GT'] = document.getElementById(`${key}Max`).value ? document.getElementById(`${key}Max`).value * 1 : null
      alertSettingFormat.alertconfig[key]['LT'] = document.getElementById(`${key}Min`).value ? document.getElementById(`${key}Min`).value * 1 : null
    } else {
      // when corresponding checkbox is not checked
      alertSettingFormat.alertconfig[key]['GT'] = null
      alertSettingFormat.alertconfig[key]['LT'] = null
    }
  })

  console.log(alertSettingFormat)


  api.post("/",
    JSON.stringify(alertSettingFormat),
    {
      headers: {
        "Content-type": "application/json",
        Authorization: `api:${apiKey}`
      }
    }
  ).then(() => {
    updateMessage.style.display = "block"
    btn.disabled = true
    const hideMessage = () => {
      updateMessage.style.display = "none"
      btn.disabled = false
    }
    setTimeout(hideMessage, 3000)
  })

})
