export const MENU = {
  name: 'Меню',
  choose: 'Что будем делать?',
  buttons: {
    newGame: { name: 'New game', id: 'newGame' },
    settings: { name: 'Settings', id: 'settings' },
    help: { name: 'Help', id: 'help' },
    score: { name: 'Score', id: 'score' },
  },
};

export const GAME_INFO = {
  time: 'Time',
  moves: 'Moves',
  buttons: {
    clear: { name: 'Clear', id: 'clear' },
    undo: { name: 'Undo', id: 'undo' },
  },
};

export const SETTINGS_INFO = {
  bgSound: 'Background Music',
  bgOn: 'Music On',
  handleSound: 'Active Sounds',
  handleOn: 'Sound On',
  fieldBlockColorOn: 'Color field block',
  difficultLevel: 'Level',
  volume: 'Volume',
};

export const HELP_INFO = {
  text: `Sudoku is played on a grid of 9 x 9 spaces.
        Within the rows and columns are 9 “squares” (made up of 3 x 3 spaces).
        Each row, column and square (9 spaces each) needs to be filled out with the numbers 1-9, 
        without repeating any numbers within the row, column or square.`,
  headerHotKeys: 'Use next keyboard keys for actions',
  hotKeys: [
    ['N', MENU.buttons.newGame.name],
    ['S', MENU.buttons.settings.name],
    ['H', MENU.buttons.help.name],
    ['U', GAME_INFO.buttons.undo.name],
    ['C', GAME_INFO.buttons.clear.name],
    ['M', 'Mute'],
  ],
};

export const BUTTON_OK = 'OK';
