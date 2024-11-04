package com.fusir.demo.api;

import com.fusir.demo.model.ExecuteResult;
import com.fusir.demo.model.Todo;
import com.fusir.demo.service.TodoService;
import com.google.gson.Gson;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/demo")
public class TodoController {

    private static final Logger LOGGER = LoggerFactory.getLogger(TodoController.class);

    @Autowired
    private TodoService todoService;

    @Autowired
    private Gson gson;

    @GetMapping("/todo")
    public List<Todo> getTodoList() {
        LOGGER.info("========== TodoController getTodoList START ==========");

        return todoService.getTodoList();
    }

    @PostMapping("/todo")
    public ExecuteResult insertTodo(@RequestBody Todo todo) {
        LOGGER.info("========== TodoController insertTodo START ==========");
        LOGGER.info("todo: {}", gson.toJson(todo));

        return todoService.insertTodo(todo);
    }

    @DeleteMapping("/todo/{uuid}")
    public ExecuteResult deleteTodo(@PathVariable String uuid) {
        LOGGER.info("========== TodoController deleteTodo START ==========");
        LOGGER.info("uuid: {}", uuid);

        return todoService.deleteTodo(uuid);
    }

}
