import express from "express";
import { connection } from "../db.js";
const app = express();
app.use(express.json());

app.post("/api/products", async (req,res)=>{
    try {
        const result= await connection.execute(
            "INSERT INTO products (name,price,image) VALUES (?,?,?)",[req.body.name, req.body.price, req.body.image]
        );
        res.json({
            product:{
                name:req.body.name,
                price:req.body.price
            },
            message:"product berhasil ditambah"
        })
    
    } catch (error) {
        console.error(error)
    }
})

app.put("/api/products/:id", async(req,res)=>{
    try {
        await connection.execute(
            "UPDATE products set name=?, price=?, image=? WHERE id=?",[req.body.name, req.body.price, req.body.image, req.params.id]
        );
        res.send("Product berhasil di update");
    
    } catch (error) {
        console.error(error)
    }
})

app.get("/api/products", async(req,res)=>{
    try {
        const result= await connection.query("SELECT * from products");
        res.json(result);
    
    } catch (error) {
        console.error(error)
    }
})

app.delete("/api/products/:id", async (req,res)=>{
    try {
        await connection.execute(
            "DELETE from products WHERE id=?",[req.params.id]
    
        )
        res.send("PRODUCT BERHASIL DIHAPUS")
     
    } catch (error) {
        console.error(error)
    }
})
app.get("/api/coba",(req,res)=>{
    res.send("Hello word");
})

app.listen(3000, ()=>{
    console.log("server berjalan di port 3000");
})