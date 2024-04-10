class GameClient {
    // Private fields
    #HOST = '127.0.0.1';
    #PORT = 8080;

    constructor() {
        this.baseURL = `http://${this.#HOST}:${this.#PORT}`;
    }

    /**
     * Validates a user by sending a GET request with a custom header to the /userlist endpoint.
     *
     * @param {string} username - The username to validate.
     * @returns {Promise<number>} - A promise that resolves to:
     *                               0 if the user is valid,
     *                               1 if not found,
     *                               2 if access is forbidden, or
     *                              -1 for any other error or unknown status code.
     */
    async validateUser(username) {
        const options = {
            method: 'GET',
            headers: {
                'Username': username
            }
        };

        try {
            const response = await fetch(`${this.baseURL}/userlist`, options);

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
        } catch (error) {
            console.error('Error during the fetch operation:', error);
            return -1;
        }
    }
}
