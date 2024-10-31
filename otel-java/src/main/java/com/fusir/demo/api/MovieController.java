package com.fusir.demo.api;

import java.util.List;
import java.util.Optional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.fusir.demo.model.ExecuteResult;
import com.fusir.demo.model.Movie;
import com.fusir.demo.service.MovieService;
import com.google.gson.Gson;

@RestController
@RequestMapping("/demo")
public class MovieController {
	
    private static final Logger LOGGER = LoggerFactory.getLogger(MovieController.class);

    @Autowired
    private MovieService movieService;
    
    @Autowired
    private Gson gson;
    
    @GetMapping("/movies")
    public List<Movie> getAllMovie() {
    	LOGGER.info("========== MovieController getAllMovie START==========");
    	
    	return movieService.getAllMovies();
    }
    
    @GetMapping("/movie/{name}")
    public Optional<Movie> getMovieByName(@PathVariable("name") String name) {
    	LOGGER.info("========== MovieController getMovieByName START==========");
    	LOGGER.info("name: " + name);

    	return movieService.getMovieByName(name);
    }
    
    @PostMapping("/movie")
    public ExecuteResult insertMovie(@RequestBody Movie movie) {
    	LOGGER.info("========== MovieController insertMovie START==========");
    	LOGGER.info("movie: " + gson.toJson(movie));

    	return movieService.insertMovie(movie);
    }
    
    @PutMapping("/movie")
    public ExecuteResult updateMovie(@RequestBody Movie movie) {
    	LOGGER.info("========== MovieController updateMovie START==========");
    	LOGGER.info("movie: " + gson.toJson(movie));

    	return movieService.updateMovie(movie);
    }
    
    @DeleteMapping("/movie/{name}")
    public ExecuteResult deleteMovie(@PathVariable("name") String name) {
    	LOGGER.info("========== MovieController deleteMovie START==========");
    	LOGGER.info("name: " + name);

    	return movieService.deleteMovie(name);
    }
    

}
