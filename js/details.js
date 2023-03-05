const params = location.search
// console.log(params);
const idParams = new URLSearchParams(params)
// console.log(idParams.get('id'));

const id = idParams.get('id');


(async function ()
{
  $('#loading').removeClass('d-none')
  

  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': '75700dff21msha12b3479910f0dbp1cd5e6jsn0948188a25b1',
      'X-RapidAPI-Host': 'free-to-play-games-database.p.rapidapi.com'
    }
  };


  const api = await fetch(`https://free-to-play-games-database.p.rapidapi.com/api/game?id=${id}`, options)

  const res = await api.json()
  console.log(res);
  showDetails(res)
  $('#loading').addClass('d-none')

})()



function showDetails(res){
  

    let cartoona =
    `
    <div class="col-md-4">

      <figure>
        <img src="${res.thumbnail}" class="w-100" alt="details image" />
      </figure>

    </div>
    <div class="col-md-8">

    <div>

      <nav aria-label="breadcrumb">
        <ol class="breadcrumb">
          <li class="breadcrumb-item text-reset"><a href="./home.html">Home</a></li>
          <li class="breadcrumb-item text-info" aria-current="page">${res.title}</li>
        </ol>
      </nav>

      <h1>${res.title}</h1>

      <h3>About${res.title} </h3>
      <p>${res.short_description}</p>
    </div>

  </div>
  `

  let background = res.thumbnail.replace('thumbnail' , 'background')
  
  document.getElementById('detailsData').innerHTML = cartoona
  document.body.style.cssText =  
    `
    background-image: url(${background});
    background-position: center center ;
    background-size: cover;
    
    `
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