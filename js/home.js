// ? =============> Global ===============>
const links = document.querySelectorAll('.menu .nav-link')
// console.log(links);
// ! =============> When Start ===============>

getGames('mmorpg')
// * =============> Events ===============>
links.forEach( function(link){
  $(link).click((e)=>{
    let link = e.target
    let category = $(link).text()
    $(link).addClass('active')
    $(link).parent().siblings().children().removeClass('active')
    console.log(category);
    getGames(category)
  })
})
document.querySelector('.logout-btn').addEventListener('click' , ()=>{
  localStorage.removeItem('uToken')
  location.href = './index.html'
})

// ! =============> Functions ===============>

async function getGames(category){
  $('#loading').removeClass('d-none')
  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': '75700dff21msha12b3479910f0dbp1cd5e6jsn0948188a25b1',
      'X-RapidAPI-Host': 'free-to-play-games-database.p.rapidapi.com'
    }
  };

  const api = await fetch(`https://free-to-play-games-database.p.rapidapi.com/api/games?category=${category}`, options)

  const res = await api.json()
  console.log(res);

  displayGames(res)
  $('#loading').addClass('d-none')

}


function displayGames(res){

  let cartoona = []

  for (let index = 0; index < res.length; index++) {
    let videoSrc = res[index].thumbnail.replace('thumbnail.jpg' , 'videoplayback.webm')

    //https://www.freetogame.com/g/540/videoplayback.webm
    //https://www.freetogame.com/g/540/thumbnail.jpg

    cartoona +=
    `
    <div class="col">
      <div class="card h-100 bg-transparent" role="button" onclick='showDetails(${res[index].id})' onmouseenter='playVideo(${index})' onmouseleave="pauseVideo(${index})" >
          <div class="card-body">
            <figure class="position-relative">
              <img class="card-img-top object-fit-cover h-100" src="${res[index].thumbnail}" />
              <video muted="true"  preload="none" loop   class="w-100 video${index} d-none h-100 position-absolute top-0 start-0 z-3">
              <source src="${videoSrc}">
              </video>
            </figure>

            <figcaption>

                <div class="hstack justify-content-between">
                  <h3 class="h6 small">${res[index].title}</h3>
                  <span class="badge text-bg-primary p-2">Free</span>
                </div>

                <p class="card-text small text-center opacity-50">
                ${res[index].short_description.split(' ' , 10)}...
                </p>

            </figcaption>
          </div>

          <footer class="card-footer small hstack justify-content-between">

            <span class="badge badge-color">${res[index].genre}</span>
            <span class="badge badge-color">${res[index].platform}</span>

          </footer>
      </div>
    </div>
      `
  }

  document.getElementById('gameData').innerHTML = cartoona;

}



function playVideo(index){
  const video = $(`figure .video${index}`)[0]
  video.play()
  video.classList.remove('d-none')
  // console.log(video);

}

function pauseVideo(index){
  const video = $(`figure .video${index}`)[0]
  video.pause()
  video.classList.add('d-none')
  // console.log(video);

}


function showDetails(id){
  location.href = `./details.html?id=${id}`
}
