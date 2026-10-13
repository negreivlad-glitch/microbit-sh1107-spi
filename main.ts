
namespace SH1107 {
    const CS = DigitalPin.P16
    const DC = DigitalPin.P2
    const RST = DigitalPin.P12

    const WIDTH = 64
    const HEIGHT = 128
    let initialized = false

    function sendCommand(value: number): void {
        pins.digitalWritePin(CS, 0)
        pins.digitalWritePin(DC, 0)
        pins.spiWrite(value)
        pins.digitalWritePin(CS, 1)
    }

    function sendData(value: number): void {
        pins.digitalWritePin(CS, 0)
        pins.digitalWritePin(DC, 1)
        pins.spiWrite(value)
        pins.digitalWritePin(CS, 1)
    }

    function sendPair(command: number, value: number): void {
        sendCommand(command)
        sendCommand(value)
    }

    //% block="Initialiser OLED"
    export function initialiserOLED(): void {
        pins.spiPins(
            DigitalPin.P15,
            DigitalPin.P14,
            DigitalPin.P13
        )
        pins.spiFormat(8, 3)
        pins.spiFrequency(1000000)

        pins.digitalWritePin(CS, 1)
        pins.digitalWritePin(DC, 1)

        pins.digitalWritePin(RST, 0)
        basic.pause(50)
        pins.digitalWritePin(RST, 1)
        basic.pause(100)

        sendCommand(0xAE)
        sendCommand(0x20)
        sendPair(0xA8, 0x7F)
        sendPair(0xD3, 0x60)
        sendPair(0xDC, 0x00)
        sendPair(0xAD, 0x8A)
        sendPair(0xD5, 0x50)
        sendPair(0xD9, 0x22)
        sendPair(0xDB, 0x35)
        sendCommand(0xA0)
        sendCommand(0xC0)
        sendPair(0x81, 0x4F)
        sendPair(0xD9, 0x22)
        sendPair(0xDB, 0x35)
        sendCommand(0xA4)
        sendCommand(0xA6)
        sendCommand(0xAF)
        basic.pause(100)
        sendCommand(0xA4)
        sendCommand(0xA6)

        basic.pause(100)
        initialized = true
        effacerOLED()
    }

    //% block="Effacer OLED"
    
    //% block="Effacer OLED"
    export function effacerOLED(): void {
        if (!initialized) {
            return
        }

        for (let page = 0; page < 16; page++) {
            sendCommand(0xB0 + page)
            sendCommand(0x00)
            sendCommand(0x10)

            for (let x = 0; x < WIDTH; x++) {
                sendData(0x00)
            }
        }
    }


    //% block="Afficher texte %texte"
    
    
    //% block="Afficher texte %texte"
    export function afficherTexte(texte: string): void {
        if (!initialized) {
            return
        }

        effacerOLED()

        // Tester une seule page de 8 pixels de hauteur
        sendCommand(0xB0)
        sendCommand(0x00)
        sendCommand(0x10)

        for (let x = 0; x < WIDTH; x++) {
            if (x < 8) {
                sendData(0xFF)
            } else {
                sendData(0x00)
            }
        }
    }
}
