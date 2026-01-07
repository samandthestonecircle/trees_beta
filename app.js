// acess CSS
const root = document.querySelector(':root');

const xpThresholds = [
  0,
  100,
  200,
  400,
  800,
  1600,
  3200,
  6400,
  12800,
  25600,
  51200
];

//current level

let currentLevel = 0;


//total xp and level

let totalXp = 0;

function updateTotalXp(){
    document.getElementById('total-xp').innerHTML = totalXp;

    currentLevel = updateProgressBar();
    document.getElementById('current-level').innerHTML = currentLevel;
    if (currentLevel > 7 && !magicTreeUnlocked){
        let magicTree = document.getElementById('magicTree');
        let magicLogs = document.getElementById('tree5');
        let magicLogsHq = document.getElementById('tree5_HQ');
        magicTree.style.visibility = 'visible';
        magicLogs.style.visibility = 'visible';
        magicLogsHq.style.visibility = 'visible';
        magicTreeUnlocked = true;

        let lvl3Enchant = document.getElementById('enchant3');
        lvl3Enchant.style.visibility = 'visible';
    }
}

// progress bar and level

function updateProgressBar(){

    let level = 0;

    for (let i = 0; i < xpThresholds.length  -1; i++) {
    if (totalXp >= xpThresholds[i] && totalXp < xpThresholds[i + 1]) {
      level = i;}
    }

     if (totalXp >= xpThresholds[xpThresholds.length - 1]) {
        level = xpThresholds.length -1;  
        alert('you won');
    }

    const currentLevelXp = xpThresholds[level];
    const nextLevelXp = xpThresholds[level + 1];

    const progress = ((totalXp - currentLevelXp) / (nextLevelXp - currentLevelXp)) * 100;

    root.style.setProperty('--progressAmount', progress + '%');

    return level;
}



// AXES

const hand = {
    name: 'Hand',
    cost: 0,
    minLvlReq: 0,
    heirachy: 0,
    xpMultiplier: 1,
    isEnchanted: 0
}

const woodenAxe = {
    name: 'Wooden Axe',
    cost: 50,
    minLvlReq: 0,
    heirachy: 1,
    xpMultiplier: 2,
    isEnchanted: 0,
}

const bronzeAxe = {
    name: 'Bronze Axe',
    cost: 150,
    minLvlReq: 10,
    heirachy: 2,
    xpMultiplier: 5,
    isEnchanted: 0,
}

const steelAxe = {
    name: 'Steel Axe',
    cost: 350,
    minLvlReq: 20,
    heirachy: 3,
    xpMultiplier: 10,
    isEnchanted: 0,
}

const vidariteAxe = {
    name: 'Vidarite Axe',
    cost: 800,
    minLvlReq: 50,
    heirachy: 4,
    xpMultiplier: 20,
    isEnchanted: 0,
}

//array of axes 

const axes = [hand, woodenAxe, bronzeAxe, steelAxe, vidariteAxe];

// current axe

let currentAxe = hand;

function currentAxeDisplay(){
    document.getElementById('equipped').innerHTML = currentAxe.name;
    if (currentAxe.isEnchanted == 1){
        document.getElementById('equipped').innerHTML += '*'; 
    } else if (currentAxe.isEnchanted == 2){
        document.getElementById('equipped').innerHTML += '**';
    } else if (currentAxe.isEnchanted == 3){
        document.getElementById('equipped').innerHTML += '***';
    }
}

//TREES + LOG COUNTS

const pineTree = {
    name: 'Pine Tree',
    minLvlReq: 0,
    minAxeReq: 0, 
    minEnchReq: 0,
    id: 'pineTree',

    idLogs: 'pineLogCount',
    idLogsHq: 'pineLogHqCount',
    logs: 0,
    logsHq: 0,
    logsValue: 1,
    logsHqValue: 2,

    maxHealth: 20,
    health: 20,
    growthTime: 2000
}

const oakTree = {
    name: 'Oak Tree',
    minLvlReq: 2,
    minAxeReq: 1, 
    minEnchReq: 0,
    id: 'oakTree',

    idLogs: 'oakLogCount',
    idLogsHq: 'oakLogHqCount',
    logs: 0,
    logsHq: 0,
    logsValue: 2,
    logsHqValue: 3,
    
    maxHealth: 20,
    health: 20,
    growthTime: 3000
}

