const playerIdleAnimationSheets : string[] = [];
const playerIdleAnimationSheetsLeft : string[] = [];
for(let i = 0; i <= 10; i++){
    playerIdleAnimationSheets.push(`/player/idle/${i}.png`);
    playerIdleAnimationSheetsLeft.push(`/player/idle/${i}_left.png`);
}

const waterAnimationSheets : string[] = [];
for(let i = 1; i <= 17; i++){
    waterAnimationSheets.push(`/water/image ${i}.png`);
}

const coinAnimationSheets : string[] = [];
for(let i = 1; i <= 16; i++){
    coinAnimationSheets.push(`/coin/image ${i}.png`);
}

const chestAnimationSheets : string[] = [];
for (let i = 1; i <= 8; i++){
    chestAnimationSheets.push(`/chest/${i}.png`);
}

export default class AssetManager{
    static get getSprites(){
        return {
            jumpSound : "/jump.mp3",
            background : "/background/background.png",
            environment : {
                spring : {
                    grass : "/environment/spring/grass.png",
                    grassLeft : "/environment/spring/grass_left.png",
                    grassMid : "/environment/spring/grass_mid.png",
                    grassRight : "/environment/spring/grass_right.png",
                },
                autumn : {
                    grass : "/environment/autumn/grass.png",
                    grassLeft : "/environment/autumn/grass_left.png",
                    grassMid : "/environment/autumn/grass_mid.png",
                    grassRight : "/environment/autumn/grass_right.png",
                },
                winter: {
                    grass : "/environment/winter/grass.png",
                    grassLeft : "/environment/winter/grass_left.png",
                    grassMid : "/environment/winter/grass_mid.png",
                    grassRight : "/environment/winter/grass_right.png",
                },
                dirt : {
                    dirtLeft : "/environment/spring/dirt_left.png",
                    dirtMid : "/environment/spring/dirt_mid.png",
                    dirtRight : "/environment/spring/dirt_right.png",
                },
                details : {
                    tree : "/detail/tree.png",
                    tree_2 : "/detail/tree 2.png",
                    flower : "/detail/flower.png",
                },
            }
        };
    }
    static get getSheets(){
        return {
            player : {
                idle : playerIdleAnimationSheets,
                idle_left : playerIdleAnimationSheetsLeft,
            },
            water : waterAnimationSheets,
            coin : coinAnimationSheets,
            chest : chestAnimationSheets,
        };
    }
}