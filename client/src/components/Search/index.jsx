import React from 'react'
import { Button, Form } from 'react-bootstrap';
import SearchStyle from '../Search/Search.module.scss'

export default function Search() {
    return ( 
        <div className={`${SearchStyle.root} shadow-lg mb-5 bg-white`}>
            <div className={`${SearchStyle.search}`}>
                <Form inline >
                    <Form.Control
                        type="text"
                        placeholder="Пошук"
                        className={SearchStyle['search-form']}
                    />
                </Form>
                <Button className={`${SearchStyle['search-btn']}`}>Знайти</Button>
            </div>
        </div>
    )
}