window.onload = function() {
  const textarea = '<div class="textarea"><textarea name="name" rows="8" cols="80" readonly></textarea></div>';
  const keyboard = '<div id="keyboard"></div>';
  const languageP = '<p class="language">Eng</p>';
  let isEng = localStorage.getItem('isEng');
  const body = document.querySelector('body');
  let output = '';

  body.insertAdjacentHTML('afterbegin', keyboard);
  body.insertAdjacentHTML('afterbegin', languageP);
  body.insertAdjacentHTML('afterbegin', textarea);
  const keyboardKeys = [192, 49, 50, 51, 52, 53, 54, 55, 56, 57, 48, 189, 187, 8,
                       9, 81, 87, 69, 82, 84, 89, 85, 73, 79, 80, 219, 221, 220,
                       20, 65, 83, 68, 70, 71, 72, 74, 75, 76, 186, 222, 13,
                       16, 90, 88, 67, 86, 66, 78, 77, 188, 190, 191, 38, 16,
                       17, 91, 18, 32, 18, 91, 17, 37, 40, 39];

  const engKeys = ['`', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'Backspace',
                    'Tab', 'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '[', ']', '\\',
                    'Caps Lock', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';', "'", 'Enter',
                    'Shift', 'z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '/', '↑', 'Shift',
                    'Ctrl', 'Win', 'Alt', '', 'Alt', 'Win', 'Ctrl', '←', '↓', '→'];

  const engKeysUpperCase = ['`', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'Backspace',
                    'Tab', 'Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P', '[', ']', '\\',
                    'Caps Lock', 'A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', ';', "'", 'Enter',
                    'Shift', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', ',', '.', '/', '↑', 'Shift',
                    'Ctrl', 'Win', 'Alt', '', 'Alt', 'Win', 'Ctrl', '←', '↓', '→'];

  const engKeysShift = ['~', '!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '_', '+', 'Backspace',
                  'Tab', 'Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P', '{', '}', '|',
                  'Caps Lock', 'A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', ':', '"', 'Enter',
                  'Shift', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', '<', '>', '?', '↑', 'Shift',
                  'Ctrl', 'Win', 'Alt', '', 'Alt', 'Win', 'Ctrl', '←', '↓', '→'];
  const rusKeys = ['ё', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'Backspace',
                    'Tab', 'й', 'ц', 'у', 'к', 'е', 'н', 'г', 'ш', 'щ', 'з', 'х', 'ъ', '\\',
                    'Caps Lock', 'ф', 'ы', 'в', 'а', 'п', 'р', 'о', 'л', 'д', 'ж', "э", 'Enter',
                    'Shift', 'я', 'ч', 'с', 'м', 'и', 'т', 'ь', 'б', 'ю', '.', '↑', 'Shift',
                    'Ctrl', 'Win', 'Alt', '', 'Alt', 'Win', 'Ctrl', '←', '↓', '→'];
  const rusKeysUpperCase = ['Ё', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'Backspace',
                    'Tab', 'Й', 'Ц', 'У', 'К', 'Е', 'Н', 'Г', 'Ш', 'Щ', 'З', 'Х', 'Ъ', '\\',
                    'Caps Lock', 'Ф', 'Ы', 'В', 'А', 'П', 'Р', 'О', 'Л', 'Д', 'Ж', "Э", 'Enter',
                    'Shift', 'Я', 'Ч', 'С', 'М', 'И', 'Т', 'Ь', 'Б', 'Ю', '.', '↑', 'Shift',
                    'Ctrl', 'Win', 'Alt', '', 'Alt', 'Win', 'Ctrl', '←', '↓', '→'];
  const rusKeysShift = ['Ё', '!', '"', '№', ';', '%', ':', '?', '*', '(', ')', '_', '+', 'Backspace',
                    'Tab', 'Й', 'Ц', 'У', 'К', 'Е', 'Н', 'Г', 'Ш', 'Щ', 'З', 'Х', 'Ъ', '/',
                    'Caps Lock', 'Ф', 'Ы', 'В', 'А', 'П', 'Р', 'О', 'Л', 'Д', 'Ж', "Э", 'Enter',
                    'Shift', 'Я', 'Ч', 'С', 'М', 'И', 'Т', 'Ь', 'Б', 'Ю', ',', '↑', 'Shift',
                    'Ctrl', 'Win', 'Alt', '', 'Alt', 'Win', 'Ctrl', '←', '↓', '→'];

  let initKeyboad = () => {
    let langKeys;
    isEng == 1 ? langKeys = engKeys : langKeys = rusKeys;
    let l = document.querySelector('.language');
    isEng == 1 ? l.innerText = 'Eng' : l.innerText = 'Rus';
    let i= 0;
    let out = '';
    keyboardKeys.forEach((el) => {
      out += `<div class="key-def" data=` + el + `>${langKeys[i]}</div>`;
      i++;
    });
    document.getElementById('keyboard').innerHTML = out;
  }
  initKeyboad();

  const specialKeys = [8, 9, 20, 13, 16, 17, 18, 32];
  const specialKeysWidth = [100, 100, 100, 115, 107.5, 107.5, 75, 75, 75, 75, 140];
  let i = 0;
  specialKeys.forEach((el) => {
    const element = document.querySelectorAll('div[data="' + `${el}` + '"]');
    element.forEach((e) => {
      e.classList.add('special-key');
      e.style.width = specialKeysWidth[i] + 'px';
      i++;
    });
  });


  //Смена языка
  let leftShift;
  let caps;

  //Избавляюсь от предупреждений eslint

  function keydown(event) {
    if (event.code == 'ShiftLeft') leftShift = true;
    let element = document.querySelectorAll('div[data="' + `${event.keyCode}` + '"]');
    if (element.length == 1) {
      element = element[0];
      element.classList.add('keypress');
      if (element.innerText == 'Backspace') {
        output = output.substr(0, output.length-1);
      } else if (element.innerText == 'Enter') {
        output += '\n';
      } else if (element.innerText == '') {
        output += ' ';
      } else if (element.innerText == 'Tab') {
        output += '   ';
      } else if (element.innerText == 'Caps Lock') {
        output += '';
      } else {
        output += element.innerText;
      }
      document.querySelector('textarea').value = output;
    } else {
      if (event.code == "ShiftLeft") element[0].classList.add('keypress');
      else if (event.code == "ShiftRight") element[1].classList.add('keypress');
      else if (event.code == "ControlLeft") element[0].classList.add('keypress');
      else if (event.code == "ControlRight") element[1].classList.add('keypress');
      else if (event.code == "MetaLeft") element[0].classList.add('keypress');
      else if (event.code == "MetaRight") element[1].classList.add('keypress');
      else if (event.code == "AltLeft") element[0].classList.add('keypress');
      else if (event.code == "AltRight") element[1].classList.add('keypress');
    }
    if (event.keyCode == 16) {
      let langKeys;
      isEng == 1 ? langKeys = engKeysShift : langKeys = rusKeysShift;
      let i = 0;
      let keys = document.querySelectorAll('#keyboard div');
      keys.forEach((el) => {
        el.innerText = langKeys[i];
        i++;
      });
    }
  }

  document.addEventListener('keydown', (event) => {
    keydown(event);
  });
  document.getElementById('keyboard').childNodes.forEach((e) => {
    e.addEventListener('mousedown', (event) => {
      let element = document.querySelectorAll('div[data="' + `${event.target.getAttribute('data')}` + '"]');
      if (element.length == 1) {
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
     if (element.length == 1) {
       element = element[0];
       element.classList.remove('keypress');
       if (element.innerText == 'Backspace') {
         output = output.substr(0, output.length-1);
       } else if (element.innerText == 'Enter') {
         output += '\n';
       } else if (element.innerText == '') {
         output += ' ';
       } else if (element.innerText == 'Tab') {
         output += '   ';
       } else if (element.innerText == 'Caps Lock') {
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
     if (keyCode == 20) {
       caps = !caps;
       let langKeys;
       isEng == 1 ? langKeys = engKeysUpperCase : langKeys = rusKeysUpperCase;
       let i = 0;
       let keys = document.querySelectorAll('#keyboard div');
       if (caps) {
         element.classList.add('keypress');
         keys.forEach((el) => {
           el.innerText = langKeys[i];
           i++;
         })
       } else {
         isEng == 1 ? langKeys = engKeys : langKeys = rusKeys;
         element.classList.remove('keypress');
         keys.forEach((el) => {
           el.innerText = langKeys[i];
           i++;
         });
       }
     }
   });
  });

  document.addEventListener('keyup', function(event) {
    if (event.code == 'ShiftLeft') leftShift = false;
    else if (event.code == 'AltLeft') {
      if (leftShift) {
        isEng == 1 ? isEng = 0 : isEng = 1;
        let l = document.querySelector('.language');
        isEng == 1 ? l.innerText = 'Eng' : l.innerText = 'Rus';
        let i = 0;
        let keys = document.querySelectorAll('#keyboard div');
        let langKeys;
        isEng == 1 ? langKeys = engKeys : langKeys = rusKeys;
        keys.forEach((el) => {
          el.innerText = langKeys[i];
          i++;
        });
      }
    }
    let element = document.querySelectorAll('div[data="' + `${event.keyCode}` + '"]');
    if (element.length == 1) {
      element = element[0];
      element.classList.remove('keypress');
    } else {
      if (event.code == "ShiftLeft") element[0].classList.remove('keypress');
      else if (event.code == "ShiftRight") element[1].classList.remove('keypress');
      else if (event.code == "ControlLeft") element[0].classList.remove('keypress');
      else if (event.code == "ControlRight") element[1].classList.remove('keypress');
      else if (event.code == "MetaLeft") element[0].classList.remove('keypress');
      else if (event.code == "MetaRight") element[1].classList.remove('keypress');
      else if (event.code == "AltLeft") element[0].classList.remove('keypress');
      else if (event.code == "AltRight") element[1].classList.remove('keypress');
    }
    if (event.keyCode == 20) {
      let langKeys;
      isEng == 1 ? langKeys = engKeysUpperCase : langKeys = rusKeysUpperCase;
      caps = event.getModifierState && event.getModifierState('CapsLock');
      let i = 0;
      let keys = document.querySelectorAll('#keyboard div');
      if (caps) {
        element.classList.add('keypress');
        keys.forEach((el) => {
          el.innerText = langKeys[i];
          i++;
        })
      } else {
        isEng == 1 ? langKeys = engKeys : langKeys = rusKeys;
        element.classList.remove('keypress');
        keys.forEach((el) => {
          el.innerText = langKeys[i];
          i++;
        });
      }
    } else if (event.keyCode == 16) {
          let langKeys;
          isEng == 1 ? langKeys = engKeys : langKeys = rusKeys;
          let i = 0;
          let keys = document.querySelectorAll('#keyboard div');
          keys.forEach((el) => {
            el.innerText = langKeys[i];
            i++;
          });
        }
  });
  window.addEventListener('beforeunload', () => {
    localStorage.setItem('isEng', isEng);
  });
}
