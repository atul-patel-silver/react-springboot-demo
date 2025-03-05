package com.example.javaproject.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.BAD_REQUEST)
public class AlreadyExistsException extends RuntimeException{
    public AlreadyExistsException(String resourceName, String fieldName, String fieldValue){
        super(String.format("%s Already Exists with given input  data %s: '%s'",resourceName,fieldName,fieldValue));
    }
}