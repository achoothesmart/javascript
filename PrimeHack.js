document.querySelectorAll('._2hMXwV') // master
document.querySelectorAll('.av-beard-title-link') // title
document.querySelectorAll('.dv-grid-beard-info') // info (IMBb, Year)



// first run

var movie_list = [];

document.querySelectorAll('._2hMXwV').forEach(movie => {
    let title = movie.querySelector('.av-beard-title-link').innerText;
    let imdb = -1;
    movie.querySelector('.dv-grid-beard-info').querySelectorAll('span').forEach(info => {
        if(info.innerText.indexOf('IMDb')>=0){
            try{
                imdb = Number.parseFloat(info.innerText.split(' ')[1]);
            }
            catch{
                imdb = 0;
            }
        }
    });
    // console.log(title, imdb);
    if(imdb >= 0){
        movie_list.push({title: title, imdb: imdb});
    }
});

// Query

movie_list.filter(movie => {
    return movie.imdb >= 8.5;
});


// 

let vid2 = document.querySelectorAll('video')[1];
vid2.addEventListener('play', ()=>{
    vid2.currentTime = vid2.duration; vid2.play();
});
