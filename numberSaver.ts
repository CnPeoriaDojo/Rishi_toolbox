
/**
* Use this file to define custom functions and blocks.
* Read more at https://arcade.makecode.com/blocks/custom
*/

enum MyEnum {
    //% block="one"
    One,
    //% block="two"
    Two
}

/**
 * Custom blocks
 */
//% weight=100 color=#0fbc11 icon=""
namespace rishis_toolbox {
    let numbers: { [key: string]: number } = {}
    /**
     * TODO: describe your function here
     * @param n describe parameter here, eg: 5
     * @param s describe parameter here, eg: "Hello"
     * @param e describe parameter here
     */
    //% block

    export function numberSaver(name: string, n: number): void {
        numbers[name] = n
    }
    //% block
    export function numberGetter(name: string): number {
        if (!numbers[name]) return 0

        return numbers[name]
    }

    function lerp(start: number, end: number, delta: number) {
        return start + (end - start) * (1 - delta)
    }
    /**
     * Use a small number like 0.1 for time
     * @param value describe value here, eg: 5
     */
    //% block
    export function cameraGlide(sprite: Sprite, time: number) {
        const camX = scene.cameraProperty(CameraProperty.X)
        const camY = scene.cameraProperty(CameraProperty.Y)
        const x = lerp(camX, sprite.x + 8, time)
        const y = lerp(camY, sprite.y + 4, time)
        scene.centerCameraAt(x, y)
    }
    
    //% block
    export function setGodMode(active: boolean, sprite: Sprite) {
        sprite.setFlag(SpriteFlag.GhostThroughSprites, active)
        sprite.setFlag(SpriteFlag.GhostThroughWalls, active)
        sprite.setFlag(SpriteFlag.Ghost, active)
    }
}