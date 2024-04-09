//use the getElementById method to get access to the div with a id name films where the list of movie is to go on your website

let movieList = document.getElementById('films');

//Create a variable containing an empty array where the fetched data from  the json is going to be stored

        let movieData = [];

//Create a function with a function name and the purpose of the function is to retrive data from json and store the data in your arrat movieData        
        
        function fetchData() {

//Now make a network request using the fetch method to get the data from the json file and store the data in your variable created as movieData

            fetch('db.json')

//Use .then method to get the response converted to json format 

                .then(response => response.json())

//Then using .then method get the data in json format stored to your variable movieData so that you will be able to work with in your js file                
                .then(data =>{
                    movieData = data.films
                    displayData()})

        }


//Use function displayData  and the purpose of the function is to display the data in the html file also add foreach so that the data will be displayed in the html for every movie

        function displayData() {
            movieData.forEach(movie => {
                let li = MovieDataList(movie);
                movieList.appendChild(li);
            });
        }

 //Use the function MovieDataList and the purpose of the function is to display the data in list form inside our html file

        function MovieDataList(movie) {
            const li = document.createElement('li');
            li.textContent = movie.title;
            li.dataset.movieId = movie.id;
            li.classList.add('film', 'item');
            li.addEventListener('click', () => updateDetails(movie.id));
            return li;
        }

 //The purpose of the function updateDetails is to update the details of the movie when the user clicks  on the movie

        function updateDetails(movieId) {
            let movie = movieData.find(i => i.id === movieId);
            if (!movie) return;

//This will calculate the number of the tickets remaining when the user views the movie

            let availableTickets = movie.capacity - movie.tickets_sold;

            let buyButton = document.getElementById('buy-ticket');

//Whhen the user click on the movie, the buy button will be displayed and the text will be changed to buy ticket but if the tickets are sold out, the text will be changed to sold out

            buyButton.textContent = availableTickets > 0 ? 'Buy Ticket' : 'Sold Out';

            buyButton.classList.toggle('disabled', availableTickets === 0);
            buyButton.onclick = () => {
                if (availableTickets > 0) {
                    purchaseTicket(movie);
                }
            };

            displayMovieDetails(movie);
        }

//This function will be used to purchase the ticket and update the ticket count and gives the details of the movie

        function purchaseTicket(movie) {
            movie.tickets_sold++;
            updateTicketCount(movie.id);
            updateDetails(movie.id);
        }

//Function to update the ticket count and display the movie details

        function updateTicketCount(movieId) {
            const movie = movieData.find(m => m.id === movieId);
            const availableTickets = movie.capacity - movie.tickets_sold;
            document.getElementById('ticket-num').textContent = availableTickets;
        }

//Function to display the in formation details foreach movie  

        function displayMovieDetails(movie) {
            document.getElementById('title').textContent = movie.title;
            document.getElementById('runtime').textContent = `${movie.runtime} minutes;`
            document.getElementById('film-info').textContent = movie.description;
            document.getElementById('showtime').textContent = movie.showtime;
            document.getElementById('poster').src = movie.poster;
            document.getElementById('poster').alt = `Poster for ${movie.title};`
            updateTicketCount(movie.id)
        }

        console.log( fetchData());