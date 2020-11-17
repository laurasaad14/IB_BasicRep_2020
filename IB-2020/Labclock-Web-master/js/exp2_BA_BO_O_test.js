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
  postResultsURL: 'datasent.asp', 
  generateCSV: true,
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
      { duration: 200 /*in msec*/, pitch: 1000 /*in Hz*/ },
      { duration: 100 /*in msec*/, pitch: 500 /*in Hz*/ }
    ]
  },
  messages: {
    commandPrevious: 'Previous',
    commandOK: 'OK',
    commandNext: 'Next',
    selectGroup: 'Select group',
    wrongPassword: 'Wrong code',
    trialReady: 'GET READY!',
    trialSelecting: 'Please place the dot where it was on the clock when you <strong>PRESSED THE SPACEBAR</strong>. Please do your best to be as accurate as possible. Click "OK" when you are ready to move forward.',
    trialSelectingOutcome: 'Please place the dot where it was on the clock when you <strong>HEARD THE TONE</strong>. Please do your best to be as accurate as possible. Click "OK" when you are ready to move forward.',
    trialSelectingText: 'Please place the dot where it was on the clock when you HEARD THE TONE. Please do your best to be as accurate as possible. Click "OK" when you are ready to move forward.',
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
      content: '<p><strong>LabClock 1.4.7</strong><br/><a href="http://www.labpsico.deusto.es/">Labpsico</a>, 2018<br/><br/>Developed by Pablo Garaizar<br/>garaizar@deusto.es<br/><a href="http://www.deusto.es/">Universidad de Deusto</a><br/>Bilbao, Spain</p><br/><br/><br/><p>Before you start, please check if the <strong>audio is activated </strong> and choose an <strong>appropriate volume</strong>.</p>' // </p><br/><button id="demosound" onclick="labclock.playDemo()">Play demo sound</button><br/><br/><p>Press \'Next\' to continue.</p>'
    },
    {
      title: 'Thank you - FROM CONSENT FORM',
      content: '<p>This page will either contain text from the consent form or, if MTurk does consenting before experiments begin then this page will not exist.</p>'
    },
    {
      title: 'Instructions',
      content: '<p>At the beginning of each trial you will see a “GET READY” message. The dot on the clock on your screen will then begin rotating.</p><br/><p>Your task is to <strong>wait for one full rotation of the dot before you press the spacebar</strong>.</p><br/><p>At the end of each trial, you will be asked to recall the position of the dot on the clock when you <strong>pressed the spacebar</strong>. To do that, simply use your mouse to click the position on the clock where you thought the dot was.</p><br/><p>Once you are satisfied with your response, click “OK” and the next trial will start.</p><br/><br/><p>Press "Next" to move to the next screen where you will see a clock in demo mode to help you familiarize yourself with the task.</p>',
    },
    {
      title: 'Demo',
      content: '<p>Clock in demo mode. Press \'Next\' once you undestand how it works.</p><div id="demo_clock"><div id="demo_marks"><img src="img/dot.png" width="510" height="510"  id="demo_dot"/></div></div>'
    }
  ],
  passwordScreen: {
    title: 'Get ready',
    content: '<p>Please enter the code provided by the research group to start the first part of the experiment.</p><br/><div id="pre_password"><input type="password" id="pre_password_text" size="10" /></div><br/><p>The experiment will start once the correct code is entered.</p><br/><br/><br/><br/><br/><br/><br/><br/><p>Press \'OK\' to start.</p>'
  },
  phases: [
    {
        description: 'Baseline action',
        progress: true,
        scramble: false,
        trials: [
           // { cycle: 2560 },
            //{ cycle: 2560 },
           // { cycle: 2560 },
           // { cycle: 2560 },
           // { cycle: 2560 },
            //{ cycle: 2560 },
           // { cycle: 2560 },
           // { cycle: 2560 },
           // { cycle: 2560 },
            { cycle: 2560 }
        ],
        screen: {
          title: 'Instructions for Part 2',
          content: '<p>You have completed the first part of the experiment.</p><br/><p>The next section will be the same as the first except this time <strong>you will not press any keys</strong>.</p><br/><p><strong>Your task is to pay attention to when the tone is played through the speaker.</strong></p><br/><p>At the end of each trial, you will be asked to recall the position of the dot on the clock when you <strong>heard the tone</strong>. To do that, simply use your mouse to click the position on the clock where you thought the dot was.</p><br/><p>Once you are satisfied with your response, click “OK” and the next trial will start.</p><br/><br/><br/><br/><p>Press "OK" to start the next part of the experiment.</p>',
        }
    },
    {
      description: 'Baseline outcome',
      progress: true,
      scramble: false,
      trials: [
       // { cycle: 2560, tone: Math.random() * (2560 - 1280) + 1280, nopress: true, response: 'outcome' },
        //{ cycle: 2560, tone: Math.random() * (2560 - 1280) + 1280, nopress: true, response: 'outcome' },
        //{ cycle: 2560, tone: Math.random() * (2560 - 1280) + 1280, nopress: true, response: 'outcome' },
        //{ cycle: 2560, tone: Math.random() * (2560 - 1280) + 1280, nopress: true, response: 'outcome' },
        //{ cycle: 2560, tone: Math.random() * (2560 - 1280) + 1280, nopress: true, response: 'outcome' },
        //{ cycle: 2560, tone: Math.random() * (2560 - 1280) + 1280, nopress: true, response: 'outcome' },
        //{ cycle: 2560, tone: Math.random() * (2560 - 1280) + 1280, nopress: true, response: 'outcome' },
        //{ cycle: 2560, tone: Math.random() * (2560 - 1280) + 1280, nopress: true, response: 'outcome' },
        //{ cycle: 2560, tone: Math.random() * (2560 - 1280) + 1280, nopress: true, response: 'outcome' },
        { cycle: 2560, tone: Math.random() * (2560 - 1280) + 1280, nopress: true, response: 'outcome' }
        
      ],
      screen: {
        title: 'Instructions for Part 3',
        content: '<p>You have completed the second part of the experiment.</p><br/><p>This last section will be similar to the first two except this time <strong>your task will be to press the spacebar at a time of your choosing. However, before doing so you need to wait for one full rotation of the dot. Your keypress will cause the computer to play a tone</strong>.</p><br/><p>At the end of each trial, you will be asked to recall the position of the dot on the clock when you <strong>pressed the spacebar OR when you heard the tone</strong>. To do that, simply use your mouse to click the position on the clock where you thought the dot was.</p><br/><p>Once you are satisfied with your response, click “OK” and the next trial will start.</p><br/><p>There will be three breaks during this part of the task. Please try your best to stay focused.</p><br/><br/><p>Press "OK" to start the last part of the experiment.</p>',
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
        { cycle: 2560, tone: 750 },
        { cycle: 2560, tone: 250 }
      ],
      screen: {
        title: 'BREAK',
        content: '<p>Press \'OK\' to continue.</p>'
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
          { cycle: 2560, tone: 250, response: 'outcome' },
          { cycle: 2560, tone: 750, response: 'outcome' },
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
          { cycle: 2560, tone: 750 },
          { cycle: 2560, tone: 250 }
        ],
        screen: {
          title: 'BREAK',
          content: '<p>Press \'OK\' to continue.</p>'
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
          { cycle: 2560, tone: 250, response: 'outcome' },
          { cycle: 2560, tone: 750, response: 'outcome' },
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
          { cycle: 2560, tone: 750 },
          { cycle: 2560, tone: 250 }
        ],
        screen: {
          title: 'BREAK',
          content: '<p>Press \'OK\' to continue.</p>'
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
          { cycle: 2560, tone: 750 },
          { cycle: 2560, tone: 250 }
        ],
        screen: {
          title: 'End of the experiment',
          content: '<p>Press \'OK\' to finish.</p>'
        }
      }
  ],
  postScreens: [
    {
      title: 'Thank you!',
      content: '<p>Your responses will be added to those of the other participants and analyzed statistically.</p><br/><p>Thank you very much for your participation.</p><br/><p>If you are interested in these kind of studies, please visit the Experiments Tab on our lab website: <a href="https://sites.rutgers.edu/ccm-lab/">HCCL LAB WEBSITE</a>.</p>'
    }
  ]
};
