document.addEventListener("DOMContentLoaded", function() {
  function getApiUrl(idInstance) {
    const firstFourDigits = idInstance.slice(0, 4);
    return `https://${firstFourDigits}.api.greenapi.com`;
  }

  function sendGetRequest(url, callback) {
    fetch(url)
      .then(response => {
        if (!response.ok) {
          throw new Error('Ошибка HTTP: ' + response.status);
        }
        return response.json();
      })
      .then(data => callback(data))
      .catch(error => console.error("Ошибка:", error));
  }

  function sendPostRequest(url, body, callback) {
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Ошибка HTTP: ' + response.status);
      }
      return response.json();
    })
    .then(data => callback(data))
    .catch(error => console.error("Ошибка:", error));
  }

  const getSettingsButton = document.getElementById("getSettings");
  getSettingsButton.addEventListener("click", function() {
    const idInstance = document.getElementById("idInstance").value;
    const apiTokenInstance = document.getElementById("ApiTokenInstance").value;
    const apiUrl = getApiUrl(idInstance);
    const endpoint = `/waInstance${idInstance}/getSettings/${apiTokenInstance}`;
    
    sendGetRequest(apiUrl + endpoint, function(response) {
      const serverResponseElement = document.getElementById("serverResponse");
      serverResponseElement.textContent = JSON.stringify(response, null, 2);
    });
  });

  const getStateInstanceButton = document.getElementById("getStateInstance");
  getStateInstanceButton.addEventListener("click", function() {
    const idInstance = document.getElementById("idInstance").value;
    const apiTokenInstance = document.getElementById("ApiTokenInstance").value;
    const apiUrl = getApiUrl(idInstance);
    const endpoint = `/waInstance${idInstance}/getStateInstance/${apiTokenInstance}`;
    
    sendGetRequest(apiUrl + endpoint, function(response) {
      const serverResponseElement = document.getElementById("serverResponse");
      serverResponseElement.textContent = JSON.stringify(response, null, 2);
    });
  });

  const sendMessageButton = document.getElementById("sendMessage");
  sendMessageButton.addEventListener("click", function() {
    const idInstance = document.getElementById("idInstance").value;
    const apiTokenInstance = document.getElementById("ApiTokenInstance").value;
    const chatId = document.getElementById("chatId").value + "@c.us";
    const message = document.getElementById("message").value;
    const apiUrl = getApiUrl(idInstance);
    const endpoint = `/waInstance${idInstance}/sendMessage/${apiTokenInstance}`;

    const body = {
      chatId: chatId,
      message: message
    };
    
    sendPostRequest(apiUrl + endpoint, body, function(response) {
      const serverResponseElement = document.getElementById("serverResponse");
      serverResponseElement.textContent = JSON.stringify(response, null, 2);
    });
  });

  const sendFileButton = document.getElementById("sendFile");
  sendFileButton.addEventListener("click", function() {
    const idInstance = document.getElementById("idInstance").value;
    const apiTokenInstance = document.getElementById("ApiTokenInstance").value;
    const chatIdFile = document.getElementById("chatIdFile").value + "@c.us";
    const fileUrl = document.getElementById("fileUrl").value;
    const fileName = document.getElementById("fileName").value;
    const apiUrl = getApiUrl(idInstance);
    const endpoint = `/waInstance${idInstance}/sendFileByUrl/${apiTokenInstance}`;

    const body = {
      chatId: chatIdFile,
      urlFile: fileUrl,
      fileName: fileName
    };
    
    sendPostRequest(apiUrl + endpoint, body, function(response) {
      const serverResponseElement = document.getElementById("serverResponse");
      serverResponseElement.textContent = JSON.stringify(response, null, 2);
    });
  });
});

