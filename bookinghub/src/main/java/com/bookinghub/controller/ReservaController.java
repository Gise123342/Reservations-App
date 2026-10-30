package com.bookinghub.controller;

import com.bookinghub.model.Reserva;
import com.bookinghub.service.ExcelDataService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/api/reservas")
@CrossOrigin(origins = "http://localhost:5173")
public class ReservaController {

    private final ExcelDataService excelDataService;

    public ReservaController(ExcelDataService excelDataService) {
        this.excelDataService = excelDataService;
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Reserva guardarReserva(@Valid @RequestBody Reserva reserva) throws IOException {
        return excelDataService.guardarReserva(reserva);
    }

    @GetMapping
    public List<Reserva> obtenerReservas() throws IOException {
        return excelDataService.obtenerReservas();
    }
}
