class LangflowClient {
    constructor(baseURL, applicationToken) {
      this.baseURL = baseURL;
      this.applicationToken = applicationToken;
    }
  
    async post(endpoint, body) {
      const proxyUrl = "http://localhost:3000/proxy"; // Update with your live proxy URL after deployment
      const apiUrl = `${this.baseURL}${endpoint}`;
  
      try {
        const response = await fetch(proxyUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            url: apiUrl,
            method: "POST",
            headers: {
              Authorization: `Bearer ${this.applicationToken}`,
              "Content-Type": "application/json",
            },
            body: body,
          }),
        });
  
        const responseMessage = await response.json();
        if (!response.ok) {
          throw new Error(
            `${response.status} ${response.statusText} - ${JSON.stringify(responseMessage)}`
          );
        }
        return responseMessage;
      } catch (error) {
        console.error("Request Error:", error.message);
        throw error;
      }
    }
  }
  
