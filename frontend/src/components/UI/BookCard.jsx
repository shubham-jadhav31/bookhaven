export const BookCard = ({book}) => {
    const {title, author, price, genre} = book
    
    return (
        <div className="cards">
            <div className="container-card bg-blue-box">
                    <p className="card-title">{title}</p>
                    <p className="card-info">
                        <span className="card-description">Author: </span>
                        {author}
                    </p>
                    <p className="card-info">
                        <span className="card-description">Price: </span>
                        ₹{price}
                    </p>
                    <p className="card-info">
                        <span className="card-description">Gener: </span>
                        {genre}
                    </p>
            </div> 
        </div>
    )
}