const fetcher = function(url, cb, headers) {
  fetch(url, headers)
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
          let errorMessage = `${response.status} (${response.statusText})`;
          throw(new Error(errorMessage)); 
        }
    })
    .then(json => {
      cb(null, json);
    })
    .catch(error => cb(error));
};

const blobber = function(body) {
  return new Blob([JSON.stringify(body, null, 2)], {type : 'application/json'});
}

export default {
  get(url, cb) {
    fetcher(url, cb, {});
  },
  post(url, body, cb) {
    fetcher(url, cb, { method: 'POST', body: blobber(body) });
  },
  put(url, body, cb) {
    fetcher(url, cb, { method: 'PUT', body: blobber(body) });
  },
  delete(url, body, cb) {
    console.log('%cdelete:', 'color:lime', url, body);
    fetcher(url, cb, { method: 'DELETE', body: blobber(body) });
  }
};
