const Loader = {
  ready() {
    requestAnimationFrame(() => {
      if (!document.querySelector(".toolbar-content ul")) {
        this.ready();
      } else {
        View.init();
      }
    });
  },
};

const View = {
  elements: {
    toolbarContainer: null,
    volumeContainer: null,
    volumeButton: null,
    sCont: null,
    profilesButton: null,
  },
  init() {
    this.handlerVolumeToggle = this.handlerVolumeToggle.bind(this);
    this.handlerProfilesToggle = this.handlerProfilesToggle.bind(this);
    this.handlerVolumeChange = this.handlerVolumeChange.bind(this);

    this.setElements();
    this.injectUI();
    this.bindEvent();
  },
  setElements() {
    this.elements.toolbarContainer = document.querySelector(
      ".toolbar-content ul"
    );

    this.elements.sCont = document.querySelector(".screen div.sCon");

    // volume
    const volumeContainer = document.createElement("li");
    volumeContainer.innerHTML = `
      <input type="range" />
      <button>볼륨</button>
    `;
    volumeContainer.setAttribute("class", "u_ctrl u_volume");
    this.elements.volumeContainer = volumeContainer;

    const volumeButton = volumeContainer.querySelector("button");
    this.elements.volumeButton = volumeButton;

    const volume = volumeContainer.querySelector('input[type="range"]');
    volume.setAttribute("step", 0.01);
    volume.setAttribute("min", 0);
    volume.setAttribute("max", 1);
    this.elements.volume = volume;

    // profiles
    const profilesButton = document.createElement("li");
    profilesButton.innerHTML = "<button>프로필 토글</button>";
    profilesButton.setAttribute("class", "u_ctrl u_toggle_profiles");
    this.elements.profilesButton = profilesButton;
  },
  injectUI() {
    const { toolbarContainer, volumeContainer, profilesButton } = this.elements;
    const divLi = document.createElement("li");
    divLi.setAttribute("class", "vertical-divider");
    toolbarContainer.querySelector("li:first-child").before(divLi);
    toolbarContainer.querySelector("li:first-child").before(volumeContainer);
    toolbarContainer.querySelector("li:first-child").before(profilesButton);
  },
  bindEvent() {
    const { volumeButton, volume, profilesButton } = this.elements;
    volumeButton.addEventListener("click", this.handlerVolumeToggle);
    profilesButton.addEventListener("click", this.handlerProfilesToggle);
    volume.addEventListener("change", this.handlerVolumeChange);
  },
  handlerVolumeChange(e) {
    document.querySelector("audio").volume = e.target.value;
  },
  handlerVolumeToggle() {
    this.elements.volumeButton.parentElement.classList.toggle("u_is--active");
    this.elements.volumeButton.parentElement.classList.toggle("u_is--show");
  },
  handlerProfilesToggle() {
    this.elements.profilesButton.classList.toggle("u_is--active");
    this.elements.sCont.classList.toggle("u_is--hidden-profiles");
  },
};

Loader.ready();
