function loadingOn() {
  document.getElementById('loader').classList.remove('hidden')
}
function loadingOff() {
  document.getElementById('loader').classList.add('hidden')
}

function loadCategory() {
  fetch('https://openapi.programming-hero.com/api/phero-tube/categories')
    .then(res => res.json())
    .then(data => displayCategories(data.categories))
}

function removeActiveBtns() {
  let activeBtns = document.getElementsByClassName('active');

  for (btn of activeBtns) {
    btn.classList.remove('bg-[#FF1F3D]', 'text-white', 'active');
  }

}

function displayCategories(categories) {

  categories.forEach((el) => {

    let section = document.getElementsByClassName('category flex flex-col md:flex-row justify-center items-center gap-[23px] my-[32px]')

    section[0].innerHTML += `
    <button id=id-${el.category_id} onclick="categoriesVideo(${el.category_id})" class="btn btn-sm">${el.category}</button>
    `
  })

}

function categoriesVideo(id) {
  loadingOn();
  const url = `https://openapi.programming-hero.com/api/phero-tube/category/${id}`

  fetch(url).then(res => res.json()).then(data => {

    removeActiveBtns();

    let activeBtn = document.getElementById(`id-${id}`);
    activeBtn.classList.add('bg-[#FF1F3D]', 'text-white', 'active')
    displayVideos(data.category)
  })
}

function loadVideos(title = '') {
  loadingOn();
  fetch(`https://openapi.programming-hero.com/api/phero-tube/videos?title=${title}`)
    .then(res => res.json())
    .then(data => {

      removeActiveBtns();
      // code here
      let activeBtn = document.getElementById("all");
      activeBtn.classList.add('bg-[#FF1F3D]', 'text-white', 'active');

      displayVideos(data.videos)
    })
}

function displayVideos(videos) {

  let cardConatiner = document.getElementsByClassName('grid grid-cols-4 gap-[24px]')
  cardConatiner[0].innerHTML = ``;

  if (!videos.length) {
    noContainShow("noContent");
    loadingOff();
    return;
  }
  noContainShow("Content");
  videos.forEach(el => {
    loadingOff();
    cardConatiner[0].innerHTML += `
    <div class="card bg-base-100 p-0">
          <figure class="">
            <img
              src=${el.thumbnail}
              alt="Shoes"
              class="rounded-xl w-full h-[200px] object-cover" />
          </figure>
          <div class="p-0 pt-[20px] flex gap-[12px]">
            <!-- image -->
            <div class="avatar size-[40px]">
              <div
                class="ring-primary ring-offset-base-100 w-24 rounded-full ring ring-offset-2">
                <img
                  class="w-full"
                  src= ${el.authors[0].profile_picture}
                   />
              </div>
            </div>
            <!-- description -->
            <div class="space-y-[8px]">
              <h1 class="font-bold text-base">
                ${el.title}
              </h1>
              <div class="flex justify-start items-center gap-[7px]">
                <h3 class="text-[14px] text-[#17171770]">${el.authors[0].profile_name}</h3>
                ${el.authors[0].verified === true ?
        `
                  <img
                  class="size-[20px]"
                  src="https://img.icons8.com/?size=100&id=SRJUuaAShjVD&format=png&color=000000"
                  alt="" />`: ``}
              </div>
              <h3 class="text-[14px] text-[#17171770]">${el.others.views}</h3>
            </div>
          </div>
          <div>
          <button id=${el.video_id} onclick="loadVideoDetails('${el.video_id}')" class="btn p-0 w-full mt-[10px] mb-[15px]">Details</button>
          </div>
        </div>
    `

  })

}

function loadVideoDetails(id) {
  loadingOn();
  // console.log(id);
  fetch(`https://openapi.programming-hero.com/api/phero-tube/video/${id}`)
    .then(res => res.json())
    .then(data => loadDetailsModal(data.video));
}

function loadDetailsModal(video) {
  // console.log(video);
  let modal = document.getElementById('my_modal_1')
  loadingOff();
  modal.showModal();
  modal.innerHTML += `
          <div class="modal-box">
            <h3 class="text-lg font-bold">${video.title}</h3>
            <p class="py-4">${video.description}</p>
            <div class="modal-action">
              <form method="dialog">
                <!-- if there is a button in form, it will close the modal -->
                <button class="btn">Close</button>
              </form>
            </div>
          </div>
  `

}

document.getElementById('search-input').addEventListener('keyup', (el) => {
  loadingOn();
  loadVideos(el.target.value);
})


function noContainShow(todo) {
  if (todo === "noContent") {

    document.getElementsByClassName('flex flex-col items-center justify-center mt-[100px]')[0].classList.remove('hidden');
  }
  else {
    document.getElementsByClassName('flex flex-col items-center justify-center mt-[100px]')[0].classList.add('hidden');
  }
}

loadCategory();
// noContainShow();



// "category_id": "1001",
// "video_id": "aaaa",
// "thumbnail": "https://i.ibb.co/L1b6xSq/shape.jpg",
// "title": "Shape of You",
// "authors": [
// {
// "profile_picture": "https://i.ibb.co/D9wWRM6/olivia.jpg",
// "profile_name": "Olivia Mitchell",
// "verified": ""
// }
// ],
// "others": {
// "views": "100K",
// "posted_date": "16278"
// },
// "description": "Dive into the rhythm of 'Shape of You,' a captivating track that blends pop sensibilities with vibrant beats. Created by Olivia Mitchell, this song has already gained 100K views since its release. With its infectious melody and heartfelt lyrics, 'Shape of You' is perfect for fans looking for an uplifting musical experience. Let the music take over as Olivia's vocal prowess and unique style create a memorable listening journey."
