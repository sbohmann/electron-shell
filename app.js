import {initializeClock} from "./clock.js"

window.onload = () => {
    void startQuestionLoop()

    const RECURSION_PROBABILITY_THRESHOLD = 0.9

    async function startQuestionLoop() {
        try {
            const value = await question('Hi!')
            output(`[${value}]`)
            if (Math.random() < RECURSION_PROBABILITY_THRESHOLD) {
                void startQuestionLoop()
            }
        } catch (error) {
            output('An internal error has occurred. Please try again later.')
            output(`Detailed error: ${error.message}`)
            output(`Stack trace: ${error.stack}`)
        }
    }

    initializeClock()
}

function question(promptText) {
    return new Promise((resolve) => {
        resolveQuestion(promptText, resolve)
    })
}

function resolveQuestion(promptText, resolve) {
    let prompt = document.createElement('p')
    prompt.textContent = promptText
    document.body.appendChild(prompt)
    let input = document.createElement('input')
    input.type = 'text'
    document.body.appendChild(input)
    input.onkeydown = event => {
        if (event.key === "Enter") {
            resolve(input.value.trim())
            input.disabled = true
            input.onkeydown = null
        }
    }
    input.focus()
}

function output(text) {
    let block = document.createElement('p')
    block.textContent = text
    document.body.appendChild(block)
    block.scrollIntoView()
}
