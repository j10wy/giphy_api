// Create the giphy object
var giphy = {};

// Store the default set of movies
giphy.movies = ["Wayne's World", "The Dark Knight", "Big Trouble in Little China", "The Empire Strikes Back", "The Matrix", "Guardians of the Galaxy", "Harlem Nights", "The Godfather", "Pulp Fiction", "Pee-Wee's Big Adventure", "Fight Club", "12 Monkeys", "Back to the Future", "Ferris Bueller", "Army of Darkness", "Slumdog Millionare", "Nacho Libre", "Die Hard", "The Fifth Element"];

// An array of classes to add to the buttons
giphy.buttonClasses = ["bttn-minimal", "bttn-xs"];

// The method to initialize the content of the jumbotron area
giphy.initializePage = function (movies) {

	// Store a reference of the jumbotron in a variable with the same name
	var jumbotron = $("#jumbotron");

	// Create the h1 for the title and add a line break
	var h1 = document.createElement("h1"),
		br = document.createElement("br");
	h1.innerText = "Choose a movie!";

	jumbotron.append(h1);
	jumbotron.append(br);

	// Loop through the default movies array using jQuery forEach method
	giphy.movies.forEach(function (movie) {
		var a = document.createElement("a");
		a.setAttribute("data-movie", movie);
		a.innerText = movie;
		a.classList.add(...giphy.buttonClasses);
		jumbotron.append(a);
	});

	// Add the input area
	jumbotron.append(`
		<div class="input-group">
			<input type="text" class="form-control" placeholder="Add a movie.." aria-describedby="basic-addon2">
			<span class="input-group-addon bttn-success bttn-material-flat" id="basic-addon2">ADD MOVIE</span>
  		</div>
	`);
};

// Wrap the $.ajax in the getMovie method
giphy.getMovie = function (movie) {
	$.ajax({
			// ajax settings
			url: "http://api.giphy.com/v1/gifs/search",
			data: {
				api_key: "6039e9a9db5140b8b08b727c3e8bd933",
				q: movie,
				rating: "PG-13",
				fmt: "json",
				limit: 10
			}
		})
		.done(function (response) {
			// call the updateGiphyArea method passing the response from the giphy API
			giphy.updateGiphyArea(response);
		});
}

// The updateGiphyArea method works as such:
// 1. empty the div containing the img elements
// 2. The data object of the response is an array containing all of the giphy data for the gif. Loop through the array with forEach
// 3. create a new dic with a bootsrap's .col- classes
// 4. create an img element, store the .gif's still frame, add a click handler and append to the new div
// 5. Finally append the new div with the image to div.giphyArea
giphy.updateGiphyArea = function (movieResponse) {
	$(".giphyArea").empty();
	var responseData = movieResponse.data;
	console.log(responseData)
	responseData.forEach(function (gif) {
		var divColXs12 = $("<div>").addClass("col-xs-12 col-md-4");
		var img = $("<img>")
			.attr("src", gif.images.fixed_height_still.url)
			.on("click", function (event) {
				$(this).attr("src", gif.images.fixed_height.url);
			});
		divColXs12.append(img);
		$(".giphyArea").append(divColXs12);
	});
}

// Run the initializePage method to load the page content
giphy.initializePage(giphy.movies);

// The click handler for all of the buttons in the div.jumbotron that calls the getMovie which sends the data-movie's value as an argument
$(".bttn-xs").on("click", function (event) {
	event.preventDefault();
	var movie = $(this).data().movie;
	giphy.getMovie(movie);
});