const gameClient = new GameClient();

function handleLogin() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const errorMsg = document.getElementById('login-error-msg');

    console.log('Submitting login...');
    console.log('Username:', username);
    console.log('Password:', password);
    // Assuming gameClient is an instance of GameClient
    gameClient.validateUser(username, password)
        .then(result => {
            if (result === 0) {
                console.log('Login successful');
                errorMsg.textContent = '';
                // Proceed with the game or redirect to another page
            } else {
                console.log('Login failed');
                errorMsg.textContent = 'Login failed. Please check your username and password.';
            }
        })
        .catch(error => {
            console.error('Login error:', error);
            errorMsg.textContent = 'An error occurred during login. Please try again.';
        });
}

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
        document.getElementById('submit-login').addEventListener('click', handleLogin);

    } else if (registerContainer) {
        document.getElementById('submit-register').addEventListener('click', function () {
            console.log('Submitting registration...');
            const username = document.getElementById('new-username').value;
            const password = document.getElementById('new-password').value;
            console.log('Username:', username);
            console.log('Password:', password);
            // Implement registration logic here
        });
    }
});


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
