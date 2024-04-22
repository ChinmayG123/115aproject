const GameClient = require('./gameClient');  // Adjust the path to where your GameClient class is defined

async function testGetUserDictionary() {
    const username = "LanguageUserTest3";
    const language = "spanish";

    const client = new GameClient();
    try {
        const result = await client.getUserDictionary(username, language);
        console.log('Test result:', result);
    } catch (error) {
        console.error('Error during test:', error);
    }
}

testGetUserDictionary();