const mapleTree = {
    name: 'Maple Tree',
    minLvlReq: 5,
    minAxeReq: 2, 
    minEnchReq: 0,
    id: 'mapleTree',

    idLogs: 'mapleLogCount',
    idLogsHq: 'mapleLogHqCount',
    logs: 0,
    logsHq: 0,
    logsValue: 5,
    logsHqValue: 7,
    
    maxHealth: 30,
    health: 30,
    growthTime: 5000
}

const yewTree = {
    name: 'Yew Tree',
    minLvlReq: 8,
    minAxeReq: 3, 
    minEnchReq: 0,
    id: 'yewTree',

    idLogs: 'yewLogCount',
    idLogsHq: 'yewLogHqCount',
    logs: 0,
    logsHq: 0,
    logsValue: 8,
    logsHqValue: 10,

    maxHealth: 55,
    health: 55,
    growthTime: 15000
   
}

const magicTree = {
    name: 'Magic Tree',
    minLvlReq: 9,
    minAxeReq: 4, 
    minEnchReq: 3,
    id: 'magicTree',
   
    idLogs: 'magicLogCount',
    idLogsHq: 'magicLogHqCount',
    logs: 0,
    logsHq: 0,
    logsValue: 20,
    logsHqValue: 30,

    maxHealth: 1,
    health: 1,
    growthTime: 0
}
//Magic tree magic
let magicTreeUnlocked = false;



// total gold

let totalGold = 0;

function updateTotalGold(){
    document.getElementById("total-gold").innerHTML = totalGold;
}


//TREES (event listener function is wrapped in function to prevent triggering on page load)

document.getElementById("pineTree").addEventListener("click", function (){
    chopTree(pineTree, currentAxe)
});
document.getElementById("oakTree").addEventListener("click", function (){
    chopTree(oakTree, currentAxe)
});
document.getElementById("mapleTree").addEventListener("click", function (){
    chopTree(mapleTree, currentAxe)
});
document.getElementById("yewTree").addEventListener("click", function (){
    chopTree(yewTree, currentAxe)
});
document.getElementById("magicTree").addEventListener("click", function (){
    chopTree(magicTree, currentAxe)
});




// CHOP TREE FUNCTION 

function chopTree(tree, axe){
    if ( (tree.minLvlReq <= currentLevel) && (tree.minAxeReq <= axe.heirachy) && (tree.minEnchReq <= axe.isEnchanted) ){
        
        if (axe.isEnchanted == 0){
        tree.logs += 1;
        document.getElementById(tree.idLogs).innerHTML = tree.logs;

        totalXp += (5*axe.xpMultiplier);
        
        updateTotalXp()
        updateProgressBar();
        } else if (axe.isEnchanted == 1){

        tree.logsHq += 1;
        document.getElementById(tree.idLogsHq).innerHTML = tree.logsHq;

        totalXp += (5*axe.xpMultiplier);
        
        updateTotalXp()
        updateProgressBar();

        } else if (axe.isEnchanted == 2){
        tree.logs += 1;
        document.getElementById(tree.idLogs).innerHTML = tree.logs;
        
        tree.logsHq += 1;
        document.getElementById(tree.idLogsHq).innerHTML = tree.logsHq;

        totalXp += (5*axe.xpMultiplier);
        
        updateTotalXp()
        updateProgressBar();
        } else if (axe.isEnchanted == 3){
        tree.logs += 1;
        document.getElementById(tree.idLogs).innerHTML = tree.logs;
        
        tree.logsHq += 1;
        document.getElementById(tree.idLogsHq).innerHTML = tree.logsHq;

        totalXp += (5*axe.xpMultiplier);
        
        updateTotalXp()
        updateProgressBar();

        
         
         
        }

        // tree health
        tree.health = tree.health - 1;
        console.log(tree.health);
        if (tree.health == 0){
            document.getElementById(tree.id).style.visibility = 'hidden';
            tree.health = tree.maxHealth;
            console.log(tree.health);

            setTimeout(function() {
           document.getElementById(tree.id).style.visibility = 'visible';
            }, tree.growthTime);

        }

    } else {
        let notification = document.getElementById('notifications');
        notification.innerHTML = 'You do not meet the requirements to cut this tree';
        setTimeout(function() {
        notification.innerHTML = "";
        }, 1000);
    }
}


// SELL FUNCTION



