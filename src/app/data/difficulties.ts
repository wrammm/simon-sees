import { Difficulty } from '../interfaces/difficulty';

export const Levels: Difficulty[] = [
  {
    levelDisplay: 'Easy',
    iconCount: 4,
    flickerSpeedMs: 1000,
    initialAmountOfIcons: 3,
    iconRoundIncrement: 1,
  },
  {
    levelDisplay: 'Medium',
    iconCount: 6,
    flickerSpeedMs: 1000,
    initialAmountOfIcons: 3,
    iconRoundIncrement: 1,
  },
  {
    levelDisplay: 'Hard',
    iconCount: 8,
    flickerSpeedMs: 750,
    initialAmountOfIcons: 4,
    iconRoundIncrement: 1,
  },
  {
    levelDisplay: 'Expert',
    iconCount: 10,
    flickerSpeedMs: 500,
    initialAmountOfIcons: 5,
    iconRoundIncrement: 2,
  },
];
