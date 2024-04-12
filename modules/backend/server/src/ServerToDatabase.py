class DatabaseAccess:
    
    def request_login(self, username, password):
        """
        This function checks the given username and password against the entries
        in the 'userlist' table of a MongoDB database. If the credentials match
        an existing entry, it returns some form of success indicator, otherwise
        it fails.

        - param1 username: The username as a string.
        - param2 password: The password as a string.
        - return: 0 for success, 1 for user not exits, 2 for incorrect password, -1 for internal failure.
        """
        # Here, you would add your MongoDB access code
        return 0

    def add_new_user(self, username, password):
        """
        - param1 username: The username as a string.
        - param2 password: The password as a string.
        - return: 0 for success, 1 for user already exits, 2 for invalid password format, -1 for internal failure.
        """
        return 0;

    def update_user_status(self, username, status):
        """
        This function update the database about whether a user is online. 

        - param1 username: The username as a string.
        - param2 status: The log in status (online or offline) as a boolean.
        - return: 0 for success, -1 for internal failure which will force client to logout.
        """
        return 0
    
    def retrieve_user_data(self, username):
        """
        This function looks up for user's game progress (learned words, defeated boss, unlocked language, etc.). 

        - param1 username: The username as a string.
        - return: a string of user data for success, empty string for internal failure which will force client to logout.
        """
        data = "somedata"
        return data