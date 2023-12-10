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