// Function to append text to the output area
function writeToOutput(text) {
    const output = document.getElementById('output');
    output.innerHTML += text + '\n';
    output.scrollTop = output.scrollHeight; // Auto-scroll to bottom
}

// Function to simulate the time.sleep() effect
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// Global state variable to track where the user is in the "flow"
let state = 'SKIP_PROMPT'; 

// --- Python Function Replicas (Incomplete set for example) ---

async function Normal() {
    writeToOutput("Hello! Welcome new user!");
    await sleep(3000);
    writeToOutput("Actually, new user doesn't roll off the tongue easily");
    await sleep(3000);
    state = 'NAMING_PROMPT';
    writeToOutput("What should I call you, user?");
}

async function Naming(name) {
    // The name is already provided by the handleInput function
    const lowerName = name.toLowerCase();

    // The state now transitions to one of the specific functions or the default case
    switch (lowerName) {
        case "gd-596":
            writeToOutput("...You're back, its been ever so long since you've shown your face huh?");
            await sleep(3000);
            writeToOutput("I'll spare the small talk for you, its better for the both of us");
            await sleep(2000);
            writeToOutput("That is...if it's really you");
            await sleep(2000);
            state = 'GD_PASSKEY_1'; // Change state to await the first passkey
            writeToOutput("INPUT FIRST PASSKEY:");
            break;

        case "50201":
            writeToOutput(" . . . ");
            await sleep(5000);
            writeToOutput("Well...you found the second...hint...heh");
            await sleep(5000);
            writeToOutput("Alright....here you go");
            await sleep(3000);
            writeToOutput("Aol aptl huk wshjl vm lclyaopun, pzu'a qbza. Zol ohz h dlhrulzz, aol zwvaspnoa ");
            await sleep(5000);
            writeToOutput("How about you decode this for a change...with one hint");
            await sleep(3000);
            writeToOutput("What is the most...common number?");
            await sleep(3000);
            state = 'COMPLETE';
            break;
            
        case "founder":
            writeToOutput("Welcome back creator! It's so nice to see you!");
            await sleep(3000);
            writeToOutput("Here is everything you need to know about the program");
            await sleep(9000);
            state = 'COMPLETE';
            break;
        
        case "merp":
            writeToOutput("You....aren't him");
            await sleep (5000);
            writeToOutput("He should be...unable to view this..");
            await sleep(3000);
            writeToOutput("Well...imposter...I shall give you a small hint..");
            await sleep(3000);
            writeToOutput("Talk to him about a certain Manor");
            await sleep(3000);
            state = 'COMPLETE';
            break;
        default:
            // Default case from Python
            writeToOutput("Hello, " + name + ". My name is H.R.C.D");
            await sleep(3000);
            writeToOutput("Also known as");
            await sleep(2000);
            writeToOutput("High Rollers Code Decrypter");
            await sleep(2000);
            writeToOutput("The founder wanted to help you and your friends in this small little treasure hunt");
            await sleep(6000);
            state = 'SHIFT_PROMPT'; // Change state to await the shift number
            writeToOutput("Now then, you must have the passkey for the first code correct? ");
            await sleep(3000);
            writeToOutput("Can you give me the number in numeric form? ");
            break;
    }
}

// --- Main Input Handling ---

async function handleInput() {
    const inputElement = document.getElementById('user-input');
    const userInput = inputElement.value.trim();
    inputElement.value = ''; // Clear the input field
    
    // Echo the user's input
    writeToOutput(`> ${userInput}`);

    // State machine to handle the different prompts
    switch (state) {
        case 'SKIP_PROMPT':
            const confirm = userInput.toLowerCase();
            if (["true", "t", "yes", "y", "1"].includes(confirm)) {
                state = 'NAMING_PROMPT';
                writeToOutput("What should I call you, user?");
            } else {
                await Normal();
            }
            break;

        case 'NAMING_PROMPT':
            await Naming(userInput);
            break;

        case 'GD_PASSKEY_1':
            if (userInput === "Everything, Anything, and Nothing") {
                writeToOutput("So it goes...You haven't lost your touch just yet have you?");
                await sleep(2000);
                writeToOutput("After all, its been so long ever since he left, hasn't it?");
                await sleep(2000);
                state = 'GD_PASSKEY_2';
                writeToOutput("INPUT SECOND PASSKEY:");
            } else {
                writeToOutput("That is incorrect. Keep looking.");
                state = 'NAMING_PROMPT'; 
                writeToOutput("What should I call you, user?");
            }
            break;

        case 'GD_PASSKEY_2':
            if (userInput === "Time") {
                writeToOutput("Mpq Ezmzxl, bti Xfbikqyigbe, egl iltb xmxa urumfaxmz.");
                state = 'COMPLETE';
            } else {
                writeToOutput("That is incorrect.");
                state = 'NAMING_PROMPT'; 
                writeToOutput("What should I call you, user?");
            }
            break;
        
        case 'SHIFT_PROMPT':
            if (userInput === "5") {
                const name = document.getElementById('output').lastElementChild.previousElementSibling.innerText.split('Hello, ')[1].split('. My name is')[0].trim();
                writeToOutput(`Ah, yes! Seems like you had been quite the idiot, ${name}. But not to worry! I can't laugh at you.`);
                await sleep(7000);
                writeToOutput("Well, after decoding, I got this!");
                await sleep(2000);
                writeToOutput("ihf6iZvuFtk");
                await sleep(2000);
                writeToOutput("Well then... good luck!");
                await sleep(2000);
                writeToOutput("Actually...");
                await sleep(4000);
                writeToOutput(`One more thing, ${name}. A small hint`);
                await sleep(4000);
                writeToOutput("Where do you usually see entertainment?");
                await sleep(6000);
                writeToOutput("Well, ta ta!");
                await sleep(3000);
                state = 'COMPLETE';
            } else {
                writeToOutput("Well then... keep looking");
                await sleep(2000);
                state = 'COMPLETE'; 
            }
            break;

        case 'COMPLETE':
            writeToOutput("--- Session complete. Please refresh to start over. ---");
            break;
            
        default:
            writeToOutput("Error: Unknown state. Starting over.");
            state = 'SKIP_PROMPT';
            initApp();
            break;
    }
}

// Function to start the application
function initApp() {
    writeToOutput("H.R.C.D Initializing...");
    setTimeout(() => {
        writeToOutput("Would you like to skip the startup sequence? (Type 'yes' or 'no')");
    }, 1000);
}

// Listen for the 'Enter' key press on the input field
document.getElementById('user-input').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        handleInput();
    }
});

// Start the sequence
initApp();