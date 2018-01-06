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
