const { default: Axios } = require("axios");

const apiBase = "https://corona.lmao.ninja/v2";

class api {
  constructor(apiBase) {
    this._apiBase = apiBase;

    this.axios = Axios.create({
      baseURL: this._apiBase,
      timeout: 10000,
    });
    this.axios.defaults.headers.post["Content-Type"] = "application/json";
  }

  get apiBase() {
    return this._apiBase;
  }

  get = (url, params = {}, timeout) => {
    return this.axios({
      method: "get",
      url,
      params,
      timeout: timeout ?? this.timeout,
    });
  };
}

const API = new api(apiBase);

export { API };
