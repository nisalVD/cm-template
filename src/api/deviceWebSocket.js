import moment from "moment"

const websocketQuery = (time, timeFormat) => {
  return {
    authorization: "api:f7de8f7a525349f38c63596982634d50",
    _device_id: "30000c2a690cc6be",
    app_id: "2bf8fdd3b3144deea63aa54402938d68",
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
