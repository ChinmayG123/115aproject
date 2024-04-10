document.getElementById('login-button').addEventListener('click', function() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    gameClient.validateUser(username, password).then(result => {
        if (result === 0) {
            // Login successful
            document.getElementById('login-container').style.display = 'none'; // Hide login container
            startGame(); // Function to initialize and start Phaser game
        } else {
            // Login failed
            alert('Invalid username or password');
        }
    }).catch(error => {
        console.error('Login error:', error);
    });
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
