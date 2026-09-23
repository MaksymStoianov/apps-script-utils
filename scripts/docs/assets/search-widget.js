/**
 * The search widget and language switcher injected into every published page.
 *
 * `scripts/docs/site.mjs` reads this file and replaces `__ASU_STRINGS__` with
 * the labels of the language being built. Keeping it a real file, rather than a
 * string inside the generator, is what keeps its regular expressions intact.
 */

/* global __ASU_STRINGS__ */

(function () {
  var strings = __ASU_STRINGS__;

  var dialog = document.getElementById("asu-search-dialog");

  var panel = document.getElementById("asu-search-panel");

  var input = document.getElementById("asu-search-input");

  var list = document.getElementById("asu-search-results");

  var status = document.getElementById("asu-search-status");

  var open = document.getElementById("asu-search-open");

  var languageButton = document.getElementById("asu-language-open");

  var languageMenu = document.getElementById("asu-language-menu");

  var index = null;

  var loading = null;

  var hits = [];

  var cursor = 0;

  // Every language publishes the same file names, so a language link keeps the
  // reader on the page they were reading.
  Array.prototype.forEach.call(languageMenu.querySelectorAll("a"), function (link) {
    var file = window.location.pathname.split("/").pop();

    if (file && file.indexOf(".html") !== -1) {
      link.href = link.getAttribute("href") + file;
    }
  });

  function base() {
    var path = window.location.pathname;

    return path.slice(0, path.lastIndexOf("/") + 1);
  }

  function load() {
    if (loading) {
      return loading;
    }

    loading = fetch(base() + "search-index.json")
      .then(function (response) {
        if (!response.ok) {
          throw new Error(String(response.status));
        }

        return response.json();
      })
      .then(function (data) {
        index = data;

        return data;
      })
      .catch(function () {
        index = [];
        status.textContent = strings.missing;

        return [];
      });

    return loading;
  }

  function escapeHtml(text) {
    return text.replace(/[&<>"]/g, function (character) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[character];
    });
  }

  function highlight(text, terms) {
    var html = escapeHtml(text);

    terms.forEach(function (term) {
      var pattern = new RegExp("(" + term.replace(/[.*+?^${}()|[\]\\]/g, "\\$&") + ")", "ig");

      html = html.replace(pattern, "<mark>$1</mark>");
    });

    return html;
  }

  function snippetOf(entry, terms) {
    var text = entry.text || "";

    var at = -1;

    terms.some(function (term) {
      at = text.toLowerCase().indexOf(term);

      return at !== -1;
    });

    if (at === -1) {
      return entry.summary || text.slice(0, 140);
    }

    var from = Math.max(0, at - 60);

    return (from > 0 ? "…" : "") + text.slice(from, from + 160) + "…";
  }

  function score(entry, terms) {
    var title = (entry.title || "").toLowerCase();

    var text = ((entry.summary || "") + " " + (entry.text || "")).toLowerCase();

    var total = 0;

    for (var i = 0; i < terms.length; i += 1) {
      var term = terms[i];

      if (title === term) {
        total += 120;
      } else if (title.indexOf(term) === 0) {
        total += 60;
      } else if (title.indexOf(term) !== -1) {
        total += 30;
      } else if (text.indexOf(term) !== -1) {
        total += 5;
      } else {
        return 0;
      }
    }

    return total;
  }

  function render(terms) {
    list.innerHTML = "";

    hits.forEach(function (entry, position) {
      var item = document.createElement("li");

      item.setAttribute("role", "option");
      item.setAttribute("aria-selected", position === cursor ? "true" : "false");

      var link = document.createElement("a");

      link.href = base() + entry.url;
      link.innerHTML =
        '<span class="asu-title">' +
        highlight(entry.title, terms) +
        "</span>" +
        '<div class="asu-snippet">' +
        highlight(snippetOf(entry, terms), terms) +
        "</div>";

      item.appendChild(link);
      list.appendChild(item);
    });
  }

  function search() {
    var query = input.value.trim().toLowerCase();

    if (!query) {
      hits = [];
      list.innerHTML = "";
      status.textContent = strings.hint;

      return;
    }

    load().then(function () {
      var terms = query.split(/\s+/).filter(Boolean);

      hits = (index || [])
        .map(function (entry) {
          return { entry: entry, score: score(entry, terms) };
        })
        .filter(function (row) {
          return row.score > 0;
        })
        .sort(function (a, b) {
          return b.score - a.score;
        })
        .slice(0, 25)
        .map(function (row) {
          return row.entry;
        });

      cursor = 0;
      status.textContent = hits.length
        ? hits.length + " " + strings.matches
        : strings.empty + " “" + query + "”";

      render(terms);
    });
  }

  function show() {
    dialog.setAttribute("open", "");
    input.value = "";
    input.focus();
    status.textContent = strings.hint;
    list.innerHTML = "";
    load();
  }

  function hide() {
    dialog.removeAttribute("open");
  }

  function move(step) {
    if (hits.length === 0) {
      return;
    }

    cursor = (cursor + step + hits.length) % hits.length;

    Array.prototype.forEach.call(list.children, function (item, position) {
      item.setAttribute("aria-selected", position === cursor ? "true" : "false");
    });

    var selected = list.children[cursor];

    if (selected) {
      selected.scrollIntoView({ block: "nearest" });
    }
  }

  languageButton.addEventListener("click", function () {
    var opened = languageMenu.hasAttribute("open");

    if (opened) {
      languageMenu.removeAttribute("open");
    } else {
      languageMenu.setAttribute("open", "");
    }

    languageButton.setAttribute("aria-expanded", String(!opened));
  });

  document.addEventListener("click", function (event) {
    if (!languageMenu.contains(event.target) && event.target !== languageButton) {
      languageMenu.removeAttribute("open");
      languageButton.setAttribute("aria-expanded", "false");
    }
  });

  open.addEventListener("click", show);
  input.addEventListener("input", search);

  dialog.addEventListener("click", function (event) {
    if (!panel.contains(event.target)) {
      hide();
    }
  });

  document.addEventListener("keydown", function (event) {
    var typing = /^(INPUT|TEXTAREA|SELECT)$/.test(document.activeElement.tagName);

    if (!dialog.hasAttribute("open")) {
      var shortcut =
        (event.key === "/" && !typing) || ((event.metaKey || event.ctrlKey) && event.key === "k");

      if (shortcut) {
        event.preventDefault();
        show();
      }

      return;
    }

    if (event.key === "Escape") {
      hide();
    } else if (event.key === "ArrowDown") {
      event.preventDefault();
      move(1);
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      move(-1);
    } else if (event.key === "Enter" && hits[cursor]) {
      event.preventDefault();
      window.location.href = base() + hits[cursor].url;
    }
  });
})();
