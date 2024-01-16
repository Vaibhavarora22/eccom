import CategoryModels from "../models/CategoryModels.js";
import slugify from "slugify";

// function for creating new category to show 
export const createCategoryCOntroller = async (req,res) =>{
    try{
        const { name } = req.body;
        if (!name) {
            return res.status(401).send({message : "Name is required"})

        }
        const existingCategory = await CategoryModels.findOne({ name });
        if (existingCategory) {
            return res.status(200).send({
                success: true,
                message: "category Already Exists",
            });
        }
        const category = await new CategoryModels({
            name,
            slug: slugify(name),
        }).save();
        res.status(201).send({
            success : true,
            message: "new categery added",
            category
        })

    }
    catch(error){
        console.log(error)
        res.status(500).send({
            success : false,
            error,
            message : 'error in category'
        });
    }
};

// function to  update existing category
export const updateCategoryController = async (req,res) => {
    try{
        const { name } = req.body;
        const { id } = req.params;
        const category = await CategoryModels.findByIdAndUpdate(id , {name , slug : slugify(name)} , {new:true});
        res.status(200).send({
            success : true,
            message: "category updated successfully",
            category

        });

    }
    catch(error){
        console.log(error)
        res.status(500).send({
            success : false,
            error,
            message : 'error while updating category '
        })
    }
}

//get all products
export const categoryController = async (req,res) => {
    try{
        const category = await CategoryModels.find({});
        res.status(200).send({
            success : true,
            message: "All category list",
            category

        });


    }
    catch(error){
        console.log(error)
        res.status(500).send({
            success : false,
            error,
            message : 'error while getting all categories '
        })
    }
    

};

//get single product
export const singleCategoryController = async(req , res) =>{
    try{
        const category = await CategoryModels.findOne({slug:req.params.slug});
        res.status(200).send({
            success : true,
            message: "Get single category successfully",
            category

        });


    }
    catch(error){
        console.log(error)
        res.status(500).send({
            success : false,
            error,
            message : 'Error while getting single category '
        })
    }
}

//delete category
export const deleteCategoryCOntroller = async (req, res) => {
    try {
      const { id } = req.params;
      await CategoryModels.findByIdAndDelete(id);
      res.status(200).send({
        success: true,
        message: "Categry Deleted Successfully",
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        message: "error while deleting category",
        error,
      });
    }
  };

