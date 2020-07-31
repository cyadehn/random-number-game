let score = [
    {
        computer: {
            time: []
            // attempts: []
        },
        player: {
            time: []
            // attempts: []
        }
    }
]

const scoreCalc = (obj) => { 100000/tSec(obj) }

const updateScore = () => {
    console.info("Updating score...");

    let computer = score[sceneIndex].computer;
    let player = score[sceneIndex].player;
    score[sceneIndex].computer.score = scoreCalc(computer);
    score[sceneIndex].player.score = scoreCalc(player);
}

const displayScores = () => {

}