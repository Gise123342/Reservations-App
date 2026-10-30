package com.bookinghub.service;

import com.bookinghub.model.Profesional;
import com.bookinghub.model.Reserva;
import com.bookinghub.model.Servicio;
import jakarta.annotation.PostConstruct;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.DataFormatter;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.ArrayList;
import java.util.List;

@Service
public class ExcelDataService {

    private final Path archivo;
    private final DataFormatter formatter = new DataFormatter();

    public ExcelDataService(@Value("${app.excel.path:data.xlsx}") String ruta) {
        this.archivo = Path.of(ruta);
    }

    @PostConstruct
    public void inicializar() throws IOException {
        if (!Files.exists(archivo)) {
            crearArchivoInicial();
        }
    }

    public synchronized List<Servicio> obtenerServicios() throws IOException {
        List<Servicio> servicios = new ArrayList<>();
        try (XSSFWorkbook workbook = abrirArchivo()) {
            Sheet sheet = workbook.getSheet("servicios");
            for (int i = 1; i <= sheet.getLastRowNum(); i++) {
                Row row = sheet.getRow(i);
                if (row != null && !texto(row, 0).isBlank()) {
                    servicios.add(new Servicio(numero(row, 0), texto(row, 1),
                            Integer.valueOf(texto(row, 2)), Double.valueOf(texto(row, 3))));
                }
            }
        }
        return servicios;
    }

    public synchronized List<Profesional> obtenerProfesionales() throws IOException {
        List<Profesional> profesionales = new ArrayList<>();
        try (XSSFWorkbook workbook = abrirArchivo()) {
            Sheet sheet = workbook.getSheet("profesionales");
            for (int i = 1; i <= sheet.getLastRowNum(); i++) {
                Row row = sheet.getRow(i);
                if (row != null && !texto(row, 0).isBlank()) {
                    profesionales.add(new Profesional(numero(row, 0), texto(row, 1),
                            texto(row, 2), texto(row, 3)));
                }
            }
        }
        return profesionales;
    }

    public synchronized Reserva guardarReserva(Reserva reserva) throws IOException {
        try (XSSFWorkbook workbook = abrirArchivo()) {
            Sheet sheet = workbook.getSheet("reservas");
            long id = sheet.getLastRowNum();
            Row row = sheet.createRow(sheet.getLastRowNum() + 1);
            row.createCell(0).setCellValue(id);
            row.createCell(1).setCellValue(reserva.getNombreCliente());
            row.createCell(2).setCellValue(reserva.getCorreo());
            row.createCell(3).setCellValue(reserva.getServicioId());
            row.createCell(4).setCellValue(reserva.getProfesionalId());
            row.createCell(5).setCellValue(reserva.getFecha());
            row.createCell(6).setCellValue(reserva.getHora());
            try (OutputStream output = Files.newOutputStream(archivo)) {
                workbook.write(output);
            }
            return new Reserva(id, reserva.getNombreCliente(), reserva.getCorreo(),
                    reserva.getServicioId(), reserva.getProfesionalId(), reserva.getFecha(), reserva.getHora());
        }
    }

    public synchronized List<Reserva> obtenerReservas() throws IOException {
        List<Reserva> reservas = new ArrayList<>();
        try (XSSFWorkbook workbook = abrirArchivo()) {
            Sheet sheet = workbook.getSheet("reservas");
            for (int i = 1; i <= sheet.getLastRowNum(); i++) {
                Row row = sheet.getRow(i);
                if (row != null && !texto(row, 0).isBlank()) {
                    reservas.add(new Reserva(numero(row, 0), texto(row, 1), texto(row, 2),
                            numero(row, 3), numero(row, 4), texto(row, 5), texto(row, 6)));
                }
            }
        }
        return reservas;
    }

    private XSSFWorkbook abrirArchivo() throws IOException {
        try (InputStream input = Files.newInputStream(archivo)) {
            return new XSSFWorkbook(input);
        }
    }

    private void crearArchivoInicial() throws IOException {
        try (XSSFWorkbook workbook = new XSSFWorkbook()) {
            crearHoja(workbook, "profesionales", new String[]{"id", "nombre", "especialidad", "experiencia"});
            Sheet profesionales = workbook.getSheet("profesionales");
            agregarFila(profesionales, 1, "Dra. Ana Martínez", "Medicina general", "8 años");
            agregarFila(profesionales, 2, "Dr. Carlos López", "Psicología", "5 años");
            agregarFila(profesionales, 3, "Dra. María Torres", "Nutrición", "6 años");

            crearHoja(workbook, "servicios", new String[]{"id", "nombre", "duracionMinutos", "precio"});
            Sheet servicios = workbook.getSheet("servicios");
            agregarFila(servicios, 1, "Consulta general", 30, 25.0);

            crearHoja(workbook, "reservas", new String[]{"id", "nombreCliente", "correo", "servicioId", "profesionalId", "fecha", "hora"});
            try (OutputStream output = Files.newOutputStream(archivo)) {
                workbook.write(output);
            }
        }
    }

    private void crearHoja(XSSFWorkbook workbook, String nombre, String[] encabezados) {
        Sheet sheet = workbook.createSheet(nombre);
        Row row = sheet.createRow(0);
        for (int i = 0; i < encabezados.length; i++) {
            row.createCell(i).setCellValue(encabezados[i]);
        }
    }

    private void agregarFila(Sheet sheet, Object... valores) {
        Row row = sheet.createRow(sheet.getLastRowNum() + 1);
        for (int i = 0; i < valores.length; i++) {
            Object valor = valores[i];
            Cell cell = row.createCell(i);
            if (valor instanceof Number numero) {
                cell.setCellValue(numero.doubleValue());
            } else {
                cell.setCellValue(String.valueOf(valor));
            }
        }
    }

    private String texto(Row row, int columna) {
        Cell cell = row.getCell(columna);
        return cell == null ? "" : formatter.formatCellValue(cell);
    }

    private Long numero(Row row, int columna) {
        return Long.valueOf(texto(row, columna).replace(".0", ""));
    }
}
