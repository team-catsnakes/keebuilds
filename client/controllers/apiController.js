export const saveBuild = (optionsObject) => {
  const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(optionsObject)
    },
    url = '/api/build';
  console.log('about to send POST request to ' + url);
  console.logo({options});
  fetch(url, options)
    .then((response) => {
      console.log({response});
      return response;
    })
    .catch(e => console.log(e));
};

export const getBuildsForSessions = (sessionId) => {
  const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    },
    url = '/api/session';
  console.log('about to send GET request to ' + url);
  console.logo({options});
  fetch(url, options)
    .then(data => data.json())
    .then(data => {
      console.log(data);
      return data;
    })
    .catch(e => console.log(e));
};