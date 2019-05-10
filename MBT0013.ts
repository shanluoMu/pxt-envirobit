let dig_T1=0
let dig_T2 = 0
let dig_T3 = 0
let dig_P1 = 0
let dig_P2 = 0
let dig_P3 = 0
let dig_P4 = 0
let dig_P5 = 0
let dig_P6 = 0
let dig_P7 = 0
let dig_P8 = 0
let dig_P9 = 0

let dig_H1 = 0

let dig_H2 = 0
let dig_H3 = 0
let dig_H4 = 0
let dig_H5 = 0
let dig_H6 = 0

//% weight=10 color=#008BFF icon="\uf1e8" block="MBT0013"
namespace MBT0013 {
    let adcbuf = pins.createBuffer(6)
    let BMEbuf = pins.createBuffer(32)
    let adc_tag = true
    let bme_tag = true
    let E280_ADDRESS = 0x76
    let pres_raw = 0
    let temp_raw = 0
    let hum_raw = 0
    let addbuf = pins.createBuffer(1)

    let t_fine = 0
    function sub():number{
        //Math.pow()
        return 0
    }

    function OLED_display(): void {

    }
    function set_leds(): void {
    }

    function BME280_set(): void {
        if (bme_tag) {
            let osrs_t = 1;
            let osrs_p = 1;
            let osrs_h = 1;
            let mode = 3;
            let t_sb = 5;
            let filter = 0;
            let spi3w_en = 0;

            let ctrl_meas_reg = (osrs_t << 5) | (osrs_p << 2) | mode
            let config_reg = (t_sb << 5) | (filter << 2) | spi3w_en
            let ctrl_hum_reg = osrs_h

            // let meas_buf = pins.createBuffer(2)
            // meas_buf[0] = 0xF2
            // meas_buf[1] = ctrl_meas_reg
            // let config_buf = pins.createBuffer(2)
            // config_buf[0] = 0xF4
            // config_buf[1] = config_reg
            // let ctrl_hum_buf = pins.createBuffer(2)
            // ctrl_hum_buf[0] = 0xF5
            // ctrl_hum_buf[1] = ctrl_hum_reg
            // pins.i2cWriteBuffer(E280_ADDRESS, meas_buf)
            // pins.i2cWriteBuffer(E280_ADDRESS, config_buf)
            // pins.i2cWriteBuffer(E280_ADDRESS, ctrl_hum_buf)

            writeReg(0xF2, ctrl_hum_reg)
            writeReg(0xF4, ctrl_meas_reg)
            writeReg(0xF5, config_reg)

            readTrim()
            bme_tag = true
        }
    }

    function writeReg(reg_addr: number, data: number) {
        let regbuf = pins.createBuffer(2)
        regbuf[0] = reg_addr
        regbuf[1] = data
        pins.i2cWriteBuffer(E280_ADDRESS, regbuf)
    }

