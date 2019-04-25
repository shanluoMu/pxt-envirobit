let maqueencb: Action
let maqueenmycb: Action
let maqueene = "1"
let maqueenparam = 0
let alreadyInit = 0
let IrPressEvent = 0
let GI_AIRWHEEL_CW = 90
let GI_AIRWHEEL_CCW = 91
const MOTER_ADDRESSS = 0x10

enum PingUnit {
    //% block="cm"
    Centimeters,
    //% block="μs"
    MicroSeconds
}
/*数据块下拉框*/
enum DataBlockList {
    //% block="0"
    zero = 0,
    //% block="1"
    first = 1,
    //% block="2"
    secon = 2,
    //% block="3"
    A = 0,
    //% block="4"
    S = 1,
    //% block="5"
    D = 2,
    //% block="6"
    F = 0,
    //% block="7"
    G = 1,
    //% block="8"
    H = 2,
    //% block="9"
    J = 0,
    //% block="10"
    K = 1,
    //% block="11"
    L = 2,
    //% block="12"
    M = 0,
    //% block="13"
    N = 1,
    //% block="14"
    B = 2,
    //% block="15"
    V = 0,
    //% block="16"
    C = 1,
    //% block="17"
    X = 2,
    //% block="18"
    Z = 0
}
/*数据块字节数下拉框*/
enum byteNumList {
    //% block="0"
    zero = 0,
    //% block="1"
    first = 1
}
/*可选引脚*/
enum chooseD {
    //% block="P0"
    P0 = DigitalPin.P0,
    //% block="P1"
    P1 = DigitalPin.P1,
    //% block="P2"
    P2 = DigitalPin.P2,
    //% block="P3"
    P3 = DigitalPin.P3,
    //% block="P4"
    P4 = DigitalPin.P4,
    //% block="P5"
    P5 = DigitalPin.P5,
    //% block="P6"
    P6 = DigitalPin.P6,
    //% block="P7"
    P7 = DigitalPin.P7,
    //% block="P8"
    P8 = DigitalPin.P8,
    //% block="P9"
    P9 = DigitalPin.P9,
    //% block="P10"
    P10 = DigitalPin.P10,
    //% block="P11"
    P11 = DigitalPin.P11,
    //% block="P12"
    P12 = DigitalPin.P12,
    //% block="P13"
    P13 = DigitalPin.P13,
    //% block="P14"
    P14 = DigitalPin.P14,
    //% block="P15"
    P15 = DigitalPin.P15,
    //% block="P16"
    P16 = DigitalPin.P16,
    //% block="P19"
    P19 = DigitalPin.P19,
    //% block="P20"
    P20 = DigitalPin.P20
}
enum whichPose {
    //% block="向上"
    Up = 4,
    //% block="向下"
    Down = 5,
    //% block="向左"
    Left = 3,
    //% block="向右"
    Right = 2,
    //% block="顺时针"
    CW = GI_AIRWHEEL_CW,
    //% block="逆时针"
    CCW = GI_AIRWHEEL_CCW
}

//% weight=10 color=#008B00 icon="\uf136" block="maqueen"
namespace maqueen {

    export class Packeta {
        public mye: string;
        public myparam: number;
    }

    export enum aMotors {
        //% blockId="M1" block="M1"
        M1 = 0,
        //% blockId="M2" block="M2"
        M2 = 1
    }

    export enum aServos {
        //% blockId="S1" block="S1"
        S1 = 0,
        //% blockId="S2" block="S2"
        S2 = 1
    }

    export enum Dir {
        //% blockId="CW" block="CW"
        CW = 0x0,
        //% blockId="CCW" block="CCW"
        CCW = 0x1
    }

    export enum Patrol {
        //% blockId="PatrolLeft" block="PatrolLeft"
        PatrolLeft = 13,
        //% blockId="PatrolRight" block="PatrolRight"
        PatrolRight = 14
    }

    export enum LED {
        //% blockId="LEDLeft" block="LEDLeft"
        LEDLeft = 8,
        //% blockId="LEDRight" block="LEDRight"
        LEDRight = 12
    }

