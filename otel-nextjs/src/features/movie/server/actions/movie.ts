
export async function getMovies() {
    const data = await fetch("http://localhost:8080/demo/movies");

    return data.json();
}

export async function getMovieByName() {

}

export async function insertMovie() {

}

export async function updateMovie() {

}

export async function deleteMovie() {

}