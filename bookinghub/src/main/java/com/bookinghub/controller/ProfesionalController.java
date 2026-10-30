package com.bookinghub.controller;

import com.bookinghub.model.Profesional;
import com.bookinghub.service.ExcelDataService;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/api/profesionales")
@CrossOrigin(origins = "http://localhost:5173")
public class ProfesionalController {

    private final ExcelDataService excelDataService;

    public ProfesionalController(ExcelDataService excelDataService) {
        this.excelDataService = excelDataService;
    }

    @GetMapping
    public List<Profesional> obtenerProfesionales() throws IOException {
        return excelDataService.obtenerProfesionales();
    }
}
