
const SMOOTH_MODE_ENABLED = false
const CANVAS_WIDTH = 150
const CANVAS_HEIGHT = 150
const CLOCK_POSITION = { right: '10px', top: '10px' }

export function initializeClock() {
    const clockCanvas = document.createElement('canvas')
    const staticCanvas = document.createElement('canvas')  // New layer for static components
    staticCanvas.width = CANVAS_WIDTH
    staticCanvas.height = CANVAS_HEIGHT
    clockCanvas.width = CANVAS_WIDTH
    clockCanvas.height = CANVAS_HEIGHT
    clockCanvas.style.position = 'fixed'
    clockCanvas.style.right = CLOCK_POSITION.right
    clockCanvas.style.top = CLOCK_POSITION.top
    document.body.appendChild(clockCanvas)
    const staticCtx = staticCanvas.getContext('2d')  // Context for static parts
    renderStaticClock(staticCtx)  // Render static components

    function updateClock(ctx) {
        const now = new Date()
        ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)
        ctx.drawImage(staticCanvas, 0, 0)  // Draw static layer
        drawClockHands(ctx, now)
    }

    function drawClockHands(ctx, time) {
        const hours = time.getHours() % 12
        const minutes = time.getMinutes()
        const seconds = time.getSeconds()
        const milliseconds = time.getMilliseconds()

        ctx.translate(CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2)
        ctx.rotate(-Math.PI / 2)
        ctx.lineCap = 'round'

        // Draw hour hand
        drawHand(ctx, (Math.PI * 2) * (hours / 12) + (Math.PI * 2) * (minutes / 720), 30, 8, '#000')

        // Draw minute hand
        drawHand(ctx, (Math.PI * 2) * (minutes / 60) + (Math.PI * 2) * (seconds / 3600), 45, 5, '#000')

        // Draw second hand
        drawHand(ctx, (Math.PI * 2) * (seconds / 60) + (Math.PI * 2) * (milliseconds / 60000), 50, 2, 'red')

        ctx.resetTransform()
    }

    function drawHand(ctx, rotation, length, width, color) {
        ctx.rotate(rotation)
        ctx.strokeStyle = color
        ctx.lineWidth = width
        ctx.beginPath()
        ctx.moveTo(0, 0)
        ctx.lineTo(length, 0)
        ctx.stroke()
        ctx.rotate(-rotation)
    }

    function renderStaticClock(ctx) {
        ctx.clearRect(0, 0, 150, 150)
        drawClockBorder(ctx)
        drawClockTicks(ctx)
    }
    // Draw clock border
    function drawClockBorder(ctx) {
        ctx.beginPath()
        ctx.arc(75, 75, 74, 0, Math.PI * 2) // 74 radius to account for border stroke
        ctx.lineWidth = 4
        ctx.strokeStyle = '#000'
        ctx.stroke()
    }

    function drawClockTicks(ctx) {
        for (let i = 0; i < 60; i++) {
            const angle = (Math.PI * 2) * (i / 60)
            ctx.save()
            ctx.translate(75, 75)
            ctx.rotate(angle)
            if (i % 5 === 0) {
                ctx.lineWidth = 4
                ctx.strokeStyle = '#000'
                ctx.beginPath()
                ctx.moveTo(65, 0)
                ctx.lineTo(74, 0)
                ctx.stroke()
            } else {
                ctx.lineWidth = 2
                ctx.strokeStyle = '#777'
                ctx.beginPath()
                ctx.moveTo(70, 0)
                ctx.lineTo(74, 0)
                ctx.stroke()
            }
            ctx.restore()
        }
    }

    const ctx = clockCanvas.getContext('2d')
    updateClock(ctx)

    function syncAndStartClock() {
        function recursiveClockUpdate() {
            updateClock(ctx)
            if (SMOOTH_MODE_ENABLED) {
                window.requestAnimationFrame(recursiveClockUpdate)
            } else {
                setTimeout(recursiveClockUpdate, timeUntilNextClockTick())
            }
        }

        if (SMOOTH_MODE_ENABLED) {
            window.requestAnimationFrame(() => recursiveClockUpdate())
        } else {
            setTimeout(() => {
                updateClock(ctx)
                recursiveClockUpdate()
            }, timeUntilNextClockTick())
        }
    }

    syncAndStartClock()
}

function timeUntilNextClockTick() {
    const now = new Date()
    let offsetPoint = now.getMilliseconds() + 50
    let result = 1050 - offsetPoint
    if (result < 0) {
        result += 1000
    }
    return result
}
