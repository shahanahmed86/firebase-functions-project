const form = document.querySelector('.input-form form');
const modal = document.querySelector('.modal');

form.addEventListener('submit', async (ev) => {
	ev.preventDefault();
	const payload = {
		height: 0,
		age: 0,
		isVisitDisney: false,
		isVisitUniversal: false,
		isLikeFast: false,
		isLikeHeights: false,
		isLikeWet: false,
		isLikeSwimming: false,
		isLikeBeingScared: false,
		isLikeBeingUpsideDown: false,
		isOkWithDark: false,
		isLikeShow: false,
		isOkeWithSimulators: false,
		isLikeAnimals: false,
		isOkWithFlashing: false
	};
	Object.keys(payload).forEach((key) => {
		payload[key] = key === 'number' ? ev.target[key].value : ev.target[key].checked;
	});

	const addSurvey = await firebase.functions().httpsCallable('addSurvey');
	const getSnackBar = (message) => {
		modal.classList.add('open');
		modal.querySelector('.message').textContent = message;
	};
	const removeSnackBar = () => {
		setTimeout(() => {
			modal.classList.remove('open');
			modal.querySelector('.message').textContent = '';
		}, 4000);
	};
	addSurvey({ text: 'hello world' })
		.then(
			() => {
				form.reset();
				getSnackBar('success');
				removeSnackBar();
			},
			(err) => {
				console.log('then err', err);
				getSnackBar('error occured');
				removeSnackBar();
			}
		)
		.catch((err) => {
			console.log('catch err', err);
			getSnackBar('connection error');
			removeSnackBar();
		});
});
