export const seats: number[] = [7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 3];
export function slidingWindow(numberOfTickets: number) {
  let startrow = -1;
  let endrow = 14;
  let i = 0;
  let j = 0;
  let sum = 0;
  let intialSum = 0;
  while (j < 12) {
    sum += seats[j];
    while (sum >= numberOfTickets) {
      if (endrow - startrow > j - i) {
        startrow = i;
        endrow = j;
        intialSum = sum;
      }
      if (endrow - startrow == j - i && intialSum > sum) {
        startrow = i;
        endrow = j;
        intialSum = sum;
      }
      sum -= seats[i];
      i++;
    }
    j++;
  }
  return { i: startrow, j: endrow };
}
export function findSeats(numberOfTickets: number) {
  console.log("number of tickets ", numberOfTickets);
  let startrow = -1;
  let endrow = 14;
  if (numberOfTickets == 7) {
    for (let i = 0; i < 11; i++) {
      if (seats[i] == numberOfTickets) {
        seats[i] = 0;
        startrow = i;
        endrow = i;
        return {
          i: startrow,
          j: endrow,
        };
      }
    }
    return {
      i: startrow,
      j: endrow,
    };
  } else {
    for (let i = 0; i < 12; i++) {
      if (seats[i] >= numberOfTickets) {
        seats[i] = seats[i] - numberOfTickets;
        startrow = i;
        endrow = i;
        return {
          i: startrow,
          j: endrow,
        };
      }
    }
  }
  const { i, j } = slidingWindow(numberOfTickets);
  startrow = i;
  endrow = j;
  return {
    i: startrow,
    j: endrow,
  };
}
export function countTotalSeatsLeft(): number {
  let sum = 0;
  for (let i = 0; i < 12; i++) {
    sum += seats[i];
  }
  return sum;
}
