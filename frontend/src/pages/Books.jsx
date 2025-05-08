import booksInfo from "../api/booksData.json";
import { BookCard } from "../components/UI/BookCard";

export const Books = () => {
    return (
        <section className="section-about container">
            <h2 className="container-title">
                Here are some famous books
            </h2>

            <div className="gradient-cards">

                {booksInfo.map((book, index) =>{
                    return <BookCard book={book} key={index}/>
                })}
               
            </div>
        </section>
    );
};