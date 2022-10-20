
let active = false;

const addSlider = (div, slider) => {

	const button = document.querySelector('div#title-container #subscribe-button');
	if (button) {
		slider.click();
		button.parentNode.insertBefore(div, button);
	} else {
		setTimeout(() => addSlider(div, slider), 500);
	}
}

const hideShorts = () => {
	const all = document.querySelectorAll('ytd-grid-video-renderer');
	console.log(all.length);
	for ( var i = 0; i < all.length; i++) {
		const c = all[i].querySelector('a#thumbnail');
		const href = c.getAttribute('href');
		if (href.includes('shorts')) {
			all[i].style.display = all[i].style.display === 'none' ? 'block' : 'none';
		}
	}
};


const div = document.createElement('div');
div.style.display = "flex";
div.style.gap = '10px';
div.style.alignItems = 'center';
const p = document.createElement('p');
p.innerText = 'Hide Shorts';
p.style.fontSize = '1.6rem';
p.style.lineHeight = '100%';
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
});

addSlider(div, span);

// Decided to use interval cause more videos might be loaded on scroll
setInterval(() => {
	const all = document.querySelectorAll('ytd-grid-video-renderer');
	for ( var i = 0; i < all.length; i++) {
		const c = all[i].querySelector('a#thumbnail');
		const href = c.getAttribute('href');
		if (href.includes('shorts')) {
			all[i].style.display = active ? 'none' : 'block';
		}
	}
}, 1000);
