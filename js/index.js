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
  if ( validateEmail() && validatePassword()) {
    isvalid = true
  }
})
// ! =============> Functions ===============>

function collectData(){
  let user = {
    email:inputs[0].value,
    password:inputs[1].value
    }

  console.log(user);
  sendForm(user)
}


async function sendForm(user){
  $('.load').removeClass('d-none')
  const api = await fetch(`https://sticky-note-fe.vercel.app/signin` , {
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
    localStorage.setItem('uToken' , res.token)
    location.href = './home.html'
  }else{
    document.getElementById('msg').innerText = res.message
  }
  $('.load').addClass('d-none')

}


//  *=============> Validation ===============>



function validateEmail(){
  const myRegex = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/
  if (myRegex.test(inputs[0].value)) {
    $(inputs[0]).addClass('is-valid')
    $(inputs[0]).removeClass('is-invalid')
    return true
  }else{
    $(inputs[0]).addClass('is-invalid')
    $(inputs[0]).removeClass('is-valid')
    return false
  }
}

function validatePassword(){
  const myRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/


  if (myRegex.test(inputs[1].value)) {
    $(inputs[1]).addClass('is-valid')
    $(inputs[1]).removeClass('is-invalid')
    return true
  }else{
    $(inputs[1]).addClass('is-invalid')
    $(inputs[1]).removeClass('is-valid')
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



