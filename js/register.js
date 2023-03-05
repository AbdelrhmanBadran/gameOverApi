// ? =============> Global ===============>
const inputs = document.querySelectorAll('input')
let isvalid = false
// ! =============> When Start ===============>

// * =============> Events ===============>

document.forms[0].addEventListener('submit' , (e)=>{
  e.preventDefault()
  if (isvalid == true) {
    collectData()
  }
})

document.forms[0].addEventListener('input' , ()=>{
  if (validateName(inputs[0]) && validateName(inputs[1]) && validateEmail() && validatePassword() && validateAge()) {
    isvalid = true
  }
})
// ! =============> Functions ===============>

function collectData(){
  let user = {
    first_name: inputs[0].value,
    last_name:inputs[1].value,
    email:inputs[2].value,
    password:inputs[3].value,
    age:inputs[4].value
  }

  console.log(user);
  sendForm(user)
}


async function sendForm(user){
  $('.load').removeClass('d-none')
  const api = await fetch(`https://sticky-note-fe.vercel.app/signup` , {
    method : 'POST',
    body: JSON.stringify(user),
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  })

  res = await api.json()

  console.log(res);

  if(res.message == 'success'){
    document.getElementById('msg').innerText = res.message
    location.href = './index.html'
  }else{
    document.getElementById('msg').innerText = res.errors?.email.message
  }
  $('.load').addClass('d-none')

}


//  *=============> Validation ===============>

function validateName(input){
  const myRegex = /^(?:[a-zA-Z0-9\s@,=%$#&_\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\uFB50-\uFDCF\uFDF0-\uFDFF\uFE70-\uFEFF]|(?:\uD802[\uDE60-\uDE9F]|\uD83B[\uDE00-\uDEFF])){2,20}$/


  if (myRegex.test(input.value)) {
    $(input).addClass('is-valid')
    $(input).removeClass('is-invalid')
    return true
  }else{
    $(input).addClass('is-invalid')
    $(input).removeClass('is-valid')
    return false
  }
}

function validateEmail(){
  const myRegex = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/


  if (myRegex.test(inputs[2].value)) {
    $(inputs[2]).addClass('is-valid')
    $(inputs[2]).removeClass('is-invalid')
    return true
  }else{
    $(inputs[2]).addClass('is-invalid')
    $(inputs[2]).removeClass('is-valid')
    return false
  }
}

function validatePassword(){
  const myRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/


  if (myRegex.test(inputs[3].value)) {
    $(inputs[3]).addClass('is-valid')
    $(inputs[3]).removeClass('is-invalid')
    return true
  }else{
    $(inputs[3]).addClass('is-invalid')
    $(inputs[3]).removeClass('is-valid')
    return false
  }
}

function validateAge(){
  const myRegex = /^([1-7][0-9]|80)$/


  if (myRegex.test(inputs[4].value)) {
    $(inputs[4]).addClass('is-valid')
    $(inputs[4]).removeClass('is-invalid')
    return true
  }else{
    $(inputs[4]).addClass('is-invalid')
    $(inputs[4]).removeClass('is-valid')
    return false
  }
}


// ?================ DarkMode=======================

document.getElementById('mode').addEventListener('click' , ()=>{
  changeTheme()
})
function changeTheme(){
  if (document.documentElement.getAttribute('data-theme') == 'dark') {
    document.documentElement.setAttribute('data-theme' , 'light')
  }else{
    document.documentElement.setAttribute('data-theme' , 'dark')
  }
}
