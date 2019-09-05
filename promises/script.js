// Game where user has to click button
// six times in 2 seconds...
const runGame = () => {
  const button = document.querySelector('button');

  let counter = 0;

  button.addEventListener('click', () => {
    counter++;
  });

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      counter >= 6 ? resolve(`${counter} : Success!`) : reject(`${counter} : Failure!`);
    }, 2000);
  });
};

runGame()
  .then(message => console.log(message))
  .catch(error => console.error(error));
