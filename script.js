window.onload = function() {
  const textarea = '<div class="textarea"><textarea name="name" rows="8" cols="80" readonly></textarea></div>';
  const keyboard = '<div id="keyboard"></div>';
  const languageP = '<p class="language">Eng</p>';
  const keyCombinationFistEl = ["ShiftLeft", "ControlLeft", "MetaLeft", "AltLeft"];
  const keyCombinationSecondEl = ["ShiftRight", "ControlRight", "MetaRight", "AltRight"];
  function specialKeysFunctionAdd(element, eventCode) {
    if (keyCombinationFistEl.includes(eventCode)) {
      element[0].classList.add('keypress');
    } else if (keyCombinationSecondEl.includes(eventCode)) {
      element[1].classList.add('keypress');
    }
  }
  function specialKeysFunctionRemove(element, eventCode) {
    if (keyCombinationFistEl.includes(eventCode)) {
      element[0].classList.remove('keypress');
    } else if (keyCombinationSecondEl.includes(eventCode)) {
      element[1].classList.remove('keypress');
    }
  }
  let isEng = localStorage.getItem('isEng');
  const body = document.querySelector('body');
  let output = '';
  body.insertAdjacentHTML('afterbegin', keyboard);
  body.insertAdjacentHTML('afterbegin', languageP);
  body.insertAdjacentHTML('afterbegin', textarea);
  const languageHtml = document.querySelector('.language');
  let initKeyboad = () => {
    let langKeys;
    isEng === '1' ? langKeys = engKeys : langKeys = rusKeys;
    isEng === '1' ? languageHtml.innerText = 'Eng' : languageHtml.innerText = 'Rus';
    let i= 0;
    let keyValue = '';
    keyboardKeys.forEach((el) => {
      keyValue += `<div class="key-def" data=` + el + `>${langKeys[i]}</div>`;
      i++;
    });
    document.getElementById('keyboard').innerHTML = keyValue;
  }
  initKeyboad();
  let i = 0;
  specialKeys.forEach((el) => {
    const element = document.querySelectorAll('div[data="' + `${el}` + '"]');
    element.forEach((e) => {
      e.classList.add('special-key');
      e.style.width = specialKeysWidth[i] + 'px';
      i++;
    });
  });
  let leftShift;
  let capsLock;
  const keys = document.querySelectorAll('#keyboard div');
  function keysContent(langKeys) {
    let i = 0;
    keys.forEach((el) => {
      el.innerText = langKeys[i];
      i++;
    });
  }
  function keydown(event) {
    if (event.code === 'ShiftLeft') {
      leftShift = true;
    }
    let element = document.querySelectorAll('div[data="' + `${event.keyCode}` + '"]');
    if (element.length === 1) {
      element = element[0];
      element.classList.add('keypress');
      switch (element.innerText) {
        case 'Backspace':
          output = output.substr(0, output.length-1);
          break;
        case 'Enter':
          output += '\n';
          break;
        case '':
          output += ' ';
          break;
        case 'Tab':
          output += '\t';
          break;
        case 'Caps Lock':
          output += '';
          break;
        default:
        output += element.innerText;
      }
      document.querySelector('textarea').value = output;
    } else {
      specialKeysFunctionAdd(element, event.code);
    }
    if (event.keyCode === 16) { //Shift
      let langKeys = isEng === '1' ? engKeysShift : rusKeysShift;
      keysContent(langKeys);
    }
  }

  document.addEventListener('keydown', (event) => {
    keydown(event);
  });
  document.getElementById('keyboard').childNodes.forEach((e) => {
    e.addEventListener('mousedown', (event) => {
      let element = document.querySelectorAll('div[data="' + `${event.target.getAttribute('data')}` + '"]');
      if (element.length === 1) {
        element = element[0];
        element.classList.add('keypress');
      } else {
        element = event.target;
        element.classList.add('keypress');
      }
    });
  })
  document.getElementById('keyboard').childNodes.forEach((e) => {
    e.addEventListener('mouseup', (event) => {
     let element = document.querySelectorAll('div[data="' + `${event.target.getAttribute('data')}` + '"]');
     if (element.length === 1) {
       element = element[0];
       element.classList.remove('keypress');
       if (element.innerText === 'Backspace') {
         output = output.substr(0, output.length-1);
       } else if (element.innerText === 'Enter') {
         output += '\n';
       } else if (element.innerText === '') {
         output += ' ';
       } else if (element.innerText === 'Tab') {
         output += '   ';
       } else if (element.innerText === 'Caps Lock') {
         output += '';
       } else {
         output += element.innerText;
       }
       document.querySelector('textarea').value = output;
     } else {
       element = event.target;
       element.classList.remove('keypress');
     }
     let keyCode = event.target.getAttribute('data');
     if (keyCode === 20) { //Caps Lock
       capsLock = !capsLock;
       let langKeys = isEng === 1 ? engKeysUpperCase : rusKeysUpperCase;

       if (capsLock) {
         element.classList.add('keypress');
         keysContent(langKeys);
       } else {
         langKeys = isEng === '1' ? engKeys : rusKeys;
         element.classList.remove('keypress');
         keysContent(langKeys);
       }
     }
   });
  });

  document.addEventListener('keyup', function(event) {
    if (event.code === 'ShiftLeft') {
      leftShift = false;
    }
    else if (event.code === 'AltLeft') {
      if (leftShift) {
        isEng = isEng === '1' ? '0' : '1';
        languageHtml.innerText = isEng === '1' ? 'Eng' : 'Rus';
        let langKeys;
        isEng === '1' ? langKeys = engKeys : langKeys = rusKeys;
        keysContent(langKeys);
      }
    }
    let element = document.querySelectorAll('div[data="' + `${event.keyCode}` + '"]');
    if (element.length === 1) {
      element = element[0];
      element.classList.remove('keypress');
    } else {
      specialKeysFunctionRemove(element, event.code);
    }
    if (event.keyCode === 20) { //Caps Lock
      let langKeys = isEng === '1' ? engKeysUpperCase : rusKeysUpperCase;
      capsLock = event.getModifierState && event.getModifierState('CapsLock');
      if (capsLock) {
        element.classList.add('keypress');
        keysContent(langKeys);
      } else {
        langKeys = isEng === '1' ? engKeys : rusKeys;
        element.classList.remove('keypress');
        keysContent(langKeys);
      }
    } else if (event.keyCode === 16) { //Shift
          let langKeys = isEng === '1' ? engKeys : rusKeys;
          keysContent(langKeys);
        }
  });
  window.addEventListener('beforeunload', () => {
    localStorage.setItem('isEng', isEng);
  });
}
