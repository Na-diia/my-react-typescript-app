import React, {FormEvent, MouseEvent, ChangeEvent, useState} from "react";

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
}

