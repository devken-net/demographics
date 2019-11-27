import React from 'react';
import './SelectBox.css';

/**
 * This is a reusable lower order component that imitates `<select>` element.
 */
function SelectBox({ options, value, onSelect, name }) {
  const _handleClick = (e, selectedValue) => {
    // If clicked item is already selected do nothing.
    if (!e.target.classList.contains('selected')) {
      onSelect(selectedValue, name);
    }
  }

  return (
    <div className="SelectBox" role="listbox">
      <h4 className="SelectBox-title">{ name }</h4>
      <ul className="SelectBox-list list-group">
        {
          options && options.map((item, index) => {
            let styleName = "SelectBox-list-item list-group-item";

            if(value && (item.id === value.id)) styleName += " selected";

            return <li 
                    key={index}
                    id={item.id}
                    className={styleName}
                    role="option"
                    aria-selected="true"
                    onClick={e => _handleClick(e, item) }>
                      { item.name }
                  </li>
            }
          )
        }
      </ul>
    </div>
  );
}

export { SelectBox };
