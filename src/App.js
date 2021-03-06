/**
 * Definition of the component for the body of the site's main webpage.
 */

import React from 'react';
import PersonCard from './PersonCard';
import ProjectCard from './ProjectCard';
import ContactRow from './ContactRow';
import DateEventList from './DateEventList';
import FlashItem from './FlashItem';
import XR_CONSTANTS from './XR_CONSTANTS'

function App() {

	// Function for getting the suffix of a date's day
	var getDateSuffix = function(num) {
		if (num > 3 && num < 21) {
			return 'th';
		} else if (num % 10 === 1) {
			return 'st';
		} else if (num % 10 === 2) {
			return 'nd';
		} else if (num % 10 === 3) {
			return 'rd';
		} else {
			return 'th';
		}
	}

	// Function for getting a day string the way I previously hardcoded it
	var getNiceDayDateString = function(date) {
		var str = date.toLocaleDateString('en-US', {weekday : 'long', month : 'long', day : 'numeric'});
		str += getDateSuffix(parseInt(str.match(/\d+$/g).sort((a,b) => b.length-a.length)[0])) + ', ' + (date.getYear() + 1900);
		return str;
	}

	// Group events by date
	var events_by_date = {};
	XR_CONSTANTS.EVENTS_INFORMATION.forEach(event => {
		if (events_by_date[event.date.valueOf()] == null) {
			events_by_date[event.date.valueOf()] = [];
		}
		events_by_date[event.date.valueOf()].push(event);
	});

	return (
		<div className="App">

			{/* Nav bar */}
			<nav>
				<div class="nav-wrapper" style={{'background-color': '#2d2d2d'}}>
					<a href="#" class="brand-logo center"></a>
					<ul class="right">
						<li><a href="#about">About</a></li>
						<li><a href="#events">Events</a></li>
						<li><a href="#leadership">Leadership</a></li>
						<li><a href="#projects">Projects</a></li>
					</ul>
				</div>
			</nav>

			{/* Banner */}
			<div class="section white-text" style={{'background-image' : 'linear-gradient(#2d2d2d, #3d3d3d)'}}>
				<div class="container">
					<div class="container center">
						<img src="xr_logo_white_small.png" style={{height : 135}}></img>
						<h4>Augmented and Virtual Reality Club</h4>
						<h6>University of Maryland, College Park</h6>
						<br/>
						<ContactRow/>
					</div>
				</div>
			</div>

			<ul class="collection" style={{margin : 0}}>

				{/* About */}
				<li class="collection-item">
					<div id="about" class="section scrollspy grey-text text-darken-3 container">
						<div class="container">
					
							{/* Flash Items */}
							<div class="row">
								<div class="col s12">
									{
										XR_CONSTANTS.FLASH_ITEMS.map(flash_item => {
											return <FlashItem {...flash_item}></FlashItem>
										})
									}
								</div>
							</div>

							{/* Blurb */}
							<h4>About</h4>
							<p>{XR_CONSTANTS.ABOUT_US_STR}</p><br/>
							
							{/* Video */}
							<div style={{'padding':'56.25% 0 0 0','position':'relative'}}>
								<iframe title="XR Terrestrial Video" src="https://player.vimeo.com/video/379079878?title=0&portrait=0" style={{'position':'absolute','top':'0','left':'0','width':'100%','height':'100%'}} frameborder="0" allow="autoplay; fullscreen" allowfullscreen></iframe>
							</div>
							<script src="https://player.vimeo.com/api/player.js"></script>
						</div>
					</div>
				</li>

				{/* Events */}
				<li class="collection-item">
					<div id="events" class="section scrollspy grey-text text-darken-3 container">
						<div class="container">
							<h4>Events</h4>
							<br/>
							<div class="row" style={{'padding' : '0em', 'margin' : '0em'}}>
								<div class="col s4"><b>Date</b></div>
								<div class="col s8"><b>Events</b></div>
							</div>
							<hr style={{'border' : '0px', 'border-top' : '1px solid #dddddd'}}/>
							{
								Object.values(events_by_date).map(events => {
									return (
										<div class="row valign-wrapper" style={{'padding' : '0em', 'margin' : '0em'}}>
											<div class="col s4">
												<b>{getNiceDayDateString(events[0].date)}</b><br/>
											</div>
											<div class="col s8">
												<DateEventList events={events}/>
											</div>
										</div>
									)
								})
							}
						</div>
					</div>
				</li>

				{/* Leadership */}
				<li class="collection-item">
					<div id="leadership" class="section scrollspy grey-text text-darken-3 container">
						<div class="container">
							<h4>Leadership</h4>
							<div class="row">
								{
									XR_CONSTANTS.LEADERSHIP_INFORMATION.map(person => {
										return <div class="col s12 l6 xl4"><PersonCard {...person}></PersonCard></div>
									})
								}
							</div>
						</div>
					</div>
				</li>

				{/* Projects */}
				<li class="collection-item">
					<div id="projects" class="section scrollspy white grey-text text-darken-3 container">
						<div class="container">
							<h4>Projects</h4>
							<div class="row">
								{
									XR_CONSTANTS.PROJECTS_INFORMATION.map(project => {
										return <div class="col s12 l6"><ProjectCard {...project}></ProjectCard></div>
									})
								}
							</div>
						</div>
					</div>
				</li>
			</ul>

			{/* Footer */}
			<footer class="page-footer" style={{'background-image' : 'linear-gradient(#2d2d2d, #3d3d3d)'}}>
				<div class="container center">
					<ContactRow/>
				</div>
				<div class="footer-copyright" style={{'background-color' : '#2d2d2d'}}>
				</div>
			</footer>
		</div> 
	);
}

export default App;
