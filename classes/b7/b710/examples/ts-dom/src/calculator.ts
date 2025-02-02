let val1 = 0;
let val2 = 0;

const resultSpan = document.querySelector<HTMLSpanElement>("#result");
const val1Input = document.querySelector<HTMLInputElement>("#value1");
const val2Input = document.querySelector<HTMLInputElement>("#value2");

function calculate() {
  if (resultSpan) {
    resultSpan.innerText = (val1 + val2).toString();
  }
}

if (val1Input) {
  val1Input.addEventListener("change", (ev) => {
    val1 = parseInt(val1Input.value);
    calculate();
  });
}

if (val2Input) {
  val2Input.addEventListener("change", (ev) => {
    val2 = parseInt(val2Input.value);
    calculate();
  });
}

calculate();