import { Request, Response } from "express";
import Restaurant from "../models/RestaurantModel";

const getRestaurant = async (req: Request, res: Response) => {
  try {
    const restaurantId = req.params.restaurantId;

    const restaurant = await Restaurant.findById(restaurantId);
    if (!restaurant) {
      return res.status(404).json({ message: "restaurant not found" });
    }

    res.json(restaurant);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "something went wrong" });
  }
};



const searchRestaurant = async (req: Request, res: Response) => {
    try {
      const city = req.params.city;

      //variables for search query
      const searchQuery = (req.query.searchQuery as string) || "";
      const selectedCuisines = (req.query.selectedCuisines as string) || "";
      const sortOption = (req.query.sortOption as string) || "lastUpdated";
      
      const page = parseInt(req.query.page as string) || 1;
        
      //we dont really have to create a type for query
      let query: any = {};
      
      // if user put lahore , Lahore , it means just return lahore
      query["city"] = new RegExp(city, "i");

      //search restaurant documents and return thei number
      const cityCheck = await Restaurant.countDocuments(query);
      if (cityCheck === 0) {
        return res.status(404).json({
          data: [],
          pagination: {
            total: 0,
            page: 1,
            pages: 1,
          },
        });
      }
  
      //split burger, pizza , ,.. to array split on base of comma
      if (selectedCuisines) {
        const cuisinesArray = selectedCuisines
          .split(",")
          .map((cuisine) => new RegExp(cuisine, "i"));
        
          // fins restaurants which have has all cuisines in the array
        query["cuisines"] = { $all: cuisinesArray };
      }
  
      if (searchQuery) {
        //check name or cuisines
        //in cuz we are looking for any match , not all the macthes
        const searchRegex = new RegExp(searchQuery, "i");
        query["$or"] = [
          { restaurantName: searchRegex },
          { cuisines: { $in: [searchRegex] } },
        ];
      }
      
      //no of items per page
      const pageSize = 10;
      //skip first 10 results and so on 
      const skip = (page - 1) * pageSize;
  
      // sortOption = "lastUpdated"
      //sort in order of creation , skip according to skip variable , limiting to psge size and lean means to renove the unecessary mongo stuff and show a simple js object
      const restaurants = await Restaurant.find(query)
        .sort({ [sortOption]: 1 })
        .skip(skip)
        .limit(pageSize)
        .lean();
  
        //all total count 
      const total = await Restaurant.countDocuments(query);
  
      const response = {
        data: restaurants,
        pagination: {
          total,
          page,
          pages: Math.ceil(total / pageSize),
        },
      };
  
      res.json(response);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Something went wrong" });
    }
  };
  
export {searchRestaurant ,  getRestaurant}