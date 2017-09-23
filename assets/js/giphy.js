// Create the giphy object
var giphy = {};

// Store the default set of movies
giphy.movies = ["Akira", "Blade Runner", "The Matrix", "Sin City", "Ghost in the Shell", "Star Trek: Beyond", "The Fifth Element", "Mad Max: Fury Road", "Rogue One", "Ex Machina", "2001: A Spacee Odyssey", "Interstellar", "Tron: Legacy"];

// An array of classes to add to the buttons
giphy.buttonClasses = ["bttn-minimal", "bttn-xs"];

// The method to initialize the content of the jumbotron area
giphy.initializePage = function (movies) {

	// Store a reference of the jumbotron in a variable with the same name
	var jumbotron = $("#jumbotron");
	var movies = $("#movies");

	// Create the h1 for the title and add a line break
	var h1 = document.createElement("h1"),
		br = document.createElement("br");
	h1.innerText = "Choose a movie!";
	jumbotron.prepend(h1);
	jumbotron.prepend(br);

	// Loop through the default movies array using jQuery forEach method
	giphy.movies.forEach(giphy.createMovieItem);

	// Add the input area using es6 template strings so I can separate the code to multiple lines and not worry about whitespace.
	jumbotron.append(`
		<form id="movie-form">
			<div class="input-group">
				<input id="movie-input" type="text" class="form-control" placeholder="Enter a movie title...">
				<span id="submit-add" class="input-group-addon bttn-success bttn-material-flat"><button type="submit" class="glyphicon glyphicon-plus"></button></span>
			</div>
		</form>
	`);

	$("#submit-add").on("click", function (event) {
		event.preventDefault();
		var movieInputValue = $("#movie-input");
		giphy.createMovieItem(movieInputValue.val());
		movieInputValue.val("");
	});
	$("#movie-form").on("submit", function (event) {
		event.preventDefault();
		var movieInputValue = $("#movie-input");
		giphy.createMovieItem(movieInputValue.val());
		movieInputValue.val("");
	});
};

// Method to add a movie to a list. Used in the initializePage method and the click handler for $("#submit-add")
giphy.createMovieItem = function (movie) {
	// Create a new element, set the data attribute, add text and css classes
	var a = document.createElement("a");
	a.setAttribute("data-movie", movie);
	a.innerText = movie;
	a.classList.add(...giphy.buttonClasses);

	// The click handler for all of the buttons in the div.jumbotron that calls the getMovie which sends the data-movie's value as an argument
	a.addEventListener("click", function () {
		giphy.getMovie(movie);
	});

	// Append the list to div#movies
	movies.append(a);
}

// Wrap the $.ajax in the getMovie method
giphy.getMovie = function (movie) {
	$.ajax({
			// ajax settings
			url: "https://api.giphy.com/v1/gifs/search",
			data: {
				api_key: "6039e9a9db5140b8b08b727c3e8bd933",
				q: movie,
				rating: "pg-13",
				fmt: "json",
				limit: 9
			}
		})
		.done(function (response) {
			// call the updateGiphyArea method passing the response from the giphy API
			giphy.updateGiphyArea(response);
		});
}

giphy.updateGiphyArea = function (movieResponse) {
	// Empty the div containing the img elements
	$(".giphyArea").empty()

	// The data object of the response is an array containing all of the giphy data for the gif
	var responseData = movieResponse.data;
	console.log(responseData);

	// Loop through the array with forEach
	responseData.forEach(function (gif) {

		// Create a new dic with a bootsrap's .col- classes
		var divColXs12 = $("<div>").addClass("col-xs-12 col-md-4");

		// Create an img element, store the .gif's still frame, add a click handler and append to the new div
		var img = $("<img>")
			.attr("src", gif.images.fixed_height_still.url)
			.attr("data-state", "still")
			.on("click", function (event) {
				var state = $(this).attr("data-state");
				console.log("IMG STATE", state);

				if (state === 'still') {
					$(this).attr("src", gif.images.fixed_height.url).attr("data-state", "playing");
				} else if (state === 'playing') {
					$(this).attr("src", gif.images.fixed_height_still.url).attr("data-state", "still");
				} else {
					console.warn("OH NO! The .gif's click handler is broken...")
				}

			});

		var p = $("<p>").text(`Rating: ${gif.rating}`);

		// Append the new div with the image to div.giphyArea
		divColXs12.append(img);
		divColXs12.append(p);

		// Delay appending to the page. This causes the gifs to fade-in one after the other
		$(".giphyArea").delay(100).queue(function (next) {
			$(this).append(divColXs12);
			next();
		});



	});
}

// Run the initializePage method to load the page content
giphy.initializePage(giphy.movies);