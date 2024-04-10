class GameClient {
    // Private fields and constructor remain the same...

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
                    return -1; // Unknown status code or other errors
            }
        } catch (error) {
            console.error('Error during the fetch operation:', error);
            return -1; // Error condition
        }
    }
}
