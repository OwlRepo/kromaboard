export default function setQueryVariable(newQueryParams: string) {
  if (window.history.pushState) {
    const newURL = new URL(window.location.href);
    newURL.search = newQueryParams;
    window.history.pushState({ path: newURL.href }, "", newURL.href);
  }
}
