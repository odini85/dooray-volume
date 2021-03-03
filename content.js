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
  },
  data: {
    mainVideo: {
      width: "100%",
      height: "100%",
    },
  },
  init() {
    this.handlerVolumeToggle = this.handlerVolumeToggle.bind(this);
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
  },
  injectUI() {
    const { toolbarContainer, volumeContainer } = this.elements;
    const divLi = document.createElement("li");
    divLi.setAttribute("class", "vertical-divider");
    toolbarContainer.querySelector("li:first-child").before(divLi);
    toolbarContainer.querySelector("li:first-child").before(volumeContainer);
  },
  bindEvent() {
    const { volumeButton, volume } = this.elements;
    volumeButton.addEventListener("click", this.handlerVolumeToggle);
    volume.addEventListener("change", this.handlerVolumeChange);
  },
  handlerVolumeChange(e) {
    document.querySelector("audio").volume = e.target.value;
  },
  handlerVolumeToggle() {
    const { volumeContainer } = this.elements;
    volumeContainer.classList.toggle("u_is--active");
  },
};

Loader.ready();
