//
// experiment.js
//   global configuration of the experiment
//

var experiment = experiment || {};


experiment.A = {
  code: 'operant trials',
  password: '1',
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
      { file: 'media/250-440Hz_44100Hz_16bit_1000ms.wav' },
      { file: 'media/500-880Hz_44100Hz_16bit_1000ms.wav' }
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
    trialReady: 'GET READY.<br/>Remember that you have to press the SPACEBAR during the SECOND lap.',
    trialSelecting: 'Please place the dot where it was on the clock when you PRESSED THE SPACEBAR. Please do your best to be as accurate as possible. Click OK when you are ready to move forward.',
    trialSelectingOutcome: 'Please place the dot where it was on the clock when you FIRST HEARD THE TONE. Please do your best to be as accurate as possible. Click OK when you are ready to move forward.',
    trialSelectingText: 'Please place the dot where it was on the clock when you FIRST HEARD THE TONE. Please do your best to be as accurate as possible. Click OK when you are ready to move forward.',
    errorCSSAnimations: 'Your browser do not support CSS Animations.',
    errorResolution: 'Screen resolution is too small.</p><br/><p>Please press F11 to switch to full screen and then F5 to reload.',
    errorAudio: 'Your browser do not support Web Audio API and therefore it will not be possible to play experiment\'s sounds.',
    recommendBrowser: 'Please <a href="http://google.com/chrome">download the latests version of Google Chrome</a> and try again.',
    errorAJAX: 'Unfortunately there has been an error while sending your results. Please contact us to solve the problem.',
    downloadTitle: 'Download data',
    downloadData: 'Click here to download experiment\'s data in CSV.',
    end: 'Please close the experiment\'s window.'
  },
  preScreens: [
    {
      title: 'Welcome',
      content: '<p><strong>LabClock 1.4.7</strong><br/><a href="http://www.labpsico.deusto.es/">Labpsico</a>, 2018<br/><br/>Developed by Pablo Garaizar<br/>garaizar@deusto.es<br/><a href="http://www.deusto.es/">Universidad de Deusto</a><br/>Bilbao, Spain</p><br/><br/><br/><p>Before you start, please check if the <strong>audio is activated </strong> and choose <strong>appropriate volume</strong>.</p><br/><button id="demosound" onclick="labclock.playDemo()">Play demo sound</button><br/><br/><p>Press \'Next\' to continue...</p>'
    },
    {
      title: 'Thank you - FROM CONSENT FORM',
      content: '<p>We would like to thank you for taking part in this experiment. Without the help of people like you our research would not be possible.</p><br/><p>In this task there are no good or bad responses. What we are investigating are basic psychological processes that occur similarly in all individuals. </p><br/><p>If you\'d like to participate it is important that you do it with true interest. You do not need to tell us your name, and the responses that you will give through the experiment will be added to those of the other participants and analyzed statistically. Your participation in this experiment is <em>anonimous</em> and <em>voluntary</em>.</p><br/><p>If you agree to participate, press \'Next\'.</p>'
    },
    {
      title: 'Instructions',
      content: '<p>At the beginning of each trial you will hear a sound and see a “GET READY” message. The dot on the clock on your screen will then begin rotating.</p><br/><p>Your task is to wait for one full rotation of the dot before you press the SPACEBAR. Your keypress will cause the computer to play a tone.</p><br/><p>At the end of each trial, you will be asked to recall the position of the dot on the clock when you first PRESSED THE SPACEBAR or when you first HEARD THE TONE. To do that, simply use your mouse to click on the clock and place the dot at the correct position.</p><br/><p>Once you are satisfied with your response, click “OK” and the next trial will start.</p><br/><p>On the next screen you will see a clock in demo mode to help you familiarize yourself with the task.</p>'
    },
    {
      title: 'Demo',
      content: '<p>Clock in demo mode. Press \'Next\' once you undestand how it works.</p><div id="demo_clock"><div id="demo_marks"><img src="img/dot.png" width="510" height="510"  id="demo_dot"/></div></div>'
    }
  ],
  passwordScreen: {
    title: 'Get ready',
    content: '<p>Please enter the code provided by the research group to start the first part of the experiment.</p><br/><div id="pre_password"><input type="password" id="pre_password_text" size="10" /></div><br/><p>The experiment will start once the correct code is entered.</p><br/><br/><br/><br/><br/><br/><br/><br/><p>Press \'OK\' to start...</p>'
  },
  phases: [
    {
      description: 'Baseline',
      progress: true,
      scramble: false,
      trials: [
      // { cycle: 2560, tone: 1280, nopress: true, style: { backgroundColor: 'khaki', color: 'black'} },
      //  { cycle: 2560, tone: Math.random() * (500 - 1) + 1, response: 'text', firstlap: true, trialReady: 'GET READY.<br/>Remember that you have to press the SPACEBAR during the FIRST lap.', laps: 1, stop: true, counterclockwise: true },
      //  { cycle: 2560, tone: 500, getReady: 2, feedback: 2, style: { backgroundColor: 'aquamarine', color: 'black'} },
      //  { cycle: 2560, tone: Math.random() * (2560 - 1280) + 1280, nopress: true, style: { backgroundColor: 'khaki', color: 'black'} }
      ],
      screen: {
        title: 'Begin Experimental Trials',
        content: '<p>You have completed the first part of the experiment. Press \'OK\' to start the next part of the experiment.</p>'
      }
    },
    {
      description: 'Binding',
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
        { cycle: 2560, tone: 250 },
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
      content: '<p>Your responses will be added to those of the other participants and analyzed statistically.</p><br/><p>Thank you very much for your collaboration.</p><br/><p>If you are interested in this kind of studies, please visit the Experiments Tab on our lab website <a href="https://sites.rutgers.edu/ccm-lab/">our website</a>.</p>'
    }
  ]
};
