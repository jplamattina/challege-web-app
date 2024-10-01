import type { Metadata } from "next";
import Providers from './redux/provider' 
import "./globals.css";

// type Repossitory = {
//   id: number;
//   name: string;
//   role: string;
// }

export const metadata: Metadata = {
  title: "Eldar challege",
  description: "todoList Roles",
};

// const getData = async () => {
//   const responese = await fetch('https://jsonplaceholder.typicode.com/users')
//   const data: Repossitory = await responese.json();
// }
export default function RootLayout({
  children,
}: Readonly <{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
