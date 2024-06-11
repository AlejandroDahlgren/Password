const sliderEl = document.querySelector('#range'); 
const totalCharactersEl = document.getElementById('total-characters');
const passwordGenerated = document.querySelector('#generated-pwd'); 


// here is my slider 
const progressScript = () => {
    const minValue = 5; // Minimum value for the slider
    const maxValue = 15; // Maximum total characters

    let sliderValue = parseInt(sliderEl.value); //makes natural numbers
    sliderValue = Math.max(minValue, sliderValue); // makes it so value is not below minimum 

    const percentage = ((sliderValue - minValue) / (100 - minValue)) * 100;

    sliderEl.style.background = `linear-gradient(to right, #a638f6 ${percentage}%, #2a2438 ${percentage}%)`;

    const totalCharacters = Math.round(((sliderValue - minValue) / (100 - minValue)) * (maxValue - minValue) + minValue);
    totalCharactersEl.textContent = totalCharacters;
};


// Here is all the parts to make the password
const generatePassword = (length, useUppercase, useLowercase, useNumbers, useSymbols) => {
    const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lowercase = 'abcdefghijklmnopqrstuvwxyz';
    const numbers = '123456789';
    const symbols = '!"#¤%&/()=?*_:;@£$€{}[]><|-+/.,½§';

    let usableCharacters = '';
    let generatedPassword = '';

    if (useUppercase) {
        usableCharacters += uppercase;
    }
    if (useLowercase) {
        usableCharacters += lowercase;
    }
    if (useNumbers) {
        usableCharacters += numbers;
    }
    if (useSymbols) {
        usableCharacters += symbols;
    }
    if (usableCharacters.length === 0) {
        return 'maybe use "password" then?';
    }
    //makes the password randomizing characters
    for (let i = 0; i < length; i++) {
        const slumpIndex = Math.floor(Math.random() * usableCharacters.length);
        generatedPassword += usableCharacters.charAt(slumpIndex);
    }
    return generatedPassword;
};

//updates password depending on what checkbox is checked.
const updatePassword = () => {
    const lengthPassword = parseInt(totalCharactersEl.textContent);
    const useUppercase = document.getElementById('uppercase').checked;
    const useLowercase = document.getElementById('lowercase').checked;
    const useNumbers = document.getElementById('numbers').checked;
    const useSymbols = document.getElementById('symbols').checked;
    const password = generatePassword(lengthPassword, useUppercase, useLowercase, useNumbers, useSymbols);

    if (password !== null) {
        passwordGenerated.textContent = password;
        strengthLevel();
        updatelevelText();
    }
};

progressScript();

sliderEl.addEventListener('input', () => {
    progressScript();
});

document.querySelector('button').addEventListener('click', () => {
    updatePassword();
});

function copyPassword() {
    const copyPass = document.getElementById('generated-pwd').textContent;
    const form = document.getElementById('passwordForm');
    const textArea = document.createElement('textArea');

    textArea.value = copyPass;
    form.appendChild(textArea);
    textArea.select();
    textArea.setSelectionRange(0, 99999);
    document.execCommand('copy');

    if (form.contains(textArea)) {
        form.removeChild(textArea);
    }
}

const strengthLevel = () => {
    const stapleOne = document.getElementById('Sone');
    const stapleTwo = document.getElementById('Stwo');
    const stapleThree = document.getElementById('Sthree');
    const stapleFour = document.getElementById('Sfour');

    if (stapleOne && stapleTwo && stapleThree && stapleFour) {
        const checkboxes = document.querySelectorAll('.container input[type="checkbox"]');
        const checkedCheckboxes = Array.from(checkboxes).filter(checkbox => checkbox.checked);
        const maxColoredStaples = 4;
        const coloredStaples = Math.min(checkedCheckboxes.length, maxColoredStaples);

        stapleOne.style.border = coloredStaples >= 1 ? '#ffa257': 'dotted white'
        stapleOne.style.backgroundColor = coloredStaples >= 1 ? '#ffa257' : 'transparent';
        stapleTwo.style.backgroundColor = coloredStaples >= 2 ? '#ffa257' : 'transparent';
        stapleThree.style.backgroundColor = coloredStaples >= 3 ? '#ffa257' : 'transparent';
        stapleFour.style.backgroundColor = coloredStaples >= 4 ? '#ffa257' : 'transparent';

        if (checkedCheckboxes.length == 4 ){
            stapleOne.style.background = '#4ABEA0'
            stapleTwo.style.background = '#4ABEA0'
            stapleThree.style.background = '#4ABEA0'
            stapleFour.style.background = '#4ABEA0'
        }


    }
};

// this is the different strength text depending on whats checked.
const updatelevelText = () => {
    const bars = document.querySelectorAll('.staples');
    const nonTransparentBars = Array.from(bars).filter(bar => bar.style.backgroundColor !== 'transparent');
    const levelText = document.querySelector('.level-text');
    
    switch (nonTransparentBars.length) {
        case 0:
            levelText.textContent = 'Really?';
            break;
        case 1:
            levelText.textContent = 'Weak';
            break;
        case 2:
            levelText.textContent = 'Medium';
            break;
        case 3:
            levelText.textContent = 'great';
            break;
        case 4:
            levelText.textContent = 'Strong';
            break;
        default:
            levelText.textContent = 'Strong';
            break;
    }
};