    function readTrim() {
        let data1 = pins.createBuffer(24)
        addbuf[0] = 0x88
        pins.i2cWriteBuffer(E280_ADDRESS, addbuf)
        data1 = pins.i2cReadBuffer(E280_ADDRESS, 24)

        let data2 = pins.createBuffer(1)
        addbuf[0] = 0xA1
        pins.i2cWriteBuffer(E280_ADDRESS, addbuf)
        data2 = pins.i2cReadBuffer(E280_ADDRESS, 1)

        let data3 = pins.createBuffer(7)
        addbuf[0] = 0xE1
        pins.i2cWriteBuffer(E280_ADDRESS, addbuf)
        data3 = pins.i2cReadBuffer(E280_ADDRESS, 7)


        dig_T1 = (data1[1] << 8) | data1[0];
        switch_int16(dig_T1)
        dig_T2 = switch_int16((data1[3] << 8) | data1[2]);
        dig_T3 = switch_int16((data1[5] << 8) | data1[4]);
        dig_P1 = switch_int16((data1[7] << 8) | data1[6]);

        dig_P2 = switch_int16((data1[9] << 8) | data1[8]);////(-10653)//54883
        dig_P3 = switch_int16((data1[11] << 8) | data1[10]);
        dig_P4 = switch_int16((data1[13] << 8) | data1[12]);
        dig_P5 = (data1[15] << 8) | data1[14]; //(-102)// 65434
        dig_P5 = switch_int16(dig_P5);
        dig_P6 = switch_int16((data1[17] << 8) | data1[16]);///(-7)//65529
        dig_P7 = switch_int16((data1[19] << 8) | data1[18]);
        dig_P8 = switch_int16((data1[21] << 8) | data1[20]);///( -12000)//53536
        dig_P9 = switch_int16((data1[23] << 8) | data1[22]);

        dig_H1 = switch_int8(data2[0]);//8

        dig_H2 = switch_int16((data3[1] << 8) | data3[0]);
        dig_H3 = switch_int8(data3[2]);//8
        dig_H4 = switch_int16((data3[3] << 4) | (0x0F & data3[4]));
        dig_H5 = switch_int16((data3[5] << 4) | ((data3[4] >> 4) & 0x0F));
        dig_H6 = switch_int8(data3[6]);//8

    }
    function switch_int16(data: number): number {
        if ((data & 0x8000) != 0) {
            data = data-65536
        }
        return data
    }
    function switch_int8(data: number): number {
        if ((data & 0x128) != 0) {
            data = data - 255
        }
        return data
    }



    function read_BME280data(): void {
        BME280_set()
        let read_BMEdata = pins.createBuffer(8)
        addbuf[0] = 0xF7
        pins.i2cWriteBuffer(E280_ADDRESS, addbuf)
        read_BMEdata = pins.i2cReadBuffer(E280_ADDRESS, 8)
        // serial.writeString("read_BMEdata:")
        //serial.writeBuffer(read_BMEdata)
        pres_raw = (read_BMEdata[0] << 12) | (read_BMEdata[1] << 4) | (read_BMEdata[2] >> 4)
        temp_raw = (read_BMEdata[3] << 12) | (read_BMEdata[4] << 4) | (read_BMEdata[5] >> 4)
        hum_raw = (read_BMEdata[6] << 8) | read_BMEdata[7]
    }

    function calibration_T(): number {
        read_BME280data()
        // serial.writeString("temp_raw:")
        // serial.writeNumber(temp_raw)
        let var1 = ((((temp_raw >> 3) - (dig_T1 << 1))) * (dig_T2)) >> 11
        let var2 = (((((temp_raw >> 4) - (dig_T1)) * ((temp_raw >> 4) - (dig_T1))) >> 12) * (dig_T3)) >> 14
        t_fine = var1 + var2;
        let T = (t_fine * 5 + 128) >> 8;
        return T;
    }

    function calibration_P(): number {
        if (t_fine == 0) {
            calibration_T()
        }
        // serial.writeString(" ")
        // serial.writeNumber(t_fine)
        // serial.writeString(" ")

        read_BME280data()
        let var1 = ((t_fine) >> 1) - 64000
        let var2 = (((var1 >> 2) * (var1 >> 2)) >> 11) * (dig_P6);//负数 -1603

        // serial.writeNumber(var2)
        // serial.writeString(" ")
        // serial.writeNumber(var1)
        // serial.writeString(" ")
        // serial.writeNumber(dig_P6)
        // serial.writeString(" ")

        var2 = var2 + ((var1 * (dig_P5)) << 1);
        var2 = (var2 >> 2) + ((dig_P4) << 16);
        var1 = (((dig_P3 * (((var1 >> 2) * (var1 >> 2)) >> 13)) >> 3) + (((dig_P2) * var1) >> 1)) >> 18;
        var1 = ((((32768 + var1)) * (dig_P1)) >> 15);
        if (var1 == 0) {
            return 0;
        }
        let P = ((((1048576) - pres_raw) - (var2 >> 12))) * 3125;
        if (P < 0x80000000) {
            P = (P << 1) / (var1);
        }
        else {
            P = (P / var1) * 2;
        }
        var1 = ((dig_P9) * ((((P >> 3) * (P >> 3)) >> 13))) >> 12;
        var2 = (((P >> 2)) * (dig_P8)) >> 13;
        // serial.writeString(" var1 ")
        // serial.writeNumber(var1)
        // serial.writeString(" ")
        P = (P + ((var1 + var2 + dig_P7) >> 4));
        return P;
    }

