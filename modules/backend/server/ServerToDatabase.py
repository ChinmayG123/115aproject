import firebase_admin
import os
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


    def __init__(self, script_path):
        self.cred = credentials.Certificate(script_path + '/cfg/dbaccess.json')
        self.firebase_app  = firebase_admin.initialize_app(self.cred)
        self.db = firestore.client()

        #the collection we are under is the users collection on Firestore
        self.collection_name = 'users'


    def __del__(self):
        # Clean up Firebase app on object destruction
        firebase_admin.delete_app(self.firebase_app)

        
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
            if isinstance(user_data, dict) and user_data['password'] == password:
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
            doc_ref.update({"french": {}})
            doc_ref.update({"spanish":{}})
            doc_ref.update({"french_progress": "0%"})
            doc_ref.update({"spanish_progress": "0%"})
            print(f"New document '{username}' created.")
            return 0
    
    def update_language(self, username, language, learnedWord):
        doc_ref = self.db.collection(self.collection_name).document(username)
        doc = doc_ref.get()

        if doc.exists:
            field_value = doc.get(language)
            #print("This is the type:", type(field_value))
            field_value[learnedWord] = 5
            doc_ref.update({language: field_value})
            return self.SUCCESSFUL
        else:
            return self.USER_NAME_NOT_EXIST

    def update_user_status(self, username, status):
        """
        This function update the database about whether a user is online. 

        - param1 username: The username as a string.
        - param2 status: The log in status (online or offline) as a boolean.
        - return: 0 for success, -1 for internal failure which will force client to logout.
        """
        try:
            user_ref = self.db.collection('users').document(username)
            user_ref.update({'online_status': status})
            return self.SUCCESSFUL  
        
        except Exception as e:
            print(f"An error occurred: {e}")
            return self.DB_ERROR 
    
    def retrieve_user_data(self, username, language):
        """
        This function looks up for a user's game progress, such as learned words, defeated bosses, and unlocked languages.

        - param1 username: The username as a string.
        - param2 language: The language being learned, as a string.
        - return: Dictionary of user data for success, None for internal failure.
        """
        try:
            progress_ref = self.db.collection('users').document(username).collection('progress').document(language)
            progress_doc = progress_ref.get()
            if progress_doc.exists:
                learned_words = progress_doc.to_dict().get('learnedWords', {})  
                return learned_words
            else:
                print(f"No data exist for users/{username}/progress/{language}")
                return None
        
        except Exception as e:
             print(f"An error occurred: {e}")
             return None

    def update_user_dictionary(self, username, language, new_dict):
        """
        Advanced method to change a word's proficiency number to the user's learned list for a specified language.

        - param username: The username of the user.
        - param language: The language being learned.
        - param new_dict: The dictionary contains all words to be altered with their key as new proficiency value. Create if word not learned. 
        - return: true for success, false for failure
        """
        pass
    '''
    def learn_new_words(self, username, word_id):
    """
    Add a new word to the user's learned lists for both French and Spanish based on the language they learned.
    Assumes that the 'totalWords' collection contains documents with word translations for both languages.

    :param username: The username of the user.
    :param word_id: The document ID from the 'totalWords' collection for the word to be learned.
    """

    try:
        # Reference to the total words document
        total_word_ref = self.db.collection('totalWords').document(word_id)
        total_word_doc = total_word_ref.get()

        word_data = total_word_doc.to_dict()
        french_word = word_data.get('french')
        spanish_word = word_data.get('spanish')

        user_ref = self.db.collection('users').document(username)
        user_doc = user_ref.get()

        updates = {}
        if french_word:
            updates[f"french.{french_word}"] = True  
        if spanish_word:
            updates[f"spanish.{spanish_word}"] = True 

        if updates:
            user_ref.update(updates)

        return self.SUCCESSFUL
    
    except Exception as e:
        print(f"An error occurred: {e}")
        return self.DB_ERROR
    '''
    def alter_proficiency(self, username, language, word, action):
        """
        Toggle a word's proficiency value by 1.

        - param username: The username of the user.
        - param language: The language being learned.
        - param word: The word to be altered. 
        - param action: can be 'up' or 'down'
        """

        #for ease of functionality we can make action equal to 1 or -1 for increment
        #or decrement respectively, and just append that value to the current proficiency
        #level
        doc_ref = self.db.collection(self.collection_name).document(username)
        doc = doc_ref.get()
        if doc.exists:
            field_value = doc.get(language)
            #print("This is the type:", type(field_value))
            
            #only update if it is within the bounds
            if 0 <= (field_value[word] + action) <= 10:
                field_value[word] = field_value[word] + action
            doc_ref.update({language: field_value})
            return self.SUCCESSFUL
        else:
            return self.USER_NAME_NOT_EXIST
    
    def calculate_progress(self, username, language):
        """
        Calculates and updates the user's current progress in a desired language

        - param username: The username of the user.
        - param language: The language being learned.

        """
          
        collection_ref = self.db.collection(self.collection_name)
        doc_ref = self.db.collection(self.collection_name).document(username)
        doc = doc_ref.get()
        if doc.exists:
            #get the number of keys in the desired dictionary
            dictionary = doc.get(language)
            learned_words = len(dictionary.keys())
            docs = collection_ref.stream()
    
            # Count the documents
            count = sum(1 for _ in docs)
            progress = ((learned_words/count) * 100)
            rounded_prog = round(progress, 2)
            str_progress = str(rounded_prog) + "%"
            str_progresskey = language + "_" + "progress"
            print(str_progresskey)
            doc_ref.update({str_progresskey: str_progress})
            return self.SUCCESSFUL
        else:
            return self.USER_NAME_NOT_EXIST
    
#main method just for debugging purposes
if __name__ == '__main__':
    script_path = os.path.abspath(__file__)
    server_dir_path = os.path.dirname(script_path)
    print("This is the directory path:", os.path.dirname(server_dir_path))
    database_dir_path = os.path.dirname(server_dir_path) + "/database"
    test = DatabaseAccess(database_dir_path)


    first = test.add_new_user("TestApril23", "123456")
    out = test.update_language("TestApril23","spanish", "spanishword4")
    out2 = test.calculate_progress("TestApril23", "spanish")
   #out2 = test.alter_proficiency("LanguageUserTest4", 'spanish', 'spanishword4', 1)
    #out3 = test.alter_proficiency("LanguageUserTest4", 'spanish', 'spanishword3', -1)

    print(out2)