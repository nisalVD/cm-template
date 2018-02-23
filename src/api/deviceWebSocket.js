import moment from "moment"

const websocketQuery = (time, timeFormat) => {
  return {
    authorization: `api:${window.cm_device_info.api_key}`,
    _device_id: window.cm_device_info.device_id,
    app_id: window.cm_device_info.app_id,
    limit: 10000,
    orderBy: [
      {
        field: "_ts",
        asc: true
      }
    ],
    access_level: "admin",
    where: {
      _ts: {
        type: "datetime",
        gt: moment()
          .utc()
          .subtract(time, timeFormat)
          .format()
      }
    }
  }
}

export { websocketQuery }
