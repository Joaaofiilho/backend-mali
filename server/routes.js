import express from 'express'
import { ItemSchema } from '../database/database.js'

export let configureRoutes = (app) => {
    const router = express.Router()

    router.post("/create", async (req, res) => {
        if (!req.body.title || !req.body.quantity) {
            res.status(400).send({message: "Title or quantity not provided"})
            return
        }

        let item = new ItemSchema({
            title: req.body.title,
            quantity: req.body.quantity,
            category: req.body.category || null,
            done: req.body.done || false,
        })
        
        try {
            //save item and send the item back
            let savedItem = await item.save()
            res.status(200).send(savedItem)
        } catch(err) {
            res.status(500).send(err)
        }
    })

    router.get("/item/:id", async (req, res) => {
        try {
            if (!req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
                res.status(404).send({message: "There are no items with this id"})
                return
            }

            let item = await ItemSchema.findById(req.params.id)

            if(!item) {
                res.status(404).send({message: "There are no items with this id"})
                return
            }

            res.send(item)
        } catch(err) {
            res.status(500).send(err)
        }
    })

    router.get("/all", async (req, res) => {
        try {
            let items = await ItemSchema.find()

            if(!items) {
                res.status(204).send([])
                return
            }

            res.send(items)
        } catch(err) {
            res.status(500).send(err)
        }
    })

    router.delete("/delete/:id", async (req, res) => {
        try {
            if (!req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
                res.status(404).send({message: "There are no items with this id"})
                return
            }

            let item = await ItemSchema.findById(req.params.id)

            if(!item) {
                res.status(404).send({message: "There are no items with this id"})
                return
            }

            await item.remove()
            res.send("Item deleted successfully")
        } catch(err) {
            res.status(500).send(err)
        }
    })

    router.delete("/deletedone", async (req, res) => {
        try {
            let items = await ItemSchema.find()

            for (let i = 0; i < items.length; i++) {
                if (items[i].done === true) {
                    await items[i].remove()
                }
            }

            res.send("Items deleted successfully")
        } catch(err) {
            res.status(500).send(err)
        }
    })

    router.put("/update/:id", async (req, res) => {
        try {
            if (!req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
                res.status(404).send({message: "There are no items with this id"})
                return
            }

            let item = await ItemSchema.findById(req.params.id)

            if(!item) {
                res.status(404).send({message: "There are no items with this id"})
                return
            }

            if(!req.body.title || !req.body.quantity) {
                res.status(400).send({message: "Title or quantity not provided"})
                return
            }

            item.title = req.body.title
            item.quantity = req.body.quantity
            item.done = req.body.done
            
            if(req.body.category) {
                item.category = req.body.category
            }

            await item.save()
            res.send("Item updated successfully")
        } catch(err) {
            res.status(500).send(err)
        }
    })
    
    app.use(express.json())
    app.use(express.urlencoded({ extended: true }))
    app.use("/", router)
}