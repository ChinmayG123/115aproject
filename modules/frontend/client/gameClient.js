class GameClient {
    // Private fields
    #HOST = '127.0.0.1';
    #PORT = 8080;

    constructor() {
        this.baseURL = `http://${this.#HOST}:${this.#PORT}`;
    }
    /**
     * Validates a user by sending a GET request with custom headers for username and password.
     *
     * @param {string} username - The username to validate.
     * @param {string} password - The password associated with the username.
     * @returns {Promise<number>} - A promise that resolves to:
     *                               0 if the user is valid,
     *                               1 if not found,
     *                               2 if access is forbidden, or
     *                              -1 for any other error or unknown status code.
     */
    async validateUser(username, password) {
        const options = {
            method: 'GET',
            headers: {
                'Username': username, // Set the custom username header
                'Password': password  // Set the custom password header
            }
        };

        // Create a promise that rejects in 3000 milliseconds (3 seconds)
        const timeoutPromise = new Promise((_, reject) => {
            setTimeout(() => {
                reject(new Error('Request timed out')); // Reject with an error when timeout is reached
            }, 3000); // Timeout set to 3 seconds
        });

        try {
            const response = await Promise.race([
                fetch(`${this.baseURL}/userlist`, options), // The actual fetch request
                timeoutPromise                               // The timeout promise
            ]);

            switch (response.status) {
                case 200:
                    return 0;
                case 404:
                    return 1;
                case 403:
                    return 2;
                default:
                    return -1; // Unknown status code or other errors
            }
        } catch (error) {
            console.error('Error during the fetch operation:', error);
            return -1; // Error condition
        }
    }
}
