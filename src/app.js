import {randomNameGenerator, generateNameForStart} from './data';

class SpeechApp {
    constructor(options) {
      let {
        voiceBtnSelector,
        textAreaSelector,
        wordSelector,
        gameResult,
      } = options;
        const SpeechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition;
        this.recognition = new SpeechRecognition();
        this.recognition.lang = "tr-TR";
        this.recognition.interimResults = false;
        this.synthesis = window.speechSynthesis;

        this.voiceButton = document.querySelector(voiceBtnSelector);
        this.textlog = document.querySelector(textAreaSelector);
        this.wordTextSelector = document.querySelector(wordSelector);
        this.gameResultSelector = document.querySelector(gameResult);
        this.timer = document.getElementById("timer");

        this.arrayOfAnswers = [];
        this.currentComputerName = null;
        this.word = '';
        this.noteContent = '';

        this.names = require('./names.json')
    }
   
    listeningVoice(){
      this.recognition.onstart = function() { 
        console.log('Voice recognition activated. Try speaking into the microphone.');
      }

      this.getInitialzeName(this.arrayOfAnswers);

      this.recognition.onresult = (event)  =>{   

        let current = event.resultIndex;
        let transcript = event.results[current][0].transcript;
        this.noteContent = transcript.toLowerCase();
        this.textlog.innerText = this.noteContent.toLowerCase();
        this.word = this.noteContent.toLowerCase().slice(-1);

        //console.log(this.arrayOfAnswers[this.arrayOfAnswers.length-1].slice(-1))
        
        console.log(this.arrayOfAnswers.includes(this.noteContent))

        if(this.arrayOfAnswers.includes(this.noteContent)){
          this.arrayOfAnswers.push(this.noteContent)
          this.lostGame("Lost!!! Used same words." + this.arrayOfAnswers.length + " words used.", this.voiceButton, this.gameResultSelector)
          
        }else{
            let correctOrFalse = this.checkNamesOfInput(this.arrayOfAnswers, this.noteContent, this.currentComputerName, this.names)
            console.log(correctOrFalse)
            //this.arrayOfAnswers.push(this.noteContent)
            //console.log(this.arrayOfAnswers)
        }
        //this.currentComputerName = this.getComputerName(this.names, this.noteContent);
        //this.arrayOfAnswers.push(this.currentComputerName);
        console.log(this.arrayOfAnswers)
      }

      this.recognition.start();

    }

    
    getComputerName(name, value){
      let output = randomNameGenerator(name, value);
      return output
    }

    checkNamesOfInput(array, currentInput, computerVal, allNames){
      if(array[array.length-1].slice(-1) === currentInput.charAt(0)){
        array.push(currentInput)
        computerVal = this.getComputerName(allNames, currentInput);
        array.push(computerVal);
        this.voiceOfText(computerVal);
        this.generateUsedNames(array);
        return 'equal'

      }else if(array[array.length-1].slice(-1) !== currentInput.charAt(0)){
        array.push(currentInput)
        this.generateUsedNames(array)
        this.lostGame("Lost!!! " + array.length + " words used.", this.voiceButton, this.gameResultSelector)
        return 'wrong'
      }
      else if(array.length == 1){
        this.lostGame("Lost!!!Did not use the microphone", this.voiceButton, this.gameResultSelector)
      }
    }

    getInitialzeName(array){
      if(array.length == 0){
        let generated = generateNameForStart(this.names);
        array.push(generated)
        this.voiceOfText(generated)
        this.generateUsedNames(array);
      }
    }
    
    lostGame(text, button, htmlText){
      window.alert(text);
      button.disabled = true;
      htmlText.innerHTML = `<h3 style="font-size:30px;">You Lost!!!</h3>`
    }

    generateUsedNames(items){
      this.wordTextSelector.innerHTML =
        '<ul class="name-list">' +
        items
          .map(function (item) {
            return '<li class="item">' + item + "->" + "</li>";
          })
          .join("") +
        "</ul>";
    };

    voiceOfText(text){
      const utter = new SpeechSynthesisUtterance(text);
      const voices = this.synthesis.getVoices();
      /*voices.forEach((voice) => {
        console.log(voice.name, voice.lang)
      })*/
      utter.voice = voices[0];
      this.synthesis.speak(utter);
    };

    listenBtn(){
      this.voiceButton.addEventListener("click", () => {
        this.listeningVoice();
      });
    }
  
    init() {
        this.listenBtn();
    }
  }
  
  export default SpeechApp;
  