export const Contact = () => {
    const handleFormSubmit = (formData) => {
        const formInputData = Object.fromEntries(formData.entires());
        console.log(formInputData);
    }

    return (
        <section className="section-contact">
            <h2 className="container-title">Contact Us</h2>

            <div className="contact-wrapper container">
                <form action={handleFormSubmit}>
                    <input 
                        type="text"
                        className="form-control" 
                        autoComplete="false" 
                        placeholder="Enter your name" 
                        name="username" 
                        required 
                    />
                    <input 
                        type="email"
                        className="form-control" 
                        autoComplete="false" 
                        placeholder="Enter your email" 
                        name="email" 
                        required 
                    />
                    <textarea 
                        className="form-control" 
                        rows="10" 
                        placholder="Enter your message" 
                        name="message"
                        required
                    ></textarea>

                    <button type="submit" className="cst-btn" value="send" disabled>
                        Send
                    </button>
                </form>
            </div>
        </section>
    )
}