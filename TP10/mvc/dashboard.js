const btn = document.getElementById("btn-connect");
const inputUrl = document.getElementById("UrlGetData");

btn.addEventListener("click", () => {
  const valeurTapee = inputUrl.value;

  if (valeurTapee === "") {
    alert("Veuillez saisir une adresse !");
    return;
  }

  localStorage.setItem("serverUrl", valeurTapee);
  console.log("Adresse enregistrée :", localStorage.getItem("serverUrl"));
});
