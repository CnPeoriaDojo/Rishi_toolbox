
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
    /**
     * Shoots a projectile from a source sprite directly toward a target sprite at a specific speed.
     * @param projectileImage The sprite image for the bullet
     * @param source The sprite firing the weapon, eg: mySprite
     * @param target The target sprite to shoot at, eg: enemy
     * @param speed The velocity speed of the bullet, eg: 100
     */
    //% blockId=shoot_at_sprite
    //% block="shoot %projectileImage=screen_image_picker from %source=variables_get(sprite) toward target %target=variables_get(sprite) at speed %speed"
    export function shootAtSprite(projectileImage: Image, source: Sprite, target: Sprite, speed: number): void {
        if (!source || !target) return;

        // Calculate the vector components using the distance between sprites
        let dx = target.x - source.x;
        let dy = target.y - source.y;
        let distance = Math.sqrt(dx * dx + dy * dy);

        if (distance == 0) return; // Prevent division by zero

        // Create the bullet sprite
        let bullet = sprites.createProjectileFromSprite(projectileImage, source, 0, 0);

        // Normalize the vector and multiply by the desired speed
        bullet.vx = (dx / distance) * speed;
        bullet.vy = (dy / distance) * speed;
    }

    /**
     * Fires a projectile from a sprite in a specific angle direction (0 is Right, 90 is Down, 180 is Left, 270 is Up).
     * @param projectileImage The sprite image for the bullet
     * @param source The sprite firing the weapon, eg: mySprite
     * @param angle The angle in degrees, eg: 45
     * @param speed The velocity speed of the bullet, eg: 120
     */
    //% blockId=shoot_at_angle
    //% block="shoot %projectileImage=screen_image_picker from %source=variables_get(sprite) at angle %angle degrees with speed %speed"
    export function shootAtAngle(projectileImage: Image, source: Sprite, angle: number, speed: number): void {
        if (!source) return;

        // Convert degrees to radians because Math.cos/sin use radians
        let radians = (angle * Math.PI) / 180;

        let bullet = sprites.createProjectileFromSprite(projectileImage, source, 0, 0);

        // Standard trigonometry for directional velocity
        bullet.vx = Math.cos(radians) * speed;
        bullet.vy = Math.sin(radians) * speed;
    }

    /**
     * Shoots a burst of multiple projectiles in a circular ring pattern.
     * @param projectileImage The sprite image for the bullets
     * @param source The sprite firing the burst, eg: mySprite
     * @param bulletCount How many bullets to shoot in the circle, eg: 8
     * @param speed The velocity speed of the bullets, eg: 80
     */
    //% blockId=shoot_burst_circle
    //% block="shoot burst %projectileImage=screen_image_picker from %source=variables_get(sprite) with %bulletCount bullets at speed %speed"
    //% bulletCount.min=2 bulletCount.max=32
    export function shootBurstCircle(projectileImage: Image, source: Sprite, bulletCount: number, speed: number): void {
        if (!source) return;

        // Divide 360 degrees by the number of bullets wanted
        let angleStep = 360 / bulletCount;

        for (let i = 0; i < bulletCount; i++) {
            let currentAngle = i * angleStep;
            let radians = (currentAngle * Math.PI) / 180;

            let bullet = sprites.createProjectileFromSprite(projectileImage, source, 0, 0);
            bullet.vx = Math.cos(radians) * speed;
            bullet.vy = Math.sin(radians) * speed;
        }
    }
}