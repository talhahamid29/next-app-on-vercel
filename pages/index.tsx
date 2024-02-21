import React, { useState , useEffect } from 'react'
import { TextField, Typography , Button , Dialog, DialogTitle, DialogContent, DialogActions, Toolbar , AppBar , 
          List , ListItem , ListItemText } from '@mui/material';
import axios from 'axios';

// Define action types

  interface Product {
    id: number;
    productCategory: string;
    productName: string;
    serialNumber: string;
    price: string;
   }

   interface MyError {
    response: {
      data: {
        error: string;
      };
    };
  }

  interface ProductResponse {
    data: {
        id: number;
        createdAt: Date;
        updatedAt: Date;
        productCategory: string;
        productName: string;
        serialNumber: number;
        price: number;
    }
}  

 

const Home = () => {
  const [productCategory , setProductCategory] = useState<string>('')
  const [productName , setProductName] = useState<string>('')
  const [serialNumber , setSerialNumber] = useState<string>('')
  const [price , setPrice] = useState<string>('')
  const [productData, setProductData] = useState<Product[]>([]);
  const [selectedProductId , setSelectedProductId] = useState<number>(0)
  const [isUpdateModalOpen, setUpdateModalOpen] = useState<boolean>(false);
  const [productCategoryModal , setProductCategoryModal] = useState<string>('')
  const [productNameModal , setProductNameModal] = useState<string>('')
  const [serialNumberModal , setSerialNumberModal] = useState<string>('')
  const [priceModal , setPriceModal] = useState<string>('')
  const [oldPriceUpdateOperation , setOldPriceUpdateOperation] = useState<number>(0)

  const handleAddProduct = async () => {
    try {
      console.log('before calling api')
      const response = await axios.post<ProductResponse>('/api/addproduct', { productCategory, productName , serialNumber : parseInt(serialNumber) , price : parseInt(price) });
      console.log('Product Added successfully:', response.data);
       setProductCategory('');
        setProductName('');
        setSerialNumber('');
        setPrice('')
        fetchProductData();
    } catch (error) {
        const addProductError = error as MyError;
      console.error('Error during product addition c:', addProductError.response.data.error);
    }
  };

  const fetchProductData = async () => {
    try {
      const response = await axios.get(`/api/displayproduct`);
      console.log(response.data);
      setProductData(response.data); // Assuming the server responds with an array of product data
    } catch (error) {
      const displayProductError = error as MyError;

      // Check if 'response' and 'response.data' are defined before accessing properties
      if (displayProductError.response && displayProductError.response.data) {
        console.error('Error fetching product data:', displayProductError.response.data.error);
      } else {
        console.error('Error fetching product data. No response data available.' , error);
      }
    }
  }

  useEffect(() => {
 fetchProductData();
}, []);


const handleUpdate = async () => {
  try {
    // const response = await axios.put(`/api/updateproduct/${selectedProductId}` , 
    const response = await axios.put(`/api/patchproduct/${selectedProductId}` ,
    {productCategoryModal , productNameModal , serialNumberModal: parseInt(serialNumberModal) , priceModal: parseInt(priceModal)});
    console.log(response.data);
    setUpdateModalOpen(false)
    fetchProductData();
   } catch (error) {
    const updateProductError = error as MyError;
    console.error('Error while updating product data:', updateProductError.response.data.error);
  }
}

const handleUpdateClick = (id : number , category: string , name: string , number: string , price: string) => {
  setSelectedProductId(id);
  console.log('Inside handleUpdateCLikc  selectedProductId type' , typeof(selectedProductId))
  setProductCategoryModal(category);
  setProductNameModal(name);
  setSerialNumberModal(number);
  setPriceModal(price)
  setOldPriceUpdateOperation(parseInt(price))
  setUpdateModalOpen(true);
}

const handleDelete = async (id: number , price: string) => {
  try {
    const response = await axios.delete(`/api/deleteproduct/${id}`);
     console.log(response.data);
    fetchProductData();
   } catch (error) {
    const deleteProductError = error as MyError;
    console.error('Error while deleting product data:', deleteProductError.response.data.error);
  }
}



 const cellStyle: React.CSSProperties = {border : "1px solid black" , textAlign : "center"}
 
return (
       
       <div style = {{position : "relative"}}> 
            
            <Typography sx={{paddingTop : 14 , marginLeft : 20}}>Product Category : </Typography>
            <TextField value={productCategory} onChange={(e)=>setProductCategory(e.target.value)} size = "small"
                       sx={{marginLeft : 40 , marginTop : -4}}></TextField>
            <Typography sx = {{marginLeft : 23 , marginTop : 2}}>Product Name : </Typography>
            <TextField value ={productName} onChange={(e)=>setProductName(e.target.value)} size = "small"
                       sx={{marginLeft : 40 , marginTop : -4}}></TextField>
            <Typography sx = {{marginLeft : 23 , marginTop : 2}}>Serial Number : </Typography>
            <TextField value ={serialNumber} onChange={(e)=>setSerialNumber(e.target.value)} size = "small" 
                       sx={{marginLeft : 40 , marginTop : -4}}></TextField>
            <Typography sx = {{marginLeft : 31 , marginTop : 2}}>Price : </Typography>
            <TextField value ={price} onChange={(e)=>setPrice(e.target.value)} size='small'
                       sx={{marginLeft : 40 , marginTop : -4}}></TextField>
            <br/>
            <Button variant='contained' onClick={handleAddProduct} 
                    sx = {{backgroundColor : "brown" , color : "gray" , marginLeft : 44 ,  "&:hover": { backgroundColor:"brown"}}}>
                      Add Product</Button>
            <table style={{border : "1px solid black" , width: "50%" , borderCollapse : "collapse", marginTop : 14 , 
                           marginLeft : 40}}>
              <thead>
                <tr >
                  <th style = {cellStyle}>Product Category</th>
                  <th style = {cellStyle}>Product Name</th>
                  <th style = {cellStyle}>Serial Number</th>
                  <th style = {cellStyle}>Price</th>
                  <th></th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {productData.map((product) => (
                  <tr key={product.id}>
                    <td style = {cellStyle}>{product.productCategory}</td>
                    <td style = {cellStyle}>{product.productName}</td>
                    <td style = {cellStyle}>{product.serialNumber}</td>
                    <td style = {cellStyle}>{product.price}</td>
                    <td style = {cellStyle}><Button variant='contained' onClick={()=>handleUpdateClick(product.id , product.productCategory ,
                                                         product.productName , product.serialNumber , product.price )} size = "small"
                                                         sx={{backgroundColor:"brown" , color : "gray" , "&:hover": {backgroundColor: "brown"}}}>
                                                           Update</Button>
                    </td>                                     
                    <td style = {cellStyle}><Button variant='contained' onClick={() => handleDelete(product.id , product.price)} size = "small"
                                             sx={{backgroundColor : "brown" , color : "gray" , "&:hover": {backgroundColor :"brown"}}}> Delete</Button>
                    </td>  
                  </tr>
                ))}
              </tbody>
            </table>

        <Dialog open={isUpdateModalOpen} onClose={() => setUpdateModalOpen(false)}>
          <DialogTitle>Update Product</DialogTitle>
          <DialogContent>
            <TextField sx={{marginTop : 1}}
              label="Product Category"
              value={productCategoryModal}
              onChange={(e) => setProductCategoryModal(e.target.value)}
            />
            <TextField sx={{marginTop : 1 , marginLeft : 2}}
              label="Product Name"
              value={productNameModal}
              onChange={(e) => setProductNameModal(e.target.value)}
            />
            <TextField sx={{marginTop : 2 }}
              label="Serial Number"
              value={serialNumberModal}
              onChange={(e) => setSerialNumberModal(e.target.value)}
            />
            <TextField sx={{marginTop : 2 , marginLeft : 2}}
              label="Price"
              value={priceModal}
              onChange={(e) => setPriceModal(e.target.value)}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setUpdateModalOpen(false)}>Cancel</Button>
            <Button onClick={handleUpdate}>Update</Button>
          </DialogActions>
        </Dialog>
          </div> 
          
    
  )
}


export default Home;
