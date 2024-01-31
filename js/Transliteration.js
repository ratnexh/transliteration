// Load the Google Transliterate API
google.load("elements", "1", { packages: "transliteration" });

var transliterationControl;

function onLoad() {
  var options = {
    sourceLanguage: 'en',
    destinationLanguage: ['hi', 'ar', 'kn', 'ml', 'ta', 'te'],
    transliterationEnabled: true,
    shortcutKey: 'ctrl+g',
  };

  transliterationControl = new google.elements.transliteration.TransliterationControl(options);

  transliterationControl.makeTransliteratable(['translator_ifr'], {
    indicSuggestionMenu: 'on'
  });

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
  var dropdown = document.getElementById('languageDropDown');
  transliterationControl.setLanguagePair(google.elements.transliteration.LanguageCode.ENGLISH, dropdown.options[dropdown.selectedIndex].value);
}

google.setOnLoadCallback(onLoad);