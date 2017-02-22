// Global Game variables
var step_count = 0;
var error_count = 0;
var solve_attempts = 0;
var running_game = false;
var current_location = "";
var current_task = "";
var completed_tasks = [];

// Function to append text
// 		html_to_append: a pre-formatted HTML string.
var append_text = function(html_to_append) {
	$(".game-content").append("<p class=\"valid-command\"><em>" + $(".user-input").val() + "</em></p>" + html_to_append);
	// On click, it should scroll to have the new text at the top of the page
	// $('html, body').animate({
 //        scrollTop: $("#elementtoScrollToID").offset().top
 //    }, 2000);
	$(".user-input").val("");
	step_count++;
};

// Game starting function
var start = function(){
	if (!running_game) {
		running_game = true;
		$(".welcome-text").hide();
		append_text(introduction);
	} else {
		alert(start_warning);
	}
};

// This deals with multiple consecutive errors, remind user what options are
var error_handle = function(){
	error_count++;
	$(".game-content").append(general_error);
	if (error_count >= 3) {
		if (!running_game) {
			append_text(guide_text_start);
		} else {
			append_text(guide_text_game);
		}
		error_count = 0;
	}
};

// This checks if all clues have been gathered
var test_solve = function(){
	if (completed_tasks.length === 16) {
		// Fill in code for this task
		// append_text(not_enough_clues);
	} else {
		append_text(not_enough_clues);
		solve_attempts++;
	}
};

