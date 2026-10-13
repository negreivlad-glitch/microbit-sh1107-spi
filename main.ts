
namespace SH1107 {
    let initialized = false

    // Broches utilisées sur le micro:bit
    const CS = DigitalPin.P16
    const DC = DigitalPin.P2
    const RST = DigitalPin.P12

    function command(value: number): void {
        pins.digitalWritePin(DC, 0)
        pins.digitalWritePin(CS, 0)
        pins.spiWrite(value)
        pins.digitalWritePin(CS, 1)
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

        command(0xAE)
        initialized = true
    }

    //% block="Effacer OLED"
    export function effacerOLED(): void {
        if (initialized) {
            // L'effacement complet sera ajouté avec la gestion de la mémoire écran.
            command(0xAE)
        }
    }

    //% block="Afficher texte %texte"
    export function afficherTexte(texte: string): void {
        if (initialized) {
            // L'affichage des caractères sera ajouté ensuite.
            basic.showString(texte)
        }
    }
}
