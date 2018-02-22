import axios from "axios"

const api = axios.create({
  baseURL: `https://api.staging.conctr.com/data/apps/${window.cm_device_info.app_id}/devices/${window.cm_device_info.device_id}/getdata`,

  headers: {
    "Content-type": "application/json",
    Authorization: `api:${window.cm_device_info.api_key}`
  }
});

// for getting alert setting
export function getAlertConfig() {
  return api.post()
    .then(res => res.data.data._data.alertconfig)
    .catch(error => {
      throw Error(error)
    })
}