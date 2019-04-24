'use strict';
declare function readline(): string

const INPUTS = readline().split(' ')
const WIDTH = parseInt(INPUTS[0])
const HEIGHT = parseInt(INPUTS[1])

const topLabels: Map<string, number> = new Map()
const answer: Map<string, string> = new Map()

for (let i = 0; i < HEIGHT; i++) {
    let line = readline()

    if (isFirstLine(i)) {
        saveTopLabels(line);
    }

    else if (isLastLine(i)) {
        updateAnswer(line);
    }

    else {
        updateTopLabelsPositions(i, line);
    }
}

printAnswer();





function isFirstLine(i: number) {
    return i === 0;
}

function saveTopLabels(line: string) {
    for (let j = 0; j < WIDTH; j++) {
        const character = line.charAt(j);
        if (character !== ' ') {
            topLabels.set(character, j);
        }
    }
}

function isLastLine(i: number) {
    return i === HEIGHT - 1;
}

function updateAnswer(line: string) {
    topLabels.forEach((position, label) => {
        answer.set(label, line.charAt(position));
    });
}

function updateTopLabelsPositions(i: number, line: string) {
    const CHARACTERS_BETWEEN_LANES = 3;
    topLabels.forEach((position, label) => {
        if (hasRightConnector(line, position)) {
            topLabels.set(label, position + CHARACTERS_BETWEEN_LANES);
        }
        if (hasLeftConnector(line, position)) {
            topLabels.set(label, position - CHARACTERS_BETWEEN_LANES);
        }
    })
}

function hasRightConnector(line: string, position: number) {
    return line.charAt(position + 1) === '-';
}

function hasLeftConnector(line: string, position: number) {
    return line.charAt(position - 1) === '-';
}

function printAnswer() {
    answer.forEach((bottomLabel, topLabel) => {
        console.log(topLabel + bottomLabel);
    });
}