    export enum LEDswitch {
        //% blockId="turnOn" block="turnOn"
        turnOn = 0x01,
        //% blockId="turnOff" block="turnOff"
        turnOff = 0x00
    }

    //% advanced=true shim=maqueenIR::initIR
    function initIR(pin: Pins): void {
        return
    }
    //% advanced=true shim=maqueenIR::onPressEvent
    function onPressEvent(btn: RemoteButton, body: Action): void {
        return
    }
    //% advanced=true shim=maqueenIR::getParam
    function getParam(): number {
        return 0
    }

    function maqueenInit(): void {
        if (alreadyInit == 1) {
            return
        }
        initIR(Pins.P16)
        alreadyInit = 1
    }

    let MSGID_SENSORDATAOUT = 0x91
    //StreamingOutput Mask (DataOutputConfig), bitmask, 2Bytes
    let STREAMOUT_DSPINFO = 0x0001               //b0 : DSPInfo field
    let STREAMOUT_GESTUREINFO = 0x0002               //b1 : GestureInfo field
    let STREAMOUT_TOUCHINFO = 0x0004               //b2 : TouchInfo field
    let STREAMOUT_AIRWHEELINFO = 0x0008               //b3 : AirWheelInfo field
    let STREAMOUT_XYZPOSITION = 0x0010               //b4 : XYZPosition field  
    //Gesture Info 
    let GI_NOGESTURE = 0
    let GI_GARBAGEMOD = 1
    let GI_FLICK_R = 2
    let GI_FLICK_L = 3
    let GI_FLICK_U = 4
    let GI_FLICK_D = 5
    //Tap Bitmask
    let BITSHIFT_TAP_SOUTH = 5
    let BITSHIFT_TAP_WEST = 6
    let BITSHIFT_TAP_NORTH = 7
    let BITSHIFT_TAP_EAST = 8
    let BITSHIFT_TAP_CENTER = 9

    let SI_AIRWHEELVALID = 0x02
    let AirWheelValuePrevious = 0
    let AirWheelActivePrevious = false   // AirWheel status in the previous run

    let AirWheelDiff = 0
    /*3D手势模块*/
    function i2c1_MasterRead(reclength: number, address: number): number {
        /*获取数据到缓冲区*/
        let recbuf = pins.createBuffer(128) //recbuf为全局变量的话只能在function内部使用
        recbuf = pins.i2cReadBuffer(address, reclength, false)//repeated
        serial.writeBuffer(recbuf)
        /*处理缓冲区数据*/
        /*Extract data from buffer*/
        let streamOutRequired = (STREAMOUT_DSPINFO | STREAMOUT_GESTUREINFO | STREAMOUT_TOUCHINFO | STREAMOUT_AIRWHEELINFO | STREAMOUT_XYZPOSITION);
        let retVal = GI_NOGESTURE
        let header_id = recbuf[3] & 0xFF  
        // serial.writeNumber(0)
        // serial.writeNumber(header_id)

        let header_size = recbuf[0] & 0xFF
        // serial.writeNumber(0)
        // serial.writeNumber(header_size)

                     /**要反着读**/
        let buf_streamingOutputMaask = (recbuf[5] & 0xFF) << 8 | recbuf[4] & 0xFF     
        // serial.writeNumber(0)
        // serial.writeNumber(buf_streamingOutputMaask)
        
        let buf_systemInfo = recbuf[7] & 0xFF
        // serial.writeNumber(0)
        // serial.writeNumber(buf_systemInfo)
        
        let buf_airWheelCounter = recbuf[18] & 0xFF
        // serial.writeNumber(0)
        // serial.writeNumber(buf_airWheelCounter)
        
        let buf_gestureInfo = (recbuf[13] & 0xFF) << 24 | (recbuf[12] & 0xFF) << 16 | (recbuf[11] & 0xFF) << 8 | (recbuf[10] & 0xFF)
        // serial.writeNumber(0)
        // serial.writeNumber(buf_gestureInfo)

        if (header_id != MSGID_SENSORDATAOUT) {
            return GI_NOGESTURE
        }
        if (header_size < 22) {
            return GI_NOGESTURE
        }
        if ((buf_streamingOutputMaask & streamOutRequired) == streamOutRequired) {
            /*获取手势信息*/
            retVal = buf_gestureInfo & 0xFF
            // serial.writeNumber(0)
            // serial.writeNumber(retVal)
            /*AIRWHEEL DETECTION*/
            // AirWheel is active and valid if bit1 of SystemInfo is set
            let AirWheelActive = (buf_systemInfo & SI_AIRWHEELVALID) != 0 //0x02
            let AirWheelValueNew = buf_airWheelCounter;
            //store the airwheel counter when the airwheel is started
            if (AirWheelActive && !AirWheelActivePrevious) {
                AirWheelValuePrevious = buf_airWheelCounter
            }
            else if (AirWheelActive) {
                if (AirWheelValuePrevious < 64 && AirWheelValueNew) {
                    AirWheelDiff += ((AirWheelValueNew - 256) - AirWheelValuePrevious)
                }
                else if (AirWheelValuePrevious > 192 && AirWheelValueNew < 64) {
                    AirWheelDiff += ((AirWheelValueNew + 256) - AirWheelValuePrevious)
                }
                else {
                    AirWheelDiff += AirWheelValueNew - AirWheelValuePrevious
                }
                if (AirWheelDiff >= 32)//顺时针
                {
                    AirWheelDiff = 0
                    retVal = GI_AIRWHEEL_CW
                }
                else if (AirWheelDiff <= -32) {
                    AirWheelDiff = 0;
                    retVal = GI_AIRWHEEL_CCW;//逆时针
                }
                else { }
            }
            AirWheelActivePrevious = AirWheelActive    // save the status for the next run
            AirWheelValuePrevious = AirWheelValueNew
        }
        return retVal
    }

