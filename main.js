const fs = require('fs')
console.log("Loading file...");
var file = fs.readFileSync("newData.json", "utf8");

var js = JSON.parse(file)//.slice(0, 50);

var scores = []
var timeVals = []
var levelVals = []
var allVals = []
var csv = []
console.log(`Creating list(${js.length})...`);
var o = 0;
var lastscore = js[0].score;
var lastLvl = js[0].run.mythic_level
for (let i = 0; i < js.length; i++) {
    const run = js[i];

        var percent =  lastscore / run.score * 100
        if ((percent >  99  && percent < 101) || lastLvl != run.mythic_level) {
            console.log(`${percent} - ${run.score} - ${run.run.mythic_level}`);    

                var timeVal = parseFloat(run.run.keystone_time_ms) / parseFloat(run.run.clear_time_ms)
                if (timeVal <  1) {
                    timeVals.push(lessdess(timeVal ) )
                    scores.push(lessdess(run.score))
                    levelVals.push(run.run.mythic_level)
                    csv.push(`${timeVal} ${run.run.mythic_level} ${run.score}`)            
                }
            lastscore = run.score
            var lastLvl = run.run.mythic_level
        }
}

fs.writeFileSync("csv.csv",csv.join("\n")) 
fs.writeFileSync("scores.txt",scores.join("\n"))
fs.writeFileSync("levelVals.txt",levelVals.join("\n"))
fs.writeFileSync("timeVals.txt",timeVals.join("\n"))

console.log("Files have been created!");


function lessdess(val) {
    return Math.round(val * 1000000) / 1000000
}