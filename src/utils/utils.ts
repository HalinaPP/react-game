import { soundsPath } from '@/constants/constants';
import { HOT_KEYS } from '@/constants/constants';

export const addZero = (n: string): string => {
  return (parseInt(n, 10) < 10 ? '0' : '') + n;
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
  console.log('k=', event.code);
  const hotKey = Object.entries(HOT_KEYS).find(item => item[1] === event.code);
  if (hotKey?.length) {
    clickBtn(hotKey[0]);
  }
};
