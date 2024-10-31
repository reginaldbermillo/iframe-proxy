const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');

const app = express();
const PORT = 3000;

app.get('/proxy', async (req, res) => {
    const targetUrl = 'https://www.google.com'; // Change to the desired URL

    try {
        const response = await axios.get(targetUrl);
        const html = response.data;

        // Load HTML with Cheerio
        const $ = cheerio.load(html);

        // Modify CSS (add a style tag)
        $('head').append('<style>body { background-color: lightblue; }</style>');

        // Send modified HTML back
        res.send($.html());
    } catch (error) {
        res.status(500).send('Error fetching the page.');
    }
});

app.listen(PORT, () => {
    console.log(`Proxy server running on http://localhost:${PORT}`);
});
