import { useEffect, useState } from "react";
import classes from "./AvaliableMelas.module.css";
import Card from "../UI/Card";
import MealItem from "./MealItem/MealItem";

const AvailableMeals = () => {
  const [meals, setMeals] = useState([]);
  const [isLodaing, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState();
  useEffect(() => {
    const fetchMeals = async () => {
      const res = await fetch(
        "https://ordermeal-6b537-default-rtdb.asia-southeast1.firebasedatabase.app/meals.json",
        { method: "GET" }
      );

      if (!res.ok) {
        throw new Error("something went wrong"); //*when we pass string to the contructor
        //this string will stored in the message propertty of the created error object
      }
      const resData = await res.json(); //will return an object *we want an array
      const loadedMeal = [];
      for (const key in resData) {
        loadedMeal.push({
          id: key,
          name: resData[key].name,
          description: resData[key].description,
          price: resData[key].price,
        });
      }
      setMeals(loadedMeal);
      setIsLoading(false);
    };

    fetchMeals().catch((e) => {
      setIsLoading(false);
      setHttpError(e.message);
    });
  }, []);
  if (isLodaing) {
    return (
      <section className={classes.MealsLoading}>
        <p>Loading...</p>
      </section>
    );
    console.log(httpError);
  }

  if (httpError) {
    console.log(httpError);
    return (
      <section className={classes.MealsError}>
        <p>{httpError}</p>
      </section>
    );
  }

  const mealsList = meals.map((meal) => (
    <MealItem
      id={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
      key={meal.id}
    />
  ));
  return (
    <section className={classes.meals}>
      <Card>
        <ul>{mealsList}</ul>
      </Card>
    </section>
  );
};
export default AvailableMeals;
