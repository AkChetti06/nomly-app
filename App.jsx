import { useMemo, useState } from "react";
import "./App.css";

const dietaryOptions = [
  "No Restrictions",
  "Vegetarian",
  "Vegan",
  "Halal",
  "Kosher",
  "Pescatarian",
  "Gluten-Free",
  "Dairy-Free",
  "Nut Allergy",
  "Shellfish Allergy",
  "Egg-Free",
  "No Beef",
  "No Pork"
];

const cuisineOptions = [
  "Open to Exploring",
  "Chinese",
  "Malay",
  "Indian",
  "Local Hawker Food",
  "Japanese",
  "Korean",
  "Thai",
  "Vietnamese",
  "Indonesian",
  "Western",
  "Italian",
  "Mexican",
  "Mediterranean",
  "Middle Eastern",
  "Filipino",
  "Taiwanese",
  "Café & Brunch",
  "Vegetarian Cuisine"
];

const foodPlaces = [
  {
    id: "place-1",
    name: "Campus Bowl",
    type: "Campus Food",
    cuisine: "Asian",
    price: 5.5,
    time: "4 min walk",
    rating: 4.6,
    menu: ["Chicken rice", "Vegetarian noodles", "Egg fried rice"],
    address: "SUTD Campus Canteen",
    mood: ["quick", "comfort", "budget"],
    reason: "Close to campus and suitable for a busy school day."
  },
  {
    id: "place-2",
    name: "Matcha Bento",
    type: "Nearby Cafe",
    cuisine: "Japanese",
    price: 8.9,
    time: "9 min walk",
    rating: 4.4,
    menu: ["Teriyaki chicken bento", "Tofu rice bowl", "Miso soup"],
    address: "Upper Changi Road",
    mood: ["comfort", "balanced"],
    reason: "Good when you want something warm and filling."
  },
  {
    id: "place-3",
    name: "Budget Cai Fan",
    type: "Hawker Food",
    cuisine: "Local Hawker Food",
    price: 4.2,
    time: "8 min walk",
    rating: 4.5,
    menu: ["Rice", "Egg", "Vegetables", "Chicken"],
    address: "Changi Business Park",
    mood: ["budget", "quick", "local"],
    reason: "Best low-budget choice when you want a proper meal."
  },
  {
    id: "place-4",
    name: "FairPrice Express",
    type: "Groceries",
    cuisine: "Grocery",
    price: 18,
    time: "7 min walk",
    rating: 4.2,
    menu: ["Eggs", "Rice", "Vegetables", "Milk", "Bread"],
    address: "Nearby NTUC FairPrice",
    mood: ["grocery", "meal prep"],
    reason: "Useful if you want to cook instead of eating out."
  }
];

const startingHomeRecipes = [
  {
    id: "recipe-1",
    name: "Egg Fried Rice",
    ingredients: "rice, eggs, onion, soy sauce, spring onion",
    time: "15 min",
    cost: 2.4,
    mood: "comfort",
    groceryAddress: "NTUC FairPrice near SUTD",
    reason: "Cheap, filling, and easy to cook if you have rice and eggs.",
    steps:
      "Cook rice first. Scramble eggs, add onion, add rice, season with soy sauce, and finish with spring onion."
  },
  {
    id: "recipe-2",
    name: "Tomato Egg Noodles",
    ingredients: "noodles, tomato, eggs, garlic, soy sauce",
    time: "18 min",
    cost: 2.8,
    mood: "warm",
    groceryAddress: "NTUC FairPrice near SUTD",
    reason: "Good for a warm comfort meal that is still budget-friendly.",
    steps:
      "Boil noodles. Fry garlic and tomato, add egg, then toss with noodles and light soy sauce."
  },
  {
    id: "recipe-3",
    name: "Tuna Mayo Wrap",
    ingredients: "wrap, canned tuna, mayo, cucumber, lettuce",
    time: "10 min",
    cost: 3.2,
    mood: "quick",
    groceryAddress: "Cold Storage Changi City Point",
    reason: "Fast option when you do not want to cook heavily.",
    steps:
      "Mix tuna and mayo. Add cucumber and lettuce into the wrap. Roll tightly and cut in half."
  }
];

