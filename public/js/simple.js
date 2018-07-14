const input = document.querySelector('input');
const button = document.querySelector('button');
const greeting = document.querySelector('#greeting');
const before = document.querySelector('#before');
const after = document.querySelector('#after');

const unfade = element => {
    var op = 0.1;
    element.style.display = 'block';
    var timer = setInterval(function () {
        if (op >= 1){
            clearInterval(timer);
        }
        element.style.opacity = op;
        element.style.filter = 'alpha(opacity=' + op * 100 + ")";
        op += op * 0.04;
    }, 10);
};

const respond = () => {
  if (input.value.trim() == "") {
    input.style.borderColor = "red";
    input.focus();
  } else {
    greeting.innerText = `Hi ${input.value}, we're glad you're here.`;
    before.hidden = true;
    after.style.opacity = 0.1;
    after.hidden = false;
    unfade(after);
  }
};

button.onclick = e => {
  respond();
}
input.addEventListener('keyup', e => {
    if (e.keyCode == 13) {
      respond();
    }
});
