(function () {
  var saved = null;
  try {
    saved = localStorage.getItem("pipedia-theme");
  } catch (e) {}
  if (saved !== "light" && saved !== "dark") {
    saved =
      window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";
  }
  document.documentElement.dataset.theme = saved;
})();
