import readline from "readline";
import { promises as fs } from "fs";
import { program } from "commander";
import color from "colors";

program.option(
  "-f, --file [type]",
  "file for saving game results",
  "results.txt"
);

program.parse(process.argv);

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let count = 0;
const logFile = program.opts().file;
const mind = Math.floor(Math.random() * 10);

const isValid = (value) => {
  if (isNaN(value)) {
    console.log("Введите цифру!".red);
    return false;
  }
  if (value < 0 || value > 9) {
    console.log("Цифра должна быть в диапазоне от 0 до 9".red);
    return false;
  }
  return true;
};

const log = async (data) => {
  try {
    await fs.appendFile(logFile, `${new Date().toLocaleString()} + ${data}\n`);
    console.log(data.magenta);
    console.log(`Удалось сохранить результат в файл ${logFile}`.green);
  } catch (err) {
    console.log(`He удалось сохранить файл ${logFile}`.red);
    console.log(err);
  }
};

const game = () => {
  rl.question(
    "Введите цифру от 0 до 9, чтобы угадать задуманное: ".cyan,
    (value) => {
      let a = +value;
      if (!isValid(a)) return game();
      count++;
      if (a === mind) {
        log(`Поздравляю, Вы угадали за ${count} шаг(ов)`).finally(() =>
          rl.close()
        );
        return;
      }
      console.log("Вы не угадали, еще попытка".yellow);
      return game();
    }
  );
};

game();
