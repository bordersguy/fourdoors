var wordList;
var questionList;
var settingsSwitch = 0;
var settingsPanel;
var currentList;
var currentList2
var totalWords = 0;
var totalQuestions = 0;
var saveText;
var saveQuestion = [];
var enter1;
var explain;
var submit;
var submitQuestion;
var clear;
var clearQuestion;
var instructions;
var settingsGroup;
var backgroundMusic;
var clickSound;


var menuState = {

    
    create: function () {
    clickSound = this.game.add.audio("clickSound");
    backgroundMusic = this.game.add.audio("backgroundMusic", .1, true);
    
    backgroundMusic.play();
      
    window.localStorage.clear();
        
    this.game.plugins.add(PhaserInput.Plugin);
    
    this.game.add.sprite(300, 25,'mainmenu');
    

    var button = this.game.add.button (450,250, 'startbutton', start, this, 2,1,0);
    button.input.useHandCursor = true;
    
    var button2 = this.game.add.button (1100,25, 'settings', showSettings, this, 2,1,0);
    button2.input.useHandCursor = true;
    
    settingsGroup = this.game.add.group();
    
    }

};



function  SaveWord () {
    
    if (totalWords == 0)
    {
        
        currentList.setText("");
    }
    
    if (totalWords < 5)
    {
        if (totalWords == 0)
        {
            saveText = wordList.value;
        }
        else
        {
            saveText = saveText + " " + wordList.value;    
        }
        
        
    
        window.localStorage["save"] = saveText;
        
        currentList.setText(currentList.text + " " + (totalWords + 1) + ": " + wordList.value);    
        
        totalWords += 1;
        
        
    }
    
    wordList.resetText();
    wordList.startFocus();
    
}

function  SaveQuestion () {
    
    if (totalQuestions == 0)
    {
        currentList2.setText("");
    }
    
    if (totalQuestions < 20)
    {
        if (totalQuestions == 0)
        {
            saveQuestion = questionList.value;
        }
        else
        {
            saveQuestion = saveQuestion + " " + questionList.value;    
        }
        

    
        window.localStorage["saveQuestion"] = saveQuestion;
        
        currentList2.setText(currentList2.text + " " + (totalQuestions + 1) + ": " + questionList.value);    
        
        totalQuestions += 1;
        
        
    }

    questionList.resetText();
    questionList.startFocus();
    
}


function  start () {
    backgroundMusic.stop();
    clickSound.play();
    
    this.game.state.start('play');
    
}




function showSettings () {
    

    if (settingsSwitch == 0)
    {
        explain = "Type in up to 20 questions and up to 20 words you want your students to review. Puncuation is necessary.";
        settingsPanel = this.game.add.sprite(150,50, "settingspanel");
        
        instructions = this.game.add.text(50, 10, explain, { fill: '#ffffff', fontSize: '120px', wordWrap: true, wordWrapWidth: settingsPanel.width - 70});

        wordList = this.game.add.inputField(550, 80, {
        font: '18px Arial',
        fill: '#212121',
        fontWeight: 'bold',
        width: 150,
        padding: 12,
        borderWidth: 1,
        borderColor: '#000',
        placeHolder: 'Click Here To Type'
    
        });

        
        
        questionList = this.game.add.inputField(50, 80, {
        font: '18px Arial',
        fill: '#212121',
        fontWeight: 'bold',
        width: 150,
        padding: 12,
        borderWidth: 1,
        borderColor: '#000',
        placeHolder: 'Click Here To Type'
    
        });
        
        questionList.startFocus();
        
        currentList = this.game.add.text(wordList.x ,wordList.y + 60, "Type one word in at a time: ", { fill: '#ffffff', font: '12pt Arial', wordWrap: true, wordWrapWidth: 250 });   
        currentList2 = this.game.add.text(questionList.x ,questionList.y + 60, "Type one question in at a time: ", { fill: '#ffffff', font: '12pt Arial', wordWrap: true, wordWrapWidth: 250 });
        
        submit = this.game.add.button (550, 400, 'submit', SaveWord, this, 2,1,0);
        submitQuestion = this.game.add.button (25, 400, 'submit', SaveQuestion, this, 2,1,0);
        
        
        clear = this.game.add.button (submit.x + 150, 400, 'clear', clearList, this, 2,1,0);
        clearQuestion = this.game.add.button (submitQuestion.x + 150, 400, 'clear', clearList2, this, 2,1,0);

        // enter1 = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        
        // enter1.onDown.add(saveWord,this);
        settingsSwitch = 1;
        
        settingsPanel.addChild(instructions);
        settingsPanel.addChild(wordList);
        settingsPanel.addChild(questionList);
        settingsPanel.addChild(submit);
        settingsPanel.addChild(submitQuestion);
        settingsPanel.addChild(clear);
        settingsPanel.addChild(clearQuestion);
        settingsPanel.addChild(currentList);
        settingsPanel.addChild(currentList2);
        
        
        
        
        return;
        
    } else {
        
        settingsPanel.destroy();
        settingsSwitch = 0;
        
    }
    
}



function clearList () {
        
   window.localStorage.clear();
   currentList.setText("");
   totalWords = 0;
                
}

function clearList2 () {
        
   window.localStorage.clear();
   currentList2.setText("");
   totalQuestions = 0;
                
}


    
