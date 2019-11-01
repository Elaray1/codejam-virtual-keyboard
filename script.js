window.onload = function() {
  const textarea = '<div class="textarea"><textarea name="name" rows="8" cols="80"></textarea></div>';
  const keyboard = '<div id="keyboard"></div>';
  const body = document.querySelector('body');

  body.insertAdjacentHTML('afterbegin', keyboard);
  body.insertAdjacentHTML('afterbegin', textarea);
  // const key = [];
  //
  // document.onkeypress = function(el) {
  //   key.push(el.charCode);
  //   console.log(key);
  // }
  const engKeyboard = [96, 49, 50, 51, 52, 53, 54, 55, 56, 57, 48, 45, 61, 8,
                       9, 113, 119, 101, 114, 116, 121, 117, 105, 111, 112, 91, 93, 92,
                       20, 97, 115, 100, 102, 103, 104, 106, 107, 108, 59, 39, 13,
                       16, 122, 120, 99, 118, 98, 110, 109, 44, 46, 47, 38, 16,
                       17, 91, 18, 32, 18, 91, 17, 37, 40, 39];

  let initKeyboad = () => {
    let out = '';
    engKeyboard.forEach((el) => {
      out += `<div class="key-def" data=` + el + `>${String.fromCharCode(el)}</div>`;
    });
    document.getElementById('keyboard').innerHTML = out;
  }
  initKeyboad();


  const carryArray = [8, 92, 13, 16]
  const clearfix = '<div class="clearfix"></div>';
  carryArray.forEach((el) => {
    const element = document.querySelectorAll('div[data="' + `${el}` + '"]');
    element[element.length-1].insertAdjacentHTML('afterend', clearfix);
  })

  const specialKeys = [8, 9, 20, 13, 16, 17, 18, 32];
  const specialKeysContent = ['Backspace', 'Tab', 'Caps Lock', 'Enter', 'Shift', 'Shift', 'Ctrl', 'Ctrl', 'Alt', 'Alt', 'Space'];
  const specialKeysWidth = [100, 100, 100, 115, 107.5, 107.5, 75, 75, 75, 75, 140];
  let i = 0;
  specialKeys.forEach((el) => {
    const element = document.querySelectorAll('div[data="' + `${el}` + '"]');
    element.forEach((e) => {
      e.classList.add('special-key');
      e.innerText = specialKeysContent[i];
      e.style.width = specialKeysWidth[i] + 'px';
      i++;
    });
  })

  const specialSize = []
}
