function Dropdown(elem) {
  this.element = elem;
  this.inputElement = elem.querySelector('.input');
  this.dropdownArrow = elem.querySelector('.input__icon_arrow');

  this.close = () => {
    this.element.classList = 'dropdown';
    this.dropdownArrow.classList =
      'input__icon input__icon_arrow input__icon_rotate_270';
  };

  this.open = () => {
    this.element.classList = 'dropdown dropdown_active';
    this.dropdownArrow.classList =
      'input__icon input__icon_arrow input__icon_rotate_90';
  };

  const initEvents = () => {
    this.inputElement.addEventListener('focus', e => {
      this.open();
    });

    this.inputElement.addEventListener('blur', e => {
      this.close();
    });
  };

  if (!this.inputElement) {
    return new Error(
      "Check the dropdown structure, there isn't input inside your dropdown for correct work"
    );
  } else {
    initEvents();
  }
}

const initDropdowns = () => {
  const dropdownComponents = document.getElementsByClassName('dropdown');

  if (!dropdownComponents) return null;

  const dropdowns = [...dropdownComponents].map(
    dropdownElement => new Dropdown(dropdownElement)
  );
};

initDropdowns();

(function() {
  let stateChanged = false;

  /**
   * Change stage's label position
   *
   * @param {number} newPosition - new position of label
   */
  const changeStageLabelPosition = (newPosition = 0) => {
    const stagesLabels = document.querySelectorAll('.stage__label');

    stagesLabels.forEach(label => {
      label.style.left = `${newPosition}px`;
    });
  };

  /**
   * Change room's label position
   *
   * @param {number} newPosition - new position of label
   */
  const changeRoomLabelPosition = (newPosition = 0) => {
    const roomsLabels = document.querySelectorAll('.room__label');

    roomsLabels.forEach(label => {
      label.style.left = `${newPosition}px`;
    });
  };

  /**
   * Change room's label css-class
   *
   * @param {string} modification - added modification class for room's label elements
   */
  const changeRoomLabelClass = modification => {
    const baseClass = 'room__label';
    const roomLabels = document.querySelectorAll(`.${baseClass}`);
    const newClass = modification
      ? `${baseClass} ${baseClass}_${modification}`
      : baseClass;

    roomLabels.forEach(label => {
      label.className = newClass;
    });
  };

  /* 
      Initialization
  */
  const init = () => {
    const schedule = document.getElementById('schedule');

    if (!schedule) return null;

    schedule.addEventListener('scroll', e => {
      if (schedule.scrollLeft > 50) {
        const newPosition = schedule.scrollLeft;

        changeStageLabelPosition(newPosition);
        changeRoomLabelPosition(newPosition);
        changeRoomLabelClass('float');

        stateChanged = true;
      } else {
        if (stateChanged) {
          changeStageLabelPosition();
          changeRoomLabelPosition();
          changeRoomLabelClass();

          stateChanged = false;
        }
      }
    });
  };

  init();
})();
