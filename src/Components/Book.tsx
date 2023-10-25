import React, {useState, useRef, forwardRef, useImperativeHandle} from "react";
import type {ForwardedRef} from 'react';

// type Props = {
//     name: string;
//     age: number;
//     children: React.ReactNode;//Типізація для children
// };

// export function User ({name, age, children}: Props) {
//     return (
//         <div>
//             <p>{`User name is ${name}`}</p>
//             <p>{`User age is ${age}`}</p>
//             {children}
//         </div>
//     )
// };

//Типізація для хуків
export function Counter () {
    const [count, setCount]= useState<number>(0);

    const increment = () => {
      setCount(prevCount => prevCount + 1);
    };

    return (
        <div>
            <p>Count : {count}</p>
            <button onClick={increment}>Increment</button>
        </div>
    )
};

// type User = {
//     name: string;
//     email: string;
// };

// export function UserComponent () {
//     const [user, setUser] = useState<User>({
//         name: 'Harry',
//         email: 'harry@gmail.com'
//     });
// };

type Status = 'loading' | 'idle' | 'error';

export function LoadingComponent () {
    const [status, setStatus] = useState<Status>('idle');

    const loadData = async () => {
        setStatus('loading');
        try {
            setStatus('idle')
        } catch{
            setStatus('error')
        };
    };

    return (
        <div>
            <p>Status: {status}</p>
            <button onClick={loadData}>Завантажити дані</button>
        </div>
    );
};

type Props = {
    initialValue: string;
    onSave: (value: string) => void;
};

export function TextInput ({initialValue, onSave}: Props) {
    const [value, setValue] = useState(initialValue);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.value);
    };

    const handleSave = () => {
        onSave(value);
    };

    return (
        <div>
            <input type="text" value={value} onChange={handleChange}/>
            <button onClick={handleSave}>Save</button>
        </div>
    );
};

// type Props = {
//     title: string;
//     author: string;
// };

// export class Book extends React.Component<Props> {
    
//     render() {
//         const {title, author} = this.props;
//         return (
//             <div>
//                 <p>{`Author: ${author}`}</p>
//                 <p>{`Title: ${title}`}</p>
//             </div>
//         )
//     }
// }

//useRef

export function TextInputWithFocus () {
    const inputEl = useRef<HTMLInputElement>(null);

    const onButtonClick = () => {
        inputEl.current?.focus();
    };

    return (
        <>
        <input ref={inputEl} type="text" />
        <button onClick={onButtonClick}>Встановити фокус на поле введення</button>
        </>
    );
};

export function ComponentWithRef () {
 const textAreaRef = useRef<HTMLTextAreaElement>(null);
 const divRef = useRef<HTMLDivElement>(null);
 const selectRef = useRef<HTMLSelectElement>(null);
 const countRef = useRef<number>(0);

 const increment = () => {
    countRef.current += 1;
    console.log(`Поточне значення: ${countRef.current}`);
 };

 return (
    <div ref={divRef}>
        <textarea name="" id="" ref={textAreaRef}></textarea>
        <select name="" id="" ref={selectRef}></select>
        <button onClick={increment}>Increment</button>
    </div>
 );
};

//useImperativeHandle

type Props1 = {
 initialText: string;
};

export type FocusableInputRef = {
    focus: () => void;
};

function FocusableInput (
    {initialText}: Props1,
    ref: ForwardedRef<FocusableInputRef>) {
  
    const inputRef = useRef<HTMLInputElement>(null);

    useImperativeHandle(ref, () => ({
        focus: () => {
            if(inputRef.current) {
                inputRef.current.focus();
            };
        },
    }));

    return <input type="text" ref={inputRef} defaultValue={initialText}/>
};

// export function OtherComponent () {
//     const inputRef = useRef<FocusableInputRef>(null);

//     const handleClick = () => {
//         if(inputRef.current) {
//             inputRef.current.focus();
//         };
//     };

//     return (
//         <div>
//             <FocusableInput initialText="Hello" ref={inputRef}/>
//             <button onClick={handleClick}>Set focus</button>
//         </div>
//     )
// }

const refForwarded = forwardRef<FocusableInputRef, Props1>(FocusableInput);
export {refForwarded as FocusableInput};

type SendPaymentType = {
    method: string;
    headers: {[x: string]: string};
    body: string;
};

async function SendPayment (paymentData: {
    cardNumber: string,
    cardHolderName: string
}): Promise<SendPaymentType> {
   
   const response = {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(paymentData)
   };

   return Promise.resolve(response);
};

type Props3 = {};

export type PaymentFormHandleRef = {
    submit: () => Promise<SendPaymentType>;
};

export function PaymentForm (
    props: Props3,
    ref: ForwardedRef<PaymentFormHandleRef>
) {
    
    const [cardNumber, setCardNumber] = useState('');
    const [cardHolderName, setCardHolderName] = useState('');

    const handleCardNumberChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCardNumber(event.target.value);
    };

    const handleCardHolderNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCardHolderName(event.target.value);
    };

    useImperativeHandle(ref, () => ({
        submit: () => {
            return SendPayment({cardNumber, cardHolderName});
        }
    }));

    return (
       <form >
        <input 
        type="text"
        value={cardNumber} 
        onChange={handleCardNumberChange}
        placeholder="Card Number"/>
        <input type="text"
        value={cardHolderName}
        onChange={handleCardHolderNameChange}
        placeholder="Card Holder Name" />
       </form>
    )
};

export const ForwardedPaymentForm = forwardRef<PaymentFormHandleRef, Props3>(
    PaymentForm
);