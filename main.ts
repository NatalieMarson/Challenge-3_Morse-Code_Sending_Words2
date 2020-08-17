// this function is ploting a single dot, this will be
// used for showing the dot, . will be saved,
// in a string to demonstrate the dot
function AddADot () {
    led.plot(2, 2)
    CharacterString = "" + CharacterString + "."
    basic.pause(500)
    basic.clearScreen()
}
radio.onReceivedNumber(function (receivedNumber) {
    NumRecieve = receivedNumber
    if (NumRecieve == 10) {
        Wait = 1
    } else if (NumRecieve == 20) {
        Wait = 0
        basic.clearScreen()
        ClearVariable()
    } else {
    	
    }
})
// This function is plotting a dash by showing three
// led's, - will be saved in a string to
// demonstrate the dash
function AddADash () {
    for (let index = 0; index <= 2; index++) {
        led.plot(index + 1, 2)
    }
    CharacterString = "" + CharacterString + "-"
    basic.pause(500)
    basic.clearScreen()
}
// When button a is pressed go to the function
input.onButtonPressed(Button.A, function () {
    if (Wait == 0) {
        radio.sendNumber(15)
        AddADot()
    }
})
// this function will reset all of the variables, after
// it was already saved
function ClearVariable () {
    CharacterString = ""
    let CodeReceived
radio.setGroup(1)
    CharReceive = ""
    CheckCodeSent = ""
    Wait = 0
}
// when button a and b are pressed call the function
input.onButtonPressed(Button.AB, function () {
    if (Wait == 0) {
        for (let index2 = 0; index2 <= ArraySend.length - 1; index2++) {
            radio.sendNumber(15)
            Time = input.runningTime()
            radio.sendValue(ArraySend[index2], ArraySend.length)
        }
    }
})
// will set the variables to the different strings,
// it will then be sent to the function MorseCodeCheck, to
// make sure it sent the right thing.
// MorseCodeCheck()
// for (let index3 = 0; index3 <= CodeSent.length - 1; index3++) {
// CheckCodeSent.push(CodeSent)
// }
radio.onReceivedString(function (receivedString) {
    CodeSent = receivedString
    CheckCodeSent = MCCode[MCCharacter.indexOf(CodeSent)]
    MorseCodeCheck()
})
// When button b is pressed call the function
input.onButtonPressed(Button.B, function () {
    if (Wait == 0) {
        radio.sendNumber(15)
        AddADash()
    }
})
// When the microbit is shook clear the variables
input.onGesture(Gesture.Shake, function () {
    ClearVariable()
})
radio.onReceivedValue(function (name, value) {
    ArrayRecieve.push(name)
    J += 1
    if (J == value) {
        MorseCode()
    }
})
// This function will resend the string if it is taking
// to long
function TimeOut () {
    if (input.runningTime() - Time > 10000) {
        radio.sendValue(CharacterString, CharacterString.length)
    }
}
input.onGesture(Gesture.LogoDown, function () {
    ArraySend.push(CharacterString)
    CharacterString = ""
    basic.showIcon(IconNames.Triangle)
    basic.pause(100)
    basic.clearScreen()
})
// this function checks if the morse code that was sent
// 
// was the write one, if yes then it will show a check,
// 
// if not it will resend the string
function MorseCodeCheck () {
    for (let index3 = 0; index3 <= ArraySend.length - 1; index3++) {
        CheckCodeSent = "" + MCCharacter[MCCode.indexOf(ArraySend[index3])]
        basic.showString(CheckCodeSent)
        basic.pause(500)
    }
    if (CodeSent == CheckCodeSent) {
        basic.showIcon(IconNames.Yes)
        radio.sendNumber(20)
        ClearVariable()
        basic.clearScreen()
    } else {
        basic.showIcon(IconNames.No)
        radio.sendValue(CharacterString, CharacterString.length)
    }
}
// This function translates the numbers into which
// letters they corrospond with, and enter it into the string
// The running time is noted to make sure it does not take to long
// it will send the string
function MorseCode () {
    for (let index22 = 0; index22 <= ArrayRecieve.length - 1; index22++) {
        CodeReceived2 = "" + MCCharacter[MCCode.indexOf(ArrayRecieve[index22])]
        basic.showString(CodeReceived2)
    }
    radio.sendString(CodeReceived2)
}
/**
 * MCCharacter and MCCode show the morse code symbols for each
 */
/**
 * If the user inputs a wrong morse code, an x will appear on the screen and the user will have to restart.
 */
/**
 * This states that the variables are all empty
 */
/**
 * letter
 */
let CodeReceived2 = ""
let J = 0
let ArrayRecieve: string[] = []
let CodeSent = ""
let CharReceive = ""
let NumRecieve = 0
let CharacterString = ""
let ArraySend: string[] = []
let Wait = 0
let CheckCodeSent = ""
let MCCode: string[] = []
let MCCharacter: string[] = []
let Time = 0
let TimeCheck = 0
let ReceiveString = ""
radio.setGroup(1)
Time = 0
MCCharacter = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0"]
MCCode = [".-", "-...", "-.-.", "-..", ".", "..-.", "--.", "....", "..", ".---", "-.-", ".-..", "--", "-.", "---", ".--.", "--.-", ".-.", "...", "-", "..-", "...-", ".--", "-..-", "-.--", "--..", ".----", "..---", "...--", "....-", "-....", "--...", "---..", "----.", "-----"]
CheckCodeSent = ""
Wait = 0
ArraySend = []

// This code allows you to send words. In order to send it
//you have to input the letter, then flip the microbit, and then add your
//next letter and continue, when done all the letters you have to
//flip the microbit and then press A&B to send it. 
// The letters are stored in an array and then once A & B are pressed 
//It will send each letter as a string to the other micro bit.

// In order to only allow one user to be the reciever and one the sender 
//This is used using the microbit Id, in order to send it, you send it
//to the individual ip address and then write the message.