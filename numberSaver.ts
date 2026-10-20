
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

    /**
     * TODO: describe your function here
     * @param value describe value here, eg: 5
     */
    //% block
}