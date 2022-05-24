let form = document.forms.regist
let input = form.querySelectorAll('input')

let pattern = {
    email: /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/,
    name:  /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/u,
    surname:  /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/u,
    password: /^[a-zA-Z0-9!@#$%^&*]{6,16}$/ ,
}

function validate(inp, regex) {
    if(regex.test(inp.value)) {
        inp.classList.add('valid')
        inp.classList.remove('invalid')
    }else{
        inp.classList.add('invalid')
        inp.classList.remove('valid')
    }
}

input.forEach(input => {
    input.onkeyup = () => {
        validate(input, pattern[input.name])
    }
});

form.onsubmit = (e) => {
    e.preventDefault()

    let arr = []

    input.forEach(inp => {
        if(inp.classList.contains('invalid') || inp.value.length == 0) {
            arr.push('invalid')
            inp.classList.add('invalid')
            setTimeout(() => {
                inp.classList.remove('invalid')
            }, 3000);
        }
    })

    if(arr.length == 0) {
        setTimeout(() => {
            submit()
            let us = JSON.parse(localStorage.getItem('user'))
            name(us)
        }, 2000);
    } 

}

// let us = JSON.parse(localStorage.getItem('user'))

function submit() {

    let user = {}

    let fm = new FormData(form)

    fm.forEach((value, key) => {
        user[key] = value
    });

    input.forEach(inp => {
        inp.value = ""
        inp.classList.remove('valid')
    })
    localStorage.user = JSON.stringify(user)

}




function name(obj) {
    let form_div = document.querySelector('.form')
    let main = document.querySelector('.main')
    let name_polz = document.querySelector('.name_polz')
    form_div.style.width = '0px'
    main.style.width = '100%'
    main.style.display = 'block'
    name_polz.innerHTML = obj.name

}

let ad = JSON.parse(localStorage.getItem('user'))

if(ad) {
    if(ad.name.length > 0) {
        let form_div = document.querySelector('.form')
        let main = document.querySelector('.main')
        let name_polz = document.querySelector('.name_polz')
        form_div.style.width = '0px'
        main.style.width = '100%'
        main.style.display = 'block'
        main.style.overflow = 'hidden'
        name_polz.innerHTML = ad.name
    }else{
        console.log('В локалбном хранилище ничего нет');
    }
}else{

}

add()

function add() {
    let add = document.querySelector('.add')
    let add_box = document.querySelector('.add_box')
    let back = document.querySelector('.back2')
    
    add.onclick = () => {
        add_box.style.top = '20%'
        back.style.display = 'block'
        setTimeout(() => {
            back.style.opacity = '1'
        }, 200);
    } 
    back.onclick = () => {
        add_box.style.top = '-130%'
        back.style.display = 'none'
        setTimeout(() => {
            back.style.opacity = '0'
        }, 200);
    }
}



let crd = document.querySelector('.crd')


let form_add = document.forms.add

let arr =  JSON.parse(localStorage.getItem('cards')) || []

form_add.onsubmit = (e) => {
    e.preventDefault()
    let sel = document.querySelector('.sel')
    
    let user2 = {
        id: Math.random(),
        inner: sel.value,
    }
    
    let fm = new FormData(form_add)

    fm.forEach((value, key) => {
        user2[key] = value
    });
    arr.push(user2)
    if(arr.length < 4) {
        reload(arr)
        localStorage.cards = JSON.stringify(arr)
        
    }else{
        alert('Limit is 3 cards')
        let add_box = document.querySelector('.add_box')
        let back = document.querySelector('.back2')
        add_box.style.top = '-120%'
        setTimeout(() => {
            back.style.display = 'none'
            back.style.opacity = '0'
        }, 200);
    }

    let add_box = document.querySelector('.add_box')
    let back = document.querySelector('.back2')
    add_box.style.top = '-120%'
    setTimeout(() => {
        back.style.display = 'none'
        back.style.opacity = '0'
    }, 200);
}

let form_chng = document.forms.chng

let user3

form_chng.onsubmit = (e) => {
    e.preventDefault()
    let select = document.querySelector('#select')
    let back = document.querySelector('.back')
    let chng_box = document.querySelector('.chng_box')
    let input = document.querySelectorAll('.bot input')

    user3 = {
        id: Math.random(),
        inner: select.value,
    }
    
    let fm = new FormData(form_chng)

    fm.forEach((value, key) => {
        user3[key] = value
    });

    setTimeout(() => {
        chng_box.style.top = '-120%'
        back.style.display = 'none'
        setTimeout(() => {
            back.style.opacity = '0'
        }, 200);
        input.forEach(element => {
            element.checked = ''
            element.style.display = 'none'
        });
    }, 200);
    console.log(user3);
     
}

function reload(arr) { 
    crd.innerHTML = ''    
    for(let item of arr) {
        let ad = JSON.parse(localStorage.getItem('user'))
        crd.innerHTML += `
        <div class="card ">
            <div class="top_card">
            <h2>240000 СУМ</h2>
            <code>${ item.inner || 'VISA' }</code>
            </div>
            <div class="center">
                <span class="numb">${ item.number }</span>
            </div>
            <div class="bot">
                <span class="name">${ ad.name }</span>
                <span class="year">${ item.year }</span>
                <input type="checkbox">
                <img src="./icon.png" alt="">            
            </div>
        </div>
        `
        chng()
        function chng() {
            let chng_box = document.querySelector('.chng_box')
            let back = document.querySelector('.back')
            let chng = document.querySelector('.chng')
            let input = document.querySelectorAll('.bot input')
            chng.onclick = () => {
                input.forEach((inp, index) => {
                    inp.style.display = 'block'
                    inp.onclick = () => {
                        if(inp.checked = 'checked') {
                            chng_box.style.top = '20%'
                            back.style.display = 'block'
                            setTimeout(() => {
                                back.style.opacity = '1'
                            }, 200);
                            if(user3) {
                                let idx = arr.findIndex(elem => elem.id === arr[index].id)
                                arr.splice(idx, 1, user3)
                                reload(arr)
                                localStorage.cards = JSON.stringify(arr)
                            }
                        }
                        back.onclick = () => {
                            chng_box.style.top = '-120%'
                            back.style.display = 'none'
                            setTimeout(() => {
                                back.style.opacity = '0'
                                inp.checked = ''
                            }, 200);
                            setTimeout(() => {
                                inp.style.display = 'none'
                            }, 3000);
                        }   
                    }
                });
            } 
        }
        let img = document.querySelectorAll('.bot img')

        let del = document.querySelector('.del')
        del.onclick = () => {
            img.forEach((element, index) => {
                element.style.display = 'block'
                element.onclick = () => {
                    let idx = arr.findIndex(elem => elem.id === arr[index].id)

                    arr.splice(idx, 1)
                    localStorage.setItem('cards', JSON.stringify(arr))
                    reload(arr)
                }
            });
        }

    }
}

let ad2 = JSON.parse(localStorage.getItem('cards'))

if(ad2) {
    if(ad2.length > 0) {
        reload(ad2)
    }   
}else{

}