//add to sell slots
document.getElementById("tree1").addEventListener("click", function (){
    sell(pineTree, 0)
})
document.getElementById("tree1_HQ").addEventListener("click", function (){
    sell(pineTree, 1)
})
document.getElementById("tree2").addEventListener("click", function (){
    sell(oakTree, 0)
})
document.getElementById("tree2_HQ").addEventListener("click", function (){
    sell(oakTree, 1)
})
document.getElementById("tree3").addEventListener("click", function (){
    sell(mapleTree, 0)
})
document.getElementById("tree3_HQ").addEventListener("click", function (){
    sell(mapleTree, 1)
})
document.getElementById("tree4").addEventListener("click", function (){
    sell(yewTree, 0)
})
document.getElementById("tree4_HQ").addEventListener("click", function (){
    sell(yewTree, 1)
})
document.getElementById("tree5").addEventListener("click", function (){
    sell(magicTree, 0)
})
document.getElementById("tree5_HQ").addEventListener("click", function (){
    sell(magicTree, 1)
})


function sell(tree, quality){
    
    if (quality == 0){
    let total = tree.logs*tree.logsValue;
    totalGold += total;
    updateTotalGold();
    tree.logs = 0;
    document.getElementById(tree.idLogs).innerHTML = tree.logs;
    } else if (quality == 1){
    let total = tree.logsHq*tree.logsHqValue;
    totalGold += total;
    updateTotalGold();
    tree.logsHq = 0;
    document.getElementById(tree.idLogsHq).innerHTML = tree.logsHq;    
    }
}



// BUY FUNCTION


document.getElementById('woodenAxe').addEventListener('click', function(){
    buy(woodenAxe)
})
document.getElementById('bronzeAxe').addEventListener('click', function(){
    buy(bronzeAxe)
})
document.getElementById('steelAxe').addEventListener('click', function(){
    buy(steelAxe)
})
document.getElementById('vidariteAxe').addEventListener('click', function(){
    buy(vidariteAxe)
})

function buy(item){
    if (totalGold >= item.cost){

        if (currentAxe != item){
        totalGold = (totalGold - item.cost);
        updateTotalGold();

        axes.forEach(axe => {
            axe.isEnchanted = 0;
        }); 

        currentAxe = item;
        currentAxeDisplay();

        } else {
            let notification = document.getElementById('notifications');
            notification.innerHTML = 'You already this axe';
                setTimeout(function() {
                notification.innerHTML = "";
                }, 1000);
            }
        } else {
        let notification = document.getElementById('notifications');
        notification.innerHTML = 'You do not have enough gold to buy this axe';
            setTimeout(function() {
            notification.innerHTML = "";
            }, 1000);
        }
}

document.getElementById('enchant1').addEventListener('click', function(){
    buyEnch(100, currentAxe, 1)
})

document.getElementById('enchant2').addEventListener('click', function(){
    buyEnch(300, currentAxe, 2)
})

document.getElementById('enchant3').addEventListener('click', function(){
    buyEnch(500, currentAxe, 3)
})

function buyEnch(cost, item, enchLvl){
    if (cost <= totalGold){
        item.isEnchanted = enchLvl;
        totalGold = (totalGold - cost);
        updateTotalGold();
        currentAxeDisplay();
    } else {
        let notification = document.getElementById('notifications');
        notification.innerHTML = 'You do not have enough gold to buy this enchantment';
            setTimeout(function() {
            notification.innerHTML = "";
            }, 1000);
        }
}

document.getElementById('buyXp').addEventListener('click', function(){
    buyXp(1000);
})

function buyXp(cost){
    if (cost <= totalGold){
        totalXp += 1000;
        totalGold = (totalGold - cost);
        updateTotalGold();
        updateTotalXp();
    } else {
        let notification = document.getElementById('notifications');
        notification.innerHTML = 'You do not have enough gold to buy xp';
            setTimeout(function() {
            notification.innerHTML = "";
            }, 1000);
        }

}



// TIMER (COPIED)

// Set the countdown time in minutes
let minutes = 7; // You can change this value to any number of minutes
let seconds = minutes * 60; // Convert minutes to seconds

// Function to start the countdown
function startCountdown() {
    let countdownElement = document.getElementById('timer');
    
    // Update the countdown every second
    let countdownInterval = setInterval(() => {
        let minutesLeft = Math.floor(seconds / 60); // Calculate remaining minutes
        let secondsLeft = seconds % 60; // Calculate remaining seconds

        // Display the time in mm:ss format
        countdownElement.innerHTML = `${minutesLeft}:${secondsLeft < 10 ? '0' + secondsLeft : secondsLeft}`;
        
        // Stop the countdown when it reaches zero
        if (seconds <= 0) {
            clearInterval(countdownInterval);
            location.reload();
        }
        
        seconds--; // Decrement the seconds
    }, 1000); // Update every second
}

// Start the countdown when the page loads
window.onload = startCountdown;
