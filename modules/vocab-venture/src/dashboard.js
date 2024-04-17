const gameClient = new GameClient();


document.addEventListener('DOMContentLoaded', function () {
    const frontContainer = document.getElementById('front-container');
    const loginContainer = document.getElementById('login-container');
    const registerContainer = document.getElementById('register-container');

    if (frontContainer) {
        document.getElementById('login-button').addEventListener('click', function () {
            console.log('Going to login page...');
            window.location.href = 'loginpage.html'; // Navigate to login page
        });
        document.getElementById('register-button').addEventListener('click', function () {
            console.log('Going to register page...');
            window.location.href = 'registerpage.html'; // Navigate to registration page
        });

    } else if (loginContainer) {
        document.getElementById('submit-login-id').addEventListener('click', handleLogin);
 
    } else if (registerContainer) {
        document.getElementById('submit-register').addEventListener('click', handleRegister);
    }
});

function handleLogin() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const errorMsg = document.getElementById('login-error-msg');
    const successMsg = document.getElementById('login-success-msg');

    console.log('Submitting login...');
    console.log('Username:', username);
    console.log('Password:', password);
    // Assuming gameClient is an instance of GameClient
    gameClient.validateUser(username, password)
        .then(result => {
            if (result === 0) {
                console.log('Login successful');
                if (successMsg) successMsg.textContent = 'Welcome Back';
                if (errorMsg) errorMsg.textContent = '';
                // successMsg.textContent = 'Welcome Back';
                // errorMsg.textContent = '';
                // Proceed with the game or redirect to another page
            } else {
                console.log('Login failed');
                if (errorMsg) errorMsg.textContent = 'Login failed. Please check your username and password.';
                if (successMsg) successMsg.textContent = '';
                // errorMsg.textContent = 'Login failed. Please check your username and password.';
                // successMsg.textContent = '';
            }
        })
        .catch(error => {
            console.error('Login error:', error);
            errorMsg.textContent = 'An error occurred during login. Please try again.';
        });
}

function handleRegister() {
    const username = document.getElementById('new-username').value;
    const password = document.getElementById('new-password').value;
    const errorMsg = document.getElementById('register-error-msg');
    const successMsg = document.getElementById('register-success-msg');

    console.log('Submitting register...');
    console.log('Username:', username);
    console.log('Password:', password);
    // Assuming gameClient is an instance of GameClient
    gameClient.addNewUser(username, password)
        .then(result => {
            if (result === 0) {
                console.log('Register successful');
                if (successMsg) successMsg.textContent = 'Welcome to VocabVenture';
                // Proceed with the game or redirect to another page
            } else {
                console.log('Register failed');
                if (errorMsg) errorMsg.textContent = 'Register failed. Please check your username and password.';
            }
        })
        .catch(error => {
            console.error('Register error:', error);
            errorMsg.textContent = 'An error occurred during register. Please try again.';
        });
}

function startGame() {
    // Include the Phaser library
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/phaser/3.55.2/phaser.min.js';
    document.head.appendChild(script);

    // Initialize the Phaser game once the library is loaded
    script.onload = () => {
        const gameConfig = {
            type: Phaser.AUTO,
            width: 800,
            height: 600,
            // Phaser game scenes and other configurations
        };

        const game = new Phaser.Game(gameConfig);
        // Additional game setup if needed
    };
}
