var labclock = {
	//Extra variables
	resolutionWidth: 0,
	resolutionHeight: 0,
  //State definition consts
  STATE_PRE: 0,
  STATE_PASSWORD: 1,
  STATE_PHASE_START: 2,
  STATE_TRIAL_READY: 3,
  STATE_TRIAL_RUNNING: 4,
  STATE_TRIAL_SELECTING: 5,
  STATE_PHASE_END: 6,
  STATE_POST: 7,
  //Selectors
  head: document.getElementsByTagName('head')[0],
  body: document.getElementsByTagName('body')[0],
  bodyStyle: document.getElementsByTagName('body')[0].style,
  experimentElement: document.createElement('script'),
  preScreen: document.getElementById('pre_screen'),
  preScreenTitle: document.getElementById('pre_screen_title'),
  preScreenContent: document.getElementById('pre_screen_content'),
  expScreen: document.getElementById('exp_screen'),
  expScreenTitle: document.getElementById('exp_screen_title'),
  expScreenProgress: document.getElementById('exp_screen_progress'),
  expScreenCaption: document.getElementById('exp_screen_caption'),
  expScreenTextbox: document.getElementById('exp_screen_textbox'),
  expScreenTextboxValue: document.getElementById('exp_screen_textbox_value'),
  expScreenContent: document.getElementById('exp_screen_content'),
  expScreenClock: document.getElementById('exp_screen_clock'),
  clock: document.getElementById('clock'),
  dot: document.getElementById('dot'),
  postScreen: document.getElementById('post_screen'),
  postScreenTitle: document.getElementById('post_screen_title'),
  postScreenContent: document.getElementById('post_screen_content'),
  buttonPreviousElement: document.getElementById('a_previous'),
  buttonOKElement: document.getElementById('a_ok'),
  buttonNextElement: document.getElementById('a_next'),
  buttonAgreeElement: document.getElementById('a_agree'),
  buttonPrevious: document.getElementById('button_previous'),
  buttonOK: document.getElementById('button_ok'),
  buttonNext: document.getElementById('button_next'),
  buttonAgree: document.getElementById('button_agree'), //added this in I agree for consent
  captionPrevious: document.getElementById('caption_previous'),
  captionOK: document.getElementById('caption_ok'),
  captionNext: document.getElementById('caption_next'),
  captionAgree: document.getElementById('caption_agree'),
  //ID: document.getElementById('ID_text'), //added to save experiment ID
  checkbox: document.getElementById('myCheck'), //added for checkboxes
  //checkbox2: document.getElementById('myCheck2'), //added for checkboxes
  //checkbox3: document.getElementById('myCheck3'), //added for checkboxes
  ID: document.getElementById('the_id_of_the_input_field'), //added for ID
  //Properties
  experiment: null,
  audioContext: null,
  audioGetReadyElements: [],
  audioFeedbackBuffers: [],
  audioFeedbackBuffersData: [],
  audioFeedbackNodes: [],
  state: undefined,
  preScreensIndex: 0,
  phasesIndex: 0,
  trialsIndex: 0,
  postScreensIndex: 0,
  trialCurrentLap: 0,
  clockRadius: 225,
  //Methods
  initAudio: function () {
    try {
      this.audioContext = new AudioContext();
      this.audioGetReadyElements[0] = document.createElement('audio');
      //this.audioGetReadyElements[0].src = this.experiment.sounds.demo[0].file; // comment this to get rid of the Get Ready sound
      this.audioGetReadyElements[0].preload = 'auto';
      this.setAudioListeners(0);

      for (var i = 1; i <  this.experiment.sounds.getReady.length; i++) {
        this.audioGetReadyElements[i] = document.createElement('audio');
        this.audioGetReadyElements[i].src = this.experiment.sounds.getReady[i].file;
        this.audioGetReadyElements[i].preload = 'auto';
        this.setAudioListeners(i);
      }
    } catch (e) {
      this.preScreenContent.innerHTML = '<p><strong>ERROR:</strong> ' + this.experiment.messages.errorAudio + '</p><br/><p>' + this.experiment.messages.recommendBrowser + '</p>';
      this.showButtons(false, false, false, false);
    }
  },
  fisherYates: function (arr) {
    var i = arr.length,
        j,
        tempi,
        tempj;
    if (i == 0) return false;
    while (--i) {
      j = Math.floor(Math.random() * (i + 1));
      tempi = arr[i];
      tempj = arr[j];
      arr[i] = tempj;
      arr[j] = tempi;
    }
  },
  showButtons: function (p, o, n, m) { // previous = p, o = OK, n = next, m = agree
    var displayPrevious = p ? 'block' : 'none',
        displayOK = o ? 'block' : 'none',
        displayNext = n ? 'block' : 'none',
        displayAgree = m ? 'block' : 'none';
    this.buttonPrevious.style.display = displayPrevious;
    this.buttonOK.style.display = displayOK;
    this.buttonNext.style.display = displayNext;
    this.buttonAgree.style.display = displayAgree;
    if (o && !p && !m && !n) {
      //TODO: center buttonOK properly
      this.buttonOK.style.marginLeft = '48%';
    }
  },
  showPreScreen: function (i) {
    if (i >= 0 && i < 6 || (i >=7)) {
      this.showButtons(false, false, true, false); // show Next button for the first 5 pages and all pages after 6
    } else {
      this.showButtons(false, false, false, true); // show I agree button on page 6
    }
    this.preScreenTitle.innerHTML = this.experiment.preScreens[i].title;
    this.preScreenContent.innerHTML = this.experiment.preScreens[i].content;
  },
  showPasswordScreen: function () {
    this.showButtons(false, true, false, false);
    this.preScreenTitle.innerHTML = this.experiment.passwordScreen.title;
    this.preScreenContent.innerHTML = this.experiment.passwordScreen.content;
  },
  startPhase: function () {
    this.trialsIndex = 0;
    this.startTrial(true);
  },
  playDemo: function () {
    this.audioGetReadyElements[0].play();
  },
  playReady: function (i) {
    i = i || 1; 
    this.audioGetReadyElements[--i].play();
    this.state = this.STATE_TRIAL_RUNNING;
    this.startClock();
  },
  prepareFeedback: function (i) {
    var SAMPLE_RATE = 48000,
        PI_2 = Math.PI * 2,
        j = 0,
        samples = 0;
    i = i || 1;
    i--;
    samples = (this.experiment.sounds.feedback[i].duration / 1000) * SAMPLE_RATE;
    this.audioFeedbackBuffers[i] = this.audioContext.createBuffer(1, samples, SAMPLE_RATE);
    this.audioFeedbackBuffersData[i] = this.audioFeedbackBuffers[i].getChannelData(0);    
    for (j = 0; j < samples; j++) {
      this.audioFeedbackBuffersData[i][j] = Math.sin(this.experiment.sounds.feedback[i].pitch * PI_2 * j / SAMPLE_RATE);
    }
    this.audioFeedbackNodes[i] = this.audioContext.createBufferSource();
    this.audioFeedbackNodes[i].playbackRate.value = 1.0;
    this.audioFeedbackNodes[i].connect(this.audioContext.destination);
    this.audioFeedbackNodes[i].buffer = this.audioFeedbackBuffers[i];
  },
  playFeedback: function (i) {
    i = i || 1;
    i--;
    if (this.trialCurrentLap > 0 || this.experiment.phases[this.phasesIndex].trials[this.trialsIndex].firstlap || this.experiment.phases[this.phasesIndex].trials[this.trialsIndex].nopress) {
      if (this.experiment.phases[this.phasesIndex].trials[this.trialsIndex].tone) {
        if (!this.experiment.phases[this.phasesIndex].trials[this.trialsIndex].toneTime) { //when this is undefined, define it with the code below
          var delay = this.experiment.phases[this.phasesIndex].trials[this.trialsIndex].tone / 1000;
          this.audioFeedbackNodes[i].start(this.audioContext.currentTime + delay);
          this.experiment.phases[this.phasesIndex].trials[this.trialsIndex].toneTime = (this.audioContext.currentTime - this.experiment.phases[this.phasesIndex].trials[this.trialsIndex].startTrialAudioTime) * 1000 + this.experiment.phases[this.phasesIndex].trials[this.trialsIndex].tone;
        }
      } else {
        this.experiment.phases[this.phasesIndex].trials[this.trialsIndex].toneTime = 1;
      }
    }
  },
  storeKeypressTrialTime: function (t) {
    if (this.experiment.phases[this.phasesIndex].trials[this.trialsIndex].firstlap) {
      this.experiment.phases[this.phasesIndex].trials[this.trialsIndex].keypressTrialTimes.push(t - this.experiment.phases[this.phasesIndex].trials[this.trialsIndex].startTrialTime);
    } else {
      this.experiment.phases[this.phasesIndex].trials[this.trialsIndex].keypressTrialTimes.push(t - this.experiment.phases[this.phasesIndex].trials[this.trialsIndex].startTrialTime - this.experiment.phases[this.phasesIndex].trials[this.trialsIndex].cycle);
    }
  },
  storeStartTrialTimes: function (t) {
    this.experiment.phases[this.phasesIndex].trials[this.trialsIndex].startTrialTime = t;
    this.experiment.phases[this.phasesIndex].trials[this.trialsIndex].startTrialAudioTime = this.audioContext.currentTime;
  },
  storeEndTrialTimes: function (t, e) {
    this.experiment.phases[this.phasesIndex].trials[this.trialsIndex].endTrialTime = e;
    this.experiment.phases[this.phasesIndex].trials[this.trialsIndex].cycleTime = t;
  },
  keypressHandler: function(e) {
    var keyChar;
    if (!document.all) { //Not IE
      keyChar = e.which;
    } else { //IE
      keyChar = window.event.keyCode;
    }
    if (keyChar == self.labclock.experiment.responseKey.charCodeAt(0)) {
      self.labclock.playFeedback(self.labclock.experiment.phases[self.labclock.phasesIndex].trials[self.labclock.trialsIndex].feedback);
      self.labclock.storeKeypressTrialTime(e.timeStamp);
    }
  },
  animationStartHandler: function (e) {
    self.labclock.expScreenCaption.innerHTML = '';
    self.labclock.storeStartTrialTimes(e.timeStamp);
    if (self.labclock.experiment.phases[self.labclock.phasesIndex].trials[self.labclock.trialsIndex].nopress) {
      self.labclock.unsetKeyboardListener();
      self.labclock.playFeedback(self.labclock.experiment.phases[self.labclock.phasesIndex].trials[self.labclock.trialsIndex].feedback);
      self.labclock.storeKeypressTrialTime(0);
    } else {
      self.labclock.setKeyboardListener();
    }
  },
  animationIterationHandler: function (e) {
    self.labclock.trialCurrentLap++;
    if (self.labclock.experiment.phases[self.labclock.phasesIndex].trials[self.labclock.trialsIndex].stop && self.labclock.experiment.phases[self.labclock.phasesIndex].trials[self.labclock.trialsIndex].toneTime) {
      self.labclock.dot.style.webkitAnimation = 'none';
      self.labclock.dot.style.mozAnimation = 'none';
      self.labclock.dot.style.animation = 'none';
      self.labclock.unsetKeyboardListener();
      self.labclock.storeEndTrialTimes(e.elapsedTime, e.timeStamp);
      self.labclock.state = self.labclock.STATE_TRIAL_SELECTING;
      self.labclock.displayState();
    }
  },
  animationEndHandler: function (e) {
    self.labclock.dot.style.webkitAnimation = 'none';
    self.labclock.dot.style.mozAnimation = 'none';
    self.labclock.dot.style.animation = 'none';
    self.labclock.unsetKeyboardListener();
    self.labclock.storeEndTrialTimes(e.elapsedTime, e.timeStamp);
    self.labclock.state = self.labclock.STATE_TRIAL_SELECTING;
    self.labclock.displayState();
  },
  audioGetReadyEndHandler: function (e) {
    this.pause();
  },
  setKeyboardListener: function () {
    window.addEventListener('keypress', this.keypressHandler, false);
  },
  unsetKeyboardListener: function () {
    window.removeEventListener('keypress', this.keypressHandler, false);
  },
  setAudioListeners: function (i) {
    i = i || 0;
    this.audioGetReadyElements[i].addEventListener('ended', this.audioGetReadyEndHandler, false);
  },
  setButtonsListeners: function () {
    this.buttonPreviousElement.addEventListener('click', this.clickPrevious.bind(this), false);
    this.buttonOKElement.addEventListener('click', this.clickOK.bind(this), false);
    this.buttonNextElement.addEventListener('click', this.clickNext.bind(this), false);
    this.buttonAgreeElement.addEventListener('click', this.clickAgree.bind(this), false); 
  },
  setClockListeners: function () {
    this.dot.addEventListener('webkitAnimationStart', this.animationStartHandler, false);
    this.dot.addEventListener('animationstart', this.animationStartHandler, false);
    this.dot.addEventListener('webkitAnimationIteration', this.animationIterationHandler, false);
    this.dot.addEventListener('animationiteration', this.animationIterationHandler, false);
    this.dot.addEventListener('webkitAnimationEnd', this.animationEndHandler, false);
    this.dot.addEventListener('animationend', this.animationEndHandler, false);
  },
  setClock: function (d, c, s, l) {
    var delay = d / 1000;
    delay += 's';
    var duration = c / 1000;
    duration += 's';
    if (s) {
      this.dot.style.webkitAnimation = 'counterspin';
      this.dot.style.mozAnimation = 'counterspin';
      this.dot.style.animation = 'counterspin';
    } else {
      this.dot.style.webkitAnimation = 'spin';
      this.dot.style.mozAnimation = 'spin';
      this.dot.style.animation = 'spin';
    }
    if (l) {
      this.dot.style.webkitAnimationIterationCount = l;
      this.dot.style.mozAnimationIterationCount = l;
      this.dot.style.animationIterationCount = l;
    } else {
      this.dot.style.webkitAnimationIterationCount = 4;
      this.dot.style.mozAnimationIterationCount = 4;
      this.dot.style.animationIterationCount = 4;
    }

    this.dot.style.webkitAnimationTimingFunction = 'linear';
    this.dot.style.mozAnimationTimingFunction = 'linear';
    this.dot.style.animationTimingFunction = 'linear';
    this.dot.style.webkitAnimationPlayState = 'paused';
    this.dot.style.mozAnimationPlayState = 'paused';
    this.dot.style.animationPlayState = 'paused';
    this.dot.style.webkitAnimationDelay = delay;
    this.dot.style.mozAnimationDelay = delay;
    this.dot.style.animationDelay = delay;
    this.dot.style.webkitAnimationDuration = duration;
    this.dot.style.mozAnimationDuration = duration;
    this.dot.style.animationDuration = duration;
    this.dot.style.webkitTransform = 'rotate(0deg)';
    this.dot.style.mozTransform = 'rotate(0deg)';
    this.dot.style.transform = 'rotate(0deg)';
  },
  startClock: function () {
    this.dot.style.webkitAnimationPlayState = 'running';
    this.dot.style.mozAnimationPlayState = 'running';
    this.dot.style.animationPlayState = 'running';
  },
  startTrial: function (playSound) {
    var progress;
    if (this.trialsIndex < this.experiment.phases[this.phasesIndex].trials.length) {
      this.dot.style.display = 'block';
      this.prepareFeedback(this.experiment.phases[this.phasesIndex].trials[this.trialsIndex].feedback);
      this.trialCurrentLap = 0;
      this.experiment.phases[this.phasesIndex].trials[this.trialsIndex].keypressTrialTimes = [];
      this.experiment.phases[this.phasesIndex].trials[this.trialsIndex].delay = Math.floor(Math.random() * (this.experiment.randomDelayMax - this.experiment.randomDelayMin + 1) + this.experiment.randomDelayMin);
      //Random delay MUST be different to the previous one, otherwise CSS3 Animation won't reset
      if (this.trialsIndex > 0) {
        while (this.experiment.phases[this.phasesIndex].trials[this.trialsIndex].delay === this.experiment.phases[this.phasesIndex].trials[this.trialsIndex-1].delay) {
          this.experiment.phases[this.phasesIndex].trials[this.trialsIndex].delay = Math.floor(Math.random() * (this.experiment.randomDelayMax - this.experiment.randomDelayMin + 1) + this.experiment.randomDelayMin);
        }
      }
      this.setClock(this.experiment.phases[this.phasesIndex].trials[this.trialsIndex].delay, this.experiment.phases[this.phasesIndex].trials[this.trialsIndex].cycle, this.experiment.phases[this.phasesIndex].trials[this.trialsIndex].counterclockwise, this.experiment.phases[this.phasesIndex].trials[this.trialsIndex].laps);
      progress = this.trialsIndex * 800 / this.experiment.phases[this.phasesIndex].trials.length;
      this.expScreenProgress.style.width = progress + 'px';
      if (playSound) {
        this.state = this.STATE_TRIAL_READY;
      } else {
        this.state = this.STATE_TRIAL_RUNNING;
        this.startClock();
      }
    } else {
      this.state = this.STATE_PHASE_END; 
    }
    this.displayState();
  },
  setAngle: function (x1, y1, x2, y2) {
    var theta = Math.atan2(x2-x1, y2-y1),
        degree = (theta * (180 / Math.PI) * -1) - 180, //this takes the theta is radians and converts it to degrees
        d = Math.sqrt((x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1)); //the distance between the two points
    if (d < this.clockRadius) { //if the distance is less than the radius (?) and the degree value is negative then add 360
      if (degree < 0) {
        degree += 360; //might need to get rid of this
      }
      this.dot.style.webkitTransform = 'rotate('+degree+'deg)';
      this.dot.style.mozTransform = 'rotate('+degree+'deg)';
      this.dot.style.transform = 'rotate('+degree+'deg)';
      this.dot.style.display = 'block';
      this.experiment.phases[this.phasesIndex].trials[this.trialsIndex].angle = degree;
      if (this.experiment.phases[this.phasesIndex].trials[this.trialsIndex].counterclockwise) {
        this.experiment.phases[this.phasesIndex].trials[this.trialsIndex].guessTime = (360-degree) * this.experiment.phases[this.phasesIndex].trials[this.trialsIndex].cycle / 360;
      } else {
        this.experiment.phases[this.phasesIndex].trials[this.trialsIndex].guessTime = degree * this.experiment.phases[this.phasesIndex].trials[this.trialsIndex].cycle / 360;
      }
      this.enableOKWhenSelected();
    }
  },
  clickWhenSelectingHandler: function (e) {
    var obj = this,
        leftValue = 0,
        topValue = 0;
    while (obj) {
      leftValue += obj.offsetLeft;
      topValue += obj.offsetTop;
      obj = obj.offsetParent;
    }
    var centerX = leftValue + this.offsetWidth / 2,
        centerY = topValue + this.offsetHeight / 2;
    self.labclock.setAngle(centerX, centerY, e.clientX, e.clientY);
  },
  noKeyPress: function () {
      setTimeout(this.startNextTrialHandler, 10);
  }, 
  startNextTrialHandler: function (e) {
    self.labclock.trialsIndex++;
    self.labclock.startTrial(true);
  },
  setWhenSelectingListeners: function () {
    this.clock.addEventListener('click', this.clickWhenSelectingHandler, false);
  },
  unsetWhenSelectingListeners: function () {
    this.clock.removeEventListener('click', this.clickWhenSelectingHandler, false);
  },
  enableOKWhenSelected: function () {
    this.showButtons(false, true, false, false);
  },
  waitForToneToStartSelecting: function (t) {
    if (self.labclock.audioContext.currentTime < t ) {
      setTimeout(self.labclock.waitForToneToStartSelecting, 5, t);
    } else {
      self.labclock.startSelecting();
    }
  },
  startSelecting: function () {
    if (this.experiment.phases[this.phasesIndex].trials[this.trialsIndex].toneTime) {
      this.dot.style.webkitAnimationPlayState = 'paused';
      this.dot.style.mozAnimationPlayState = 'paused';
      this.dot.style.animationPlayState = 'paused';
      if (this.experiment.phases[this.phasesIndex].trials[this.trialsIndex].response === 'text') {
        this.expScreenCaption.innerHTML = this.experiment.messages.trialSelectingText; 
        this.expScreenTextboxValue.value = '';
        this.expScreenTextbox.style.display = 'block';
        this.showButtons(false, true, false);
      } else if (this.experiment.phases[this.phasesIndex].trials[this.trialsIndex].response === 'text2') {
        this.expScreenCaption.innerHTML = this.experiment.messages.trialSelectingText2;
        this.expScreenTextboxValue.value = '';
        this.expScreenTextbox.style.display = 'block';
        this.showButtons(false, true, false);
      } else if (this.experiment.phases[this.phasesIndex].trials[this.trialsIndex].response === 'text3') {
        this.expScreenCaption.innerHTML = this.experiment.messages.trialSelectingText3;
        this.expScreenTextboxValue.value = '';
        this.expScreenTextbox.style.display = 'block';
        this.showButtons(false, true, false);
      } else if (this.experiment.phases[this.phasesIndex].trials[this.trialsIndex].response === 'text4') {
        this.expScreenCaption.innerHTML = this.experiment.messages.trialSelectingText4;
        this.expScreenTextboxValue.value = '';
        this.expScreenTextbox.style.display = 'block';
        this.showButtons(false, true, false);
      } else if (this.experiment.phases[this.phasesIndex].trials[this.trialsIndex].response === 'text5') {
        this.expScreenCaption.innerHTML = this.experiment.messages.trialSelectingText5;
        this.expScreenTextboxValue.value = '';
        this.expScreenTextbox.style.display = 'block';
        this.showButtons(false, true, false);
      } else if (this.experiment.phases[this.phasesIndex].trials[this.trialsIndex].response === 'text6') {
        this.expScreenCaption.innerHTML = this.experiment.messages.trialSelectingText6;
        this.expScreenTextboxValue.value = '';
        this.expScreenTextbox.style.display = 'block';
        this.showButtons(false, true, false);
      } else if (this.experiment.phases[this.phasesIndex].trials[this.trialsIndex].response === 'outcome') {
        this.expScreenCaption.innerHTML = this.experiment.messages.trialSelectingOutcome;
        this.setWhenSelectingListeners();
      } else {
        this.expScreenCaption.innerHTML = this.experiment.messages.trialSelecting;
        this.setWhenSelectingListeners();
    }
   } else {
      this.dot.style.webkitAnimationPlayState = 'paused';
      this.dot.style.mozAnimationPlayState = 'paused';
      this.dot.style.animationPlayState = 'paused';
      this.noKeyPress();
    }
  },
  showPhaseScreen: function (i) {
    this.showButtons(false, true, false, false);
    this.expScreenTitle.innerHTML = this.experiment.phases[i].screen.title;
    this.expScreenContent.innerHTML = this.experiment.phases[i].screen.content;
    //this.expScreenTitle.innerHTML = this.experiment.phases[i].screen2.title;
   // this.expScreenContent.innerHTML = this.experiment.phases[i].screen2.content;
  },
  storeExperimentData: function () {
    var results = '',
        resultsEnd = '', //old code: resultsEnd = 'Full results;',
        xhr, storageItem;
    results += this.experiment.code + ';';
    results += this.userId + ';'; //store the prolific ID
    results += this.experiment.password + ';'; //saves the condition type password
    results += this.resolutionWidth + ';' + this.resolutioHeight + ';'; //saves the window dimensions in pixels
    results += this.headphone + ';'; //saves the response to the headphone question
    results += Date() + ';';
    storageItem = results;
    results += navigator.userAgent + ';';
    for (var p = 0, lp = this.experiment.phases.length; p < lp; p++) {
      //results += this.experiment.phases[p].description + ';';
      resultsEnd += this.experiment.phases[p].description + ';';
      for (var t = 0, lt = this.experiment.phases[p].trials.length; t < lt; t++) {
        //results += 'trial' + t + ';'; 
       // results += this.experiment.phases[p].trials[t].response + ';'; //trial type (action or outcome)
       // results += this.experiment.phases[p].trials[t].tone + ';'; // time of the delay between action and outcome
        //results += this.experiment.phases[p].trials[t].keypressTrialTimes + ';'; //list of all space bar key presses
        //results += this.experiment.phases[p].trials[t].toneTime + ';'; //delay startTrialAudioTimems of auditory stimulus for this trial
        //results += this.experiment.phases[p].trials[t].guessTime + ';'; //subjective timing of the events = degrees x cycle / 360.
        //results += this.experiment.phases[p].trials[t].angle + ';'; //stores the value in the textbox for attention checks
        resultsEnd += t + ';'; // old code: resultsEnd += 'trial' + t + ';';
        resultsEnd += this.experiment.phases[p].trials[t].delay + ';'; // initial delay (ITI)
        resultsEnd += this.experiment.phases[p].trials[t].cycle + ';'; //duration of the spinning dot cycle for this trial
        resultsEnd += this.experiment.phases[p].trials[t].cycleTime + ';'; //duration of the spinning dot cycle
        resultsEnd += this.experiment.phases[p].trials[t].response + ';'; //trial type (action or outcome)
        resultsEnd += this.experiment.phases[p].trials[t].tone + ';'; // congfigured delay?
        resultsEnd += this.experiment.phases[p].trials[t].keypressTrialTimes + ';'; //list of all space bar key presses
        resultsEnd += this.experiment.phases[p].trials[t].toneTime + ';'; //delay in ms of auditory stimulus for this trial
        resultsEnd += this.experiment.phases[p].trials[t].guessTime + ';'; //subjective timing of the events = degrees x cycle / 360.
        //resultsEnd += this.experiment.sounds.feedback[i].duration + ';'; //duration of the sound
        resultsEnd += this.experiment.phases[p].trials[t].angle + ';'; //stores the value in the textbox for attention checks
        resultsEnd += this.experiment.phases[p].trials[t].startTrialTime + ';'; //beginning of trial
        resultsEnd += this.experiment.phases[p].trials[t].endTrialTime + ';'; // end of trial
        resultsEnd += this.experiment.phases[p].trials[t].startTrialAudioTime + ';'; //timestamp of beginning of trial
      } //
    }
    results += resultsEnd;
		results += '\n';
		// send email
    if (this.experiment.postResultsURL) {
      xhr = new XMLHttpRequest();
      xhr.open('POST', this.experiment.postResultsURL, true); // true because handles the request asynchronously (this is preferred)
      xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded");
      xhr.onreadystatechange = function (e) {
        if (xhr.readyState === 4) {
           if (xhr.status === 200) {
             window.console.log('Sent!');
           } else {
             window.console.log('Error ' + xhr.status);
           }
        }
      };
      try {
        xhr.send('data=' + results);
      } catch (e) {
        alert(this.experiment.messages.errorAJAX);
      }
    } 
    if (this.experiment.generateCSV || !this.experiment.postResultsURL) {
      // Show CSV link in a new post-screen
      var screen = {
        title: this.experiment.messages.downloadTitle,
        content: '<p><a href="data:text/csv;base64,' + window.btoa(results) + '">' + this.experiment.messages.downloadData + '</a></p>'
      };
      this.experiment.postScreens.push(screen);
    }
    if (Modernizr.localstorage) {
      window.localStorage.setItem(storageItem, results);
    }
  },
  showPostScreen: function (i) {
    if (i > 0) {
      this.showButtons(true, false, true, false);
    } else {
      this.showButtons(false, false, true, false);
    }
    this.postScreenTitle.innerHTML = this.experiment.postScreens[i].title;
    this.postScreenContent.innerHTML = this.experiment.postScreens[i].content;
  },
  nextPhase: function () {
    this.phasesIndex++;
    if (this.phasesIndex < this.experiment.phases.length) {
      this.state = this.STATE_PHASE_START;
    } else {
      this.storeExperimentData();
      this.state = this.STATE_POST;
    }
    this.displayState();
  },
  clickPrevious: function () {
    switch (this.state) {
      case this.STATE_PRE:
        this.preScreensIndex = (this.preScreensIndex > 0) ? this.preScreensIndex - 1 : 0;
        this.showPreScreen(this.preScreensIndex);
        break;
      case this.STATE_POST:
        this.postScreensIndex = (this.postScreensIndex > 0) ? this.postScreensIndex - 1 : 0;
        this.showPostScreen(this.postScreensIndex);
        break;
    }
  },
  clickOK: function () {
		if (this.checkCheckBoxes() == false) {
			alert('Please check all of the checkboxes!');
			return;
		}
    switch (this.state) {
      case this.STATE_PASSWORD:
        var c = document.getElementById('pre_password_text').value;
        if (c === this.experiment.password) {
          this.state = this.STATE_PHASE_START;
          this.displayState();
        } else  {
          window.alert(this.experiment.messages.wrongPassword);
        }
        break;
      case this.STATE_TRIAL_SELECTING:
        var ok = true;
        if (this.experiment.phases[this.phasesIndex].trials[this.trialsIndex].response == 'text') { // || 'text2' || 'text3' || 'text4' || 'text5' || 'text6' || 'text3' || 'text4' || 'text5' || 'text6') {
          // angle stores the value of the textbox, not the corresponding angle when using response: 'textX'
          this.experiment.phases[this.phasesIndex].trials[this.trialsIndex].angle = this.expScreenTextboxValue.value;
          // guessTime stores the estimation in ms considering the cycle time
          if (isNaN(parseFloat(this.expScreenTextboxValue.value))) {
            this.experiment.phases[this.phasesIndex].trials[this.trialsIndex].guessTime = 0;
            ok = false;
          } else {
            this.experiment.phases[this.phasesIndex].trials[this.trialsIndex].guessTime = this.expScreenTextboxValue.value * this.experiment.phases[this.phasesIndex].trials[this.trialsIndex].cycle / 60;
            this.expScreenTextbox.style.display = 'none';
            ok = true;
          }
      } else if (this.experiment.phases[this.phasesIndex].trials[this.trialsIndex].response == 'text2') { 
        // angle stores the value of the textbox, not the corresponding angle when using response: 'textX'
        this.experiment.phases[this.phasesIndex].trials[this.trialsIndex].angle = this.expScreenTextboxValue.value;
        // guessTime stores the estimation in ms considering the cycle time
        if (isNaN(parseFloat(this.expScreenTextboxValue.value))) {
          this.experiment.phases[this.phasesIndex].trials[this.trialsIndex].guessTime = 0;
          ok = false;
        } else {
          this.experiment.phases[this.phasesIndex].trials[this.trialsIndex].guessTime = this.expScreenTextboxValue.value * this.experiment.phases[this.phasesIndex].trials[this.trialsIndex].cycle / 60;
          this.expScreenTextbox.style.display = 'none';
          ok = true;
        }
      } else if (this.experiment.phases[this.phasesIndex].trials[this.trialsIndex].response == 'text3') { 
        // angle stores the value of the textbox, not the corresponding angle when using response: 'textX'
        this.experiment.phases[this.phasesIndex].trials[this.trialsIndex].angle = this.expScreenTextboxValue.value;
        // guessTime stores the estimation in ms considering the cycle time
        if (isNaN(parseFloat(this.expScreenTextboxValue.value))) {
          this.experiment.phases[this.phasesIndex].trials[this.trialsIndex].guessTime = 0;
          ok = false;
        } else {
          this.experiment.phases[this.phasesIndex].trials[this.trialsIndex].guessTime = this.expScreenTextboxValue.value * this.experiment.phases[this.phasesIndex].trials[this.trialsIndex].cycle / 60;
          this.expScreenTextbox.style.display = 'none';
          ok = true;
        }
      } else if (this.experiment.phases[this.phasesIndex].trials[this.trialsIndex].response == 'text4') { 
        // angle stores the value of the textbox, not the corresponding angle when using response: 'textX'
        this.experiment.phases[this.phasesIndex].trials[this.trialsIndex].angle = this.expScreenTextboxValue.value;
        // guessTime stores the estimation in ms considering the cycle time
        if (isNaN(parseFloat(this.expScreenTextboxValue.value))) {
          this.experiment.phases[this.phasesIndex].trials[this.trialsIndex].guessTime = 0;
          ok = false;
        } else {
          this.experiment.phases[this.phasesIndex].trials[this.trialsIndex].guessTime = this.expScreenTextboxValue.value * this.experiment.phases[this.phasesIndex].trials[this.trialsIndex].cycle / 60;
          this.expScreenTextbox.style.display = 'none';
          ok = true;
        }
      } else if (this.experiment.phases[this.phasesIndex].trials[this.trialsIndex].response == 'text5') { 
        // angle stores the value of the textbox, not the corresponding angle when using response: 'textX'
        this.experiment.phases[this.phasesIndex].trials[this.trialsIndex].angle = this.expScreenTextboxValue.value;
        // guessTime stores the estimation in ms considering the cycle time
        if (isNaN(parseFloat(this.expScreenTextboxValue.value))) {
          this.experiment.phases[this.phasesIndex].trials[this.trialsIndex].guessTime = 0;
          ok = false;
        } else {
          this.experiment.phases[this.phasesIndex].trials[this.trialsIndex].guessTime = this.expScreenTextboxValue.value * this.experiment.phases[this.phasesIndex].trials[this.trialsIndex].cycle / 60;
          this.expScreenTextbox.style.display = 'none';
          ok = true;
        }
      } else if (this.experiment.phases[this.phasesIndex].trials[this.trialsIndex].response == 'text6') { 
        // angle stores the value of the textbox, not the corresponding angle when using response: 'textX'
        this.experiment.phases[this.phasesIndex].trials[this.trialsIndex].angle = this.expScreenTextboxValue.value;
          // guessTime stores the estimation in ms considering the cycle time
          if (isNaN(parseFloat(this.expScreenTextboxValue.value))) {
            this.experiment.phases[this.phasesIndex].trials[this.trialsIndex].guessTime = 0;
            ok = false;
          } else {
            this.experiment.phases[this.phasesIndex].trials[this.trialsIndex].guessTime = this.expScreenTextboxValue.value * this.experiment.phases[this.phasesIndex].trials[this.trialsIndex].cycle / 60;
            this.expScreenTextbox.style.display = 'none';
            ok = true;
          }
        } else {
          this.unsetWhenSelectingListeners();
        }
        if (ok) {
          this.trialsIndex++;
          this.startTrial(true);
        }
        break;
      case this.STATE_PHASE_END:
        this.nextPhase();
        break;
    }
  },  
	checkCheckBoxes: function () {
		var inputs = document.getElementsByTagName('input');
		var allChecked = true;
		for (var i = 0, l = inputs.length; i < l; ++i) {
			if (inputs[i].type == "checkbox" && !inputs[i].checked) {
				allChecked = false;
			}
		}
		return allChecked;
	},
  clickNext: function () {
    switch (this.state) {
      case this.STATE_PRE:
        // Check to see if we're moving away from the screen with 
        // the ID input, and if so, store that for later reference
        if (this.preScreensIndex === 1) {
          this.userId = document.getElementById('the_id_of_the_input_field').value;
					if (this.userId == "") {
						alert('Please input a user id!');
						break;
					}
        }
        // Check to see if we're moving away from the screen with 
        // the headphone input, and if so, store that for later reference
        if (this.preScreensIndex === 7) {
          this.headphone = document.getElementById('the_id_of_the_input_field').value;
					if (this.headphone == "") {
						alert('Please respond YES or NO!');
						break;
          }
        }
				else if (this.checkCheckBoxes() == false) {
					alert('Please check all of the checkboxes!');
					break;
				}
        this.preScreensIndex++;
        if (this.preScreensIndex < this.experiment.preScreens.length) {
          this.showPreScreen(this.preScreensIndex);
        } else {
          this.state = this.STATE_PASSWORD;
          this.displayState();
        }
        break;
      case this.STATE_POST:
        // Check to see if we're moving away from the screen with 
        // the headphone input, and if so, store that for later reference
        //if (this.postScreensIndex === 0) {
          //this.headphone = document.getElementById('the_id_of_the_input_field').value;
					//if (this.headphone == "") {
					//	alert('Please respond YES or NO!');
					//	break;
         // }
       // }
        this.postScreensIndex++;
        if (this.postScreensIndex < this.experiment.postScreens.length) {
          this.showPostScreen(this.postScreensIndex);
        } else {
          //THE END...
          alert(this.experiment.messages.end);
        }
        break;
    }
  },                  
  clickAgree: function () {
    switch (this.state) {
      case this.STATE_PRE:
				if (this.checkCheckBoxes() == false) {
					alert('Please check all of the checkboxes!');
					break;
				}
        this.preScreensIndex++;
        if (this.preScreensIndex < this.experiment.preScreens.length) {
          this.showPreScreen(this.preScreensIndex);
        } else {
          this.state = this.STATE_PASSWORD;
          this.displayState();
        }
        break;
      case this.STATE_POST:
        this.postScreensIndex++;
        if (this.postScreensIndex < this.experiment.postScreens.length) {
          this.showPostScreen(this.postScreensIndex);
        } else {
          //THE END...
          alert(this.experiment.messages.end);
        }
        break;
    }
  },         
  displayState: function () {
    switch (this.state) {
      case this.STATE_PRE:
        this.captionPrevious.innerHTML = this.experiment.messages.commandPrevious;
        this.captionOK.innerHTML = this.experiment.messages.commandOK;
        this.captionNext.innerHTML = this.experiment.messages.commandNext;
        this.captionAgree.innerHTML = this.experiment.messages.commandAgree;
        this.preScreen.style.display = 'block';
        this.showPreScreen(this.preScreensIndex);
        break;
      case this.STATE_PASSWORD:
        this.showPasswordScreen();
        break;
      case this.STATE_PHASE_START:
        this.preScreen.style.display = 'none';
        this.expScreen.style.display = 'block';
        this.expScreenContent.style.display = 'none';
        this.expScreenTextbox.style.display = 'none';
        this.expScreenTitle.innerHTML = '';
        this.expScreenClock.style.display = 'block';
        this.showButtons(false, false, false, false);
        if(this.experiment.phases[this.phasesIndex].progress) {
          this.expScreenProgress.style.display = 'block';
        } else {
          this.expScreenProgress.style.display = 'none';
        }
        if(this.experiment.phases[this.phasesIndex].scramble) {
          this.fisherYates(this.experiment.phases[this.phasesIndex].trials);
        }
        this.startPhase();
        break;
      case this.STATE_TRIAL_READY:
        this.showButtons(false, false, false, false);
        if (this.experiment.phases[this.phasesIndex].trials[this.trialsIndex].trialReady) {
          this.expScreenCaption.innerHTML = this.experiment.phases[this.phasesIndex].trials[this.trialsIndex].trialReady;
        } else {
          this.expScreenCaption.innerHTML = this.experiment.messages.trialReady;
        }
        if (this.experiment.phases[this.phasesIndex].trials[this.trialsIndex].style) {
          for (var attr in this.experiment.phases[this.phasesIndex].trials[this.trialsIndex].style) {
            this.body.style[attr] = this.experiment.phases[this.phasesIndex].trials[this.trialsIndex].style[attr];
          }
        } else {
          this.body.style = this.bodyStyle;
        }
        this.playReady(this.experiment.phases[this.phasesIndex].trials[this.trialsIndex].getReady);
        break;
      case this.STATE_TRIAL_SELECTING:
        this.dot.style.display = 'none';
        this.body.style = this.bodyStyle;
        //Do not start selecting until feedback tone ends
        if (this.audioContext.currentTime < this.experiment.phases[this.phasesIndex].trials[this.trialsIndex].startTrialAudioTime + (this.experiment.phases[this.phasesIndex].trials[this.trialsIndex].toneTime + this.experiment.sounds.feedback.duration) / 1000) {
          setTimeout(this.waitForToneToStartSelecting, 5, this.experiment.phases[this.phasesIndex].trials[this.trialsIndex].startTrialAudioTime + (this.experiment.phases[this.phasesIndex].trials[this.trialsIndex].toneTime + this.experiment.sounds.feedback.duration) / 1000);
        } else {
          this.startSelecting();
        }
        break;
      case this.STATE_PHASE_END:
        this.expScreenContent.style.display = 'block';
        this.expScreenClock.style.display = 'none';
        this.expScreenCaption.innerHTML = '';
        this.expScreenProgress.style.display = 'none';
        if (this.experiment.phases[this.phasesIndex].screen) {
          this.showPhaseScreen(this.phasesIndex);
        } else {
          this.nextPhase();
        }
        break;
      case this.STATE_POST:
        this.expScreen.style.display = 'none';
        this.postScreen.style.display = 'block';
        this.showPostScreen(this.postScreensIndex);
        break;
    }
  },
  sanityChecks: function () {
    var cssanimations = false,
        audio = false,
        resolution = false,
        errorHTML = '<p><strong>ERROR:</strong> ';
    if (!Modernizr.csstransforms || !Modernizr.cssanimations) {
      cssanimations = true;
      errorHTML += this.experiment.messages.errorCSSAnimations + '</p><br/>';
      errorHTML += '<p>' + this.experiment.messages.recommendBrowser + '</p>';
    }
    if (!Modernizr.audio || !Modernizr.audio.wav) {
      audio = true;
      errorHTML += this.experiment.messages.errorAudio + '</p><br/>';
      errorHTML += '<p>' + this.experiment.messages.recommendBrowser + '</p>';
    }
		this.resolutionWidth = document.documentElement.clientWidth;
		this.resolutioHeight = document.documentElement.clientHeight;
    if ((document.documentElement.clientWidth < 850) || (document.documentElement.clientHeight < 700)) {
      resolution = true;
      errorHTML += this.experiment.messages.errorResolution + '</p>';
    }
    if (cssanimations || audio || resolution) {
      this.preScreenContent.innerHTML = errorHTML;
      this.showButtons(false, false, false, false);
      return false;
    }
    return true;
  },
  selectExperiment: function (r) {
    var wrong = true,
        selected,
        options = [];
    for (var property in window.experiment) {
      options.push(property);
    }
    if (r) {
      //Random selection
      selected = Math.floor(Math.random() * options.length);
      this.experiment = window.experiment[options[selected]];
    } else {
      //Prompt
      selected = window.prompt(options + '?');
      upperSelected = selected.toUpperCase();
      wrong = options.indexOf(selected) === -1 && options.indexOf(upperSelected) === -1;
      while (wrong) {
        selected = window.prompt(options + '?');
        upperSelected = selected.toUpperCase();
        wrong = options.indexOf(selected) === -1 && options.indexOf(upperSelected) === -1;
      }
      if (options.indexOf(selected) === -1) {
        this.experiment = window.experiment[upperSelected];
      } else {
        this.experiment = window.experiment[selected];
      }
    }
  },
  start: function () {
    this.setButtonsListeners();
    this.selectExperiment(false); //set it to false to select the group manually
    this.state = this.STATE_PRE;
    this.displayState();
    if(this.sanityChecks()) {
      this.initAudio();
      this.setClockListeners();
    }
  }
};
