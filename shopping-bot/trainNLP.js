const { NlpManager } = require('node-nlp');
const fs = require('fs');

const manager = new NlpManager({ languages: ['en'], forceNER: true });


manager.addDocument('en', 'hello', 'greeting.hello');
manager.addDocument('en', 'hi', 'greeting.hello');
manager.addDocument('en', 'hii', 'greeting.hello');
manager.addDocument('en', 'hey', 'greeting.hello');
manager.addDocument('en', 'thanks', 'thanks');
manager.addDocument('en', 'thank you', 'thanks');
manager.addDocument('en', 'help', 'help');
manager.addDocument('en', 'I need help', 'help');
manager.addDocument('en', 'can you assist me', 'help');
manager.addDocument('en', 'what can you do', 'help');
manager.addDocument('en', 'how are you', 'greeting.howAreYou');
manager.addDocument('en', 'what’s up', 'greeting.howAreYou');
manager.addDocument('en', 'goodbye', 'goodbye');
manager.addDocument('en', 'bye', 'goodbye');
manager.addDocument('en', 'see you later', 'goodbye');

manager.addDocument('en', 'show me plants', 'browse.plants');
manager.addDocument('en', 'I want to see planters', 'browse.planters');
manager.addDocument('en', 'I need some seeds', 'browse.seeds');
manager.addDocument('en', 'Can you show me some plants?', 'browse.plants');
manager.addDocument('en', 'What planters do you have?', 'browse.planters');
manager.addDocument('en', 'Do you have seeds?', 'browse.seeds');

manager.addDocument('en', 'What is your return policy?', 'general.returnPolicy');
manager.addDocument('en', 'How can I track my order?', 'general.trackOrder');
manager.addDocument('en', 'Do you offer discounts?', 'general.discounts');
manager.addDocument('en', 'What payment methods do you accept?', 'general.paymentMethods');

manager.addAnswer('en', 'greeting.hello', 'Hi, it’s Sprouts. How can I help you today?');
manager.addAnswer('en', 'thanks', 'You’re welcome! If you need anything else, just let me know.');
manager.addAnswer('en', 'help', 'I’m here to help! What do you need assistance with?');
manager.addAnswer('en', 'greeting.howAreYou', 'I’m just a bot, but I’m here to assist you! How can I help?');
manager.addAnswer('en', 'goodbye', 'Goodbye! Have a great day!');

manager.addAnswer('en', 'greeting.hello', 'Hi, it’s Sprouts. How can I help you?');
manager.addAnswer('en', 'browse.plants', 'Here are some plants.');
manager.addAnswer('en', 'browse.planters', 'Here are some planters.');
manager.addAnswer('en', 'browse.seeds', 'Here are some seeds.');

manager.addAnswer('en', 'general.returnPolicy', 'Our return policy allows you to return products within 30 days of purchase.');
manager.addAnswer('en', 'general.trackOrder', 'You can track your order using the tracking link sent to your email.');
manager.addAnswer('en', 'general.discounts', 'We offer various discounts throughout the year. Check our website for the latest deals.');
manager.addAnswer('en', 'general.paymentMethods', 'We accept all major credit cards, PayPal, and Razorpay.');

(async () => {
    await manager.train();
    manager.save();
    fs.writeFileSync('model.nlp', manager.export());
    console.log('NLP model trained and saved.');
})();
