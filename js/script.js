"use strict";

// array to be populated with JSON content
let quotes;

//asynchronous function that fetches JSON content and populates the quotes array
const makeRequest = async () => {
  const responseJSON = await fetch(
    "/random-quotes-vanillajs-json/data/quotes.json"
  );
  quotes = await responseJSON.json();
};

//function to access random quote from array and inject it together with author on HTML
function injectQuote() {
  //access random quote from quote array
  let randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
  //inject random quote on HTML
  document.getElementById("text").innerHTML = randomQuote.quoteText;
  let quoteTextElem = randomQuote.quoteText;
  //inject author on HTML
  document.getElementById("author").innerHTML = "- " + randomQuote.quoteAuthor;
  let quoteAuthorElem = " - " + randomQuote.quoteAuthor;
  const lineBreak = "%0a";
  const related = "&related=celue";
  const via = "&via=morsewall";
  const addOnHandle = " @celue";
  //truncating quote text in case full tweet gets to be over 280 characters
  let contentQuote =
    quoteTextElem + quoteAuthorElem + lineBreak + via + addOnHandle;
  if (contentQuote.length > 280) {
    let charCountAuthor = quoteAuthorElem.length;
    let viaCharCount = via.length;
    let addOnHandleCharCount = addOnHandle.length;
    const extraStylingChar = "..." + '"';
    const extraCharCount = extraStylingChar.length;
    const tweetAdjustmentChar = "  ";
    const tweetAdjustmentCharCount = tweetAdjustmentChar.length;
    let subString =
      quoteTextElem.substring(
        0,
        280 -
          extraCharCount -
          charCountAuthor -
          viaCharCount -
          addOnHandleCharCount -
          tweetAdjustmentCharCount
      ) +
      extraStylingChar +
      quoteAuthorElem +
      lineBreak +
      via +
      addOnHandle +
      related;
    //generate url available for Twitter intent and inject url on HTML
    document.getElementById("tweet-quote").href =
      "https://twitter.com/intent/tweet?text=" + subString;
  } else {
    //generate url available for Twitter intent and inject url on HTML
    document.getElementById("tweet-quote").href =
      "https://twitter.com/intent/tweet?text=" + contentQuote + related;
  }
}

// inject a quote on screen when app loads (but only after the array was populated with the fetch from JSON)
makeRequest().then(result => injectQuote());

//inject a quote on screen when "Get New Quote" button is clicked
document.getElementById("new-quote").addEventListener("click", function() {
  injectQuote();
});
