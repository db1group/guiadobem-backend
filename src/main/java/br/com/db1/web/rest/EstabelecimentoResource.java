package br.com.db1.web.rest;

import br.com.db1.service.EstabelecimentoService;
import br.com.db1.web.rest.errors.BadRequestAlertException;
import br.com.db1.service.dto.EstabelecimentoDTO;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.PaginationUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link br.com.db1.domain.Estabelecimento}.
 */
@RestController
@RequestMapping("/api")
public class EstabelecimentoResource {

    private final Logger log = LoggerFactory.getLogger(EstabelecimentoResource.class);

    private static final String ENTITY_NAME = "estabelecimento";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final EstabelecimentoService estabelecimentoService;

    public EstabelecimentoResource(EstabelecimentoService estabelecimentoService) {
        this.estabelecimentoService = estabelecimentoService;
    }

    /**
     * {@code POST  /estabelecimentos} : Create a new estabelecimento.
     *
     * @param estabelecimentoDTO the estabelecimentoDTO to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new estabelecimentoDTO, or with status {@code 400 (Bad Request)} if the estabelecimento has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/estabelecimentos")
    public ResponseEntity<EstabelecimentoDTO> createEstabelecimento(@Valid @RequestBody EstabelecimentoDTO estabelecimentoDTO) throws URISyntaxException {
        log.debug("REST request to save Estabelecimento : {}", estabelecimentoDTO);
        if (estabelecimentoDTO.getId() != null) {
            throw new BadRequestAlertException("A new estabelecimento cannot already have an ID", ENTITY_NAME, "idexists");
        }
        EstabelecimentoDTO result = estabelecimentoService.save(estabelecimentoDTO);
        return ResponseEntity.created(new URI("/api/estabelecimentos/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /estabelecimentos} : Updates an existing estabelecimento.
     *
     * @param estabelecimentoDTO the estabelecimentoDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated estabelecimentoDTO,
     * or with status {@code 400 (Bad Request)} if the estabelecimentoDTO is not valid,
     * or with status {@code 500 (Internal Server Error)} if the estabelecimentoDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/estabelecimentos")
    public ResponseEntity<EstabelecimentoDTO> updateEstabelecimento(@Valid @RequestBody EstabelecimentoDTO estabelecimentoDTO) throws URISyntaxException {
        log.debug("REST request to update Estabelecimento : {}", estabelecimentoDTO);
        if (estabelecimentoDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        EstabelecimentoDTO result = estabelecimentoService.save(estabelecimentoDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, estabelecimentoDTO.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /estabelecimentos} : get all the estabelecimentos.
     *
     * @param pageable the pagination information.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of estabelecimentos in body.
     */
    @GetMapping("/estabelecimentos")
    public ResponseEntity<List<EstabelecimentoDTO>> getAllEstabelecimentos(Pageable pageable) {
        log.debug("REST request to get a page of Estabelecimentos");
        Page<EstabelecimentoDTO> page = estabelecimentoService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /estabelecimentos/:id} : get the "id" estabelecimento.
     *
     * @param id the id of the estabelecimentoDTO to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the estabelecimentoDTO, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/estabelecimentos/{id}")
    public ResponseEntity<EstabelecimentoDTO> getEstabelecimento(@PathVariable Long id) {
        log.debug("REST request to get Estabelecimento : {}", id);
        Optional<EstabelecimentoDTO> estabelecimentoDTO = estabelecimentoService.findOne(id);
        return ResponseUtil.wrapOrNotFound(estabelecimentoDTO);
    }

    /**
     * {@code DELETE  /estabelecimentos/:id} : delete the "id" estabelecimento.
     *
     * @param id the id of the estabelecimentoDTO to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/estabelecimentos/{id}")
    public ResponseEntity<Void> deleteEstabelecimento(@PathVariable Long id) {
        log.debug("REST request to delete Estabelecimento : {}", id);
        estabelecimentoService.delete(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }

    @GetMapping("/public/estabelecimentos/{cidadeId}/{categoriaId}")
    public ResponseEntity<List<EstabelecimentoDTO>> getAllEstabelecimentos(@PathVariable Long cidadeId, @PathVariable Long categoriaId) {
        log.debug("REST request to get a page of Estabelecimentos");
        return ResponseEntity.ok(estabelecimentoService.findAll(cidadeId, categoriaId));
    }

    @PostMapping("/public/estabelecimentos")
    public ResponseEntity<EstabelecimentoDTO> createPublicEstabelecimento(@Valid @RequestBody EstabelecimentoDTO estabelecimentoDTO) throws URISyntaxException {
        log.debug("REST request to save Public Estabelecimento : {}", estabelecimentoDTO);
        EstabelecimentoDTO result = estabelecimentoService.savePublic(estabelecimentoDTO);
        return ResponseEntity.created(new URI("/api/estabelecimentos/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }
}
