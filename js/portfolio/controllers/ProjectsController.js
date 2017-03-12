app.controller("ProjectsController", ["$scope", function($scope){
	$scope.projects = [
		{
			title: "Portfolio",
			description: "This website is the first project I've taken on, at least on the Web Development front. It is designed with simplicity in mind following most of the concepts I have learned on Codecademy's HTML, CSS, SASS, and AngularJS tracks.",
			button: {
				text: "Go to Main Page",
				classes: "btn",
				href: "../index.html"
			},
			icons: [
				"devicon-html5-plain-wordmark",
				"devicon-bootstrap-plain-wordmark",
				"devicon-css3-plain-wordmark",
				"devicon-sass-original",
				"devicon-angularjs-plain"
			],
			footer: "Made by: Mauricio Páez - Pittsburgh, 2017"
		},
		{
			title: "Adventure Game",
			description: "This game is in the vein of vintage 1980's text-based adventures. This one in particular is an adaptation of Edgar Allan Poe's \"Murders in the Rue Morgue\"",
			button: {
				text: "Start Game",
				classes: "btn",
				href: "/pages/adventure-game.html"
			},
			icons: [
				"devicon-html5-plain-wordmark",
				"devicon-css3-plain-wordmark",
				"devicon-sass-original",
				"devicon-javascript-plain",
				"devicon-jquery-plain-wordmark"
			],
			footer: "Original text by: Edgar Allan Poe - Adated by: Elizabeth Páez - Made by: Mauricio Páez - Pittsburgh 2017"
		},
		{
			title: "Banking Application",
			description: "A simple banking application. Please bank with us- No fees, no nonsense. All your moneis are belong to us! Coming soon.",
			button: {
				text: "Start Banking",
				classes: "btn disabled",
				href: "#"
			},
			buttonText: "Start Banking",
			icons: [
				"devicon-html5-plain-wordmark",
				"devicon-css3-plain-wordmark",
				"devicon-sass-original",
				"devicon-angularjs-plain",
				"fa fa-database"
			],
			footer: "Made by: Mauricio Páez - Pittsburgh 2017"
		}
	];
}]);