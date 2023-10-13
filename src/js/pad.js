import '../css/pad.css'

export class Pad {
    xPosition = 0.5
    yPosition = 0.5
    pressed = false

    constructor(onPadEngageCb, onPadDisengageCb, onPuckMoveCb) {
        this.pad = document.getElementById('pad')
        this.puck = document.getElementById('puck')
        this.setPuckStyle()
        // add listeners
        this.pad.addEventListener('mousemove', this.handleMouseMove.bind(this))
        this.pad.addEventListener('mousedown', this.handleMouseDown.bind(this))
        this.pad.addEventListener('mouseup', this.handleMouseUp.bind(this))
        this.pad.addEventListener('mouseleave', this.handleMouseLeave.bind(this))
        // add callbacks
        this.onPadEngageCb = onPadEngageCb
        this.onPadDisengageCb = onPadDisengageCb
        this.onPuckMoveCb = onPuckMoveCb
    }

    handleMouseMove(e) {
        if (e.buttons) {
            this.updatePuckPosition(e)
        }
    }
    
    handleMouseDown(e) {
        this.updatePuckPosition(e)
        this.pressed = true
        if (this.onPadEngageCb) {
            this.onPadEngageCb({
                x: this.xPosition,
                y: this.yPosition,
                pressed: this.pressed,
            })
        }
    }
    
    handleMouseUp(e) {
        this.updatePuckPosition(e)
        this.pressed = false
        if (this.onPadDisengageCb) {
            this.onPadDisengageCb({
                x: this.xPosition,
                y: this.yPosition,
                pressed: this.pressed,
            })
        }
    }
    
    handleMouseLeave(e) {
        this.pressed = false
        if (this.onPadDisengageCb) {
            this.onPadDisengageCb({
                x: this.xPosition,
                y: this.yPosition,
                pressed: this.pressed,
            })
        }
    }

    updatePuckPosition(e) {
        this.xPosition = this.clamp(e.offsetX / this.pad.offsetWidth)
        this.yPosition = this.clamp(e.offsetY / this.pad.offsetHeight)
        this.setPuckStyle()
        if (this.onPuckMoveCb) {
            this.onPuckMoveCb({
                x: this.xPosition,
                y: this.yPosition,
                pressed: this.pressed,
            })
        }
    }

    clamp(value) {
        return Math.min(Math.max(value, 0), 1)
    }

    setPuckStyle() {
        const leftPercent = `${(this.xPosition * 100).toFixed(2)}%`
        const topPercent = `${(this.yPosition * 100).toFixed(2)}%`
        this.puck.style.left = leftPercent
        this.puck.style.top = topPercent
    }

}


