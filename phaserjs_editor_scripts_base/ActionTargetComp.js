// You can write more code here
/* END-USER-IMPORTS */
export default class ActionTargetComp {
    constructor(gameObject) {
        this.gameObject = gameObject;
        gameObject["__ActionTargetComp"] = this;
        /* START-USER-CTR-CODE */
        // Write your code here.
        /* END-USER-CTR-CODE */
    }
    static getComponent(gameObject) {
        return gameObject["__ActionTargetComp"];
    }
    gameObject;
    target = "GAME_OBJECT";
    targetName = "";
    /* START-USER-CODE */
    static getTargetGameObject(scriptNode, args) {
        const comp = ActionTargetComp.getComponent(scriptNode);
        if (comp) {
            switch (comp.target) {
                case "GAME_OBJECT":
                    return scriptNode.gameObject;
                case "ARG_1":
                    return args[0];
                case "ARG_2":
                    return args[1];
                case "ARG_3":
                    return args[2];
                case "ARG_4":
                    return args[3];
                case "ARG_5":
                    return args[4];
                case "ARG_6":
                    return args[5];
                case "ARG_7":
                    return args[6];
                case "ARG_8":
                    return args[7];
            }
        }
        return scriptNode.gameObject;
    }
}
/* END OF COMPILED CODE */
// You can write more code here
