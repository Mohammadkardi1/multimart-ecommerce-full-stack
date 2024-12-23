import React from 'react'
import {Container, Row, Col,  Form, FormGroup } from 'reactstrap'
import {useState} from 'react'
import {toast } from 'react-toastify'
import {db ,storage} from '../firebaseConfig'
import {addDoc, collection } from 'firebase/firestore'
import {ref,uploadBytesResumable, getDownloadURL  } from 'firebase/storage'
import { Helmet } from '../components/Helmet/Helmet'
import { Link } from 'react-router-dom'


export const AddProduct = () => {

    const [productName, setProductName] = useState("")
    const [shortDesc, setShortDesc] = useState("")
    const [description, setDescription] = useState("")
    const [category, setCategory] = useState("chair")
    const [price, setPrice] = useState("")
    const [productImg, setProductImg] = useState(null)
    const [loading, setLoading ] = useState(false)

    const addProduct = async (e) => {
        e.preventDefault()
        setLoading(true)
        try {
            const collectionRef =  collection(db, 'products')
            const storageref = ref(storage, `products/${Date.now() + productImg.name }`)
            const uploadTask =  uploadBytesResumable(storageref,productImg)
            uploadTask.on('next',
            (snapshot) => {
              // Handle progress, such as updating a progress bar
            },
                () => {
                    toast.error('Image upload failed')
                    setLoading(false)
                },
                async () => {
                    try {
                        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref)
                        await addDoc(collectionRef, {
                            productName: productName,
                            shortDosc: shortDesc,
                            description: description,
                            category: category,
                            price: price,
                            imgUrl: downloadURL
                        })
                        setLoading(false)
                        toast.success('The product has been added successfully')
                    } catch (err) {
                        toast.error('Failed to add product');
                        setLoading(false)
                    }

                })
        } catch (err) {
            toast.error('Failed to add product')
            setLoading(false)
        }

    }

    return (
        <Helmet title={'Add Product'}>
            <Container>
                <Row>
                    <Col lg='12' className='text-center py-5'>
                        <h3 className='fw-bold'>Add Products</h3>
                    </Col>
                    {
                        loading ? 
                        <Col lg='12' className="text-center">
                            <h5 className='py-6 m-0'>Loading...</h5>
                        </Col> :
                        <Col lg="12">
                        <Form onSubmit={addProduct}>
                            <FormGroup className="form__group">
                                <span>Product Name</span>
                                <input 
                                    type='text' 
                                    placeholder="e.g. Double sofa"
                                    value={productName}
                                    onChange={(e) => setProductName(e.target.value)}
                                    required/>
                            </FormGroup>
                            <FormGroup className="form__group">
                                <span>Short Description</span>
                                <input 
                                    type='text' 
                                    placeholder="e.g. Lorem...."
                                    value={shortDesc}
                                    onChange={(e) => setShortDesc(e.target.value)}
                                    required/>
                            </FormGroup>
                            <FormGroup className="form__group">
                                <span>Description</span>
                                <textarea
                                    rows="4"
                                    type='text' 
                                    placeholder="e.g. lorem..."
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    required/>
                            </FormGroup>
                            <div className='d-flex align-items-center justify-content-between gap-5'>
                                <FormGroup className="form__group w-50">
                                    <span>Price</span>
                                    <input 
                                        type='number' 
                                        placeholder="e.g. $100"
                                        value={price}
                                        onChange={(e) => setPrice(e.target.value)}
                                        required/>
                                </FormGroup>
                                <FormGroup className="form__group w-50">
                                    <span>Category</span>
                                    <select 
                                        className='w-100 p-2'
                                        value={category}
                                        onChange={(e) => setCategory(e.target.value)}>
                                        <option disabled >Select Category</option>
                                        <option value="Chair" >Chair</option>
                                        <option value="Sofa">Sofa</option>
                                        <option value="Mobile">Mobile</option>
                                        <option value="Watch">Watch</option>
                                        <option value="Wireless">Wireless</option>
                                    </select>
                                </FormGroup>
                            </div>
                            <FormGroup className="form__group">
                                    <span>Product Image</span>
                                    <input 
                                        type='file'
                                        // value={productImg}
                                        style={{"width": "auto", "border":"none"}}
                                        onChange={(e) => setProductImg(e.target.files[0])}
                                        required />
                            </FormGroup>
                            <button 
                                className='shop__btn'
                                type='submit'>
                                Add Product
                            </button>
                        </Form>
                    </Col>
                    }
                    <Col className='col-12 pt-5 pb-3'>
                        <Link to='/home'>
                            Back to home
                        </Link>
                    </Col>
                </Row>
            </Container>
        </Helmet>
    )
}
