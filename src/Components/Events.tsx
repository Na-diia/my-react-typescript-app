import React, {FormEvent, MouseEvent, ChangeEvent, useState, KeyboardEvent} from "react";

export function MyForm () {
    const handleSubmit = (event: FormEvent) => {
        event.preventDefault();
    };

    return (
        <form onSubmit={handleSubmit}>
            <button type="submit">Submit</button>
        </form>
    )
};

export function ChildComponent () {
    const handleChildClick = (event: MouseEvent<HTMLButtonElement>) => {
       event.stopPropagation();
    };

    return (
        <button type="button" onClick={handleChildClick}>Натиснути</button>
    )
};

export function TextInput () {
  const [text, setText] = useState<string>(' ');

  const handleTextChange = (event: ChangeEvent<HTMLInputElement>) => {
     setText(event.target.value);
  };

  return (
    <input type="text" value={text} onChange={handleTextChange}/>
  )
};

type InputProps = {
    value: string | number;
    type: 'text' | 'number';
    onChange: (value: string | number) => void;
    onPressEnter: () => void;
};

export function Input ({value, type, onChange, onPressEnter}: InputProps) {
  
    const handleKeyPress = (event: KeyboardEvent<HTMLInputElement>) => {
        if(event.key === 'Enter') {
            onPressEnter();
        };
    };

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        onChange(event.target.value);
    };

    return (
        <input type="text"
        onChange={handleChange} 
        onKeyDown={handleKeyPress}/>
    )
};

// export function Input ({value, type, onChange}: InputProps) {
//     const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
//         let newValue = event.target.value;

//         if(type === 'number') {
//           newValue = Number(newValue);
//         }

//         onChange(newValue);
//     };

//     return (
//         <input 
//         type="text"
//         value={value.toString()}
//         onChange={handleChange} />
//     )
// };



