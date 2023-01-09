import { Color } from '~/types/Color';
import { Item } from '~/types/Item';
import { addDays, chooseRandomly, formatDate, range } from '~/utils';

const baseDate = new Date('2022-01-01');

const colors = Object.values(Color);

export const items: Item[] = range(40, (index) => ({
  date: formatDate(addDays(baseDate, index)),
  color: chooseRandomly(colors),
}));

export const dataSample = {
  start: '2022-01-01',
  end: '2022-01-03',
  color: 'red',
};


export const colorToClassName: Record<Color, string> = {
  [Color.red]: 'bg-red-300 text-red-900',
  [Color.green]: 'bg-green-300 text-green-900',
  [Color.blue]: 'bg-blue-300 text-blue-900',
};

