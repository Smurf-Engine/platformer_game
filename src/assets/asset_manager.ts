const playerIdleAnimationSheets : string[] = [];
for(let i = 0; i <= 10; i++){
    playerIdleAnimationSheets.push(`/player/idle/${i}.png`);
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
            }
        };
    }
}