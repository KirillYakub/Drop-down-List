const $inputField = document.querySelector(".dropdownInput");
const $list = document.querySelector(".dropdownList");
const inputLabel = document.querySelector(".inputFieldLabel");

let $note, inputValue, myReg;

function noteOutput($list, condition){
    for (let i = 0; i < $list.length; i++)
        $list[i].style.display = `${condition}`;
}
document.addEventListener('click', (e) => {
    $note = $list.querySelectorAll(".note");
    if (!e.target.classList.contains('dropdownInput') && !e.target.classList.contains('note')) {
        noteOutput($note, 'none');
        $inputField.value = "";
        inputLabel.innerText = "";
    }
    else {
        if($note.length != 0) {
            noteOutput($note, 'block');
            $inputField.addEventListener('input', (e) => {
                inputValue = $inputField.value;
                if(inputValue.length > 0) {
                    let elementsQuantity = 0;
                    myReg = new RegExp(`${inputValue}`, "i");
                    for (let i = 0; i < $note.length; i++) {
                        if (!myReg.test($note[i].textContent))
                            $note[i].style.display = 'none';
                        else {
                            $note[i].style.display = 'block';
                            elementsQuantity++;
                        }
                    }
                    if(elementsQuantity == 0)
                        inputLabel.innerText = "Совпадений не найдено!";
                    else
                        inputLabel.innerText = "";
                }
                else
                    noteOutput($note, 'block');
            })
        }
    }
})
$inputField.addEventListener('keydown', (e) => {
    if(e.code == 'Enter' && $inputField.value.length > 0) {
        $list.insertAdjacentHTML('beforeend', `<div class='note'>` + $inputField.value + `</div>`);
        noteOutput($note, 'block');
    }
})
$list.addEventListener('mousemove', (e) => {
    e.target.addEventListener('click', (e) => {
        $inputField.value = e.target.textContent;
    })
    e.target.addEventListener('mouseenter', (e) => {
        e.target.style.background = "#E0FFFF";
    })
    e.target.addEventListener('mouseleave', (e) => {
        e.target.style.background = "#FFFFFF";
    })
})