package com.fusir.demo.service;

import com.fusir.demo.model.ExecuteResult;
import com.fusir.demo.model.Movie;
import com.fusir.demo.model.Todo;
import com.fusir.demo.util.ExceptionUtil;
import com.google.gson.Gson;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.concurrent.ConcurrentHashMap;
import java.util.stream.Collectors;

@Service
public class TodoService {

    private static final Logger LOGGER = LoggerFactory.getLogger(TodoService.class);

    private final Map<String, Todo> todoMap;

    @Autowired
    private ExceptionUtil exceptionUtil;

    @Autowired
    private Gson gson;

    public TodoService() {
        this.todoMap = new ConcurrentHashMap<String, Todo>();
    }

    public List<Todo> getTodoList() {
        LOGGER.info("========== TodoService getTodoList START ==========");

        List<Todo> movies = new ArrayList<Todo>(todoMap.values());
        LOGGER.info("========== TodoService getTodoList END ==========");

        return movies;
    }

    public ExecuteResult insertTodo(Todo todo) {
        LOGGER.info("========== TodoService insertTodo START ==========");
        LOGGER.info("todo: {}", gson.toJson(todo));

        ExecuteResult executeResult = new ExecuteResult();
        try {
            if(todoMap.containsKey(todo.getUuid())) {
                executeResult.setSuccess(false);
                executeResult.setMessage("Todo exist");
            } else {
                todoMap.put(todo.getUuid(), todo);
                executeResult.setSuccess(true);
                executeResult.setMessage("Insert Success");
            }
        } catch(Exception e) {
            LOGGER.error(e.getMessage(), e);
            executeResult.setSuccess(false);
            executeResult.setMessage(e.getMessage());
        }
        LOGGER.info("========== TodoService insertTodo END ==========");

        return executeResult;
    }

    public ExecuteResult deleteTodo(String uuid) {
        LOGGER.info("========== TodoService deleteTodo START ==========");
        LOGGER.info("uuid: {}", uuid);

        ExecuteResult executeResult = new ExecuteResult();
        try {
            if(!todoMap.containsKey(uuid)) {
                executeResult.setSuccess(false);
                executeResult.setMessage("Todo not exist");
            } else {
                todoMap.remove(uuid);
                executeResult.setSuccess(true);
                executeResult.setMessage("Delete Success");
            }
        } catch(Exception e) {
            LOGGER.error(e.getMessage(), e);
            executeResult.setSuccess(false);
            executeResult.setMessage(e.getMessage());
        }
        LOGGER.info("========== TodoService deleteTodo END ==========");

        return executeResult;
    }

}