    /*3D手势模块*/
    //% weight = 40
    //% blockId=Gesture block="引脚(D) %pinD|引脚(MCLR) %pinMCLR|当前姿态 %Pose|?"
    export function Gesture(pinD: chooseD, pinMCLR: number, Pose: whichPose): boolean {
        
        let cmd: number
        let Gespin = pins.digitalReadPin(<number>pinD)
        //let Gespin = pins.digitalReadPin(DigitalPin.P0)
        if (Gespin == 0) {
          
            cmd = i2c1_MasterRead(26, 0x42)
            serial.writeNumber(0)
            serial.writeNumber(cmd)
            if (Pose == cmd) {
                return true
            }
            else {
                return false
            }
        }
        return false;
    }

    //% weight=62
    //% blockGap=50
    //% mutate=objectdestructuring
    //% mutateText=Packeta
    //% mutateDefaults="myparam:message"
    //% blockId=IR_callbackUser block="on obloq received"
    export function IR_callbackUser(maqueencb: (packet: Packeta) => void) {
        maqueenInit()
        IR_callback(() => {
            const packet = new Packeta();
            packet.mye = maqueene;
            maqueenparam = getParam();
            packet.myparam = maqueenparam;
            maqueencb(packet)
        });
    }

    /*当检测到卡片时*/
    //% weight=63 
    //% blockGap=50
    //% blockId=readUID block="当NFC检测到卡片时 读入UID值"
    export function readUID(rec: (receivedNumber: number) => void) {
    }

    //% weight=10
    //% blockId=IR_read block="read IR"
    export function IR_read(): number {
        maqueenInit()
        return getParam()
    }


    function IR_callback(a: Action): void {
        maqueencb = a
        IrPressEvent += 1
        onPressEvent(IrPressEvent, maqueencb)
    }

