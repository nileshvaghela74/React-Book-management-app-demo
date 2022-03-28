import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import { v4 as uuidv4} from 'uuid'

const BookForm = (props) => {
    const [Book, setBook] = useState(() => {
        return {
        bookname: props.book ? props.book.bookname : '',
        author: props.book ? props.book.author: '',
        quantity: props.book ? props.book.quantity: '',
        price: props.book ? props.book.price : '',
        date: props.book ? props.book.date : ''
        }
    })

    const [errorMsg, setErrorMsg] = useState('')
    const { bookname, author, quantity, price } = Book

    const handleOnSubmit = (event) => {
        event.preventDefault()
        let errorMsg = ''
        const values = [bookname, author, quantity, price]

        const allFieldsFilled = values.every( (field) => {
            const value = `${field}`.trim()
            return value !== '' && value !== '0'
        })

        if(allFieldsFilled){
            const book = {
                id: uuidv4(),
                bookname,
                author,
                price,
                quantity,
                date: new Date()
            }
            props.handleOnSubmit(book)
        }else{
            errorMsg = 'Please fill out the all fields.'
        }
        setErrorMsg(errorMsg)
    }

    const handleInputChange = (event) => {
        const {name, value} = event.target
        switch(name){
            case 'quantity':
                if(value === '' || parseInt(value) === +value){
                    setBook((prevState) => ({
                        ...prevState,
                        [name]: value
                      }));
                }
                break;
            case 'price':
                if(value === '' || value.match(/^\d{1,}(\.\d{0,2})?$/)){
                    setBook((prevState)=> ({
                        ...prevState,
                        [name]: value
                    }))
                }
                break;
            default:
                setBook((prevState) => ({
                    ...prevState,
                    [name]: value
                }))
                break;
        }
    }

    return (
        <div className="main-form">
            {errorMsg && <p className="errorMsg">{errorMsg}</p>}
            <Form onSubmit={handleOnSubmit}>
                <Form.Group controlId='name'>
                    <Form.Label>Book Name</Form.Label>
                    <Form.Control 
                        className="input-control"
                        type="text"
                        name="bookname"
                        value={bookname}
                        placeholder="Enter name of book"
                        onChange={handleInputChange}
                    >
                    </Form.Control>
                </Form.Group>
                <Form.Group controlId='author'>
                    <Form.Label>Author Name</Form.Label>
                    <Form.Control
                        className="input-control"
                        type='text'
                        name='author'
                        value={author}
                        placeholder="Enter name of book author"
                        onChange={handleInputChange}
                    >
                    </Form.Control>
                </Form.Group>
                <Form.Group controlId="quantity">
                    <Form.Label>Quantity</Form.Label>
                    <Form.Control
                        className="input-control"
                        type="number"
                        name="quantity"
                        value={quantity}
                        placeholder="Enter available quantity"
                        onChange={handleInputChange}
                    />
                </Form.Group>
                <Form.Group controlId="price">
                    <Form.Label>Book Price</Form.Label>
                    <Form.Control
                        className="input-control"
                        type="text"
                        name="price"
                        value={price}
                        placeholder="Enter price of book"
                        onChange={handleInputChange}
                    />
                </Form.Group>
                <Button variant='primary' type='submit' className='submit-btn'>Submit</Button>
            </Form>
        </div>
    )
}

export default BookForm