/**
 * Class containing VocabVenture Client API. Each function creates a dedicated client. Implemented functions:
 * 
 * validateUser(username, password);
 * addNewUser(username, password);
 * getUserDictionary(username, language);
 * updateUserDictionary(username, language, word, proficiency = 5);
 * learnNewWord(username, language, word);
 * upProficiency(username, language, word);
 * downProficiency(username, language, word);
 */
class GameClient {
    // Private fields
    #HOST = '149.28.199.169';
    // #HOST = '127.0.0.1';
    #PORT = 8080;
    #DEBUG = false;

    constructor() {
        this.baseURL = `http://${this.#HOST}:${this.#PORT}`;
        this.userTable = '/userlist';
        this.userProgress = '/progress'
        this.allDict = '/total'
    }


    /**
     * Validates a user by sending a GET request with custom headers for username and password.
     *
     * @param {string} username - The username to validate.
     * @param {string} password - The password associated with the username.
     * @returns {Promise<number>} - A promise that resolves to:
     *                               0 if successful,
     *                               1 if username not exist,
     *                               2 if password is incorrect
     *                              -1 for malformed input or any other error.
     */
    async validateUser(username, password) {
        if (username.length === 0 || password.length === 0) {
            return -1;
        }

        const options = {
            method: 'GET',
            headers: {
                'Username': username,
                'Password': password
            }
        };
        const response = await this.retrieveData(this.userTable, options);
        this.printDebug(response);
        switch (response.status) {
            case 200:
                return 0;
            case 404:
                return 1;
            case 403:
                return 2;
            default:
                return -1;
        }
    }

    /**
     * Create a user by sending a POST request with custom headers for username and password.
     *
     * @param {string} username - The username to create.
     * @param {string} password - The password associated with the username.
     * @returns {Promise<number>} - A promise that resolves to:
     *                               0 if the registration successful,
     *                               1 if username already exist,
     *                               2 if username or password is invalid(malformed),
     *                              -1 for any other error or unknown status code.
     */
    async addNewUser(username, password) {
        if (username.length === 0 || password.length === 0) {
            return 2;
        }
        const options = {
            method: 'POST',
            headers: {
                'Username': username,
                'Password': password
            }
        };
        const response = await this.retrieveData(this.userTable, options);
        this.printDebug(response);
        switch (response.status) {
            case 200: return 0; // 200 OK
            case 409: return 1; // 409 Conflict
            case 406: return 2; // 406 Not Acceptable
            default: return -1;
        }
    }