    function calibration_H(): number {
        read_BME280data()
        if (t_fine == 0) {
            calibration_T()
        }
        let v_x1 = (t_fine - (76800));
        v_x1 = (((((hum_raw << 14) - ((dig_H4) << 20) - ((dig_H5) * v_x1)) +
            (16384)) >> 15) * (((((((v_x1 * (dig_H6)) >> 10) *
                (((v_x1 * (dig_H3)) >> 11) + (32768))) >> 10) + (2097152)) *
                (dig_H2) + 8192) >> 14));
        v_x1 = (v_x1 - (((((v_x1 >> 15) * (v_x1 >> 15)) >> 7) * (dig_H1)) >> 4));
        v_x1 = (v_x1 < 0 ? 0 : v_x1);
        v_x1 = (v_x1 > 419430400 ? 419430400 : v_x1);
        return (v_x1 >> 12)
    }


    //% weight = 23
    //% blockId=get_temperature block="Temperature(℃)"
    export function get_temperature(): number {
        let temp_cal = 0.0
        temp_cal = calibration_T();
        let temp_act = temp_cal / 100.0
        serial.writeString("temp_act ")
        serial.writeNumber(temp_act)
        return temp_act
    }

    //% weight = 27
    //% blockId=get_pressure block="Pressure(Pa)"
    export function get_pressure(): number {
        let press_cal = calibration_P()
        let press_act = press_cal / 100.0
        serial.writeString("press_act ")
        serial.writeNumber(press_act)
        return press_act
    }

    //% weight = 29
    //% blockId=get_humidity block="Humidity(RH)"
    export function get_humidity(): number {
        let hum_cal = calibration_P()
        let hum_act = hum_cal / 1024.0
        serial.writeString("hum_act ")
        serial.writeNumber(hum_act)
        return hum_act
    }

    function initialset(): void {/////////
        let initialbuf = pins.createBuffer(3)
        initialbuf[0] = 0x04
        initialbuf[1] = 0  //设置K
        initialbuf[2] = 90
        pins.i2cWriteBuffer(0x10, initialbuf)
    }

    function get_adc(): void { // no data???
        if (adc_tag) {
            initialset()
            //     adc_tag = false
            // }
            let initialbuf = pins.createBuffer(1)
            initialbuf[0] = 0x06
            pins.i2cWriteBuffer(0x10, initialbuf)
            adcbuf = pins.i2cReadBuffer(0x10, 6)
            //serial.writeBuffer(adcbuf)
            adc_tag = false
        }
    }

    /**紫外线强度 SEN0175**/
    //% weight = 30
    //% blockId=uvIntensity block="Ultraviolet intensity(mW/cm²)"
    export function uvIntensity(): number {
        let uviret = 0
        get_adc()
        uviret = (adcbuf[4] << 8) | adcbuf[5]
        //serial.writeNumber(uviret)
        return uviret
    }

    /**麦克风**/
    //% weight = 17
    //% blockId=get_sound block="sound(DB)"
    export function get_sound(): number {
        let sdret = 0;
        get_adc()
        sdret = (adcbuf[2] << 8) | adcbuf[3]
        // serial.writeString("sound ")
        // serial.writeNumber(sdret)
        return sdret
    }

    /**TDS**/
    //% weight = 19
    //% blockId=get_TDS  block="TDS(PPM)"
    export function get_TDS(): number {
        let sdret = 0;
        get_adc()
        sdret = (adcbuf[0] << 8) | adcbuf[1]
        return sdret
    }

}