const groceryPrices = {
  rice: 0.6,
  egg: 0.6,
  eggs: 1.2,
  onion: 0.4,
  "soy sauce": 0.3,
  "spring onion": 0.5,
  noodles: 0.9,
  tomato: 0.8,
  garlic: 0.3,
  wrap: 1.2,
  tuna: 2,
  "canned tuna": 2,
  mayo: 0.5,
  cucumber: 0.7,
  lettuce: 1,
  chicken: 2.8,
  tofu: 1.5,
  potato: 0.7,
  pasta: 1.2,
  cheese: 1.4,
  milk: 0.9,
  bread: 1,
  vegetables: 1.2,
  spinach: 1.2,
  lemon: 0.5,
  dhal: 1.3,
  lentils: 1.3,
  yoghurt: 1.2
};

const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

function LogoBlock() {
  return (
    <div className="logo-block">
      <img src="/nomly-logo.png" alt="Nomly smiling rice bowl logo" />
      <h1>Nomly</h1>
      <p>Eat smart. Spend better. Feel at home.</p>
    </div>
  );
}

function SplashScreen({ onFinish }) {
  const [started, setStarted] = useState(false);

  function startAnimation() {
    setStarted(true);
    setTimeout(() => {
      onFinish();
    }, 2800);
  }

  return (
    <div className="splash-screen">
      {!started ? (
        <button className="tap-logo-screen" onClick={startAnimation}>
          <img src="/nomly-logo.png" alt="Nomly logo" />
          <p>Tap to open Nomly</p>
        </button>
      ) : (
        <div className="splash-content animate-open">
          <img className="splash-logo" src="/nomly-logo.png" alt="Nomly logo" />
          <h1 className="draw-title">Nomly</h1>
          <p className="splash-tagline">Eat smart. Spend better. Feel at home.</p>
        </div>
      )}
    </div>
  );
}

