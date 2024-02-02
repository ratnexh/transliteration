// Load the Google Transliterate API
google.load("elements", "1", { packages: "transliteration", "nocss": true });

var transliterationControl;

function onLoad() {
  var options = {
    sourceLanguage: 'en',
    destinationLanguage: ['hi', 'ar', 'kn', 'ml', 'ta', 'te'],
    transliterationEnabled: true,
    shortcutKey: 'ctrl+g',
  };

  transliterationControl = new google.elements.transliteration.TransliterationControl(options);
  transliterationControl.makeTransliteratable(['translator_ifr']);
  // transliterationControl.c.qc.t13n.c[3].c.d.keyup[0].ia.F.p = 'https://www.google.com';

  // Populate the language dropdown
  var destinationLanguage = transliterationControl.getLanguagePair().destinationLanguage;
  var languageSelect = document.getElementById('languageDropDown');

  var supportedDestinationLanguages = google.elements.transliteration.getDestinationLanguages(google.elements.transliteration.LanguageCode.ENGLISH);
  for (var lang in supportedDestinationLanguages) {
    var opt = document.createElement('option');
    opt.text = lang;
    opt.value = supportedDestinationLanguages[lang];
    if (destinationLanguage == opt.value) {
      opt.selected = true;
    }
    try {
      languageSelect.add(opt, null);
    } catch (ex) {
      languageSelect.add(opt);
    }
  }
}

// Handler for dropdown option change event. Calls setLanguagePair to set the new language
function languageChangeHandler() {
  const dropdown = document.getElementById('languageDropDown');
  transliterationControl.setLanguagePair(google.elements.transliteration.LanguageCode.ENGLISH, dropdown.options[dropdown.selectedIndex].value);
  localStorage.setItem('languageSelected', dropdown.options[dropdown.selectedIndex].value);
}

google.setOnLoadCallback(onLoad);