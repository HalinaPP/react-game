import { soundsPath } from '@/constants/constants';
import { HOT_KEYS } from '@/constants/constants';

export const addZero = (n: string): string => {
  return (parseInt(n, 10) < 10 ? '0' : '') + n;
};

export const showTime = (currTime: Date): string => {
  const now: Date = new Date();
  const delta = Math.trunc((+now - +currTime) / 1000);
  return getMinSecTime(delta);
};

export const getMinSecTime = (time: number): string => {
  const sec = time % 60;
  const min = Math.trunc(time / 60);

  return `${addZero(min.toString())}:${addZero(sec.toString())}`;
};

export const playSound = (
  soundOn: boolean,
  audioFile: string,
  volume: number,
  loop: boolean = false
): HTMLAudioElement => {
  const audio = new Audio(`${soundsPath}${audioFile}`);
  if (soundOn) {
    audio.play();
    audio.volume = volume;
    audio.loop = loop;
  }
  return audio;
};

export const clickBtn = (btnId: string): void => {
  document.getElementById(btnId)?.click();
};

export const handleKeyPress = (event: KeyboardEvent) => {
  const hotKey = Object.entries(HOT_KEYS).find(item => item[1] === event.code);

  if (event.code === 'Escape') {
    const modalWindow = document.getElementById('modalWindow');
    modalWindow?.classList.remove('show');
    modalWindow?.classList.remove('modal-dialog-centered');
  }
  if (hotKey?.length) {
    clickBtn(hotKey[0]);
  }
};

export const setInnerHtml = (text: string): { __html: string } => {
  return { __html: text };
};

export const isEqualMatrix = (first: number[][], second: number[][]) => {
  return first.reduce(
    (prev, row, i) => prev && row.every((cell, j) => cell === second[i][j]),
    true
  );
};