// Function to parse input from user
var parse_input = function(){
	// Function Variables
	var input_string = "";
	var action = "";
	var world_item = "";

	/*RegEx variables
	-------------------------------------------*/
	// Items
	var house = /house/g;
	var street = /(?=.*\bstreet\b).+/g;
	var neigborhood = /(?=.*\bneighborhood\b)/g;
	var outside = /(?=\boutside\b)/g;
	var inside = /(?=.*\bin\b)|(?=.*\binside\b)/g;
	var victims = /(?=.*\bvictims\b)/g;
	var bodies = /(?=.*\bbodies\b)/g;
	var old_woman = /(?=.*\bold woman\b)|(?=.*\bl.espanaye\b)/g;
	var daughter = /(?=.*\bdaughter\b)/g;
	var papers = /(?=.*\bpapers\b)/g;
	var box = /(?=.*\bbox\b)/g;
	var knife = /(?=.*\bknife\b)/g;
	var gray_hairs = /(?=.*\bhairs\b)/g;
	var gold = /(?=.*\bgold\b)/g;
	var earring = /(?=.*\bearring.\b)/g;
	var silver = /(?=.*\bsilver\b)/g;
	var clothes = /(?=.*\bclothes\b)/g;
	var lightning_rod = /(?=.*\brod\b)/g;
	var police = /(?=.*\bpolice\b)|(?=.*\bpoliceman\b)/g;
	var witness = /(?=.*\bwitnes.+\b)/g;
	var acquaintance = /(?=.*\bacquaintance\b)|(?=.*\bacquaintances\b)/g;
	var neighbor = /(?=.*\bneighbor+\b)/g;
	var people = /(?=.*\bpeople\b)/g;
	var passerby = /(?=.*\bpassersby\b)|(?=.*\bpasserby\b)/g;
	var escape = /(?=.*\bescape\b)|(?=.*\broute\b)/g;
	var door = /(?=.*\bdoor\b)/g;
	var chimney = /(?=.*\bchimney\b)|(?=.*\bfireplace\b)/g;
	var windows = /(?=\bwindow\b)|(?=\bwindows\b)/g;
	var hidden = /(?=.*\bhidden\b)/g;

	// Actions
	var go_to = /^go .+$/g;
	var look_around = /^look around .+$/g;
	var look_at = /^look at .+$/g;
	var inspect = /^inspect .+$/g;
	var examine = /^examine .+$/g;
	var talk_to = /^talk to .+$/g;
	var look_for = /^look for .+$/g;
	var interview = /^interview .+$/g;
	var solve = /^solve.+$/g;

	// Clean input a bit
	input_string = $(".user-input").val().toLowerCase();
	input_string.replace(/\s+/g, ' ').trim(); //Delete any extra spaces in between and possibly before/after

	if (running_game) {
		// Parse through text to create object to be returned
		switch (input_string) {

			// Go to Action
			case (go_to.test(input_string) ? input_string : ""):
				world_item = input_string.substring(3);
				switch (world_item) {
					case (house.test(world_item) ? world_item : ""):
					case (street.test(world_item) ? world_item : ""):
					case (neigborhood.test(world_item) ? world_item : ""):
						current_location = "street";
						append_text(house_html.start_text);
						break;
					case (outside.test(world_item) ? world_item : ""):
						if (current_location === "apartment") {
							current_location = "street";
							append_text(going_outside);
						} else {
							append_text(already_outside);
						}
						break;
					case (inside.test(world_item) ? world_item : ""):
						current_location = "apartment";
						append_text(apartment_html.start_text);
						break;
					default:
						append_text(go_to_error);
						error_handle();
						break;
				}
				break;

			// Look At and Inspect Action
			case (look_at.test(input_string) ? input_string : ""):
			case (inspect.test(input_string) ? input_string : ""):
			case (examine.test(input_string) ? input_string : ""):
				world_item = input_string.substring(8);
				switch (world_item) {
					case (victims.test(world_item) ? world_item : ""):
					case (bodies.test(world_item) ? world_item : ""):
						if (current_location === "apartment") {
							append_text(scene_html.start_text);
						} else {
							append_text(location_error);
							error_handle();
						}
						break;
					case (old_woman.test(world_item) ? world_item : ""):
						if (current_location === "apartment") {
							append_text(scene_html.old_woman);
							if (completed_tasks.indexOf("old woman") === -1) {
								completed_tasks.push("old woman");
							}
						} else {
							append_text(location_error);
							error_handle();
						}
						break;
					case (daughter.test(world_item) ? world_item : ""):
						if (current_location === "apartment") {
							append_text(scene_html.daughter);
							if (completed_tasks.indexOf("daughter") === -1) {
								completed_tasks.push("daughter");
							}
						} else {
							append_text(location_error);
							error_handle();
						}
						break;
					case (papers.test(world_item) ? world_item : ""):
					case (box.test(world_item) ? world_item : ""):
						if (current_location === "apartment") {
							append_text(valuables_html.papers);
							if (completed_tasks.indexOf("papers") === -1) {
								completed_tasks.push("papers");
							}
						} else {
							append_text(location_error);
							error_handle();
						}
						break;
					case (knife.test(world_item) ? world_item : ""):
						if (current_location === "apartment") {
							append_text(valuables_html.knife);
							if (completed_tasks.indexOf("knife") === -1) {
								completed_tasks.push("knife");
							}
						} else {
							append_text(location_error);
							error_handle();
						}
						break;
					case (gray_hairs.test(world_item) ? world_item : ""):
						if (current_location === "apartment") {
							append_text(valuables_html.hairs);
							if (completed_tasks.indexOf("hairs") === -1) {
								completed_tasks.push("hairs");
							}
						} else {
							append_text(location_error);
							error_handle();
						}
						break;
					case (gold.test(world_item) ? world_item : ""):
					case (earring.test(world_item) ? world_item : ""):
					case (silver.test(world_item) ? world_item : ""):
						if (current_location === "apartment") {
							append_text(valuables_html.expensive);
							if (completed_tasks.indexOf("expensive") === -1) {
								completed_tasks.push("expensive");
							}
						} else {
							append_text(location_error);
							error_handle();
						}
						break;
					case (clothes.test(world_item) ? world_item : ""):
						if (current_location === "apartment") {
							append_text(valuables_html.clothes);
							if (completed_tasks.indexOf("clothes") === -1) {
								completed_tasks.push("clothes");
							}
						} else {
							append_text(location_error);
							error_handle();
						}
						break;
					case (lightning_rod.test(world_item) ? world_item : ""):
						if (current_location === "street") {
							append_text(street_html.rod);
							if (completed_tasks.indexOf("rod") === -1) {
								completed_tasks.push("rod");
							}
						} else {	
							append_text(location_error);
							error_handle();
						}
						break;
					case (windows.test(world_item) ? world_item : ""):
						if (current_location === "apartment") {
							if (current_task === "escape") {
								if (hidden.test(world_item) ? world_item : "") {
									append_text(escape_html.hidden_window);
									if (completed_tasks.indexOf("window2") === -1) {
										completed_tasks.push("window2");
									}
								} else {
									append_text(escape_html.visible_window);
									if (completed_tasks.indexOf("window1") === -1) {
										completed_tasks.push("window1");
									}
								}
							} else {
								append_text(task_error);
								error_handle();
							}
						} else {
							append_text(location_error);
							error_handle();
						}
						break;
					case (door.test(world_item) ? world_item : ""):
						if (current_location === "apartment") {
							if (current_task === "escape") {
								append_text(escape_html.door);
								if (completed_tasks.indexOf("door") === -1) {
									completed_tasks.push("door");
								}
							} else {
								append_text(task_error);
								error_handle();
							}
						} else {	
							append_text(location_error);
							error_handle();
						}
						break;
					case (chimney.test(world_item) ? world_item : ""):
						if (current_location === "apartment") {
							if (current_task === "escape") {
								append_text(escape_html.chimney);
								if (completed_tasks.indexOf("chimney") === -1) {
									completed_tasks.push("chimney");
								}
							} else {
								append_text(task_error);
								error_handle();
							}
						} else {	
							append_text(location_error);
							error_handle();
						}
						break;
					default:
							append_text(look_at_error);
							error_handle();
						break;
				}
				break;

			// Talk to Action
			case (talk_to.test(input_string) ? input_string : ""):
			case (interview.test(world_item) ? world_item : ""):
				world_item = input_string.substring(8);
				switch (world_item) {
					case (witness.test(world_item) ? world_item : ""):
					case (people.test(world_item) ? world_item : ""):
						if (current_location === "street") {
							append_text(interviews_html.start_text);
							current_location = "witness"
							// The above var needs to be refactored to current task
							// for better game management
						} else {
							append_text(location_error);
							error_handle();
						}
						break;
					case (police.test(world_item) ? world_item : ""):
						if (current_location === "witness") {
							append_text(interviews_html.police);
							if (completed_tasks.indexOf("police") === -1) {
								completed_tasks.push("police");
							}
						} else {
							append_text(location_error);
							error_handle();
						}
						break;
					case (acquaintance.test(world_item) ? world_item : ""):
						if (current_location === "witness") {
							append_text(interviews_html.acquaintance);
							if (completed_tasks.indexOf("acquaintance") === -1) {
								completed_tasks.push("acquaintance");
							}
						} else {
							append_text(location_error);
							error_handle();
						}
						break;
					case (neighbor.test(world_item) ? world_item : ""):
						if (current_location === "witness") {
							append_text(interviews_html.neighbor);
							if (completed_tasks.indexOf("neighbor") === -1) {
								completed_tasks.push("neighbor");
							}
						} else {
							append_text(location_error);
							error_handle();
						}
						break;
					case (passerby.test(world_item) ? world_item : ""):
						if (current_location === "witness") {
							append_text(interviews_html.passerby);
							if (completed_tasks.indexOf("passerby") === -1) {
								completed_tasks.push("passerby");
							}
						} else {
							append_text(location_error);
							error_handle();
						}
						break;
					default:
						append_text(look_at_error);
						error_handle();
						break;
				}
				break;

			// Look for Action
			case (look_for.test(input_string) ? input_string : ""):
				world_item = input_string.substring(9);
				switch (world_item) {
					case (escape.test(world_item) ? world_item : ""):
						if (current_location === "apartment") {							
							append_text(escape_html.start_text);
							current_task = "escape"
						} else {
							append_text(location_error);
							error_handle();
						}
						break;
					default:
						append_text(look_at_error);
						error_handle();
						break;
				}

				break;
			//Look Around action
			case (look_around.test(input_string) ? input_string : ""):
				world_item = input_string.substring(12);
				switch (world_item) {
					case (neigborhood.test(world_item) ? world_item : ""):
						if (current_location === "street") {
							append_text(street_html.start_text);
						} else {
							append_text(location_error);
							error_handle();
						}
						break;
					default:
						append_text(look_around_error);
						error_handle();
						break;
				}
				break;

			case "start":
				step_count++;
				start();
				break;

			case (solve.test(input_string) ? solve : ""):
				current_task = "solve"

				break;

			// Annoying, trying-to-brake-game action
			default:
				if (current_task === "solve") {
					// Move forward without parsing the input.
					// append_text(look_around_error);
				} else {
					error_handle();
				}
				break;
		}
	} else {
		// Options for before starting game.
		switch (input_string) {
			case "start":
				step_count++;
				start();
				break;
			default: 
				error_handle();
				break;
		}
	}
};

var main_controller = function(){
	$(".user-input").on("keypress", function(e){
		if(e.keyCode === 13){
			parse_input();
		}
	});

	$(".user-button").click(parse_input);
};

$(document).ready(main_controller);