import {keyboardKeys, engKeys, engKeysUpperCase, engKeysShift, rusKeys, rusKeysUpperCase, rusKeysShift, specialKeys, specialKeysWidth} from './keyboards.js';

window.onload = function() {
  const textarea = '<div class="textarea"><textarea name="name" rows="8" cols="80" readonly></textarea></div>';
  const keyboard = '<div id="keyboard"></div>';
  const languageP = '<p class="language">Eng</p>';
  const keyCombinationFirstEl = ["ShiftLeft", "ControlLeft", "MetaLeft", "AltLeft"];
  const keyCombinationSecondEl = ["ShiftRight", "ControlRight", "MetaRight", "AltRight"];
  const specialKeysFunctionAdd = (element, eventCode) => {
    if (keyCombinationFirstEl.includes(eventCode)) {
      element[0].classList.add('keypress');
    } else if (keyCombinationSecondEl.includes(eventCode)) {
      element[1].classList.add('keypress');
    }
  }
  const specialKeysFunctionRemove = (element, eventCode) => {
    if (keyCombinationFirstEl.includes(eventCode)) {
      element[0].classList.remove('keypress');
    } else if (keyCombinationSecondEl.includes(eventCode)) {
      element[1].classList.remove('keypress');
    }
  }
  let isEng = Number(localStorage.getItem('isEng'));
  const body = document.querySelector('body');
  let output = '';
  body.insertAdjacentHTML('afterbegin', keyboard);
  body.insertAdjacentHTML('afterbegin', languageP);
  body.insertAdjacentHTML('afterbegin', textarea);
  const languageHtml = document.querySelector('.language');
  let initKeyboad = () => {
    const langKeys = isEng === 1 ? engKeys : rusKeys;
    languageHtml.innerText = isEng === 1 ? 'Eng' : 'Rus';
    let i = 0;
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
  let leftAlt;
  let capsLock;
  const keys = document.querySelectorAll('#keyboard div');
  const keysContent = (langKeys) => {
    let i = 0;
    keys.forEach((el) => {
      el.innerText = langKeys[i];
      i++;
    });
  }
  const keydown = (event) => {
    if (event.code === 'ShiftLeft') {
      leftShift = true;
    } else if (event.code === 'AltLeft') {
      leftAlt = true;
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
    if (event.keyCode === 16) { //16 is keyCode of Shift
      const langKeys = isEng === 1 ? engKeysShift : rusKeysShift;
      keysContent(langKeys);
    }
  }

  document.addEventListener('keydown', (event) => {
    keydown(event);
  });
  document.addEventListener('mousedown', (e) => {
    const element = e.target;
    if (element.parentNode != document.getElementById('keyboard')) return;
    element.classList.add('keypress');
  });
  document.addEventListener('mouseup', (e) => {
    const element = e.target;
    if (element.parentNode != document.getElementById('keyboard')) return;
    element.classList.remove('keypress');
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
      case 'Win':
        return;
      case 'Alt':
        return;
      case 'Shift':
        return;
      case 'Ctrl':
        return;
      default:
      output += element.innerText;
    }
    document.querySelector('textarea').value = output;
    const keyCode = event.target.getAttribute('data');
    if (keyCode === 20) { //Caps Lock
      capsLock = !capsLock;
      let langKeys = isEng === 1 ? engKeysUpperCase : rusKeysUpperCase;
      if (capsLock) {
        element.classList.add('keypress');
        keysContent(langKeys);
      } else {
        langKeys = isEng === 1 ? engKeys : rusKeys;
        element.classList.remove('keypress');
        keysContent(langKeys);
      }
    }
  });
  document.addEventListener('keyup', (event) => {
    if (event.code === 'ShiftLeft') {
      leftShift = false;
      if (leftAlt) {
        isEng = Number(!isEng);
        languageHtml.innerText = isEng === 1 ? 'Eng' : 'Rus';
        const langKeys = isEng === 1 ? engKeys : rusKeys;
        keysContent(langKeys);
      }
    } else if (event.code === 'AltLeft') {
      leftAlt = false;
      if (leftShift) {
        isEng = Number(!isEng);
        languageHtml.innerText = isEng === 1 ? 'Eng' : 'Rus';
        const langKeys = isEng === 1 ? engKeys : rusKeys;
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
    if (event.keyCode === 20) { //20 is keyCode of Caps Lock
      let langKeys = isEng === 1 ? engKeysUpperCase : rusKeysUpperCase;
      capsLock = event.getModifierState && event.getModifierState('CapsLock');
      if (capsLock) {
        element.classList.add('keypress');
        keysContent(langKeys);
      } else {
        langKeys = isEng === 1 ? engKeys : rusKeys;
        element.classList.remove('keypress');
        keysContent(langKeys);
      }
    } else if (event.keyCode === 16) { //16 is keyCode of Shift
          const langKeys = isEng === 1 ? engKeys : rusKeys;
          keysContent(langKeys);
        }
  });
  window.addEventListener('beforeunload', () => {
    localStorage.setItem('isEng', isEng);
  });
}
