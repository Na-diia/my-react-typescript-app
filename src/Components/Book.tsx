import React from "react";

type Props = {
    name: string;
    age: number;
    children: React.ReactNode;//Типізація для children
};

export function User ({name, age, children}: Props) {
    return (
        <div>
            <p>{`User name is ${name}`}</p>
            <p>{`User age is ${age}`}</p>
            {children}
        </div>
    )
}

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