function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [authMode, setAuthMode] = useState("login");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [onboardingStep, setOnboardingStep] = useState(0);
  const [page, setPage] = useState("home");

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    username: ""
  });

  const [budgetType, setBudgetType] = useState("weekly");
  const [budget, setBudget] = useState(70);
  const [remaining, setRemaining] = useState(70);

  const [dietaryPrefs, setDietaryPrefs] = useState([]);
  const [cuisinePrefs, setCuisinePrefs] = useState([]);

  const [fitnessEnabled, setFitnessEnabled] = useState(false);
  const [fitness, setFitness] = useState({
    calorieGoal: "",
    proteinGoal: "",
    targetWeight: "",
    activityLevel: ""
  });

  const [completedMeals, setCompletedMeals] = useState([]);
  const [favourites, setFavourites] = useState([]);
  const [homeRecipes, setHomeRecipes] = useState(startingHomeRecipes);

  const [ingredients, setIngredients] = useState("");
  const [appliances, setAppliances] = useState([]);
  const [time, setTime] = useState(15);
  const [recipe, setRecipe] = useState(null);

  const [recommendMood, setRecommendMood] = useState("budget");
  const [recommendMaxPrice, setRecommendMaxPrice] = useState(7);

  const [newRecipe, setNewRecipe] = useState({
    name: "",
    ingredients: "",
    time: "",
    mood: "comfort",
    groceryAddress: "NTUC FairPrice near SUTD",
    steps: ""
  });

  const [mealPlan, setMealPlan] = useState(
    days.reduce((acc, day) => {
      acc[day] = { breakfast: "", lunch: "", dinner: "" };
      return acc;
    }, {})
  );

  function handleSignupNext() {
    if (!user.name || !user.email || !user.password) {
      alert("Please fill in all fields.");
      return;
    }

    if (user.password.length < 8) {
      alert("Password must be at least 8 characters.");
      return;
    }

    setOnboardingStep(1);
  }

  function handleBudgetNext() {
    if (!budget || budget <= 0) {
      alert("Please enter a valid budget.");
      return;
    }

    setRemaining(Number(budget));
    setOnboardingStep(2);
  }

  function handlePreferencesNext() {
    if (dietaryPrefs.length === 0 || cuisinePrefs.length === 0) {
      alert("Please select at least one dietary and cuisine preference.");
      return;
    }

    setOnboardingStep(3);
  }

  function finishOnboarding() {
    setIsLoggedIn(true);
    setPage("home");
  }

  function handleLogin() {
    if (!user.username || !user.password) {
      alert("Please enter your username/email and password.");
      return;
    }

    setIsLoggedIn(true);
    setPage("home");
  }

  function toggleArrayValue(value, list, setter) {
    if (list.includes(value)) {
      setter(list.filter((item) => item !== value));
    } else {
      if (value === "Open to Exploring") {
        setter(["Open to Exploring"]);
      } else {
        setter([...list.filter((item) => item !== "Open to Exploring"), value]);
      }
    }
  }

  function updateBudget(value) {
    const newBudget = Number(value);
    if (Number.isNaN(newBudget)) return;

    const spent = budget - remaining;
    const newRemaining = Math.max(newBudget - spent, 0);

    setBudget(newBudget);
    setRemaining(Number(newRemaining.toFixed(2)));
  }

  function completeMeal(item) {
    const itemPrice = Number(item.price || item.cost || 0);

    if (remaining - itemPrice < 0) {
      alert("This meal exceeds your remaining budget.");
      return;
    }

    setRemaining((prev) => Number((prev - itemPrice).toFixed(2)));
    setCompletedMeals((prev) => [
      ...prev,
      {
        name: item.name,
        price: itemPrice
      }
    ]);
  }

  function toggleAppliance(item) {
    if (appliances.includes(item)) {
      setAppliances(appliances.filter((a) => a !== item));
    } else {
      setAppliances([...appliances, item]);
    }
  }

  function estimateCost(text) {
    const items = text
      .toLowerCase()
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean);

    let total = 0;

    items.forEach((item) => {
      const matchedKey = Object.keys(groceryPrices).find((key) => item.includes(key));
      total += matchedKey ? groceryPrices[matchedKey] : 0.8;
    });

    return Number(total.toFixed(2));
  }

  function findBestHomeRecipeMatch(inputIngredients) {
    const input = inputIngredients.toLowerCase();

    return homeRecipes
      .map((item) => {
        const matches = item.ingredients
          .toLowerCase()
          .split(",")
          .map((ingredient) => ingredient.trim())
          .filter((ingredient) => input.includes(ingredient)).length;

        return { ...item, matches };
      })
      .sort((a, b) => b.matches - a.matches)[0];
  }

  function generateRecipe() {
    if (!ingredients.trim()) {
      setRecipe({
        id: `ai-${Date.now()}`,
        name: "Add ingredients first",
        cost: 0,
        ingredients: "",
        groceryAddress: "NTUC FairPrice near SUTD",
        text: "Type a few ingredients you have, such as rice, eggs, tomato, noodles, or tofu.",
        steps: []
      });
      return;
    }

    const applianceText = appliances.length ? appliances.join(", ") : "basic tools";
    const cost = estimateCost(ingredients);
    const matchedRecipe = findBestHomeRecipeMatch(ingredients);
    const hasHomeRecipeMatch = matchedRecipe && matchedRecipe.matches > 0;

    setRecipe({
      id: `ai-${Date.now()}`,
      name: hasHomeRecipeMatch
        ? `Budget version of ${matchedRecipe.name}`
        : "Student Budget Bowl",
      cost,
      ingredients,
      groceryAddress: hasHomeRecipeMatch
        ? matchedRecipe.groceryAddress || "NTUC FairPrice near SUTD"
        : "NTUC FairPrice near SUTD",
      text: hasHomeRecipeMatch
        ? `Nomly found a similar saved home recipe: ${matchedRecipe.name}. Estimated grocery cost from a local store is around SGD ${cost.toFixed(
            2
          )}.`
        : `Based on your ingredients, appliances (${applianceText}), and ${time} minutes, Nomly suggests a simple student-friendly meal. Estimated grocery cost from a local store is around SGD ${cost.toFixed(
            2
          )}.`,
      steps: [
        "Prepare your ingredients and wash any vegetables.",
        "Cook the base first, such as rice, noodles, bread, or wrap.",
        "Add your protein and vegetables.",
        "Season lightly and taste before serving.",
        "Pack leftovers for tomorrow if you want to save more money."
      ]
    });
  }

  function toggleFavourite(item) {
    const id = item.id || item.name;

    if (favourites.some((fav) => (fav.id || fav.name) === id)) {
      setFavourites(favourites.filter((fav) => (fav.id || fav.name) !== id));
    } else {
      setFavourites([...favourites, item]);
    }
  }

  function isFavourite(item) {
    const id = item.id || item.name;
    return favourites.some((fav) => (fav.id || fav.name) === id);
  }

  function addOwnRecipe() {
    if (!newRecipe.name.trim() || !newRecipe.ingredients.trim()) {
      alert("Please add a recipe name and ingredients.");
      return;
    }

    const recipeToAdd = {
      id: `recipe-${Date.now()}`,
      name: newRecipe.name,
      ingredients: newRecipe.ingredients,
      time: newRecipe.time || "20 min",
      mood: newRecipe.mood,
      groceryAddress: newRecipe.groceryAddress || "NTUC FairPrice near SUTD",
      cost: estimateCost(newRecipe.ingredients),
      reason: "Saved from your own home recipes.",
      steps:
        newRecipe.steps ||
        "Prepare the ingredients, cook the base, add protein or vegetables, season, and serve."
    };

    setHomeRecipes([...homeRecipes, recipeToAdd]);
    setNewRecipe({
      name: "",
      ingredients: "",
      time: "",
      mood: "comfort",
      groceryAddress: "NTUC FairPrice near SUTD",
      steps: ""
    });
  }

  function updateMealPlan(day, meal, value) {
    setMealPlan({
      ...mealPlan,
      [day]: {
        ...mealPlan[day],
        [meal]: value
      }
    });
  }

  function mapLink(address) {
    return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;
  }

  const budgetPercent = Math.max(0, Math.min(100, budget ? (remaining / budget) * 100 : 0));
  const spent = Number((budget - remaining).toFixed(2));
  const dailyGuide = budgetType === "weekly" ? remaining / 7 : remaining / 30;

  const allSuggestions = useMemo(() => {
    const restaurantOptions = foodPlaces
      .filter((place) => place.type !== "Groceries")
      .map((place) => ({
        ...place,
        category: "Restaurant",
        price: place.price,
        mapAddress: place.address
      }));

    const recipeOptions = homeRecipes.map((item) => ({
      ...item,
      category: "Recipe",
      type: "Cook on campus",
      cuisine: "Home cooked",
      price: item.cost,
      rating: 4.8,
      mapAddress: item.groceryAddress || "NTUC FairPrice near SUTD",
      menu: item.ingredients.split(",").map((x) => x.trim())
    }));

    return [...restaurantOptions, ...recipeOptions]
      .filter((item) => Number(item.price) <= Math.max(dailyGuide + 4, 4))
      .sort((a, b) => Number(a.price) - Number(b.price));
  }, [dailyGuide, homeRecipes]);

  const todaySuggestions = allSuggestions.slice(0, 5);

  const combinedRecommendations = useMemo(() => {
    const restaurantOptions = foodPlaces.map((place) => ({
      ...place,
      category: "Food Place",
      mapAddress: place.address
    }));

    const recipeOptions = homeRecipes.map((item) => ({
      ...item,
      category: "Recipe",
      type: "Cook on campus",
      cuisine: "Home cooked",
      price: item.cost,
      rating: 4.8,
      time: item.time,
      mapAddress: item.groceryAddress || "NTUC FairPrice near SUTD",
      menu: item.ingredients.split(",").map((x) => x.trim()),
      mood: [item.mood, "budget", "home"]
    }));

    return [...restaurantOptions, ...recipeOptions]
      .filter((item) => Number(item.price) <= Number(recommendMaxPrice))
      .filter((item) => {
        const moodText = Array.isArray(item.mood) ? item.mood.join(" ") : item.mood;
        const text = `${item.name} ${item.cuisine} ${item.type} ${moodText}`.toLowerCase();

        return recommendMood === "any" || text.includes(recommendMood.toLowerCase());
      })
      .sort((a, b) => a.price - b.price);
  }, [homeRecipes, recommendMaxPrice, recommendMood]);

  if (showSplash) {
    return <SplashScreen onFinish={() => setShowSplash(false)} />;
  }

  if (!isLoggedIn) {
    return (
      <div className="auth-page">
        <div className="phone-frame">
          <div className="auth-card">
            <LogoBlock />

            {authMode === "login" && (
              <div className="auth-form">
                <h2>Welcome back</h2>
                <p className="auth-subtitle">Let’s plan something comforting today.</p>

                <label>Username or Email</label>
                <input
                  value={user.username}
                  onChange={(e) => setUser({ ...user, username: e.target.value })}
                  placeholder="Enter your username or email"
                />

                <label>Password</label>
                <input
                  type="password"
                  value={user.password}
                  onChange={(e) => setUser({ ...user, password: e.target.value })}
                  placeholder="Enter your password"
                />

                <button className="primary full" onClick={handleLogin}>
                  Log In
                </button>

                <p className="switch-text">
                  Don’t have an account?{" "}
                  <button onClick={() => setAuthMode("signup")}>Sign up</button>
                </p>
              </div>
            )}

            {authMode === "signup" && onboardingStep === 0 && (
              <div className="auth-form">
                <h2>Create your account</h2>
                <p className="auth-subtitle">A few details to personalise Nomly for you.</p>

                <label>Name</label>
                <input
                  value={user.name}
                  onChange={(e) => setUser({ ...user, name: e.target.value })}
                  placeholder="Enter your full name"
                />

                <label>Email</label>
                <input
                  value={user.email}
                  onChange={(e) => setUser({ ...user, email: e.target.value })}
                  placeholder="Enter your email"
                />

                <label>Password</label>
                <input
                  type="password"
                  value={user.password}
                  onChange={(e) => setUser({ ...user, password: e.target.value })}
                  placeholder="Minimum 8 characters"
                />

                <button className="primary full" onClick={handleSignupNext}>
                  Next
                </button>

                <p className="switch-text">
                  Already have an account?{" "}
                  <button onClick={() => setAuthMode("login")}>Log in</button>
                </p>
              </div>
            )}

            {authMode === "signup" && onboardingStep === 1 && (
              <div className="auth-form">
                <h2>Set your food budget</h2>
                <p className="auth-subtitle">This helps Nomly plan realistic food options.</p>

                <div className="toggle-row">
                  <button
                    className={budgetType === "weekly" ? "selected" : ""}
                    onClick={() => setBudgetType("weekly")}
                  >
                    Weekly
                  </button>
                  <button
                    className={budgetType === "monthly" ? "selected" : ""}
                    onClick={() => setBudgetType("monthly")}
                  >
                    Monthly
                  </button>
                </div>

                <label>Budget Amount</label>
                <input
                  type="number"
                  value={budget}
                  onChange={(e) => updateBudget(e.target.value)}
                  placeholder="Example: 70"
                />

                <button className="primary full" onClick={handleBudgetNext}>
                  Next
                </button>
              </div>
            )}

            {authMode === "signup" && onboardingStep === 2 && (
              <div className="auth-form scroll-form">
                <h2>Your food preferences</h2>

                <label>Dietary restrictions</label>
                <div className="chips">
                  {dietaryOptions.map((item) => (
                    <button
                      key={item}
                      className={dietaryPrefs.includes(item) ? "selected" : ""}
                      onClick={() => toggleArrayValue(item, dietaryPrefs, setDietaryPrefs)}
                    >
                      {item}
                    </button>
                  ))}
                </div>

                <label>Cuisine preferences</label>
                <div className="chips">
                  {cuisineOptions.map((item) => (
                    <button
                      key={item}
                      className={cuisinePrefs.includes(item) ? "selected" : ""}
                      onClick={() => toggleArrayValue(item, cuisinePrefs, setCuisinePrefs)}
                    >
                      {item}
                    </button>
                  ))}
                </div>

                <button className="primary full" onClick={handlePreferencesNext}>
                  Next
                </button>
              </div>
            )}

            {authMode === "signup" && onboardingStep === 3 && (
              <div className="auth-form">
                <h2>Fitness and wellness</h2>
                <p className="auth-subtitle">Optional. You can skip this anytime.</p>

                <label className="check">
                  <input
                    type="checkbox"
                    checked={fitnessEnabled}
                    onChange={(e) => setFitnessEnabled(e.target.checked)}
                  />
                  Enable personalised fitness suggestions
                </label>

                {fitnessEnabled && (
                  <>
                    <label>Daily calorie goal</label>
                    <input
                      value={fitness.calorieGoal}
                      onChange={(e) => setFitness({ ...fitness, calorieGoal: e.target.value })}
                      placeholder="Example: 1800 kcal"
                    />

                    <label>Protein goal</label>
                    <input
                      value={fitness.proteinGoal}
                      onChange={(e) => setFitness({ ...fitness, proteinGoal: e.target.value })}
                      placeholder="Example: 90g"
                    />

                    <label>Target weight</label>
                    <input
                      value={fitness.targetWeight}
                      onChange={(e) => setFitness({ ...fitness, targetWeight: e.target.value })}
                      placeholder="Example: 60kg"
                    />

                    <label>Activity level</label>
                    <select
                      value={fitness.activityLevel}
                      onChange={(e) => setFitness({ ...fitness, activityLevel: e.target.value })}
                    >
                      <option value="">Select activity level</option>
                      <option>Low Activity</option>
                      <option>Moderate Activity</option>
                      <option>Active</option>
                      <option>Athlete</option>
                    </select>
                  </>
                )}

                <div className="two-buttons">
                  <button onClick={finishOnboarding}>Skip</button>
                  <button className="primary" onClick={finishOnboarding}>
                    Get Started
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="app mobile-app">
      <main className="main mobile-main">
        {page === "home" && (
          <>
            <header className="simple-home-header">
              <div>
                <p className="eyebrow">Hi {user.name || "friend"} 🌿</p>
                <h2>Today’s food suggestions</h2>
              </div>

              <div className="budget-left-pill">
                <span>Budget left</span>
                <strong>SGD {remaining.toFixed(2)}</strong>
              </div>
            </header>

            <section className="today-list">
              {todaySuggestions.map((item) => (
                <div className="today-card" key={item.id || item.name}>
                  <div className="today-card-top">
                    <div>
                      <p className="food-tag">{item.category}</p>
                      <h3>{item.name}</h3>
                    </div>

                    <div className="price-badge">SGD {Number(item.price).toFixed(2)}</div>
                  </div>

                  <p className="muted">
                    {item.type} · {item.time} · ⭐ {item.rating}
                  </p>

                  <p>{item.reason}</p>

                  {item.category === "Recipe" && (
                    <div className="ingredient-box">
                      <strong>Ingredients needed:</strong>
                      <p>{item.ingredients}</p>
                      <small>Cook on campus or buy ingredients from a nearby grocery store.</small>
                    </div>
                  )}

                  {item.category === "Restaurant" && (
                    <div className="ingredient-box">
                      <strong>Suggested items:</strong>
                      <p>{item.menu.join(", ")}</p>
                    </div>
                  )}

                  <div className="action-row">
                    <button onClick={() => completeMeal(item)}>Tick as eaten</button>
                    <button onClick={() => toggleFavourite(item)}>
                      {isFavourite(item) ? "Saved ♥" : "Favourite ♡"}
                    </button>
                    <a
                      href={mapLink(item.mapAddress)}
                      target="_blank"
                      rel="noreferrer"
                    >
                      Map
                    </a>
                  </div>
                </div>
              ))}
            </section>
          </>
        )}

        {page === "recommend" && (
          <>
            <h2>🍽 What should I eat?</h2>
            <p className="muted">Nomly compares restaurants and your home recipes to suggest budget-friendly meals.</p>

            <div className="card form-card">
              <label>Mood</label>
              <select value={recommendMood} onChange={(e) => setRecommendMood(e.target.value)}>
                <option value="any">Anything</option>
                <option value="budget">Budget</option>
                <option value="quick">Quick</option>
                <option value="comfort">Comfort</option>
                <option value="warm">Warm</option>
                <option value="local">Local</option>
              </select>

              <label>Maximum price: SGD {recommendMaxPrice}</label>
              <input
                type="range"
                min="2"
                max="20"
                value={recommendMaxPrice}
                onChange={(e) => setRecommendMaxPrice(e.target.value)}
              />
            </div>

            <div className="places">
              {combinedRecommendations.length === 0 ? (
                <div className="card">
                  <p>No matching options found. Try increasing your maximum price.</p>
                </div>
              ) : (
                combinedRecommendations.map((item) => (
                  <div className="place-card" key={item.id || item.name}>
                    <div>
                      <h3>{item.name}</h3>
                      <p>{item.type} · {item.cuisine} · ⭐ {item.rating}</p>
                      <p>{item.time} · Avg SGD {Number(item.price).toFixed(2)}</p>

                      {item.category === "Recipe" ? (
                        <div className="ingredient-box">
                          <strong>Ingredients needed:</strong>
                          <p>{item.ingredients}</p>
                        </div>
                      ) : (
                        <p className="muted">Menu: {item.menu.join(", ")}</p>
                      )}
                    </div>

                    <div className="place-actions">
                      <button onClick={() => completeMeal(item)}>Tick as eaten</button>
                      <button onClick={() => toggleFavourite(item)}>
                        {isFavourite(item) ? "Saved ♥" : "Favourite ♡"}
                      </button>
                      <a
                        href={mapLink(item.mapAddress)}
                        target="_blank"
                        rel="noreferrer"
                      >
                        Map
                      </a>
                    </div>
                  </div>
                ))
              )}
            </div>
          </>
        )}

        {page === "planner" && (
          <>
            <h2>🗓 Meal Planning</h2>
            <p className="muted">Edit your budget and plan breakfast, lunch, and dinner for the week.</p>

            <div className="card budget-editor-card">
              <h3>Editable Budget</h3>

              <label>Budget Type</label>
              <select value={budgetType} onChange={(e) => setBudgetType(e.target.value)}>
                <option value="weekly">Weekly</option>
                <option value="monthly">Monthly</option>
              </select>

              <label>Budget Amount</label>
              <input
                type="number"
                value={budget}
                onChange={(e) => updateBudget(e.target.value)}
              />

              <p>Remaining: SGD {remaining.toFixed(2)}</p>
              <p>Spent: SGD {spent.toFixed(2)}</p>

              <div className="bar">
                <span style={{ width: `${budgetPercent}%` }}></span>
              </div>
            </div>

            <div className="planner-grid">
              {days.map((day) => (
                <div className="card planner-card" key={day}>
                  <h3>{day}</h3>

                  <label>Breakfast</label>
                  <input
                    value={mealPlan[day].breakfast}
                    onChange={(e) => updateMealPlan(day, "breakfast", e.target.value)}
                    placeholder="e.g. Kaya toast"
                  />

                  <label>Lunch</label>
                  <input
                    value={mealPlan[day].lunch}
                    onChange={(e) => updateMealPlan(day, "lunch", e.target.value)}
                    placeholder="e.g. Campus Bowl"
                  />

                  <label>Dinner</label>
                  <input
                    value={mealPlan[day].dinner}
                    onChange={(e) => updateMealPlan(day, "dinner", e.target.value)}
                    placeholder="e.g. Egg fried rice"
                  />
                </div>
              ))}
            </div>
          </>
        )}

        {page === "recipes" && (
          <>
            <h2>🍳 Recipes</h2>
            <p className="muted">
              Use Cook AI, save your own recipes, and find grocery directions for each recipe.
            </p>

            <div className="card form-card">
              <h3>Cook AI</h3>

              <label>What ingredients do you have?</label>
              <textarea
                placeholder="Example: rice, eggs, spinach, soy sauce"
                value={ingredients}
                onChange={(e) => setIngredients(e.target.value)}
              />

              <label>Available appliances</label>
              <div className="chips">
                {["Microwave", "Rice Cooker", "Air Fryer", "Induction Stove", "Kettle"].map((item) => (
                  <button
                    key={item}
                    onClick={() => toggleAppliance(item)}
                    className={appliances.includes(item) ? "selected" : ""}
                  >
                    {item}
                  </button>
                ))}
              </div>

              <label>How much time do you have? {time} mins</label>
              <input
                type="range"
                min="5"
                max="60"
                value={time}
                onChange={(e) => setTime(e.target.value)}
              />

              <button className="primary" onClick={generateRecipe}>Generate Recipe</button>

              {recipe && (
                <div className="recipe-box">
                  <h3>{recipe.name}</h3>
                  <p>{recipe.text}</p>
                  <p><strong>Ingredients:</strong> {recipe.ingredients || "Add ingredients to see this clearly."}</p>
                  <p><strong>Estimated grocery cost:</strong> SGD {recipe.cost.toFixed(2)}</p>

                  {recipe.steps.length > 0 && (
                    <ol>
                      {recipe.steps.map((step, index) => (
                        <li key={index}>{step}</li>
                      ))}
                    </ol>
                  )}

                  <div className="action-row">
                    <button onClick={() => toggleFavourite(recipe)}>
                      {isFavourite(recipe) ? "Saved ♥" : "Favourite ♡"}
                    </button>
                    <a
                      href={mapLink(recipe.groceryAddress)}
                      target="_blank"
                      rel="noreferrer"
                    >
                      Grocery Map
                    </a>
                  </div>
                </div>
              )}
            </div>

            <div className="card form-card">
              <h3>➕ Add Your Own Home Recipe</h3>

              <label>Recipe name</label>
              <input
                value={newRecipe.name}
                onChange={(e) => setNewRecipe({ ...newRecipe, name: e.target.value })}
                placeholder="Example: Amma's lemon rice"
              />

              <label>Ingredients</label>
              <textarea
                value={newRecipe.ingredients}
                onChange={(e) => setNewRecipe({ ...newRecipe, ingredients: e.target.value })}
                placeholder="Example: rice, lemon, dhal, curry leaves"
              />

              <label>Nearby grocery store for this recipe</label>
              <input
                value={newRecipe.groceryAddress}
                onChange={(e) => setNewRecipe({ ...newRecipe, groceryAddress: e.target.value })}
                placeholder="Example: NTUC FairPrice near SUTD"
              />

              <label>Time needed</label>
              <input
                value={newRecipe.time}
                onChange={(e) => setNewRecipe({ ...newRecipe, time: e.target.value })}
                placeholder="Example: 20 min"
              />

              <label>Mood</label>
              <select
                value={newRecipe.mood}
                onChange={(e) => setNewRecipe({ ...newRecipe, mood: e.target.value })}
              >
                <option value="comfort">Comfort</option>
                <option value="quick">Quick</option>
                <option value="budget">Budget</option>
                <option value="warm">Warm</option>
                <option value="healthy">Healthy</option>
              </select>

              <label>Steps</label>
              <textarea
                value={newRecipe.steps}
                onChange={(e) => setNewRecipe({ ...newRecipe, steps: e.target.value })}
                placeholder="Write the steps, or leave blank for a simple default."
              />

              <button className="primary" onClick={addOwnRecipe}>Add Recipe</button>
            </div>

            <div className="places">
              <h2>Your Home Recipes</h2>
              {homeRecipes.map((item) => (
                <div className="place-card" key={item.id}>
                  <div>
                    <h3>{item.name}</h3>
                    <p>{item.time} · Estimated SGD {item.cost.toFixed(2)}</p>

                    <div className="ingredient-box">
                      <strong>Ingredients needed:</strong>
                      <p>{item.ingredients}</p>
                    </div>
                  </div>

                  <div className="place-actions">
                    <button onClick={() => toggleFavourite(item)}>
                      {isFavourite(item) ? "Saved ♥" : "Favourite ♡"}
                    </button>
                    <a
                      href={mapLink(item.groceryAddress || "NTUC FairPrice near SUTD")}
                      target="_blank"
                      rel="noreferrer"
                    >
                      Grocery Map
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {page === "profile" && (
          <>
            <h2>👤 Your Preferences</h2>
            <p className="muted">Nomly becomes better when it understands your lifestyle.</p>

            <div className="card form-card">
              <label>Name</label>
              <input value={user.name} onChange={(e) => setUser({ ...user, name: e.target.value })} />

              <label>Email</label>
              <input value={user.email} onChange={(e) => setUser({ ...user, email: e.target.value })} />

              <label>Dietary Preferences</label>
              <p>{dietaryPrefs.join(", ") || "No preferences selected"}</p>

              <label>Cuisine Preferences</label>
              <p>{cuisinePrefs.join(", ") || "No preferences selected"}</p>

              <label>Fitness Enabled</label>
              <p>{fitnessEnabled ? "Yes" : "No"}</p>

              <button className="primary">Save Preferences</button>
            </div>

            <div className="card">
              <h3>⭐ Favourite Recipes & Restaurants</h3>
              {favourites.length === 0 ? (
                <p className="muted">No favourites saved yet.</p>
              ) : (
                favourites.map((fav) => (
                  <div className="favourite-row" key={fav.id || fav.name}>
                    <div>
                      <strong>{fav.name}</strong>
                      <p>SGD {Number(fav.price || fav.cost || 0).toFixed(2)}</p>
                    </div>

                    <a
                      href={mapLink(fav.mapAddress || fav.groceryAddress || fav.address || "NTUC FairPrice near SUTD")}
                      target="_blank"
                      rel="noreferrer"
                    >
                      Map
                    </a>
                  </div>
                ))
              )}
            </div>

            <div className="card">
              <h3>How to improve the AI bot later</h3>
              <p className="muted">
                Right now, the bot uses simple rules. To make it stronger, connect it to a real AI API,
                add a larger grocery price database, and let it compare recipes by cost, nutrition, time,
                appliances, and dietary preferences.
              </p>
            </div>
          </>
        )}
      </main>

      <nav className="bottom-nav">
        <button onClick={() => setPage("home")} className={page === "home" ? "active" : ""}>
          <span>⌂</span>
          Home
        </button>

        <button onClick={() => setPage("recommend")} className={page === "recommend" ? "active" : ""}>
          <span>🍽</span>
          Eat
        </button>

        <button onClick={() => setPage("planner")} className={page === "planner" ? "active" : ""}>
          <span>🗓</span>
          Plan
        </button>

        <button onClick={() => setPage("recipes")} className={page === "recipes" ? "active" : ""}>
          <span>🍳</span>
          Recipes
        </button>

        <button onClick={() => setPage("profile")} className={page === "profile" ? "active" : ""}>
          <span>○</span>
          Me
        </button>
      </nav>
    </div>
  );
}

export default App;