package com.bookinghub.model;

public class Reserva {

    private Long id;
    private String nombreCliente;
    private String correo;
    private Long servicioId;
    private Long profesionalId;
    private String fecha;
    private String hora;

    public Reserva(Long id, String nombreCliente, String correo, Long servicioId,
            Long profesionalId, String fecha, String hora) {
        this.id = id;
        this.nombreCliente = nombreCliente;
        this.correo = correo;
        this.servicioId = servicioId;
        this.profesionalId = profesionalId;
        this.fecha = fecha;
        this.hora = hora;
    }

    public Long getId() {
        return id;
    }

    public String getNombreCliente() {
        return nombreCliente;
    }

    public String getCorreo() {
        return correo;
    }

    public Long getServicioId() {
        return servicioId;
    }

    public Long getProfesionalId() {
        return profesionalId;
    }

    public String getFecha() {
        return fecha;
    }

    public String getHora() {
        return hora;
    }
}
