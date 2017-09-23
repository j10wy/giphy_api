# Summary
I used some jQuery, mostly for the ajax calls, and creating/appending elements to the page.

I also used some es6 features within jQuery callbacks. 

[View on Github Pages](https://jeffreylowy.github.io/giphy_api/)

```javascript
	// Add the input area using es6 template strings so I can separate the code to multiple lines and not worry about whitespace.
	jumbotron.append(`
	<form id="movie-form">
		<div class="input-group"><input id="movie-input" type="text" class="form-control" placeholder="Enter a movie title...">
			<span id="submit-add" class="input-group-addon bttn-success bttn-material-flat">
				<button type="submit" class="glyphicon glyphicon-plus"></button>
			</span>
		</div>
	</form>`);

	//...

	var p = $("<p>").text(`Rating: ${gif.rating}`);
	divColXs12.append(p);
```

## Resources 

[$.queue()](https://stackoverflow.com/questions/11085567/jquery-delay-to-work-with-append)

[MDN: Spread syntax](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_operator)

[MDN: Element.classList](https://developer.mozilla.org/en-US/docs/Web/API/Element/classList)