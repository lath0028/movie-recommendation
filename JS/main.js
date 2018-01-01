                    //search ->basdeurl + "search/movie?api_key"=<KEY>&query=<search words>
                    //recommended ->baseurl + "movie/" + <movie_id> "recommendations?api_key=" +<KEY> ++ "&language=en=US"
                    let app = {
                        


                        URL: 'https://api.themoviedb.org./3/',
                        imgURL: 'http://image.tmdb.org/t/p/w500',
                        init: function () {
                            //focus on the text field 
                            let input = document.getElementById('search-input');
                            input.focus();

                            setTimeout(app.addHandlers, 1234);
                        },
                        addHandlers: function () {
                            //add the click listener
                            let btn = document.getElementById('search-button');
                            let back = document.getElementById('back-button');
                            btn.addEventListener('click', app.runSearch);
                            back.addEventListener('click', app.goToBack);
                            //add a listener for <ENTER>
                            document.addEventListener('keypress', function (ev) {
                                let char = ev.char || ev.charCode || ev.which;
                                let str = String.fromCharCode(char);
                                console.log(char, str);
                                //a
                                if (char == 10 || char == 13) {
                                    //we have enter or return key
                                    btn.dispatchEvent(new MouseEvent('click'));
                                }
                            });
                        },
                        
                        
                        goToBack(){
                            console.log('back');
                            window.location.reload(true);
                        },
                        runSearch: function (ev) {
                            //do  the fetch to get the list of movies

//                            console.log(ev.type);
                            ev.preventDefault();
                            //let page=1;
                            let input = document.getElementById('search-input');
                            if (input.value) {
                                //code will not run if the value is an empty string
                                // let url=app.URL + "search /movie?api_key=" + KEY + "&query=" + input.value;
                                //input.value + "&page" + page;
                                let url = `${app.URL}search/movie?api_key=${KEY}&query=${input.value}`; //same as above line of url
                                let url_data = new Request(url, {
                                method: 'GET',
                                mode: 'cors'
                                });
                                fetch(url_data)

                                    .then(response => response.json())
                                    .then(data => {
                                        console.log(data);
                                        app.showMovies(data);
                                    })
                                    .catch(err => {
                                        console.log(err);
                                    })
                            }
                        },
//                          <div class="movie">
//                        <img src="img/" alt="poster" class="poster"/>
//                        <h2 class="movie-title">Movie title</h2>
//                        <p class="movie-desc">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quas sequi ad molestiae enim delectus voluptate modi recusandae itaque. Suscipit iste repudiandae eligendi minima odio iusto dolorum, cum magni totam, odit.</p>
//                    </div>
                        showMovies: function (movies) {
                            let container = document.querySelector('#search-results .content');
                                      
                            let df = document.createDocumentFragment();
                            movies.innerHTML = "";
                            movies.results.forEach(function (movie) {
                                let div = document.createElement('div');
                                div.classList.add('movie');
                                
                                  div.setAttribute('id', movie.id);
                                let img = document.createElement('img');
                                img.setAttribute('src',app.imgURL+movie.poster_path);
                                div.appendChild(img);
                                img.classList.add('poster');
                                
                                let h2 = document.createElement('h2');
                                h2.textContent=movie.title;
                                h2.classList.add('movie-title');
                                div.appendChild(h2);
                                
                                    let p = document.createElement('p');
                                p.textContent=movie.overview;
                                p.classList.add('movie-desc');
                                div.appendChild(p);
                                //ad click listener for getting recommended movies
                                df.appendChild(div);
                                div.addEventListener('click',app.getRecommended)
                            });
                            container.appendChild(df);
                        },
                        getRecommended: function (ev) {
                            let movieId=ev.currentTarget.getAttribute('id');
                            console.log(movieId);
                            let url = `${app.URL}movie/${movieId}/recommendations?api_key=${KEY}&language=en=US`; 

                               fetch(url)

                                    .then(response => response.json())
                                    .then(data => {
                                        console.log(data);
                                        app.showRecommended(data);
                                    })
                                    .catch(err => {
                                        console.log(err);
                                    })
                        },
                        showRecommended(movies){
                             document.getElementById('search-results').classList.remove('active');
            document.getElementById('recommend-results').classList.add('active');
                            let container = document.querySelector('#recommend-results .content');   
                            let df = document.createDocumentFragment();
                            movies.innerHTML = "";
                            movies.results.forEach(function (movie) {
                                let div = document.createElement('div');
                                div.classList.add('movie');
                                  div.setAttribute('id', movie.id);
                                let img = document.createElement('img');
                                img.setAttribute('src',app.imgURL+movie.poster_path);
                                div.appendChild(img);
                                img.classList.add('poster');
                                let h2 = document.createElement('h2');
                                h2.textContent=movie.title;
                                h2.classList.add('movie-title');
                                div.appendChild(h2);
                                    let p = document.createElement('p');
                                p.textContent=movie.overview;
                                p.classList.add('movie-desc');
                                div.appendChild(p);
                                //ad click listener for getting recommended movies
                                df.appendChild(div);
                                div.addEventListener('click',app.getRecommended)
                            });
                            container.appendChild(df);
                            
                        }
                    };


                    document.addEventListener('DOMContentLoaded', app.init);
                    //DOMContentLoaded listener
                    //get image config info with fetch
                    //autofocus on text field


                    //click listener on search butoon


                    // keypress listener for enter






                    //both click and enter call search function 

                    // Do a fetch call to run the search 

                    // handle the result - build a list of movies

                    // new movie content has click listener
                    //click movie to do a fetch call for recommended
                    //with recommened redsults back
                    //navigate to recomend page
                    //build and display the list of movie recommendations`