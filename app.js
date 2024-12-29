window.onload = () => {
    let button = document.createElement("button")
    button.textContent = "Again"
    document.body.appendChild(button)
    button.onclick = () => {
        alert("Hi again!")
    }

    ask()

    function ask() {
        question('Hi!', value => {
            output(`[${value}]`)
            if (Math.random() < 0.9) {
                ask()
            }
        })
    }
}

function question(promptText, handleResult) {
    let prompt = document.createElement('p')
    prompt.textContent = promptText
    document.body.appendChild(prompt)
    let input = document.createElement('input')
    input.type = 'text'
    document.body.appendChild(input)
    input.onkeydown = event => {
        if (event.key === "Enter") {
            handleResult(input.value.trim())
            input.disabled = true
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
