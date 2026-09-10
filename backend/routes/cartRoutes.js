const express= require("express")

const authMiddleWare=require("../middileware/authMiddleware")

const {
    addToCart,getCart,updateCart,removeFromCart,clearCart
}=require("../controllers/cartController")

const authMiddleware= require("../middileware/authMiddleware")

const router=express.Router();

router.post("/",authMiddleware,addToCart)

router.get("/", authMiddleWare, getCart);

router.put("/update",authMiddleWare,updateCart)

router.delete("/remove/:productId",authMiddleWare,removeFromCart);

router.delete("/clear",authMiddleWare,clearCart);
module.exports=router;