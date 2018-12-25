import axios from 'axios';

const responseInterceptor = new WeakMap();
class HTTPRequest {
  constructor(URL = '/', method = 'GET') {
    this.URL = URL;
    this.method = method;
    const responseInterceptorFunction = data => {
      try {
        const JSONParsedData = JSON.parse(data);
        return JSONParsedData.body;
      } catch (ex) {
        throw new Error(ex);
      }
    };

    responseInterceptor.set(this, responseInterceptorFunction);
  }

  set url(value) {
    this.URL = value;
  }

  get completeURL() {
    return `http://localhost:8085${this.URL}`;
  }

  connect() {
    const { url, method, body, query } = this;
    return axios({
      url,
      method,
      body,
      query,
      transformResponse: [responseInterceptor.get(this)],
    }).then(data => {
      const newData = data;
      if (data.status > 100 && data.status < 300) {
        newData.ok = true;
      } else newData.ok = false;
      return newData;
    });
  }
}

export default HTTPRequest;