    /**
     * Retrieves a user's dictionary data by sending a GET request.
     * This method is used to fetch language-specific data for a given user, which
     * include records like a list of learned words.
     *
     * @param {string} username - The username to identify the user whose data is being requested.
     * @param {string} language - The user's current language context (e.g., french, spanish).
     *
     * @returns {Promise<Object|null>} - A JSON object or null if the data cannot be retrieved,
     *                                   which could occur due to invalid credentials, or internal server issues.
     *                                   The function returns an object directly related to the language learning context,
     *                                   such as a list of words, or a structured object containing language learning progress.

     * Possible Resolutions:
     * - { apple: 5, banana: 3, pear: 1 } // Sample data format if successful.
     * - null // If there is an error or data cannot be found.
     */
    async getUserDictionary(username, language) {

        const options = {
            method: 'GET',
            headers: {
                'Username': username,
                'Game-Language': language,
                'Target-Asset': 'learned'
            }
        };
        const response = await this.retrieveData(this.userProgress, options);
        if (this.#DEBUG)
            this.printDebug(response);
        if (response.status === 200) {
            return await response.json(); // Assuming JSON response
        } else {
            return null; // Error or data not found
        }
    }

    /**
     * Notify the server that a user has learned a new word.
     * Use the proficiency parameter to change user's existing record
     *
     * @param {string} username - The username to identify the user whose data is being requested.
     * @param {string} language - The user's current language context (e.g., french, spanish).
     * @param {string} word -     The specific word to learn
     * @param {number} [proficiency=5] - The number represent user's proficiency (1 - 10)
     * @returns {Promise<number>} - A promise that resolves to:
     *                               0 if the update is successful,
     *                               1 if word not exist in database,
     *                              -1 for any other error or unknown status code.
     */
    async updateUserDictionary(username, language, word, proficiency = 5) {

        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Username': username,
                'Game-Language': language
            },
            body: JSON.stringify({ [word]: proficiency })
        };
        const response = await this.retrieveData(this.userProgress, options);
        this.printDebug(response);
        switch (response.status) {
            case 200: case 201: return 0; // 200 OK, 201 Created
            case 404: return 1; // 404 Not Found
            default: return -1;
        }
    }
    /**
     * 
     * @param {*} username 
     * @param {*} language 
     * @param {*} word 
     * @returns {Promise<number>} - A promise that resolves to:
     *                               0 if the update is successful,
     *                               1 if word not exist in database,
     *                              -1 for any other error or unknown status code.
     */
    async learnNewWord(username, language, word) {

        const options = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Username': username,
                'Game-Language': language,
                'Action': 'learn'
            },
            body: word
        };
        const response = await this.retrieveData(this.userProgress, options);
        this.printDebug(response);
        switch (response.status) {
            case 200: case 201: return 0; // 200 OK, 201 Created
            case 404: return 1; // 404 Not Found
            default: return -1;
        }
    }

    async upProficiency(username, language, word) {

        const options = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Username': username,
                'Game-Language': language,
                'Action': 'proficiency up'
            },
            body: word
        };
        const response = await this.retrieveData(this.userProgress, options);
        this.printDebug(response);
        switch (response.status) {
            case 200: case 201: return 0; // 200 OK, 201 Created
            case 404: return 1; // 404 Not Found
            default: return -1;
        }
    }

    async downProficiency(username, language, word) {

        const options = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Username': username,
                'Game-Language': language,
                'Action': 'proficiency down'
            },
            body: word
        };
        const response = await this.retrieveData(this.userProgress, options);
        this.printDebug(response);
        switch (response.status) {
            case 200: case 201: return 0; // 200 OK, 201 Created
            case 404: return 1; // 404 Not Found
            default: return -1;
        }
    }
    /**
     * Get all available words in database within a certain category
     * @param {*} username 
     * @param {*} language 
     * @param {*} word 
     * @returns {Promise<number>} - A promise that resolves to:
     *                               0 if the update is successful,
     *                               1 if word not exist in database,
     *                              -1 for any other error or unknown status code.
     */
    async getAllWordsByCategory(username, category) {

        const options = {
            method: 'GET',
            headers: {
                'Username': username,
                'Target-Asset': category
            }
        };
        const response = await this.retrieveData(this.allDict, options);
        this.printDebug(response);
        if (response.status === 200) {
            return await response.json();
        } else {
            return null; // Error or data not found
        }
    }

    async getProgressPercentage(username, language) {

        const options = {
            method: 'GET',
            headers: {
                'Username': username,
                'Game-Language': language,
                'Target-Asset': 'percentage'
            }
        };
        const response = await this.retrieveData(this.userProgress, options);
        this.printDebug(response);
        if (response.status === 200) {
            return await response.json();
        } else {
            return null; // Error or data not found
        }
    }

    async getTranslation(username, language, word) {

        const options = {
            method: 'GET',
            headers: {
                'Username': username,
                'Game-Language': language,
                'Target-Word': word
            },
        };
        const response = await this.retrieveData(this.allDict, options);
        this.printDebug(response);
        if (response.status === 200) {
            return await response.json();
        } else {
            return null; // Error or data not found
        }
    }

    async getUserQuiz(username, language) {
        const learned_words = await this.getUserDictionary(username, language);
        if (this.#DEBUG)
            console.log('The user has learned: \n', learned_words, "\n\n");
        const keys = Object.keys(learned_words);
        const weights = Object.values(learned_words);
        const cumulativeWeights = [];
        let totalWeight = 0;
        for (let weight of weights) {
            totalWeight += weight;
            cumulativeWeights.push(totalWeight);
        }

        // Generate a random number between 0 and the total weight
        const randomNum = Math.random() * totalWeight;

        // Find the corresponding item using linear search
        for (let i = 0; i < cumulativeWeights.length; i++) {
            if (randomNum < cumulativeWeights[i]) {
                return keys[i];
            }
        }

        return null; // Should not occur unless there's an error in the data
    }

    // private function
    async retrieveData(target, options) {
        // Create a promise that rejects in 5000 milliseconds (5 seconds)
        const timeoutPromise = new Promise((_, reject) => {
            setTimeout(() => {
                reject(new Error('Request timed out')); // Reject with an error when timeout is reached
            }, 5000); // Timeout set to 5 seconds
        });

        try {
            const response = await Promise.race([
                fetch(`${this.baseURL}${target}`, options), // The actual fetch request
                timeoutPromise                               // The timeout promise
            ]);
            return response

        } catch (error) {
            console.error('Error during the fetch operation:', error);
            return -1; // Error condition
        }
    }

    printDebug(response) {
        // Log the response status line for debugging
        console.log(`Response status line: HTTP/${response.status} ${response.statusText}`);

        // Log all response headers
        console.log('Response headers:');
        response.headers.forEach((value, key) => {
            console.log(`${key}: ${value}`);
        });
        console.log(response)
    }

}

// Export for Node.js (CommonJS)
if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
    module.exports = GameClient;
} else {
    // Export for Browser (attach to window object)
    if (typeof window !== 'undefined') {
        window.GameClient = GameClient;
    }
}

// ES Module export (supports `import` syntax)
export default GameClient;