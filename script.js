
let active = false;

const moveSearchBar = () => {
	const searchBar = document.querySelector('ytd-masthead#masthead #container #center ytd-searchbox#search');
	const innerSearchBar = document.querySelector('ytd-masthead#masthead #container #center ytd-searchbox#search #search-form #container');
	if (searchBar && innerSearchBar) {
		searchBar.style.marginLeft = '0';
		innerSearchBar.style.marginLeft = '0';
	} else {
		setTimeout(moveSearchBar(), 500);
	}
}

const addSlider = (div, slider) => {

	const endOfMastHead = document.querySelector('ytd-masthead#masthead #container #end #buttons');
	if (endOfMastHead) {
		endOfMastHead.parentNode.insertBefore(div, endOfMastHead);
		// Move searchbar a little to the left to allow for the slider
		moveSearchBar();
	} else {
		setTimeout(() => addSlider(div, slider), 500);
	}
}

const div = document.createElement('div');
div.style.display = "flex";
div.style.gap = '10px';
div.style.alignItems = 'center';
div.style.padding = "0 10px 0 20px";
const p = document.createElement('p');
p.innerText = 'Hide Shorts';
p.style.fontSize = '1.3rem';
p.style.lineHeight = '100%';
p.style.color = '#eee';
const label = document.createElement('label');
label.classList.add('switch');
const input = document.createElement('input');
input.type = 'checkbox';
const span = document.createElement('span');
span.classList.add('slider');
label.appendChild(input);
label.appendChild(span);
div.appendChild(p);
div.appendChild(label);

span.addEventListener('click', () => {
  active = !active;
  localStorage['hide-yt-shorts'] = active;
});

if (localStorage['hide-yt-shorts'] === 'true') {
	span.click();
};

addSlider(div, span);

const setVisibility = (el) => {
	el.style.display = active ? 'none' : 'block';
}
const toggleReelRenderers = () => {
	const shortsPanels = document.querySelectorAll('#contents ytd-reel-shelf-renderer');
	for (const panel of shortsPanels) {
		const title = panel.querySelector('#title-container #title');
		if (title?.innerText.toLowerCase().includes('shorts')) {
			setVisibility(panel);
		}
	}
}

const hideShortsOnSubFeed = () => {
	const all = document.querySelectorAll('ytd-rich-item-renderer');
	for (const renderer of all) {
		const c = renderer.querySelector('a#thumbnail');
		const href = c?.getAttribute('href');
		if (href && href.includes('shorts')) {
			setVisibility(renderer);
		}
	}
}
const hideShortsOnSearchPage = () => {
	toggleReelRenderers();
	const renderers = document.querySelectorAll('#contents #contents ytd-video-renderer');
	for (const renderer of renderers) {
		const c = renderer.querySelector('a#thumbnail');
		const href = c?.getAttribute('href');
		if (href?.includes('shorts')) {
			setVisibility(renderer);
		}
	}
}
const hideShortsOnHomeFeed = () => {
	const renderers = document.querySelectorAll('ytd-rich-section-renderer');
	for (const renderer of renderers) {
		const title = renderer.querySelector('#contents #rich-shelf-header #title-container #title');
		if (title?.innerText.toLowerCase().includes('shorts')) {
			setVisibility(renderer);
		}
	}
}
const hideShortsOnWatchPage = () => {
	toggleReelRenderers();
}

setInterval(() => {
	if (window.location.pathname === '/feed/subscriptions') {
		hideShortsOnSubFeed();
	} else if (window.location.href.includes('results?search_query=')) {
		hideShortsOnSearchPage();
	} else if (window.location.pathname === '/') {
		hideShortsOnHomeFeed();
	} else if (window.location.pathname === '/watch') {
		hideShortsOnWatchPage();
	}
}, 1000);

