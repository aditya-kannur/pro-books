import React from 'react';
import { useEffect } from 'react';
import axios from 'axios'
import { useState } from 'react';
import './Books.css'

function Books(props) {
    const [booksData, setBooksData] = useState([])
    const [error, setError] = useState()

    let {value} = props

    useEffect(()=>{
        axios.get("https://reactnd-books-api.udacity.com/books",{ headers: { 'Authorization': 'whatever-yu-want' }})
        .then((res) => {
            console.log(res.data.books)
            setBooksData(res.data.books)
        })
        .catch((err) => {
             if (err.response.status == 404){
                console.log("Status code : 404")
                console.log("Website not found")
                setError(error.message)
            }
              
        })
    }, [])
    console.log("state", booksData)
    return (
        <div>
            <p>{value}</p>
            {error && <h1>404 not Found</h1> }
            <div className='primary-container'>
                {/* {booksData[0].title} */}
                {booksData.map((book, ind) => {
                    return(
                    <div key={book.id}>
                        <div className='title'>{book.title}</div>
                        <div className='secondary-container'>
                            <img src={book.imageLinks.smallThumbnail} alt='image'/>
                            <p>{book.description}</p>
                        </div>
                        <h4 className='authors'>{book.authors.join(" | ")}</h4>
                        <hr></hr>
                    </div>
                    )
                    
                })
            }
            </div>
        </div>
    );
}

export default Books;