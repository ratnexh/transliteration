tinymce.init({
  content_style: "#tinymce{font-size:16px;direction:ltr}",
  auto_focus: true,
  promotion: false,
  branding: false,
  height: 400,
  selector: "#translator",
  setup: function (editor) {
    editor.on('keyup', function (e) {
      var word_count = tinyMCE.activeEditor.getContent({
        format: 'text'
      }).split(' ').length;
      var char_count = tinyMCE.activeEditor.getContent({
        format: 'text'
      }).replace(/ /g, "").length;
      var char_count_space = tinyMCE.activeEditor.getContent({
        format: 'text'
      }).length;

      // Append the counts to respective elements
      document.getElementById('word_count').textContent = word_count;
      document.getElementById('charEx_count').textContent = char_count;
      document.getElementById('charIn_count').textContent = char_count_space;
    });
  }
});

// ---------------------------------------------------------------------------
// change h1 text on target language select
document.getElementById('languageDropDown').addEventListener('change',(e)=>{
  const selectedOption = e.target.selectedOptions[0].textContent;
  console.log("Selected language:", selectedOption);
  document.getElementById('targetLang').innerHTML = selectedOption;
})