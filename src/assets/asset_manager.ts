const playerIdleAnimationSheets : string[] = [];
const playerIdleAnimationSheetsLeft : string[] = [];
for(let i = 0; i <= 10; i++){
    playerIdleAnimationSheets.push(`/player/idle/${i}.png`);
    playerIdleAnimationSheetsLeft.push(`/player/idle/${i}_left.png`);
}

export default class AssetManager{
    static get getSprites(){
        return {
            background : "/background/background.png",
            environment : {
                spring : {
                    grass : "/environment/spring/grass.png",
                    grassLeft : "/environment/spring/grass_left.png",
                    grassMid : "/environment/spring/grass_mid.png",
                    grassRight : "/environment/spring/grass_right.png",
                },
                dirt : {
                    dirtLeft : "/environment/spring/dirt_left.png",
                    dirtMid : "/environment/spring/dirt_mid.png",
                    dirtRight : "/environment/spring/dirt_right.png",
                },
            }
        };
    }
    static get getSheets(){
        return {
            player : {
                idle : playerIdleAnimationSheets,
                idle_left : playerIdleAnimationSheetsLeft,
            }
        };
    }
}