// src/utils/validationUtils.js

export const validateToyData = (data) => {
    const errors = [];

    // 1. Name check: Cannot be empty or just spaces
    if (!data.name || data.name.trim().length === 0) {
        errors.push("Toy name is required.");
    }

    // 2. Age logic: Min must be less than or equal to Max
    const min = Number(data.min_age.trim());
    const max = data.max_age ? Number(data.max_age) : null;

    if (isNaN(min) || min < 0) {
        errors.push("Minimum age must be a positive number.");
    }
    if (max !== null && (isNaN(max) || max < min)) {
        errors.push("Maximum age cannot be lower than minimum age.");
    }

    // 3. Price check: Must be a valid positive number
    const price = Number(data.purchase_price);
    if (isNaN(price) || price < 0) {
        errors.push("Purchase price must be 0 or greater.");
    }


    return {
        isValid: errors.length === 0,
        errors: errors
    };
};