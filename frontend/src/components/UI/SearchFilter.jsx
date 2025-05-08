export const SearchFilter = ({query, setQuery, filter, setFilter, books, setBooks, categories}) => {
    const handleInputChange = (event) => {
        event.preventDefault();
        setQuery(event.target.value);
    };

    const handleSelectChange = (event) => {
        event.preventDefault();
        setFilter(event.target.value);
    };

    const handleSort = (value) => {
        console.log("Sort Btn clicked");
        const sortBooks = [...books].sort((a, b) => {
            return value === "asc"
             ? a.volumeInfo.title.localeCompare(b.volumeInfo.title)
             : b.volumeInfo.title.localeCompare(a.volumeInfo.title);
        })
        setBooks(sortBooks);
    };
    
    return (
    <section className="section-searchFilter">
        <input
                type="text"
                placeholder="Sub Search"
                value={query}
                onChange={handleInputChange}
            />

            <div className="sort-group">
                <button className="sort-btn" onClick={() => handleSort("asc")}>Asc</button>
                <button className="sort-btn" onClick={() => handleSort("desc")}>Des</button>

            </div>

            {/* <select
                className="select-section"
                value={filter}
                onChange={handleSelectChange}
            >
                <option value="all">All</option>
                <option value="Fiction">Fiction</option>
                <option value="Mystery">Mystery</option>
                <option value="Thriller">Thriller</option>
                <option value="Science Fiction">Science Fiction</option>
                <option value="Fantasy">Fantasy</option>
                <option value="Romance">Romance</option>
                <option value="Historical Fiction">Historical Fiction</option>
                <option value="Contemporary">Contemporary</option>
                <option value="Young Adult">Young Adult</option>
                <option value="Children's Books">Children's Books</option>
                <option value="Non-Fiction">Non-Fiction</option>
                <option value="Biography & Autobiography">Biography & Autobiography</option>
                <option value="Self-Help">Self-Help</option>
                <option value="Business & Economics">Business & Economics</option>
                <option value="History">History</option>
                <option value="Science & Technology">Science & Technology</option>
                <option value="Mathematics">Mathematics</option>
                <option value="Travel">Travel</option>
                <option value="Cookbooks, Food & Wine">Cookbooks, Food & Wine</option>
                <option value="Religion & Spirituality">Religion & Spirituality</option>
                <option value="Philosophy">Philosophy</option>
                <option value="Health & Fitness">Health & Fitness</option>
                <option value="True Crime">True Crime</option>
                <option value="Poetry">Poetry</option>
                <option value="Drama">Drama</option>
                <option value="Comics & Graphic Novels">Comics & Graphic Novels</option>
                <option value="Education">Education</option>
                <option value="Parenting & Family">Parenting & Family</option>
                <option value="Politics & Social Sciences">Politics & Social Sciences</option>
                <option value="Arts & Photography">Arts & Photography</option>
                <option value="Crafts, Hobbies & Home">Crafts, Hobbies & Home</option>
                <option value="Law">Law</option>
                <option value="Medical">Medical</option>
                <option value="Foreign Language Study">Foreign Language Study</option>
            </select> */}
            <select
            className="select-section"
            value={filter}
            onChange={handleSelectChange}
            >
            <option value="all">All</option>
            {categories?.map((cat, index) => (
                <option key={index} value={cat}>
                {cat}
                </option>
            ))}
            </select>

    </section>);
}