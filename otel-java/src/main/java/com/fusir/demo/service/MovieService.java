package com.fusir.demo.service;

import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.concurrent.ConcurrentHashMap;
import java.util.stream.Collectors;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.fusir.demo.model.ExecuteResult;
import com.fusir.demo.model.Movie;
import com.fusir.demo.util.ExceptionUtil;
import com.google.gson.Gson;

@Service
public class MovieService {
	
    private static final Logger LOGGER = LoggerFactory.getLogger(MovieService.class);

	private Map<String, Movie> movieMap;
	
	@Autowired
	private ExceptionUtil exceptionUtil;
	
	@Autowired
	private Gson gson;
	
	public MovieService() {
		this.movieMap = new ConcurrentHashMap<String, Movie>();
	}
	
	public List<Movie> getAllMovies() {
		LOGGER.info("========== MovieService getAllMovies START ==========");
		
		List<Movie> movies = movieMap.entrySet().stream()
				.map(e -> e.getValue()).collect(Collectors.toList());
		LOGGER.info("========== MovieService getAllMovies END ==========");

		return movies;
	}
	
	public Optional<Movie> getMovieByName(String name) {
		LOGGER.info("========== MovieService getMovieByName START ==========");
		LOGGER.info("name: " + name);

		Optional<Movie> movieOpt = Optional.empty();
		if(movieMap.containsKey(name)) {
			movieOpt = Optional.of(movieMap.get(name));
		}
		LOGGER.info("========== MovieService getMovieByName END ==========");
		
		return movieOpt;
	}
	
	public ExecuteResult insertMovie(Movie movie) {
		LOGGER.info("========== MovieService insertMovie START ==========");
    	LOGGER.info("movie: " + gson.toJson(movie));

		ExecuteResult executeResult = new ExecuteResult();
		try {
			if(movie.isThrowException()) {
				exceptionUtil.throwException();
			}
			
			if(movieMap.containsKey(movie.getName())) {
				executeResult.setSuccess(false);
				executeResult.setMessage("Movie exist");
			} else {
				movieMap.put(movie.getName(), movie);
				executeResult.setSuccess(true);
				executeResult.setMessage("Insert Success");
			}
		} catch(Exception e) {
			LOGGER.error(e.getMessage(), e);
			executeResult.setSuccess(false);
			executeResult.setMessage(e.getMessage());
		}
		LOGGER.info("========== MovieService insertMovie END ==========");

		return executeResult;
	}
	
	public ExecuteResult updateMovie(Movie movie) {
		LOGGER.info("========== MovieService updateMovie START ==========");
    	LOGGER.info("movie: " + gson.toJson(movie));

		ExecuteResult executeResult = new ExecuteResult();
//		try {
			if(movie.isThrowException()) {
				exceptionUtil.throwException();
			}
			
			if(!movieMap.containsKey(movie.getName())) {
				executeResult.setSuccess(false);
				executeResult.setMessage("Movie not exist");
			} else {
				movieMap.put(movie.getName(), movie);
				executeResult.setSuccess(true);
				executeResult.setMessage("Update Success");
			}
//		} catch(Exception e) {
//			LOGGER.error(e.getMessage(), e);
//			executeResult.setSuccess(false);
//			executeResult.setMessage(e.getMessage());
//		}
		LOGGER.info("========== MovieService updateMovie END ==========");

		return executeResult;
	}
	
	public ExecuteResult deleteMovie(String name) {
		LOGGER.info("========== MovieService deleteMovie START ==========");
		LOGGER.info("name: " + name);

		ExecuteResult executeResult = new ExecuteResult();
		try {
			if(!movieMap.containsKey(name)) {
				executeResult.setSuccess(false);
				executeResult.setMessage("Movie not exist");
			} else {
				movieMap.remove(name);
				executeResult.setSuccess(true);
				executeResult.setMessage("Delete Success");
			}
		} catch(Exception e) {
			LOGGER.error(e.getMessage(), e);
			executeResult.setSuccess(false);
			executeResult.setMessage(e.getMessage());
		}
		LOGGER.info("========== MovieService deleteMovie END ==========");

		
		return executeResult;
	}
	

}
