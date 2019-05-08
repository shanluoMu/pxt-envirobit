
let adcbuf = pins.createBuffer(6)
let BMEbuf = pins.createBuffer(32)
let temp = 0.0
let press = 0.0
let hum = 0.0
let initial_tag = true


//% weight=10 color=#008BFF icon="\uf1e8" block="MBT0013"
namespace MBT0013 {
    function OLED_display(): void {

    }
    function set_leds(): void {
    }

    function initialset(): void {/////////
        if (initial_tag) {
            let initialbuf = pins.createBuffer(3)
            initialbuf[0] = 0x04
            initialbuf[1] = 1  //设置K??????????
            initialbuf[2] = 41
            pins.i2cWriteBuffer(0x10, initialbuf, false)
            initial_tag = false
        }
    }

    function get_adc(): void {
        initialset()
        adcbuf = pins.i2cReadBuffer(0x06, 6, false)
    }

    function get_BME280data(): void {
        let writebuf = pins.createBuffer(1)
        writebuf[0] = 0x88
        pins.i2cWriteBuffer(0x076, writebuf, false);
        BMEbuf = pins.i2cReadBuffer(0x076, 24, false)
    }

    //% weight = 23
    //% blockId=get_temperature block="Temperature(℃)"
    export function get_temperature(): number {
        return 0
    }

    //% weight = 27
    //% blockId=get_pressure block="Pressure(Pa)"
    export function get_pressure(): number {
        return 0
    }

    //% weight = 29
    //% blockId=get_humidity block="Humidity(RH)"
    export function get_humidity(): number {
        return 0
    }

    /**紫外线强度 SEN0175**/
    //% weight = 13
    //% blockId = uvIntensity block="Ultraviolet intensity(mW/cm²)"
    export function uvIntensity(): number {
        let uviret = 0
        uviret = (adcbuf[4] << 8) | adcbuf[5]
        return uviret
    }

    /**麦克风**/
    //% weight = 17
    //% blockId=get_sound block="sound(DB)"
    export function get_sound(): number {
        let sdret = 0;
        sdret = (adcbuf[2] << 8) | adcbuf[3]
        return sdret
    }

    /**TDS**/
    //% weight = 19
    //% blockId=get_TDS  block="TDS(PPM)"
    export function get_TDS(): number {
        let sdret = 0;
        sdret = (adcbuf[0] << 8) | adcbuf[1]
        return sdret
    }

}



