import '@scss/master.scss';
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

	body.insertAdjacentHTML(
		'beforeend',
		`<p class="bottom-text">
			Lorem ipsum dolor sit amet, consectetur adipisicing elit. Expedita, quia reprehenderit. 
			Dignissimos dolores error harum laboriosam libero pariatur quae quas rem vel voluptates. 
			Eius error eveniet minus necessitatibus sed. Error.
		</p>`
	);
}
