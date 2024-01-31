const $img = document.querySelector('.image');
const $form = document.querySelector('.form');
const $text = document.querySelector('.text');
const $btnRead = document.querySelector('.btn-read');
const $btnStopRead = document.querySelector('.btn-stopRead');
const $btnConvert = document.querySelector('.convert');
const $progress = document.querySelector('.progress');

const logger = ({ progress }) => ($progress.innerHTML = `${(progress * 100).toFixed(2)}%`);

const convertImage = async url => {
	console.log('initializing');
	console.log(url);
	const worker = Tesseract.createWorker({
		logger,
	});
	try {
		$progress.classList.remove('hidden');
		await worker.load();
		await worker.loadLanguage('eng');
		await worker.initialize('eng');
		const {
			data: { text },
		} = await worker.recognize(url).finally(function () {
			$btnRead.classList.remove('hidden');
			$progress.classList.add('hidden');
		});
		console.log(text);
		$text.innerHTML = text;
		await worker.terminate();
	} catch (err) {
		console.log(err);
	}
};

const read = () => {
	if ($text.innerText) {
		const msg = new SpeechSynthesisUtterance();
		msg.text = $text.innerText;
		window.speechSynthesis.speak(msg);
	}
};

const stopReading = () => {
    window.speechSynthesis.cancel();
};

const handleFormSubmit = e => {
	e.preventDefault();
	const file = $form.elements['image'].files[0];
	if (file) {
		const reader = new FileReader();
		console.log(reader);
		reader.readAsDataURL(file);
		reader.onload = function () {
			const url = reader.result;
			$img.src = url;
		};
	}
};

const handleButtonConvert = () => {
	convertImage($img.src);
};

const handleButtonRead = () => {
	$btnRead.classList.add('hidden');
	$btnStopRead.classList.remove('hidden');
	read();
};

const handleButtonStopRead = () => {
	$btnStopRead.classList.add('hidden');
	$btnRead.classList.remove('hidden');
	stopReading();
};

$form.addEventListener('submit', handleFormSubmit);
$btnConvert.addEventListener('click', handleButtonConvert);
$btnRead.addEventListener('click', handleButtonRead);
$btnStopRead.addEventListener('click', handleButtonStopRead);

