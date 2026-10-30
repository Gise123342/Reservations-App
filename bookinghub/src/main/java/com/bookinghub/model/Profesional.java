package com.bookinghub.model;

public class Profesional {

    private Long id;
    private String nombre;
    private String especialidad;
    private String experiencia;

    public Profesional(Long id, String nombre, String especialidad, String experiencia) {
        this.id = id;
        this.nombre = nombre;
        this.especialidad = especialidad;
        this.experiencia = experiencia;
    }

    public Long getId() {
        return id;
    }

    public String getNombre() {
        return nombre;
    }

    public String getEspecialidad() {
        return especialidad;
    }

    public String getExperiencia() {
        return experiencia;
    }
}
