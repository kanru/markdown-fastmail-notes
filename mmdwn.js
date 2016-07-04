/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

function MarkdownIt () {
  let article = document.querySelector("pre.u-article");
  let container = article.parentElement;
  let reader = new commonmark.Parser();
  let writer = new commonmark.HtmlRenderer({smart: true, safe: true});
  let parsed = reader.parse(article.textContent);
  let result = writer.render(parsed);
  let renderedArticle = document.createElement("div");

  renderedArticle.classList.add("u-article");
  renderedArticle.innerHTML = result;
  article.remove();
  container.appendChild(renderedArticle);
}

MarkdownIt();

let container = document.querySelector("div.app-content");
// Respond to mutations
let mut_config = { childList: true, subtree: true };
let mut_observer = new MutationObserver(mutations => {
  MarkdownIt();
});
mut_observer.observe(container, mut_config);
