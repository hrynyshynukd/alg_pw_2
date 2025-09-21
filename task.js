const readline = require("readline");

// Генерація випадкового масиву
function generateArray(length, min = -10000, max = 10000) {
  const arr = [];
  for (let i = 0; i < length; i++) {
    arr.push(Math.floor(Math.random() * (max - min + 1)) + min);
  }
  return arr;
}

// Форматований вивід масиву
function formatArray(arr) {
  if (arr.length <= 20) {
    return "{" + arr.map((val, i) => `[cell - ${i}, value - ${val}]`).join(", ") + "}";
  } else {
    const firstPart = arr.slice(0, 10)
      .map((val, i) => `[cell - ${i}, value - ${val}]`).join(", ");
    const lastPart = arr.slice(-10)
      .map((val, i) => `[cell - ${arr.length - 10 + i}, value - ${val}]`).join(", ");
    return `{${firstPart}, ..., ${lastPart}}`;
  }
}

// Алгоритми сортування
function bubbleSort(arr, ascending = true) {
  let n = arr.length;
  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      if ((ascending && arr[j] > arr[j + 1]) || (!ascending && arr[j] < arr[j + 1])) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
      }
    }
  }
  return arr;
}

function insertionSort(arr, ascending = true) {
  for (let i = 1; i < arr.length; i++) {
    let key = arr[i];
    let j = i - 1;
    while (j >= 0 && ((ascending && arr[j] > key) || (!ascending && arr[j] < key))) {
      arr[j + 1] = arr[j];
      j--;
    }
    arr[j + 1] = key;
  }
  return arr;
}

function selectionSort(arr, ascending = true) {
  let n = arr.length;
  for (let i = 0; i < n - 1; i++) {
    let idx = i;
    for (let j = i + 1; j < n; j++) {
      if ((ascending && arr[j] < arr[idx]) || (!ascending && arr[j] > arr[idx])) {
        idx = j;
      }
    }
    [arr[i], arr[idx]] = [arr[idx], arr[i]];
  }
  return arr;
}

// Тест часу
function measureTime(sortFn, original, ascending) {
  const arr = [...original];
  const start = performance.now();
  sortFn(arr, ascending);
  const end = performance.now();
  return (end - start).toFixed(2);
}

// 
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question("\nВведіть довжину масиву: ", (len) => {
  const length = parseInt(len);

  function askOrder() {
    rl.question("Сортувати за зростанням (a) чи за спаданням (d)? ", (ans) => {
      const input = ans.trim().toLowerCase();

      if (input !== "a" && input !== "d") {
        console.log("Невірне введення! Використовуйте тільки 'a' або 'd'.\n");
        askOrder(); 
        return;
      }

      const ascending = input === "a";
      const array = generateArray(length);

      if (array.length > 20) {
        console.log("\nВиведено тільки перші 10 і останні 10 елементів");
      }

      console.log("\nНесортований масив:");
      console.log(formatArray(array));

      // Для виводу відсортованого масиву використаємо Bubble
      const sortedArray = bubbleSort([...array], ascending);

      console.log("\nВідсортований масив:");
      console.log(formatArray(sortedArray));

      // Замір часу для кожного алгоритму
      const tBubble = measureTime(bubbleSort, array, ascending);
      const tInsertion = measureTime(insertionSort, array, ascending);
      const tSelection = measureTime(selectionSort, array, ascending);

      console.log(`\nBubble Sort (${ascending ? "за зростанням" : "за спаданням"}) - ${tBubble} ms`);
      console.log(`Insertion Sort (${ascending ? "за зростанням" : "за спаданням"}) - ${tInsertion} ms`);
      console.log(`Selection Sort (${ascending ? "за зростанням" : "за спаданням"}) - ${tSelection} ms`);

      rl.close();
    });
  }

  askOrder();
});
