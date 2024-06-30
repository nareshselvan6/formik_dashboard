import React, { useEffect, useState } from 'react';
import "./Pages.css";
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const EditBook = () => {
    const { id } = useParams();
    const navigate=useNavigate()
    
    const [bookData, setBookData] = useState({
        title: '',
        author: '',
        isbnnumber: '',
        publicationdate: '',
        authorname: '',
        birthdate: '',
        biography: ''
    });

    useEffect(() => {
        datafetch();
    }, []);

    const datafetch = async () => {
        try {
            const res = await axios.get(`https://665306ff813d78e6d6d6ee0c.mockapi.io/api/library/${id}`)
            .then(res=>
            setBookData({
                title: res.data.title,
                author: res.data.author,
                isbnnumber: res.data.isbnnumber,
                publicationdate: res.data.publicationdate,
                authorname: res.data.authorname,
                birthdate: res.data.birthdate,
                biography: res.data.biography
            }))
        } catch (err) {
            console.log(err);
        }
    };

    const update = async (values) => {
        try {
            await axios.put(`https://665306ff813d78e6d6d6ee0c.mockapi.io/api/library/${id}`, values);
            alert("Data updated successfully");
            navigate("/managebooks")
        } catch (err) {
            console.log(err);
        }
    };

    const formik = useFormik({
        initialValues: bookData,
        enableReinitialize: true,
        validationSchema: Yup.object({
            title: Yup.string().required('Required'),
            author: Yup.string().required('Required'),
            isbnnumber: Yup.string().required('Required'),
            publicationdate: Yup.string().required('Required'),
            authorname: Yup.string().required('Required'),
            birthdate: Yup.string().required('Required'),
            biography: Yup.string().required('Required')
        }),
        onSubmit: (values) => {
            update(values);
        },
    });

    return (
        <div className='pagescontent createbook'>
            <div className='createbookpage'>
                <form onSubmit={formik.handleSubmit}>
                    <div className='title d-flex flex-column justify-content-center align-items-center'>
                        <label name="title">Title</label>
                        <input
                            type="text"
                            id="title"
                            name="title"
                            className="inputbox"
                            onChange={formik.handleChange}
                            value={formik.values.title}
                        />
                        {formik.touched.title && formik.errors.title ? (
                            <div>{formik.errors.title}</div>
                        ) : null}
                    </div>
                    <div className='author d-flex flex-column justify-content-center align-items-center'>
                        <label name="author">Author</label>
                        <input
                            type="text"
                            id="author"
                            name="author"
                            className="inputbox"
                            onChange={formik.handleChange}
                            value={formik.values.author}
                        />
                        {formik.touched.author && formik.errors.author ? (
                            <div>{formik.errors.author}</div>
                        ) : null}
                    </div>
                    <div className='isbnnumber d-flex flex-column justify-content-center align-items-center'>
                        <label name="isbnnumber">ISBN Number</label>
                        <input
                            type="text"
                            id="isbnnumber"
                            name="isbnnumber"
                            className="inputbox"
                            onChange={formik.handleChange}
                            value={formik.values.isbnnumber}
                        />
                        {formik.touched.isbnnumber && formik.errors.isbnnumber ? (
                            <div>{formik.errors.isbnnumber}</div>
                        ) : null}
                    </div>
                    <div className='publicationdate d-flex flex-column justify-content-center align-items-center'>
                        <label name="publicationdate">Publication Date</label>
                        <input
                            type="text"
                            id="publicationdate"
                            name="publicationdate"
                            className="inputbox"
                            onChange={formik.handleChange}
                            value={formik.values.publicationdate}
                        />
                        {formik.touched.publicationdate && formik.errors.publicationdate ? (
                            <div>{formik.errors.publicationdate}</div>
                        ) : null}
                    </div>
                    <div className='authorname d-flex flex-column justify-content-center align-items-center'>
                        <label name="authorname">Author Name</label>
                        <input
                            type="text"
                            id="authorname"
                            name="authorname"
                            className="inputbox"
                            onChange={formik.handleChange}
                            value={formik.values.authorname}
                        />
                        {formik.touched.authorname && formik.errors.authorname ? (
                            <div>{formik.errors.authorname}</div>
                        ) : null}
                    </div>
                    <div className='birthdate d-flex flex-column justify-content-center align-items-center'>
                        <label name="birthdate">Date of Birth</label>
                        <input
                            type="date"
                            id="birthdate"
                            name="birthdate"
                            className="inputbox"
                            onChange={formik.handleChange}
                            value={formik.values.birthdate}
                        />
                        {formik.touched.birthdate && formik.errors.birthdate ? (
                            <div>{formik.errors.birthdate}</div>
                        ) : null}
                    </div>
                    <div className='biography d-flex flex-column justify-content-center align-items-center'>
                        <label name="biography">Biography</label>
                        <input
                            type="text"
                            id="biography"
                            name="biography"
                            className="inputbox"
                            onChange={formik.handleChange}
                            value={formik.values.biography}
                        />
                        {formik.touched.biography && formik.errors.biography ? (
                            <div>{formik.errors.biography}</div>
                        ) : null}
                    </div>
                    <div className="submitbtn">
                        <button type="submit" className="create btn btn-success">Update</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditBook;
