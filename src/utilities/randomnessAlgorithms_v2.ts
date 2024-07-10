import { Player, Team, TeamName } from '../types';

function splitArrayByConsecutiveValues(arr: Player[]): Player[][] {
    const result: Player[][] = [];
    let currentSubarray: Player[] = [];
    const sortedArr = arr.sort((a, b) => (b.score || 0) - (a.score || 0));

    for (let i = 0; i < sortedArr.length; i++) {
        const currentValue = sortedArr[i].score;
        const previousValue = sortedArr[i - 1]?.score || 0;

        if (i === 0 || currentValue !== previousValue) {
            // Start a new subarray if it's the first element or the value is different
            currentSubarray = [sortedArr[i]];
            result.push(currentSubarray);
        } else {
            // Add the value to the current subarray if it's the same as the previous value
            currentSubarray.push(sortedArr[i]);
        }
    }
    return result;
}

function shuffleArray(array: Player[]): Player[] {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]]; // Swap elements
    }
    return array;
}

export function generateTeamsV2(players: Player[], teamNames: TeamName[]) {
    let shuffledPlayers: Player[] = [];
    const segmentScores = splitArrayByConsecutiveValues(players);
    for (const segment of segmentScores) {
        if (segment.length > 1) {
            const shuffledSegment = shuffleArray([...segment]); // Use Fisher-Yates shuffle
            shuffledPlayers = shuffledPlayers.concat(shuffledSegment);
        } else {
            shuffledPlayers = shuffledPlayers.concat(segment);
        }
    }
    // Initialize groups
    const groups: Team[] = teamNames.map(teamName => ({
        name: teamName.name,
        players: [],
        totalScore: 0,
    }));

    for (const player of shuffledPlayers) {
        // Find the group with the minimum score
        const minScoreGroups = groups.filter(group => {
            const minScore = Math.min(...groups.map(g => g.totalScore));
            return group.totalScore === minScore;
        });

        // If multiple groups have the same minimum score, pick one at random
        const selectedGroup = minScoreGroups[Math.floor(Math.random() * minScoreGroups.length)];

        selectedGroup.players.push(player);
        selectedGroup.totalScore += player.score || 0;
    }

    return groups;
}