
package com.bookinghub.controller;

import com.bookinghub.model.Servicio;
import com.bookinghub.service.ExcelDataService;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/api/servicios")
@CrossOrigin(origins = "http://localhost:5173")
public class ServicioController {

    private final ExcelDataService excelDataService;

    public ServicioController(ExcelDataService excelDataService) {
        this.excelDataService = excelDataService;
    }

    @GetMapping
    public List<Servicio> obtenerServicios() throws IOException {
        return excelDataService.obtenerServicios();
    }
}
