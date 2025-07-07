import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import  { z } from "zod";

// 1. Create server

const server = new McpServer({
    name: "Demo",
    version: "1.0.0"
});

// 2. define tools
server.tool(
    'FetchWeather', // Tool title
    'Fetches the current weather for a given city', // Tool description
    {
        city : z.string().describe("City name"), // Tool parameters
    }, 
    async ({ city }) => {
        const response = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${ city }&count=10&language=en&format=json`)
        const data = await response.json();
        if (data.results.length === 0) {
            return {
                content: [
                    {
                        type: 'text',
                        text: `No results found for city: ${city}`
                    }
                ]
            };
        }

        const { latitude, longitude } = data.results[0];

        const weatherResponse = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m&current=temperature_2m,precipitation,rain,apparent_temperature,is_day&forecast_days=1`);

        const weatherData = await weatherResponse.json();

        // Simulate fetching weather data
        return {
            content : [
                {
                    type: 'text',
                    text: JSON.stringify(weatherData, null, 2)
                }
            ]
        };
    }
)

// 3. Listen for requests
const transport = new StdioServerTransport()
await server.connect(transport)
