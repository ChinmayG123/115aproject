const GameClient = require('./gameClient');  // Adjust the path to where your GameClient class is defined

async function testGetUserDictionary() {
    const username = "LanguageUserTest3";
    const language = "french";

    const client = new GameClient();
    try {
        const result = await client.getUserDictionary(username, language);
        console.log('testGetUserDictionary() result:', result);
    } catch (error) {
        console.error('Error during test:', error);
    }
}

async function testlearnNewWord() {
    const username = "TestApril23";
    const language = "spanish";
    const new_word = "school"
    const client = new GameClient();
    try {
        const result = await client.learnNewWord(username, language, new_word);
        console.log('testlearnNewWord()\'s result:', result);
    } catch (error) {
        console.error('Error during test:', error);
    }

}

async function testupProficiency() {
    const username = "TestApril232ndUser";
    const language = "spanish";
    const word = "airport"
    const client = new GameClient();
    try {
        const result = await client.upProficiency(username, language, word);
        console.log('testupProficiency()\'s result:', result);
    } catch (error) {
        console.error('Error during test:', error);
    }
}

async function test_getAllWordsByCategory() {
    const category = "locations"
    const username = "TestApril232ndUser"
    const client = new GameClient();
    try {
        const result = await client.getAllWordsByCategory(username, category);
        console.log('test_getAllWordsByCategory()\'s result:\n', result);
    } catch (error) {
        console.error('Error during test:', error);
    }
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// testGetUserDictionary();
// sleep(1000);
// testlearnNewWord();
// sleep(1000);
// testupProficiency();
test_getAllWordsByCategory();