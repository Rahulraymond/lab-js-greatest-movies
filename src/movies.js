// Iteration 1: All directors? - Get the array of all directors.
// _Bonus_: It seems some of the directors had directed multiple movies so they will pop up multiple times in the array of directors.
// How could you "clean" a bit this array and make it unified (without duplicates)?
function getAllDirectors(moviesArray) {
    // Use map() to extract director names from each movie object
    const directors = moviesArray.map(function(movie) {
        return movie.director;
    });

    // Use filter() to keep only unique director names
    const uniqueDirectors = directors.filter(function(director, index, array) {
        // Keep only the first occurrence of each director
        return array.indexOf(director) === index;
    });

    return uniqueDirectors;
}

// Iteration 2: Steven Spielberg. The best? - How many drama movies did STEVEN SPIELBERG direct?
function howManyMovies(moviesArray) {
    // Filter the movies array to get only the drama movies directed by Steven Spielberg
    const spielbergDramas = moviesArray.filter(function(movie) {
        return movie.director === 'Steven Spielberg' && movie.genre.includes('Drama');
    });

    // Return the number of drama movies directed by Steven Spielberg
    return spielbergDramas.length;
}

// Iteration 3: All scores average - Get the average of all scores with 2 decimals
function scoresAverage(moviesArray) {
    if (moviesArray.length === 0) {
        return 0;
    }

    // Sum all scores
    const totalScore = moviesArray.reduce(function(acc, movie) {
        // If score is missing or not a number, consider it as 0
        if (movie.score && !isNaN(movie.score)) {
            return acc + movie.score;
        } else {
            return acc;
        }
    }, 0);

    // Calculate the average score
    const averageScore = totalScore / moviesArray.length;

    // Round the average to 2 decimal places
    return parseFloat(averageScore.toFixed(2));
}
// Iteration 4: Drama movies - Get the average of Drama Movies
function dramaMoviesScore(moviesArray) {
    // Filter the array to include only drama movies
    const dramaMovies = moviesArray.filter(function(movie) {
        return movie.genre.includes('Drama');
    });

    // If there are no drama movies, return 0
    if (dramaMovies.length === 0) {
        return 0;
    }

    // Sum all scores of drama movies
    const totalScore = dramaMovies.reduce(function(acc, movie) {
        // If score is missing or not a number, consider it as 0
        if (movie.score && !isNaN(movie.score)) {
            return acc + movie.score;
        } else {
            return acc;
        }
    }, 0);

    // Calculate the average score of drama movies
    const averageScore = totalScore / dramaMovies.length;

    // Round the average to 2 decimal places
    return parseFloat(averageScore.toFixed(2));
}
// Iteration 5: Ordering by year - Order by year, ascending (in growing order)
function orderByYear(moviesArray) {
    // Use the slice() method to create a shallow copy of the array to avoid modifying the original array
    const sortedMovies = moviesArray.slice();

    // Sort the array by year in ascending order
    sortedMovies.sort(function(a, b) {
        // If years are equal, sort by title
        if (a.year === b.year) {
            return a.title.localeCompare(b.title);
        }
        // Otherwise, sort by year
        return a.year - b.year;
    });

    return sortedMovies;
}

// Iteration 6: Alphabetic Order - Order by title and print the first 20 titles
function orderAlphabetically(moviesArray) {
    // Use the slice() method to create a shallow copy of the array to avoid modifying the original array
    const sortedMovies = moviesArray.slice();

    // Sort the array by title alphabetically
    sortedMovies.sort(function(a, b) {
        return a.title.localeCompare(b.title);
    });

    // Map the sorted array to extract only the titles
    const titles = sortedMovies.map(function(movie) {
        return movie.title;
    });

    // Return the first 20 titles or all titles if there are less than 20 movies
    return titles.slice(0, 20);
}
// BONUS - Iteration 7: Time Format - Turn duration of the movies from hours to minutes
function turnHoursToMinutes(moviesArray) {
    // Create a deep copy of the array to avoid modifying the original array
    const modifiedMovies = JSON.parse(JSON.stringify(moviesArray));

    // Iterate over each movie object in the array
    modifiedMovies.forEach(function(movie) {
        // Split the duration string into hours and minutes (if available)
        const durationParts = movie.duration.split(' ');

        let totalMinutes = 0;

        // Calculate total minutes
        durationParts.forEach(function(part) {
            if (part.includes('h')) {
                totalMinutes += parseInt(part.replace('h', '')) * 60; // Convert hours to minutes
            } else if (part.includes('min')) {
                totalMinutes += parseInt(part.replace('min', '')); // Add minutes
            }
        });

        // Update the duration property of the movie object with the total minutes
        movie.duration = totalMinutes;
    });

    return modifiedMovies;
}
// BONUS - Iteration 8: Best yearly score average - Best yearly score average
function bestYearAvg(moviesArray) {
    // If the movies array is empty, return null
    if (moviesArray.length === 0) {
        return null;
    }

    // Create an object to store average scores for each year
    const yearlyAverages = {};

    // Iterate over each movie object in the array
    moviesArray.forEach(function(movie) {
        // If the year is not yet in the yearlyAverages object, initialize it with an empty array
        if (!yearlyAverages[movie.year]) {
            yearlyAverages[movie.year] = [];
        }

        // Push the score of the current movie to the corresponding year array
        yearlyAverages[movie.year].push(movie.score);
    });

    // Calculate the average score for each year
    for (const year in yearlyAverages) {
        const scores = yearlyAverages[year];
        const totalScore = scores.reduce((acc, score) => acc + score, 0);
        const averageScore = totalScore / scores.length;
        yearlyAverages[year] = averageScore;
    }

    // Find the year with the highest average score
    let bestYear = null;
    let maxAverageScore = -Infinity;

    for (const year in yearlyAverages) {
        if (yearlyAverages[year] > maxAverageScore) {
            bestYear = parseInt(year);
            maxAverageScore = yearlyAverages[year];
        }
    }

    // If there is only one movie in the array, return the message with the year and average score
    if (moviesArray.length === 1) {
        return `The best year was ${bestYear} with an average score of ${maxAverageScore}`;
    }

    // Return the message with the best year and its average score
    return `The best year was ${bestYear} with an average score of ${maxAverageScore}`;
}

// The following is required to make unit tests work.
/* Environment setup. Do not modify the below code. */
if (typeof module !== 'undefined') {
  module.exports = {
    getAllDirectors,
    howManyMovies,
    scoresAverage,
    dramaMoviesScore,
    orderByYear,
    orderAlphabetically,
    turnHoursToMinutes,
    bestYearAvg,
  };
}
