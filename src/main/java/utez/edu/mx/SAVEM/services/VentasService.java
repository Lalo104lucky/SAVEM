package utez.edu.mx.SAVEM.services;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import utez.edu.mx.SAVEM.config.ApiResponse;
import utez.edu.mx.SAVEM.model.dao.InventarioDao;
import utez.edu.mx.SAVEM.model.dao.MedicamentosDao;
import utez.edu.mx.SAVEM.model.dao.UsuarioDao;
import utez.edu.mx.SAVEM.model.dao.VentasDao;
import utez.edu.mx.SAVEM.model.dto.MedicamentoVentaDto;
import utez.edu.mx.SAVEM.model.dto.VentasDto;
import utez.edu.mx.SAVEM.model.entity.*;

import java.sql.SQLException;
import java.util.*;

@Service
public class VentasService {
    private final VentasDao ventasDao;
    private final UsuarioDao usuarioDao;
    private final MedicamentosDao medicamentosDao;
    private final InventarioDao inventarioDao;

    public VentasService(VentasDao ventasDao, UsuarioDao usuarioDao, MedicamentosDao medicamentosDao, InventarioDao inventarioDao) {
        this.ventasDao = ventasDao;
        this.usuarioDao = usuarioDao;
        this.medicamentosDao = medicamentosDao;
        this.inventarioDao = inventarioDao;
    }

    @Transactional(readOnly = true)
    public ResponseEntity<ApiResponse> findAll() {
        return new ResponseEntity<>(new ApiResponse(ventasDao.findAll(), HttpStatus.OK), HttpStatus.OK);
    }

    @Transactional(readOnly = true)
    public ResponseEntity<ApiResponse> findById(Long id) {
        Optional<Ventas> foundVenta = ventasDao.findById(id);
        if (foundVenta.isEmpty()) {
            return new ResponseEntity<>(new ApiResponse(HttpStatus.NOT_FOUND, true, "VentaNotFound"), HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(new ApiResponse(foundVenta.get(), HttpStatus.OK), HttpStatus.OK);
    }

    @Transactional(rollbackFor = {SQLException.class})
    public ResponseEntity<ApiResponse> register(VentasDto ventasDto) {
        Usuario foundUsuario = usuarioDao.findById(ventasDto.getId_usuario()).orElseThrow(() -> new RuntimeException("UserNotFound"));
        Long totalVentas = 0L;

        List<Medicamentos> medicamentosVendidos = new ArrayList<>();
        List<DetalleVenta> detallesVenta = new ArrayList<>();

        for (MedicamentoVentaDto detalle : ventasDto.getMedicamentos()) {
            Medicamentos medicamento = medicamentosDao.findById(detalle.getId_medicamento())
                    .orElseThrow(() -> new RuntimeException("Medicamento no encontrado: ID " + detalle.getId_medicamento()));

            Inventario inventario = medicamento.getInventario();
            if (inventario.getExtencias() < detalle.getCantidad()) {
                throw new RuntimeException("Stock insuficiente para el medicamento: " + medicamento.getNombre());
            }

            inventario.setExtencias(inventario.getExtencias() - detalle.getCantidad());
            inventarioDao.save(inventario);
            totalVentas = medicamento.getCantidadvendida() + detalle.getCantidad();
            medicamento.setCantidadvendida(totalVentas);
            medicamentosVendidos.add(medicamento);

            DetalleVenta detalleVenta = DetalleVenta.builder()
                    .venta(null)
                    .medicamento(medicamento)
                    .cantidad(detalle.getCantidad())
                    .build();

            detallesVenta.add(detalleVenta);

        }
        Ventas venta = new Ventas();
        venta.setFecha(ventasDto.getFecha());
        venta.setTipopago(ventasDto.getTipo_pago());
        venta.setTotal(ventasDto.getTotal());
        venta.setUsuario(foundUsuario);
        venta.setMedicamentos(medicamentosVendidos);
        venta.setDetallesVenta(detallesVenta);

        for (DetalleVenta detalle : detallesVenta) {
            detalle.setVenta(venta);
        }

        ventasDao.save(venta);

        return new ResponseEntity<>(
                new ApiResponse(venta, HttpStatus.OK), HttpStatus.OK);
    }




}



