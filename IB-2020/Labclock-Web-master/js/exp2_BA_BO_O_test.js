//
// experiment.js
//   global configuration of the experiment
//

var experiment = experiment || {};


experiment.X = {
  code: 'BA-BO-O', //trial order: baseline action, baseline outcome, operant trials
  password: '97',
  randomDelayMin: 1000,
  randomDelayMax: 1001,
  postResultsURL: 'datasave.php', //change this to whatever the server or host web address is
  generateCSV: true, //change to true if you want a csv at the end
  responseKey: ' ',
  sounds: {
    demo: [
      { file: 'media/250-440Hz_44100Hz_16bit_1000ms.wav' }
    ],
    getReady: [
      { }, //file: 'media/250-440Hz_44100Hz_16bit_1000ms.wav' 
      { } //file: 'media/500-880Hz_44100Hz_16bit_1000ms.wav' 
    ],
    feedback: [
      { duration: 100 /*in msec*/, pitch: 1000 /*in Hz*/ },
      { duration: 100 /*in msec*/, pitch: 500 /*in Hz*/ }
    ]
  },
  messages: {
    commandPrevious: 'Previous',
    commandOK: 'OK',
    commandNext: 'Next',
    commandAgree: 'I Agree',
    selectGroup: 'Select group',
    wrongPassword: 'Wrong code',
    trialReady: 'GET READY!',
    trialSelecting: 'Please place the dot where it was on the clock when you <mark class="red"><strong>PRESSED THE SPACEBAR</mark></strong>. Please do your best to be as accurate as possible. You may move the dot around as many times as you would like. Click "OK" when you are ready to move forward.',
    trialSelectingOutcome: 'Please place the dot where it was on the clock when you <mark class="blue"><strong>HEARD THE TONE</strong></mark>. Please do your best to be as accurate as possible. You may move the dot around as many times as you would like. Click "OK" when you are ready to move forward.',
    trialSelectingText: 'This is an attention check.<br/>Please enter a number greater than 100 in the text box below.<br/>Press OK when you are ready to move forward.',
    trialSelectingText2: 'This is an attention check.<br/>Please enter a number less than 100 in the text box below.<br/>Press OK when you are ready to move forward.',
    trialSelectingText3: 'This is an attention check.<br/>Please enter a number between 10 and 20 in the text box below.<br/>Press OK when you are ready to move forward.',
    trialSelectingText4: 'This is an attention check.<br/>Please enter a number between 250 and 300 in the text box below.<br/>Press OK when you are ready to move forward.',
    trialSelectingText5: 'This is an attention check.<br/>Please enter a number less than 70 in the text box below.<br/>Press OK when you are ready to move forward.',
    trialSelectingText6: 'This is an attention check.<br/>Please enter a number greater than 180 in the text box below.<br/>Press OK when you are ready to move forward.',
    errorCSSAnimations: 'Your browser do not support CSS Animations.',
    errorResolution: 'Screen resolution is too small.</p><br/><p>Please press F11 to switch to full screen and then F5 to reload.',
    errorAudio: 'Your browser does not support Web Audio API and therefore it will not be possible to play experiment\'s sounds.',
    recommendBrowser: 'Please <a href="http://google.com/chrome">download the latest version of Google Chrome</a> and try again.',
    errorAJAX: 'Unfortunately there has been an error while sending your results. Please contact us to solve the problem.',
    downloadTitle: 'Download data',
    downloadData: 'Click here to download experiment\'s data in CSV.',
    end: 'Please close the experiment\'s window.'
  },
  preScreens: [
    {
      title: 'Welcome',
      content: '<p><strong>LabClock 1.4.7</strong><br/><a href="http://www.labpsico.deusto.es/">Labpsico</a>, 2018<br/><br/>Developed by Pablo Garaizar<br/>garaizar@deusto.es<br/><a href="http://www.deusto.es/">Universidad de Deusto</a><br/>Bilbao, Spain</p><br/><br/><br/><p>Before you start, please check if the <strong>audio is activated </strong> and choose an <strong>appropriate volume</strong>.</p>' // <br/><button id="demosound" onclick="labclock.playDemo()">Play demo sound</button><br/><br/><p>Press \'Next\' to continue.</p>'
    },
    {
      title: 'Enter Prolific ID',
      content: '<p>Please enter your unique Prolific ID number in the box below.<br/><div id="text"><input type="text" id="the_id_of_the_input_field" size="10" /></div><br/><br/><br/>Press Next when you are ready to move on to the consent form.</p>'
    },
    {
      title: 'ONLINE CONSENT TO TAKE PART IN A RESEARCH STUDY - Page 1',
      content: '<p>This consent form is part of an informed consent process for a research study and it will provide information that will help you decide whether you want to take part in this study.  It is your choice to take part or not. Please check each box next to each section to indicate that you have read and understood the statements. After all of the questions below have been answered and you wish to take part in the research study, you will be asked to click a button and agree to participate in this study. Your alternative to taking part in the research is not to take part in it.</p><br/><p><input type= "checkbox"><label><strong>Who is conducting this research study and what is it about?</strong> You are being asked to take part in research conducted by Laura Saad who is a graduate student in the Dept. of Psychology. This study is being done to help us better understand how and why we experience a sense of control over actions and our environment.</label></p><br/><p><input type= "checkbox"><label><strong>What will I be asked to do if I take part?</strong> The session will take between 30-45 minutes to complete. We anticipate 200 subjects will take part in the study.</label></p>'
    },
    {
      title: 'ONLINE CONSENT TO TAKE PART IN A RESEARCH STUDY - Page 2',
      content: '<p><input type= "checkbox"><label><strong>What are the risks and/or discomforts I might experience if I take part in the study?</strong> Breach of confidentiality is a risk of harm but a data security plan is in place to minimize such a risk. If you are uncomfortable at any time, you can withdraw from the study. If you decide to quit at any time before you have finished the survey your answers will be recorded but you may contact Laura Saad (ls1115@scarletmail.rutgers.edu) if you wish to have them removed.</label></p><br/><p><input type= "checkbox"><label><strong>Are there any benefits to me if I choose to take part in this study?</strong> There no direct benefits to you for taking part in this research.</label></p><br/><p><input type= "checkbox"><label><strong>Will I be paid to take part in this study?</strong> You will be paid $5 per half hour of participation in this study. Participation does not need to be in exact 30 minute increments to receive the next $5 payment. For example, if your session takes over 30 minutes (e.g., 32 or 47 minutes) you will be paid $5 more.</label></p>'
    },
    {
      title: 'ONLINE CONSENT TO TAKE PART IN A RESEARCH STUDY - Page 3',
      content: '<p><input type= "checkbox"><label><strong>How will information about me be kept private or confidential?</strong> All efforts will be made to keep your responses confidential, but total confidentiality cannot be guaranteed. We will use secure software to collect and forward your anonymous responses to us. We will not receive any information that can identify you or other subjects. We will download your responses to a secure file that requires a password to access. Only study staff will have access to the password. Responses will be deleted from the file 5 years after analysis is complete and study findings are professionally presented or published. No information that can identify you will appear in any professional presentation or publication.</label></p><br/><p><input type= "checkbox"><label><strong>What will happen to information I provide in the research after the study is over?</strong> The information collected about you for this research will not be used by or distributed to investigators for other research.</label></p>'
    },
    {
      title: 'ONLINE CONSENT TO TAKE PART IN A RESEARCH STUDY - Page 4',
      content: '<p><input type= "checkbox"><label><strong>What will happen if I do not want to take part or decide later not to stay in the study?</strong> Your participation is voluntary. If you choose to take part now, you may change your mind and withdraw later. If you do not click on the ‘I Agree’ button, your responses will not be recorded. You may also be able to skip any questions that you do not wish to answer. However, once you click the ‘I Agree’ button at the end of this form, your responses will be recorded. After any partial or full completion of the study you may also withdraw your consent for the use of data already collected about you, but you must do this in writing to Laura Saad, 152 Frelinghuysen Rd, Piscataway Township, NJ 08854.</label></p><br/><p><input type= "checkbox"><label><strong>Who can I call if I have questions?</strong> If you have questions about taking part in this study, you can contact the Principal Investigator: Laura Saad at ls1115@scarletmail.rutgers.edu. You can also contact the faculty advisors, Pernille Hemmer, at pernille.hemmer@psych.rutgers.edu and/or Julien Musolino, at julienm@ruccs.rutgers.edu.</label></p>'
    },
    {
      title: 'ONLINE CONSENT TO TAKE PART IN A RESEARCH STUDY - Page 5',
      content: '<p><input type= "checkbox"><label>If you have questions about your rights as a research subject, you can call the IRB Director at: New Brunswick/Piscataway ArtSci IRB (732)235-2866 or the Rutgers Human Subjects Protection Program at (973) 972-1149 in Newark.</label></p><br/><p><input type= "checkbox"><label>Please click <a href="https://www.dropbox.com/s/lnlizxci2t882iu/Pro2019000234_Saad_IRB_OnlineConsent_2020modification.docx?dl=0" target="_blank">HERE</a> to print out this consent form if you would like a copy of it for your files.</label></p><br/><p><input type= "checkbox"><label>If you do not wish to take part in the research, close this website address. If you wish take part in the research, follow the directions below:</label></p><br/><p><strong>By beginning this research, I acknowledge that I am 18 years of age or older and have read and understand the information. I agree to take part in the research, with the knowledge that I am free to withdraw my participation in the research without penalty.</strong></p><br/><p>Click on the "I Agree" button to confirm your agreement to take part in the research.</p>'
    },
    {
      title: 'Headphones',
      content: '<p><strong>Are you using or wearing headphones to complete this experiment?</strong></p><br/><p>Please enter YES or NO into the text box below.<br/><div id="text"><input type="text" id="the_id_of_the_input_field" size="10" /></div><br/><br/><br/>Press \'Next\' to move on to the instructions.</p>',
    },
    {
      title: 'Experiment Instructions',
      content: '<p><strong>Please ensure that you are in a quiet location before beginning the experiment.</strong> Please check the boxes to indicate you have read and understand each section.</p><br/><p><input type= "checkbox"><label>At the beginning of each trial you will see a “GET READY” message. The dot on the clock on your screen will then begin rotating. In this first section, you will be asked to press the spacebar at a time of your choosing after the dot on the clock has completed one full rotation.</</label></p><br/><p><input type= "checkbox"><label><strong>Your task is to pay attention to where the dot was on the clock when you <mark class="red">pressed the spacebar.</mark></strong></label></p><br/><p><input type= "checkbox">At the end of each trial, you will be asked to recall the position of the dot on the clock when you <mark class="red"><strong>pressed the spacebar</strong></mark>. To do that, simply use your mouse to click the position on the clock where you thought the dot was when you pressed the spacebar.</label></p><br/><p><input type= "checkbox"><label>You may move the dot around as many times as you would like. Once you are satisfied with your response, click “OK” and the next trial will start.</label></p><br/><p>Press "Next" to move to the next screen where you will see a clock in demo mode to help you familiarize yourself with the task.</p>'
    },
    {
      title: 'Demo',
      content: '<p>Clock in demo mode. Press "Next" once you are familiar with how it works.</p><div id="demo_clock"><div id="demo_marks"><img src="img/dot.png" width="510" height="510"  id="demo_dot"/></div></div>'
    }
  ],
  passwordScreen: {
    title: 'Get ready',
    content: '<p>Please enter the code provided by the research group to start the first part of the experiment.<br/>The code is 97.</p><br/><div id="pre_password"><input type="password" id="pre_password_text" size="10" /></div><br/><p>The experiment will start once the correct code is entered.</p><br/><br/><br/><br/><br/><br/><br/><br/><p>Press \'OK\' to start.</p>'
  },
  phases: [
    {
        description: 'Baseline action',
        progress: true,
        scramble: true,
        trials: [
           { cycle: 2560 },
           { cycle: 2560 },
           { cycle: 2560 },
           { cycle: 2560 },
           { cycle: 2560 },
           { cycle: 2560 },
           { cycle: 2560, response: 'text' },
           { cycle: 2560 },
           { cycle: 2560 },
           { cycle: 2560 },
           { cycle: 2560 }
        ],
        screen: {
          title: 'Instructions for Part 2',
          content: '<p>You have completed the first part of the experiment. Again, please check each box to indicate you have read and understood the instructions.</p><br/><p>At the beginning of each trial you will see a “GET READY” message. The dot on the clock on your screen will then begin rotating. This will be followed by a tone that you will hear at a random time.</label></p><br/><p><input type= "checkbox"><label><strong>Your task is to pay attention to where the dot was on the clock when you <mark class="blue">heard the tone.</mark></strong></label></p><br/><p><input type= "checkbox"><label>At the end of each trial, you will be asked to recall the position of the dot on the clock when you <mark class="blue"><strong>heard the tone</mark></strong>. To do that, simply use your mouse to click the position on the clock where you thought the dot was when you heard the tone.</label></p><br/><p><input type= "checkbox"><label>You may move the dot around as many times as you would like. Once you are satisfied with your response, click “OK” and the next trial will start.</label></p><br/><p>Press "OK" to start the next part of the experiment.</p>',
        }
    },
    {
      description: 'Baseline outcome',
      progress: true,
      scramble: true,
      trials: [
          {cycle: 2560, tone: Math.random() * (2560 - 1280) + 2560, nopress: true, response: 'outcome' },
          { cycle: 2560, tone: Math.random() * (2560 - 1280) + 2560, nopress: true, response: 'outcome' },
          { cycle: 2560, tone: Math.random() * (2560 - 1280) + 2560, nopress: true, response: 'text2' },
          { cycle: 2560, tone: Math.random() * (2560 - 1280) + 2560, nopress: true, response: 'outcome' },
          { cycle: 2560, tone: Math.random() * (2560 - 1280) + 2560, nopress: true, response: 'outcome' },
          { cycle: 2560, tone: Math.random() * (2560 - 1280) + 2560, nopress: true, response: 'outcome' },
          { cycle: 2560, tone: Math.random() * (2560 - 1280) + 2560, nopress: true, response: 'outcome' },
          { cycle: 2560, tone: Math.random() * (2560 - 1280) + 2560, nopress: true, response: 'outcome' },
          { cycle: 2560, tone: Math.random() * (2560 - 1280) + 2560, nopress: true, response: 'outcome' },
          { cycle: 2560, tone: Math.random() * (2560 - 1280) + 2560, nopress: true, response: 'outcome' },
          { cycle: 2560, tone: Math.random() * (2560 - 1280) + 2560, nopress: true, response: 'outcome' }
        
      ],
      screen: {
        title: 'Instructions for Part 3',
        content: '<p>Please check each box to indicate that you have read and understood the instructions.</p><br/><p><input type= "checkbox"><label>In this last section, <strong>you will be asked to press the spacebar at a time of your choosing after the dot on the clock has completed one full rotation.</strong> Your keypress will cause the computer to play a tone.</label></p><br/><p><input type= "checkbox"><label><strong>Your task will be to pay attention to where the dot was on the clock when you <mark class="red">pressed the spacebar</mark> AND when you <mark class="blue">heard the tone.</mark></strong></label></p><br/><p><input type= "checkbox"><label>At the end of each trial, instructions at the top of the page will ask you to recall the position of the dot on the clock <strong>EITHER when you <mark class="red">pressed the spacebar</mark> OR when you <mark class="blue">heard the tone</mark></strong>. To do that, simply use your mouse to click the position on the clock where you thought the dot was for the relevant event.</label></p><br/><p><input type= "checkbox"><label>You may move the dot around as many times as you would like. Once you are satisfied with your response, click “OK” and the next trial will start.</label></p><br/><p>Press "OK" to start the last part of the experiment.</p>',
      }
  },
  {
    description: 'Binding Section 1',
    progress: true,
    scramble: true,
    trials: [
        { cycle: 2560, tone: 250, response: 'outcome' },
        { cycle: 2560, tone: 750, response: 'outcome' },
        { cycle: 2560, tone: 250, response: 'outcome' },
        { cycle: 2560, tone: 750, response: 'outcome' },
        { cycle: 2560, tone: 250, response: 'outcome' },
        { cycle: 2560, tone: 750, response: 'outcome' },
        { cycle: 2560, tone: 250, response: 'outcome' },
        { cycle: 2560, tone: 750, response: 'outcome' },
        { cycle: 2560, tone: 750 },
        { cycle: 2560, tone: 250 },
        { cycle: 2560, tone: 250, response: 'text3' },
        { cycle: 2560, tone: 750 },
        { cycle: 2560, tone: 250 },
        { cycle: 2560, tone: 750 },
        { cycle: 2560, tone: 250 },
        { cycle: 2560, tone: 750 },
        { cycle: 2560, tone: 250 },
    ],
    screen: {
      title: 'BREAK - Instructions Repeated',
      content: '<p><strong>You will be asked to press the spacebar at a time of your choosing after the dot on the clock has completed one full rotation.</strong> Your keypress will cause the computer to play a tone.</p><br/><p><strong>Your task will be to pay attention to where the dot was on the clock when you <mark class="red">pressed the spacebar</mark> AND when you <mark class="blue">heard the tone.</mark></strong></p><br/><p>At the end of each trial, instructions at the top of the page will ask you to recall the position of the dot on the clock <strong>EITHER when you <mark class="red">pressed the spacebar</mark> OR when you <mark class="blue">heard the tone</mark></strong>. To do that, simply use your mouse to click the position on the clock where you thought the dot was for the relevant event.</p><br/><p>You may move the dot around as many times as you would like. Once you are satisfied with your response, click “OK” and the next trial will start. There will be three breaks during this part of the task. Please try your best to stay focused.</p><br/><br/><p>Press "OK" to start the next block.</p>',
      }  
  },
  {
      description: 'Binding Section 2',
      progress: true,
      scramble: true,
      trials: [
        { cycle: 2560, tone: 250, response: 'outcome' },
        { cycle: 2560, tone: 750, response: 'outcome' },
        { cycle: 2560, tone: 250, response: 'outcome' },
        { cycle: 2560, tone: 750, response: 'outcome' },
        { cycle: 2560, tone: 250, response: 'outcome' },
        { cycle: 2560, tone: 750, response: 'outcome' },
        { cycle: 2560, tone: 750, response: 'text4' },
        { cycle: 2560, tone: 250, response: 'outcome' },
        { cycle: 2560, tone: 750, response: 'outcome' },
        { cycle: 2560, tone: 750 },
        { cycle: 2560, tone: 250 },
        { cycle: 2560, tone: 750 },
        { cycle: 2560, tone: 250 },
        { cycle: 2560, tone: 750 },
        { cycle: 2560, tone: 250 },
        { cycle: 2560, tone: 750 },
        { cycle: 2560, tone: 250 },
      ],
      screen: {
        title: 'BREAK - Instructions Repeated',
        content: '<p><strong>You will be asked to press the spacebar at a time of your choosing after the dot on the clock has completed one full rotation.</strong> Your keypress will cause the computer to play a tone.</p><br/><p><strong>Your task will be to pay attention to where the dot was on the clock when you <mark class="red">pressed the spacebar</mark> AND when you <mark class="blue">heard the tone.</mark></strong></p><br/><p>At the end of each trial, instructions at the top of the page will ask you to recall the position of the dot on the clock <strong>EITHER when you <mark class="red">pressed the spacebar</mark> OR when you <mark class="blue">heard the tone</mark></strong>. To do that, simply use your mouse to click the position on the clock where you thought the dot was for the relevant event.</p><br/><p>You may move the dot around as many times as you would like. Once you are satisfied with your response, click “OK” and the next trial will start. There will be three breaks during this part of the task. Please try your best to stay focused.</p><br/><br/><p>Press "OK" to start the next block.</p>',
      }
    },
    {
      description: 'Binding Section 3',
      progress: true,
      scramble: true,
      trials: [
        { cycle: 2560, tone: 250, response: 'outcome' },
        { cycle: 2560, tone: 750, response: 'outcome' },
        { cycle: 2560, tone: 250, response: 'outcome' },
        { cycle: 2560, tone: 750, response: 'outcome' },
        { cycle: 2560, tone: 250, response: 'outcome' },
        { cycle: 2560, tone: 750, response: 'outcome' },
        { cycle: 2560, tone: 750, response: 'text5' },
        { cycle: 2560, tone: 250, response: 'outcome' },
        { cycle: 2560, tone: 750, response: 'outcome' },
        { cycle: 2560, tone: 750 },
        { cycle: 2560, tone: 250 },
        { cycle: 2560, tone: 750 },
        { cycle: 2560, tone: 250 },
        { cycle: 2560, tone: 750 },
        { cycle: 2560, tone: 250 },
        { cycle: 2560, tone: 750 },
        { cycle: 2560, tone: 250 },
      ],
      screen: {
        title: 'BREAK - Instructions Repeated',
        content: '<p><strong>You will be asked to press the spacebar at a time of your choosing after the dot on the clock has completed one full rotation.</strong> Your keypress will cause the computer to play a tone.</p><br/><p><strong>Your task will be to pay attention to where the dot was on the clock when you <mark class="red">pressed the spacebar</mark> AND when you <mark class="blue">heard the tone.</mark></strong></p><br/><p>At the end of each trial, instructions at the top of the page will ask you to recall the position of the dot on the clock <strong>EITHER when you <mark class="red">pressed the spacebar</mark> OR when you <mark class="blue">heard the tone</mark></strong>. To do that, simply use your mouse to click the position on the clock where you thought the dot was for the relevant event.</p><br/><p>You may move the dot around as many times as you would like. Once you are satisfied with your response, click “OK” and the next trial will start. There will be three breaks during this part of the task. Please try your best to stay focused.</p><br/><br/><p>Press "OK" to start the next block.</p>',
      }
    },
    {
      description: 'Binding Section 4',
      progress: true,
      scramble: true,
      trials: [
        { cycle: 2560, tone: 250, response: 'outcome' },
        { cycle: 2560, tone: 750, response: 'outcome' },
        { cycle: 2560, tone: 250, response: 'outcome' },
        { cycle: 2560, tone: 750, response: 'outcome' },
        { cycle: 2560, tone: 250, response: 'outcome' },
        { cycle: 2560, tone: 750, response: 'outcome' },
        { cycle: 2560, tone: 250, response: 'outcome' },
        { cycle: 2560, tone: 750, response: 'outcome' },
        { cycle: 2560, tone: 750 },
        { cycle: 2560, tone: 250 },
        { cycle: 2560, tone: 250, response: 'text6' },
        { cycle: 2560, tone: 750 },
        { cycle: 2560, tone: 250 },
        { cycle: 2560, tone: 750 },
        { cycle: 2560, tone: 250 },
        { cycle: 2560, tone: 750 },
        { cycle: 2560, tone: 250 },
    ],
      screen: {
        title: 'End of the experiment',
        content: '<p>Press \'OK\' to move to the final screen and proceed back to Prolific.</p>'
      }
    }
],
postScreens: [
  {
    title: 'Thank you!',
    content: '<p>Your responses will be added to those of the other participants and analyzed statistically.</p><br/><p>Thank you very much for your participation.</p><br/><p>If you are interested in these kind of studies, please visit our lab website to learn more about our research: <a href="https://sites.rutgers.edu/ccm-lab/">HCCLAB WEBSITE</a>.</p><br/><br/><strong><mark class="blue">Please click <a href="https://app.prolific.co/submissions/complete?cc=F79B354C">HERE</a> to go back to Prolific.</mark></strong></p><br/><p><strong>*You must click on the link above in order to receive payment for your participation.*</strong></p><br/><p><strong>IF YOU ARE A FRIEND DOING THIS TASK - JUST EXIT OUT OF THE SCREEN. THANK YOU!!!!!</strong></p>'
  }
]
};
