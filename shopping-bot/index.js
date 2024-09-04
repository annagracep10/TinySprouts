const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const { NlpManager } = require('node-nlp');
const cors = require('cors');
const fs = require('fs');

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(bodyParser.json());

const manager = new NlpManager({ languages: ['en'] });

try {
    const modelData = fs.readFileSync('model.nlp');
    manager.import(JSON.parse(modelData));
    console.log('Model loaded successfully.');
} catch (error) {
    console.error('Error loading the model:', error.message);
}

app.post('/chat', async (req, res) => {
    const { message } = req.body;
    const response = await manager.process('en', message);

    try {
        switch (response.intent) {
            case 'browse.plants':
                const plantResponse = await axios.get('http://localhost:9090/api/product/plants');
                const plants = plantResponse.data.map(plant => plant.name).join(', ');
                res.json({ reply: `Here are some plants: ${plants}` });
                break;

            case 'browse.planters':
                const planterResponse = await axios.get('http://localhost:9090/api/product/planters');
                const planters = planterResponse.data.map(planter => planter.name).join(', ');
                res.json({ reply: `Here are some planters: ${planters}` });
                break;

            case 'browse.seeds':
                const seedResponse = await axios.get('http://localhost:9090/api/product/seeds');
                const seeds = seedResponse.data.map(seed => seed.name).join(', ');
                res.json({ reply: `Here are some seeds: ${seeds}` });
                break;

            case 'general.returnPolicy':
                res.json({ reply: 'Our return policy allows you to return products within 30 days of purchase.' });
                break;

            case 'general.trackOrder':
                res.json({ reply: 'You can track your order using the tracking link sent to your email.' });
                break;

            case 'general.discounts':
                res.json({ reply: 'We offer various discounts throughout the year. Check our website for the latest deals.' });
                break;

            case 'general.paymentMethods':
                res.json({ reply: 'We accept all major credit cards, PayPal, and Razorpay.' });
                break;

            default:
                res.json({ reply: response.answer || 'Sorry, I didn\'t understand that.' });
                break;
        }
    } catch (error) {
        res.json({ reply: 'Sorry, I cannot fetch the data right now.' });
    }
});

app.listen(port, () => {
    console.log(`Shopping bot is running on port ${port}`);
});
