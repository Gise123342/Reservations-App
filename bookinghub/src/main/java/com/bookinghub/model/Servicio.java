
package com.bookinghub.model;

public class Servicio {

    private Long id;
    private String nombre;
    private Integer duracionMinutos;
    private Double precio;

    public Servicio(Long id, String nombre,
            Integer duracionMinutos, Double precio) {
        this.id = id;
        this.nombre = nombre;
        this.duracionMinutos = duracionMinutos;
        this.precio = precio;
    }

    public Long getId() {
        return id;
    }

    public String getNombre() {
        return nombre;
    }

    public Integer getDuracionMinutos() {
        return duracionMinutos;
    }

    public Double getPrecio() {
        return precio;
    }
}
