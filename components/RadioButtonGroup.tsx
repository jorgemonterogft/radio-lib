'use client';

import * as React from 'react';

import RadioButton from '@components/RadioButton';

/**
 * RadioButtonGroup - Multi-option selection control
 * @description Group of radio buttons for selecting one option from many
 * @example <RadioButtonGroup name="choice" options={[{value:'a',label:'Option A'}]} onChange={handleChange} />
 */
interface RadioButtonGroupProps {
  options: { value: string; label: string }[];
  defaultValue?: string;
  name?: string;
  onChange?: (value: string) => void;
}

const RadioButtonGroup: React.FC<RadioButtonGroupProps> = ({ options, defaultValue = '', name = 'radio-group', onChange }) => {
  const [selectedValue, setSelectedValue] = React.useState<string>(defaultValue);

  const handleSelect = (value: string) => {
    setSelectedValue(value);
    if (onChange) onChange(value);
  };

  return (
    <>
      {options.map((option) => (
        <RadioButton key={option.value} name={name} value={option.value} selected={selectedValue === option.value} onSelect={handleSelect}>
          {option.label}
        </RadioButton>
      ))}
    </>
  );
};

export default RadioButtonGroup;
