package com.fusir.demo.model;

public class Movie {

	private String name;
	
	private String description;
	
	private boolean isThrowException;

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public boolean isThrowException() {
		return isThrowException;
	}

	public void setThrowException(boolean isThrowException) {
		this.isThrowException = isThrowException;
	}
	
}