    //% blockId=ultrasonic_sensor block="sensor unit|%unit"
    //% weight=95
    export function sensor(unit: PingUnit, maxCmDistance = 500): number {
        // send pulse  basic.pause=sleep control.waitMicros=delay
        pins.setPull(DigitalPin.P1, PinPullMode.PullNone);
        pins.digitalWritePin(DigitalPin.P1, 0);
        control.waitMicros(2);
        pins.digitalWritePin(DigitalPin.P1, 1);
        control.waitMicros(10);
        pins.digitalWritePin(DigitalPin.P1, 0);
        pins.setPull(DigitalPin.P2, PinPullMode.PullUp);



        // read pulse
        let d = pins.pulseIn(DigitalPin.P2, PulseValue.High, maxCmDistance * 42);
        console.log("Distance: " + d / 42);

        basic.pause(50)

        switch (unit) {
            case PingUnit.Centimeters: return d / 42;
            default: return d;
        }
    }

    //% weight=90
    //% blockId=motor_MotorRun block="Motor|%index|dir|%Dir|speed|%speed"
    //% speed.min=0 speed.max=255
    //% index.fieldEditor="gridpicker" index.fieldOptions.columns=2
    //% direction.fieldEditor="gridpicker" direction.fieldOptions.columns=2
    export function MotorRun(index: aMotors, direction: Dir, speed: number): void {
        let buf = pins.createBuffer(3);
        if (index == 0) {
            buf[0] = 0x00;
        }
        if (index == 1) {
            buf[0] = 0x02;
        }
        buf[1] = direction;
        buf[2] = speed;
        pins.i2cWriteBuffer(0x10, buf);
    }

    //% weight=20
    //% blockId=motor_motorStop block="Motor stop|%motors"
    //% motors.fieldEditor="gridpicker" motors.fieldOptions.columns=2 
    export function motorStop(motors: aMotors): void {
        let buf = pins.createBuffer(3);
        if (motors == 0) {
            buf[0] = 0x00;
        }
        if (motors == 1) {
            buf[0] = 0x02;
        }
        buf[1] = 0;
        buf[2] = 0;
        pins.i2cWriteBuffer(0x10, buf);
    }

    //% weight=10
    //% blockId=motor_motorStopAll block="Motor Stop All"
    export function motorStopAll(): void {
        let buf = pins.createBuffer(3);
        buf[0] = 0x00;
        buf[1] = 0;
        buf[2] = 0;
        pins.i2cWriteBuffer(0x10, buf);
        buf[0] = 0x02;
        pins.i2cWriteBuffer(0x10, buf);
    }

    //% weight=20
    //% blockId=read_Patrol block="Read Patrol|%patrol"
    //% patrol.fieldEditor="gridpicker" patrol.fieldOptions.columns=2 
    export function readPatrol(patrol: Patrol): number {
        if (patrol == Patrol.PatrolLeft) {
            return pins.digitalReadPin(DigitalPin.P13)
        } else if (patrol == Patrol.PatrolRight) {
            return pins.digitalReadPin(DigitalPin.P14)
        } else {
            return -1
        }
    }

    //% weight=20
    //% blockId=writeLED block="led|%led|ledswitch|%ledswitch"
    //% led.fieldEditor="gridpicker" led.fieldOptions.columns=2 
    //% ledswitch.fieldEditor="gridpicker" ledswitch.fieldOptions.columns=2
    export function writeLED(led: LED, ledswitch: LEDswitch): void {
        if (led == LED.LEDLeft) {
            pins.digitalWritePin(DigitalPin.P8, ledswitch)
        } else if (led == LED.LEDRight) {
            pins.digitalWritePin(DigitalPin.P12, ledswitch)
        } else {
            return
        }
    }

    //% weight=90
    //% blockId=servo_ServoRun block="Servo|%index|angle|%angle"
    //% angle.min=0 angle.max=180
    //% index.fieldEditor="gridpicker" index.fieldOptions.columns=2
    export function ServoRun(index: aServos, angle: number): void {
        let buf = pins.createBuffer(2);
        if (index == 0) {
            buf[0] = 0x14;
        }
        if (index == 1) {
            buf[0] = 0x15;
        }
        buf[1] = angle;
        pins.i2cWriteBuffer(0x10, buf);
    }

    /*是否检测到卡片*/
    //% weight = 60
    //% blockId=isDetection block="检测到卡片？"  
    export function IsDetection(): boolean {
        if (1)
            return true
        else
            return false
    }

}
