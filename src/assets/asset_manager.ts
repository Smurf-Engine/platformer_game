const playerIdleAnimationSheets : string[] = [];
for(let i = 0; i <= 10; i++){
    playerIdleAnimationSheets.push(`/player/idle/${i}.png`);
}

export default class AssetManager{
    static getSheets(){
        return {
            player : {
                idle : playerIdleAnimationSheets,
            }
        };
    }
}