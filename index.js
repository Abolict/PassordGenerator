

const lowercaseChars = "abcdefghijklmnopqrstuvwxyz";
const uppercaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const numberChars = "0123456789";
const symbolChars = "!@?#&*^+=-()_";



const lengthInput = document.getElementById("lengthSlider");
const lengthValue = document.getElementById("lengthValue");

const lowercaseCheckbox = document.getElementById("lowercase");
const uppercaseCheckbox = document.getElementById("uppercase");
const numbersCheckbox = document.getElementById("numbers");
const symbolsCheckbox = document.getElementById("symbols");

const generateBtn = document.getElementById("generateBtn");
const copyBtn = document.getElementById("copyBtn");
const togglePasswordBtn = document.getElementById("togglePassword");

const passwordText = document.getElementById("password");
const strengthText = document.getElementById("strength");
const strengthBar = document.getElementById("strengthBar");
const entropyText = document.getElementById("entropy");

const copyMessage = document.getElementById("copyMessage");



let realPassword = "";
let visible = true;


// random generator

function randomIndex(max){

    const array = new Uint32Array(1);
    crypto.getRandomValues(array);

    return array[0] % max;

}

function randomChar(chars){

    return chars[randomIndex(chars.length)];

}


// passord generator

function generatePassword(length,lower,upper,numbers,symbols){

    let allowed = "";
    let password = [];

    if(lower){
        allowed += lowercaseChars;
        password.push(randomChar(lowercaseChars));
    }

    if(upper){
        allowed += uppercaseChars;
        password.push(randomChar(uppercaseChars));
    }

    if(numbers){
        allowed += numberChars;
        password.push(randomChar(numberChars));
    }

    if(symbols){
        allowed += symbolChars;
        password.push(randomChar(symbolChars));
    }

    while(password.length < length){
        password.push(randomChar(allowed));
    }

    for(let i = password.length - 1; i > 0; i--){

        const j = randomIndex(i + 1);
        [password[i],password[j]] = [password[j],password[i]];

    }

    return password.join("");

}


// styrkesjekk

function checkStrength(password){

    let charset = 0;

    if(/[a-z]/.test(password)) charset += 26;
    if(/[A-Z]/.test(password)) charset += 26;
    if(/[0-9]/.test(password)) charset += 10;
    if(/[^A-Za-z0-9]/.test(password)) charset += 32;

    const entropy = password.length * Math.log2(charset);

    let strength;

    if(entropy < 40) strength = "Svakt";
    else if(entropy < 60) strength = "Middels";
    else if(entropy < 80) strength = "Sterkt";
    else strength = "Veldig sterkt";

    return {entropy,strength};

}


// generer passord ui

function generate(){

    const length = Number(lengthInput.value);

    const lower = lowercaseCheckbox.checked;
    const upper = uppercaseCheckbox.checked;
    const numbers = numbersCheckbox.checked;
    const symbols = symbolsCheckbox.checked;

    let allowed = "";

    if(lower) allowed += lowercaseChars;
    if(upper) allowed += uppercaseChars;
    if(numbers) allowed += numberChars;
    if(symbols) allowed += symbolChars;

    let shuffleCount = 0;

    const shuffle = setInterval(()=>{

        let fake = "";

        for(let i = 0; i < length; i++){
            fake += randomChar(allowed);
        }

        passwordText.textContent = fake;

        shuffleCount++;

        if(shuffleCount >= 8){

            clearInterval(shuffle);

            const password = generatePassword(length,lower,upper,numbers,symbols);

            realPassword = password;

            passwordText.textContent = password;
            passwordText.classList.remove("placeholder");

            const result = checkStrength(password);

            strengthText.textContent = result.strength;
            entropyText.textContent = Math.round(result.entropy) + " bits";

            strengthBar.style.width = Math.min(result.entropy,100) + "%";

        }

    },50);

}


// events

generateBtn.onclick = generate;

lengthInput.oninput = ()=>{
    lengthValue.textContent = lengthInput.value;
};


// kopier passord

copyBtn.onclick = ()=>{

    if(!realPassword) return;

    navigator.clipboard.writeText(realPassword);

    copyMessage.textContent = "✔ Kopiert";

    setTimeout(()=>{
        copyMessage.textContent = "";
    },2000);

};


// vis eller skjul passord

togglePasswordBtn.onclick = ()=>{

    const icon = togglePasswordBtn.querySelector("i");

    if(visible){

        passwordText.textContent = "•".repeat(realPassword.length);
        icon.classList.replace("fa-eye","fa-eye-slash");

        visible = false;

    }else{

        passwordText.textContent = realPassword;
        icon.classList.replace("fa-eye-slash","fa-eye");

        visible = true;

    }

};