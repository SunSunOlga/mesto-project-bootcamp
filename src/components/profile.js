import { getProfileServer } from "../components/api"

const nameProfileHtml = document.querySelector(".js-name-profile");
const jobProfileHtml = document.querySelector(".js-job-profile");
const avatarProfile = document.querySelector(".profile__image");

export function getProfileInfo() {
  return {name: nameProfileHtml.textContent, about: jobProfileHtml.textContent};
  }

export function changeProfileInfo({name,about}) {

    nameProfileHtml.textContent = name;
    jobProfileHtml.textContent = about;

  }

  export function setAvatar({avatar}) {
    avatarProfile.src = avatar;
  }
