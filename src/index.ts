import {sum} from "./sum";


function range(start: number, end: number, step: number = 1): number[] {
  const result: number[] = [];

  if (start < end) {
    for (let i = start; i < end; i += step) result.push(i);
  }
  else {
    for (let i = start; i > end; i -= step) result.push(i);
  }

  return result;
}


const result = document.getElementById("result");
if (result) {
  result.textContent = String(sum(range(0, 100)));
}
