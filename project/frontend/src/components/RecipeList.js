import React, { useState, useEffect } from 'react';
import axios from 'axios';

function RecipeList() {
    const [recipes, setRecipes] = useState([]);
    const [newRecipe, setNewRecipe] = useState({
        name: '',
        ingredients: '',
        instructions: '',
        prepTime: ''
    });

    useEffect(() => {
        fetchRecipes();
    }, []);

    const fetchRecipes = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/Recipe');
            setRecipes(response.data);
        } catch (error) {
            console.error('Error fetching recipes:', error);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewRecipe(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/api/Recipe', {
                ...newRecipe,
                prepTime: parseInt(newRecipe.prepTime)
            });
            setNewRecipe({
                name: '',
                ingredients: '',
                instructions: '',
                prepTime: ''
            });
            fetchRecipes();
        } catch (error) {
            console.error('Error creating recipe:', error);
        }
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/api/Recipe/${id}`);
            fetchRecipes();
        } catch (error) {
            console.error('Error deleting recipe:', error);
        }
    };

    return (
        <div className="container mt-4">
            <h2>Recipe Manager</h2>
            
            <form onSubmit={handleSubmit} className="mb-4">
                <div className="mb-3">
                    <input
                        type="text"
                        name="name"
                        value={newRecipe.name}
                        onChange={handleInputChange}
                        placeholder="Recipe Name"
                        className="form-control"
                        required
                    />
                </div>
                <div className="mb-3">
                    <textarea
                        name="ingredients"
                        value={newRecipe.ingredients}
                        onChange={handleInputChange}
                        placeholder="Ingredients (one per line)"
                        className="form-control"
                        required
                    />
                </div>
                <div className="mb-3">
                    <textarea
                        name="instructions"
                        value={newRecipe.instructions}
                        onChange={handleInputChange}
                        placeholder="Instructions"
                        className="form-control"
                        required
                    />
                </div>
                <div className="mb-3">
                    <input
                        type="number"
                        name="prepTime"
                        value={newRecipe.prepTime}
                        onChange={handleInputChange}
                        placeholder="Preparation Time (minutes)"
                        className="form-control"
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary">Add Recipe</button>
            </form>

            <div className="row">
                {recipes.map(recipe => (
                    <div key={recipe.id} className="col-md-4 mb-4">
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">{recipe.name}</h5>
                                <p className="card-text">
                                    <strong>Prep Time:</strong> {recipe.prepTime} minutes
                                </p>
                                <p className="card-text">
                                    <strong>Ingredients:</strong><br />
                                    {recipe.ingredients}
                                </p>
                                <p className="card-text">
                                    <strong>Instructions:</strong><br />
                                    {recipe.instructions}
                                </p>
                                <button
                                    onClick={() => handleDelete(recipe.id)}
                                    className="btn btn-danger"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default RecipeList; 