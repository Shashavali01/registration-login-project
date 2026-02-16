function Contact(){
    return(
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
        <h1>This is Contact Page</h1>

        <form>
            <div style={{ margin: '10px' }}>
            <input type="text" name="name" placeholder="Enter Name"/></div>
            <div style={{ margin: '10px' }}>
            <input type="number" name="phonenumber" placeholder="Enter Number"/></div>
            <div style={{ margin: '10px' }}>
            <button type="submit">Contact meee!</button></div>
        </form>
        </div>
    )
}
export default Contact;