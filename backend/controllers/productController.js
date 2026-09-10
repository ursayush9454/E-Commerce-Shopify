const Product= require("../models/Product");

const createProduct=async(req,res)=>{
    try{
        const {name,description,price,category,image,stock}=req.body;
        const product= await Product.create({
            name,
            description,
            price,
            category,
            image,
            stock,
        });

    res.status(201).json({
        message:"Product Created Succesfully",
        product
    });
} catch(error){
    res.status(500).json({
        message:"Failed to Create Product",
        error:error.message
    })
};
    };

    const getProducts=async(req,res)=>{
        try{
            const products=await Product.find();
            res.status(200).json({
                message:"Product Fetched Succesfully",
                products
            });

        }catch(error){
            res.status(500).json({
                message:"Failed to fetch Products",
                error:error.message,
            })
        }
    }

    const GetproductbyId=async(req,res)=>{
        try{
            const{id}=req.params;
            const product=await Product.findById(id);
            if(!product){
                return res.status(404).json({
                    message:"Product Not Found"
                })
            }
            res.status(200).json({
                message:"Product Fetched Succesfully",
                product
            })
        }catch(error){
            res.status(500).json({
                message:"Failed to fetch Product",
                error:error.message
            })
        }
    }

   const UpdateProduct = async (req, res) => {
    try {
        const { id } = req.params;

        const {
            name,
            description,
            category,
            price,
            image,
            stock
        } = req.body;

        const updatedProduct = await Product.findByIdAndUpdate(
            id,
            {
                name,
                description,
                price,
                category,
                image,
                stock
            },
            {
                new: true,
                runValidators: true
            }
        );

        if (!updatedProduct) {
            return res.status(404).json({
                message: "Product Not Found"
            });
        }

        res.status(200).json({
            message: "Product updated Successfully",
            product: updatedProduct
        });

    } catch (error) {
        res.status(500).json({
            message: "Error Updating product",
            error: error.message
        });
    }
};

const DeleteProduct=async(req,res)=>{
    try{
        const{id}=req.params;
        const deletedProduct=await Product.findByIdAndDelete(id)
        if(!deletedProduct){
            return res.status(404).json({
                message:"Product Not Found"

            })
        }
        res.status(200).json({
            message:"Product Deleted Succesfully",
            product:deletedProduct
        });
    }catch(error){
        res.status(500).json({
            message:"Error in Deleting Product",
            error: error.message,
        });
    };
}

module.exports = {
    createProduct,
    getProducts,
    GetproductbyId,
    UpdateProduct,
    DeleteProduct,

};