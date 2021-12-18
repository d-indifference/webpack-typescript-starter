import '@css/master.css';
import icon from './img/wepback.png';

const title: HTMLElement | null = document.querySelector('.title');

if (title) {
	title.innerText = 'Your starter template was successfully set up!';
}

const body: HTMLElement | null = document.querySelector('body');

if (body) {
	body.insertAdjacentHTML(
		'beforeend',
		'<p>Now you can create your awesome application!</p>'
	);

	body.insertAdjacentHTML('beforeend', `<img src="${icon}" alt="icon"/>`);
}
