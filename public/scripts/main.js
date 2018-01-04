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
