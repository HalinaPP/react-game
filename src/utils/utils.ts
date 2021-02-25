export const addZero = (n: string): string => {
  return (parseInt(n, 10) < 10 ? '0' : '') + n;
};

export const getMinSecTime = (time: number): string => {
  const sec = time % 60;
  const min = Math.trunc(time / 60);

  return `${addZero(min.toString())}:${addZero(sec.toString())}`;
};
