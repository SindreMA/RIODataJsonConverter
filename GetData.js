const axios  = require('axios')
const fs = require('fs')


GetData();

async function GetData() {
    var runs = [];
for (let i = 650; i < 9278; i++) {
    
    var url = `https://raider.io/api/mythic-plus/rankings/runs?region=eu&season=season-bfa-3&dungeon=all&strict=false&page=${i}&faction=alliance&affixes=tyrannical-bursting-skittish-beguiling`
    console.log(`Fetching ${url}`);
    await axios.get(url).then(x=> {
        x.data.rankings.rankedGroups.forEach(run => {
            runs.push(run)
        });
    })
    
    console.log(`Page ${i} - Size ${runs.length}`);
    fs.writeFileSync('newData.json',JSON.stringify(runs))
}
}