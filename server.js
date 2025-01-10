const express = require("express");
const cors = require("cors");

// Your Langflow API Token
const APPLICATION_TOKEN = "AstraCS:yPSONliyoHblKXPWHlZnaCeH:94270adc3686e6a061893054b9ac7a71cef2cf20a30df27f513d6afee3d23e25";

// Langflow Client Class
class LangflowClient {
    constructor(baseURL, applicationToken) {
        this.baseURL = baseURL;
        this.applicationToken = applicationToken;
    }

    async post(endpoint, body, headers = { "Content-Type": "application/json" }) {
        headers["Authorization"] = `Bearer ${this.applicationToken}`;
        const url = `${this.baseURL}${endpoint}`;
        try {
            const response = await fetch(url, {
                method: "POST",
                headers: headers,
                body: JSON.stringify(body),
            });

            const responseMessage = await response.json();
            if (!response.ok) {
                throw new Error(`${response.status} ${response.statusText} - ${JSON.stringify(responseMessage)}`);
            }
            return responseMessage;
        } catch (error) {
            console.error("Request Error:", error.message);
            throw error;
        }
    }

    async initiateSession(flowId, langflowId, inputValue, inputType = "chat", outputType = "chat", stream = false, tweaks = {}) {
        const endpoint = `/lf/${langflowId}/api/v1/run/${flowId}?stream=${stream}`;
        return this.post(endpoint, { input_value: inputValue, input_type: inputType, output_type: outputType, tweaks: tweaks });
    }

    async runFlow(flowIdOrName, langflowId, inputValue, inputType = "chat", outputType = "chat", tweaks = {}, stream = false) {
        try {
            const initResponse = await this.initiateSession(flowIdOrName, langflowId, inputValue, inputType, outputType, stream, tweaks);
            return initResponse;
        } catch (error) {
            console.error("Error running flow:", error);
            throw error;
        }
    }
}

// Express App Setup
const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Langflow API Client
const langflowClient = new LangflowClient("https://api.langflow.astra.datastax.com", APPLICATION_TOKEN);
const flowIdOrName = "b26d257c-4ecc-4caf-ab9b-b09442118a8a"; // Replace with your flow ID
const langflowId = "6bc2fbed-0edb-40b0-b819-c8e74f4f9f94"; // Replace with your Langflow ID

// Endpoint for Chatbot
app.post("/api/chat", async (req, res) => {
    const { message } = req.body;

    if (!message) {
        return res.status(400).json({ error: "Message is required" });
    }

    try {
        const response = await langflowClient.runFlow(
            flowIdOrName,
            langflowId,
            message,
            "chat",
            "chat"
        );

        // Extracting response message
        const flowOutputs = response.outputs[0];
        const firstComponentOutputs = flowOutputs.outputs[0];
        const output = firstComponentOutputs.outputs.message;

        res.json({ reply: output.message.text });
    } catch (error) {
        console.error("Error handling request:", error);
        res.status(500).json({ error: "Failed to process the request" });
    }
});

// Start the Server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
