const nameProfileHtml = document.querySelector(".js-name-profile");
const jobProfileHtml = document.querySelector(".js-job-profile");



export function getProfileInfo() {
  return {name: nameProfileHtml.textContent, about: jobProfileHtml.textContent};
  }

export function changeProfileInfo({name,about}) {

    nameProfileHtml.textContent = name;
    jobProfileHtml.textContent = about;

  }
