import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore

class DatabaseAccess:

    DB_ERROR = -1
    DB_EMPTY = ""
        
    SUCCESSFUL = 0
    USER_NAME_NOT_EXIST = 1
    USER_PASSWORD_INCORRECT = 2
        
    USER_CONFLICT = 1
    USER_PASSWORD_INVALID = 2


    def __init__(self):
        self.cred = credentials.Certificate('cfg/dbaccess.json')
        firebase_admin.initialize_app(self.cred)

        self.db = firestore.client()

        #the collection we are under is the users collection on Firestore
        self.collection_name = 'users'


        
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
        #obtain a reference to the respective document on Firestore containing the user data
        user_ref = self.db.collection(self.collection_name).document(username)
        user_doc = user_ref.get()

        # If the document exists, compare the password
        if user_doc.exists:
            user_data = user_doc.to_dict()
            if user_data['password'] == password:
                # Passwords match
                print("Passwords match!")
                return 0
            else:
                # Passwords do not match
                print("Passwords do not match, incorrect password")
                return 2
        else:
            # Username not found, the user does not exist
            print("You are not registered as a user, please create an account")
            return 1


        return 0

    def add_new_user(self, username, password):
        """
        - param1 username: The username as a string.
        - param2 password: The password as a string.
        - return: 0 for success, 1 for user already exits, 2 for invalid password format, -1 for internal failure.
        """
        #passwords have to be strings, if not they are invalid passwords
        if not isinstance(password, str):
            print("Invalid password format, passwords need to be strings")
            return 2
        
        #obtain reference to the document on Firestore
        doc_ref = self.db.collection(self.collection_name).document(username)
        doc = doc_ref.get()

        #check if a document already exists, if so the user has already been registered
        if doc.exists:
            print(f"Document '{username}' already exists.")
            return 1
        #otherwise register the user
        else:
            doc_ref.set({"password":password})
            print(f"New document '{username}' created.")
            return 0
        

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
    
    #test main just for debugging purposes
if __name__ == "__main__":
    test = DatabaseAccess()
    #test.add_new_user("testuser2", "addedthrucode") #uncomment this line if you want to try adding new users
    success_code = test.request_login("testuser2", "addedthrucode")
    print(success_code)

        
    
