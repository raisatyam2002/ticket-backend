"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.seats = void 0;
exports.slidingWindow = slidingWindow;
exports.findSeats = findSeats;
exports.countTotalSeatsLeft = countTotalSeatsLeft;
exports.seats = [7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 3];
function slidingWindow(numberOfTickets) {
    let startrow = -1;
    let endrow = 14;
    let i = 0;
    let j = 0;
    let sum = 0;
    let intialSum = 0;
    while (j < 12) {
        sum += exports.seats[j];
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
            sum -= exports.seats[i];
            i++;
        }
        j++;
    }
    return { i: startrow, j: endrow };
}
function findSeats(numberOfTickets) {
    console.log("number of tickets ", numberOfTickets);
    let startrow = -1;
    let endrow = 14;
    if (numberOfTickets == 7) {
        for (let i = 0; i < 11; i++) {
            if (exports.seats[i] == numberOfTickets) {
                exports.seats[i] = 0;
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
    }
    else {
        for (let i = 0; i < 12; i++) {
            if (exports.seats[i] >= numberOfTickets) {
                exports.seats[i] = exports.seats[i] - numberOfTickets;
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
function countTotalSeatsLeft() {
    let sum = 0;
    for (let i = 0; i < 12; i++) {
        sum += exports.seats[i];
    }
    return sum;
}
