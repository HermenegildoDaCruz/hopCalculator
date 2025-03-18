

//Render all saved histories into HTML
const renderHistory = (history)=>{
    if (history){
        document.querySelector('.operations').innerHTML = ''
        history.forEach(item =>{
            const el = document.createElement('p')
            el.textContent = item
            document.querySelector('.operations').appendChild(el)
       })
    } 
   
}

const display = document.querySelector('.display')
const buttons = document.querySelectorAll('.button')
let savedHistories = []

if (localStorage.getItem('history')){
    savedHistories = localStorage.getItem('history').split(',')
}


buttons.forEach((button)=>{
    button.addEventListener('click', (e)=>{
        display.textContent += e.target.textContent
    })
})

document.querySelector('.calc').addEventListener('click', (e) => {
    try {
        if (display.textContent.length > 0){
            const result = eval(display.textContent)
            const operation = display.textContent
            display.textContent = Math.round(result*100)/100

            if ((Math.round(result*100)/100).toString().length > 8){
                display.textContent = (Math.round(result*100)/100).toExponential(2) // //to transform in cientific notation
            }
        
            if (operation.length > String(result).length){

                operationSummary = `${operation} = ${Math.round(result*100)/100}`

                if ((Math.round(result*100)/100).toString().length > 4){
                    operationSummary = `${operation} = ${(Math.round(result*100)/100).toExponential(2)}` //to transform in cientific notation
                }

                savedHistories.unshift(operationSummary) //Adding to savedHistories
                localStorage.setItem('history', savedHistories) //Saving into localStorage
                renderHistory(savedHistories)
            } 

            
        } 
    } catch (error) {
        alert('Invalid operation, please type the operation correctly')
        display.textContent = ''
    }
    
})

//Clear display
document.querySelector('.clear').addEventListener('click', () =>{
    display.textContent = ''
})

//Delete one per one
document.querySelector('.backspace').addEventListener('click', () =>{
    let items = display.textContent.split('')
    items.pop()
    items = items.join('')
    display.textContent = items
})

//See histories
document.querySelector('.view-history').addEventListener('click', ()=>{
    document.querySelector('.history').style.display = 'block' 
    document.querySelector('.backdrop').style.display = 'block' 
    
})

document.querySelector('.backdrop').addEventListener('click', (e) => {
    e.target.style.display = 'none'
    document.querySelector('.history').style.display = 'none' 
   
})

//Delete all histories
document.querySelector('.delete-history').addEventListener('click', (e) => {
    localStorage.clear()
    renderHistory(savedHistories)
    location.assign('/')
})
