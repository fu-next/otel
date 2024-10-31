package com.fusir.demo.util;

import org.springframework.stereotype.Service;

@Service
public class ExceptionUtil {

	public void throwException() {
		throw new RuntimeException();
	}
	
}
